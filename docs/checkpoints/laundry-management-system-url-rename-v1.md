# LMS URL Rename — v1

**Date:** 2026-07-14
**Product:** Laundry Management System (LMS)
**Feature:** Shorten the product's URL from `/laundry-management-system` to `/lms`, requested directly (not part of the phase 8 roadmap).

## Files Modified
- All 57 route files: `git mv src/app/laundry-management-system → src/app/lms` (tracked as renames, history preserved)
- Every internal `<Link>`/`redirect()`/import-alias reference to the old path updated across those 57 files, plus 8 files in `src/components/laundry-management-system/` and 1 in `src/lib/laundry-management-system/modules/auth/queries.ts` that also hardcoded the URL string
- `src/lib/laundry-management-system/modules/orders/qr.ts` (QR code lookup URL)
- `src/app/lms/actions/{auth,customer,staff}.ts` (3 hardcoded absolute email redirect URLs)
- `src/app/lms/page.tsx` (canonical URL + Open Graph metadata)
- `next.config.ts` (new permanent redirects)
- `src/data/portfolio/laundry-management-system.json` (one-line cross-product link update)

## Summary of Changes

Confirmed two scoping decisions before starting: (1) the entire product moves to `/lms` — dashboard, staff/customer portals, orders, receipts, everything, not just the marketing landing page; (2) the internal `src/lib/laundry-management-system/` and `src/components/laundry-management-system/` folder names stay as-is, since they're not part of the URL, just code organization — renaming them would roughly double this change for zero user-facing benefit.

- **Physical move**: `git mv` preserves file history — `git status` confirms all 57 files tracked as renames (`R`/`RM`), not delete+add.
- **Bulk reference update, done carefully, not blindly**: 101 files total referenced the string `laundry-management-system` in some form. A scripted replacement handled the two real distinctions: `@/app/laundry-management-system` import aliases (the folder that moved) became `@/app/lms`; literal URL-path strings (`/laundry-management-system` in hrefs/redirects) became `/lms`. The `@/lib/laundry-management-system` and `@/components/laundry-management-system` import aliases were explicitly protected from the replacement (temporarily swapped for placeholder tokens mid-script) since those folders were deliberately not renamed — a naive find-and-replace would have wrongly mangled those into `@/lib/lms`/`@/components/lms` and broken every import.
- **Hardcoded absolute URLs updated** (these don't get caught by relative-import tooling): 3 Supabase auth email redirect URLs (signup confirmation, password reset, staff-invite accept), the order-tracking QR code generator, and the marketing page's canonical/OG metadata.
- **Permanent 301/308 redirects added** (`/laundry-management-system` → `/lms`, both exact-match and `/:path*` wildcard) — not optional. Staff-invite emails and password-reset emails already sent to real users contain the old absolute URL; any already-printed order receipts have QR codes pointing at the old path. Without this redirect, those break outright instead of just taking an extra hop.
- **One small cross-product edit**: the Portfolio product's fictional "LaundryFlow" case study (`src/data/portfolio/laundry-management-system.json`) links to the real product's marketing page via a `"url"` field — updated that one line so it doesn't rely on the redirect. Its own `slug`/`coverImage` paths (a completely separate `/portfolio/laundry-management-system` route namespace) were correctly left untouched.
- **`docs/project-map.md` already had an accurate top-level caveat** noting this exact move (apparently added in an earlier pass) — the detailed historical content below it is deliberately preserved as a collapsed, explicitly-stale reference, so no further doc edits were needed there.

## Known Issues
None found.

## Verification
`npx tsc --noEmit` clean. `npx next build` succeeds with zero errors — all 33 LMS routes now build under `/lms/*` (confirmed in the build output route list).

Live-verified against a local dev server with a throwaway owner account (created and fully deleted afterward, including the test business/branch/order — cross-checked via REST, nothing left behind):
- `/lms/login` loads correctly; every visible internal link (`Forgot password?`, `Create your account`, the logo link) correctly points to `/lms/*`.
- Full real login → onboarding → dashboard flow stays on `/lms/*` throughout (confirmed via `location.href` at each step, not just visual inspection).
- Clicking "Orders" in the sidebar navigates to `/lms/dashboard/orders` (not the old path).
- The receipt page is reachable at `/lms/orders/[id]/receipt`; the PDF route returns the expected auth redirect (not a 404) at `/lms/orders/[id]/receipt/pdf`.
- **Old-path redirects confirmed via `curl`, not just browser navigation**: `GET /laundry-management-system` → `308 → /lms`; `GET /laundry-management-system/dashboard/orders` → `308 → /lms/dashboard/orders` (the wildcard rule correctly preserves the rest of the path, not just redirecting to the root).
- Zero console errors throughout.

## Next Recommended Task
None outstanding — this rename is complete and verified. Not yet committed or pushed.
