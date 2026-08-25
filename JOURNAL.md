# Journal

Append-only. Newest entry last.

---

## 0 · 2026-08-24 (night) — Founding

Born from a 10-agent research pass run for the Canicrawl project: among five verified tracker candidates, ShortSupply ranked first — openFDA shortages endpoint confirmed live (keyless public JSON, 1,628 records), and the moat gap proven by the strongest possible evidence: HHS/NCBI researchers had to reconstruct shortage history from 84 Wayback Machine snapshots because the FDA overwrites status with no history. The user then said "build both and manage both" — so this was scaffolded the same night as Canicrawl's overnight growth loop, reusing its proven engine: fetch → snapshot → diff → static site → daily Actions cron.

Founding facts from the first fetch: 1,628 records (1,177 Current, 441 To Be Discontinued, 10 Resolved — the near-absence of Resolved records confirms resolutions vanish from the feed). First record inspected was generic Vyvanse (lisdexamfetamine), in shortage since 2023-07-14 — a 1,100+ day counter available on day one because the API carries initial_posting_date.

**Decisions:** never medical advice (hard rule in CLAUDE.md); Pages URL until the user buys a domain; cron at 06:47 UTC (offset from Canicrawl's 06:17); Canicrawl launches first.

**Deploy (same night):** live at https://mrmushu.github.io/shortsupply/ — repo MrMushu/shortsupply, repo-scoped write deploy key (~/.ssh/shortsupply_deploy), Pages via Actions, daily cron 06:47 UTC. First snapshot: 237 drugs, 71 in shortage, longest-running counter day 1,138 (lisdexamfetamine). Domain deferred: shortsupply.com taken; RDAP says shortsupply.io/.co/.today likely available — user picks later, DNS wiring same as canicrawl. Modal-fighting lesson: when a GitHub UI rerun stalls, an empty-commit push is the cleaner trigger.
