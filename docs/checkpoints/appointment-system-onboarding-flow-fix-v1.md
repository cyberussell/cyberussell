# Onboarding Flow Fix — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** Resolve a conflict between two earlier features — first-login billing redirect vs. the setup checklist — so new businesses always see setup steps before being pushed toward payment

## Files Modified
- `src/app/appointments/actions.ts`
- `src/components/appointment-system/SetupChecklist.tsx`
- `src/app/appointments/dashboard/page.tsx`

## Summary of Changes
Earlier this session, two features were built independently: (1) first login redirects to `/appointments/dashboard/billing` if the signup came from a pricing-plan CTA, and (2) a setup checklist (office details, services, staff, schedule, business hours) on the Today dashboard. Russell caught the conflict: a paid-plan signup's first login went straight to Billing and would never see the checklist, meaning they'd be asked to pay before their store could even take a booking. Asked Russell directly (via AskUserQuestion) how these should interact — chose "setup first, then billing," explicitly: no one should be asked to pay before setup is possible, and billing stays reachable via the nav rather than forced.

1. **`signIn()` (`actions.ts`)**: removed the `if (business.selected_plan_tier) redirect('/appointments/dashboard/billing')` branch entirely. First login now always goes to `/appointments/dashboard` (Today), where the setup checklist lives. Still stamps `first_login_at` on first login (kept — harmless, useful analytics, no longer drives a redirect).
2. **`SetupChecklist.tsx`**: added an optional `pendingPlanName` prop. When set, renders a note inside the checklist card — "You picked the {plan} plan at signup — finish setup below, then visit Billing to activate it" — linking to `/appointments/dashboard/billing`. This replaces the hard redirect with a soft, in-context nudge instead, satisfying "billing... stays reachable" without blocking setup.
3. **`dashboard/page.tsx`**: computes `pendingPlanName` by comparing `business.selected_plan_tier` (captured at signup, from the earlier first-login-billing-redirect feature) against the business's actual current `plan_tier` — if they differ (i.e., the business picked a plan but hasn't completed payment for it yet), passes the plan's display name (via `PLANS[tier].name` from `entitlements.ts`) through to the checklist.

Verified: `npx tsc --noEmit` and `npx next build` both clean. Live-confirmed via the existing "Bright Bright" test session that the dashboard still renders correctly post-change and the checklist correctly stays hidden for a fully-configured business (no regression). **Not verified live:** the actual new-user path (incomplete checklist + pending-plan nudge visible together) — this requires a signup that completes real email confirmation, which isn't available in this session (same blocker noted in the forgot-password and confirm-email checkpoints). The nudge logic is a small, direct extension of the already-verified checklist rendering and reuses the same `PLANS` lookup already used elsewhere (`BillingPlanCard.tsx`, `UsageBanner.tsx`), so risk is low, but flagged for Russell to eyeball on a real signup.

## Remaining Work
- Russell to do one real signup-through-a-plan-CTA-link test end to end (confirm email for real) to see the checklist + pending-plan nudge together as an actual new user would.

## Known Issues
None identified in this pass.

## Next Recommended Task
Russell does the real end-to-end new-signup test above. Otherwise this closes out the onboarding-flow work from this session; the PayMongo webhook public-URL blocker (see `working-on.md`) remains the other standing open item.
