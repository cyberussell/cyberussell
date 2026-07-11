# Laundry Management System — Soap Suds Theme (Foam Dividers) — v3

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Replaced the dense bubble atmosphere (v2) with organic soap-foam dividers reserved for major section transitions, plus a much sparser background bubble field and a refreshed cyan-inclusive blue palette — per Russell's follow-up brief that this style reads more on-brand for a laundry business than a uniform bubble field.

## Files Modified
- `src/components/laundry-management-system/Atmosphere.tsx` (extended: new `FoamDivider`/`FoamCircle`/`generateFoam`, reduced bubble/particle counts, palette refresh, new `round()` helper)
- `src/components/laundry-management-system/Hero.tsx` (added `FoamDivider` at the bottom)
- `src/components/laundry-management-system/HowItWorks.tsx` (added `FoamDivider` at the bottom, palette touch-up)
- `src/components/laundry-management-system/FinalCTA.tsx` (added `FoamDivider` at the bottom, panel gradient palette update)
- `src/components/laundry-management-system/LandingNav.tsx` (background hex update)
- `src/components/laundry-management-system/Features.tsx`, `Pricing.tsx`, `FAQ.tsx`, `ChangeRequests.tsx` (card tint hex update `#162033` → `#0F172A`)

## Summary of Changes
Russell's reference brief asked for a "premium soap suds" identity instead of floating bubbles everywhere: organic, non-repeating foam clusters at major section boundaries (hero→features, features→pricing, pricing→footer), each built from many small overlapping glass circles that dissolve into the background, combined with only a few subtle floating glass bubbles in the background rather than a dense field. He also gave an exact new hex palette (adds `#22D3EE` cyan, `#7DD3FC`/`#E0F2FE` light blues, `#08111F`/`#0F172A` navy tones) and explicitly recommended reserving the foam for transitions only, not every section, to keep it premium rather than busy.

Built on top of the existing `Atmosphere.tsx` (not a rewrite): added `generateFoam()` (seeded, wave-based irregular silhouette instead of a straight row) and a `FoamDivider` component (mask-fade at top/bottom, ~30% of circles slow-rise/shimmer, one slow diagonal shimmer sweep across the band). Placed 3 instances, each with a distinct seed so none look alike: bottom of `Hero.tsx`, bottom of `HowItWorks.tsx` (the natural "features → pricing" boundary given this page's actual section order), bottom of `FinalCTA.tsx` (→ footer). Reduced `AtmosphereBackground` from 27 bubbles/55 particles to 7/16, and `HeroBubbleCluster` from 18 to 6, per the "a few subtle bubbles" instruction. Refreshed the glass gradient recipe and `LightWash` to include the new cyan/light-blue stops, and swapped background/card hex values across the touched files to the new exact spec.

**Bug found and fixed during live verification:** the first live check surfaced a React hydration-mismatch console error. Traced it to raw high-precision floats (e.g. `23.913321079352365`) landing directly in inline `style` objects — Next's SSR serialization rounds such numbers when writing the HTML attribute, so the server string and the client's fresh full-precision recomputation didn't match at hydration. This was not a flaw in the seeded-random approach itself (already deterministic/SSR-safe), just unrounded arithmetic on the *output* of that approach. Fixed by rounding at the source (`lerp()`) and at every downstream derived calculation that does further arithmetic on an already-rounded number (`FoamCircle`'s position math, `BubbleVisual`'s crisp-highlight offsets), since subtraction/multiplication of rounded floats can still reintroduce long tails via IEEE-754 representation error. Confirmed fixed by testing in a brand-new browser tab — the first "still failing" recheck turned out to be a stale cached console error carried over from the pre-fix load in the same tab, not a real regression.

## Remaining Work
None for the landing page scope. Auth flow pages (login/signup/onboarding/dashboard) still carry only the flat blue theme from the very first batch — no foam or bubble atmosphere there, unchanged this round (same scope boundary as v2).

## Known Issues
None outstanding — the hydration mismatch found during verification was fixed and re-verified clean (zero console errors on a fresh tab, desktop and mobile).

## Next Recommended Task
None required — batch complete as scoped. If full-product visual consistency is wanted later, the same `Atmosphere.tsx`/`FoamDivider` building blocks could extend to the auth flow pages.
