# Frontier Infra plugins for Claude

Claude Code and Cowork marketplace for the Frontier Infra stack.

## Install

```
/plugin marketplace add frontier-infra/plugins
/plugin install frontier-infra@frontier-infra
/plugin install frontier-audit@frontier-infra
```

## Plugins

| Plugin | Skills | What it does |
| --- | --- | --- |
| `frontier-infra` | 11 | Design governed AI harnesses with checkable evidence — harness architecture, sprint contracts, building with the published SDK packages, deterministic drivers, governance gates, runtime health, AAR receipts, AVL ground truth, conformance audits, repository operating controls. |
| `frontier-audit` | 1 | Score a repository against The Machine's conformance kit and optionally issue a signed AAR evidence receipt. Runs the published `@frontier-infra/audit` CLI via `npx` — the evidence packet records the exact CLI version that produced it. |

## Layout

```
.claude-plugin/marketplace.json     marketplace index
frontier-infra/
  .claude-plugin/plugin.json        Claude manifest
  .codex-plugin/plugin.json         Codex manifest (dual-shipped from here)
  skills/<name>/SKILL.md            shared skill sources
frontier-audit/
  .claude-plugin/plugin.json
  skills/audit-and-attest/SKILL.md  runs published @frontier-infra/audit via npx
```

The audit CLI's canonical source is `frontier-sdk/packages/typescript/audit`,
published to npm. The Codex adapter for the audit SDK lives in
`frontier-sdk/integrations/codex/frontier-audit`, not here.

For `frontier-infra`, skill bodies are host-neutral: host-specific presentation
stays in the per-host manifests, and `skills/<name>/agents/openai.yaml`
overlays are read only by Codex — Claude ignores them.

## License

MIT. See `LICENSE` in each plugin directory.
