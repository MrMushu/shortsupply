// ShortSupply static site generator. Zero dependencies, relative links only.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { groupByDrug, drugStatus } from "./crawl.js";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const ORIGIN = process.env.SITE_ORIGIN || "https://mrmushu.github.io/shortsupply";

const snap = JSON.parse(fs.readFileSync(path.join(ROOT, "data/latest.json"), "utf8"));
const drugs = groupByDrug(snap.records);
const NAMES = Object.keys(drugs).sort();
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const parseUs = (d) => { const [m, dd, y] = (d || "").split("/").map(Number); return m ? Date.UTC(y, m - 1, dd) : null; };
const snapMs = Date.UTC(...snap.date.split("-").map(Number).map((v, i) => (i === 1 ? v - 1 : v)));
const days = (usDate) => { const t = parseUs(usDate); return t === null ? null : Math.max(0, Math.floor((snapMs - t) / 86400000)); };

const meta = {};
for (const name of NAMES) {
  const recs = drugs[name];
  const since = recs.map((r) => r.initial_posting_date).filter(Boolean).sort((a, b) => parseUs(a) - parseUs(b))[0] ?? null;
  meta[name] = {
    status: drugStatus(recs),
    since,
    dayN: since ? days(since) : null,
    cat: recs.find((r) => r.therapeutic_category?.length)?.therapeutic_category[0] ?? "Other",
    companies: [...new Set(recs.map((r) => r.company_name).filter(Boolean))],
    reasons: [...new Set(recs.map((r) => r.shortage_reason).filter(Boolean))],
  };
}
const CATS = [...new Set(NAMES.map((n) => meta[n].cat))].sort();
const inShortage = NAMES.filter((n) => meta[n].status === "in-shortage");
const longest = [...inShortage].filter((n) => meta[n].dayN !== null).sort((a, b) => meta[b].dayN - meta[a].dayN);
const statusLabel = { "in-shortage": "in shortage", discontinuing: "being discontinued", resolved: "resolved" };

const DISCLAIMER = `<div class="disclaimer"><strong>Not medical advice.</strong> ShortSupply republishes the FDA's drug-shortage data with history added. Talk to your pharmacist or prescriber about your situation — never change medication based on this site.</div>`;
const nav = [["", "Drugs"], ["stats/", "Stats"], ["changelog/", "Changelog"], ["api/", "API"], ["about/", "About"]];
function page({ title, desc, depth, active, content, extraHead = "" }) {
  const p = "../".repeat(depth);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="${p}style.css">
<link rel="icon" type="image/svg+xml" href="${p}favicon.svg">
${extraHead}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site"><div class="wrap">
  <a class="logo" href="${p}"><em>⊕</em> shortsupply</a>
  <nav class="main">${nav.map(([h, l]) => `<a href="${p}${h}"${active === l ? ' class="active"' : ""}>${l}</a>`).join("")}</nav>
</div></header>
<main id="main"><div class="wrap">
${content}
</div></main>
<footer class="site"><div class="wrap">
  <span>shortsupply — the living history of US drug shortages</span>
  <span>source: FDA · <a href="${p}data/latest.json">JSON API</a> · CC BY 4.0</span>
  <span>updated ${esc(snap.date)}</span>
  <span>run daily by an AI, supervised by a human · not medical advice</span>
</div></footer>
</body></html>`;
}
function write(rel, html) {
  const f = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  if (rel.endsWith(".html")) {
    const url = ORIGIN + "/" + rel.replace(/index\.html$/, "").replace(/\\/g, "/");
    const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "ShortSupply";
    const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "";
    html = html.replace("</head>", `<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="ShortSupply">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#fafaf9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0c0a09" media="(prefers-color-scheme: dark)">
</head>`);
  }
  fs.writeFileSync(f, html);
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const a of ["style.css", "app.js", "favicon.svg"]) fs.copyFileSync(path.join(ROOT, "assets", a), path.join(DIST, a));

// ---------- index ----------
const rows = NAMES.map((n) => {
  const m = meta[n];
  return `<tr data-drug="${esc(n.toLowerCase())}" data-cat="${esc(m.cat)}" data-status="${m.status}">
<td class="drug"><a href="drug/${slug(n)}/">${esc(n)}</a></td><td class="cat">${esc(m.cat)}</td>
<td class="nowrap"><span class="chip ${m.status}">${statusLabel[m.status]}</span></td>
<td class="nowrap">${m.since ? esc(m.since) : "—"}</td>
<td class="nowrap">${m.status === "in-shortage" && m.dayN !== null ? `<strong>day ${m.dayN.toLocaleString("en-US")}</strong>` : "—"}</td></tr>`;
}).join("\n");
write("index.html", page({
  title: "ShortSupply — every US drug shortage, with history",
  desc: `${inShortage.length} drugs currently in shortage per FDA data, tracked daily with day counters and full history. Longest-running: ${longest[0] ? `${longest[0]} (day ${meta[longest[0]].dayN.toLocaleString("en-US")})` : "n/a"}.`,
  depth: 0, active: "Drugs",
  extraHead: `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "WebSite",
    name: "ShortSupply", url: ORIGIN,
    description: `Daily archive of US drug shortages from FDA data: ${inShortage.length} drugs currently in shortage, with day counters and status-change history.`,
    publisher: { "@type": "Organization", name: "ShortSupply", url: ORIGIN },
  })}</script>`,
  content: `
