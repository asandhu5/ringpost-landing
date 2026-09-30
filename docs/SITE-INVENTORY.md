# Site inventory — before the rebuild (Stage 9.0, 2026-09-30)

Every page and component of the previous single-page site was read before anything was
replaced. The rule was evolve, not discard: what worked is ported, and every drop has a
reason below.

## URLs

| URL (before) | After | Notes |
|---|---|---|
| `/` | `/` | Rebuilt as the new home. |
| `/pricing` | `/pricing` | Rebuilt from the product's plan catalog (no setup fee). |
| `/privacy` `/terms` `/acceptable-use` `/data-deletion` `/data-processing` `/refund-policy` `/ai-disclosure` | same | **Kept word for word.** The page files are unchanged; only the shared layout (`components/landing/legal-page.tsx`) moved to the new shell. |
| `/sitemap.xml`, `/robots.txt` | same | Now list every page, on the `www` host. |
| `/#features`, `/#how-it-works`, `/#channels`, `/#marketing`, `/#plans`, `/#faq` | `/` | Hash anchors never reach the server, so they can't be redirected; they now land on the home page, which has the same subjects in the same order. |

No path that existed before moves, so no redirects are needed. (Google indexes no fragment
URLs, and nothing submitted to Meta or Google used one.)

## Kept (ported into the new design)

| Piece | Where it went | Why |
|---|---|---|
| Rotating verb in the hero ("always answering / booking / organizing / replying / following up") and its blur-in letter animation | `components/site/hero.tsx` | The brief asks for it by name; it is the site's best moment. Gradient moved from pink to the violet/cyan/coral palette. |
| The missed-call-to-booking conversation ("the 90-second save") | `components/site/phone-mock.tsx`, now inside a phone frame in the hero | Every beat maps to a real capability (text-back from the business number, live lookup, booking made by a tool, calendar mirror, reminder the day before — the product's default is 24 hours). Kept its "illustration, not a recorded customer" label. |
| The seven legal pages | unchanged files | Reviewed for Google OAuth; the brief says port unchanged. |
| Trust copy: "answers from your real data", "bookings land on your real calendar", "you approve every review reply" | Guardrails section on `/` and `/product`, and the product pages | True, and now backed by the actual guardrail code (prices, times, bookings, contact details). |
| FAQ answers that are still true (keeping your number, what happens when it doesn't know, AI disclosure, data ownership, cancelling) | `lib/content/faq.ts` (one source for `/faq`, the home FAQ and the FAQPage markup) | Reworded where the product changed. |
| Instrument Serif / Instrument Sans / JetBrains Mono, the fine structural grid, the motion keyframes, the reduced-motion floor, visible focus rings, the legal prose styles | `app/layout.tsx`, `app/globals.css` | They give the site its character; the palette changed around them. |
| Security headers in `next.config.mjs` | same file | Kept; the microphone permission is now allowed for this origin only, so the voice demo can work. |
| `lib/site.ts` as the single place for identity and links | rewritten | Same idea, now also the only source of the entity name and published mailboxes. |

## Rebuilt

| Before | After | Why |
|---|---|---|
| One long page with anchor navigation | ~95 pages: product hub + 9 product pages, channels, 49 industry pages, demo, pricing, FAQ, resources, about, contact | The brief's route map. |
| Floating nav with anchor links | `components/site/nav.tsx` with wide Product and Industries panels and a full mobile menu | Brief §9.3. |
| Footer with a large background image | `components/site/footer.tsx`: product, channels, industries by group, resources, company, legal | Brief §9.3; every legal page is one click away from any page. |
| Pink brand palette | Violet brand, coral action (`app/globals.css` tokens) | Matches the dashboard's violet so signing up feels like the same company. |
| `/pricing` with the $499 setup fee and day-60 credit | Generated from `data/plans.json` (the product's `plans.ts`) | The setup fee was removed from the product; comment replies moved to Growth. |
| SoftwareApplication JSON-LD with `Offer`s | `Organization` on `/` (no address), `FAQPage`, `BreadcrumbList`, `Article` | The brief forbids Offer markup with invented terms. |
| Canonical `/` on every page, apex host in sitemap/og:url | Self-canonical on `www.ringpost.tech` | The apex 308-redirects to www; every page claimed to be the home page. |

## Dropped

| Piece | Reason |
|---|---|
| "RingPost recovers 30% of missed bookings" (verticals section) | An invented statistic. There are no customers yet. |
| "our customers see a 40% lift" (FAQ section) | An invented statistic, and implies customers that don't exist. |
| Metrics section (animated counters and a "real-time graph" image) | Illustrated results the product hasn't produced for anyone yet. Replaced by facts countable in the code (channels, trades, plans). |
| Hero stat "Seconds until a missed caller gets a text back" and "1 workspace" | The first is kept as copy where it's explained; the stat rail format implied measured results. |
| "Book a call" `mailto:` CTA | Replaced by self-serve "Start free trial" and the contact page, which reaches a person. |
| The comparison to the cost of a receptionist (`comparison.receptionistMonthly`) | An unverifiable figure. |
| The "cheaper AI receptionists I've seen" FAQ | Compares to competitors, which the brief forbids. |
| Hero background video and the v0 blob-storage images (world, connection, graph, footer) | Pink stock-style imagery from the old template; the brief prefers real dashboard screenshots. |
| AI video on the pricing page | Production launched without a video provider (video is hidden in the product), so the site doesn't sell it. `SHOW_AI_VIDEO` in `lib/plans.ts` turns it back on. |
| Unused shadcn/ui components | Left in `components/ui` (unused files are not bundled); can be pruned later. |
