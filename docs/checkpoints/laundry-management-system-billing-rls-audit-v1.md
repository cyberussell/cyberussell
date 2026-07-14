# LMS — Billing RLS Security Audit — v1

**Date:** 2026-07-14
**Product:** Laundry Management System (LMS)
**Feature:** Production-readiness security audit, mirroring the Appointment System's recent pricing-compliance audit, at Russell's request.

## Files Modified
- `laundry-management-system/migrations/015_protect_billing_columns.sql` (new)

## Summary of Changes
Audited the LMS server-actions layer end to end (`orders.ts`, `customer.ts`, `staff.ts`, `settings.ts`, `inventory.ts`, `drivers.ts`, `tenant.ts`, `auth.ts`) plus the core session/auth layer (`modules/auth/queries.ts`, `modules/auth/permissions.ts`) and the `001_init.sql` RLS policies.

**Confirmed clean**: unlike the Appointment System, LMS has no public/unauthenticated write path (no self-service customer booking) — every mutation is gated behind `requireOwnerBusiness()`/`requireBusinessSession()`/`requireCustomerAccess()`, and every query scopes with `.eq('business_id', business.id)`. No IDOR of the Appointment System's `bookAppointment()` shape exists here. Also checked whether `profiles.role` could be tampered with for privilege escalation (its RLS policy is also row-level-only) — confirmed it's never read as an authorization gate anywhere; real access is always via `businesses.owner_id` / `staff_members` / `customers` row existence, so it's a non-issue.

**Found the same bug class as the Appointment System's Milestone-1 finding, never fixed here**: `businesses`' RLS policy (`001_init.sql:105`, `"owner manages business" for all using (owner_id = auth.uid())`) is row-level only. Postgres RLS cannot restrict individual columns, so any authenticated owner could `PATCH` their own `businesses` row directly via the Supabase REST API and set `plan_tier: 'professional'` / `plan_status: 'active'`, unlocking Pickup/Delivery Management, Priority Queue, and higher staff limits for free. Confirmed via a full-codebase grep that the authenticated client only ever legitimately writes `name, phone, address, timezone, currency` (via `updateBusinessProfile`) and `logo_url` (via the logo upload) — `plan_tier`/`plan_status` are meant to be flipped manually by Russell after payment (per the column comment in `001_init.sql`), so restricting them breaks no real flow.

**Fix**: new migration `015_protect_billing_columns.sql`, same pattern as the Appointment System's `011_protect_billing_columns.sql` — revokes `UPDATE` on `businesses` from `authenticated`, then grants `UPDATE` back only on the columns the dashboard actually edits.

Two smaller gaps were also found and reported to Russell but explicitly deferred at his choice (not part of this pass): no rate limiting on `signIn`/`signUp`/`requestPasswordReset`/`customerSignUp`, and no error-tracking on failure paths (lower priority here since LMS has no webhook surface to protect, unlike Appointments' PayMongo/Messenger webhooks).

## Remaining Work
**Migration applied** — Russell ran `015_protect_billing_columns.sql` in the LMS Supabase SQL Editor. Not independently re-verified against the live DB this session (Supabase MCP servers had no auth token configured, so no programmatic access to confirm).

## Known Issues
- No rate limiting on LMS auth actions (deferred, Russell's choice this pass).
- No error-tracking/logging on failure paths (deferred, lower priority — no webhook surface).
- Live verification of the fix (attempting the actual REST PATCH exploit post-migration) hasn't been done yet.

## Next Recommended Task
Verify live: log in as a test owner, attempt a direct REST `PATCH` on `/rest/v1/businesses?id=eq.<id>` with `{"plan_tier":"professional"}` using the owner's session token — should now fail with a permissions error instead of silently succeeding. After that, revisit the two deferred hardening items (rate limiting, error tracking) if desired.
