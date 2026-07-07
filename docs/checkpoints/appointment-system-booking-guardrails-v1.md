# Appointment System — Booking Guardrails (same-day limit, reference codes, business hours gate, week-view expand) — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Multiple related booking-integrity and dashboard-usability fixes

## Files Modified
- `appointment-system/migrations/008_booking_reference.sql` (new)
- `src/lib/appointment-system/types.ts`
- `src/lib/appointment-system/slots.ts`
- `src/app/appointments/api/book/route.ts`
- `src/lib/appointment-system/flow.ts`
- `src/components/appointment-system/BookingWidget.tsx`
- `src/app/appointments/actions.ts`
- `src/app/appointments/dashboard/settings/page.tsx`
- `src/app/appointments/[businessSlug]/page.tsx`
- `src/app/appointments/dashboard/appointments/page.tsx`
- `package.json` / `package-lock.json` (added `qrcode`, `@types/qrcode`)

## Summary of Changes

**Same-day booking limit:** A customer can no longer book more than one active (pending/confirmed) appointment per calendar day with a business, on self-service channels (web + Messenger). Matched by phone (web) or Messenger PSID (bot). Staff using the manual booking form in the dashboard are unaffected — `hasSameDayBooking()` in `slots.ts` is only called from `api/book/route.ts` and `flow.ts`'s `finalizeBooking`, not from `createManualAppointment`.

**Reference code + QR:** Every appointment (including manual ones, for consistency) now gets an 8-character reference code (`appointments.reference_code`, unique, unambiguous alphabet). The web booking flow's "done" screen shows a QR code (generated server-side via the `qrcode` package, returned as a data-URL — no client bundle impact) plus the code as text and a "Manage this booking" link. Messenger's booking confirmation includes the code and manage-link as text.

**Business hours gate:** New Settings section lets a business set which days it's open and general hours (`businesses.settings.hours`, an array of 7 `{open,close}|null` entries, Sun-first). Until at least one day is set, the public booking page shows "Not accepting online bookings yet" instead of the booking widget, and both the web API (`GET`/`POST /api/book`) and the Messenger bot refuse to book with a friendly message. This does **not** constrain per-staff Availability — it's purely a gate/signal, per explicit decision during scoping.

**Week-view "+N more":** The dashboard Appointments tab's week-grid day cells now cap at 4 visible appointment cards; a "+N more" link appears beyond that, linking to `?w=<offset>&day=<date>`. When a `day` param is present, the "This week's appointments" list below (and the manual booking form stays in place above it) filters to just that day, with a "← Show full week" link to clear it.

**Bug fixes found during testing:**
- The same-day-guard's HTTP 409 collided with the pre-existing "slot taken concurrently" 409 handling in `BookingWidget.tsx`, silently resetting to the calendar instead of showing the guard's message — changed the guard to 403 and added a dedicated branch.
- Found (and fixed) a pre-existing bug where the "slot was just taken" error message never actually displayed, because the subsequent `pickService()` call's own `setError(null)` cleared it before render — reordered so the message is set after `pickService()` resolves.
- A JSX whitespace quirk was silently eating a space in the "hasn't set up its booking hours yet" message — fixed by using a single template literal instead of mixed JSX text/expression children.

Verified live end-to-end for all of the above against the "Bright Bright" test business: same-day guard blocks and shows the correct message; a real booking produced a working QR + reference code; business hours gate correctly blocks/unblocks the public page in both states; week view showed "+5 more" and correctly filtered/unfiltered the day list.

## Remaining Work
The broader "let customers self-cancel/reschedule via reference code" feature is still in progress — chunks 1-2 (same-day guard, reference code + QR) are done per above; chunks 4-5 (public `/appointments/manage/[code]` page with cancel/reschedule, and Messenger-side cancel/reschedule via PSID) are not yet built.

Feature #2 from the same request batch ("manual booking should have a time and check duplicates/overlaps") turned out to already be implemented — verified `ManualAppointmentForm.tsx` already has a `datetime-local` input and `createManualAppointment` already surfaces a friendly conflict error via the same `bookAppointment()` exclusion-constraint path. No code change was needed there.

## Known Issues
None outstanding from this pass.

## Next Recommended Task
Build the public "manage my booking" page (`/appointments/manage/[code]`) with cancel/reschedule actions, then wire up Messenger-side cancel/reschedule (replacing the current `case 'cancel': handoffToHuman(...)` with a direct self-service flow via the customer's PSID-linked client).
