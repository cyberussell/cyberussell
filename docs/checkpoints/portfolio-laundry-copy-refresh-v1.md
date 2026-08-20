# Portfolio — Laundry Case Study Copy/Art Refresh — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio)
**Feature:** Bring `/portfolio` and `/portfolio/laundry-management-system` back in sync with today's `/demo/laundryflow` full redesign (commit `8a66955`, black/yellow/gold "Suds & Fold"-style theme).

## Files Modified
- `src/app/portfolio/page.tsx`
- `src/data/portfolio/laundry-management-system.json`
- `public/portfolio/laundry-management-system/cover.svg`
- `public/portfolio/laundry-management-system/icon.svg`

## Summary of Changes

The laundry demo's full redesign earlier today (blue theme → black/yellow/gold, new photos, live order-tracking mock, new pickup-booking flow) never made it back into the Portfolio product's own copy/art, which still described the pre-redesign site:

1. `page.tsx`'s "Sample & Demo Websites" card for laundry pointed at `hero-pile.png`, an old photo unreferenced by the demo since the redesign (which uses `hero-laundry.jpg`). Swapped to `hero-laundry.jpg`.
2. `laundry-management-system.json`'s tagline/overview/solution/results described the *old* "ad-style poster panels, condensed grotesk headline" design. Rewrote to describe the current build: black-and-yellow brand system, real attendant photography, trust strip, services grid, the live-look order-tracking mock browser, the 3-step pickup-booking flow, and the pricing-tiers reveal. `problem` field was still accurate, left unchanged.
3. `cover.svg`/`icon.svg` were generic blue (`#2563EB`) gradient mockups unrelated to the new palette. Redrawn in the same layout/style but recolored to the redesign's actual palette (`#14181F` ink, `#FFC629` yellow, `#B98900`/`#E4AE00` gold), with the cover's feature tags updated to match the real service list (Wash & Fold, Dry Cleaning, Self-Service, Pickup & Delivery, Live Tracking).

## Remaining Work
None outstanding for this pass.

## Known Issues
None found.

## Next Recommended Task

Russell reviews `/portfolio` and `/portfolio/laundry-management-system` live, then decides on committing — this is stacked on top of the still-uncommitted LaundryFlow redesign work per `docs/working-on.md` (note: `working-on.md` says that redesign is "NOT yet committed" but `git log` shows it already landed as `8a66955` — `working-on.md` is stale on that point and should be corrected, not this checkpoint's scope to fix further than noted here).
