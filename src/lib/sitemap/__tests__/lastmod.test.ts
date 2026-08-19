import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { describe, expect, it } from 'vitest';
import { getLastmod, lastmodMap } from '../lastmod';

const ROOT = path.join(__dirname, '..', '..', '..', '..');

describe('getLastmod', () => {
  it('returns a genuine per-route date for a known route, not undefined', () => {
    expect(getLastmod('/about')).toBeTruthy();
    expect(getLastmod('/careers/seo')).toBeTruthy();
  });

  it('returns undefined (never a fabricated date) for a route with no entry in the map', () => {
    expect(getLastmod('/this-route-does-not-exist-anywhere')).toBeUndefined();
  });

  it("uses the blog post's own frontmatter date, matching the source file exactly", () => {
    const file = path.join(ROOT, 'src', 'content', 'blog', 'hidden-cost-of-free-tools.md');
    const { data } = matter(fs.readFileSync(file, 'utf-8'));
    const expected = new Date(`${data.date}T00:00:00.000Z`).toISOString();
    expect(getLastmod('/blog/hidden-cost-of-free-tools')).toBe(expected);
  });

  it("uses the portfolio case study's own date field, matching the source file exactly", () => {
    const file = path.join(ROOT, 'src', 'data', 'portfolio', 'cyberussell.json');
    const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const expected = new Date(`${json.date}T00:00:00.000Z`).toISOString();
    expect(getLastmod('/portfolio/cyberussell')).toBe(expected);
  });

  it('normalizes trailing slashes and missing leading slashes the same way', () => {
    expect(getLastmod('/about/')).toBe(getLastmod('/about'));
    expect(getLastmod('about')).toBe(getLastmod('/about'));
  });
});

describe('lastmod-map.json (regression guard against build/request-time fabrication)', () => {
  it('does not assign the same timestamp to every route', () => {
    const values = Object.values(lastmodMap);
    const distinct = new Set(values);
    // 232 routes resolve to 48 distinct real dates today; guard loosely
    // (>= 10) so the test doesn't need updating on every content edit,
    // while still catching a regression to a single uniform timestamp.
    expect(distinct.size).toBeGreaterThan(10);
  });

  it('is not uniformly stamped with "now" (the specific build/request-time bug this guards against)', () => {
    // A single genuinely-recent content edit is fine. The bug we're
    // guarding against is EVERY route sharing a build/request timestamp,
    // so fail only if the overwhelming majority look freshly stamped.
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const values = Object.values(lastmodMap) as string[];
    const recentCount = values.filter((iso) => new Date(iso).getTime() >= oneHourAgo).length;
    expect(recentCount / values.length).toBeLessThan(0.5);
  });

  it('every value is a valid ISO-8601 date string', () => {
    for (const [route, iso] of Object.entries(lastmodMap)) {
      expect(Number.isNaN(new Date(iso as string).getTime()), `${route} has an invalid date: ${iso}`).toBe(false);
    }
  });
});
