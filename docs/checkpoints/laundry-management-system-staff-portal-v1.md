# LMS Staff Portal — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Role-based Staff Portal (dashboard/orders/customers/receipts) built on a new reusable permission system; owner keeps full access.

## Files Modified

**New DB migration:**
- `laundry-management-system/migrations/004_staff_reads_own_business.sql` — fixes a pre-existing gap in `001_init.sql` (see Known Issues).

**New permission system:**
- `src/lib/laundry-management-system/modules/auth/permissions.ts` — `Permission` union + `hasPermission(role, permission)`. Single source of truth for what staff can/cannot do.
- `src/lib/laundry-management-system/modules/auth/queries.ts` — added `requireBusinessSession()` (resolves owner or staff) and `requirePagePermission()` (page-level redirect guard).
- `src/app/laundry-management-system/actions/permission.ts` (new) — `requireActionPermission()`, the Server Action equivalent. Deliberately kept out of `actions/shared.ts` (see Known Issues — that file is imported directly by client components).

**New Staff Portal routes:**
- `staff/dashboard/layout.tsx` — sidebar shell using `requireStaffAccess()`.
- `staff/dashboard/page.tsx` — rewritten from a dark-theme stub to a real light-theme dashboard. Ops-only KPIs (Orders in Progress, Ready for Pickup, Completed Today, My Orders Today) — **no revenue figures are even queried**, not just hidden.
- `staff/dashboard/orders/page.tsx` + `orders/new/page.tsx` — order list (status filters + "Mine"/"All Staff" toggle using the new `created_by` field) and walk-in order form, reusing the owner's `WalkInOrderForm`/`OrderStatusControl`/`DataTable`.
- `staff/dashboard/customers/page.tsx` — view + client-side search (new `CustomerSearchTable` component), no add/edit.
- `orders/[orderId]/receipt/page.tsx` (new, shared) — printable receipt reachable by both owner and staff, gated by the `print_receipts` permission. New `PrintReceiptButton` client component.

**Modified for role-awareness:**
- `components/laundry-management-system/dashboard/DashboardSidebar.tsx` — now takes `role`/`basePath` props and filters nav items by `hasPermission()`. Same component now drives both the owner and staff sidebars.
- `dashboard/layout.tsx` — passes `role="owner"` explicitly (no behavior change).
- `actions/orders.ts` — `createWalkInOrder`/`updateOrderStatus` switched from owner-only to `requireActionPermission('create_orders' | 'update_order_status')`, so both roles hit the same gate. `createWalkInOrder` now stamps `created_by`.
- `modules/orders/queries.ts` — added `getStaffDashboardStats()` (no revenue), `getOrderById()`, and an optional `createdBy` filter on `listOrders()`.
- `dashboard/orders/page.tsx` (owner) — added the same receipt-link column as the staff orders page.

## Summary of Changes

Russell asked for a Staff Portal with an explicit allow-list (view dashboard, create orders, update order/laundry status, view/search customers, print receipts, view assigned orders) and an explicit deny-list (delete orders, manage subscription, manage staff, view financial reports, change business settings), built on reusable role-based permission middleware.

Built a single `Permission` enum + `hasPermission(role, permission)` as the one source of truth, with two entry points that both call it: `requirePagePermission()` for Server Component pages (redirects) and `requireActionPermission()` for Server Actions (returns an `ActionResult` error instead of crashing/redirecting, since actions render inline errors). The same `DashboardSidebar` component now drives both roles' nav, filtered by permission, rather than a separate staff sidebar — Inventory/Staff/Reports/Settings simply don't render for staff.

"Update Order Status" and "Update Laundry Status" were treated as the same capability (confirmed with Russell) since the schema only has one `orders.status` field.

## Known Issues

- **Real bug found and fixed during live verification: `businesses` never had a staff-read RLS policy.** Every other tenant table (`branches`, `staff_members`, `customers`) pairs an owner policy with a `staff reads ...` policy using `is_business_staff()`, but `businesses` — added all the way back in `001_init.sql`, before staff was ever a real login-able role — only got the owner policy. This silently broke `requireStaffAccess()`'s `staff_members → business:businesses(*)` join for every staff login (RLS nulled out the joined business row), which nothing caught before because no session had ever actually logged in as staff and hit that code path. Fixed with `004_staff_reads_own_business.sql`. **Russell ran this migration mid-session** and it's confirmed fixed (see Verification below).
- **Known caveat, not fixed (pre-existing, out of this task's scope):** owner-only pages (Settings/Staff/Reports/Inventory) are still gated only by `requireOwnerBusiness()`, which redirects any non-owner (including staff) to `/onboarding/business` rather than a clean "not authorized" page. This does correctly block staff from ever seeing real settings/report data — but if a staff member submitted that onboarding form, it would create a brand-new business owned by their own account (self-promotion to owner of an empty business). Flagged for Russell; not fixed since it's pre-existing behavior unrelated to what was asked.
- **Known caveat:** the DB-level RLS on `orders`/`inventory_items`/`customers` still grants staff `for all` (technically including delete), broader than what the app exposes. The app never renders a delete-order control for anyone, so there's no current exposure, but tightening the RLS itself would need a follow-up migration if wanted.
- Noticed (not investigated, not touched) an unrelated stray business row + branch named "Main Branch" under a different `business_id` (`b8b20953-...`) while looking up test data — predates this session, not created by this work, left alone.

## Verification

`npx tsc --noEmit` clean (ignoring pre-existing stale `.next` cache noise from a concurrently running dev server on this repo). Live-verified end-to-end with throwaway accounts (created and fully deleted afterward via the Admin API — zero residue):
- Owner: signup → onboarding → dashboard renders exactly as before (sidebar/theme/behavior unchanged).
- Staff (created directly via Admin API with `role: staff` + `business_id`/`branch_id` metadata, confirming the existing `handle_new_user()` trigger auto-provisions `staff_members` correctly): login → real dashboard with ops-only KPIs, no revenue → created a walk-in order (succeeded) → order appeared under "Mine" filter (confirms `created_by` stamping) → updated its status via the same `OrderStatusControl` → printed/viewed its receipt at the shared `orders/[id]/receipt` route → viewed Customers with the search box present.
- Confirmed staff hitting an owner-only route (`/dashboard/settings`) never renders real business data (redirected before render).
- First run surfaced two real bugs, both fixed during this session before the above passed: (1) `actions/shared.ts` accidentally importing server-only code broke client bundling for `onboarding/business/page.tsx` (fixed by moving `requireActionPermission` into a new `actions/permission.ts`); (2) the `businesses` RLS gap described above (fixed via migration 004, run by Russell).

## Next Recommended Task

Phase 3 fully closed out. Move to phase 4 (Customer Portal) — next up per Russell's direction.
