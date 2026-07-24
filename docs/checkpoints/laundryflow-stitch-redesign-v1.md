# Laundryflow Demo — Stitch Redesign (Location, Footer, Book-a-Pickup) — v1

**Date:** 2026-07-24
**Product:** Services (Portfolio demo — `/demo/laundryflow`, the fictional "Aling Maria Laundry Shop" case study; not the real Laundry Management System SaaS product)
**Feature:** Incorporated a Google Stitch-generated design suite ("Linen & Sky") that Russell uploaded (`stitch_laundryflow_integrated_web_suite.zip`, 3 screens: home landing, pricing/services, book-a-pickup) into the existing demo. Since Hero/Pricing already matched the Stitch design closely (an earlier Stitch pass had been built into those already), scope was the real gaps: a location/contact section, an expanded footer, and a brand-new 3-step booking flow.

## Files Modified
- `src/components/demo/laundryflow/data.ts` — added `LOCATION` (heading/body copy), `BOOKING_TIME_SLOTS`, `BOOKING_SERVICES` (subset of pricing data with descriptions for the step-2 service picker); changed `NAV_LINKS` hrefs from bare `#pricing`/`#contact` to `/demo/laundryflow#pricing`/`#contact` so they still work from the new booking page.
- `src/components/demo/laundryflow/Header.tsx` — "Book Pickup" CTA (desktop + mobile) now links to `/demo/laundryflow/book-a-pickup` instead of `#pricing`; logo link now `/demo/laundryflow#top`.
- `src/components/demo/laundryflow/Footer.tsx` — rewritten to a 4-column layout (brand + CTA, Explore, Legal, then phone/address row) matching the Stitch footer structure; dropped the old standalone branches-chip row (now covered by the new Location section); "Schedule a Pickup" now links to the booking page.
- `src/app/demo/laundryflow/page.tsx` — inserted `<Location />` between `<Pricing />` and `<Footer />`.

## Files Added
- `src/components/demo/laundryflow/Location.tsx` — "Find Us Here" section (address, phone, service-area chips from existing `BRANCHES`, a static styled map placeholder + non-functional "Open in Google Maps" link — no real map/photo assets were available, so nothing external was hotlinked). Has `id="contact"`, which also fixes a previously-dead `#contact` nav link.
- `src/components/demo/laundryflow/BookingFlow.tsx` — the 3-step "Book a Pickup" flow (Contact → Service → Details → Confirmed) as a proper React client component: `useState` + Framer Motion transitions, not the vanilla-JS `onclick`/DOM-toggling from the Stitch HTML export. Reuses `BOOKING_SERVICES` for step 2.
- `src/app/demo/laundryflow/book-a-pickup/page.tsx` — new route, reuses `Header`/`Footer`.

## Skipped (by design)
- The photo gallery strip from the Stitch pricing page — no real source photos existed (Stitch export only pointed at ephemeral `lh3.googleusercontent.com` placeholder URLs), and hotlinking those wasn't appropriate.
- The floating "Concept Project" disclaimer bubble from the Stitch export — redundant with the "A Cyberussell Concept" messaging already in `PlansComparison.tsx` (kept as-is this session per Russell's explicit choice).

## Summary of Changes
Scope and approach (full-replace of Header/Hero/Pricing/Footer content vs. add-only; what to do with the pre-existing uncommitted `PlansComparison.tsx`) were confirmed with Russell via `AskUserQuestion` before building. A concrete file-by-file plan was then presented and approved before any edits, per the single-product-at-a-time / present-plan-first workflow rule.

One real bug was found and fixed during verification: `BookingFlow.tsx`'s original `handleSubmit` read `step` from a stale render closure inside a `setStep` functional updater, and a subsequent fix attempt called `setConfirmed` as a side effect *inside* the `setStep` updater — impure, and unsafe under React 18 Strict Mode's dev-mode double-invocation of updater functions. Final fix: `step` is the single source of truth (`confirmed = step === 4`), and `handleSubmit` does a pure `setStep((s) => Math.min(s + 1, 4))` with no nested side effects.

## Remaining Work
None functionally — all 3 steps, validation, and the confirmation screen are implemented per the Stitch design's copy/flow (Contact → Service → Pickup Details → Confirmed).

## Known Issues
**The booking flow's step-by-step click-through could not be fully live-verified in this session's browser preview.** The preview tool's tab consistently reported `document.hidden = true`, and state-driven UI updates stopped visibly committing partway through testing — confirmed to be an environment issue, not a code defect, because the *same* symptom was reproduced on an already-shipped, unmodified feature (the testimonial carousel in `Pricing.tsx`) when clicked in the same session. What *was* confirmed working live: Hero, Pricing, the new Location section, the new Footer, step 1 of the booking form (renders, accepts input), and step 2's service-card selection/highlight state. `npx tsc --noEmit` is clean throughout.

**Recommend Russell click through `/demo/laundryflow/book-a-pickup` once in a real browser** (fill step 1 → Next: Service → pick a service → Next: Details → fill step 3 → Confirm Pickup) to confirm the full transition end-to-end, given the above.

## Next Recommended Task
Russell reviews the diff and does the one manual click-through above. If it works as expected, this is done. If not, come back with what broke — the fix will likely be fast now that the impure-updater class of bug has been ruled out.
