# LaundryFlow Demo — Full Redesign — v1

**Date:** 2026-08-20
**Product:** Services (Portfolio) — `/demo/laundryflow` fictional case study, isolated from the real Laundry Management System product
**Feature:** Full visual redesign of the "Aling Maria Laundry" demo site, implementing a design imported from Claude Design (`claude.ai/design/p/52fece9f-ca21-434d-99d2-bdc3dc57367b`, file `Laundry Website.dc.html`).

## Files Modified

**Rewritten:**
- `src/components/demo/laundryflow/Header.tsx` — now includes a dark utility bar (hours/location/social icons) above an in-flow (non-absolute) white header
- `src/components/demo/laundryflow/Hero.tsx` — badge column + headline + placeholder photo panel, yellow bg
- `src/components/demo/laundryflow/Footer.tsx` — simplified to copyright + email only, matching the imported design
- `src/components/demo/laundryflow/PlansComparison.tsx` — recolored only (blue → black/yellow/gold), content/structure unchanged
- `src/components/demo/laundryflow/BookingFlow.tsx` — recolored only; also removed the now-obsolete `pt-32` top padding that compensated for the old absolute-positioned header
- `src/components/demo/laundryflow/data.ts` — new content/export shape for the redesign (see below)
- `src/app/demo/laundryflow/page.tsx` — new section order
- `src/app/demo/laundryflow/book-a-pickup/page.tsx` — bg color updated to new cream

**New:**
- `src/components/demo/laundryflow/TrustStrip.tsx`
- `src/components/demo/laundryflow/Services.tsx`
- `src/components/demo/laundryflow/Satisfaction.tsx`
- `src/components/demo/laundryflow/OrderTracking.tsx`
- `src/components/demo/laundryflow/BrowserWindow.tsx` — React/Tailwind port of the design's `browser-window.jsx` Chrome-window mockup
- `src/components/demo/laundryflow/ContactBooking.tsx`

**Deleted:**
- `src/components/demo/laundryflow/Pricing.tsx`
- `src/components/demo/laundryflow/Gallery.tsx`
- `src/components/demo/laundryflow/Location.tsx`

## Summary of Changes

Replaced the site's blue (`#2563EB`) theme entirely with the imported design's black/yellow/cream palette (`#14181F` ink, `#FFC629` yellow, `#FFF8E1`/`#FFF3CC` cream, `#B98900`/`#E4AE00` gold accents). New page structure: utility bar → header → hero → trust strip → services → satisfaction/promise → order-tracking demo (mock browser window with a live-look status stepper) → testimonial + booking form → footer → `PlansComparison` (Cyberussell's own pricing-tier pitch, kept as-is per Russell's scope call, just recolored).

Two decisions confirmed with Russell before implementing:
1. `book-a-pickup/page.tsx` + `BookingFlow.tsx` were included in this pass (not left on the old blue theme) for visual consistency across the whole demo.
2. Photo spots use styled placeholder panels (matching the imported design exactly), not the existing `hero-pile.png`/`gallery-*.jpg`/`cta-scene.jpg` files — those files were left untouched in `public/demo/laundryflow/photos/` but are now unreferenced by any component.

`data.ts` was restructured: removed `PRICING`, `PRICING_TRUST`, `PRICING_BANNER`, the old 3-item `TESTIMONIALS` array, `GALLERY`, `PHOTOS`, `LOCATION`, `BRANCHES`; added `HERO_BADGES`, `TRUST_ITEMS`, `SERVICES_INTRO`/`SERVICES`, `SATISFACTION`, `ORDER_TRACKING` (with a 5-step tracker driven by a `currentStep` string), single `TESTIMONIAL` object. Kept `SHOP`, `PLANS`, `BOOKING_SERVICES`, `BOOKING_TIME_SLOTS` (content updated to match the new service names — Wash & Fold / Dry Cleaning / Self-Service Machines / Commercial-Bulk — dropped the old Comforters/Curtains booking options since they're not part of the new 5-service lineup).

## Remaining Work

None outstanding for the redesign itself — all imported-design sections are implemented and both pages are live-verified.

## Known Issues

None found. `npx tsc --noEmit` clean, no console errors on either page.

## Next Recommended Task

Russell reviews `/demo/laundryflow` and `/demo/laundryflow/book-a-pickup` live, then decides on committing. Not yet committed.
