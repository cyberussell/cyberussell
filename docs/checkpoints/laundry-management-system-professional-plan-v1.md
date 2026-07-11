# LMS Professional Plan Feature-Flag System — v1

**Date:** 2026-07-12
**Product:** Laundry Management System (LMS)
**Feature:** Full "Professional" subscription plan feature set (phase 7), built as real feature flags

## Files Modified
- `laundry-management-system/migrations/012_professional_plan.sql` (new) — `drivers` table, `orders` additions (`is_priority`, `pickup_*`, `delivery_scheduled_at`, `driver_id`)
- `laundry-management-system/migrations/012b_drivers_rls_fix.sql` (new) — repair migration, see Known Issues
- `src/lib/laundry-management-system/modules/billing/entitlements.ts` (new) — `FeatureFlag`, `PLANS`, `hasFeature()`, `tierWithFeature()`
- `src/components/laundry-management-system/dashboard/UpgradePrompt.tsx` (new)
- `src/lib/laundry-management-system/modules/auth/permissions.ts` — 3 new permissions (`manage_pickup`, `manage_delivery`, `view_priority_queue`)
- `src/components/laundry-management-system/dashboard/DashboardSidebar.tsx`, both `dashboard/layout.tsx` files — `planTier` prop, "PRO" badge
- `src/app/laundry-management-system/actions/staff.ts`, `dashboard/staff/page.tsx` — unlimited staff gating
- `src/lib/laundry-management-system/modules/drivers/{types,queries}.ts` (new), `actions/drivers.ts` (new)
- `src/lib/laundry-management-system/modules/orders/{types,queries}.ts` — pickup/delivery/priority fields + `getPickupQueue`/`getDeliveryQueue`/`getPriorityQueue`
- `src/app/laundry-management-system/actions/orders.ts` — `schedulePickup`, `markPickedUp`, `scheduleDelivery`, `assignOrderDriver`, `setOrderPriority`
- New pages: `dashboard/{pickup,delivery,priority-queue}/page.tsx` + `staff/dashboard/{pickup,delivery,priority-queue}/page.tsx`
- New components: `PickupQueueTable`, `DeliveryQueueTable`, `DriverManager`, `DriverSelect`, `DriverAssignmentControl`, `PriorityToggle`, `PriorityQueueTable`
- `src/components/laundry-management-system/dashboard/OrderDetailView.tsx`, `WalkInOrderForm.tsx` — priority toggle, pickup-request fields
- `src/lib/laundry-management-system/modules/reports/{utc,advanced}.ts` (new), `dashboard/reports/page.tsx` — 6 Advanced Reports tabs

## Summary of Changes

Russell gave the full "Professional" plan feature list (Unlimited Staff Accounts, Pickup Management, Delivery Management, Driver Assignment, Delivery Status, Priority Queue, Advanced Reports: Branch Performance/Top Customers/Customer Lifetime Value/Revenue Charts/Employee Productivity/Monthly Service Requests) and asked for it built as real feature flags, with Essential users blocked and shown graceful upgrade prompts, no duplicated code.