<h1>Every US drug shortage, counted daily</h1>
<p class="sub">The FDA reports drug shortages but overwrites the record as it changes — researchers literally rebuild the history from archive snapshots. ShortSupply keeps the record: every drug, every status flip, every day counted. <span class="updated">Snapshot: ${esc(snap.date)} · FDA data updated ${esc(snap.sourceLastUpdated)}</span></p>
<div class="cards">
  <div class="card"><div class="num">${inShortage.length}</div><div class="lbl">drugs currently in shortage</div></div>
  <div class="card"><div class="num">${longest[0] ? meta[longest[0]].dayN.toLocaleString("en-US") : "—"}</div><div class="lbl">days: longest-running shortage${longest[0] ? ` (${esc(longest[0]).slice(0, 40)})` : ""}</div></div>
  <div class="card"><div class="num">${NAMES.filter((n) => meta[n].status === "discontinuing").length}</div><div class="lbl">being discontinued by makers</div></div>
  <div class="card"><div class="num">${CATS.length}</div><div class="lbl">therapeutic categories affected</div></div>
</div>
<div class="controls">
  <input type="search" id="q" placeholder="Search drugs…" aria-label="Search drugs">
  <select id="cat" aria-label="Filter by category"><option value="">All categories</option>${CATS.map((c) => `<option>${esc(c)}</option>`).join("")}</select>
  <label class="toggle"><input type="checkbox" id="onlyshortage"> only current shortages</label>
  <span class="count" id="rowcount"></span>
</div>
<div class="tablewrap"><table>
<thead><tr><th>Drug</th><th>Category</th><th>Status</th><th>In shortage since</th><th>Day count</th></tr></thead>
<tbody>${rows}</tbody></table></div>
${DISCLAIMER}
<script src="app.js"></script>`,
}));

// ---------- per-drug pages + JSON ----------
for (const n of NAMES) {
  const m = meta[n];
  const recs = drugs[n];
  const recRows = recs.map((r) => `<tr><td>${esc(r.presentation ?? "—")}</td><td>${esc(r.company_name ?? "—")}</td>
<td><span class="chip ${/available/i.test(r.availability ?? "") && !/not|un/i.test(r.availability ?? "") ? "available" : /unavailable|not/i.test(r.availability ?? "") ? "unavailable" : "other"}">${esc(r.availability ?? "unknown")}</span></td>
<td class="nowrap cat">${esc(r.update_date ?? "—")}</td></tr>`).join("\n");
  const title = m.status === "in-shortage"
    ? `${n} shortage: day ${m.dayN?.toLocaleString("en-US") ?? "?"} — ShortSupply`
    : `${n} — ${statusLabel[m.status]} — ShortSupply`;
  write(`drug/${slug(n)}/index.html`, page({
    title,
    desc: `${n} is ${statusLabel[m.status]} per FDA data${m.since ? `, first reported ${m.since}` : ""}. ${m.companies.length} manufacturer(s) listed. Updated daily with full history.`,
    depth: 2, active: "Drugs",
    content: `
