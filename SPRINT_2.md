# Sprint 2 — Image Fix + Gallery & Artwork Pages

**Duration:** 2 weeks
**Branch:** `feature/gallery-phase-2`
**Goal:** Fix all 404 image errors from Sprint 1 demo, then build the core browsing experience — gallery index, artwork detail pages, and series pages.
**Covers:** Sprint 1 image hotfix + Phase 2 (Gallery & Artwork Pages) from PLANNING.md

---

## Sprint 1 Retrospective

### What shipped

- Full Next.js 15 scaffold with App Router
- Header, Footer, Nav, MobileMenu, PageTransition layout components
- Hero, FeaturedWorks, AboutTeaser, StudioTeaser home page sections
- Design token system, Vitest unit tests, Playwright E2E, CI pipeline, Husky hooks

### Sprint 1 Feedback → Sprint 2 Action

| Feedback                     | Root Cause                                                                                      | Fix                                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| All images threw 404 on demo | Local paths (`/artworks/placeholder-1.jpg`, `/hero-placeholder.jpg`) never existed in `public/` | Replace with high-quality Picsum Photos URLs (consistent seed-based, no download required)                          |
| No images loaded anywhere    | Same root cause — `next/image` rendered broken `<img>` tags                                     | Update `artworks.ts`, `Hero.tsx`, `AboutTeaser.tsx`, `StudioTeaser.tsx` + allow `picsum.photos` in `next.config.ts` |

---

## Sprint Order of Operations

```
Week 1  ──────────────────────────────────────────────────────────
  Epic 1: Image Hotfix (S2-001 → S2-002)        ← do this FIRST, day 1
  Epic 2: Gallery Infrastructure (S2-003 → S2-005)

Week 2  ──────────────────────────────────────────────────────────
  Epic 3: Artwork Detail + Series Pages (S2-006 → S2-009)
  Epic 4: Tests + Polish (S2-010 → S2-012)
                    ↓
          ✅ SPRINT END: Full gallery browsing experience at localhost:3000
                         Hero + all home page images loading correctly
                         Gallery → Artwork → Series navigation working
```

---

## Epic 1 — Sprint 1 Image Hotfix

> **Do this first.** The home page must be visually complete before any new work begins.

### S2-001 — Allow External Image Domains

**Priority:** P0 — blocks all image rendering
**File:** `next.config.ts`

Add `picsum.photos` to the allowed `remotePatterns` in Next.js image config so `next/image` can serve external URLs.

**Acceptance Criteria:**

- [ ] `next.config.ts` `images.remotePatterns` includes `picsum.photos` (hostname only — no wildcard protocols)
- [ ] `npm run build` passes with no image-domain warnings
- [ ] Browser network tab shows 200 for all image requests (no 404s)

---

### S2-002 — Replace All Placeholder Image Paths with Picsum Photos URLs

**Priority:** P0
**Files to update:**

| File                                       | Old value                              | New value (example)                                 |
| ------------------------------------------ | -------------------------------------- | --------------------------------------------------- |
| `src/data/artworks.ts`                     | `/artworks/placeholder-1.jpg`          | `https://picsum.photos/seed/coastal-light/800/1000` |
| `src/data/artworks.ts`                     | `/artworks/placeholder-2.jpg`          | `https://picsum.photos/seed/still-life/500/700`     |
| `src/data/artworks.ts`                     | `/artworks/placeholder-3.jpg`          | `https://picsum.photos/seed/forest-iii/1200/900`    |
| `src/components/sections/Hero.tsx`         | `/hero-placeholder.jpg` (default prop) | `https://picsum.photos/seed/saga-hero/1920/1080`    |
| `src/components/sections/AboutTeaser.tsx`  | any local placeholder path             | `https://picsum.photos/seed/saga-about/800/1000`    |
| `src/components/sections/StudioTeaser.tsx` | any local placeholder path             | `https://picsum.photos/seed/saga-studio/1600/900`   |

