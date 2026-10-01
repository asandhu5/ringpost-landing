# Maintaining ringpost.tech

## Where things come from

| What | Source | Never |
|---|---|---|
| Prices, allowances, trial, top-ups, which plan has which feature | `data/plans.json`, generated from the product's `packages/core/src/billing/plans.ts` | type a price anywhere else |
| The 48 trades and "Something else" | `data/business-types.json`, generated from `packages/db/src/business-types.ts` + vertical templates | edit the JSON by hand |
| Entity name, the one contact email, canonical host | `lib/site.ts` | publish an address, or an email anywhere but `/contact` |
| Product, channel, guardrail, automation copy | `lib/content/*.ts` | write a claim the code doesn't back |
| FAQ (`/faq` shows every group but pricing; `/pricing` shows the pricing group) | `lib/content/faq.ts` | duplicate an answer elsewhere |
| Blog posts | `content/blog/*.mdx` (front matter: title, description, date) | invent a statistic or a customer |
| The seven legal pages | `app/<page>/page.tsx` | reword without the owner's sign-off; name providers (one line each for Meta and Google only); name a mailbox (link `/contact`) |

After changing plans or business types in the product:

```bash
pnpm website:export          # in the platform repo; writes ../ringpost-landing/data/*.json
pnpm website:export --check  # exits 1 if the committed copies are stale
```

## Prices and plans appear on /pricing only

Prices, and which plan includes what, are shown on `/pricing` and nowhere else: no prices,
plan tables, badges or "(Command Center)" notes on product, channel or other pages, and no
"plans from $…" line in calls to action. Each product's `plans` field in
`lib/content/products.ts` still exists, but only so the website assistant can answer "which
plan has X?".

## The website assistant (Zara)

Zara is RingPost's own website assistant, on chat and on a browser call. The chat and call run in the platform API (`apps/api/src/routes/website-assistant.ts`),
on their own OpenAI key (`WEBSITE_AI_OPENAI_API_KEY`). They read `/assistant-knowledge.json`
(generated at build time by `app/assistant-knowledge.json/route.ts` from the same content
modules the pages render) and the seven legal pages from the live site, and take prices
from `plans.ts` directly. The site calls the API at `NEXT_PUBLIC_RINGPOST_API_URL`
(falls back to `NEXT_PUBLIC_API_URL`, then `https://api.ringpost.tech`).

## The Zara widget and the call page

Zara is a floating widget on every page (`components/site/chat-widget.tsx`, mounted in
`app/layout.tsx`). It opens itself once per browser session with a short chime (browsers may
block the sound until the visitor has clicked), closes when the visitor clicks anywhere else,
and keeps the conversation in `sessionStorage` until the tab is closed. Any page can open it,
optionally with a question or straight into a call, with `<OpenChatButton>`. The call also
has its own page, `/call` (`/demo` redirects there).

## Product visuals

Where there is no dashboard screenshot, pages show the dashboard drawn in HTML
(`components/site/visuals.tsx`), with no caption. Keep them honest: no real businesses,
customers or results, and no numbers that could read as a claim.

## Dashboard screenshots

A product page shows its framed screenshot (the `screen` field in `lib/content/products.ts`)
when the file exists in `public/screens/`, and the drawn visual when it doesn't. Today:
`inbox`, `calls`, `calendar`, `knowledge`, `winback` (`.webp`, 2400 px wide).

They are real dashboard pages for a fictional business ("Bloom & Barrel Hair Studio", a
local demo tenant flagged `is_demo`), captured on 2026-09-30: `pnpm db:seed-demo-activity
--slug=bloom-and-barrel`, `pnpm demo:login --tenant=bloom-and-barrel`, dashboard in dark
mode at 1280×820 @3x in the business's time zone, sidebar cropped off, saved as 2400 px WebP (sharp on retina screens). Never use a real
business. Leave out pages whose content would read as a claim about RingPost: review text
reads as a testimonial, and overview numbers read as results. Media, uploads, approvals and
Talk to AI still use drawn visuals because the demo tenant has no real media files.

## Case studies

There is no case-study page (`/resources/case-studies` redirects to `/resources`). Only add
one when a real customer agrees in writing to be named.

## Industry pages that are noindex

A trade whose spec has no rules, no hand-off topics and no vertical template of its own is
built but marked `noindex` and left out of the sitemap (`isSparse` in
`lib/content/industries.ts`). Add rules or topics for that trade in the product's
`business-types.ts`, re-export, and it becomes indexable.
