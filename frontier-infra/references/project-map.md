# Frontier Infra project map

## Standards

| Project | Role | Use it when | Do not mistake it for |
| --- | --- | --- | --- |
| AVL | Declares machine-readable site intent, state, and actions. | A verifier or agent needs a stable view instead of scraping. | An authorization system or execution harness. |
| AAR | Carries signed claim, verdict, ground-truth status, and evidence commitment. | Outcomes need portable, inspectable proof. | A guarantee that weak evidence is true. |
| ADL | Defines contract/proof discipline for coding workers. | A task needs bounded roles, evidence, and a done gate. | The long-running driver or a Codex-specific enforcement engine. |
| The Machine | Specifies falsifiable harness obligations and scores deployments. | Work must survive sessions and earn governed autonomy. | A product, deployment, or generic multi-agent diagram. |

## SDK family

| Project | Role | Use it when | Do not mistake it for |
| --- | --- | --- | --- |
| frontier-sdk | Canonical shared protocol schemas, TypeScript/Python bindings, reference reducers, and locked conformance fixtures; kernel/app clients and adapter kits follow executable vertical slices. | A standalone application or host integration needs one portable application surface. | A new standard superseding AVL, AAR, ADL, or The Machine; a marketplace plugin; or a universal model abstraction. |

## Reference implementations and deployments

| Project | Shape / purpose | Maturity boundary |
| --- | --- | --- |
| machine-driver | Zero-token code-work driver. | Current static structural candidate: `Machine-L2 Instrumented`; non-bypass enforcement is `PARTIAL`, so do not claim `Machine-L3`. |
| Conductor | Model-driven domain triage/operations pipeline with deterministic engine boundaries. | Current public classification: `Orchestrator-L1 Declared`; never label it a Dumb Driver. |
| Proctor | Reference enforcement engine for the ADL contract/proof semantics, currently integrated with Claude Code. | Host-neutral ADL semantics; other hosts need conforming adapters or engines, not copied plumbing. |
| Maintainer Gate Blueprint | Repository operating, handoff, CI, and promotion controls. | Governs maintainers and repos; complements task-level verification. |
| Switchyard | Queue/worker/verification adapters and an MCP bridge to remote execution nodes. | Pre-v0 and operationally powerful; keep optional and credential-scoped. |
| The Workshop (`stack-demo`) | Full-stack evidence-bearing example. | Reference deployment and teaching fixture, not normative specification. |

## Adjacent research

- **Intent OS:** research into durable authorized desired state and drift correction. Its experiments are not public product claims.
- **Edge Memory Lab:** verified memory/contract experiments. Treat current claim boundaries as authoritative.
- **frontier.watch:** a domain deployment exhibiting durable monitors and state, not a general harness standard.

Use the canonical `frontier-infra/the-machine` repository for current Machine semantics. The umbrella's older root spec is retained for history and is superseded.
