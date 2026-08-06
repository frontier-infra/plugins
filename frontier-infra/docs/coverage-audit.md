# Product-readiness coverage audit

## Original v0.1 gaps

| Area | v0.1 | v0.2 response |
| --- | --- | --- |
| Philosophy | Five short rules | Canonical vocabulary, four principles, two-layer independence, and claim boundaries. |
| Harness design | Missing | End-to-end design dossier skill and template. |
| Governance plane | Mostly autonomy ceiling | Dedicated governance workflow covering mutation inventory, trust, reversibility, override, events, and negative tests. |
| Current Machine spec | Reflected older six-box summary | Uses canonical vNext, including shape stamps, Δ1 reversibility, Δ2 governance, and Δ3 runtime health. |
| Orchestrator shape | Missing | Explicit Machine/Orchestrator distinction and Conductor workflow. |
| Operational hardening | Retries/budget only | Idempotency, quarantine, ACK escalation, resource governors, override, health, watcher-of-watcher, anomaly fixtures. |
| Threat model | Scattered cautions | Consolidated adversarial control/evidence matrix. |
| Developer artifacts | None | Contract, design dossier, governance policy, and runtime-health templates. |
| Conformance audit | Build skill mentioned kit | Separate evidence-first audit skill and shaped levels. |
| Project map | Five components | Standards, implementations, demo, Switchyard, and adjacent research with maturity boundaries. |
| Skill discovery UX | No `openai.yaml` | UI metadata and explicit starter prompts for every skill. |
| Relative references | Two broken links | All cross-skill resources use checked plugin-relative paths. |
| Marketplace evaluation | Missing | Positive/negative reviewer cases and deterministic package validator. |
| Marketplace operations | Local install only | Submission dossier, blockers, publisher requirements, and release flow. |
| Legal/provenance | Manifest-only license and draft URLs | Root MIT license, provenance notices, original icon asset, non-endorsement guidance, and concrete listing URLs. |

## Intentional v0.2 exclusions

- No hosted MCP server. A public MCP adds authentication, domain verification, availability, privacy, annotations, and operational security obligations without being necessary for the teaching workflows.
- No bundled signing key or signing service. Operators retain keys; AAR workflows invoke user-controlled tools.
- No remote worker dispatch. Switchyard is pre-v0, credentialed, and powerful; it should become a separately reviewed optional integration.
- No automatic autonomy elevation. Conformance history and verifier trust need an implemented, independently tested ledger before L5 behavior is credible.
- No claim that Codex currently enforces ADL/Proctor semantics. The plugin teaches the contract; a Codex-native enforcement engine remains separate engineering work.

## Remaining release blockers

1. Add executed reviewer evidence artifacts in `evals/results/<case-id>.json`; fixture URLs are inputs only, and current eval cases are still a coverage inventory until captured results exist.
2. Confirm the OpenAI Platform publisher identity and Apps Management permission.
3. `frontier-sdk` protocol/package ownership is defined; split public plugins by narrow adoption or runtime surface and keep the umbrella field guide internal.
4. Support, privacy, and terms pages are published and live-verified; keep them current with the release shape.
5. Complete chain-of-title/contribution review, patent posture, and conformance-mark/trademark policy.
6. Keep public conformance claims aligned with current runtime evidence; machine-driver is currently static structural candidate `Machine-L2 Instrumented`, with non-bypass enforcement `PARTIAL`, not `Machine-L3`.
7. Choose a standalone public source repository and run an allowlist/secret audit before its first push.
8. Forward-test the final installed package in fresh Codex and ChatGPT Work conversations using `evals/cases.json`.
9. Capture reviewer-reproducible outputs and finalize portal category, countries, listing copy, and release notes.

These blockers mean the umbrella is useful internally but is not recommended for public submission yet.
