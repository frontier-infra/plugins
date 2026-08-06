# Four-layer runtime health contract

The editable schema, reference reducers, and golden fixtures live in
`frontier-infra/frontier-sdk`. This plugin bundles generated snapshots pinned by
`assets/protocol-lock.json`; do not edit those snapshots directly. Refresh them with the SDK's
`scripts/sync-consumers.mjs` command.

Use `frontier.machine.health.v1` when a harness must prove that "service alive" means more
than an HTTP process heartbeat.

## Layers

| Layer | Question | Example check |
| --- | --- | --- |
| `process` | Is the service process alive? | Heartbeat or local supervisor status. |
| `scheduler` | Can due work be claimed and advanced? | Queue claim plus ACK path. |
| `execution` | Can representative work actually run? | Provider-backed worker smoke, including auth and credit paths. |
| `governance` | Can the gate allow, deny, halt, and record decisions? | Unauthorized mutation denial with audit event. |

## Aggregate rule

`can_mutate` is `true` only when all four layers have fresh passing critical
checks. Missing, stale, `unknown`, or failed critical checks fail closed:

- `halted` for active operator override or no-ACK halt.
- `blocked` for dead scheduler/execution, unknown critical checks, or provider auth/credit exhaustion.
- `propose_only` for missing/stale verifier evidence or an unratified contract, only when execution remains capable.
- `degraded` for failed, unknown, or stale non-critical checks while every critical prerequisite still passes.

Process alive cannot mask a dead workforce.
Precedence is `halted > blocked > propose_only > degraded > pass`.

Validate JSON contracts with the bundled stdlib checker:

```sh
node scripts/check-runtime-health.mjs evals/fixtures/runtime-health/healthy.json --pretty
```

The checker exits `0` for `pass` and `degraded`, `2` for blocked/propose-only/halted fail-closed states, and `1` for invalid input.

## Required negative fixture

Keep a provider-auth/credit failure fixture where the service heartbeat and
scheduler are alive but execution fails. The bundled
`evals/fixtures/runtime-health/provider-credit-auth-failure.json` models the
provider credit/auth class of failure and must remain aggregate `blocked` with `can_mutate: false`.
The `mixed-blocker-propose-only.json` fixture must remain `blocked`, proving
execution blockers outrank propose-only governance gaps. The
`degraded-optional-check.json` fixture must remain `degraded` with
`can_mutate: true`.

The `invalid-structural-evidence.json` fixture and validator-generated
mutations prove that a `pass` label cannot authorize mutation when required
summary or freshness evidence is missing, a reason code is outside the
contract vocabulary, an observation claims to come from the future, or an
unknown top-level field/layer attempts to extend the versioned contract.
