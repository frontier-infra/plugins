---
name: aar-attestation
description: Design, create, inspect, sign, verify, or integrate Agent Attestation Records (AARs) when agent work needs portable Ed25519-signed claims, independent verdicts, ground-truth status, and evidence commitments.
---

# Agent Attestation Records

Read `../../references/philosophy.md` for the signed-versus-true boundary and `../../references/threat-model.md` for verifier and secret risks.

Attest a target-runtime claim or outcome that the user has asked to make
portable. Do not issue an AAR for the coding assistant's patch, the plugin's
distribution, or SDK installation merely because this skill is available.

## Workflow

1. Fix the task claim and identify the subject, principal, verifier, verification method, independence class, and real-world source.
2. Run the check before deciding verdict or `ground_truth`; retain the raw result outside the model narrative.
3. Commit only necessary evidence: source, query/check, observation time, response hash, and a minimal non-sensitive excerpt.
4. Use the published tooling instead of inventing fields from memory: `npx -y @frontier-infra/audit` bundles the canonical AAR signer/verifier (`agentcontrolplane/tools/aar.mjs`); the spec lives in `frontier-infra/agentcontrolplane`.
5. Sign only through an operator-selected local key path and the discovered local tool. Never request, echo, copy, log, or bundle a private key. If key material was pasted into a prompt, transcript, issue, log, or other non-secret channel, treat it as exposed: refuse to use it, tell the operator to revoke or rotate it through their key-management process, and continue only with a newly provisioned key referenced by a local path or secret handle.
6. Verify the final bytes independently with the published verifier:

   ```sh
   npx -y @frontier-infra/audit verify --evidence evidence.json --aar aar.json --did-json did.json
   ```

   Signing during an audit run is `npx -y @frontier-infra/audit run <repo> --out <dir> --sign-key <private-jwk.json> --did-json <did.json>` — key material by local file path only.

7. Report the exact tool/schema source, signature validity when verified, AAR tier, evidence source, independence limitations, and any unverifiable claim. Keep the receipt and raw verification artifact linked but separately governed.

## Safety rules

- Do not write `verified` or `ground_truth: confirmed` until the actual check succeeded.
- Do not let the worker self-attest as the independent verifier.
- Keep evidence minimal and avoid credentials, personal data, and proprietary raw system output.
