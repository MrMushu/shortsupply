# Marketing brief — ShortSupply

## Positioning
**The FDA overwrites this record. We kept it.** ShortSupply is the missing history layer on the official drug-shortage database: day counters, status flips, quiet revisions, and the graveyard of drugs that vanish from the list without announcement.

## Tone rules (non-negotiable)
- Calm, factual, useful. **Never patient-fear framing** — no "are YOUR meds about to run out" copy, ever.
- Never medical advice; every page carries the disclaimer and so does every draft below.
- Every external post requires the user's explicit per-action OK, in the session it goes out.

## The hooks (all true, all sourced from our own data)
- The longest-running US drug shortage is **Atropine Sulfate Injection: day 5,350+ — over 14 years.**
- Generic Vyvanse (lisdexamfetamine): **day 1,138+.**
- The FDA feed contains almost no "Resolved" records (10 of 1,628) — **resolutions effectively vanish**, which is why researchers had to rebuild shortage history from 84 Wayback Machine snapshots. We are the living archive that makes that unnecessary.
- **The graveyard**: drugs leave the FDA list silently; we catch every departure the day it happens.

## Audiences & channels (fire AFTER Canicrawl's launch, with ≥2 weeks of diff history)
1. **Show HN** — "Show HN: The FDA overwrites its drug-shortage database — I archive it daily" (engineering + public-data angle, not health advice)
2. **Data Is Plural** — near-perfect fit (public dataset with history added, CC BY)
3. **Health-data journalists** — /about/ press block; pitch angle is the day-counters and the vanishing-resolutions finding, with receipts
4. **r/pharmacy** — only per subreddit rules, framed as a reference tool for professionals; user approves
5. **Researchers** — the NCBI/ASPE teams who Wayback-reconstructed shortage history are the exact people who'd cite a living archive

## Draft: Show HN (refresh numbers from /stats/ on launch day)
> **Show HN: The FDA overwrites its drug-shortage database — I archive it daily**
> https://mrmushu.github.io/shortsupply/  (domain TBD)
> The FDA's drug-shortages database shows only current status; when something changes, the old record is gone. Government researchers reconstructing shortage timelines literally had to use 84 Wayback Machine snapshots. ShortSupply pulls the full dataset daily (openFDA, public domain), diffs it, and publishes the history: per-drug "day N of shortage" counters (the record-holder is at day 5,350 — over 14 years), status flips, availability revisions, and a graveyard of drugs that quietly vanish from the list. Free JSON API + RSS, CC BY, every number reproducible from committed snapshots. Not medical advice — it's the record-keeping layer the official record is missing. Built and operated by Claude (the AI), sibling of canicrawl.com; I approve deploys and posts.

## Launch checklist
- [ ] Canicrawl launched first (portfolio rule)
- [ ] ≥2 weeks of daily diffs accumulated (first real flips/graveyard entries make the story)
- [ ] Domain chosen and wired (shortsupply.io / .co / .today candidates — user buys)
- [ ] Numbers refreshed from live /stats/
- [ ] User approves each post, per channel
