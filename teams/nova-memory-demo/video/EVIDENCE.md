# Evidence manifest

| File | Duration | SHA-256 | Verified observation |
| --- | ---: | --- | --- |
| `baseline-day-one.mp4` | 00:42 | `C53C70FF368D55BEEE0D4956A617FCF423ABB4C04A56B8BDFE7ABDA0B0AEA280` | Baseline reports persistent memory unavailable |
| `with-memory-day-one.mp4` | 00:39 | `24C0DBFC9DF347C1E745C6B1635F3E02F76D19C4D21EA01EC2750B07FA1C648F` | Memory-enabled task stores the decision and reports its ID |
| `baseline-day-two-final.mp4` | 00:35 | `579E4B02F226F4589219D84CD2034AF8E366FF050C733EBC7ACF8D4D8D078FFB` | Fresh baseline asks for the missing rule and changes no files |
| `with-memory-day-two-final.mp4` | 02:01 | `38626B86FCF0839459C8AB5D79512433311B547FCD02FE246E43B45E3BFA94D8` | Final screenshot confirms implementation summary and 12 passing tests |
| `with-memory-day-two.mp4` | 00:20 | `82D642E56C78B24D8AABDE22DED104F2C0EA97FEB6EE742DA984CA3FB34352B4` | Diagnostic capture of empty keyword retrieval before repair |

The files were copied with matching source and destination hashes. The final memory-enabled video could not be decoded frame by frame in the available agent environment. Its duration and hash were verified, and the user supplied a final screenshot showing the implementation summary and 12 passing tests.

## Assembled walkthrough

- File: `Nova-Memory-Walkthrough.mp4`
- Duration: 00:05:04.733
- Video: H.264, 1920×1080, 30 fps
- Audio: none; use `SCRIPT.md` for narration
- SHA-256: `ABACC6CDE3D8C5CD16BC9A50408358BCF5CF9E7884372E014681E6D5A8C57037`
- Review: sampled frames across the complete timeline and visually checked all six disclosure cards
