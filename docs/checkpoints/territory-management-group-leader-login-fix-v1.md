# Territory Management System — Group Leader Login Crash Fix — v1

**Date:** 2026-07-13
**Product:** Territory Management System (TMS)
**Feature:** Bug fix — Group Leader dashboard crashed on login with a generic Next.js error boundary ("Something went wrong — Server Components render")

## Files Modified
- `src/lib/territory-management-system/modules/assignment/date.ts`
- `src/lib/territory-management-system/modules/reports/date.ts`
- `src/app/territory-management-system/actions/auth.ts`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/app/territory-management-system/dashboard/territories/[territoryId]/page.tsx`

## Summary of Changes

This was the first real live-DB pass on TMS now that Russell has provisioned the Supabase project — and it surfaced two genuine, previously-unverified production bugs (the earlier full-product audit was code-only; nothing DB-backed had ever actually been clicked). Both were found by tracing the exact crash, not by re-scanning the whole product.

**Bug 1 — invalid IANA timezone crashed every congregation-local date calculation.** Russell had entered `"GMT+8"` when manually provisioning the congregation (`congregations.timezone`), which isn't a valid IANA zone identifier. `todayInTimezone()` (`assignment/date.ts`) and `timezoneOffsetString()` (`reports/date.ts`) both call `Intl`/`toLocaleDateString` with `{ timeZone: timezone }` unguarded — an invalid zone throws an uncaught `RangeError`. The product already had an `isValidTimezone()` check (`modules/congregation/schema.ts`) with a comment explicitly warning about this exact failure mode, but it was only wired into the admin Settings-form edit path, not checked at read time — and manual SQL provisioning (`SETUP.md` §3) bypasses it entirely. Fixed with a new `safeTimezone()` guard in `assignment/date.ts` that falls back to `'UTC'` instead of throwing, used by both `todayInTimezone` and `timezoneOffsetString`. Russell also corrected the actual bad row via `update congregations set timezone = 'Asia/Manila' where timezone = 'GMT+8';`.

**Bug 2 — Server Action closures aren't valid Server References across the RSC boundary.** Once the timezone fix let the dashboard render further, a second, unrelated crash appeared: `ConfirmDeleteButton` (a Client Component) received `action={() => deleteGroupLeaderAssignmentAction(batch.id)}` from a Server Component. An inline arrow function that merely *calls* a `'use server'` function is not itself a serializable Server Reference — only a direct function reference or the result of `.bind()` on one is. Passing the closure throws during RSC payload serialization ("Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with 'use server'"), which is exactly the generic error boundary the user hit. This only fires once an assignment batch actually exists for the day, which is why it was never caught in earlier code-only auditing. Grepped the whole TMS `app`/`components` tree for the same pattern and found exactly one other instance with the identical shape — the admin Territory detail page's delete button (`action={() => deleteTerritoryAction(territory.id)}`). Both fixed via `.bind(null, id)`. Confirmed this pattern is safe where it *is* used inside Client Components calling Server Actions directly from event handlers (`RecordsTable.tsx`, `SectionBlockTree.tsx`) — no RSC boundary crossing there, so no bug.

**Also fixed in passing:** `actions/auth.ts`'s `signIn()` discarded the `profiles` lookup error and silently defaulted an unrecognized/failed role to `'admin'`. Not the direct cause of either crash, but a real defensive-coding gap — now returns a clear error instead.

`npx tsc --noEmit` and `npx next build` both clean after every change (two separate passes, one per bug). Committed as two commits (`53683c7` timezone fix, `2e3f779` Server Action closure fix), pushed and merged directly to `main` at Russell's explicit request, both auto-deployed via Vercel and confirmed `● Ready` in Production. **Live-verified by Russell on production**: the Group Leader dashboard now loads without error.

## Remaining Work

None for this specific crash. This was the first live click-through of any DB-backed TMS screen — the rest of the product (Administrator dashboard: territories, records, CSV import/export, assignments, reports, settings; the publisher QR workflow; offline sync) is still unverified in the browser against real data and could plausibly have similar never-before-exercised bugs, since the whole prior audit was code-tracing only.

## Known Issues

- The same "closure over a Server Action passed across the Server→Client boundary" mistake could theoretically recur if new delete/action buttons are added without following the `.bind()` pattern — worth keeping in mind for future TMS work, though no linter currently catches it.
- No DB-level constraint on `congregations.timezone` — a future manual-SQL provisioning step could still write an invalid zone. The `safeTimezone()` fallback prevents a crash, but a congregation silently running on UTC instead of its real timezone would be a quieter, harder-to-notice bug. Worth a follow-up CHECK constraint or trigger if more congregations get provisioned manually.

## Next Recommended Task

Do a real live pass through the rest of the Administrator dashboard (create a territory, generate sections/blocks, add/import records, generate an assignment batch as admin, walk the publisher QR flow end-to-end) now that the Supabase project is live — given two latent bugs surfaced on the very first real screen touched, it's worth assuming more may exist until each screen has actually been clicked once for real.
