# RingPost website redesign — build prompt for Fable 5.2

> Written 2026-11-12. Paste this whole file into a fresh Fable 5.2 session started in
> `/Users/muhammadahmed/Documents/ringpost-landing` (add `/Users/muhammadahmed/Documents/ringpost`
> as a second working directory so you can read the dashboard and API).

---

## 0. Your job, in one paragraph

You are the lead product designer and front-end engineer for **RingPost**. Rebuild the marketing
website at `ringpost-landing` so that a busy, non-technical local business owner — a salon owner, a
plumber, a dentist's receptionist, a restaurant manager — lands on it and, within five seconds,
understands **what RingPost does for them**, and within two minutes has **seen the product working**
and wants to sign up. The site must look like a serious, modern B2B software company that is at the
front of what AI can do — 3D, motion, live product demos — while staying **effortless to use**:
big clear words, one idea per screen, nothing hidden, nothing confusing, nothing cut off.

The bar for every page is the owner's own sentence:

> **Great UI + Great UX: a product that is both a pleasure to look at and effortless to use.**

Do **not** create Figma files. Figma comes later, once the owner has approved the built website.

---

## 1. How you work (read before touching anything)

1. **Read first, build second.** Before writing code, read:
   - `AGENTS.md` and the Next.js docs it points to in `node_modules/next/dist/docs/` (this is
     Next.js 16.4 — APIs differ from what you remember).
   - Every file in `app/`, `components/`, `lib/`, `data/`, `hooks/`, `app/globals.css`,
     `next.config.mjs` (CSP lives here).
   - The dashboard you are selling: `../ringpost/apps/dashboard/app/` — especially `_design/Shell.tsx`
     (sidebar = the product's real feature list), `_home`, `inbox`, `calendar`, `customers`,
     `knowledge`, `media`, `approvals`, `reviews`, `campaigns`, `win-back`, `insights`, `advisor`,
     `connections`, `automation`, `setup`, `billing`. Match its look (light "option A" theme) so a
     visitor who signs up lands in something that looks like the site they just saw.
   - Product truth: `../ringpost/apps/api/src` and `../ringpost/packages/core/src` when you need to
     confirm a claim (channels, limits, what is on which plan).
2. **Never commit or push.** Leave every change uncommitted in the working tree. The owner reviews in
   the browser and commits themself. The tree already has uncommitted work from 2026-11-11
   (`components/site/home2/`, `studio2/`, `story-page.tsx`, `lib/content/stories.ts`,
   `public/showcase/` …) — that **is** the current site. Don't revert it. At checkpoint 1, ask the
   owner whether they want to commit it as a baseline before you replace it.
3. **Checkpoints.** Work in the phases in §12. Stop at the end of each phase, show the owner the pages
   running in the browser (`.claude/launch.json` → `landing`, port 3100; if a dev server is already
   running on 3000, use that), with screenshots at the sizes in §11, and wait for their go before the
   next phase. Do not run ahead.
4. **Talk to the owner in plain words.** They are not a developer. No jargon, no file dumps. Show,
   don't describe.
5. **Your own checks are not proof.** Earlier agents scored their own work highly and the owner
   rejected it. Before each checkpoint, look at every screen yourself at 1366×650 and ask: *would a
   plumber who has never heard of RingPost understand this screen in five seconds?* If not, fix it.
6. **Every product claim must be true today.** Use §3 as the starting truth sheet, and confirm anything
   not in it against the code. If you can't confirm it, don't say it.

---

## 2. What RingPost is (the story every page tells)

**One line:** RingPost is an AI business partner for local businesses. You tell it about your
business **once**, and it answers every call and message, books customers into your calendar, makes
and posts your social content, replies to reviews and comments, brings back quiet customers and tells
you what's working.

**The positioning (owner's, 2026-11-11): "Tell it once. Everything runs from it."**
Today an owner gives their business knowledge separately to an answering service, a booking tool, a
designer, a social media manager and a consultant. With RingPost they give it once — and every part
of the product works from that one "Business Brain". **"Everything in one platform, from one
brain" is the reason to buy.** Do not lead with "it answers calls you can't pick up": many products
do that.

**Not a front desk — a business partner.** Remove every "front desk" / "AI front desk" /
"receptionist" phrasing from headlines, eyebrows and nav (it appears in about 19 files today:
`grep -rli "front desk" app components lib`). "AI receptionist" may remain only where it is the
search phrase a page must rank for (e.g. SEO titles of industry pages), never as the brand promise.

**Who reads the site:** owners and managers of small local businesses in ten groups (beauty and
wellness, health, fitness, food and drink, home services, auto, professional services, education and
care, shops, stays and venues — see `lib/content/groups.ts`), 49 business types
(`data/business-types.json`). Many are not comfortable with technology. Assume they read on a
13-inch laptop at 100% zoom or on a phone, between jobs, and give a page about ten seconds before
deciding.

---

## 3. Truth sheet (confirm in code before using; never invent beyond it)

**Setup**
- Sign up, choose your type of business (49 types, or "Something else"), import your website so the
  Business Brain fills itself, choose a business phone number (US and Canada numbers), connect your
  channels on the Connections page. The Knowledge page shows progress and points out gaps to fill.
- Knowledge holds: about your business, services and prices, opening hours, your team and their
  hours, how people book and pay, policies, questions customers ask, when to hand over to you,
  logo/colours/tone.

**Answering (all plans — check exact limits in `data/plans.json`)**
- Phone calls answered live in a natural voice, 24/7; books, moves and cancels appointments.
- Missed calls are called back by the AI.
- WhatsApp (the business keeps using the WhatsApp app on their phone — never tell them to delete it),
  Instagram DMs, Facebook Messenger, texts (reminders sent, STOP honoured), email (replies in the same
  thread). Replies go out in the customer's own language.
- One inbox for every channel; the owner can step in any time and the AI steps back.
- Its own booking calendar per team member, synced both ways with Google Calendar. It does **not**
  connect to Vagaro, Fresha, Mindbody, Jobber or OpenTable — owners block those hours in Google
  Calendar and RingPost books around them.
- Review request sent after every completed visit; low ratings come to the owner first.

**Trust (from `components/site/home2/trust.tsx` — all true today)**
- The AI introduces itself as the business's virtual assistant and never pretends to be a person;
  anyone who asks for the owner is passed to them.
- Autopilot off → every reply, post and review answer waits for the owner's OK (calls are still
  answered live). Approvals page.
- Callers hear that the call may be recorded; recordings deleted after 30 days to a year, or off.
- No medical, legal or financial advice; not a HIPAA-covered service.
- Delete any customer and their history; export your data for 60 days after leaving.

**Creating and posting (Growth and Pro)**
- Content Studio makes images and short videos from a one-line idea or the owner's photo, with the
  logo, offer and a caption in the business's voice; words on images come from the owner's own
  details and are checked.
- Daily content: owner picks a cadence (per day / per week); fresh posts wait in the Media Library
  each morning; holidays and quiet days in their country are considered; nothing posts until picked
  (unless autopilot).
- Media credits each month: Growth 2,000, Pro 5,000. The cost is shown before anything is made; a
  failed one gives credits back.
- Uploads: photos up to 20 MB, videos up to 100 MB; JPEG, PNG, WEBP, HEIC, MP4, MOV; uploads resume
  after a dropped connection.
- Posts to Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Pinterest, Bluesky and Google
  Business (Instagram always listed first). A caption written for each platform; post now or
  schedule; a result per platform with retry.

**Growing**
- Talk to AI (Growth and Pro): ask about your business in plain words, get an answer with the numbers
  behind it.
- Pro adds: replies to Google reviews and to comments on your posts, campaigns, win-back (groups such
  as Slipping away, Lapsed, Long gone, Never booked — check the current sending channels in the API
  before writing), insights (where customers come from, what they keep asking, post performance).

**Pricing** — always read from `data/plans.json` / `lib/plans.ts`, never hardcode:
Starter $39, Essential $149, Growth $399, Pro $799 a month, Business custom. Yearly billing with a
discount (`yearlyDiscount`). No contract, no setup fee, cancel any time. **No free trial is offered.**

---

## 4. The owner's standing rules (break none of these)

1. White, light, calm base design (the dashboard's option A). Depth and colour come from 3D, glass,
   photography and motion — not from a dark theme.
2. Never name AI models or providers (OpenAI, Kling, Seedance, GPT Image, Higgsfield…) anywhere on
   the site.
3. No disclaimer captions: no "made with AI", "Example", "Not a real customer", "demo", screen-size
   notes, or `app.ringpost.tech` labels on mock-ups.
4. No people's names in demos (no "Priya Shah"). Use outcomes and roles: "New customer · 11:48 pm",
   "Missed call → booked Thu 3:00 pm". Generic business names (e.g. "Golden Hour Hair") are fine,
   used sparingly.
5. No fake testimonials, customer logos, ratings, review counts or usage statistics. RingPost has no
   public customers yet. Illustrative numbers inside a product mock-up are fine; claims about
   RingPost's results are not.
6. No missed-call calculator, no "Answers on / Posts to" logo strip, no generic CTA band copy like
   "Answer every customer, starting tonight".
7. Show all ten industries with generic, good photography — never one trade as if it were the only
   customer.
8. **No plan labels on the home page** ("on Growth and Pro", "On Pro", "Posts (Growth, Pro)"). On
   feature pages, plan availability appears **once**, quietly, next to the final call to action
   ("Included in Growth and Pro · See pricing"). Never as badges in heroes or section headings.
9. No "Want to ask a person first? / Talk to a person" band on the home page.
10. No plans/pricing section on the home page. Pricing lives on /pricing.
11. Motion holds each idea until it lands — never fast cuts, never moving before the visitor can read.

---

## 5. What is wrong today (the audit you are fixing)

Measured on 2026-11-12 at a 1440×800 viewport (a laptop at 100% zoom):

1. **Pages are far too long.** Home 12,940 px (16 screens), Content Studio 7,563 px, Pricing
   6,193 px, Posting 5,381 px, each channel page ~4,900 px.
2. **Nothing fits at 100% zoom.** Sizes are driven by width only:
   - Home hero is 851 px tall in an 800 px viewport, so its bottom row is always cut off
     (`components/site/home2/hero.tsx`: `pt-32`, `clamp(…,5.6rem)` headline, `aspect-square
     max-w-[560px]` visual).
   - Content Studio's before/after slider is a 5:4 box ~800 px wide (`studio2/transform.tsx`).
   - The day-story stage is `h-screen` + `pt-16` inside a 550 vh track (`home2/day-story.tsx`):
     4,636 px of scrolling for five moments, and a large empty gap between the heading "From the first
     call to the last message…" (outside the pinned stage) and the stage itself. The progress bar
     collides with the moment text.
3. **Almost every page has the same design.** 14 channel/feature pages share one template
   (`components/site/story-page.tsx` + `lib/content/stories.ts`) and 49 industry pages share another.
   The custom Grow designs in `components/site/grow/` (`reviews-page.tsx`, `tool-pages.tsx`,
   `reply-stage.tsx`, `comment-deck.tsx`, `advisor-hero.tsx`, `insights-hero.tsx`, `winback-hero.tsx`)
   are **never shown**, because `app/product/[slug]/page.tsx` returns the story template first.
4. **The menu confuses.** Five of six items open large panels, each with a different layout (photo
   grids, phones, logo rows); "Contact" opens eight legal policies; there is no "Log in" link in the
   header.
5. **Plan labels everywhere** make the site feel gated.
6. **Inconsistent design**: page titles switch between the display font and bold Inter (Posting and
   Grow use Inter); 10 different card radii (20–48 px); 28 different hard-coded text sizes; the brand
   violet `#5b4ee6` typed by hand 99 times instead of a token.
7. **Too much reading, too little showing.** Most sections are heading + paragraph + cards of more
   paragraphs. The product (the dashboard) is shown only as small static screenshots.
8. **The Instagram DM / Messenger / WhatsApp story is invisible** on the home page: logos appear, but
   nothing says "we answer your Instagram DMs".
9. **Content Studio opens with a confusing before/after slider** where the phone photo and the
   "AI-styled post" look almost the same, and it shows the raw generation prompt ("Turn this phone
   photo into a premium social media post photo…") to visitors.
10. **Content that waits for animation.** Several sections start invisible/blurred and only appear
    after an animation; in a background tab the industry hero stayed blurred. Content must be visible
    without animation; animation is an enhancement.
11. Dead code: `components/site/hero-scene.tsx`, `home/flow-map.tsx`, `home/daily-week.tsx`,
    `studio/intro.tsx` are imported by nothing.
12. "Get started" points at the dashboard **login** URL (`lib/site.ts`: `START_URL = LOGIN_URL`).
    Confirm the dashboard's `/signup` and ask the owner at checkpoint 1 whether "Get started" should go
    to sign-up and a separate "Log in" link to login.

### The owner's own flagged list (every item must be resolved — tick them in your final report)

| # | Owner said | Where it's resolved |
|---|---|---|
| 1 | "Not a front desk, a business partner" | §2, Home §8.1 |
| 2 | Remove "Calls and messages · Answered 24/7 / Bookings · Made on the spot / Posts (Growth, Pro) · Made for you" | Home §8.1 |
| 3 | Change "Every way customers reach you. One AI that knows your business." | Home §8.3 |
| 4 | The gap between the scrolling section and "From the first call…"; make the scrolling story far better | Home §8.4 |
| 5 | At 100% zoom you can't see the whole thing — everywhere | §6.1 Fit rule, §11 QA |
| 6 | Add posting to the landing page with a new scrolling design showing content posted to each platform, different photo/video per platform | Home §8.7 |
| 7 | Don't mention plans (Growth/Pro) on the landing page | §4.8 |
| 8 | Remove "Want to ask a person" | §4.9 |
| 9 | Remove the plan section from the landing page | §4.10 |
| 10 | Landing page never says we answer Instagram and Messenger DMs and others | Home §8.3 |
| 11 | Content Studio: what is that thing at the start? Same 100% issue | Content Studio §9.6 |
| 12 | Remove "From a phone photo to a post and video" | Content Studio §9.6 |
| 13 | Prompt → generate image/video motion design, shown once (not per business) | Content Studio §9.6 |
| 14 | 3D section: make your own brand images and videos with your logo | Content Studio §9.6 |
| 15 | Then: you can upload your own photos and videos | Content Studio §9.6 |
| 16 | End: the right shape for every app | Content Studio §9.6 |
| 17 | Landing page presents everything we offer and shows the dashboard | Home §8.6, Product tour §9.1 |
| 18 | Every offering gets its own page explaining clearly how it works and how to do it | §9 |
| 19 | Industries and Contact pages are good — keep them, change only what's needed | §10 |

---

## 6. Experience principles (the UX contract)

### 6.1 The fit rule (non-negotiable)
- Design and test **first at 1366×650** (a Windows laptop at 100% zoom, after browser chrome), then
  1440×800, 1536×730, 1920×1080, 768×1024 and 390×844.
- **Every first screen** (hero) must show eyebrow, headline, one-sentence promise, primary button and
  the hero visual **fully**, within `100svh − header`. Nothing important below the fold of the hero.
- **Every pinned/sticky scene** has a stage of at most `100svh − header − 24px`, and everything inside
  it is visible at 1366×650.
- **No section taller than the viewport unless it scrolls naturally** (lists, articles).
- Use height-aware sizing: e.g. `font-size: clamp(2.4rem, min(6vw, 9svh), 5.5rem)`; media
  `max-height: calc(100svh - var(--header-h) - 120px)`; container queries for cards. Never size a
  visual by width alone.
- No horizontal page scroll at any width. 16 px minimum side gutter on phones.

### 6.2 Clarity
- **Five-second test** for every hero: what it is, who it's for, what to do next.
- **One idea per screen.** If a section needs two headings, it's two sections — or one is cut.
- Headlines say an outcome in the owner's words ("Every call answered, even when you're under a sink"),
  not a feature name ("AI voice agent").
- Body copy: short sentences, everyday words, reading age ~12. Max ~45 words per paragraph, max two
  paragraphs per section. Prefer a labelled visual over a paragraph.
- Never use: omnichannel, LLM, agentic, workflow automation, leverage, seamless, robust, AI-powered
  (as filler), "unlock", "supercharge", "revolutionise".
- Spelling: today's copy is British ("colour", "honoured"). The market is US and Canada — ask the
  owner at checkpoint 1; recommend American English.

### 6.3 Navigation and wayfinding
- A visitor must always know where they are (active nav state, breadcrumb on inner pages) and what to
  do next (one primary button per screen, cyan; one secondary at most).
- Every feature page ends with "Works together with" (3 related features) and the call to action.
- Every page reachable in ≤ 2 clicks from the header.

### 6.4 Show the product
- Prefer a **live, coded mock-up of the real dashboard** (animated, crisp at any size, light theme)
  over a screenshot. Build them as React components that mirror `../ringpost/apps/dashboard` styling
  and fill them with realistic, name-free demo data. Screenshots in `public/screens/*.webp` may be
  used only as fallbacks.
- Every product claim on a page is paired with the screen where the owner would see it.

### 6.5 Accessibility and robustness
- WCAG 2.2 AA: contrast ≥ 4.5:1 for text (the faint pricing hero text today fails), visible focus,
  full keyboard use of menus, tabs, sliders and demos; `aria` on every custom control; skip link kept.
- **Content first, motion second**: all text and key visuals are in the server-rendered HTML and
  visible with JavaScript off or before animations run. No section starts at `opacity: 0` without a
  no-JS/no-animation fallback that shows it.
- `prefers-reduced-motion`: replace 3D and scroll scenes with still frames and stacked layouts; no
  autoplay video.
- Touch targets ≥ 44 px. Hover-only interactions always have a tap/scroll equivalent.

### 6.6 Performance budgets (mid-range phone, 4G)
- LCP ≤ 2.5 s, CLS ≤ 0.05, INP ≤ 200 ms. Lighthouse ≥ 90 performance, 100 accessibility, 100 SEO on
  Home, Content Studio, Pricing and one feature page.
- 3D loads after first paint (dynamic import, `ssr: false`), shows a static poster first, renders at
  DPR ≤ 1.5 on phones, pauses when off-screen (`frameloop="demand"` or IntersectionObserver), and only
  **one WebGL canvas is active at a time** per page.
- Videos: H.264 MP4 (+ WebM if smaller), 720p max for loops, ≤ 2.5 MB each, `preload="none"`, webp
  poster, play only when visible.

---

## 7. Visual design system

Build this first, in code (`app/globals.css` tokens + `components/site/ui/*`), and replace every
hard-coded colour, radius and text size on every page you touch. Name tokens cleanly so they can be
synced to Figma later.

**Colour** (keep the brand, tighten its use — current tokens in `app/globals.css`):
- Base `#f7f8fa`, surface white, surface-2 `#f1f3f6`, border `#e3e7ed`, ink `#0b1b2b`, muted `#4a5666`.
- Brand violet `--rp-primary #5b4ee6` for accents, links and the ring; cyan `--rp-cta #22d3ee` with
  ink text **only** for the primary button and the ring's dot.
- One soft accent per product area, used for icons, chips and the area's 3D lighting:
  Answer = violet, Create = pink/magenta, Grow = green/amber — define exact tokens and check contrast.
- Gradients only in the 3D/glass layer and the brand ring; UI stays flat white.

**Type**: one display face for headlines (Schibsted Grotesk today — you may propose a stronger one at
checkpoint 1, e.g. a modern grotesk with real character; show both), Inter for UI and body.
Scale: Display / H1 / H2 / H3 / Body / Small — **6 sizes total**, all height-aware. Headlines tight
(−0.03 to −0.045em), body 1.55 line-height.

**Shape**: radii 12 / 20 / 32 only. One shadow family (soft, navy-tinted). 8-px spacing grid.
Section padding from one token pair (desktop/mobile).

**Components** (each with hover, focus, active, disabled states): Button (primary, secondary, text),
NavMenu + MegaPanel, Eyebrow, SectionHeading, FeatureCard, StepCard, Tabs, DeviceFrame (phone,
laptop, browser), AppScreen (per platform — reuse `components/site/phone/apps.tsx`), DashboardMock
(shell + panels), ChatThread, Chip/Badge, FAQ accordion, PlanCard, Breadcrumbs, Footer, CTA band,
VideoTile, Marquee.

**Iconography**: lucide, 1.75 stroke, inside a 40-px tinted rounded square; real brand logos only via
`components/site/channel-logos.tsx`.

**Photography and video**: warm, real-looking local businesses at work, all ten industries
represented; no stock-photo clichés (handshakes, headsets). See §13 for making media.

**Motion language**
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances; UI transitions 180–280 ms; scene changes
  500–800 ms.
- Scroll scenes: each moment gets 60–80 vh of scroll; a pinned scene never exceeds ~320 vh total.
  Never change scroll speed or block the wheel; always let a visitor scroll straight past.
- Text appears before or with its visual, never after; it stays still while being read.
- Micro-interactions: buttons lift 1–2 px, cards tilt ≤ 4°, chat bubbles type in, numbers count up
  once.

**The signature 3D object: the RingPost ring as "the Business Brain."** The open ring with its cyan
dot (already modelled in `components/site/home2/ring-canvas.tsx`) is the one 3D hero object of the
brand. It recurs with purpose: it *absorbs* business info on the home hero, becomes the *day clock* in
the day story, is the *brain* that knowledge orbits on the Business Brain page, and *emits* posts on
the Posting page. Glossy, clearcoat, soft iridescence, violet→cyan.

---

## 8. Home page — `/` (target ≤ 9 screens at 1440×900)

The home page presents **everything RingPost offers** and **shows the dashboard**, in this order. Each
section is one idea, one screen.

### 8.1 Hero (fits the fit rule)
- Eyebrow chip: **"Your AI business partner"** (remove "The AI front desk for local businesses").
- Headline: **"Tell it once. It runs the rest."** Show the owner the current "Your business, always
  on." as the alternative at checkpoint 1.
- Promise (one sentence): "Tell RingPost about your business once. It answers every call and message,
  books your customers, makes and posts your content, and helps you grow."
  Remove "You get on with the work. It handles the front desk."
- Buttons: **Get started** (primary) · **See it work** (scrolls to §8.4).
- **Removed:** the three-column row "Calls and messages / Bookings / Posts (Growth, Pro)".
- Visual (3D, right side on desktop, below on phone): the ring. Small cards of business info — "Prices",
  "Opening hours", "Your logo", "Services", "Policies" — drift in and are absorbed. Out the other side
  come results that settle around it: "Missed call → booked Thu 3:00 pm", "Instagram DM answered",
  "Post published on 5 apps", "Review answered". Max four visible at once; they must never overlap the
  ring or each other at any size. Mouse-parallax on desktop, gentle idle motion on phones.

### 8.2 "Tell it once" — the one-brain story
- Headline: "Five tools want your business details. RingPost needs them once."
- Visual: on scroll, five separate tool cards (answering service, booking app, designer, social media
  manager, consultant) each asking for "your prices, your hours, your services…" collapse into the
  ring; the ring then lights up the product areas: Answer, Book, Create, Post, Grow.
- Under it, three steps with tiny animated UI: **Import your website** → **Check what it learned** →
  **Switch on your channels**. Copy: "Most businesses are answering customers the same day."
  (only if true — otherwise "Set up in an afternoon, not a month.").

### 8.3 Every inbox, answered (fixes the missing DMs)
- Replace "Every way customers reach you. One AI that knows your business." with one of:
  - **"Calls, Instagram DMs, WhatsApp, Messenger, texts and email. All answered."** (recommended)
  - "However customers reach you, you answer first."
  - "Six ways in. One partner answering every one."
- Visual: a coded unified inbox. Messages arrive one by one, each labelled **in words** with its logo:
  "Instagram DM", "Facebook Messenger", "WhatsApp", "Text message", "Email", "Missed call". Each gets
  a reply typed in, then a green "Booked" chip. Clicking a channel logo filters to that thread.
- Three small proof chips under it: "Answers from your own prices and hours" · "Books into your
  calendar" · "Step in any time". Each links to its page.

### 8.4 One day at your business — rebuilt scroll story (`#see-it-work`)
- The heading lives **inside** the pinned stage (no gap). Whole scene ≤ ~320 vh.
- Left: the ring as a day clock filling from 7 am to midnight, the moment's time, title and two-line
  text. Right: the moment's live UI in a device frame. Progress segments sit under the text with real
  spacing; they never touch it.
- Moments (no plan badges): 7:02 am missed call called back and booked · 9:15 am Instagram DM asks a
  price and books · 12:30 pm a phone photo becomes today's post on five apps · 3:40 pm a two-star
  review gets a calm reply for approval · 6:00 pm "Your week, read for you" insight · 11:48 pm a
  WhatsApp message at midnight, booked before morning.
- Mobile/reduced motion: stacked cards, each playing once as it enters view.
- The whole stage fits at 1366×650.

### 8.5 (merged into 8.4 — do not add another "how it works" here)

### 8.6 See your dashboard — the product, presented
- Headline: "Everything in one place. Even if you're not a computer person."
- A large coded **DashboardMock** in a laptop frame (3D-tilted, flattens as it scrolls into view) with
  a tab rail matching the real sidebar: **Home · Inbox · Calendar · Knowledge · Media Library ·
  Approvals · Reviews & Comments · Win-back · Insights · Talk to AI**. Each tab swaps the screen with a
  smooth transition and shows a one-line caption in plain words ("Home: what happened today and what
  needs you"). Auto-advances every ~5 s until touched.
- Below it, a phone frame with the mobile bottom bar (Home, Inbox, Calendar, Approvals) — "Run it
  from your phone too" (confirm the dashboard works on phones in the browser; don't promise an app
  store app).
- Link: "Take the full tour" → `/product`.

### 8.7 Post everywhere — new scrolling platform showcase (owner's request)
- Headline: "Made once. Posted everywhere, the right way for each app."
- A horizontal, scroll-driven band (pinned while it moves, or a smooth auto-marquee that pauses on
  hover) of phone frames, **each a different platform in its own native look with different content**:
  Instagram Reel (salon video) · TikTok (gym clip) · Facebook post (restaurant dish) · YouTube Short
  (car detailing) · LinkedIn (accountant's tip) · X (shop offer) · Threads (café) · Pinterest pin
  (florist) · Bluesky (bakery) · Google Business update (plumber). Instagram first.
- Opening motion: one post card in the centre splits and flies into each phone, and each phone's
  caption types itself — showing that every platform gets its own caption and shape.
- Uses `components/site/phone/apps.tsx` / `platform-preview.tsx`; media made per §13.
- Links: "How Content Studio works" → `/content-studio`, "How posting works" → `/posting`.

### 8.8 Make content in seconds (teaser)
- A prompt box types "Saturday colour special, warm and bright"; an image renders in; it becomes a
  short video. One example, not one per business. Link to `/content-studio`. No plan label.

### 8.9 Then it helps you grow
- Four live tiles (reuse and polish `components/site/home/grow-tiles.tsx`): Reviews & comments,
  Win-back, Insights, Talk to AI — each animating its mini UI on view, each linking to its page.

### 8.10 Built for your kind of business
- Ten equal photo tiles (one per group) with group name; hover plays a 3-s loop. Link to
  `/industries`. Tiles must be equal height and aligned at every width.

### 8.11 The straight answers (trust)
- Four cards max: Always honest · You stay in charge · Your customers' data · Where it works.
  Links to Privacy / AI disclosure. **No** "Talk to a person" band.

### 8.12 Questions — four only (setup time, phone number, existing tools/calendar, cancelling).

### 8.13 Closing call to action
- One line ("Tell it once. Then get back to work."), **Get started**. No pricing summary.

**Remove from today's home:** the plans section, the "Want to ask a person first?" band, every plan
kicker, the 7-card trust grid, the product-comparison table (its message lives in §8.2).

---

## 9. One page per offering — every page explains how it works and how to do it

The owner wants every offering to have its own page that clearly explains what it is, how it works,
and **how the owner actually does it in the dashboard**. Every feature page uses the same **narrative
order** (so owners learn where to look) but **each page has its own signature hero visual and its
own signature interactive demo** — no two pages may look alike at a glance. Breadcrumb on all.

**Feature page order**
1. **Hero** — outcome headline, one-sentence promise, Get started, the page's signature visual. Fits
   the fit rule.
2. **The problem, in one line** — in the owner's words, e.g. "The phone rings while your hands are
   full." No numbers unless they come from a cited, real source; never invented RingPost stats. Small
   visual.
3. **How it works — 3 steps.** Each step: what *you* do, what *RingPost* does, and a coded UI moment
   that animates as the step is reached.
4. **Signature demo** — the page's unique interactive centrepiece (listed per page below).
5. **What your customer sees / What you see** — side by side: the customer's app on a phone; the
   owner's dashboard screen on a laptop.
6. **You're in control** — 3–4 controls with the exact setting name in the dashboard.
7. **Set it up — step by step.** Numbered, with mini screenshots/mocks of the actual dashboard path,
   e.g. "1. Open **Connections** → 2. Tap **WhatsApp** → 3. Log in with Facebook and pick your number
   → 4. Done — replies start straight away." Confirm each path in `../ringpost/apps/dashboard`.
8. **Works together with** — 3 related feature cards.
9. **Questions** — 4–6, real answers.
10. **Call to action** — Get started, plus the one quiet plan line (e.g. "Included in every plan" /
    "Included in Growth and Pro · See pricing").

### 9.1 Product tour — `/product`
The full guided tour of the dashboard for owners who want to see everything before signing up.
Sticky left rail = the real dashboard sidebar; scrolling walks through each screen as a large coded
mock with 2–3 hotspots per screen ("This is where bookings land"). Sections: Setup & Knowledge → Home →
Inbox → Calendar & Customers → Media Library & Content Studio → Approvals → Reviews & Comments →
Campaigns & Win-back → Insights → Talk to AI → Connections & Automation → Usage & Billing. Ends with
"Get started". This page is the "show them the dashboard" page the owner asked for.

### Answer
**9.2 Calls — `/calls`** (AI phone answering + missed-call callbacks)
- Hero visual: a 3D phone ringing with a live waveform; the call transcript types in; a booking card
  drops into a calendar.
- Signature demo: **"Hear it"** — a play button with a real recorded sample call (generate a short
  natural voice sample if none exists; no person names) and a scrubbable transcript; plus a missed-call
  timeline: "Rang out 7:02 → called back 7:03 → booked 7:05".
- Keep the "call your new number and hear it yourself" note.
- Set up: choose your number (US/Canada) → forward your existing number or use the new one → choose
  greeting and hand-over rules in Knowledge.

**9.3 Messages — `/messages`** (WhatsApp, Instagram DMs, Facebook Messenger, texts, email)
- Hero visual: five app icons orbiting the ring; messages fly in and replies fly out.
- Signature demo: **channel tabs** (WhatsApp · Instagram DMs · Messenger · Texts · Email). Each tab
  plays a short conversation **in that app's real look** that ends in a booking; deep-linkable
  (`/messages#whatsapp`).
- Must say: keep your WhatsApp app on your phone; replies in the customer's language; texts send
  reminders and honour STOP; email replies stay in the same thread.
- Set up per channel (Connections page paths).

**9.4 One inbox — `/inbox`**
- Hero visual: many conversations sorting themselves into one clean list, "Needs you" on top.
- Signature demo: click a thread → read it → press **Take over** → the AI steps back (show the state
  change) → **Hand back**.

**9.5 Bookings & calendar — `/booking`**
- Hero visual: a 3D calendar week where bookings drop into each team member's column.
- Signature demo: pick a service and a team member → see live free slots → "Booked" → the Google
  Calendar event appears alongside → reminder text preview.
- Be explicit about the Vagaro/Fresha/Mindbody/Jobber/OpenTable limit and the Google Calendar
  workaround.

**9.6 Business Brain — `/brain`** (Knowledge — the "tell it once" page)
- Hero visual: the ring as a brain; knowledge chips (services, prices, hours, team, policies, FAQs,
  logo, tone) orbit and click into it.
- Signature demo: **"Watch it learn"** — paste a website address (fake input, demo only) → chips fill
  the Knowledge sections with a progress bar → a "gaps" banner suggests 3 questions → answer one →
  progress rises. Then show that one change flows to calls, messages, posts and Talk to AI.
- This page is the clearest expression of the positioning — give it the most care after the home page.

### Create
**9.7 Content Studio — `/content-studio`** (owner's exact structure; remove the current hero slider,
the raw prompt text and the "From a phone photo to a post and a video" gallery)
1. **Hero — prompt to creation, shown once.** A large, beautiful prompt box. Text types: "Weekend
   brunch special, warm morning light, our logo in the corner". Press **Create** → an image resolves
   in (soft reveal, not a progress bar) → it turns into a short video that plays → a caption appears
   under it. One generic sequence for everyone (not one per business). A small, quiet row of finished
   examples from different industries sits under it to show it works for any business. Fits at
   1366×650. Headline idea: "Type an idea. Get a post." Promise: "Images and short videos made for
   your business, with your logo and your offer, in seconds."
2. **Your brand on everything (3D).** A floating, mouse-tiltable 3D stack of images and video frames;
   the business's logo, colours and offer drop onto each one in turn. "Your logo, your colours, your
   offer — on every image and video."
3. **Or use your own photos and videos.** A phone camera roll slides in, a photo is dragged into the
   upload box, a progress ring completes, and a caption is written from a quick note ("Peonies are in.
   Same-day bouquets."). Limits: 20 MB photos / 100 MB videos, formats, resumes after a dropped signal.
4. **Fresh posts every morning.** Cadence picker (1 a day / 3 a week / 2 pictures + 1 video a week) →
   a Media Library "this morning" shelf fills.
5. **Checked before you see it.** Words on images come from your own details and are checked; you see
   the credit cost before anything is made; failed ones give credits back.
6. **The right shape for every app (end of page).** One image morphs smoothly between square 1:1,
   portrait 4:5, tall 9:16 and wide 16:9; platform logos snap onto the matching frame (Instagram feed,
   Reels/Stories/TikTok/Shorts, Facebook/YouTube/LinkedIn).
7. Questions (4–5), CTA with "Included in Growth and Pro".

**9.8 Posting — `/posting`**
- Hero visual: the ring emits one post into a fan of phones (Instagram, TikTok, LinkedIn…).
- Signature demo: keep and polish the composer (`components/site/posting/composer.tsx`): choose
  content → toggle platforms (Instagram first) → switch the phone between apps to see each version
  with its own pre-written caption. Per the owner's earlier rule: **no** schedule / post now / send to
  approvals buttons in the demo.
- Then: a week calendar of scheduled posts across industries; "a result for every platform" with a
  failed-then-retried example; upload journey (from `posting/sections.tsx`).

### Grow
Use and polish the existing unused custom designs in `components/site/grow/` as the signature demos.
**9.9 Reviews & comments — `/reviews`**: comment deck and reply stage — Google review and Instagram/
TikTok/Facebook comments arrive, a reply in your voice drafts, you approve; plus review requests after
every visit, low ratings to you first.
**9.10 Win-back — `/win-back`**: customers sort into groups (Slipping away, Lapsed, Long gone, Never
booked) with counts → pick a group → a friendly message drafts → bookings appear. Confirm channels.
**9.11 Campaigns — `/campaigns`**: plan an offer once ("Quiet Tuesday −20%"); see it become posts,
messages and a schedule. Confirm what Campaigns does in the dashboard before writing; if it is too thin
for a page, fold it into Win-back and tell the owner.
**9.12 Insights — `/insights`**: charts that build on scroll — where customers come from by channel,
busiest hours, questions people keep asking, which posts worked — each with a one-line plain-English
reading.
**9.13 Talk to AI — `/talk-to-ai`**: a large chat where suggested questions ("How did last month go?",
"Which day should I run an offer?") are answered with typing animation, numbers and a small chart.

### 9.14 Information architecture, nav and redirects

**Header** (64 px, glass on scroll):
`Product ▾ · Industries ▾ · Pricing · Contact` … `Log in` · **Get started**
- **Product panel** — one clean panel, three columns with the same card style:
  Answer (Calls, Messages, One inbox, Bookings & calendar, Business Brain) ·
  Create (Content Studio, Posting) ·
  Grow (Reviews & comments, Win-back, Campaigns, Insights, Talk to AI),
  plus one feature card "Take the product tour →". Icon + name + one line each. No photo grids, no
  phones inside menus.
- **Industries panel** — ten equal tiles (icon, name), "All industries →".
- Legal, Blog, FAQ, About go to the footer only.
- Mobile: full-screen sheet, big rows, accordions for Product and Industries, Get started pinned to
  the bottom.
- This replaces the owner's 2026-11-06 menu (Channels, Content Studio, Grow, Industries, Pricing,
  Contact). Show both at checkpoint 1 and let the owner choose.

**Footer**: 4 columns (Product, Industries, Company — About, Contact, Blog, FAQ, Legal), Log in,
socials (`lib/social-profiles.ts`), a small static ring mark.

**Redirects** (permanent, in `next.config.mjs`): `/channels` → `/messages`; `/channels/phone` →
`/calls`; `/channels/{whatsapp,instagram,messenger,sms,email}` → `/messages#…`; `/product/ai-receptionist`
→ `/calls`; `/product/inbox` → `/inbox`; `/product/booking` → `/booking`; `/product/knowledge` →
`/brain`; `/product/reviews` → `/reviews`; `/product/winback` → `/win-back`; `/product/insights` →
`/insights`; `/product/advisor` → `/talk-to-ai`; `/grow` → `/product#grow` (or keep a slim Grow
overview if the owner prefers); `/resources` → `/resources/blog`. Remove the story template and
`lib/content/stories.ts` only after every page using it is replaced (reuse its good copy).

**Keep and update** for search engines and AI assistants: `app/sitemap.ts`, `robots.ts`, JSON-LD on
home, OG images per page (`lib/og.tsx`), `llms.txt`, `llms-full.txt`, `assistant-knowledge.json`,
`feed.xml`, `lib/site-knowledge.ts` (the chat widget's knowledge) — all pointing at the new URLs.

---

## 10. Pages to keep (light touch only)

**Industries** (`/industries`, `/industries/[slug]`) and **Contact** (`/contact`) are approved by the
owner. Change only:
- New header, footer, tokens, type scale and buttons (so they match).
- Fit-rule fixes at 1366×650.
- Content visible without waiting for animation (the hero blur reveal).
- Remove any plan badges and "front desk" brand phrasing (SEO titles like "AI receptionist for
  dentists" may stay).
- Keep the 49 trade pages, the sparse-page `noindex` logic and the group pages' structure.
If you believe something bigger should change, propose it at a checkpoint with a screenshot; don't
just do it.

**Pricing** (`/pricing`) — refine, don't reinvent:
- Short hero ("Start at $39 a month."), monthly/yearly switch, 4 plan cards + Business **fully visible
  at 1366×650** with 5 key lines each and "See everything" expanding the full list; a comparison table
  with a sticky header; 5 billing questions; fix the low-contrast hero text. All numbers from
  `data/plans.json`.

**About** — who RingPost is for, the "tell it once" story, a short founder note (ask the owner for it;
don't invent biography), the company's legal name from `lib/site.ts`. One page, ≤ 3 screens.

**FAQ** — grouped (Setup, Calls & messages, Content & posting, Billing, Your data), with search; reuse
`lib/content/faq.ts`.

**Blog** (`/resources/blog`, 20 MDX posts) — featured post + grid, readable article layout (~680 px
measure), related posts, CTA at the end. Do not rewrite posts except to remove "front desk" branding.

**Legal** (7 pages) — one calm reading layout with a table of contents; content unchanged.

**404** — friendly, with the ring and links to Home, Product tour and Contact.

**Chat widget** ("Ask a question") — keep; smaller on phones; must never cover a primary button or the
cookie/consent area; update its knowledge to the new pages.

---

## 11. Quality checks before every checkpoint

For **every** page you built or touched:
1. Screenshots at 1366×650, 1440×800, 1920×1080, 768×1024, 390×844 — first screen and every pinned
   scene. Check: nothing cut off, nothing overlapping, nothing misaligned, no horizontal scroll.
2. Reduced-motion screenshot of the same.
3. JavaScript-disabled render: all headings, copy and key images present.
4. Keyboard pass: menus, tabs, demos, accordions, sliders.
5. Lighthouse (mobile) on Home, Content Studio, Pricing and one feature page against §6.6.
6. Console: zero errors and warnings; `npm run build` passes; lint and type check pass.
7. Copy pass: no plan labels on home; no "front desk"; no model names; no disclaimers; no person names;
   no invented stats or testimonials; every claim traceable to §3 or the code.
8. Owner's flagged list (§5 table): every row ticked with a screenshot.
Report results honestly — what passed, what failed, what you couldn't check.

---

## 12. Phases and checkpoints (stop and wait for the owner's go after each)

1. **Foundation** — read everything; confirm the truth sheet against code; design tokens and core
   components; header, mobile menu, footer; home §8.1–8.3 built. Show: both headline options, both
   menus, the display-font option, the spelling question, the "Get started → sign-up?" question, and
   the baseline-commit question.
2. **Home complete** — §8.4–8.13, including the rebuilt day story, the dashboard showcase and the
   post-everywhere band (with placeholder media where final media isn't made yet — clearly tell the
   owner which).
3. **Answer pages** — Product tour, Calls, Messages, Inbox, Bookings, Business Brain, redirects.
4. **Create pages** — Content Studio (owner's structure exactly), Posting, and all media generated
   (§13).
5. **Grow pages** — Reviews & comments, Win-back, Campaigns, Insights, Talk to AI.
6. **Finish** — Pricing, About, FAQ, Blog, Legal, 404, Industries/Contact touch-ups, SEO/AI files,
   chat-widget knowledge, dead-code removal, full QA report (§11) as
   `docs/WEBSITE-REDESIGN-REPORT-2026-11.md`.

---

## 13. Images and video

- Reuse what exists first: `public/showcase/` (10 groups × phone photo / post / video, made
  2026-11-11), `public/made/`, `public/screens/`.
- Make new media with the **ImagineArt MCP** (`generate_image`, `generate_video`, batch variants;
  check `get_balance` first). Needed at minimum: 10 platform-native posts for §8.7 (different industry
  and format per platform, including vertical videos for Reels/TikTok/Shorts); the Content Studio hero
  sequence (one generic prompt → image → video); the brand-3D textures (images and frames with a
  sample logo); ten industry loop videos (3–5 s) for §8.10; a calendar/booking-themed hero still if
  needed.
- Budget: ask the owner before spending more than **3,000 credits** in total.
- Style: warm natural light, real-looking local businesses, no text baked into images (add words in
  HTML so they're crisp and translatable), no visible faces close-up where avoidable, no brand logos
  other than the sample business's own.
- Keep originals in `~/Documents/ringpost-showcase-originals/`, web versions in `public/` (webp
  images; MP4 ≤ 2.5 MB; webp posters). No "made with AI" captions (§4.3).
- The sample voice call for `/calls`: natural, calm, short (≤ 40 s), the AI introducing itself as the
  business's virtual assistant, no person names.

---

## 14. Technology

- Keep: Next.js 16.4 App Router, React 19, Tailwind CSS 4, lucide-react, `three` 0.183 +
  `@react-three/fiber` 9 (already installed), Vercel Analytics, the existing CSP in `next.config.mjs`
  (it already allows `https:` images and media; keep scripts self-hosted).
- Add (justify each in your report): `@react-three/drei` (environment, materials, `View` for several
  3D scenes sharing one canvas), **GSAP + ScrollTrigger** for scroll-driven scenes and timelines,
  **Lenis** for smooth scrolling (disabled under reduced motion and on touch if it hurts native feel).
  CSS for small interactions. Nothing else heavy.
- Structure: `components/site/ui/` (design system), `components/site/three/` (all WebGL, lazy),
  `components/site/mocks/` (DashboardMock, AppScreens, ChatThread), `components/site/sections/`
  (reusable sections), one folder per page for its signature demo. Content (copy) in `lib/content/*`,
  not inline in JSX.
- No new pages may hard-code prices or plan features.

---

## 15. Final deliverable

A rebuilt, uncommitted website in `ringpost-landing` that:
- Tells a stranger what RingPost is within five seconds on every hero.
- Presents everything RingPost does on the home page and shows the dashboard working.
- Gives every offering its own clear page explaining how it works and how to set it up, each with its
  own signature visual.
- Fits at 100% zoom on a 1366×650 laptop and on phones, with nothing cut off or misaligned.
- Looks like a premium, modern B2B AI company — 3D and motion with purpose — and feels effortless.
- Keeps Industries and Contact as approved, refined to match.
- Passes §11, with an honest report in `docs/WEBSITE-REDESIGN-REPORT-2026-11.md`.

Then stop. Figma comes next, only after the owner approves the site.
