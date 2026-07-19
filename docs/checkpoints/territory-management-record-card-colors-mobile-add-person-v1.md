# Record Card Full-Tint Colors + Mobile Add Person Inline — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Two follow-ups from Russell's live screenshot review of the just-deployed record card redesign / mobile action panel.

## Files Modified
- `src/components/territory-management-system/publisher/PublisherRecordDetailView.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx`

## Summary of Changes

**Record card colors.** The prior session's redesign only tinted the small address-icon badge by status tone, keeping the card itself white — Russell's screenshot showed this wasn't matching what he expected. Changed `cardTone()`'s application from the icon wrapper to the whole card (background + border, replacing the shared `Card`/`panelClass` white/gray-border with the tone's own colors directly, since appending conflicting Tailwind utility classes on top of `panelClass` isn't reliably override-safe). The icon itself is now a fixed neutral white circle with a blue home icon, decoupled from tone, so it doesn't disappear when the card background is the same hue. Address heading, Sec/Blk line, household line, and the "linked contacts" link now read `tone.primary`/`tone.secondary` instead of hardcoded navy/slate/blue, so text stays legible against every tone (verified: white text on the dark Bible Study blue, navy text on the four lighter tones).

**Household label + one-line layout.** "N household member(s)" shortened to "N household"/"N households" (Russell's explicit choice, after I flagged that this changes the meaning from "people in this household" to "number of households" — he confirmed he wants it anyway). Combined with the "linked contacts" link onto a single line separated by "·", matching his reference mockup — was previously two lines via `flex-wrap`.

**Mobile Add Person now inline.** Previously the mobile grouped Pass/Unlocated/Correction/Add Person panel's 4th button called `onAddSibling` directly, navigating to a separate top-level view (`PublisherWorkspaceApp`'s `addRecord` view rendering the lightweight `AddHouseholdMemberForm`) — inconsistent with the other three buttons, which open an inline form in place with a close-X. Added a new `onAddHouseholdMember` prop (payload-carrying, distinct from the existing navigate-away `onAddSibling` which desktop's separate full-width button still uses) and a new `mobileAction: 'addPerson'` state value that renders `AddHouseholdMemberForm` inline with the same `CloseMobileActionButton` pattern. Wired in `PublisherWorkspaceApp.tsx` to call the existing `handleAddRecord` directly with a `redirectTo` of the same detail view, so no navigation occurs and the panel auto-collapses back to the 4-button row on submit.

## Verification
- `npx tsc --noEmit` and `npx vitest run` (56/56) clean.
- Live-verified via a temporary scratch route (removed before finishing): all 5 status tones (default, Potential Bible Study, Bible Study, Unlocated, Do Not Call) screenshot-confirmed — full card tint, text contrast, one-line household/linked-contacts text. Mobile Add Person flow screenshot-confirmed at 375px width: tapping opens the inline form (no navigation), the X closes it back to the 4-button row, and a real submit fired `onAddHouseholdMember` (not `onAddSibling`) with the correct payload, then auto-closed.
- Committed and pushed to `main` (`4c0e225`), deployed via Vercel auto-deploy on push.

## Remaining Work / Notes
- A separate question came up mid-session about whether ending a Ministry Partner's session on a device that shares the exact same assignment link (`claim_token`) with another device also ends it there — confirmed this is already true architecturally (one `partnerships` row per `claim_token`, `sessionEnded` computed fresh from that row on load) with no code change needed. Caveat: TMS is offline-first, so the second device only reflects the ended state on its next fresh load/sync, not instantly/live — Russell confirmed that's acceptable.
- Desktop's separate "Add Another Person Here" full-width button is unchanged — still uses `onAddSibling`'s navigate-to-a-different-view path. Not in scope for this batch.

## Known Issues
None identified this pass.
