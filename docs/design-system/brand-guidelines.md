# Cyberussell Brand Guidelines

Reference for anyone — Russell, a collaborator, or an AI agent — creating anything Cyberussell-branded: site pages, social posts, thumbnails, decks, or ads. Everything here reflects what's **already live on the site** (audited from the codebase, not invented), so following it keeps new work consistent with existing work.

The living, visual version of the token reference lives at `/design-system` on the site itself (`src/app/design-system/page.tsx`) — this doc is the narrative/rules layer on top of it.

---

## 1. The Logo

**Files:** `public/logo-icon.png` (navbar-sized icon, square), `public/logo.png` (larger showcase version), `public/favicon.png` (flat favicon variant).

**The story** (from the About page, `src/app/about/page.tsx`):

> It's a compass, not a clock. The needle only points forward, because there's no ROI in looking back at what you don't know yet. The ring is a C, for Cyberussell, left open on purpose — the path isn't finished, it's still being drawn, one skill and one online peso at a time. Orange, because figuring this out takes energy — not luck, not connections, just the willingness to move.

**Usage rules:**
- Always pair the icon with the wordmark when there's room: "Cyber" in white, "ussell" in Brand Yellow (`#FFD23F`) — see Navbar for the reference implementation (`text-[28px] font-bold tracking-tight`).
- Icon-only usage (favicons, small avatars, app icons) is fine — the compass mark is legible on its own.
- Don't recolor the mark, stretch it off its square aspect ratio, rotate it, or add effects (drop shadows, outlines) beyond what's in the source files.
- Minimum clear space: leave at least the icon's own width of empty space around it when placing next to other elements.
- Dark backgrounds only — the mark and wordmark are both designed for the site's dark navy background (`#0F0F1A`). Don't place on light/white backgrounds without redesigning the color treatment first.

---

## 2. Color Palette

Defined once in `src/app/globals.css` under `@theme inline` — this is the single source of truth. Never hardcode a different hex for these roles; reference the token.

| Token | Hex | Role |
|---|---|---|
| `--color-brandRed` | `#E8373A` | **Primary accent.** CTAs, eyebrow labels, attention/urgency, danger states. This is the "energy" color — used sparingly but decisively. |
| `--color-brandYellow` | `#FFD23F` | **Secondary accent.** Highlights, the "ussell" in the wordmark, category pills, numbered badges. Warmer and more approachable than red. |
| `--color-brandGreen` | `#00C97A` | **Success.** Confirmations, positive states, "done" indicators. (Note: the Appointment System sub-product uses Tailwind's stock `emerald-*` scale instead of this token — a deliberate product-level distinction, not an inconsistency to fix.) |
| `--color-brandBlue` | `#3B82F6` | **Tertiary accent.** Used sparingly, for variety when red/yellow would be too loud in the same view. |
| `--color-navy` | `#0F0F1A` | Primary page/section background. |
| `--color-navy2` | `#111118` | Mobile menu, dropdown backgrounds — one step darker than navy. |
| `--color-navy3` | `#18181F` | Card and container backgrounds — one step lighter than navy, for layering. |
| `--color-navy4` | `#222230` | Lightest tier — subtle accents, hover states on cards. |

**Text on dark backgrounds:** white at full opacity for headings/emphasis, `text-white/65` for body copy, `text-white/70` for nav/UI labels. Don't use pure gray (`text-gray-*`) — use white at reduced opacity instead, it reads warmer against navy.

**Borders:** `border-white/10` is the default subtle border on dark backgrounds; `border-white/[0.08]` on cards; hover states typically brighten to `border-white/30` or the relevant brand color at low opacity (e.g. `border-[#FFD23F]/20`).

---

## 3. Typography

| Font | Role | Weights loaded |
|---|---|---|
| **Syne** (`--font-syne`) | Display/headings | 700, 800 |
| **Inter** (`--font-inter`) | Body copy, UI | 400, 500, 600, 700 |

Both loaded via `next/font/google` in `src/app/layout.tsx` — never load a third font without updating that file (keeps bundle size predictable).

**Scale in practice** (not a rigid design-token scale — these are the sizes actually used, kept here as the reference):
- Hero H1: `text-[34px] md:text-[52px] font-extrabold` — Syne
- Section H2: `text-[24px] md:text-[32px] font-bold` — Syne
- Body paragraph: `text-[16px] text-white/65` — Inter, line-height ~1.85 for long-form (see `.prose-cyberussell` in `globals.css`)
- Small UI text (nav, buttons): `text-[13px] font-bold` — Inter
- Eyebrow/label text: `text-[10px] font-bold uppercase tracking-[2.5px]` — Inter

Headings use Syne; everything else (body, UI, labels) uses Inter. Don't mix — Syne at small sizes or in long paragraphs reads poorly, it's a display face.

---

## 4. Voice & Tone

Derived from the site's actual copy (tagline: "Your Skills. Your Income.", About page narrative, product descriptions):

- **Direct, not corporate.** Short sentences. No jargon unless immediately explained.
- **Filipino-context-aware, not generic.** References real Philippine context (peso amounts, "Isabela," GCash) rather than generic "online business" language translated from a US template.
- **Honest about being early/still-building**, not overselling. The About page explicitly says "I'm still learning. I'm still building." — humility is part of the brand, not a weakness to hide.
- **Practical over aspirational.** Copy leans toward "here's exactly what to do" rather than motivational-poster energy.
- **No fluff in CTAs.** "Start Free," "See How It Works" — action verbs, no filler ("Get Started Today!!").

---

## 5. Do's and Don'ts

**Do:**
- Pull colors from the token table above, not eyeballed hex codes.
- Use Syne for anything that functions as a heading/title, Inter for everything else.
- Keep the dark-navy-background convention for anything site-adjacent (social assets, thumbnails) — it's the site's core visual identity.
- Reference `/design-system` for live-rendered examples before designing something new.

**Don't:**
- Invent a new accent color outside the four brand tokens without discussing it first — the palette is deliberately small.
- Use the Appointment System's `emerald-*` palette outside that product — it's a distinct sub-brand choice, not the main site's palette.
- Redraw or recolor the compass logo.
- Write copy in a generic "corporate SaaS" voice — see Voice & Tone above.

---

## Related

- Live token reference: `/design-system` route on the site
- Marketing asset specs (sizes, templates): [marketing-assets.md](marketing-assets.md)
