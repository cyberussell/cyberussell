# LMS Customer Portal — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Mobile-first Customer Portal (register/login already existed from phase 1; this phase built the actual post-login experience) — large animated status cards, order history, profile editing, pickup schedule, in-app notifications.

## Files Modified

**New DB migrations:**
- `laundry-management-system/migrations/005_customer_updates_own_record.sql` — customer UPDATE policy on `customers` (only a SELECT policy existed).
- `laundry-management-system/migrations/006_customer_reads_branches.sql` — new `is_business_customer()` helper + customer SELECT policy on `branches` (for pickup schedule).
- `laundry-management-system/migrations/007_customer_reads_own_business.sql` — customer SELECT policy on `businesses` (see Known Issues — same bug class as phase 3's migration 004, now for the customer role).

**New reusable customer components** (`src/components/laundry-management-system/customer/`):
- `CustomerBottomNav.tsx` — 3-tab bottom nav (Home/Orders/Profile), replacing the sidebar pattern used for owner/staff since this is phone-first.
- `StatusCard.tsx` — large animated order card (framer-motion fade-in, pulsing icon for active orders), optional embedded timeline.
- `OrderStatusTimeline.tsx` — animated 4-step tracker (Placed → Washing → Ready → Picked Up).
- `BusinessSwitcher.tsx` — chip row, only renders when a customer belongs to more than one business.
- `NotificationsPanel.tsx` — slide-up sheet (framer-motion spring), fed by synthesized events, no new table.
- `PickupScheduleCard.tsx` — branch operating hours.
- `ProfileForm.tsx` — name/phone/email edit form.

**New library code:**
- `src/lib/laundry-management-system/modules/orders/notifications.ts` — `buildNotifications()`, pure function synthesizing an in-app notification feed from existing order timestamps (created/ready/completed) — no new table.
- `modules/orders/queries.ts` — added `listOrdersForCustomer()`, `getOrderById` reuse, exported `ACTIVE_ORDER_STATUSES`.
- `actions/customer.ts` — added `updateCustomerProfile`.

**New routes:**
- `customer/dashboard/layout.tsx` — auth check + bottom nav shell.
- `customer/dashboard/page.tsx` (rewritten from phase-1 stub) — Home: active orders as large status cards + timeline, notification bell, business switcher.
- `customer/dashboard/orders/page.tsx` (new) — full order history, All/Active/Completed/Cancelled filter chips.
- `customer/dashboard/profile/page.tsx` (new) — profile edit + pickup schedule.

**Modified for the order↔customer link (see Scope Decision below):**
- `actions/orders.ts` — `createWalkInOrder` now accepts an optional `customerId`, sets `orders.customer_id`.
- `components/laundry-management-system/dashboard/WalkInOrderForm.tsx` — added an optional "Link to existing customer" dropdown, only rendered when the business has registered customers.
- `dashboard/orders/new/page.tsx` (owner) + `staff/dashboard/orders/new/page.tsx` — both now fetch and pass the customer list to the form.

## Scope Decision (confirmed with Russell mid-session)

Discovered that no code path anywhere ever set `orders.customer_id` — phase 2's walk-in orders were deliberately "fully anonymous" (free-text name/phone only). That meant the Customer Portal's order-viewing features would always show an empty state in practice, even once everything else worked. Russell chose to extend the existing owner/staff `WalkInOrderForm` with an optional customer picker rather than ship the portal UI alone — this is the only realistic way an order ever reaches a real customer's account.

## Interpretations confirmed with Russell before building

- **"Receive Notifications"** → in-app notification feed synthesized from existing order timestamps, not real push/SMS/email (no such infra exists in LMS).
- **"View Pickup Schedule"** → the branch's operating hours (`branches.business_hours`), not a per-order scheduled appointment slot (LMS has no slot-booking system; that's the separate Appointment System product).
- **"Update Profile"** → edits the customer's own `customers` row (name/phone/email) for the business they're viewing.
- Multi-business customers get a simple chip-row switcher; invisible for the common single-business case.
- Theme: post-login dashboard uses the new mobile-first light theme (matching owner/staff); the existing customer signup form and shared `/login` were left as-is (established pattern in this codebase — auth gate stays dark, dashboards go light; `/login` is shared across all 3 roles so out of scope to restyle here).

## Known Issues

- **Real bug found and fixed during verification — third instance of the same RLS gap found in phase 3.** `requireCustomerAccess()`'s `customers → business:businesses(*)` join needs a customer-read policy on `businesses`, same as phase 3's staff bug (migration 004). `businesses` had owner + (post-004) staff policies but no customer one. Fixed via migration 007. **Also proactively found (not live-discovered) and fixed before shipping:** `customers` had no UPDATE policy for the customer role (005), and `branches` had no customer-read policy at all (006, needed for pickup schedule) — both anticipated from reading the schema before writing the Profile page, rather than discovered via a crash.
- **Real bug found and fixed during verification: SSR/client hydration mismatch from unlocalized date formatting.** `StatusCard.tsx`'s `toLocaleDateString()` and `NotificationsPanel.tsx`'s `toLocaleString()` had no explicit locale — the server (Node's default locale) rendered `7/11/2026` while the browser rendered `11/07/2026` (day/month order flipped), a classic Next.js hydration error. Fixed by pinning `'en-US'` explicitly in both call sites, matching the ISO-consistent convention already used elsewhere in the codebase's date formatting.
- **Not a bug, flagged for awareness:** immediately after `ProfileForm`'s Server Action resolves, one render frame briefly showed the pre-update value before the Next.js RSC revalidation caught up — the actual database write is correct (verified directly via REST API and via a fresh page reload). Cosmetic only, self-resolves, same behavior as the existing owner Settings forms.

## Verification

`npx tsc --noEmit` clean (ignoring pre-existing stale `.next` cache noise). Live-verified end-to-end with throwaway accounts (created and fully deleted afterward via the Admin API — zero residue):
- Registered a real customer through the actual public `[businessSlug]/signup` form (confirmed "Check your email" state renders correctly); confirmed the email via Admin API to continue (no inbox access in this sandbox) — confirmed the phase-1 `handle_new_user()` trigger auto-provisions the `customers` row correctly.
- As owner: created a walk-in order and linked it to the registered customer via the new picker — confirmed the Orders table showed "Maria Cruz" instead of "Walk-in customer," proving `customer_id` was set. Advanced its status to `ready`.
- As customer (mobile viewport, 375×812): Home showed the correct active-order count, the large `StatusCard` with a pulsing "Ready for Pickup" icon and a fully-progressed timeline (Placed/Washing/Ready checked, Picked Up pending); notification bell showed both synthesized events in the right order and animated in correctly; Orders history page's filter chips and card rendered correctly; Profile page showed real name/phone/email and the real branch pickup schedule; submitted a profile update and confirmed the new phone number persisted (verified via direct DB read and a fresh page reload).
- Re-checked at desktop width — layout stays centered and correctly proportioned (mobile-first, not mobile-only).
- Zero console errors after the two fixes above.

## Next Recommended Task

Phase 4 fully closed out. All 4 phases of the LMS build (SaaS foundation → Owner Dashboard → Staff Portal → Customer Portal) are now complete with real, live-verified role-based access across owner/staff/customer. Possible future work: staff/owner order tables could show a "customer" filter now that orders can be linked; the mobile-first Customer Portal pattern could be extended to a proper installable PWA if Russell wants; the existing known caveats from phases 3/4 (owner-only page redirect destination, DB-level RLS broader than app exposure) remain unaddressed unless prioritized.
