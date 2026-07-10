# ChefMate AI

AI-powered productivity for catering and hospitality professionals. ChefMate AI is a no-login, privacy-first SaaS-style web app that helps chefs, caterers, and event planners save time, streamline client communications, and organise operational workflows — all without storing any personal data on a server.

> **Built for the hospitality industry.** From proposal and email generation to event task planning, research, and a full productivity toolkit, every feature is designed for real-world catering workflows.

---

## Project Overview

ChefMate AI combines general workplace productivity tools with hospitality-specific automation into a single, seamless web application. It runs entirely in the browser: no account, no login, and no data persistence on a server. Session-only state is stored in `sessionStorage`, which is cleared when the tab or browser closes.

All AI outputs are generated locally by a deterministic mock-AI engine written in TypeScript. The outputs are rendered as markdown and can be copied to the clipboard or printed / saved as PDF using the browser's native print dialog.

The app is built with **TanStack Start** on **Vite**, using **React 19**, **Tailwind CSS v4**, and a **shadcn/ui**-based component system.

---

## Features Implemented

### Core Pages

| Page | Feature |
|------|---------|
| **Dashboard** | Welcome hero, quick-action buttons, feature-card grid, hospitality tips carousel, and a recent-outputs list from `sessionStorage`. |
| **Proposals** | Smart catering proposal generator. Builds full proposals with cover email, executive summary, tiered packages (Basic / Premium / Luxury), pricing, timeline, staffing, equipment, and terms. |
| **Emails** | Smart email generator. Choose from 8 tones (Professional, Formal, Friendly, Persuasive, Apologetic, Follow-up, Sales, Thank You) and common scenarios. |
| **Event Planner** | AI event task planner. Generates prep timelines, priority tasks, shopping lists, equipment and packing checklists, and service/cleanup workflows. |
| **Research** | AI research assistant. Produces structured briefs with executive summaries, five key findings, three recommendations, cost notes, and suggested sources. |
| **Productivity Toolkit** | Nine tabbed tools: Meeting Summariser, Daily Planner, Weekly Planner, Shift Planner, To-Do Prioritiser, SOP Generator, Inventory Checklist, Recipe Scaler, and Cost Estimator. |
| **Prompt Library** | Searchable, category-filtered prompt library. Click any prompt to copy it or open the related tool via query params. |
| **Help** | Onboarding and help information. |
| **Responsible AI** | Transparency notice about AI-generated content and responsible use. |

### Design & UX

- **Collapsible sidebar** navigation (shadcn/ui `Sidebar`, collapses to icon mode or mobile offcanvas).
- **Custom hospitality colour palette**: Deep Emerald, Warm Orange, Gold, Soft White, and Charcoal.
- **Typography**: Fraunces for display headings and Inter for body text.
- **Notion/Linear-inspired UI**: rounded-2xl cards, soft shadows, generous spacing, and subtle motion.
- **Responsible AI footnote** on every page.
- **Responsive layout** down to 375px width.

### Output Handling

- **Editable markdown output** rendered with `react-markdown`.
- **Copy to clipboard** and **Clear / Regenerate** actions.
- **Print / Save as PDF** via `window.print()` with a print-only stylesheet that hides the sidebar and header.

---

## Technologies and Tools Used

### Framework & Runtime

- [TanStack Start](https://tanstack.com/start) — full-stack React 19 framework with file-based routing and server functions.
- [Vite](https://vitejs.dev/) — build tool and dev server.
- [React 19](https://react.dev/) — UI library.
- [TypeScript](https://www.typescriptlang.org/) — strict typing.

### Styling & UI

- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first CSS.
- [shadcn/ui](https://ui.shadcn.com/) — accessible component primitives (Sidebar, Button, Card, Input, Textarea, Select, Tabs, Badge, Dialog, etc.).
- [Radix UI](https://www.radix-ui.com/) — headless accessible primitives used by shadcn components.
- [Lucide React](https://lucide.dev/) — icons.

### Forms, State & Animation

- [React Hook Form](https://react-hook-form.com/) — lightweight form management.
- [Zod](https://zod.dev/) — schema validation.
- [Framer Motion](https://www.framer.com/motion/) — page and card animations.
- [TanStack Query](https://tanstack.com/query) — data fetching and caching.

### Content & Fonts

- [React Markdown](https://github.com/remarkjs/react-markdown) — markdown rendering.
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) — prose styling.
- [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Inter](https://fonts.google.com/specimen/Inter) via `@fontsource`.

### Tooling

- [Bun](https://bun.sh/) — package manager and runtime.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) — linting and formatting.

---

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh/) installed locally (recommended). Alternatively, you can use `npm` or `pnpm` with the lockfile replaced.
- Node.js-compatible environment for running the Vite dev server.

### Install Dependencies

```bash
bun install
```

### Run the Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:8080` by default.

### Build for Production

```bash
bun run build
```

### Preview the Production Build

```bash
bun run preview
```

### Lint and Format

```bash
bun run lint
bun run format
```

### Project Structure

```text
src/
  components/chefmate/   # Shared ChefMate components (PageHeader, OutputPanel, SectionCard, etc.)
  components/ui/         # shadcn/ui components
  hooks/                 # Custom React hooks
  lib/                   # Utilities, mock-AI engine, recent-outputs helper
  lib/mock-ai/           # Mock AI modules (email, planner, proposal, research, toolkit, prompts)
  routes/                # TanStack Start file-based routes
  router.tsx             # Router configuration
  start.ts               # Start server entry
  styles.css             # Tailwind + design tokens + global styles
```

---

## Important Notes

- **No backend required.** All AI outputs are generated client-side by deterministic TypeScript templates.
- **No authentication or accounts.** State is stored only in `sessionStorage` and is cleared when the tab is closed.
- **Currency:** All currency is displayed in South African Rand (ZAR / R).
- **No real AI API calls.** This is intentional for the v1 build. Swapping to a real AI provider would require wiring a server function to the chosen API and adding the appropriate API key handling.

---

## License

This project was generated as a proof-of-concept / starter application for ChefMate AI. All business logic and output are mock-generated for demonstration purposes.
