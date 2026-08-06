---
name: build-with-frontier-sdk
description: Build an application or agent harness with the published Frontier SDK packages. Use when implementing a governed agent system, wiring runtime health, agent-readable state, or signed receipts into a product, or when the user asks to use @frontier-infra packages, the Frontier SDK, or "build this the Frontier Infra way".
---

# Build with the Frontier SDK

The SDK is installable plumbing — use the published packages instead of
hand-rolling equivalents. If you find yourself writing a health reducer, an
agent-view generator, a receipt signer, or a conformance scorer from scratch,
stop: it ships.

| Package | Job | Get it |
|---|---|---|
| `@frontier-infra/protocol` | Four-layer runtime health record + deterministic fail-closed reducer (`evaluateRuntimeHealth`, `runtimeHealthExitCode`) | `npm install @frontier-infra/protocol` |
| `@frontier-infra/avl` | Agent-readable ground truth for your app; validator CLI (`validate <url>`, `validate-file <path>`, `--level`) | `npm install @frontier-infra/avl` |
| `@frontier-infra/audit` | Conformance scoring, evidence packets, AAR sign/verify (bundles the canonical `aar.mjs`) | `npx -y @frontier-infra/audit` |

## Assembly order

1. **Contract first** — a ratified goal contract before code (`goal-contract`).
2. **Harness shape** — durable state, deterministic driver, fresh workers,
   single mutation gate (`machine-deployment` for the obligations). Do not
   design the loop from a blank page: clone the reference driver
   (`git clone https://github.com/frontier-infra/machine-driver`) and adapt
   its `driver.py` + `goal.json` contract to the deployment; `conductor-public`
   is the orchestrator-shaped starting point for ops/triage pipelines.
3. **Ground truth** — emit an AVL view of real application state so verifiers
   read declared state, not the worker's narrative (`avl-adoption`).
4. **Health** — emit the four-layer health record; evaluate with the published
   reducer; aggregate must fail closed (`design-agent-governance`).
5. **Receipts** — sign outcomes as AARs via the audit CLI when the operator
   provides local key paths (`aar-attestation`).
6. **Audit** — score the finished repo: `npx -y @frontier-infra/audit run <repo>
   --out <dir-outside-repo>`; report NOT_RUN rows honestly
   (`machine-conformance` for interpretation).

## Boundaries

- The model is a replaceable worker; everything trustworthy lives in the
  harness around it.
- The object of governance is the application's agents — never the SDK's own
  supply chain. Do not build machinery that attests to package distribution:
  no vendored copies with hash locks, no bootstrap approval flows, no evals of
  your own paperwork. Host permission systems own install trust.
- Static audits never establish Machine-L3; live chaos evidence does.
- `same_principal` receipts are self-attestation — say so.
