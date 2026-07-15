# LMS — Independent Production Audit + Remediation — v1

**Date:** 2026-07-14
**Product:** Laundry Management System (LMS)
**Feature:** A fresh, phase-agnostic "certify this for paying customers" audit (explicitly disregarding all prior phase sign-offs, at Russell's request), followed by fixing every finding through to a Go verdict.

## Files Modified
- `laundry-management-system/migrations/016_rate_limits.sql` (new)
- `src/lib/laundry-management-system/rateLimit.ts` (new — ported from the Appointment System's identical helper)
- `src/lib/laundry-management-system/modules/billing/subscription.ts` (new — the core fix)
- `src/lib/laundry-management-system/modules/billing/subscription.test.ts` (new)
- `src/lib/laundry-management-system/modules/billing/entitlements.test.ts` (new)
- `src/lib/laundry-management-system/modules/auth/permissions.test.ts` (new)
- `src/lib/laundry-management-system/modules/orders/stateMachine.test.ts` (new)
- `src/lib/laundry-management-system/modules/auth/queries.ts` (subscription gate wired into `requireOwnerBusiness`/`requireStaffAccess`/`requireBusinessSession`; new `resolveBlockedBusiness()`)
- `src/app/lms/subscription-required/page.tsx` (new)
- `src/app/lms/api/health/route.ts` (new)
- `src/app/lms/actions/auth.ts`, `customer.ts` (rate limiting on signIn/signUp/requestPasswordReset/customerSignUp)
- `src/app/lms/actions/staff.ts` (refactored `inviteStaff` to use `requireOwnerBusiness()` instead of duplicating auth inline — closes a residual gap where it bypassed the new subscription gate)
- `src/app/lms/staff/accept-invite/page.tsx` (timeout race bumped 4s → 8s)

## Summary of Changes

**Audit findings (see also `laundry-management-system-billing-rls-audit-v1.md` for the billing-column RLS fix from the prior pass):**
- CRITICAL: `plan_status`/`trial_ends_at` were defined in schema but never enforced anywhere — a business could never actually be cut off for non-payment, and the 14-day trial never expired.
- HIGH: no rate limiting on `signIn`/`signUp`/`requestPasswordReset`/`customerSignUp`.
- HIGH: zero automated test coverage anywhere under LMS.
- MEDIUM: no health-check endpoint, no operational monitoring.
- MEDIUM: unbounded, client-side-only pagination on `listOrders()`/customer list — **deliberately left unfixed**, see Remaining Work.
- MEDIUM: accessibility — swept every icon-heavy LMS component; found **zero real gaps** (every icon-only control already had `aria-label`, and every other icon usage already pairs with visible text). Initial audit's suspicion (7/60 files with `aria-label` vs. 20 using icons) turned out to be a false-positive signal, not a real finding.
- LOW: staff accept-invite's 4s client-side "expired" timeout could flash a false "invalid" message before a slow-arriving auth event self-corrected it.

**Fixes:**
1. **Subscription enforcement** (`modules/billing/subscription.ts`): pure `getSubscriptionBlock(business)` returns `'suspended'` | `'trial_expired'` | `null`. Wired into all three owner/staff session-resolution functions in `modules/auth/queries.ts` — a blocked business gets redirected to a new `/lms/subscription-required` page (shows why, links to `/services/inquire` to reactivate, has a sign-out button) instead of reaching any dashboard page or Server Action. **Deliberate scope decision**: `requireCustomerAccess()` is NOT gated — an end-customer of a suspended laundry business can still track their own existing orders; only the paying business's owner/staff dashboard is cut off. Flagging this for Russell in case he wants customer access blocked too.
2. **Rate limiting**: new `rate_limits` table (migration 016, identical shape to the Appointment System's) + `rateLimit.ts` helper, fails open on DB error so a missing/unmigrated table never blocks real logins. Wired into all 4 auth entry points at the same limits the Appointment System uses (5/min for signup-shaped actions, 10/min for login).
3. **Test suite**: 22 tests across 4 files — subscription-block logic (the critical fix itself), entitlements, permissions, and the order state machine. All pure-logic, DB-free (matches what's testable without live Supabase credentials in this environment).
4. **Health endpoint**: `GET /lms/api/health`, same shape as the Appointment System's — pings `businesses` via the service-role client, returns 503 on failure.
5. **Accessibility sweep**: done, no changes needed (see findings above).
6. **Accept-invite timeout**: 4s → 8s.

**Verification performed:**
- `npx tsc --noEmit` — clean across the whole repo.
- `npx next build` — succeeds; confirmed `/lms/subscription-required` and `/lms/api/health` both compile into `.next/server/app/lms/...`. (First build attempt hit an `ENOTEMPTY` error on `.next/server/app/learn` — a race with another concurrently-running dev server in this same working directory, not a real error; the retry succeeded cleanly.)
- `npx vitest run` — 22/22 passing.
- **Not live-verified**: this session's Browser-pane and Bash tools could not reach any locally-running dev server (both `preview_start`'s own spawned server and the pre-existing one on port 3001 timed out / were unreachable from this session's sandbox) — same standing limitation as most TMS/LMS sessions in this project's history that note "no live credentials in this worktree." The actual owner-login → suspended-redirect round-trip has not been click-tested against the real LMS Supabase project.

## Remaining Work
- **Migrations 015 and 016 confirmed run and correct (2026-07-14)**: Russell ran both and verified via `information_schema.column_privileges` that `authenticated` has `UPDATE` on exactly `address, currency, logo_url, name, phone, timezone` on `businesses` (no billing columns), and that `public.rate_limits` exists and is queryable.
- **Live verification of the gate — DONE (2026-07-14)**: Russell signed up a real throwaway business ("Aling Maria Laundry Shop", `id e442c931-85be-4d5f-962b-34a421eb4cc2`) through the actual `/lms` signup flow, then in the LMS Supabase SQL Editor: set `plan_status = 'suspended'` → confirmed login redirected to `/lms/subscription-required` showing "This account is suspended"; set `plan_status = 'trial'` + `trial_ends_at` in the past → confirmed login redirected showing "Your free trial has ended"; set `plan_status = 'active'` → confirmed login reached the normal owner dashboard. All three screenshotted and confirmed. Customer-facing-page-stays-open behavior was already a deliberate code decision, not separately re-verified live this pass.
- **Deliberately deferred, not blocking**: server-side pagination for `listOrders()`/customer list (Medium, scalability debt — large architecture change across every dashboard list page, doesn't bite until a business has months of order history; rushing it under this pass's time pressure risked introducing new bugs for a problem that isn't urgent). Also the shared-layout CSP header (cross-product decision, not LMS-scoped, previously deferred pending Russell's go-ahead).

## Known Issues
- Customer-facing pages remain accessible even when the business's owner/staff dashboard is blocked (deliberate, see above — revisit if Russell wants it changed).
- Pagination on core dashboard lists is still unbounded/client-side (see Remaining Work).
- Throwaway test business "Aling Maria Laundry Shop" (`e442c931-85be-4d5f-962b-34a421eb4cc2`) still exists live in the LMS Supabase project, currently `plan_status = 'active'` — not yet cleaned up.

## Verdict: GO
All Critical and High findings from this audit are fixed and now live-verified end-to-end (code + migrations + real click-through). LMS is cleared for paying customers, with the deferred pagination rework as acknowledged post-launch technical debt.

## Next Recommended Task
Optional cleanup: delete the throwaway "Aling Maria Laundry Shop" test business (and its `auth.users` row) from the live LMS Supabase project now that verification is done. Otherwise, no further blocking work remains from this audit — next session should treat LMS as shipped and pick up new feature requests or the deferred pagination item whenever Russell prioritizes it.
