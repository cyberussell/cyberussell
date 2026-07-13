# Territory Management System — Mobile QR/Group Size fixes + Global CSV Import — v1

**Date:** 2026-07-13
**Product:** Territory Management System (TMS)
**Feature:** Three follow-up requests from Russell: a 2x-larger QR code on mobile, a fix for "Group size can't be edited on mobile," and a new cross-territory CSV import (name, plus code, territory name, section, block, household members, note).

## Files Modified
- `territory-management-system/migrations/007_optional_address_household_members.sql` (new) — makes `territory_records.address` optional (`default ''`, still `not null`) and adds `household_members integer` with a `>= 0` check.
- `src/lib/territory-management-system/modules/assignment/qr.ts` — QR source resolution 240px → 480px.
- `src/components/territory-management-system/GroupLeaderTabs.tsx` — QR `<img>` display size `h-40 w-40` (160px, both breakpoints) → `h-80 w-80 sm:h-40 sm:w-40` (320px on mobile, unchanged 160px at `sm:` and up).
- `src/components/territory-management-system/AssignmentForm.tsx` — fixed the real "can't edit on mobile" bug (see below).
- `src/lib/territory-management-system/modules/records/{types,schema,csv,queries}.ts` — `household_members` added; `address` no longer required; CSV parser generalized for two import modes.
- `src/app/territory-management-system/actions/records.ts` — `createRecordAction`/`updateRecordAction` thread `householdMembers`; `importRecordsAction` generalized to `territoryId: string | null`.
- `src/components/territory-management-system/CsvImportDialog.tsx` — `territoryId` prop now optional; help text and the action call adapt to whichever mode is active.
- `src/app/territory-management-system/dashboard/records/page.tsx` — new global "Import CSV" button next to Export.
- `src/components/territory-management-system/{RecordForm,RecordEditForm}.tsx` — Address field no longer `required`; new optional Household Members number input.
- `src/components/territory-management-system/RecordsTable.tsx` — new `recordLabel()` helper (address → Plus Code → "Unlabeled record") used everywhere the table shows/searches/deletes by address; new Household column.
- `src/app/territory-management-system/dashboard/records/[recordId]/page.tsx` — detail page title uses the same fallback.
- `src/components/territory-management-system/publisher/{PublisherRecordDetailView,AssignedRecordsList}.tsx` — same address→Plus Code fallback on the publisher-facing (public, unauthenticated) views.

## Summary of Changes

**QR code, 2x on mobile.** The QR `<img>` had zero responsive classes before (`h-40 w-40` at every breakpoint) — bumped to 320px below `sm:` (640px), kept the original 160px at `sm:` and up. Also doubled the underlying PNG's generation resolution (240px → 480px) so the larger mobile size doesn't upscale a blurry source image.

**Group size mobile bug — found and fixed.** Both "Publishers going out" and "Group size" number inputs used `onChange={(e) => setX(Math.max(1, Number(e.target.value) || 1))}` — every keystroke ran through this, so clearing the field to type a new value snapped it straight back to `1` on the same render (`Number('') || 1` = `1`). On a mobile numeric keypad, where there's no easy "select all and retype" the way there is with a mouse, this made the field feel stuck/uneditable — exactly Russell's report. Fixed by letting the field go visibly blank mid-edit (`value={groupSize || ''}`, `onChange` no longer clamps) and only clamping to the field's real min/max on `onBlur`. `partnershipCount`'s division was guarded (`(groupSize || 1)`) so a momentarily-blank field never divides by zero.

**New global CSV import**, confirmed with Russell before building: Territory/Section/Block in each row must match an *existing* label exactly (case-insensitive) — no auto-creation of missing structure, same safety rule the original per-territory import already used for Section/Block. Rather than build a second, parallel importer, the existing one (`parseRecordsCsv`, `importRecordsAction`, `CsvImportDialog`) was generalized:
- `CsvImportDialog` now takes an **optional** `territoryId`. Supplied (Territory detail page) → same behavior as before, a Territory Name column if present is ignored. Omitted (new button on the main Records page) → every row must carry its own `Territory Name`, resolved case-insensitively against `listTerritories()`, with per-territory structure fetched and cached lazily as distinct territories are encountered across the file.
- Header aliases accepted so the new field names don't collide with the original export's headers: `Name`/`Resident Name`, `Note`/`Notes`, `Territory Name`/`Territory`. `Household Members` is new, both as an import column and as a `recordsToCsv()` export column (kept import/export symmetric).
- **Address was NOT NULL with no default** — the new format has no address column at all (Plus Code is the location identifier for this format instead). Confirmed with Russell: rather than fake an address from Plus Code, made `address` genuinely optional (migration 007 gives it a `''` default, same shape as `unit`/`notes`) and updated every place that displays a record by its address — the records table (label, search, sort, delete-confirm text/aria-label), the record detail page title, and both publisher-facing (public, unauthenticated) views — to fall back to Plus Code, then `"Unlabeled record"`.
- `household_members` was threaded all the way through, not just the import path: it's a real column (migration 007, `integer`, `>= 0` check), on `TerritoryRecord`, in both Zod schemas (blank-tolerant — a preprocess step maps `''`/`null`/`undefined` to `undefined` before `z.coerce.number()`, so a real headcount of "0" isn't conflated with "not recorded"), editable via the manual Add/Edit record forms, and shown as its own column in the Records table.
- `records/queries.ts`'s `importRecords()` signature changed from `(supabase, congregationId, territoryId, rows)` to `(supabase, congregationId, rows)` — `territoryId` now lives per-row inside `ImportRow` instead of being one shared value, since the cross-territory import resolves a different territory per row.

## Verification

- `npx tsc --noEmit` clean (after clearing a stale `.next/types` reference to the already-removed `dashboard/assignments/*` route from an earlier session — unrelated to this pass).
- `npx next build` clean, all TMS routes still correctly `ƒ` (dynamic).
- **Not live-verified**: same standing limitation as every prior TMS pass this session — no Supabase credentials exist in this worktree (`ls .env*` finds nothing), and the three changed surfaces (Group Leader dashboard's QR/Assignment form, the Records page's new Import button) are all behind Supabase auth. Confirmed the dev server boots and `/territory-management-system/login` (the one DB-independent TMS route) renders with zero console errors, proving no import/syntax breakage — but the actual QR size, the mobile-typing fix, and a real CSV import round-trip are unverified against real data.

## Next Recommended Task

1. Russell runs `007_optional_address_household_members.sql` in the TMS Supabase project's SQL Editor.
2. Live-verify on a real mobile device/viewport: the QR code renders at the larger size and still scans correctly; "Group size" can now be typed into normally (clear + type a 2-digit value); a real CSV using the new global import (with a couple of deliberately-wrong Territory/Section/Block names to confirm the per-row error messages) imports correctly and the resulting records show Household Members and fall back to Plus Code when Address is blank.
3. After that: the standing next-step from every prior TMS checkpoint remains a full live pass through the rest of the Administrator dashboard (Territories, Reports, Settings) against real data.
