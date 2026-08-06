# System architecture

This is a derived teaching summary. Canonical Machine obligations and conformance semantics live
in `frontier-infra/the-machine`. The `frontier-sdk` family owns shared application and adapter
protocol schemas, reference reducers, and conformance fixtures; this plugin carries locked
generated snapshots for offline use, but it must not become a parallel canonical standard.

## The six-box loop

| Box | Obligation | Failure test |
| --- | --- | --- |
| 0 — Contracted decomposition | A signed, unexpired contract is ratified by a judge distinct from its proposer; acceptance tests are immutable for the move. | Strip ratification or edit acceptance after dispatch; the driver must refuse. |
| 1 — Durable goal and state | Goal and transition state live outside any session and resume the same move after interruption. | Kill the driver mid-move; restart must not duplicate or invent work. |
| 2 — Dumb Driver | The control loop is a deterministic function of state, clock, and events and spends zero model tokens. | Replay identical inputs; transitions must match without a model call. |
| 3 — Fresh workers | Every move uses a new, bounded, contract-scoped session reconstructed from durable state. | Inspect session identities and context ceilings across retries. |
| 4 — Verify vs reality | A distinct verifier runs the contract checks against ground truth before success or durable effect. | Inject a lying worker or remove the verifier; mutation must be denied. |
| 5 — Autonomy and reversibility gate | Every mutation passes the single gate; effective authority is the minimum of operator dial, contract ceiling, and scoped verifier trust. | Attempt a bypass or claim a forged rollback; deny and receipt it. |

## Governance plane

All effects pass through the gate or a short-lived gate-issued token. The plane owns:

- autonomy ceilings;
- verifier qualification, scope, freshness, and trust;
- operator halt and dial-down override;
- contract status, hash, scope, expiry, and revocation;
- append-only, signature-chained governance events.

Required governance events include contract ratification/revocation, dial changes, override request/effect, and gate allow/deny/escalate decisions.

## Reversibility

Treat missing reversibility metadata as irreversible. A reversible action needs a `rollback_ref` that the verifier can resolve and validate. An irreversible action requires higher trust or a bounded human-gate receipt; expiry defaults to denial.

## Foundation services

1. **View layer:** machine-readable ground truth, preferably AVL.
2. **Stable identity:** deployment and scope identifiers on every worker, loop, and effect.
3. **Proof:** AAR receipts for material transitions and gate decisions.
4. **Contracts:** attempts, cost, concurrency, SLAs, and escalation checked before effects.
5. **Memory:** ingest verified outcomes, not worker narrative; monitor extraction staleness.
6. **Observability:** failure, quarantine, budget, and staleness alerts require acknowledgement.

## Operational obligations

- Deduplicate mutations with a store-enforced idempotency key.
- Quarantine terminally after the attempt or verification budget is exhausted.
- Escalate with an acknowledgement deadline, then throttle and halt.
- Govern attempts, tokens, time, compute, and spend.
- Continuously publish four-layer health: process, scheduler, execution, and governance. Aggregate status fails closed unless all four layers pass fresh checks; watch the watcher.
- Maintain a finite, testable anomaly registry including duplication, rate, resource saturation, and silent-organ failures.

## Deployment shapes

### Machine

Uses a zero-model-token Dumb Driver. A static architecture review can call it a Machine-shaped `structural candidate`; runtime evidence can earn `Machine-L0` through `Machine-L5`.

### Orchestrator

A model proposes an edge from a closed transition set. Deterministic code validates the edge, persists the decision before effects, and replays the decision log without reinvoking the model. It can earn `Orchestrator-L0` through `Orchestrator-L4`; it cannot claim the Dumb Driver guarantee or L5.

Never report a bare conformance level without its shape.
