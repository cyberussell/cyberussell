# Checkpoints

A checkpoint is a permanent record of a completed feature, written at the end of every session per [WORKFLOW.md](../WORKFLOW.md)'s Session End step. Checkpoints exist so any future session — yours or someone else's — can understand what was built, why, and what's left, without re-reading the whole diff or re-scanning the project.

## How checkpoints work

Each completed feature gets its own markdown file in this directory. Checkpoints are never overwritten or merged — a new version of a feature gets a new, versioned file.

```
docs/checkpoints/
  hero-v1.md
  pricing-v2.md
  faq-v1.md
  dashboard-v3.md
```

Naming convention: `<feature-name>-v<N>.md`, where `<feature-name>` is a short slug for the feature and `v<N>` increments each time that same feature is revisited (e.g. `pricing-v1.md` for the first pass, `pricing-v2.md` for a later revision).

## What each checkpoint must contain

```markdown
# <Feature Name> — v<N>

**Date:** YYYY-MM-DD
**Product:** <one of the 7 products, or Mission Control>
**Feature:** <feature name>

## Files Modified
- path/to/file.tsx
- path/to/other-file.ts

## Summary of Changes
What was built or fixed, and why.

## Remaining Work
Anything still outstanding for this feature — deferred edge cases, follow-up polish, etc.

## Known Issues
Bugs or limitations identified but not fixed in this pass.

## Next Recommended Task
The specific next step — either continuing this feature or moving to the next logical one.
```

## When to create one

Write a checkpoint at the end of every session where code was changed, whether the feature finished completely or is still in progress. If the feature is incomplete, say so honestly in Remaining Work and Known Issues — don't wait for full completion to start the paper trail.

## After writing a checkpoint

1. Save the checkpoint file in this directory using the naming convention above.
2. Update `docs/working-on.md` to reflect the current accurate state (see [WORKFLOW.md](../WORKFLOW.md) Session End).
3. Do not deploy as part of writing a checkpoint — this is documentation only.
