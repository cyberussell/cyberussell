This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Google AdSense

### Setup

Add your Publisher ID to `.env.local` (and to Vercel project environment variables):

```
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
```

The `ads.txt` file at `public/ads.txt` is served automatically at `https://cyberussell.com/ads.txt`. AdSense requires this file to serve ads.

### Ad modes per page

`src/lib/ads-config.ts` maps route prefixes to one of three modes:

| Mode | Behaviour |
|------|-----------|
| `"auto"` | Google Auto Ads injects placements. **Do not** add `<Ad*>` components to these pages. |
| `"manual"` | Only explicit `<Ad*>` components serve ads. `<AdAutoOptOut />` suppresses Auto Ads for this page. |
| `"none"` | No ads at all (tools, shop, learn, mission-control, services, contact). |

To mark a **new page**:
1. Open `src/lib/ads-config.ts` and add `["/your-path", "auto" | "manual" | "none"]` to `AD_RULES` before the catch-all `/` entry.
2. If `"manual"`: add `<AdAutoOptOut />` at the top of the page component, then place variant components where needed.
3. Also add the URL to AdSense dashboard → Auto Ads → URL groups → Exclusions (belt-and-suspenders for `"manual"` and `"none"` pages).

### Adding a new ad unit

1. Create a new Display ad unit in AdSense dashboard → Ads → By ad unit.
2. Copy the **Ad slot ID** (a numeric string like `1234567890`).
3. Open `src/components/ads/index.tsx` and add the slot ID to the `SLOTS` object.
4. Drop the variant component on the page:

```tsx
import { AdInArticle } from "@/components/ads";

// inside JSX:
<AdInArticle />
```

### Available variants

| Component | Format | Typical use |
|-----------|--------|-------------|
| `<AdBanner />` | Leaderboard 728×90 | Between major sections |
| `<AdRectangle />` | Medium rectangle 300×250 | Sidebar / inline |
| `<AdResponsive />` | Auto-responsive | General in-content |
| `<AdInArticle />` | Fluid / native | Between paragraphs |
| `<AdMultiplex />` | Related content grid | Before related articles |

### Placement rules (summary)

- **Never** place ads inside forms, quizzes, nav, or directly adjacent to affiliate links.
- **Never** place ads on: `/tools`, `/learn`, `/mission-control`, `/shop`, `/services`, `/contact`, `/careers`, `/skill-finder`.
- **Homepage**: Auto Ads only — no manual components needed.
- **Blog & Guides**: `"manual"` mode — use `AdInArticle` + `AdMultiplex`.