<a class="crumb" href="../../">← all drugs</a>
<h1>${esc(n)}</h1>
<p class="sub"><span class="chip ${m.status}">${statusLabel[m.status]}</span> · ${esc(m.cat)} <span class="updated">· Snapshot: ${esc(snap.date)}</span></p>
${m.status === "in-shortage" && m.dayN !== null ? `<div class="daycount">Day ${m.dayN.toLocaleString("en-US")}</div><p class="cat">of this shortage, counting from the FDA's first posting on ${esc(m.since)}</p>` : ""}
<dl class="kv">
  <dt>Manufacturers listed</dt><dd>${m.companies.map(esc).join(", ") || "—"}</dd>
  ${m.reasons.length ? `<dt>Reported reason(s)</dt><dd>${m.reasons.map(esc).join("; ")}</dd>` : ""}
  <dt>Machine-readable</dt><dd><a href="../../data/drugs/${slug(n)}.json">JSON for this drug</a></dd>
</dl>
<h2>Presentations (${recs.length})</h2>
<div class="tablewrap"><table>
<thead><tr><th>Presentation</th><th>Company</th><th>Availability</th><th>Updated</th></tr></thead>
<tbody>${recRows}</tbody></table></div>
<h2>History</h2>
<p class="note">Daily change tracking began ${esc(snap.date)} (index founding). Status flips and availability changes will accumulate here.</p>
${DISCLAIMER}`,
  }));
  write(`data/drugs/${slug(n)}.json`, JSON.stringify({ drug: n, asOf: snap.date, ...m, records: recs }, null, 1));
}

// ---------- stats ----------
const catStats = CATS.map((c) => {
  const members = NAMES.filter((n) => meta[n].cat === c);
  return { c, n: members.length, short: members.filter((n) => meta[n].status === "in-shortage").length };
}).sort((a, b) => b.short - a.short);
write("stats/index.html", page({
  title: `US drug shortages by the numbers, ${snap.date} — ShortSupply`,
  desc: `${inShortage.length} drugs in shortage across ${CATS.length} therapeutic categories. Longest-running shortages and category breakdown, updated daily from FDA data.`,
  depth: 1, active: "Stats",
  extraHead: `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org", "@type": "Dataset",
    name: "ShortSupply: US drug shortage history",
    description: "Daily archive of the FDA drug-shortages dataset with status-change history.",
    dateModified: snap.date, license: "https://creativecommons.org/licenses/by/4.0/",
    distribution: [{ "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${ORIGIN}/data/latest.json` }],
  })}</script>`,
  content: `
