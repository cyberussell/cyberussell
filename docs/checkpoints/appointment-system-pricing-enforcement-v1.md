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

## Known Issues

- A staff member hitting an owner-only URL directly still gets redirected to the signup page rather than a clean "not authorized" screen — same accepted rough edge as the equivalent LMS gap, not fixed here either.
- No "resend invite" action exists for staff invites — only the initial send.
- The staff Appointments page is a simple upcoming list, not the owner's full week/month calendar grid — a deliberate scope reduction, not a bug.
- `deposit_amount`/`deposit_paid_at`/`deposit_paymongo_payment_id`/`reminder_sent_at` columns exist on `appointments` (migration 015) but nothing reads/writes them yet — pure scaffolding for the deferred Deposits/Reminders features.
- Actual email delivery for `sendNewBookingEmail` (Gmail SMTP) was not observable this pass — verified the code path fires without throwing and is correctly Basic+-gated, but no real inbox was checked (the throwaway owner account uses a fake domain).

## Milestone 8 — Testing (done, this pass)

Ran the full QA checklist as one structured live pass against the real Supabase project, using a single throwaway business upgraded/downgraded in place (Free → Basic → Pro → downgraded to Basic → re-upgraded to Pro) rather than three separate businesses:

- **Free tier**: usage meters (0/100 appointments, 0/1 staff) correct; staff limit blocks a 2nd staff member with a clear inline error (not silent); Reports shows the Free-tier dimmed sample-data preview with an upgrade banner (the revenue-chart CSS bug from Milestone 6 stays fixed); Conversations shows the Messenger sample-chat preview; Availability breaks/blocked-dates actually excluded a 12:00–1:00 PM window from the real public booking page's slot list; completed a full real customer booking end-to-end (QR + reference code).
- **Basic tier**: reporting unlocked and shows real (not sample) data; Messenger stays locked; 5-staff limit enforced with the same clear-error pattern; full staff invite → confirm → login → parallel staff dashboard flow verified (a staff account correctly saw only Today/Appointments/Patients/Conversations, no owner-only tabs, and could mark an appointment "completed" via the shared `requireBusinessAccess` action path).
- **Pro tier**: unlimited staff/appointments displayed correctly; Messenger conversations unlocked (real "connect your Facebook Page" state, no upgrade banner); no false upgrade prompts anywhere.
- **Billing/upgrade/downgrade**: simulated the PayMongo webhook directly (valid HMAC signature, test-mode keys, no real payment) for both a Pro→Basic downgrade and a Basic→Pro upgrade. Downgrade correctly recorded `settings.downgrade_notice` and the dashboard rendered the real, specific `DowngradeNotice` copy ("Staff are now capped at 5 …", "Messenger booking bot is no longer available") with a working Dismiss action; the reverse upgrade correctly left no stale notice behind.
- **Mobile (375px)**: dashboard nav collapses into a dropdown, the public booking page (the primary QR-scan surface) renders cleanly, and the 3-column plan comparison table on Billing stacks vertically instead of squeezing — zero console errors throughout.
- **One environment-only issue, not a product bug**: a fresh Turbopack dev-server instance briefly 404'd on nested dashboard routes after a concurrent session's dev server died uncleanly; resolved by clearing `.next` and restarting — confirmed not a real routing/build issue once isolated.
- **Zero new product bugs found this pass** — a meaningful signal given prior milestones each caught at least one live bug (RLS recursion, empty revenue chart, fake-zero-usage). Cleanup: all throwaway data (1 business, 6 staff rows, 2 clients/appointments, 2 auth users) deleted and cross-verified via direct queries afterward; the temporary local-only `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET` used to drive the webhook simulation was removed from `.env.local` afterward.

## Milestone 9 — Launch Readiness re-score

Phase 5 originally scored the product ~55/100 overall (with the subscription UX itself at 41/100). Re-scored now that Milestones 1–8 are closed:

| Dimension | Score | Why |
|---|---|---|
| Security | 95/100 | The Critical RLS gap (owners self-granting paid plans) is closed via column-level grants; tenant isolation and webhook signature verification were already solid from Phase 1. |
| Feature enforcement accuracy | 95/100 | Every declared `FeatureFlag`/limit is real, wired, and live-verified across all 3 tiers this pass — nothing decorative remains. |
| Subscription UX | ~80/100 | Up from 41: persistent usage meters, quiet 60–79% tier, real limit-hit errors instead of silent failures, onboarding plan summary, downgrade notice with concrete consequences. Docked for the two known rough edges below. |
| Marketing/documentation accuracy | 95/100 | Stale Pro bullet list and both "manual billing only" claims fixed; every "(soon)" tag in `PLAN_BULLETS` is honest about what's not shippable yet. |
| Testing coverage | 90/100 | Full live QA sweep across Free/Basic/Pro/upgrade/downgrade/mobile this pass, zero new bugs found. Docked slightly since actual email inbox delivery and a real (non-simulated) PayMongo hosted-checkout round-trip remain unexercised. |

