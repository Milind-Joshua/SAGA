# SAGA — Development Planning

Internal roadmap, architecture decisions, and phase breakdown for the SAGA project.

---

## Tech Stack

### Core

| Layer      | Choice                      | Reason                                               |
| ---------- | --------------------------- | ---------------------------------------------------- |
| Framework  | **Next.js 15** (App Router) | SSR/SSG/ISR, image optimization, edge-ready, SEO     |
| Language   | **TypeScript**              | Type safety across the full stack                    |
| Styling    | **Tailwind CSS v4**         | Design tokens, utility-first, minimal runtime        |
| Animations | **Framer Motion**           | Squarespace-quality page transitions, scroll effects |
| Components | **shadcn/ui**               | Accessible, composable, unstyled base components     |

### Content

| Layer     | Choice                                 | Reason                                                                   |
| --------- | -------------------------------------- | ------------------------------------------------------------------------ |
| CMS       | **Sanity.io**                          | Flexible schemas for artworks/series, real-time, built-in image pipeline |
| Image CDN | **Sanity Image Pipeline + Next/Image** | WebP/AVIF conversion, blur-up placeholders, lazy loading                 |

### Deployment & Infrastructure

| Layer     | Choice                                | Reason                                                                   |
| --------- | ------------------------------------- | ------------------------------------------------------------------------ |
| Hosting   | **Vercel**                            | Native Next.js platform, global edge CDN, preview deployments per branch |
| Analytics | **Vercel Analytics + Speed Insights** | Core Web Vitals, real-user metrics                                       |

### E-commerce (Phase 7+, pre-architected)

| Layer    | Choice                           | Reason                                              |
| -------- | -------------------------------- | --------------------------------------------------- |
| Payments | **Stripe**                       | Checkout + Payment Intents + Webhooks               |
| Database | **Neon** (serverless PostgreSQL) | Scales to zero, Vercel-native integration           |
| ORM      | **Prisma**                       | Type-safe DB access, schema migrations              |
| Auth     | **Auth.js v5**                   | Customer accounts, session management               |
| Email    | **Resend + React Email**         | Transactional emails (contact, order confirmations) |

### Developer Experience

| Tool                       | Purpose                                     |
| -------------------------- | ------------------------------------------- |
| ESLint + Prettier          | Code quality and formatting                 |
| Husky + lint-staged        | Pre-commit hooks                            |
| GitHub Actions             | CI/CD — lint, type-check, build on every PR |
| Vercel Preview Deployments | Visual review per branch                    |

---

## UI Design Direction

Inspired by Squarespace's best gallery templates (Paloma, Brine, Avenue):

- **Layout:** Editorial, generous whitespace, content-first
- **Typography:** Serif for headings (refined, art-world feel) + sans-serif for body
- **Color:** Monochromatic neutral base (off-white/charcoal) + one accent
- **Images:** Full-bleed, consistent aspect ratios in grids, no hard crop on hero
- **Motion:** Subtle fade-in on scroll, smooth page-level transitions (300–500ms), elegant hover states
- **Navigation:** Minimal top nav, full-screen mobile menu overlay

---

## Branch Strategy

```
main                    ← production-ready, deployed to production
feature/[phase]-[name]  ← feature work per phase
hotfix/[description]    ← urgent production fixes
```

All PRs require passing CI (lint + type-check + build) before merge.

---

## Project Structure (target)

```
saga/
├── app/                    # Next.js App Router pages
│   ├── (site)/             # Public-facing routes
│   │   ├── page.tsx        # Home
│   │   ├── gallery/        # Gallery index + artwork pages
│   │   ├── series/         # Series/collection pages
│   │   ├── about/          # About & Atelier
│   │   ├── exhibitions/    # Exhibitions & events
│   │   └── contact/        # Contact
│   ├── studio/             # Sanity Studio (Phase 4)
│   └── layout.tsx          # Root layout with transitions
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── layout/             # Header, Footer, Nav
│   ├── gallery/            # Artwork cards, grids, lightbox
│   └── sections/           # Home page sections
├── lib/
│   ├── sanity/             # Sanity client, queries, image builder
│   └── stripe/             # Stripe helpers (Phase 7)
├── sanity/
│   └── schemas/            # Sanity content schemas
├── public/                 # Static assets
└── styles/                 # Global styles, design tokens
```

---

## Phases

### Phase 0 — Foundation & Setup

> **Goal:** Production-grade project skeleton before any UI work.

