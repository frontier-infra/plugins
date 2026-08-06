# Conformance and evidence

## Shape-stamped levels

| Level | Meaning |
| --- | --- |
| L0 — Look-Alike | Resembles the architecture; no enforceable contract. |
| L1 — Declared | Obligations are named; some remain manual. |
| L2 — Instrumented | State, transitions, verification, contracts, and observability are inspectable. |
| L3 — Enforced | The system blocks, caps, alerts, and escalates. |
| L4 — Receipted | Material actions have signed receipts and independent verification. |
| L5 — Trusted Autonomy | Authority can rise from verifier-earned trust; Machine shape only. |

Use `Machine-L*` or `Orchestrator-L*`, never a bare level. Score a deployment wiring, not a standard or helper library.

## Minimum evidence packet

- architecture map binding every obligation to a versioned component;
- executed self-tests with commands, timestamps, and raw outcomes;
- kill/resume and deterministic replay evidence;
- lying-worker and missing/stale-verifier denials;
- duplicate-key single-effect proof;
- attempt/resource cap to quarantine and acknowledged alert;
- operator override red-team within the declared SLO;
- forged rollback treated as irreversible;
- one allowed and one denied gate trace with the evaluated authority terms;
- signed receipt chain and current foundation-health record.

## Audit method

1. Determine the deployment shape before scoring.
2. Inventory every mutation path, including reads with side effects and background jobs.
3. Map code/config evidence to obligations; prose claims are leads, not evidence. Static mapping can identify a `structural candidate`, not conformance.
4. Discover the canonical conformance kit before invoking it. Use the deployment docs, a checked-out `frontier-infra/the-machine` repo, or an installed package that explicitly exposes the scorer. If the kit is unavailable, mark kit scoring `NOT-RUN`:

   ```sh
   python -c "import kit" && python -m kit score <deployment-repository>
   ```

5. Mark unexecuted chaos checks `NOT-RUN`; never infer a pass.
6. Record the spec version, kit version, date, limitations, and exact artifact locations.

An evidence packet expires as the deployment changes. Re-run it after material control-plane, verifier, gate, or model-policy changes.
