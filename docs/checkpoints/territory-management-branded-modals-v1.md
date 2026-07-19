# Branded confirm/prompt modals + assignment-panel scroll-into-view — v1

**Date:** 2026-07-19
**Product:** Territory Management System (TMS)
**Feature:** Replace every native `window.confirm()`/`window.prompt()` popup across TMS with a TMS-branded modal, and fix the Group Leader Home tab's "Generate New"/"Create Auxiliary Groups" toggles silently expanding content below the fold.

## Files Modified
- `src/components/territory-management-system/ConfirmModal.tsx` (new — generalized from the publisher-only version, `publisher/ConfirmModal.tsx` deleted/moved here)
- `src/components/territory-management-system/PromptModal.tsx` (new)
- `src/lib/territory-management-system/hooks/useConfirm.tsx` (new)
- `src/lib/territory-management-system/hooks/usePrompt.tsx` (new)
- `src/components/territory-management-system/dashboard/ConfirmDeleteButton.tsx`
- `src/components/territory-management-system/PartnershipList.tsx`
- `src/components/territory-management-system/RecordApprovalActions.tsx`
- `src/components/territory-management-system/AssignmentForm.tsx`
- `src/components/territory-management-system/GroupLeadersManager.tsx`
- `src/components/territory-management-system/publisher/PublisherWorkspaceApp.tsx` (import path only)
- `src/components/territory-management-system/GroupLeaderTabs.tsx`

## Summary of Changes
A publisher-only `ConfirmModal` already existed (built earlier specifically because `window.confirm()`'s "www.cyberussell.com says" browser chrome read as unbranded/untrustworthy to a publisher in the field). Russell asked for the same treatment everywhere else, with the icon reflecting the action: caution (amber `AlertTriangle`) for destructive/hard-to-reverse actions, info (blue `Info`) for a plain heads-up.

- Moved `ConfirmModal` to a shared top-level location and added a `variant: 'caution' | 'info'` prop.
- Added `PromptModal` (text-input equivalent) for the one `window.prompt()` in the product (Group Leader password reset).
- Added `useConfirm()`/`usePrompt()` — Promise-based hooks matching `window.confirm()`/`window.prompt()`'s own call shape (`await confirm({...})` returns boolean; `await prompt({...})` returns string|null), so every existing call site only needed `await` added plus rendering `{ConfirmDialog}`/`{PromptDialog}` once in JSX — no bespoke state machine per call site.
- Wired into every remaining native popup: `ConfirmDeleteButton` (used by territory/section/block/record deletes across 7 files — the single biggest lever), `PartnershipList`'s End Ministry, `RecordApprovalActions`' Reject, `GroupLeadersManager`'s Restore (info)/Revoke (caution)/Delete (caution)/Reset Password (prompt).
- `AssignmentForm`'s existing-assignment-replace confirm was the trickiest: `window.confirm()` is synchronous and could `e.preventDefault()` inline inside the form's `onSubmit`; a modal is async. Restructured to always `preventDefault()`, build the `FormData` from the event, gate on the modal's resolved promise when `hasExistingBatch`, then call `dispatch(formData)` directly (the `useServerAction` hook's `dispatch` already accepts `FormData`) — dropped the `<form action={dispatch}>` wiring since submission is now fully manual.
- **Also fixed**: Group Leader Home tab's "Generate New" and "Create Auxiliary Groups" toggles rendered their panel well below the fold with no scroll — added a shared ref + `useEffect` that calls `scrollIntoView({ behavior: 'smooth', block: 'start' })` whenever either toggle is picked.

## Verification
`npx tsc --noEmit`, `npx vitest run` (56/56), and `npx next build` all clean. Live-verified via a temporary scratch route (screenshotted every variant, then removed): ConfirmDeleteButton's caution modal, RecordApprovalActions' Reject caution modal, AssignmentForm's caution modal correctly gating the real submit, GroupLeadersManager's info-variant Restore modal (blue Info icon) and caution-variant Delete modal, the PromptModal's text input, and the Home tab's scroll-into-view (confirmed `window.scrollY` moved from 0 to 744 after clicking "Generate New", panel visible in the resulting screenshot). Confirmed zero remaining `window.confirm`/`window.prompt` calls anywhere in TMS.

## Remaining Work
None identified — this covered every popup found via a full-codebase grep.

## Known Issues
None identified.

## Next Recommended Task
Russell spot-checks live: every delete button across Territories/Sections/Blocks/Records, Reject on a pending record, End Ministry on a partner, generating a new assignment over an existing one, and the three Group Leader row actions (Restore/Revoke/Delete/Reset Password) all show the new branded modal instead of a native browser popup — and that clicking "Generate New"/"Create Auxiliary Groups" scrolls the panel into view.
