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

---

## 6 — 2026-08-27, ops session — the cron did not fire, and today's snapshot needs a human click

**USER-NEEDED (time-sensitive — expires 23:59 UTC today):** **no scheduled run was created at all today.** Not a failed run — no run. As of 15:04 UTC the newest entry in this repo's run list is still the 06:47 → 07:32 UTC run from 2026-08-26, so the 06:47 schedule was dropped rather than delayed. GitHub drops scheduled workflows under load and does not retry them; yesterday's Actions `major_outage` and a "Disruption with GitHub Billing" incident still open at 14:49 UTC today are a sufficient upstream explanation, so per the failure playbook I did not touch the workflow.

I cannot recover it from here, for a specific reason worth recording: **a push does not crawl.** `.github/workflows` gates the crawl step on `if: github.event_name != 'push'`, so the push at the end of this session redeploys the site but captures no snapshot. The only on-demand path that actually crawls is **`workflow_dispatch`**, which needs a GitHub token this session does not hold — the repo pushes over a deploy key, which is git-only.

> **What I'm asking for:** GitHub → MrMushu/shortsupply → Actions → "Daily crawl & deploy" → **Run workflow** on `main`. Same click is needed on MrMushu/canicrawl. It runs the ordinary crawl → snapshot → diff → deploy path, one polite pass. Before 23:59 UTC and 2026-08-27 stays in the record; after that the day is a permanent hole and tomorrow's diff quietly becomes a two-day diff.

For an archive whose entire thesis is "the FDA overwrites this record, we kept it", a missing day is the one failure mode that actually costs something — the openFDA endpoint only ever serves *today*, so a day not captured is a day gone. That is why this is escalated rather than shrugged at.

**Site state: fine, just not refreshed.** `https://mrmushu.github.io/shortsupply/` is HTTP 200 and `/graveyard/` still serves the Hydrocortisone Sodium Succinate Injection entry from yesterday. One zombie run from 2026-08-26 15:12 is still sitting `queued` 24 hours later — a leftover of yesterday's outage. It holds the `pages` concurrency group, so I left it alone rather than pushing at it; if the dispatch run above is also stuck behind it, that is the thing to cancel first.

**Diff review: nothing new.** `git pull` was a no-op — no `2026-08-27` snapshot, no new changelog entries, no new graveyard departures. Yesterday's 17 availability revisions plus the first graveyard entry remain the standing material for ShortSupply's digest #1.

**No ring taken here.** The portfolio's one ring went to Canicrawl (CC-9: splitting the coverage ledger's `unreachable` bucket into "domain does not resolve" vs "host answered nothing" on recorded DNS evidence, and visually demoting the 172 never-were-websites rows on the index without removing them from the count). SS-5 — the watchlist, parity with Canicrawl's stars — remains next in the OPERATIONS.md queue.

**Next:** confirm the dispatch run happened and 2026-08-27 landed; then take SS-5. Still watching whether Hydrocortisone Sodium Succinate reappears on the FDA list, and whether the ~17/day availability-revision rate holds — if it does, that rate is itself the finding digest #1 should lead with.

**USER-NEEDED (carried, unchanged):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history.

### Addendum, same session — Actions is healthy; the dispatch click will work

Canicrawl's push from this session built and deployed in about 90 seconds (verified against the live site, not the API). Push-triggered runs are therefore executing normally right now, which narrows this morning's failure to exactly one thing: **the scheduled event was dropped and never retried** — not an outage, not our workflow. The practical upshot is that the **Run workflow** click asked for above will execute immediately rather than queue behind anything, so today's snapshot is still recoverable until 23:59 UTC.

---

## 7 — 2026-08-28, ops session — Ring SS-5: stars, and yesterday's "lost" day was never lost

**Yesterday's escalation resolves itself, and the resolution is worth recording precisely.** I asked the user to click **Run workflow** on both repos before 23:59 UTC because no scheduled run existed at 15:04. No click was needed: the scheduled run for 2026-08-27 was **created at 17:54:07 UTC** — about eleven hours past the 06:47 schedule — and succeeded. `data/snapshots/2026-08-27.json` is in the repo, pulled clean this morning. GitHub had not dropped the event; it had queued it for half a day.

