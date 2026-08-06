---
name: design-agent-harness
description: Architect a new AI agent harness or redesign an unreliable loop, including trust roles, durable state, transition shape, worker isolation, verification, governance, ports, budgets, runtime health, threats, and evidence.
---

# Design an agent harness

Read these references before designing:

- `../../references/philosophy.md`
- `../../references/system-architecture.md`
- `../../references/pattern-catalog.md`
- `../../references/threat-model.md`

Use `../../assets/harness-design-dossier.md` as the output structure.

## Workflow

1. Define the user outcome, durable mutations, explicit non-goals, tolerated latency/cost, and failure history.
2. Classify the shape. Choose `machine` only when the driver can be model-free. Choose `orchestrator` when a model selects from a closed transition set and the choice is validated and write-ahead persisted.
3. Separate contract proposer, contract ratifier, worker, result verifier, operator, signer, and receipt sink. Record any unavoidable shared principal or failure domain.
4. Model durable states, allowed edges, terminal states, and exact persist-before-effect ordering.
5. Define narrow ports for queue, worker, verifier, state, governance, receipts, alerts, and ground-truth views.
6. Specify the contract grammar, context reconstruction, idempotency identity, budgets, quarantine, escalation, and override behavior.
7. Design governance with `design-agent-governance`; treat reversibility as verified data.
8. Add continuous component health, a watched watcher, anomaly fixtures, and a quarterly obligation retirement test.
9. Map each important claim to a self-test, chaos fixture, or external check. Keep the intended conformance claim `UNSCORED` until evidence exists.

## Output

Return the completed dossier, a short architecture decision summary, the first thin vertical slice, its acceptance/chaos tests, and the controls deliberately deferred. Flag assumptions that materially change trust or authority.

Do not produce implementation code until the trust roles, mutation paths, state machine, and verification source are concrete enough to test.
