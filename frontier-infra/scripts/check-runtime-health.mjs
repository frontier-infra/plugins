#!/usr/bin/env node

import fs from 'node:fs';
import process from 'node:process';

import {
  evaluateRuntimeHealth,
  runtimeHealthExitCode,
} from '../assets/generated/runtime-health.mjs';

function usage() {
  console.error('Usage: node scripts/check-runtime-health.mjs <contract.json> [--pretty]');
}

const argv = process.argv.slice(2);
const pretty = argv.includes('--pretty');
const paths = argv.filter((arg) => arg !== '--pretty');
if (paths.length !== 1) {
  usage();
  process.exit(1);
}

let contract;
try {
  contract = JSON.parse(fs.readFileSync(paths[0], 'utf8'));
} catch (error) {
  console.error(JSON.stringify({ status: 'invalid', can_mutate: false, errors: [`unable to read JSON: ${error.message}`] }));
  process.exit(1);
}

const report = evaluateRuntimeHealth(contract);
console.log(JSON.stringify(report, null, pretty ? 2 : 0));
process.exit(runtimeHealthExitCode(report));
