# Use-case inventory

| User goal | Example request | Result | Capability | Safety boundary | v0.2 |
| --- | --- | --- | --- | --- | --- |
| Learn the system | “Why isn't the prompt the OS?” | Accurate philosophy and boundaries. | `frontier-router` | Do not turn doctrine into unsupported product claims. | Supported |
| Choose components | “Do I need AVL, AAR, or The Machine?” | Minimal component map and adoption path. | `frontier-router` | Distinguish standards, deployments, and experiments. | Supported |
| Design a harness | “Architect a reliable coding-agent loop.” | Complete design dossier and thin slice. | `design-agent-harness` | No implementation before trust/mutation model is testable. | Supported |
| Govern authority | “How should agents earn write access?” | Governance policy and negative tests. | `design-agent-governance` | Missing verifier/reversibility defaults closed. | Supported |
| Ratify work | “Lock this task before an agent starts.” | Bounded draft contract. | `goal-contract` | Never fabricate ratification or signatures. | Supported |
| Build a Machine | “Implement a resumable verified driver.” | Machine-shaped harness implementation. | `machine-deployment` | Model-free control loop required for Machine shape; static review is only a structural candidate. | Supported |
| Audit a harness | “Does this actually conform?” | PASS/FAIL/NOT-RUN matrix and shaped verdict. | `machine-conformance` | Evidence over README claims; missing fixtures stay `NOT-RUN`. | Supported |
| Build an orchestrator | “Adapt Conductor to security triage.” | Config/engine/skill/gate design. | `conductor-pipeline` | Orchestrator-L4 ceiling; untrusted intake is read-only. | Supported |
| Expose site ground truth | “Make my product agent-readable.” | AVL implementation and validator evidence. | `avl-adoption` | Auth stays server-side; declared actions are not authorization. | Supported |
| Prove an outcome | “Issue a signed receipt for this deploy.” | Verified AAR and limitations. | `aar-attestation` | Operator retains private key; signature is not truth. | Supported |
| Govern a repository | “Install safe multi-agent PR operations.” | Blueprint manifest, gates, and verification. | `maintainer-gates` | Target patterns reviewed before enabling. | Supported |
| Dispatch remote workers | “Run this on my T3 node.” | Remote task execution. | MCP/Switchyard | Credentials and external side effects. | Deferred |
| Sign with hosted identity | “Sign this using Frontier Infra.” | Hosted signature. | Hosted service | Custody, auth, audit, liability. | Intentionally excluded |
| Auto-promote autonomy | “Raise agents to full write automatically.” | Trust-ledger action. | Future governance service | Needs scoped, fresh performance evidence and rollback controls. | Deferred |

## Expected indirect requests

The plugin should also recognize requests framed without Frontier vocabulary: preventing agent self-grading, resuming after crashes, stopping duplicate jobs, separating deterministic code from model judgment, creating proof receipts, making an operator kill switch, designing human approval boundaries, or auditing whether an autonomous workflow can safely mutate production.
