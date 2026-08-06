# Frontier Infra plugins for Claude

Claude Code and Cowork marketplace for the Frontier Infra stack. The same skill
sources ship to Codex via each plugin's `.codex-plugin/` manifest; this
repository adds the `.claude-plugin/` manifests and the marketplace index.

## Install

```
/plugin marketplace add frontier-infra/plugins
/plugin install frontier-infra@frontier-infra
/plugin install frontier-audit@frontier-infra
```

## Plugins

| Plugin | Skills | What it does |
| --- | --- | --- |
| `frontier-infra` | 10 | Design governed AI harnesses with checkable evidence — harness architecture, sprint contracts, deterministic drivers, governance gates, runtime health, AAR receipts, AVL ground truth, conformance audits, repository operating controls. |
| `frontier-audit` | 1 | Score and attest AI harnesses. Thin adoption layer over the installable Frontier Audit SDK: inspect, authorize, verify provenance, then run the SDK-owned audit and attestation workflow. |

`frontier-audit` deliberately owns only bootstrap and operator flow. Scorer and
AAR semantics live in the versioned SDK so conformance verdicts stay comparable
across releases and signed receipts remain meaningful over time.

## Layout

```
.claude-plugin/marketplace.json     marketplace index
frontier-infra/
  .claude-plugin/plugin.json        Claude manifest
  .codex-plugin/plugin.json         Codex manifest
  skills/<name>/SKILL.md            shared skill sources
frontier-audit/
  .claude-plugin/plugin.json
  .codex-plugin/plugin.json
  skills/audit-and-attest/
  scripts/bootstrap-sdk.mjs
  assets/sdk-lock.json              pinned SDK coordinates + SHA-256
```

Skill bodies are host-neutral. Host-specific presentation stays in the
per-host manifests, and `skills/<name>/agents/openai.yaml` overlays are read
only by Codex — Claude ignores them.

## License

MIT. See `LICENSE` in each plugin directory.
