<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Operating Rules for AI Agents

Permanent rules for any AI agent working in this repository. Full detail lives in [docs/WORKFLOW.md](docs/WORKFLOW.md) — this file is the enforceable summary.

1. **Always read [docs/project-map.md](docs/project-map.md) before starting work.** It's the source of truth for routes, entry files, components, APIs, and DB tables for each of the 7 products.
2. **Always read [docs/working-on.md](docs/working-on.md) before making changes.** It holds the active product, feature, goal, and file boundaries for the current session.
3. **Work on only ONE product at a time.** Never mix changes across products in a single session.
4. **Never analyze the entire project unless explicitly requested.** Use `project-map.md` instead of re-scanning the repo.
5. **Before editing code:**
   - Identify the affected files.
   - Build a dependency list (shared components, APIs, DB tables touched — and whether any are shared with another product).
   - Present the plan to the user.
   - Wait for approval before editing anything.
6. **Never modify files outside the approved scope.** This includes shared components (`Navbar.tsx`, `Footer.tsx`, etc.), Mission Control (`src/app/mission-control/*`, `src/app/api/mission-control/*`), and the Appointment System's isolated Supabase project/lib/`actions.ts` when working on a different product.
7. **Avoid unnecessary refactoring.** Touch only what the task requires.
8. **Preserve existing architecture and coding patterns.** Match the conventions already used in the product being edited rather than introducing new ones.
9. **Never deploy unless explicitly requested.** No task or session end implies deployment.
10. **At the end of each task:**
    - Update `docs/working-on.md` to reflect current status.
    - Create or update a checkpoint in `docs/checkpoints/` (see [docs/checkpoints/README.md](docs/checkpoints/README.md)).
    - Recommend the next logical task.