<h1>The shortage ledger</h1>
<p class="sub">${NAMES.length} drugs tracked; ${inShortage.length} currently in shortage. <span class="updated">Snapshot: ${esc(snap.date)}</span></p>
<h2>Longest-running shortages</h2>
<div class="tablewrap"><table>
<thead><tr><th>Drug</th><th>Category</th><th>Since</th><th>Days</th></tr></thead>
<tbody>${longest.slice(0, 15).map((n) => `<tr><td class="drug"><a href="../drug/${slug(n)}/">${esc(n)}</a></td><td class="cat">${esc(meta[n].cat)}</td><td class="nowrap">${esc(meta[n].since)}</td><td><strong>${meta[n].dayN.toLocaleString("en-US")}</strong></td></tr>`).join("")}</tbody>
</table></div>
<h2>By therapeutic category</h2>
<div class="tablewrap"><table>
<thead><tr><th>Category</th><th>Tracked drugs</th><th>In shortage</th></tr></thead>
<tbody>${catStats.map((s) => `<tr><td>${esc(s.c)}</td><td>${s.n}</td><td>${s.short}</td></tr>`).join("")}</tbody>
</table></div>
<p class="note">Data CC BY 4.0 — cite "ShortSupply" with a link. Every figure reproducible from committed daily snapshots.</p>
${DISCLAIMER}`,
}));

// ---------- changelog + rss ----------
const changelog = fs.existsSync(path.join(ROOT, "data/changelog.json"))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, "data/changelog.json"), "utf8"))
  : { entries: [{ date: snap.date, kind: "founding" }] };
function entryText(e) {
  switch (e.kind) {
    case "founding": return `Index founded: ${NAMES.length} drugs tracked (${inShortage.length} in shortage). Daily change tracking starts here.`;
    case "new": return `${e.drug} appeared on the FDA shortage list (${statusLabel[e.to] ?? e.to})`;
    case "status": return `${e.drug}: ${statusLabel[e.from] ?? e.from} → ${statusLabel[e.to] ?? e.to}`;
    case "removed": return `${e.drug} was removed from the FDA list (was ${statusLabel[e.from] ?? e.from})`;
    default: return `${e.drug ?? ""} ${e.kind}`;
  }
}
const entriesDesc = [...changelog.entries].reverse();
const byDate = new Map();
for (const e of entriesDesc) { if (!byDate.has(e.date)) byDate.set(e.date, []); byDate.get(e.date).push(e); }
write("changelog/index.html", page({
  title: "Changelog — ShortSupply",
  desc: "Every drug-shortage status change we observe, newest first.",
  depth: 1, active: "Changelog",
  extraHead: `<link rel="alternate" type="application/rss+xml" title="ShortSupply changes" href="rss.xml">`,
  content: `
<h1>Changelog</h1>
<p class="sub">Every shortage begun, resolved, or quietly removed — detected by daily snapshot diffs. Subscribe via <a href="rss.xml">RSS</a>.</p>
${[...byDate.entries()].map(([d, list]) => `<h2>${esc(d)}</h2><ul>${list.map((e) => `<li>${e.drug ? `<a href="../drug/${slug(e.drug)}/">` : ""}${esc(entryText(e))}${e.drug ? "</a>" : ""}</li>`).join("")}</ul>`).join("\n")}
${DISCLAIMER}`,
}));
write("changelog/rss.xml", `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>ShortSupply — US drug shortage changes</title>
<link>${ORIGIN}/changelog/</link>
<description>Daily-detected changes in the FDA drug-shortage list.</description>
${entriesDesc.slice(0, 50).map((e) => `<item><title>${esc(entryText(e))}</title><link>${ORIGIN}/${e.drug ? `drug/${slug(e.drug)}/` : "stats/"}</link><guid isPermaLink="false">${esc(`${e.date}|${e.drug ?? "index"}|${e.kind}|${e.to ?? ""}`)}</guid><pubDate>${new Date(e.date + "T07:00:00Z").toUTCString()}</pubDate></item>`).join("\n")}
</channel></rss>
`);

// ---------- about, api, misc ----------
write("about/index.html", page({
  title: "About & methodology — ShortSupply",
  desc: "What ShortSupply is, how the daily FDA archive works, and who runs it.",
  depth: 1, active: "About",
  content: `
<h1>About</h1>
<p class="sub">ShortSupply is the living history of US drug shortages — the record the FDA publishes but doesn't keep.</p>
<h2>Why</h2>
<p>The FDA's shortage database shows only the current status of each drug. When a status changes, the old one is overwritten — which is why government researchers reconstructing shortage timelines had to work from dozens of Wayback Machine snapshots. ShortSupply archives the dataset every day, diffs it, and publishes the history: when each shortage began, how long it has run, and when it actually ended.</p>
<h2>Methodology</h2>
<p>Once a day we fetch the FDA's public drug-shortages dataset (<code>api.fda.gov/drug/shortages.json</code> — public domain, no key), snapshot all ~${snap.total} records, group them by drug, and diff aggregate status against yesterday. A drug is "in shortage" if any presentation is Current, "being discontinued" if manufacturers are withdrawing it, "resolved" otherwise. Day counters run from the FDA's own initial posting date. Snapshots are committed daily to a public repository; every number is reproducible.</p>
<p>Limitations, stated plainly: this reflects what the FDA publishes, which can lag reality at your pharmacy — the ASHP shortage list (run by pharmacists) often reports more shortages sooner, and cross-checking against it is on our roadmap. Availability wording is the manufacturers' own.</p>
<h2>Who runs this</h2>
<p>ShortSupply is built and operated by Claude, an AI, alongside its sibling <a href="https://canicrawl.com">canicrawl.com</a> — same daily archive-and-diff engine, different public record worth keeping. A human supervisor owns the infrastructure and approves anything that leaves the site.</p>
${DISCLAIMER}`,
}));
write("api/index.html", page({
  title: "API — ShortSupply",
  desc: "Free JSON API for US drug shortage data with history. No key required.",
  depth: 1, active: "API",
  content: `
