# Ghost2Lead — Web

Turn ghost visitors into real customers. This app is the marketing and auth front for [Ghost2Lead](https://ghost2lead.netlify.app/): it tracks how anonymous visitors interact with your app, uses AI to build behavioral personas, and surfaces practical conversion actions.

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) with [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (strict)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) with custom design tokens
- **UI:** [Radix UI](https://www.radix-ui.com/) primitives, shadcn-style components, [Lucide](https://lucide.dev/) icons
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) via `@hookform/resolvers`
- **Lint / format:** [Biome](https://biomejs.dev/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) (recommended) or npm/yarn

## Setup

```bash
# Clone and enter the repo
git clone <repo-url> ghost2lead-web && cd ghost2lead-web

# Install dependencies
pnpm install

# Add .env.local if the project needs environment variables
```

## Scripts

| Command   | Description                    |
| --------- | ------------------------------ |
| `pnpm dev`   | Start dev server (default: http://localhost:3000) |
| `pnpm build` | Production build               |
| `pnpm start` | Run production server          |
| `pnpm lint`  | Run Biome check                |

## Project structure

```
src/
├── app/                    # App Router
│   ├── (auth)/             # Auth route group: /auth, /verify-otp
│   │   ├── auth/
│   │   └── verify-otp/
│   ├── pricing/
│   ├── layout.tsx
│   └── page.tsx            # Landing
├── components/
│   ├── ui/                 # Reusable UI (Button, Input, etc.)
│   ├── features/           # Feature components (e.g. auth: OTP form, resend)
│   └── ...
├── contents/               # Copy and static content (landing, pricing)
├── constants/              # App constants (e.g. auth field names)
├── lib/                    # Utilities (e.g. cn)
└── styles/                 # Global CSS and design tokens
```

- **Path alias:** `@/*` → `src/*` (see `tsconfig.json`).
- **Server Components by default;** `'use client'` only where needed (forms, hooks, browser APIs).

## Environment variables

Use `.env.local` for local overrides. Do not commit secrets; keep them out of the repo.

## Deployment

Optimized for [Vercel](https://vercel.com). Connect the repo and use the default Next.js preset; `pnpm build` and `pnpm start` are used automatically.

## License

Private. All rights reserved.
