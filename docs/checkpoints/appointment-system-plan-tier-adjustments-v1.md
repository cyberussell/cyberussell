# Plan Tier Adjustments — v1

**Date:** 2026-07-07
**Product:** Appointment System
**Feature:** Basic tier gets unlimited appointments, data export becomes Pro-exclusive, "Recommended" badge on Pro, and a visible monthly-quota counter for Free-tier businesses

## Files Modified
- `src/lib/appointment-system/entitlements.ts`
- `src/components/appointment-system/BillingPlanCard.tsx`
- `src/app/appointments/dashboard/page.tsx`
- `src/app/appointments/page.tsx` (landing page)
- `src/app/appointments/dashboard/appointments/page.tsx`
- `src/components/appointment-system/RescheduleForm.tsx`
- `src/components/appointment-system/RecordPaymentForm.tsx`

## Summary of Changes
1. **Basic tier appointments now unlimited.** `entitlements.ts` — `basic.monthlyAppointments` changed from `150` to `null`. Staff limit (5) is unchanged; that's still the Basic/Pro differentiator. This is the single source of truth (per the file's own header comment) — everywhere else (dashboard quota checks, `UsageBanner`, billing cards, landing page bullets/comparison table) derives from this config, so no other logic changes were needed.
2. **Data export moved from Basic+Pro to Pro-only.** Removed `'data_export'` from `basic.features` in `entitlements.ts`; it remains in `pro.features`. The feature itself was never actually built (it's a flag with no gated functionality anywhere in the codebase, and landing copy already called it "(soon)") — this is purely an entitlement/copy change, not new functionality.
3. **"Recommended" badge on Pro in the Billing dashboard.** `BillingPlanCard.tsx` now renders an emerald "Recommended" pill above the card when `plan.tier === 'pro'`, mirroring the landing page's existing "MOST POPULAR" pill (which was left as-is — different copy, different page, not what was asked).
4. **Monthly appointment quota surfaced on the dashboard.** The "Today" overview (`dashboard/page.tsx`) already computed `quota` via `canCreateAppointment` (used only for the `UsageBanner` nudge, which only appears at 80%+ usage) but never showed the running total. Added a "This month" stat card — `{limit - used} of {limit} appointments left · resets monthly` — that only renders when `quota.limit !== null` (i.e., Free-tier businesses; Basic and Pro are both unlimited now, so it's absent for them). The "resets monthly" behavior needed no new code: `getMonthlyAppointmentUsage` in `entitlements.ts` already counts from the start of the current calendar month.
5. **Landing page copy (`appointments/page.tsx`) updated to match:** Basic's bullet list now says "Unlimited appointments" (was "Up to 150 appointments / month") and no longer lists "Data export (soon)"; Pro's bullet list gained "Data export (soon)" (previously implicit via "Everything in Basic", never listed on its own) and dropped the now-redundant "Unlimited appointments" line (inherited from "Everything in Basic"). The comparison table's "Monthly appointments" row is now `100 / Unlimited / Unlimited`, and "Data export" is now `— / — / Soon`.

6. **Appointments dashboard: "This week's appointments" list now has a staff filter, and is sorted by staff by default.** Russell noted the list (mixed staff, chronological only) was hard to scan for a multi-staff business. Added `staff_id` to the appointments query, a staff filter pill row ("All staff" + each active staff member's name, as `?staff=<id>` links preserving the current week/day), and: when a specific staff is selected, the list is just that staff's appointments in time order (unchanged from before); when "All staff" is selected (default), the list is sorted by staff name first, then by time within each staff's appointments — the "option to show all" is the "All staff" pill itself, sitting alongside the per-staff filters. The pill row only renders when a business has 2+ active staff (single-staff businesses have nothing to filter). The mini week-calendar grid above the list is unaffected by this filter — it still shows every staff's appointments, matching its existing day-drill-down behavior.

7. **Compact appointment cards + icon action buttons.** Russell flagged that the week-list cards (in the Appointments tab) stacked date/time, reference code, name, phone, service, and staff/source into up to 6 separate lines each, making a full week's worth of appointments a long scroll. Condensed to 2 flex-wrapped rows (date/time + status + reference code on one row; name/phone/service/staff inline on the next, wrapping only as needed) plus an optional third row for intake notes — cutting typical card height by roughly half. Also converted the "Record payment" trigger (`RecordPaymentForm.tsx`), "Reschedule" trigger (`RescheduleForm.tsx`), and the inline "Completed"/"No-show"/"Cancelled" status buttons from full text-label buttons to icon-only buttons (`Banknote`, `CalendarClock`, `CheckCircle2`, `UserX`, `XCircle` from `lucide-react`) with a native `title` attribute for the hover tooltip (matches the codebase's existing tooltip convention, e.g. the "Edit payment"/day-cell tooltips already using `title=`). The "Paid ₱X · date" chip (once a payment is recorded) was left as text, since it conveys information, not just an action. Because `RecordPaymentForm`/`RescheduleForm` are shared components, the Today overview page's appointment list also gets the same compact icon triggers automatically.

**No database migration was needed.** Plan limits and feature flags are entirely code-driven (see the "single source of truth" comment at the top of `entitlements.ts`) — the DB only stores `plan_tier` as a constrained enum string (`free`/`basic`/`pro`), not any numeric limits. Confirmed by grepping the migrations directory for limit-shaped column names — none exist.

## Verification
- `npx tsc --noEmit` and `npx next build` both clean.
- Landing page `/appointments#pricing`: verified live — pricing cards and the expandable comparison table both show the corrected values (Basic "Unlimited appointments", no data export; Pro has "Data export (soon)").
- Billing dashboard: verified live against "Bright Bright" (temporarily flipped to `free` via direct DB update to check the Free-tier view, then restored to `pro` — its original state, unchanged from before this session). Confirmed: Free plan card shows "100 appointments/mo, 1 staff member"; Basic shows "Unlimited appointments" and no "Data export" line; Pro shows the new "Recommended" pill and "Data export" in its feature list.
- Dashboard "Today" overview: verified live while temporarily on `free` — a new "This month" stat card appeared showing "85 / of 100 appointments left · resets monthly" (5 appointments already counted this month against the 100 cap). Confirmed the card is absent while on `pro` (unlimited), and would be equally absent on `basic` now that it's also unlimited.
- Dashboard Appointments tab staff filter: verified live against "Bright Bright" (2 staff — Dr Vonne, Dr. Maya). "All staff" (default) correctly groups the list by staff name then time; clicking "Dr Vonne" or "Dr. Maya" correctly filters to just that provider's appointments; clicking back to "All staff" correctly resets the grouped view.
- Compact cards + icon actions: verified live — 8 appointment cards now fit in the same viewport that previously fit about 2; confirmed each icon button's `title` tooltip text via DOM inspection ("Record payment", "Reschedule", "Completed", "No-show", "Cancelled"); clicked the Reschedule and Record Payment icons and confirmed both still correctly expand their inline forms (datetime picker + Move/Cancel; amount + date + Save/Cancel) and cancel correctly.

## Remaining Work
None — all five requested changes shipped and verified.

## Known Issues
None new.

## Next Recommended Task
Resume Feature #5 (PayMongo) — still blocked on a public URL to register the webhook and obtain `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. Alternatively, live-test the Messenger staff-choice flow and mobile nav dropdown from the previous session's merged PR #5, which haven't been manually verified yet.
