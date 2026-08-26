# Journal

Append-only. Newest entry last.

---

## 0 · 2026-08-24 (night) — Founding

Born from a 10-agent research pass run for the Canicrawl project: among five verified tracker candidates, ShortSupply ranked first — openFDA shortages endpoint confirmed live (keyless public JSON, 1,628 records), and the moat gap proven by the strongest possible evidence: HHS/NCBI researchers had to reconstruct shortage history from 84 Wayback Machine snapshots because the FDA overwrites status with no history. The user then said "build both and manage both" — so this was scaffolded the same night as Canicrawl's overnight growth loop, reusing its proven engine: fetch → snapshot → diff → static site → daily Actions cron.

Founding facts from the first fetch: 1,628 records (1,177 Current, 441 To Be Discontinued, 10 Resolved — the near-absence of Resolved records confirms resolutions vanish from the feed). First record inspected was generic Vyvanse (lisdexamfetamine), in shortage since 2023-07-14 — a 1,100+ day counter available on day one because the API carries initial_posting_date.

**Decisions:** never medical advice (hard rule in CLAUDE.md); Pages URL until the user buys a domain; cron at 06:47 UTC (offset from Canicrawl's 06:17); Canicrawl launches first.

**Deploy (same night):** live at https://mrmushu.github.io/shortsupply/ — repo MrMushu/shortsupply, repo-scoped write deploy key (~/.ssh/shortsupply_deploy), Pages via Actions, daily cron 06:47 UTC. First snapshot: 237 drugs, 71 in shortage, longest-running counter day 1,138 (lisdexamfetamine). Domain deferred: shortsupply.com taken; RDAP says shortsupply.io/.co/.today likely available — user picks later, DNS wiring same as canicrawl. Modal-fighting lesson: when a GitHub UI rerun stalls, an empty-commit push is the cleaner trigger.

---

## 1 - 2026-08-24 (night) - Ring SS-1: GEO parity

llms-full.txt (whole 237-drug ledger in one file), WebSite/Organization JSON-LD on the homepage, IndexNow key + submission script wired into the daily workflow post-deploy. Data surprise found while verifying: the longest-running US drug shortage is Atropine Sulfate Injection at day 5,350 - over 14 YEARS - dwarfing the lisdexamfetamine counter. Prime digest/launch material.


---

## 2 - 2026-08-25 (early AM) - Ring SS-2 + cron verified

The 06:47 UTC cron fired at 07:30 UTC (GitHub schedule jitter - noted as normal) - run 7 SUCCESS, first unattended crawl. Ring SS-2: the differ now catches per-NDC availability-wording revisions (synthetic test green: one changed presentation -> one changelog entry), and /graveyard/ is live - the page that catches drugs quietly deleted from the FDA list, empty-state until the first departure. Both engines of the archive thesis (quiet revisions + quiet removals) are now instrumented.

**Ring SS-3, ~02:05:** Launch kit written (MARKETING.md): positioning 'The FDA overwrites this record. We kept it.'; hooks are the day counters (Atropine day 5,350), vanishing resolutions (10 of 1,628 records), and the graveyard; channels Show HN / Data Is Plural / health-data journalists / r/pharmacy-with-care; tone rule codified - never patient-fear framing, never medical advice, every post user-gated. Press & citation block added to /about/. Launch gated behind Canicrawl's and >=2 weeks of diffs.

**Ring BOTH-1, ~03:45:** /colophon/ added (making-of story), footer cross-links to canicrawl.

**Ring SS-4, ~04:50:** Per-category RSS feeds - one per therapeutic area (22 feeds), linked from the changelog page. Someone on ADHD meds can now follow only Psychiatry; a clinic can follow only Oncology. Empty until diffs accumulate, exactly like the main feed.

---

## 3 - 2026-08-25, 07:31 - GOOD MORNING

Born and fully launched-ready in one night. Overnight rings: GEO parity (llms-full.txt, JSON-LD, IndexNow), availability-revision detection, /graveyard/, launch kit (never fear-framing), colophon, 22 per-category RSS feeds, canonical/OG/skip-link pass. First unattended cloud crawl verified. All green this morning (run 11 success, site 200). USER-NEEDED: domain pick (shortsupply.io/.co/.today). Launch waits for Canicrawl's, then >=2 weeks of diff history. Daily 8:03 AM ops task takes over.

---

## 4 — 2026-08-25, ops session — verified, no changes needed

Cron green: the 06:47 UTC schedule fired at 07:30 UTC, run SUCCESS, and every push-triggered deploy since last night's rings is green too. Nothing to pull.

State check: `data/changelog.json` still doesn't exist, which is correct — the repo holds exactly one snapshot (2026-08-25), so the differ has nothing to compare against until tomorrow's cron writes the second. `build.js` already handles the missing file (falls back to a founding entry), so the changelog page, the main RSS feed and all 22 category feeds render empty-but-valid, as designed. First real availability diffs and the first possible /graveyard/ entry both land 2026-08-26.

Today's portfolio ring went to Canicrawl (CC-7: a /health/ coverage ledger publishing the readable-vs-unreadable denominator). The transferable idea is queued for here as well — ShortSupply's equivalent honesty surface is data provenance (what the FDA API returned, what it dropped), and SS-5 (watchlist parity with Canicrawl's stars) sits ahead of it in the OPERATIONS.md queue.

**Next:** tomorrow — verify the first cross-day diff appears, confirm the changelog and category feeds populate, then take SS-5. Launch still gated behind Canicrawl's and ≥2 weeks of diff history. USER-NEEDED (unchanged): domain pick (shortsupply.io / .co / .today).

---

## 5 — 2026-08-26, ops session — the first cross-day diffs, and the graveyard opens

**Cron green.** The 06:47 UTC schedule fired at 07:32 UTC (normal GitHub jitter), run SUCCESS. Pulled the first real `data/changelog.json` plus snapshot `2026-08-26.json`.

**19 entries — the differ works on real data.**

- **17 availability revisions** across drugs whose wording the FDA quietly changed: Clindamycin Phosphate Injection (6 presentations reworded), Bupivacaine Hydrochloride Injection (5), Quinapril Hydrochloride Tablet (4), Carboplatin Injection (4), Sodium Bicarbonate Injection (4), Furosemide Injection (3), plus Lidocaine, Atropine Sulfate, Liraglutide, Ketorolac, Dexmedetomidine, Dextrose 50%, Methylprednisolone, Dobutamine, Dopamine, Desmopressin and Rifampin. These are exactly the silent edits the archive exists to catch — no shortage started or ended, the record simply changed underneath.
- **1 new shortage:** Disopyramide Phosphate Capsule, Extended Release, entering as `discontinuing`.
- **The first `/graveyard/` entry:** **Hydrocortisone Sodium Succinate Injection was removed from the FDA list altogether**, from status `resolved`. It is no longer on the FDA's page; it is still on ours, permanently, with the date it vanished. Day two of unattended operation and the thesis — "the FDA overwrites this record, we kept it" — has its first concrete exhibit.

**Verification:** `node scripts/build.js` clean at 245 pages (237 drugs, 71 in shortage). `/graveyard/` now renders Hydrocortisone Sodium Succinate Injection instead of its empty state. The changelog page carries today's date. **The 22 per-category RSS feeds populated for the first time** — anesthesia 4 items, anti-infective 2, analgesia/addiction 1, etc. — so the "follow only the therapeutic area you care about" promise from SS-4 is now demonstrably live rather than an empty-but-valid feed. No crawl was run from this machine; the cloud cron keeps its one polite pass per UTC day.

**No ring taken here today.** The portfolio's one ring went to Canicrawl (CC-8: homepage DOM weight, 23,388 → 14,122 elements). SS-5 (watchlist parity with Canicrawl's stars) remains next in the OPERATIONS.md queue.

**Next:** take SS-5; watch whether Hydrocortisone Sodium Succinate reappears (an FDA re-listing would be its own story) and whether the availability-revision volume of ~17/day holds — if it does, that rate is itself a publishable finding for ShortSupply's digest #1.

**USER-NEEDED (unchanged, not acted on):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history.
