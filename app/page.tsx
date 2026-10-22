import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/site/hero";
import { HomeBento, HomeStats, HomeStory } from "@/components/site/home-sections";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Marquee } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink, Container, H2, JsonLd, Lede, Section } from "@/components/site/ui";
import { CHANNELS } from "@/lib/content/channels";
import { DEEP, TYPES, shortLabel, slugFor } from "@/lib/content/industries";
import { GUARDRAILS, PROBLEM } from "@/lib/content/platform";
import { COMPANY, SIGNUP_URL, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: the AI front desk for local businesses` },
  description: SITE.description,
  openGraph: { title: `${SITE.name}: the AI front desk for local businesses`, description: SITE.description, url: "/" },
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
 * The home page (redesigned 2026-10-22): what RingPost is and Zara up top, every trade on
 * a ribbon, one evening told scroll by scroll, the product as a bento grid, the numbers,
 * the guardrails, then one call to action. Prices live on /pricing only.
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
  const channels = CHANNELS.filter((c) => c.availableToBusinesses);
  const trades = TYPES.filter((t) => DEEP[t.id]);

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />

      <HomeHero>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-ink">It answers your calls and messages day and night, books appointments, then helps you win more customers.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={SIGNUP_URL} className="rp-cta-shine inline-flex h-12 items-center rounded-full bg-cta px-6 text-[15px] font-medium text-[#1a0d08] shadow-[0_18px_50px_-15px_rgba(255,122,89,0.8)] transition-colors hover:bg-[var(--rp-cta-hover)]">
            Get started free
          </a>
          <ButtonLink href="/product" variant="ghost">
            See how it works
          </ButtonLink>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2.5" aria-label="Channels it answers">
          {channels.map((c) => (
            <li key={c.id}>
              <Link href={`/channels#${c.id}`} className="flex items-center gap-2 text-[13.5px] text-muted-ink hover:text-ink">
                <ChannelLogo id={c.id} size={20} />
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </HomeHero>

      {/* Every trade, on a ribbon */}
      <div className="border-y border-line bg-surface/40 py-5">
        <Marquee speed={70}>
          {trades.map((t) => (
            <Link key={t.id} href={`/industries/${slugFor(t)}`} className="inline-flex h-9 shrink-0 items-center rounded-full border border-line-strong px-4 text-[13.5px] text-muted-ink transition-colors hover:border-glow/50 hover:text-ink">
              {shortLabel(t)}
            </Link>
          ))}
        </Marquee>
      </div>

      {/* One evening, scroll by scroll */}
      <Section>
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <p className="mb-4 text-[14px] font-medium text-glow">How it works</p>
            <H2>{PROBLEM.headline}</H2>
            <Lede className="mt-5">{PROBLEM.body}</Lede>
          </Reveal>
          <HomeStory />
        </Container>
      </Section>

      {/* The product */}
      <Section tone="surface">
        <Container>
          <Reveal className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-[14px] font-medium text-glow">The product</p>
              <H2>One front desk for everything customers ask.</H2>
            </div>
            <ButtonLink href="/product" variant="ghost">
              Explore the product
            </ButtonLink>
          </Reveal>
          <HomeBento />
        </Container>
      </Section>

      <Section>
        <Container>
          <HomeStats businessTypes={TYPES.length} />
        </Container>
      </Section>

      {/* Guardrails */}
      <Section className="!pt-0">
        <Container>
          <Reveal className="grid items-center gap-10 rounded-[32px] border border-violet/30 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(124,107,255,0.18),transparent_55%),var(--rp-surface)] p-7 sm:p-12 lg:grid-cols-2">
            <div>
              <ShieldCheck aria-hidden className="mb-5 h-7 w-7 text-glow" />
              <H2>{GUARDRAILS.headline}</H2>
              <Lede className="mt-4">{GUARDRAILS.lede}</Lede>
              <ButtonLink href="/product#guardrails" variant="link" className="mt-5">
                How the checks work
              </ButtonLink>
            </div>
            <ul className="flex flex-col divide-y divide-line">
              {GUARDRAILS.rules.map((r) => (
                <li key={r.title} className="py-4">
                  <p className="text-[16px] font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-[14.5px] text-muted-ink">{r.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

    </>
  );
}
