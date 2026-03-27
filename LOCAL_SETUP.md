# SAGA — Local Development Setup

Complete guide for setting up the project from scratch on a new machine.
Estimated time: 15–20 minutes.

---

## 1. Prerequisites — Software to Install

Install these in order. Each installer will add the tool to your system PATH automatically — no manual PATH editing needed.

### 1.1 Node.js (Required — minimum v20.9)

1. Go to [nodejs.org](https://nodejs.org) and download the **LTS** version (20.x or higher)
2. Run the installer — keep all defaults, make sure **"Add to PATH"** is checked
3. Verify after install by opening a new terminal:
   ```
   node --version    # should print v20.x.x or higher
   npm --version     # should print 10.x.x or higher
   ```

> If `node` is not found after install, restart your terminal (or reboot). The installer updates PATH but open terminals don't pick it up.

### 1.2 Git (Required)

1. Go to [git-scm.com](https://git-scm.com) → download for Windows
2. Run the installer — keep all defaults
3. Verify:

   ```
   git --version    # should print git version 2.x.x
   ```

4. Set your identity (required before making commits):
   ```
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

---

## 2. Clone the Repository

Open a terminal in the folder where you want the project to live, then:

```bash
git clone https://github.com/Milind-Joshua/SAGA.git
cd SAGA
```

---

## 3. Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json` and automatically sets up the Git pre-commit hooks (Husky + lint-staged). It will take 1–2 minutes the first time.

> **If you see a Husky error** during install, make sure Git is installed and you are inside a git repository (the clone step handles this).

---

## 4. Environment Variables

The app will not start without these. Create a file called `.env.local` in the project root (same folder as `package.json`):

```bash
# Windows (PowerShell)
copy .env.example .env.local

# Windows (Git Bash / terminal)
cp .env.example .env.local
```

Then open `.env.local` and fill in the values:

```env
# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Sanity CMS — get these from https://sanity.io/manage → your project
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity read token — sanity.io/manage → your project → API → Tokens → Add token (Viewer)
SANITY_API_READ_TOKEN=your_token_here
```

### Where to get the Sanity values

1. Go to [sanity.io/manage](https://sanity.io/manage) and sign in (use the same account used to create the project)
2. Select the **SAGA** project
3. **Project ID** — shown on the project overview page, top left (a short alphanumeric string like `ab12cd34`)
4. **Dataset** — shown under Settings → Datasets → should be `production`
5. **Read Token**:
   - Go to **API** tab → **Tokens** section
   - Click **Add API token**
   - Name: `local-dev`, Permissions: **Viewer**
   - Copy the token immediately — it is only shown once

> `.env.local` is in `.gitignore` and will never be committed. It stays on your machine only.

---

## 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The studio is at [http://localhost:3000/SagaStudio](http://localhost:3000/SagaStudio).

---

## 6. IDE Extensions (Recommended)

If using **VS Code**, install these extensions for the best experience:

| Extension                 | Publisher     | Why                          |
| ------------------------- | ------------- | ---------------------------- |
| ESLint                    | Microsoft     | Inline lint errors           |
| Prettier                  | Prettier      | Auto-format on save          |
| Tailwind CSS IntelliSense | Tailwind Labs | Autocomplete for CSS classes |
| TypeScript (built-in)     | Microsoft     | Already included             |

Enable format on save in VS Code settings:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## 7. Available Commands

| Command              | What it does                               |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Start local dev server at localhost:3000   |
| `npm run build`      | Production build (requires valid env vars) |
| `npm run lint`       | Run ESLint across all files                |
| `npm run type-check` | Run TypeScript compiler check              |
| `npm test`           | Run unit tests (Vitest)                    |

---

## 8. Project Structure (Quick Reference)

```
SAGA/
├── sanity/                  # Sanity schema definitions (artwork, series, etc.)
├── sanity.config.ts         # Sanity Studio configuration
├── src/
│   ├── app/
│   │   ├── (site)/          # All public-facing pages
│   │   │   ├── page.tsx     # Home page
│   │   │   ├── gallery/     # Gallery + artwork detail pages
│   │   │   ├── series/      # Series index + series detail pages
│   │   │   ├── exhibitions/ # Exhibitions page
│   │   │   ├── about/       # About page
│   │   │   └── contact/     # Contact page
│   │   └── SagaStudio/      # Embedded Sanity Studio (/SagaStudio)
│   ├── components/          # Shared UI components
│   ├── lib/sanity/          # Sanity client, GROQ queries, mappers
│   ├── sanity/              # Sanity env config (generated)
│   └── types/               # TypeScript interfaces
├── .env.example             # Template for environment variables
├── .env.local               # Your local env file (not committed — create this)
└── package.json
```

---

## 9. Troubleshooting

**`node: command not found` or `npm: command not found`**
→ Node.js is not on your PATH. Restart your terminal after installing Node. If still broken, reboot.

**`Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID`**
→ Your `.env.local` file is missing or the variable is blank. Check step 4.

**`Cannot find module '...'`**
→ Run `npm install` again. Dependencies may not have installed cleanly.

**`Port 3000 already in use`**
→ Another process is using the port. Either stop the other process, or run:

```bash
npm run dev -- --port 3001
```

**Husky pre-commit hook fails on commit**
→ The hook runs ESLint + Prettier before every commit. Fix the reported errors, then commit again. Never use `--no-verify` unless instructed.

**Studio shows "Workspace not found"**
→ The `basePath` in `sanity.config.ts` must match the folder name in `src/app/`. Both should be `SagaStudio`. Do not rename one without the other.

**Changes in Studio don't appear on the site immediately**
→ In development (`npm run dev`) changes appear after page refresh. In production, pages cache for 1 hour (`revalidate = 3600`).

---

## 10. Access & Accounts Needed

| Service | URL                           | What for                                    |
| ------- | ----------------------------- | ------------------------------------------- |
| GitHub  | github.com/Milind-Joshua/SAGA | Source code                                 |
| Sanity  | sanity.io/manage              | CMS credentials + Studio access             |
| Vercel  | vercel.com                    | Production deployments (view only for most) |
