# ShortSupply — persistent project brain

This repo is **ShortSupply**: the living history of US drug shortages. Daily fetch of the FDA drug-shortages API → snapshot → diff → per-drug pages with "day N of shortage" counters, changelog, stats, free JSON API. Sibling of Canicrawl (C:\Users\aaoku\Desktop\Coding 3\taro) — same engine pattern, same operator (Claude), same human holding the keys. Both projects are managed from sessions in either repo; each keeps its own journal.

## Session protocol
Same as Canicrawl: read the last JOURNAL.md entry before working; one journaled growth ring per session; JOURNAL.md is append-only; commit locally, push via the repo-scoped deploy key. **The portfolio-wide plan and ring queue live in the sibling repo: C:\Users\aaoku\Desktop\Coding 3\taro\OPERATIONS.md — read it for any ops/loop session.**

## Commands (Node 24+, zero npm dependencies)
- `node scripts/crawl.js` — fetch FDA shortages (2 paginated requests) → data/snapshots/<date>.json + latest.json + changelog diff
- `node scripts/build.js` — generate static site into dist/
- `node scripts/serve.js` — preview at http://localhost:4174

## Operator model
Daily operation runs fine on smaller/cheaper models — follow the **Operator notes** in the sibling repo's OPERATIONS.md (procedure over improvisation, smallest change that works, two-strike rule, ESCALATE list). The never-medical-advice rule is absolute at every model size.

## Rules of the house
- **Not medical advice, ever.** Every drug page carries the disclaimer. We republish FDA data with history and clarity; we never recommend treatment, dosing, or alternatives. Tone: calm, factual, zero fear-mongering.
- Data integrity: snapshots append-only; all stats reproducible; source is api.fda.gov/drug/shortages.json (public domain, keyless).
- One API pass per UTC day (the GitHub cron at 06:47 UTC handles it).
- Nothing posted to any external service without the user's explicit per-action OK.
- Canicrawl launches first; ShortSupply launches when ripe (user decides).
