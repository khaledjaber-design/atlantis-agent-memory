# Setup status

This record follows the repository [setup guide](../../../SETUP.md) and [team instructions](../../README.md). Update it as each step is verified.

## Completed

- Read the project, setup, and team instructions.
- Cloned the upstream repository locally.
- Created the `nova-memory-demo` working branch from the fork's branch.
- Created the required team folder structure.
- Created and verified the GitHub fork at `khaledjaber-design/atlantis-agent-memory`.
- Connected the local checkout to the fork as `origin` and retained the original repository as `upstream`.
- Confirmed that Git and Node.js are available on the local Windows computer.
- Cloned the mem9 source into a separate local workspace folder.
- Downloaded Go 1.24.13 from the official Go site into the workspace, verified its published SHA-256 checksum, and built `mnemo-server.exe` successfully.
- Built the synthetic checkout starter and verified its three Node.js tests pass.
- Kept the exact session-one decision outside the repository so a fresh agent cannot read it from the starter checkout.
- Opened draft pull request #1 from the fork.
- Created the TiDB Cloud Starter `mnemos` database and loaded mem9's control-plane schema.
- Built and started the self-hosted mem9 server against TiDB with TLS.
- Created a demo space, wrote a synthetic memory, read it, restarted the server, and read the same memory again.
- Verified keyword recall from the live server and added a tested local memory client plus identical-workspace preparation script.

## Next setup steps

1. Run and record the two fresh agent sessions with identical prompts and code, varying only memory access.
2. Add the actual decision and observed outcomes to the findings page after both runs.
3. Produce the 8–10 slide deck and five-minute walkthrough from the captured evidence.
4. Push the completed work to the fork so draft pull request #1 updates.

## Project rules

- Use invented data only.
- Keep all project changes inside `teams/nova-memory-demo/`.
- Do not commit API keys, passwords, connection strings, or tokens. The repository ignores `.env` files.
- Keep prompts, task data, and code identical between the two runs except for memory access.
- Document the demo so an outsider can run it from a clean checkout.

## Submission work still required

- Actual two-session comparison and its evidence
- 8–10 slide deck in `deck/`
- Five-minute side-by-side walkthrough in `video/`
- Final comparison results in `docs/FINDINGS.md`
