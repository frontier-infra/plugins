# Harness design dossier

## 1. Outcome and boundary

- User outcome:
- Durable mutations:
- Explicit non-goals:
- Deployment shape: `machine` / `orchestrator`
- Why this shape:

## 2. Trust roles

| Role | Identity | Authority | Must differ from |
| --- | --- | --- | --- |
| Contract proposer | | | Ratifier |
| Contract ratifier | | | Proposer |
| Worker | | | Result verifier |
| Result verifier | | | Worker |
| Operator | | | |

## 3. State machine

- Durable states:
- Allowed transitions:
- Terminal states:
- Write-ahead decision record:
- Kill/resume rule:

## 4. Ports and adapters

| Port | Contract | Implementation | Failure behavior |
| --- | --- | --- | --- |
| Queue | | | |
| Worker | | | |
| Verifier | | | |
| State store | | | |
| Governance gate | | | |
| Receipt sink | | | |
| Alert channel | | | |
| Ground-truth view | | | |

## 5. Governance

- Operator dial:
- Contract ceiling:
- Scoped verifier trust:
- Reversibility rule:
- Irreversible human gate:
- Override SLO and independent sink:
- Mutation-path inventory:

## 6. Operational controls

- Idempotency formula/store constraint:
- Attempt, time, compute, token, and spend budgets:
- Quarantine rule:
- Alert/ACK/throttle/halt chain:
- Critical-component health sources:
- Anomaly registry:

## 7. Evidence plan

- Acceptance checks:
- Chaos/replay fixtures:
- Gate allow/deny traces:
- Bypass negative tests:
- Receipt verification:
- Claimed shape/level, or `UNSCORED`:
