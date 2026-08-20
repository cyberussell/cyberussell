# LaundryFlow Demo — Interactive Order Tracker — v3

**Date:** 2026-08-20
**Product:** Services (Portfolio) — `/demo/laundryflow/track-order`. Also shipped new code to the real Laundry Management System (separate isolated product) — explicitly confirmed with Russell first via `AskUserQuestion`.
**Feature:** Turn the order-tracking illustration into a real, working input — visitors can type an order number + phone and see the actual live status, inline, without leaving the demo.

## Files Modified

**cyberussell.com:**
- `src/components/demo/laundryflow/OrderTracking.tsx` — rewritten as a client component: order number + phone form, fetches the new LMS API, renders the real result (full status range: received/sorting/washing/drying/folding/ready_for_pickup/out_for_delivery/completed/cancelled) in place of the static illustration on success, shows an inline error + falls back to the illustration on failure
- `src/app/demo/laundryflow/track-order/page.tsx` — simplified; the old "Ready to Track a Real Order?" CTA section (with its own duplicate order-number/phone hint) is redundant now that the tracker itself is functional, replaced with a single lighter link to the full `/lms/track` page as an alternative

**laundrymanagementsystem (real LMS product):**
- `src/app/lms/api/track/route.ts` — **new**: `GET /lms/api/track?orderNumber=&phone=`, public/unauthenticated, same access-check (order_number + phone match) and rate limiting as the existing `trackOrder` server action, returns a curated JSON subset (`order_number`, `service_label`, `amount`, `currency`, `status`, `status_history`, `public_token`) — no internal fields (staff, driver, notes, created_by). Exists specifically so a same-origin site proxied in front of this app (this demo, or any future real client's marketing site) can render an inline tracker instead of only linking out.

## Summary of Changes

Russell asked for the order tracker to have "an input element where clients can put their order number... and show as [result]" instead of just an illustration + external link. Confirmed the exact UX first (`AskUserQuestion`): inline result on the demo page vs. redirect to the real page — he chose inline.

Since Next.js Server Actions can't be invoked cross-app, the only clean way to get a real inline result was a small public JSON API on the LMS side, mirroring the same pattern the Appointment System already uses for its own demos (`/appointments/api/services`, `/book`, etc. — public API routes a separate site can fetch same-origin via the zone proxy). Built `GET /lms/api/track`, reusing the LMS's own existing `findOrderForTracking` + `getOrderByPublicToken` query functions and `checkRateLimit` helper — no new business logic, just a JSON-returning wrapper around what the manual `/lms/track` form already does internally.

The demo's `Stepper` now handles the LMS's full 9-status range, not just the 5 illustrative steps — `received → sorting → washing → drying → folding → ready_for_pickup` as the normal linear flow, `out_for_delivery`/`completed` shown as a completed flow plus a banner, `cancelled` shown as a distinct red state instead of the stepper.

**Deployment notes:** `vercel redeploy <url>` was tried first for the LMS app and turned out to reuse the previous build snapshot rather than pulling the new commit (confirmed via `x-matched-path` showing a generic `/404` instead of matching the new route) — switched to `vercel --prod` from the project directory, which does a genuine fresh build, and confirmed the new route appeared in the build's route list before testing further. Both the LMS repo and this repo were committed and pushed as part of this work (deployment requires it, and testing against local dev alone wasn't possible — this repo's local `.env.local` has no `LMS_ZONE_URL`, so the `/lms/*` proxy only exists in production, meaning full end-to-end verification of the fetch flow could only be done against the live site).

## Remaining Work

None. Fully live and verified.

## Known Issues

None. `npx tsc --noEmit` clean in both repos. Live-verified directly against `https://www.cyberussell.com/demo/laundryflow/track-order`: a correct order number + phone renders the real order (6-step flow including "Sorting," real timestamp on the current step); a wrong order number + phone shows the inline error message and falls back to the illustration cleanly. Also spot-checked the new API directly (`https://laundrymanagementsystem.vercel.app/lms/api/track`) for both the success and 404 cases before wiring the frontend.

## Next Recommended Task

Russell tries the live tracker himself at `/demo/laundryflow/track-order` (both a correct and incorrect order number/phone), and decides whether the "Jamie Reyes" test order should stay as a permanent demo fixture or be cleaned up.