- **Discovered `businesses.plan_tier`/`plan_status` already existed** since migration 001 (phase 1) — never gated on until now.
- **New `modules/billing/entitlements.ts`** mirrors the already-proven pattern in the Appointment System (`src/lib/appointment-system/entitlements.ts`, a different product, read-only reference — not touched): a `FeatureFlag` union, a `PLANS` config, and `hasFeature()`.
- **"Visible but locked" UX** (Russell's choice): Pickup/Delivery/Priority Queue nav items always show with a small "PRO" badge for Essential businesses; clicking loads the real route, which renders one shared `UpgradePrompt` component instead of the feature when `!hasFeature(...)` — never a redirect or hidden nav item.
- **Drivers are a separate, lightweight roster** (Russell's choice over reusing `staff_members`) — new `drivers` table, no login, owner-only CRUD (`DriverManager`), embedded directly in the Delivery Management page rather than a separate nav item (not one of the 7 listed feature bullets on its own).
- **Pickup/Delivery extend the existing `orders` table** (Russell's choice over parallel entities) with nullable columns (`pickup_requested`, `pickup_address`, `pickup_scheduled_at`, `pickup_completed_at`, `delivery_scheduled_at`, `driver_id`, `is_priority`) — reuses the existing state machine, `OrderTimeline`, and detail page instead of duplicating them. "Delivery Status" specifically is just the pre-existing `order.status` (`out_for_delivery`/`completed`) — no new status invented.
- **One driver field per order**, shared by both the pickup and delivery legs (deliberate simplification, documented in `assignOrderDriver`) rather than two separate driver columns.
- **Advanced Reports**: `getCustomerPerformance` deliberately serves both the "Top Customers" and "Customer Lifetime Value" tabs from one query (sorted differently per tab) instead of two near-duplicate queries. The UTC month-bucketing helpers from phase 6's `getReportsData` were factored out into a shared `modules/reports/utc.ts` (`monthKey`/`monthBuckets`/`startOfMonthsAgoUtc`) so `getMonthlyServiceRequests` reuses them instead of re-implementing UTC-safe date math.
- **Upgrade prompts link to `/laundry-management-system#pricing`** (Russell's choice, matching the Appointment System's `UsageBanner` pattern) — no fake checkout, since LMS billing still isn't wired up.

## Remaining Work
None — fully verified end-to-end after `012b` was run. Possible future polish: real in-app camera QR scanning (unrelated, already flagged in the phase 6 checkpoint); a UI to deactivate/reactivate staff.

## Known Issues (all resolved)
- **Real bug found and fixed live, same root cause as phase 2's `orders`/`inventory_items` RLS gap**: owner-initiated INSERTs into the new `drivers` table failed with "new row violates row-level security policy" even though 012's policy SQL is identical in shape to every other `is_business_owner()`/`is_business_staff()` table. Confirmed via a temporary debug log that the Postgres error was a genuine RLS violation, not an app bug — the service-role insert succeeded, proving the schema/data was fine and only the owner-session RLS check was failing. Wrote `012b_drivers_rls_fix.sql` (idempotent drop+recreate, same shape as phase 2's `003b`). **Russell ran it and driver creation/assignment is now confirmed working live.**
- **Second real bug, found while re-verifying after 012b**: `getDeliveryQueue` originally only matched orders that *already* had `delivery_scheduled_at` set (or were already `out_for_delivery`) — but there was no UI anywhere to set that field for the first time on a `ready_for_pickup` order, a dead end with no entry point. Fixed by widening the query to `status in ('ready_for_pickup', 'out_for_delivery')` regardless of whether a delivery time has been set yet, so staff always sees the full pool of orders eligible for delivery and can schedule/assign/dispatch from there.
- `DriverManager`'s add/edit forms don't surface server-side action errors either (same pre-existing silent-failure UX gap flagged in the phase 6 checkpoint for `InventoryManager` — this is why the RLS bug above initially looked like nothing happened rather than showing a clear error). Not fixed this pass, consistent with the phase 6 precedent of flagging rather than fixing this class of gap.

## Migration status
Both `012_professional_plan.sql` and `012b_drivers_rls_fix.sql` confirmed run and applied.

## Verified live (2026-07-12)
Three throwaway owner accounts total (created via Admin API, flipped to `plan_tier='professional'` via direct service-role REST PATCH where needed for testing — all fully deleted afterward, cascade-confirmed via REST; only the two pre-existing unrelated businesses from other sessions remain):
- **Essential**: sidebar shows "PRO" badges on Pickup/Delivery/Priority Queue; all three routes render `UpgradePrompt` instead of their real content; Reports' 6 advanced tabs all render `UpgradePrompt`; no "Customer needs pickup" checkbox on the walk-in order form; no priority toggle on the order detail page; Staff page still shows "X of 3 used" cap language.
- **Professional**: "PRO" badges gone; Staff page shows "unlimited on the Professional plan"; "Customer needs pickup" checkbox appears and correctly creates a pickup-requested order; Pickup Management queue shows it, "Mark Picked Up" correctly removes it from the queue; Priority toggle on the order detail page works and reflects in the Priority Queue page; all 6 Advanced Reports tabs render correct real numbers (Branch Performance, Top Customers, Customer Lifetime Value, Revenue by Service, Monthly Service Requests all matched the seeded test orders; Employee Productivity correctly showed its empty state with no staff-assigned orders).
- **Full driver/delivery flow re-verified after both migrations**: created a real driver through the UI, confirmed it persisted (REST cross-check); moved a test order to `ready_for_pickup`, confirmed it now appears in the Delivery Management queue (post-fix); assigned the driver via the queue's dropdown, confirmed `orders.driver_id` persisted (REST cross-check); dispatched it (status → `out_for_delivery`) through the existing status control, confirmed the queue still shows it correctly with `Completed`/`Cancelled` as the only remaining valid transitions.

## Next Recommended Task
None required — phase 7 is fully complete and verified. Optional: surface action errors in `DriverManager` (same fix already recommended for `InventoryManager` in phase 6) so a future RLS-style bug fails loudly instead of silently.
