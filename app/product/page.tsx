import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { PRODUCT_ICONS } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";
import { ArrowRight } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Screen } from "@/components/site/product-showcase";
import { Container, H2, Lede, OnThisPage, PageHero, Section, StepFlow, StartButtons, screenshotExists } from "@/components/site/ui";
import { ProductVisual } from "@/components/site/visuals";
import { ANSWER_CHANNELS, POST_PLATFORMS } from "@/lib/content/platforms";
import { AUTOMATIONS, GUARDRAILS, HOW_IT_WORKS } from "@/lib/content/platform";
import { PILLARS, PRODUCTS, productHref, productsIn, type Pillar } from "@/lib/content/products";
import { InViewGroup } from "@/components/site/motion";

const TITLE = "AI Front Desk for local businesses";
const DESCRIPTION = "An AI front desk answers every call and message, books appointments and hands over when a person is needed. RingPost's also posts to your socials, asks for reviews and brings customers back.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: `RingPost: ${TITLE}`, description: DESCRIPTION, url: "/product" },
};

const PILLAR_SHOT: Record<Pillar, string> = { answer: "inbox", grow: "social", understand: "advisor" };

/**
 * The "AI Front Desk" page: what one is, what this one does, how it works, what runs by
 * itself, and the guardrails. Every product page hangs off it.
 */
