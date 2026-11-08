import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Send, Sparkles } from "lucide-react";
import { HeroWords, LiveDesk } from "@/components/site/hero-scene";
import { UspCompare } from "@/components/site/product-comparison";
import { SeeAll, Showcase } from "@/components/site/product-showcase";
import { FlowMap } from "@/components/site/home/flow-map";
import { ChannelLogo } from "@/components/site/channel-logos";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen } from "@/components/site/phone/apps";
import { POST_PLATFORMS } from "@/lib/content/platforms";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";
import { DailyWeek } from "@/components/site/home/daily-week";
import { GrowTiles } from "@/components/site/home/grow-tiles";
import { GROUP_ICONS } from "@/components/site/group-page";
import { GROUP_INFO } from "@/lib/content/groups";
import { InViewGroup } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink, Container, Eyebrow, H2, JsonLd, Lede, Section } from "@/components/site/ui";
import { TYPES } from "@/lib/content/industries";
import { PLANS } from "@/lib/plans";
import { COMPANY, START_URL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: your AI business partner. Answers, books, grows.` },
  description: SITE.description,
  openGraph: { title: `${SITE.name}: your AI business partner`, description: SITE.description, url: "/" },
};

/** Organization on the site root: no address, and contact details live on /contact. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: COMPANY.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description: SITE.description,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${SITE.url}/contact` },
  ...(COMPANY.registrationNumber ? { identifier: COMPANY.registrationNumber } : {}),
};

/** The product itself, with its current price range, so search engines and AI
 * assistants can say what it is and what it costs. Prices come from the plan catalog. */
const PRODUCT = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android (in the browser)",
  audience: { "@type": "BusinessAudience", audienceType: "Local and small businesses" },
  featureList: [
    "AI receptionist that answers phone calls 24/7",
    "Missed-call callbacks",
    "Books, moves and cancels appointments in the business's calendar",
    "Answers WhatsApp, Instagram, Facebook Messenger and email",
    "Daily social media images, videos and posting",
    "Replies to reviews and social comments",
    "Customer win-back and business insights",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: Math.min(...PLANS.map((p) => p.monthlyUsd)),
    highPrice: Math.max(...PLANS.map((p) => p.monthlyUsd)),
    offerCount: PLANS.length,
    url: `${SITE.url}/pricing`,
  },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

/**
 * The home page: the promise and a live demo up top, then the one thing nobody else does —
 * calls, messages on every channel, bookings, content, posting, comments, insights and Talk
 * to AI in one platform — in plain words, with the specifics one switch away. Real
 * (RingPost-made) photos tell the after-hours story. The full plan table lives on /pricing.
 */
/** The site itself: tells search engines the site's name, so results read "RingPost". */
const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

