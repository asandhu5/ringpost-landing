import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/site/hero";
import { CHANNEL_ICONS, PRODUCT_ICONS } from "@/components/site/icons";
import { PhoneMock } from "@/components/site/phone-mock";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink, Container, CtaBand, H2, JsonLd, Lede, ScreenshotFrame, Section, TrialButtons, screenshotExists } from "@/components/site/ui";
import { ProductVisual } from "@/components/site/visuals";
import { CHANNELS } from "@/lib/content/channels";
import { DEEP, TYPES, shortLabel, slugFor } from "@/lib/content/industries";
import { GUARDRAILS, PROBLEM } from "@/lib/content/platform";
import { PILLARS, productsIn, type Pillar } from "@/lib/content/products";
import { COMPANY, SITE } from "@/lib/site";

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
 * The home page of a website, not a landing page: say what RingPost is, let visitors
 * talk to Zara, then send them to the part of the site they want.
 */
export default function HomePage() {
  const pillars = Object.keys(PILLARS) as Pillar[];
  const channels = CHANNELS.filter((c) => c.availableToBusinesses);
  const trades = TYPES.filter((t) => DEEP[t.id]);
  const inboxShot = "/screens/inbox.webp";

  return (
    <>
      <JsonLd data={ORGANIZATION} />

      <HomeHero>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-ink sm:text-xl">It answers your calls and messages day and night, books appointments, then helps you win more customers.</p>
        <TrialButtons className="mt-9" secondary={{ href: "/product", label: "See how it works" }} />
        <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2" aria-label="Channels it answers">
          {channels.map((c) => {
            const Icon = CHANNEL_ICONS[c.id];
            return (
              <li key={c.id}>
                <Link href={`/channels#${c.id}`} className="flex items-center gap-1.5 text-[13.5px] text-muted-ink hover:text-ink">
                  <Icon aria-hidden className="h-3.5 w-3.5 text-glow" />
                  {c.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </HomeHero>

      {/* The missed call */}
      <Section tone="surface">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
          <Reveal>
            <H2>{PROBLEM.headline}</H2>
            <Lede className="mt-5">{PROBLEM.body}</Lede>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink">With RingPost, the caller gets a text back in seconds, and the booking lands on your calendar.</p>
          </Reveal>
          <PhoneMock />
        </Container>
      </Section>

      {/* The product, as a directory */}
      <Section>
        <Container>
          <Reveal className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <H2 className="max-w-2xl">One front desk for everything customers ask.</H2>
            <ButtonLink href="/product" variant="ghost">
              Explore the product
            </ButtonLink>
          </Reveal>

          <Reveal className="mb-14">
            {screenshotExists(inboxShot) ? <ScreenshotFrame src={inboxShot} alt="The RingPost inbox" /> : <ProductVisual slug="inbox" />}
          </Reveal>

          <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-3 lg:gap-10">
            {pillars.map((pillar) => (
              <div key={pillar}>
                <h3 className="font-display text-3xl text-ink">{PILLARS[pillar].line}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{PILLARS[pillar].lede}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {productsIn(pillar).map((p) => {
                    const Icon = PRODUCT_ICONS[p.slug];
                    return (
                      <li key={p.slug}>
                        <Link href={`/product/${p.slug}`} className="group flex items-center gap-2.5 text-[15px] text-ink">
                          <Icon aria-hidden className="h-4 w-4 shrink-0 text-glow" />
                          <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-glow">{p.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
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

      {/* Trades */}
      <Section className="!pt-0">
        <Container>
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight text-ink">Set up for {TYPES.length} kinds of local business.</h2>
            <ButtonLink href="/industries" variant="ghost">
              Find your trade
            </ButtonLink>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {trades.map((t) => (
              <Link key={t.id} href={`/industries/${slugFor(t)}`} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-[14px] text-muted-ink transition-colors hover:border-glow/50 hover:text-ink">
                {shortLabel(t)}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Let it answer the next call." />
    </>
  );
}
