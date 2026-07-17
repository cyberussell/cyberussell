# Publisher Workspace Home/List Nav Split — v3 (slide-to-confirm, header polish)

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Third round of feedback on [[territory-management-publisher-home-list-nav-v2]] from 3 more screenshots: (1) center/enlarge the "My Added Records" header; (2) center/enlarge the List tab's header ("Assigned Contact Records"/"Area To Search"), with the territory/section subheading lines centered but not otherwise restyled; (3) move "Release Assignment" off the Home tab entirely onto the batch-landing "Select your Partner" page, and give it an iPhone-style slide-to-confirm design, big and prominent; (4) convert "Early Out" (Home tab) to the same slide-to-confirm design; (5) rename the Home tab's map-toggle pills — "Assigned Records" → "Live Map", "Share" → "Share To" (the bottom-nav "Assigned Records" tab itself is untouched, only the map-toggle pill of the same old name).

## New component: SlideToConfirm
`src/components/territory-management-system/publisher/SlideToConfirm.tsx` — a self-contained iOS-style drag-to-confirm control (pointer events, not the browser's native HTML5 drag). Dragging the circular handle past 85% of the track width fires `onConfirm` (awaited, shows a spinner + `confirmingLabel` while pending); releasing short of that snaps back to the start. The drag gesture itself is treated as sufficient deliberate confirmation — no follow-up branded modal — since that's the entire point of the iOS slide-to-unlock/power-off pattern: a gesture that's hard to trigger by accident replaces a tap + confirm dialog. Takes a `tone` prop (`'primary'` blue / `'danger'` red) for the two use sites below.

## Release Assignment relocated
- New `src/components/territory-management-system/publisher/ReleaseAssignmentSlider.tsx` — client component added to the batch-landing page (`assignment/[batchToken]/page.tsx`). Reads this device's claimed partnership token from local storage (`getClaimedPartnershipToken`), matches it against the server-fetched `batch.partnerships` (`PartnershipWithProgress[]`, already includes `claim_token`/`completedCount`/`ended_early_at`/`finished_at`), and renders the slider only when that match is genuinely eligible (claimed, not ended, zero completed visits — the same rule `releasePartnershipAction` re-checks server-side, so this is a display gate only, not the real guard). On a completed slide: calls the existing `releasePartnershipAction`, clears the local claim, and `router.refresh()`s the page (which re-fetches the partnership list — no separate navigation needed since we're already on the batch-landing page, unlike the old Home-tab version which had to `router.push` there after releasing).
- `PublisherWorkspaceApp.tsx` had the Release button, its `canRelease` computation, `handleRelease`, `releasing` state, the `release` `ConfirmModal`, and the now-unused `useRouter`/`clearClaimedPartnershipToken`/`releasePartnershipAction` imports all removed — that logic now lives solely in `ReleaseAssignmentSlider`.

## Early Out converted
The Home tab's `!readOnly` button group is now just `<SlideToConfirm label="Slide for Early Out" tone="danger" onConfirm={handleTerminate} />` — same `handleTerminate` function as before, just invoked directly from the slide instead of via `ConfirmModal`'s `terminate` branch (also removed, along with the now-unused `terminate` arm of the `confirmDialog` union — only `deleteAddedRecord` still uses `ConfirmModal`).

## Header polish
- "My Added Records": `text-center text-xl font-bold`.
- List tab's "Assigned Contact Records" / "Area To Search": both wrapped in a `text-center` container, header itself `text-xl font-bold`; the territory/barangay (and, for search scope, section/block) lines underneath stay their original `text-xs text-slate-500` sizing — centered only, not resized, per the ask.
- Home tab map-toggle pill labels: `'Assigned Records'` → `'Live Map'` (also renamed the single-tab fallback heading `"My Assigned Records Map"` → `"Live Map"` for consistency), `'Share'` → `'Share To'`.

