---
name: maintainer-gates
description: Inspect, plan, apply, verify, or audit the Maintainer Gate Blueprint for multi-agent repositories that need governed issue/PR intake, clean promotion lanes, handoff evidence, deterministic CI gates, and operator validation.
---

# Adopt Maintainer Gates

Read `../../references/threat-model.md` when defining destructive-command and cross-tenant controls.

## Workflow

1. Inspect the target repository before writing anything. Identify its package manager, test/lint/typecheck commands, branch and release policy, CI system, production-risk commands, and existing contributor instructions.
2. Prepare a manifest from the Blueprint's example. Keep policy and generated paths specific to the target repository.
3. Generate and review a project-specific manifest. Before applying, show the target paths and any CI or hook files it will create or change.
4. Locate or provision the Maintainer Gate Blueprint before applying it. Prefer the target repository's documented vendored path or a checked-out `frontier-infra/Maintainer-Gate-Blueprint` repository. If `bin/apply-blueprint.mjs` is not present at the selected Blueprint root, stop with that prerequisite instead of invoking a plugin-local path.

   ```sh
   test -f <blueprint-root>/bin/apply-blueprint.mjs && node <blueprint-root>/bin/apply-blueprint.mjs <manifest.json>
   ```

5. Review every generated policy and command pattern against the actual repository. Tighten placeholders; do not ship generic production guards as if they were verified.
6. Run the Blueprint checks, target lint/typecheck/tests, gate allow/deny fixtures, handoff validation, and PR-intake validation.
7. Report separately: agent-read instructions, deterministic local hooks, CI gates, promotion/operator gates, and remaining manual controls.

## Rules

- Keep implementation work separate from clean dev/release reconstruction.
- Use commit/file evidence rather than branch names as truth.
- Never claim an operator validation or production outcome that has not occurred.
- Do not enable destructive production-command blocks without first confirming their patterns against the target environment.
