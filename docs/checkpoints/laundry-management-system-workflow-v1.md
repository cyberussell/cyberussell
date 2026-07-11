# LMS Laundry Workflow — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Full 9-status laundry workflow with a real state machine, order assignment, and an automatic, trigger-maintained Timeline — replacing the simple 5-status order model from phase 2.

## Files Modified

**New DB migrations:**
- `laundry-management-system/migrations/008_laundry_workflow.sql` — new `order_number` (generated column), `assigned_staff_id`, `date_received`, `expected_completion_at`, `weight_kg`, `payment_status`, `status_history` (jsonb, trigger-maintained), new 9-value status check constraint (replacing the old 5), backfill of existing test rows to the closest new-status equivalent.
- `laundry-management-system/migrations/009_fix_rls_recursion.sql` — **critical fix**, see Known Issues.
- `laundry-management-system/migrations/010_business_reads_staff_profiles.sql` — see Known Issues.

**New state machine:**
- `modules/orders/stateMachine.ts` — `ALLOWED_TRANSITIONS` (Received → Sorting → Washing → Drying → Folding → Ready for Pickup → {Out for Delivery → Completed | Completed} , Cancelled reachable from any non-terminal step), `getNextStatuses()`, `isValidTransition()`, `isTerminalStatus()`. Enforced both in the UI (dropdown only offers valid next steps) and server-side (`updateOrderStatus` re-validates before writing).

