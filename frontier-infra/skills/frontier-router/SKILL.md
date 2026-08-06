---
name: frontier-router
description: Explain Frontier Infra's philosophy, architecture, projects, terminology, and patterns; choose and compose the right components for AI harness, governance, agent-readable web, attestation, discipline, or reliable-operations work.
---

# Frontier Infra router

Use this as the teaching and routing entry point. Read the references that match the question:

- Philosophy or core claims: `../../references/philosophy.md`
- Six-box and governance architecture: `../../references/system-architecture.md`
- Reusable implementation patterns: `../../references/pattern-catalog.md`
- Project selection and maturity: `../../references/project-map.md`
- Adoption sequence: `../../references/adoption-journeys.md`

## Workflow

1. Identify the outcome, durable effects, failure history, trust roles, and required autonomy.
2. Determine whether the user needs education, a design, an implementation, or an audit.
3. Select the smallest components that close those failure modes; distinguish standards from deployments and experiments.
4. State the intended deployment shape: `machine`, `orchestrator`, or neither.
5. Separate what will be instructed, instrumented, enforced, receipted, and independently verified.
6. Route implementation work to the focused skill and name the artifacts that will prove completion.

## Composition guide

- New harness architecture → `design-agent-harness`
- Application implementation with published packages → `build-with-frontier-sdk`
- Authority, mutation, reversibility, and override → `design-agent-governance`
- One bounded work contract → `goal-contract`
- Machine-shaped implementation → `machine-deployment`
- Evidence-based audit → `machine-conformance` (scoring runs `npx -y @frontier-infra/audit`; the sibling `frontier-audit` plugin's `audit-and-attest` skill covers the score-and-attest flow end to end)
- Model-driven domain pipeline → `conductor-pipeline`
- Site ground truth → `avl-adoption`
- Signed outcome evidence → `aar-attestation`
- Repository operations → `maintainer-gates`

## Boundaries

- Do not call an AAR's signature proof that the underlying claim is true; it proves who attested and what evidence was committed.
- Do not call a model-driven controller a Dumb Driver. Use the orchestrator shape and its lower guarantee ceiling.
- Do not call retries resilience without idempotency, budgets, quarantine, alerts, and kill/resume evidence.
- Do not route secrets or private operational configuration into public plugin assets.
