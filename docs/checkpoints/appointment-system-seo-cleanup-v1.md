# Appointment System — SEO Cleanup — v1

**Date:** 2026-07-11
**Product:** Appointment System
**Feature:** On-page SEO fixes for the `/appointments` marketing landing page

## Files Modified
- `src/app/appointments/page.tsx`
- `src/components/appointment-system/landing/RoiCalculator.tsx`
- `src/components/appointment-system/landing/AiDemo.tsx` (deleted)

## Summary of Changes
- **Missing OG/Twitter image fixed**: verified via `curl` against the live production page that no `og:image`/`twitter:image` tag was rendered at all, despite `twitter:card` being set to `summary_large_image` (which requires one). Social shares on Facebook/Messenger/Twitter were showing no preview image. Added `/og-image.jpg?v=2` (the same site-wide fallback image `/about` and others use) to both `openGraph.images` and `twitter.images`.
- **Removed all stale "AI Receptionist" content** (user-confirmed decision): the AI Receptionist tier/feature was fully removed from the product in an earlier session (`ai.ts` deleted, `entitlements.ts` has no AI feature flag — confirmed by reading the current file), but the live landing page still advertised it in four places:
  1. Meta description ("...upgrade when you need automation or an AI receptionist") — reworded.
  2. JSON-LD `SoftwareApplication` description (same phrase) — reworded.
  3. 3 FAQ entries ("Do I need to know how to use AI?", "Does the AI replace my staff?", "Does the AI understand Taglish?") — removed; a 4th FAQ ("Can I upgrade later?") had "...or AI" trimmed from its answer. These FAQs feed live `FAQPage` structured data indexed by Google, so this was previously indexed as false content.
  4. A full "AI Receptionist" page section with a fake scripted conversation demo (`AiDemo.tsx`) — removed entirely; `AiDemo.tsx` had no other usages, so it was deleted rather than left as dead code.
  5. Found during live verification, not in the original scan: the ROI calculator (`RoiCalculator.tsx`) had a 4th plan option "AI Receptionist — ₱1,499/mo" in its cost dropdown — removed, leaving only the 2 real paid tiers (Basic/Pro) that match `entitlements.ts`.

## Remaining Work
None for this pass.

## Known Issues
None found beyond what's listed above.

## Next Recommended Task
Consider a custom OG image per landing page (currently reusing the generic site-wide `/og-image.jpg`) if Russell wants a more on-brand social preview later — not required, just an enhancement opportunity.
