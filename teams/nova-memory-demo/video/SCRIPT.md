# Five-minute walkthrough script

## 0:00–0:30 | Question

“Nova Marketplace made a detailed Friday shipping decision on Day 1. On Day 2, a fresh coding-agent task had to implement it without seeing the earlier transcript. We tested whether persistent memory changed the result.”

Show the title slide and the identical `baseline` and `with-memory` folders.

## 0:30–1:20 | Day 1

Show `baseline-day-one.mp4`, then `with-memory-day-one.mp4`.

“Both tasks received the same fictional rule. The baseline had no memory credentials and reported that it could not store the decision. The memory-enabled task saved it as a pinned mem9 record and returned the record ID.”

## 1:20–1:45 | Persistence

Show the memory ID and the read-after-restart result.

“We restarted the self-hosted mem9 server and inspected the same ID. TiDB returned the complete decision, confirming that the record survived the process restart.”

## 1:45–2:35 | Fresh Day 2 prompt

Show the same Day 2 prompt in both tasks, followed by `baseline-day-two-final.mp4`.

“The prompt asked both fresh tasks to recall Friday shipping before editing. It did not contain the rule. The baseline lacked the local environment file and asked for the missing details rather than guessing.”

## 2:35–3:55 | Memory-enabled result

Show selected portions of `with-memory-day-two-final.mp4`: the recall output, implementation summary, changed files, and final tests.

“The memory-enabled task recovered the stored decision. It implemented the product-only 5,000-cent threshold, contiguous-state and DC check, explicit timestamp zone requirement, and Friday calculation in America/New_York. It preserved `orderTotalCents`. All 12 tests passed.”

## 3:55–4:30 | Retrieval repair

Briefly show `with-memory-day-two.mp4` or a still from it.

“The first recorded memory run exposed a real setup issue. Direct inspection showed the record in TiDB, while keyword search returned zero results. We disclosed the failure, added a tested fallback that filters the authenticated memory list, and recorded the successful run again. The failed clip remains in the evidence set.”

## 4:30–5:00 | Conclusion and limits

Show `docs/FINDINGS.md` and the final comparison slide.

“In this controlled example, the baseline stopped for clarification. The memory-enabled task continued correctly in a fresh session. This demonstrates continuity for one synthetic keyword-oriented task. It does not establish semantic retrieval quality, production scale, or results across different models.”
