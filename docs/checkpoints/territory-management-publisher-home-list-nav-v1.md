# Publisher Workspace Home/List Nav Split — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Russell gave 3 housekeeping requests for the publisher workspace bottom nav after live use: (1) move Download/Sync from the bottom nav into a top bar; (2) add a "Home" bottom-nav tab holding the Partner name card, Maps, and Share with Partner (in that order), leaving the "Assigned Records" (List) tab to show only the actual work list; (3) apply the same split to overflow-generated (search-area) assignments too.

## Investigation / decisions confirmed via AskUserQuestion before editing
- **Release/End Ministry buttons** → moved to the Home tab, grouped with the name card/maps/share (partnership-management actions, not list content).
- **Standalone "Search Area" bottom-nav tab** → removed entirely, folded into the List tab: for an overflow partnership that has chosen a search area (`workspace.searchScope`), List now shows an "Area To Search" header (Territory No. + Barangay Name, then Section + Blocks) followed by the existing read-only records-in-area list. If that same partnership also happens to have real assigned records (e.g. from a "Pass to Another Partner"), an "Assigned Contact Records" section renders above it — the two are not mutually exclusive.
- **Multi-territory header** → List shows every territory in `workspace.territories` (No. + Barangay), not just the first.

## Files Modified
- `src/lib/territory-management-system/modules/assignment/types.ts` — `PartnershipWorkspace.territories` widened with `description` (the barangay name), mirroring what `PartnershipRecordDetail.record.territory` already carried.
- `src/lib/territory-management-system/modules/assignment/queries.ts` — `getPartnershipByToken`'s `assignment_batch_territories` select/type widened to fetch `description` alongside `id`/`name`/`map_image_url`.
- `src/components/territory-management-system/publisher/PublisherBottomMenu.tsx` — Download/Sync (and all their props: `downloaded`, `onDownload`, `online`, `pendingCount`, `failedCount`, `syncing`, `onSync`) removed entirely; `showSync` gone. New `home` nav item (`onGoToHome`) using lucide's `Home` icon, placed first. `onGoToSearchScope`/`showSearchScope` removed — no more standalone Search Area tab. `view` union changed from `'list' | 'detail' | ... | 'searchScope' | 'searchScopeDetail'` to `'home' | 'list' | 'detail' | ...` (searchScope states no longer reach this component — see below).
- `src/components/territory-management-system/publisher/SearchScopeRecordsList.tsx` — new optional `showAreaLabel` prop (default `true`) so the parent's own "Area To Search" header (which now carries the Section/Block line) doesn't get a duplicate line repeated directly underneath.
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` — the bulk of the change:
  - `View` union gained `{ name: 'home' }`, lost `{ name: 'searchScope' }` (its content is now conditionally part of `'list'`); `{ name: 'searchScopeDetail' }` kept (still reached by tapping a row inside List's "Area To Search" section, same as `'detail'` is reached from the assigned-records list).
  - Initial view state changed from `'list'` to `'home'`.
  - New top-of-workspace Download/Sync bar (two side-by-side buttons, badge on Sync for pending+failed count), shown whenever `showSessionChrome` is true (same visibility rule the old bottom-nav buttons used), rendered above the read-only banner so it's present regardless of which tab is selected.
  - The "not claimed yet" (rename) prompt and the overflow "choose your search area" gate (`ChooseSearchScopeForm`) now render whenever `view.name` is `'home'` or `'list'`, blocking both tabs identically until satisfied — same full-takeover behavior as before, just no longer implicitly tied to a single `'list'` view name.
  - **Home tab** (`view.name === 'home'`): Partner name card → Maps toggle (Territory/Assigned Records/Search Area pills, unchanged internally) → Release/End Ministry buttons → Share with Partner card (last).
  - **List tab** (`view.name === 'list'`): if `workspace.records.length > 0`, an "Assigned Contact Records" section (header + every assigned territory's No./Barangay + the pre-existing "All assigned records are done!" Sync & Finish banner + `AssignedRecordsList`). If `workspace.searchScope` is set, an "Area To Search" section (header + that territory's No./Barangay + "Section X — Block(s) Y" + the existing-records list via `SearchScopeRecordsList` with `showAreaLabel={false}`). If neither applies, a simplified generic empty state (dropped the old copy's confusing "This is a search assignment" wording that appeared even for non-overflow batches).
  - Two `setView({ name: 'searchScope' })` call sites (post-choose-scope, post-recommend-correction) now target `'list'`.
  - Bottom-nav `view` prop mapping extended to also fold `'searchScopeDetail'` into `'list'` for active-tab highlighting (previously it passed the raw name straight through to a component that had its own case for it).

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52), `npx next build` all clean. **Live-verified this session** — Browser pane preview tooling worked (no repeat of the prior session's outage). Built a temporary scratch route (`/dev-scratch-tms-nav`, mock claimed `PartnershipWorkspace`, removed before finishing) with a toggle between a normal and an overflow/search-scope partnership. Confirmed:
- Top Download/Sync bar renders above everything else on both tabs; bottom nav no longer shows those two icons.
- Home tab (normal partnership): name card → maps (defaulted to Assigned Records Map since no map image in the mock) → Release/End buttons → Share with Partner card, in that exact order.
- List tab (normal partnership): "Assigned Contact Records" header, "Q-11 — Santos Quezon" subheading, then just the one assigned record card — no maps, buttons, or share card.
- Toggled to overflow: Home tab's map toggle correctly offered "Search Area Map"; List tab showed "Area To Search" → "Q-11 — Santos Quezon" → "Section A — Blocks 2, 5" → "Existing Records in This Area" (no duplicate Section/Block line) → the one mock existing record.
- Tapped into that existing record: `SearchScopeRecordDetailView` (Recommend a Correction) opened correctly, with the bottom nav's "Assigned Records" icon still shown active — confirms the `searchScopeDetail` → `'list'` active-tab mapping works.

## Remaining Work
None — scoped exactly to the 3 requests. No database changes beyond the additive `description` field already present on the underlying `territories` table (no migration needed, purely a wider `select`).

## Next Recommended Task
Not committed. Russell live-verifies on a real claimed partnership (ideally one real normal batch and one real overflow batch with a chosen search area): confirms Home/List split, Download/Sync top bar, and the "Area To Search" header wording read correctly on an actual phone screen. Then commit + deploy at Russell's request. Also worth deciding, next time overflow is touched, whether "Assigned Contact Records" + "Area To Search" stacking on one List tab reads well in the rare case a passed record lands on an overflow partner who also has a search scope — untested against real data since it's a rare combination.
