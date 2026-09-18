# Demo plan: the overnight decision

## One-sentence story

A Nova Marketplace coding agent learns a shipping-promotion decision on day one and must implement it after a fresh start on day two.

## Synthetic decision to remember

The facilitator gives both agents the same fictional, multi-part shipping decision in session one. Keep the exact decision in facilitator notes outside this repository until the runs are complete. It must be absent from the starter code, tests, repository documentation, and second-session prompt. That makes persistent memory the only source for the complete rule after restart.

## Two runs

1. Start both agents from the same code checkout and give them the same first-session conversation containing the decision.
2. In the baseline run, disable memory. In the second run, enable mem9 and verify the decision was stored.
3. Close both sessions. Start two fresh sessions from identical code states.
4. Give both agents the same follow-up: “Implement the Friday free-shipping eligibility check we agreed on yesterday. Add tests for the edge cases.”
5. Compare the outcome. Record whether each agent retrieves the complete rule, asks for missing details, or makes assumptions. Show the stored memory and source of retrieval in the memory run.

## Fairness controls

- Same model, task prompt, starter code, and test harness for both runs.
- No copy of the decision in the repository, README, test names, or second-session prompt before either run.
- No manual correction during the second-session runs. If an agent asks a question, record that as the observed outcome.
- Report the actual output, including any failure or ambiguity. Do not script the agent's answer.

## Expected runnable pieces

- Small synthetic Nova Marketplace checkout example
- Repeatable session-one and session-two prompts
- Instructions for connecting the agent to the team's self-hosted mem9 server
- Verification that a memory survives a server restart
- A comparison record and a short memory-inspection view or command

## Acceptance check

Check both runs against the facilitator's unpublished decision. The presentation must show both agent runs side by side and make clear which facts came from mem9. Add the final decision and outcomes to the write-up only after the runs have been recorded.
