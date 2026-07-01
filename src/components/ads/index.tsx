/**
 * Named ad-unit variants.
 *
 * Each is a thin wrapper around AdSense with sensible defaults.
 * Replace the placeholder adSlot values with real slot IDs from your
 * AdSense dashboard (Ad units → Display ad → copy "Ad slot ID").
 *
 * Usage:
 *   import { AdBanner, AdInArticle } from "@/components/ads";
 *   <AdInArticle />
 */

export { default as AdSense } from "./AdSense";
export { default as AdAutoOptOut } from "./AdAutoOptOut";

import AdSense from "./AdSense";

// ── Slot IDs ────────────────────────────────────────────────────────────────
// Replace these with real slot IDs from AdSense dashboard → Ad units.
const SLOTS = {
  banner:     "REPLACE_BANNER_SLOT_ID",
  rectangle:  "REPLACE_RECTANGLE_SLOT_ID",
  responsive: "REPLACE_RESPONSIVE_SLOT_ID",
  inArticle:  "REPLACE_IN_ARTICLE_SLOT_ID",
  multiplex:  "REPLACE_MULTIPLEX_SLOT_ID",
} as const;

// ── Leaderboard / Banner (728×90 desktop, collapses on mobile) ──────────────
export function AdBanner({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={SLOTS.banner}
      adFormat="horizontal"
      responsive
      className={className}
      style={{ minHeight: 90 }}
    />
  );
}

// ── Medium Rectangle (300×250) ──────────────────────────────────────────────
export function AdRectangle({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={SLOTS.rectangle}
      adFormat="rectangle"
      responsive={false}
      className={className}
      style={{ width: 300, height: 250 }}
    />
  );
}

// ── Responsive (fills container width) ─────────────────────────────────────
export function AdResponsive({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={SLOTS.responsive}
      adFormat="auto"
      responsive
      className={className}
    />
  );
}

// ── In-Article (native-style, between paragraphs) ──────────────────────────
export function AdInArticle({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={SLOTS.inArticle}
      adFormat="fluid"
      responsive
      className={className ?? "my-8"}
    />
  );
}

// ── Multiplex (related-content grid) ───────────────────────────────────────
export function AdMultiplex({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot={SLOTS.multiplex}
      adFormat="autorelaxed"
      responsive
      className={className ?? "my-8"}
    />
  );
}
