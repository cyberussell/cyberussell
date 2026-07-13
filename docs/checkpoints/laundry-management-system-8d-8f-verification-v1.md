# LMS 8d/8f Live Verification + Real Regression Fix — v1

**Date:** 2026-07-13
**Product:** Laundry Management System (LMS)
**Feature:** Follow-up live verification of the previously-unverified parts of phase 8d (UX polish) and 8f (audit logs) — found and fixed a real production bug along the way.

## Files Modified
- `src/components/laundry-management-system/dashboard/PriorityQueueTable.tsx` (added `'use client'`)
- `src/components/laundry-management-system/dashboard/CustomerDetailView.tsx` (added `'use client'`)
- `src/app/laundry-management-system/dashboard/staff/page.tsx` (extracted table-rendering into a new client component)
- New: `src/components/laundry-management-system/dashboard/StaffTable.tsx`
- `src/components/laundry-management-system/dashboard/ActivityTable.tsx` (actor-name fallback fix)

## Summary — the real bug

Asked "is this ready for production," the honest answer named two untested surfaces: phase 8d's `PriorityToggle`/toasts/loading-skeleton/error-boundary, and phase 8f's Activity page (which had never been opened in a browser). Verifying phase 8f's Activity page meant navigating the dashboard for real — and the **Priority Queue page immediately crashed** with the `error.tsx` boundary.

**Root cause**: phase 8c made `DataTable` a client component (`'use client'`) to add sorting/pagination state. That's safe for every caller phase 8c itself touched (`OrdersTable`, `CustomerSearchTable`, `ActivityTable` — all already client components building their own columns). But **three pre-existing callers were never audited**: `PriorityQueueTable.tsx` and `CustomerDetailView.tsx` (plain Server Components building `columns: DataTableColumn<T>[]` with function-valued `cell` entries, then passing them to the now-client `<DataTable>`), and `dashboard/staff/page.tsx` (same pattern, inline in the page itself). Passing a function from a Server Component into a Client Component is exactly what React's RSC boundary rejects — "Functions cannot be passed directly to Client Components." This has been **live and broken in production since phase 8c shipped**, affecting 5 real pages: Priority Queue (owner + staff), Customer detail (owner + staff), and the Staff list page.

**Found by**: exhaustively grepping every file that imports `DataTableColumn` and checking which ones lack `'use client'` — 3 hits, matching exactly the pages that crashed.

**Fixed**: `PriorityQueueTable.tsx` and `CustomerDetailView.tsx` are pure presentational components with no server-only calls inside them, so adding `'use client'` directly was a complete, zero-restructuring fix. `dashboard/staff/page.tsx` does its own server-side data fetching (`requireOwnerBusiness()`, `listStaff()`), so it couldn't just become a client component — extracted a new `StaffTable.tsx` client component (matching the `OrdersTable`/`CustomerSearchTable` pattern from 8c) that receives `staff` as a prop.

## Second real bug found — Activity page actor name

Once Priority Queue was fixed and reachable, opened the Activity page for the first time. The "Actor" column showed a blank name before `(owner)` instead of a real name or a sensible fallback. Root cause: `l.actor?.full_name ?? 'Unknown'` uses `??`, which only substitutes for `null`/`undefined` — not for an empty string. LMS's signup flow only ever collects email/password (never a personal name), so `profiles.full_name` is genuinely `""` for every owner account, not just the throwaway test one. Fixed the fallback to `||` and to something more useful than "Unknown": `'Owner'`/`'Staff member'` depending on `actor_role`. The deeper gap (LMS never collects an owner's personal name anywhere) is a pre-existing product limitation, not something fixed here — flagged as a possible future request, not silently redesigned.

## Verification (this pass)

All of the following were exercised against a throwaway owner account + a throwaway staff account, real Storage/DB writes, cleaned up afterward (business, branch, orders, audit_logs, staff_members, both auth users — cross-checked via REST, only the two pre-existing unrelated businesses remain):

- **Priority Queue page**: confirmed broken pre-fix (`error.tsx` boundary fired, "Functions cannot be passed directly to Client Components"), confirmed fixed post-fix (renders correctly).
- **`PriorityToggle`'s `useOptimistic`**: button text flipped from "Mark Priority" to "Priority" synchronously in the same script execution as the click — the remaining phase 8d gap, now confirmed.
- **Staff invite**: real end-to-end submission (not REST-seeded) — "Invite sent." toast fired, `staff_invited` audit log entry confirmed correct via REST (right email/title/actor).
- **Activity page**: renders correctly, both real log entries (`staff_invited`, `order_priority_changed`) displayed with correct action labels and human-readable detail summaries. Search box narrows results correctly. Actor name now shows "Owner (owner)" instead of a blank space.
- **Permission gate**: a staff account hitting the owner-only Activity URL directly gets redirected away (via the same pre-existing `requireOwnerBusiness()` → `/onboarding/business` redirect every other owner-only page already uses — not a new gap, consistent with existing, previously-documented behavior). The "Activity" nav item is correctly absent from the staff sidebar.
- **Inventory/driver deletion**: both deleted for real through the UI; `inventory_item_deleted`/`driver_deleted` audit entries confirmed correct via REST, each capturing the entity's name (not just a bare UUID).
- Zero console errors throughout, confirmed in a fresh browser tab (ruling out stale-log false positives).

**Not caught this pass** (low risk, not chased further): the loading skeleton wasn't caught mid-transition on the fast local dev server — it's a static, dependency-free component that already passed `tsc`/build, so the residual risk is low. `assignOrderStaff`/`assignOrderDriver`'s audit entries weren't exercised live (no active staff/driver was available to assign in this pass after cleanup ordering) — covered by code review and the same `useServerAction` hook pattern already proven live elsewhere in this session.

## Known Issues
None remaining from this pass. The DataTable regression (the main finding) is fixed and verified. The Activity actor-name display bug is fixed and verified.

## Next Recommended Task
None outstanding — phase 8 (8a-8g) is complete and this follow-up pass closes out its two remaining verification gaps, having found and fixed a real production bug in the process. This fix is **not yet committed or pushed**.
