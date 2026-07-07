# Mobile Dashboard Nav, Week-View Fix, Messenger Staff Choice, Booking-Details Hierarchy — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Mobile dashboard tab dropdown, weekly calendar mobile layout fix, optional staff choice during Messenger booking, and a consistent visual/informational hierarchy for booking details across the dashboard, Messenger, and the manage-booking page

## Files Modified
- `src/components/appointment-system/NavTabs.tsx`
- `src/app/appointments/dashboard/appointments/page.tsx`
- `src/lib/appointment-system/flow.ts`
- `src/lib/appointment-system/types.ts`
- `src/app/appointments/manage/[code]/page.tsx`
- `src/components/appointment-system/ManageBookingView.tsx`

## Summary of Changes
- **Dashboard nav tabs → mobile dropdown.** `NavTabs.tsx` rendered 10 tabs (Today, Appointments, Services, Staff, Availability, Clients, Conversations, Billing, Settings, Help) as a horizontally-scrolling row, which on a phone screen only shows 3-4 tabs at a time with the rest cut off (confirmed via screenshot). Below `sm:`, this is now a native `<select>` dropdown showing the current section, with the same active-route detection and `clientsLabel` override as before; `sm:` and up keeps the original tab strip untouched.
- **Week-view calendar mobile overlap fix.** The 7-day grid in the Appointments tab used `grid grid-cols-7` with per-cell `min-w-[90px]` inside an `overflow-x-auto` container. On mobile Safari this produced visibly overlapping day columns (confirmed via screenshot — appointment cards from adjacent days rendering on top of each other), a known interaction issue between CSS grid intrinsic sizing and horizontal overflow scrolling. Replaced with a `flex` row of fixed-width (`w-[104px] shrink-0`) day cells that scrolls reliably, switching to `sm:grid sm:grid-cols-7` (no scroll needed) at `sm:` and up. Manual booking form, week list, and desktop layout are unaffected.
- **Optional staff choice in Messenger booking.** The web `BookingWidget` already asks "Who would you like to see?" when 2+ staff are free at the same time slot, but the Messenger bot (`flow.ts`) never did — it sent one quick-reply per (staff, time) combination with only the time as the button label, so a customer facing two staff free at the same time saw two visually-identical buttons with no way to distinguish them. Reworked `showSlots` to de-dupe by start time (`TIME_{epochMs}` payload); a new `onTimeChosen` re-checks which staff are actually free at the chosen time and, only if there are 2+, sends a follow-up quick-reply ("Sino po ang gusto ninyong puntahan?") with staff names (`STAFF_{staffId}_{epochMs}` payload) before falling through to the existing `onSlotChosen` booking logic. Single-staff businesses, or any slot where only one staff member is free, skip the extra step entirely — matching the "optional" behavior of the web widget. Added `choosing_staff` to `FlowStep` in `types.ts`. The old combined `SLOT_{staffId}_{epochMs}` payload was replaced outright (no back-compat handling kept — an in-flight Messenger conversation mid-pick during deploy is a negligible edge case).
- **Booking-details hierarchy, applied consistently.** Russell asked for a fixed reading order — date & time, name, contact number, service type, staff — with typography/color used to separate primary from secondary info. Applied in three places:
  - **Dashboard Appointments-tab cards**: restructured from two flat lines into stacked rows: date/time (`text-base font-semibold text-white` + status pill), name (`text-sm font-medium text-slate-200` + user icon), contact number (`text-sm text-slate-400` + phone icon — this was collected but never displayed before), service (`text-sm text-emerald-300/90` + tag icon, color-coded as the "what"), staff+source (`text-xs text-slate-500`, dimmest/smallest since it's usually auto-assigned).
  - **Messenger booking confirmation** (`finalizeBooking` in `flow.ts`): Messenger's plain-text Send API has no bold/color, so the same hierarchy is expressed through message order and emoji labels instead: 🗓️ date/time → 🙋 name → 📞 contact number → 💼 service → 🧑‍⚕️ staff → 📍 location. Staff name is now fetched (previously only service name was) so it can be included.
  - **`/appointments/manage/[code]` summary card**: query extended to fetch `clients(full_name, phone)`, passed down as new optional `clientName`/`clientPhone` props on `ManageBookingView`; the single-line "Booking" summary was restyled into the same tiered date/time → name → contact → service → staff layout as the dashboard card.

## Remaining Work
- None planned for this batch; all three items were the full scope requested.

## Known Issues
- Not yet verified in a real browser or a live Messenger thread — `npx tsc --noEmit` and `npx next build` both pass clean, but no manual click-through was done this session (pending Russell's review/approval before verifying live, consistent with "wait for approval before editing" — approval to build was given, live verification wasn't requested yet).
- Messenger quick-reply limit is 13 (Facebook platform limit, enforced in `sendQuickReplies`); a business offering many staff at one time slot, or a service with many distinct available times in a week, could still hit that cap — pre-existing constraint, not introduced or worsened by this change.

## Next Recommended Task
Have Russell verify all three changes live (dashboard on a real phone, and a real Messenger booking test with a multi-staff business like "Bright Bright") before merging. After that, resume Feature #5 (PayMongo webhook) once a public URL is available, per `docs/working-on.md`.
