# Laundry Management System — Inventory Item Variants — v1

**Date:** 2026-07-17
**Product:** Laundry Management System (LMS)
**Feature:** Add real product/variant support to Inventory (e.g. "Soap" as one product with separately-tracked variants: Bar 100g, Liquid 1L, Lemon Scent).

## Files Modified
- `laundry-management-system/migrations/021_inventory_variants.sql` (new)
- `src/lib/laundry-management-system/modules/inventory/types.ts`
- `src/lib/laundry-management-system/modules/inventory/queries.ts`
- `src/lib/laundry-management-system/modules/inventory/categories.ts`
- `src/app/lms/actions/inventory.ts`
- `src/components/laundry-management-system/dashboard/InventoryManager.tsx`
- `src/app/lms/dashboard/reports/page.tsx`

## Summary of Changes

Russell asked for real variants in Inventory — a product like "Soap" needing multiple separately-tracked variations (Bar 100g, Liquid 1L, Lemon Scent, etc.), each with its own stock count, rather than being forced into one undifferentiated row. Followed this repo's AGENTS.md process: read `project-map.md`/`working-on.md`, ran an `Explore`-agent research pass over the existing flat `inventory_items` schema/UI/actions/reports usage, then used `EnterPlanMode`/`ExitPlanMode` for sign-off before editing. Two `AskUserQuestion` rounds resolved the two real architecture forks: a genuine parent/child structure (dedicated `inventory_item_variants` table) rather than a shared-name convention on flat rows, and low-stock alerts firing per variant rather than only at the whole-product level.

**Schema** (migration 021): new `inventory_item_variants` table (`inventory_item_id` FK cascade, `label`/`unit`/`quantity`/`low_stock_threshold`). RLS mirrors `order_items`' join-through-parent pattern (018) — no `business_id` column on the child table, both `is_business_owner`/`is_business_staff` get full CRUD via a join to `inventory_items`, matching `inventory_items`' own existing owner+staff-both-CRUD policy (003/003b) rather than the service catalog's deliberately narrower owner-only pricing. `inventory_items` itself is untouched: its own `unit`/`quantity`/`low_stock_threshold` only apply to a "simple" item with zero variants; the instant an item has 1+ variants, all stock tracking and low-stock evaluation moves to the variant rows (an app/UI-level rule, not DB-enforced) — no backfill needed since nothing existing has variants yet.

**Types/queries**: `inventory/types.ts` gained `InventoryItemVariant`/`InventoryItemWithVariants`. `inventory/queries.ts`'s `listInventory` now does an embedded select (`*, variants:inventory_item_variants(*)`) and sorts variants by label client-side. `getLowStockItems` was reworked to return a flat list of low-stock **entries** instead of raw items — one per low variant for a variant-tracked product (`displayName: "Soap — Bar 100g"`), or one for a simple item — this is what makes low-stock genuinely per-variant everywhere it's consumed. `inventory/categories.ts`'s `groupByCategory` was made generic (`<T extends InventoryItem>`) so grouped items keep their `variants` field.

**Actions**: `actions/inventory.ts` gained `createInventoryVariant`/`updateInventoryVariant`/`deleteInventoryVariant`, each re-verifying the parent item/variant belongs to the caller's business via a join before mutating — same `requireOwnerBusiness()` guard as every other action in the file (inventory management has no staff-facing route today, so no scope expansion there).

**UI**: `InventoryManager.tsx`'s single flat `DataTable` (one row per item) became a `Card` per product, since a two-level hierarchy doesn't fit `DataTable`'s flat-rows contract and `DataTable` is shared by ~10 other places not worth bending for this one case. Each card is a self-contained `InventoryItemCard` (its own item-level edit state, variant-level edit state, and an always-visible "Add variant" mini-form, independent of every other card). A product with zero variants still shows its own Unit/Quantity/Low-stock-at fields and red low-stock badge exactly as before; a product with 1+ variants hides those and shows a "3 variants · 1 low stock" summary chip plus a nested variants `DataTable` reusing the exact same inline edit-in-place + delete pattern the item-level table already had. The "Needs Restocking" filter now counts an item as needing restock if it's a simple item that's low, or a variant-tracked item with at least one low variant — this lets any existing simple item become variant-tracked at any time just by adding its first variant.

**Reports**: `reports/page.tsx`'s low-stock list render updated from `item.name`/`item.low_stock_threshold` to the new entry's `item.displayName`/`item.lowStockThreshold` — `reports/queries.ts` itself needed no change since it just passes the return value through.

`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. Live-verified via a temporary scratch route (mock data, no Supabase — removed before finishing): a simple item ("Trash Bags", 15 pcs, low at 10 — not low) rendered correctly and was correctly excluded from "Needs Restocking"; a variant-tracked "Soap" with Bar 100g (2/5, low) and Liquid 1L (20/5, fine) correctly showed "2 variants · 1 low stock", with only the Bar 100g row badged "Low stock"; clicking "Needs Restocking" correctly filtered the list down to just the Soap card.

## Remaining Work
- Migration 021 has not been run against the live LMS Supabase project yet.
- Not committed or deployed.

## Known Issues
- Not live-verified against the real Supabase project (RLS on the new `inventory_item_variants` table, the actual embedded-select query against real data) — only verified via a mock-data scratch route, same standing limitation noted across prior LMS sessions with no live credentials available in this environment.
- Pre-existing stray files noted across several prior sessions (`src/components/laundry-management-system/dashboard/DriverManager 2.tsx`, `src/app/lms/staff/accept-invite/page 2.tsx`) were left untouched — out of scope for this pass.

## Next Recommended Task
Russell: (1) applies migration 021 in the LMS Supabase SQL editor; (2) adds a real variant-tracked item (e.g. Soap with a couple of variants) on the live dashboard and confirms stock/low-stock behavior, including the Reports page's low-stock list correctly showing per-variant entries. Then commit + deploy at Russell's request.
