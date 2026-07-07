# Appointment System — Manage-Booking Page, Business QR, Settings Compression, Plan Restructure — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Self-service cancel/reschedule, business booking-page QR, Settings layout, 3-tier plan restructure

## Files Modified
- `appointment-system/migrations/009_remove_ai_receptionist_tier.sql` (new)
- `src/lib/appointment-system/types.ts`
- `src/lib/appointment-system/entitlements.ts`
- `src/lib/appointment-system/flow.ts`
- `src/lib/appointment-system/ai.ts` (deleted)
- `src/app/appointments/dashboard/conversations/page.tsx`
- `src/components/appointment-system/BillingPlanCard.tsx`
- `src/app/appointments/page.tsx` (marketing landing page pricing section)
- `src/components/appointment-system/MonthCalendar.tsx` (new — extracted from BookingWidget)
- `src/components/appointment-system/BookingWidget.tsx`
- `src/components/appointment-system/ManageBookingView.tsx` (new)
- `src/app/appointments/manage/actions.ts` (new)
- `src/app/appointments/manage/[code]/page.tsx` (new)
- `src/app/appointments/manage/page.tsx` (new)
- `src/app/appointments/dashboard/settings/page.tsx`

## Summary of Changes

**Plan restructure (3 tiers, AI Receptionist fully removed):** Free/Basic/Pro only now. Free: 100 appts/mo (was 30), 1 staff. Basic: 150 appts/mo (was 100), 5 staff (was 1). Pro: unlimited appointments, unlimited staff (was 5). The AI free-text answering capability was removed entirely per explicit decision — deleted `ai.ts`, removed the `canUseAI`/AI-branch from `flow.ts`'s `handleText` (now always falls through to the button menu), removed the `ai_receptionist` `FeatureFlag` and its banner on the Conversations page. A new migration folds any business currently on `ai_receptionist` into `pro` and tightens the `plan_tier` CHECK constraint to `('free','basic','pro')`. The marketing landing page's pricing cards and comparison table were updated to match (3 columns, new numbers) — note: FAQ answers, meta descriptions, and the `AiDemo` component on that same landing page still reference the old AI Receptionist positioning and were intentionally **not** rewritten (flagged to Russell as a separate content decision, out of scope for this pass).

**Business's own booking-page QR (Settings):** Every business now sees a QR code (generated server-side via `qrcode`, no client bundle cost since Settings is a server component) pointing to their own public booking page, with a "Download QR code" link, shown in the Business Profile section.

**Settings page compression:** Switched from a single `max-w-2xl` stacked column to `lg:columns-2` (CSS multi-column, `break-inside-avoid` per section) so desktop uses the available width instead of one long scroll. Mobile is unaffected (columns only apply at `lg:`).

**Self-service "Manage my booking" (the last piece of last session's guardrails batch):**
- `MonthCalendar` extracted from `BookingWidget.tsx` into its own shared component (along with `dateKeyInTz`/`timeInTz`/`dateLabelInTz` helpers) so the reschedule flow could reuse the exact same calendar/time/staff-picker UX without duplicating it.
- `/appointments/manage/[code]` — public, unauthenticated (the reference code itself is the access credential, matching typical consumer booking systems) page showing the booking, with **Reschedule** (same calendar → time → staff-if-multiple flow as original booking, reusing the existing `GET /api/book` slots endpoint) and **Cancel** (with a confirm step) actions. Cancelled/completed bookings show a locked "can no longer be changed" state.
- `/appointments/manage` — plain code-entry fallback for anyone who lost the direct link, redirects to `/manage/[code]`.
- New `src/app/appointments/manage/actions.ts`: `cancelBookingByCode`, `rescheduleBookingByCode` — both look up strictly by `reference_code` via the admin/service-role client, not gated by `requireBusiness()` since there's no business-owner session on this page.

Verified live end-to-end against "Bright Bright": Settings shows correctly compressed 2-column desktop layout (confirmed no broken sections) and correct 1-column mobile; QR code renders and links to the right booking page; a fresh test booking's reference code was used to reschedule (calendar→time→staff→confirmed, persisted across reload) and then cancel (confirmed, persisted across reload, locked state shown correctly) via the manage page; billing page correctly shows only 3 tiers with the new limits.

## Remaining Work
- Messenger-side self-service cancel/reschedule (currently "Talk to staff" handoff is the only path from Messenger) was not built in this pass — the "cancel" AI-intent branch was removed along with the rest of the AI code, so Messenger cancellation now has no special handling at all beyond the general human handoff. Not explicitly requested this session; flag if wanted.
- Landing page marketing copy (FAQs, meta description, `AiDemo` component) still references the removed AI Receptionist positioning — flagged to Russell, not touched.

## Known Issues
None outstanding from this pass.

## Next Recommended Task
Decide on the landing page's leftover AI-receptionist marketing copy (rewrite/remove FAQs and the `AiDemo` section, or leave as historical content), and/or decide whether Messenger needs its own self-service cancel/reschedule flow via PSID recognition (currently only the web `/manage/[code]` page has it).
