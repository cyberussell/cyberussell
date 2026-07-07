# Appointment System — Business Type Multi-select — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Business type field: single-select → multi-select

## Files Modified
- `appointment-system/migrations/006_multi_business_type.sql` (new)
- `src/lib/appointment-system/types.ts`
- `src/lib/appointment-system/terminology.ts`
- `src/app/appointments/signup/page.tsx`
- `src/app/appointments/actions.ts`
- 12 read-sites across `src/app/appointments/dashboard/*/page.tsx`, `src/app/appointments/[businessSlug]/page.tsx`, `src/lib/appointment-system/ai.ts`

## Summary of Changes
`businesses.business_type` (single text enum) replaced with `business_types` (text array), so a business can identify as more than one vertical (e.g. dental + spa). Migration backfills existing rows and adds an array-membership check constraint. `getTerms()` now takes the array and uses the first entry as the primary/canonical terminology source (avoids mixing "patient" and "client" wording in the same UI). Signup form changed from a single `<select>` to a checkbox group requiring at least one selection. All 12 call sites updated from `business.business_type` to `business.business_types`.

Verified live: typecheck clean, signup form renders checkboxes correctly, end-to-end signup with 3 types selected (medical, dental, spa) succeeded against the production Supabase project and reached the confirm-email screen (proves the array insert passed the new check constraint).

## Remaining Work
- Settings page does not yet let an existing business edit its `business_types` after signup — only set at signup time. Flagged to Russell as an optional follow-up, not yet approved/requested.

## Known Issues
None identified.

## Next Recommended Task
Feature #2 of the same batch: booking page — hide staff name for single-staff businesses (show only for 2+ staff), and tighten phone number validation to strict PH 11-digit mobile format (`09XXXXXXXXX`), both client-side (`BookingWidget.tsx`) and server-side (`api/book/route.ts`). Requires fetching staff count in `[businessSlug]/page.tsx` (not currently fetched there).