**Why Picsum (seed-based URLs):**

- `https://picsum.photos/seed/[seed]/[width]/[height]` — deterministic: same seed always returns the same image
- High-resolution, beautiful photography — not grey boxes
- Zero download or storage required — swapped out once Sanity images are live
- Free, no API key, no rate limit for dev/staging use

**Acceptance Criteria:**

- [ ] All 6+ image sources updated to Picsum seed URLs
- [ ] Each image uses a unique, descriptive seed string (e.g. `saga-hero`, `coastal-light`, `forest-iii`) so images are visually distinct
- [ ] `blurDataURL` values in `artworks.ts` retained (they still work as load placeholders)
- [ ] Home page loads with all images visible at `localhost:3000` — zero 404s in the network tab
- [ ] `next/image` `sizes` and `fill` props unchanged — only the `src` changes

---

## Epic 2 — Gallery Infrastructure

### S2-003 — Expand Artwork Data + Type

**Priority:** P0 — gallery pages need enough data to be meaningful
**Files:** `src/data/artworks.ts`, `src/types/artwork.ts`

Expand the seed dataset from 3 to **12 artworks** across 3 series, covering the full `Artwork` type. This data will be replaced by Sanity queries in Phase 4 — keep the shape identical to what GROQ will return.

**`Artwork` type additions (if not already present):**

```ts
export interface Artwork {
  id: string
  slug: string
  title: string
  year: number
  medium: string
  dimensions: string
  description?: string // short paragraph for detail page
  image: ArtworkImage
  series?: string // series slug
  seriesTitle?: string // human-readable series name
  available: boolean
  price?: number // optional, Phase 7
  tags?: string[] // medium, subject, mood — used for filtering
}
```

**12 seed artworks — 3 per series:**

| Series                            | Artworks                                                             |
| --------------------------------- | -------------------------------------------------------------------- |
| `coastal` — "Coastal Light"       | Coastal Light I, II, III                                             |
| `forest` — "Forest Interiors"     | Forest Interior I, II, III                                           |
| `still-life` — "Domestic Studies" | Still Life with Vessel, Still Life with Pears, Still Life with Cloth |
| _(ungrouped)_                     | Morning Light, Dusk Study, Evening Fog, Autumn Path                  |

All images: Picsum seed URLs, matched to the artwork's subject matter.

**Acceptance Criteria:**

- [ ] 12 artworks in `featuredArtworks` (or separate `allArtworks` export)
- [ ] `Artwork` type strictly matches the shape above — no `any`
- [ ] Mixed availability: at least 4 `available: true`, at least 4 `available: false`
- [ ] All artworks have `description` (2–3 sentences of placeholder copy)
- [ ] Type-check passes: `npm run type-check` exits 0

---

### S2-004 — Gallery Index Page

**Priority:** P0
**Route:** `/gallery`
**Files:**

- `src/app/(site)/gallery/page.tsx`
- `src/components/gallery/ArtworkCard.tsx`
- `src/components/gallery/GalleryGrid.tsx`
- `src/components/gallery/GalleryFilters.tsx`

**Layout:**

- Page heading: "Gallery" (serif h1) + short descriptor
- Filter bar: Medium | Series | Availability — client component, URL-search-param driven (`?medium=oil&series=coastal`) so filtered views are shareable/bookmarkable
- Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Each `ArtworkCard`: image (consistent 3:4 aspect ratio) + title + year + medium + availability badge

**`ArtworkCard` hover state:**

- Subtle scale (`scale-[1.02]`) on the image
- Title + medium slide up from bottom with `opacity: 0 → 1`
- Availability badge: "Available" (accent bronze) / "Sold" (muted grey)
- Respects `prefers-reduced-motion`

**Acceptance Criteria:**