export default function HomePage() {
  const cta = (
    <a href={START_URL} className="rp-cta-shine inline-flex h-12 items-center rounded-full bg-cta px-7 text-[15.5px] font-semibold text-[var(--rp-cta-ink)] shadow-[0_18px_50px_-15px_rgba(34,211,238,0.85)] transition-colors hover:bg-[var(--rp-cta-hover)]">
      Get started
    </a>
  );

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />
      <JsonLd data={PRODUCT} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden className="rp-orb rp-orb-a pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full" />
        <div aria-hidden className="rp-orb rp-orb-b pointer-events-none absolute -right-24 top-40 h-[360px] w-[360px] rounded-full" />
        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div>
              <p className="rp-enter rp-enter-1 rp-brand-ring mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold text-ink">
                <span className="rp-live-dot h-2 w-2 rounded-full bg-[#16a34a]" /> Your AI business partner
              </p>
              <HeroWords
                text="Answer every customer. Grow every day."
                highlight={["customer", "Grow"]}
                className="text-[clamp(2.6rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink"
              />
              <p className="rp-enter rp-enter-3 mt-6 max-w-xl text-lg leading-relaxed text-muted-ink sm:text-xl">
                One AI that answers your calls and messages, books appointments, makes and posts your content, and tells you what&apos;s working.
              </p>
              <div className="rp-enter rp-enter-4 mt-8 flex flex-wrap items-center gap-3">
                {cta}
                <ButtonLink href="/pricing" variant="ghost">
                  See pricing
                </ButtonLink>
              </div>
              <ul className="rp-enter rp-enter-5 mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-muted-ink">
                {["Your business knowledge", "Keep your number", "You control autopilot"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-[#16a34a]" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rp-enter rp-enter-2">
              <LiveDesk />
            </div>
          </div>
        </Container>
      </section>

      {/* The whole product in one picture */}
      <Section>
        <Container>
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <H2>Every way customers reach you. One AI that knows your business.</H2>
            <Lede className="mx-auto mt-4">Calls and messages come in from everywhere. RingPost answers them from your own prices, hours and policies, books them in, and keeps your feeds and reviews looked after.</Lede>
          </Reveal>
          <FlowMap />
        </Container>
      </Section>

      {/* One tour of the real dashboard */}
      <Section>
        <Container>
          <Reveal className="mx-auto mb-6 max-w-4xl text-center">
            <H2>See it in your dashboard.</H2>
            <Lede className="mx-auto mt-4">Each job RingPost does, in the screens you will use.</Lede>
          </Reveal>
          <Showcase />
        </Container>
      </Section>

      {/* The USP */}
      <Section>
        <Container>
          <Reveal>
            <UspCompare />
          </Reveal>
        </Container>
      </Section>

      {/* Content: two products, each its own card */}
      <Section className="!pt-0">
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <H2>Posts that look like your business, without the work.</H2>
            <Lede className="mt-4">Make the content, then put it everywhere your customers scroll. Two tools that work together.</Lede>
          </Reveal>
          <div className="grid gap-7 lg:grid-cols-2">
            <Link href="/content-studio" className="rp-feature-card group flex flex-col overflow-hidden rounded-[30px] border-2 border-[#ddd8ff] bg-[linear-gradient(160deg,#f6f4ff_0%,#ffffff_55%)]">
              <span className="grid grid-cols-2 gap-2 p-3">
                {INDUSTRY_SHOWCASE.filter((x) => ["beauty-and-wellness", "food-and-drink", "auto", "stays-and-venues"].includes(x.slug)).map((x) => (
                  <span key={x.slug} className="relative block overflow-hidden rounded-[20px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.after} alt={`${x.group}: ${x.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[11.5px] font-semibold text-ink">{x.group}</span>
                  </span>
                ))}
              </span>
              <span className="flex flex-1 flex-col p-7 pt-4">
                <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b4ee6] text-white"><Sparkles className="h-5 w-5" aria-hidden /></span><span className="text-[22px] font-bold tracking-tight text-ink">Content Studio</span></span>
                <span className="mt-3 block text-[16px] leading-relaxed text-muted-ink">Your phone photo or one line, made into images and short videos for your kind of business, with your logo and offer on them.</span>
                <span className="mt-auto pt-5 text-[15px] font-semibold text-[#5b4ee6]">Step inside the studio <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </span>
            </Link>
            <Link href="/posting" className="rp-feature-card group flex flex-col overflow-hidden rounded-[30px] border-2 border-[#bdeffa] bg-[linear-gradient(160deg,#effcff_0%,#ffffff_55%)]">
              <span className="relative block h-[300px] overflow-hidden sm:h-[340px]">
                <span className="absolute left-1/2 top-6 w-[190px] -translate-x-1/2 transition-transform duration-700 group-hover:-translate-y-2"><IPhone16ProMax width={190}><AppScreen platform="instagram" post={{ media: { kind: "image", src: "/made/studio/florist-post.webp", alt: "A bouquet post on Instagram" }, business: { name: "Bloom & Stem", handle: "bloomandstem", color: "#8a5cf6" }, caption: "Peony season is here. Same-day bouquets, wrapped and ready to go." }} /></IPhone16ProMax></span>
                {POST_PLATFORMS.filter((x) => x.id !== "instagram").map((x, i) => {
                  const left = i < 4;
                  const row = i % 4;
                  return <span key={x.id} title={x.name} className="absolute hidden sm:block" style={{ [left ? "left" : "right"]: `${8 + (row % 2) * 9}%`, top: `${12 + row * 21}%` }}><ChannelLogo id={x.id} size={42} /></span>;
                })}
              </span>
              <span className="flex flex-1 flex-col p-7 pt-4">
                <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0891b2] text-white"><Send className="h-5 w-5" aria-hidden /></span><span className="text-[22px] font-bold tracking-tight text-ink">Posting and uploads</span></span>
                <span className="mt-3 block text-[16px] leading-relaxed text-muted-ink">Upload from your phone or pick what Content Studio made. Each platform gets its own caption, and you see the post in every app before it goes out.</span>
                <span className="mt-4 flex flex-wrap gap-1.5">{POST_PLATFORMS.map((x) => <span key={x.id} title={x.name}><ChannelLogo id={x.id} size={26} /></span>)}</span>
                <span className="mt-auto pt-5 text-[15px] font-semibold text-[#0e7490]">See it in every app <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </span>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Daily content */}
      <Section tone="surface">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <H2>Something new every morning.</H2>
            <Lede className="mt-4">Switch on daily content and your Media Library fills itself: up to three fresh pictures a day and a 30-second video each week, depending on your plan. Nothing is posted until you pick it.</Lede>
          </Reveal>
          <DailyWeek />
        </Container>
      </Section>

      {/* Grow */}
      <Section>
        <Container>
          <Reveal className="mb-10 max-w-2xl">
            <H2>Then it helps your business grow.</H2>
            <Lede className="mt-4">Reviews and comments answered in your voice, quiet customers brought back, and a clear view of what&apos;s working, with an AI you can ask about any of it.</Lede>
          </Reveal>
          <GrowTiles />
        </Container>
      </Section>

      {/* Industries */}
      <Section>
        <Container>
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Industries</Eyebrow>
              <H2>Set up for your kind of business.</H2>
              <Lede className="mt-4">{TYPES.length} kinds of business, each with its own rules for what to say, what to hand to you and how to book.</Lede>
            </div>
            <SeeAll href="/industries">All industries</SeeAll>
          </Reveal>
          <InViewGroup className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {GROUP_INFO.map((g) => {
              const Icon = GROUP_ICONS[g.icon];
              return (
                <Link key={g.slug} href={`/industries/${g.slug}`} className="rp-card rp-card-hover group flex flex-col items-start gap-3 rounded-2xl p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110" style={{ background: `${g.tone}18`, color: g.tone }}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-[15px] font-semibold leading-tight text-ink">{g.name}</span>
                </Link>
              );
            })}
          </InViewGroup>
        </Container>
      </Section>

      {/* Plans, in two families (the table lives on /pricing) */}
      <Section className="!pt-0">
        <Container>
          <Reveal className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div className="flex flex-col justify-center">
              <Eyebrow>Plans</Eyebrow>
              <H2>Start small. Grow into the rest.</H2>
              <Lede className="mt-4">Begin with calls and messages. Add content, reviews and insights when you&apos;re ready.</Lede>
            </div>
            <div className="rp-card rounded-3xl p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">Starter and Essential</p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-ink">Never Miss a Customer</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Every call and message answered on every channel, bookings made, reminders sent. Perfect if you don&apos;t do social media.</p>
            </div>
            <div className="rp-brand-ring rounded-3xl p-7">
              <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">Growth and Pro</p>
              <p className="mt-3 text-2xl font-bold tracking-tight text-ink">Grow on Autopilot</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">Everything above, plus daily posts made for you, posting everywhere, Talk to AI, then replies to comments and reviews, campaigns and insights.</p>
              <Link href="/pricing" className="mt-5 inline-flex text-[14.5px] font-semibold text-[#5b4ee6] hover:underline">
                See plans and pricing →
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>

    </>
  );
}
