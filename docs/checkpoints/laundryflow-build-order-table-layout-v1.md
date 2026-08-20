# LaundryFlow Build Order — Table Layout — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio) — `/demo/laundryflow/order`
**Feature:** Build Your Order page layout restructure

## Files Modified
- src/components/demo/laundryflow/BuildOrder.tsx
- src/components/demo/laundryflow/OrderSummaryPanel.tsx

## Summary of Changes
Russell shared a reference screenshot of a generic e-commerce "Shopping Cart" page (table with Product/Price/Quantity/Subtotal columns, right-hand Order Summary card with a totals breakdown and checkout button) and asked to copy that *layout* — not its brand or colors — onto the existing "Build Your Order" page.

Restructured the catalog picker in `BuildOrder.tsx` from a per-category card grid into a single table (`<table>`, `overflow-x-auto` wrapper for mobile) with a `Service | Price | Quantity | Subtotal` header row (styled in the site's existing yellow `#FFC629`, not copied from the reference). Category groups are now table section rows instead of separate `<h2>` blocks. Each item row keeps the existing `− qty +` stepper and adds a remove (`×`) icon that appears once qty > 0, matching the reference's per-row remove affordance. Subtotal per row now shows `—` at qty 0 instead of being omitted.

`OrderSummaryPanel.tsx` was restyled to match the reference's summary card: default title changed to "Order Summary", added an "Items" row (sum of quantities) above "Sub Total", renamed the final line to "Total" (no separate Shipping/Tax rows added — LaundryFlow has no real shipping-fee or tax model, so those were intentionally left out rather than faked). The "Continue to Schedule Pickup" button moved from `BuildOrder.tsx` into the panel itself (`onContinue` prop, optional so `BookingFlow.tsx`'s existing usages without the button are unaffected), mirroring the reference's in-card "Proceed to Checkout" button placement.

Confirmed with Russell before implementing that the reference's coupon-code input should be **skipped** (no real discount system on this demo — he agreed a non-functional field would be worse than omitting it).

## Remaining Work
None — layout change is complete and self-contained to these two files.

## Known Issues
Could not live-verify the populated table against real catalog data locally: this repo's local dev has no `LMS_ZONE_URL` set (a pre-existing constraint noted in earlier LaundryFlow checkpoints), so `/lms/api/catalog` 404s locally regardless of this change. Attempted to work around it by monkey-patching `window.fetch` via the browser tool, but that tool executes in an isolated JS world separate from the page's own `window`, so the patch never intercepted the real request. Verified instead via: `npx tsc --noEmit` (clean), no new console errors (only the expected pre-existing 404), and careful code review — the table markup reuses the exact same `qtyById`/`grouped`/`lines` state and handlers as the previous card grid, just re-rendered as `<table>` rows, so no data-flow logic changed. Full live-data visual confirmation still needs either a deploy to Vercel preview/production, or `LMS_ZONE_URL` set locally (same fetch-verification gap this page has had since it was built).

## Next Recommended Task
Russell reviews the diff, then either (a) sets `LMS_ZONE_URL` locally for a real local check, or (b) has this deployed (not done here — no deploy requested) to verify the live table against the real Aling Maria catalog and confirm it reads correctly at mobile widths.
