# Facebook Connection Plan Gate — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** Restrict the Settings page's Facebook Page connection form to plans that actually include Messenger booking

## Files Modified
- `src/app/appointments/dashboard/settings/page.tsx`
- `src/app/appointments/actions.ts`

## Summary of Changes
Russell flagged that the Facebook Page connection section in Settings was fully usable regardless of plan, even though `messenger_booking_bot` is a Pro-only `FeatureFlag` in `entitlements.ts` and the bot itself already silently refuses to run for non-Pro businesses (`flow.ts:55`). A Free/Basic business could fill in and "save" a Page ID + access token that would never actually do anything — confusing, not gated, and inconsistent with the Conversations tab, which already shows an upgrade banner via the same `hasFeature`/`tierWithFeature` helpers.

- **UI (`settings/page.tsx`)**: added `hasMessengerBot = hasFeature(business, 'messenger_booking_bot')`. When false: renders the same amber "available on the Pro plan... Compare plans" banner already used on `dashboard/conversations/page.tsx` (kept the wording/pattern identical for consistency), and both form fields plus the submit button get `disabled` with `opacity-50`/`disabled:opacity-60`/`disabled:cursor-not-allowed` styling. The shared `Field` helper gained an optional `disabled` prop (other callers unaffected — profile fields don't pass it).
- **Server action (`saveFbConnection` in `actions.ts`)**: added `if (!hasFeature(business, 'messenger_booking_bot')) return` as the first check, so a non-Pro business can't bypass the disabled UI by posting to the action directly (e.g. via devtools). Silent no-op, matching the action's existing `Promise<void>` return shape (no `ActionResult` error-surfacing wired to this form currently — out of scope to add here).

Verified: `npx tsc --noEmit` clean. Live-verified the **enabled** path only — this session had an active authenticated cookie for "Bright Bright" (Pro tier), confirmed via screenshot that the form renders fully enabled with no upgrade banner, matching expected Pro behavior. Did **not** verify the disabled path live, since doing so would require temporarily flipping a live business's `plan_tier` off Pro, which I chose not to do without Russell's go-ahead this session (a prior session did this deliberately for the plan-tier-adjustments feature and restored it afterward — same option is available here if Russell wants a live check). The disabled-path code exactly mirrors the already-verified `conversations/page.tsx` gating pattern (same flag, same helpers), so confidence is high, but it's not screenshot-confirmed.

## Remaining Work
- Optional: Russell (or a future session) can temporarily flip a test business to `free`/`basic` to screenshot-confirm the disabled/banner state, then restore it — same pattern used previously for Free-tier dashboard verification.

## Known Issues
None identified in this pass.

## Next Recommended Task
Spot-check the disabled state live if desired. Otherwise, the PayMongo webhook public-URL blocker (see `working-on.md`) remains the other open item.
