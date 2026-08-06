---
name: design-agent-governance
description: Design or review governance for an AI harness, including authority ceilings, verifier trust and freshness, mutation-path coverage, reversibility, human gates, operator override, audit receipts, budgets, escalation, and policy tests.
---

# Design agent governance

Read `../../references/system-architecture.md`, `../../references/threat-model.md`, and `../../docs/runtime-health-contract.md`. Use `../../assets/governance-policy.yaml` and `../../assets/runtime-health-manifest.yaml` as starting artifacts.

## Workflow

1. Inventory every durable mutation, including message sends, model calls with spend, queue creation, filesystem writes, database updates, background jobs, and reads with side effects.
2. Assign each action a scope, base trust requirement, reversibility status, verified rollback reference when applicable, and human-gate rule when irreversible.
3. Define `effective_autonomy = min(operator_dial, contract_ceiling, scoped_verifier_trust)` and calculate the required trust before every effect.
4. Make missing/stale/unqualified verifier trust zero and missing reversibility irreversible.
5. Route every path through one gate or an expiring scope-bound gate token. Prohibit durable admin bypasses.
6. Define contract ratification, hash, scope, expiry, revocation, and immutable acceptance enforcement at the driver boundary.
7. Provide out-of-band operator halt and dial-down with an independent receipt sink and a measured effect SLO.
8. Define append-only governance events, budgets, ACK escalation, quarantine, health, and anomaly policies.
9. Model runtime health as four layers: `process`, `scheduler`, `execution`, and `governance`. Aggregate health must fail closed unless all four layers have fresh passing checks; a green process heartbeat must not mask a dead scheduler, blocked provider execution, or missing gate.
10. Validate sample health contracts with the published reducer when a JSON health artifact exists (`npm install @frontier-infra/protocol` in the project):

   ```sh
   node -e "import('@frontier-infra/protocol').then(async ({evaluateRuntimeHealth}) => console.log(JSON.stringify(evaluateRuntimeHealth(JSON.parse(require('fs').readFileSync(process.argv[1],'utf8'))), null, 2)))" <health-contract.json>
   ```

11. Write allow, deny, expired-verifier, forged-rollback, expired-human-gate, direct-bypass, and dead-workforce health tests.

## Output

Return the governance policy, mutation matrix, trust-role matrix, event schema, runtime health contract, override runbook, and negative-test plan. Distinguish policy prose from deterministic enforcement.
