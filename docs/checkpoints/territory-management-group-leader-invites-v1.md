# Territory Management System — Group Leader Invite System + GL Dashboard Nav Rework — v1

**Date:** 2026-07-13
**Product:** Territory Management System (TMS)
**Feature:** Admin-driven Group Leader account lifecycle (invite/revoke/restore/delete), a shared forgot-password flow, and a restructured Group Leader dashboard navigation.

## Files Modified
- `territory-management-system/migrations/006_group_leader_management.sql` (new)
- `src/lib/territory-management-system/modules/auth/types.ts`
- `src/lib/territory-management-system/modules/auth/queries.ts`
- `src/lib/territory-management-system/modules/groupLeaders/queries.ts` (new)
- `src/lib/territory-management-system/modules/groupLeaders/schema.ts` (new)
- `src/app/territory-management-system/actions/group-leaders.ts` (new)
- `src/app/territory-management-system/actions/password.ts` (new)
- `src/app/territory-management-system/dashboard/group-leaders/page.tsx` (new)
- `src/app/territory-management-system/forgot-password/page.tsx` (new)
- `src/app/territory-management-system/set-password/page.tsx` (new)
- `src/components/territory-management-system/GroupLeadersManager.tsx` (new)
- `src/components/territory-management-system/dashboard/DashboardSidebar.tsx`
- `src/components/territory-management-system/LoginForm.tsx`
- `src/app/territory-management-system/login/page.tsx`
- `src/app/territory-management-system/group-leader/dashboard/layout.tsx`
- `src/app/territory-management-system/group-leader/dashboard/page.tsx`
- `src/components/territory-management-system/GroupLeaderTabs.tsx`
- Removed in a related pass this session: the Admin's read-only Assignments pages/nav (`dashboard/assignments/*`, `AssignmentSummary.tsx`) — assignment oversight is exclusively the Group Leader's domain now, per Russell.

## Summary of Changes

**Group Leader invite/history system.** Admins invite by first name, last name, and email — `inviteGroupLeader` (`modules/groupLeaders/queries.ts`) calls Supabase's `auth.admin.inviteUserByEmail`, then updates the auto-created `profiles` row (via the existing `handle_new_user()` trigger) to `role='group_leader'` with the admin's `congregation_id` and a denormalized `email`. The invited person sets their own password via the emailed link, landing on the new shared `set-password` page.

**Revoke vs. Delete — two distinct, confirmed-with-Russell concepts.** "Revoke Access" is immediate and always available: it bans the Supabase auth user (`ban_duration` set to ~100 years, there's no literal "forever") and stamps `profiles.revoked_at`, but the profile row stays as a permanent history record. "Delete" is separate and destructive — it calls `auth.admin.deleteUser` (cascades to the profile via the `profiles.id → auth.users.id` FK) and is only allowed once the entry is at least 6 months old, enforced **server-side** in `actions/group-leaders.ts` (not just a disabled button), using the DB's own `created_at`, never a client-supplied value.

**`requireRole()` hardened**: now also checks `profiles.revoked_at` and redirects with a clear message if set — defense in depth alongside the ban, since an already-issued session token could otherwise still pass `auth.getUser()` until it naturally expires.

**Shared password infrastructure** (new for TMS — nothing like this existed before, since provisioning was manual-only): a "Forgot password?" link on the shared Admin/Group Leader login page, a public `/territory-management-system/forgot-password` request page (`resetPasswordForEmail`, same non-enumerating "check your email" response regardless of whether the address exists), and one `/territory-management-system/set-password` page reused by **both** invite-acceptance and password-reset — both land there via the same Supabase `PASSWORD_RECOVERY` auth event, so one page covers both. Mirrors the already-proven pattern in `laundry-management-system/reset-password/page.tsx`.

**`profiles` RLS gap discovered and worked around, not fixed at the RLS layer**: the table only ever had an "own profile" policy — no admin-reads-congregation-profiles policy exists, since nothing needed to list *other* users' profiles before. Rather than add a new RLS policy, the Group Leaders list/mutations all use the service-role client (`createAdminSupabase()`) with congregation scoping enforced explicitly in every query, after `requireAdmin()` has already gated access — same pattern the public publisher routes already use for a different reason (no RLS-eligible session at all there).

**Group Leader dashboard navigation reworked**, per a follow-up request from Russell after seeing the first version live: a persistent **Home / Dashboard / Visit Results / Ministry Partner** tab bar now sits directly under the congregation header (`GroupLeaderTabs.tsx`, `layout.tsx`) — "Home" holds the QR code and Regenerate Assignment (previously always-visible, now folds into the tab set); the "Delete Assignment" control moved from a page-header text button to an icon-only button inside the QR code card; "Regenerate Assignment" is now centered; "Log Out" moved from the top header to the bottom of the page. Visit Results also gained tiles for `Other` and `Undone` (the schema already had them from the prior pass, the UI hadn't caught up).

`npx tsc --noEmit` and `npx next build` both clean. Committed and deployed to production directly at Russell's request.

## Remaining Work

**Not verified live this pass** — same environment limitation as the previous checkpoint (no way to decrypt Supabase credentials from this session to click through against real data). Russell needs to:
1. Run `territory-management-system/migrations/006_group_leader_management.sql` in the TMS Supabase SQL Editor.
2. Invite a real (or throwaway) Group Leader from `/territory-management-system/dashboard/group-leaders`, confirm the invite email arrives, click it, confirm it lands on `set-password` and lets them log in afterward.
3. Confirm "Forgot password?" from the login page round-trips correctly for both an Admin and a Group Leader account.
4. Confirm Revoke Access actually blocks a subsequent login attempt, and Restore Access un-blocks it.
5. Confirm Delete is genuinely disabled/rejected for anything under 6 months old, and works once eligible (this one is slow to test naturally — may need to temporarily backdate a throwaway test row's `created_at` via SQL to verify the gate, then delete the test row either way).
6. Click through the restructured Group Leader dashboard tabs on a real phone.

## Known Issues

None identified in code review. One judgment call worth flagging: "Delete" being gated to 6+ months old is enforced against `profiles.created_at` (when the invite was first sent), not `revoked_at` — an entry doesn't need to have been revoked at all to become eligible for deletion once old enough, matching Russell's literal phrasing ("history... last 6 months... delete older than 6 months") rather than assuming deletion should only apply to already-revoked accounts.

## Next Recommended Task

Russell runs migration 006 and works through the verification checklist above. After that, the outstanding item from the previous checkpoint still applies: a full live pass through the rest of the Administrator dashboard (Territories, Contact Records, CSV import/export, Reports, Settings) remains unverified against real data.
