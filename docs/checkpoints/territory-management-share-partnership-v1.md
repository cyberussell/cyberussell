# Share Partnership With Ministry Partner — v1

**Date:** 2026-07-17
**Product:** Territory Management System (TMS)
**Feature:** Let a claimed Ministry Partner hand a second phone a direct QR/link to their own already-claimed partnership, so a companion can work the exact same list on their own device instead of risking a tap on a different, unclaimed card on the "Select your Partner" page (which would have created a genuinely separate, overlapping list).

## Investigation first

Before writing any code, traced how the existing claim/read-only mechanism works (`PublisherWorkspaceApp.tsx` ~105-121, `offline/claim.ts`): a device with no local claim of its own that opens a partnership URL which is already claimed (`claimed_at` set) silently binds to it too and gets full write access — `readOnly` only ever triggers when a device tries to open a *different* partnership than the one it's already bound to. Combined with the Group Leader's existing "Group size" control (`AssignmentForm.tsx`/`OverflowAssignmentForm.tsx`) and the "Partner Name" field already being labelled for two names, sharing one partnership across two devices was already fully supported — the only real gap was that there was no reliable way to get the second device onto the *correct* partnership URL instead of the general batch QR (which lands on a card-picker where an unclaimed card creates a new, separate partnership).

## Files Modified
- `src/components/territory-management-system/publisher/SharePartnershipCard.tsx` (new)
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

**New `SharePartnershipCard.tsx`:** client component, rendered only once a partnership is claimed (`!readOnly`, same gating as `PartnershipRenameForm`). Builds the direct URL to this exact partnership (`.../assignment/{batchToken}/{partnershipToken}`, same hardcoded `APP_ORIGIN` pattern as the existing batch-level `assignment/qr.ts`, duplicated here without the `server-only` guard since this needs to render client-side), generates a QR code for it client-side via the already-installed `qrcode` package (`QRCode.toDataURL` in a `useEffect`), and offers a "Copy Link" button (`navigator.clipboard.writeText`, same pattern already used elsewhere in this codebase — `ShareButtons.tsx`, `ShareSiteButton.tsx`, etc.).

**Wire-up in `PublisherWorkspaceApp.tsx`:** one line added directly after the existing `PartnershipRenameForm` render, same `!readOnly` gate:
```tsx
{!readOnly && <SharePartnershipCard batchToken={batchToken} partnershipToken={partnershipToken} />}
```

No database/schema changes, no changes to `claim.ts`, the auto-join effect, or the `readOnly` computation — all of that already did the right thing once a device lands on the correct partnership URL, which is exactly the gap this closes.

## Remaining Work
None — this was scoped as a single, self-contained UI addition on top of already-correct claim/join logic.

## Known Issues
`npx tsc --noEmit`, `npx vitest run` (52/52), and `npx next build` all clean. **Not live-verified in a browser this session** — the Browser pane's preview tooling was unavailable for the full session (a safety-classifier outage affecting `preview_start`/`ScheduleWakeup`, confirmed via repeated retries, not specific to this change) after a temporary scratch route (`/dev-scratch-share-partner`, mock claimed `PartnershipWorkspace`) was already built and ready to exercise. The scratch route was removed before finishing rather than left in the tree. Verified instead by static review: the new component only touches its own local state (QR data URL, copied flag) and doesn't interact with `workspace`/`readOnly`/claim logic at all, and the join behavior it relies on is pre-existing, unmodified code already covered by this product's `readOnly`/claim design.

## Next Recommended Task
Russell: live-verify end-to-end — generate a real batch with Group size 2+, claim a partnership on one phone, confirm the "Share with Partner" QR/link appears, open that link on a second phone (or a private/incognito window to simulate a fresh device), confirm it opens as a full editor (not read-only) against the identical record list, and confirm both devices can log visits without a second partnership being created. Also spot-check "Copy Link" actually copies (some mobile browsers require a real user gesture, which the button provides). No migrations pending — safe to commit/deploy once spot-checked.
