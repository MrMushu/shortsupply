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

---

## 8 — 2026-08-29, ops session — no code change here; the ring went to the sibling, and it was worth it

**Cron: green, and yesterday's open question closes cleanly.** ShortSupply's scheduled run for 2026-08-28 was created **19:00:32 UTC** (success) and for 2026-08-29 at **12:49:59 UTC** (success). Both snapshots pulled clean. So the 08-28 run I left unresolved in entry #7 was, again, **late rather than dropped** — the second consecutive confirmation of the rule proposed there. Canicrawl's runs followed the same pattern on the same two days (18:41 and 12:40 UTC). Two late-but-successful days in a row across two independent repos is no longer a coincidence; it is the current behaviour of GitHub's scheduler under load, and the *don't dispatch at midday* rule is the correct response. Still awaiting the user's blessing before it goes into OPERATIONS.md's playbook, since the playbook is methodology.

**No ring taken in this repo today.** The queue's next item was BOTH-2 (digest #2 here, digest #1 for ShortSupply once its changelog has a week — it has four days, so ShortSupply's was not due anyway). The Canicrawl half of BOTH-2 was deferred for cause: verifying its lead stories against the raw archive turned up a crawler defect that had fabricated **49% of Canicrawl's published changelog**. Full detail in `taro/JOURNAL.md`, ring CC-11. Fixing that outranked writing an issue whose headline would have been false.

**Worth stating here because it is a shared-engine lesson, not a Canicrawl one.** Both products run the same pattern: fetch → snapshot → diff → publish the diff as news. Canicrawl's bug was that a *fetch failure* was recorded as a *fact* ("no robots.txt, therefore everything is allowed") and then diffed against a real reading, manufacturing flips. ShortSupply is structurally safer here — openFDA is a single authenticated-by-nobody JSON endpoint that either returns the dataset or fails the run outright, so there is no per-item partial-failure mode that could masquerade as a drug changing status. But the general shape is worth carrying: **a diff engine must not treat "we could not read it" as "it changed."** If a future ring adds a second ShortSupply source (the parked ASHP cross-check is the obvious candidate), that source will have exactly the partial-failure mode Canicrawl just got bitten by, and it should record an explicit unknown from day one rather than a boolean.

**Diffs, 2026-08-28 and 08-29: 32 entries, 29 of them availability rewordings.** The ~26/day quiet-revision rate noted in entry #7 is holding — it is now four consecutive days of roughly two dozen FDA presentation rewordings that nobody but us keeps the previous text of. That remains digest #1's lead when the changelog reaches a week.

The three that are not rewordings:

- **Albuterol Sulfate Solution — `in-shortage` → `resolved`.** The nebulizer solution, and the highest-profile name to leave the list since we started. Noted plainly and without commentary about what it means for anyone; the drug page's day-counter now closes.
- **Peginterferon alfa-2a Injection — `in-shortage` → `resolved`.**
- **Pentostatin Injection — new, entering `in-shortage`.** An oncology drug.

No graveyard departures; Hydrocortisone Sodium Succinate Injection is still the only removal on record, and still worth watching for a reappearance.

**Verified:** both snapshots present and parsed, changelog totals reconciled per day (08-26: 19, 08-27: 27, 08-28: 19, 08-29: 13). No files in this repo were modified this session other than this entry, so no build or deploy was needed here; the live site is unchanged and still serving 2026-08-29 data from this morning's cron.

**Next:** digest #1 once the changelog reaches a week (2026-09-02). Watch whether Albuterol Sulfate Solution stays resolved.

**USER-NEEDED (carried, unchanged):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history. Canicrawl's own launch is now recommended to hold one more day so that one clean cron cycle can confirm today's crawler fix.

---

## 9 — 2026-08-30, ops session — a quiet day here, and the revision rate is softening

**Cron: green.** ShortSupply's scheduled run for 2026-08-30 was created **12:14:49 UTC** (success); Canicrawl's at 11:54:31 UTC. Both late against the nominal 06:47/06:17, both successful — the **third consecutive day** of the late-not-dropped pattern across two independent repos. The playbook amendment proposed in entry #7 (*treat a missing scheduled run as late until the UTC day is nearly over, and never dispatch at midday*) has now survived three tests and is still awaiting the user's blessing, since the playbook counts as methodology.

**Diffs, 2026-08-30: 13 entries, all 13 availability rewordings.** No status flips, no new shortages entering, no resolutions, and no graveyard departures — Hydrocortisone Sodium Succinate Injection remains the only removal on record. The panel holds at 238 drugs.

