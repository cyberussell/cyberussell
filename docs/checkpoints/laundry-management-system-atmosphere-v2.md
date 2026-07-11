# Laundry Management System — Atmosphere v2 (Bubble/Glass/Particle System) — v1

**Date:** 2026-07-11
**Product:** Laundry Management System (LMS)
**Feature:** Cinematic water/glass atmosphere for the marketing landing page (`/laundry-management-system` only), replacing the simpler v1 floating-bubble decoration from the same day's earlier color-theme batch.

## Files Modified
- `src/components/laundry-management-system/Atmosphere.tsx` (new — replaces and deletes `Bubbles.tsx`)
- `src/app/laundry-management-system/page.tsx`
- `src/components/laundry-management-system/Hero.tsx`
- `src/components/laundry-management-system/FinalCTA.tsx`

## Summary of Changes
Russell provided a detailed reference-image brief (glassmorphism bubbles, depth-of-field layering, particle system, radial light gradients, parallax, mouse interaction) and asked it be implemented as a real HTML/CSS/Framer Motion system, not a static image, scoped to the landing page only.

Built `Atmosphere.tsx` from scratch:
- Deterministic seeded-random (`mulberry32`) bubble/particle generation — same output on server and client, no hydration mismatch, no pop-in.
- `GlassBubbleField`: reusable configurable bubble field (radial-gradient glass look, border, inner/outer glow, optional crisp highlight/sparkle children, optional `backdrop-filter` refraction, optional mouse-reactivity, optional edge-cropping bias).
- `ParticleField`: tiny twinkling dust particles.
- `LightWash`: layered low-opacity blue radial gradients simulating light through water.
- `AtmosphereBackground` (default export): one `position: fixed` full-viewport composition of 3 depth layers (back/mid/front, each with its own scroll-driven parallax offset) + particles + light wash — rendered once in `page.tsx`, giving one continuous atmosphere behind every section instead of per-section backgrounds.
- `MouseAtmosphereProvider` / `useAtmosphereMouse`: single rAF-throttled global mousemove listener shared via context; only foreground/interactive bubbles subscribe.
- `HeroBubbleCluster`: denser local field used inside `Hero.tsx` for the "richest field behind the hero text" requirement, paired with a new radial dark scrim for text legibility.
- `CornerBubbleAccent`: small crisp cluster reused in `FinalCTA.tsx`, cropped by the panel edge.

`page.tsx` now wraps everything in `MouseAtmosphereProvider`, renders `<AtmosphereBackground />` once, and `main` no longer carries its own flat background color (the fixed atmosphere supplies it) — this is what makes the bubble field visible continuously as the page scrolls through Features/Pricing/FAQ/etc.

## Remaining Work
None for the landing page. The auth flow (login/signup/onboarding/dashboard) still uses only the flat blue theme from the earlier same-day batch — no bubble atmosphere there, since this batch was explicitly scoped to the landing page URL only.

## Known Issues
- Mouse "reactivity" is implemented as one shared cursor-position tilt applied uniformly to all foreground bubbles, not true per-bubble proximity/distance detection as literally described in the brief ("nearby bubbles react"). This was a deliberate performance trade-off (avoids O(n) distance computation across dozens of bubbles on every mousemove) and still reads as elegant/subtle per Russell's own "don't overdo it" instruction — flagged in case genuine per-bubble proximity reaction is wanted later.
- Bubble/particle counts were scaled down from the brief's literal "dozens"/"hundreds" (27 glass bubbles + 55 particles globally, plus Hero's own 18-bubble local cluster) — consistent with the brief's own performance-priority section, but flagged as a conscious quantity reduction, not an oversight.

## Next Recommended Task
None required — batch complete as scoped. If Russell wants full-product visual consistency later, the same `Atmosphere.tsx` building blocks (`GlassBubbleField`, `ParticleField`, `LightWash`) could be reused to bring the same atmosphere to the login/signup/onboarding/dashboard pages.
