# Territory Management System — Admin-Overridable Temporary Password — v1

**Date:** 2026-07-16
**Product:** Territory Management System (TMS)
**Feature:** Russell reported the auto-generated temp password (e.g. "gJTav9BQVsGh") was hard for less tech-savvy Group Leaders to type. Lets the Admin optionally set their own temporary password instead, both when inviting and when resetting one.

## Files Modified
- `src/lib/territory-management-system/modules/groupLeaders/schema.ts` — `inviteGroupLeaderSchema` gained an optional `tempPassword` field (blank → auto-generate, same 8-character minimum as every other password in this product).
- `src/lib/territory-management-system/modules/groupLeaders/queries.ts` — `inviteGroupLeader`/`resetGroupLeaderPassword` both accept an optional custom password, falling back to the existing `generateTempPassword()` when not provided.
- `src/app/territory-management-system/actions/group-leaders.ts` — `inviteGroupLeaderAction` reads the new form field; `resetGroupLeaderPasswordAction` takes an optional custom password and re-validates the 8-character minimum server-side (never trusts the client-side check alone).
- `src/components/territory-management-system/GroupLeadersManager.tsx` — Invite form gained a "Temporary password (optional)" field with a "Leave blank to auto-generate" placeholder. Reset Password (a single-click row action with no form of its own) uses `window.prompt()` for the same override, since adding a full inline form to a `DataTable` cell for one occasional action wasn't worth the complexity.

## Summary of Changes
- Straightforward, low-risk addition — both code paths already had a `tempPassword`-or-`generateTempPassword()` pattern to reuse.
- `npx tsc --noEmit` clean, `npx vitest run` 52/52 passing, `npx next build` clean.
- Live-verified in the browser via a temporary scratch route (removed before commit) — confirmed the new field renders with correct label/placeholder/helper text.

## Remaining Work
None identified.

## Known Issues
- The `window.prompt()` UI for Reset Password is functional but low-fidelity compared to the invite form's real input field — acceptable for an occasional admin action, but worth revisiting if it turns out to be used often.

## Next Recommended Task
Ready to deploy at Russell's request. After deploying: invite a Group Leader with a custom temp password and confirm it's what they actually receive/log in with.
