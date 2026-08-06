---
name: goal-contract
description: Turn a rough agent task or project increment into a bounded, independently ratifiable sprint contract with immutable acceptance checks, scope, constraints, autonomy ceiling, budget, escalation, identity, expiry, and receipt fields.
---

# Author a sprint contract

Use `../../assets/sprint-contract.yaml` as the artifact. Read `../../references/philosophy.md` for the two-layer independence rule.

## Workflow

1. Convert the request into one observable outcome. Separate desired effect from implementation method.
2. Enumerate in-scope and out-of-scope artifacts and mutations.
3. Write mechanically runnable acceptance checks against ground truth. Put prose review behind an explicit human or distinct-judge gate.
4. Declare constraints, allowed tools/effects, verifier scope/freshness, autonomy ceiling, attempt/time/token/cost budgets, and ACK escalation.
5. Identify proposer and ratifier. Leave status `DRAFT`, `ratified_by`, contract hash, and receipt empty until independent ratification actually occurs.
6. After ratification, hash the immutable contract, issue the receipt, set expiry, and make any acceptance change require revocation and a new contract version.

## Quality rules

- Avoid “works,” “looks good,” or “properly” unless a check defines them.
- Keep one contract small enough for one fresh-worker move or an explicitly decomposed set of moves.
- Set the ceiling to propose-only when verifier qualification or mutation coverage is incomplete.
- Do not fabricate ratification, timestamps, signatures, identities, or receipt references.

Return the contract plus a plain-language explanation of what can block, quarantine, escalate, or require human judgment.
