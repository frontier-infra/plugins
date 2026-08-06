# Harness threat model

| Threat | Failure | Required control | Evidence |
| --- | --- | --- | --- |
| Self-grading | Worker declares itself done. | Distinct contract ratifier and result verifier. | Lying-worker test is denied. |
| Target capture | Planner writes easy acceptance tests. | Independent ratification and immutable test hash. | Unratified/edited contract is rejected. |
| Gate bypass | Connector, shell, DB, or background job mutates directly. | Single mutation gateway or expiring gate token. | Negative bypass test. |
| Duplicate effect | Retry creates a second workflow/message/record. | Store-enforced idempotency. | Concurrent replay produces one effect. |
| Infinite recovery | Failure burns time, money, or hardware. | Attempts/resource budgets and terminal quarantine. | Cap breach halts and alerts. |
| Stale authority | Dead verifier remains trusted. | Scoped freshness and runtime health. | Expired verifier forces propose-only. |
| Process-only health | Service heartbeat is green while scheduler, workers, provider auth/credit, or governance are dead. | Four-layer health with fail-closed aggregate status. | Provider credit/auth failure fixture fails aggregate health while process is alive. |
| Rollback forgery | Worker labels an irreversible action reversible. | Verifier-resolved rollback reference. | Forged reference receives irreversible treatment. |
| Operator lockout | Agent continues after halt. | Out-of-band override and independent receipt sink. | In-flight and future effects stop within SLO. |
| Prompt injection | Untrusted content expands authority. | Read-only intake, minimal tools, scope rails, post-research gate. | Injection fixture cannot select a privileged effect. |
| Receipt erasure | Halted scope deletes its own audit trail. | Append-only sink outside the governed scope. | Chain remains queryable after halt. |
| Verifier collusion | “Independent” verifier shares subject context or incentives. | Declare identity, principal, method, and independence class. | Record limitations; do not overclaim tier. |
| Secret leakage | Keys or private operational data enter prompts, logs, or public packages. | Operator-owned key paths, redaction, allowlist release. | Secret scan and tracked-file audit. |
