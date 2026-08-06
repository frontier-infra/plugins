# Pattern catalog

## Contract → work → verify → gate → receipt

The contract fixes the target, the worker attempts it, the verifier checks reality, the governance gate decides whether an effect is authorized, and the receipt preserves the decision. Do not collapse any two trust roles simply because one process can technically perform them.

## Fat engine, thin skill

Put deterministic concerns—schemas, scoring bounds, allowed transitions, persistence, routing, retries, idempotency, and chain construction—in testable code. Leave fuzzy classification, synthesis, and proposal prose to bounded model workers.

## Closed transition set

Represent lifecycle states and legal edges explicitly. A model may propose an edge only when the orchestrator shape is intended. Code validates it, writes the decision ahead of the effect, and rejects invented states.

## Fresh-context burst

Reconstruct each worker from the contract, current durable state, required artifacts, and a context ceiling. Do not pass an ever-growing transcript between attempts.

## Fan-out / fan-in

Run independent research or verification lanes in parallel and make the downstream route depend on every required parent. Use dependency state rather than polling prose.

## Ports and adapters

Keep queue, worker, verifier, state store, alert channel, signer, and view layer behind narrow contracts. Vendor changes should be configuration or adapter changes, not control-loop rewrites.

## Idempotency + terminal quarantine

Compute the mutation identity from stable intent, reject a second active effect, and stop retrying when the budget is exhausted. Quarantine revokes capability and surfaces the reason; it is not another queue state.

## Gate-issued capability

When a side effect cannot synchronously call the governance gate, use a narrow, expiring, scope-bound token issued by the gate. Never allow a durable “admin bypass.”

## Reversibility as verified data

An action is reversible only when a rollback path exists and a distinct verifier confirms it. Treat asserted, missing, or broken rollback references as irreversible.

## Receipts-first memory

Memory may summarize or index verified receipts. It must not promote the worker's unverified narrative into durable organizational truth.

## Runtime health + staleness audit

Continuously check whether critical organs are alive across four layers: process, scheduler, execution, and governance. Aggregate health must fail closed unless every layer is fresh and passing; a live HTTP process must not mask a dead worker pool, provider auth or credit failure, stuck scheduler, or failed gate. Separately, on model or platform changes, rerun the original failure that justified each obligation without the scaffold; retire rules only when evidence supports it.

## Human gate at the irreversible boundary

Human approval belongs immediately before the irreversible or high-impact effect, after enough evidence exists to make the decision meaningful. Approval must expire and default-deny.
