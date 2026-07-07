# Appointment System UX Polish — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Manage-booking discoverability, auth-page branding, reference code visibility, Messenger staff selection

## Files Modified
- `src/app/appointments/[businessSlug]/page.tsx`
- `src/app/appointments/signup/page.tsx`
- `src/app/appointments/login/page.tsx`
- `src/components/appointment-system/AuthChrome.tsx` (new)
- `src/app/appointments/dashboard/appointments/page.tsx`
- `src/lib/appointment-system/flow.ts`
- `src/lib/appointment-system/types.ts`

## Summary of Changes
Four independent UX fixes requested by Russell from screenshots:

1. **Manage-booking link on the public booking page** — added "Already booked? Manage your booking" under the business header, linking to `/appointments/manage` (the existing code-entry fallback page). Verified live.
2. **Signup/login branding** — the auth pages had zero site branding (looked like a phishing/scam page per Russell's screenshot). Added a new shared `AuthHeader`/`AuthFooter` (`AuthChrome.tsx`) with a lightweight Cyberussell wordmark + "back to cyberussell.com" link in the header, and a copyright/attribution footer. Applied to both `signup/page.tsx` and `login/page.tsx` for consistency (Russell only flagged signup, but login uses the identical bare layout). Verified live, no console errors.
3. **Reference code on dashboard appointment cards** — the week-view list in `dashboard/appointments/page.tsx` didn't show `reference_code` (added in migration `008_booking_reference.sql`, already used elsewhere: booking confirmation, manage-booking page). Added it to the Supabase select and rendered as a `#XXXXXX` chip next to the status badge. Verified live: old pre-migration rows correctly show no chip (reference_code is null), a fresh test booking showed `#889295` correctly, and the chip persists correctly after cancelling.
4. **Messenger staff-name selection** — previously the bot silently auto-assigned whichever staff member's slot payload (`SLOT_{staffId}_{epochMs}`) happened to be in the quick-reply list, so the customer never explicitly picked/knew who they'd see. Reworked to mirror the web `BookingWidget`'s existing pattern: `showSlots` now dedupes by time (`TIME_{epochMs}` payload) instead of by (staff, time); a new `onTimeChosen` re-derives staff candidates for that exact time and either books directly if only one staff is free, or asks "Sino po ang gusto niyong provider?" via quick replies (`STAFF_{staffId}_{epochMs}`) when 2+ are free. Added `'choosing_staff'` to the `FlowStep` union in `types.ts`. Verified via `tsc --noEmit` (clean) and code review against the equivalent, already-verified web flow logic in `BookingWidget.tsx`; not verified against a live Messenger conversation (would require driving the actual Facebook Messenger webhook, out of scope for browser-based verification).

## Remaining Work
- None of the 4 items have follow-up polish pending.

## Known Issues
- Item 4 (Messenger staff selection) is verified by type-check + code parity with the already-tested web flow, not by an end-to-end live Messenger conversation. If Russell wants full confidence, it should be tested against the real "Cyberussell Test Clinic" Facebook Page the next time Messenger is exercised.
- Pre-existing, unrelated to this session: the silent-failure bug on plan-limit-gated server actions (see `docs/working-on.md` Notes) is still unfixed.

## Next Recommended Task
Resume Feature #5 (PayMongo) — still blocked on a public URL (Vercel deployment or ngrok tunnel) to register the webhook and obtain `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. Alternatively, if Russell wants to close the loop on this session's work, do a live Messenger test of the new staff-selection flow next time the Facebook test Page is available.