**Overall: ~88/100**, up from ~55/100 (see below — both UX rough edges are now fixed, so this score is now conservative). The remaining gap to 100 is intentional, not defective: the deferred Milestone 5 features (Waitlist, Calendar Sync, Deposits, Reminders, Advanced Reporting, White Label, Recurring, Packages, Memberships) are honestly marked "(soon)" rather than built.

## Post-Milestone-9 fix: the two known UX rough edges (2026-07-14)

Both low-severity items flagged in the re-score are now fixed:

- **Staff-unauthorized redirect**: `requireBusiness()` ([auth.ts](src/lib/appointment-system/auth.ts)) previously redirected *any* non-owner straight to `/appointments/signup?step=business` — correct for a genuinely unprovisioned user, but misleading for a staff member who just landed on an owner-only URL (implies they need to create a business). It now checks whether the signed-in user is an active staff row before falling back to signup, and if so redirects to a new clean `/appointments/not-authorized` page with a link back to their real dashboard. Live-verified: logged in as staff, hit `/appointments/dashboard/staff` directly, got the new page, clicked through to the staff dashboard successfully.
- **Resend invite**: new `resendStaffInvite` action ([actions.ts](src/app/appointments/actions.ts)) and `StaffResendInviteForm` component, wired into the Staff page next to any staff row with `profile_id` set. Calls `inviteUserByEmail` again for the same address — safe to retry since Supabase itself rejects it once the invited user has actually confirmed (set a password), so no new schema/tracking column was needed to distinguish "invited" from "accepted." Live-verified both branches: resending to an already-accepted staff member surfaces a clear "already logged in" message (initially miscaught — the real Supabase error text is "already **been** registered", not "already registered"; fixed the string match and reverified); resending to a still-pending invite succeeds silently (matching the original invite form's own UX) and correctly logs a new `staff_invite_resent` event with a fresh `invited_at` timestamp.
- Both fixes live-verified with throwaway data (1 business + owner, 2 staff invites) against the real Supabase project, then fully deleted and cross-checked afterward. `npx tsc --noEmit` clean.

## Independent production-readiness audit (2026-07-14)

Russell asked for a full independent-auditor-style review — security, billing, subscription enforcement, UX, scalability, performance, maintainability, accessibility, testing coverage, operational readiness — explicitly disregarding the prior milestone work rather than re-summarizing it. Full report: [artifact](https://claude.ai/code/artifact/6d626231-e940-4ebc-83d8-98019d91f33f).

**Found one new Critical finding the prior 9 milestones never caught**: a cross-tenant IDOR in the booking path. `bookAppointment()` (`src/lib/appointment-system/slots.ts:262`) fetched the service by `id` alone with no check that it (or the paired `staffId`) belonged to the business being booked. The public `POST /appointments/api/book` route passes client-supplied UUIDs straight into this function on the admin client (no RLS backstop), and the database's double-booking exclusion constraint is scoped only by `staff_id`, not `business_id` — so an unauthenticated, scripted request naming one business's slug alongside another business's real service/staff ID could corrupt or block that other tenant's calendar. No account required to exploit it.

**Fixed the same day, at the shared chokepoint** (not per-caller): `bookAppointment()` now scopes both the service and staff lookup to `input.businessId`, closing the gap for every caller at once — the public web API, the Messenger flow, and the dashboard's manual-appointment action (the last already implicitly protected by RLS, so this is defense-in-depth there, not a behavior change).

**Live-verified against a real exploit attempt, not just code review**: seeded two throwaway businesses via the Supabase admin API, then POSTed a crafted cross-tenant payload (victim's slug + attacker's real serviceId/staffId) directly at the running dev server. Pre-fix this would have succeeded; post-fix it returned `{"error":"Service not found"}`. Confirmed a same-tenant booking still succeeds normally, and confirmed via direct query that no appointment row was ever created under the victim business referencing the attacker's staff_id. All throwaway data deleted afterward. `npx tsc --noEmit` clean.

**13 other findings surfaced, not yet fixed** (full detail with file:line evidence in the artifact): 4 High — zero automated test coverage anywhere in the product, no rate limiting on any public endpoint, no `error.tsx`/`loading.tsx` anywhere (0 of 27 routes), no error tracking/monitoring; 5 Medium — the public booking page (`[businessSlug]/page.tsx`, the highest-traffic customer path) is `force-dynamic` with no caching, zero `next/image` usage anywhere, inconsistent Zod validation coverage (2 of ~20 mutation entry points), sparse accessibility labeling, a single 679-line `actions.ts`; 2 Low — no CSP/HSTS header, no health-check endpoint.

**Verdict: moved from No-go to Conditional go** once the Critical finding closed — safe for a small, trusted early cohort; the 4 High findings should close before a broader launch.

## Post-audit hardening pass (2026-07-14) — every code-only High/Medium finding closed

Russell asked to fix everything code-only from the audit and leave anything needing a third-party account/service (Sentry, a dedicated rate-limit provider) or shared-file changes (a real CSP touches the site-wide root layout used by all 7 products) to him. All 8 items closed:

- **`error.tsx`/`loading.tsx`** at both the owner and staff dashboard layout levels — new shared `DashboardErrorFallback`/`DashboardSkeleton` components matching the dark/emerald theme (same pattern LMS already uses, ported not copied).
- **`next/image`** on the two real logo images (booking page, login page); the two QR codes (`BookingWidget.tsx`, Settings) were deliberately left as raw `<img>` — they're base64 data URIs from `QRCode.toDataURL()`, and `next/image` has no remote fetch to optimize there.
- **`/appointments/api/health`** — pings the Supabase project, not just process liveness.
- **DB-backed rate limiting** (new `rate_limits` table, migration `017_rate_limits.sql`, new `src/lib/appointment-system/rateLimit.ts`) wired into the public booking API, `signIn`, and `signUp`. Fails open by design — a missing table or DB hiccup never blocks a legitimate request.
- **Zod validation** added to the ~15 highest-value Server Actions (multi-field/user-typed input) that previously did manual `FormData` coercion — password reset, services, staff, staff invites, availability windows, blocked dates, manual appointments, reschedule, payments, business profile, change password, client notes, Facebook connection. Left as-is: no-input actions, single-ID toggle/delete actions (a schema adds little over the existing `.eq('business_id', ...)` scoping), and the two already well-validated actions (`updateAppointmentStatus`'s status allowlist, `updateBusinessHours`' per-field regex checks).
- **Accessibility**: swept all 35 files using `lucide-react` icons for unlabeled icon-only buttons. Found and fixed exactly 2 real gaps (`MonthCalendar`'s prev/next month arrows); everything else already had `aria-label`/`title` via shared components (`RescheduleForm`, `RecordPaymentForm`) or visible text — the audit's "sparse" estimate came from a shallow `grep -c aria-label` per-file count, which undercounts a working pattern where one shared component supplies the label once.
- **Split `actions.ts`** into `src/app/appointments/actions/{types,auth,services,staff,availability,appointments,conversations,settings,billing}.ts`, each with its own `'use server'` directive. The original `actions.ts` is now a thin barrel (`export * from './actions/...'`) so every existing import site across the whole product needed zero changes. Verified this re-export pattern actually works for Next's Server Action reference system, not just `tsc` — full `next build` succeeded (zero errors, every route compiled) and a live browser pass confirmed both `signIn` (auth.ts) and `createStaff` (staff.ts) still work end-to-end through the barrel.
- **Starter automated test suite** — new dependency, flagged: `vitest` + `dotenv` (dev deps), plus the real `server-only` npm package (was previously resolved only via Next's internal bundler shim, unresolvable by Vitest). 20 tests across 3 files: pure-function coverage for `entitlements.ts` and `slots.ts`'s wall-clock helpers, a signature-forgery test suite for `verifyPaymongoSignature`, and — the highest-value test — a live integration test that seeds two real throwaway businesses and asserts the cross-tenant IDOR fix holds, so this exact bug can never silently regress. All 20 pass; `npm test` runs them. `npx tsc --noEmit` and `npx next build` both clean after every change in this pass.

**Mid-pass git note**: a concurrent session committed (`60cf835`, "Appointment System: professional PayMongo checkout copy") while this pass was in progress, and its commit swept up the already-split `actions/*.ts` files from shared working-tree state under a message that doesn't describe them. Not a session action taken here — flagged for visibility, not corrected by rewriting shared history.

## Correction: the Critical IDOR fix was verified but never actually shipped (2026-07-14)

**Important honesty note.** The Critical cross-tenant IDOR fix documented above as "Fixed and re-verified" was real and the live exploit test against it was genuine — but the fix itself was only ever applied to this session's local working tree. It was never committed, so **production ran the vulnerable code from the time it was "fixed" until this correction landed.** This was caught while staging the error-tracking commit below: `git diff` on `slots.ts` showed the fix as still-uncommitted against `HEAD`, days (in session time) after it was reported as shipped.

**Fixed for real this time** (`462de15`): committed and pushed directly, then re-verified end-to-end a second time — a clean `git archive` export of the exact commit now on `origin/main`, a fresh `npm install` + `next build` (zero errors), a real dev server started from that export, and the same crafted cross-tenant exploit request fired at it. Result: `500 {"error":"Service not found"}`, matching the very first verification. Throwaway data cleaned up after.

**Root cause of the gap**: no process step in this session verified "fixed locally" against "shipped" until asked to do something unrelated (wire error tracking) that happened to touch the same file. Take the lesson forward: a finding isn't closed until `git log` confirms it's on the branch that deploys, not just until a local test passes.

## Error tracking for webhook and Server Action failure paths (2026-07-14)

Russell chose the no-new-account option: reuse the existing `events` table (already used for analytics) as a lightweight, queryable error log rather than sign up for Sentry. New `src/lib/appointment-system/errors.ts` — `logError(db, businessId, source, error)`, writes `{ type: 'error', payload: { source, message, stack } }`, never throws (built on the existing `logEvent`, which already swallows its own failures).

Wired into:
- **PayMongo webhook** — the entire post-signature-verification body is now wrapped in try/catch (previously an uncaught `JSON.parse` or a silently-ignored failed `businesses` update would return a bare 200 with no record anywhere). Now returns 500 and logs on failure — correct behavior for a payment webhook, since a 500 tells PayMongo to retry rather than silently dropping a paid upgrade.
- **Messenger webhook** — the per-entry tenant-routing block (business/secret lookup) and the `handleIncoming` call each independently try/catch and log now, instead of the routing block being fully unguarded and `handleIncoming`'s failures only going to `console.error` (ephemeral on Vercel).
- **`sendNewBookingEmail`** — its existing catch block now also logs, instead of only `console.error`.
- **`initiateBillingCheckout`** — its existing catch block now also logs before returning the generic user-facing error.

**Live-verified, not just typechecked**: a real Vitest smoke test called `logError` against the actual `events` table and confirmed both an `Error` object and a plain thrown string persist correctly with the right shape. A second test imported the actual PayMongo webhook route handler, sent it a genuinely HMAC-signed request with deliberately malformed JSON (a real "unexpected exception," not a handled validation error), and confirmed it returned 500 and left a matching row in `events` — instead of crashing uncaught. Both smoke-test files were deleted after (not part of the permanent suite); the 3 permanent test files remain at 20 passing tests. `npx tsc --noEmit` and `npx next build` clean.

## Caching the public booking page (2026-07-14) — last remaining Medium finding, closed

The audit's last open item: the public booking page (`[businessSlug]/page.tsx`, the page a QR-code scan lands on) was `force-dynamic`, hitting Supabase fresh on every view with no caching layer.

**Confirmed safe to cache first**: this page's server-rendered output only ever includes owner-driven data (business info, service list) — real-time slot availability is fetched client-side by `BookingWidget` via a separate API call, never baked into the HTML. Caching the shell can't show stale availability.

**A plain `export const revalidate` does nothing in this Next.js version** without the `cacheComponents` flag (not enabled here) — confirmed by reading the bundled docs at `node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`, per AGENTS.md's standing instruction that this Next version has different conventions than training data. Supabase's client makes its own `fetch()` calls that aren't Next-cacheable by default, so the route segment config alone had nothing to attach to — confirmed by testing it and observing `Cache-Control: no-store` on every request. The actual fix: wrapped the data fetch in `unstable_cache()` (60s, tagged `business-page:{slug}`), and switched mutations that should show up immediately (business profile, closed notice, business hours, services) to Next 16's `updateTag()` — the correct read-your-own-writes API for Server Actions, as opposed to `revalidateTag()` which is stale-while-revalidate and would have left up to one stale read after a save.

**Live-verified end-to-end, not just typechecked**: built for production and ran `next start` (ISR/ `unstable_cache` don't apply in `next dev`). Two consecutive requests to the same throwaway business's public page: ~2s cold, ~27ms cached — confirmed the caching is real. Then logged into the actual Settings page through the browser, renamed the business, and confirmed the public page reflected the new name on the very next request — not after the 60s window — confirming `updateTag` invalidation works through the real UI, not just in isolation. Throwaway data cleaned up after. `npx tsc --noEmit` and `npx next build` clean; pushed and re-verified with a third-party clean-room build against the exact commit on `origin/main`.

## Next Recommended Task

Every finding from the audit is now closed and actually deployed, except the two explicitly left to Russell: (1) a real error-tracking service (Sentry or similar) if the Supabase-`events`-table approach proves too limited (no alerting, no dashboards, just a queryable table) — needs an account/DSN key; (2) a real CSP header, which touches the shared root layout used by all 7 products (GA/AdSense/Facebook/TikTok pixels all load there) — Russell chose to hold this for a separate session scoped to that shared file rather than expand scope here. A more robust rate-limiting service (Upstash Redis, Vercel edge) remains optional if the DB-backed version isn't sufficient at scale. Separately, unrelated to the audit: build a deferred Milestone 5 feature (Deposits has the most schema already in place, migration 015), or a real non-simulated PayMongo checkout + actual inbox check for `sendNewBookingEmail`.
