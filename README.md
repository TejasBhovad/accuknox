# AccuKnox CNAPP Dashboard

Frontend trainee assignment for [AccuKnox](https://accuknox.com): a JSON-driven **CNAPP** dashboard (CSPM / CWPP / Registry) where categories hold widgets that can be added, removed, and searched locally.

Built against AccuKnox brand tokens (Space Grotesk, primary `#0046FF`, navy `#11206D`) while matching the assignment mockup layout.

## Features

- Dashboard built from [`src/data/dashboard.json`](src/data/dashboard.json) (categories → widgets)
- Add / remove widgets per category (CSPM, CWPP, Image, Ticket)
- **Add Widget** side drawer with category tabs, checkbox visibility, and a create form (name + text)
- Remove via the **×** on a widget card or by unchecking in the drawer and confirming
- Global search filters widgets by name
- Local state with **Zustand** (no backend)
- Accessibility: skip link, landmarks, focus trap / Escape in drawer, live search announcements, visible focus rings, reduced-motion support

## Tech stack

- React 19 + TypeScript + Vite
- Zustand
- AccuKnox brand palette + Space Grotesk
- Lightweight SVG charts (no chart library)

## Run locally

```bash
# Node.js 18+ recommended
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Other scripts

```bash
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
  data/dashboard.json      # seed categories & widgets
  store/dashboardStore.ts  # Zustand store
  components/              # Header, Toolbar, sections, drawer, charts
  types/dashboard.ts
  styles/global.css
```
