import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/site/hero";
import { AssistantChat } from "@/components/site/assistant-chat";
import { PricingCards } from "@/components/site/pricing-cards";
import { CHANNEL_ICONS, PRODUCT_ICONS } from "@/components/site/icons";
import { groupAnchor } from "@/components/site/footer";
import { ButtonLink, Container, CtaBand, Eyebrow, FaqList, H2, JsonLd, Lede, Section, SectionHeader, StepFlow, TrialButtons, cx } from "@/components/site/ui";
import { CHANNELS } from "@/lib/content/channels";
import { HOME_FAQ } from "@/lib/content/faq";
import { GROUPS, SOMETHING_ELSE, TYPES, shortLabel, slugFor, typesInGroup } from "@/lib/content/industries";
import { AUTOMATIONS, GUARDRAILS, HOW_IT_WORKS, PROBLEM } from "@/lib/content/platform";
import { PILLARS, productsIn, type Pillar } from "@/lib/content/products";
import { TRIAL } from "@/lib/plans";
import { COMPANY, PUBLISHED_MAILBOXES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: the AI front desk for local businesses` },
  description: SITE.description,
  openGraph: { title: `${SITE.name}: the AI front desk for local businesses`, description: SITE.description, url: "/" },
};

/** Organization on the site root (brief §9.15): no address property, ever. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: COMPANY.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  ...(COMPANY.registrationNumber ? { identifier: COMPANY.registrationNumber } : {}),
  contactPoint: PUBLISHED_MAILBOXES.map((m) => ({ "@type": "ContactPoint", contactType: m.label.toLowerCase(), email: m.address })),
};

export default function HomePage() {
  const pillars = Object.keys(PILLARS) as Pillar[];
  return (
    <>
      <JsonLd data={ORGANIZATION} />

      {/* 1. Hero */}
      <HomeHero>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-ink sm:text-xl">
          RingPost answers your calls, texts, WhatsApp, Instagram, Messenger and email, day and night, from your own prices and hours, and books the appointment. Then it goes and gets you more.
        </p>
        <TrialButtons className="mt-9" />
        <p className="mt-5 text-[13.5px] text-faint">
          {TRIAL.days}-day free trial on every plan · no setup fee · cancel any time
        </p>
      </HomeHero>

      {/* 2. The problem */}
      <Section tone="surface">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>{PROBLEM.eyebrow}</Eyebrow>
            <H2>{PROBLEM.headline}</H2>
          </div>
          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-ink lg:pt-10">
            {PROBLEM.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-ink">RingPost is the front desk that's there for all of it.</p>
          </div>
        </Container>
      </Section>

      {/* 3. Channels strip */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Channels" title="Wherever they reach you, it answers." lede="Every channel lands in one inbox, and the AI answers each one the same way: from your own information, with the same rules." />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CHANNELS.map((c) => {
              const Icon = CHANNEL_ICONS[c.id];
              return (
                <Link key={c.id} href={`/channels#${c.id}`} className="rp-card rp-card-hover flex flex-col gap-4 rounded-2xl p-5">
                  <Icon aria-hidden className="h-5 w-5 text-glow" />
                  <span className="text-[14.5px] font-medium text-ink">{c.name}</span>
                  <span className={cx("text-[12px]", c.availableToBusinesses ? "text-success" : "text-muted-ink")}>{c.availableToBusinesses ? "Answered today" : "On our own site"}</span>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. Three pillars */}
      <Section tone="grid">
        <Container>
          <SectionHeader eyebrow="What it does" title={<>It answers everything. <span className="italic text-glow">Then it goes and gets you more.</span></>} />
          <div className="grid gap-4 lg:grid-cols-3">
            {pillars.map((pillar, i) => (
              <div key={pillar} className={cx("rp-card flex flex-col rounded-3xl p-7", i === 1 && "border-violet/40")}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-glow">
                  0{i + 1} · {PILLARS[pillar].name}
                </p>
                <h3 className="mt-4 font-display text-3xl leading-tight text-ink">{PILLARS[pillar].line}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{PILLARS[pillar].lede}</p>
                <ul className="mt-6 flex flex-col divide-y divide-line border-t border-line">
                  {productsIn(pillar).map((p) => {
                    const Icon = PRODUCT_ICONS[p.slug];
                    return (
                      <li key={p.slug}>
                        <Link href={`/product/${p.slug}`} className="group flex items-center gap-3 py-3.5 text-[14.5px] text-ink">
                          <Icon aria-hidden className="h-4 w-4 shrink-0 text-glow" />
                          <span className="flex-1">{p.name}</span>
                          <ArrowRight aria-hidden className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-glow" />
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

      {/* The guardrails: the claim to lead with */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-violet/30 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(124,107,255,0.18),transparent_55%),var(--rp-surface)] p-7 sm:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <Eyebrow>
                  <ShieldCheck aria-hidden className="h-3.5 w-3.5" /> Guardrails
                </Eyebrow>
                <H2>{GUARDRAILS.headline}</H2>
                <Lede className="mt-5">{GUARDRAILS.lede}</Lede>
                <blockquote className="mt-8 rounded-2xl border border-line-strong bg-base/60 p-5">
                  <p className="text-[12px] font-mono uppercase tracking-[0.16em] text-faint">What a customer hears when it can't be sure</p>
                  <p className="mt-2 font-display text-2xl leading-snug text-ink">&ldquo;{GUARDRAILS.fallbackLine}&rdquo;</p>
                </blockquote>
                <ButtonLink href="/product#guardrails" variant="link" className="mt-6">
                  How the guardrails work
                </ButtonLink>
              </div>
              <ol className="grid gap-3 sm:grid-cols-2">
                {GUARDRAILS.rules.map((r, i) => (
                  <li key={r.title} className="rounded-2xl border border-line bg-base/70 p-6">
                    <span className="font-mono text-xs text-glow">0{i + 1}</span>
                    <h3 className="mt-3 text-[1.05rem] font-semibold text-ink">{r.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. How it works */}
      <Section>
        <Container>
          <SectionHeader eyebrow="How it works" title="Set it up yourself. Check it before any customer does." lede="It reads what your business already says about itself, tells you what's missing, and lets you try it before it answers anyone." />
          <StepFlow steps={HOW_IT_WORKS} />
        </Container>
      </Section>

      {/* 6. What it does while you work */}
      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="While you're with a customer" title="What it's doing while you work." lede="These run on their own, in your business's time zone. Each one is a real part of the product, not a promise." />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS.map((a) => (
              <div key={a.title} className="bg-base p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-glow">{a.when}</p>
                <h3 className="mt-3 text-[1.02rem] font-semibold text-ink">{a.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-ink">{a.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. Industries */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Industries"
            title={`Built for ${TYPES.length} kinds of local business.`}
            lede="Each type of business carries its own rules: what the AI must never do, what it always hands to you, and how bookings work for that trade."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {GROUPS.map((g) => (
              <div key={g} className="rp-card rounded-2xl p-5">
                <Link href={`/industries#${groupAnchor(g)}`} className="text-[14.5px] font-semibold text-ink hover:text-glow">
                  {g}
                </Link>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {typesInGroup(g).slice(0, 4).map((t) => (
                    <li key={t.id}>
                      <Link href={`/industries/${slugFor(t)}`} className="text-[13.5px] text-muted-ink hover:text-ink">
                        {shortLabel(t)}
                      </Link>
                    </li>
                  ))}
                  {typesInGroup(g).length > 4 && (
                    <li className="text-[12.5px] text-faint">
                      <Link href={`/industries#${groupAnchor(g)}`} className="hover:text-muted-ink">
                        + {typesInGroup(g).length - 4} more
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/industries" variant="ghost">
              All industries
            </ButtonLink>
            <Link href={`/industries/${SOMETHING_ELSE.slug}`} className="text-[14px] text-muted-ink hover:text-ink">
              Not listed? It works for other businesses too.
            </Link>
          </div>
        </Container>
      </Section>

      {/* 8. The RingPost assistant */}
      <Section tone="grid">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Ask it yourself</Eyebrow>
            <H2>We run our own front desk on RingPost.</H2>
            <Lede className="mt-5">Ask our assistant anything about RingPost: the plans, the channels, what happens to your data. It answers from this website and the plan catalog, and when it doesn&apos;t know, it says so and points you to a person.</Lede>
            <ButtonLink href="/demo" variant="link" className="mt-6">
              Try the voice demo too
            </ButtonLink>
          </div>
          <AssistantChat />
        </Container>
      </Section>

      {/* 9. Pricing preview */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Pricing"
            title="Three plans. No setup fee."
            lede={`Every plan starts with a ${TRIAL.days}-day free trial. Going over an allowance never stops your service, and top-ups are only added when you click.`}
          />
          <PricingCards compact />
          <div className="mt-8">
            <ButtonLink href="/pricing" variant="ghost">
              Compare plans in full
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* 10. FAQ */}
      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <H2>Questions owners ask first.</H2>
            <ButtonLink href="/faq" variant="link" className="mt-6">
              All questions
            </ButtonLink>
          </div>
          <FaqList items={HOME_FAQ} />
        </Container>
      </Section>

      {/* 11. Closing CTA */}
      <CtaBand />
    </>
  );
}
