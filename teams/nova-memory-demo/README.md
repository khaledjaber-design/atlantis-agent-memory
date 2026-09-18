# Nova Memory Demo

**Scenario:** Nova Marketplace  
**Team members:** Tiniusms

We are building a small demonstration that runs the same agent task twice: once without persistent memory and once with mem9. The comparison will show whether the agent can continue after a new session starts.

## How to run

Start with [demo/README.md](demo/README.md). It covers mem9 setup, the live memory check, two identical starter workspaces, and the fresh-session prompts. Run `npm test` in `demo/` to check the checkout starter and memory client. The exact Friday shipping decision is held outside the repository until the two day-two runs are captured.

The TiDB-backed memory write, read, server restart, and read-after-restart checks have passed. The actual agent comparison and video are still pending; see [docs/FINDINGS.md](docs/FINDINGS.md) for verified observations and [video/RECORDING_PLAN.md](video/RECORDING_PLAN.md) for the capture plan.

## Project folders

- `demo/` — working code
- `docs/` — setup notes and findings
- `deck/` — presentation
- `video/` — walkthrough
