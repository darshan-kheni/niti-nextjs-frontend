# Niti — a wisdom library

A personal collection of book summaries and reading notes, built with Next.js 14, Supabase, React 18, Tailwind CSS 3, and shadcn/ui (Radix).

Live site: [niti.orphilia.com](https://niti.orphilia.com). Local changes require deployment to update the live site.

## Reader experience

- A pine-and-paper library, original typographic book jackets, EB Garamond and Outfit typography, and light/dark/system themes.
- Readable 14–18px interface/body typography, 22px reader text, and a single-column phone collection.
- Full-text search across titles, subtitles, headings, and points; six interest filters; numeric collection ordering, alphabetical sorting, and shortest-read sorting.
- Grid/list layouts, accessible quick-preview dialogs, and a mobile navigation sheet.
- A browser-local reading list and completed-summary state, shared between pages and browser tabs. No sign-in or cloud synchronization.
- A focused reader with contents navigation, reading progress, adjustable type size, and previous/next summaries.
- Published-only Supabase reads, hourly data revalidation, and the existing admin-triggered revalidation webhook.

## Local development

```bash
npm install
cp .env.example .env
# Fill in the existing Supabase reader credentials and a shared revalidation secret.
npm run dev
```

Never replace an existing `.env` when setting up an already-configured checkout. Required names: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `REVALIDATION_SECRET`. Use the same revalidation secret in the reader and admin deployments. Do not put a service-role key in the reader.

## Checks

```bash
npm run typecheck
npm run build
npm run audit:content
```

The content audit is read-only and uses `.env` (Node 20.6+). It reports visible records, schema validation failures, duplicate identifiers, missing attribution, and category coverage. It does not prove database constraints or RLS behavior.

To preview a production build while another dev server is running, isolate its generated output:

```bash
NITI_DIST_DIR=.next-preview npm run build
NITI_DIST_DIR=.next-preview npm start -- --port 3100
```

In a second terminal, `node scripts/check-production.mjs` checks the current 49-summary collection over HTTP, including all reader pages, a category route, the server-rendered reading-list route, and a missing-summary response. It does not exercise browser interactions or verify visual layout. Set `NITI_TEST_URL` to use another local port. This check intentionally asserts the audited collection size and should be updated when the collection changes.

## Design and data notes

The shared book mark is used by the favicon, Apple home-screen icon, and web-app manifest. `npm run icons:generate` rebuilds the multi-size favicon and the 192px, 512px, and 1024px PNG exports in `public/brand`. The 1024px export is also available for use in Apple app projects. Existing home-screen shortcuts may need to be added again after deploying an icon change.

- [Design direction](DESIGN.md)
- [Database and content review](docs/DATABASE_REVIEW.md)
- [Read-only database catalog inspection](docs/database-inspection.sql)
- [shadcn component documentation](https://ui.shadcn.com/docs/components)

The book jackets are original representations of the reading notes, not official publisher artwork. The live data contains freeform notes; editorial corrections and database migrations were not applied during the redesign.
