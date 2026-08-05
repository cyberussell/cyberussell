# Territory Management System Extraction — v1

**Date:** 2026-08-06
**Product:** Territory Management System (TMS)
**Feature:** Extract TMS into its own standalone repo/Vercel deployment, proxied back at `https://www.cyberussell.com/tms`, same pattern as the Appointment System (`0b2d6d0`, prior commit) and Laundry Management System (`e0ff176`, prior commit) extractions. `/tms` becomes the permanent canonical URL (Russell's explicit call), matching how `/lms` replaced `/laundry-management-system`.

## Files Modified

**This repo (cyberussell.com) — uncommitted at end of session:**
- `src/app/territory-management-system/**` → renamed to `src/app/tms/**` (git mv, history preserved)
- ~24 files across `src/app/tms/**`, `src/lib/territory-management-system/**` had hardcoded `/territory-management-system/...` path strings (redirects, `router.push`, `<Link href>`) rewritten to `/tms/...`; one absolute URL in `src/app/tms/actions/password.ts` (password-reset `redirectTo`) fixed separately since it wasn't quote-anchored like the rest
- ~15 files across `src/app/tms/**`, `src/lib/territory-management-system/**`, `src/components/territory-management-system/**` had `@/app/territory-management-system/actions/...` import specifiers fixed to `@/app/tms/actions/...` (broken by the folder rename — these live in files that were NOT renamed, so easy to miss)
- `next.config.ts` — flipped the `/tms` ↔ `/territory-management-system` redirect direction; added a `TMS_ZONE_URL`-gated rewrite block

**New repo — `/Users/russellparayno/Documents/Business/territorymanagementsystem` (git-initialized, committed, not pushed):**
- Copied: `src/app/tms/**`, `src/lib/territory-management-system/**`, `src/components/territory-management-system/**`, root `territory-management-system/**` (42 migrations, SETUP.md, email templates), `public/tms-logo.png`, `src/types/open-location-code.d.ts`
- New: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `vitest.config.ts` + `vitest.setup.ts` + `vitest.server-only-stub.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `.gitignore`, `.env.example`, `README.md`
- Edited: `territory-management-system/SETUP.md` (path references updated to `/tms`)

## Summary of Changes

Mirrored the exact extraction pattern used for the Appointment System and LMS. Renamed the URL-facing route folder from `territory-management-system` to `tms` (deliberately left the `lib`/`components` directory names alone — internal, not URL-exposed, no reason to churn them). Fixed every hardcoded path reference this broke, including a subtle one: files in `src/lib/**` and `src/components/**` that import Server Actions back from the now-renamed `src/app/tms/actions/` — those imports don't show up when you only grep the renamed folder, since the importing files themselves weren't moved.

Scaffolded a genuinely standalone, independently buildable Next.js app in a new sibling repo — not just a file copy. Determined the real dependency surface by grepping the copied code rather than assuming (found `leaflet`/`react-leaflet`/`open-location-code` for the map/plus-code features, `lucide-react` for icons, and a custom `open-location-code` ambient type declaration with no `@types` package equivalent — all three were easy to miss). Verified the new repo end-to-end before considering it done: `npm install`, `tsc --noEmit` clean, `vitest run` (59/59 passing), and `next build` succeeding with every route correctly nested under `/tms/*` (matching the multi-zone rewrite's destination path shape).

## Remaining Work

- Push the new repo to GitHub (`cyberussellofficial-ctrl/territorymanagementsystem`, matching naming convention) and import into a new Vercel project — needs Russell's login, not done this session.
- Set the three `TMS_SUPABASE_*` env vars on that new Vercel project (values already exist from the live Supabase project).
- Set `TMS_ZONE_URL` on the cyberussell.com Vercel project once deployed — this is what actually turns on the `/tms` proxy in production.
- Commit this session's changes in **this** repo (rename + path fixes + `next.config.ts`) — left uncommitted per this repo's "only commit when explicitly asked" convention; Russell hasn't asked for that yet.
- Verify `/tms` end-to-end through the live proxy once `TMS_ZONE_URL` is set (login, dashboard, group-leader dashboard, publisher QR flow — at minimum).

## Known Issues

- None found in the extracted code itself — `tsc`, tests, and build are all clean in the new repo. The only "issues" were the ones already fixed above (broken imports/paths from the rename).

## Next Recommended Task

Once Russell has pushed the new repo and deployed it to Vercel with env vars set: come back, set `TMS_ZONE_URL`, verify `/tms` live through the proxy, then remove the now-redundant local TMS code from this repo (`src/app/tms/**`, `src/lib/territory-management-system/**`, `src/components/territory-management-system/**`, root `territory-management-system/**`) in a dedicated commit — same as `0b2d6d0` and `e0ff176` did for the other two products. Until then, this repo's local `/tms` code stays as the working fallback.
