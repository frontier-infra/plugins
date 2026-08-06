---
name: build-with-frontier-sdk
description: Build an application or agent harness with the published Frontier SDK packages. Use when implementing a governed agent system, wiring runtime health, agent-readable state, or signed receipts into a product, or when the user asks to use @frontier-infra packages, the Frontier SDK, or "build this the Frontier Infra way".
---

# Build with the Frontier SDK

The SDK is installable plumbing — use the published packages instead of
hand-rolling equivalents. If you find yourself writing a health reducer, an
agent-view generator, a receipt signer, or a conformance scorer from scratch,
stop: it ships.

You are the software developer using the SDK. You are not a worker, verifier,
operator, or subject inside the target application. Apply the requirements
below to the runtime being built, not to the interactive coding session.

| Package | Job | Get it |
|---|---|---|
| `@frontier-infra/protocol` | Four-layer runtime health record + deterministic fail-closed reducer (`evaluateRuntimeHealth`, `runtimeHealthExitCode`) | `npm install @frontier-infra/protocol` |
| `@frontier-infra/avl` | Agent-readable ground truth for your app; validator CLI (`validate <url>`, `validate-file <path>`, `--level`) | `npm install @frontier-infra/avl` |
| `@frontier-infra/audit` | Conformance scoring, evidence packets, AAR sign/verify (bundles the canonical `aar.mjs`) | `npx -y @frontier-infra/audit` |

## Application workflow

1. **Map the product** — inspect the target application's existing runtime,
   state, provider calls, effects, and failure modes. Choose only the Frontier
   capabilities it needs.
2. **Install the plumbing** — add the selected published packages as ordinary
   application dependencies. Preserve the application's package manager,
   framework, provider API, storage, and deployment conventions.
3. **Build the harness shape** — implement durable state, deterministic driver, fresh workers,
   single mutation gate (`machine-deployment` for the obligations). Do not
   design the loop from a blank page: clone the reference driver
   (`git clone https://github.com/frontier-infra/machine-driver`) and adapt
   its `driver.py` + `goal.json` contract to the deployment; `conductor-public`
   is the orchestrator-shaped starting point for ops/triage pipelines.
4. **Implement runtime contracts** — add contract proposal, ratification, and
   enforcement inside the target runtime when its workload needs bounded
   delegated work. Do not create a contract for the coding session by default.
5. **Ground truth** — emit an AVL view of real application state so verifiers
   read declared state, not the worker's narrative (`avl-adoption`).
6. **Health** — emit the four-layer health record; evaluate with the published
   reducer; aggregate must fail closed (`design-agent-governance`).
7. **Receipts** — sign target-runtime outcomes as AARs when the product needs
   portable proof and the operator
   provides local key paths (`aar-attestation`).
8. **Test the product** — run its ordinary unit, integration, failure, and
   runtime tests. If the user explicitly requests a conformance claim or the
   target's release criteria require one, audit the target deployment with
   `machine-conformance`; otherwise do not add an audit ceremony.

## Boundaries

- The builder is outside the target runtime. Host install prompts, tool
  permissions, commits, and the builder's own patch are not Frontier
  governance events unless the user deliberately installs that integration.
- The model is a replaceable worker; everything trustworthy lives in the
  target harness around its runtime model calls. If the target later invokes
  Codex or Claude through a worker adapter, those bounded invocations are
  workers; the coding assistant building the adapter is not.
- The object of governance is the application's agents — never the SDK's own
  supply chain. Do not build machinery that attests to package distribution:
  no vendored copies with hash locks, no bootstrap approval flows, no evals of
  your own paperwork. Host permission systems own install trust.
- Static audits never establish Machine-L3; live chaos evidence does.
- `same_principal` receipts are self-attestation — say so.