export default function ProductHub() {
  const pillars = Object.keys(PILLARS) as Pillar[];
  return (
    <>
      <PageHero
        eyebrow="Your AI business partner"
        title="It answers, it books, and it wins you more."
        lede="An AI front desk handles the calls, messages and bookings a receptionist would, day and night, from your own information. Then it makes your posts, answers your reviews and comments, and shows you what's working."
        aside={
          <div className="relative">
            <Screen src="/screens/home.webp" alt="The RingPost home screen for a salon: calls answered, bookings made and posts waiting" priority />
            <div className="absolute -bottom-6 -left-4 hidden items-center gap-1.5 rounded-2xl bg-white p-2.5 shadow-xl sm:flex">
              {ANSWER_CHANNELS.slice(0, 5).map((c) => (
                <ChannelLogo key={c.id} id={c.id} size={30} />
              ))}
            </div>
          </div>
        }
      >
        <StartButtons />
      </PageHero>

      {/* Every feature, each with its real screen */}
      <Section className="!pt-14">
        <Container>
          <H2 className="mb-3">Everything in one platform.</H2>
          <Lede className="mb-10">Eleven features, one login, one AI that knows your business.</Lede>
          <InViewGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p) => {
              const Icon = PRODUCT_ICONS[p.slug];
              const shot = p.screen && screenshotExists(p.screen.src) ? p.screen : null;
              return (
                <Link key={p.slug} href={productHref(p)} className="rp-card rp-card-hover group flex flex-col overflow-hidden rounded-3xl">
                  {shot && (
                    <span className="block h-40 overflow-hidden border-b border-line bg-surface-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={shot.src} alt="" loading="lazy" className="w-full origin-top-left scale-[1.02] object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.08]" />
                    </span>
                  )}
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex items-center gap-2.5">
                      <Icon aria-hidden className="h-4.5 w-4.5 text-glow" />
                      <span className="text-[16.5px] font-semibold text-ink">{p.name}</span>
                    </span>
                    <span className="mt-1.5 text-[14px] leading-relaxed text-muted-ink">{p.summary}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[13.5px] font-semibold text-glow">
                      See how it works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </span>
                </Link>
              );
            })}
            <Link href="/content-studio" className="rp-brand-ring group flex flex-col justify-between rounded-3xl p-6">
              <span>
                <span className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">Content Studio</span>
                <span className="mt-2 block text-[20px] font-bold tracking-tight text-ink">Today&apos;s best image and video models, posting to your connected platforms.</span>
              </span>
              <span className="mt-5 flex flex-wrap gap-1.5">
                {POST_PLATFORMS.map((pl) => (
                  <ChannelLogo key={pl.id} id={pl.id} size={26} />
                ))}
              </span>
            </Link>
          </InViewGroup>
        </Container>
      </Section>

      <OnThisPage
        name="AI Front Desk"
        links={[
          ...pillars.map((p) => ({ href: `#${p}`, label: PILLARS[p].name })),
          { href: "#how-it-works", label: "How it works" },
          { href: "#automatic", label: "Runs by itself" },
          { href: "#guardrails", label: "Guardrails" },
        ]}
      />

      {pillars.map((pillar, i) => {
        const shot = PRODUCTS.find((p) => p.slug === PILLAR_SHOT[pillar])?.screen;
        return (
          <Section key={pillar} id={pillar} tone={i === 1 ? "surface" : "base"} className="scroll-mt-28">
            <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="mb-3 text-[15px] font-medium text-glow">{PILLARS[pillar].name}</p>
                <H2>{PILLARS[pillar].line}</H2>
                <Lede className="mt-4">{PILLARS[pillar].lede}</Lede>
                <ul className="mt-7 flex flex-col divide-y divide-line border-y border-line">
                  {productsIn(pillar).map((p) => {
                    const Icon = PRODUCT_ICONS[p.slug];
                    return (
                      <li key={p.slug}>
                        <Link href={productHref(p)} className="group flex items-start gap-3 py-3.5">
                          <Icon aria-hidden className="mt-1 h-4 w-4 shrink-0 text-glow" />
                          <span>
                            <span className="block text-[15.5px] font-medium text-ink group-hover:text-glow">{p.name}</span>
                            <span className="block text-[14px] text-muted-ink">{p.summary}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
              <Reveal delay={120} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {shot && screenshotExists(shot.src) ? <Screen src={shot.src} alt={shot.alt} /> : <ProductVisual slug={PILLAR_SHOT[pillar]} />}
              </Reveal>
            </Container>
          </Section>
        );
      })}

      <Section id="how-it-works" tone="surface" className="scroll-mt-28">
        <Container>
          <H2 className="mb-10">Set up in four steps.</H2>
          <StepFlow steps={HOW_IT_WORKS} />
        </Container>
      </Section>

      <Section id="automatic" className="scroll-mt-28">
        <Container>
          <H2 className="mb-3">What runs by itself.</H2>
          <Lede className="mb-10">In your time zone, while you're busy with customers.</Lede>
          <InViewGroup className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS.map((a) => (
              <div key={a.title} className="border-t border-line pt-4">
                <p className="text-[13.5px] text-glow">{a.when}</p>
                <p className="mt-1 text-[16px] font-medium text-ink">{a.title}</p>
                <p className="mt-1 text-[14.5px] text-muted-ink">{a.body}</p>
              </div>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      <Section id="guardrails" tone="surface" className="scroll-mt-28">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="rp-icon-ring mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet/15">
              <ShieldCheck aria-hidden className="h-6 w-6 text-glow" />
            </span>
            <H2>{GUARDRAILS.headline}</H2>
            <Lede className="mt-4">{GUARDRAILS.lede}</Lede>
            <blockquote className="mt-8 border-l-2 border-violet/60 pl-5">
              <p className="text-[14px] text-muted-ink">When it can&apos;t be sure, customers hear:</p>
              <p className="mt-2 font-display text-2xl leading-snug text-ink">&ldquo;{GUARDRAILS.fallbackLine}&rdquo;</p>
            </blockquote>
          </div>
          <div>
            <InViewGroup as="ul" className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {GUARDRAILS.rules.map((r) => (
                <li key={r.title}>
                  <p className="text-[16px] font-medium text-ink">{r.title}</p>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-muted-ink">{r.body}</p>
                </li>
              ))}
            </InViewGroup>
            <ul className="mt-8 flex flex-col gap-2 border-t border-line pt-6">
              {GUARDRAILS.extras.map((e) => (
                <li key={e} className="flex gap-2.5 text-[15px] text-muted-ink">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-success" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

    </>
  );
}
