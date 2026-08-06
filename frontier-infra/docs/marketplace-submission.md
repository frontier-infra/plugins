# Marketplace submission dossier

## Release shape

- Submission type: **Skills only**
- Product: **Frontier Infra**
- Publisher: Jason Kent Brashear, verified individual developer; Frontier Infra is the project and product name
- Initial release: `0.2.x`
- Authentication: none
- External data collection: none by the plugin
- Hosted MCP/UI: none
- Public website URL: `https://frontierinfra.org`
- Support URL: `https://frontierinfra.org/support`
- Privacy policy URL: `https://frontierinfra.org/privacy`
- Terms URL: `https://frontierinfra.org/terms`

This package is currently a pre-release/internal field guide. It is not recommended for public
marketplace submission. The `frontier-sdk` protocol/package ownership is now defined; publish
narrow SDK-consuming plugins by adoption or runtime surface after their runnable fixtures and
executed reviewer evidence exist.

## Readiness record — 2026-08-06

| Gate | Result | Evidence / next action |
| --- | --- | --- |
| Website, support, privacy, and terms | **PASS** | All four production URLs returned HTTP 200 after the site deployed from GitHub `main`. |
| Required marketplace reviewer results | **PASS** | `P01`–`P05` and `N01`–`N03` were executed against installed plugin version `0.2.0+codex.20260806024620`; structured records are in `evals/results/`. |
| Plugin and skill validation | **PASS** | Submission validation, the platform plugin validator, and all ten skill validators passed. |
| Canonical protocol ownership | **PASS** | `frontier-sdk` owns the runtime-health schema, reducers, fixtures, and consumer sync lock. |
| Apps Management write | **PASS** | The verified individual's Personal organization exposes the plugin creation flow. |
| Publisher verification | **PASS** | OpenAI Platform organization settings show the individual identity as Verified. |
| Machine-L3 claim | **NOT CLAIMED** | The canonical kit reports `Machine-L2 Instrumented` as the static structural candidate, one L3 static row PARTIAL, and six live chaos/replay rows NOT-RUN. |
| Public product shape | **OPEN** | Select and package the first narrow SDK-consuming plugin; do not submit this umbrella field guide as the final public product merely because its readiness mechanics pass. |

Skills-only remains a valid shape for a narrow adoption plugin: supported outcomes can use
instructions, references, templates, the user's repository, and independently installed public
CLIs. A hosted MCP server is unnecessary unless a specific plugin outcome requires live tools or
data, and would expand the trust surface.

## Required publisher work

1. Keep the submission in the verified individual's Personal organization.
2. Keep the listing, website, support, privacy, and terms aligned with Jason Kent Brashear as the verified publisher and Frontier Infra as the project/product name.
3. Publish and verify stable HTTPS pages:
   - product website: `https://frontierinfra.org`;
   - support/contact: `https://frontierinfra.org/support`;
   - privacy policy: `https://frontierinfra.org/privacy`;
   - terms of service: `https://frontierinfra.org/terms`.
4. Ensure the publisher name, domain, support identity, and policies match the verified identity.
5. Complete chain-of-title/contribution review for the plugin package and referenced standards.
6. Decide patent posture and conformance-mark/trademark policy before broad standards claims.
7. Keep public conformance claims evidence-bound. Current machine-driver claim is static structural candidate `Machine-L2 Instrumented` with non-bypass enforcement `PARTIAL`; do not claim `Machine-L3` or `L3 Enforced`.
8. Keep `THIRD_PARTY_NOTICES.md`, `TRADEMARKS.md`, and `docs/standards-ip-policy.md` aligned with the final source bundle.

Supporting policy language is in `privacy-policy-draft.md` and `terms-draft.md`; the production site routes are the public policies used by the submission.

## Listing copy

**Name:** Frontier Infra

**Short description:** Design governed AI harnesses with checkable evidence.

**Long description:** Design, build, and audit reliable AI harnesses using contracts, durable state, deterministic drivers, fresh workers, independent verification, governance gates, reversibility, runtime health, signed AAR receipts, AVL ground truth, and evidence-based conformance. Includes patterns and templates for Machine-shaped and model-driven Orchestrator-shaped systems. Conformance claims remain shape-stamped and evidence-bound.

**Category:** Developer Tools if the portal offers it; otherwise Productivity.

**Starter prompts:**

1. Design a reliable AI harness for my workflow.
2. Audit my agent system against The Machine.
3. Add governance gates and evidence to my agents.

## Pre-submission release procedure

1. Copy this plugin into a standalone public repository or release source owned by the verified publisher.
2. Audit tracked files by allowlist. Exclude secrets, private deployment configuration, generated state, receipt data containing sensitive fields, internal endpoints, live operator details, and unlicensed copied material.
3. Confirm public routes return 200 for website, support, privacy policy, and terms.
4. Confirm upstream public claims match current repository evidence:
   - every referenced project repository has a complete public license file at release time;
   - chain-of-title, contribution authority, patent posture, and marks policy have been reviewed;
   - describe machine-driver as static structural candidate `Machine-L2 Instrumented` with non-bypass enforcement `PARTIAL` unless newer executed evidence supports a different shape-stamped level;
   - no `Machine-L3` or `L3 Enforced` claim unless the current deployment evidence packet passes the required gates;
   - no Dumb Driver claim for model-selected orchestration;
   - describe Conductor as `Orchestrator-L1 Declared` unless newer executed evidence supports a different shape-stamped level.
5. Run `node scripts/validate-plugin.mjs` and the platform plugin validator.
6. Install the exact release tree locally and start new conversations.
7. Treat fixture URLs in `evals/cases.json` only as input fixtures, not execution evidence.
8. Run all reviewer cases in `evals/cases.json`; retain the prompt, plugin version, selected skill, commands, outcome, assertion results, and timestamp in `evals/results/<case-id>.json`. Do not call the evals executed until these artifacts exist.
9. Package the exact final tree. Do not edit skills after behavioral testing without rerunning the cases.
10. Open the OpenAI plugin submission portal, choose **Skills only**, upload the final skill bundle, and complete listing/publisher fields.
11. Enter at least five positive and three negative cases from the eval file with reviewer-reproducible fixtures.
12. Choose only countries where publisher, policies, and support are ready.
13. Submit for review. Approval does not publish automatically; publish the approved version from the portal.

## Release notes

Pre-release/internal field guide. Frontier Infra provides ten skills for learning, designing,
governing, implementing, and auditing AI harnesses and related standards. This release is
skills-only, requires no account, hosts no tools or UI, collects no user data, and performs no
remote actions. All signing and verification remain under the user's local control. Public
submission should wait for a narrow public product selection and
runnable reviewer evidence.

## Future MCP release gate

Do not add MCP until a user goal requires live or controlled actions. A future server must have a public production HTTPS endpoint, verified domain, explicit authentication, minimal schemas, accurate `readOnlyHint`/`openWorldHint`/`destructiveHint` annotations, reviewer credentials without MFA/private networking, operational SLAs, privacy disclosures, and new positive/negative cases. Switchyard dispatch should be a separate opt-in capability rather than silently expanding this skills plugin.
