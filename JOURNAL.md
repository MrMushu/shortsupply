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

---

## 13 — 2026-09-04, ops session — the quiet baseline broke, exactly as the corrected differ predicted it would

**USER-NEEDED (all carried):**
- **Digest #1 (ring SS-7)** was due 09-02 and is still unwritten, deliberately. It is user-gated: after SS-6 corrected our own headline count, choosing the replacement claim for a health product is a strategy call, not a procedure step. **Today's data makes the drafted framing stronger, not weaker** (below), so nothing is lost by waiting for a session with the user.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now eight-for-eight across both repos.

**No ops session ran on 2026-09-03**, so this entry covers two crawl days.

**Cron: green both days.** Scheduled runs created 2026-09-03 **11:43:28 UTC** and 2026-09-04 **11:45:09 UTC**, both `success` (Canicrawl's 11:13:51 / 11:17:25, also both green). ~5h past nominal 06:47 — the same stable drift, still late rather than dropped.

### 09-03 was a burst. 09-04 was quiet again. That is the shape.

After **five consecutive zero days** (08-29 → 09-02), 2026-09-03 produced **17 changelog entries** and 09-04 produced **none**. The corrected daily series now reads:

| date | entries | note |
|---|---|---|
| 08-26 | 5 | |
| 08-27 | 17 | 39 presentations reworded — the original burst |
| 08-28 | 8 | |
| 08-29 → 09-02 | **0** ×5 | genuinely quiet, measured with the fixed differ |
| **09-03** | **17** | 7 new · 9 availability (15 presentations) · 1 removed |
| 09-04 | **0** | |

This is the first burst measured **entirely** by the post-SS-6 differ — the 08-27 one was found through the broken key and had to be recomputed afterwards. Five zeroes on either side of it are the strongest possible evidence that the multiset comparison is neither inventing revisions nor swallowing them: it stayed silent for five days when nothing moved, then reported seventeen changes the day something did. Entry #12 asked whether "quiet baseline, occasional burst" was a settled fact or a hypothesis over eight days; over ten days, with a second burst, it is the former.

**Seven drugs entered as `discontinuing` on one day** — Metoprolol Succinate ER, Glycerol Phenylbutyrate oral liquid, a four-salt electrolyte injection, Palovarotene capsules, Insulin Lispro Protamine/Insulin Lispro, Insulin Glargine-aglr, and Medroxyprogesterone Acetate tablets. Two insulins in a single day's batch is the most notable line in it. Recorded factually; no editorial claim about cause, and nothing here is advice.

**A second graveyard departure.** `Methotrexate Injection` was removed from the FDA list on 09-03 and now sits on `/graveyard/` alongside Hydrocortisone Sodium Succinate Injection, which had been the only entry on record since the page was built. The page exists precisely because the FDA's list does not keep departures, and it now has two — separately, `Methotrexate Sodium Injection` (a different record) logged a 5-presentation availability revision the same day, so the two were checked apart rather than conflated. Panel grew 239 → **245 drugs**, 70 in shortage.

**Verified, not assumed.** Both snapshots pulled and parsed clean. Built **253 pages (245 drugs, 70 in shortage)**. Served `dist/`: HTTP **200** on `/`, `/changelog/`, `/graveyard/` and `/changelog/rss-oncology.xml`. `/graveyard/` renders both departures by name. The medical-advice disclaimer is present on the drug page checked. Counts above were recomputed from `data/changelog.json` rather than copied from the cron log. No snapshot was edited; no crawl was run from this machine.

**This session's ring was CC-12 in the sibling repo** — a hash + byte count receipt for every llms.txt Canicrawl reports, including the seven whose bodies exceed the archive cap. One ring per session across the portfolio; details in `taro/JOURNAL.md`.

**Next:** SS-7 with the user, with a lead that now has ten days and two bursts behind it. Watch whether the seven new discontinuations resolve or deepen, and whether either graveyard drug reappears.

---

## 14 — 2026-09-05, ops session — a third departure, and seven revisions in one day

**USER-NEEDED (all carried):**
- **Digest #1 (ring SS-7)** was due 09-02 and is still unwritten, deliberately — it is user-gated because choosing the replacement headline claim for a health product after SS-6 corrected our own count is a strategy call, not a procedure step. Today's data extends the drafted framing rather than changing it.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now nine-for-nine across both repos.

**Cron: green.** Scheduled run created 2026-09-05 **10:55:28 UTC**, `success` (Canicrawl's 10:34:42, also green). ~4h08m past nominal 06:47 — still late rather than dropped, and about 40 minutes *less* late than yesterday, so the drift is not compounding.

### 8 entries — the burst/quiet pattern holds a third time

| date | entries | note |
|---|---|---|
| 08-27 | 17 | 39 presentations reworded |
| 08-28 | 8 | |
| 08-29 → 09-02 | **0** ×5 | measured with the corrected differ |
| 09-03 | 17 | 7 new · 9 availability · 1 removed |
| 09-04 | **0** | |
| **09-05** | **8** | 7 availability (15 presentations) · 1 removed |

Seven drugs logged availability revisions: Ropivacaine HCl Injection (1 presentation), Lidocaine HCl Injection (5), the four-salt amphetamine tablet (4), Fentanyl Citrate Injection (1), Morphine Sulfate Injection (1), Carboplatin Injection (2) and Methotrexate Sodium Injection (1). Recorded factually — the FDA overwrites this wording in place, and the prior text exists nowhere else once it changes, which remains the whole reason this archive exists. No claim about cause; nothing here is advice.

**A third graveyard departure.** `Azelastine Hydrochloride; Fluticasone Propionate Nasal Spray` was removed from the FDA list on 09-05 while listed as *discontinuing*, and now sits on `/graveyard/` alongside Methotrexate Injection (09-03) and Hydrocortisone Sodium Succinate Injection. The page had one entry for its first ten days and now has three in three days. Panel 245 → **244 drugs**, 70 in shortage — unchanged in shortage count.

**Verified, not assumed.** Snapshot pulled and parsed clean. Built **252 pages (244 drugs, 70 in shortage)**. Served `dist/`: HTTP **200** on `/`, `/changelog/`, `/graveyard/`, `/changelog/rss-cardiovascular.xml` and a drug page. `/graveyard/` renders **all three** departures by name, checked individually rather than by count. The not-medical-advice disclaimer is present on the drug page checked. Entry counts were recomputed from `data/changelog.json`, not copied from the cron log. No snapshot was edited; no crawl was run from this machine.

**This session's ring was CC-17 in the sibling repo** — Canicrawl was rendering "no llms.txt" for sites whose probe had simply been refused, including one whose 64KB llms.txt is archived in its own repository. One ring per session across the portfolio; details in `taro/JOURNAL.md`.

**Next:** SS-7 with the user; the lead now has twelve days, two bursts and three graveyard entries behind it. Watch whether the 09-03 cohort of seven discontinuations resolves or deepens, and whether the graveyard's new arrivals reappear on the FDA list.

## 15 — 2026-09-06, ops session — a quiet day, verified rather than assumed

**USER-NEEDED (all carried, nothing new):**
- **Digest #1 (ring SS-7)**, due 09-02 and still deliberately unwritten: choosing the replacement headline claim for a health product after SS-6 corrected our own count is a strategy call, not a procedure step. Thirteen days of corrected history now stand behind it.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now ten-for-ten across both repos.

**Cron: green.** Scheduled run created 2026-09-06 **11:21:21 UTC**, `success` (Canicrawl's 10:55:43, also green). ~4h34m past nominal 06:47 — late rather than dropped for the tenth day running, about 25 minutes later than yesterday.

**Zero changelog entries.** The snapshot pulled and parsed clean and `data/changelog.json` did not move: 55 entries, last dated 09-05. The burst/quiet pattern now reads 09-03: 17 · 09-04: 0 · 09-05: 8 · **09-06: 0**. Nothing resolved, nothing new, no departure.

**Verified, not assumed.** Built **252 pages (244 drugs, 70 in shortage)** — both counts unchanged from yesterday, so no drug entered or left the list. `/graveyard/` still renders all three departures by name, checked individually: Methotrexate Injection, Hydrocortisone Sodium Succinate Injection and Azelastine Hydrochloride; Fluticasone Propionate Nasal Spray. The not-medical-advice disclaimer is present on the homepage. No snapshot was edited; no crawl was run from this machine.

**This session's ring was CC-18 in the sibling repo** — Canicrawl was losing a real llms.txt publication whenever the day before it happened to be a failed probe, which is how time.com's first AI-access policy nearly went unrecorded. One ring per session across the portfolio; details in `taro/JOURNAL.md`.

**Next:** SS-7 with the user. Watch whether the 09-03 cohort of seven discontinuations resolves or deepens, and whether the graveyard's arrivals reappear on the FDA list.

## 16 — 2026-09-07, ops session — a second quiet day, and the sibling's panel stopped drifting

**USER-NEEDED (all carried, nothing new for this product):**
- **Digest #1 (ring SS-7)**, due 09-02 and still deliberately unwritten. Fourteen days of corrected history now stand behind it. Choosing the replacement headline claim for a health product, after SS-6 corrected our own count, is a strategy call and not a procedure step.
- **Carried — domain pick:** shortsupply.io / .co / .today.
- **Carried — launch sequencing** (behind Canicrawl, ≥2 weeks of diffs) and the cron-lateness playbook amendment, now eleven-for-eleven across both repos.

**Cron: green.** Scheduled run created 2026-09-07 **13:01:23 UTC**, `success` (Canicrawl's 12:32:05, also green). ~6h14m past nominal 06:47 — the latest start yet, and the eleventh consecutive day of late-but-delivered. Late is not dropped; the snapshot is here and the deploy landed.

**Zero changelog entries, two days running.** The snapshot pulled and parsed clean and `data/changelog.json` did not move: **55 entries**, last dated 09-05. The burst/quiet pattern now reads 09-03: 17 · 09-04: 0 · 09-05: 8 · 09-06: 0 · **09-07: 0**. Nothing resolved, nothing new, no departure — which is itself the finding this archive exists to make legible, since the FDA page shows only the present state and cannot tell you that it has been still for two days.

**Verified, not assumed.** Built **252 pages (244 drugs, 70 in shortage)** — both counts unchanged from yesterday, so no drug entered or left the list. HTTP **200** on `/`, `/changelog/`, `/graveyard/` and `/changelog/rss-cardiovascular.xml`. `/graveyard/` still renders all three departures, each checked by name rather than by count: Methotrexate Injection, Hydrocortisone Sodium Succinate Injection, and Azelastine Hydrochloride; Fluticasone Propionate Nasal Spray. The not-medical-advice disclaimer is present on the homepage. No snapshot was edited; no crawl was run from this machine.

**This session's ring was CC-10 in the sibling repo** — Canicrawl's 1,000-domain panel was frozen at the ranking of the day it was built and had drifted 2% per week since, so it now gets a bounded, additions-only weekly refresh with an append-only ledger of every change. The relevant lesson for this product: our panel is the FDA's list, so it refreshes itself daily and cannot drift the same way — but the *departures* are the same problem in mirror image, which is what `/graveyard/` already handles. One ring per session across the portfolio; details in `taro/JOURNAL.md`.

**Next:** SS-7 with the user. Watch whether the 09-03 cohort of seven discontinuations resolves or deepens, and whether the graveyard's arrivals reappear on the FDA list.

## 2026-09-08 — a third still day, and the sibling publishes its denominator

**Cron:** green, but late — the scheduled run landed **11:44 UTC against a 06:47 cron**, five hours of GitHub queueing delay, after yesterday's six (13:01). It completed and committed `data/snapshots/2026-09-08.json` normally, so this is upstream scheduling jitter rather than anything in this repo; recording it because two consecutive days far outside the usual hour of drift is worth watching. Canicrawl's run was late by the same amount, which points at GitHub rather than at either workflow.

**Zero changelog entries, three days running.** `data/changelog.json` did not move: **55 entries**, last dated 09-05. The run now reads 09-03: 17 · 09-04: 0 · 09-05: 8 · 09-06: 0 · 09-07: 0 · **09-08: 0**. Post-SS-6 that is a believable baseline rather than a suspicious one — the phantom rate this archive used to publish was our own NDC key collision, and what is left is genuinely bursty. The stillness is the finding: the FDA page shows only the present state and cannot tell you the record has not moved in three days.

**Verified, not assumed.** Built **252 pages (244 drugs, 70 in shortage)** — both counts identical to yesterday, so no drug entered or left the list. HTTP **200** on `/`, `/changelog/`, `/graveyard/` and `/changelog/rss-cardiovascular.xml`. `/graveyard/` renders every departure checked **by name**, not by count: Methotrexate Injection, Hydrocortisone Sodium Succinate Injection, Azelastine Hydrochloride, Fluticasone Propionate Nasal Spray. The not-medical-advice disclaimer is present on the homepage. No snapshot was edited; no crawl was run from this machine.

**This session's ring was CC-19 in the sibling repo** — Canicrawl's weekly panel refresh already wrote an append-only ledger of every domain it adds and every one it keeps after a fall; that ledger is now a published section on its `/health/` page, including the reason a departed domain is never deleted (its snapshots are append-only facts and its site page is a live URL). The mirror-image problem here is already solved: our panel is the FDA's own list, so it cannot drift, and the drugs that vanish from it land in `/graveyard/` for the same reason. Details in `taro/JOURNAL.md`.

**Next:** SS-7 still needs the user. Watch whether the 09-03 cohort of seven discontinuations resolves or deepens, and whether a fourth still day makes the quiet baseline worth stating explicitly on the changelog page.

## 2026-09-09 — two drugs leave the list, and the graveyard catches them

**Cron:** green, late again — the scheduled run was created **11:52 UTC against a 06:47 cron**, five hours of GitHub queueing delay, matching the sibling's 11:22 against 06:17 and making three consecutive days of five-to-six-hour lag across both repos. It completed and committed `data/snapshots/2026-09-09.json` normally. Upstream scheduling, not ours; recording it as a trend line, not an incident.

**The four-day stillness broke.** `data/changelog.json` moved for the first time since 09-05: **55 → 57 entries**, both of them departures. **Sumatriptan Nasal Spray** and **Vecuronium Bromide Injection** — a migraine abortive and a surgical neuromuscular blocker, both last recorded as *discontinuing* — are gone from the FDA's list entirely. The run now reads 09-03: 17 · 09-04: 0 · 09-05: 8 · 09-06: 0 · 09-07: 0 · 09-08: 0 · **09-09: 2**. Bursts against a quiet baseline, which is the post-SS-6 shape of this data and the framing SS-7 is supposed to use.

This is exactly the case `/graveyard/` exists for. A drug that stops being listed leaves no trace on the FDA page — there is no "was discontinuing, now absent" state to read — so without an archive the record simply loses two entries and nobody can tell whether the shortage resolved, the product was withdrawn, or the listing was tidied up. **We do not know which of those happened, and the page does not guess**; it records that the drug was on the list, what it last said, and the date it stopped appearing.

**Verified, not assumed.** Snapshot totals from the raw files: **244 distinct drugs / 1,634 records on 09-08 → 242 / 1,631 today**, so the two departures are visible in the source data and not a parsing artifact. Built **250 pages (242 drugs, 70 in shortage)** — the in-shortage count is unchanged, so neither departure was an active shortage. `/graveyard/` renders both new arrivals **by name** alongside the four existing members (Methotrexate Injection, Hydrocortisone Sodium Succinate Injection, Azelastine Hydrochloride, Fluticasone Propionate Nasal Spray). HTTP **200** on `/`, `/changelog/`, `/graveyard/`, `/changelog/rss-cardiovascular.xml`. The not-medical-advice disclaimer is present on the homepage. Noted for whoever writes SS-7: the FDA's own `sourceLastUpdated` still reads 2026-09-08 while three records changed today — the field does not reliably move when the data does, which is itself an argument for keeping an independent daily archive. No snapshot edited; no crawl run from this machine.

**This session's ring was CC-20 in the sibling repo** — Canicrawl's third editorial digest, whose spine is that most AI blocklists change without anybody deciding anything (a CDN toggle, a copied list, a publisher deploying one edit across four magazines), and whose most important section admits that one of its own cohort counts rose only because the panel grew. The transferable rule for this product: state plainly when a number moved because our lens changed rather than because the world did — the same discipline SS-6 had to apply retroactively. Details in `taro/JOURNAL.md`.

**Next:** SS-7 still needs the user. Watch whether the two departures reappear on the FDA list (which would make them a listing tidy-up rather than a withdrawal), and whether the 09-03 cohort of seven discontinuations follows them off the list.

## 2026-09-10 — the largest revision burst since SS-6, and one new listing

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you — today's burst is exactly the "revision bursts against a quiet baseline" shape its lead is meant to describe.

**Cron:** green, late for the fourth day running — the scheduled run was created **11:49 UTC against a 06:47 cron**, matching the sibling's 11:18 against 06:17. It completed and committed `data/snapshots/2026-09-10.json`. Upstream scheduling, not ours.

**A burst.** `data/changelog.json` **57 → 68 entries**: ten availability revisions covering **31 presentations**, plus one new listing. The run now reads 09-03: 17 · 09-04: 0 · 09-05: 8 · 09-06–09-08: 0 · 09-09: 2 · **09-10: 11**. Revised: Clindamycin Phosphate Injection (9), Quinapril Hydrochloride Tablet (8), Promethazine Hydrochloride Injection (4), Lisdexamfetamine Dimesylate Capsule (2), Atropine Sulfate Injection (2), Ifosfamide Injection (2), and one presentation each of Sterile Water Irrigant, Midazolam Hydrochloride Injection, Dextrose Monohydrate 10% Injection and Rifampin Injection. **New:** Imipenem Anhydrous, Cilastatin, and Relebactam Anhydrous Injection — Merck Sharp & Dohme, listed *To Be Discontinued*, FDA posting date 09/09/2026. It is a discontinuation notice, not a shortage: the in-shortage count is unchanged at 70.

**Checked the burst was real before believing it.** Clindamycin was the drug at the centre of SS-6's key collision, so a 9-presentation revision on it deserved suspicion. From the raw snapshots: the drug went **26 → 23 records**, and one NDC (0009-0902-18) moved *Available → Unavailable* — genuine changes in the source. The 9 is five changed NDCs counted in rows, per SS-6's documented definition (`max(was, now)` rows per changed NDC, because the FDA lists some NDCs twice). No regression. Also noted for SS-7: the FDA's `sourceLastUpdated` moved 09-08 → **09-10** today, after sitting still yesterday while three records changed — the field lags the data on some days and not others.

**Verified, not assumed.** Snapshot totals **242 drugs / 1,631 records → 243 / 1,619**; the only drug-level change is the Imipenem arrival (none departed). Yesterday's two departures, Sumatriptan Nasal Spray and Vecuronium Bromide Injection, did **not** reappear, and both still render by name on `/graveyard/`. Built **251 pages (243 drugs, 70 in shortage)**; the new drug page exists and carries the not-medical-advice disclaimer, as does the homepage; the new entry is on `/changelog/`. HTTP **200** on `/`, `/changelog/`, `/graveyard/`, the new Imipenem drug page, and `/changelog/rss-cardiovascular.xml`. No snapshot edited; no crawl run from this machine.

**This session's ring was CC-21 in the sibling repo** — `/compare/` on Canicrawl, two sites side by side as a shareable URL. Ring queue refilled with **SS-8**: each drug page lists its own changelog history (status changes, revision counts, graveyard departure), the product's version of the per-entity timeline — calm, factual, disclaimer untouched. Details in `taro/JOURNAL.md` and `taro/OPERATIONS.md`.

**Next:** SS-8 once Canicrawl's CC-22 is done. Watch whether the Imipenem/Relebactam notice gains an availability line, and whether Sumatriptan and Vecuronium stay gone.

## 2026-09-11 — a quiet day: one revision, one discontinuation notice

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you.

**Cron:** green, and late for the fifth day running. The scheduled run was created **11:49 UTC** against a 06:47 cron, and the sibling's was 11:20 against 06:17. It committed `data/snapshots/2026-09-11.json`. Upstream scheduling, not ours.

**Changes.** `data/changelog.json` **68 → 70**:
- Sodium Bicarbonate Injection revised the availability wording on **2** presentations.
- One new listing, **Dextrose Monohydrate, Sodium Chloride, Sodium Lactate, Calcium Chloride, Magnesium Chloride Solution**, from Fresenius Medical Care North America, posted 09/10/2026 as *To Be Discontinued*.

Like yesterday's Imipenem/Relebactam arrival, this is a discontinuation notice rather than a shortage: the in-shortage count holds at **70**. The daily run now reads 09-09: 2 · 09-10: 11 · **09-11: 2**, which is the quiet baseline after a burst that SS-7's lead describes. The FDA's `sourceLastUpdated` advanced 09-10 → 09-11 in step with the data today.

**Verified.**
- Snapshot records **1,619 → 1,614**.
- Local build of **252 pages (244 drugs, 70 in shortage)**.
- The new drug page exists and carries "Not medical advice."
- I did not change any code in this repo. No snapshot was edited, and no crawl was run from this machine.

**This session's ring was CC-22 in the sibling repo.** Canicrawl site pages now list their own changelog history under the true date tracking began. SS-8 is the same shape for drug pages and is next. Details are in `taro/JOURNAL.md`.

**Next:** SS-8. Watch whether Sumatriptan and Vecuronium stay off the list, and whether the two discontinuation notices gain availability lines.

## 2026-09-12 — SS-8: every drug page now carries its own history

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you. Nothing new escalated.

**Cron:** green. The scheduled run was created **11:15 UTC** against the 06:47 cron (the sibling's was 10:45 against 06:17), the sixth day running of about four and a half hours of upstream queueing. It committed `data/snapshots/2026-09-12.json`.

**Changes.** `data/changelog.json` **70 → 77**:
- **Three discontinuation notices left the list:** Gemcitabine Hydrochloride Injection, Oxycodone Hydrochloride Oral Solution, and Homatropine Methylbromide and Hydrocodone Bitartrate Syrup. All three were listed as *being discontinued*, not in shortage, so the in-shortage count holds at **70**. All three render by name on `/graveyard/`.
- **Availability wording was revised** on Sodium Bicarbonate Injection (6 presentations, its second day running), Lidocaine Hydrochloride Injection (4), Atropine Sulfate Injection (2) and Dextrose Monohydrate 50% Injection (2).
- Totals: **244 drugs / 1,614 records → 241 / 1,602**, and no arrivals. The FDA's `sourceLastUpdated` stayed at **09-11** while the records changed, another day where the field lags the data (SS-7 note).

**Ring executed: SS-8, drug-page change history.** Every drug page used to end with "Daily change tracking began <today's snapshot date> (index founding)". That has been false since day 2 on every page. It now shows:
- **The true start date.** This is the archive's first day (2026-08-25) for drugs present then. For drugs that arrived later, it is the date of their `new` entry. `computeDiffs` compares every snapshot with the one before it, so a drug missing from the first snapshot always gets a `new` entry on the day it appeared. The build can therefore read this from the changelog instead of parsing ~50MB of snapshots, and it stays at ~0.5s.
- **The drug's own changelog entries, newest first,** rendered with the changelog page's own `entryText()`.
- **An empty state** for drugs with no entries: "No change to its FDA listing has been observed since."
- **A plain statement of the blind spot:** a change the FDA makes and reverses between two snapshots is not seen, and the snapshots in the public repository are the complete record.
- The wording is calm and factual, and the disclaimer is untouched.

**Fixed along the way (pre-existing):** `/changelog/` linked **8 departed drugs** to drug pages that do not exist, so every removal entry was a 404 on the live site. That covered today's three plus Sumatriptan Nasal Spray, Vecuronium Bromide Injection, Methotrexate Injection, Azelastine/Fluticasone Nasal Spray and Hydrocortisone Sodium Succinate Injection. The RSS feeds had the same problem. Entries for a drug with no page now link to `/graveyard/`, which lists every departed drug by name.

**Verified, not assumed.**
- Build: **249 pages** (241 drugs, 70 in shortage).
- An independent checker parsed all **19** snapshots to compute each drug's earliest appearance and compared it with every one of the **241** drug pages:
  - the tracking-began date equals the snapshot-derived date on every page (12 late arrivals, the rest 08-25);
  - **69/69** changelog entries for current drugs render on the right page, newest first, with the right date and kind;
  - all **192** no-history pages carry the empty-state sentence;
  - **241/241** carry "Not medical advice.", 0 leaked `${`, and **0 failures**.
- `/changelog/` still has 77/77 entries, and **0** of its drug links are broken (it had 8 before the fix).
- **144/144** RSS item links across all feeds resolve to a real file.
- HTTP **200** on `/`, `/changelog/`, `/graveyard/`, `/stats/`, `/drug/sodium-bicarbonate-injection/`, `/drug/lidocaine-hydrochloride-injection/`, the Imipenem/Relebactam page (reads "began 2026-09-10") and two RSS feeds, via an in-process server. Every HTML page checked carries the disclaimer.
- The differ and `crawl.js` are untouched, no snapshot was edited, and no crawl was run from this machine.

**Next:** SS-9 (the per-drug JSON carries the same `firstSeen` + `history`). Watch whether Sodium Bicarbonate's revisions continue, and whether the departed discontinuation notices stay gone.

## 2026-09-13 — SS-9: each drug's JSON now carries its history

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you. Nothing new escalated.

**Cron:** green. The scheduled run was created **12:17 UTC** against the 06:47 cron (the sibling's was 11:51 against 06:17). That is the seventh day running of multi-hour upstream queueing, now about 5½ hours. It committed `data/snapshots/2026-09-13.json` on the right UTC date.

**Changes: none.** `data/changelog.json` holds at **77**. The FDA records are byte-identical to yesterday (**1,602** records, 241 drugs, 70 in shortage), and `sourceLastUpdated` stays at **09-11**. It is a Sunday snapshot of a Friday dataset, so no revision was missed.

**Ring executed: SS-9, per-drug JSON carries its history.** `data/drugs/<slug>.json` gains two additive fields, and no existing field is renamed or removed:
- `firstSeen` is the date daily tracking of the drug began.
- `history` lists the drug's changelog entries, newest first. Each entry keeps its `date`, `kind`, and `from`/`to` or `count` where they apply, plus the `text` its page shows. The redundant `drug` key is dropped from each entry.

The page and the JSON now come from one function (`historyOf()`), so they cannot drift apart. `/api/` lists the two new fields.

**Also fixed (pre-existing, hard-rule compliance):** `/api/` and `404.html` were the only two of 249 HTML pages without the "Not medical advice." disclaimer. Both now carry it.

**Verified, not assumed.**
- Build: **249 pages** (241 drugs, 70 in shortage).
- I saved a copy of all 241 per-drug JSON files from a pre-change build. An independent checker then compared every file with that copy, parsed all **20** snapshots, and read each drug page. It found **0 failures**:
  - Every pre-change field is byte-identical, and exactly two keys were added.
  - `firstSeen` equals the earliest snapshot containing the drug on all 241 (12 late arrivals, the rest 2026-08-25).
  - `history` matches the changelog on every drug: **69/69** entries, 192 empty arrays, newest first.
  - Each drug page's began date and list items (date and text, in order) equal its JSON.
  - 241/241 drug pages carry the disclaimer.
- The disclaimer sweep over all **249** HTML pages is 0 missing (it was 2). There were 0 leaked `${` in HTML or JSON.
- Spot checks: Sodium Bicarbonate Injection shows `firstSeen` 2026-08-25 and its two availability revisions (09-12: 6, 09-11: 2). The Imipenem/Relebactam JSON shows `firstSeen` 2026-09-10 and its single `new` entry.
- HTTP **200** on `/`, `/api/`, `/404.html`, `/changelog/`, `/graveyard/`, `/llms.txt`, a drug page, and two per-drug JSON files, via an in-process server.
- The differ and `crawl.js` are untouched, no snapshot was edited, and no crawl was run from this machine.

**Next:** Nothing ShortSupply-specific is queued besides the gated SS-7. The next ops session is Monday, which brings Canicrawl's CC-10 Tranco refresh and CC-23. It should append a new ShortSupply ring from Pillar 2 if it has room.

## 2026-09-16 — SS-10: /about/ explains how history is recorded

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you. Nothing new escalated.

**Cron:** green. The 09-15 and 09-16 scheduled runs were created at **12:08** and **12:04 UTC** (cron 06:47), so upstream queueing is still about 5¼ hours. Both committed their snapshot on the right UTC date. No ops session ran on 09-15.

**Changes.** The changelog went from 77 → **86**.
- **09-15:** Micafungin Sodium Injection arrived as `new` → *discontinuing*. There were availability revisions on seven drugs: Heparin Sodium Injection (2), plus Sterile Water, Hydromorphone, Midazolam, Dopamine, Meperidine and Sufentanil injections (1 each). `sourceLastUpdated` → 09-15. That is the first dataset revision since 09-11.
- **09-16:** one availability revision (Carboplatin Injection).
- The snapshot now has 1,607 records and 242 drugs, with 70 in shortage.

**Ring executed: SS-10.** `/about/` gains a "How history is recorded" section, placed between Methodology and Who runs this. It covers:
- the daily snapshot-vs-previous-day diff and its four entry kinds (new, status, availability, removed), which I checked against `crawl.js`
- that a change made and reverted within one day leaves no trace
- that the FDA's "last updated" can lag the records, so changes are dated by the first snapshot showing them
- that tracking began on `${FOUNDED}` (renders 2026-08-25), with later arrivals tracked from first appearance
- a link to `/api/` for `firstSeen`/`history`

The wording is calm and factual, and the disclaimer is untouched.

**Verified.**
- Build: **250 pages** (242 drugs).
- `dist/about/index.html` contains the heading (1), "Tracking began on 2026-08-25", the `../api/` link, and the disclaimer, with 0 leaked `${`.
- A disclaimer sweep over all 250 HTML pages found 0 missing.
- HTTP 200 on `/`, `/about/`, `/api/`, `/changelog/` via an in-process server over `dist/`.
- No crawl was run and no snapshot was touched.

**Next:** SS-11 (queued today). ShortSupply's `llms.txt` doesn't yet mention `firstSeen`/`history`, so it gets one additive line.

## 2026-09-17 — SS-11: llms.txt names the per-drug history

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1) still needs you. Nothing new escalated.

**Cron:** green. The 09-17 scheduled run was created **12:06 UTC** (cron 06:47), so queueing is still about 5¼ h. It committed its snapshot on the right UTC date.

**Changes.** The changelog went from 86 → **98**. All 12 new entries are from 09-17:
- **Melphalan Hydrochloride Injection** arrived as `new` → *discontinuing*.
- Availability wording was revised on 11 drugs: Midazolam injection and Methylphenidate ER tablet (2 presentations each), plus Dextrose 5%, the mixed amphetamine salts tablet, Hydromorphone, Lidocaine, Desmopressin spray, Epinephrine/Lidocaine, Fentanyl, Methotrexate and Morphine injections (1 each).
- This is the third revision burst in three days (7 drugs on 09-15, 1 on 09-16, 11 today). That fits the "bursts, not a drumbeat" framing held for SS-7.
- The snapshot has 243 drugs, with 70 in shortage.

**Ring executed: SS-11.** One additive line under `## Data` in the generated `llms.txt`. It says each `/data/drugs/<slug>.json` carries `firstSeen` (when daily tracking of the drug began) and `history` (its changelog entries, newest first), and it links /about/ for how history is recorded.
- The first attempt put unescaped backticks inside the `llms.txt` template literal, and the build failed with a SyntaxError. My `sed` escape didn't apply, so I escaped them with an exact edit instead. The build then passed.
- The link uses `${ORIGIN}/about/` rather than an anchor, because the h2 has no id.

**Verified.**
- Build: **251 pages** (243 drugs).
- `dist/llms.txt` line 8 carries the new text, with 0 leaked `${`.
- A disclaimer sweep found 251/251 HTML pages with "Not medical advice".
- In-process HTTP 200 on `/`, `/llms.txt` (contains `firstSeen`), `/about/`, `/api/`, and `/data/drugs/melphalan-hydrochloride-injection.json` (firstSeen 2026-09-17, 1 history entry).
- Live https://mrmushu.github.io/shortsupply/about/ returns 200.
- No crawl was run and no snapshot was touched.

**Found:** the pre-existing llms.txt links (`/data/latest.json`, `/about/`, `/changelog/rss.xml`, `/llms-full.txt`, the per-drug example) are root-absolute. On the `/shortsupply/` subpath they resolve to mrmushu.github.io/… and return **404** (checked live). I queued this as SS-12 in the Canicrawl OPERATIONS.md.

**Next:** SS-12 (prefix those link targets with `${ORIGIN}`).

## 2026-09-19 — Ops: SS-12 shipped — llms.txt links now resolve on the live subpath

**Cron:** green. The 09-19 scheduled run was created **11:34 UTC** (cron 06:47), so ~4¾ h of GitHub queueing — the same lag as 09-18 (11:50 UTC). Both committed their snapshots.

**Ring executed: SS-12.** The llms.txt `## Data` links were root-absolute, so on the `/shortsupply/` subpath they pointed at `mrmushu.github.io/…` and 404'd for any AI reader that followed them. Five link targets in `scripts/build.js` now carry `${ORIGIN}`: latest snapshot, the per-drug JSON example, the RSS feed, Methodology, and the llms-full.txt pointer. Link targets only — no wording changed, and the display text (`[/llms-full.txt]`, `[/about/]`) is untouched.
- `llms-full.txt` was checked for the same pattern and is clean: it already built every URL from `${ORIGIN}`.
- The patch asserted exactly one occurrence of each string before replacing, so nothing else in the build could be caught by it.

**Verified.**
- Build: **250 pages** (242 drugs, 70 in shortage, snapshot 2026-09-19).
- `dist/llms.txt` carries all six absolute URLs; **0** leaked `${` in llms.txt or llms-full.txt; **0** remaining `](/…)` root-absolute targets in either file.
- Live HTTP: the five new targets return **200** (`/shortsupply/data/latest.json`, `/shortsupply/data/drugs/atropine-sulfate-injection.json`, `/shortsupply/about/`, `/shortsupply/changelog/rss.xml`, `/shortsupply/llms-full.txt`); the three old root-absolute forms still return **404**, which is the defect this ring removes.
- Disclaimer sweep: **250/250** HTML pages contain "Not medical advice".
- No crawl was run and no snapshot was touched.

**Notable diffs:** 2026-09-19 removed two drugs from the FDA list — **Fluphenazine Hydrochloride Tablet** and **Desonide Lotion**, both leaving from `discontinuing` — and added **Rivastigmine Film, Extended Release** as `discontinuing`. Drug count 243 → 242. Those two departures are /graveyard/ material and worth a line in digest #1. 09-17 also carried 11 availability-wording revisions (midazolam, hydromorphone, lidocaine, dextrose, mixed-amphetamine salts among them) against a quiet 09-18 — the burst-against-baseline pattern SS-7 is meant to lead on.

**Next:** SS-7 stays user-gated. No ungated ShortSupply ring is queued; the next session should take one from the Canicrawl side or append a new small one.

## 2026-09-20 — Ops: SS-13 verified — the graveyard was already working, but departed drugs' URLs 404

**Cron:** green. The 09-20 scheduled run was created **11:49 UTC** against a 06:47 cron (~5 h of GitHub queueing, in line with 09-18/09-19), completed successfully, and committed `data/snapshots/2026-09-20.json`.

**Ring executed: SS-13** — a verification ring, and the thing it asked me to verify was already true, so **no code changed**.
- The ring was written on the assumption that /graveyard/ had been sitting on its empty state since SS-2 built it and that the two 09-19 departures would be its first rows. That was wrong: `changelog.json` holds **10** `kind: "removed"` entries going back to 2026-08-26, and the page has been rendering them all along. The graveyard query needed no fix.
- Verified after `node scripts/build.js` (**250 pages**, 242 drugs, 70 in shortage, snapshot 2026-09-20): `dist/graveyard/index.html` has **10** rows, newest first, including **Desonide Lotion (2026-09-19)** and **Fluphenazine Hydrochloride Tablet (2026-09-19)** with their departure dates and last-seen status; the "No removals observed yet" empty state is **absent** (0 occurrences). In-process HTTP **200** on `/`, `/graveyard/`, `/changelog/`, `/stats/`, `/about/`, `/api/`, `/llms.txt`, `/sitemap.xml` and a per-drug page. Disclaimer sweep: **250/250** HTML pages contain "Not medical advice". No crawl was run and no snapshot was touched.

**Found while verifying — the ring's second clause failed.** SS-13 also asked whether departed drugs' pages "survive as live URLs, per the archive promise". They do not. Pages and per-drug JSON are built only for drugs on today's list, so a drug's URL vanishes the day it leaves the FDA list. Confirmed against the live site today: `/shortsupply/drug/methotrexate-injection/` **404**, `/shortsupply/drug/gemcitabine-hydrochloride-injection/` **404**, `/shortsupply/data/drugs/methotrexate-injection.json` **404**, while `/shortsupply/graveyard/` returns **200**. All 10 departed drugs are in that state. Nothing on the site links to them — `entryPath()` and the sitemap already route departed drugs to /graveyard/ — so this is external/indexed link rot, not an internal broken link. Fixing it means building tombstone pages from last-known snapshot records, which is more than "fix the graveyard query", so per one-ring-per-session I queued it as **SS-14** in the Canicrawl OPERATIONS.md rather than starting it here.

**Notable diffs:** none. The changelog is flat at **102** entries with **0** dated 09-20; the 09-19 departures above remain the latest movement.

**Next:** SS-14 (the tombstone pages). SS-7 stays user-gated.

## 2026-09-21 — Ops: SS-14 shipped — departed drugs keep their URL as a last-known archive page

**Cron:** green. The 09-21 scheduled run was created **13:21 UTC** against a 06:47 cron (~6.5 h of GitHub queueing, a little worse than 09-18..09-20), completed successfully, and committed `data/snapshots/2026-09-21.json`.

**Ring executed: SS-14** (`scripts/build.js` only; no data, status definitions or crawl touched).
- A drug with a `removed` changelog entry that is not back on today's list now gets a page at its old URL, built from the **last snapshot dated before its removal** (e.g. methotrexate-injection: removed 2026-09-03, last seen in the 2026-09-02 snapshot as "being discontinued", 7 presentations). The page says plainly that it was removed on that date, that the FDA gives no reason, that it is an archive and not current information, and that it is counted nowhere else. No day counter (0 "day N" matches), no watch button, crumb back to /graveyard/. Per-drug JSON is rebuilt too, flagged `departed: true` with `removedOn`, `lastSeen`, `lastSeenStatus`.
- **Decision: tombstones are OUT of the sitemap** (they are archive, not today's list); they are linked from /graveyard/ rows, the changelog and RSS (`entryPath()` now routes to them).
- The presentations-table markup was lifted into a shared `recRowsHtml()` so live and archive pages render records identically.

**Verified** (build on the 09-21 snapshot): 242 drugs / 70 in shortage, same as a build of the pre-change code on the same snapshot; `dist/stats/index.html` and `dist/sitemap.xml` are **byte-identical** before and after. `dist/drug/` has 252 dirs (242 + 10 departed). `drug/methotrexate-injection/index.html`, `drug/gemcitabine-hydrochloride-injection/index.html` and `data/drugs/methotrexate-injection.json` exist; the page states "removed … on 2026-09-03" and contains "Not medical advice". /graveyard/ has 10 rows and 10 drug links. Disclaimer sweep **260/260** HTML pages. The live 404s should turn 200 after this push deploys (not checked this session).

**Notable diffs:** none. Changelog flat at **102** entries, 0 dated 09-21.

**Next:** confirm the three URLs return 200 live next session. SS-7 stays user-gated.

## 2026-09-22 — Ops: cron green, SS-14 confirmed live; no ring here (CC-25 ran in the sibling)

**Cron:** green. The 09-22 scheduled run was created **12:03 UTC** against a 06:47 cron (~5.3 h of GitHub queueing, slightly better than 09-21's ~6.5 h). It completed successfully and committed `data/snapshots/2026-09-22.json`; the pull was fast-forward.

**Verified live:** SS-14's departed-drug archive pages deployed. `/shortsupply/drug/methotrexate-injection/`, `/shortsupply/drug/gemcitabine-hydrochloride-injection/` and `/shortsupply/graveyard/` all return **200** (all three were 404 before SS-14).

**Notable diffs:** none. Changelog flat at **102** entries; the last dated entries are 09-19 (Rivastigmine film new → discontinuing; Fluphenazine tablet and Desonide lotion removed).

**Ring:** none in this repo. Today's ring was CC-25 (Canicrawl digest #5). SS-7 (digest #1) stays user-gated.

**Next:** no ungated ShortSupply ring is queued. The next ops session should consider appending one per Pillar 2 (category RSS is the next item on the roadmap) if CC-26 finishes quickly.

## 2026-09-23 — Ops: cron green; first revision burst since 09-19; no ring in this repo

**USER-NEEDED (standing, unchanged):** SS-7 (digest #1). Nothing new escalated.

**Crons:** green. The 09-23 scheduled run was created **12:12 UTC** against the 06:47 cron (~5.4 h of GitHub queueing, the same as recent days). It committed the `2026-09-23` snapshot and the repo pulled fast-forward.

**Notable diffs (09-23):** the changelog went from **102 → 117** (+15), after four flat days.
- 13 `availability` entries (FDA rewording of per-presentation availability text): Bumetanide inj (2), Dextrose 10% inj (1), Dextrose 70% inj (1), Morphine sulfate inj (2), Lidocaine HCl inj (2), Clindamycin phosphate inj (3), Fentanyl citrate inj (1), Methylprednisolone acetate inj (1), Ketorolac inj (3), Promethazine HCl inj (3), Technetium Tc-99m pyrophosphate kit (1), Furosemide oral solution (2).
- 1 `new`: Rivaroxaban for suspension → discontinuing.
- 2 `removed`: Obeticholic acid tablet and Pilocarpine HCl tablet (both had been discontinuing). They should now have SS-14 archive pages and /graveyard/ rows after today's deploy. I did not check that live this session.

The burst is almost entirely hospital injectables revised on one day. That matches the "revision bursts against a quiet baseline" framing SS-7's lead is meant to use, so bank it for digest #1. Stick to neutral wording, no patient-fear framing.

**Ring:** none in this repo. Today's ring was CC-26 (Canicrawl). **SS-15** (per-category RSS, scoping first) was appended to the queue in taro/OPERATIONS.md.

**Next:** SS-15. Confirm the obeticholic-acid and pilocarpine archive pages return 200 live.

## 2026-09-24 — Ops: SS-15 closed as already-shipped + disclaimer gap fixed in every RSS feed

**USER-NEEDED:** (1) SS-7 (digest #1), standing. (2) **New, a methodology question from SS-15:** each drug is filed under only the *first* value of FDA's `therapeutic_category` array (`scripts/build.js` line 28). Many records list several categories, e.g. `["Anesthesia","Neurology"]` (27 records) or `["Anesthesia","Pediatric"]` (66 records). So a Neurology or Pediatric feed subscriber misses those drugs, and the stats-page category breakdown counts each drug once. Multi-membership would be more faithful to FDA but would change published category counts. That is your call, not mine, so I have not touched it.

**Cron:** green. The 09-24 scheduled run was created **12:12 UTC** against the 06:47 cron (~5.4 h of queueing, same as all week). It committed the `2026-09-24` snapshot and the repo pulled fast-forward.

**Notable diffs (09-24):** changelog **117 → 119**, both `availability` rewordings: Midazolam HCl injection (1) and Epinephrine bitartrate/lidocaine HCl injection (1). This is a quiet day after 09-23's injectables burst.

**Ring: SS-15 (per-category RSS).** Scoping found that FDA *does* supply a category: every one of the 1,601 records in the 09-24 snapshot has `therapeutic_category`, spelled by FDA. It also found that per-category feeds **already exist**: SS-4 shipped them (commit 36ed7bf), with 24 category feeds plus the main feed, linked from /changelog/. The one gap against SS-15's spec, and against the house rule, was that **no RSS channel description carried the not-medical-advice disclaimer**. I fixed that with a one-constant change in `rssDoc()`, so every feed now carries it. **Verified:** a 249-page build on the 09-24 snapshot. `grep -L "Not medical advice" dist/changelog/rss*.xml` returns nothing across all 25 feeds. `rss-anesthesia.xml` parses as XML (PowerShell `[xml]`) with the disclaimer in `channel.description`. Feed item counts equal the category's changelog entries: Anesthesia **21/21**, Oncology **7/7**, Cardiovascular **11/11**. No crawl was run.

**Next:** SS-16 (link each drug page's category label to its feed), queued in taro/OPERATIONS.md. Confirm the disclaimer is live in /changelog/rss.xml after the push deploys.

## 2026-09-25 — Ops: SS-16, drug pages link their category RSS feed

**USER-NEEDED (standing):** SS-7 (digest #1), plus the first-category-only filing question from 09-24. Nothing new.

**Cron:** green. The 09-25 scheduled run was created at **12:15 UTC** against the 06:47 cron (queueing about 5.5 h, as all week). It committed the `2026-09-25` snapshot, and the repo pulled fast-forward.

**Notable diffs (09-25):** none. The changelog is flat at **119** entries.

**Ring: SS-16.** In `scripts/build.js`, the category label in each drug page's subtitle now links to `../../changelog/rss-${catSlug(m.cat)}.xml`. The one-line `catSlug` definition moved from just before the per-category feed loop to directly under `CATS`, so the drug-page template can use it without a TDZ error. This is presentation only, with no data or methodology change. **Verified:** `node scripts/build.js` built 249 pages (241 drugs, 70 in shortage, snapshot 2026-09-25). `dist/drug/bupivacaine-hydrochloride-injection/index.html` contains `href="../../changelog/rss-anesthesia.xml"`, and that file exists (7,905 bytes). A loop over every `dist/drug/*/index.html` (253 dirs) found **all 241 live drug pages linking an existing feed**. The remaining 12 are removed-drug archive pages (e.g. methotrexate-injection, obeticholic-acid-tablet) from a separate template, left unlinked for now. The baseline build without the change also produces 253 dirs. The not-medical-advice disclaimer is still on the drug page. No crawl was run.

**Next:** SS-17, which links archive pages to their category feed, but only where that feed is built (it is queued in taro/OPERATIONS.md). Confirm the SS-16 link live on a drug page after deploy.

## 2026-09-26 — Ops: SS-17, archive pages link their category feed

**USER-NEEDED (standing):** SS-7 (digest #1), plus the first-category-only filing question from 09-24. Nothing new.

**Cron:** green. The 09-26 run was created at **11:48 UTC** against the 06:47 cron (queueing about 5 h). It committed the `2026-09-26` snapshot, and the repo pulled fast-forward.

**Notable diffs (09-26):** the changelog went from **119 to 124** (+5), all `availability` rewordings among injectable sedation/analgesia/emergency drugs: Midazolam HCl inj (2 presentations), Fentanyl Citrate inj (2), Morphine Sulfate inj, Hydromorphone HCl inj, Sodium Bicarbonate inj. That is another small revision burst in one therapeutic neighbourhood rather than a status change. If it is ever mentioned, describe it as an FDA text revision and never frame it around patient fear.

**Ring: SS-17.** On the departed-drug archive template (`scripts/build.js`), the category label now links to `../../changelog/rss-${catSlug(cat)}.xml`, but **only when `CATS.includes(cat)`**. `CATS` is the exact set the per-category feed loop builds, and any other category keeps a plain label. This is presentation only. **Verified:** `node scripts/build.js` built 249 pages (241 drugs, 70 in shortage, snapshot 2026-09-26). A loop over all 253 `dist/drug/*/index.html` counted 241 live and 12 archive pages. **All 12 archive pages now link a feed**, e.g. methotrexate-injection links rss-rheumatology and vecuronium links rss-anesthesia, and **0 links point at a missing file**. The plain-label fallback is untested on real data today because every departed drug's category is still current. The disclaimer is still present on the archive page. Also confirmed that **SS-16 is live**: the deployed bupivacaine page links rss-anesthesia.xml, which returns HTTP 200. No crawl was run.

**Next:** SS-18 (the inline catSlug duplicate on /changelog/, must produce byte-identical output), then SS-19 (llms.txt names the category feeds). Both are queued in taro/OPERATIONS.md.
