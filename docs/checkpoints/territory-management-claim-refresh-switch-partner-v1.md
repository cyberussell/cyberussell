# Claim unassigned record, full-refresh buttons, wrong-partner switch fix — v1

**Date:** 2026-07-27
**Product:** Territory Management System (TMS)
**Feature:** Three requests from Russell, following up on the Search tab shipped earlier this session.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/queries.ts`
- `src/app/territory-management-system/actions/publisher.ts`
- `src/components/territory-management-system/publisher/PublisherSearchPanel.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`

## Summary of Changes

1. **Claim an unassigned record from Search — instant, no approval.** New `claimUnassignedRecord` query (re-verifies server-side the record is still actually unassigned, then a plain `partnership_records` insert — same mechanism a regular assignment uses, sequenced after the partnership's existing records) + `claimUnassignedRecordAction`. `PublisherSearchPanel.tsx`'s "Not assigned today" results now get an "Add to My List" button behind a confirm modal. Since this reuses the same `partnership_records` table every dashboard/stat already reads from (Group Leader stats, Admin views), nothing being "currently worked on" needs separate wiring to show up correctly elsewhere — confirmed by construction, not a new parallel data path.

2. **Full-refresh button on both Home tabs.** Publisher workspace and Group Leader dashboard both only ever read their initial data prop once (`useState(initialWorkspace)` / equivalent) — a soft Next.js `router.refresh()` would silently fetch fresh data and then throw it away, since neither component re-syncs state when the prop changes. Used a real `window.location.reload()` instead, which forces a genuine fresh server round-trip for everything (records, batch partners, incoming requests, GL stats). Publisher's button is disabled while offline (a full reload needs a real network round-trip to render the page at all, unlike the existing Sync button which just flushes the local queue); Group Leader's has no such concern.

3. **Fixed being stuck on a wrongly-tapped, already-claimed partnership.** Traced the actual bug: a device with no local claim yet silently auto-binds itself to WHATEVER partnership it opens that already has `claimed_at` set (existing behavior, intended for a real pair's second phone joining the same partnership) — but there was no in-workspace way back to "Select Ministry Partner Number," and once bound, tapping a *different* partnership from that list would render read-only (`deviceClaim !== token`). Added a "Wrong Ministry Partner? Switch" link on the workspace Home tab (hidden only while `readOnly`, since that already means this device is bound elsewhere and just viewing) that clears **only this device's own local claim** (`clearClaimedPartnershipToken`, already existed, used by the batch-landing page's Release slider) and navigates back to the batch-landing page. Deliberately does **not** touch the partnership's server-side `claimed_at`/name — if this was actually a real pair's in-progress session, it stays completely untouched; the existing `ReleaseAssignmentSlider` (zero-completed-records eligibility) remains the only way to reset that, unchanged.

No migration needed for any of the three.

## Remaining Work
- Not live-verified in a real browser (no TMS credentials in this sandbox) — verified via `npx tsc --noEmit` (clean), `npx vitest run` (101/101, unchanged), `npx next build` (clean).
- Migration 042 (from the earlier Search-tab checkpoint this session) still needs to be applied live before the Search tab and this batch's claim feature both work in production.

## Known Issues
None found.

## Next Recommended Task
Russell applies migration 042 (if not already done), then live-verifies: claiming an unassigned record via Search actually shows up after hitting the new Refresh button; the Refresh button on both Home tabs actually reloads with fresh data; and the specific repro for item 3 — scan a QR, deliberately tap an already-"In Progress" partnership card, confirm "Wrong Ministry Partner? Switch" appears and correctly returns to the Select Partner list without disturbing the real partner's session.
