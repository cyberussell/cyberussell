// Reads the committed, manually-refreshed lastmod map (see
// scripts/generate-sitemap-lastmod.js for how it's generated and why it's
// a committed file rather than computed at build time).
'use strict';

const path = require('path');

// Lazy-require so a missing/stale map file fails loudly with a clear error
// rather than silently falling back to a fabricated date.
const map = require(path.join(__dirname, 'lastmod-map.json'));

function normalize(rawPath) {
  if (!rawPath) return '/';
  const withLeadingSlash = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith('/')) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

/**
 * Returns the ISO-8601 lastmod for a route, or undefined if no genuine
 * modification date is known for it (in which case next-sitemap omits
 * <lastmod> for that URL entirely — never fabricate one here).
 * @param {string} rawPath
 * @returns {string | undefined}
 */
function getLastmod(rawPath) {
  return map[normalize(rawPath)] ?? undefined;
}

module.exports = { getLastmod, lastmodMap: map };
