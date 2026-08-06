# Frontier Infra (developer field kit)

Frontier Infra is a developer field kit for AI systems where reliability must
live outside the model. It teaches a coherent architecture rather than another
prompt pattern:

> The prompt is the job ticket. The harness is the operating system. The model
> is a replaceable worker. Reality is the boss.

Eleven skills cover the path from design to evidence:

1. Ratify a bounded contract before work (`goal-contract`).
2. Design the harness and its authority model (`design-agent-harness`,
   `design-agent-governance`).
3. Build with the published SDK packages instead of hand-rolling plumbing
   (`build-with-frontier-sdk`): `@frontier-infra/protocol`,
   `@frontier-infra/avl`, `@frontier-infra/audit`.
4. Implement Machine-shaped deployments and model-driven pipelines
   (`machine-deployment`, `conductor-pipeline`).
5. Declare ground truth and sign outcomes (`avl-adoption`, `aar-attestation`).
6. Audit conformance with evidence, land work through governed repos
   (`machine-conformance`, `maintainer-gates`), and route it all
   (`frontier-router`).

Canonical standards remain in their own repositories; the skills compose the
published pieces inside a user's application without redefining their
semantics in prompt text.

Install (Claude Code):

```
/plugin marketplace add frontier-infra/plugins
/plugin install frontier-infra@frontier-infra
```

Codex ships from the same skill sources via `.codex-plugin/` and the
`skills/*/agents/openai.yaml` overlays.

MIT.
