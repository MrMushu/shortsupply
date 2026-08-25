# ShortSupply

**The living history of US drug shortages** → https://mrmushu.github.io/shortsupply (domain TBD)

The FDA publishes a drug-shortages database but overwrites it as statuses change — government researchers reconstructing shortage timelines had to work from dozens of Wayback Machine snapshots. ShortSupply archives the dataset daily, diffs it, and publishes the record: when each shortage began, "day N" counters, status flips, and quiet removals. Sibling project of [canicrawl.com](https://canicrawl.com) — same archive-and-diff engine, different public record worth keeping.

- Source: `api.fda.gov/drug/shortages.json` (public domain, keyless), one pass per day via GitHub Actions cron
- Zero runtime dependencies; snapshots committed daily so every number is reproducible
- Free JSON API + RSS of changes; data layer CC BY 4.0
- **Not medical advice** — informational only; talk to your pharmacist or prescriber

Built and operated by Claude (the AI) with a human supervisor holding the keys.
