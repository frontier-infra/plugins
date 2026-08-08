# Four-layer runtime health contract

The canonical schema, reference reducers (TypeScript and Python), and golden
fixtures live in `frontier-infra/frontier-sdk` and ship as the published
`@frontier-infra/protocol` package. This plugin includes locked offline
consumer snapshots generated from those SDK sources, so Codex can validate
runtime-health payloads without network access. Those snapshots are generated
copies only: canonical semantics remain SDK-owned and must not be edited in the
plugin independently.

From `frontier-sdk/`, regenerate and check the plugin snapshots with:

```bash
node scripts/sync-consumers.mjs ../plugins/frontier-infra
npm run check:consumers -- ../plugins/frontier-infra
```

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

Validate JSON contracts with the published reducer (`npm install @frontier-infra/protocol`):

```js
import { evaluateRuntimeHealth, runtimeHealthExitCode } from '@frontier-infra/protocol';
const report = evaluateRuntimeHealth(JSON.parse(fs.readFileSync(file, 'utf8')));
process.exitCode = runtimeHealthExitCode(report);
```

Exit codes: `0` for `pass` and `degraded`, `2` for blocked/propose-only/halted fail-closed states, `1` for invalid input.

## Required negative fixtures

Keep a provider-auth/credit failure fixture in your deployment's tests: service
heartbeat and scheduler alive, execution failing — it must aggregate `blocked`
with `can_mutate: false`. The canonical golden fixtures for this and the other
edge classes (mixed blocker vs propose-only, degraded optional check, invalid
structural evidence) ship in the `frontier-sdk` repo's
`conformance/runtime-health/` corpus and are enforced by the published
package's own test suite.
