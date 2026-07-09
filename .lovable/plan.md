## ChefMate AI — Build Plan (v1)

A no-login SaaS-style productivity suite for catering & hospitality pros. All AI outputs are template-driven (mocked) client-side; nothing is persisted server-side. Session-only state via React + `sessionStorage`.

### Design direction
- Palette: Deep Emerald `#0F5132` (primary), Warm Orange `#EA7A2C` (secondary), Gold `#D4A24C` (accent), Soft White `#FAFAF7` (bg), Charcoal `#1F2937` (text), plus muted variants — all wired as semantic tokens in `src/styles.css` (oklch).
- Type: Fraunces (display, headings) + Inter (body) via `@fontsource`.
- UI feel: Notion/Linear polish — rounded-2xl cards, soft shadows, generous spacing, subtle motion (framer-motion fade/slide on route change and card hover).
- Icons: lucide-react (ChefHat, Utensils, CalendarClock, Mail, ClipboardList, Search, Sparkles, etc.).

### Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx              # shell: SidebarProvider + AppSidebar + <Outlet/>, head metadata
  index.tsx               # Dashboard
  proposals.tsx           # Smart Proposal Generator
  emails.tsx              # Smart Email Generator
  planner.tsx             # AI Event Task Planner
  research.tsx            # AI Research Assistant
  toolkit.tsx             # Productivity Toolkit (tabs for the 9 tools)
  prompts.tsx             # AI Prompt Library
  help.tsx                # Help
  responsible-ai.tsx      # Responsible AI notice
```
Each route sets its own `head()` (title/description/og). Home inherits root defaults.

### Layout
- Collapsible shadcn `Sidebar` (`collapsible="icon"`), header with `SidebarTrigger`, persistent Responsible-AI footnote banner.
- Mobile: sidebar collapses to offcanvas via existing shadcn behavior; forms stack.

### Shared components (`src/components/chefmate/`)
- `PageHeader` — title, subtitle, icon.
- `FeatureCard` — dashboard tile with icon, title, blurb, CTA link.
- `OutputPanel` — editable `<Textarea>` + toolbar (Copy, Clear, Regenerate, Print) using `window.print()` with a print stylesheet targeting `#print-area`.
- `FormField` wrappers around shadcn Input/Select/Textarea for consistent spacing.
- `ResponsibleAIBanner` — dismissible per session.
- `SectionCard` — rounded-2xl card wrapper.

### Mock AI engine (`src/lib/mock-ai/`)
Pure TS template functions — deterministic + light randomization so "Regenerate" varies wording. One module per feature:
- `proposal.ts` → returns structured object (coverEmail, executiveSummary, packages[Basic/Premium/Luxury] with items+price, pricing breakdown, timeline, staffing, equipment, terms, CTA), rendered as markdown.
- `email.ts` → tone-aware templates (8 tones × common scenarios).
- `planner.ts` → generates prep timeline, task list w/ priority + ETA, checklists (shopping/packing/service/cleanup).
- `research.ts` → summary + 5 findings + 3 recommendations + vendor/cost notes + placeholder sources.
- `toolkit/*.ts` → meeting-notes summarizer, daily/weekly/shift planner, todo prioritizer, SOP generator, inventory checklist, recipe scaler (real math), cost estimator (real math).
- `promptLibrary.ts` → categorized prompt strings.

All outputs returned as markdown; rendered with `react-markdown` inside `OutputPanel` (edit mode swaps to textarea of raw markdown).

### Feature pages
Each page = form (left/top) + `OutputPanel` (right/bottom). Uses `react-hook-form` + `zod`. Submit calls the relevant mock module synchronously (with a brief simulated delay + skeleton for UX).

- **Proposal**: full input schema per spec; output shows tabs for Cover Email / Proposal / Menus / Pricing / Timeline / Terms; single "Copy all" + per-section copy.
- **Email**: tone selector, scenario selector, context textarea.
- **Planner**: inputs → timeline view (grouped by hour offset) + checklist tabs.
- **Research**: topic input + category chips → structured findings.
- **Toolkit**: single route with tab bar for the 9 sub-tools.
- **Prompt Library**: searchable, category-filtered grid; click card → copy prompt or open in relevant tool via query params.

### Dashboard (index)
- Welcome header with hospitality illustration (generated hero image).
- Quick-action buttons (top 4 tools).
- Grid of feature cards linking to each route.
- Tips carousel (static).
- "Recent outputs" list from `sessionStorage` (cleared on tab close).

### Session storage
Small helper `useSessionStore(key)` for recent-outputs list and dismissible banner state. No cookies, no DB.

### Print/PDF
Global `@media print` CSS hides sidebar/header, shows `#print-area`. "Print / Save as PDF" button triggers `window.print()`. No PDF/DOCX libs in v1.

### Dependencies to add
`@fontsource/fraunces`, `@fontsource/inter`, `react-markdown`, `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`. shadcn components already available: sidebar, button, card, input, textarea, select, tabs, badge, tooltip, dialog, scroll-area, separator.

### Out of scope for v1
Real AI calls, PDF/DOCX export, auth, DB, analytics, i18n.

### Deliverables checklist
- Tokens + fonts wired in `src/styles.css`.
- Sidebar shell in `__root.tsx` with `<Outlet/>` preserved.
- 9 routes with unique `head()` metadata.
- Mock AI modules with tests-by-inspection (deterministic snapshots).
- Responsive down to 375px; sidebar offcanvas on mobile.
- Responsible-AI banner visible on every page.
