# Laundry Management System — Services vs. Add-ons Split — v1

**Date:** 2026-07-17
**Product:** Laundry Management System (LMS)
**Feature:** New Ironing / Wash & Dry and Fold Combo categories, POS tile grid split into Services vs. Add-ons sections, receipt line items split the same way in all 3 render surfaces.

## Files Modified
- `laundry-management-system/migrations/022_order_item_addon_flag_new_categories.sql` (new)
- `src/lib/laundry-management-system/modules/catalog/types.ts`
- `src/components/laundry-management-system/dashboard/CatalogItemIcon.tsx`
- `src/lib/laundry-management-system/modules/orders/types.ts`
- `src/lib/laundry-management-system/modules/orders/queries.ts`
- `src/components/laundry-management-system/dashboard/ServiceItemTileGrid.tsx`
- `src/components/laundry-management-system/dashboard/OrderDetailView.tsx`
- `src/app/lms/orders/[orderId]/receipt/page.tsx`
- `src/lib/laundry-management-system/receipt-pdf.tsx`

## Summary of Changes

Russell described the real staff order-taking flow: "New Order" should show the main services (Wash, Dry, Ironing, Folding, Wash & Dry Combo, Wash & Dry and Fold Combo), then staff separately add "other things" not part of the main services (soap, dry sheet, softener) — and the receipt should visually separate the two groups. Followed this repo's AGENTS.md process: read `project-map.md`/`working-on.md`, ran an `Explore`-agent pass over how `order_items` is currently rendered across `OrderDetailView`, the receipt page, and the receipt PDF (confirmed none of them use the `category` column that's existed since migration 020, and none group items at all), then used `EnterPlanMode`/`ExitPlanMode` for sign-off before editing. One `AskUserQuestion` resolved the "other things" label — Russell picked **Add-ons**, matching the category name already established in the earlier catalog work.

**Schema** (migration 022): widened `service_catalog_items.category`'s check constraint to add `iron` (Ironing) and `wash_dry_fold` (Wash & Dry and Fold Combo) — found and dropped the existing constraint dynamically via `pg_constraint`/`pg_attribute` rather than assuming Postgres's auto-generated name, since it was declared inline with no explicit name in migration 020. Added `order_items.is_addon boolean not null default false` as a **snapshot** taken at order-creation time — same reasoning as the table's existing `name`/`unit_price` snapshots: a catalog item's category could change (or the item could later be deactivated) after an order is placed, but a historical receipt must keep showing correct grouping regardless. A plain boolean rather than duplicating the whole category enum, since the receipt only ever needs the binary Services/Add-ons split. Re-defined `create_walk_in_order_with_items` (018, already re-defined once in 020 for promo pricing) to also select `sci.category` and snapshot `is_addon` at insert time.

**Types**: `catalog/types.ts`'s `CatalogCategory`/`CATEGORY_META`/`CATEGORY_ORDER` gained the two new categories with `Flame`/`Combine` default lucide icons (confirmed present in the installed version before committing to them). New `isAddonCategory()` helper — the one check every Services/Add-ons split keys off. Because `ServiceCatalogManager`'s category dropdowns/filter pills and `actions/catalog.ts`'s `CATEGORIES` constant both already derive from `CATEGORY_META`'s keys, the two new categories showed up automatically with no changes needed in either file. `CatalogItemIcon.tsx` registered the two new icons in its lookup map. `orders/types.ts`'s `OrderItem` gained `is_addon: boolean`; `orders/queries.ts` gained a `groupOrderItems()` helper (the `is_addon` split) shared by all three receipt render sites instead of tripling the same filter logic.

**UI**: `ServiceItemTileGrid.tsx` (the POS tap grid) now renders two labeled sections — "Services" and "Add-ons" — instead of one flat grid, splitting via `isAddonCategory()`; the Add-ons section is omitted entirely if a business has none. `WalkInOrderForm.tsx` needed no change, since it already passes the full catalog array through and the grouping lives inside the tile grid component. All three receipt surfaces got the same two-section treatment via `groupOrderItems()`: `OrderDetailView.tsx`'s single "Items" list became two `<ul>`s; the HTML receipt page's flat row list became two labeled groups; the `@react-pdf/renderer` PDF (`receipt-pdf.tsx`) got a new `sectionLabel` style and the same two-group split. All three keep their pre-existing legacy fallback (`order.items.length === 0` → the old single `service_label` field, for orders placed before migration 018) completely untouched.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (mock data, no Supabase — removed before finishing): the POS grid correctly rendered a "Services" section with all six named services (Ironing showing a flame icon, Wash & Dry & Fold showing a combine icon) separate from an "Add-ons" section (Soap, Dry Sheet); a mock order's line items correctly split into Services (Washing, Fold) and Add-ons (Soap) using the exact same `groupOrderItems()` function the real receipts call.

## Remaining Work
- Migration 022 has not been run against the live LMS Supabase project yet.
- Not committed or deployed.

## Known Issues
- Not live-verified against the real Supabase project (the dynamic constraint-drop DO block, the RPC's `is_addon` snapshotting against real data) — only verified via a mock-data scratch route and direct reasoning about the migration SQL, same standing limitation noted across prior LMS sessions with no live credentials available in this environment.
- Historical `order_items` rows created before this migration will have `is_addon = false` (the column default) even for what were actually add-on line items at the time — they'll render under "Services" on any pre-existing receipt. This is an acceptable, disclosed limitation (matches how this table's other snapshot columns already only reflect data from the time they were added) rather than a bug to fix.

## Next Recommended Task
Russell: (1) applies migration 022 in the LMS Supabase SQL editor; (2) adds real Ironing / Wash & Dry and Fold Combo items to a business's catalog; (3) takes a real order mixing services and add-ons and confirms the POS grid and both the printed HTML and PDF receipts show the two sections correctly. Then commit + deploy at Russell's request.
