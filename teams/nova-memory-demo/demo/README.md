# Nova Marketplace overnight test

This demo gives two fresh coding-agent sessions the same fictional checkout task. The only difference is whether `MEM9_API_KEY` is available. The day-one decision is supplied to both agents, then withheld from their fresh day-two sessions. The memory-enabled agent can retrieve it from self-hosted mem9; the baseline cannot.

The starter checkout contains no promotion rule. It uses integer cents and Node.js built-in modules, so `npm test` needs no install.

## Prerequisites

- Node.js 20.6 or newer and a coding agent that can run terminal commands.
- A TiDB Cloud Starter database and a self-hosted mem9 server. Follow the repository's [setup guide](../../../SETUP.md) to create `mnemos` and load `mem9/server/schema.sql`.
- A TiDB DSN with `parseTime=true&tls=true` in `MNEMO_DSN`. Keep it and the generated key in your local environment; never commit them.

If your mem9 server is running in manual TiDB mode, set `MNEMO_DB_BACKEND=tidb` and `MNEMO_TIDB_ZERO_ENABLED=false`. From the **mem9/server** directory, run `go run <absolute path to this demo>/setup/bootstrap.go` once with `MNEMO_DSN` set. It creates a Nova demo space and prints its key. Set `MEM9_API_KEY` to that value. Start `mnemo-server` and leave it running on port 8080. Set `MEM9_BASE_URL` only if the server is elsewhere.

The bootstrap command is idempotent for a space named `Nova Memory Demo`. It stores the database connection in mem9's control plane, as mem9 requires for a manual space. Do not put its output or the DSN in Git.

## Verify the connection

Run `node bin/memory.js remember` and enter a harmless synthetic test fact. Copy the returned ID. Run `node bin/memory.js inspect <ID>`. Restart mem9 and inspect the same ID again. `node bin/memory.js recall checkout` performs keyword retrieval. A successful read after restart shows that the record came from TiDB rather than process memory.

## Prepare identical workspaces

From this `demo` directory, run `node bin/prepare.js <new empty output directory>`. This creates `baseline` and `with-memory` with identical code, tests, and memory client. Put a local `.env` file containing `MEM9_API_KEY=<your demo space key>` in `with-memory` only. Do not copy this README, facilitator notes, or your day-one decision into either workspace. Check that `npm test` passes in both before starting. Use the same agent model and settings for both runs.

## Session one: give both agents the decision

Choose a fictional Friday free-shipping decision with several edge cases. Keep its exact wording outside the repository until both day-two runs are finished. Open a separate agent session in each prepared workspace. Give each agent **the same message**, replacing the bracketed part with the exact decision:

> Today we agreed on this Nova Marketplace Friday free-shipping rule: [decision]. Do not edit code today. If persistent memory is available, store the exact rule using `node --env-file=.env bin/memory.js remember "..."` and report the memory ID. If memory is unavailable, say so. We will continue tomorrow.

For the baseline agent, leave `.env` absent and `MEM9_API_KEY` unset. For the memory agent, use only the local `.env` described above. Do not give either agent a prior chat transcript or the exact decision in a file. Close both sessions after recording their replies.

## Session two: fresh agents, same prompt

Start a **new session** in each workspace. Preserve the environment difference: baseline has no `.env`; memory has the same local `.env` as session one. Send the same message to each:

> Implement the Friday free-shipping eligibility check we agreed on yesterday. Add tests for the edge cases. First try `node --env-file=.env bin/memory.js recall "Friday shipping"`. If you cannot recover the full rule, ask for the missing details rather than inventing them. Do not use an earlier chat transcript.

Do not answer questions or correct either agent until both runs are captured. Record the first response, tool output, code diff, and tests for each. If the memory run fails to retrieve the rule, report that failure; do not silently repair it. The comparison is about observed behavior.

## Inspect and evaluate

Run `node bin/memory.js inspect <ID>` to show exactly what mem9 stored. Compare each day-two implementation to the original decision in your private facilitator notes. Record whether the agent retrieved the rule, asked for clarification, or guessed. Only after the runs may you publish the exact decision and observed outcomes in `docs/FINDINGS.md`.

The server can work in raw, keyword-search mode without an embedding or LLM API key. Keyword recall is deliberate here: the prompt and stored decision both contain “Friday shipping.” This does not test semantic retrieval.
