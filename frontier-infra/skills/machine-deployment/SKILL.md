---
name: machine-deployment
description: Implement, adapt, or harden a Frontier Infra Machine-shaped AI harness with a deterministic driver, durable state, fresh workers, independent verification, governance gates, budgets, quarantine, receipts, and runtime health.
---

# Deploy The Machine

Read `../../references/system-architecture.md`, `../../references/pattern-catalog.md`, and `../../references/threat-model.md`. If the control loop asks a model to choose the next transition, stop and use `conductor-pipeline` or explicitly redesign it as an orchestrator shape.

## Before implementation

Use `goal-contract` to produce a ratifiable contract with:

- one outcome-oriented definition of done;
- runnable acceptance checks and immutable constraints;
- an independently ratified contract (`ratified_by` differs from `proposed_by`) before commit-capable work;
- worker-run and wall-time budgets;
- a conservative initial autonomy ceiling (`0` / propose-only).

## Required deployment shape

1. Fill `../../assets/harness-design-dossier.md`; inventory every durable mutation path.
2. Define typed durable states, legal transitions, terminal quarantine, and write ordering.
3. Implement queue, worker, verifier, store, gate, receipt, alert, and ground-truth ports behind narrow adapters.
4. Persist before dispatch and before effects; enforce stable idempotency at the mutation store.
5. Start a new bounded worker for every attempt from contract plus current state, not transcript history.
6. Run contract checks in a distinct verifier and hard-deny success or mutation when it is absent, stale, or failed.
7. Evaluate operator dial, contract ceiling, scoped verifier trust, and verified reversibility at the single mutation gate.
8. Enforce attempt/resource budgets, acknowledgement escalation, terminal quarantine, and out-of-band override.
9. Emit receipts for transitions and gate decisions; publish health for every critical organ and the monitor itself.
10. Implement runtime health as four independent layers: process heartbeat, scheduler work-claim path, representative execution path, and governance gate path. Aggregate status must fail closed unless every layer passes a fresh check.

## Verification

Hand off to `machine-conformance` for scoring. At minimum run kill/resume, duplicate replay, lying-worker, missing/stale-verifier, forged-rollback, cap/quarantine, override, bypass, and dead-workforce health fixtures before claiming enforcement.

Validate runtime health with the published reducer — add `@frontier-infra/protocol`
to the deployment and evaluate records with `evaluateRuntimeHealth` /
`runtimeHealthExitCode`. Score the repository with the published CLI, which
bundles The Machine's static kit:

```sh
npx -y @frontier-infra/audit run <path-to-deployment-repo> --out <dir-outside-that-repo>
```

Treat the generated evidence packet as the source for conformance claims. Static implementation review establishes only a `structural candidate`; a README claim or a passing happy path does not establish a Machine level.

## Boundaries

- Start in propose-only mode; do not change to commit mode without a verified contract and operator authority.
- Requeue failed work only within a fixed budget; quarantine and surface repeated failures.
- Do not treat driver hash-chain logs as canonical AARs unless they are actually shaped, signed, and independently verified as AARs.
