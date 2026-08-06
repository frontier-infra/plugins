# Adoption journeys

In every journey, the coding assistant is the developer outside the target
runtime. Apply worker, verifier, contract, gate, health, and receipt semantics
to the application being built. Govern the development workflow itself only
when the user explicitly selects that journey or a real enforcement adapter is
installed.

## Learn and map

Use `frontier-router` to explain the philosophy, map existing components, classify the intended deployment shape, and identify the smallest adoption that closes a real failure.

## Design a new harness

Use `design-agent-harness`, then `design-agent-governance`. Produce the design dossier, threat model, contract grammar, state machine, ports, verification strategy, gate formula, health manifest, and evidence plan before implementation.

## Harden an existing agent loop

Start with `machine-conformance` in audit-only mode. Preserve current behavior, add regression fixtures for its real failure modes, and harden one missing obligation at a time: durable state, idempotency, verifier separation, gate coverage, budgets, quarantine, override, receipts, health.

## Run one bounded coding goal

This is an optional developer-workflow integration, not a prerequisite for
using the SDK. When explicitly requested, use `goal-contract`; keep autonomy at
propose-only; dispatch fresh workers; execute independent acceptance checks;
land changes through repository controls. Add AAR only when portable proof is
useful.

## Build a model-driven pipeline

Use `conductor-pipeline`. Keep a fat deterministic engine, a closed transition set, write-ahead decisions, persistent workspaces, explicit fan-in, and a human gate before fulfillment. Stamp it as an Orchestrator shape.

## Expose verifiable external state

Use `avl-adoption` so verifiers can read stable machine-facing state. Add `aar-attestation` when actions or verdicts need portable receipts.

## Govern a multi-agent repository

Use `maintainer-gates` for issue/PR intake, slice and handoff discipline, deterministic CI gates, clean promotion lanes, and operator validation. This does not replace per-task contracts or result verification.
