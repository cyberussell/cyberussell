# Overflow QR Panel — Real CSS Cascade Bug Fix — v1

**Date:** 2026-07-18
**Product:** Territory Management System (TMS)
**Feature:** Root-cause fix for the overflow QR panel staying white in production, after two prior attempts (caption color, then a "confirmed via Vercel deployment" dead end) failed to actually explain what Russell kept seeing on his phone.

## What was actually wrong
The previous checkpoint (`territory-management-overflow-qr-panel-status-help-audit-card-tones-v1.md`) concluded the panel was correctly deployed because the commit SHA matched. It wasn't — `GroupLeaderTabs.tsx`'s QR `Card` used `className={... isOverflow ? 'border-black bg-black' : ''}`, but `Card`'s own `panelClass` already sets `border-gray-300 bg-white` unconditionally on the same element. Both classes end up in the DOM's `class` attribute, but Tailwind's compiled stylesheet resolves the conflict by its own internal rule order, not by source/string order — `bg-white` was winning regardless of where `bg-black` appeared in the className string. This also made the "Overflow QR Code" heading (`text-white`) invisible, since the panel behind it never actually turned black.

Confirmed empirically, not just theorized: rendered the real `GroupLeaderTabs` component (not a reimplementation) in a scratch route, read `getComputedStyle(cardEl).backgroundColor` → `rgb(255, 255, 255)` despite `bg-black` being present in the class list. Also pixel-sampled the actual `<img>` QR data URL via canvas (`corner: [0,0,0,255]`, `center: [255,255,255,255]`) — the QR *image* itself was always correctly inverted; only the surrounding panel was broken. This ruled out the QR-generation code (`qr.ts`, `getAssignmentBatchQrDataUrl`) as a suspect entirely — a red herring from visually misjudging a small, dense QR pattern.

## Fix
`GroupLeaderTabs.tsx`: `isOverflow ? 'border-black bg-black' : ''` → `isOverflow ? '!border-black !bg-black' : ''` — Tailwind's important-modifier forces the override to actually win regardless of cascade order.

## Files Modified
- `src/components/territory-management-system/GroupLeaderTabs.tsx`

## Verification
`npx tsc --noEmit` and `npx vitest run` (52/52) clean. Re-tested the same computed-style check after the fix: `rgb(0, 0, 0)`. Confirmed visually via screenshot — black panel, visible white heading, correctly inverted QR, matching Russell's reference image exactly.

## Remaining Work
None. No migration.

## Known Issues
This exact `Card`-vs-conditional-override pattern could recur anywhere else in the codebase that overrides `Card`'s default `bg-white`/`border-gray-300` via a plain (non-`!`) conditional class — worth a `grep` sweep if another "my conditional color isn't showing" report comes in.

## Next Recommended Task
Committed and pushed (`0163d9f`). Russell confirms live: overflow QR panel now shows fully black with a visible white heading, matching the reference image.