- [x] Git repository initialized
- [ ] Next.js 15 + TypeScript + Tailwind CSS v4 project scaffold
- [ ] ESLint, Prettier, Husky, lint-staged configured
- [ ] GitHub Actions CI pipeline (lint → type-check → build)
- [ ] Vercel project linked with preview deployments enabled
- [ ] Design token system (colors, typography, spacing, breakpoints)
- [ ] Base layout: Header, Footer, Navigation with mobile menu
- [ ] Smooth page transition wrapper (Framer Motion)
- [ ] `.env.example` with all required variables documented

---

### Phase 1 — Home Page

> **Goal:** A stunning first impression that establishes the brand.
> **Branch:** `feature/home-page-phase-1`

- [ ] Hero section — full-bleed artwork with overlay title + tagline
- [ ] Featured works section — curated grid/carousel
- [ ] About teaser — brief introduction with CTA
- [ ] Studio/Atelier teaser section
- [ ] Scroll-triggered animations (Framer Motion)
- [ ] Mobile-first responsive layout
- [ ] Performance baseline (Lighthouse target: 95+)

---

### Phase 2 — Gallery & Artwork Pages

> **Goal:** The core browsing experience — every piece gets its moment.

- [ ] Gallery index page with masonry/grid layout
- [ ] Filter and sort by: medium, size, series, availability
- [ ] Individual artwork detail page
  - Full-resolution image with zoom/lightbox
  - Title, medium, dimensions, year, description
  - Related artworks
- [ ] Series / Collection landing pages
- [ ] URL structure: `/gallery`, `/gallery/[slug]`, `/series/[slug]`

---

### Phase 3 — Supporting Pages

> **Goal:** Complete the portfolio experience.

- [ ] About / Atelier page — artist bio, process, studio images
- [ ] Exhibitions & Events page
- [ ] Contact page with form (powered by Resend)
- [ ] Custom 404 and 500 error pages
- [ ] Privacy Policy page (GDPR-ready)

---

### Phase 4 — CMS Integration (Sanity.io)

> **Goal:** All content manageable without code changes.

- [ ] Sanity project setup and schema design
  - `artwork` — title, slug, images, medium, dimensions, series, year, availability
  - `series` — title, description, artworks
  - `exhibition` — title, venue, dates, description
  - `siteSettings` — global metadata, social links, featured works
  - `about` — bio, studio images, CV
- [ ] GROQ queries integrated into Next.js pages (ISR + on-demand revalidation)
- [ ] Sanity Studio deployed at `/studio`
- [ ] Live preview for content editors
- [ ] Image hot-spot and crop support

---

### Phase 5 — SEO & Performance

> **Goal:** Discoverable, fast, and shareable globally.

- [ ] Next.js Metadata API — per-page titles, descriptions, OG tags
- [ ] Dynamic Open Graph images via `@vercel/og`
- [ ] JSON-LD structured data for artworks (`VisualArtwork` schema)
- [ ] `sitemap.xml` auto-generated from CMS content
- [ ] `robots.txt` configured
- [ ] Core Web Vitals audit — LCP, CLS, INP targets met
- [ ] Font optimization via `next/font`

---

### Phase 6 — Production Launch

> **Goal:** Live, monitored, and stable.

- [ ] Production Vercel deployment with custom domain
- [ ] Environment variables configured in Vercel dashboard
- [ ] Vercel Analytics and Speed Insights enabled
- [ ] Error monitoring (Sentry or Vercel built-in)
- [ ] Uptime monitoring configured
- [ ] DNS and CDN cache headers tuned
- [ ] Launch checklist signed off

---

### Phase 7 — E-commerce Foundation _(Future)_

> **Goal:** Enable art sales without disrupting the portfolio experience.

- [ ] `availability` and `price` fields added to Sanity artwork schema
- [ ] Shopping cart — React Context + localStorage persistence
- [ ] Stripe product/price catalog integration
- [ ] Checkout flow via Stripe Checkout
- [ ] Stripe Webhooks for order status updates
- [ ] Order confirmation emails via Resend
- [ ] "Inquire" flow for commissions/large works (email-based)

---

### Phase 8 — E-commerce Advanced _(Future)_

> **Goal:** Full sales platform with customer experience.

- [ ] Customer accounts with Auth.js v5
- [ ] Order history dashboard
- [ ] Wishlist / saved artworks
- [ ] Neon PostgreSQL + Prisma for orders and inventory
- [ ] Stripe Tax for automatic tax calculation
- [ ] International shipping rate integration
- [ ] Print-on-demand integration (optional — e.g., Printful)
- [ ] Discount codes and promotions via Stripe