## Verification
`npx tsc --noEmit`, `npx vitest run` (52/52 — one unrelated flaky failure on first run in `appointment-system/slots.test.ts`, a live-DB `afterAll` hook timeout in a completely different product, passed clean on retry), `npx next build` all clean. Live-verified via a temporary scratch route (`/dev-scratch-tms-nav3`, mock claimed workspace + mock `PartnershipWithProgress[]`, removed before finishing):
- Home tab: centered "Live Map | Share To" toggle pills, big red "Slide for Early Out" bar (no Release button).
- Confirmed the drag mechanics precisely: a `left_click_drag`-driven test wasn't sufficient to trigger the browser tool's own drag simulation reliably, so verified directly via dispatched `PointerEvent` sequences instead — a partial drag (under 85%) correctly snaps back with no side effect, and a full drag correctly fires `onConfirm` (confirmed via the Early Out slider, which doesn't need live TMS Supabase credentials unlike Release — it advanced straight to the "Leave a Note for the Admin?" screen).
- Batch-landing mock: `ReleaseAssignmentSlider` correctly picked up the claim `PublisherWorkspaceApp` wrote to local storage on mount and rendered `Slide to Release "Allo and me"`. Couldn't verify the actual server round-trip (this dev environment has no live TMS Supabase credentials, a standing limitation noted in every prior TMS checkpoint) — the drag-to-85%-then-call-server-action path is code-reviewed but not live-round-tripped.
- List tab: "Assigned Contact Records" now centered/bold/larger with a centered "Q-11 — Santos Quezon" subheading underneath.
- "My Added Records": centered/bold/larger header confirmed.

## Follow-up fix in the same round: batch-landing nav bar was wrongly removed entirely
Russell corrected a misread from [[territory-management-publisher-home-list-nav-v2]]: "Nav bar at the bottom, missing" on the batch-landing page was a bug report, not confirmation that removing it entirely was correct. The real rule: no nav bar while nothing is claimed yet (straight off the QR scan), but once a partnership is claimed on this device, the same nav bar should appear. Recreated `BatchLandingBottomMenu.tsx` (previously deleted in v2) — now reads the local claim via `getClaimedPartnershipToken` and renders `null` until one exists; once claimed, shows Home/All Partners (active, since that's this page)/Assigned Records/My Added Records, all linking into the claimed partnership's workspace URL except "All Partners" (icon set matches the current `PublisherBottomMenu`, not the old Download/Sync-era one). `assignment/[batchToken]/page.tsx` padding restored to `pb-24` and the component wired back in.

## Follow-up in the same round: hide Early Out / Sync once the session is over
Russell's ask: once a ministry session has ended (either via Early Out or a normal Sync & Finish) and everything's synced, the Home tab's "Slide for Early Out" and top-bar Sync button shouldn't still be sitting there.
- Early Out: `{!readOnly && !sessionEnded && <SlideToConfirm .../>}` — `sessionEnded` (`Boolean(workspace.finished_at || workspace.ended_early_at)`) already existed for other gating, just newly applied here.
- Sync button: hidden specifically when `sessionEnded && pendingCount === 0 && failedCount === 0` — i.e. only once there's genuinely nothing left to sync, not merely because the session ended (a failed/still-pending item after ending should stay retryable). Download stays visible either way (still useful for offline reference) and now takes the full row width once Sync disappears, since they share a `flex` row.

## Remaining Work
None — scoped to the 3 screenshots' asks plus the batch-landing nav correction and this end-of-session cleanup. No migrations.

## Next Recommended Task
Not committed. Russell live-verifies on a real batch: the two slide-to-confirm gestures feel right on an actual phone (drag distance/threshold tuned against a desktop-simulated pointer sequence, not a real touchscreen), and — most importantly, since it's the one path this session couldn't round-trip without live credentials — that sliding "Release Assignment" on the batch-landing page actually releases the partnership and the card list updates to "Unclaimed". Then commit + deploy at Russell's request.
