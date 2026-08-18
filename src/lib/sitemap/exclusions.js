// Centralized allow/exclude rules for the generated sitemap (next-sitemap).
//
// A route is excluded from the sitemap if it matches ANY rule below. Kept as
// plain CommonJS (not TypeScript) because `next-sitemap.config.js` requires
// it directly at CLI time, outside the Next.js/TS build pipeline.
//
// Covered by src/lib/sitemap/__tests__/exclusions.test.ts — keep rules and
// tests in sync when adding/removing a pattern.
'use strict';

/**
 * Routes where the route itself AND everything beneath it should be
 * excluded (path === prefix, or path starts with `${prefix}/`).
 */
const EXCLUDED_PREFIXES = [
  // Internal admin CMS - blueprints, service catalog, client intake,
  // subscribers, learning-system content editor, roadmap, settings, login.
  // Already marked `robots: noindex, nofollow` at the layout level
  // (src/app/mission-control/layout.tsx).
  '/mission-control',
];

/**
 * Single routes to exclude - no descendants implied.
 */
const EXCLUDED_EXACT_ROUTES = [
  // Learner dashboard - gated behind learner auth, not a search landing page.
  '/learn/dashboard',
  // Internal component/color/style reference. Already marked
  // `robots: noindex, nofollow` (src/app/design-system/page.tsx).
  '/design-system',
];

/**
 * Route *endings* to exclude regardless of which track/flow they belong to -
 * transitional, non-search-landing states (post-assessment screens, post-
 * lesson-track completion screens). Matched against the final path segment
 * only (suffix includes the leading slash), so e.g.
 * "/learn/skills/excel-spreadsheets/building-dashboards-and-reports" is
 * correctly left alone even though it contains the word "dashboard".
 */
const EXCLUDED_SUFFIXES = ['/assessment', '/complete', '/congratulations'];

/**
 * Path segments that mark a route as an internal utility route (admin,
 * authentication, checkout, account, preview, test, staging) wherever they
 * appear in the path. Matched as a *whole path segment* only, never a
 * substring - so e.g. ".../launching-testing-and-getting-feedback" and
 * ".../facebook-and-instagram-ads" (which contains "stag") are correctly
 * left alone.
 */
const EXCLUDED_UTILITY_SEGMENTS = [
  'admin',
  'auth',
  'login',
  'signup',
  'checkout',
  'account',
  'preview',
  'test',
  'staging',
];

/**
 * Normalize a path for matching: ensure a leading slash, strip a trailing
 * slash (except for the root "/").
 */
function normalize(rawPath) {
  if (!rawPath) return '/';
  const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

/**
 * Returns true if the given route should be excluded from the sitemap.
 * @param {string} rawPath
 * @returns {boolean}
 */
function isExcludedRoute(rawPath) {
  const path = normalize(rawPath);
  const segments = path.split('/').filter(Boolean);

  const matchesPrefix = EXCLUDED_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
  if (matchesPrefix) return true;

  if (EXCLUDED_EXACT_ROUTES.includes(path)) return true;

  const matchesSuffix = EXCLUDED_SUFFIXES.some((suffix) => path.endsWith(suffix));
  if (matchesSuffix) return true;

  const matchesUtilitySegment = segments.some((segment) =>
    EXCLUDED_UTILITY_SEGMENTS.includes(segment.toLowerCase())
  );
  if (matchesUtilitySegment) return true;

  return false;
}

module.exports = {
  EXCLUDED_PREFIXES,
  EXCLUDED_EXACT_ROUTES,
  EXCLUDED_SUFFIXES,
  EXCLUDED_UTILITY_SEGMENTS,
  isExcludedRoute,
};
