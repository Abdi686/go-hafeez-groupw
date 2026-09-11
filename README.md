# Go Hafeez Group — Website

Official website for **Go Hafeez Group** — a Birmingham-based enterprise group operating three divisions:

- **Go Ride** — DVSA-licensed shift-transit minibus fleet for logistics hubs
- **Go Cater** — FSA-audited volume catering for on-site staff dining
- **Go Consult** — Operational advisory, SOP design, and compliance frameworks

## Tech stack

| Tool | Version |
|------|---------|
| React | 18 |
| TypeScript | 5 |
| Vite | 6 |
| Tailwind CSS | 4 |
| Lucide React | icons |

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

## Deploying to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages** in your repo.
3. Under *Build and deployment*, set **Source** to **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will build and deploy automatically on every push to `main`.

> **Note:** The Vite config sets `base` to `/go-hafeez-group/` when `GITHUB_PAGES=true`. If your repo has a different name, update the `base` value in `vite.config.ts` to match.

### Custom domain

If you have a custom domain (e.g. `gohafeez.co.uk`):

1. Add a `CNAME` file to the `public/` folder containing your domain.
2. Set `base: '/'` in `vite.config.ts`.
3. Configure the DNS A/CNAME records per [GitHub's docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Project structure

```
├── public/              Static assets
├── src/
│   ├── app/
│   │   └── App.tsx      Main application component
│   ├── imports/
│   │   ├── Brand_Logos.png
│   │   └── Display_with_logo.png
│   ├── styles/
│   │   ├── index.css    CSS entrypoint
│   │   ├── fonts.css    Google Fonts imports
│   │   ├── theme.css    Design tokens
│   │   └── tailwind.css Tailwind setup
│   └── main.tsx         React entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Brand colours

| Name | Hex |
|------|-----|
| Go Orange | `#F07322` |
| Go Teal | `#1B9CC4` |
| Dark (menu board) | `#0f1923` |

---

© 2026 Go Hafeez Group · DVSA & FSA Audited · United Kingdom
