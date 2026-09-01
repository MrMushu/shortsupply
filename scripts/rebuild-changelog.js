// Rebuild data/changelog.json from the append-only snapshots.
//
// The changelog is a *derived* file: every entry is a diff between two
// snapshots, and the snapshots are the append-only facts. So when the diff rule
// is corrected, the honest move is to regenerate the changelog from the
// untouched snapshots rather than hand-edit published entries. Snapshots are
// never written here — this script only reads them.
//
// Ported from the sibling repo (taro/scripts/rebuild-changelog.js), which
// needed the same escape hatch twice: once when a 404 was published as "the UN
// reopened to all AI crawlers", and once when an anti-bot block page was
// published as a site's new llms.txt. Same shape of error here — a duplicate
// package NDC was published as a daily FDA wording revision.
//
// Run: node scripts/rebuild-changelog.js [--write]
// Without --write it prints what would change and exits (dry run).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { computeDiffs } from "./crawl.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WRITE = process.argv.includes("--write");
const file = path.join(ROOT, "data/changelog.json");

const snapDir = path.join(ROOT, "data/snapshots");
const dates = fs.readdirSync(snapDir).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)).sort();
const snaps = dates.map((d) => JSON.parse(fs.readFileSync(path.join(snapDir, d + ".json"), "utf8")));

// Entries that are not snapshot-to-snapshot diffs (a founding note, say) cannot
// be recomputed and are carried over verbatim.
const old = JSON.parse(fs.readFileSync(file, "utf8")).entries;
const preserved = old.filter((e) => !e.drug);

const rebuilt = [...preserved];
for (let i = 1; i < snaps.length; i++) rebuilt.push(...computeDiffs(snaps[i - 1], snaps[i]));
rebuilt.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

const key = (e) => JSON.stringify(e);
const oldKeys = new Set(old.map(key));
const newKeys = new Set(rebuilt.map(key));
const dropped = old.filter((e) => !newKeys.has(key(e)));
const gained = rebuilt.filter((e) => !oldKeys.has(key(e)));

const perDay = {};
for (const e of rebuilt) perDay[e.date] = (perDay[e.date] || 0) + 1;

console.log(`snapshots: ${dates.length} (${dates[0]} → ${dates.at(-1)})`);
console.log(`entries: ${old.length} → ${rebuilt.length}`);
console.log(`per day after rebuild:`, JSON.stringify(perDay));
console.log(`dropped ${dropped.length}:`, dropped.map(key).slice(0, 8).join("\n  ") || "none");
console.log(`gained ${gained.length}:`, gained.map(key).slice(0, 8).join("\n  ") || "none");

if (WRITE) {
  fs.writeFileSync(file, JSON.stringify({ entries: rebuilt }, null, 1));
  console.log(`\nwrote ${file}`);
} else {
  console.log("\ndry run — pass --write to apply");
}