**The quiet-revision rate is softening, and the honest thing is to say so before it goes in a digest.** Five days now read **19 / 27 / 19 / 13 / 13** (08-26 through 08-30). Entry #7 called it "~26/day" and entry #8 said that rate was "holding". Across the fuller series it is closer to **~18/day and trending down**, and the last two days are the two lowest we have recorded. That matters because the ~26/day figure was banked as digest #1's lead. It should be **recomputed from the full changelog when the digest is written on 2026-09-02**, not carried forward — a headline number that was true for three days and quietly stopped being true is exactly the kind of claim this project exists to not make. The underlying observation survives regardless of the exact figure: the FDA rewords presentation availability text every single day, and nobody but us keeps the previous wording.

**No code change in this repo today.** The session's ring went to the sibling — Canicrawl's digest #2 (BOTH-2, Canicrawl half), detailed in `taro/JOURNAL.md`. ShortSupply's half of BOTH-2 is gated on a full week of changelog and was not due. The live site is unchanged and still serving this morning's 08-30 data from cron.

**Verified:** the 08-30 snapshot pulled clean and parsed; changelog totals reconciled per day (08-26: 19, 08-27: 27, 08-28: 19, 08-29: 13, 08-30: 13, total 91); the 13 new entries were checked to be availability-type only, so the absence of status-flip news is a real absence rather than a parsing failure. No build or deploy needed here, since this entry is the only file this session changed in this repo.

**Next:** digest #1 on 2026-09-02, with its lead recomputed rather than inherited. Still watching whether Albuterol Sulfate Solution stays resolved, and whether Hydrocortisone Sodium Succinate reappears on the FDA list.

**USER-NEEDED (carried, unchanged):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history. Canicrawl's own launch hold has now expired on its stated terms: the clean cron cycle it was waiting for confirmed yesterday's crawler fix, so that approval is live and sitting with the user.

---

## 10 — 2026-08-31, ops session — third straight 13, and the sibling found a bug worth borrowing

**Cron: green.** ShortSupply's scheduled run for 2026-08-31 was created **14:25:42 UTC** (success); Canicrawl's at 13:49:26 UTC. Against nominal 06:47/06:17 that is ~7.5 hours late on both — the **fourth consecutive** late-not-dropped day and the widest gap recorded. The 08-31 snapshot pulled clean and parsed.

**Diffs, 2026-08-31: 13 entries, all 13 availability rewordings**, touching **35 individual presentations**. Clindamycin Phosphate Injection accounts for 6 on its own; Bupivacaine Hydrochloride Injection 5; Quinapril Hydrochloride Tablet, Carboplatin Injection and Sodium Bicarbonate Injection 4 each. No status flips, no new shortages entering, no resolutions, no graveyard departures — Hydrocortisone Sodium Succinate Injection remains the only removal on record.

**The rate has settled, and that is now a three-day fact rather than a one-day wobble.** The series reads **19 / 27 / 19 / 13 / 13 / 13** (08-26 → 08-31). Three consecutive days at exactly 13 confirms entry #9's call that "~26/day" is stale. Digest #1 on 09-02 should lead with a figure recomputed from the full changelog — the defensible statement today is *the FDA reworded availability text for 35 presentations across 13 drugs on a single ordinary Monday, and kept no record of the previous wording*. The count is the weak part of the claim; the fact that nobody else retains the prior text is the strong part, and it does not move with the rate.

**No code change in this repo today.** The session's ring went to the sibling (Canicrawl CC-13, detailed in `taro/JOURNAL.md`), where a silent changelog turned out to be hiding two defects: an llms.txt diff gated on the wrong file's readability, and an anti-bot block page archived and published as a genuine llms.txt.

**A lesson this repo should borrow before digest #1.** Canicrawl published a "welcome mat" flip whose evidence was literally a page saying `action=deny`. The general failure is *recording a boolean without checking what the evidence says*. ShortSupply's analogue is the availability-text diff: we compare wording, but we do not currently assert that the new text is FDA-shaped rather than an error page or a truncated response. openFDA is a stable JSON API and no such corruption has appeared in six days of snapshots — so this is a note for whoever writes digest #1, not an incident: **before a rate figure is published, spot-check that a sample of the diffed text is real availability wording.** Worth a small ring afterwards; not written today, because today's ring belonged to the sibling and the queue is the single source of work.

