# RingPost — Landing Page

Production Next.js 16 landing page for RingPost, the AI front desk for local
service businesses.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Node 18.18+ required. Deploys to Vercel with zero config.

---

## The one file you need to edit

`lib/site.ts` holds the booking link, the contact email, and the nav map.
Change `BOOKING_URL` there and **every** "Book a call" button on the page
updates — nav, mobile menu, CTA, footer.

```ts
export const BOOKING_URL = "mailto:hello@ringpost.com?subject=..."; // ← your Cal.com / Calendly link
export const CONTACT_EMAIL = "hello@ringpost.com";                  // ← your inbox
```

---

## Page structure

| # | Section | id | Component |
|---|---------|-----|-----------|
| 1 | Hero | `#top` | `hero-section.tsx` |
| 2 | The 90-second save (live demo) | — | `live-demo-section.tsx` |
| 3 | Features (all 8) | `#features` | `features-section.tsx` |
| 4 | What's included (all 33 capabilities) | `#included` | `included-section.tsx` |
| 5 | How it works | `#how-it-works` | `how-it-works-section.tsx` |
| 6 | Channels | `#channels` | `channels-section.tsx` |
| 7 | Marketing | `#marketing` | `marketing-section.tsx` |
| 8 | Always answering | — | `metrics-section.tsx` |
| 9 | Trust | `#trust` | `trust-section.tsx` |
| 10 | Book a call | `#contact` | `cta-section.tsx` |
| 11 | Footer | — | `footer-section.tsx` |

Every nav link resolves to a real section. In the original template
`Marketing` and `Trust` pointed at nothing.

---

## Motion system

**Entrance primitives** — `components/landing/motion/primitives.tsx`:

- `<Reveal>` — scroll-triggered fade + slide + de-blur
- `<SplitText>` — per-word/char staggered headline reveal
- `<Parallax>` — scroll-driven depth on image panels
- `<Marquee>` — seamless infinite scroll (duplicates children, shifts -50%)
- `<Magnetic>` — cursor-attracted primary CTAs
- `<TiltCard>` — 3D tilt + cursor-following sheen
- `<Scramble>` — decode effect on mono eyebrows
- `<CountUp>` — eased number roll-in

**Scroll-scrubbed primitives** — `components/landing/motion/scroll-primitives.tsx`.
These are GSAP/ScrollTrigger-style techniques rebuilt natively, so nothing
plays on a fixed timer — scroll up and they run backwards:

- `<ScrollScrub>` — scale/opacity tied directly to scroll position
- `<MaskReveal>` — clip-path wipe instead of a fade (sharper on big imagery).
  Note: the observed node and the clipped node are deliberately separate
  elements. `clip-path: inset(100%)` zeroes an element's paint area, and the
  browser then reports it as not intersecting — so an observer watching the
  clipped node would never fire and the reveal would stay shut permanently.
  Outer div observes, inner div clips. Don't collapse them.
- `<VelocitySkew>` — skews and squashes in proportion to scroll speed, springs back at rest
- `<ScrollLine>` — a rule that draws itself as the section passes
- `<ScrollCharStagger>` — sentences light word-by-word as you scroll through them

Backing hooks in `hooks/use-scroll-motion.ts`: `useScrollTrigger`
(0→1 element progress), `useScrollVelocity`, `useSmoothScroll`.

Global atmosphere in `motion/atmosphere.tsx`:

- `<CustomCursor>` — a precise dot plus a ring that lags behind it and
  swells + turns pink over anything clickable
- `<AuroraField>` — a soft three-colour field that follows the pointer
  across the whole page, screen-blended so it tints every section
- `<ScrollProgress>` — gradient hairline bar
- `<Grain>` — film grain over the flat colour fields

Cursor-reactive behaviour also lives in the sections themselves:
radial glow on the "What's included" cards, cursor-tracking sheen on
`<TiltCard>`, a spotlight on the CTA panel, and pointer-repelled
particles behind the flagship feature card.

