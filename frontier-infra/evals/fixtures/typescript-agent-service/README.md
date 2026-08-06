# Reviewer fixture

This deliberately incomplete TypeScript service has an existing queue, database, and worker. A
Frontier integration should preserve those adapters while adding durable transitions, independent
verification, a governed effect boundary, receipts, and four-layer runtime health. It must not
pretend that installing `@frontier-infra/protocol` supplies the missing control loop.