- [ ] Gallery page renders all artworks from `allArtworks` data
- [ ] Filter by medium reduces the visible set (client-side, no page reload)
- [ ] Filter by series reduces the visible set
- [ ] Filter by availability shows only available / only sold / all
- [ ] Active filters reflected in URL query params — direct URL loads with filters applied
- [ ] "Clear filters" button visible when any filter is active
- [ ] Grid is responsive at all four breakpoints (375 / 768 / 1280 / 1440)
- [ ] All artwork images use `next/image` with explicit `sizes` prop
- [ ] Each card links to `/gallery/[slug]`
- [ ] Page has correct `<title>` and `<meta description>` via Next.js `metadata` export
- [ ] `<h1>` present, correct heading hierarchy

---

### S2-005 — Gallery Page Loading State + Empty State

**Priority:** P1
**File:** `src/components/gallery/GalleryGrid.tsx`

**Acceptance Criteria:**

- [ ] Skeleton loader cards shown while data is loading (CSS animation, no JS library)
- [ ] Empty state message when no artworks match the active filters — "No works match these filters" + "Clear filters" CTA
- [ ] Skeleton uses the same 3:4 aspect ratio as real cards — no layout shift when content loads

---

## Epic 3 — Artwork Detail + Series Pages

### S2-006 — Individual Artwork Detail Page

**Priority:** P0
**Route:** `/gallery/[slug]`
**Files:**

- `src/app/(site)/gallery/[slug]/page.tsx`
- `src/components/gallery/ArtworkDetail.tsx`
- `src/components/gallery/RelatedArtworks.tsx`

**Layout (desktop: 60/40 split — image left, details right):**

**Left — Image panel:**

- Large artwork image, preserving its natural aspect ratio
- Subtle zoom-on-hover (CSS `scale`, not JS)
- Click to open lightbox (see S2-007)

**Right — Details panel:**

- Title (serif h1), year, medium, dimensions
- Description paragraph
- Series link → `/series/[slug]` (if artwork belongs to a series)
- Availability badge
- "Inquire" CTA button (links to `/contact` with `?artwork=[slug]` prefilled — Phase 3 will wire the form)
- "← Back to Gallery" link

**Below the fold — Related artworks:**

- 3 artworks from the same series (or same medium if no series)
- Uses `ArtworkCard` component (reuse from S2-004)

**`generateStaticParams`:**

- Export `generateStaticParams` returning all artwork slugs — static generation at build time

**Acceptance Criteria:**

- [ ] `/gallery/coastal-light-i` renders correctly with all fields populated
- [ ] `generateStaticParams` exports all 12 slugs — `npm run build` pre-renders all detail pages
- [ ] Navigating to an unknown slug returns a proper Next.js 404 (use `notFound()`)
- [ ] Image uses `next/image` with `priority` (it is LCP on this page)
- [ ] Desktop: 60/40 split layout; Mobile: image stacked above details
- [ ] Related artworks section shows 3 cards
- [ ] "Inquire" button has correct `href` with `?artwork=` param
- [ ] Page `<title>` is `"[Artwork Title] — Sangeeth"` via `generateMetadata`
- [ ] `<meta name="description">` populated from artwork description
- [ ] Correct heading hierarchy: `<h1>` for artwork title, `<h2>` for "Related Works"

---

### S2-007 — Image Lightbox

**Priority:** P1
**File:** `src/components/gallery/Lightbox.tsx`
**Package:** No new package — implement with Framer Motion (`AnimatePresence`) + a portal

**Behaviour:**

- Click artwork image → full-screen overlay with the image at max readable size
- `Escape` key closes; clicking outside the image closes; close `×` button
- Previous / Next navigation between artworks in the same series or grid
- Focus trap while open (keyboard accessibility)
- `aria-modal="true"`, `role="dialog"`, `aria-label="Artwork lightbox"`
- Body scroll locked while open (`overflow: hidden` on `<body>`)

**Acceptance Criteria:**

