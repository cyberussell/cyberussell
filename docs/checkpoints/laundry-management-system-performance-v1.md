# LMS Performance — v1 (Phase 8g)

**Date:** 2026-07-13
**Product:** Laundry Management System (LMS)
**Feature:** Image optimization + a bundle/rendering audit (phase 8g, the final item of the production-readiness roadmap)

## Files Modified
- `next.config.ts` (`images.remotePatterns` for Supabase Storage)
- `src/app/laundry-management-system/{login,signup}/page.tsx` (logo → `next/image`)
- `src/app/laundry-management-system/orders/[orderId]/receipt/page.tsx` (business logo → `next/image`)
- `src/components/laundry-management-system/dashboard/BusinessLogoForm.tsx` (current-logo display → `next/image`, live upload preview stays a plain `<img>`)

## Summary of Changes

Rather than guess at "heavy components" without real data, this pass started from evidence: the actual `next build` route list, a repo-wide grep for raw `<img>` tags and `force-dynamic` usage, and a check of which files import the two heaviest libraries in the product (`@react-pdf/renderer`, `qrcode`).

- **Real, measurable fix**: `/lms-logo.png` is a 776KB, 1254×1254 PNG served raw via `<img>` on the login and signup pages at a 56×56 display size — every visitor downloaded the full file for a thumbnail. Converted both to `next/image` (passing the public-folder path as a string + explicit `width`/`height`, no static import needed) — confirmed in the browser preview that the optimizer now serves a 128w variant at **2.9KB**, a 99.6% reduction from the original 776KB.
- **`next.config.ts` gained `images.remotePatterns`** (`*.supabase.co/storage/v1/object/public/**`, project-agnostic rather than hardcoding one project ref) so the business logo — user-uploaded, up to 2MB, arbitrary dimensions — can also go through `next/image`. Converted its two display spots: the receipt page and the "current logo" thumbnail in `BusinessLogoForm`. The live pre-upload preview in that same form deliberately stays a plain `<img>`, since it's a `blob:` URL from the just-selected file and `next/image` doesn't support blob URLs.
- **Verified the remotePatterns config actually works**, not just that it doesn't error at build time: hit `/_next/image` directly with a real Supabase Storage URL for a file that doesn't exist, and got back "upstream response is invalid" rather than a hostname-rejection error — proves the pattern matched and Next attempted the fetch, the only failure being the deliberately-nonexistent test file.
- **Bundle audit — clean, no changes needed**: confirmed `@react-pdf/renderer` and the `qrcode` package are only ever imported by files already marked `server-only` (`receipt-pdf.tsx`, `modules/orders/qr.ts`) or a Route Handler (`receipt/pdf/route.tsx`) — neither reaches the client bundle. `framer-motion` isn't used anywhere in the LMS dashboard (only the separate marketing landing page, out of scope). No dynamic-import work was manufactured to "do something" here — there was nothing real to split.
- **`force-dynamic` audit — clean, no changes needed**: all 33 LMS pages using `export const dynamic = 'force-dynamic'` are gated behind a session/auth check that reads cookies, which independently forces Next to treat the route as dynamic — removing the explicit export wouldn't make any of them static. Confirmed rather than assumed, by cross-referencing every `force-dynamic` page against the auth-helper call it makes.

## Remaining Work (explicitly deferred, not this pass)
None outstanding on the roadmap — this closes out all of phase 8 (8a through 8g).

## Known Issues
None found.

## Verification
`npx tsc --noEmit` clean, `npx next build` succeeds with zero errors. Live-verified in the browser preview (shared local dev server, hot-reloaded): the login page's logo now loads via `/_next/image?url=%2Flms-logo.png&w=128&q=75`, confirmed `200` with a real `2891`-byte response (vs. the original `776419`-byte file) and zero console errors. The Supabase remotePatterns config was verified as described above via a direct `/_next/image` request.

## Next Recommended Task
None — phase 8 (production readiness) is fully complete. Future work would be new feature requests rather than continuing this roadmap.
