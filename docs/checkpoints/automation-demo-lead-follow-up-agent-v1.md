# Automation Demo — Lead Follow-Up Agent — v1

**Date:** 2026-08-22
**Product:** New top-level page — `/automation-demo` (not one of the 7 existing products; a standalone signature portfolio piece for Russell as an AI automation engineer)
**Feature:** Cinematic single-page portfolio built from an imported Claude Design project (`claude.ai/design/p/57bb2929-18ab-4bea-a28b-143fbd51367c`, `Portfolio.dc.html`), showcasing a real, live "Lead Follow-Up Agent" automation (Claude drafts → Gmail sends → Calendar books → Drive logs).

## Files Modified

**Page & components:**
- `src/app/automation-demo/page.tsx`
- `src/components/automation-demo/{Nav,ScrollProgressBar,Hero,Problem,LiveDemo,HowItWorks,TechStack,AboutContact,PipelineStageCard,useGsap}.tsx`

**Backend (server-side OAuth + API orchestration):**
- `src/lib/automation-demo/{session.ts,google.ts,claude.ts}`
- `src/app/api/automation-demo/{status,disconnect,draft,run}/route.ts`
- `src/app/api/automation-demo/oauth/{start,callback}/route.ts`

**Config:**
- `src/app/globals.css` — added `noct-pulse`/`circuit-drift` keyframes for this page only
- `package.json` / `package-lock.json` — added `googleapis`
- `.env.example`, `.env.local` — added `AUTOMATION_DEMO_GOOGLE_CLIENT_ID`, `AUTOMATION_DEMO_GOOGLE_CLIENT_SECRET`, `AUTOMATION_DEMO_SESSION_SECRET` (secret generated and set locally; client id/secret left blank pending Russell's Google Cloud setup)

## Summary of Changes

Imported the Claude Design project via the `claude_design` MCP (`DesignSync`), read `Portfolio.dc.html` + its Nocturne design-system dependency + `support.js`, and reimplemented it natively in this repo rather than embedding the raw design HTML — matching site conventions (Tailwind v4, existing `Syne`/`Inter` fonts, `gsap`/`gsap/ScrollTrigger` which was already a listed but previously-unused dependency).

Two deliberate deviations from the design/README, both confirmed with Russell first:
1. **Palette/type** — rebuilt to Russell's brief (deep navy `#0A0E17`/near-black, cyan `#22D3EE` accent, `font-mono` for labels/data, `Syne` for headings) instead of the imported Nocturne system's purple/Inter-only tokens.
2. **Live demo architecture** — the design's README describes calling `api.anthropic.com` directly from the browser with a hardcoded key and reaching Google APIs via "your own connected session" with no backend at all. That's a real security vulnerability (a browser-exposed Anthropic key) and doesn't actually work for real Gmail/Calendar/Drive access (those need a proper OAuth code exchange, not a bare client-side session). Rebuilt server-side instead: a dedicated Google OAuth 2.0 client (`AUTOMATION_DEMO_GOOGLE_CLIENT_ID/SECRET`, separate from the existing Learner Auth Google client so scope changes here can't affect that flow's verification status), authorization-code flow with CSRF `state` cookie, tokens held only in a short-lived AES-256-GCM-encrypted httpOnly cookie (`access_type: "online"` — no refresh token, nothing persisted server-side, no database), and Claude drafting done server-side via the existing `@anthropic-ai/sdk` + `ANTHROPIC_API_KEY` (already configured).

**Safety design for a public demo:** every real action lands on the *visitor's own* account only — the drafted email always sends to the connected account's own address, the Calendar event and Drive file are created on their own Calendar/Drive. This was a deliberate choice (not in the original design) to make it impossible for the public demo to be used to email or calendar-invite a third party. `drive.file` scope (not full Drive access) limits file creation to files this app creates.

**Sections built, each with its own motion moment** (GSAP + ScrollTrigger, gated entirely behind `prefers-reduced-motion` — the hook literally no-ops setup when reduced motion is on, so sections render in their finished resting state with zero animation code running):
1. Hero — boot-up stagger (`data-boot` sequence) + the signature moment: an SVG pipeline (Lead in → Qualify → Draft → Book → Log) that draws itself via `stroke-dashoffset`, plus a subtle CSS-only drifting circuit-grid background (`motion-safe:animate-[circuit-drift_26s_linear_infinite]`, no GSAP needed for that part).
2. Problem — scroll reveal of 3 stat cards + a manual-vs-agent before/after two-column list (not in the original design; added to satisfy the brief's "before/after visual" requirement).
3. Live demo — real interactive widget (not an iframe, unlike the design): lead-message textarea → "Connect Google" (OAuth) → "Draft with Claude" → review the draft → explicit "Send for real — to {email}" → 4-stage pipeline cards (Draft/Send/Schedule/Log) update live with real Gmail message id / Calendar event link / Drive file link, or per-stage errors. Framed in a browser-chrome-style wrapper with a scale+fade entrance.
4. How it works — same `PipelineStageCard` component as the live demo (shared visual language, per the brief), 4 cards + connector bars staggering in on scroll.
5. Tech stack — badges stagger in.
6. About/contact — calmer single fade, no stagger — motion intentionally settles here.

**Graceful degradation:** since no Google OAuth client exists yet, `/api/automation-demo/status` reports `configured: false` and the live demo panel shows a plain "Google integration coming soon" placeholder instead of broken buttons — same ethos as the original design's "demo file not found" placeholder, just for the OAuth prerequisite instead of a missing iframe file.

## Remaining Work

**Blocking real end-to-end use — outside my reach, Russell must do this:**
1. Create a Google Cloud project, enable Gmail API + Calendar API + Drive API, create an OAuth 2.0 Web application client, add the local dev origin and production domain's `/api/automation-demo/oauth/callback` as authorized redirect URIs, and give me `AUTOMATION_DEMO_GOOGLE_CLIENT_ID`/`AUTOMATION_DEMO_GOOGLE_CLIENT_SECRET`.
2. `gmail.send` and `calendar.events` are Google "sensitive scopes" — until the OAuth consent screen passes Google's verification, only test users explicitly added in the Cloud Console can complete the connect flow; other visitors will see Google's unverified-app warning.
3. Once the two credentials are set (locally and in Vercel prod env), the full connect → draft → send-for-real flow needs a live click-through pass with a real Google account (I could only verify the pre-OAuth "not configured" fallback state in this session, and the draft/run API logic by code review — not against a real Google token, since no OAuth client exists yet).

**Not done / open decisions:**
- No link to `/automation-demo` from `Navbar.tsx`, `/resume`, or `/portfolio` yet — deliberately left out per AGENTS.md's shared-component restriction; Russell should say where he wants it discoverable.
- No custom Open Graph image for this page (falls back to the site default).

## Known Issues

- None identified. `npx tsc --noEmit` clean. Live-verified in the browser preview at desktop and mobile (375px) widths: all 6 sections render correct copy/layout, no console errors, the "Google integration coming soon" fallback renders correctly (expected, since no OAuth client is configured yet), nav links and focus states present. The real OAuth → Gmail/Calendar/Drive path is implemented but **not yet exercised against a live Google account** — see Remaining Work above.

## Update — 2026-08-22, later: committed/pushed + fresh-session re-verification

Committed and pushed as `9d3847a` on `claude/recent-automation-work-1m9v13`. Re-verified independently in a later session from a clean container (fresh clone, `npm install`, no `.env.local`): `tsc --noEmit` clean, `GET /automation-demo` returns 200, `GET /api/automation-demo/status` correctly returns `{"configured":false,"connected":false}`, and Playwright screenshots at 1280px/375px (scrolled in steps to fire ScrollTrigger reveals) confirm all 6 sections render with no app-code console errors. Asked Russell where to link the page from; he chose **nowhere yet**, so it stays unlinked from Navbar/resume/portfolio. Still blocked on Russell for the Google Cloud OAuth client — no other agent-side work is actionable until that's supplied or the linking decision changes.

## Update — 2026-08-22, later still: sequenced neon animations for the live demo

Russell asked for the draft to type itself in rather than appear instantly, and for the send step to visibly animate through email → calendar with simple delays and "neon light automation icons," "remotion-like." Clarified via AskUserQuestion: built with GSAP (already this page's animation library), not the actual `remotion` npm package — and one glowing Lucide icon per stage, not a single traveling icon.

- `PipelineStageCard.tsx` gained an optional `icon?: LucideIcon` prop rendered as a circular neon badge (dim idle → pulsing bright active → steady glow done → dim red error), CSS-only pulse via `motion-safe:animate-[neon-pulse_...]` so it already respects `prefers-reduced-motion` the same way the rest of the page does.
- `LiveDemo.tsx` draft preview now types in via a GSAP tween over `typedSubject`/`typedBody` state with a blinking caret, instant under reduced motion; "Send for real" is disabled until typing finishes.
- `LiveDemo.tsx` send flow: the real `/api/automation-demo/run` call is still one request — a new `stageReveal` (0→3) state sequences the *reveal* of the already-returned result client-side, ~900ms apart per stage (Send → Schedule → Log), each stage's result link gated to only appear once that stage is revealed (fixed a bug caught during verification where links leaked in early). `runIdRef` guards against a stale sequence resolving after Start-over/Disconnect.
- `HowItWorks.tsx` passed the same 4 icons into its own `PipelineStageCard` usage for consistency.
- `globals.css`: added `neon-pulse` / `demo-caret-blink` keyframes.

Verified with `tsc --noEmit` (clean) and Playwright against local dev, using route interception to mock `/api/automation-demo/{status,draft,run}` (since no real OAuth client exists in this environment) to drive the actual UI through connect → draft → send with real timers, confirming the typewriter caret, the cascading stage lights, and the link-gating fix. No mocks shipped — only the local test harness simulated a connected session.
