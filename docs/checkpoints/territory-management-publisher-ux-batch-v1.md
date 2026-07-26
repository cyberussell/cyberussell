# Publisher UX batch: claim landing, end-ministry rework, search-area lockdown, quick notes — v1

**Date:** 2026-07-26
**Product:** Territory Management System (TMS)
**Feature:** Six requests from Russell in one session, all publisher-workspace-facing.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/publisher/PartnershipRenameForm.tsx`
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx`
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx`
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/MarkMovedForm.tsx`
- `src/components/territory-management-system/publisher/PublisherQuickNoteForm.tsx` (new)
- `src/lib/territory-management-system/modules/assignment/schema.ts`
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/lib/territory-management-system/modules/offline/db.ts`
- `src/lib/territory-management-system/modules/offline/sync.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/app/territory-management-system/dashboard/notes/page.tsx`
- `territory-management-system/migrations/040_publisher_quick_notes.sql` (new, **NOT yet applied live**)
- Deleted: `src/components/territory-management-system/publisher/SearchScopeRecordDetailView.tsx` (dead code once its only view case was removed)

## Summary of Changes

1. **Land on the records list after claiming, not Home.** `handleRename` now sets `view: 'list'` the first time a partnership is claimed (`claiming` was already computed locally, just wasn't acted on). A later rename of an already-claimed partnership doesn't navigate.

2. **End-ministry rework.** Real bug found: ending ministry from the Home tab always called `handleTerminate()` (stamps `ended_early_at`) even when every record was already done, because Home's action never checked completion. The List tab already did this right (`goToNote()` directly once `allDone`, no early-out stamp). Replaced the `SlideToConfirm` swipe gesture on both Home and List tabs with a plain button + the existing branded `ConfirmModal`, gated on `allDone` (already DNC-aware — a DNC-locked record's group already counts as done in `isPartnershipAllDone`, confirmed with Russell before building, no logic change needed there) and `isSearchOnlyPartnership`: done-or-search-only → "End My Ministry" (clean `finished_at` only), not done → "End My Ministry Early" (`ended_early_at` + force-completes stragglers, same as before). Removed the List tab's now-redundant slide entirely (the existing "All records done" banner's button already covers that case).

3. **Search-area records list locked down.** Per Russell's screenshot: a publisher searching an overflow area could tap an existing (not-theirs) record into a full detail view with a "Recommend a Correction" form — removed entirely. `SearchScopeRecordsList.tsx` cards are no longer tappable; each gets a "Map" button (existing `google.com/maps/search` URL pattern) gated behind a `ConfirmModal` stating the record belongs to whichever partner is actually working the area. Deleted the now-unreachable `searchScopeDetail` view, `handleRecommendSearchScopeCorrection` handler, and `SearchScopeRecordDetailView.tsx`. **Left alone, in case Russell wants it removed later too:** the `recommendSearchScopeCorrection` queue-item type/offline-sync case and its server action still exist — nothing enqueues that type anymore, but purging the full offline-queue chain felt like more surface than this task asked for.

4. **Fixed the missing Save button.** `PartnershipRenameForm.tsx` laid input and Save side-by-side (`flex items-end gap-3`) — on a narrow phone with the keyboard up there was no reliable room for the button (matches Russell's screenshot exactly). Changed to stacked (`flex-col`, button full width) so Save always renders on its own line.

5. **Two ways to add a record + two ways to recommend Unlocated.** New shared `PublisherQuickNoteForm.tsx` (Name required, Phone optional, Notes required) feeds a brand-new `partnership_quick_notes` table (migration 040) — no territory/section/block, admin-only visibility like the existing `admin_note`, but a partnership can send any number of these (unlike the single end-of-ministry note). Surfaced in two places, both **additive**, neither replacing the existing structured form:
   - "My Added Records" tab: existing button relabeled "Add Someone Found in Today's Territory" (clarifying it's within that day's covered territory), new second button "Send a Quick Note to Admin".
   - `MarkMovedForm`'s "Unlocated" chooser: new 4th button "Quick Note to Admin (no location details)" alongside the untouched Update Current Resident / Recommend New Location / Recommend for Admin Removal. Recommend New Location's structured address/Plus Code/territory-section-block fields are **unchanged** — Russell confirmed twice (reversing an earlier answer) that this stays exactly as-is so Admin can still auto-apply the move; the quick note is purely an additional option for when the publisher doesn't have those details.
   - Both entry points route through the same `handleSendQuickNote` → new `sendQuickNoteAction` (mirrors `submitPartnershipNoteAction`'s shape) → `addPartnershipQuickNote`, wired into the offline queue (`quickNote` item type, `offline/db.ts` + `offline/sync.ts`) same as every other publisher mutation.
   - Admin `/dashboard/notes` page rewritten to merge `partnerships.admin_note` entries and `partnership_quick_notes` rows into one newest-first list, tagging quick notes with a small "Quick Note" badge and showing Name/Phone.

6. **Screenshot #2 (Group Leader Home dashboard) investigated, not a bug.** Confirmed it's the real, current `GroupLeaderTabs.tsx` — no scratch/leftover dev route exists under `src/app/territory-management-system/`. No code change made.

## Remaining Work
- **Migration 040 confirmed applied live by Russell** — the quick-note feature (item 5) is unblocked in production.
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101 passing, same file set as before this batch), and `npx next build` (clean, all TMS routes present).
- Same pre-existing blocker as the prior session: `git push` still fails (`origin`'s HTTPS remote has a rejected plaintext PAT — see memory `project_git_remote_token.md`). This batch's commits (once made) will sit on local `main` same as the prior 3.

## Known Issues
- The dead `recommendSearchScopeCorrection` offline-queue/server-action chain (see item 3 above) is now unreachable from the UI but not removed — harmless, flagged for a future cleanup pass if Russell wants it gone.
- `PublisherBottomMenu`'s active-tab highlighting has a pre-existing gap (not introduced by this batch): `view === 'addRecord'` was already allowed in its type union but never actually matched by the "Record" tab's active check, so visiting Add Record shows no active tab highlighted. The new `addQuickNote` view was added the same way (allowed, not actively highlighted) for consistency with the existing gap rather than fixing it as a drive-by.

## Next Recommended Task
Migration applied — Russell now live-verifies all six items on a real device: claim → lands on records list; End My Ministry vs. End My Ministry Early labels/behavior at both completion states; search-area card's Map button + ownership popup; Save button visible with the keyboard open; both new quick-note entry points end up on the admin Notes page correctly tagged. Then commit.