Hooks in `hooks/use-motion.ts`: `useInView`, `useParallax`,
`useScrollProgress`, `useReducedMotion`.

## Mobile

Phones get the same layout and the same content — only the expensive
machinery is skipped. `useIsMobileDevice()` (coarse pointer **or** viewport
under 1024px) gates:

| Skipped on mobile | Replaced with | Why |
|---|---|---|
| Hero background video | Static gradient field | Multi-MB download over cellular |
| Particle canvas (features) | CSS gradient | 70 particles on an uncapped rAF loop |
| Grid canvas (metrics) | CSS dot lattice | Redrawn every frame |
| 3× sparkline canvases | CSS stripe + mask | Three more rAF loops |
| `<VelocitySkew>` | Plain passthrough | Transform repaints a whole grid |
| `useScrollVelocity` | Returns 0 | Was re-rendering every frame |
| `mix-blend-screen` on the aurora | Un-blended gradient | iOS Safari composites fixed + blend badly |
| Film grain overlay | Nothing | Invisible at that pixel density |

Also mobile-specific:

- Hero uses `min-h-[100svh]`, not `100vh`. On iOS Safari `100vh` is the
  *large* viewport height, so the address bar covers the bottom of the hero
  and hides the stats row. `svh` is the height that's actually visible.
- `viewportFit: 'cover'` plus `env(safe-area-inset-bottom)` so the dark
  background runs into the notch and home-indicator areas.
- `themeColor` matches the plum background, so browser chrome blends in.

**Scroll safety net:** `useInView` does not rely on IntersectionObserver
alone. A fast flick-scroll can carry a short element from below the fold to
above it between two observer samples, crossing no threshold and firing no
callback — leaving that content permanently invisible. So it also checks on
scroll and reveals when the element has entered, has been scrolled past, or
when the document is at its end (the footer can never scroll further into
view). Reveals fail **open**, never closed.

**Accessibility:** every primitive checks `prefers-reduced-motion` and
degrades to a static, fully-visible state. There's also a global CSS
guard in `globals.css`. Keyboard focus rings are visible on both light
and dark panels.

---

## Theme

The palette is a **deep plum** (`oklch(0.145 0.022 306)`), lifted well
off the template's near-black and pulled toward the magenta/violet hue
that runs through the site's photography, so the UI and the imagery read
as one world instead of colour photos on neutral grey.

Everything is driven by tokens in `app/globals.css`:

```
--surface-1 / --surface-2 / --surface-3   elevation steps
--surface-light                            light panel token (currently unused)
--brand-pink  #eca8d6                      primary accent
--brand-violet #a78bfa                     secondary accent
--brand-cyan  #67e8f9                      tertiary accent
```

No section uses pure black or pure white any more. To reskin the whole
site, change those tokens.

## Content rules applied

Per the brief, this page contains **no** invented social proof:

- No testimonials, customer names, logos, or star ratings.
- No fabricated statistics, client counts, or certifications
  (the template's SOC 2 / ISO 27001 / HIPAA / GDPR badges were removed).
- **No pricing, pricing tiers, or pricing language anywhere.**
- The template's testimonials carousel was removed outright. There is
  no social-proof section on the page — add one only when you have real
  customers to name.
- The leftover COMPUTE "Integrations" and "Security" sections were
  rewritten as RingPost's "Marketing" and "Trust" sections.
- Footer rebranded from COMPUTE; the "Developers" column
  (Docs / SDK / API / Status) and the Pricing link were removed.

The live demo transcript is labelled on-screen as an illustration of
the missed-call flow, not a recorded customer.

**Trade-agnostic:** the page never names a single industry anywhere. The
live demo transcript, the Trust lookup example, and all feature copy are
written so any local service business reads itself into them. This is a
platform landing page, not a vertical-specific one.

---

## Assets

Most imagery streams from the original Vercel blob CDN and works as-is.
Local assets live in `public/images/`. To self-host the remote images,
download them and swap the URLs — they're referenced directly in the
section components.
