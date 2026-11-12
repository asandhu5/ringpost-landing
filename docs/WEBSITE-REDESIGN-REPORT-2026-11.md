# RingPost website redesign — report

Written 2026-11-12. Nothing is committed; every change is in the working tree.

## What was built

- **Design system** in `app/globals.css` (tokens) and `components/site/ui/`: three radii (12 / 20 / 32),
  one shadow family, six text sizes that shrink with screen height, one accent per area
  (Answer violet, Create pink, Grow green).
- **Header, phone menu, footer**: Product ▾ · Industries ▾ · Pricing · Contact · Log in · Get started.
- **Home**: hero, five-tools block, answered inbox, one-day scroll story, dashboard showcase,
  ten-app posting band, content teaser, grow tiles, industries, straight answers, questions, closing.
- **Twelve offering pages**, each with its own hero picture and interactive demo:
  `/calls`, `/messages`, `/inbox`, `/booking`, `/brain`, `/content-studio`, `/posting`, `/reviews`,
  `/win-back`, `/campaigns`, `/insights`, `/talk-to-ai`.
- **Pricing, About, FAQ (with search), Blog, Legal (with contents list), 404** rebuilt on the system.
- **Industries and Contact** kept, restyled to match.
- **Redirects** from every old address (`/channels/*`, `/product/*`, `/grow`, `/resources`, `/product`).
- **Search and AI files** (`sitemap`, `llms.txt`, `llms-full.txt`, `assistant-knowledge.json`,
  chat-widget knowledge) point at the new pages.

## Owner's second round (2026-11-12), items 1–13

| # | Change | Done |
|---|---|---|
| 1 | New hero headline: "One AI partner. Your whole business." | Yes |
| 2 | Five-tools block rewritten, no strike-through; import step fixed | Yes |
| 3 | English only | Yes |
| 4 | Product tour removed (`/product` redirects home) | Yes |
| 5 | Posting band holds Instagram first, video playing | Yes |
| 6 | Comments shown beside reviews | Yes |
| 7 | "The details are in our Privacy policy…" line removed | Yes |
| 8 | More questions: home 4 → 8, FAQ page +13 | Yes |
| 9 | "Tell it once. Then get back to work." removed | Yes |
| 10 | Call sample removed from `/calls` | Yes |
| 11 | Dashboard picture removed from offering pages; phone pass | Yes |
| 12 | Pricing shows everything; no trial or setup-fee wording | Yes |
| 13 | Social post results per app, and learning from what worked | Yes, see note |

**Note on 13.** The product does build new captions on the owner's best recent posts
(`packages/core/src/brain/build.ts`, `bestPosts`). It does **not** record which posts failed. The
site says only the first. Recording failures is a product change.

## Checks

- Build and type check pass. The project has no ESLint config, so lint could not run.
- Fit at 1366×650, 1440×800, 1920×1080, 768×1024, 390×844: no sideways scrolling on any page.
- Lighthouse (mobile), before the second round: Home 98 / 100 / 100, Pricing 96 / 100 / 100,
  Calls 96 / 100 / 100, Content Studio 77 / 100 / 100 (performance / accessibility / SEO).
- All text is in the server-rendered page. Old entrance animations can no longer hide content.

## Not done, or short of the brief

