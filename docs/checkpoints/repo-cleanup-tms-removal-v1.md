# Repo Cleanup — Duplicate Junk + Old TMS Runtime Removal — v1

**Date:** 2026-08-09
**Product:** Territory Management System (TMS) / repo housekeeping (not a public product)
**Feature:** Russell asked to delete files unrelated to cyberussell.com or no longer in use, both locally and on GitHub.

## Files Modified

Removed (untracked, plain delete, never reached git):
- `docs/checkpoints/shop-removal-v1 2.md` (byte-identical duplicate of `shop-removal-v1.md`)
- `skills-lock 2.json` (byte-identical duplicate of `skills-lock.json`)
- `.claude/skills/higgsfield-{brandkit,game-generation,generate,marketplace-cards,product-photoshoot,soul-id,video-explainer,websites,youtube-thumbnail} 2/` — 9 duplicated skill-tooling folders (Claude Code local tooling, not app code)

Removed (git-tracked, committed `3e566b6`, pushed to `main`):
- `src/app/tms/**` (all routes/actions/api)
- `src/lib/territory-management-system/**`
- `src/components/territory-management-system/**`

## Summary of Changes

Two independent cleanups, both explicitly scoped and confirmed with Russell before touching anything:

1. **Duplicate junk** — macOS "file 2" sync-conflict artifacts sitting untracked in the repo (confirmed byte-identical to their originals via `diff` before deletion). No git action needed since none were ever committed.

2. **Old TMS runtime code** — per `docs/working-on.md`'s 2026-08-06 TMS extraction entries, the Territory Management System was already extracted to a standalone repo, deployed to Vercel, and verified live end-to-end at `https://www.cyberussell.com/tms` via the `TMS_ZONE_URL` proxy rewrite in `next.config.ts`. The old local copy was explicitly flagged there as "deletion is a deliberate later step... only after Russell confirms the new repo is live and verified" — which it now was. Removed all 162 tracked files. `next.config.ts`'s `/tms` rewrite/redirect block was left untouched (it points at the external `TMS_ZONE_URL` deployment, not local files). Confirmed no other product references these directories — the one hit outside them (`src/lib/portfolio/data.ts`) is an unrelated portfolio case-study JSON import, not the runtime code.

Verified: `rm -rf .next` + `npx tsc --noEmit` clean (the only errors seen before that were stale `.next/types/validator.ts` build-cache references to the deleted routes — gitignored, not source).

## Remaining Work

None for this specific cleanup. This was a scoped junk/dead-code removal, not a full-repo unused-file audit.

## Known Issues

None introduced by this change.

## Next Recommended Task

Russell mentioned wanting a broader look at unused files across all products — that was explicitly deferred pending scope confirmation (per the repo's one-product-at-a-time rule, a full audit needs to go product-by-product rather than as a single sweep). Also outstanding from the Shop removal work: `docs/project-map.md` section 6 still documents Shop as product #6 and needs regenerating/removing to match its actual removal.