<h1>API</h1>
<p class="sub">Static JSON, no key, CC BY 4.0 with attribution.</p>
<dl class="kv">
  <dt><code>/data/latest.json</code></dt><dd>Full latest snapshot (all FDA records + our date stamp). <a href="../data/latest.json">Open</a></dd>
  <dt><code>/data/drugs/&lt;slug&gt;.json</code></dt><dd>One drug: aggregate status, day count, records. Example: <a href="../data/drugs/${slug(longest[0] ?? NAMES[0])}.json">${esc(slug(longest[0] ?? NAMES[0]))}.json</a></dd>
</dl>
<p class="note">Upstream source is the FDA's public-domain dataset; our additions (aggregation, day counters, history) are CC BY 4.0. If you're an AI agent: welcome — <a href="../llms.txt">llms.txt</a> has the tour.</p>`,
}));
write("404.html", page({ title: "Not found — ShortSupply", desc: "Page not found.", depth: 0, active: "", content: `<h1>404</h1><p class="sub">No such page. The <a href="./">index</a> lists every tracked drug.</p>` }));
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
write("llms.txt", `# ShortSupply

> The living history of US drug shortages: a daily archive of the FDA drug-shortages dataset with status-change history, day counters, and a free JSON API. ${inShortage.length} drugs currently in shortage as of ${snap.date}. Not medical advice.

## Data
- [Latest snapshot (JSON)](/data/latest.json)
- [Per-drug JSON](/data/drugs/${slug(longest[0] ?? NAMES[0])}.json) — replace the slug
- [Changes (RSS)](/changelog/rss.xml)
- [Methodology](/about/)

Data CC BY 4.0 (our layer); upstream FDA data is public domain. Cite "ShortSupply" with a link.

For the complete census in one file: [/llms-full.txt](/llms-full.txt)
`);
// llms-full.txt: the whole ledger in one plaintext file for AI readers.
const fullLines = NAMES.map((n) => {
  const m = meta[n];
  const parts = [
    statusLabel[m.status],
    m.status === "in-shortage" && m.dayN !== null ? `day ${m.dayN} (since ${m.since})` : null,
    m.cat,
    `${m.companies.length} manufacturer(s)`,
  ].filter(Boolean);
  return `${n} — ${parts.join(" — ")}`;
});
write("llms-full.txt", `# ShortSupply full census — ${snap.date}

> US drug-shortage status for ${NAMES.length} drugs from the FDA's public dataset, archived and diffed daily. ${inShortage.length} in shortage; longest-running: ${longest[0] ?? "n/a"}${longest[0] ? ` (day ${meta[longest[0]].dayN})` : ""}. Not medical advice. JSON: ${ORIGIN}/data/latest.json — cite "ShortSupply" (${ORIGIN}), CC BY 4.0.

${fullLines.join("\n")}
`);
// IndexNow key file (public by design)
const INDEXNOW_KEY = "d41b7c25e9a84f6bb02c8d13f7e5a960";
write(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
const urls = ["", "stats/", "changelog/", "api/", "about/", ...NAMES.map((n) => `drug/${slug(n)}/`)];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${ORIGIN}/${u}</loc><lastmod>${snap.date}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.copyFileSync(path.join(ROOT, "data/latest.json"), path.join(DIST, "data/latest.json"));
console.log(`Built ${urls.length + 1} pages into dist/ (${NAMES.length} drugs, ${inShortage.length} in shortage, snapshot ${snap.date}).`);
