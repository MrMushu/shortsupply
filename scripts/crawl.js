// ShortSupply crawler: fetches the FDA drug-shortages dataset (public domain,
// keyless), snapshots it, and diffs per-drug aggregate status against yesterday.
// Zero dependencies. Two paginated requests per day, total.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = "https://api.fda.gov/drug/shortages.json";
const UA = "ShortSupplyBot/0.1 (+https://github.com/MrMushu/shortsupply) fda-shortage-archive";

async function fetchPage(skip) {
  const res = await fetch(`${API}?limit=1000&skip=${skip}`, {
    headers: { "user-agent": UA }, signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) throw new Error(`openFDA http ${res.status}`);
  return res.json();
}

// Aggregate one drug's records into a single status.
export function drugStatus(records) {
  if (records.some((r) => r.status === "Current")) return "in-shortage";
  if (records.some((r) => r.status === "To Be Discontinued")) return "discontinuing";
  return "resolved";
}

export function groupByDrug(records) {
  const drugs = {};
  for (const r of records) {
    const name = (r.generic_name || "Unknown").trim();
    (drugs[name] ??= []).push(r);
  }
  return drugs;
}

export function computeDiffs(prev, next) {
  const entries = [];
  const a = groupByDrug(prev.records);
  const b = groupByDrug(next.records);
  for (const name of Object.keys(b)) {
    if (!a[name]) { entries.push({ date: next.date, drug: name, kind: "new", to: drugStatus(b[name]) }); continue; }
    const from = drugStatus(a[name]), to = drugStatus(b[name]);
    if (from !== to) entries.push({ date: next.date, drug: name, kind: "status", from, to });
  }
  for (const name of Object.keys(a)) {
    if (!b[name]) entries.push({ date: next.date, drug: name, kind: "removed", from: drugStatus(a[name]) });
  }
  return entries;
}

function appendChangelog(newEntries) {
  const file = path.join(ROOT, "data/changelog.json");
  const log = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { entries: [] };
  const seen = new Set(log.entries.map((e) => JSON.stringify(e)));
  let added = 0;
  for (const e of newEntries) {
    const key = JSON.stringify(e);
    if (!seen.has(key)) { log.entries.push(e); seen.add(key); added++; }
  }
  fs.writeFileSync(file, JSON.stringify(log, null, 1));
  return added;
}

async function run() {
  const prev = fs.existsSync(path.join(ROOT, "data/latest.json"))
    ? JSON.parse(fs.readFileSync(path.join(ROOT, "data/latest.json"), "utf8"))
    : null;
  const first = await fetchPage(0);
  const total = first.meta.results.total;
  const records = [...first.results];
  for (let skip = 1000; skip < total; skip += 1000) {
    const page = await fetchPage(skip);
    records.push(...page.results);
  }
  const date = new Date().toISOString().slice(0, 10);
  const snapshot = { date, generatedAt: new Date().toISOString(), sourceLastUpdated: first.meta.last_updated, total, records };
  fs.mkdirSync(path.join(ROOT, "data/snapshots"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `data/snapshots/${date}.json`), JSON.stringify(snapshot, null, 1));
  fs.writeFileSync(path.join(ROOT, "data/latest.json"), JSON.stringify(snapshot, null, 1));
  const drugs = groupByDrug(records);
  console.log(`Fetched ${records.length}/${total} records → ${Object.keys(drugs).length} drugs (FDA last_updated ${first.meta.last_updated})`);
  if (prev && prev.date !== snapshot.date) {
    const added = appendChangelog(computeDiffs(prev, snapshot));
    console.log(`Changes vs ${prev.date}: ${added} changelog entries`);
  }
  const counts = { "in-shortage": 0, discontinuing: 0, resolved: 0 };
  for (const recs of Object.values(drugs)) counts[drugStatus(recs)]++;
  console.log(`Drugs: ${counts["in-shortage"]} in shortage, ${counts.discontinuing} discontinuing, ${counts.resolved} resolved`);
}

if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
  run().catch((e) => { console.error(e); process.exit(1); });
}
