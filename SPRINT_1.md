# Sprint 1 — Foundation + Home Page

**Duration:** 2 weeks
**Branch:** `feature/home-page-phase-1`
**Goal:** Production-grade scaffold running locally + stunning home page deployed to Vercel preview
**Covers:** Phase 0 (Foundation) + Phase 1 (Home Page) from PLANNING.md

---

## Sprint Order of Operations

```
Week 1  ──────────────────────────────────────────────────────────
  Epic 1: Foundation (S1-001 → S1-008 + S1-019 → S1-021)
  Epic 3: Testing Infrastructure (parallel with Epic 1)

Week 2  ──────────────────────────────────────────────────────────
  Epic 2: Home Page sections (S1-009 → S1-015)
                    ↓
          ✅ SPRINT END: Live local demo at http://localhost:3000
                         + Vercel preview URL with full home page
```

---

## Epic 1 — Phase 0: Foundation

> **Exit criteria before moving to Epic 2:** Zero lint/type errors, CI pipeline green, Vercel preview deployments confirmed working.

### S1-001 — Scaffold Next.js 15 + TypeScript + Tailwind CSS v4

**Priority:** P0 — blocks everything
**Command:**

```bash
npx create-next-app@latest saga \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

**Acceptance Criteria:**

- [ ] `tsconfig.json` has `"strict": true`
- [ ] App Router structure matches target in PLANNING.md
- [ ] `npm run dev` starts without errors
- [ ] `npm run build` produces a clean build

**Security:**

- [ ] `.gitignore` covers `.env*.local`, `*.pem`, `.vercel`
- [ ] No secrets in initial commit

---

### S1-002 — ESLint + Prettier + Husky + lint-staged

**Priority:** P0 — quality gates must be in place before any real code
**Packages:**

```bash
npm install -D prettier prettier-plugin-tailwindcss \
  eslint-config-prettier \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  husky lint-staged
```

**Config targets:**

- `eslint.config.mjs` — extends `next/core-web-vitals`, `@typescript-eslint/recommended`, disables `@typescript-eslint/no-explicit-any` as warning not error (escalate later)
- `.prettierrc` — `semi: false`, `singleQuote: true`, `tabWidth: 2`, Tailwind class sorting
- `.husky/pre-commit` — runs lint-staged
- `lint-staged` in `package.json` — `eslint --fix` + `prettier --write` on staged `*.ts *.tsx`

**Acceptance Criteria:**

- [ ] `npm run lint` exits 0 on clean code
- [ ] Committing a file with a lint error is blocked by the pre-commit hook
- [ ] Prettier formats Tailwind classes in correct order

---

### S1-003 — GitHub Actions CI Pipeline

**Priority:** P0
**File:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - run: npm audit --audit-level=high
```

**package.json additions:**

```json
"type-check": "tsc --noEmit"
```

**Acceptance Criteria:**

- [ ] CI runs on every push to `main` and every PR
- [ ] `npm audit` step fails CI on `high` or `critical` vulnerabilities
- [ ] Branch protection on `main` requires CI pass before merge
- [ ] No merge to `main` without green CI

---

### S1-004 — Vercel Project + Preview Deployments

**Priority:** P0
**Steps:**

1. `npx vercel link` — connect repo to Vercel project
2. Set root directory to repo root
3. Enable "Preview Deployments" for all branches
4. Add `NEXT_PUBLIC_SITE_URL` env var in Vercel dashboard (production + preview)

**Acceptance Criteria:**

- [ ] Push to any branch creates a unique Vercel preview URL
- [ ] Production deploys only triggered from `main`
- [ ] Vercel build matches local `npm run build` output

---

### S1-005 — Design Token System

**Priority:** P1
**File:** `src/styles/tokens.css`

Design tokens as Tailwind v4 CSS custom properties:

```css
@layer base {
  :root {
    /* Color */
    --color-background: #fafaf8;
    --color-foreground: #1a1a1a;
    --color-muted: #6b6b6b;
    --color-border: #e5e5e0;
    --color-accent: #8b7355; /* warm bronze — single accent */

    /* Typography */
    --font-serif: var(--font-cormorant), Georgia, serif;
    --font-sans: var(--font-inter), system-ui, sans-serif;

    /* Spacing scale */
    --spacing-section: 6rem;
    --spacing-section-sm: 3rem;

    /* Transitions */
    --transition-base: 300ms ease;
    --transition-page: 500ms ease;
  }
}
```

