# Niti — Wisdom Codex (Reader)

A curated digital library of 49+ book summaries distilled into actionable wisdom. Built with Next.js 14, Supabase, and Tailwind CSS.

**Live:** [niti.orphilia.com](https://niti.orphilia.com)

## Features

- **Chapter Grid** — Browse 49+ book summaries with grid/list view toggle
- **Search & Filter** — Client-side search across titles, authors, headings, and points
- **Category Filter** — 6 categories: Wealth, Business, Mindset, Leadership, Life, Science
- **Chapter Modal** — Quick preview with sections and key points
- **Chapter Pages** — Individual SSG pages with ISR (revalidates every hour)
- **Mobile-First** — Fully responsive dark theme with gold accents
- **ISR Webhook** — On-demand revalidation triggered by admin app

## Tech Stack

- **Framework:** Next.js 14 (App Router, Server Components)
- **Database:** Supabase (PostgreSQL + RLS)
- **Styling:** Tailwind CSS with custom design tokens
- **Fonts:** Cormorant Garamond (serif) + Outfit (sans)
- **Validation:** Zod schemas

## Getting Started

```bash
pnpm install
cp .env.example .env.local
# Fill in Supabase credentials
pnpm dev
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=     # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anon key
REVALIDATION_SECRET=           # Shared secret for ISR webhook
```

## Seeding Data

```bash
SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... pnpm seed
```

## Design

Dark theme (#08080B) with gold accents (#C8A44E). Typography: Cormorant Garamond for headings, Outfit for body text.