**Verified:** 08-31 snapshot pulled and parsed; changelog reconciles per day (08-26: 19, 08-27: 27, 08-28: 19, 08-29: 13, 08-30: 13, 08-31: 13 — total 104); today's 13 confirmed availability-type only, so the absence of status-flip news is a real absence and not a parse failure; the 35-presentation total was summed from the entry counts rather than estimated. No build or deploy needed — this entry is the only file changed in this repo today, and the live site is serving this morning's cron data.

**Next:** digest #1 on 2026-09-02, lead recomputed rather than inherited, with the evidence spot-check above done first. Still watching whether Albuterol Sulfate Solution stays resolved and whether Hydrocortisone Sodium Succinate reappears.

**USER-NEEDED (carried, unchanged):** domain pick — shortsupply.io / .co / .today. Launch still gated behind Canicrawl's launch and ≥2 weeks of diff history. Canicrawl's launch approval remains live and sitting with the user. Separately, the cron-lateness playbook amendment (now four-for-four across both repos, and drifting to ~7.5h late) still needs the user's blessing, since playbook changes count as methodology.

---

## 11 — 2026-09-01, ops session — the daily wording revisions were us, not the FDA

**USER-NEEDED (one new, two carried):**
- **New — this product's headline claim just got materially weaker, and digest #1 is due tomorrow.** ~80% of the changelog was an artifact of our own diff (detail below). It is fixed and the published data is corrected, but the story ShortSupply was going to launch on — *"the FDA quietly reworks availability text every single day and keeps no record"* — is not supported at the volume we believed. It is still true, at roughly a fifth of the rate, and concentrated in the first three days of the archive. **Digest #1 (due 2026-09-02) should be written with the user present, or reviewed before it publishes.** Do not let a scheduled session ship it on the old framing.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now five-for-five across both repos.

**Cron: green.** ShortSupply's scheduled run for 2026-09-01 was created **12:02:06 UTC** (success); Canicrawl's **11:39:08 UTC** (success). Against nominal 06:47/06:17 that is ~5.3h and ~5.4h late — fifth consecutive late-not-dropped day, and less late than yesterday's ~7.5h, so the drift is noisy rather than steadily worsening. The 09-01 snapshot pulled clean and parsed.

### Entry #10 asked for an evidence spot-check before digest #1. It found the bug.

Yesterday's entry borrowed a lesson from the sibling — *recording a boolean without checking what the evidence says* — and set one concrete task: **before publishing a rate figure, spot-check that a sample of the diffed text is real availability wording.** I did that first thing, on Bupivacaine and Furosemide, and the sampled "revisions" were not wording changes at all. They were a field appearing and disappearing. Chasing that to the records showed the two days are **byte-identical** for the NDCs involved.

**The defect.** A package NDC is *not* unique within a drug. The FDA lists the same NDC twice when a presentation has two entries — typically a `Reverified` row carrying `availability` next to a `New`/discontinued row that carries none. On the 09-01 snapshot, **46 NDCs across 16 drugs** are duplicated this way. `computeDiffs` built `new Map(a[name].map(r => [r.package_ndc, r.availability]))`, which silently keeps only the **last** row per NDC, and then compared **every** row of the next day against that one value. So each duplicated NDC reported a wording change every day, permanently, with the underlying data frozen.

**That is what the "settled rate" was.** Entries #9 and #10 read three, then four consecutive days at exactly 13 drugs / 35 presentations as the revision rate finding its level. It was constant because it was measuring our own collision. Recomputed against the append-only snapshots with the keying fixed, the daily availability-revision counts are:

| date | published | actual |
|---|---|---|
| 08-26 | 40 | 4 |
| 08-27 | 76 | 39 |
| 08-28 | 42 | 10 |
| 08-29 | 35 | **0** |
| 08-30 | 35 | **0** |
| 08-31 | 35 | **0** |
| 09-01 | 35 | **0** |

Four consecutive days of "quiet revisions" were entirely phantom. The real archive is three days of genuine revisions and then four days of a genuinely quiet FDA.

**Ring SS-6 — availability diffs keyed on evidence, not on a colliding key.** `computeDiffs` now compares, per NDC, the sorted **multiset** of availability values: order within an NDC is not promised by the API, a missing field is a value distinct from any string, and a presentation counts as revised only when that NDC's set of values actually differs. Added `scripts/rebuild-changelog.js`, ported from the sibling repo, so a corrected diff rule can regenerate the derived changelog from untouched snapshots — the same escape hatch taro needed for CC-11 and CC-13, and the reason snapshots never have to be edited. Zero dependencies, no methodology change, one API pass per day untouched.