**Acceptance Criteria:**

- [ ] All tokens accessible in Tailwind classes via CSS variable extension
- [ ] No raw hex colors anywhere in component files — use token references only
- [ ] Dark mode hook ready (swap `:root` vars under `.dark`) — not implemented yet, just architected

---

### S1-006 — Base Layout: Header, Footer, Navigation

**Priority:** P1
**Files:**

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Nav.tsx`
- `src/components/layout/MobileMenu.tsx`
- `src/app/(site)/layout.tsx`

**Acceptance Criteria:**

- [ ] Semantic HTML: `<header>`, `<nav>`, `<main>`, `<footer>` landmarks
- [ ] Nav links: Home / Gallery / Series / About / Exhibitions / Contact
- [ ] Mobile menu: full-screen overlay, triggered by hamburger, closes on link click or Escape key
- [ ] Focus trap inside open mobile menu (keyboard accessibility)
- [ ] Skip-to-content link as first focusable element in DOM
- [ ] `aria-current="page"` on active nav link
- [ ] No layout shift on scroll (fixed header uses `backdrop-blur`, not JS height measurement)

**Security:**

- [ ] No `dangerouslySetInnerHTML` in layout components
- [ ] External links in footer use `rel="noopener noreferrer"`

---

### S1-007 — Framer Motion Page Transition Wrapper

**Priority:** P1
**Package:** `npm install framer-motion`
**File:** `src/components/layout/PageTransition.tsx`

```tsx
// Respects prefers-reduced-motion — no motion if user has requested it
const variants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}
```

**Acceptance Criteria:**

- [ ] Page transitions are 300–500ms fade + subtle vertical shift
- [ ] `@media (prefers-reduced-motion: reduce)` disables all animation (opacity only, instant)
- [ ] No hydration mismatch warnings in console
- [ ] Transition does not block interaction (pointer-events not disabled after animation)

---

### S1-008 — `.env.example` + Runtime Config Guard

**Priority:** P0
**Files:** `.env.example`, `src/lib/config.ts`

`.env.example`:

```bash
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity (Phase 4)
# NEXT_PUBLIC_SANITY_PROJECT_ID=
# NEXT_PUBLIC_SANITY_DATASET=production
# SANITY_API_TOKEN=

# Stripe (Phase 7)
# STRIPE_SECRET_KEY=
# STRIPE_WEBHOOK_SECRET=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend (Phase 3)
# RESEND_API_KEY=
```

`src/lib/config.ts` — validates required vars at startup:

```ts
function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

export const config = {
  siteUrl: requireEnv('NEXT_PUBLIC_SITE_URL'),
} as const
```

**Acceptance Criteria:**

- [ ] `.env.example` committed; `.env.local` in `.gitignore`
- [ ] App throws a clear error at startup if a required var is missing — no silent `undefined` bugs
- [ ] Future vars are pre-documented with comments explaining purpose and where to get the value

---

---

## Epic 2 — Phase 1: Home Page

> **Prerequisite:** Epic 1 checkpoint passed.

### S1-009 — Hero Section

**Priority:** P0
**File:** `src/components/sections/Hero.tsx`

**Acceptance Criteria:**

- [ ] Full-bleed artwork image (static asset for now, CMS-ready prop interface)
- [ ] Overlay with artist name + tagline + CTA button
- [ ] Hero image uses `next/image` with `priority` prop (LCP optimization)
- [ ] Meaningful `alt` text on image — never empty for decorative hero
- [ ] CTA button navigates to `/gallery`
- [ ] Text readable over image at all viewport widths (overlay contrast ratio ≥ 4.5:1)
- [ ] No cumulative layout shift (image dimensions specified)

---

### S1-010 — Featured Works Section

**Priority:** P0
**File:** `src/components/sections/FeaturedWorks.tsx`

**Acceptance Criteria:**

- [ ] 3–6 artwork cards in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- [ ] Static data typed with a shared `Artwork` interface (CMS-ready shape)
- [ ] All images use `next/image` with `blurDataURL` placeholder
- [ ] Consistent aspect ratios across cards (no layout thrash on load)
- [ ] Each card links to `/gallery/[slug]` (placeholder route for now)
- [ ] Hover state: subtle scale + title reveal (respects `prefers-reduced-motion`)
- [ ] Section heading uses serif token; sub-copy uses sans-serif token

---

### S1-011 — About Teaser Section

**Priority:** P1
**File:** `src/components/sections/AboutTeaser.tsx`

**Acceptance Criteria:**

- [ ] Short bio paragraph + portrait image (or studio image)
- [ ] CTA button linking to `/about`
- [ ] Image and text side-by-side on desktop, stacked on mobile
- [ ] Correct heading hierarchy (no skipped levels)

---

### S1-012 — Studio / Atelier Teaser Section

**Priority:** P1
**File:** `src/components/sections/StudioTeaser.tsx`

**Acceptance Criteria:**

- [ ] Full-width or split-layout section with studio image
- [ ] Brief copy describing the atelier + CTA to `/studio` or `/about#atelier`
- [ ] Image uses `next/image` with lazy loading (below fold — no `priority`)

