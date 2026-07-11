# LMS Essential Plan Feature Completion — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Full "Essential" subscription plan feature set (phase 6)

## Files Modified
- `laundry-management-system/migrations/011_inventory_categories.sql` (new)
- `src/lib/laundry-management-system/modules/reports/queries.ts`
- `src/components/laundry-management-system/dashboard/RevenueBarChart.tsx`
- `src/app/laundry-management-system/dashboard/reports/page.tsx`
- `src/lib/laundry-management-system/modules/inventory/types.ts`
- `src/lib/laundry-management-system/modules/inventory/categories.ts` (new)
- `src/app/laundry-management-system/actions/inventory.ts`
- `src/components/laundry-management-system/dashboard/InventoryManager.tsx`
- `src/lib/laundry-management-system/modules/staff/queries.ts`
- `src/app/laundry-management-system/actions/staff.ts`
- `src/app/laundry-management-system/dashboard/staff/page.tsx`
- `src/app/laundry-management-system/dashboard/customers/page.tsx`
- `src/components/laundry-management-system/dashboard/CustomerSearchTable.tsx`
- `src/app/laundry-management-system/staff/dashboard/customers/page.tsx`
- `src/lib/laundry-management-system/modules/customer/queries.ts`
- `src/components/laundry-management-system/dashboard/CustomerDetailView.tsx` (new)
- `src/app/laundry-management-system/dashboard/customers/[customerId]/page.tsx` (new)
- `src/app/laundry-management-system/staff/dashboard/customers/[customerId]/page.tsx` (new)
- `src/lib/laundry-management-system/modules/orders/qr.ts` (new)
- `src/lib/laundry-management-system/modules/orders/queries.ts`
- `src/app/laundry-management-system/orders/lookup/[orderNumber]/page.tsx` (new)
- `src/components/laundry-management-system/dashboard/OrderDetailView.tsx`
- `src/app/laundry-management-system/orders/[orderId]/receipt/page.tsx`
- `src/components/laundry-management-system/dashboard/OrderLookupForm.tsx` (new)
- `src/app/laundry-management-system/dashboard/orders/page.tsx`
- `src/app/laundry-management-system/staff/dashboard/orders/page.tsx`

## Summary of Changes

Russell gave the full "Essential" plan feature list (Customer Database, Laundry Order Tracking, Owner Dashboard, Monthly Sales Dashboard, Inventory Tracking, Up to 3 Staff Accounts, Standard Support, Role Management, Customer Search, Receipt Printing, Daily/Weekly/Monthly Sales, Inventory Management with Consumables/Detergent/Fabric Conditioner/Packaging, QR Order Lookup, Fast Customer Search, Order Notes, Customer History) and asked for every item to be real, Supabase-backed, no mock data. An audit against phases 1–5 (already shipped) found most items already done; this phase closed the remaining gap:

- **Weekly & Monthly Sales views**: `getReportsData` now takes a `period: 'daily' | 'weekly' | 'monthly'` param (30-day/12-week/12-month windows, bucketed accordingly). Reports page got a 3-way tab control via `?period=`.
- **Inventory categories**: new `category` column (`detergent` / `fabric_conditioner` / `packaging` / `other`, migration 011). `InventoryManager` now groups items under category headings with a category picker on add/edit.
- **"Needs Restocking" tab** (follow-up request): `InventoryManager` got an All / Needs Restocking toggle above the category tables — the restock view reuses the existing `quantity <= low_stock_threshold` condition (computed client-side, same rule as the Reports page's low-stock card) to filter down to a grocery-list-style view of only what's running low, grouped by category the same way, with a count badge on the tab and its own empty state.
- **3-staff-account cap**: `inviteStaff()` now checks `countActiveStaff` before inviting and rejects at the limit; the Staff page shows "X of 3 used" and swaps the invite form for a limit-reached message once full.
- **Customer Search unified**: owner's customers page now uses the same `CustomerSearchTable` staff already had (previously owner had no search at all).
- **Customer History**: new customer detail pages (owner + staff) reusing the existing `listOrdersForCustomer` query, showing profile fields and full order history; customer rows now link there.
- **QR Order Lookup**: every order gets a QR code (`qrcode` package, already installed but unused) encoding a URL to a new shared `orders/lookup/[orderNumber]` route. That route resolves the order and redirects to the caller's own role-scoped detail page (re-applying that page's own access checks, so a staff member still can't reach an order that isn't assigned to them just by scanning it). QR renders on both the order detail page and the receipt. A manual "look up order #" input on both orders list pages hits the same route as a non-camera fallback.
- **Role Management**: treated as already satisfied by the existing owner/staff/customer permission system (`modules/auth/permissions.ts`) rather than building a granular custom-roles editor — flagged to Russell, not assumed silently.
- **Standard Support**: not a code feature, nothing to build.

