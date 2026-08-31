# Design System (Phase 4)

## Design plan

**Subject.** A premium solar EPC (engineering, procurement, construction)
company serving homeowners and businesses in Pakistan. The visitor is
usually mid-comparison between installers, worried about loadshedding,
skeptical of vague pricing, and reassured by evidence of real engineering
competence — not by leaf icons.

**Signature idea.** Real inverters, meters, and datasheets present numbers
in monospace, seven-segment-adjacent type. The hero and every stat block
borrow that vocabulary: a dedicated data face for system specs (`10.2 kW`,
`1,450 kWh`), set apart from the display and body faces, plus a thin
gold hairline annotation style on hero photography that reads like an
engineering drawing callout rather than a marketing sticker. That's the
one place the design takes a visible risk — everything else stays quiet.

## Tokens

**Color** (fixed by brief, extended minimally for depth):
| Token | Hex | Use |
|---|---|---|
| `primary` | `#004F6B` | Navbar, primary buttons, headings, footer base |
| `primary-dark` | `#013A4F` | Hover state on primary, deep sections |
| `ink` | `#0B1B22` | Near-black navy for maximum-contrast text/footer depth |
| `accent` | `#C6A56E` | Small highlights, active states, dividers — used sparingly |
| `accent-soft` | `#EDE4D3` | Accent tint for subtle badges/backgrounds |
| `bg` | `#FFFFFF` | Base background |
| `bg-muted` | `#F7F9FA` | Section alternation |
| `text` | `#17202A` | Body text |
| `text-muted` | `#667085` | Secondary text |
| `border` | `#E5E7EB` | Card borders, dividers |

**Type:**
- Display: **Plus Jakarta Sans** (headings — confident, geometric, a step
  away from the Inter-everywhere default)
- Body: **Inter** (paragraph text, forms, nav — maximum readability)
- Data/mono: **JetBrains Mono** (system specs, kWh/kW readouts, stat
  counters — the technical signature described above)

**Layout:** Editorial two-column hero, generous whitespace, 1280–1440px
desktop max-width, cards with 1px hairline borders, barely-there shadow,
10–12px radius (not pill-shaped). Numbered steps (01–06) are reserved for
the actual installation process timeline, where order is real information
— not decoration elsewhere.

**Motion:** Fade/slide-up on load (hero, staggered CTA), counter
animation on trust stats and calculator results, smooth tab crossfade for
system-type selector. All wrapped to respect `prefers-reduced-motion`.
No parallax scroll-jacking, no glassmorphism, no color gradients beyond a
single very subtle dark radial behind the hero image for depth.

**Imagery:** Mock data intentionally does not hot-link stock photography —
production photos belong to the client and shouldn't be faked. Placeholder
image slots use a hand-drawn technical illustration style (original SVG,
included below) so the design reads as intentional rather than "missing
image" gray boxes. Swap `image_url` in `/data/*.ts` for real asset paths
once photography is available.

## What's built in this pass

- `tailwind.config.ts` / `globals.css` — tokens above, wired into Tailwind
- `config/fonts.ts` — next/font registration
- `types/` — shared interfaces (`SolarPackage`, `Product`, `Project`,
  `Testimonial`, `FAQ`, `Service`, `City`, `Lead`, `CalculatorResult`)
- `data/*.ts` — mock data conforming to those types
- `lib/api/*` — the abstraction layer from `docs/ARCHITECTURE.md` §43,
  currently backed by mock data behind an artificial delay, swappable for
  real `fetch` calls to `/api/*` later without touching any component
- `components/layout` — Navbar, MobileMenu, Footer
- `components/shared` — WhatsAppButton, CallButton
- `components/sections` — Hero, TrustBar, Services, SolarSystemTypes,
  PackagesPreview, ProjectsPreview, WhyChooseUs, ProcessSection,
  Testimonials, FAQPreview, FinalCTA
- `app/(public)/page.tsx` — homepage assembled from the above
- `preview/homepage.html` — a static, styled preview of the homepage you
  can open directly in a browser, since this sandbox can't run `next dev`
  (no network access to install dependencies). It's hand-built to match
  the same tokens, not generated from the TSX — treat the TSX as the
  source of truth and the HTML as a visual sanity check.

## Deferred to later passes

Calculator (multi-step flow + results dashboard), packages/products/
projects listing + detail pages, blog, about, contact, quote form, net
metering, service-area pages, 404, admin placeholder routes. The homepage
was prioritized because §55 of the brief centers the entire conversion
funnel on it, and it's the page that exercises every design-token
decision at once.
