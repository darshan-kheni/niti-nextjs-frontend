# Niti: a personal library for a considered life

Niti collects a reader's notes from books about wealth, mindset, leadership, life, business, and learning. The primary task is finding a useful idea, then reading it without distraction.

## Direction

A quiet private library, with a deep pine navigation rail and individually composed typographic book jackets. These jackets are original representations of the notes, not reproductions of the publishers' covers. The distinctive visual moment is a small shelf of physical-looking books. Avoid dashboard metric tiles and emoji covers.

Palette: paper #F8F7F3, card #FFFFFF, ink #242D29, pine #203B32, antique brass #AC8B4D, muted stone #747972. Dark mode uses ink #171F1B and paper text #E8EAE3. Brass is a detail; pine carries actions.

Typography: EB Garamond for book titles, display text and the reading voice; Outfit for navigation, controls and metadata. Left align text. Reading measure stays below 70 characters.

Layout: a 240px desktop library rail, a restrained top utility bar, a two-column introduction with a sculptural book shelf, then a searchable three-column collection. Mobile replaces the rail with an accessible Sheet and reduces the shelf while retaining the reading hierarchy. The reader has a sticky contents column, a narrow text column, and a genuine document progress indicator.

Components: shadcn Button, Badge, Card, Input, Dialog, Select, Tabs, Sheet, Dropdown Menu, Tooltip, Separator, Skeleton and Progress, using Radix primitives on the existing React 18 / Tailwind 3 stack.

## Review against the brief

The initial gold-on-black grid treated every note as an interchangeable tile. The revised design makes the actual books the visual subject. It retains Niti's literary serif, uses a restrained green rather than ubiquitous cream-and-terracotta styling, and makes the library rail useful through categories and local saved-book counts. Numbers shown in the interface come from actual published content. No invented author names, ratings, activity, or readership statistics.

## Interaction and accessibility

Full summary links remain real URLs. Quick previews use a focus-managed Dialog. Search covers titles, subtitles, section headings and points. Saved and completed IDs are stored only in this browser using a versioned storage record. Filters, view, and ordering have labels; empty states offer a reset. Keyboard focus, reduced motion, color contrast, mobile overflow and both themes are checked during verification.

## Readability and application icons

Interface labels use a minimum 0.875rem (14px at the browser default), navigation 0.9375rem, body copy 1–1.125rem, and reader copy starts at 1.375rem (22px) with a 1.75 line height. Reader controls allow 20–30px equivalents using rem values. Decorative lettering inside miniature book covers is not interface text; every title and attribution also appears outside the cover at a readable size.

The desktop rail is 272px wide to accommodate larger navigation text. The library uses two cards on tablets and one card below 640px. The reader contents column collapses below 1280px to preserve a comfortable reading measure.

The sidebar, favicon, Apple touch icon, and web-app assets use the same book-open vector. Apple/app artwork has an opaque pine background and square edges so the operating system applies its own mask. A simpler book silhouette is used at favicon sizes. Regenerate exported assets with `npm run icons:generate` after changing the shared vector artwork.
