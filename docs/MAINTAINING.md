# Maintaining ringpost.tech

## Where things come from

| What | Source | Never |
|---|---|---|
| Prices, allowances, trial, top-ups, which plan has which feature | `data/plans.json`, generated from the product's `packages/core/src/billing/plans.ts` | type a price anywhere else |
| The 48 trades and "Something else" | `data/business-types.json`, generated from `packages/db/src/business-types.ts` + vertical templates | edit the JSON by hand |
| Entity name, published mailboxes, canonical host | `lib/site.ts` | publish an address |
| Product, channel, guardrail, automation copy | `lib/content/*.ts` | write a claim the code doesn't back |
| FAQ (the `/faq` page, the home FAQ and the FAQPage markup) | `lib/content/faq.ts` | duplicate an answer elsewhere |
| Blog posts | `content/blog/*.mdx` (front matter: title, description, date) | invent a statistic or a customer |
| The seven legal pages | `app/<page>/page.tsx` | reword without the owner's sign-off |

After changing plans or business types in the product:

```bash
pnpm website:export          # in the platform repo; writes ../ringpost-landing/data/*.json
pnpm website:export --check  # exits 1 if the committed copies are stale
```

## The website assistant

The chat and voice demo run in the platform API (`apps/api/src/routes/website-assistant.ts`),
on their own OpenAI key (`WEBSITE_AI_OPENAI_API_KEY`). They read `/assistant-knowledge.json`
(generated at build time by `app/assistant-knowledge.json/route.ts` from the same content
modules the pages render) and the seven legal pages from the live site, and take prices
from `plans.ts` directly. The site calls the API at `NEXT_PUBLIC_RINGPOST_API_URL`
(falls back to `NEXT_PUBLIC_API_URL`, then `https://api.ringpost.tech`).

## Dashboard screenshots

Product pages show a framed screenshot when the file exists and nothing when it doesn't:
`public/screens/inbox.png`, `calendar.png`, `knowledge.png`, `approvals.png`, `reviews.png`,
`advisor.png`, `home.png` (about 2400 px wide, dashboard in dark mode, sample data only,
no real customer names or numbers). The captions already say "Sample data".

## Case studies

`app/resources/case-studies/page.tsx` stays empty until a real customer agrees in writing
to be named. Never add a sample, placeholder or "illustrative" one.

## Industry pages that are noindex

A trade whose spec has no rules, no hand-off topics and no vertical template of its own is
built but marked `noindex` and left out of the sitemap (`isSparse` in
`lib/content/industries.ts`). Add rules or topics for that trade in the product's
`business-types.ts`, re-export, and it becomes indexable.
