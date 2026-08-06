# Frontier Infra (developer field kit)

Frontier Infra is a developer field kit that helps Codex, Claude Code, and
other coding assistants build standalone AI systems where reliability lives
outside the runtime model. The coding assistant is the developer using the
kit—not an agent inside the application it is building.

> The prompt is the job ticket. The harness is the operating system. The model
> is a replaceable worker. Reality is the boss.

Eleven skills cover product construction and optional evidence workflows:

1. Design the target harness and its authority model (`design-agent-harness`,
   `design-agent-governance`).
2. Add bounded contracts to work dispatched by the target runtime
   (`goal-contract`).
3. Build with the published SDK packages instead of hand-rolling plumbing
   (`build-with-frontier-sdk`): `@frontier-infra/protocol`,
   `@frontier-infra/avl`, `@frontier-infra/audit`.
4. Implement Machine-shaped deployments and model-driven pipelines
   (`machine-deployment`, `conductor-pipeline`).
5. Declare ground truth and sign outcomes (`avl-adoption`, `aar-attestation`).
6. When requested, audit a target deployment with evidence; land work through governed repos
   (`machine-conformance`, `maintainer-gates`), and route it all
   (`frontier-router`).

Canonical standards remain in their own repositories; the skills compose the
published pieces inside a user's application without redefining their
semantics in prompt text.

Installing this plugin does not place the coding session under Frontier
governance and does not require self-ratification, self-audit, or receipts for
the builder's patch.

Install (Claude Code):

```
/plugin marketplace add frontier-infra/plugins
/plugin install frontier-infra@frontier-infra
```

Codex ships from the same skill sources via `.codex-plugin/` and the
`skills/*/agents/openai.yaml` overlays.

MIT.
