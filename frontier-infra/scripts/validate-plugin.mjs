#!/usr/bin/env node

import fs from 'node:fs';
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const submission = process.argv.includes('--submission');
const checkLiveUrls = process.argv.includes('--check-live-urls');

function fail(message) {
  errors.push(message);
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function requireFile(relative) {
  if (!fs.existsSync(path.join(root, relative))) fail(`missing ${relative}`);
}

const manifestPath = '.codex-plugin/plugin.json';
requireFile(manifestPath);
const manifest = JSON.parse(read(manifestPath));
const folderName = path.basename(root);
const cacheParentName = path.basename(path.dirname(root));

if (manifest.name !== folderName && manifest.name !== cacheParentName) {
  fail(`manifest name ${manifest.name} does not match ${folderName}`);
}
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(manifest.version ?? '')) fail('manifest version is not strict semver');
if (manifest.skills !== './skills/') fail('manifest skills must be ./skills/');
for (const field of ['name', 'description']) if (!manifest[field]) fail(`manifest missing ${field}`);
for (const field of ['displayName', 'shortDescription', 'longDescription', 'developerName', 'category']) {
  if (!manifest.interface?.[field]) fail(`manifest interface missing ${field}`);
}
for (const field of ['composerIcon', 'logo']) {
  const value = manifest.interface?.[field];
  if (value) requireFile(value.replace(/^\.\//, ''));
}

const skillRoot = path.join(root, 'skills');
const skillNames = fs.readdirSync(skillRoot).filter((name) => fs.statSync(path.join(skillRoot, name)).isDirectory()).sort();
if (skillNames.length < 2) fail('plugin should bundle at least two focused skills');

for (const skillName of skillNames) {
  const relative = `skills/${skillName}/SKILL.md`;
  requireFile(relative);
  const body = read(relative);
  const match = body.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    fail(`${relative} has invalid frontmatter`);
    continue;
  }
  const entries = match[1].split('\n').filter(Boolean).map((line) => line.match(/^([a-z_]+):\s*(.+)$/)).filter(Boolean);
  const metadata = Object.fromEntries(entries.map((entry) => [entry[1], entry[2]]));
  const keys = Object.keys(metadata).sort();
  if (keys.join(',') !== 'description,name') fail(`${relative} frontmatter must contain only name and description`);
  if (metadata.name !== skillName) fail(`${relative} name does not match folder`);
  if (!metadata.description || metadata.description.length < 40) fail(`${relative} needs a scoped trigger description`);

  const agentRelative = `skills/${skillName}/agents/openai.yaml`;
  requireFile(agentRelative);
  if (fs.existsSync(path.join(root, agentRelative))) {
    const agent = read(agentRelative);
    if (!agent.includes(`$${skillName}`)) fail(`${agentRelative} default prompt must mention $${skillName}`);
  }

  for (const reference of body.matchAll(/`(\.\.\/\.\.\/(?:references|assets)\/[^`]+)`/g)) {
    const resolved = path.resolve(path.dirname(path.join(root, relative)), reference[1]);
    if (!resolved.startsWith(root + path.sep) || !fs.existsSync(resolved)) fail(`${relative} has missing reference ${reference[1]}`);
  }
}

for (const relative of [
  'README.md',
  'docs/use-case-inventory.md',
  'docs/marketplace-submission.md',
  'docs/runtime-health-contract.md',
  'assets/runtime-health-contract.schema.json',
  'assets/generated/runtime-health.mjs',
  'assets/protocol-lock.json',
  'assets/runtime-health-manifest.yaml',
  'scripts/check-runtime-health.mjs',
  'evals/cases.json',
  'evals/fixtures/runtime-health/healthy.json',
  'evals/fixtures/runtime-health/process-only.json',
  'evals/fixtures/runtime-health/provider-credit-auth-failure.json',
  'evals/fixtures/runtime-health/governance-dead.json',
  'evals/fixtures/runtime-health/operator-halt.json',
  'evals/fixtures/runtime-health/mixed-blocker-propose-only.json',
  'evals/fixtures/runtime-health/degraded-optional-check.json',
  'evals/fixtures/runtime-health/invalid-structural-evidence.json',
]) requireFile(relative);

const protocolLock = JSON.parse(read('assets/protocol-lock.json'));
if (protocolLock.canonical_repository !== 'https://github.com/frontier-infra/frontier-sdk') {
  fail('assets/protocol-lock.json must name the frontier-sdk canonical repository');
}
if (protocolLock.schema_version !== 'frontier.machine.health.v1') {
  fail('assets/protocol-lock.json must pin frontier.machine.health.v1');
}
const hash = (content) => crypto.createHash('sha256').update(content).digest('hex');
const sdkRoot = path.resolve(root, '../../frontier-sdk');
for (const [generatedRelative, metadata] of Object.entries(protocolLock.files ?? {})) {
  const generatedPath = path.join(root, generatedRelative);
  if (!generatedPath.startsWith(root + path.sep) || !fs.existsSync(generatedPath)) {
    fail(`protocol snapshot missing ${generatedRelative}`);
    continue;
  }
  if (hash(fs.readFileSync(generatedPath)) !== metadata.generated_sha256) {
    fail(`protocol snapshot drifted from lock: ${generatedRelative}`);
  }
  if (fs.existsSync(sdkRoot)) {
    const sourcePath = path.resolve(sdkRoot, metadata.source);
    if (!sourcePath.startsWith(sdkRoot + path.sep) || !fs.existsSync(sourcePath)) {
      fail(`canonical SDK source missing ${metadata.source}`);
    } else if (hash(fs.readFileSync(sourcePath)) !== metadata.source_sha256) {
      fail(`canonical SDK source drifted from lock: ${metadata.source}`);
    }
  }
}

const healthFixtureExpectations = {
  'healthy.json': ['pass', true, 0],
  'process-only.json': ['blocked', false, 2],
  'provider-credit-auth-failure.json': ['blocked', false, 2],
  'governance-dead.json': ['propose_only', false, 2],
  'operator-halt.json': ['halted', false, 2],
  'mixed-blocker-propose-only.json': ['blocked', false, 2],
  'degraded-optional-check.json': ['degraded', true, 0],
  'invalid-structural-evidence.json': ['invalid', false, 1],
};

function validateHealthContract(contractPath, label, expectedStatus, expectedCanMutate, expectedExit) {
  const result = spawnSync(
    process.execPath,
    [path.join(root, 'scripts/check-runtime-health.mjs'), contractPath],
    { encoding: 'utf8' },
  );
  if (result.status !== expectedExit) {
    fail(`runtime health case ${label} exited ${result.status}; expected ${expectedExit}: ${result.stderr || result.stdout}`);
    return;
  }
  try {
    const report = JSON.parse(result.stdout);
    if (report.status !== expectedStatus) fail(`runtime health case ${label} status ${report.status}; expected ${expectedStatus}`);
    if (report.can_mutate !== expectedCanMutate) fail(`runtime health case ${label} can_mutate ${report.can_mutate}; expected ${expectedCanMutate}`);
  } catch (error) {
    fail(`runtime health case ${label} did not emit JSON: ${error.message}`);
  }
}

for (const [fixtureName, [expectedStatus, expectedCanMutate, expectedExit]] of Object.entries(healthFixtureExpectations)) {
  validateHealthContract(
    path.join(root, 'evals/fixtures/runtime-health', fixtureName),
    fixtureName,
    expectedStatus,
    expectedCanMutate,
    expectedExit,
  );
}

const malformedHealthCases = {
  missing_summary: (contract) => { delete contract.layers.process.checks[0].summary; },
  missing_stale_after_seconds: (contract) => { delete contract.layers.scheduler.checks[0].stale_after_seconds; },
  invalid_reason_code: (contract) => { contract.layers.execution.checks[0].reason_code = 'provider_says_ok'; },
  future_observation: (contract) => { contract.layers.governance.checks[0].observed_at = '2026-08-05T12:01:00Z'; },
  extra_top_level: (contract) => { contract.provider = 'should-not-be-authoritative'; },
  extra_layer: (contract) => { contract.layers.provider = structuredClone(contract.layers.execution); },
};
const healthTempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'frontier-health-validation-'));
try {
  const healthyContract = JSON.parse(read('evals/fixtures/runtime-health/healthy.json'));
  for (const [caseName, mutate] of Object.entries(malformedHealthCases)) {
    const contract = structuredClone(healthyContract);
    mutate(contract);
    const contractPath = path.join(healthTempDirectory, `${caseName}.json`);
    fs.writeFileSync(contractPath, JSON.stringify(contract));
    const expectedStatus = caseName === 'future_observation' ? 'blocked' : 'invalid';
    const expectedExit = caseName === 'future_observation' ? 2 : 1;
    validateHealthContract(contractPath, caseName, expectedStatus, false, expectedExit);
  }
} finally {
  fs.rmSync(healthTempDirectory, { recursive: true, force: true });
}
const evals = JSON.parse(read('evals/cases.json'));
if ((evals.positive?.length ?? 0) < 5) fail('submission needs at least five positive tests');
if ((evals.negative?.length ?? 0) < 3) fail('submission needs at least three negative tests');
const caseIds = [...(evals.positive ?? []), ...(evals.negative ?? [])].map((item) => item.id);
if (new Set(caseIds).size !== caseIds.length) fail('eval case ids must be unique');
if (submission) {
  const fixturePlaceholder = /^(?:A|An)\s+(?:writable\s+)?sample\b|verification output/i;
  for (const item of [...(evals.positive ?? []), ...(evals.negative ?? [])]) {
    const fixtures = item.fixtures ?? [];
    if (!Array.isArray(fixtures)) {
      fail(`eval ${item.id} fixtures must be an array`);
      continue;
    }
    for (const fixture of fixtures) {
      if (typeof fixture !== 'string' || !fixture.trim()) {
        fail(`eval ${item.id} contains an invalid fixture entry`);
      } else if (!fixture.startsWith('https://') && !fixture.startsWith('./') && !fixture.startsWith('../')) {
        fail(`eval ${item.id} fixture must be a runnable relative path or public https URL: ${fixture}`);
      } else if (fixturePlaceholder.test(fixture)) {
        fail(`eval ${item.id} contains a placeholder fixture: ${fixture}`);
      } else if ((fixture.startsWith('./') || fixture.startsWith('../')) && !fs.existsSync(path.resolve(root, fixture))) {
        fail(`eval ${item.id} fixture path does not exist: ${fixture}`);
      }
    }
  }
  const requiredCaseIds = [...(evals.positive ?? []).slice(0, 5), ...(evals.negative ?? []).slice(0, 3)].map((item) => item.id);
  for (const id of requiredCaseIds) {
    const resultRelative = `evals/results/${id}.json`;
    const resultPath = path.join(root, resultRelative);
    if (!fs.existsSync(resultPath)) {
      fail(`submission requires executed reviewer result ${resultRelative}`);
      continue;
    }
    let result;
    try {
      result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
    } catch (error) {
      fail(`${resultRelative} must be valid JSON: ${error.message}`);
      continue;
    }
    if (result.case_id !== id) fail(`${resultRelative} case_id must be ${id}`);
    if (result.plugin_version !== manifest.version) fail(`${resultRelative} plugin_version must match ${manifest.version}`);
    if (typeof result.prompt !== 'string' || !result.prompt.trim()) fail(`${resultRelative} must record the prompt`);
    if (typeof result.selected_skill !== 'string' || !result.selected_skill.trim()) fail(`${resultRelative} must record selected_skill`);
    if (!Array.isArray(result.commands)) fail(`${resultRelative} commands must be an array`);
    if (typeof result.outcome !== 'string' || !['pass', 'fail', 'blocked'].includes(result.outcome)) {
      fail(`${resultRelative} outcome must be pass, fail, or blocked`);
    }
    if (!Array.isArray(result.assertion_results) || result.assertion_results.length === 0) {
      fail(`${resultRelative} must include assertion_results`);
    }
    if (typeof result.captured_at !== 'string' || Number.isNaN(Date.parse(result.captured_at))) {
      fail(`${resultRelative} must include captured_at ISO timestamp`);
    }
  }
}

const textFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'dist') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (/\.(?:md|json|ya?ml|mjs|svg)$/.test(entry.name)) textFiles.push(absolute);
  }
}
walk(root);
for (const absolute of textFiles) {
  const body = fs.readFileSync(absolute, 'utf8');
  const relative = path.relative(root, absolute);
  const todoMarker = '[TO' + 'DO:';
  const macHome = '/' + 'Users/';
  const linuxHome = new RegExp('/' + 'home/[A-Za-z0-9_-]+/');
  if (body.includes(todoMarker) || body.includes(macHome) || linuxHome.test(body)) fail(`${relative} contains a placeholder or machine-specific path`);
  const privateKeyMarker = new RegExp('-{5}BEGIN (?:RSA |EC |OPENSSH )?' + 'PRIVATE KEY-{5}');
  if (privateKeyMarker.test(body)) fail(`${relative} contains private key material`);
}

for (const relative of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'TRADEMARKS.md', 'docs/standards-ip-policy.md']) requireFile(relative);

for (const absolute of textFiles) {
  const body = fs.readFileSync(absolute, 'utf8');
  const relative = path.relative(root, absolute);
  const retiredPublisher = new RegExp(String.fromCharCode(65, 114, 103, 101, 110, 116) + "\\s?" + "OS", "i");
  if (retiredPublisher.test(body)) fail(`${relative} contains retired publisher identity`);
  const broadMitClaim = 'everything is ' + 'MIT';
  const broadProofClaim = [
    110, 111, 116, 104, 105, 110, 103, 32, 97, 115, 115, 101, 114, 116, 101, 100,
    59, 32, 101, 118, 101, 114, 121, 116, 104, 105, 110, 103, 32, 112, 114, 111,
    118, 101, 110,
  ].map((c) => String.fromCharCode(c)).join("");
  const broadTrustClaim = 'no trust ' + 'required';
  if (body.includes(broadMitClaim)) fail(`${relative} contains overbroad MIT claim`);
  if (body.includes(broadProofClaim)) fail(`${relative} contains overbroad proof claim`);
  if (body.includes(broadTrustClaim)) fail(`${relative} contains overbroad trust claim`);
}

for (const field of ['websiteURL', 'privacyPolicyURL', 'termsOfServiceURL']) {
  if (!manifest.interface?.[field]) warnings.push(`submission listing still needs interface.${field}`);
}
const supportUrl = 'https://frontierinfra.org/support';
if (!read('docs/marketplace-submission.md').includes(supportUrl)) warnings.push('submission dossier still needs support URL');
if (checkLiveUrls) {
  const urls = [
    manifest.interface?.websiteURL,
    supportUrl,
    manifest.interface?.privacyPolicyURL,
    manifest.interface?.termsOfServiceURL,
  ].filter(Boolean);
  for (const url of urls) {
    try {
      let response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
      if (response.status === 405 || response.status === 403) {
        response = await fetch(url, { method: 'GET', redirect: 'follow' });
      }
      if (!response.ok) fail(`live URL check failed for ${url}: HTTP ${response.status}`);
    } catch (error) {
      fail(`live URL check failed for ${url}: ${error.message}`);
    }
  }
}
if (submission && warnings.length) errors.push(...warnings);

if (warnings.length) console.log(`WARN\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`FAIL (${errors.length})\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`PASS: ${manifest.name} ${manifest.version}; ${skillNames.length} skills; ${evals.positive.length} positive and ${evals.negative.length} negative case definitions`);
