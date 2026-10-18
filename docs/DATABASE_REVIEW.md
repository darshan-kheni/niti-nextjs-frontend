# Niti database and content review

Checked against the configured live Supabase project on October 18, 2026. This was a read-only review; no database rows, policies, or schema were changed.

## Verified content

| Check | Result |
| --- | --- |
| Rows visible with the public reader credentials | 49 |
| Published rows | 49 |
| Sections | 244 |
| Key points | 1,112 |
| Rows passing the existing Zod content schema | 49 / 49 |
| Duplicate IDs, summary numbers, or titles | None |
| Unmapped categories | None in the current 49 entries |
| Missing subtitle / attribution | 10 entries |

Category counts: Wealth & Money 12, Business & Investing 9, Mindset & Self 12, Leadership 6, Life & Spirituality 8, Science & Learning 2.

Missing subtitle IDs: 1, 12, 14, 15, 25, 26, 34, 41, 45, 49. The design displays “Collected reading notes” rather than filling these with guessed authors.

The live content fields match the local seed file. Live records additionally contain publication status and database timestamps. The redesign uses live published content as its source of truth; the seed was not rerun.

## Observed shape

`chapters` returns `id` (integer values), `num` (strings such as `#1`), `title`, nullable `subtitle`, `date` (display text), `icon`, `color` (hex strings), `sections` (an array of objects with `heading` and `points`), `created_at`, `updated_at`, and `published`.

These are observed response types, not a verification of PostgreSQL column definitions. The REST introspection endpoint returned 401 and explicitly requires a service-role key. This repository only has public reader credentials. No SQL schema or migrations were present in either the reader or adjacent admin repository. Column nullability, indexes, constraints, triggers, underlying JSON/JSONB type, and RLS policies therefore remain unverified. Published content loads successfully with the reader key, but this does not establish that draft reads or unauthorized writes are blocked.

`database-inspection.sql` contains read-only catalog queries for a project administrator to resolve those gaps. It changes nothing.

## Fixes applied to the reader

- Sort summary numbers numerically. Sorting the original text field put `#10` before `#2`.
- Associate the legacy category map with summary numbers rather than database-generated row IDs, so reseeded IDs do not silently change a summary's category.
- Calculate estimated reading time from the actual text at 200 words per minute, rounded up to at least one minute.
- Show point counts and collection counts from live data.
- Filter all content reads to `published = true`. Keep the public reader key on this path; never substitute an administrative key.
- Keep saved and completed status in versioned browser storage. No user tables or sign-in were introduced.

## Recommended schema improvements

1. Add an integer `position` column with a uniqueness constraint if collection order is unique, leaving `num` as presentation only. Explicit order should not depend on parsing a string.
2. Add `categories` and `chapter_categories` tables with foreign keys and an explicit order. The current code map covers 49 summaries and needs manual updates for future additions. Normalized categories would allow the admin to assign them directly.
3. Add a nullable `author` field separate from `subtitle`. Confirm attribution against the original works before populating it.
4. Store note dates in typed `date_start` and nullable `date_end` columns. Preserve current date text during migration; it contains ranges and should not be guessed or sorted lexically.
5. Keeping nested sections in a JSONB column is reasonable for this read-oriented library. Verify a nonempty array constraint and object/string validation before adding constraints. If sections later need individual editing, search, or annotations, consider normalized section/point tables with order columns.
6. Verify primary/unique keys, an automatic `updated_at` trigger, and reader/admin RLS policies using the catalog queries. Index only against observed query plans and collection size; 49 rows do not justify speculative indexes.

These are recommendations, not applied migrations. The admin app and reader should adopt any contract change together.

## Editorial review

The notes contain apparent transcription issues and some numeric titles do not match the number of saved points. For example, “20 Life-Changing Teachings of Gautam Buddha” contains 19 points, “18 Myths of the Law of Attraction” contains 13, and “14 Life Lessons from Ramayana” contains 16. Some points may combine ideas, so this is a review flag rather than proof of missing content. Confirm titles and attribution for entries such as “Dhanachya — How Guivarh Do Business” and “Sohiban — The 30-Day Formula” against the source notes. The redesign preserves them verbatim.

## Repeat the content check

Run `npm run audit:content` with the reader credentials in `.env` (Node 20.6+). It reads the rows permitted by that key, validates their structure, and prints counts and issue IDs without exposing credentials. It performs no writes. Exit status is nonzero for malformed content or duplicate IDs/numbers. This validates visible data; it does not replace a SQL schema or RLS audit.
