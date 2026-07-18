# Overflow QR Panel Fix, Status-Help Audit, Solid Card Tones — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** 3 items from a screenshot review of the live Group Leader dashboard.

## 1. Overflow QR panel caption color
Russell's screenshot showed the overflow QR panel not fully black/white — investigated and found production was already running the correct commit (confirmed via Vercel: live deployment built from `d7a8836`, the same commit containing the black-panel styling). The one real gap: `GroupLeaderTabs.tsx`'s caption ("Valid for today only…") used `text-slate-300` (light gray) instead of pure white, the one line that didn't match "other font colors will be white." Changed to `text-white`. Everything else (black panel via `isOverflow ? 'border-black bg-black' : ''`, white heading, `#60A5FA` blue link, inverted white-on-black QR image itself via `qr.ts`'s `darkColor`/`lightColor` params) was already correct.

## 2. Selectable-status vs. help-text audit
Cross-checked `getSelectableResults()`'s actual narrowing (`records/schema.ts`) against every claim in `PublisherStatusHelp.tsx`. Found one real mismatch: the Bible Study entry claimed the next-visit choices are "Progressive BS, No Positive Response, o Moved," but `PublisherVisitLogForm.tsx` always filters `'moved'` out of this dropdown (`.filter((r) => r !== 'moved')`) — Moved is handled through the separate forced Mark-as-Moved flow instead, so a publisher would never actually see it as a Status option there. Fixed the copy to drop the false claim and point to the separate Moved entry instead. Everything else audited clean — Potential BS/Started Bible Study/Do Not Call narrowing all match exactly what's actually offered.

## 3. Solid card-tone colors (DNC red / Bible Study green / Potential BS yellow)
`getRecordCardTone()` (`records/schema.ts`) previously lumped the whole Bible-Study family (Potential BS through Progressive BS) into one green tone. Split out a new `'potential_bible_study'` tone, checked before the general family check. `AssignedRecordsList.tsx` and `PublisherRecordDetailView.tsx` (both already shared this function) — their local tone-to-className mapping changed from pastel single-string returns to a `{ container, primary, secondary }` object, since solid backgrounds need matching text colors, not just a border/background swap:
- **Do Not Call** — solid red (`bg-red-600`), white primary text, red-100 secondary.
- **Bible Study family** (Started Bible Study / Bible Study / Progressive BS) — solid green (`bg-emerald-600`), white primary, emerald-100 secondary.
- **Potential BS** — solid yellow (`bg-yellow-400`), black primary, black/70 secondary (dark text needed for contrast on yellow, unlike the other two).
- **Moved** and **default** tones left untouched (pastel amber / plain white) — not part of this request.

Every text line inside both components' toned card (address, resident name, section line, household members, notes, the "Do Not Call — locked until…" line, "Passed by…" line) now derives its color from the tone instead of a hardcoded slate/red/amber shade, so nothing goes unreadable against the new solid backgrounds.

## Files Modified
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- `src/components/territory-management-system/publisher/PublisherStatusHelp.tsx`
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean. Live-verified via a temporary scratch route (`/dev-scratch-tms-tones`, removed before finishing) with mock records covering all three new/changed tones plus the untouched default — screenshots confirmed solid red/green/yellow render correctly on both the list and the detail card, with all text legible against each background. The QR panel caption fix was not separately screenshot-verified (trivial one-line color change matching an already-verified pattern) — confirmed via Vercel that production is already running the commit containing the rest of the panel styling.

## Remaining Work
None. No migration needed (all changes are UI/copy).

## Known Issues
None identified.

## Next Recommended Task
Committed and pushed at Russell's request ("Deploy if done"). Russell spot-checks live: the overflow QR panel's caption is now white (not gray), a real Do Not Call / Bible Study / Potential BS record shows the new solid colors correctly in both the Assigned Records list and the single-record detail card, and the Bible Study help text's "Moved" wording change reads correctly in the publisher workspace Home tab.