- **Content Studio speed**: 77, under the 90 target (first picture 5.7 s on a simulated slow phone).
- **Reduced motion** was reasoned through in code but not seen: the browser pane cannot switch it on.
- **Home length**: about 12 screens against a target of 9.
- **Phone first screens**: offering-page heroes run about 50 px past one screen on a 390×844 phone.
- **Pricing** no longer fits one laptop screen, because every plan line is now shown (owner's choice).
- **Posting composer** demo is taller than one screen.
- **No new media**: ImagineArt needs the owner to pick an organization. The posting band, industry
  tiles and Content Studio use the 2026-11-11 showcase set, converted to WebP.
- **3D** runs on laptops and desktops only; phones and tablets get the still ring.
- **No GSAP, Lenis or drei**: scroll scenes are done with CSS and small hooks, so nothing was added.
- **Founder note** on About: not written, needs the owner's words.
- **Headline font**: still Schibsted; the Bricolage option is behind the dev-only compare bar.
- **Plan taglines**: two still say "front desk" in the product's `plans.ts`; reworded for display in
  `lib/plans.ts` until the source is changed.
- **Business types**: the product data has 48, not 49.
- **Legal pages and blog posts**: British spelling left as written.

## Owner's third round (2026-11-12, evening) — site locked

| Change | Done |
|---|---|
| Closing call-to-action bands removed from every page ("Ready when you are", "See it working…", blog promo card) | Yes |
| Dashboard showcase removed from the home page | Yes |
| Phones in 3D: angled toward the words beside them, following the mouse on a laptop | Yes |
| Posting band is a 3D carousel that plays by itself; Google Business now shows in full | Yes |
| Pricing: three filler plan lines removed; top-ups shown as three cards with price and how long they last | Yes |
| Contact: email, company block and help cards removed; no email address anywhere on the site | Yes |
| "Talk to a person" form also emails support@ringpost.tech (Reply-To is the visitor) | Yes (API) |
| Schibsted Grotesk locked; font switcher removed | Yes |
| Footer: "© 2026 RingPost Limited. All rights reserved." centered | Yes |
| Every page checked at 390 px wide: nothing spills off the side (three demo pages fixed) | Yes |
| Wording review: retired phrases, free-trial and setup-fee lines, British spellings removed | Yes |

Dashboard (product repo): Settings is one page (business details, then your account); the
broken-connection and missing-knowledge alerts can be closed, and come back if a new problem
appears. "Logo, colors and tone" now uses American spelling in the dashboard as well.

## Production pass (2026-11-12, night)

**Last design changes:** posting band moved below Content Studio on the home page; the
product-page and Messages phones use the same iPhone 16 Pro Max body as the posting phones,
with a status bar coloured to match each app; the post builder's preview (blank after the
3D change) is fixed.

**Search and sharing**
- Every page: one main heading, its own title and description, a canonical address on
  www.ringpost.tech, a sharing image and valid structured data. Checked by crawling all 97
  sitemap pages of the production build: no broken internal links (106 checked), no
  duplicate titles or descriptions.
- Titles kept to about 60 characters (feature pages had up to 88); descriptions cut to
  about 158 characters at a sentence (industry pages had up to 433); the four short legal
  descriptions lengthened. Home description rewritten in the new positioning.
- Sharing images redrawn on the light design; the home image now says "One AI partner.
  Your whole business." (it said "Never miss a customer again"). Browser theme colour light.
- `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `feed.xml`, `manifest` and the
  chat assistant's knowledge all point at the current pages only.

**Production fixes**
- Vercel Analytics and Speed Insights load only on a Vercel build (the live site), so local
  and preview runs don't log a missing-script error.
- Home carousel draws only the five nearest phones and plays only the front phone's video.
- Unused media removed from `public/` (dashboard screenshots, unused photos and loops):
  14 MB → 7 MB. Recoverable from git.

**Lighthouse (mobile, production build):** performance / accessibility / best practices / SEO
| Page | Score | LCP | CLS |
|---|---|---|---|
| Home | 98 / 100 / 100 / 100 | 1.4 s | 0 |
| Pricing | 96 / 100 / 100 / 100 | 1.2 s | 0 |
| Calls | 96 / 100 / 100 / 100 | 1.2 s | 0 |
| Posting | 98 / 100 / 100 / 100 | 1.4 s | 0 |
| Content Studio | 85 / 100 / 100 / 100 | 4.0 s | 0.014 |

**Hosting (owner, 2026-11-12):** the website is on Vercel; the API, worker and dashboard are
on Render. All AWS files were removed: in this repo the Dockerfile, `.dockerignore`, the AWS
deploy workflow and the `standalone` build setting; in the product repo `infra/aws/`, the AWS
deploy workflow, `docs/AWS-MIGRATION.md` and its test. The product's app `Dockerfile`s stay:
Render builds from them. The S3 library stays: it talks to Cloudflare R2, not AWS.

**Still running on AWS (needs the owner's decision):** the stack created on 2 November is live
in us-east-1 (database `ringpost` available, ECS cluster, load balancer; 73 resources in the
saved state). Removing the files does not stop it or its bill.

**Before going live:** on Vercel, set `NEXT_PUBLIC_DASHBOARD_URL` and
`NEXT_PUBLIC_RINGPOST_API_URL`; on Render, deploy the API change in
`apps/api/src/routes/public-site-chat.ts` (the email keys are already Render secrets).