---

### S1-013 — Scroll-Triggered Animations

**Priority:** P1
**Hook:** Framer Motion `useInView` / `whileInView`

**Acceptance Criteria:**

- [ ] Each section fades in as it enters the viewport (`once: true`)
- [ ] Stagger applied to grid items in Featured Works
- [ ] All animations disabled when `prefers-reduced-motion` is set
- [ ] No animation blocks paint or causes layout shift
- [ ] No animation runs on server (SSR-safe guards in place)

---

### S1-014 — Mobile-First Responsive Layout

**Priority:** P0 — tested across all breakpoints

| Breakpoint | Width  | Must verify                               |
| ---------- | ------ | ----------------------------------------- |
| Mobile     | 375px  | Single column, readable text, no overflow |
| Tablet     | 768px  | 2-col grid, nav visible                   |
| Desktop    | 1280px | Full layout, 3-col grid                   |
| Wide       | 1440px | Max-width container, no stretching        |

**Acceptance Criteria:**

- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets ≥ 44×44px on mobile (WCAG 2.5.5)
- [ ] Images never overflow their containers
- [ ] Font sizes never below 16px on body copy

---

### S1-015 — Lighthouse Performance Baseline

**Priority:** P0
**Tool:** Lighthouse CI on Vercel preview URL

**Targets:**

| Category       | Target |
| -------------- | ------ |
| Performance    | ≥ 95   |
| Accessibility  | 100    |
| Best Practices | 100    |
| SEO            | ≥ 95   |

**Checklist:**

- [ ] LCP image (`<Hero>`) uses `priority` + proper sizing
- [ ] No render-blocking resources
- [ ] Fonts loaded via `next/font` (no FOUT)
- [ ] All images have explicit `width` + `height` or `fill` layout
- [ ] Zero accessibility violations in axe audit
- [ ] `<html lang="en">` set in root layout
- [ ] `<meta name="description">` populated in root layout metadata

---

## Epic 3 — Testing Infrastructure

> Set up in Week 1 alongside Epic 1. All tests must pass before any Epic 2 PR is merged.

### S1-016 — Vitest + React Testing Library

**Packages:**

```bash
npm install -D vitest @vitejs/plugin-react \
  @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom jsdom
```

**Config:** `vitest.config.ts` with jsdom environment
**Script:** `"test": "vitest"`, `"test:ci": "vitest run"`

**Minimum test coverage required before Sprint 1 close:**

- [ ] `<Header>` renders nav links
- [ ] `<MobileMenu>` opens/closes on trigger; closes on Escape
- [ ] `<Hero>` renders with required props; alt text present
- [ ] `<FeaturedWorks>` renders correct number of cards from data
- [ ] `config.ts` throws when a required env var is missing

---

### S1-017 — Playwright E2E

**Package:** `npm install -D @playwright/test`
**Config:** `playwright.config.ts` targeting `localhost:3000`

**Smoke suite (`tests/e2e/home.spec.ts`):**

- [ ] Home page loads with status 200
- [ ] `<h1>` is present and non-empty
- [ ] Nav links are all visible and have valid `href`
- [ ] Mobile menu opens and closes correctly at 375px viewport
- [ ] No unhandled console errors on load
- [ ] All images have non-empty `alt` attributes

**CI integration:**

