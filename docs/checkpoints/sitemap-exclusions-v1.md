# Sitemap Exclusions — v1

**Date:** 2026-08-18
**Product:** Site-wide (next-sitemap generation, not one of the 8 numbered products)
**Feature:** Clean the generated XML sitemap of operational/private/transitional/internal-utility routes

## Files Modified
- `next-sitemap.config.js` — replaced the old `additionalPaths`-only config with a `transform` hook that filters every auto-discovered page through `isExcludedRoute`, plus the same filter applied defensively to the manual `additionalPaths` list.
- `src/lib/sitemap/exclusions.js` (new) — centralized, explicit exclusion rules (prefix, exact-route, suffix, and utility-segment matching) and the `isExcludedRoute()` function.
- `src/lib/sitemap/__tests__/exclusions.test.ts` (new) — 7 vitest cases covering every required exclusion category, false-positive guards (substring words like "dashboards", "testing", "instagram"), legitimate-page preservation, and path normalization.
- `public/sitemap-0.xml` — regenerated via `npx next-sitemap` against the existing `.next` build manifest to reflect the new rules (258 → 232 URLs). Will also regenerate automatically on the next real `npm run build`.

## Summary of Changes
`next-sitemap.config.js` previously had no exclusion logic at all — every page under `src/app` was auto-included. Added explicit rules to drop: `/mission-control` and all descendants (internal admin CMS, already `noindex` at the layout level), `/learn/dashboard` (learner-auth-gated dashboard), `/design-system` (internal style reference, already `noindex`), and any route ending in `/assessment`, `/complete`, or `/congratulations` (post-lesson transitional screens, occur across the ai-team/foundations/missions/skills/think/workflows tracks). Also added a general "internal utility segment" rule (admin, auth, login, signup, checkout, account, preview, test, staging) for future-proofing — inspected the current route tree and found no existing public page matches any of these segments today, so it has zero effect on the current output but will catch future additions. No `noindex` meta tags were added to any page — only sitemap membership changed, per the task's explicit restriction.

Deliberately did **not** touch `/learn/*` content routes beyond `/learn/dashboard` and the assessment/complete/congratulations screens — see the remaining `/learn/` section list below for the Academy-overlap decision, which is out of scope for this change.

## Verification
- `npm test` (vitest) — all 7 new tests pass, no existing tests broken (no other test files exist in the repo yet).
- Regenerated `public/sitemap-0.xml` before/after: 258 → 232 URLs, exactly the 26 URLs matching the exclusion rules (11 mission-control, 1 design-system, 1 learn/dashboard, 13 assessment/complete/congratulations) were removed, zero unrelated additions or removals, zero format regressions.
- Manually checked for exclusion false-positives against existing content (`.../building-dashboards-and-reports`, `.../launching-testing-and-getting-feedback`, `.../facebook-and-instagram-ads`) — all correctly preserved.

## Remaining Work
- Decide ownership of the `/learn/*` sections vs. `academy.cyberussell.com` (Cyberussell Academy) — flagged by Google Search Console as generating "Page with redirect" / potential duplicate-content signals. Remaining `/learn/` route groups that may compete: `/learn` (hub), `/learn/foundations`, `/learn/think`, `/learn/ai-team`, `/learn/workflows`, `/learn/skills` (+ 10 sub-tracks: automation, business, content-creation, excel-spreadsheets, graphic-design, marketing, programming, seo, video-editing, website-creation, writing-copywriting), `/learn/missions`, `/learn/career-guides`, `/learn/freelancing`, `/learn/online-jobs`, `/learn/seo`, `/learn/ai`, `/learn/website-creation`, plus `/careers` + `/careers/[slug]` (the 15 career blueprints, tightly coupled to Learn). This needs a separate decision session — not resolved here per the task's explicit scope boundary.
- `public/sitemap.xml`/`public/sitemap-0.xml` are tracked in git and were last regenerated from a build that predated the Shop/TMS removal (they briefly still listed `/shop/*` and `/tms/*`). Worth wiring `next-sitemap` regeneration into CI or a pre-commit step so this doesn't drift again.

## Known Issues
- None introduced by this change.

## Next Recommended Task
Ownership/redirect decision for the `/learn/*` vs. Academy overlap listed above.
