# YR MART Mobile Repairs

Marketing site for **YR MART Mobile Repairs**, a walk-in phone and tablet repair
shop at Shop 18, 166-174 Military Rd, Neutral Bay NSW 2089.

Built with Next.js 15 (App Router), Tailwind CSS v4, TypeScript and Motion.

---

## Running it

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Dev server with hot reload            |
| `npm run build` | Production build                      |
| `npm start`     | Serve the production build            |
| `npm run lint`  | ESLint                                |

Requires Node 18.18+ (this repo was built on Node 20).

---

## Where to change things

Almost everything the shop would want to edit lives in **`src/lib/data.ts`**:

- **`business`**: address, phone number, Google rating and review count, maps
  links, and `siteUrl` (update this once the real domain is live, since it feeds the
  canonical URL, sitemap and social previews).
- **`hours`**: opening hours per day, in 24h Sydney time. The live
  "Open now / Closed" badge, the highlighted "today" row and the search-engine
  markup all derive from this one array, so changing a time here updates every
  place it appears.
- **`services`**: the ten repair cards.
- **`products`**: the accessory showcase.
- **`reviews`**: customer quotes from the shop's Google listing.
- **`faqs`**: the accordion.

Photos go in **`public/images/`**; see the README in that folder for the exact
filenames and shapes. Any photo that isn't there yet falls back to a designed
gradient tile, so the site never shows a broken image.

---

## How it's put together

```
src/
  app/
    layout.tsx      Fonts, metadata, LocalBusiness structured data
    page.tsx        Section order
    globals.css     Design tokens, keyframes, reduced-motion rules
    sitemap.ts      /sitemap.xml
    robots.ts       /robots.txt
    icon.svg        Favicon
  components/
    Stage.tsx       Intro sequencing + the reduced-motion switch (see below)
    Intro.tsx       Full-screen title sequence, once per session
    Nav.tsx         Sticky header, mobile sheet, scroll progress bar
    Hero.tsx        Headline, CTAs, CSS phone mockup, stat counters
    Services.tsx    Repair cards with cursor spotlight
    Process.tsx     Four-step timeline with a scroll-linked spine
    Story.tsx       Owner / trust section
    Shop.tsx        Accessories: grid on desktop, snap carousel on mobile
    Reviews.tsx     Google review marquee
    Faq.tsx         Accordion
    Visit.tsx       Storefront, map, live opening hours, contact
    Footer.tsx      Closing CTA, sitemap links
    CallBar.tsx     Sticky call/directions bar on phones
    OpenPill.tsx    Live open/closed badge
    ui/             Reveal, Magnetic, Counter, SmartImage, Icons, SectionHeading
  lib/
    data.ts         All business content
    hours.ts        Sydney-timezone open/closed logic
```

### Two things worth knowing before you edit animations

**1. Reduced motion means "already visible", not "animate gently".**

`Stage` reads `prefers-reduced-motion` after hydration and exposes it as
`still`. Components check it with `useStage()` and render a **plain element**
rather than a motion one:

```tsx
const { still } = useStage();
if (still) return <div className={className}>{children}</div>;
```

This matters for more than accessibility. Every entrance starts at `opacity: 0`
and only becomes visible when an animation frame runs, so in any context where
`requestAnimationFrame` is throttled (a background tab, aggressive power saving,
some embedded webviews) an animated-only page renders **blank**. Rendering the
finished state directly removes that whole failure mode.

A related trap: passing `initial={false}` to a motion component is *not* enough,
because the server already rendered `opacity: 0` into the HTML and nothing ever
animates it away. Swap the element out entirely, as above.

**2. Nothing may branch on `prefers-reduced-motion` during the first render.**

`still` is `false` on the server and on the first client render, then flips in an
effect. Branching on the media query while rendering would make the server and
client markup disagree and produce a hydration error.

---

## Deploying

The site is fully static: every route prerenders at build time.

**Vercel** (easiest): import the repo, accept the detected defaults, deploy.

**Anywhere else:** `npm run build` then `npm start` behind a reverse proxy, or
add `output: "export"` to `next.config.ts` for a plain static host.

Once the real domain is live, set `business.siteUrl` in `src/lib/data.ts` so the
canonical URL, sitemap and Open Graph tags point at it.

---

## SEO

- `MobilePhoneStore` structured data in `src/app/layout.tsx`: address, geo,
  opening hours, aggregate rating, services and areas served, so the shop can
  compete for the Neutral Bay map pack.
- Per-page metadata, Open Graph and Twitter cards, `sitemap.xml`, `robots.txt`.
- Semantic headings and real `<address>` markup.

The geo coordinates in `business.geo` are approximate for the Military Rd strip.
Replace them with the exact pin from the Google Business Profile.
