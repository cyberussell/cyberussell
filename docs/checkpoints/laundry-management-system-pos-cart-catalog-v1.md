# LMS — Multi-item price catalog + POS-style order cart — v1

**Date:** 2026-07-16
**Product:** Laundry Management System (LMS)
**Feature:** Russell shared a reference POS screenshot (JFSL) — staff tapping garment tiles with +/- quantity steppers, a separate running-total panel — and asked for that literal interaction on the "New Walk-in Order" screen, not just a layout re-skin. Confirmed via two rounds of `AskUserQuestion`: this is a real new feature (owner-managed price catalog, multi-line orders), not the earlier session's layout-only pass. Planned via `EnterPlanMode`/`ExitPlanMode` — two `Explore` passes over the existing order/pricing schema plus a `Plan` agent pass produced a verified design before any code changed.

Confirmed product decisions: owner-only catalog editing (staff select items, can't change prices); available on every plan tier (not Professional-gated); catalog tiles reuse the existing `Avatar` initials-circle (no icon picker); same price everywhere (no per-branch pricing); soft delete (`active` flag); new top-level "Service Catalog" sidebar item. Explicitly deferred: 3 existing per-service breakdown reports (Top Services, Revenue by Service, Monthly Service Requests) will read as less meaningful for multi-item orders — known, accepted, not fixed this pass.

## Files Modified

**New migration** `laundry-management-system/migrations/018_service_catalog_and_order_items.sql` (**written, NOT applied — no live Supabase credentials in this environment, same standing limitation as every migration this session**): `service_catalog_items` (owner full CRUD, staff select-only) and `order_items` (RLS keyed through the parent order via `is_business_owner`/`is_business_staff` subqueries, since the table has no `business_id` of its own) — plus a trigger (`sync_order_totals_from_items`) that keeps `orders.amount`/`service_label` in sync off `order_items`, and a transactional RPC (`create_walk_in_order_with_items`) that inserts the order header + line items together, looking up price/name **server-side by `catalog_item_id`** rather than trusting any client-supplied value (closes a real bypass: the RPC is reachable directly via `supabase.rpc()` by any authenticated session, not only through the app's Server Action).

**New lib modules**: `modules/catalog/{types,queries}.ts`. `orders/types.ts` gained `OrderItem` + `OrderWithRelations.items` (empty array for pre-feature orders). `orders/queries.ts` — one-line change (`items:order_items(*)` appended to the shared select string) propagates `items` into every existing order query for free. `orders/schema.ts` — `createOrderSchema` traded `serviceLabel`/`amount` for `items` (a JSON-string field, since FormData can't nest arrays, parsed+validated via `.transform().pipe()`).

**New Server Actions** `src/app/lms/actions/catalog.ts` (owner-only CRUD, soft-delete). Reworked `createWalkInOrder` in `actions/orders.ts` to call the new RPC instead of a flat insert.

**New UI**: `ServiceCatalogManager.tsx` (owner-only, structural mirror of `InventoryManager.tsx`'s inline-edit pattern) + `dashboard/catalog/page.tsx` + a `manage_service_catalog` `Permission` (owner-only, same shape as `assign_order_staff`) + sidebar nav entry. New `ServiceItemTileGrid.tsx` — the actual POS tile grid (tap to add, +/- steppers), controlled by local state in `WalkInOrderForm.tsx` rather than react-hook-form (a tap grid doesn't map onto a single registered field).

**`WalkInOrderForm.tsx` rework**: removed "Service Type"/"Amount" fields entirely; cart lives as `useState<Record<string,number>>`, mirrored into a hidden RHF-registered `items` field via `useEffect`+`setValue` purely so zodResolver's own validation produces the "add at least one item" error through the normal `errors.items` path like every other field. Needed `useForm<Input, unknown, Output>`'s 3-generic form (not the usual 1-generic pattern used elsewhere in this codebase) because `items`' `.transform()` makes react-hook-form's input and output shapes genuinely different (`string` in, parsed array out) — documented inline since it's a real deviation from every other form in the product. Every other field (branch, customer link, staff, weight, expected completion, payment status, walk-in name/phone, pickup toggle, notes) — unchanged, same order. Order Summary panel's single "Service" row became a per-line cart list with a client-computed running total; both `orders/new/page.tsx` files (owner + staff) gained one more `listCatalogItems()` call.

**Display components — dual legacy/new handling**: `OrderDetailView.tsx` (line-items block replaces the single Service-Type field when `items.length > 0`, unchanged otherwise), `receipt/page.tsx` and `receipt-pdf.tsx`'s `ReceiptDocument` (same dual-mode swap). `CustomerDetailView.tsx` needed **no code change** — its `Service` column already just reads the trigger-maintained `service_label`.

## Summary of Changes

The key architectural move, verified against the actual schema before writing any code: `orders.amount`/`service_label` stay **database-trigger-maintained** off `order_items` rather than being dropped in favor of `SUM(order_items...)` everywhere, so the 7+ existing functions that already read those columns directly (`getDashboardStats`, `listOrders`, `getReportsData`, `getBranchPerformance`, `getCustomerPerformance`, `getEmployeeProductivity`) needed **zero query changes** — this is what kept a genuine new feature's blast radius to ~15 touched/new files instead of a much larger rewrite.

`npx tsc --noEmit`, `npx next build`, `npx vitest run` (52/52) all clean throughout every phase. **Live-verified in the browser** via temporary scratch routes with mock catalog data (removed before finishing, same pattern used throughout this session — no live LMS Supabase credentials in this environment): Service Catalog page (add/edit item, Active/Inactive filter pills), the POS tile grid (tapped multiple items, verified +/- steppers, verified the running total sums correctly across items — Jeans×2 + Dress×1 = ₱150, confirmed removing an item back to 0 correctly drops it from the cart and total), and mobile responsiveness (tile grid reflows to 2 columns, cart state survives the viewport resize). Zero console errors on every checked screen. **Could not verify**: the migration itself (RLS actually applying, the RPC's transactional/security behavior, the trigger's real-database behavior) — none of this can be checked without live Supabase credentials, which this environment has never had for LMS or TMS.

## Remaining Work

None planned as incomplete for what was scoped — all 21 tasks across both this feature and the earlier layout-redesign session are done. Explicitly out of scope by design: rewriting Top Services / Revenue by Service / Monthly Service Requests against `order_items` (flagged to Russell as a known follow-up, not started).

## Known Issues

- **Migration 018 is untested against a real database.** The plan's own sequencing calls this the highest-risk step and specifies exactly how to verify it (run `get_advisors`, then test with an actual JWT-scoped client — not the SQL editor/service role — that staff can't insert into `service_catalog_items`, that a `catalog_item_id` from a different business is rejected by the RPC, that `orders.amount` updates correctly post-insert, that `status_history` isn't double-written). None of this has been done. Migration `003b`'s own history on this exact codebase is a precedent for RLS silently not applying on the first attempt — don't skip this.
- Stray dead file `src/app/lms/staff/accept-invite/page 2.tsx` (flagged twice already this session) remains untouched.

## Next Recommended Task

Not committed or deployed. In order:
1. Russell runs migration `018_service_catalog_and_order_items.sql` in the LMS Supabase SQL Editor.
2. Runs the RLS/RPC verification checklist above (or asks a future session with real DB credentials to do it) — this is the one piece of this feature that's genuinely unverified, unlike everything else which was checked as thoroughly as this environment allows.
3. Live click-through: as owner, add a few real catalog items; as staff, take a real order tapping the tile grid; confirm the order shows correctly on the Dashboard, in Orders, on the receipt, and that revenue totals look right.
4. Commit + deploy at Russell's request.
5. Separately, decide whether to spend a future pass rewriting the 3 degraded per-service reports against `order_items`.
