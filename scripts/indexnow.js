// Submit site URLs to IndexNow (standard SEO plumbing for our own site).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const KEY = "d41b7c25e9a84f6bb02c8d13f7e5a960";
const sitemap = fs.readFileSync(path.join(ROOT, "dist/sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const host = new URL(urls[0]).host;

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  signal: AbortSignal.timeout(30000),
  body: JSON.stringify({ host, key: KEY, keyLocation: `${new URL(urls[0]).origin}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
});
console.log(`IndexNow: submitted ${Math.min(urls.length, 10000)} URLs for ${host} — HTTP ${res.status}`);
