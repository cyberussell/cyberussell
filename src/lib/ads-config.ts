/**
 * Ad mode per page type.
 *
 * "auto"   – Google Auto Ads runs. Do NOT place manual <AdSense> components.
 * "manual" – Only explicit <AdSense> components serve ads. Auto Ads are
 *             suppressed for this page via the AdAutoOptOut component.
 *             Also exclude the URL in AdSense dashboard → Auto Ads → URL groups.
 * "none"   – No ads at all (lead-gen pages, tools, account areas, etc.)
 *
 * How to mark a new page:
 *   1. Add a pattern to the correct section below.
 *   2. "auto"   → don't add any <Ad*> components to that page.
 *   3. "manual" → import the variant you need from @/components/ads and drop it in.
 *   4. "none"   → done; no further action required.
 */

export type AdMode = "auto" | "manual" | "none";

/** Ordered list of [prefix-or-exact-path, mode] pairs. First match wins. */
const AD_RULES: [string, AdMode][] = [
  // ── No ads ─────────────────────────────────────────────────────────────────
  ["/services",        "none"],
  ["/contact",         "none"],
  ["/mission-control", "none"],
  ["/skill-finder",    "none"],
  ["/careers",         "none"],
  ["/discover",        "none"],
  ["/tools",           "manual"],
  ["/utm",             "none"],
  ["/learn",           "none"],  // lesson/quiz pages – protect the learning flow

  // ── Manual placement ────────────────────────────────────────────────────────
  ["/blog",   "manual"],   // in-article + bottom
  ["/guides", "manual"],   // between sections
  ["/earn",   "manual"],   // between sections
  ["/faq",    "manual"],

  // ── Auto Ads (homepage, about, resources, etc.) ────────────────────────────
  ["/", "auto"],           // catch-all; homepage and anything not matched above
];

/**
 * Returns the ad mode for a given pathname (e.g. "/blog/my-post").
 * Call on the server in layouts/pages; also safe to call client-side.
 */
export function getAdMode(pathname: string): AdMode {
  for (const [prefix, mode] of AD_RULES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/") || pathname.startsWith(prefix + "?")) {
      return mode;
    }
    // exact root match
    if (prefix === "/" ) return mode;
  }
  return "auto";
}
