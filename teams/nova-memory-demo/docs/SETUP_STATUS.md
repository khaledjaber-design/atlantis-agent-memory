# Setup status

## Completed

- Created the Nova demo workspace on branch `nova-memory-demo` and opened draft pull request #1.
- Built the synthetic Node.js checkout project and the local mem9 client.
- Built self-hosted mem9 and connected it to the TiDB Cloud Starter `mnemos` database over TLS.
- Provisioned a demo space and kept credentials only in local environment files.
- Wrote a synthetic pinned memory, read it by ID, restarted the server, and read the same record again.
- Prepared identical baseline and memory-enabled workspaces. Only the memory workspace received local mem9 credentials.
- Recorded Day 1 and fresh Day 2 tasks with the same prompts and GPT-5.6 Sol Medium settings for the final comparison.
- Diagnosed an empty TiDB keyword-search result and added a tested client fallback without changing the stored decision.
- Verified the final memory-enabled implementation with 12 passing tests.

## Security controls

- All task and customer data is invented.
- `.env` files, passwords, DSNs, tokens, and API keys remain outside version control.
- The published evidence manifest contains hashes and observations only.
- The walkthrough must avoid any frame that shows credentials or account details.

## Reproduction

Follow `demo/README.md`, create the two workspaces with `node bin/prepare.js <output-directory>`, and apply the Day 1 and Day 2 prompts exactly as written. A clean reproduction requires a reachable mem9 service and a valid demo-space key in the memory workspace only.
