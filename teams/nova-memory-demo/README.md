# Nova Memory Demo

**Scenario:** Nova Marketplace  
**Team members:** Tiniusms

We are building a small demonstration that runs the same agent task twice: once without persistent memory and once with mem9. The comparison will show whether the agent can continue after a new session starts.

## How to run

Start with [demo/README.md](demo/README.md). It covers mem9 setup, the live memory check, two identical starter workspaces, and the fresh-session prompts. Run `npm test` in `demo/` to check the checkout starter and memory client. The exact Friday shipping decision is held outside the repository until the two day-two runs are captured.

The TiDB persistence check and the two-day comparison are complete. The baseline requested clarification in the fresh Day 2 task. The memory-enabled agent recovered the Day 1 decision, implemented it, and passed all 12 tests. See [docs/FINDINGS.md](docs/FINDINGS.md) for the measured result and [video/README.md](video/README.md) for the walkthrough package.

## Project folders

- `demo/` — working code
- `docs/` — setup notes and findings
- `deck/` — nine-slide presentation and source outline
- `video/` — evidence manifest, narration script, and walkthrough instructions
