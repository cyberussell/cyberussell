# Manage-Page Branding + Onboarding Checklist — v1

**Date:** 2026-07-08
**Product:** Appointment System
**Feature:** (1) Fix the unbranded `/appointments/manage` code-entry page, (2) add a dashboard setup checklist for new business owners

## Files Modified
- `src/app/appointments/manage/page.tsx`
- `src/app/appointments/[businessSlug]/page.tsx`
- `src/app/appointments/actions.ts`
- `src/app/appointments/dashboard/page.tsx`
- `src/components/appointment-system/SetupChecklist.tsx` (new)

## Summary of Changes

**1. Manage-page branding + back link.** Russell flagged `/appointments/manage` (the generic reference-code entry page) as having zero branding and no way back to where the customer came from — screenshot showed a bare dark card with no header/footer. Fixed:
- Added the existing shared `AuthHeader`/`AuthFooter` (same ones used on login/signup) for branding consistency.
- The "Already booked? Manage your booking" link on the public `[businessSlug]` page now passes `?from={slug}` (`[businessSlug]/page.tsx`).
- `manage/page.tsx` reads that param and, if present, shows a "← Back to booking page" link to `/appointments/{slug}` above the card. No `from` param (e.g. direct navigation) → link simply doesn't render, no broken state.
- Verified live via direct fetch: `?from=bright-bright` renders both the header/footer and the back link; no-param request renders the header/footer but correctly omits the back link. Screenshot confirmed visually.

**2. Dashboard setup checklist.** Russell noted new business owners land on an empty dashboard with no guidance on what to configure first (phone, location, staff, schedule, etc.) — the only existing hint was one buried line of text in the "no appointments today" empty state, which didn't even mention business hours despite hours being what actually gates whether the booking page accepts any bookings at all (`hasConfiguredHours()` in `slots.ts`).
- New `SetupChecklist.tsx` component: a card showing "N of 5 steps done," each step linking to where it's configured, with a check/circle icon. Auto-hides once all 5 steps are done, or if manually dismissed.
- 5 steps (confirmed with Russell — Facebook Page connection deliberately excluded, since Messenger is an optional channel, not required for the booking page to work): phone+address (Settings), ≥1 active service (Services), ≥1 active staff member (Staff), ≥1 availability row (Availability), business hours configured (Settings).
- `dashboard/page.tsx`: added 3 count queries (services/staff/availability, run in the existing `Promise.all` alongside the other dashboard stats — no extra round trip), computed the 5 step states, rendered `<SetupChecklist>` above the stat cards. Removed the now-redundant inline setup-links text from the "no appointments today" empty state.
- New `dismissSetupChecklist()` server action — stores `setup_checklist_hidden: true` in the existing `settings` jsonb column (no migration needed, same pattern as `updateClosedNotice`/`updateBusinessHours`).

Verified: `npx tsc --noEmit` clean across all changed files. Manage-page change screenshot-verified live. Setup checklist verified via type-check and code review only — could not screenshot it live since it's behind dashboard auth and this session has no test-account credentials; recommend Russell do one live check.

## Remaining Work
- Russell to manually verify the setup checklist renders/behaves correctly against a real (or fresh test) business account, ideally one that's mid-setup so partial-completion state is visible.

## Known Issues
None identified in this pass.

## Next Recommended Task
Russell reviews the setup checklist live on a test business; if the wording or step set needs adjusting, that's a quick follow-up. Otherwise, next logical item is still the PayMongo webhook public-URL blocker noted earlier in `working-on.md`.
