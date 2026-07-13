# Territory Management System — Publisher Workflow v2

**Date:** 2026-07-13
**Product:** Territory Management System (TMS)
**Feature:** Redesign of the publisher (Ministry Partner) workflow — claim-on-name-save, read-only browsing of other partnerships, an end-of-session sync/thank-you flow, early termination, and a new "Other" visit result.

## Files Modified
- `territory-management-system/migrations/005_publisher_workflow_v2.sql` (new)
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/assignment/types.ts`
- `src/lib/territory-management-system/modules/records/schema.ts`
- `src/lib/territory-management-system/modules/records/types.ts`
- `src/lib/territory-management-system/modules/offline/claim.ts` (new)
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/actions/records.ts`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherVisitLogForm.tsx`
- `src/components/territory-management-system/publisher/AssignedRecordsList.tsx`
- `src/components/territory-management-system/VisitLogForm.tsx` (admin)

## Summary of Changes

Russell asked for a redesign of how Ministry Partners claim an assignment and move through their day, confirmed via clarifying questions before building:

**Claiming, reworked.** `partnerships.claimed_at` previously auto-stamped the instant anyone opened the link. Now it's set only inside `renamePartnership` (`assignment/queries.ts`), the first time a name is actually saved — `getPartnershipByToken` no longer touches it. Until claimed, the workspace shows only the name form; the record list, maps, and add-record button stay hidden.

**Device-local single-claim + read-only browsing.** New `modules/offline/claim.ts` stores, per batch token, which one partnership a given browser/device is bound to (`localStorage`, not a DB write — no accounts exist for publishers). `PublisherWorkspaceApp` resolves this synchronously via a lazy `useState` initializer to avoid a flash of full access. Behavior: a device with no claim yet that opens an already-named partnership silently joins it as a full editor (covers two phones sharing one pair); a device that already claimed elsewhere opens any other partnership read-only (record list + detail + full visit history visible, but no rename form, no visit-log form, no add-record, no early-termination button) with a visible "Viewing X's assignment — read only" banner.

**End-of-session flow.** Once every assigned record is completed, a "Sync & Finish" banner appears in the list view → a dedicated Sync screen (reuses the existing offline queue/flush machinery, auto-retries on reconnect) → once nothing is pending or failed, auto-advances to a "Thank you for your service today!" screen with a `PartyPopper` icon.

**Early termination.** An always-visible "End My Ministry Early" button (confirm-gated) calls a new `terminatePartnershipEarlyAction` → `terminatePartnershipEarly` query, which logs a real visit with result `'undone'` for every still-unfinished record (confirmed with Russell: a real visit result, not just a status flag, so Reports reflects it was genuinely left incomplete) and stamps `partnerships.ended_early_at`. Wired into the offline queue as a new `'terminate'` item type so it works offline too, then routes through the same Sync → Thank You screens.

**New "Other" result, required note.** `VISIT_RESULTS` gained `'other'` (publisher-selectable) and `'undone'` (system-only — written only by `terminatePartnershipEarly`, deliberately excluded from both visit-log dropdowns via a new `SELECTABLE_VISIT_RESULTS` export). `logVisitSchema`/`logPublisherVisitSchema` both gained a `.refine()` requiring non-empty notes when `result === 'other'`, enforced client-side (required textarea) and server-side (both the publisher and admin forms/actions) — the admin `VisitLogForm.tsx` picked up a small local `useState` for its previously-uncontrolled result `<select>` so it could react to the choice.

**Also:** the Assigned Contact Records list now previews each record's latest visit result/note inline (`AssignedRecordsList.tsx`), reusing data (`visits[]`) that was already being fetched but not displayed there.

**New migration `005_publisher_workflow_v2.sql`**: widens the `territory_record_visits.result` CHECK constraint to include `'other'`/`'undone'`, adds `partnerships.ended_early_at timestamptz`. **Russell needs to run this in the TMS Supabase project's SQL Editor** — until then, selecting "Other" or triggering early termination will fail at the DB layer with a constraint violation.

`npx tsc --noEmit` and `npx next build` both clean. Committed (`0cd831d`), pushed and merged directly to `main` at Russell's request, deployed to production (confirmed `● Ready`).

## Remaining Work / Verification

**Not verified live this pass** — a real environment limitation, not a shortcut: this session's Vercel CLI access can list encrypted env vars but not decrypt their values (`vercel env pull` returned every encrypted var, TMS and LMS alike, as an empty string), so there was no way to seed test data or click through against the real TMS Supabase project from here. Russell confirmed he'll test live himself rather than have a SQL seed script handed over.

**Russell's next steps, in order:**
1. Run `territory-management-system/migrations/005_publisher_workflow_v2.sql` in the TMS Supabase SQL Editor.
2. Generate a fresh assignment batch from the Group Leader dashboard (or use today's if one exists).
3. Click through as a Ministry Partner: confirm the record list stays hidden until a name is saved; confirm the claim persists across a page reload; open a second, different partnership from the same device/browser and confirm it's read-only; log a visit with "Other" and confirm notes are required; complete every assigned record and confirm the Sync → Thank You flow appears; test "End My Ministry Early" on a partnership with unfinished records and confirm they show as Undone; check the color-coded record card (red for Do Not Call, green for Bible Study) still looks right with the new read-only banner layout.

## Known Issues

None identified in code review beyond the above untested-live status. The device-claim mechanism is deliberately device-local, not account-based (matches the product's no-login publisher design) — clearing browser storage or switching devices mid-batch resets a device's claim, which is expected, not a bug.

## Next Recommended Task

Russell runs migration 005 and does the live click-through above. If everything holds up, the next logical step (per the original product audit) is a full live pass through the rest of the Administrator dashboard, which is still entirely unverified against real data.
