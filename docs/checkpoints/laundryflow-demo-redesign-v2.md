# LaundryFlow Demo — Photos, Logo, Footer, Real LMS Integration — v2

**Date:** 2026-08-20
**Product:** Services (Portfolio) — `/demo/laundryflow` fictional case study. This session also touched the real Laundry Management System (LMS) — a separate, isolated product — see the "LMS-side changes" section below, explicitly confirmed with Russell first since it crosses product boundaries.
**Feature:** Follow-up polish on the v1 redesign, plus wiring the demo's order-tracking page to the real, live LMS product instead of a static mockup.

## Files Modified

- `src/components/demo/laundryflow/data.ts` — added `PHOTOS` (hero, attendant-sorting, attendant-folding, logo), re-added `BRANCHES`, updated `ORDER_TRACKING` (real order number `ORD-000041`, added `demoOrderNumber`/`demoPhone`), `NAV_LINKS` Track Order now points to `/demo/laundryflow/track-order`
- `src/components/demo/laundryflow/Hero.tsx` — full-bleed real photo (`hero-laundry.jpg`) with a dark-gradient overlay, copy repositioned on top instead of the previous 3-column layout with a placeholder panel
- `src/components/demo/laundryflow/Services.tsx`, `Satisfaction.tsx` — placeholder panels replaced with real photos (`attendant-sorting.jpg`, `attendant-folding.png`)
- `src/components/demo/laundryflow/Header.tsx`, `Footer.tsx` — icon+text placeholder logo replaced with the real Aling Maria logo image; Footer rewritten from the minimal copyright-only version back to a richer layout (Main Branch address, Contact Numbers, Service Areas badges) plus Admin Login/Staff Login links pointing at the real `/lms/login`
- `src/app/demo/laundryflow/page.tsx` — removed `PlansComparison` (Russell: "no need for this") and `OrderTracking` (moved to its own page)
- `src/components/demo/laundryflow/PlansComparison.tsx` — **deleted** (now unused)
- `src/app/demo/laundryflow/track-order/page.tsx` — **new page**: the order-tracking illustration (`OrderTracking.tsx`, unchanged) plus a real "Open Order Lookup" button linking to the actual live `/lms/track`, and a "try it yourself" hint showing the real demo order number/phone
- `public/demo/laundryflow/photos/hero-laundry.jpg`, `attendant-sorting.jpg`, `attendant-folding.png`, `logo.png` — real assets Russell supplied from his Downloads folder

## Summary of Changes

Series of incremental asks in one session: swap placeholder photo panels for real photos (hero, two "attendant" shots), make the hero full-bleed with the copy overlaid instead of a 3-column layout, swap the icon+text placeholder for the real Aling Maria logo (header + a white-chip version in the dark footer for contrast), and restore a fuller footer with real branch/contact info and LMS admin/staff login links. Also removed the `PlansComparison` (Cyberussell pricing-tiers) section per Russell's direction.

Russell then asked to move "Track Your Order, Anytime" off the homepage into its own page, using the real Laundry Management System API if one exists — it does. Investigation (see below) led to actually wiring this up for real rather than building another mockup.

### LMS-side changes (separate product, explicitly confirmed with Russell first)

`/lms/track` + `/lms/track/[token]` are real, already-built public order-tracking routes in the standalone LMS repo (`Business/laundrymanagementsystem`, extracted from this codebase in an earlier session). Confirmed with Russell before touching anything cross-product (`AskUserQuestion`: mock vs. real integration — he chose real).

**Found and fixed a real production bug, unrelated to the demo:** the LMS Supabase project had migrated to Supabase's new API key system, and the `service_role` key baked into both local `.env.local` and the Vercel **Production** environment variable was stale/unregistered — meaning the live public order-tracking feature was silently broken for real customers (any receipt QR scan would 404). Russell generated a fresh secret key from the Supabase dashboard (had to switch account/role first — his session lacked org privileges initially); it was written to `Business/laundrymanagementsystem/.env.local` and to the Vercel **Production** env var (old one removed via `vercel env rm`, new one added via `vercel env add`), then a redeploy was triggered (`vercel redeploy`) to pick it up. Verified fixed via the actual production alias (`laundrymanagementsystem.vercel.app`, reached through `get_access_to_vercel_url`/`web_fetch_vercel_url` to bypass Vercel deployment protection).

**Provisioned real demo data:** found two existing "Aling Maria Laundry Shop" businesses already live in the LMS database (unrelated prior activity) — one trial (created same day), one **active** since 2026-07-14 (`aling-maria-laundry-shop`, Rizal Taguig, real staff member already attached under `cyberussellofficial@gmail.com`). Confirmed with Russell which to use (`AskUserQuestion`) — he picked the active one. Inserted one real order via direct Supabase REST (service-role key, same pattern as the earlier Luma Dental Appointment System wiring): walk-in "Jamie Reyes", `0917 555 0101`, "Wash & Fold — 2 loads", ₱140, status `folding` → real `order_number` `ORD-000041`, real `public_token`. Live-verified both the direct token link and the manual order-number+phone lookup form against the real production deployment.

The demo's `ORDER_TRACKING` illustration was then updated to reference this real order number so the mockup and the real system agree, and the new track-order page surfaces the real order number + phone as a "try it yourself" hint.

## Remaining Work

- None for the demo itself.
- On the LMS side: only one order exists for this business's live-data smoke test — Russell may want more realistic sample orders, or to clean up the "Jamie Reyes" test order at some point (harmless walk-in row, no linked customer account).

## Known Issues

None found. `npx tsc --noEmit` clean throughout. Live-verified: demo pages via local dev server screenshots; the real LMS production fix via the actual `laundrymanagementsystem.vercel.app` deployment (both the direct `/lms/track/[token]` link and the manual `/lms/track` form).

**Note on this session's shared dev server:** several stale/false console errors appeared during verification (`PlansComparison is not defined`, `Shirt is not defined`, `OrderTracking is not defined`) — all confirmed to be Turbopack HMR cache artifacts from a dev server another concurrent session was also using in this same directory, not real bugs. `tsc --noEmit` and direct source inspection were used to confirm each time before dismissing.

## Next Recommended Task

Commit and push (already done for the redesign v1 + this v2 batch, per Russell's explicit request each time — see git log). Russell to spot-check the live `/demo/laundryflow/track-order` page and the real `laundrymanagementsystem.vercel.app` production fix at his convenience.
