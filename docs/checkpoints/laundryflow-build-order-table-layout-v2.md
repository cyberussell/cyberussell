# LaundryFlow Build Order Table Layout — v2

**Date:** 2026-08-20
**Product:** Services (Portfolio) — `/demo/laundryflow/order`
**Feature:** Fix mobile responsiveness of the "Build Your Order" table (regression from v1's table restructure)

## Files Modified
- `src/components/demo/laundryflow/BuildOrder.tsx`
- `.env.local` (local-only, gitignored — added `LMS_ZONE_URL` for local verification, see below)

## Summary of Changes

User reported (with screenshots from production) that the `<table>` layout shipped in v1 was clipped on mobile: the table has `min-w-[640px]` inside an `overflow-x-auto` wrapper, so on a 375–390px phone viewport the Quantity and Subtotal columns render off-screen with no visible scroll affordance.

Fix: added a `md:hidden` stacked-card list that renders the same category groups and line items as vertical cards (name/promo badge + price on top, quantity stepper + line subtotal below) instead of table columns. The existing `<table>` markup is now wrapped in `hidden md:block` and otherwise untouched. Both layouts share the exact same `qtyById`/`grouped`/`lines` state and `setQty` handler — no data-flow logic changed, purely an additional responsive markup branch.

## Remaining Work

None known. This closes the mobile-clipping gap the v1 checkpoint didn't originally address (v1 predates the user's screenshots).

## Known Issues

- Local dev has no `LMS_ZONE_URL` by default (pre-existing gap noted in v1 and multiple prior LaundryFlow checkpoints — the `/lms/api/catalog` fetch 404s locally without it). Added `LMS_ZONE_URL=https://laundrymanagementsystem.vercel.app` to local `.env.local` (gitignored, not committed) to test against the real catalog before reporting done — following the same precedent used for `APPOINTMENTS_ZONE_URL` in an earlier session. Left in place for future local testing.
- Browser tool's `computer` click action timed out repeatedly in this session on both the new mobile cards and the pre-existing, unmodified desktop table's own `+` button — confirmed to be an environment/tool flakiness, not something this change broke (same handlers, unchanged on desktop). Layout correctness was fully confirmed visually via screenshots at 375px (mobile), 768px (`md` cutover), and 1280px (desktop) against the real live catalog data.

## Next Recommended Task

Russell reviews the diff and the live mobile page, then decides on committing.
