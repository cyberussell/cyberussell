#!/usr/bin/env node
/**
 * Generates src/lib/sitemap/lastmod-map.json — a committed, manually
 * refreshed lookup of { route: ISO-8601 lastmod } used by
 * next-sitemap.config.js instead of a build-time `new Date()`.
 *
 * WHY THIS IS A COMMITTED FILE, NOT A BUILD-TIME COMPUTATION:
 * Vercel (and most CI) checkouts are shallow clones. Running `git log`
 * against a shallow clone at build time would silently collapse back to
 * a single uniform commit date for every file — the exact bug this
 * script exists to avoid. So this script is run manually/locally
 * (where full git history is available) whenever content changes, and
 * its output is committed. next-sitemap.config.js only ever *reads*
 * the resulting JSON — it never invokes git itself.
 *
 * SOURCE OF TRUTH PER ROUTE TYPE (never fabricated):
 *   - /blog/<slug>       -> the post's own frontmatter `date` field
 *                           (src/content/blog/<slug>.md) — author-declared,
 *                           the most authoritative date available.
 *   - /portfolio/<slug>  -> the case study's own `date` field
 *                           (src/data/portfolio/<slug>.json).
 *   - /careers/<slug>    -> no per-item date field exists in the data
 *                           model, so we use git's last-commit date for
 *                           that specific blueprint's JSON file
 *                           (src/data/careers/<slug>.json) — a genuine,
 *                           non-fabricated signal of when that
 *                           blueprint's content last actually changed.
 *   - /services/<slug>   -> same reasoning as careers: git last-commit
 *                           date of src/data/services/<slug>.json.
 *                           NOTE: the Supabase `services` table does have
 *                           an `updated_at` column, but the live
 *                           /services/[slug] pages are statically
 *                           rendered from these JSON files, not from the
 *                           database (see src/lib/services/data.ts) — so
 *                           the JSON file's own history is what's
 *                           actually materially true of the rendered
 *                           page today. If that data source changes to
 *                           read live from Supabase, swap this rule for
 *                           the DB `updated_at` value.
 *   - /tools/<slug> (dynamic aliases only, e.g. ai-confidence-analyzer)
 *                        -> git last-commit date of the shared
 *                           src/lib/tools-data.ts (all tool metadata
 *                           lives in one file, so this is coarser than
 *                           the per-item cases above, but still genuine).
 *   - everything else    -> git last-commit date of that route's own
 *                           src/app/<route>/page.tsx source file.
 *
 * If a route's source file is untracked (no git history at all — e.g.
 * uncommitted work in progress), the route is OMITTED from the map on
 * purpose. next-sitemap then omits <lastmod> for that URL entirely
 * rather than fabricating one (see next-sitemap.config.js).
 *
 * Usage: node scripts/generate-sitemap-lastmod.js
 * Re-run whenever page/content files change, then commit the updated
 * lastmod-map.json alongside that content change.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const SITEMAP_XML = path.join(ROOT, 'public', 'sitemap-0.xml');
const OUTPUT_MAP = path.join(ROOT, 'src', 'lib', 'sitemap', 'lastmod-map.json');

const STATIC_TOOL_SLUGS = new Set(['bio-generator', 'prompt-forge', 'scam-scanner', 'typing-practice']);

function readSitemapPaths() {
  const xml = fs.readFileSync(SITEMAP_XML, 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return locs
    .map((loc) => loc.replace(/^https:\/\/www\.cyberussell\.com/, ''))
    .map((p) => (p === '' ? '/' : p));
}

/** Last-commit ISO date for a file, or null if untracked/no history. */
function gitLastModified(relFile) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', relFile], {
      cwd: ROOT,
      encoding: 'utf-8',
    }).trim();
    return out ? new Date(out).toISOString() : null;
  } catch {
    return null;
  }
}

function dateOnlyToIso(dateStr) {
  if (!dateStr) return null;
  const d = new Date(`${dateStr}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Resolve { source, lastmod } for one route path. Never fabricates. */
function resolveRoute(urlPath) {
  let match;

  if ((match = urlPath.match(/^\/blog\/(.+)$/))) {
    const file = path.join('src', 'content', 'blog', `${match[1]}.md`);
    const abs = path.join(ROOT, file);
    if (fs.existsSync(abs)) {
      const { data } = matter(fs.readFileSync(abs, 'utf-8'));
      const iso = dateOnlyToIso(data.date);
      if (iso) return { source: `frontmatter date (${file})`, lastmod: iso };
    }
    return { source: `git log (${file}, frontmatter date missing/invalid)`, lastmod: gitLastModified(file) };
  }

  if ((match = urlPath.match(/^\/portfolio\/(.+)$/))) {
    const file = path.join('src', 'data', 'portfolio', `${match[1]}.json`);
    const abs = path.join(ROOT, file);
    if (fs.existsSync(abs)) {
      const json = JSON.parse(fs.readFileSync(abs, 'utf-8'));
      const iso = dateOnlyToIso(json.date);
      if (iso) return { source: `case study "date" field (${file})`, lastmod: iso };
    }
    return { source: `git log (${file}, date field missing/invalid)`, lastmod: gitLastModified(file) };
  }

  if ((match = urlPath.match(/^\/careers\/(.+)$/))) {
    const file = path.join('src', 'data', 'careers', `${match[1]}.json`);
    return { source: `git log (${file}, no date field in data model)`, lastmod: gitLastModified(file) };
  }

  if ((match = urlPath.match(/^\/services\/(.+)$/)) && match[1] !== 'inquire') {
    const file = path.join('src', 'data', 'services', `${match[1]}.json`);
    return { source: `git log (${file}, no date field in data model)`, lastmod: gitLastModified(file) };
  }

  if ((match = urlPath.match(/^\/tools\/(.+)$/)) && !STATIC_TOOL_SLUGS.has(match[1])) {
    const file = path.join('src', 'lib', 'tools-data.ts');
    return { source: `git log (${file}, shared tools data file)`, lastmod: gitLastModified(file) };
  }

  const file = path.join('src', 'app', urlPath === '/' ? '' : urlPath.slice(1), 'page.tsx');
  return { source: `git log (${file})`, lastmod: gitLastModified(file) };
}

function main() {
  const routePaths = readSitemapPaths();
  const map = {};
  const report = { fromFrontmatter: 0, fromJsonDate: 0, fromGitLog: 0, omitted: 0 };

  const sorted = [...routePaths].sort();
  for (const p of sorted) {
    const { source, lastmod } = resolveRoute(p);
    if (lastmod) {
      map[p] = lastmod;
      if (source.startsWith('frontmatter')) report.fromFrontmatter++;
      else if (source.startsWith('case study')) report.fromJsonDate++;
      else report.fromGitLog++;
    } else {
      report.omitted++;
      console.log(`OMIT  ${p}  (${source} -> no history found)`);
    }
  }

  fs.mkdirSync(path.dirname(OUTPUT_MAP), { recursive: true });
  fs.writeFileSync(OUTPUT_MAP, `${JSON.stringify(map, null, 2)}\n`);

  console.log('');
  console.log(`Routes total:        ${routePaths.length}`);
  console.log(`From blog frontmatter: ${report.fromFrontmatter}`);
  console.log(`From JSON date field:  ${report.fromJsonDate}`);
  console.log(`From git log:          ${report.fromGitLog}`);
  console.log(`Omitted (no source):   ${report.omitted}`);
  console.log(`Written to ${path.relative(ROOT, OUTPUT_MAP)}`);
}

main();
