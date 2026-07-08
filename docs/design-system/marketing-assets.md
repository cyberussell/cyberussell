# Cyberussell Marketing Asset Kit

Specs and templates for creating on-brand social/marketing assets — TikTok/Reels covers, thumbnails, quote cards, stat callouts. Pairs with [brand-guidelines.md](brand-guidelines.md) for the color/type rules; this doc is the practical "what size, what layout" reference.

These are specs to recreate in Canva/Figma/an image tool (or feed to an AI image generator as layout instructions) — not files themselves, since this repo doesn't hold binary design files.

---

## 1. Canvas Sizes by Platform

| Format | Dimensions | Aspect | Used for |
|---|---|---|---|
| TikTok / Reels / Shorts / Stories | 1080 × 1920 | 9:16 | Default for all Cyberussell video/story content — matches the existing content-generation convention |
| Instagram feed post (square) | 1080 × 1080 | 1:1 | Carousel slides, quote cards |
| Instagram feed post (portrait) | 1080 × 1350 | 4:5 | Single-image feed posts |
| YouTube thumbnail | 1280 × 720 | 16:9 | Video thumbnails |
| Blog / OG share image | 1200 × 630 | ~1.91:1 | Link previews on Facebook/Twitter/Messenger when a blog post or page is shared |
| Facebook post (link/image) | 1200 × 630 | ~1.91:1 | Same as OG image, reusable |

**Safe zone rule:** keep all text and key visual elements within the inner 90% of the canvas (5% margin on all sides) — platform UI (captions, buttons, profile info) commonly overlaps the outer edge, especially bottom-third on 9:16 formats.

---

## 2. Color & Type Rules for Assets

- Background: `#0F0F1A` (navy) as the default base — matches the site, builds recognition across channels.
- Primary text: white, Syne Bold/ExtraBold for headlines (short, punchy — 3-8 words per slide).
- Accent/highlight word or number: Brand Yellow `#FFD23F` — use to draw the eye to the single most important word or stat per asset, not more than one highlight per slide.
- Urgency/CTA elements (a "watch till the end," a warning, a red flag icon): Brand Red `#E8373A`.
- Success/checkmark/positive indicator: Brand Green `#00C97A`.
- Body/supporting text: Inter, white at 65-70% opacity, noticeably smaller than the headline (roughly half the headline's point size).
- Always include the wordmark or icon somewhere on cover/first slides for brand recognition when reposted/screenshotted out of context — bottom corner or top corner, small, not competing with the main message.

---

## 3. Reusable Templates

### Template: Fact/Quote Card (square or 9:16)
```
┌─────────────────────────┐
│  [icon, small, corner]  │
│                          │
│   "Short punchy fact     │
│   or quote, 1-2 lines,   │
│   [ONE WORD IN YELLOW]"  │
│                          │
│   — attribution/source,  │
│     small, white/65      │
│                          │
└─────────────────────────┘
```
Background navy, headline centered vertically, generous padding (~10% of canvas on all sides beyond the safe zone).

### Template: Stat Callout (square or 9:16)
```
┌─────────────────────────┐
│  EYEBROW LABEL (red,     │
│  uppercase, small)       │
│                          │
│      87%                 │  ← huge number, yellow, Syne ExtraBold
│                          │
│   of X do Y — short      │
│   context line, white    │
│                          │
└─────────────────────────┘
```
The number is the hero element — should be the largest text on the canvas by a wide margin.

### Template: Cover Slide (9:16, for multi-slide posts)
```
┌─────────────────────────┐
│                          │
│   [logo icon, small]     │
│                          │
│   TITLE OF THE POST      │
│   IN SYNE BOLD, WHITE    │
│   with [KEY WORD] in     │
│   yellow                 │
│                          │
│   swipe/scroll cue at    │
│   bottom, small          │
└─────────────────────────┘
```

### Template: YouTube/Blog Thumbnail (16:9 or OG 1200×630)
```
┌───────────────────────────────────┐
│  [supporting image/screenshot,     │
│   right or left third]             │
│                                     │
│  BOLD HEADLINE          [visual]   │
│  2-4 WORDS MAX                     │
│  yellow highlight on 1 word        │
└───────────────────────────────────┘
```
Thumbnails need to read at small sizes (mobile feed) — max 4-5 words, high contrast, no fine print.

---

## 4. Consistency Checklist Before Publishing an Asset

- [ ] Background is navy (`#0F0F1A`) unless there's a specific reason to deviate
- [ ] Headline font is Syne, body font is Inter
- [ ] At most one accent color used as the "highlight" per asset (don't rainbow it)
- [ ] Logo/wordmark present somewhere on cover/first-slide assets
- [ ] Text stays inside the safe zone (90% inner canvas)
- [ ] Matches the voice/tone rules in [brand-guidelines.md](brand-guidelines.md) — direct, practical, Filipino-context-aware, no corporate fluff

---

## Related

- Brand rules (logo, color meaning, voice): [brand-guidelines.md](brand-guidelines.md)
- Live token reference: `/design-system` route on the site
