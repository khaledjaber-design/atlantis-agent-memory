# Findings: Nova Marketplace overnight test

## Question

Can a coding agent recover a detailed product decision in a fresh session when the decision exists only in persistent memory?

## Method

Two GPT-5.6 Sol Medium tasks received the same starter code and prompts. The baseline workspace had no `.env` file or mem9 access. The memory workspace had access to the team's self-hosted mem9 server backed by TiDB. Neither Day 2 prompt contained the shipping rule or an earlier transcript.

The Day 1 decision required `eligibleForFridayFreeShipping({ items, destinationState, orderedAt })` to return true only when:

- the cart is nonempty;
- `orderedAt` is a valid ISO-8601 timestamp with an explicit offset or `Z` and falls on Friday in `America/New_York`;
- `destinationState` is one of the 48 contiguous states or DC, matched case-insensitively;
- the subtotal of items whose `kind` is exactly `product` reaches 5,000 cents.

Gift-card and digital items contribute zero to the threshold. The implementation must retain the existing integer validation conventions and leave `orderTotalCents` unchanged.

## Verified comparison

| Check | No memory | With mem9 |
| --- | --- | --- |
| Day 1 | Reported that persistent memory was unavailable | Stored the decision as pinned memory `9552f313-000f-4f8a-86ba-b75ec2927ce4` |
| Restart check | No record to inspect | The same memory ID and content remained available after restarting mem9 |
| Day 2 recall | Failed because `.env` and `MEM9_API_KEY` were absent | Returned the complete Day 1 decision after the retrieval repair |
| First response | Asked for the missing rule and changed no files | Continued without clarification and implemented the rule |
| Implementation | None | Added `eligibleForFridayFreeShipping` and edge-case tests |
| Verification | Existing starter files remained unchanged | All 12 tests passed independently |
| Match to decision | Not applicable because the agent stopped | Matched the threshold, item-type, geography, timezone, validation, and regression requirements |

## Retrieval issue and repair

The first recorded memory-enabled Day 2 run returned zero keyword matches even though direct inspection proved that TiDB still held the memory. The issue was the TiDB keyword search path, not data loss. The demo client originally treated an empty search result as final.

The repaired client still calls mem9 keyword search first. When that route returns no matches, it requests the authenticated memory list and performs case-insensitive matching across every query term. Two tests cover the fallback and the normal server-result path. This repair is part of the disclosed demo setup, and the failed run remains diagnostic evidence.

## Evidence

- `baseline-day-one.mp4`: 42 seconds, baseline reports no persistent memory.
- `with-memory-day-one.mp4`: 39 seconds, mem9 returns the saved memory ID.
- `baseline-day-two-final.mp4`: 35 seconds, fresh baseline asks for the missing rule.
- `with-memory-day-two-final.mp4`: 2 minutes 1 second, fresh memory-enabled task implements the decision and reports 12 passing tests.
- `with-memory-day-two.mp4`: 20 seconds, retained diagnostic capture of the keyword-search failure before repair.

The evidence files are listed with hashes in `video/EVIDENCE.md`. The supplied final screenshot and an independent local test run verify the memory-enabled implementation and 12-test result. The final video could not be decoded frame by frame in the available agent environment, so the project does not claim a complete visual review of every frame or its audio.

## Conclusion

In this controlled task, the baseline could not continue without clarification. The memory-enabled agent recovered the recorded decision and completed the implementation in a fresh session. The result demonstrates continuity for one synthetic, keyword-oriented task. It does not measure semantic retrieval quality, production scale, long-term accuracy, or behavior across different models.
