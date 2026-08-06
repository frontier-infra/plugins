---
name: machine-conformance
description: Audit, score, or challenge an existing AI harness against Frontier Infra The Machine, determine Machine versus Orchestrator shape, run the canonical kit, gather evidence, design chaos tests, and prevent unsupported conformance claims.
---

# Audit Machine conformance

Read `../../references/conformance.md`, `../../references/system-architecture.md`, and `../../references/threat-model.md`.

Audit an explicitly identified target deployment. Do not automatically score
the repository being edited, the builder's process, this plugin, or the SDK's
distribution as a condition of using Frontier to build an application.

## Workflow

1. Audit the deployment wiring, not a standard, library, diagram, or README.
2. Determine shape from executed control flow: zero-token deterministic driver versus model-selected closed transitions with write-ahead decision persistence.
3. Inventory code/config for every box, governance control, foundation service, operational obligation, critical component, and mutation path.
4. Treat prose as a claim to test. Cite concrete file/config/runtime evidence.
5. Run the published conformance CLI — it bundles The Machine's static kit; do not hunt for a checked-out kit or recreate scoring logic:

   ```sh
   npx -y @frontier-infra/audit run <deployment-repository> --out <dir-outside-that-repo>
   ```

6. Execute or mark `NOT-RUN` the kill/resume, replay, lying-worker, verifier removal/staleness, duplicate effect, quarantine, budget, override, forged rollback, bypass, and dead-workforce health fixtures.
7. Verify receipt chains and health timestamps; confirm the audit sink survives operator halt of the deployment scope. If the deployment emits the four-layer runtime health contract, evaluate it with the published reducer (`npm install @frontier-infra/protocol`, then `evaluateRuntimeHealth(record)`) and treat any non-pass aggregate as fail-closed.
8. Report a deployment as a `structural candidate` when only static architecture/code mapping has been reviewed. Report a shape-stamped conformance level only when the required runtime evidence passes. Otherwise report current evidence, gaps, and the next lowest-cost falsifying test.

## Output

Return an obligation matrix with `PASS`, `FAIL`, or `NOT-RUN`; evidence locations; executed commands; limitations; spec/kit versions; and a dated claim or explicit `UNSCORED` verdict.
