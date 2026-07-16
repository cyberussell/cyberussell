# Current Work

**Territory Management System — Add Record validation bug fix + Territory page tabs (2026-07-16) — code done, tsc + vitest (52/52) + build clean, live-verified in browser via scratch route, not yet committed/pushed — see checkpoint `territory-management-add-record-bugfix-tabs-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell reported the admin "Add a Contact Record" form always failed with a generic error that wiped every field, and asked for a scalable redesign of the Territory detail page (currently one long stacked page whose Sections & Blocks section renders every section/block flat, unworkable at e.g. 100 sections x 50 blocks).

Current Status: Code complete.
- **Root cause found**: `initialConductorName`/`initialNotes` (and `logVisitSchema`'s `conductorName`) are conditionally rendered — hidden fields submit as `null` via FormData, which `z.string().optional()` rejects (only accepts `undefined`). This made the admin's default path (Initial status left blank) always fail validation. New `optionalString()` helper in `records/schema.ts` fixes it.
- Confirmed via `AskUserQuestion`: Plus Code is now required and Household members defaults to 1 on the create flow only (matching the publisher form's already-established rule); `createRecordAction` now returns the specific Zod issue instead of a generic string; `RecordForm.tsx` converted to controlled state so a failed submit no longer wipes typed fields (only clears on confirmed success, via a `useServerAction` change that now also exposes the raw action `state` for reliable re-run detection).
- Territory detail page: Details/Map/header stay above the fold, Sections & Blocks / Add a Contact Record / Contact Records became three tabs (new `TerritoryTabs.tsx`, same pattern as `GroupLeaderTabs.tsx`). `SectionBlockTree.tsx` sections are now collapsed-by-default accordions — this is what actually solves the scaling problem, not the tabbing alone.
- **Live-verified in the browser** (rare for TMS) via a scratch route with real-UUID mock data: confirmed Plus Code's `required` attribute blocks submission client-side; forced a server round-trip anyway and confirmed the exact "Plus Code is required." message plus preserved Address field; confirmed the 8-section/6-block-each accordion collapses to 8 rows and expands correctly.
- `npx tsc --noEmit` clean, `npx vitest run` 52/52 passing, `npx next build` clean.

**Next recommended task:** Ready to deploy at Russell's request. Live-verify on the real dashboard afterward: blank Plus Code blocks immediately and keeps other fields; leaving Initial status blank no longer spuriously fails; the three new tabs behave like the mock preview.

----------------------------------------

**Territory Management System — "Use My Location" button on Moved/Correction panels (2026-07-16) — code done, tsc + vitest (52/52) + build clean, live-verified in browser via scratch route, committed and pushed (`35f0504`), deployed — see checkpoint `territory-management-plus-code-location-button-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell asked for the same "Use My Location" Plus Code auto-fill button already on the publisher's Add New Record form to be added to `MarkMovedForm.tsx`'s "Update Contact Record" panel and `RecommendCorrectionForm.tsx`'s "Recommend a Correction" panel (both reached via the "Moved" flow).

Current Status: Code complete.
- Local `main` was found 8 commits behind `origin/main` at session start (a concurrent session had already built `locatePlusCode()`, the first location button, and the entire `RecommendCorrectionForm.tsx` component) — pulled clean (fast-forward `84e661c..e36735f`) and `npm install`'d before making any changes.
- Both target forms got the identical button pattern already used in `PublisherRecordForm.tsx`: same icons, same disabled/spinner behavior, same `locatePlusCode()` call, same `toast.error` on failure.
- `npx tsc --noEmit` clean, `npx vitest run` 52/52 passing, `npx next build` clean. Live-verified in the browser via a temporary scratch route (removed before commit) — first panel pixel-matches Russell's screenshot, second panel's button confirmed correct via the accessibility tree, click behavior confirmed correct (denied-permission error path, same as the existing button).
- **Found and flagged separately (not fixed here)**: no `<Toaster />` is mounted anywhere in the publisher route tree, so every `toast.success`/`toast.error` across the whole publisher workflow has never actually rendered. Spawned as background task `task_d3775285` rather than fixed inline (out of scope for this request, different part of the route tree).

**Next recommended task:** Deployed (`35f0504`). Russell live-verifies the two location buttons on the real deployed site. Separately, the spawned Toaster-mounting task whenever convenient.

**Next recommended task:** Ready to deploy at Russell's request. Separately, the spawned Toaster-mounting task whenever convenient.

----------------------------------------

