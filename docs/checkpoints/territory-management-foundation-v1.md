# Territory Management System — Foundation + Administrator Module — v1

**Date:** 2026-07-13
**Product:** Territory Management System (brand-new 9th product)
**Feature:** Full application foundation (multi-congregation tenancy, auth, congregation settings) + the complete Administrator module (Territory Management + Territory Records)

## Files Created

**Database:**
- `territory-management-system/migrations/001_init.sql`
- `territory-management-system/SETUP.md`

**Lib** (`src/lib/territory-management-system/`):
- `supabase.ts`, `supabase-server.ts`, `hooks/useServerAction.ts`
- `modules/auth/{queries,types}.ts`
- `modules/congregation/{queries,schema,types}.ts`
- `modules/territory/{queries,schema,labels,types}.ts`
- `modules/records/{queries,schema,csv,types}.ts`
- `modules/dashboard/queries.ts`

**App routes** (`src/app/territory-management-system/`):
- `login/page.tsx`
- `actions/{shared,auth,territories,records,congregation}.ts`
- `dashboard/layout.tsx`, `dashboard/page.tsx`
- `dashboard/territories/page.tsx`, `dashboard/territories/new/page.tsx`, `dashboard/territories/[territoryId]/page.tsx`
- `dashboard/records/page.tsx`, `dashboard/records/[recordId]/page.tsx`, `dashboard/records/export/route.ts`
- `dashboard/settings/page.tsx`

**Components** (`src/components/territory-management-system/`):
- `dashboard/{Card,PageHeader,StatCard,FormField,TableSearchInput,FilterPills,DataTable,DashboardSidebar,ConfirmDeleteButton}.tsx`
- `LoginForm.tsx`, `TerritoryForm.tsx`, `TerritoryDetailsForm.tsx`, `TerritoryMapUpload.tsx`, `TerritoryMapViewer.tsx`, `SectionBlockTree.tsx`, `TerritoriesTable.tsx`
- `RecordForm.tsx`, `RecordEditForm.tsx`, `RecordsTable.tsx`, `RecordApprovalActions.tsx`, `VisitHistoryList.tsx`, `VisitLogForm.tsx`, `CsvImportDialog.tsx`, `CsvExportButton.tsx`, `ApprovalBadge.tsx`, `CongregationSettingsForm.tsx`

## Files Modified

- `package.json` / `package-lock.json` — added `papaparse` + `@types/papaparse`
- `docs/project-map.md` — added product #9 section
- `docs/working-on.md` — this session's entry

## Summary of Changes

Built the entire application foundation and Administrator module from scratch, following the isolated-SaaS architecture already proven twice in this codebase (Appointment System, LMS): own dedicated Supabase project, own auth, own `lib`/`components`/`app` namespace, no shared code or tables with any other product.

**Architecture decisions** (confirmed with Russell via clarifying questions before writing code, then via `EnterPlanMode`/`ExitPlanMode`):
- Section/Block generation is count-based, not map-drawn: the admin picks a section count and blocks-per-section, and a single atomic Postgres RPC (`create_territory_structure`) creates the territory plus every auto-labeled section (A, B, C…) and block (1, 2, 3…) in one transaction. Sections/blocks can be added or removed individually afterward.
- A Territory Record = one address/household, with a `territory_record_visits` table logging dated visit attempts (result: visited / not_home / do_not_call / return_visit) per record.
- CSV-imported records land as `status = 'pending'`; manually-created records are `approved` immediately. This wires the approval workflow so a future publisher-facing submission flow can feed the same `pending` state without a schema change — there's no publisher role yet, so CSV import is currently the only path into `pending`.
- Tenant provisioning is manual this pass — no public signup route. Congregations and their first admin are created directly (SQL/Admin API), documented step-by-step in `territory-management-system/SETUP.md` §3.
- Every tenant-scoped table carries `congregation_id` directly (denormalized, not just inherited via a parent FK), so every RLS policy is a flat check with no cross-table joins. This is a deliberate response to LMS hitting "stack depth limit exceeded" RLS recursion twice in earlier sessions, caused by policies joining up through other RLS'd tables.
- CSV parsing uses `papaparse` (new dependency, flagged explicitly rather than added silently) — hand-rolled RFC4180 parsing has real edge cases (quoted fields, embedded commas/newlines) and CSV Import is an explicitly named required feature.
- The dashboard sidebar is mobile-responsive (slide-in drawer below `lg`, static column above) from the start — LMS's equivalent sidebar still lacks this (flagged as an unfixed gap in LMS's own phase-2 checkpoint); built correctly here since "Responsive Layout" is an explicit named requirement.

**What was built:**
- Auth: login only (no signup), `requireAdmin()` session guard redirecting to login (with a `?error=not_provisioned` message) if the signed-in user has no linked congregation yet.
- Territories: list (search + sortable/paginated table), create (with a live section-label preview), detail page (edit name/description/status, JPG map upload with a click-to-zoom viewer, section/block tree with add/delete and cascade-delete warnings, CSV import scoped to that territory, per-territory CSV export, scoped records list, delete territory).
- Records: global list across all territories (search, pending/approved filter pills, sortable/paginated table, approve/reject/delete), detail page (edit fields, log a visit, view visit history, approve/reject if pending), CSV export route handler.
- Settings: congregation profile (name, congregation number, timezone).

## Remaining Work

- Live end-to-end verification of every DB-backed flow — blocked until Russell provisions the dedicated TMS Supabase project and runs `001_init.sql` (see `territory-management-system/SETUP.md`).
- Publisher-facing role and territory assignment/checkout workflow — not started, not yet scoped by Russell.
- CSV Import is currently scoped per-territory (admin must be on that territory's detail page); there's no global "bulk import across territories" flow — not requested, and the per-territory scope is what makes Section/Block label resolution unambiguous.

## Known Issues

- None found in code review or `tsc`/`next build`. No live DB testing has occurred yet, so DB-level issues (RLS edge cases, the RPC's error handling under concurrent requests, etc.) are unverified — flagging honestly rather than claiming this is production-tested.

## Next Recommended Task

Russell provisions the TMS Supabase project (create it, run `001_init.sql`, set `NEXT_PUBLIC_TMS_SUPABASE_URL`/`NEXT_PUBLIC_TMS_SUPABASE_ANON_KEY`/`TMS_SUPABASE_SERVICE_ROLE_KEY`, provision the first congregation + admin per `SETUP.md` §3). Then a live verification pass: log in, create a territory with auto-generated sections/blocks, upload a JPG map, add records manually and via CSV import, log a visit, approve a pending record, edit congregation settings. After that, scope the next module (likely publisher-facing territory assignment/checkout).