- [ ] Opens on image click on the detail page
- [ ] Closes on Escape, backdrop click, and × button
- [ ] Prev/next arrows navigate within the series
- [ ] Focus is trapped inside the modal (Tab cycles only within)
- [ ] Focus returns to the triggering element on close
- [ ] `prefers-reduced-motion`: no open/close animation, just opacity
- [ ] No scroll beneath the overlay while open
- [ ] axe: zero violations with lightbox open

---

### S2-008 — Series / Collection Landing Pages

**Priority:** P1
**Route:** `/series/[slug]`
**Files:**

- `src/app/(site)/series/page.tsx` — series index
- `src/app/(site)/series/[slug]/page.tsx` — individual series
- `src/data/series.ts` — series metadata
- `src/types/series.ts` — `Series` type
- `src/components/sections/SeriesHero.tsx`

**`Series` type:**

```ts
export interface Series {
  slug: string
  title: string
  description: string // 2–3 sentences
  coverImage: ArtworkImage // same shape as Artwork.image
  year: string // e.g. "2023–2024" or "2024"
}
```

**Series index page (`/series`):**

- Grid of series cards — cover image + title + year + artwork count
- Links to each series landing page

**Series landing page (`/series/[slug]`):**

- Full-width series hero image + title + description
- Grid of all artworks in that series (reuses `GalleryGrid`)
- "← All Series" back link

**`generateStaticParams` on both pages.**

**Acceptance Criteria:**

- [ ] `/series` lists all 3 series from seed data
- [ ] `/series/coastal` renders with its 3 artworks
- [ ] `generateStaticParams` on `[slug]` page — static at build time
- [ ] Unknown series slug returns 404 via `notFound()`
- [ ] Series cover image uses `next/image` with `priority`
- [ ] Artwork count badge on series index cards is accurate
- [ ] `generateMetadata` provides correct `<title>` and description per series

---

### S2-009 — Navigation Updates

**Priority:** P1
**Files:** `src/components/layout/Nav.tsx`, `src/components/layout/MobileMenu.tsx`

Sprint 1 nav had placeholder links — now wire them to real routes.

**Nav link updates:**

| Label       | `href`         | Status                      |
| ----------- | -------------- | --------------------------- |
| Home        | `/`            | ✅ exists                   |
| Gallery     | `/gallery`     | ✅ new this sprint          |
| Series      | `/series`      | ✅ new this sprint          |
| About       | `/about`       | placeholder — keep, Phase 3 |
| Exhibitions | `/exhibitions` | placeholder — keep, Phase 3 |
| Contact     | `/contact`     | placeholder — keep, Phase 3 |

**Acceptance Criteria:**

- [ ] Gallery and Series links navigate correctly — no 404
- [ ] `aria-current="page"` still applied correctly using `usePathname`
- [ ] Mobile menu links updated to match
- [ ] About / Exhibitions / Contact remain as `<Link>` but their pages show a "Coming soon" stub (not a 404)

---

## Epic 4 — Tests + Polish

### S2-010 — Unit Tests for Gallery Components

**Priority:** P0
**Files:** `src/components/gallery/__tests__/`

**Required tests:**

- [ ] `ArtworkCard` renders title, year, medium and availability badge
- [ ] `ArtworkCard` image has non-empty `alt` text
- [ ] `GalleryFilters` calls `onFilterChange` with correct args when a filter is selected
- [ ] `GalleryFilters` "Clear filters" button resets all filters
- [ ] `GalleryGrid` renders the correct number of cards given an array
- [ ] `GalleryGrid` renders empty state when given an empty array
- [ ] `ArtworkDetail` renders title, medium, dimensions from an `Artwork` fixture

---

### S2-011 — Playwright E2E Updates

**Priority:** P0
**File:** `tests/e2e/gallery.spec.ts`

**New E2E tests:**

