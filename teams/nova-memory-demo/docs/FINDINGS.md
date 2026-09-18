# Findings — Nova Marketplace overnight test

## Verified setup observations

- A synthetic pinned memory was written to the self-hosted mem9 server, read by ID, and read again after the server restarted. The stored record survived the process restart in TiDB.
- Keyword recall returned the synthetic checkout test memory. This verifies the demo's memory inspection path, not semantic search quality.
- Creating the TiDB database and loading the control-plane schema did not by itself provide a usable API key. A demo space had to be provisioned and connected to the database.
- The first server connection failure was an empty password value in the local environment. The resulting TiDB error explicitly said `using password: NO`; correcting the environment was the relevant fix.
- The mem9 server logged a warning while ensuring a session vector index on the Starter cluster. Direct memory writes, reads, and keyword recall still succeeded. This warning should be rechecked before claiming the full search schema is healthy.

## Comparison results

The two fresh agent sessions have not yet been recorded. Fill this section from real output; do not infer a winner from the setup check.

| Check | No memory | With mem9 |
| --- | --- | --- |
| Day-one memory write | Pending | Pending |
| Day-two recall | Pending | Pending |
| First response | Pending | Pending |
| Implementation and edge tests | Pending | Pending |
| Match to original decision | Pending | Pending |

## What surprised us

The most significant setup surprise was the gap between a healthy server and a ready demo space: the control-plane database, tenant record, runtime schema, and API key are separate pieces. The useful confirmation was a read after restart, because a single write/read in one process would not establish persistence. The actual agent-behavior finding remains open until the side-by-side run is captured.
