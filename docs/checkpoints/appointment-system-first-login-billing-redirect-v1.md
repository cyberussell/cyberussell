# First-Login Billing Redirect — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** Route a business's first-ever login to the Billing tab when their signup originated from a landing-page pricing CTA

## Files Modified
- `appointment-system/migrations/010_first_login_billing_redirect.sql` (new)
- `src/lib/appointment-system/types.ts`
- `src/app/appointments/signup/page.tsx`
- `src/app/appointments/actions.ts`

## Summary of Changes
Landing page pricing cards already linked to `/appointments/signup?plan={tier}` for all three tiers (`page.tsx:429`), but the `plan` query param was completely ignored — signup always created a `plan_tier='free'` business with no memory of which plan the visitor actually clicked, and login always redirected to `/appointments/dashboard` unconditionally.

1. **Migration `010`**: added `selected_plan_tier` (nullable text) and `first_login_at` (nullable timestamptz) to `businesses`. `selected_plan_tier` is intent-only — it does not touch the real `plan_tier` column, which still only changes via actual PayMongo payment through the existing webhook.
2. **`signup/page.tsx`**: converted to read the `searchParams` page prop via React's `use()` (per this Next.js version's documented pattern for Client Component pages — no Suspense boundary needed), and added a hidden `plan` form field carrying the value through to the server action.
3. **`signUp()` action**: reads `plan` from `formData`, validates it's one of `free`/`basic`/`pro` (else `null`), stores it as `selected_plan_tier` on the new business row.
4. **`signIn()` action**: after successful auth, looks up the business's `first_login_at`/`selected_plan_tier`. If this is the first login ever (`first_login_at` was null), stamps it now, and if `selected_plan_tier` is set, redirects to `/appointments/dashboard/billing` instead of the default `/appointments/dashboard`. Every subsequent login goes to the normal dashboard regardless.
5. Russell confirmed (via clarifying question) this should apply to **all three plans including Free**, not just paid tiers — so any signup that originated from a pricing-CTA click gets routed to Billing on first login, even Free (where Billing just shows the current plan / upgrade options, no forced checkout).

Verified: `npx tsc --noEmit` clean, `npx next build` succeeds (`/appointments/signup` now correctly renders as `ƒ` dynamic). Confirmed live in preview via direct fetch of `/appointments/signup?plan=pro`, `?plan=free`, and no param — hidden `plan` input renders `"pro"`, `"free"`, and `""` respectively, confirming the query param correctly threads through to the form.

## Remaining Work
- **Migration `010` has not been applied to the live Appointment System Supabase project yet.** Until Russell runs it via SQL Editor (same manual process as prior migrations), the new columns don't exist — `signUp`/`signIn` will error on `selected_plan_tier`/`first_login_at` against production.
- No end-to-end test of the full signup→confirm-email→login→billing-redirect flow against the live DB yet (blocked on the migration above; didn't want to attempt against production before the columns exist).

## Known Issues
None identified in this pass.

## Next Recommended Task
Russell runs migration `010_first_login_billing_redirect.sql` in the Appointment System Supabase project's SQL Editor, then do one live end-to-end test: click "Choose Pro" on the landing page → sign up → confirm email → log in → confirm landing on `/appointments/dashboard/billing`. Also worth a quick second test with a direct `/appointments/signup` visit (no plan param) to confirm normal-dashboard behavior is unaffected.
