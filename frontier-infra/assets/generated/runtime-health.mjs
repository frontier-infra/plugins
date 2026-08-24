// GENERATED SNAPSHOT — do not edit.
// Canonical source: https://github.com/frontier-infra/frontier-sdk
// Source SHA-256: 174ef1d6e18587dc3d9c1366a1ca1117495814e9125a8988adf12e7c343ccc46

import { createHash } from 'node:crypto';

export const PROTOCOL_PACKAGE_VERSION = '0.1.0';
export const RUNTIME_HEALTH_SCHEMA_VERSION = 'frontier.machine.health.v1';
export const WORKER_AUTHORITY_MANIFEST_SCHEMA_VERSION = 'frontier.worker_authority_manifest.v1';
export const RUNTIME_HEALTH_LAYERS = Object.freeze(['process', 'scheduler', 'execution', 'governance']);
export const RUNTIME_HEALTH_STATUS_PRECEDENCE = Object.freeze([
  'halted',
  'blocked',
  'propose_only',
  'degraded',
  'pass',
]);

const allowedTopLevelFields = new Set(['schema_version', 'deployment_id', 'checked_at', 'layers', 'aggregate_policy']);
const workerAuthorityTopLevelFields = Object.freeze([
  'schemaVersion',
  'workerClass',
  'scope',
  'availability',
  'workingMode',
  'autonomyCeilingBps',
  'grants',
  'denies',
]);
const workerAuthorityClassFields = Object.freeze(['id', 'version', 'jobHash', 'limitsHash', 'testsHash']);
const workerAuthorityScopeFields = Object.freeze(['workspace', 'tenant']);
const workerAuthorityGrantFields = Object.freeze([
  'identity',
  'resource',
  'tool',
  'capability',
  'action',
  'accessMode',
  'approval',
  'scope',
  'constraintHash',
]);
const workerAuthorityDenyFields = Object.freeze([
  'identity',
  'resource',
  'tool',
  'capability',
  'action',
  'scope',
  'constraintHash',
]);
const workerAuthorityAvailability = new Set(['active', 'inactive']);
const workerAuthorityWorkingModes = new Set(['practice', 'shadow', 'supervised', 'live']);
const workerAuthorityAccessModes = new Set(['read', 'write', 'full', 'admin', 'off']);
const workerAuthorityApprovals = new Set(['none', 'required', 'operator', 'policy', 'two_person']);
const workerAuthorityForbiddenKeys = new Set([
  'apiKey',
  'authorization',
  'bearer',
  'clientSecret',
  'config',
  'content',
  'cookie',
  'credential',
  'credentials',
  'host',
  'hostId',
  'idToken',
  'model',
  'modelId',
  'modelProvider',
  'modelReceipt',
  'password',
  'privateKey',
  'provider',
  'providerId',
  'rawConfig',
  'rawContent',
  'refreshToken',
  'secret',
  'signingKey',
  'token',
]);
const workerAuthoritySafeIdPattern = /^[A-Za-z0-9][A-Za-z0-9._:@/*-]{0,191}$/;
const sha256Pattern = /^sha256:[0-9a-f]{64}$/;
const credentialValuePattern = /(?:\b(?:Bearer|Basic)\s+[^\s,;]+|\b(?:sk|tok)[_-][A-Za-z0-9][A-Za-z0-9_-]{7,}\b|\bAKIA[0-9A-Z]{8,}\b|\bghp_[A-Za-z0-9_]{8,}\b|\bgithub_pat_[A-Za-z0-9_]{16,}\b|[?&](?:access[_-]?token|api[_-]?key|token)=[^\s&#]+)/i;
const proposeOnlyReasons = new Set(['missing_verifier', 'stale_verifier', 'unratified_contract']);
const haltedReasons = new Set(['active_override', 'no_ack_halt']);
const blockedReasons = new Set(['auth_failed', 'credit_exhausted', 'scheduler_stalled', 'worker_unavailable']);
const allowedReasonCodes = new Set([
  ...proposeOnlyReasons,
  ...haltedReasons,
  ...blockedReasons,
  'governance_gate_failed',
]);

function parseTimestamp(value, path, errors) {
  if (typeof value !== 'string') {
    errors.push(`${path} must be an ISO timestamp string`);
    return null;
  }
  const millis = Date.parse(value);
  if (Number.isNaN(millis)) {
    errors.push(`${path} must be a valid ISO timestamp`);
    return null;
  }
  return millis;
}

function classifyIssue({ buckets, critical, layerName, message, reasonCode }) {
  const rendered = `${layerName}: ${message}`;
  if (haltedReasons.has(reasonCode)) {
    buckets.halted.push(`${rendered} (${reasonCode})`);
    return 'fail';
  }
  if (blockedReasons.has(reasonCode)) {
    buckets.blockers.push(`${rendered} (${reasonCode})`);
    return 'fail';
  }
  if (proposeOnlyReasons.has(reasonCode)) {
    buckets.proposeOnly.push(`${rendered} (${reasonCode})`);
    return 'fail';
  }
  if (critical) {
    buckets.blockers.push(`${rendered}${reasonCode ? ` (${reasonCode})` : ''}`);
    return 'fail';
  }
  buckets.degraded.push(rendered);
  return 'degraded';
}

function emptyInvalidReport(errors) {
  return {
    status: 'invalid',
    schema_version: null,
    aggregate: 'invalid',
    can_mutate: false,
    deployment_id: null,
    checked_at: null,
    layers: {},
    errors,
    failures: [],
    blockers: [],
    propose_only: [],
    halted: [],
    degraded: [],
    rule: 'process, scheduler, execution, and governance must all pass fresh critical checks; can_mutate is true on pass or degraded',
  };
}

function failWorkerAuthority(message) {
  throw new TypeError(message);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`;
  return `{${Object.keys(value).sort(asciiCompare).map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

function asciiCompare(left, right) {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const leftCode = left.charCodeAt(index);
    const rightCode = right.charCodeAt(index);
    if (leftCode !== rightCode) return leftCode - rightCode;
  }
  return left.length - right.length;
}

function assertSecretFree(value, path = 'manifest') {
  if (typeof value === 'string') {
    if (credentialValuePattern.test(value)) failWorkerAuthority(`${path} must not contain raw credentials or tokens`);
    return;
  }
  if (!value || typeof value !== 'object') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => assertSecretFree(item, `${path}[${index}]`));
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (workerAuthorityForbiddenKeys.has(key)) failWorkerAuthority(`${path}.${key} is forbidden authority material`);
    assertSecretFree(child, `${path}.${key}`);
  }
}

function assertExactObject(value, keys, path) {
  if (!isPlainObject(value)) failWorkerAuthority(`${path} must be an object`);
  const allowed = new Set(keys);
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) failWorkerAuthority(`${path} has unexpected key ${key}`);
  }
  for (const key of keys) {
    if (!(key in value)) failWorkerAuthority(`${path}.${key} is required`);
  }
}

function assertSafeString(value, path) {
  if (typeof value !== 'string' || !workerAuthoritySafeIdPattern.test(value)) {
    failWorkerAuthority(`${path} must be a safe non-empty identifier`);
  }
  return value;
}

function assertSha256(value, path) {
  if (typeof value !== 'string' || !sha256Pattern.test(value)) {
    failWorkerAuthority(`${path} must be sha256:<64 lowercase hex>`);
  }
  return value;
}

function assertAutonomyCeilingBps(value) {
  if (
    typeof value !== 'number'
    || !Number.isFinite(value)
    || !Number.isInteger(value)
    || Object.is(value, -0)
    || value < 0
    || value > 10000
  ) {
    failWorkerAuthority('autonomyCeilingBps must be an integer between 0 and 10000');
  }
  return value;
}

function normalizeWorkerAuthorityGrant(grant, index) {
  const path = `grants[${index}]`;
  assertExactObject(grant, workerAuthorityGrantFields, path);
  const normalized = {
    identity: assertSafeString(grant.identity, `${path}.identity`),
    resource: assertSafeString(grant.resource, `${path}.resource`),
    tool: assertSafeString(grant.tool, `${path}.tool`),
    capability: assertSafeString(grant.capability, `${path}.capability`),
    action: assertSafeString(grant.action, `${path}.action`),
    accessMode: grant.accessMode,
    approval: grant.approval,
    scope: assertSafeString(grant.scope, `${path}.scope`),
    constraintHash: assertSha256(grant.constraintHash, `${path}.constraintHash`),
  };
  if (!workerAuthorityAccessModes.has(normalized.accessMode)) failWorkerAuthority(`${path}.accessMode is not recognized`);
  if (!workerAuthorityApprovals.has(normalized.approval)) failWorkerAuthority(`${path}.approval is not recognized`);
  return normalized;
}

function normalizeWorkerAuthorityDeny(deny, index) {
  const path = `denies[${index}]`;
  assertExactObject(deny, workerAuthorityDenyFields, path);
  return {
    identity: assertSafeString(deny.identity, `${path}.identity`),
    resource: assertSafeString(deny.resource, `${path}.resource`),
    tool: assertSafeString(deny.tool, `${path}.tool`),
    capability: assertSafeString(deny.capability, `${path}.capability`),
    action: assertSafeString(deny.action, `${path}.action`),
    scope: assertSafeString(deny.scope, `${path}.scope`),
    constraintHash: assertSha256(deny.constraintHash, `${path}.constraintHash`),
  };
}

function workerAuthorityTargetKey(entry) {
  return [
    entry.resource,
    entry.tool,
    entry.capability,
    entry.action,
    entry.scope,
  ].join('\u0000');
}

function workerAuthoritySortKey(entry) {
  return stableStringify(entry);
}

function sortByCanonicalFields(left, right) {
  return asciiCompare(workerAuthoritySortKey(left), workerAuthoritySortKey(right));
}

function assertUniqueWorkerAuthorityEntries(grants, denies) {
  const grantFullKeys = new Set();
  for (const grant of grants) {
    const fullKey = stableStringify(grant);
    if (grantFullKeys.has(fullKey)) failWorkerAuthority(`duplicate grant ${workerAuthorityTargetKey(grant).replaceAll('\u0000', '/')}`);
    grantFullKeys.add(fullKey);
  }

  const denyFullKeys = new Set();
  for (const deny of denies) {
    const fullKey = stableStringify(deny);
    if (denyFullKeys.has(fullKey)) failWorkerAuthority(`duplicate deny ${workerAuthorityTargetKey(deny).replaceAll('\u0000', '/')}`);
    denyFullKeys.add(fullKey);
  }

  const identities = new Set();
  for (const entry of [...grants, ...denies]) {
    if (identities.has(entry.identity)) failWorkerAuthority(`duplicate authority entry identity ${entry.identity}`);
    identities.add(entry.identity);
  }

  const grantTargets = new Map();
  for (const grant of grants) {
    const targetKey = workerAuthorityTargetKey(grant);
    const fullKey = `${targetKey}\u0000${grant.identity}\u0000${grant.accessMode}\u0000${grant.approval}\u0000${grant.constraintHash}`;
    if (grantTargets.has(targetKey) && grantTargets.get(targetKey) !== fullKey) {
      failWorkerAuthority(`conflicting grant ${targetKey.replaceAll('\u0000', '/')}`);
    }
    grantTargets.set(targetKey, fullKey);
  }

  const denyTargets = new Set();
  for (const deny of denies) {
    const targetKey = workerAuthorityTargetKey(deny);
    if (denyTargets.has(targetKey)) failWorkerAuthority(`conflicting deny ${targetKey.replaceAll('\u0000', '/')}`);
    if (grantTargets.has(targetKey)) failWorkerAuthority(`conflicting grant/deny ${targetKey.replaceAll('\u0000', '/')}`);
    denyTargets.add(targetKey);
  }
}

export function normalizeWorkerAuthorityManifest(manifest) {
  assertSecretFree(manifest);
  assertExactObject(manifest, workerAuthorityTopLevelFields, 'manifest');
  if (manifest.schemaVersion !== WORKER_AUTHORITY_MANIFEST_SCHEMA_VERSION) {
    failWorkerAuthority(`schemaVersion must be ${WORKER_AUTHORITY_MANIFEST_SCHEMA_VERSION}`);
  }

  assertExactObject(manifest.workerClass, workerAuthorityClassFields, 'workerClass');
  assertExactObject(manifest.scope, workerAuthorityScopeFields, 'scope');
  if (!workerAuthorityAvailability.has(manifest.availability)) failWorkerAuthority('availability is not recognized');
  if (!workerAuthorityWorkingModes.has(manifest.workingMode)) failWorkerAuthority('workingMode is not recognized');
  if (!Array.isArray(manifest.grants)) failWorkerAuthority('grants must be an array');
  if (!Array.isArray(manifest.denies)) failWorkerAuthority('denies must be an array');

  const normalized = {
    schemaVersion: WORKER_AUTHORITY_MANIFEST_SCHEMA_VERSION,
    workerClass: {
      id: assertSafeString(manifest.workerClass.id, 'workerClass.id'),
      version: assertSafeString(manifest.workerClass.version, 'workerClass.version'),
      jobHash: assertSha256(manifest.workerClass.jobHash, 'workerClass.jobHash'),
      limitsHash: assertSha256(manifest.workerClass.limitsHash, 'workerClass.limitsHash'),
      testsHash: assertSha256(manifest.workerClass.testsHash, 'workerClass.testsHash'),
    },
    scope: {
      workspace: assertSafeString(manifest.scope.workspace, 'scope.workspace'),
      tenant: assertSafeString(manifest.scope.tenant, 'scope.tenant'),
    },
    availability: manifest.availability,
    workingMode: manifest.workingMode,
    autonomyCeilingBps: assertAutonomyCeilingBps(manifest.autonomyCeilingBps),
    grants: manifest.grants.map(normalizeWorkerAuthorityGrant).sort(sortByCanonicalFields),
    denies: manifest.denies.map(normalizeWorkerAuthorityDeny).sort(sortByCanonicalFields),
  };
  assertUniqueWorkerAuthorityEntries(normalized.grants, normalized.denies);
  return normalized;
}

export function fingerprintWorkerAuthorityManifest(manifest) {
  const normalized = normalizeWorkerAuthorityManifest(manifest);
  return `sha256:${createHash('sha256').update(stableStringify(normalized)).digest('hex')}`;
}

export function verifyWorkerAuthorityManifest(manifest) {
  try {
    const normalized = normalizeWorkerAuthorityManifest(manifest);
    return {
      ok: true,
      manifest: normalized,
      fingerprint: fingerprintWorkerAuthorityManifest(normalized),
      errors: [],
    };
  } catch (error) {
    return {
      ok: false,
      manifest: null,
      fingerprint: null,
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

export function evaluateRuntimeHealth(contract) {
  if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
    return emptyInvalidReport(['contract must be a JSON object']);
  }

  const errors = [];
  const failures = [];
  const buckets = { blockers: [], proposeOnly: [], halted: [], degraded: [] };
  const checkedAt = parseTimestamp(contract.checked_at, 'checked_at', errors);

  for (const field of Object.keys(contract)) {
    if (!allowedTopLevelFields.has(field)) errors.push(`unexpected top-level field ${field}`);
  }
  if (typeof contract.deployment_id !== 'string' || !contract.deployment_id.trim()) {
    errors.push('deployment_id must be a non-empty string');
  }
  if (contract.schema_version !== RUNTIME_HEALTH_SCHEMA_VERSION) {
    errors.push(`schema_version must be ${RUNTIME_HEALTH_SCHEMA_VERSION}`);
  }
  if (!contract.layers || typeof contract.layers !== 'object' || Array.isArray(contract.layers)) {
    errors.push('layers must be an object');
  } else {
    for (const layerName of Object.keys(contract.layers)) {
      if (!RUNTIME_HEALTH_LAYERS.includes(layerName)) errors.push(`unexpected layer ${layerName}`);
    }
  }
  if (contract.aggregate_policy !== undefined) {
    if (!contract.aggregate_policy || typeof contract.aggregate_policy !== 'object' || Array.isArray(contract.aggregate_policy)) {
      errors.push('aggregate_policy must be an object');
    } else {
      if (contract.aggregate_policy.status !== undefined && contract.aggregate_policy.status !== 'fail_closed') {
        errors.push('aggregate_policy.status must be fail_closed');
      }
      for (const field of ['rule', 'warning']) {
        if (contract.aggregate_policy[field] !== undefined && typeof contract.aggregate_policy[field] !== 'string') {
          errors.push(`aggregate_policy.${field} must be a string`);
        }
      }
    }
  }

  const layerResults = {};
  for (const layerName of RUNTIME_HEALTH_LAYERS) {
    const layer = contract.layers?.[layerName];
    const layerFailures = [];
    let layerHardFailure = false;
    let layerDegraded = false;

    if (!layer || typeof layer !== 'object' || Array.isArray(layer)) {
      layerFailures.push('missing layer');
      buckets.blockers.push(`${layerName}: missing layer`);
      layerResults[layerName] = { status: 'fail', failures: layerFailures };
      continue;
    }
    if (!Array.isArray(layer.checks) || layer.checks.length === 0) {
      layerFailures.push('no checks');
      buckets.blockers.push(`${layerName}: no checks`);
      layerResults[layerName] = { status: 'fail', failures: layerFailures };
      continue;
    }

    for (const [index, check] of layer.checks.entries()) {
      const prefix = `${layerName}.checks[${index}]`;
      const structuralFailure = (message) => {
        layerFailures.push(message);
        errors.push(message);
      };
      if (!check || typeof check !== 'object' || Array.isArray(check)) {
        structuralFailure(`${prefix} must be an object`);
        continue;
      }
      if (typeof check.id !== 'string' || !check.id.trim()) structuralFailure(`${prefix}.id missing`);
      if (!['pass', 'fail', 'unknown'].includes(check.status)) structuralFailure(`${prefix}.status must be pass, fail, or unknown`);
      if (check.critical !== undefined && typeof check.critical !== 'boolean') structuralFailure(`${prefix}.critical must be a boolean`);
      const critical = check.critical !== false;
      const reasonCode = typeof check.reason_code === 'string' ? check.reason_code : null;
      if (check.reason_code !== undefined && (!reasonCode || !allowedReasonCodes.has(reasonCode))) {
        structuralFailure(`${prefix}.reason_code is not recognized`);
      }
      if (check.degradation_code !== undefined && typeof check.degradation_code !== 'string') {
        structuralFailure(`${prefix}.degradation_code must be a string`);
      }
      if (check.evidence !== undefined && typeof check.evidence !== 'string') {
        structuralFailure(`${prefix}.evidence must be a string`);
      }

      const classify = (message) => {
        const classification = classifyIssue({ buckets, critical, layerName, message, reasonCode });
        layerHardFailure ||= classification === 'fail';
        layerDegraded ||= classification === 'degraded';
      };

      if (check.status === 'fail' || check.status === 'unknown') {
        const message = `${check.id ?? prefix} status ${check.status}`;
        layerFailures.push(message);
        classify(message);
      }

      const observedAt = parseTimestamp(check.observed_at, `${prefix}.observed_at`, errors);
      if (!Number.isInteger(check.stale_after_seconds) || check.stale_after_seconds < 1) {
        structuralFailure(`${prefix}.stale_after_seconds must be a positive integer`);
      } else if (checkedAt !== null && observedAt !== null) {
        const ageSeconds = Math.floor((checkedAt - observedAt) / 1000);
        if (ageSeconds < 0) {
          const message = `${check.id ?? prefix} observed_at is after checked_at`;
          layerFailures.push(message);
          classify(message);
        }
        if (ageSeconds > check.stale_after_seconds) {
          const message = `${check.id ?? prefix} stale by ${ageSeconds - check.stale_after_seconds}s`;
          layerFailures.push(message);
          classify(message);
        }
      }
      if (typeof check.summary !== 'string' || !check.summary.trim()) structuralFailure(`${prefix}.summary missing`);
    }

    for (const failure of layerFailures) failures.push(`${layerName}: ${failure}`);
    layerResults[layerName] = {
      status: layerHardFailure ? 'fail' : layerDegraded ? 'degraded' : layerFailures.length === 0 ? 'pass' : 'fail',
      failures: layerFailures,
    };
  }

  const status = errors.length > 0
    ? 'invalid'
    : buckets.halted.length > 0
      ? 'halted'
      : buckets.blockers.length > 0
        ? 'blocked'
        : buckets.proposeOnly.length > 0
          ? 'propose_only'
          : buckets.degraded.length > 0
            ? 'degraded'
            : 'pass';

  return {
    status,
    schema_version: contract.schema_version ?? null,
    aggregate: status === 'pass' ? 'pass' : status,
    can_mutate: status === 'pass' || status === 'degraded',
    deployment_id: contract.deployment_id ?? null,
    checked_at: contract.checked_at ?? null,
    layers: layerResults,
    errors,
    failures,
    blockers: buckets.blockers,
    propose_only: buckets.proposeOnly,
    halted: buckets.halted,
    degraded: buckets.degraded,
    rule: 'process, scheduler, execution, and governance must all pass fresh critical checks; can_mutate is true on pass or degraded',
  };
}

export function runtimeHealthExitCode(report) {
  if (report.status === 'pass' || report.status === 'degraded') return 0;
  if (['blocked', 'propose_only', 'halted'].includes(report.status)) return 2;
  return 1;
}
