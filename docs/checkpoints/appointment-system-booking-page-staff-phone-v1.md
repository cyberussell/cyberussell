# Appointment System — Booking Page Staff Name & Phone Validation — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Public booking page: conditional staff name display + strict PH mobile phone validation

## Files Modified
- `src/app/appointments/[businessSlug]/page.tsx`
- `src/components/appointment-system/BookingWidget.tsx`
- `src/app/appointments/api/book/route.ts`

## Summary of Changes
`[businessSlug]/page.tsx` now fetches an active-staff count and passes `showStaffNames={(staffCount ?? 0) > 1}` to `BookingWidget`. The widget only renders the assigned staff member's name (on slot buttons, the booking summary, and the final confirmation) when the business has 2+ active staff — single-staff businesses just show the calendar/slots with no name, since it's obviously the one person.

Phone number validation tightened to strict PH mobile format (`09XXXXXXXXX`, 11 digits) on both sides: client-side via `pattern`, `inputMode`, `maxLength` on the input; server-side in `api/book/route.ts`'s zod schema via a transform (strips spaces/dashes) + regex refine, with the specific validation message now surfaced to the client (previously the route returned a generic "Invalid booking details" for every validation failure).

Verified live against the production Supabase project using the "Bright Bright" test business:
- With 1 active staff: no staff name shown on slots (confirmed before a 2nd staff member was added).
- After bumping the business to `plan_tier = 'pro'` (free tier caps at 1 provider) and adding a 2nd staff member: staff name ("Dr Vonne") now appears on every slot, the booking summary, and the final confirmation.
- Submitting an invalid phone (`12345`) was blocked by native HTML5 pattern validation.
- Submitting a valid phone (`09171234567`) completed the booking successfully end-to-end.

## Remaining Work
None for this feature's stated scope.

## Known Issues
- Unrelated pre-existing bug found during testing (not fixed, flagged to Russell, no decision made yet): `createStaff` and likely other plan-limit-gated actions (`actions.ts`) fail completely silently with no user-facing error when a plan limit (e.g. 1-provider cap on Free tier) is hit — the form just does nothing. Worth a follow-up fix.

## Next Recommended Task
Feature #3 of the same batch: add a month-grid calendar view to the dashboard's Appointments tab (`src/app/appointments/dashboard/appointments/page.tsx`), alongside the existing week-view grid + list.
