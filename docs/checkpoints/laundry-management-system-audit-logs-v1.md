# LMS Audit Logs — v1 (Phase 8f)

**Date:** 2026-07-13
**Product:** Laundry Management System (LMS)
**Feature:** Audit log table + owner-only Activity History view (phase 8f of the production-readiness roadmap)

## Files Modified
- New: `laundry-management-system/migrations/014_audit_logs.sql` — **needs to be run in the LMS Supabase project's SQL Editor before any of this works.**
- New: `src/lib/laundry-management-system/modules/audit/{types,queries,labels}.ts`
- `src/lib/laundry-management-system/modules/auth/permissions.ts` (`view_activity_log`, owner-only by omission from `STAFF_PERMISSIONS`)
- `src/app/laundry-management-system/actions/{orders,inventory,drivers,staff,settings}.ts` (8 mutations instrumented)
- New: `src/components/laundry-management-system/dashboard/ActivityTable.tsx`
- New: `src/app/laundry-management-system/dashboard/activity/page.tsx`
- `src/components/laundry-management-system/dashboard/DashboardSidebar.tsx` (new "Activity" nav item)

## Summary of Changes

Phase 8e covered files & documents. This phase (8f) is the last roadmap item before performance (8g): an `audit_logs` table + logging helper wired into key mutations, plus an owner-only Activity History view.

- **Scoped to 8 "key mutations," not all ~28 action functions in LMS** — a deliberate judgment call, since logging every read-adjacent action would flood the log with low-value noise. Instrumented: `updateOrderStatus`, `assignOrderStaff`, `assignOrderDriver`, `setOrderPriority` (the day-to-day dispatch decisions an owner most wants staff accountability for), `deleteInventoryItem`, `deleteDriver` (destructive, hard to undo — fetch the entity's name before deleting so the log entry is legible, not just a bare UUID), `inviteStaff` (new staff added), and `updateBusinessProfile`/`updateBranchDetails` (settings changes).
- **`logActivity()` is best-effort by design**: checks the returned `{ error }` from the insert and `console.error`s it, but never throws or blocks the calling mutation — an audit-log write failure should never be the reason a real business action (like updating an order's status) fails.
- **`audit_logs.actor_id` references `profiles(id)`**, not `auth.users(id)` directly — matches the existing `staff_members.profile_id` convention and lets `listActivity()` embed the actor's name in one query (`select=*, actor:profiles(full_name)`) instead of a second round-trip.
- **RLS**: both owner and staff can insert (since staff perform most of the logged actions themselves), but only the owner can read — this is an accountability trail, not something staff review about themselves or each other.
- **New `view_activity_log` permission**, deliberately left out of `STAFF_PERMISSIONS` — owner-only by omission, same pattern already used by `manage_subscription`/`change_business_settings`. No new gating logic needed.
- **`ActivityTable`** reuses the phase 8c primitives (`DataTable`, `FilterPills`, `TableSearchInput`) directly — search over actor/action/details text, an entity-type filter (Orders/Inventory/Drivers/Staff/Business/Branches), sortable "When" column, all for the cost of composition rather than new UI code.
- **`describeDetails()`** turns each action's raw `details` jsonb into a short human-readable line (e.g. "received → sorting", `Deleted "Detergent"`, `Invited owner@example.com`) rather than showing raw JSON in the table.

## Remaining Work (explicitly deferred, not this pass)
- The other ~20 action functions (order creation, customer CRUD, pickup/delivery scheduling, auth) aren't logged — flagged as a natural place to extend `logActivity()` later if Russell wants a fuller trail, using the exact same pattern established here.
- Continue the roadmap: 8g (dynamic imports, bundle audit, image optimization) — the last item.

## Known Issues
None found. One unrelated fix needed along the way: `npm install` had never been re-run after an earlier merge pulled in the Territory Management System session's `idb`/`papaparse` dependencies into `package.json` — `node_modules` was out of sync, causing unrelated TMS `tsc` errors. Ran `npm install` to resync; confirmed the errors were TMS-only and disappeared afterward, with zero errors remaining in LMS files.

## Verification
`npx tsc --noEmit` clean. `npx next build` succeeds with zero errors — confirmed the new `/laundry-management-system/dashboard/activity` route builds and is correctly marked dynamic (`ƒ`).

**Live/functional verification not done this pass** — nothing in this feature can be exercised at all until the migration is run (the `audit_logs` table doesn't exist yet), and per the established pattern from phases 8d/8e, further production-database writes for testing purposes trigger the safety classifier's per-action confirmation requirement. Recommend: Russell runs the migration, then a live pass — change an order's status, assign staff/a driver, toggle priority, delete an inventory item and a driver, invite a staff member, edit the business profile — and confirm each shows up correctly on the new Activity page with the right actor name, action label, and detail line; confirm a staff account can't navigate to `/dashboard/activity` directly (permission-gated); confirm the search box and entity-type filter narrow results correctly.

## Next Recommended Task
Russell runs `014_audit_logs.sql`, then either live-verify this phase or move to the roadmap's final item, phase 8g (performance: dynamic imports, bundle audit, image optimization).
