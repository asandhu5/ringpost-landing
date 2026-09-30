import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { PRODUCT_ICONS } from "@/components/site/icons";
import { Container, CtaBand, Eyebrow, H2, Lede, PageHero, Section, SectionHeader, TrialButtons, cx } from "@/components/site/ui";
import { CHANNELS } from "@/lib/content/channels";
import { GUARDRAILS } from "@/lib/content/platform";
import { PILLARS, productsIn, type Pillar } from "@/lib/content/products";
import { TYPES } from "@/lib/content/industries";

const TITLE = "AI Front Desk for local businesses";
const DESCRIPTION =
  "An AI front desk answers every call and message for a local business, books appointments and hands over to a person when needed. RingPost's AI front desk also posts to your socials, asks for reviews and brings customers back.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `RingPost: ${TITLE}`, description: DESCRIPTION, url: "/product" },
};

/**
 * The "AI Front Desk" page (brief §9.6). Written to answer the search "AI front desk for
 * local business": what one is, what this one does, then the three pillars and all nine
 * product pages, and the guardrails in full.
 */
export default function ProductHub() {
  const pillars = Object.keys(PILLARS) as Pillar[];
  const live = CHANNELS.filter((c) => c.availableToBusinesses).map((c) => c.name.toLowerCase());
  return (
    <>
      <PageHero
        eyebrow="The AI Front Desk"
        title={
          <>
            An AI front desk that answers, books, <span className="italic text-glow">and then brings in more.</span>
          </>
        }
        lede="RingPost is an AI front desk for local businesses: the calls, messages and bookings a receptionist would handle, answered around the clock from your own business information. Then it does the work that brings customers in."
      >
        <TrialButtons />
      </PageHero>

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>What is an AI front desk?</Eyebrow>
            <H2>The first thing every customer reaches, answered every time.</H2>
          </div>
          <div className="flex flex-col gap-5 text-[1.075rem] leading-relaxed text-muted-ink">
            <p>
              A front desk is where customers ask questions, book, reschedule and get passed to the right person. For most local businesses, it&apos;s the owner&apos;s phone, the shop&apos;s Instagram and whoever is free, and it goes unanswered whenever everyone is busy.
            </p>
            <p>
              An AI front desk answers those conversations for you: on the phone and in {live.slice(1).join(", ")}. It works from your own services, prices, hours and policies, books into your calendar, and passes anything it shouldn&apos;t handle to you.
            </p>
            <p className="text-ink">
              The difference that matters is what it will and won&apos;t say. RingPost&apos;s answers are checked against your data before they&apos;re sent, and when it can&apos;t be sure, it tells the customer so and hands the conversation to you.
            </p>
          </div>
        </Container>
      </Section>

      {pillars.map((pillar, i) => (
        <Section key={pillar} tone={i === 1 ? "grid" : "base"}>
          <Container>
            <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <Eyebrow>
                  0{i + 1} · {PILLARS[pillar].name}
                </Eyebrow>
                <H2>{PILLARS[pillar].line}</H2>
              </div>
              <Lede>{PILLARS[pillar].lede}</Lede>
            </div>
            <div className={cx("grid gap-4", productsIn(pillar).length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4", productsIn(pillar).length === 3 && "lg:grid-cols-3")}>
              {productsIn(pillar).map((p) => {
                const Icon = PRODUCT_ICONS[p.slug];
                return (
                  <Link key={p.slug} href={`/product/${p.slug}`} className="rp-card rp-card-hover group flex flex-col rounded-2xl p-6">
                    <Icon aria-hidden className="h-5 w-5 text-glow" />
                    <h3 className="mt-5 text-[1.08rem] font-semibold text-ink">{p.name}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">{p.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium text-glow">
                      {p.name} <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      ))}

      <Section id="guardrails" tone="surface">
        <Container>
          <SectionHeader
            eyebrow="Guardrails"
            title={GUARDRAILS.headline}
            lede={GUARDRAILS.lede}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {GUARDRAILS.rules.map((r, i) => (
              <div key={r.title} className="rp-card rounded-2xl p-7">
                <div className="flex items-center gap-3">
                  <ShieldCheck aria-hidden className="h-5 w-5 text-glow" />
                  <span className="font-mono text-xs text-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{r.body}</p>
              </div>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {GUARDRAILS.extras.map((e) => (
              <li key={e} className="flex gap-3 text-[15px] leading-relaxed text-muted-ink">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-success" />
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-muted-ink">
            Each of the {TYPES.length} business types adds its own lines. A clinic&apos;s AI never suggests what a symptom might mean; a garage&apos;s never prices a repair on a car nobody has inspected; a locksmith&apos;s hands &ldquo;locked out&rdquo; and &ldquo;break-in&rdquo; straight to a person.{" "}
            <Link href="/industries" className="text-glow underline underline-offset-2 hover:text-white">
              See each industry&apos;s rules
            </Link>
            .
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