- [ ] E2E suite runs against Vercel preview URL in CI (using `PLAYWRIGHT_BASE_URL` env var)
- [ ] E2E job runs after build job in `ci.yml`

---

### S1-018 — axe-core Accessibility Integration

**Package:** `npm install -D @axe-core/playwright`

**Integration:** Added to Playwright home page spec

```ts
import AxeBuilder from '@axe-core/playwright'

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

**Acceptance Criteria:**

- [ ] Zero critical or serious axe violations on home page
- [ ] axe test runs in CI and fails the build if violations are found
- [ ] Results reported as CI artifact on failure

---

## Epic 4 — Security Baseline

> Implemented in Week 1. Non-negotiable before any public preview URL is shared.

### S1-019 — HTTP Security Headers

**File:** `next.config.ts`

```ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // tighten after Phase 4
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]
```

**Acceptance Criteria:**

- [ ] All headers present on every response (verified via `curl -I`)
- [ ] `X-Frame-Options: DENY` prevents clickjacking
- [ ] CSP blocks inline scripts not explicitly allowed
- [ ] Headers scored A or A+ on [securityheaders.com](https://securityheaders.com)

---

### S1-020 — Dependency Audit in CI

**Already covered in S1-003 (`npm audit --audit-level=high`).**

**Additional:**

- [ ] `npm audit` run locally before every commit (added to lint-staged)
- [ ] Dependabot alerts enabled on GitHub repo (`.github/dependabot.yml`)

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
```

---

### S1-021 — Environment Variable Security

**Acceptance Criteria:**

- [ ] `src/lib/config.ts` validates all required vars at startup (see S1-008)
- [ ] `NEXT_PUBLIC_` prefix used only for vars intentionally exposed to the browser — all others are server-only
- [ ] CI pipeline never logs env var values (no `echo $SECRET` in workflows)
- [ ] `.env.local` confirmed in `.gitignore` before first commit with secrets
- [ ] `git log --all -- '*.env*'` clean — no secrets in git history

---

## Definition of Done

A task is complete **only** when all of the following are true:

- [ ] Code passes `npm run lint` and `npm run type-check` with zero errors
- [ ] New component has at least one unit test (RTL)
- [ ] E2E smoke suite still passes
- [ ] axe reports zero critical/serious violations
- [ ] No `any` types without a `// TODO: remove any` comment and linked issue
- [ ] No hardcoded colors, fonts, or spacing — design tokens only
- [ ] All images have meaningful `alt` text
- [ ] `npm audit` clean at `--audit-level=high`
- [ ] PR is reviewed and CI is green before merge to `main`

---

## Sprint 1 Completion Criteria

- [ ] All 4 epics complete and merged
- [ ] All unit tests passing in CI
- [ ] E2E smoke suite passing on Vercel preview URL
- [ ] axe: zero violations
- [ ] Lighthouse: Performance ≥ 95, Accessibility = 100, Best Practices = 100, SEO ≥ 95
- [ ] Security headers: A+ on securityheaders.com
- [ ] Zero `npm audit` high/critical findings
- [ ] `main` branch protected — CI required, no direct pushes

---

## ✅ Sprint End: Live Demo

**Triggered only after all completion criteria above are checked off.**

```bash
npm run dev    # http://localhost:3000
npm run build  # must be clean before demo
npm run lint   # exits 0
npm run type-check  # exits 0
npm run test:ci     # all unit tests pass
```

**What the demo shows at `localhost:3000`:**

- [ ] Header with full navigation — desktop + mobile hamburger overlay
- [ ] Skip-to-content link functional via keyboard
- [ ] Design tokens applied — correct serif/sans fonts, neutral palette, accent color
- [ ] Hero section — full-bleed image, title, tagline, CTA
- [ ] Featured Works grid — artwork cards with hover states
- [ ] About teaser — bio + CTA
- [ ] Studio/Atelier teaser section
- [ ] Footer with placeholder links (`rel="noopener noreferrer"` on external)
- [ ] Scroll-triggered animations firing on each section
- [ ] Page transitions between routes (300–500ms)
- [ ] Fully responsive at 375px / 768px / 1280px / 1440px — zero horizontal scroll
- [ ] `prefers-reduced-motion` disables all animations (verify in browser devtools)

**What CI enforces going forward (every PR to `main`):**

- Lint → Type-check → Build → `npm audit` → Unit tests → E2E → axe