**Territory Management System — Publisher-added records get their own visible/editable list (2026-07-15) — code done, tsc + build clean, engine tests 10/10 passing, migration 019 already run by Russell, committed and pushed (`ff45107`), not yet deployed — see checkpoint `territory-management-publisher-added-records-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell asked that when a publisher adds a contact record via the workspace's "Add a New Contact Record" form, they should immediately see it in their own workspace and be able to edit or delete it — but only until their ministry session ends, after which it's locked. Confirmed via follow-up: Admin's existing pending-review gate stays as-is (publisher control doesn't skip Admin approval), and the added records must live in a separate list, never mixed into the existing "Assigned Records" list.

Current Status: Code complete.
- New `territory_records.created_by_partnership_id` column (migration 019, **Russell has run this**) tracks which partnership added a record, independent of `partnership_records` — the new records are deliberately never linked there, which is what keeps them out of Assigned Records.
- New "My Added Records" section in the publisher workspace (new bottom-nav item, `AddedRecordsList` + `PublisherAddedRecordDetailView` components), populated via a new `getPartnershipByToken` field.
- Two new publisher-scoped Server Actions (`deletePublisherAddedRecordAction`, `editPublisherAddedRecordAction`) — both re-verify ownership server-side and hard-block (not just hide the button) once `finished_at`/`ended_early_at` is set on the partnership. `addPublisherRecordAction` got the same finished/ended check so new adds are also blocked after ministry ends.
- `PublisherRecordForm` gained an edit mode (same component, `mode`/`initialValues` props) so Add and Edit share one form.
- A just-added record is inserted under a client-generated UUID (not the DB default) so it's immediately editable/deletable in the UI before the write has even synced — both new mutations are routed through the existing offline sync queue like every other publisher action.
- `npx tsc --noEmit` clean, `npx next build` clean, TMS engine test suite 10/10. **Not live-verified** — no live Supabase credentials in this environment, same standing limitation as every TMS session.

**Next recommended task:** Russell live-verifies: add a record, confirm it shows under "My Added Records" (not Assigned Records); edit and delete it; end the ministry session and confirm both actions are then blocked (button gone client-side, rejected server-side if retried); confirm it still surfaces in Admin's existing pending-review queue unchanged. Then deploy at Russell's request.

----------------------------------------

**Territory Management System — Assignment generation capacity cap, v2 corrected rule (2026-07-15) — code done, tsc + vitest (52/52) + build clean, live-verified in browser via scratch route, not yet committed/pushed — see checkpoint `territory-management-assignment-capacity-cap-v2.md` for full detail (supersedes v1):**

Current Product: Territory Management System (TMS).

Current Feature: v1 (commits `1368822`, `75b2678`, deployed) got the rule backwards — it blocked when approved records *exceeded* capacity, which Russell clarified is fine (extra records carry over, original design). After two worked examples via `AskUserQuestion`, the real rule: block when the *requested* partnership count exceeds `ceil(approvedRecords / 6)` — i.e. when some partnership would get zero records.

Current Status: Code complete.
- `calculateAssignment` (`engine.ts`) — removed v1's "too many records" block; replaced the old "records < partnershipCount" check with `partnershipCount > Math.ceil(eligibleRecordIds.length / maxPerPartnership)`, which strictly subsumes the old check and correctly catches the sequential-fill-leaves-some-partnerships-empty case the old one missed.
- `AssignmentForm.tsx` — preview box now shows two bullets (max records/partnership; approved-record total + max supportable partnerships with a plain-English breakdown), red warning + disabled button only when requested partnerships exceed what the records support.
- `engine.test.ts` — reverted the wrongly-changed test, added ceil-boundary tests plus two tests transcribing Russell's own 50-record examples verbatim.
- **Live-verified in the browser** (rare for TMS) via a temporary scratch route rendering the real `AssignmentForm` with mock data matching Russell's screenshot — confirmed all three states (under capacity: no warning; over capacity: warning + disabled; back under: clears) exactly match spec. Scratch route removed before commit.
- `npx tsc --noEmit` clean, `npx vitest run` 52/52 passing, `npx next build` clean.

**Next recommended task:** Not yet committed/pushed — v1 is already live from this session's earlier deploy, so this v2 fix needs to ship to correct it. Commit, push, and deploy at Russell's request (he said "deploy" for v1 already, likely wants the same for this correction).

----------------------------------------

**Repo — corrupted git object found during commit, pre-existing, not blocking (2026-07-15):**

Current Product: None — repo-wide git infrastructure, not tied to any of the 7 products.

Current Issue: While committing the TMS session below, git's background auto-gc reported a corrupted loose object: `error: inflate: data stream error (incorrect header check)` / `fatal: loose object 43b454bd740612dccc6a9b604b5a4afa39d7d36c (stored in .git/objects/43/b454bd740612dccc6a9b604b5a4afa39d7d36c) is corrupt`. `git gc` also left a `.git/gc.log` that blocks further automatic cleanup until removed.

Status: Investigated, confirmed not blocking, not fixed.
- `git show HEAD` and `git log origin/main..main` confirmed the new TMS commit itself was clean — the corrupt object is not part of it.
- `git fsck --no-progress` showed the corrupt object as a **missing tree** (something references it, unlike the many other harmless `dangling` objects also listed — leftover cruft from resets/rebases across this repo's history).
- `git rev-list --objects main` also failed on the same object, meaning it's reachable somewhere in `main`'s ancestry (not confirmed which commit) — but `git push origin main` still completed successfully, confirming origin already has a valid copy and the corruption didn't block the actual push.
- Likely origin: this repo has several stale `claude/*` branches and old worktrees under `.claude/worktrees/` (`territory-management-foundation-6a5bc9`, `territory-management-review-b4f888`, `tms-login-issue-6a8176`, `elated-rosalind-2e2b24`) sharing the same object store — one of these is the more probable culprit than `main` itself.

**Next recommended task:** Not urgent — pushes to `main` are unaffected. When there's a good window, a separate session should: (1) remove `.git/gc.log` so automatic cleanup resumes, (2) identify and prune the stale `claude/*` branches/worktrees no longer needed, (3) re-run `git fsck` to confirm the corrupt object disappears once nothing references it, or restore it from a clean clone/backup if something still does. Treat this as real git surgery — scope and confirm with Russell before deleting any branch or worktree, per the standing destructive-operations rule.

----------------------------------------

**Territory Management System — Panel styling revised: darken the page not the panel, gray glow border, ordinal "Nth Record to Visit" header + Map PNG support, CSV field mapping, Initial visit status, black QR (2026-07-15) — code done, tsc + build clean, no migrations needed, committed and pushed (`82e7c56`), Vercel auto-deploy should be building — see checkpoints `territory-management-panel-styling-v2.md`, `territory-management-panel-styling-v1.md`, and `territory-management-map-csv-record-fixes-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Three requests in the same session. First, 5 items in one message (confirmed via `AskUserQuestion` — Household Number = same field as `household_members`; Plus Code becomes CSV-required, Unit/Do Not Call dropped from the importer; "default status list" = an initial-visit-status dropdown on Add Record). Second, v1 of a panel-identification pass (black border + darkened panel fill, confirmed via `AskUserQuestion` at the time). Third — after Russell live-tested v1 on the deployed site and sent a screenshot — a correction: darken the *page* background instead of the panel, use a gray border with a subtle glow instead of solid black, and add a new ordinal header ("1st Record to Visit", "2nd Record to Visit", etc., bold Anton font) to the publisher record detail view's top card.

Current Status: Code complete.
- Territory map upload now accepts PNG as well as JPG (the storage layer was already generic — only the hardcoded JPG-only checks were blocking it).
- CSV import required columns are now Section, Block, Plus Code, Household Number; optional are Name, Notes, Address; Unit and Do Not Call are no longer importable at all.
- `CsvImportDialog` reworked into pick file → review/accept a header-to-field mapping step → upload with an animated progress bar (Server Actions have no real upload-progress events, documented honestly as an approximation, not byte-accurate).
- Both Add Record forms (publisher and, for parity, admin) gained a Household Number field and an optional "Initial status" dropdown — picking one logs a real visit right after the record is created, reusing the exact same conductor-name/notes validation `logVisitSchema` already has.
- Assignment QR code color changed from green to black.
- **Panel styling, final (v2) direction**: every panel (`Card` component + ~10 hand-rolled duplicates) is back to a white fill with a `border-gray-300` outline plus a soft glow shadow (`0_0_18px_-3px_rgba(148,163,184,0.6)`) instead of v1's solid black border/`#E2E8F2` fill. The page background itself is what got darkened instead (`bg-[#F3F8FF]` → `bg-[#C9D8EE]`) across all 11 page-wrapper files, with a fresh contrast pass (`slate-400/500` → `slate-600/700`) on whatever text sits directly on the page rather than inside a panel.
- **New**: the publisher record detail view's top record card now shows an Anton-font ordinal header ("1st Record to Visit", "2nd Record to Visit", …) driven by the record's existing `sequence` field — no new data needed. Font color is the standard dark-navy `#0B1B33` used sitewide, which stays legible against all four of that card's tone-color variants.
- `npx tsc --noEmit` and `npx next build` both clean, zero warnings. Live-verified the two DB-independent pages (login, forgot-password) in the browser preview against Russell's screenshot feedback — darker page, white glow-bordered panel, zero console errors. The new ordinal header could not be live-verified (behind Supabase auth + real assignment data), confirmed via `tsc`/build and code review only.

**Next recommended task:** Committed, pushed to `main` (`82e7c56`), and deployed at Russell's request. Russell live-verifies on the deployed site — especially the ordinal header on the publisher record detail view, which couldn't be checked in this environment before pushing.

----------------------------------------

**Territory Management System — Partnership `finished_at` signal + 6 UX fixes (2026-07-15) — code done, tsc + build + vitest clean, migration 018 already run by Russell, blocked on live click-through — see checkpoint `territory-management-partnership-finished-at-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell reported 6 issues after live-testing the previous pass: (1) a zero-record territory's QR never showed — Home jumped straight to the "all done" summary; (2) partner-name placeholder wording; (3) moving a record to another partnership seemed to block finishing; (4) editing controls stayed visible after a session ended; (5) whether ending a ministry should lock the QR beyond what Delete Assignment already does; (6, follow-up) Skip/Send on the note screen should actually end the ministry, not just show a thank-you screen.

Current Status: Code complete.
- **Root cause of #1 and likely #3**: no partnership had a real "genuinely done" signal — `completedCount >= recordCount` is vacuously true for a zero-record partnership the instant the batch is created, before anyone claims it, so the Group Leader's `allPartnersDone` check (added last pass) treated it as done immediately and skipped the QR straight to the results summary. New `partnerships.finished_at` (migration 018) is the real signal, set only when a publisher reaches Sync & Finish — fixes both the zero-record QR and gives the Group Leader's "all done" check an honest per-partnership signal regardless of record moves.
- **#6 wired in**: both the note screen's Skip and Send buttons now call a new `finishPartnershipAction` (reachable from both the normal finish path and End Early, since both already funnel through the note screen) — previously neither button persisted anything, the "Thank you" screen was purely cosmetic.
- **#4 fixed**: `PublisherRecordDetailView` now hides Record a Visit / Mark as Moved / Pass to Another Partner once `finished_at` or `ended_early_at` is set, while keeping the record header, Google Maps link, and Visit History visible.
- **#2**: placeholder changed to "Put your names".
- **#5**: confirmed with Russell — no new code needed, "Delete Assignment" already fully blocks all future access (cascade delete → hard 404).
- `npx tsc --noEmit`, `npx next build`, `npx vitest run` all clean. Not live-verified (no live Supabase credentials in this environment, same standing limitation as every TMS pass).

**Next recommended task:** Russell live-verifies: generating an assignment for a zero-record territory now shows the QR (not the results summary) until a publisher actually finishes; ending via Skip or Send on the note screen persists `finished_at` and hides the editing panel on revisit; moving a record to another partnership no longer appears to block the source partnership from finishing.

----------------------------------------

**Territory Management System — Full production audit + remediation, round 2 (2026-07-15) — CLOSED, code done, tsc + build + vitest clean, deployed (commits `82a3827`, `fe5c744`), migrations 011-017 + seed all confirmed run — see checkpoint `territory-management-production-audit-remediation-v2.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell hit two real bugs live (a legacy assignment batch permanently un-deletable after the prior session's Group Leader ownership migration; zero-approved-record territories blocked from ever generating an assignment) and asked for a fresh audit + fixes + go/no-go verdict.

Current Status: **Fully closed out — GO for production.** Every migration from this session (011 partnership_admin_note, 012 removal_recommendation, 013 group leader batch ownership, 014 legacy-batch fix, 015 profiles privilege-escalation fix, 016 rate_limits, 017 error_logs) plus the zero-record seed territory are all confirmed run by Russell. No open items remain.
- **Bug fixed**: 014 treats a NULL-`created_by` batch (predates the ownership migration) as legacy/unowned, manageable by any Group Leader in the congregation — real owners keep the protection.
- **Critical security finding closed**: 015 revokes `authenticated`'s INSERT/UPDATE on `profiles` — its only RLS policy was row-level-only and `role`/`congregation_id` ARE the real auth gate here (`requireRole()`), so any signed-in user could self-escalate to admin via a direct REST PATCH. Confirmed via full-codebase grep every real profile write already goes through the service-role client.
- **Bug fixed**: `calculateAssignment` no longer hard-errors on zero eligible records — creates empty-record partnerships instead, so a Group Leader can generate a real assignment for a brand-new/unmapped territory. Publisher workspace shows a dedicated empty-state message, Sync & Finish is available immediately, and territory maps are gated on the territory actually having section/block structure. Seeded a real 0-record/4-section/6-block test territory to verify.
- **Remaining Medium/Low audit findings closed**: TMS was the only one of the 3 Supabase-backed products with no rate limiting, no error tracking, no health endpoint, no tests — brought to parity with the same patterns already used in LMS/Appointment System (`rate_limits`/`error_logs` tables, `checkRateLimit`/`logError` helpers, `/api/health`, 6 new vitest cases for the assignment engine).
- `npx tsc --noEmit`, `npx next build`, `npx vitest run` (engine suite) all clean. Deployed and confirmed READY on Vercel across both commits.

**Next recommended task:** Nothing blocking remains from this audit. Optional live click-through (never done this whole multi-session TMS effort due to no Supabase credentials in this environment): confirm the previously-stuck legacy batch deletes cleanly, the seeded zero-record territory generates and shows the new empty-state UI, rapid repeated publisher submissions get rate-limited, and a forced failure shows up in `error_logs`. Otherwise, wait for Russell's next feature request.

----------------------------------------

**Territory Management System — Group Leader concurrent assignment batches (2026-07-15) — code done, tsc + build clean, migration 013 already run by Russell, blocked on live click-through — see checkpoint `territory-management-group-leader-batch-ownership-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell asked whether a second Group Leader could generate a QR/assignment, worried about two TGLs covering the same territory "at the end of the week." Investigation found it was worse than asked: there was exactly one shared batch per congregation per day (no per-creator ownership at all), so a second TGL regenerating could silently delete the first TGL's entire batch, not just risk a territory overlap.

Current Status: Code complete.
- Migration `013_group_leader_assignment_ownership.sql` — **Russell has already run this.** Adds `assignment_batches.created_by`, moves uniqueness to `(congregation_id, assignment_date, created_by)`, and splits RLS on all 4 assignment tables into congregation-wide reads / creator-scoped writes via new `owns_assignment_batch()`/`owns_partnership()` helpers.
- `createAssignment` now hard-blocks (confirmed via `AskUserQuestion`, not an auto-filtered picker) any territory already claimed by another Group Leader's active batch that day, with a named-territory error message.
- `getBatchForDate` → `getBatchForGroupLeaderAndDate`; "today's assignment" on the Group Leader dashboard now means "my own batch," not the congregation's one shared batch.
- `deleteGroupLeaderAssignmentAction` gained an explicit app-side ownership check on top of the new RLS protection.
- Publisher-facing (QR/token) writes are unaffected — those run on the service-role client, bypassing RLS entirely.
- `npx tsc --noEmit` and `npx next build` both clean. Not live-verified (no live Supabase credentials in this environment, same standing limitation as every TMS session).

**Next recommended task:** Russell live-verifies with two real Group Leader accounts per the checkpoint's checklist: concurrent batches on different territories both work independently; selecting an already-claimed territory gets the clear conflict error instead of silently succeeding or wiping out the other Group Leader's batch; deleting only ever affects your own batch.

----------------------------------------

**Territory Management System — Bible Study bug fix + Undo Last Visit, Admin Notes, Do Not Call narrowing, Moved-out flagging, Home pie chart, Bible verse (2026-07-15) — code done, tsc + build clean, blocked on migrations 011/012 + Russell's live click-through — see checkpoint `territory-management-bible-study-notes-flagging-v1.md` for full detail:**

Current Product: Territory Management System (TMS).

Current Feature: Russell reported a real bug (Bible Study follow-up visits — Progressing/Discontinued — failing to sync with "Invalid visit result") via two screenshots, then asked for 6 features in the same message: (1) admin can undo a record's last visit, (2) publishers can leave an optional end-of-ministry note visible only to Admin, (3) Do Not Call records narrow to exactly 3 statuses, (4) marking a record Moved forces either an inline contact-info correction or a required-reason removal recommendation to Admin, (5) the Group Leader Home tab shows a pie chart once every partner is done instead of the QR, (6) the publisher's final screen shows the Matthew 28:19,20 quote + congregation name. Confirmed 4 ambiguous design decisions via `AskUserQuestion` before building (generic Undo vs. Bible-Study-only, batch deletion vs. hide-only, inline edit vs. admin-only edit, notes page vs. folded into Reports) — all 4 recommended options were chosen.

Current Status: Code complete.
- **Root cause of the reported bug**: `logPublisherVisitAction` (`actions/publisher.ts`) validated against the permanently-narrow `SELECTABLE_VISIT_RESULTS` list instead of re-deriving `getSelectableResults(latestResult)` the way the client's own form does — not a missing migration, a real server-side validation gap. Fixed, and the same re-derivation now also covers Do Not Call narrowing on both the publisher and the previously-unvalidated admin path.
- **Found and closed a real information-leak risk while building the admin-notes feature**: `getBatchSummary`'s partnerships query was `select('*')`, which would have let the new `admin_note` column reach the Group Leader's own dashboard via an existing RLS policy ("group leader reads partnerships") — pinned to an explicit column list before adding the note columns, so the Group Leader surface never sees them.
- Both `'moved'` paths (Update Contact Record / Recommend for Admin Removal) still log a real `moved` visit underneath, so stats/card-tone stay consistent regardless of which path a publisher takes.
- Home tab's pie chart replaces the QR once every partnership is done, but **the batch is not deleted** (Russell's confirmed choice) — Reports/Partners tab keep working; the existing `isBatchExpired()` midnight-in-congregation-timezone check already covered "resets daily."
- `npx tsc --noEmit` and `npx next build` both clean across the whole repo. **Live-verified only the one DB-independent route** (`/territory-management-system/login`) in the browser preview — zero console errors. Every other changed surface sits behind Supabase auth or real assignment-batch data, same standing limitation as every prior TMS session (no live Supabase credentials in this environment).

**Same-session follow-up (2026-07-15):** Russell asked that assignment generation rotate through all records instead of always handing out the same first N per block. `fetchEligibleRecordIds` (`assignment/queries.ts`) now tiebreaks within each section/block by oldest-last-visited-first (never-visited records first) instead of by `created_at` (which never changes, so it never rotated anything) — confirmed both the staleness metric and that section/block stays the primary grouping via `AskUserQuestion` before building. New `getLatestVisitDatesByRecord` helper. `npx tsc --noEmit` and `npx next build` clean; not live-verified (no live TMS Supabase credentials in this environment, same standing limitation).

**Next recommended task:** Russell runs migrations `011_partnership_admin_note.sql` and `012_removal_recommendation.sql` in the TMS Supabase SQL Editor, then live-verifies all 7 items per the checkpoint's checklist (bug fix, Undo Last Visit, end-of-ministry notes staying admin-only, Do Not Call's 3-status dropdown, both Moved-out paths + the Flagged for Removal page, the Home pie chart appearing/batch surviving, and the final Bible-quote screen) — plus the new rotation behavior: generate two successive batches over the same territory and confirm records visited in batch 1 sort toward the back of their block in batch 2.

----------------------------------------

**Territory Management System — Group Leader login failure diagnosis (2026-07-14) — investigation only, no code changed, blocked on Russell checking Supabase Auth dashboard settings:**

Current Product: Territory Management System (TMS).

Current Feature: Russell (`russell.a.parayno@gmail.com`, trying to log in as a **Group Leader**) gets "Invalid email or password" on direct login, and the "Forgot password" email link doesn't "push through" — lands on `/territory-management-system/set-password` but never completes.

Current Status: Diagnosed via code read + a live (unauthenticated) browser check of the production pages — **could not query the live TMS Supabase project** (it's under the `ruparayno.ldc@gmail.com` account/`supabase-ldc` MCP server; `SUPABASE_ACCESS_TOKEN` isn't loaded in this session, same standing limitation as every prior TMS pass).
- Read `actions/auth.ts` (`signIn`), `actions/password.ts` (`requestPasswordResetAction`), `groupLeaders/queries.ts` (`inviteGroupLeader`), and `set-password/page.tsx` — all internally consistent: invite and password-reset both use the identical `redirectTo: 'https://www.cyberussell.com/territory-management-system/set-password'`, and `next.config.ts`'s `/tms` redirects only go short→long, so they can't interfere with that URL.
- Live-checked `/territory-management-system/forgot-password` and `/territory-management-system/set-password` in production: both render correctly, no console errors, no env-var crash (`getTmsEnv()` would throw immediately if `NEXT_PUBLIC_TMS_SUPABASE_URL`/`ANON_KEY` were missing in prod — they're not). `set-password` correctly shows "Verifying link…" then "This link is invalid or has expired." after 4s when visited with no recovery token, confirming the page's own logic works.
- **Conclusion: the code path looks correct; the two symptoms are almost certainly one root cause, not two** — this Group Leader account has likely never had a password successfully set (invite/reset email link never completing), so direct login naturally fails as "invalid" (no password exists to match). Ranked hypotheses for why the link doesn't complete, none of which are checkable from this environment:
  1. **Most likely**: Supabase project's Authentication → URL Configuration → Redirect URLs allowlist doesn't include `https://www.cyberussell.com/territory-management-system/set-password` — Supabase silently rejects/redirects links not on that list.
  2. The reset/invite link was opened in a different browser or device than the one used to request it — `@supabase/ssr` defaults to PKCE flow, whose code verifier is browser-local; opening the email on a phone after requesting from desktop (or vice versa) breaks the exchange silently, landing exactly on the "invalid or expired" state seen here.
  3. The link was already used once, or its OTP expiry (Supabase project setting) is short and it simply expired.

**Next recommended task:** Russell checks (a) Supabase Dashboard → Authentication → URL Configuration for the `ruparayno.ldc@gmail.com` account's TMS project — confirm `https://www.cyberussell.com/territory-management-system/set-password` is an allowed redirect URL; (b) Authentication → Logs around the time of the failed attempt, which will show the actual rejection reason; (c) retry the reset link in the exact same browser/device used to request it, within a few minutes, watching whether the URL that lands has a `?code=...` param. Once one of these is confirmed, report back — the code fix (if any is even needed) will be small and targeted. Separately: get a real `SUPABASE_ACCESS_TOKEN` for the `ruparayno.ldc@gmail.com` account into this environment so future TMS sessions can query `auth.users`/`profiles` directly instead of diagnosing blind — this has now blocked multiple sessions in a row.

----------------------------------------

**LMS — Independent production audit + full remediation — VERDICT: GO (2026-07-14) — see checkpoint `laundry-management-system-production-audit-remediation-v1.md` for full detail:**

Current Product: Laundry Management System (LMS).

Current Feature: Russell asked for a fresh, independent "certify for paying customers" audit across security/billing/UX/scalability/performance/maintainability/accessibility/testing/ops, explicitly disregarding prior phase sign-offs — then asked to resolve everything found until it's a Go.

Current Status: **Closed out — GO for paying customers.** Every finding fixed except one deliberately deferred item, and the subscription gate is now live-verified end-to-end.
- **CRITICAL fixed**: `plan_status`/`trial_ends_at` were defined in schema but never enforced anywhere — a business could never be cut off for non-payment and the 14-day trial never expired. New `getSubscriptionBlock()` (pure, unit-tested) wired into all owner/staff session resolution; blocked businesses now redirect to a new `/lms/subscription-required` page. Deliberately left customer-facing pages ungated — flagged for Russell to override if he wants suspended businesses' customers cut off too.
- **HIGH fixed**: rate limiting added to signIn/signUp/requestPasswordReset/customerSignUp (new `rate_limits` table, migration 016, same pattern as the Appointment System). Also closed a residual gap where `inviteStaff` bypassed the new gate via inline auth instead of `requireOwnerBusiness()`.
- **HIGH fixed**: zero test coverage → 22 new tests (subscription-block logic, entitlements, permissions, order state machine), all passing.
- **MEDIUM fixed**: new `/lms/api/health` endpoint (same shape as Appointments').
- **MEDIUM checked, no gap found**: full accessibility sweep of every icon-heavy LMS component — every icon-only control already had `aria-label`; the audit's initial suspicion was a false positive.
- **MEDIUM deliberately deferred, documented**: server-side pagination for `listOrders()`/customer list — real scalability debt but a large architecture change that doesn't bite until a business has months of history; not rushed under this pass's time pressure.
- **LOW fixed**: staff accept-invite's 4s timeout race (flashed a false "expired" message) bumped to 8s.
- `npx tsc --noEmit` clean, `npx vitest run` 22/22 passing, `npx next build` succeeds (new routes confirmed compiled into `.next/server/app/lms/...`).
- **Migrations 015 and 016 confirmed run and correct (2026-07-14)** — Russell ran both in the LMS Supabase SQL Editor and verified the result: `information_schema.column_privileges` shows `authenticated` has `UPDATE` on exactly `address, currency, logo_url, name, phone, timezone` on `businesses` (no `plan_tier`/`plan_status`/`trial_ends_at`), and `public.rate_limits` exists and is queryable. Both DB-side fixes are confirmed live.
- **Subscription gate live-verified end-to-end (2026-07-14)**: Russell signed up a real throwaway business ("Aling Maria Laundry Shop", `id e442c931-85be-4d5f-962b-34a421eb4cc2`) through the actual `/lms` signup flow. Confirmed via SQL + real login round-trips: `plan_status='suspended'` → redirected to `/lms/subscription-required` ("This account is suspended"); `plan_status='trial'` with `trial_ends_at` in the past → redirected ("Your free trial has ended"); `plan_status='active'` → normal dashboard access restored. All three screenshotted.

**Next recommended task:** Optional cleanup — delete the throwaway "Aling Maria Laundry Shop" test business (`e442c931-85be-4d5f-962b-34a421eb4cc2`) and its `auth.users` row from the live LMS Supabase project. Otherwise no blocking work remains from this audit; next session should pick up new feature requests or the deferred pagination item whenever Russell prioritizes it.

----------------------------------------

**LMS — Billing RLS security audit (2026-07-14) — see checkpoint `laundry-management-system-billing-rls-audit-v1.md` for full detail:**

Current Product: Laundry Management System (LMS).

Current Feature: Russell asked to audit LMS for production readiness the same way the Appointment System was just audited (that audit found and fixed a cross-tenant IDOR). Read every LMS Server Action and the core auth/RLS layer end to end.

Current Status: One Critical finding, fixed in code, migration applied to the live DB by Russell.
- Confirmed LMS has no public/unauthenticated write path (no self-service booking, unlike Appointments) — no IDOR of that shape exists. Every mutation is business-scoped correctly.
- **Found the same bug class as the Appointment System's Milestone 1 finding**: `businesses`' RLS policy is row-level only (`owner_id = auth.uid()`), so an authenticated owner could `PATCH` their own row via the REST API to set `plan_tier`/`plan_status` and unlock paid features for free. New migration `015_protect_billing_columns.sql` created (revoke/re-grant column-level `UPDATE`, same pattern as the Appointment System's `011_protect_billing_columns.sql`) — confirmed via full-codebase grep that this breaks no real flow (the app only ever writes `name/phone/address/timezone/currency/logo_url`).
- Also checked whether `profiles.role`'s identical row-level-only RLS policy was exploitable for privilege escalation — confirmed it's never used as an auth gate anywhere (real access always checks `businesses.owner_id`/`staff_members`/`customers` row existence), so no fix needed there.
- Two smaller hardening gaps found and reported (no rate limiting on auth actions, no error tracking on failure paths) but explicitly deferred at Russell's choice this pass.
- **Migration 015 run by Russell in the LMS Supabase SQL Editor (2026-07-14)** — the Supabase MCP servers in this session had no auth token configured, so this couldn't be pushed programmatically or independently re-verified against the live DB this session.

**Next recommended task:** Confirm live that the REST-level exploit is actually blocked now — log in as a test owner and attempt a direct REST `PATCH` on `/rest/v1/businesses?id=eq.<id>` with `{"plan_tier":"professional"}` using the owner's session token; it should fail with a permissions error instead of silently succeeding. Not yet done this session (no live credentials/DB access available). Then, if desired, revisit the deferred rate-limiting and error-tracking hardening items.

----------------------------------------

**LMS — Shortened the product URL from /laundry-management-system to /lms (2026-07-14):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-url-rename-v1.md` for full detail.

Current Feature: Russell asked to shorten the URL. Confirmed scope first: the whole product moves (not just the marketing page), and the internal `src/lib`/`src/components` folder names stay as `laundry-management-system` (not user-facing, would double the change for no benefit).

Current Status: Done, verified live, not yet committed/pushed.
- `git mv` all 57 route files from `src/app/laundry-management-system/` to `src/app/lms/` — confirmed via `git status` that all 57 are tracked as renames, history preserved.
- Bulk-updated every internal reference across 101 total files touched, using a script that carefully distinguished `@/app/laundry-management-system` (the folder that moved → `@/app/lms`) from `@/lib/laundry-management-system`/`@/components/laundry-management-system` (deliberately kept, protected from the replacement so they weren't wrongly mangled) and from literal URL-path strings (→ `/lms`).
- Updated the 3 hardcoded absolute auth-email redirect URLs, the QR code lookup URL generator, and the marketing page's canonical/OG metadata — none of these get caught by import-path tooling.
- **Added permanent 301/308 redirects** (`/laundry-management-system` → `/lms`, exact + wildcard) in `next.config.ts` — essential, not cosmetic: already-sent staff-invite/password-reset emails and already-printed receipt QR codes point at the old absolute URL.
- Updated one line in the Portfolio product's case-study data (a cross-reference link to the real product) — its own separate `/portfolio/laundry-management-system` route/slug was correctly left alone.
- `docs/project-map.md` already had an accurate top-level caveat about this move from an earlier pass; no further doc changes needed.
- `npx tsc --noEmit` and `npx next build` both clean — all 33 LMS routes build under `/lms/*`. Live-verified with a throwaway account: full login → onboarding → dashboard flow stays on `/lms/*` throughout, sidebar navigation confirmed, receipt/PDF routes reachable at the new path, and the old-path redirects confirmed via direct `curl` (real `308`s, wildcard correctly preserves the rest of the path). Zero console errors. All test data cleaned up and cross-checked via REST.

**Next recommended task:** Commit and push this rename.

----------------------------------------

**LMS — Found and fixed a real production regression while closing out 8d/8f verification gaps (2026-07-13):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-8d-8f-verification-v1.md` for full detail.

Current Feature: Russell asked "is this ready for production?" — the honest answer named two untested surfaces (phase 8d's remaining UX-polish items, phase 8f's never-opened Activity page). Verifying them surfaced a real, currently-live bug.

Current Status: Bug found and fixed, not yet committed/pushed.
- **Real regression, live in production since phase 8c shipped**: making `DataTable` a client component (to add sorting/pagination) broke 3 pre-existing callers phase 8c never audited — `PriorityQueueTable.tsx`, `CustomerDetailView.tsx`, and `dashboard/staff/page.tsx` — all plain Server Components passing function-valued `cell` props across the RSC boundary into the now-client `DataTable`. **5 real pages were crashing**: Priority Queue (owner+staff), Customer detail (owner+staff), Staff list. Found by exhaustively grepping every `DataTableColumn` importer and checking which lacked `'use client'`.
- **Fixed**: added `'use client'` directly to the two pure-presentational components; extracted a new `StaffTable.tsx` client component for the Staff page (which does its own server-side data fetching, so couldn't just become client itself) — same pattern as phase 8c's `OrdersTable`.
- **Second real bug, smaller**: Activity page's Actor column showed blank instead of a name — `?? 'Unknown'` doesn't catch empty strings, and LMS's signup flow never collects a personal name (only email/password), so `profiles.full_name` is genuinely `""` for every owner account, not just test ones. Fixed the fallback logic (`||` + role-aware default).
- **Verified for real, not just code-reviewed**: Priority Queue confirmed broken pre-fix (reproduced the exact RSC error), confirmed fixed post-fix. `PriorityToggle`'s `useOptimistic` confirmed working (synchronous button-text flip). Staff invite submitted through the real UI (not REST) — toast fired, `staff_invited` audit entry correct. Activity page renders both real log entries correctly with working search. Staff account correctly redirected away from the owner-only Activity URL (consistent with existing, already-documented behavior, not a new gap). Inventory/driver deletion both done for real — audit entries correct, capturing the entity's name. Zero console errors, confirmed in a fresh tab to rule out stale-log false positives.
- All test data (business, branch, orders, audit logs, staff, 2 auth users) fully deleted afterward, cross-checked via REST — only the two pre-existing unrelated businesses remain.

**Next recommended task:** Commit and push this fix — it corrects a real, currently-live production bug, so this one shouldn't wait.

----------------------------------------

**Appointment System — Pricing Compliance Audit + All 9 Milestones (2026-07-14) — see checkpoint `appointment-system-pricing-enforcement-v1.md` for full detail:**

Current Product: Appointment System.

Current Feature: Russell asked for a full audit of whether the published pricing plans (Free/Basic/Pro) are actually enforced throughout the app, run in strict phases (1: Architecture Audit, 2: Feature Verification, 3: Product Validation, 4: UX Review, 5: consolidated 9-milestone implementation plan), then asked for the full 9-milestone plan to be implemented.

Current Status: All 9 milestones done, plus both known UX rough edges from the re-score fixed in a follow-up pass. Milestone 8 ran a full structured live QA pass (Free/Basic/Pro/upgrade/downgrade/mobile) against the real Supabase project using one throwaway business cycled through all 3 tiers — zero new bugs found (a first, compared to every prior milestone catching at least one live bug). Milestone 9 re-scored launch readiness from ~55/100 to ~88/100 (now conservative since both flagged UX gaps are fixed). Full scoring breakdown and QA detail in the checkpoint.
- **Follow-up fix (2026-07-14)**: (1) `requireBusiness()` now tells a staff member hitting an owner-only URL apart from a genuinely unprovisioned account — redirects to a new clean `/appointments/not-authorized` page instead of misleadingly sending them to signup; (2) added a "Resend invite" action/button for staff logins, safe to call repeatedly since Supabase itself rejects it once the invite's been accepted (no new schema needed). Both live-verified with throwaway data, including catching and fixing a wrong error-string match (`'already registered'` vs. the real `'already been registered'`) live rather than assuming it worked. All throwaway data deleted and cross-verified afterward. `npx tsc --noEmit` clean.
- **Independent production-readiness audit (2026-07-14), fresh eyes, prior phases explicitly disregarded**: found one new Critical finding all 9 prior milestones missed — a cross-tenant IDOR where `bookAppointment()` (`slots.ts:262`) never verified a booking's `serviceId`/`staffId` actually belonged to the business being booked, reachable unauthenticated via the public booking API and exploitable to corrupt another tenant's calendar (the DB's double-booking constraint is scoped only by `staff_id`, not `business_id`). Fixed locally and live-verified against an actual crafted cross-tenant exploit attempt the same day. Verdict moved from No-go to Conditional go — **but see the correction below: the fix wasn't actually committed at the time, so this verdict was not yet true of production.**
- **Post-audit hardening pass (2026-07-14)**: fixed every remaining code-only High/Medium finding from the audit at Russell's request ("do all what you can, leave others to human") — `error.tsx`/`loading.tsx` on both dashboards, `next/image` on the two real logo images, a new `/appointments/api/health` endpoint, DB-backed rate limiting (new `rate_limits` table + migration 017) on booking/login/signup, Zod validation added to the ~15 highest-value Server Actions, an accessibility sweep of all 35 icon-using files (found and fixed exactly 2 real gaps — `MonthCalendar`'s month nav arrows — everything else was already labeled via shared components), `actions.ts` split into 9 domain files under `actions/` behind an unchanged barrel import path, and a starter Vitest suite (20 tests, including a live integration test that regression-guards the IDOR fix against a real crafted exploit). New dev dependencies, flagged: `vitest`, `dotenv`, plus the real `server-only` npm package (previously only resolvable via Next's internal bundler shim).
- **Correction (2026-07-14): the IDOR fix had never actually been committed.** Discovered while staging an unrelated error-tracking commit — `git diff` showed `slots.ts` still modified against `HEAD`, meaning the "Fixed and re-verified" security fix above had lived only in this session's local working tree the entire time; production ran the vulnerable code until this was caught. Committed and pushed immediately (`462de15`), then re-verified a second time end-to-end against the exact commit now on `origin/main`: fresh clean-room `npm install` + `next build`, a real dev server, and the same crafted cross-tenant exploit request — result unchanged, `500 {"error":"Service not found"}`. **Lesson for future sessions: "fixed locally and tested" is not "shipped" — confirm `git log`/`origin/main` before marking a finding closed, especially with concurrent sessions sharing this working tree.**
- **Error tracking for webhook and Server Action failure paths (2026-07-14)**: Russell chose reusing the existing `events` table over a new Sentry account (no third-party signup needed). New `logError()` helper wired into both webhooks (PayMongo webhook now properly try/catches its whole body and returns 500 + logs on failure instead of a bare 200 with no record — correct behavior, since a 500 tells PayMongo to retry a failed plan-upgrade instead of silently dropping it; Messenger webhook's tenant-routing and message-handling both now log instead of only `console.error`) and `sendNewBookingEmail`/`initiateBillingCheckout`'s existing catch blocks. Live-verified: a smoke test called the real webhook route handler with a genuinely signed-but-malformed request and confirmed both the 500 response and a matching row in `events` (deleted after, not part of the permanent suite).
- All of the above (hardening pass + IDOR fix + error tracking) is now committed and pushed as of `462de15`, verified with a clean-room build. **Mid-pass git note**: a concurrent session's commit (`60cf835`) swept up the already-split `actions/*.ts` files from shared working-tree state under an unrelated commit message — not an action taken in this session, flagged for visibility only.
- **Public booking page caching (2026-07-14, `c8f8615`)**: closed the audit's last open Medium finding. Confirmed first that this page's SSR output only includes owner-driven data (business info, service list) — real-time slot availability is fetched client-side separately, so caching the shell can't show stale availability. A plain `export const revalidate` did nothing in this Next.js version without `cacheComponents` enabled (confirmed by reading `node_modules/next/dist/docs/` per AGENTS.md's standing instruction that this Next version differs from training data) — Supabase's client fetches aren't Next-cacheable by default, so the real fix was wrapping the data fetch in `unstable_cache()` (60s, tagged) and switching the relevant mutations (profile, closed notice, business hours, services) to Next 16's `updateTag()` for immediate read-your-own-writes, not `revalidateTag()`'s stale-while-revalidate. Live-verified with a production build + `next start` (ISR doesn't apply in dev): repeated requests dropped from ~2s to ~27ms confirming real caching, then renamed a business through the actual Settings UI and confirmed the public page updated on the very next request, not after the timer. Re-verified against the exact commit on `origin/main` with a third clean-room build this session.
- Russell explicitly chose to hold the remaining CSP-header item for a separate session scoped to the shared root layout, rather than expand this session's scope — respected as asked.
- **Phase 1 found a Critical security gap**: the `businesses` RLS policy was row-level only, so any owner could `PATCH` their own `plan_tier`/`plan_status` directly via the REST API and grant themselves a paid plan for free. Fixed in Milestone 1 via column-level grants (`011_protect_billing_columns.sql`).
- **Phase 2 found `hasFeature()` was only ever checked for the Messenger bot** — every other declared plan feature was decorative, and "Breaks & Blocked Dates" / "Reports" were advertised but didn't exist.
- **Milestones 2-5 built real, tested, RLS-verified features**: Staff Login Accounts (full invite → accept → role-aware sign-in → parallel staff dashboard at `/appointments/staff/dashboard/*`), Breaks & Blocked Dates (actually wired into slot generation, not just a form), Email Notifications (owner gets emailed on new self-service bookings — scoped this way since customers never provide an email anywhere in this product), Basic Reporting (real revenue chart + service breakdown, genuine Free-tier preview mode instead of a blank/denied page). **Deliberately stopped mid-Milestone-5 per Russell's instruction** — Waitlist, Calendar Sync, Deposits, SMS+Email Reminders, Advanced Reporting & Data Export, White Label, Recurring Appointments, Packages, and Memberships are NOT built.
- **Milestone 6 (UX)** added persistent usage meters, a Messenger sample-chat preview replacing the old disabled-form pattern, a quiet 60-79% usage tier, header renewal date/upgrade link, onboarding plan summary, a post-downgrade notice (wired into the real PayMongo webhook), and an over-limit-staff warning.
- **Milestone 7 (Marketing Sync)** fixed the landing page's stale hardcoded Pro feature list (now reads `PLAN_BULLETS.pro` directly) and **two** separate stale "billing is manual only" claims (Settings page + the public landing page itself — the second one was found only while verifying the fix for the first).
- **Real bugs found and fixed live, not just via code review**: an RLS infinite-recursion bug in Milestone 2 (same root-cause class as an earlier LMS incident — helper functions not marked `security definer`); a CSS bug where the new Reports revenue chart rendered completely empty (bar wrapper divs had no explicit height, so percentage heights resolved against 0); a bug where `canCreateAppointment`/`canAddProvider` silently returned `used: 0` for unlimited plans, which broke the onboarding checklist specifically for Pro-tier accounts.
- **Every feature was live-verified** with throwaway Supabase accounts (created and fully deleted after each pass), not just `tsc`/code review — including actually completing a staff invite, logging in as that staff member, and using the real staff dashboard end-to-end.
- **Mid-session incident, resolved cleanly**: a concurrent session (working on the LMS side of this repo) ran an interactive rebase and stashed all of this session's uncommitted work to get a clean tree. Work paused immediately rather than touching shared git state; once the other session's rebase finished, the stash returned intact and was verified byte-for-byte before resuming.

**Next recommended task:** Every audit finding is now closed and deployed except the one Russell chose to hold back (CSP header — needs its own session scoped to the shared root layout used by all 7 products). Everything else that's left needs Russell directly: decide whether the Supabase-`events`-table error log is enough or a real Sentry account is worth setting up (no dashboards/alerting with the current approach); decide whether the DB-backed rate limiter is sufficient or a dedicated service (Upstash, Vercel edge) is worth adding. Separately, unrelated to the audit: build a deferred Milestone 5 feature (Deposits has the most schema already in place, migration 015), or a real non-simulated PayMongo test-card checkout and an actual Gmail inbox check for the booking-notification email.

----------------------------------------

**LMS Production Readiness — Phase 8g: Performance (2026-07-13) — fully done, this closes out the entire phase 8 roadmap:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-performance-v1.md` for full detail.

Current Feature: Image optimization + a bundle/rendering audit — the final item of the production-readiness roadmap (8a-8g).

Current Status: Done.
- **Scoped from real evidence, not guesswork**: started from the actual `next build` route list, a repo-wide grep for raw `<img>` tags and `force-dynamic` usage, and a check of which files import the heaviest libraries (`@react-pdf/renderer`, `qrcode`) — rather than inventing dynamic-import busywork without real bundle numbers.
- **Real fix**: `/lms-logo.png` (776KB, 1254×1254) was served raw at 56×56 on login/signup — converted to `next/image`. Live-verified in the browser: the optimizer now serves a 128w variant at **2.9KB**, a 99.6% reduction.
- **`next.config.ts` gained `images.remotePatterns`** (`*.supabase.co/storage/v1/object/public/**`) so the user-uploaded business logo can also go through `next/image` — converted its two display spots (receipt page, Settings' "current logo" thumbnail); the live blob: preview during upload correctly stays a plain `<img>`. Verified the pattern actually works (not just doesn't error) by hitting `/_next/image` with a real Supabase URL and confirming "upstream response is invalid" (file genuinely missing) rather than a hostname-rejection error.
- **Two audits came back clean, reported rather than forced into unnecessary changes**: confirmed the heavy libraries never reach the client bundle (already `server-only`/route-handler-only); confirmed all 33 `force-dynamic` LMS pages are already correctly dynamic due to their own auth/cookie checks, so removing the export wouldn't change anything.
- `npx tsc --noEmit` clean, `npx next build` succeeds with zero errors, zero console errors in live browser verification.

**This closes out phase 8 (8a-8g) entirely** — feature flags, RHF+Zod forms, data-layer pagination/search/sort/filter, UX/reliability polish, files & documents, audit logs, and performance. No further roadmap items remain; future work would be new feature requests.

**Next recommended task:** None from this roadmap. Commit/push/deploy this phase, then wait for Russell's next request.

----------------------------------------

**LMS Production Readiness — Phase 8f: Audit Logs (2026-07-13) — code done, tsc + build clean, migration run:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-audit-logs-v1.md` for full detail.

Current Feature: New `audit_logs` table + logging helper wired into 8 key mutations, plus an owner-only Activity History view — the last roadmap item before performance (8g).

Current Status: Code complete.
- **New migration `014_audit_logs.sql`** — **Russell needs to run this in the LMS Supabase project's SQL Editor** before any of this works (the table doesn't exist yet).
- **Deliberately scoped to 8 "key mutations," not all ~28 action functions**: order status/staff-assignment/driver-assignment/priority changes, inventory/driver deletions (fetches the entity's name first so the log reads clearly, not a bare UUID), staff invites, and business/branch profile updates. `logActivity()` is best-effort — checks for an insert error and logs it, but never blocks or fails the real mutation it's describing.
- **New `view_activity_log` permission**, owner-only by omission from `STAFF_PERMISSIONS` (same pattern as `manage_subscription`) — no new gating logic needed.
- **New Activity page reuses the phase 8c primitives** (`DataTable`, `FilterPills`, `TableSearchInput`) entirely via composition — search, entity-type filter, sortable timestamp column, human-readable per-action detail summaries.
- Fixed an unrelated blocker along the way: `npm install` had never been re-run after the earlier TMS-session merge, so `node_modules` was out of sync with the merged `package.json` (`idb`/`papaparse` missing) — resynced, confirmed the resulting `tsc` errors were TMS-only and disappeared, zero errors in LMS files.
- `npx tsc --noEmit` clean, `npx next build` succeeds with zero errors (new `/dashboard/activity` route builds, correctly marked dynamic).

**Not verified this pass**: nothing in this feature is exercisable until the migration runs, and further production-database writes for testing keep hitting the safety classifier's per-action confirmation requirement (same friction as 8d/8e). Recommend Russell runs the migration, then a live pass: trigger each of the 8 instrumented mutations and confirm they show up correctly on the Activity page with the right actor/action/detail, confirm a staff account can't reach `/dashboard/activity` directly, confirm search + entity-type filter work.

**Next recommended task:** Russell runs `014_audit_logs.sql`, then live-verify this phase or move to phase 8g (the roadmap's final item: dynamic imports, bundle audit, image optimization).

----------------------------------------

**Territory Management System — Group size/publisher count mobile stepper buttons (2026-07-13) — code done, tsc + build clean, committed:**

Current Product: Territory Management System (TMS).

Current Feature: Russell tested the live site and found Group size still stuck at 1 on mobile — turned out the earlier fix (documented below, "Mobile QR/Group Size fixes + Global CSV Import") had never been committed or deployed, so he was testing the old code. Also flagged that a plain `type="number"` input gives mobile no visible way to change the value at all (no stepper arrows on mobile browsers — that's a desktop-only convention), just a numeric keypad requiring clear-and-retype.

Current Status: Code complete.
- New `NumberStepper` (local to `AssignmentForm.tsx`, not extracted to a shared component — this is the only place in TMS with a small-bounded-range numeric control) adds explicit tap +/− buttons on both "Publishers going out" and "Group size", alongside the existing typeable field (still useful for a bigger jump, e.g. typing "8" directly rather than tapping + six times). Buttons disable at min/max.
- Live-verified in the browser preview at mobile width (375px) via a temporary scratch route (removed after testing, not part of the diff): tapping +/− correctly increments/decrements, decrementing at the floor (1) correctly does nothing once disabled, and typing a fresh value (clearing the field and entering "8") still works — confirmed via the accessibility tree, not just visually (an early screenshot briefly showed a stale frame after a rapid triple-click, not a real bug — a fresh screenshot immediately after confirmed the DOM value was already correct).
- `npx tsc --noEmit` and `npx next build` clean.
- **Committed and this time actually includes everything from this whole session** (previously all uncommitted) — Russell needs to deploy for any of this session's fixes to reach the live site, including this one.

**Next recommended task:** Russell deploys this branch (or merges to `main`) so the live site actually reflects this session's fixes, then re-tests Group size on a real mobile device.

----------------------------------------

**Territory Management System — "Bible Studies in the Area" stat (2026-07-13) — code done, tsc + build clean, blocked on Russell's live re-test:**

Current Product: Territory Management System (TMS).

Current Feature: Russell asked for a new stat on the Group Leader Dashboard tab — how many Bible Studies are active in the area. Confirmed via clarifying questions: scoped to today's assigned batch's territories (matching the tab's other stats, not congregation-wide), and counts a record only when its most recent visit is the established "Bible Study" result (not "Started Bible Study").

Current Status: Code complete.
- New `countActiveBibleStudies()` (`src/lib/territory-management-system/modules/reports/queries.ts`) — deliberately has **no date range** (unlike the existing `getVisitResultCounts`, which only looks at visits logged within one day): a study runs over weeks, so "active" means each record's latest visit ever, not just one logged today. Same "rows ordered newest-first, first occurrence per record_id is the latest" de-dup pattern as the existing function.
- `BatchStats` (not the more general `ReportStats` used by the separate admin Reports page — this stat wasn't requested there, so it wasn't added there) gained `activeBibleStudies: number`, computed alongside the tab's other `Promise.all`'d stats in `getBatchStats`.
- New "Bible Studies in the Area" StatCard added to `GroupLeaderTabs.tsx`'s Dashboard tab.
- `npx tsc --noEmit` and `npx next build` clean. **Not live-verified**: same standing limitation as every prior TMS pass this session — no Supabase credentials in this worktree.

**Next recommended task:** Russell confirms live: a record whose latest visit is "Bible Study" shows up in the count; one whose latest visit is "Started Bible Study" (not yet promoted to ongoing) correctly does not; the count only reflects today's assigned territories, not the whole congregation.

----------------------------------------

**Territory Management System — Group Leader dashboard stale-stats fix (2026-07-13) — code done, tsc + build clean, blocked on Russell's live re-test:**

Current Product: Territory Management System (TMS).

Current Feature: Russell reported the Group Leader dashboard's Visit Results don't update when a publisher syncs a visit.

Current Status: Root cause found and fixed.
- `GroupLeaderDashboardPage` (`src/app/territory-management-system/group-leader/dashboard/page.tsx`) is a Server Component that fetches `stats` once per request and passes it down as a prop into `GroupLeaderTabs` (`'use client'`). Switching between Home/Dashboard/Visit Results/Ministry Partner is pure client-side tab state — nothing there ever refetches. So if a Group Leader has the dashboard open and a publisher syncs a visit on a different device, nothing updates until a manual full browser reload — not a caching bug, just no refresh mechanism existed at all.
- Fixed in `GroupLeaderTabs.tsx`: a `useEffect` now calls Next.js's `router.refresh()` (re-runs the page's Server Component, pushes fresh `stats` down without losing the selected tab, since that's separate local state) every 30 seconds, plus immediately whenever the tab regains focus (`visibilitychange`) — covers both "left it open" and "checked back after being away" without needing WebSockets/Supabase Realtime.
- `npx tsc --noEmit` and `npx next build` clean. **Not live-verified**: same standing limitation as every prior TMS pass this session — no Supabase credentials in this worktree, and this is a client-side effect on a Group-Leader-authenticated page with no way to exercise it without real data.

**Next recommended task:** Russell confirms live: open the Group Leader dashboard's Visit Results tab, have a publisher sync a visit from another device, and either wait ~30s or switch away and back to the browser tab — the count should update without a manual page reload.

----------------------------------------

**Territory Management System — Publisher workflow: auto-advance, Initial Visit default, Started/Bible Study conductor prompt (2026-07-13) — code done, tsc + build clean, blocked on migration 008 + Russell's live click-through:**

Current Product: Territory Management System (TMS).

Current Feature: Four related changes to how a publisher logs a visit, confirmed with Russell via clarifying questions before building:
1. After logging a visit, the app auto-advances to the next incomplete assigned record (skipping already-completed ones, wrapping to check earlier ones left incomplete out of order) instead of leaving the publisher on the just-logged record — falls back to the records list (which already shows "All assigned records are done!") once nothing is left.
2. `initial_visit` removed from the selectable Result dropdown in both visit-log forms (admin and publisher) — it's the implicit state of any record with zero logged visits, never something a publisher picks as an outcome. Un-visited records now explicitly show "Initial Visit" as their default label (records list, publisher record detail, admin record detail) rather than blank.
3. New, separate `started_bible_study` result distinct from the existing `bible_study` (first-time vs. an already-ongoing study) — both new to the selectable list.
4. Selecting either Bible Study result prompts for who's conducting it (worded differently per option — "Name of the publisher" vs. "Who is conducting the Bible Study?"), required before logging. Folded into the existing Notes field via a shared `mergeConductorIntoNotes()` helper (prefix `"Conducted by: {name} — "`) rather than a new DB column — computed client-side in the publisher's form (so the offline sync payload needs no special server-side handling) and server-side in the admin's `logVisitAction`.

Current Status: Code complete, `tsc`/`next build` clean.
- New migration `008_started_bible_study_result.sql` widens `territory_record_visits.result`'s CHECK constraint to add `'started_bible_study'` — **Russell needs to run this in the TMS Supabase SQL Editor** before that result can be logged (will fail with a DB constraint violation until then).
- `VISIT_RESULTS`/`VISIT_RESULT_LABELS`/`VISIT_RESULT_STYLES`/`SELECTABLE_VISIT_RESULTS` (`records/schema.ts`) are the single source of truth every display spot already read from generically (`VisitResultBadge`, `VisitHistoryList`, `emptyResultCounts()` in reports) — adding `started_bible_study` there was enough to flow through everywhere except two hardcoded Visit Results StatCard grids (`GroupLeaderTabs.tsx`, `ReportsView.tsx`), which got an explicit new tile each.
- `PartnershipWorkspaceApp.tsx`'s auto-advance uses each assigned record's existing `sequence` number (already fetched, already used for display ordering) — no new field needed.
- **Not verified live this pass**: same standing limitation as every prior TMS pass this session — no Supabase credentials in this worktree, and every changed surface (both visit-log forms, the publisher offline workspace, both stats views) sits behind Supabase auth or the offline-first publisher app shell, neither exercisable without real data.

**Next recommended task:** Russell runs migration 008, then live-verifies: logging a visit auto-advances to the next incomplete record; Initial Visit shows as the default label on a fresh unvisited record; both Bible Study options require and correctly save the conductor name into Notes; the new Visit Results tiles show correct counts on both the Group Leader dashboard and admin Reports.

----------------------------------------

**Territory Management System — TMS slow-load diagnosis + auth round-trip reduction (2026-07-13) — code done, tsc clean, blocked on Russell's live measurement:**

Current Product: Territory Management System (TMS).

Current Feature: Russell asked why `/tms` loads much slower than the main cyberussell.com site. Diagnosed two separate causes: (1) every TMS route is server-rendered dynamically on every request (confirmed via `next build` output — main site pages are mostly `○` static/CDN-served, every TMS route is `ƒ` dynamic), and authenticated pages additionally did 3 sequential Supabase network round-trips (`auth.getUser()` → profile fetch → congregation fetch) via `requireRole()` before rendering anything; (2) TMS shares the site-wide root layout (`src/app/layout.tsx`), so every TMS page — including the bare login screen — also loads Google Fonts, GA, Vercel Analytics, 2 marketing JSON-LD blocks, Facebook Pixel, TikTok Pixel, and conditionally AdSense, none of which serve any purpose on an internal login/dashboard page.

Current Status: Implemented the TMS-only fix (cause 1's redundant round-trip); the other two causes were flagged, not yet acted on.
- `requireRole()` (`src/lib/territory-management-system/modules/auth/queries.ts`) collapsed the sequential profile-fetch + congregation-fetch into a single PostgREST embedded query (`.select('role, congregation_id, revoked_at, congregation:congregations(*)')`, using the existing `profiles.congregation_id → congregations.id` FK) — cuts one full Supabase round-trip off every authenticated TMS page load (3 → 2, alongside `auth.getUser()`). RLS applies to both the base and embedded table independently and the existing "admin/group leader reads own congregation" policies (migrations 001/003) already cover this, so no RLS change was needed.
- `npx tsc --noEmit` clean. **Not live-verified / no before-after timing measured**: no Supabase credentials in this worktree to exercise the change or measure real latency.
- **Not yet done, flagged to Russell**: skipping the marketing pixel/analytics/JSON-LD payload for TMS (and likely Appointments/LMS/Mission Control dashboards too) requires editing the shared root layout — out of TMS-only scope, needs his explicit go-ahead. Also flagged: check whether the Vercel deployment's function region and the TMS Supabase project's region are co-located — could be the single biggest factor if not, and isn't checkable from this environment.

**Next recommended task:** Russell measures real load times before/after this change (e.g. via browser devtools Network tab or Vercel's own request timing) to confirm the win, and decides whether to proceed with the root-layout pixel-skipping change and/or check the Vercel/Supabase region alignment.

----------------------------------------

**Territory Management System — Group Leader invite congregation-attachment fix (2026-07-13) — code done, tsc clean, blocked on Russell's live re-test:**

Current Product: Territory Management System (TMS).

Current Feature: Russell sent a real Group Leader invite (first live test of that flow), the invited person accepted it and set their password, but logging in afterward hit the "not provisioned" error — they were never attached to Russell's congregation.

Current Status: Root cause found and fixed.
- `inviteGroupLeader` (`src/lib/territory-management-system/modules/groupLeaders/queries.ts`) turned the trigger-created default profile row into a real Group Leader via `.update({...}).eq('id', data.user.id)`. A Supabase `.update()` that matches zero rows returns success with **no error** — it just silently does nothing. That update depended on `handle_new_user()`'s trigger having already inserted the profile row for the brand-new invited auth user; if the update ran before/raced that insert (or missed for any other reason), it would no-op with no visible failure — invite email still sent, admin sees no error, but `role`/`congregation_id` never get set. Exactly matches what Russell hit.
- Fixed by switching `.update().eq(...)` to `.upsert({ id: data.user.id, role: 'group_leader', congregation_id, email, full_name })` — writes the row unconditionally regardless of whether the trigger's insert already landed, so this can't silently no-op again.
- `npx tsc --noEmit` clean. **Not live-verified**: same standing limitation as every prior TMS pass this session — no Supabase credentials in this worktree, and this is a server-side write behind admin auth with no browser-observable surface to smoke-test.

**Next recommended task:** Russell re-sends a real invite against this fix and confirms the invited Group Leader can log in immediately (no "not provisioned" error). If it still fails, the next thing to check live is whether `data.user.id` returned by `inviteUserByEmail` actually matches the `auth.users` row Supabase created (would need direct DB/log access this session doesn't have).

----------------------------------------

**Territory Management System — Mobile QR/Group Size fixes + Global CSV Import (2026-07-13) — code done, tsc + build clean, blocked on migration 007 + Russell's live click-through:**

Current Product: Territory Management System (TMS) — see checkpoint `territory-management-mobile-qr-groupsize-import-v1.md` for full detail.

Current Feature: Three follow-up requests — a 2x-larger QR code on the Group Leader dashboard's mobile view, a fix for "Group size cannot be edited on mobile" (a real bug: the number input snapped back to 1 on every keystroke while being cleared, fighting a mobile numeric keypad), and a new cross-territory CSV import accepting `name, plus code, territory name, section, block, household members, note` — generalized from the existing per-territory importer rather than building a second one, resolving Territory/Section/Block per row by case-insensitive exact match (confirmed with Russell: no auto-creation of missing structure).

Current Status: Code complete, `tsc`/`next build` clean.
- New migration `007_optional_address_household_members.sql` makes `territory_records.address` optional (the new import format has no address column — Plus Code is the location identifier instead, confirmed with Russell) and adds `household_members integer` — **Russell needs to run this in the TMS Supabase SQL Editor** before the new global import or the Household Members field will work.
- Every place that displays a record by its address (records table, delete-confirm text, record detail title, both publisher-facing public views) now falls back to Plus Code, then "Unlabeled record", since address can be blank now.
- **Not verified live this pass**: same standing limitation as every prior TMS pass this session — no Supabase credentials exist in this worktree, and all three changed surfaces sit behind Supabase auth. Only confirmed the dev server boots and the one DB-independent route (`/territory-management-system/login`) renders with zero console errors.

**Next recommended task:** Russell runs migration 007, then live-verifies on a real mobile device (QR size + scannability, group-size typing) and does a real CSV import round-trip with the new global format (including a couple of deliberately-wrong territory/section/block names to confirm per-row error messages). After that: the standing next-step remains a full live pass through the rest of the Administrator dashboard (Territories, Reports, Settings) against real data.

----------------------------------------

**Territory Management System — Group Leader Invite System + GL Dashboard Nav Rework (2026-07-13) — code done, deployed, blocked on migration 006 + Russell's live click-through:**

Current Product: Territory Management System (TMS) — see checkpoint `territory-management-group-leader-invites-v1.md` for full detail.

Current Feature: Admins can now invite Group Leaders (first/last name + email → Supabase invite email → they set their own password), revoke/restore their access anytime, and permanently delete a history entry once it's 6+ months old (server-enforced). Added a shared password-reset flow (forgot-password + set-password, the latter reused for invite-acceptance too, both landing via the same PASSWORD_RECOVERY event). Also removed the Admin's read-only Assignments pages entirely (assignment oversight is exclusively the Group Leader's job now, per Russell) and reworked the Group Leader dashboard's own navigation per his follow-up request: a persistent Home/Dashboard/Visit Results/Ministry Partner tab bar under the congregation header, Delete Assignment as an icon in the QR card, centered Regenerate Assignment, Log Out moved to the page bottom.

Current Status: Code complete, `tsc`/`next build` clean, deployed to production.
- New migration `006_group_leader_management.sql` adds `profiles.email` and `profiles.revoked_at` — **Russell needs to run this in the TMS Supabase SQL Editor** before the Group Leaders page will work at all.
- `profiles` RLS only ever had an "own profile" policy — no policy for an admin to list other congregation members' profiles. Rather than add one, the new Group Leaders list/mutations use the service-role client with congregation scoping enforced explicitly in every query (same pattern the public publisher routes already use).
- **Not verified live this pass**: same environment limitation as the prior TMS passes this session — this session can't decrypt Supabase credentials to click through real data. Full verification checklist is in the checkpoint (run migration, send a real invite, confirm the email/set-password/login round-trip, confirm revoke actually blocks login, confirm delete's 6-month gate).

**Next recommended task:** Russell runs migration 006 and works through the checkpoint's verification checklist. After that: a full live pass through the rest of the Administrator dashboard (Territories, Contact Records, CSV import/export, Reports, Settings) is still entirely unverified against real data — this has been the standing next-step since the very first live TMS pass this session.

----------------------------------------

**Territory Management System — Publisher Workflow v2 (2026-07-13) — code done, deployed, blocked on migration 005 + Russell's live click-through:**

Current Product: Territory Management System (TMS) — see checkpoint `territory-management-publisher-workflow-v2.md` for full detail.

Current Feature: Redesign of the publisher (Ministry Partner) workflow — claiming now happens only when a name is saved (not on link-open), each device is locked to one partnership and sees any other partnership read-only, an end-of-session Sync → "Thank you for your service today!" flow, an "End My Ministry Early" button that marks unfinished records as a real `undone` visit result, and a new "Other" visit result that requires a note.

Current Status: Code complete, `tsc`/`next build` clean, deployed to production (`0cd831d`).
- New migration `005_publisher_workflow_v2.sql` widens `territory_record_visits.result`'s CHECK constraint for `'other'`/`'undone'` and adds `partnerships.ended_early_at` — **Russell needs to run this in the TMS Supabase SQL Editor** before "Other" or early termination will work (they'll fail with a DB constraint violation until then).
- Device-local claiming via a new `localStorage` helper (`modules/offline/claim.ts`), not a DB/account concept — matches the product's existing no-login publisher design.
- **Not verified live this pass**: this session's Vercel CLI access could list encrypted env vars but not decrypt them (`vercel env pull` returned empty values for every encrypted var, confirmed on both TMS and LMS, so it's an environment-level restriction, not TMS-specific) — no way to seed test data or click through the real Supabase project from here. Russell chose to test live himself once migration 005 is run, following the checklist in the checkpoint, rather than have a throwaway-congregation SQL seed script handed over.

**Next recommended task:** Russell runs migration 005, generates a fresh assignment batch, and clicks through the full flow (claim, read-only view of a second partnership from the same device, "Other" requiring notes, all-records-done → Sync → Thank You, early termination marking Undone) — see the checkpoint's verification checklist. After that, the next logical step is a full live pass through the rest of the Administrator dashboard, which remains entirely unverified against real data.

----------------------------------------

**Territory Management System — Group Leader Login Crash Fix (2026-07-13) — fixed, deployed, live-verified:**

Current Product: Territory Management System (TMS) — see checkpoint `territory-management-group-leader-login-fix-v1.md` for full detail.

Current Feature: Russell provisioned the TMS Supabase project and hit a crash on his very first live login as Group Leader (generic "Something went wrong — Server Components render" error). This was the first real live-DB click-through of any TMS screen.

Current Status: Fixed and deployed.
- **Bug 1**: `congregations.timezone` was set to `"GMT+8"` (not a valid IANA zone) during manual provisioning — crashed `Intl`/`toLocaleDateString` calls in `assignment/date.ts`/`reports/date.ts` uncaught. Added a `safeTimezone()` guard (falls back to `'UTC'`); Russell also corrected the DB row to `'Asia/Manila'`.
- **Bug 2**, found after Bug 1's fix let the page render further: an inline arrow-function closure wrapping a Server Action (`action={() => deleteX(id)}`) passed from a Server Component into a Client Component isn't a valid serializable Server Reference — throws during RSC payload serialization the instant an assignment batch exists. Fixed via `.bind(null, id)` in both the Group Leader dashboard and the one other TMS file with the identical pattern (admin Territory detail page's delete button).
- Also fixed in passing: `actions/auth.ts` silently defaulted an unknown/failed role lookup to `'admin'` instead of surfacing the error.
- `tsc`/`next build` clean after each fix. Committed as two commits, pushed and merged directly to `main` at Russell's request, both auto-deployed via Vercel (confirmed `● Ready` in Production). **Live-verified by Russell**: Group Leader dashboard now loads cleanly.

**Not verified this pass**: everything else DB-backed in TMS (Administrator dashboard screens, publisher QR workflow, offline sync) — this was only the Group Leader dashboard's first-ever real click-through. Given two latent bugs surfaced on this one screen, other screens likely have similar never-before-exercised issues.

**Next recommended task:** A real live pass through the rest of the Administrator dashboard (create a territory, generate sections/blocks, add/import records, generate an assignment batch, walk the publisher QR flow end-to-end) — see the checkpoint's "Next Recommended Task."

----------------------------------------

**Territory Management System — Production Readiness Audit (2026-07-13) — code done, tsc + build clean, blocked on Supabase provisioning:**

Current Product: Territory Management System (TMS) — see checkpoint `territory-management-production-audit-v1.md` for full detail.

Current Feature: A full code-level production audit of the entire product, per Russell's request. **Recovery note, important context**: this session started from a different Claude account whose usage had run out mid-build — the actual code (assignment engine, QR-based publisher workflow, offline IndexedDB sync, group-leader dashboard, reports) existed only as *uncommitted* changes in a sibling worktree (`territory-management-foundation-6a5bc9`) and was never checkpointed past phase 1. It was found via `.claude/projects/` transcript folders (filesystem-level, not tied to the Claude account) and copied into this branch, then committed as a baseline (`c7f4808`) before the audit began — see checkpoint `territory-management-foundation-v1.md` for the original (partial, phase-1-only) documentation of what was built.

Current Status: Code complete.
- Read every screen, Server Action, query module, and all 3 migrations end-to-end. Fixed every real issue found: 4 cross-tenant data-integrity gaps (admin write paths that trusted a client-supplied territory/section/block id without verifying it belonged to the caller's own congregation — RLS caught the congregation_id but not the nested parent id), 1 timezone-validation gap, 1 raw-Postgres-error leak, 2 stale business-rule bugs (a leftover pre-migration-002 visit-result value used as a form default and in a color-style map, both silently wrong for 3 of 6 real result values), 2 offline-sync correctness bugs (a re-entrancy race that could double-submit a queued item, and network failures being conflated with genuine server rejections), 2 sync UX gaps (pending/failed counts conflated; a false "done" checkmark on records with a failed sync), a completely missing `loading.tsx`/`error.tsx` pattern across the whole product, 3 accessibility gaps in the shared `DataTable`/`FilterPills` primitives, and 2 duplicate-code spots.
- `npx tsc --noEmit` and `npx next build` both clean after every fix.

**Not verified this pass**: still blocked on Supabase provisioning (no TMS project exists yet) — everything DB-backed was verified by code tracing, not live-clicked. Full detail on what's still outstanding is in the checkpoint.

**Next recommended task:** Russell provisions the TMS Supabase project and runs all 3 migrations in order, then a full live pass (ideally including a real airplane-mode test of the offline queue) — see the checkpoint's "Next Recommended Task" for the exact sequence.

----------------------------------------

**Territory Management System — Foundation + Administrator Module (2026-07-13) — code done, tsc + build clean, blocked on Supabase provisioning:**

Current Product: Territory Management System (TMS) — brand-new 9th product, first session. See checkpoint `territory-management-foundation-v1.md` for full detail.

Current Feature: Full application foundation (multi-congregation tenancy, auth, congregation profile/settings) plus the complete Administrator module (Territory Management + Territory Records), per Russell's spec. Confirmed via clarifying questions before building: section/block generation is count-based (admin specifies counts, auto-labeled A/B/C… and 1/2/3…, editable after); a Territory Record = one address/household with a dated visit-history log; CSV-imported records land as `pending` for admin review (manually-created records are `approved` immediately); tenant provisioning is manual this pass (no public signup route — congregations/admins are provisioned directly per `territory-management-system/SETUP.md`).

Current Status: Code complete.
- **Architecture**: follows the Appointment System/LMS pattern exactly — own dedicated Supabase project (env vars `NEXT_PUBLIC_TMS_SUPABASE_URL`/`NEXT_PUBLIC_TMS_SUPABASE_ANON_KEY`/`TMS_SUPABASE_SERVICE_ROLE_KEY`), own auth, own `lib`/`components`/`app` namespace, no shared code with other products.
- **New migration `001_init.sql`**: `profiles`, `congregations`, `territories`, `territory_sections`, `territory_blocks`, `territory_records`, `territory_record_visits`, plus `create_territory_structure()` (atomic RPC for count-based section/block generation), `tms_section_label()`, and a `territory-maps` Storage bucket. Deliberately denormalized `congregation_id` onto every tenant-scoped table so every RLS policy is a flat check with no cross-table joins — a direct lesson from LMS hitting RLS recursion twice in earlier sessions.
- **Full Administrator dashboard built**: Territories (CRUD, auto section/block generation with atomic RPC, JPG map upload + click-to-zoom viewer, manual add/delete section/block), Records (CRUD, search, status filter, pagination via a reusable `DataTable`, CSV import scoped per-territory with section/block label resolution + error reporting, CSV export via a streaming route handler, per-record visit history log, pending-approval workflow with approve/reject), Settings (congregation profile).
- **One new dependency**: `papaparse` (+ `@types/papaparse`) for CSV import — flagged explicitly since AGENTS.md asks not to add dependencies silently; justified because CSV Import is a named required feature and hand-rolled RFC4180 parsing has real edge cases (quoted fields, embedded commas).
- **Mobile-responsive sidebar** (slide-in drawer on mobile, static column on desktop) — a gap LMS's own sidebar still has (flagged in LMS's phase-2 checkpoint as unfixed); built correctly from the start here since "Responsive Layout" is an explicit named requirement for this product.
- `npx tsc --noEmit` clean, `npx next build` succeeds with zero errors (all TMS routes correctly marked dynamic `ƒ`, avoiding the exact static-prerendering build failure LMS hit once before — confirmed by testing the build with TMS env vars deliberately blanked out).

**Not verified this pass**: everything DB-backed (dashboard KPIs, territory creation, section/block auto-generation, records CRUD/CSV import-export/visit history/approval) is blocked until Russell provisions the dedicated TMS Supabase project and runs `001_init.sql` — same sequencing as LMS's very first phase. Only the login page was live-verified in the browser preview (desktop + mobile 375×812, zero console errors) since it has no DB dependency.

**Next recommended task:** Russell provisions the TMS Supabase project (create it, run `001_init.sql`, set the three env vars, provision the first congregation + admin per `territory-management-system/SETUP.md` §3), then a live pass: log in, create a territory with auto-generated sections/blocks, upload a JPG map, add records manually and via CSV import, log a visit, approve a pending record, edit congregation settings. After that, the next module would be publisher-facing territory assignment/checkout (not started, not yet scoped).

----------------------------------------

**LMS Production Readiness — Phase 8e: Files & Documents (2026-07-13) — fully done, deployed, and verified live:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-files-documents-v1.md` for full detail.

Current Feature: Business logo upload (Supabase Storage, first pass — logo only, per the phase 8a decision) and a real downloadable receipt PDF via `@react-pdf/renderer` — the "files & documents" item from the roadmap.

Current Status: Done.
- **Migration `013_business_logo.sql`** run by Russell in the Supabase SQL Editor — adds `businesses.logo_url`, a public `business-logos` Storage bucket, and owner-only write RLS on `storage.objects` scoped to each business's own folder.
- **`uploadBusinessLogo`** validates PNG/JPEG/WebP ≤2MB, clears any existing file in the business's Storage folder first, updates `logo_url` with a cache-busted public URL. `BusinessLogoForm` (file input + instant client-side preview) added to Settings.
- **Real bug caught mid-verification, not a code issue**: the first live-verification attempt found the logo section missing entirely — turned out phase 8e had only been *committed* (`807d5f1`), never pushed, so production was still serving the pre-8e build. Pushed, confirmed Vercel redeployed (`● Ready`), re-verified successfully afterward.
- **New `ReceiptDocument`** (`@react-pdf/renderer`) mirrors the HTML receipt exactly on an A6 page; a route handler streams it back as a real PDF, gated by the same `print_receipts` check as the HTML view.
- Fixed a real `tsc` error along the way: `NextResponse` doesn't accept a raw Node `Buffer` as body in this TS config — wrapped in `new Uint8Array(buffer)`.
- **Fully live-verified against production** with a throwaway owner account (created and fully deleted afterward — business, branch, orders, and the uploaded Storage file, all cross-checked via REST, nothing left behind): uploaded a real 776KB PNG, confirmed the instant client-side preview, confirmed `logo_url` set correctly and the file publicly retrievable byte-for-byte; did a format-change re-upload (PNG → JPEG) and confirmed via the Storage API that the *old file was actually deleted*, not just superseded; downloaded the receipt PDF and confirmed a genuine `%PDF-1.3` file (correct content-type, filename, 59.7KB) rather than a broken response; confirmed an unauthenticated request to the same PDF URL gets redirected to `/login` instead of leaking the file. Zero console errors throughout.

**Next recommended task:** Move to phase 8f (audit logs table + owner-only Activity History view).

----------------------------------------

**LMS Production Readiness — Phases 8a-8d: deployed to production, partially live-verified (2026-07-13):**

Current Product: Laundry Management System (LMS) — see checkpoints `laundry-management-system-{feature-flag-architecture,form-foundation,data-layer,ux-reliability}-v1.md`.

Current Feature: Committed and pushed all previously-uncommitted LMS work (phases 8a-8d: feature flags, RHF+Zod forms, data-layer pagination/search/sort/filter, toasts/optimistic-updates/loading-error-states/accessibility) — none of it had been committed before, despite 8a-8c already being checkpointed as "done" in earlier sessions. Deliberately left the working tree's unrelated Appointment System changes (new migrations, staff-login components, etc. from a different session) untouched and uncommitted, per the one-product-at-a-time rule.

Current Status: Deployed.
- Committed (`c03caed`, 61 files) and pushed to `main` — confirmed Vercel auto-deployed (`dpl_4WyosgxVRg4QGxs5G7kNqXNwfMRB`, `● Ready`), `/laundry-management-system` and `/laundry-management-system/login` both smoke-checked `200` on the live site.
- **Live-verified against production** with a throwaway owner account (created and fully deleted afterward, cascade-confirmed via REST): `OrderStatusControl`'s `useOptimistic` conversion confirmed working for real — the status badge updates synchronously in the same script execution as the dispatch, before any server round-trip, then persists correctly after refresh. Zero console errors.
- **Not verified this pass**: `PriorityToggle`'s optimistic flip, toasts on Inventory/Driver/pickup-delivery mutations, loading skeletons, the `error.tsx` boundary, and the new `aria-label`s. Further production-database writes to exercise these were blocked by Claude Code's safety classifier requiring fresh per-action confirmation for each new write against live data; Russell decided verifying the highest-risk item (the `useOptimistic` conversion) was enough for now.

**Next recommended task:** Cover the remaining unverified 8d items in a follow-up pass — ideally against a non-production sandbox to avoid the per-action confirmation friction — then continue with phase 8e (Supabase Storage + business logo upload, real receipt PDF via `@react-pdf/renderer`).

----------------------------------------

**LMS Production Readiness — Phase 8d: UX & Reliability Polish (2026-07-12) — code done, tsc clean, live verification NOT completed:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-ux-reliability-v1.md` for full detail.

Current Feature: Continuing the phase 8 production-readiness roadmap — loading/error states, toast notifications, optimistic updates, and an accessibility pass. Dark mode (also listed under 8d in the original roadmap) was explicitly deferred — confirmed with Russell that real dark-mode support means re-theming ~40 already-built pages (zero `dark:` variants exist anywhere today), which would reverse phase 8a's decision to apply the redesign bar only to new components going forward.

Current Status: Code complete, `npx tsc --noEmit` clean. **Live browser verification was not completed** — the Browser tool's model-safety classifier went down mid-session and stayed down after repeated retries; Russell chose to close this pass out on tsc-clean + a manual code re-read rather than wait it out.
- **Loading/error states**: one shared `DashboardSkeleton`/`DashboardErrorFallback` pair backs `loading.tsx`/`error.tsx` at each of the 3 dashboard layout levels (owner/staff/customer) — sufficient since a `loading.tsx` at a layout level already covers every nested route under it that doesn't define its own.
- **Toasts**: `sonner`'s `<Toaster/>` scoped to the 3 LMS dashboard layouts specifically (not the site-wide root layout LMS shares with the rest of cyberussell.com — a global toaster would've leaked into other products). Wired into `useServerAction` itself (free win for every form using the hook) via a new `toastSuccessMessage` param; 4 more forms (`DriverAssignmentControl`, `StaffAssignmentControl`, pickup/delivery schedule forms) migrated onto the hook to get toasts too, removing their hand-rolled `state.error === 'SAVED'` boilerplate in the process. Real bug fixed as a side effect: `InventoryManager`'s silent-failure gap (flagged, unfixed since phase 6) is now fixed by the same toast wiring.
- **Optimistic updates**, scoped to exactly what the roadmap named ("status/priority/driver"): `OrderStatusControl` and `PriorityToggle` now use real `useOptimistic` (the latter had a genuine UX lag before — button didn't flip until refresh). Driver assignment intentionally skipped — after the hook migration its pending-disabled state already covers the only visual feedback it has, nothing left to optimize.
- **Accessibility**: `aria-label`s added to every previously-unlabeled icon-only button (edit/delete/save/cancel in Inventory/Driver managers, the receipt print link, the status `<select>`) and to the search inputs (mirroring their placeholder, since placeholder-only inputs are a real screen-reader anti-pattern).
- Manual code re-read in place of live verification confirmed: all 4 migrated actions match `useServerAction`'s expected signature; every new toast call checks `result.error` first; both `useOptimistic` calls happen inside `startTransition` and revert correctly via `router.refresh()`.

**Next recommended task:** Do a live browser pass on this phase's changes (loading skeletons, a forced error, toasts on real mutations, optimistic status/priority flips, a screen-reader spot check) once the Browser tool's classifier issue is confirmed clear — ideally before or alongside starting phase 8e (Supabase Storage + business logo upload, real receipt PDF via `@react-pdf/renderer`).

----------------------------------------

**LMS Production Readiness — Phase 8c: Data Layer (2026-07-12) — fully done and verified live:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-data-layer-v1.md` for full detail.

Current Feature: Continuing the phase 8 production-readiness roadmap — pagination, search, sorting, and richer filtering across Orders, Customers, and Inventory.

Current Status: Done.
- **`DataTable`** gained optional column-header sorting and built-in pagination (15 rows/page) — additive only, no existing call site needed to change.
- **New `OrdersTable`** (client component) consolidates ~90 lines of duplicated filter/table markup between the owner and staff Orders pages, adds a fuzzy search box (order #/customer/service), and — confirmed with Russell before building — moves status/"Mine" filtering from server-side URL params (full page reload) to client-side filtering over a single full fetch, matching the pattern `CustomerSearchTable`/`InventoryManager` already used. Trade-off: filtered order views are no longer bookmarkable via URL.
- **New `FilterPills`/`TableSearchInput`** reusable primitives replace hand-rolled pill/search markup previously duplicated across Orders (owner+staff) and Inventory.
- **Inventory scoped down on purpose** (confirmed with Russell): search + `FilterPills` added, but no pagination/sorting — its category-grouped, inline-editable table doesn't fit a flat sortable/paginated shape, and category grouping already keeps lists manageable at typical SMB sizes.
- **Verification friction, not a product bug**: the dev server was shared with another concurrently running chat session in the same repo, causing the test browser sessions to get silently logged out mid-verification several times (unrelated to this phase's code, which never touches auth). Worked around by seeding/cleaning up test data directly via the Admin/REST API and re-logging in immediately before each browser check.
- Verified live end-to-end with a throwaway owner + staff account (business, branch, 3 customers, 20 orders across all 9 statuses, 6 inventory items across all 4 categories, seeded via REST): pagination ("Page 1 of 2, 20 total"), search (narrows to exact matches on Orders/Customers/Inventory), column sorting (Amount, Name), status `FilterPills` (composes correctly with active sort), and the staff Mine/All-Staff toggle (1 assigned order vs. all 20) all confirmed working with zero console errors. All test data deleted afterward; REST cross-check confirms only the two pre-existing unrelated businesses from other sessions remain. `npx tsc --noEmit` clean (aside from pre-existing, unrelated stale `.next/types` artifact conflicts from the concurrent session).

**Next recommended task:** Continue with phase 8d (UX & reliability polish: loading/error states per route, toast notifications via `sonner`, optimistic updates, accessibility pass, dark-mode wiring) per the "foundation first" roadmap.

----------------------------------------

**LMS Production Readiness — Phase 8b: Reusable Form Foundation (2026-07-12) — fully done and verified live:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-form-foundation-v1.md` for full detail.

Current Feature: Continuing the phase 8 production-readiness roadmap ("foundation first" order, agreed in phase 8a) — added React Hook Form + Zod, two reusable primitives (`FormField`, `useServerAction`), and migrated 4 representative forms (`StaffInviteForm`, `AddCustomerForm`, `OrderDetailsEditForm`, `WalkInOrderForm` — the flagship, most complex form in the product) to prove the pattern before rolling it out to the rest.

Current Status: Done.
- **Shared Zod schemas extracted** (`modules/{staff,customer,orders}/schema.ts`) so the exact same validation rules run on both the client (via `zodResolver`, instant feedback) and the server (unchanged `.safeParse`, still the source of truth) — previously each Server Action's schema was invisible to its form, which only got basic HTML5 validation.
- **`FormField`** (label+error wrapper + shared `inputClass`) and **`useServerAction`** (wraps `useActionState`, splits real errors from info sentinels like `'SAVED'`) are the two new reusable primitives; deliberately not a full input-kit — RHF's `register()` already does the real work.
- **Deliberately scoped to 4 forms, not all 19** components using this pattern — the rest are catalogued in the checkpoint as either "not worth migrating" (single-field forms like the staff/driver assignment controls) or "good follow-up candidates" (BusinessProfileForm, BranchDetailsForm, onboarding, auth pages, InventoryManager, DriverManager).
- **A mid-session Bash safety-classifier outage blocked live verification temporarily** — every mutating command was rejected for a while, then recovered; retried successfully afterward.
- **Real bug found live and fixed**: every migrated form threw a React console error on submit ("useActionState was called outside of a transition") because `useServerAction` returned the raw `useActionState` dispatch, which needs a transition when called manually from RHF's `handleSubmit` (not a native form action). Fixed by having the hook wrap its own `startTransition` internally — one shared fix, not four per-form patches. Confirmed fixed by cross-referencing the browser console's timeline: all pre-fix errors were timestamped before the hot-reload, zero new ones after it.
- Verified live end-to-end with a throwaway owner account (Admin API create/onboard/flip to Professional/delete, including its 2 staff invites, all cascade-confirmed via REST): `AddCustomerForm` and `StaffInviteForm` both blocked invalid submissions client-side with zero network requests and succeeded when valid; `WalkInOrderForm` (tested on the Professional-flipped account) correctly revealed its pickup sub-section via `watch()` and created a real order with `pickup_requested: true` and the exact address, confirmed via direct DB check; `OrderDetailsEditForm` saved weight/payment status/notes, all three confirmed persisted via direct DB check.

**Next recommended task:** Continue with phase 8c (data layer: pagination/search/sort/filter) per the roadmap — or keep migrating the remaining forms listed in the checkpoint using the pattern this phase established.

----------------------------------------

**LMS Production Readiness — Phase 8a: Feature-Flag Architecture (2026-07-12) — done, roadmap for 8b-8g documented:**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-feature-flag-architecture-v1.md` for full detail.

Current Feature: Russell handed over a large "production readiness" spec (~20 workstreams: skeletons, error boundaries, toasts, optimistic updates, pagination/search/filter/sort, responsive/accessibility/dark-mode, Supabase Storage + image uploads, receipt PDF, audit logs, proper TypeScript, reusable hooks/components/forms with React Hook Form + Zod, Vercel perf) plus a "Stripe/Linear/Notion-level" design bar. Agreed via clarifying questions to split into phases: this pass (8a) implements the one architectural change Russell called out as needing to happen first — decoupling plans from features — everything else is documented as a roadmap (8b-8g) for follow-up sessions.

Current Status: Done.
- **Confirmed via clarifying questions before starting**: feature flags stay code-config (not DB-driven plan/feature tables), matching the Appointment System's proven `entitlements.ts` pattern; the premium visual redesign bar applies to new components going forward, not a retroactive re-theme of ~40 already-built pages; image uploads (later) = business logo only; receipt PDF (later) = `@react-pdf/renderer`; roadmap order = foundation first.
- **Rewrote `modules/billing/entitlements.ts`**: `FeatureFlag` now enumerates the *entire* feature surface (`feature_order_tracking`, `feature_customer_database`, `feature_inventory`, `feature_receipt_printing`, `feature_qr_lookup`, `feature_pickup_delivery`, `feature_priority_queue`, `feature_advanced_reports`), not just the 4 old Professional-only booleans. A new `PlanLimits` concept (`staffAccounts: number | null`) replaces the old boolean `unlimited_staff` flag — a cap is a number, not a switch. Professional's feature list is built by spreading Essential's, so the baseline list exists in exactly one place. `pickup_management`/`delivery_management` (two flags) consolidated into one `feature_pickup_delivery`, matching Russell's own example naming.
- **Audited first**: confirmed every gating call site already went through `hasFeature()` (never `plan_tier === 'professional'` directly), so this was a clean, contained rewrite of one module plus ~25 mechanical call-site renames, not a scattered refactor.
- Verified live with two throwaway owner accounts (Essential + Professional via REST flip, both deleted after): zero behavior change confirmed — same PRO badges/upgrade prompts/staff cap on Essential, same unlocked pages/unlimited staff on Professional, exactly as phase 7 left it. `tsc` clean throughout.

**Next recommended task:** Scope and execute phase 8b (reusable foundation: React Hook Form + Zod, shared form primitives, migrate existing ad-hoc forms) — the next item in the "foundation first" roadmap. Full 8b-8g roadmap is in the checkpoint.

----------------------------------------

**LMS Professional Plan Feature-Flag System (phase 7) — fully done and verified live (2026-07-12):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-professional-plan-v1.md` for full detail.

Current Feature: Russell asked for the full "Professional" plan feature list built as real feature flags: Unlimited Staff Accounts, Pickup Management, Delivery Management, Driver Assignment, Delivery Status, Priority Queue, and 6 Advanced Reports (Branch Performance, Top Customers, Customer Lifetime Value, Revenue Charts, Employee Productivity, Monthly Service Requests) — Essential users blocked from Professional modules with graceful upgrade prompts, no duplicated code.

Current Status: Done.
- **Discovered `businesses.plan_tier`/`plan_status` already existed** since migration 001 (phase 1) — the tenant foundation was already laid, just never gated on until now.
- **New `modules/billing/entitlements.ts`** (`FeatureFlag`, `PLANS`, `hasFeature()`) mirrors the already-proven pattern in the Appointment System (a different product, read-only reference, not touched).
- **"Visible but locked" UX** (Russell's choice): Pickup/Delivery/Priority Queue nav items always show with a "PRO" badge for Essential businesses; clicking loads the real route, which renders a shared `UpgradePrompt` component instead of the feature — never hidden, never redirected.
- **Drivers are a separate lightweight roster** (Russell's choice over reusing staff), owner-only CRUD embedded in the Delivery Management page. **Pickup/Delivery extend the existing `orders` table** (Russell's choice over parallel entities) with nullable columns — reuses the existing state machine/timeline/detail page; "Delivery Status" is just the pre-existing `out_for_delivery`/`completed` order status, no new status invented.
- **Advanced Reports**: Top Customers and Customer Lifetime Value deliberately share one query (sorted differently per tab); the UTC month-bucketing helpers from phase 6 were factored into a shared `modules/reports/utc.ts` so the new Monthly Service Requests report reuses them instead of re-implementing UTC-safe date math.
- **Two real bugs found and fixed live**: (1) same root cause as phase 2's `orders`/`inventory_items` RLS gap — the new `drivers` table's owner/staff RLS policies didn't fully apply when migration 012 first ran, so owner-initiated driver inserts failed with a genuine RLS violation (confirmed via a temporary debug log; service-role insert succeeded, proving schema was fine). Fixed via the analogous repair migration `012b_drivers_rls_fix.sql` (idempotent drop+recreate), same fix shape as phase 2's `003b` — Russell ran it and driver creation/assignment is now confirmed working. (2) `getDeliveryQueue` originally only matched orders that already had a delivery time set — a dead end, since nothing in the UI could set that field for the first time. Fixed by widening the query to any `ready_for_pickup`/`out_for_delivery` order regardless of whether it's been scheduled yet.
- Verified live end-to-end across three throwaway owner accounts (essential and professional tiers, one via direct REST plan-tier flip for testing; all fully deleted afterward, cascade-confirmed): all Professional nav items correctly locked/unlocked, staff cap correctly removed for Professional, pickup-request checkbox + Pickup Management queue + "Mark Picked Up" all work, Priority toggle works from both the order detail page and Priority Queue page, all 6 Advanced Reports tabs render correct real numbers, and — after both migrations — a real driver was created through the UI, assigned to an order via the Delivery Management queue, and the order dispatched through the existing status control, all confirmed via direct REST cross-checks.

**Next recommended task:** none required — this phase is complete. Optional future polish: surface action errors in `DriverManager` (same gap already flagged for `InventoryManager` in phase 6).

----------------------------------------

**LMS Essential Plan Feature Completion (phase 6) — fully done and verified live (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-essential-plan-v1.md` for full detail.

Current Feature: Russell gave the full "Essential" subscription plan feature list and asked for every item to be real and Supabase-backed, no mock data. An audit against phases 1–5 found most items already shipped; this phase closed the gap: Weekly/Monthly Sales report views (Daily already existed), inventory categories (Consumables: Detergent/Fabric Conditioner/Packaging/Other), a real 3-staff-account cap, unified Customer Search across owner+staff, new Customer History detail pages, and a fully new QR Order Lookup system (QR code per order → shared role-agnostic lookup route → redirects to the caller's own role-scoped detail page, plus a manual "look up order #" fallback). "Role Management" was treated as already satisfied by the existing owner/staff/customer permission system rather than building a granular custom-roles editor — flagged to Russell, not assumed silently. "Standard Support" isn't a code feature.

Current Status: Done.
- **Two real bugs found and fixed live**: (1) Reports revenue showed ₱0 despite real orders existing — pre-existing day-bucketing mixed local-timezone `Date` mutation with UTC `toISOString()` slicing, which silently drops every order from its bucket on any server running outside UTC (this product's actual Philippines/Asia-Manila market) — fixed by making all bucket math UTC-only. (2) The Staff page 500'd entirely because `STAFF_ACCOUNT_LIMIT` was first added as a plain `const` export inside a `'use server'` file (only async functions may be exported there) — fixed by moving it to `modules/staff/queries.ts`.
- Also fixed in passing: the receipt page showed a truncated UUID instead of the real `ORD-000001`-style order number (phase 5 field, never wired into that page).
- **New migration `011_inventory_categories.sql`** (adds `inventory_items.category`) — Russell confirmed he ran it in the LMS Supabase project's SQL Editor; re-verified live afterward.
- Verified live end-to-end across two throwaway owner accounts + one throwaway staff invite (all created and fully deleted afterward via the Admin API, confirmed cascade-cleaned via direct REST checks — pre-existing unrelated business/customer/branch rows from other sessions were left untouched): onboarding → walk-in order creation → QR code renders on both the order detail page and receipt → scanning/manually looking up the order number correctly redirects to the order → linked a customer to an order and confirmed their history page shows it → Daily/Weekly/Monthly report tabs all show correct real totals after the timezone fix → staff invite correctly increments "X of 3 used" → added Detergent and Packaging inventory items post-migration, both saved and rendered under their own category heading with low-stock highlighting intact.
- **Known gap, not fixed this pass**: `InventoryManager`'s add/edit forms don't surface server-side action errors at all (pre-existing silent-failure UX) — this is why the pre-migration state failed with no visible error message during the first verification pass. Not a regression, just a pre-existing rough edge.
- **Follow-up request, done and verified live**: Russell asked for a dedicated view of supplies needing replenishment ("just like a grocery item"). Rather than a separate page, added an All / Needs Restocking toggle directly on the Inventory page (his choice over a standalone page or just pointing to the existing Reports low-stock card) — reuses the same `quantity <= low_stock_threshold` rule, filtered client-side, with a live count badge and its own empty state. Verified live with a throwaway account: a well-stocked item stayed hidden and a low-stock item correctly appeared under its category heading when the tab was active.

**Next recommended task:** none required — this phase is complete. Optional future polish: fix `InventoryManager`'s silent error handling, or real in-app QR camera scanning (current design opens the lookup URL via the phone's native camera app, needing no new scanning dependency).

----------------------------------------

**LMS Laundry Workflow (phase 5) — fully done and verified live (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-workflow-v1.md` for full detail.

Current Feature: Russell asked for the real 9-status laundry workflow (Received → Sorting → Washing → Drying → Folding → Ready for Pickup → Out for Delivery → Completed, Cancelled from any step), replacing phase 2's simple 5-status model. Every order now has all 14 required fields (order number, customer, assigned staff, date received, expected completion, weight, service type, notes, amount, payment status, order status, timeline), a real state machine, and an automatic customer-facing timeline. Staff's "Mine" filter now means assigned-to-them, not created-by-them.

Current Status: Done.
- **New DB-trigger-maintained Timeline**: `orders.status_history` (jsonb) auto-appends on every insert/status change via a Postgres trigger — accurate no matter which code path updates an order, not dependent on app code remembering to log it.
- **Real state machine** (`modules/orders/stateMachine.ts`): a genuine allowed-transitions map, enforced in both the UI (dropdown only shows valid next steps) and server-side (`updateOrderStatus` re-validates before writing).
- **Order Number**: `ORD-000001`-style, a Postgres generated column off a bigserial — zero app-side coordination, guaranteed unique.
- **Row-level staff scoping goes beyond the list filter**: staff cannot open, update, or edit an order not assigned to them even via a direct URL (checked explicitly in the page, not just inherited from the list query) — confirmed with Russell as the intended behavior alongside keeping phase 3's All/Mine toggle (now meaning "assigned to me," defaulting on).
- **New shared `OrderTimeline` component** used by owner/staff order detail pages *and* the customer tracking page — one component, three surfaces.
- **New Order Detail pages** (owner + staff) — the full 14-field view a table row can't hold, plus staff reassignment (owner-only, new `assign_order_staff` permission) and weight/payment/notes editing.
- **Two real bugs found and fixed live, both more serious than typical**:
  1. **Critical**: querying `businesses` started throwing "stack depth limit exceeded" (infinite RLS recursion), breaking every owner login app-wide, not just phase 5. Root cause: `is_business_owner()`/`is_business_staff()` (from `001_init.sql`, phase 1) were never marked `security definer`, so the Postgres planner inlined them — and once migration 007 (phase 4) added a `businesses` policy referencing `is_business_customer()` (which queries `customers`, whose RLS calls `is_business_owner()`, which queries `businesses` again), the inlining cycle became unbreakable. This was **latent since migration 001**, only actually triggered once enough cross-referencing policies existed. Fixed via `009_fix_rls_recursion.sql` (mark all three helpers `security definer`).
  2. `profiles` never had a policy letting anyone but the profile's own owner read it — every `staff_members → profiles(full_name)` join (owner's Staff list, the new Assigned Staff picker, order tables' "Assigned" column) silently got `null` back, showing placeholder text instead of real names, for anyone other than the staff member themselves. 4th instance of this same "missing cross-role read policy" pattern across phases 3–5. Fixed via `010_business_reads_staff_profiles.sql`.
- Verified live end-to-end with throwaway accounts (created and fully deleted afterward via the Admin API): full order creation with all new fields, state-machine-constrained status progression with real timeline entries, staff row-level access boundary (direct URL to an unassigned order 404s), owner-only reassignment, and a registered customer's mobile tracking page showing the real order number, correct new-status styling, and accurate embedded timeline.

**Next recommended task:** All 5 phases of the LMS build are now complete: SaaS foundation → Owner Dashboard → Staff Portal → Customer Portal → Laundry Workflow. Possible future work: real-time tracking via Supabase Realtime (deliberately deferred this phase), a dedicated "Unassigned orders" triage view for the owner, or extending the receipt page to show weight/payment status/assigned staff now that they exist.

----------------------------------------

**LMS Customer Portal (phase 4) — fully done and verified live (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-customer-portal-v1.md` for full detail.

Current Feature: Russell asked for a mobile-first Customer Portal — register, login, view active orders, view order history, track laundry status, receive notifications, update profile, view pickup schedule. Large status cards, simple interface, no complicated menus, beautiful animations, reusable customer components.

Current Status: Done.
- **New 3-tab bottom nav** (`CustomerBottomNav`: Home/Orders/Profile) replaces the sidebar pattern used for owner/staff — phone-first UX instead of a desk back-office layout.
- **New reusable customer component set**: `StatusCard` (large animated order card, framer-motion), `OrderStatusTimeline` (animated 4-step tracker), `BusinessSwitcher` (only shows for customers linked to >1 business), `NotificationsPanel` (slide-up sheet), `PickupScheduleCard`, `ProfileForm`.
- **Notifications and pickup schedule interpreted and confirmed with Russell up front**: notifications are an in-app feed synthesized from existing order timestamps (`buildNotifications()`, no new table, no push/SMS/email infra); pickup schedule shows the branch's operating hours (no slot-booking system exists in LMS — that's the separate Appointment System product).
- **Real scope gap found and fixed, confirmed with Russell mid-session**: no code path anywhere ever set `orders.customer_id` (phase 2's walk-in orders were deliberately anonymous), so the portal would always show empty in practice. Extended the existing owner/staff `WalkInOrderForm` with an optional "link to an existing customer" picker so real orders can actually reach a customer's account.
- **Real bug found and fixed, third instance of the phase-3 RLS gap pattern**: `businesses` had no customer-read policy either (only owner + staff), breaking `requireCustomerAccess()`'s business join the same way it broke staff's in migration 004. Fixed via migration `007_customer_reads_own_business.sql`. Also proactively added (before hitting a crash) `005_customer_updates_own_record.sql` (customer profile edits) and `006_customer_reads_branches.sql` (pickup schedule + new `is_business_customer()` helper) — anticipated from reading the schema, not discovered live.
- **Real bug found and fixed**: SSR/client hydration mismatch — `StatusCard`/`NotificationsPanel` used unlocalized `toLocaleDateString()`/`toLocaleString()`, so server (Node default locale) and browser rendered dates in a different day/month order. Fixed by pinning `'en-US'` explicitly.
- Verified live end-to-end with throwaway accounts (created and fully deleted afterward via the Admin API): registered a real customer through the actual public signup form, confirmed email via Admin API (no inbox access), created and linked a real walk-in order as owner, then as customer (mobile 375×812 viewport) confirmed Home's active-order status card + timeline + notifications bell, Orders history filters, and Profile edit (persisted, verified via direct DB read) all work correctly. Zero console errors after fixes. Also checked at desktop width — stays correctly mobile-proportioned.

**Next recommended task:** All 4 phases of the LMS build (SaaS foundation → Owner Dashboard → Staff Portal → Customer Portal) are now complete with real, live-verified role-based access across owner/staff/customer. Possible future work: a customer filter on staff/owner order tables (now that orders can be linked), a proper installable PWA for the mobile Customer Portal, or addressing the known caveats flagged in phases 3/4 (owner-only page redirect destination, DB-level RLS broader than app exposure).

----------------------------------------

**LMS Staff Portal (phase 3) — fully done and verified live (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-staff-portal-v1.md` for full detail.

Current Feature: Russell asked for a role-based Staff Portal — staff can view dashboard, create orders, update order/laundry status, view+search customers, print receipts, and view assigned orders; staff cannot delete orders, manage subscription, manage staff, view financial reports, or change business settings. Built on reusable, role-based permission middleware (not per-page ad-hoc checks).

Current Status: Done.
- **New permission system**: `modules/auth/permissions.ts` (`Permission` union + `hasPermission(role, permission)`) is the single source of truth. `requirePagePermission()` (page redirects) and `requireActionPermission()` (Server Action `ActionResult` errors) both call it — one rule, two entry points.
- **Same `DashboardSidebar` component now drives both roles** (new `role`/`basePath` props, nav filtered by permission) instead of a separate staff sidebar — Inventory/Staff/Reports/Settings simply don't render for staff.
- **New Staff Portal**: real dashboard (ops-only KPIs, zero revenue queried), Orders (list + "Mine"/"All Staff" filter using a new `created_by` stamp + walk-in creation, reusing owner's form/status components), Customers (view + client-side search, no add/edit), and a new shared printable receipt page (`orders/[id]/receipt`) reachable by both roles.
- **Real bug found and fixed during verification #1**: `actions/shared.ts` (a plain module imported directly by client components like the onboarding page) accidentally gained a server-only import, breaking client bundling. Fixed by moving the new `requireActionPermission()` into its own server-only `actions/permission.ts`.
- **Real bug found and fixed during verification #2, more serious — a pre-existing gap since phase 1**: `businesses` never had a staff-read RLS policy (every other tenant table pairs an owner + staff policy, `businesses` only ever got the owner one). This silently broke `requireStaffAccess()`'s business join for every staff login — never caught before because no session had ever actually logged in as staff. Fixed via `laundry-management-system/migrations/004_staff_reads_own_business.sql`, which Russell ran mid-session.
- Verified live end-to-end with throwaway owner + staff test accounts (created and fully deleted afterward via the Admin API): staff login → real ops-only dashboard → created a walk-in order → confirmed under "Mine" filter → updated its status → printed its receipt → viewed customer search. Confirmed staff hitting an owner-only route never renders real business data.
- **Known caveat, not fixed (pre-existing, flagged not addressed)**: owner-only pages still gate via `requireOwnerBusiness()`, which redirects any staff member to `/onboarding/business` rather than a clean "not authorized" page — blocks the data correctly, but if submitted, that form would let a staff account create its own new business. Also, DB-level RLS on `orders`/`inventory_items`/`customers` still grants staff `for all` (broader than the app exposes) — no current exposure since no delete UI exists, but would need a follow-up migration to fully lock down.

**Next recommended task:** Phase 4 — Customer Portal (in progress, see below).

----------------------------------------

**LMS Owner Dashboard (phase 2) — fully done and verified live, including the RLS fix (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-owner-dashboard-v1.md` for full detail.

Current Feature: Russell asked for a real, "no dummy code" owner dashboard (sidebar: Dashboard/Orders/Customers/Inventory/Staff/Reports/Settings; 8 KPI widgets; Recent Orders/Customers; 4 quick actions) with a light blue/white premium theme and reusable dashboard components. Several widgets needed real order data that didn't exist yet (phase 1 deliberately deferred orders/inventory), so per his answers to clarifying questions this phase also built that foundation: simple order model (free-text service + manual amount, no services catalog), fully anonymous walk-in orders, and full real CRUD for all 7 sidebar sections (not stubs).

Current Status: Code complete, `tsc`/`next build` clean, extensively live-verified against the real Supabase project — two real bugs found and fixed during that verification, one real bug found that needs Russell's action before it's usable.
- **New migration `003_orders_inventory.sql`**: `orders` (service_label, amount, status enum, optional customer_id, walk_in_name/phone) and `inventory_items` tables + RLS, mirroring the existing `is_business_owner()`/`is_business_staff()` pattern. Russell had already run this (confirmed live via REST API — `orders`/`inventory_items` tables exist) by the time this phase's live verification started.
- **New `modules/{orders,inventory,reports}/` + recreated `modules/customer/queries.ts`**: `getDashboardStats` (today's/in-progress/ready/completed order counts, today's/monthly revenue, customer count, active staff count — all real queries, `Promise.all`'d), `getReportsData` (30-day revenue series, top services, low-stock items — one query pass, no new Postgres views).
- **New `actions/{orders,inventory,settings}.ts` + `addCustomer` added to `actions/customer.ts`**: all re-derive `business_id` from the session owner server-side, same pattern as phase 1's `createBusiness`.
- **New reusable dashboard component library** (`components/laundry-management-system/dashboard/`): `Card`, `PageHeader`, `StatCard`, `StatusBadge`, `DataTable`, `RecentListCard`, `QuickActionsGrid`, `DashboardSidebar` — genuinely shared across Orders/Customers/Inventory/Staff pages, not per-page one-offs. `dashboard/layout.tsx` centralizes the owner auth check + sidebar shell.
- **All 7 sidebar sections built for real**: Orders (list + status filter tabs + inline status transitions + new walk-in order form), Customers (list + add), Inventory (list + inline add/edit/delete with low-stock highlighting), Reports (CSS/SVG revenue bar chart, no new chart dependency), Settings (business profile + per-branch hours/address editor, reusing phase 1's `BusinessHoursInput`), Staff (phase 1's invite flow, restyled into the new shell).
- **Real bug #1, found and fixed live**: `createWalkInOrder`'s zod schema rejected every single submission. `formData.get('customerId')` returns `null` (not `undefined`) since the walk-in form has no customer field at all (anonymous-walk-ins decision) — `z.string().uuid().optional()` only accepts `undefined`, so validation always failed with a generic error regardless of what was actually filled in. Fixed by removing the unused `customerId` field entirely. Found and defensively fixed the identical latent bug shape in `inviteStaff`'s conditional `branchId` field too.
- **Real bug #2, found and fixed live**: KPI widget labels truncated to 2-3 characters below ~1024px viewport width — the 4-column stat grid switched on at Tailwind's `sm:` (640px), too narrow once the 256px sidebar is subtracted. Changed to `lg:grid-cols-4` on both the dashboard grid and `QuickActionsGrid`; verified fixed at both 904px and 1280px.
- **Real bug #3, found live, NOT fixable from code — needs Russell to run a new migration**: owner-initiated INSERTs into `orders` and `inventory_items` fail with a live RLS policy violation, even though the policy SQL is correct and identical in shape to the already-working `customers` table pattern (proved by testing `addCustomer` against `customers` — succeeded — immediately after `createWalkInOrder`/`createInventoryItem` against the migration-003 tables both failed with the same error). Strongly indicates migration 003's owner/staff policies for these two tables only partially applied when first run. Wrote `laundry-management-system/migrations/003b_orders_inventory_rls_fix.sql` (idempotent `drop policy if exists` + recreate for every orders/inventory_items policy) — **Russell needs to run this in the LMS Supabase project's SQL Editor before Orders or Inventory can actually be used.**
- Verified live end-to-end apart from the blocked inserts: fresh pre-confirmed test owner account (Admin API, cleaned up after) → login → role-aware redirect → onboarding (with the new branch/currency/hours fields from phase 1) → dashboard renders all 8 real widgets at zero/empty state → Add Customer succeeded and appeared correctly in the Customers list and Recent Customers widget → New Walk-in Order and Add Inventory Item both correctly reached the server and correctly failed with the RLS error (not a code bug) → both test rows this created (customer + owner account) deleted via Admin API afterward, zero orders/inventory rows were ever created since those inserts genuinely never succeeded.

**RLS fix verified live (2026-07-11, follow-up session):** Russell confirmed he ran `003b_orders_inventory_rls_fix.sql` in the LMS Supabase project's SQL Editor. Verified end-to-end with a fresh throwaway pre-confirmed owner account (Admin API): login → onboarding (business + branch) → dashboard zero-state → created a real walk-in order ("Wash & Fold", ₱250) → succeeded (previously blocked by the RLS bug) → created a real inventory item ("Detergent Powder", 20kg, low-stock at 5) → succeeded → dashboard's Today's Orders (1), Today's Revenue (₱250), Monthly Revenue (₱250), and Recent Orders widget all updated correctly with the real data. All test rows (order, inventory item, branch, business) and the test auth user deleted afterward via the Admin API/service-role REST calls — nothing left in production. Phase 2 is now fully closed out with no known bugs.

**Next recommended task (phase 3, not yet scoped/started):** staff/customer dashboards are still stubs from phase 1 and could now show real order data; the sidebar also isn't collapsible on mobile yet. Waiting on Russell's prompt for what phase 3 should actually cover.

----------------------------------------

**SEO cleanup for Appointment System + Laundry Management System landing pages, code done, live-verified (2026-07-11):**

Touched two products in one session (both scoped to on-page SEO fixes on their marketing landing pages only, no cross-contamination of files) — see checkpoints `appointment-system-seo-cleanup-v1.md` and `laundry-management-system-seo-cleanup-v1.md` for full detail.

- **Both pages**: fixed a missing `og:image`/`twitter:image` (verified via `curl` against production that neither page rendered one at all, despite `twitter:card: summary_large_image` requiring it — social shares had no preview image). Both now use the site-wide `/og-image.jpg?v=2` fallback.
- **Appointment System** (`/appointments`): removed all stale "AI Receptionist" content — the AI Receptionist tier/feature was fully removed from the product in an earlier session, but the landing page still had it in the meta description, JSON-LD description, 3 FAQ entries (live in Google's indexed `FAQPage` structured data), an entire page section with a fake demo (`AiDemo.tsx`, deleted — no other usages), and a stale `₱1,499/mo` option in the ROI calculator dropdown. Confirmed with Russell before removing (this was previously flagged as a "separate content decision" in an older session, never resolved until now).
- **Laundry Management System** (`/laundry-management-system`): added JSON-LD (`SoftwareApplication` + `FAQPage`, previously had none) and fixed 2 broken CTA links (`Hero.tsx` and `FinalCTA.tsx` both linked to the old `/portfolio/laundryflow` slug, which 404s since a prior session renamed it to `/portfolio/laundry-management-system`).
- Verified: `npx tsc --noEmit` clean for both. Live-verified in preview: zero console errors on both pages, JSON-LD parses correctly and matches real plan data, OG/Twitter meta tags resolve to a working image, AI content fully gone from `/appointments` (confirmed via DOM text search), portfolio CTA links resolve correctly on `/laundry-management-system`.

**Next recommended task:** none required for this pass. Optional future enhancement: custom per-product OG images instead of the shared generic one.

----------------------------------------

**LMS SaaS foundation (auth restructure, staff invites, customer self-registration) — code done, partially verified live, migration pending (2026-07-11):**

Current Product: Laundry Management System (LMS) — see checkpoint `laundry-management-system-saas-foundation-v1.md` for full detail.

Current Feature: Russell asked to build the LMS as a proper multi-tenant SaaS foundation: modular code architecture, three roles (owner/staff/customer), an auth layer covering email login/Google login/password reset/staff invites/customer self-registration, and a business-creation flow capturing name/branch/address/contact/hours/currency/timezone with automatic per-tenant data provisioning. Since a working foundation was already live (owner signup/login/onboarding/dashboard, forgot-password from the session below), this extended it rather than starting over — confirmed via clarifying questions before touching anything.

Current Status: Code complete, `tsc`/`next build` clean, restructure live-verified; new DB-writing paths blocked on a migration Russell still needs to run.
- **Full `modules/` restructure** (Russell's choice over extending the existing flat structure): `src/lib/laundry-management-system/` reorganized into `modules/{auth,tenant,staff,customer}/` plus empty `modules/{orders,inventory,reports}/` stubs reserved for future phases; `src/app/laundry-management-system/actions.ts` split into `actions/{auth,tenant,staff,customer,shared}.ts`. Old `types.ts`, `auth.ts`, and the flat `actions.ts` deleted, not kept as shims.
- **`signIn()` is now role-aware** (owner → `/dashboard`, staff → `/staff/dashboard`, customer → `/customer/dashboard`), was previously hardcoded to `/dashboard`.
- **`createBusiness()` now creates the business + its first branch together**, with 3 new onboarding fields: branch name, currency (`businesses.currency`, new column), and a new `BusinessHoursInput` component (`branches.business_hours` jsonb, new column) — hours are per-branch, currency is per-tenant.
- **Staff invite built**: `dashboard/staff/page.tsx` (list + invite form) → `inviteStaff` action uses the existing `createAdminSupabase()` service-role client's `auth.admin.inviteUserByEmail`; new `staff/accept-invite/page.tsx` mirrors the existing reset-password pattern for setting a password from the emailed link (event-detection unverified — no inbox access, same limitation as the reset-password flow before it).
- **Customer self-registration built**: new public `[businessSlug]/signup/page.tsx` resolves the business server-side via the admin client (never trusts a client-submitted `business_id`); customer *login* deliberately stays on the shared `/login` since a profile can belong to more than one laundry business's customer list.
- **`handle_new_user()` trigger extended** (new migration `002_tenant_fields_and_provisioning.sql`) so staff invites and customer signups auto-provision their `staff_members`/`customers` row from signup metadata, same pattern as the existing owner→`profiles` provisioning — no new RLS policies needed.
- **Google login explicitly skipped this pass** (Russell's choice) — blocked on him creating Google Cloud OAuth credentials and enabling the provider in Supabase's dashboard first.
- **Migration 002 has NOT been applied yet** — the LMS Supabase project isn't connected to this session's Supabase MCP tools (only the main cyberussell.com project and an unrelated "payjobs" project are visible). Until Russell runs it in the LMS project's SQL Editor, `createBusiness()`, staff-invite provisioning, and customer-signup provisioning will fail at the DB level (missing `currency`/`business_hours` columns, old trigger).
- **Verified live** (against the real, still-pre-migration LMS Supabase project): created and deleted a throwaway pre-confirmed test owner account via the Admin API (`lms.foundation.verify.*@example.com`, cleaned up immediately after, nothing left behind); logged in through the actual restructured `signIn()` action via the browser UI, confirmed the role-aware redirect → `requireOwnerBusiness()` correctly routed to the new onboarding page, and the new onboarding form rendered all fields (branch name, currency select, timezone, 7-day business-hours picker) with zero console errors — proving the restructure didn't break the existing live path.

**Next recommended task:** Russell runs `laundry-management-system/migrations/002_tenant_fields_and_provisioning.sql` in the LMS Supabase project's SQL Editor. After that: live-test onboarding submission (business+branch creation), a real staff invite end-to-end including the accept-invite link, and a real customer signup at a business's `[businessSlug]/signup`. Then decide phase 2 — likely orders/inventory schema design now that tenant/staff/customer foundation is real.

----------------------------------------

**Forgot-password flow + signup crash + SMTP email — fully resolved and verified live (2026-07-11):**

Current Product: Laundry Management System (LMS)

Current Feature: Started as "build a forgot-password flow" (LMS had none before, unlike Appointment System). Expanded mid-session into fixing two separate production blockers Russell hit for real: a signup crash, and broken auth emails.

Current Status: Done — all three issues resolved and live-verified.
1. **Forgot-password flow built**, mirroring Appointment System's proven pattern: `requestPasswordReset` action in `actions.ts`, new `forgot-password/page.tsx` + `reset-password/page.tsx` routes (listens for Supabase's `PASSWORD_RECOVERY` event), "Forgot password?" link on `login/page.tsx`, branded email templates for both LMS (`laundry-management-system/email-templates/reset-password.html`) and, as a side-effect kept since it's still valid, Appointment System (`appointment-system/email-templates/reset-password.html`). Committed (`e879e38`).
2. **Signup crash fixed**: Russell hit a hard 500 ("This page couldn't load") signing up with his real email. Root cause via Vercel runtime error logs: `NEXT_PUBLIC_LMS_SUPABASE_URL`/`NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY`/`LMS_SUPABASE_SERVICE_ROLE_KEY` existed in `.env.local` but were never added to Vercel's Production environment — `getLmsEnv()` threw on every request. Added all 3 via `vercel env add ... production`, redeployed (`vercel deploy --prod`, `dpl_AakB14ZzEV8xVBdSu5EeVMtNrRZZ`). Verified via Vercel runtime logs: no more 500s, POSTs return 200. Also confirmed via Supabase admin API that Russell's account (`russell.a.parayno@gmail.com`) had already been created and confirmed earlier in the day — he doesn't need to re-signup, just log in.
3. **Auth emails fixed (bigger, separate root cause)**: even after the crash fix, signup and forgot-password both failed silently (generic "could not send" message) because the LMS Supabase project had no working SMTP — confirmed via direct `curl` against `/auth/v1/recover` and `/auth/v1/signup`, both returning `500 unexpected_failure: "Error sending {recovery,confirmation} email"`. Fixed in two rounds in the Supabase dashboard (Authentication → Emails → SMTP Settings, done by Russell, not via code): (1) custom SMTP was enabled with Gmail (`smtp.gmail.com:587`) but the **Username field had the sender *name*, not the Gmail address** — Russell corrected it to match `GMAIL_USER`; (2) the SMTP **password was a regular Gmail password, not an App Password** — Gmail rejects that outright with 2FA on. Russell generated a real 16-char Gmail App Password and saved it. Re-tested via curl after each round; both endpoints now return `200`. Final live-UI verification: forgot-password showed "Check your email" for a fresh email (an initial retry on the same address failed only due to Supabase's own 60s-per-user rate limit colliding with a curl test seconds earlier — not a real bug). Test signup account cleaned up via admin API afterward.

**Everything closed out — no follow-up required** unless Russell wants `laundry-management-system/email-templates/confirm-signup.html` rebranded to match the newer light theme (still old dark navy/yellow, flagged previously, not done).

**Unrelated housekeeping done in the same session, also pushed:** Services page final-CTA photo swapped from an Unsplash stock image to Russell's own desk photo (`da07673`) — this was already sitting as an uncommitted fix and Russell confirmed the live site still showed the old stock photo before asking to ship it. Also: deleted 2 stale/redundant remote branches whose only real commits were already superseded on `main` (`claude/mobile-font-size-89g0tf` — card-border fix already merged via PR #4; `vercel/install-vercel-web-analytics-qd90yn` — analytics already in `main`'s `layout.tsx`); deleted a stray duplicate `src/data/portfolio/appointment-system 2.json` and an unreferenced `public/cyberussell logo transparent.png`; committed the bonus Appointment System reset-password email template (`750defe`). **Found, not fixed**: a corrupted git object deep in the deleted analytics branch's history (`git fsck` inflate error) — confirmed `main`/`origin/main` are unaffected, not urgent. **Found, not fixed**: `.claude/settings.local.json` (correctly uncommitted, local-only) still has a hardcoded Supabase secret key from an earlier session, never rotated.

----------------------------------------

**Deploy fix — LMS dashboard build failure (2026-07-11), committed and pushed:**

Current Product: Laundry Management System (LMS) — `dashboard/page.tsx` only.

Russell pushed the soap-suds v4 + login-logo batches (below) and the Vercel build failed: `Error occurred prerendering page "/laundry-management-system/dashboard" ... LMS Supabase env vars missing`. Root cause: `DashboardPage` is an async Server Component that calls `requireOwnerBusiness()` (Supabase + `cookies()`) directly in render, with no `export const dynamic = 'force-dynamic'` — so Next attempted to statically prerender it at build time, and `getLmsEnv()` threw before the render ever reached `cookies()` (which would otherwise have marked the route dynamic and skipped prerendering). The Appointment System's equivalent dashboard page already has this exact export; LMS's was just missing it. Fixed by adding the same `export const dynamic = 'force-dynamic'` to `src/app/laundry-management-system/dashboard/page.tsx`. Verified by running a local production build (`npx next build`) with `NEXT_PUBLIC_LMS_SUPABASE_URL`/`NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY`/`LMS_SUPABASE_SERVICE_ROLE_KEY` explicitly blanked out (reproducing Vercel's exact failure condition) — build now succeeds and the route shows as `ƒ` (dynamic) instead of crashing. Committed (`2a4ee49`) and pushed to `main` to re-trigger the deploy.

**Note — found unrelated in-progress work in the working tree, not touched:** a "forgot password" flow for LMS appears to be under active development (uncommitted changes to `actions.ts`, `login/page.tsx`'s "Forgot password?" link, new `forgot-password/` and `reset-password/` routes, `laundry-management-system/email-templates/reset-password.html`, plus `appointment-system/email-templates/`) — left entirely alone since it wasn't part of this task and looks like a concurrent session's work in progress.

----------------------------------------

**Soap suds theme v4 — full pivot to light sky/cloud illustration style, code done, live-verified (2026-07-11):**

Current Product: Laundry Management System (LMS) — landing page only (`/laundry-management-system`), same scope as prior visual batches.

Current Feature: Russell shared a reference image (light blue sky background, white/pale-blue two-tone cloud band along the bottom edge, scattered thin white-outline bubble line-art) and asked to fully replace the dark navy "premium glass" theme (v3, previous entry below) with this brighter, illustrated soap-bubble look — confirmed via clarifying questions: whole landing page (not just Hero), recreated in code (no raster image), and a full pivot (not an addition alongside the dark theme).

Current Status: Done.
- **`Atmosphere.tsx` restructured, not just recolored**: base background is now a light sky-blue gradient (`#8FD8EC → #B7E8F5 → #DFF4FB`) instead of dark navy. `BubbleVisual` changed from glossy glass-gradient orbs to thin white line-art circle outlines (`1.5–2px` white border, faint fill, small highlight crescent on foreground/"crisp" bubbles only) to match the reference's bubble style. `LightWash` repurposed from blue radial washes to soft white glow blobs (reads as distant cloud/sun highlights on the new light bg). `ParticleField` (twinkling dust motes) removed entirely — didn't fit the flatter illustrated style and had no remaining purpose.
- **`FoamDivider` rebuilt as a two-tone `CloudLayer` system**: each divider now renders a pale-blue cloud layer (`#B9E9F6`) peeking above a white cloud layer (`#FFFFFF`), each built from ~16 large overlapping circles along a jittered baseline plus a solid fill rect beneath (reads as one continuous lumpy cloud silhouette, not scattered dots), with a scatter of small line-art bubbles floating in the gap above — recreating the reference's cloud-band look. Kept the same exported signature (`seed`/`count`/`height`/`className`) so `Hero.tsx`, `HowItWorks.tsx`, and `FinalCTA.tsx` needed zero call-site changes.
- **All 7 landing components + `LandingNav.tsx` recolored dark-on-navy → dark-on-light**: `text-white` → `text-[#0B1B33]` (dark navy ink) at matched opacity tiers, `bg-[#0F172A]/*` translucent dark cards → `bg-white/70`(or `/80`, or solid `bg-white` for the highlighted pricing card) translucent light cards with `shadow-sm`, dividers/borders `border-white/[0.08]` → `border-[#0B1B33]/10`, eyebrow/label accent color `text-[#38BDF8]` → `text-[#0369A1]` (darker, AA-contrast-safe on white/light-blue), standalone icon glyphs (not on a tinted chip) darkened to `#2563EB` for contrast. Primary gradient CTA buttons (`#2563EB → #38BDF8`, white text) unchanged — already worked on light backgrounds. Secondary/ghost buttons flipped from `bg-white/[0.08] ... text-white` (illegible on light bg) to `bg-white border-[#2563EB]/25 text-[#0B1B33]`.
- **`FinalCTA.tsx`'s panel deliberately kept as a bold saturated color block** rather than flipped to match the light page body — changed from a dark navy gradient to a bold blue gradient (`#2563EB → #0EA5E9`), keeping all of its existing white text/ghost-button styling as-is (still fully legible against the new blue, not navy) — a common pattern of a light page ending in one bold-color CTA banner, and it minimized unnecessary edits to that file.
- **Hero's dark radial text-legibility scrim removed** (`bg-[radial-gradient(...rgba(5,8,22,0.55)...)]`) — no longer needed now that the background is light and text is dark.
- **Shared `Footer.tsx` deliberately left untouched** (Russell confirmed via clarifying question) — still the site-wide dark-themed footer, same out-of-scope rule as prior batches.
- Verified: `npx tsc --noEmit` clean, zero console errors on a fresh load. Live-verified in preview (desktop + mobile 375px): Hero's cloud divider and bubble field closely match the reference image's look; Features/Pricing/ChangeRequests/FAQ cards all render dark text on light cards correctly; HowItWorks icon tiles and step connectors correct; FinalCTA renders as a bold blue banner with white text; mobile hamburger menu renders correctly on white bg; all foam/cloud dividers at their 3 transition points render without gaps or overlap glitches.

**Next recommended task:** none required — this batch is complete and matches Russell's reference image. If wanted later: extend this same light sky/cloud theme to the auth flow pages (login/signup/onboarding/dashboard), which still only have the original flat blue theme from the first batch.

----------------------------------------

**Soap suds theme v3 — organic foam dividers replace dense atmosphere, code done, live-verified (2026-07-11):**

Current Product: Laundry Management System (LMS) — landing page only (`/laundry-management-system`), same scope as the two prior visual batches.

Current Feature: Russell felt the dense floating-bubble atmosphere (v2, previous entry below) was less on-brand than a "premium soap suds" look, and asked for organic foam clusters reserved for major section transitions instead, combined with only a few subtle background bubbles (not a rich multi-layer field everywhere).

Current Status: Done.
- **`Atmosphere.tsx` extended, not replaced** — kept the v2 building blocks (seeded RNG, `GlassBubbleField`, `ParticleField`, `LightWash`, mouse context) but: (1) drastically reduced bubble counts — `AtmosphereBackground` went from 27 bubbles/55 particles down to 7 bubbles/16 particles ("a few subtle floating glass bubbles" instead of a dense field), `HeroBubbleCluster` from 18 down to 6; (2) refreshed the glass-bubble gradient recipe to layer in the new palette's cyan/light-blue stops (`#22D3EE`, `#7DD3FC`, `#E0F2FE`) alongside the existing blues; (3) added a new `FoamDivider` export — an organic, non-repeating cluster of small overlapping glass circles (seeded per instance so no two look alike), irregular wave-based silhouette (not a straight row), a `mask-image` fade so it dissolves into the background at top/bottom, ~30% of circles get a slow rise+shimmer loop, plus one slow diagonal shimmer sweep across the whole band.
- **3 foam dividers placed at major transitions only** (per Russell's own refinement to not overdo it): bottom of `Hero.tsx` (hero → features), bottom of `HowItWorks.tsx` (features area → pricing), bottom of `FinalCTA.tsx` (pricing/content → footer). Features/Pricing/FAQ/ChangeRequests sections deliberately have no foam — kept clean per the brief.
- **Palette refresh to the new exact hex spec** across `LandingNav`, `Hero`, `Features`, `Pricing`, `FAQ`, `ChangeRequests`, `HowItWorks`, `FinalCTA`, `Atmosphere`: base background `#050816`→`#08111F`, card/panel tone `#162033`/`#111827`→`#0F172A`, `AtmosphereBackground`'s base layer is now a vertical gradient (`#08111F → #0F172A → #08111F`) instead of a flat color for the "dark navy transitioning into rich blue" effect the brief asked for.
- **Real bug found and fixed during live verification, not just a code-review pass**: the first live check showed a React hydration-mismatch console error inside `FoamDivider`/`BubbleVisual`. Root cause was **not** the seeded-random approach (that part was already SSR-safe) — it was raw high-precision floating-point numbers (e.g. `23.913321079352365`) being placed directly into inline `style` objects; Next.js's SSR HTML serialization rounds such numbers when writing the attribute string, so the server-rendered value and the client's freshly-recomputed full-precision value no longer matched byte-for-byte at hydration time. Fixed by rounding at the source (`lerp()` now returns a 4-decimal-rounded value) **and** at every downstream derived calculation (`FoamCircle`'s `top`/`marginLeft`, `BubbleVisual`'s crisp-highlight child offsets) since subtracting/multiplying already-rounded numbers can still reintroduce long float tails. Verified fixed by opening a brand-new browser tab (the first "still broken" check turned out to be reading a stale cached console error from before the fix, not a real regression — confirmed by testing a fresh tab, which showed zero console errors).
- Verified live: `npx tsc --noEmit` clean, zero console errors on a fresh load (both desktop and mobile 375px), all 3 foam dividers screenshot-confirmed at their transition points with the correct organic/non-repeating look, Features/Pricing/FAQ cards confirmed rendering the refreshed palette, Footer (shared, out of scope) correctly untouched.

**Next recommended task:** none required — this batch is complete and scoped exactly as requested. The auth flow pages (login/signup/onboarding/dashboard) still only have the flat blue theme from the first batch, no foam/atmosphere — same as previously noted, unchanged this round.

**Follow-up bug-fix pass (2026-07-11), same session, committed together with the above:** Russell spotted 2 real visual bugs via screenshots after the soap-suds batch shipped:
1. **Pricing's "Most Popular" badge was clipped at the top.** `PlanCard`'s highlighted-card `overflow-hidden` (added earlier for a corner glow decoration) was clipping the badge, which is intentionally positioned half above the card edge (`-top-3.5`). Fixed by removing `overflow-hidden` from the card — the glow blur doesn't need containment to look right, but the badge did need to not be clipped.
2. **Crisp foreground bubbles (`CornerBubbleAccent`, `HeroBubbleCluster`'s front layer) showed harsh, flat-edged cuts** instead of full circles. Root cause: those bubbles were anchored by their top-left corner (not centered) with no margin for their own radius, so even "inside" positions near the 85-96% range could still overflow a narrow container (especially the FinalCTA panel and on mobile) and get hard-clipped by the container's `overflow-hidden` — with no fade/mask at that edge (unlike `FoamDivider`, which does have one), the cut looked like a rendering glitch rather than an intentional crop. Fixed three ways: removed `edgeBias` from every `crisp` bubble field (no more deliberate edge-straddling for the sharp-edged bubbles), centered every bubble on its `(left%, top%)` anchor via `marginLeft`/`marginTop: -size/2` instead of top-left corner alignment, and tightened the default "inside" position range from 4–96% to 14–86% for extra margin.
Verified: `npx tsc --noEmit` clean, zero console errors on a fresh tab, live-confirmed both fixes on the actual page (badge fully visible, hero/FinalCTA bubbles now render as full uncut circles).

----------------------------------------

**Atmosphere v2 — cinematic bubble/particle/glass system, code done, live-verified (2026-07-11):**

Current Product: Laundry Management System (LMS) — landing page only (`/laundry-management-system`), per Russell's explicit scope for this batch.

Current Feature: Replaced the simple v1 `Bubbles.tsx` decoration (previous batch, see below) with a full cinematic water/glass atmosphere per Russell's detailed reference-image brief: glassmorphism, depth-of-field layering, particle system, radial light gradients, scroll parallax, and subtle mouse reactivity — built in HTML/CSS/Framer Motion only, no images/SVGs.

Current Status: Done.
- **`Bubbles.tsx` deleted, replaced by `src/components/laundry-management-system/Atmosphere.tsx`** — a from-scratch architecture, not an incremental edit:
  - Seeded PRNG (`mulberry32`) generates all bubble/particle configs deterministically, so server-rendered and hydrated client output match exactly (avoids the hydration-mismatch that plain `Math.random()` in render would cause, and avoids a post-mount pop-in).
  - `GlassBubbleField` — configurable field of glass bubbles (radial-gradient reflection, white border, inner/outer glow) with 3 depth-of-field presets composed in `AtmosphereBackground`: back (11 bubbles, 15–42px, opacity 5–10%, strong 26px blur, 26–40s drift), mid (9 bubbles, 38–85px, opacity 15–30%, 8px blur), front (7 bubbles, 90–220px, opacity 35–60%, crisp/no blur, real `backdrop-filter` glass refraction, highlight + secondary-highlight + twinkling sparkle children, mouse-reactive). `edgeBias` lets some bubbles poke past the viewport edge, cropped by `overflow-hidden`, per the brief.
  - `ParticleField` — 55 tiny (1–3px) dots, low opacity, ~30% twinkling.
  - `LightWash` — 4 layered radial gradients in the brief's exact blues (`#38BDF8`/`#60A5FA`/`#93C5FD`/`#BFDBFE`), all under 10% opacity, with a very slow ambient scale breathe.
  - `AtmosphereBackground` (default export) — one `position: fixed` full-viewport layer holding all of the above, rendered once in `page.tsx` so the same atmosphere is visible behind every section as the page scrolls (the "connected instead of per-section" requirement) — `main`'s old flat `bg-[#050816]` was removed since the fixed layer now supplies the base color. Each depth layer gets its own scroll-driven `useTransform` offset (back/mid/front move at different rates) for true parallax depth, still GPU-cheap (2–3 scroll-linked transforms total, not per-bubble).
  - `MouseAtmosphereProvider` + `useAtmosphereMouse` — one rAF-throttled `window` mousemove listener feeding a shared Framer Motion context; only the crisp/foreground bubbles subscribe (via a separate `InteractiveBubble` wrapper so the 20 non-interactive bubbles never pay for a spring), producing a gentle whole-field tilt-toward-cursor rather than expensive per-bubble proximity physics — a deliberate performance simplification of the brief's "nearby bubbles react," flagged below.
  - `HeroBubbleCluster` — a denser local field (18 bubbles across all 3 depths, foreground interactive) placed inside `Hero.tsx` itself (scrolls with the section) for the "richest bubble field behind the hero text" requirement, plus a new subtle radial dark scrim behind the text block for legibility.
  - `CornerBubbleAccent` — a small 3-bubble crisp cluster reused in `FinalCTA.tsx`, replacing the old single corner bubble, still cropped by the panel's edge for depth.
- **Performance deliberately scaled down from literal spec** (the brief's own performance section asked for this): "dozens" of bubbles → 27 total in the global layer (not "dozens" meaning 40+), "hundreds" of particles → 55. All animation is `transform`/`opacity` only (GPU-composited), scroll-parallax uses just 3 motion values total, and mouse-reactivity is opt-in per bubble rather than global.
- Verified: `npx tsc --noEmit` clean, zero leftover imports of the deleted `Bubbles.tsx`. Live-verified in preview (shared dev server, port 3001): hero renders the full glass-bubble field with visible highlights/sparkles and legible text; scrolling through Features → How It Works → Pricing confirms the fixed atmosphere shows through continuously between cards/sections (screenshot-compared); FinalCTA's corner cluster crops correctly at the panel edge; mobile (375px) hero confirmed legible and premium, not cluttered; no console errors.

**Known simplification vs. the brief:** mouse "reactivity" is a single shared cursor-position tilt applied to all interactive (foreground) bubbles, not true per-bubble proximity detection — chosen for performance (avoids O(n) distance math on every mousemove across dozens of bubbles) while still reading as "elegant, subtle" per Russell's own instruction not to overdo it. Flagged in case Russell wants genuine proximity-based reaction instead.

**Next recommended task:** none required — this batch is complete and scoped exactly to the landing page as requested. If wanted later: extend the same `Atmosphere.tsx` system to the login/signup/onboarding/dashboard pages for full-product consistency (currently only the v1 flat blue theme from the previous batch, no bubble atmosphere).

----------------------------------------

**Color theme redesign — yellow to blue/glass, code done, live-verified (2026-07-11):**

Current Product: Laundry Management System (LMS) — see [docs/project-map.md](project-map.md) §8

Current Feature: Full visual identity redesign of the marketing landing page + auth flow per Russell's brief (clean water/soap/bubbles/premium SaaS direction, inspired by Stripe/Linear/Vercel). Removed all yellow (`#FFD23F`) accents, replaced with a blue palette (`#2563EB`/`#38BDF8`/`#60A5FA`), added glassmorphism cards and subtle floating-bubble decorations.

Current Status: Done.
- **New component**: `src/components/laundry-management-system/Bubbles.tsx` — reusable decorative layer (3 variants: `hero`/`ambient`/`corner`), absolutely-positioned blurred gradient circles with a slow CSS float animation defined via a scoped inline `<style>` tag (kept self-contained in this component rather than touching the site-wide `globals.css`, which is out of LMS scope).
- **Backgrounds**: `#0A0A14` → `#050816` across the landing page and all auth pages; Hero's radial glow changed from yellow to a layered blue/cyan radial gradient.
- **All 9 landing components + `AuthChrome.tsx`** (`LandingNav`, `Hero`, `Features`, `HowItWorks`, `Pricing`, `ChangeRequests`, `FAQ`, `FinalCTA`): yellow badges/labels/icons/checkmarks → `#38BDF8`; primary buttons → `#2563EB → #38BDF8` gradient with white text, hover lift + soft glow; cards → `bg-[#162033]/40-50` + `backdrop-blur-md` + `border-[#38BDF8]/10-30` (was flat `#111118` + white border); Pricing's highlighted plan and Features cards each got a small corner bubble glow; Hero and FinalCTA got the floating `Bubbles` layer.
- **Scope decision, confirmed by Russell via clarifying question**: included the login/signup/onboarding/dashboard app pages (`src/app/laundry-management-system/{login,signup,onboarding/business,dashboard}/page.tsx`) in the same pass, not just the linked marketing page — these shared `AuthChrome.tsx` and the same yellow tokens, so leaving them yellow would have made the auth flow visually inconsistent with the landing page.
- **Not touched**: `Footer.tsx` (shared site-wide component, still yellow-branded — out of scope, correctly left alone) and any non-LMS product.
- Verified: `grep` confirms zero `FFD23F`/`0A0A14` references remain anywhere in LMS scope. `npx tsc --noEmit` clean. Live-verified in preview (shared dev server, port 3001): Hero, Features, Pricing, FAQ, FinalCTA sections all render the new theme correctly on desktop; mobile (375px) hero confirmed; login page confirmed (gradient button, blue "System" wordmark, blue focus states). Bubble layer confirmed present and animating via DOM inspection (7 bubble divs + keyframe found on the landing page).

**Next recommended task:** Spot-check the signup/onboarding pages live (not just code-reviewed) with a real flow, and decide whether the shared `Footer.tsx`'s yellow branding at the bottom of this page should get an LMS-specific override eventually, or stays as the intentional site-wide default.

----------------------------------------

**Owner signup/login/onboarding loop built and live-verified (2026-07-11):**

Current Product: Laundry Management System (LMS) — new 8th product, see [docs/project-map.md](project-map.md) §8

Current Feature: Auth/tenant foundation — Russell created the dedicated Supabase project, shared the keys, and ran `001_init.sql` against it. Built the owner signup → email confirmation → login → create-business → dashboard loop, mirroring the Appointment System's isolation pattern (own Supabase project, own auth, own lib/component namespace). Not a feature of Cyberussell.com and not client-specific — a reusable commercial product any laundry business can subscribe to.

Current Goal: Get the real app (auth, multi-tenant DB, 3 role dashboards) working end-to-end. Owner path is done; staff and customer paths are not started.

Current Status:
- Confirmed `src/app/laundry-management-system/page.tsx` (marketing landing page, built earlier/concurrently) is the real product's front door, not a demo — unrelated to the fictional `src/data/portfolio/laundry-management-system.json` / `/demo/laundryflow` portfolio case study (Services product), which stays untouched, out of scope for LMS work.
- Documented the full architecture in `docs/project-map.md` §8.
- **Env vars added** to `.env.local` and `.env.example`: `NEXT_PUBLIC_LMS_SUPABASE_URL`, `NEXT_PUBLIC_LMS_SUPABASE_ANON_KEY`, `LMS_SUPABASE_SERVICE_ROLE_KEY` (fresh `LMS_` prefix, deliberately not reusing the Appointment System's stale `BOOKLYPRO_` naming).
- **`laundry-management-system/migrations/001_init.sql`** written and applied: `profiles` (role: owner/staff/customer, auto-created via `handle_new_user` trigger on `auth.users` insert), `businesses` (tenant root, owner-linked), `branches` (pricing is per-branch per the landing page), `staff_members` (links a staff profile to a business + optional branch), `customers` (business-scoped customer list, `profile_id` set once a customer creates an account). Full RLS: owner has full access to everything under their business; staff (`is_business_staff()` helper) can read branches and manage customers; customers can read only their own record. Deliberately scoped to tenant/auth only — no orders/services/inventory tables yet, that's later feature work.
- **`laundry-management-system/SETUP.md`** written, mirroring `appointment-system/SETUP.md`.
- **`src/lib/laundry-management-system/`** scaffolded: `supabase.ts`, `supabase-server.ts` (session client + service-role admin client), `types.ts`, `auth.ts` (`getSessionUser`, `requireOwnerBusiness` → redirects to `/laundry-management-system/login` or `/laundry-management-system/onboarding/business`, `requireStaffAccess` → resolves a staff member's business via `staff_members`). All mirror the Appointment System's `src/lib/appointment-system/` file-for-file.
- **Owner auth flow built** (decisions: email confirmation required from day one; signup is account-only — email + password, business details collected in a separate onboarding step):
  - `src/app/laundry-management-system/actions.ts` — `signUp`, `signIn` (detects `email_not_confirmed`), `resendConfirmation`, `signOut`, `createBusiness` (slug auto-generated + deduped).
  - `src/app/laundry-management-system/signup/page.tsx`, `login/page.tsx`, `onboarding/business/page.tsx`, `dashboard/page.tsx` (stub — shows business name + logout, no real dashboard content yet).
  - `src/components/laundry-management-system/AuthChrome.tsx` — `AuthHeader`/`AuthFooter`, styled with the landing page's brand tokens (`#0A0A14` bg, `#FFD23F` accent), not the Appointment System's slate/emerald scheme.
- `npx tsc --noEmit` clean. **Live-verified against the real Supabase project** (shared dev server on port 3001, another session's): signed up a real test account (`+lmstest@gmail.com`) → got the "check your email" state → attempted login before confirming → correctly showed the amber "please confirm your email" banner with a working resend button. **Not verified:** the confirmed-login → create-business → dashboard leg (needs a real confirmed email, no inbox access in this sandbox) and the staff/customer roles (not built yet — `requireStaffAccess` exists in `auth.ts` but nothing calls it).

**Next recommended task:** Russell clicks the confirmation link for `russell.a.parayno+lmstest@gmail.com` and logs in to confirm the create-business → dashboard leg works, then decide what the "Setup Wizard" step (branches, first service, invite staff) actually needs before building it — that's also where the orders/services/inventory schema (deferred out of `001_init.sql`) gets designed.

**Next recommended task:** Russell runs `laundry-management-system/migrations/001_init.sql` in the new Supabase project's SQL Editor, then decide the owner signup flow (`/laundry-management-system/signup`) — form fields, whether email confirmation is required before dashboard access — before building it.

----------------------------------------

## Allowed Files (Laundry Management System scope)

- `src/app/laundry-management-system/**`
- `src/components/laundry-management-system/**`
- `src/lib/laundry-management-system/**`
- `laundry-management-system/**` (migrations + SETUP.md)
- Its own future `laundry-management-system/migrations/**` (separate Supabase project, not yet created)
- Do NOT touch: `src/data/portfolio/laundry-management-system.json`, `src/app/demo/laundryflow/**`, or any other product's files (Services/Portfolio, Appointment System, etc.)

----------------------------------------

**Laundry Management System landing page (cross-cutting marketing page, same category as Get Started), built and verified (2026-07-11), not yet committed:** New standalone SaaS landing page at `/laundry-management-system` per Russell's brief — hero (headline/subheadline/pricing badge/CTA), 12-feature icon grid, 4-step "how it works" timeline, 2 pricing cards (Essential ₱399/mo, Professional ₱699/mo with "Most Popular" badge), change-request scope checklist, FAQ accordion, final CTA. New files: `src/app/laundry-management-system/page.tsx` + 7 components in `src/components/laundry-management-system/`. Matches the existing design system (`#0A0A14`/`#FFD23F`, Syne/Inter, `framer-motion` fadeUp/fadeIn) read from `src/app/services/page.tsx`; reuses standard `Navbar`/`Footer` and the existing `/services/inquire?service=...` + `/api/contact` infra for all quote CTAs (no new backend). See checkpoint `laundry-management-system-landing-page-v1.md` for full detail.

**Side effect, approved by Russell via clarifying question:** renamed the LaundryFlow portfolio entry's slug `laundryflow` → `laundry-management-system` (`src/data/portfolio/laundry-management-system.json`, `public/portfolio/laundry-management-system/`, `src/lib/portfolio/data.ts` import) so the brief's `/portfolio/laundry-management-system` CTA target resolves instead of 404ing. `src/app/demo/laundryflow/**` and its components were deliberately left untouched (separate demo showcase, `liveUrl` still points there).

Verified: `npx tsc --noEmit` and `npx next build` both clean (`/laundry-management-system` prerenders static, `/portfolio/laundry-management-system` in the SSG paths for `/portfolio/[slug]`, `/demo/laundryflow` unaffected). Live-verified in preview: full page content/order/links correct on desktop and mobile (375px), FAQ accordion opens/closes correctly, all "Request a Quote" links point to `/services/inquire?service=...` with the right plan-specific labels, renamed portfolio slug resolves with correct content, old `/portfolio/laundryflow` now 404s as expected.

----------------------------------------

**Portfolio concept, LaundryFlow (Services/Portfolio product), committed and deployed (2026-07-11):** `/demo/laundryflow` went through three full design iterations in one session before landing on the current build: (1) a generic SaaS landing page, (2) a "reveal" concept with an illustrated/CSS hero and dashboard mockups, (3) a bold single-flat-color ad-poster direction (Russell's reference screenshot), which itself was further simplified and polished in follow-up rounds after this note was last written.

**Current build:** 5 components — `Header` (transparent/absolute nav over the hero), `Hero` (full-bleed photo of a woman overwhelmed by a laundry pile, `hero-pile.png` — provided directly by Russell, not stock photography — with a flat `bg-black/50` scrim for text legibility, no fade gradient; bold poster headline "TOO MUCH LAUNDRY? WE'VE GOT YOU!" in white, white highlight box, 3 icon feature rows, full-width CTA), `Pricing` (cream panel — bold price grid, trust badges, 3 quick-action buttons, then a blue banner panel with an oversized "We treat your clothes like our own." headline (`text-[42px] md:text-[46px] font-black`, ~3x its original size per Russell's explicit ask) and a rotating testimonial carousel with colored initials avatars per reviewer), `Footer` (dark bar — tagline, "Schedule a Pickup" button, phone numbers, address, branch-tag row, copyright/demo-attribution line), `CTA` (dark reveal panel — "A Cyberussell Concept" glass panel over a photo, explains this is a portfolio demo). Section order: Header → Hero → Pricing → Footer → CTA (Footer intentionally placed *before* the reveal panel per Russell's request).

**No Features grid, no Unsplash photography, no separate testimonial-strip component** — an earlier iteration of this note described a 7-section build with a service-photo grid and 10 sourced Unsplash photos; that direction was abandoned/simplified before landing on the current 5-component build above (confirmed by reading the actual files on disk, not assumed from prior notes — flagged and confirmed with Russell mid-session). Only 2 photos remain in `public/demo/laundryflow/photos/`: `hero-pile.png` (Russell-provided) and `cta-scene.jpg`.

Verified: `npx tsc --noEmit` clean throughout. Live-verified in preview (screenshots + DOM/computed-style checks where the screenshot tool itself was flaky mid-session due to a shared dev server with a concurrent session) — Hero photo + scrim + white text on desktop and mobile, Footer content/order, Pricing banner headline size and testimonial avatars all confirmed correct.

**Note — stray untracked file spotted, not part of this task:** `src/data/portfolio/appointment-system 2.json` exists in the working tree (untracked, restrictive `600` permissions, likely an accidental Finder/editor duplicate of `appointment-system.json`). Not committed, not touched — flagged for Russell to review/delete since it's outside this task's scope.

----------------------------------------

**Quick fix (2026-07-10), not yet committed — Appointment System branding:** Applied the new Appointment System logo (`public/appointment logo.png`, renamed to `public/appointment-logo.png` to avoid a space in the URL path — provided by Russell, blue/yellow "people forming an A" mark) in 4 places: (1) demo page menu bar (`src/components/demo/appointment-system/Header.tsx` — replaced the `CalendarCheck2` gradient icon), (2) demo page footer (`src/components/demo/appointment-system/Footer.tsx` — same replacement, on top of the already-uncommitted "see it live" link text from a prior session, left untouched), (3) login page (`src/app/appointments/login/page.tsx` — added logo above the "Appointment System" wordmark), (4) public business profile pages (`src/app/appointments/[businessSlug]/page.tsx` — replaced the generated-initials avatar circle with the logo for all businesses, since there's no per-business logo field in the schema; deleted the now-unused `getInitials()` helper). `npx tsc --noEmit` clean. Verified live in preview: demo header/footer, `/appointments/login`, and `/appointments/marble-stones` all render the logo correctly on both light and dark backgrounds. Also updated the Services product's `/portfolio` card for this same project — `src/data/portfolio/appointment-system.json`'s `icon` field now points at `/appointment-logo.png` instead of the old `/portfolio/appointment-system/icon.png`, matching the pattern already used for the Cyberussell/HireWorkers cards; verified live on `/portfolio` (card icon) — the `/portfolio/appointment-system` detail page doesn't render the `icon` field at all (uses `coverImage` instead), so no change needed there. **Follow-up copy fix:** Russell flagged the portfolio card/detail-page copy as stale — it said "healthcare and legal professionals" / "doctors, dentists, and lawyers," but the real product's business-type list (`src/lib/appointment-system/terminology.ts`) is broader: medical, dental, spa, salon, law, veterinary, other. Updated `tagline` and `overview` in `appointment-system.json` to "clinics, salons, spas, law offices, and vet clinics" wording, and updated the same baked-in text/tag row in `public/portfolio/appointment-system/cover.svg` (was "doctors, dentists, and lawyers" + DOCTOR/DENTIST/LAWYER tags, now CLINIC/SALON/SPA). Verified live on both `/portfolio` and `/portfolio/appointment-system`.

----------------------------------------

**Quick fix (2026-07-10), not yet committed:** Portfolio page (`/portfolio`, part of the Services product) — swapped the project-card icons for the Cyberussell and HireWorkers entries. `src/data/portfolio/cyberussell.json` and `src/data/portfolio/hireworkers.json` `icon` fields now point at `public/cyberussell logo.png` and `public/hireworker-logo.png` (both pre-existing in `public/`, provided by Russell) instead of the old `public/portfolio/<slug>/icon.png` files. No other files touched (`src/app/portfolio/page.tsx` unmodified — it already reads `project.icon` generically). Verified live in preview via `next dev`: both new logos render correctly in their project cards (confirmed via network requests returning 200 and DOM inspection of the `<img>` elements).

----------------------------------------

**Quick fix (2026-07-10), committed and pushed to `main` (`56bdf24`), deploy triggers automatically via the host's git integration (no in-repo deploy script found):** Services page (`src/app/services/page.tsx`) bottom CTA's secondary button renamed from "View Cyberussell" (linked to `/`) to "Build With Us" (linked to `/build-with-us`). Verified live via a production build + `next start` (the dev server was hitting an iCloud-Drive-sync race against Turbopack's persistent cache in `.next` — unrelated to this change, worked around by building once instead of running dev). Note: a concurrent session committed `66a5d14` (Hero/Pricing fixes on the Build With Us page) and has unrelated in-progress uncommitted work in `src/components/demo/appointment-system/Footer.tsx` — left untouched per the one-product-at-a-time rule.

----------------------------------------

Current Product: Get Started Landing Page (cross-cutting marketing page, not one of the 7 products — see [docs/project-map.md](project-map.md))

Current Feature: Standalone premium marketing/lead-gen landing page at `/get-started`, modeled on a Claude Design brief (ABC copywriting framework, Linear/Stripe/Vercel-quality polish) with a reference screenshot (BizNext template) for inspiration only — reusing the existing design system's tokens/patterns rather than the reference's visual language.

Current Goal: Ship a conversion-focused page with two CTAs (book a free consultation, request a free AI business audit), reusing existing infra (`/api/contact`, Services routes) instead of building new backend.

Current Status: Built and verified, 2026-07-08.
- **New route**: `src/app/get-started/page.tsx` — indexed (not noindex), full metadata/OG/Twitter card.
- **New components** (`src/components/get-started/`): `GetStartedNav.tsx` (custom minimal nav — back arrow, wordmark, one CTA, no full site Navbar), `GetStartedHero.tsx`, `ProblemsSection.tsx`, `SolutionsSection.tsx` (links to existing `/services/[slug]` pages where a matching catalog entry exists, `/services/inquire?service=...` otherwise for SEO/Technical Solutions which have no dedicated catalog page), `ProcessSection.tsx`, `WhyCyberussellSection.tsx`, `AuditSection.tsx` (client, lead form), `GetStartedFAQ.tsx` (client, accordion), `GetStartedFinalCTA.tsx`.
- Existing section components (`PainSection`, `FaqAccordion`, `FinalCTA` from Earn; `ServiceHero`/`ServiceCTA`/`ServiceFAQ` from Services) were evaluated but not reused as-is — all are hardcoded to their own product's copy/data types, not generic — new components instead match their exact visual conventions (navy scale, brand colors, Syne/Inter fonts, card/radius/button patterns).
- **Consultation CTA reuses existing infra**: links to `/services/inquire?service=Free%20Consultation` (existing page + `/api/contact`), no new form built for this. **Audit CTA is the one new form**: `AuditSection.tsx` posts directly to the existing `POST /api/contact` with a distinct subject line — no API or DB changes.
- Footer: reuses existing site-wide `Footer.tsx` (Russell confirmed default reuse over a custom one).
- Verified: `npx tsc --noEmit` clean, `npx next build` succeeds (`○ /get-started` prerendered static — an earlier `ENOENT pages-manifest.json` build error was a stale/corrupted `.next` cache artifact unrelated to this page, resolved by a clean rebuild). Live-verified in preview: all 8 sections render correctly desktop + mobile, FAQ accordion toggles correctly, Solutions cards link out correctly, audit lead form validates and POSTs to `/api/contact` with the right payload (confirmed via network inspection — the actual Gmail SMTP send is slow/environment-limited in this sandbox, same shared infra as the already-shipped `/services/inquire` form, not a bug in new code). One real bug found and fixed: `GetStartedNav`'s "Book a Consultation" button wrapped and overflowed above the sticky header on mobile (375px) — shortened to "Book a Call" below the `sm:` breakpoint.

Branch: main (working directly, no feature branch)

----------------------------------------

## Allowed Files (Get Started Landing Page scope)

- `src/app/get-started/**`
- `src/components/get-started/**`
- Read-only reference to existing Services/Earn components, `/api/contact`, design tokens during research (not edited)

----------------------------------------

## Notes

- This is a cross-cutting marketing page, not one of the 7 products — scoped strictly to new files under `get-started`; no shared components (`Navbar.tsx`, `Footer.tsx` itself, `/api/contact`) were modified, only reused/linked to.
- Previous cross-cutting initiative, Design System (brand guidelines, marketing asset kit, `/design-system` style guide page), completed 2026-07-08 — see git history for that work.

----------------------------------------

# Paused: Appointment System (resume here when Design System work is done)

Current Product: Appointment System

Current Feature: 5-part feature batch — (1) business type multi-select ✅ done, (2) booking page staff-name/phone validation, (3) month-view calendar, (4) Google Maps address, (5) PayMongo (SaaS billing + end-customer payments incl. subscriptions)

Current Goal: Ship all 5 in order; #1, #2, #3 complete and verified live. #4 (Google Maps) paused, deferred by Russell. #5 (PayMongo) in progress — SaaS billing "Pay Now" checkout built and verified end-to-end in a real browser; webhook auto-sync is the one remaining piece, blocked on a public URL.

Current Status: Feature #1 done — migration `006_multi_business_type.sql` applied live, code updated (types.ts, terminology.ts, signup/page.tsx, actions.ts, 12 read-sites), verified end-to-end (multi-type signup succeeded against production DB). Feature #2 done — [businessSlug]/page.tsx, BookingWidget.tsx, api/book/route.ts updated for conditional staff-name display + strict PH phone validation, verified live on the "Bright Bright" test business (single-staff hides name, 2-staff shows name, invalid phone blocked, valid phone booked successfully). Feature #3 done — AppointmentsMonthGrid.tsx (new) + dashboard/appointments/page.tsx updated with Week/Month toggle, verified live (correct grid, count badges, day-click drill-down to the right week). Feature #4 paused — Russell said "not now for the map," holding until requested again. Feature #5 in progress: PayMongo Subscriptions API turned out to be disabled on the account (confirmed via API test — `resource_not_found` on `/v1/plans`) and requires PayMongo support to enable it; Russell chose to build a custom "Pay Now" checkout instead (Checkout Sessions API, confirmed working) rather than wait. Built: migration `007_paymongo_billing.sql` (paymongo_checkout_session_id, plan_renews_at on businesses), `src/lib/appointment-system/paymongo.ts` (checkout session creation + webhook signature verification), `dashboard/billing/page.tsx` + `BillingPlanCard.tsx` (tier picker, "Pay Now" buttons), `initiateBillingCheckout` action in actions.ts, lazy overdue-suspend check added to `requireBusiness()` in auth.ts, "Billing" added to NavTabs.tsx, and the webhook route `api/paymongo/webhook/route.ts` (listens for `checkout_session.payment.paid`). Verified live in Russell's real browser: clicking "Pay Now" correctly redirects to PayMongo's hosted checkout page with the right plan/price/business metadata.

**Next step for Feature #5:** the webhook needs a public URL to register with PayMongo (localhost isn't reachable by PayMongo's servers) — waiting on Russell to provide either a live Vercel deployment URL or a tunnel (e.g. ngrok) for local testing, then register the webhook in the PayMongo dashboard and share the resulting `whsk_...` secret so it can be added as `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. Until then, "Pay Now" checkout works but plan_tier/plan_status won't auto-update on successful payment.

**Latest batch — mobile dashboard nav + week-view fix + Messenger staff choice (not yet verified live, built on branch `claude/appointments-mobile-dropdown-staff-zpcy2j`):**
- **`NavTabs.tsx`**: on mobile (`<sm`) the 10-tab horizontal scroller is replaced with a native `<select>` dropdown (same active-tab detection, same `clientsLabel` override); desktop/tablet keeps the existing tab strip (`sm:flex`), unchanged.
- **Week-view calendar mobile fix** (`dashboard/appointments/page.tsx`): the 7-day grid used `grid grid-cols-7` + per-cell `min-w-[90px]` inside `overflow-x-auto`, which rendered with overlapping day columns on mobile Safari (confirmed via screenshot — days/appointment cards visually overlapping). Replaced with a `flex` row of `w-[104px] shrink-0` cells inside a `-mx-4 overflow-x-auto` wrapper on mobile, switching back to `sm:grid sm:grid-cols-7` (no horizontal scroll) at `sm:` and up. Desktop/tablet layout unchanged.
- **Messenger booking: optional staff choice** (`flow.ts`, `types.ts`): previously `showSlots` sent one quick-reply per (staff, time) slot with only the time as the title — if 2+ staff were free at the same time, the customer saw duplicate-looking buttons with no way to tell them apart or choose. Now mirrors the web `BookingWidget` pattern: slots are de-duped by start time first (`TIME_{epochMs}` payload); picking a time re-checks candidates for that exact time, and only if 2+ staff are actually free does the bot ask "Sino po ang gusto ninyong puntahan?" with a staff-name quick-reply (`STAFF_{staffId}_{epochMs}`) — single-staff businesses or slots never see the extra step. Added `choosing_staff` to `FlowStep`. Replaced the old combined `SLOT_{staffId}_{epochMs}` payload entirely (no back-compat shim — in-flight conversations mid-pick are a negligible edge case).
- **Follow-up: booking-details hierarchy applied everywhere details are shown.** Dashboard Appointments-tab cards restructured into date/time → name → contact number → service → staff using font size/weight/color tiers (contact number wasn't shown before — now is). Same order/hierarchy extended to the Messenger booking confirmation text (order + emoji labels, since Messenger plain text has no rich formatting) and to the `/appointments/manage/[code]` summary card (added client name/phone fetch + display, restyled to match the dashboard card's visual tiers).
- Verified: `npx tsc --noEmit` clean and `npx next build` succeeds for all changes in this batch. Not yet manually verified in a real browser/Messenger thread — pending Russell's review.

**Since the above, additional work done (deployed live):**
- Public booking page + BookingWidget fully redesigned (premium glass UI) and flow reworked to calendar-first: service → month calendar → time → staff (only if 2+ actually free at that slot) → details. Deployed.
- Billing page cards: full feature list per tier + equal-height cards. Deployed.
- **Messenger integration set up and working**: new dedicated Meta app "Cyberussell Appointment System", test Page "Cyberussell Test Clinic" (Page ID `1202963049564774`) connected to "Bright Bright", webhook registered and verified live, full booking-via-Messenger flow tested (including human handoff via "Talk to staff" — working as designed, not a bug).
- **New booking guardrails batch** (see checkpoint `appointment-system-booking-guardrails-v1.md`): same-day booking limit (1 active appointment/day per customer, self-service channels only), reference code + QR code on every booking (migration `008_booking_reference.sql`, new `qrcode` dependency), business hours gate in Settings (blocks the booking page/API/Messenger until at least one day's hours are set — does not constrain staff Availability), and week-view "+N more" expansion in the dashboard Appointments tab. All verified live.
- Still pending from the guardrails batch: the public `/appointments/manage/[code]` self-service cancel/reschedule page, and Messenger-side self-service cancel/reschedule (currently "cancel" intent still hands off to a human).

**Latest batch (see checkpoint `appointment-system-manage-booking-plans-v1.md`), all verified live:**
- **Manage-booking page built**: `/appointments/manage/[code]` (+ `/appointments/manage` code-entry fallback) — customers can self-service reschedule (full calendar→time→staff flow, reused from booking) or cancel, no login needed (reference code is the credential). `MonthCalendar` extracted to its own shared component for this reuse.
- **Business's own booking-page QR** added to Settings (Business Profile section), server-generated via `qrcode`, downloadable.
- **Settings page compressed** to a 2-column CSS multi-column layout on desktop (`lg:columns-2`), mobile unaffected.
- **Plan restructure — AI Receptionist tier fully removed** (migration `009_remove_ai_receptionist_tier.sql`, folds any business on that tier into `pro`): now 3 tiers — Free (100 appts/mo, 1 staff), Basic (150 appts/mo, 5 staff), Pro (unlimited appts, unlimited staff). The AI free-text answering capability was deleted entirely (removed `ai.ts`, simplified `flow.ts`), not preserved anywhere. Landing page pricing cards/comparison table updated to match, but its FAQs/meta description/`AiDemo` component still reference the old AI positioning — flagged, not rewritten (separate content decision).
- **Reference code format changed to 6-digit numeric** (was an 8-char alphanumeric code from a fixed unambiguous alphabet). `generateReferenceCode()` in `slots.ts` now returns 6 random digits; the manage-page code-entry placeholder updated to match. Verified live end-to-end: booked a real test appointment on "Bright Bright" and got a 6-digit code, confirmed the `/appointments/manage/[code]` lookup and cancel flow both work with it, then cancelled the test booking.
- **All of the above (guardrails batch + manage/plans batch + reference-code format change) committed and pushed to `main` in this session** — previously sitting uncommitted in the working tree despite being marked "verified live" against the production Supabase DB. `.claude/settings.local.json` was deliberately left out of the commit (local tool permissions, not product code — also currently contains a hardcoded Supabase secret key in one of its allowlist entries, flagged to Russell separately, not rotated).

**Latest batch (see checkpoint `appointment-system-ux-polish-v1.md`), both verified live:**
- **Manage-booking discoverability**: added an "Already booked? Manage your booking" link on the public `[businessSlug]` page, under the business header, linking to `/appointments/manage`.
- **Signup/login branding fixed**: both auth pages had zero site branding — flagged by Russell as "looks like a scam." Added a new shared `AuthHeader`/`AuthFooter` (`src/components/appointment-system/AuthChrome.tsx`) — lightweight Cyberussell wordmark + link back to cyberussell.com, plus a footer attribution line — applied to both `signup/page.tsx` and `login/page.tsx`.
- This same session also independently built a dashboard reference-code chip and a Messenger staff-choice step, but `git push` was rejected because a parallel session had already built and merged near-identical (and more complete) versions of both to `main` via PR #5 — see the "mobile dashboard nav + week-view fix + Messenger staff choice" batch above. The duplicate local versions were discarded during the merge in favor of the already-merged upstream ones; nothing from this session's version of those two items survived.
- Deployed: this batch was pushed to `main` alongside merging in the parallel session's PR #5 (mobile nav dropdown, week-view mobile fix, Messenger staff choice, booking-details hierarchy) — see that section above for what's included and its own verification status.

**Latest batch (see checkpoint `appointment-system-plan-tier-adjustments-v1.md`), all verified live:**
- **Basic tier appointments now unlimited** (`entitlements.ts`: `basic.monthlyAppointments` 150 → `null`); staff limit (5) unchanged, still the Basic/Pro differentiator.
- **Data export moved from Basic+Pro to Pro-only** (removed from `basic.features`) — the feature was never actually built (flag only, landing copy already said "(soon)"), so this is an entitlement/copy change, not new functionality.
- **"Recommended" badge added to Pro** in the Billing dashboard (`BillingPlanCard.tsx`) — separate from the landing page's existing "MOST POPULAR" pill, which was left alone.
- **New "This month" stat card on the dashboard Today overview** (`dashboard/page.tsx`) — shows `{limit - used} of {limit} appointments left · resets monthly`, only rendered when the business's plan has a monthly cap (Free tier only, now that Basic is unlimited too). Resets automatically each calendar month (existing `getMonthlyAppointmentUsage` behavior, no new code needed for that part).
- **Landing page copy updated to match** (`appointments/page.tsx`): Basic's pricing bullets and the comparison table now show "Unlimited appointments" instead of "150"; "Data export" bullet moved from Basic to Pro; comparison table's Data export row is now `— / — / Soon`.
- **No DB migration needed** — plan limits/features are entirely code-driven in `entitlements.ts` (confirmed no limit-shaped columns exist in any migration file).
- Verified live: landing pricing section + comparison table, and the Billing/Today dashboard pages against "Bright Bright" (temporarily flipped to `free` via direct DB update to see the Free-tier view — e.g. confirmed "85 of 100 appointments left · resets monthly" rendered correctly — then restored to `pro`, its unchanged original state).
- **Appointments tab: staff filter + sort, and compact icon-based cards.** Added a staff filter pill row ("All staff" + each active staff member) above the week list — "All staff" sorts by staff name then time (grouping each provider's appointments together), clicking a specific staff filters to just them. Also condensed each appointment card from up to 6 stacked text lines down to ~2-3 flex-wrapped rows, and converted "Record payment"/"Reschedule"/"Completed"/"No-show"/"Cancelled" from full-text buttons to icon-only buttons with native `title` tooltips — roughly halving card height and quadrupling how many fit on screen at once. Verified live against "Bright Bright" (2 staff): filter/sort works correctly, tooltips show the right labels, and the Reschedule/Record Payment inline forms still work.
- **Comparison table unified between landing and Billing tab; badge wording matched.** Landing page's Pro pill changed from "MOST POPULAR" to "RECOMMENDED" to match the Billing tab. Extracted the full feature-comparison table into a new shared component (`PlanComparisonTable.tsx`) — previously landing-page-only, now rendered on both `/appointments#pricing` and the logged-in `/appointments/dashboard/billing` page, so a business owner can see the same comparison without leaving the dashboard. Single-sourced the `COMPARISON` data (was a copy-pasted duplicate in the landing page file). Verified live on both pages.
- **Per-plan bullet lists unified too.** Found a second copy drift: the Billing tab's plan cards built their own short feature list from raw `FeatureFlag`s, while the landing page had a longer, hand-written marketing list for the same plans (e.g. Free showed 5 items on Billing vs 9 on landing). Moved `PLAN_BULLETS` into `entitlements.ts` (single source) and switched `BillingPlanCard.tsx` to use it directly, deleting the now-redundant `FEATURE_LABELS` map. Verified live — Billing tab's cards now show the identical wording as the landing page for all 3 tiers.
- **Billing tab card-grid width fixed.** The 3 plan cards used a stale `lg:grid-cols-4` (leftover from the pre-migration-009, 4-tier era), leaving the card row visibly narrower than the full-width comparison table below it. Changed to `sm:grid-cols-3`; verified live both now measure exactly 1120px wide at the same x-offset.

**Latest batch (see checkpoint `appointment-system-plan-tier-adjustments-v1.md` item 10), committed and deployed:**
- **Downgrade warning before checkout.** Previously, a business on an active paid plan (e.g. Pro) could click "Pay" on a cheaper plan (Basic) with zero warning — the webhook applies the new tier unconditionally on payment, resetting `plan_renews_at` to 30 days out with no proration (forfeiting any remaining paid days), and losing features immediately (e.g. Messenger bot could break mid-conversation). Russell chose to keep self-serve downgrade available but warn first, rather than blocking it entirely. Implemented: `BillingPlanCard.tsx` now shows an inline amber warning (lost features, tightened limits, forfeited days if applicable) before the payment button submits, requiring an explicit "Yes, downgrade & pay" confirmation. `FEATURE_LABELS` moved to `entitlements.ts` (shared). Verified live against "Bright Bright" (all scenarios: with/without remaining days, cancel, upgrades unaffected).

**Latest batch (see checkpoint `appointment-system-onboarding-flow-fix-v1.md`), code done, mostly verified live:**
- **Fixed a conflict between two earlier features in this same session: first-login billing redirect vs. the setup checklist.** A paid-plan signup's first login went straight to Billing and would never see the setup checklist — meaning payment before the store could even take a booking. Russell chose (via clarifying question): setup first, always; billing stays reachable but not forced. `signIn()` no longer redirects to Billing on first login (always goes to Today now). `selected_plan_tier` data (captured at signup, from the earlier feature) is now surfaced as a soft nudge inside the `SetupChecklist` card instead — "You picked the {plan} plan... visit Billing to activate it" — rather than a hard redirect. **Supersedes the billing-redirect behavior described in the `appointment-system-first-login-billing-redirect-v1.md` checkpoint** — that checkpoint's migration/schema work (`selected_plan_tier`, `first_login_at` columns) is still accurate and in use, only the redirect behavior changed. `tsc`/`next build` clean; live-confirmed no regression on the existing "Bright Bright" dashboard. **Not verified live:** the actual new-user path (checklist + pending-plan nudge together) — needs a real email-confirmed signup, unavailable in this session.

**Latest batch (see checkpoint `appointment-system-forgot-password-v1.md`), code done, mostly verified live:**
- **Forgot-password flow built from scratch — none existed before.** New `/appointments/forgot-password` (request form, `requestPasswordReset` action calling `supabase.auth.resetPasswordForEmail`) and `/appointments/reset-password` (client-side, listens for Supabase's `PASSWORD_RECOVERY` auth event, then `updateUser({ password })`). "Forgot password?" link added under the password field on login. Two bugs caught and fixed via live testing: a `getSession()` fallback that produced false positives from an unrelated already-logged-in session in the same browser tab (removed — only the `PASSWORD_RECOVERY` event itself is trusted now), and a stale-closure bug in the expiry timeout (fixed with a ref). Verified live: request flow and the "invalid/expired link" state both confirmed correct (screenshot taken). **Not verified:** the actual happy path of clicking a real emailed reset link — needs Russell to test with real email access. Supabase's "Reset Password" email template is still the unbranded default (same as "Confirm signup" was) — offered to rebrand it the same way if wanted.

**Latest batch (see checkpoint `appointment-system-email-confirmation-ux-v1.md`), code done, verified live:**
- **Unconfirmed-login now shows a clear message + resend option instead of "Invalid email or password."** `signIn()` detects Supabase's `error.code === 'email_not_confirmed'` and returns `EMAIL_NOT_CONFIRMED`; `login/page.tsx` shows an amber banner with a "Resend confirmation email" button (new `resendConfirmation(email)` action, calls `supabase.auth.resend`). Signup's post-signup copy also tightened to say confirmation is required before login. Notable implementation detour: first tried wiring resend through a second `useActionState` + `formAction` button nested in the login form (the documented Next.js pattern) — this silently submitted the wrong action in live testing (confirmed via `preview_network` inspecting the actual response payload), so switched to calling `resendConfirmation` directly via `useTransition` from an onClick handler instead, which works correctly. Full loop verified live with a real unconfirmed test signup (`+resendtest@gmail.com`). **Open question for Russell:** "what if they forgot their email" was interpreted as "forgot to confirm" (resend flow above) rather than "forgot which email they signed up with" (a different, harder recovery feature) — flagged for confirmation.

**Latest batch, code done:**
- **Signup business type reverted to single-select.** Russell caught that the multi-type signup checkboxes (from Feature #1) should have been single-choice, not multi-select. Scoped to signup-form-only per Russell's choice — changed `<input type="checkbox">` to `type="radio"` in `signup/page.tsx` (same `businessTypes` form field name, so `signUp()`/`formData.getAll('businessTypes')` needed no changes — a radio group naturally submits exactly one value). DB schema (`business_types` array column), `terminology.ts`, and the ~12 other read-sites are untouched — new signups just always end up with a 1-item array now. Existing multi-type businesses (e.g. the `multitype2` test account) are unaffected. Verified live: radio buttons render correctly, selecting one deselects the others (confirmed via DOM state after clicking "Salon" — only it stayed checked).

**Latest batch (see checkpoint `appointment-system-fb-connection-plan-gate-v1.md`), code done:**
- **Facebook Page connection now gated to plans with `messenger_booking_bot`.** Settings page previously let any plan fill in/save FB Page ID + access token even though the bot itself already silently ignores it for non-Pro (`flow.ts:55`). Added the same `hasFeature`/`tierWithFeature` upgrade-banner pattern already used on the Conversations tab, disabled both form fields + submit button when not entitled, and added a matching server-side guard in `saveFbConnection()` so the disabled UI can't be bypassed by posting directly to the action. `tsc` clean; live-verified the enabled/Pro path via screenshot ("Bright Bright"); disabled/non-Pro path is code-reviewed only (mirrors the already-verified Conversations gating exactly) — flagged for an optional live spot-check by temporarily flipping a test business off Pro.

**Latest batch (see checkpoint `appointment-system-manage-branding-onboarding-checklist-v1.md`), code done:**
- **Manage-page branding + back link fixed.** `/appointments/manage` had zero branding and no way back — added shared `AuthHeader`/`AuthFooter`, and the public booking page's "Already booked?" link now passes `?from={slug}` so a "← Back to booking page" link renders. Screenshot-verified live.
- **New dashboard setup checklist for new business owners.** Russell noted new owners land on an empty dashboard with no guidance on what to configure first. Added `SetupChecklist.tsx` — 5 steps (phone+address, ≥1 service, ≥1 staff, ≥1 availability row, business hours configured), auto-hides when complete or manually dismissed (`dismissSetupChecklist()` action, stored in existing `settings` jsonb, no migration). Facebook Page connection deliberately excluded per Russell (optional channel, not required for the booking page to function). Replaced the old buried one-line setup hint in the dashboard's empty state. `tsc` clean; **not yet screenshot-verified live** (behind dashboard auth, no test credentials in that session) — flagged for Russell to spot-check.

**Latest batch (see checkpoint `appointment-system-first-login-billing-redirect-v1.md`), code done, NOT yet applied to production DB:**
- **First-time login now routes to Billing tab when signup came from a pricing CTA.** Landing page plan cards already linked to `/appointments/signup?plan={tier}` but the param was ignored; signup always defaulted to Free and login always went to `/appointments/dashboard`. Added migration `010_first_login_billing_redirect.sql` (`selected_plan_tier`, `first_login_at` on `businesses` — intent-tracking only, does not touch the real `plan_tier`), threaded `?plan=` through `signup/page.tsx` (now reads `searchParams` via React's `use()`) into the `signUp()` action, and added first-login detection + conditional redirect in `signIn()`. Russell confirmed this applies to all three plans including Free, not just paid tiers. `tsc`/`next build` clean; confirmed in preview that the hidden `plan` field threads through correctly for `pro`/`free`/no-param cases.
- **Blocking on Russell:** migration `010` has not been run against the Appointment System's live Supabase project yet — until then `signUp`/`signIn` will error on the new columns in production. No live end-to-end test done yet for this reason.

Branch: main (working directly, no feature branch)

Priority: Sequential — do not start #2 until user confirms readiness (already confirmed order, currently proceeding).

----------------------------------------

## Allowed Files

- `src/app/appointments/**`
- `src/components/appointment-system/**`
- `src/lib/appointment-system/**`
- `appointment-system/migrations/**`

----------------------------------------

## Blocked Areas

- Any other product (Start Here, AI Tools, Learn, Earn, Services, Shop)
- Mission Control (`src/app/mission-control/*`, `src/app/api/mission-control/*`)
- Shared site components (`Navbar.tsx`, main `Footer.tsx`) — Appointment System dashboard uses its own `NavTabs.tsx`

----------------------------------------

## Current Dependencies

- Feature #4 (Google Maps) needs a Google Cloud API key from Russell (Places + Maps JS/Embed API, billing enabled) — paused/deferred, not currently being worked on.
- Feature #5 (PayMongo) — SaaS billing "Pay Now" checkout is built and working using the shop's existing PayMongo account/keys (`PAYMONGO_SECRET_KEY`/`PAYMONGO_PUBLIC_KEY`, confirmed intentional reuse, same merchant "Payjobs.work Manpower Services"). **Blocked on:** a public URL (Vercel deployment or ngrok tunnel) so the webhook can be registered with PayMongo and its signing secret added as `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET`. End-customer payments/subscriptions (the other half of #5) not yet started.

----------------------------------------

## Success Criteria

- [x] Feature #1 complete (business type multi-select)
- [x] Feature #2 complete (booking page: conditional staff name display, 11-digit PH mobile phone validation client+server)
- [x] Feature #3 complete (month-view calendar in Appointments tab)
- [ ] Feature #4 complete (Google Maps address autocomplete + booking page map) — paused
- [x] Feature #5a "Pay Now" checkout UI + server action + checkout session creation — done, verified live
- [ ] Feature #5a webhook registered with PayMongo (needs public URL) + `APPOINTMENTS_PAYMONGO_WEBHOOK_SECRET` added + end-to-end payment→plan-activation test
- [ ] Feature #5b end-customer payments/subscriptions (not started)
- [ ] Mobile layout approved
- [ ] Desktop layout approved
- [ ] Accessibility reviewed
- [ ] Performance acceptable
- [ ] SEO reviewed
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Ready for testing
- [ ] Ready for deployment

----------------------------------------

## Notes

- Naming: "BooklyPro" is a retired/copyrighted name — never use it; product is "Appointment System" everywhere (UI, code, docs).
- `BOOKLYPRO_*` env var prefix in `.env.local`/`.env.example` is a known stale holdout, rename pending Russell's go-ahead (separate task, not part of this batch).
- Test signup accounts created during verification: `russell.a.parayno+multitype@gmail.com` (orphaned — auth user exists but no business row, safe to ignore/delete), `russell.a.parayno+multitype2@gmail.com` (successful, has businesses row with business_types = {medical,dental,spa}).
- Test business "Bright Bright" (slug `bright-bright`, owner `russell.a.parayno+1@gmail.com`) was bumped to `plan_tier = 'pro'` during feature #2 testing to get past the Free tier's 1-provider limit — still on `pro` now, not reverted. Has 2 staff (Dr Vonne, Dr. Maya), 2 services (Cleaning, Crowning), and a couple of test appointments booked during feature #2/#3 verification.
- **Known bug, not yet fixed (flagged, no decision from Russell yet):** plan-limit-gated server actions (`createStaff` confirmed, likely others in `actions.ts`) fail completely silently with no user-facing error when a plan limit is hit — the form just does nothing.