**Verified, not assumed.** Rebuild dry-run: **117 → 30 entries**, 95 dropped, 8 gained. The 8 gains are the mirror image of the defect — genuine revisions the collision was *masking*, because keeping only the last row per NDC hid a change on the first (Lidocaine 6 on 08-27, Carboplatin 4, Dopamine, Furosemide, Rifampin, Liraglutide, Dobutamine). Regression check on the entries that matter most: **all 6 non-availability entries are preserved byte-identical and none are invented** — Albuterol Sulfate Solution and Peginterferon alfa-2a resolving on 08-28, Pentostatin and the two discontinuing drugs entering, and Hydrocortisone Sodium Succinate's removal, which is still the only graveyard departure on record. Only `availability` entries moved: 111 → 24. Built **247 pages (239 drugs, 70 in shortage)**; served `dist/` and got HTTP **200** on `/`, `/changelog/` and `/changelog/rss-cardiovascular.xml`; the changelog page now shows **0** mentions of Clindamycin Phosphate Injection (the largest phantom, 6 a day) and **0** entries dated 2026-09-01, while Albuterol's real resolution still renders. The medical-advice disclaimer is present on the drug pages checked. `data/latest.json` is a snapshot and was not touched.

**What survives, and it is the part that was always load-bearing.** The rate was never the strong half of the claim — entry #10 said so before knowing this: *"the count is the weak part of the claim; the fact that nobody else retains the prior text is the strong part, and it does not move with the rate."* That holds. On 2026-08-27 the FDA reworded availability text for **39 presentations** and published no record of the previous wording; we have it. The honest framing for digest #1 is an archive that catches revision bursts against a quiet baseline, not a daily drumbeat — and it should say plainly that we corrected our own count, because that is the same standard we hold the FDA to.

**Next:** digest #1 on 09-02 with the lead rewritten from the corrected data, user in the loop. Watch whether 09-02 is a fifth genuinely quiet day or the burst pattern returns — with the differ fixed, a real revision will now actually show. Still watching Albuterol Sulfate Solution's resolution and any Hydrocortisone Sodium Succinate reappearance.

---

## 12 — 2026-09-02, ops session — a fifth quiet day, and digest #1 deliberately not written

**USER-NEEDED (one carried and now due, two carried):**
- **Digest #1 (ring SS-7) was due today and I did not write it.** The ring is marked user-gated in the taro Ring queue, and yesterday's SS-6 finding is the reason: the lead this digest was banked on ("the FDA quietly reworks availability text every day") was ~80% our own key collision. Choosing a replacement headline claim for a health product, one day after correcting our own count, is a strategy call, not a procedure step. It needs a session with the user present. The honest framing is already drafted in entry #11 and today's data supports it further.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now six-for-six across both repos.

**Cron: green.** ShortSupply's scheduled run for 2026-09-02 was created **11:44:05 UTC** (success); Canicrawl's **11:17:42 UTC** (success). Against nominal 06:47/06:17 that is ~5.0h and ~5.0h late — the sixth consecutive late-not-dropped day and the tightest pair so far, so the drift is holding rather than worsening. The 09-02 snapshot pulled clean and parsed: 239 drugs, 70 in shortage.

**Zero changelog entries for 2026-09-02** — the pull touched only `data/latest.json` and the new snapshot, and `data/changelog.json` did not change at all. That is the fifth consecutive genuinely quiet day (08-29 through 09-02), and the first one measured with the fixed differ rather than through it. Entry #11 asked exactly this question — *"watch whether 09-02 is a fifth genuinely quiet day or the burst pattern returns"* — and the answer is quiet. The corrected series is now **4 / 39 / 10 / 0 / 0 / 0 / 0 / 0**, which reads as one real revision burst on 08-27 against a baseline of nothing, not a daily drumbeat. That is the shape the digest should describe, and it got stronger today: five straight zeroes make the 08-27 burst more striking, not less.

No status flips, no resolutions, no new shortages, no graveyard departures. Still watching Albuterol Sulfate Solution's resolution and any Hydrocortisone Sodium Succinate reappearance. Rebuilt to confirm the site still generates from the new snapshot: **247 pages (239 drugs, 70 in shortage)**, clean.

**This session's ring was CC-15 in the sibling repo** (boilerplate blocklist cohorts on Canicrawl's /stats/) — one ring per session across the portfolio, and today's Canicrawl data made the case for running that one. Details in `taro/JOURNAL.md`.

**Next:** SS-7 with the user. If a sixth zero lands tomorrow, the "quiet baseline, occasional burst" framing is settled and the digest can state it as a measured fact over eight days rather than a hypothesis.