- [ ] `/gallery` loads with status 200 and `<h1>` present
- [ ] At least 3 artwork cards are visible on initial load
- [ ] Filtering by "Coastal" series reduces the visible card count
- [ ] Clicking an artwork card navigates to `/gallery/[slug]`
- [ ] Artwork detail page: title `<h1>` is present and non-empty
- [ ] Artwork detail page: "Inquire" button is visible
- [ ] Artwork detail page: "Back to Gallery" link returns to `/gallery`
- [ ] `/series` loads with status 200 and series cards visible
- [ ] Clicking a series card navigates to `/series/[slug]`
- [ ] Lightbox: clicking artwork image opens the lightbox overlay
- [ ] Lightbox: pressing Escape closes the lightbox
- [ ] All images on gallery page have non-empty `alt` attributes

---

### S2-012 — axe Accessibility Audit: New Pages

**Priority:** P0

Add axe checks to the Playwright suite for all new pages:

- [ ] `/gallery` — zero critical/serious violations
- [ ] `/gallery/coastal-light-i` — zero critical/serious violations
- [ ] `/series` — zero critical/serious violations
- [ ] `/series/coastal` — zero critical/serious violations
- [ ] Lightbox open state — zero critical/serious violations

---

## Definition of Done

Identical to Sprint 1 DoD, plus:

- [ ] No new `any` types without a `// TODO` comment and an issue number
- [ ] All new routes have `generateMetadata` with title + description
- [ ] All new routes with dynamic params have `generateStaticParams`
- [ ] Zero 404 errors in the browser network tab (images and routes)
- [ ] `notFound()` called for all unknown dynamic slugs
- [ ] No direct `<img>` tags — `next/image` only

---

## Sprint 2 Completion Criteria

- [ ] Zero image 404s on home page (Sprint 1 feedback fixed)
- [ ] `/gallery` fully functional with 12 artworks and working filters
- [ ] `/gallery/[slug]` renders for all 12 artworks, static at build time
- [ ] `/series` and `/series/[slug]` working for all 3 series
- [ ] Lightbox opens, navigates, and closes correctly
- [ ] All unit tests passing: `npm run test:ci`
- [ ] All E2E tests passing (home + gallery suites)
- [ ] axe: zero violations on all new pages
- [ ] `npm run build` clean — all static params generated, no type errors
- [ ] `npm run lint` exits 0

---

## ✅ Sprint End: Live Demo

**Triggered only after all completion criteria above are checked off.**

```bash
npm run dev         # http://localhost:3000
npm run build       # clean build — verify static generation output
npm run lint        # exits 0
npm run type-check  # exits 0
npm run test:ci     # all unit tests pass
```

**What the demo shows at `localhost:3000`:**

- [ ] Home page — all images loading (zero 404s) including Hero, FeaturedWorks cards, About portrait, Studio image
- [ ] Hero section — high-quality landscape photograph (Picsum seed), artwork title overlay, "View Gallery" CTA
- [ ] Featured Works — 3 artwork cards with real photographs, hover states working
- [ ] Click "View Gallery" → `/gallery` page loads
- [ ] Gallery index — 12 artwork cards in responsive grid (1/2/3 column)
- [ ] Gallery filter bar — select "Coastal" series → grid narrows to 3 artworks; clear filter → all 12 return
- [ ] Filter state reflected in URL (`?series=coastal`) — paste URL in new tab, filter pre-applied
- [ ] Click any artwork card → `/gallery/[slug]` detail page
- [ ] Artwork detail — large image (left), title/medium/dimensions/description (right), Related Works below
- [ ] Click artwork image → lightbox opens full-screen; Escape / × closes it
- [ ] Click "Back to Gallery" → returns to `/gallery`
- [ ] Click series name on detail page → `/series/coastal`
- [ ] Series page — hero image, description, all 3 artworks in that series
- [ ] Navigate to `/series` → series index with 3 series cards
- [ ] Nav "Gallery" and "Series" links active and correct
- [ ] About / Exhibitions / Contact nav links show a "Coming soon" stub (no 404)
- [ ] Fully responsive at 375px / 768px / 1280px / 1440px — zero overflow
- [ ] `prefers-reduced-motion` disables all gallery animations