**New permission:**
- `modules/auth/permissions.ts` — added `assign_order_staff` (owner-only; reassigning who's responsible for an order is a dispatch decision, not day-to-day order work staff were granted in phase 3).

**Updated actions** (`actions/orders.ts`):
- `createWalkInOrder` — new optional fields (assigned staff, weight, expected completion, payment status).
- `updateOrderStatus` — now fetches the order's current status first, validates the transition via the state machine, and enforces a **row-level** rule: staff can only act on orders assigned to them (`assertStaffOwnsOrder`), not just any business order.
- New `updateOrderDetails` (weight/payment/notes/ETA edits, same row-level staff rule) and `assignOrderStaff` (owner-only reassignment).

**New reusable components:**
- `components/laundry-management-system/dashboard/AssignedStaffSelect.tsx` — shared staff picker, used in both the walk-in order form and reassignment.
- `components/laundry-management-system/OrderTimeline.tsx` — **one** shared component rendering `status_history`, used by owner/staff order detail pages *and* the customer tracking page (the "everything should be reusable" requirement, applied to the Timeline specifically).
- `dashboard/OrderDetailsEditForm.tsx`, `dashboard/StaffAssignmentControl.tsx`, `dashboard/OrderDetailView.tsx` — the full per-order detail view (all 14 required fields), shared between the new owner and staff detail pages.

**New routes:**
- `dashboard/orders/[orderId]/page.tsx` (owner) and `staff/dashboard/orders/[orderId]/page.tsx` (staff) — both render the same `OrderDetailView`, owner gets `canReassignStaff`, staff doesn't. Staff's page 404s (not just redirects) if the order isn't assigned to them — checked directly, not just inherited from the list filter, so a guessed/pasted URL can't bypass it.

**Updated for the new schema:**
- `StatusBadge`/`OrderStatusControl` — 9-status color/label map; the control only offers valid next transitions.
- `orders/queries.ts` — `listOrders`/`getOrderById` now join `assigned_staff:staff_members(...)`; `getStaffDashboardStats` rescoped to the staff member's own assigned orders (not business-wide) for consistency with "staff only sees assigned orders"; `ACTIVE_ORDER_STATUSES` derived from the state machine's sequence.
- Owner/staff order list pages — new Order # and Assigned columns; staff's "Mine" filter now means **assigned to me** (`assigned_staff_id`), not "created by me" — confirmed with Russell, keeping the All/Mine toggle from phase 3 but changing its meaning and defaulting to Mine.
- Customer `StatusCard` — new 9-status icon/color set, now embeds the shared `OrderTimeline` instead of the old fixed 4-step indicator from phase 4 (deleted, superseded).
- `WalkInOrderForm` — added weight/expected completion/payment status/assigned staff fields.

## Scope decisions confirmed with Russell before/during building

- Real-time customer tracking updates: **not built** — the customer's tracking page reflects the true current state on every load/refresh (already true everywhere in this app), not a live Supabase Realtime subscription. Russell chose simplicity over the bigger lift.
- Staff order visibility: kept phase 3's All/Mine toggle rather than a hard filter, but **defaulted to Mine** and **changed its meaning** from "created by me" to "assigned to me."
- Row-level enforcement goes further than the toggle: staff cannot open, update the status of, or edit an order that isn't assigned to them, even via a direct URL — this wasn't just a list-page filter.

## Known Issues

- **Critical, pre-existing bug found live, not caused by this phase's new code directly but triggered by it: infinite RLS recursion ("stack depth limit exceeded") on `businesses`.** `is_business_owner()`/`is_business_staff()` (from `001_init.sql`, phase 1) were declared as plain `language sql` functions, never `security definer`. Simple single-statement SQL functions get **inlined** by the Postgres planner rather than treated as an opaque call boundary. Migration 007 (phase 4) added a policy on `businesses` calling `is_business_customer()` (which queries `customers`, whose own RLS calls `is_business_owner()`, which queries `businesses` again) — closing a cycle the planner tried to inline indefinitely. This broke **every** owner login, not just phase 5 features, the moment migration 007 was applied. Found by directly reproducing the RLS query against PostgREST with the real user's JWT after the owner dashboard mysteriously stopped resolving mid-verification. Fixed via `009_fix_rls_recursion.sql` — marking all three helper functions `security definer` (security-definer functions are never inlined, so they act as a real boundary). **This was latent since migration 001 and could have surfaced at any point** once enough cross-referencing policies existed; worth keeping in mind for any future cross-role RLS policy work.
- **Real bug found and fixed live: `profiles` never had a policy letting anyone but the profile's own owner read it.** Every join from `staff_members` to `profiles(full_name)` — the owner's Staff list, the new Assigned Staff order picker, the "Assigned" column on order tables — was silently getting `profile: null` back from RLS for anyone other than the staff member themself, falling back to placeholder text ("Staff member") instead of the real name. This is the 4th instance of the same "missing cross-role read policy" pattern found across phases 3–5 (`businesses` for staff in 004, `branches`/`businesses` for customers in 006/007, now `profiles` for owner+staff in 010). Fixed via `010_business_reads_staff_profiles.sql`. Also hardened the display logic itself (`o.assigned_staff_id ? name-or-fallback : 'Unassigned'`) so a resolution failure reads as "Staff assigned" rather than the misleading "Unassigned."
- **Not a bug, a design note:** `ready_at`/`completed_at` columns from phase 2 were kept alongside the new `status_history` (rather than removed) since existing dashboard stat queries (`getDashboardStats`/`getStaffDashboardStats`) already filter on them efficiently — `status_history` is the source of truth for the full Timeline, these two remain fast single-column filters for "completed today" style counts.

## Verification

`npx tsc --noEmit` clean throughout (ignoring pre-existing stale `.next` cache noise). Live-verified end-to-end with throwaway accounts (created and fully deleted afterward via the Admin API — zero residue, 3 orders / 1 customer / 1 staff member / 1 branch / 1 business / 3 auth users all confirmed removed):
- Order creation with the full field set (order number auto-generated as `ORD-000001`, assigned staff, weight, expected completion, payment status) — all confirmed persisted correctly via direct DB read.
- State machine: the status dropdown only ever offered valid next steps at each stage (Received → only Sorting/Cancelled; Sorting → only Washing/Cancelled, etc.); each transition correctly appended a new real-timestamped entry to `status_history` via the DB trigger.
- Row-level staff scoping: staff's order list defaulted to "Mine" (assigned) and correctly showed the assigned order; creating a second, unassigned order and attempting to open its detail page directly as staff (by pasting the URL) correctly 404'd; the "All Staff" toggle still showed it in the list (by design).
- Owner-only staff reassignment: the "Reassign Staff" card only appears on the owner's detail page, never staff's.
- Customer tracking: registered a real customer, linked a new order to them via the extended walk-in form's customer picker, advanced its status as owner, and confirmed the customer's mobile tracking page showed the order number, the correct new-status color/icon/pulsing animation, and the real embedded timeline with accurate timestamps for both transitions.
- Two real bugs found and fixed mid-verification (both described above under Known Issues): the RLS recursion (critical, blocked all owner logins) and the profiles read-policy gap (cosmetic but real, affected name display across 3 different surfaces).

## Next Recommended Task

Phase 5 fully closed out. All 5 phases of the LMS build are now complete: SaaS foundation → Owner Dashboard → Staff Portal → Customer Portal → Laundry Workflow. Possible future work: real-time tracking via Supabase Realtime if Russell wants it later (deliberately deferred this phase); a dedicated "Unassigned orders" view for the owner to triage; extending the receipt page to show weight/payment status/assigned staff now that they exist.
