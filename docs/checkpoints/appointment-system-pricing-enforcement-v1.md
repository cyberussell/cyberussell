# Appointment System — Pricing Compliance & Enforcement — v1

**Date:** 2026-07-13
**Product:** Appointment System
**Feature:** Full pricing/subscription audit (Phases 1–5) followed by a 7-milestone implementation pass closing the gaps found

## Files Modified

**Migrations** (all confirmed run by Russell in the Appointment System's dedicated Supabase project, in order):
- `appointment-system/migrations/011_protect_billing_columns.sql` — revokes/re-grants column-level `UPDATE` on `businesses` so only the service-role client can touch billing columns
- `appointment-system/migrations/012_staff_login_accounts.sql` — `staff.profile_id`/`invite_email`/`invited_at`, `is_business_staff()`, staff RLS policies
- `appointment-system/migrations/013_breaks_blocked_dates.sql` — `availability_breaks`, `blocked_dates` tables + RLS
- `appointment-system/migrations/014_reporting_indexes.sql` — revenue/status indexes on `appointments`
- `appointment-system/migrations/015_deposits_and_reminders.sql` — deposit + reminder-tracking columns on `appointments` (schema only — no feature built on top yet)
- `appointment-system/migrations/016_fix_rls_recursion.sql` — marks `is_business_owner()`/`is_business_staff()` `security definer`, fixing an infinite-recursion bug introduced by 012 (found and fixed live, same root-cause class as an earlier LMS incident)

**Lib**
- `src/lib/appointment-system/auth.ts` — `requireBusiness()` unchanged in behavior but its overdue-suspend write now uses the admin client; new `requireStaffAccess()`, new `requireBusinessAccess()` (owner-or-staff, used by the 6 actions genuinely shared between both dashboards)
- `src/lib/appointment-system/entitlements.ts` — `FeatureFlag` rebuilt from scratch to only declare flags that are actually enforced (`messenger_booking_bot`, `email_notifications`, `basic_reporting`); `PLAN_BULLETS`/`PLANS` are now the single accurate source of truth for the final matrix; fixed a real bug where `canCreateAppointment`/`canAddProvider` returned a fake `used: 0` for unlimited plans
- `src/lib/appointment-system/slots.ts` — `getAvailableSlots()` now excludes breaks and blocked dates
- `src/lib/appointment-system/flow.ts` — wired `sendNewBookingEmail()` into the Messenger booking success path
- `src/lib/appointment-system/email.ts` — new; `sendNewBookingEmail()`, Basic+ gated internally, never throws
- `src/lib/appointment-system/types.ts` — `Staff.profile_id`/`invite_email`/`invited_at`, new `AvailabilityBreak`/`BlockedDate` types

**Actions** (`src/app/appointments/actions.ts`): `createStaff` now returns a real error on hitting the seat limit (was silently failing); new `inviteStaffLogin`, `addAvailabilityBreak`/`deleteAvailabilityBreak`, `addBlockedDate`/`deleteBlockedDate`, `dismissDowngradeNotice`; `updateAppointmentStatus`/`createManualAppointment`/`rescheduleAppointment`/`recordPayment`/`resumeBot`/`updateClientNotes` switched from `requireBusiness()` to `requireBusinessAccess()` so staff can actually call them

**API routes**: `api/book/route.ts` and `api/paymongo/webhook/route.ts` — booking-confirmation email hook; webhook now detects downgrades (comparing tiers via `PLAN_ORDER`) and records a one-time notice in `businesses.settings.downgrade_notice`

**New pages**: `dashboard/reports/page.tsx` (Basic+ real reporting, Free-tier preview mode with sample data), full staff dashboard under `src/app/appointments/staff/dashboard/{page,appointments,clients,clients/[clientId],conversations}.tsx` + `staff/dashboard/layout.tsx` + `staff/accept-invite/page.tsx`

**Modified pages**: `dashboard/{layout,page,staff,availability,settings,conversations,billing,appointments}/page.tsx`, `src/app/appointments/page.tsx` (landing)

**New components**: `StaffForm.tsx`, `StaffInviteForm.tsx`, `UsageMeter.tsx`, `MessengerPreview.tsx`, `DowngradeNotice.tsx`
**Modified components**: `NavTabs.tsx` (role + `entitledFeatures`-driven, replaces the old single `hasMessengerBot` boolean), `PlanComparisonTable.tsx`, `SetupChecklist.tsx` (new `planSummary` prop), `UsageBanner.tsx` (new 60–79% quiet tier)

## Summary of Changes

Russell asked for a full audit of whether the Appointment System's published pricing is actually enforced, run in strict phases:

- **Phase 1 (Architecture Audit)** found one Critical issue: `businesses`' RLS policy was row-level only, so any owner could `PATCH` their own `plan_tier`/`plan_status` directly via the REST API and grant themselves a paid plan for free. Everything else (tenant isolation, webhook signature verification, auth flow) was solid.
- **Phase 2 (Feature Verification)** found `hasFeature()` was only ever called for `messenger_booking_bot` — every other declared flag was decorative. Breaks & Blocked Dates was advertised but didn't exist. "Reports" didn't exist as a page.
- **Phase 3 (Product Validation)** produced a revised plan ladder (moving Customer Notes/No-show Tracking to Free where they already functionally lived, keeping Messenger Bot as Pro's real anchor, recommending Deposits/SMS Reminders/White Label as genuine future Pro differentiators).
- **Phase 4 (UX Review)** scored the existing subscription UX 41/100 — no dark patterns, but almost no limit-awareness before hitting a wall, and a silent failure on the staff seat limit.
- **Phase 5** consolidated all of the above into a 9-milestone implementation plan.

**Milestones 1–7 are now complete:**
1. **Security** — closed the RLS gap via column-level grants, moved the one legitimate owner-scoped write (lazy overdue-suspend) to the admin client.
2. **Database** — schema for staff accounts, breaks/blocked dates, reporting indexes, deposit/reminder scaffolding. Found and fixed a real RLS infinite-recursion bug introduced by this milestone's own staff policies.
3. **Subscription Framework** — fixed the silent staff-limit failure, rebuilt `entitlements.ts` to only declare real, enforced flags.
4. **Feature Gates** — nav lock icons (generalized to any `FeatureFlag`, not just the bot).
5. **Missing Features** — built Breaks & Blocked Dates (real slot-generation integration, verified via direct function invocation with real seeded data), Staff Login Accounts (full invite → accept → role-aware login → parallel staff dashboard), Email Notifications (owner gets emailed on new self-service bookings — scoped this way because customers never provide an email anywhere in the booking flow), Basic Reporting (real revenue/service breakdown with a genuine Free-tier preview mode). Explicitly stopped here per Russell's instruction — Waitlist, Calendar Sync, Deposits, SMS+Email Reminders, Advanced Reporting & Data Export, White Label, Recurring Appointments, Packages, and Memberships remain **not built**.
6. **UX Improvements** — Messenger preview (sample chat) replacing the old disabled-form pattern, persistent usage meters, `UsageBanner` extended to Appointments and given an early 60–79% quiet tier, header renewal date + upgrade link, onboarding plan summary, post-downgrade notice (with a real dismiss action, wired into the PayMongo webhook), over-limit-staff warning.
7. **Marketing & Content Sync** — fixed the landing page's stale hardcoded Pro bullet list (now reads from `PLAN_BULLETS.pro` directly instead of a second, drifting copy) and **two** stale "billing is manual, no online payment" claims — one on the Settings page (originally flagged in Phase 2) and one on the public landing page itself (found while verifying the first fix) — plus added usage numbers to the Billing page.

**Every feature built this pass was live-verified against the real Supabase project** with throwaway accounts created and fully deleted afterward — not just `tsc`/code review. This caught several real bugs before they'd have shipped: the RLS recursion bug (milestone 2), a CSS bug where the Reports revenue chart rendered completely empty (bar wrapper divs had no explicit height), and the `canCreateAppointment`/`canAddProvider` fake-zero-usage bug that broke the onboarding checklist specifically for Pro-tier accounts.

**One notable incident mid-session**: a concurrent session (working on the Laundry Management System side of this same repo) ran an interactive rebase and stashed all of this session's uncommitted work to get a clean tree. Work was paused immediately rather than touching the shared git state; once the other session's rebase finished on its own, the stash came back cleanly and was verified byte-for-byte intact before resuming.

## Remaining Work

- **Milestone 5, deferred features** (not built, by explicit instruction): Waitlist, Calendar Sync, Deposits, SMS + Email Reminders, Advanced Reporting & Data Export, White Label, Recurring Appointments, Packages, Memberships.
- **Milestone 8 — Testing**: the Phase 5 plan has a full QA checklist (Free/Basic/Pro/Upgrade/Downgrade/Booking/Messenger/Reports/Limits/Billing/Mobile/Desktop) that hasn't been run as a single structured pass — individual pieces have been live-verified as they were built, but not as one end-to-end regression sweep.
- **Milestone 9 — Launch Readiness re-score**: Phase 5 originally scored the product ~55/100 overall; this should be re-scored now that Milestones 1–7 are done.

## Known Issues

- A staff member hitting an owner-only URL directly still gets redirected to the signup page rather than a clean "not authorized" screen — same accepted rough edge as the equivalent LMS gap, not fixed here either.
- No "resend invite" action exists for staff invites — only the initial send.
- The staff Appointments page is a simple upcoming list, not the owner's full week/month calendar grid — a deliberate scope reduction, not a bug.
- `deposit_amount`/`deposit_paid_at`/`deposit_paymongo_payment_id`/`reminder_sent_at` columns exist on `appointments` (migration 015) but nothing reads/writes them yet — pure scaffolding for the deferred Deposits/Reminders features.

## Next Recommended Task

Milestone 8 (Testing) — run the full QA checklist from the Phase 5 plan as one structured pass across Free/Basic/Pro accounts, then Milestone 9 to re-score launch readiness now that Milestones 1–7 have closed most of the original gaps. A new session can pick this up directly from this checkpoint plus `docs/working-on.md` without needing the original 5-phase conversation.
