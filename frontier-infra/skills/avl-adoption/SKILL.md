---
name: avl-adoption
description: Design, build, review, validate, or package an Agent View Layer implementation so public sites expose discoverable machine-readable intent, state, and actions for agents and independent verifiers.
---

# Adopt Agent View Layer

Read `../../references/philosophy.md` when explaining why ground-truth views belong outside worker narrative.

## Workflow

1. Inspect the host and choose its native surface: route, CMS plugin, theme, extension, embed, or static document.
2. Inventory the human pages, agent companions, discovery signals, content negotiation, states, actions, schemas, and authorization boundaries.
3. Define what an independent verifier can observe without trusting the worker.
4. Implement the smallest native integration; preserve the host platform's permissions, escaping, lifecycle, and packaging conventions.
5. Validate the file or live URL with the current AVL CLI:

   ```sh
   npx @frontier-infra/avl validate <url-or-file> --json
   ```

6. Test direct discovery, Link headers/content negotiation where used, human rendering, agent rendering, auth-denied paths, and every declared action separately.
7. Report the validator output, achieved AVL level, exact evidence, and untested paths. A badge or `llms.txt` alone is not an AVL implementation.

## Security requirements

- Treat agent action declarations as public API documentation: validate inputs, enforce authorization server-side, and avoid exposing internal operations.
- Escape all user-controlled output by the host platform convention.
- Do not introduce hidden tracking, remote code, or automatic external calls.

For CMS-adapter work, follow the more detailed `avl-cms-adapter` skill when it is installed; this skill supplies the general adoption path.
