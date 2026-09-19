# Nine-slide presentation outline

Use the selected dark presentation template. Replace the evidence placeholders with captured output before presenting or submitting the final deck. The deck should not claim an agent result before the two fresh sessions run.

1. **Nova Marketplace overnight test** — One checkout decision on day one; implementation requested in a fresh session on day two.
2. **Why continuity matters** — A fresh coding agent sees code but lacks yesterday's discussion. The demo tests whether stored memory closes that specific gap.
3. **Identical starting point** — Two copies of the same Node.js checkout starter, tests, model, and day-one/day-two prompts. Only mem9 access changes.
4. **Day-one decision** — Show the exact fictional rule after both runs are recorded. Show the memory write ID from the live run.
5. **Persistence check** — TiDB Cloud Starter → self-hosted mem9 → pinned memory. Show the same ID returned after a server restart. This setup check is already verified.
6. **Fresh-session prompt** — Display the same day-two request in both runs and the first recall attempt. The prompt omits the rule.
7. **Side-by-side agent behavior** — Add actual baseline and memory-agent first responses, with tool output and no edits to the transcript.
8. **Implementation and tests** — Compare actual code and edge-case tests against the private facilitator decision. State failures and ambiguity plainly.
9. **What we learned** — Summarize the observed difference, show exactly what mem9 stored, and name the limits: one synthetic task, keyword retrieval, no claim about semantic search or production scale.