**Two real bugs found and fixed during live verification, not just code review:**
1. **Reports revenue showed ₱0 despite real orders existing.** Root cause: the (pre-existing, not introduced this session) day-bucketing mixed local-timezone `Date` mutation (`setHours(0,0,0,0)`, `setDate`) with UTC `toISOString()` slicing. On a server running outside UTC — this product's actual market is the Philippines (Asia/Manila, UTC+8) — every bucket's calendar-day key came out one day off from real order timestamps, so orders never matched any bucket and revenue/order counts silently stayed zero while "Top services" (counted outside the bucket-match check) looked correct. Fixed by rewriting all bucket math to use UTC methods (`setUTCDate`, `getUTCDay`, `Date.UTC`) throughout, removing the server-timezone dependency entirely.
2. **Staff page 500'd entirely** ("Only async functions are allowed to be exported in a 'use server' file"): `STAFF_ACCOUNT_LIMIT` was first added as a plain `const` export in `actions/staff.ts`, which has a `'use server'` directive marking every export as a callable Server Action — a non-function export breaks the whole module for every importer (both the page and the client `StaffInviteForm`). Fixed by moving the constant to `modules/staff/queries.ts` (not a `'use server'` file) alongside `countActiveStaff`.

Also fixed in passing: the receipt page displayed `order.id.slice(0, 8)` as "Order #" instead of the real `ORD-000001`-style `order_number` added in phase 5 — corrected while adding the QR code to the same page.

## Remaining Work
None for the scoped feature list. Possible future polish: true in-app camera QR scanning (current design relies on the phone's native camera app opening the lookup URL, which needed no new scanning dependency); a UI to actually deactivate/reactivate staff (referenced by the at-limit message, not built this pass).

## Known Issues
- `InventoryManager`'s add/edit forms don't surface server-side validation errors to the user at all (silent no-op on failure) — pre-existing behavior, out of scope for this pass, flagged for a future pass. This is why the migration-011-not-yet-run state (below, now resolved) failed with no visible error message during the first verification pass.

## Migration status
`011_inventory_categories.sql` has been run by Russell against the live LMS Supabase project (confirmed 2026-07-11). Re-verified live with a second throwaway owner account: added a Detergent item and a Packaging item, both saved correctly and rendered under their own category heading, low-stock highlighting still works. Test account and its data fully deleted afterward via the Admin API (cascade-confirmed via REST — only the two pre-existing, unrelated businesses from other sessions remain).

**Needs Restocking tab verified live** with a third throwaway owner account: added one well-stocked item (qty 50, threshold 5) and one low-stock item (qty 2, threshold 10). "Needs Restocking (1)" badge showed the correct count; clicking it filtered the view down to only the low-stock item under its category heading, hiding the well-stocked one. Test account and data fully deleted afterward, cascade-confirmed via REST.

## Next Recommended Task
1. Consider surfacing action errors in `InventoryManager` (and similar forms) instead of silently no-op'ing on failure.
2. Optional: real in-app QR camera scanning instead of relying on the phone's native camera app, if Russell wants that instead.
