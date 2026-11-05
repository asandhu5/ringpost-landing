import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { HeroWords, LiveDesk } from "@/components/site/hero-scene";
import { UspCompare } from "@/components/site/product-comparison";
import { LogoCloud, SeeAll, Showcase, VideoWall } from "@/components/site/product-showcase";
import { GROUP_ICONS } from "@/components/site/group-page";
import { GROUP_INFO } from "@/lib/content/groups";
import { siteVideos } from "@/lib/content/videos";
import { InViewGroup } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink, Container, Eyebrow, H2, JsonLd, Lede, Section } from "@/components/site/ui";
import { TYPES } from "@/lib/content/industries";
import { COMPANY, START_URL, SITE } from "@/lib/site";
import { BusinessExplorer } from "@/components/site/business-explorer";

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
  ...(COMPANY.registrationNumber ? { identifier: COMPANY.registrationNumber } : {}),
};

/**
 * The home page (redesigned 2026-10-30, light, to match the dashboard): the promise and a
 * live demo up top, then the one thing nobody else does — calls, messages on every
 * channel, bookings, content, posting, comments, insights and Talk to AI in one platform
 * — in plain words, with the specifics one switch away. Real (RingPost-made) photos tell
 * the after-hours story. The full plan table lives on /pricing.
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
  // One video per industry, so the home page shows every kind of business.
  const videos = siteVideos().filter((v, i, all) => all.findIndex((x) => x.group === v.group) === i).slice(0, 9);

  const cta = (
    <a href={START_URL} className="rp-cta-shine inline-flex h-12 items-center rounded-full bg-cta px-7 text-[15.5px] font-semibold text-[var(--rp-cta-ink)] shadow-[0_18px_50px_-15px_rgba(34,211,238,0.85)] transition-colors hover:bg-[var(--rp-cta-hover)]">
      Get started
    </a>
  );

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />

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

      {/* Six jobs, each shown in the real dashboard */}
      <Section className="!pt-4"><Container><BusinessExplorer /></Container></Section>
      <Section className="!pt-6">
        <Container>
          <Reveal className="mx-auto mb-6 max-w-4xl text-center">
            <Eyebrow>One platform</Eyebrow>
            <H2>From the first enquiry to your next campaign.</H2>
            <Lede className="mx-auto mt-4">Explore the tools. See how they work together.</Lede>
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

      {/* Content Studio: real videos */}
      {videos.length > 0 && (
        <Section className="!pt-0">
          <Container>
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <Eyebrow>Content Studio</Eyebrow>
                <H2>Posts that look like your business, made every day.</H2>
                <Lede className="mt-4">Each of these began as a single photo and became a short video in minutes, ready for Reels and TikTok. For every kind of business.</Lede>
              </div>
              <SeeAll href="/content-studio">See Content Studio</SeeAll>
            </Reveal>
            <VideoWall videos={videos} />
          </Container>
        </Section>
      )}

      {/* Industries */}
      <Section className="!pt-0">
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
