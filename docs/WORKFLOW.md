# Development Workflow

Permanent operating procedure for every AI-assisted development session on cyberussell.com. This project has 7 products (see [project-map.md](project-map.md)) sharing one codebase, one Navbar, and — in most cases — one Supabase project. The Appointment System is the exception: it has its own dedicated Supabase project and its own auth, so cross-product mistakes there are especially costly.

The point of this workflow is to keep every session scoped to one product, force explicit approval before code changes, and leave behind a clean trail (`working-on.md` + a checkpoint) so the next session doesn't need to re-derive context.

---

## General rules

- **Work on only ONE product at a time.** Never mix changes across two products in the same session, even for a "quick fix" in passing.
- **Never analyze the whole project unless explicitly requested.** Full-project scans (like the one that produced `project-map.md`) are a deliberate, requested action — not a routine step before a normal feature or fix.
- **Always read [project-map.md](project-map.md) first.** It's the source of truth for routes, entry files, components, APIs, and DB tables per product. Don't re-derive this from scratch.
- **Always read [working-on.md](working-on.md) before making changes.** It holds the active product, feature, goal, and file boundaries for the current session.
- **Never modify files outside the current product unless approved.** This includes shared components (`Navbar.tsx`, `Footer.tsx`, etc.), Mission Control (`src/app/mission-control/*`, `src/app/api/mission-control/*`), and the Appointment System's isolated Supabase project/lib/`actions.ts` when the current product is something else.
- **Never deploy unless explicitly requested.** No deployment step is ever implied by "finish this feature" or "wrap up this session."

---

## Session start

Before writing any code:

1. **Read `project-map.md`.** Confirm which product owns the routes/components/APIs/tables relevant to the task.
2. **Read `working-on.md`.** Check whether a session is already in progress; if it's stale or blank, that's the signal to fill it in for this task.
3. **Determine the current product.** Name it explicitly — one of the 7 products, or Mission Control if the task is admin-CMS work.
4. **Build a dependency list.** Identify:
   - The exact files expected to change (main page files, primary components).
   - Shared components those files pull in (per `project-map.md`'s "Shared components" line).
   - APIs and database tables the feature touches, and whether any are shared with another product (Mission Control routes and the Appointment System's separate Supabase project are the usual flashpoints).
5. **Tell the user which files will be affected.** State the file list plainly before touching anything.
6. **Wait for approval before editing.** Do not start writing code until the user confirms the file list. Record the approved list in `working-on.md` under `Allowed Files`.

---

## During development

- **Keep edits limited to approved files.** If a change turns out to require a file outside the approved list, stop and ask before touching it.
- **Explain architectural decisions before making major changes.** Anything that changes a data model, introduces a new dependency, or alters a shared component gets a short explanation up front — not a surprise in the diff.
- **Avoid unnecessary refactoring.** Touch only what the feature/fix requires. Don't "clean up while you're in there" unless asked.
- **Preserve existing design patterns.** Match the conventions already used in the product's existing files (component structure, styling approach, naming) rather than introducing new patterns.
- **Keep commits feature-focused.** One feature or fix per commit; don't bundle unrelated changes.

---

## Session end

Before ending every task:

- **Update checkpoint documentation.** Write a checkpoint per [checkpoints/README.md](checkpoints/README.md) covering what was done.
- **Update `working-on.md`.** Reflect the current status accurately — either reset to blank if the feature is fully done, or leave an accurate in-progress state if not.
- **Mark completed success criteria.** Check off everything in `working-on.md`'s Success Criteria list that's actually verified — don't check boxes that weren't tested.
- **Recommend next logical task.** Give a specific, actionable suggestion for what to pick up next.
- **Never deploy unless requested.** Session end never implies a deployment step.

---

## Quick reference

| Phase | Action |
|---|---|
| Session start | Read `project-map.md` → read `working-on.md` → name the product → build dependency list → state affected files → wait for approval |
| During development | Edit only approved files; explain major decisions; no unnecessary refactors; match existing patterns; feature-focused commits |
| Session end | Write checkpoint → update `working-on.md` → check off success criteria → recommend next task → no deployment |