That changes the playbook, so I am stating the new rule plainly: **a missing scheduled run is not evidence of a dropped one until the UTC day is nearly over.** Firing `workflow_dispatch` at midday against a schedule that is merely late produces **two crawl passes in the same UTC day**, which violates the one-polite-pass rule this project is built on — for ShortSupply that is two hits on openFDA, for Canicrawl two passes over a thousand strangers' servers. Waiting costs a few hours of freshness; guessing wrong costs our politeness guarantee. The escalation window should be late in the UTC day, not at the ops session's convenience. (Journaled identically in the sibling repo; a note is going into OPERATIONS.md's failure playbook only if the user approves, since the playbook is methodology.)

**Cron status today: not yet, and per the above that is not yet a problem.** As of 15:04 UTC on 2026-08-28 no run exists for either product. githubstatus.com reports **All Systems Operational, zero open incidents** — so nothing upstream is broken, and yesterday's pattern says the run may still arrive. Not escalating, not dispatching. Tomorrow's session sees whether 2026-08-28 landed.

**Diffs: 27 entries for 2026-08-27.** 26 availability revisions and **one new shortage — Mesalamine Capsule, Extended Release, entering as `discontinuing`** (an ulcerative-colitis maintenance drug whose maker is withdrawing it, not a supply failure). No graveyard departures; Hydrocortisone Sodium Succinate Injection remains the only removal. The panel also grew from 237 to 238 tracked drugs. The **availability-revision rate is holding at ~26/day against ~17 yesterday**, and that stability across three days is now a real number rather than a first impression — it is what digest #1 should lead with: the FDA quietly rewords roughly two dozen presentations a day, and nobody keeps the previous wording but us.

**Ring SS-5 — the watchlist reaches ShortSupply.** Straight parity with Canicrawl's CC-5, deliberately the same code shape so one engine serves both products when email alerts arrive:

- `assets/app.js` gains the star engine: a `shortsupply-watchlist` localStorage set, `☆/★` toggles with `aria-pressed`, and an `only watched ★` filter that composes with the existing search, category and only-current-shortages controls.
- Index rows get a leading watch cell; the star carries **no `data-d` of its own** and resolves its key from the row's existing `data-drug`, the CC-8 lesson applied on the way in rather than retrofitted — 238 rows, 238 stars, zero duplicated attributes.
- Drug pages get a hero star next to the `<h1>`, which needed `page()` to ship `app.js` on **every** page instead of the index alone; the index's hand-written `<script>` was removed in the same change so nothing double-loads.
- The key is the **lowercased drug name**, not the URL slug, so the index and the drug page agree without a lookup table.

**Verification.** Build clean at 246 pages. Every drug page was re-opened and its hero key compared against the set of index row keys: **238/238 have a star, 0 missing, 0 key mismatches, and all 238 row keys are unique** — the last check matters because the key is a name, and two drugs colliding would silently star each other. `dist/app.js` was then executed for real in a DOM shim fed the actual generated rows: baseline 238 → star two drugs through the real click handlers (localStorage wrote both names, glyphs flipped ☆→★, `aria-pressed` true, neighbouring stars untouched) → "only watched" 2 → unstar one while the filter was active → 1 → filter off 238 → only-current-shortages **71, matching the snapshot exactly** → watched AND in-shortage 1 → search "albuterol" 1 → reset 238 → and finally a **simulated reload**: a fresh run of the script against the same localStorage repainted the correct star and left the others empty. **17 checks, 17 pass.** Served `dist/` and confirmed HTTP 200 on `/`, `/app.js`, `/style.css`, `/drug/albuterol-sulfate-solution/`, `/graveyard/`, `/changelog/`, `/stats/`, `/api/`, with 238 stars, the new toggle, the hero button and the `button.watch` rules present in the **served** bytes. The disclaimer is still on the drug page — checked explicitly, because it is the one thing no ring is allowed to disturb.

**Next:** confirm 2026-08-28 lands. Then ShortSupply's digest #1 has its lead (the ~26/day quiet-revision rate) once the changelog has a week. Still watching for Hydrocortisone Sodium Succinate reappearing on the FDA list.

**USER-NEEDED (carried, unchanged):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history.
