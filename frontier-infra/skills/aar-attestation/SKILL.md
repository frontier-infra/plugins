---
name: aar-attestation
description: Design, create, inspect, sign, verify, or integrate Agent Attestation Records (AARs) when agent work needs portable Ed25519-signed claims, independent verdicts, ground-truth status, and evidence commitments.
---

# Agent Attestation Records

Read `../../references/philosophy.md` for the signed-versus-true boundary and `../../references/threat-model.md` for verifier and secret risks.

## Workflow

1. Fix the task claim and identify the subject, principal, verifier, verification method, independence class, and real-world source.
2. Run the check before deciding verdict or `ground_truth`; retain the raw result outside the model narrative.
3. Commit only necessary evidence: source, query/check, observation time, response hash, and a minimal non-sensitive excerpt.
4. Discover the current upstream AAR schema and tooling before constructing a record. Prefer a checked-out `frontier-infra/agentcontrolplane` repository, installed package docs, or an available `aar` executable. If no current schema/tooling is available, stop with a prerequisite instead of inventing fields from memory.
5. Sign only through an operator-selected local key path and the discovered local tool. Never request, echo, copy, log, or bundle a private key. If key material was pasted into a prompt, transcript, issue, log, or other non-secret channel, treat it as exposed: refuse to use it, tell the operator to revoke or rotate it through their key-management process, and continue only with a newly provisioned key referenced by a local path or secret handle.
6. Verify the final bytes independently with the discovered verifier command. For example, only run this if `aar` is actually available in `PATH`:

   ```sh
   command -v aar >/dev/null && aar verify <record.json>
   ```

7. Report the exact tool/schema source, signature validity when verified, AAR tier, evidence source, independence limitations, and any unverifiable claim. Keep the receipt and raw verification artifact linked but separately governed.

## Safety rules

- Do not write `verified` or `ground_truth: confirmed` until the actual check succeeded.
- Do not let the worker self-attest as the independent verifier.
- Keep evidence minimal and avoid credentials, personal data, and proprietary raw system output.
