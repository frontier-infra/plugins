# Frontier Infra for Codex

Frontier Infra is a developer field kit for AI systems where reliability must live outside the model. It teaches a coherent architecture rather than another prompt pattern:

> The prompt is the job ticket. The harness is the operating system. The model is a replaceable worker. Reality is the boss.

The plugin teaches and validates the path from design to evidence:

1. Ratify a bounded contract before work.
2. Persist goal and state outside the session.
3. Dispatch bounded, fresh workers from a deterministic driver, or record and validate every model-selected transition in an orchestrator.
4. Verify results against ground truth with a judge distinct from the worker.
5. Route every mutation through a governance and reversibility gate.
6. Emit portable receipts and continuously watch the harness itself.

This umbrella package is an internal field guide and router. Canonical standards remain in their
own repositories; the `frontier-sdk` family owns shared protocol types, reference reducers, and
locked conformance fixtures, with kernel/app clients and adapter kits added through executable
vertical slices. Public marketplace plugins should be narrower
SDK-consuming adoption or runtime products, not alternate definitions of Frontier semantics.

## Included workflows

| Skill | Outcome |
| --- | --- |
| `frontier-router` | Learn the philosophy, map the projects, and choose the smallest useful layer. |
| `design-agent-harness` | Produce a complete harness design dossier and failure model. |
| `design-agent-governance` | Define authority, reversibility, override, audit, and incident controls. |
| `goal-contract` | Turn rough work into a ratifiable, immutable sprint contract. |
| `machine-deployment` | Implement or harden a durable Machine-shaped harness. |
| `machine-conformance` | Audit a deployment and assemble evidence for a shaped conformance claim. |
| `conductor-pipeline` | Adapt the fat-engine/thin-skill orchestrator pattern to a domain. |
| `avl-adoption` | Make a site expose machine-readable ground truth. |
| `aar-attestation` | Produce and verify portable signed outcome evidence. |
| `maintainer-gates` | Install repository-level operating and promotion controls. |

Detailed philosophy, architecture, patterns, threats, project boundaries, and adoption journeys live in `references/`. Reusable design artifacts live in `assets/`.

## Trust boundary

This release is skills-only. It never hosts user data, receives credentials, signs on a user's behalf, or dispatches remote workers. It teaches Codex to use independently runnable local tools and to distinguish:

- declared from enforced;
- signed from true;
- verified from self-reported;
- a Machine from a model-driven orchestrator;
- a reversible mutation from an asserted rollback.

The plugin does not claim provider endorsement. References to model providers,
host tools, or Frontier Infra conformance labels are nominative and evidence
bound.

## Local development

From the plugin root:

```sh
node scripts/validate-plugin.mjs
```

The repository marketplace is at `../../.agents/plugins/marketplace.json`. Install or reinstall with `frontier-infra@personal`, then start a new Codex task so the refreshed skills are loaded.

## Public release status

The skills, templates, use-case inventory, and reviewer test cases are maintained here as a pre-release/internal field guide. The first five positive and first three negative reviewer cases now have executed records in `evals/results/`, and the production legal/support routes are live. Those readiness mechanics do not change the product decision: publish a narrow SDK-consuming plugin rather than treating this umbrella guide as the final marketplace product.

The initial submission uses the verified individual developer identity of Jason Kent Brashear. Frontier Infra remains the project and product name, not a separately verified corporation. Public submission still requires chain-of-title/contribution review, patent and marks decisions, a final allowlist audit, packaging of the selected product, and portal review.

Current public routes:

- Website: https://frontierinfra.org
- Support: https://frontierinfra.org/support
- Privacy: https://frontierinfra.org/privacy
- Terms: https://frontierinfra.org/terms

See `docs/marketplace-submission.md`.
