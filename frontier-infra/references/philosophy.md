# Frontier Infra philosophy

## Vocabulary

- **Harness:** the durable system around model calls.
- **Workflow:** the work being performed.
- **Deployment:** a concrete wiring of workers, state, verification, channels, and gates.
- **Worker:** a replaceable model session scoped to one move.
- **Reality:** the external state against which a claim can be checked.

## Builder boundary

The coding assistant using this field kit is the developer of the target
application, not a worker inside that application. Frontier's worker,
verifier, contract, gate, health, and receipt requirements describe the
software being built and its runtime principals.

Use the same distinction as any other SDK: a developer building a game is not
one of its NPCs. Do not turn the interactive coding session into a Frontier
deployment, ratify the developer's task, govern host-tool permissions, audit
the plugin distribution, or issue receipts for the patch merely because this
plugin is installed.

The boundary changes only when one of these is explicit:

- the user asks to govern, contract, audit, or attest the current development
  process itself;
- ADL, Proctor, Maintainer Gates, or another enforcement integration is
  actually installed for that process; or
- the finished application deliberately invokes the same provider through a
  runtime worker adapter. Those runtime invocations are workers; the
  interactive developer remains outside the runtime.

## The four foundation principles

1. **Independent Judgment** — the subject and judge differ at contract ratification and result verification.
2. **Reality Over Narrative** — observed, measured, or independently verified state outranks the worker's account.
3. **State Over Session** — goals, decisions, memory, and receipts survive worker and conversation loss.
4. **Autonomy Is Earned** — authority is justified by scoped, fresh verifier trust and a ratified ceiling.

## The structural law

`verifier != subject` applies twice:

- **Before work:** the party that proposes “done” does not ratify it.
- **After work:** the party that performs the work does not judge the result.

Without the first separation, a system can verify perfectly against a self-serving target. Without the second, it merely self-grades execution.

## What the standards do not claim

- A signature proves who signed a record and protects its integrity; it does not make weak evidence true.
- A model chosen as a verifier is independent only to the degree its identity, context, authority, and incentives are actually separated.
- A dashboard is not a gate. Observability after a mutation does not govern the mutation.
- Retries are not resilience without idempotency, budgets, quarantine, and escalation.
- A model-driven coordinator is not a Dumb Driver. It may be an auditable orchestrator if its finite transitions are validated, write-ahead persisted, and replayed without another model call.

## Design posture

Prefer falsifiable obligations to architectural resemblance. Every important claim should name the check that could prove it false. When enforcement is absent or stale, authority falls to propose-only.
