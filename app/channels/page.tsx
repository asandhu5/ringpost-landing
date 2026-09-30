import type { Metadata } from "next";
import Link from "next/link";
import { CHANNEL_ICONS } from "@/components/site/icons";
import { Container, CtaBand, PageHero, Pill, Section, TrialButtons } from "@/components/site/ui";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";

const DESCRIPTION =
  "RingPost answers phone calls, text messages, WhatsApp, Instagram DMs, Facebook Messenger and email for local businesses, all in one inbox, on every plan.";

export const metadata: Metadata = {
  title: "Channels: AI that answers calls, texts, WhatsApp, Instagram, Messenger and email",
  description: DESCRIPTION,
  openGraph: { title: "RingPost channels", description: DESCRIPTION, url: "/channels" },
};

export default function ChannelsPage() {
  return (
    <>
      <PageHero
        eyebrow="Channels"
        title="Every place a customer reaches you, answered."
        lede="Each channel lands in one inbox, and the AI answers every one the same way: from your own information, under the same guardrails. Every channel is on every plan."
      >
        <TrialButtons />
        <nav aria-label="Channels on this page" className="mt-10 flex flex-wrap gap-2">
          {CHANNELS.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-[13.5px] text-muted-ink hover:border-glow/50 hover:text-ink">
              {c.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {CHANNELS.map((c, i) => {
        const Icon = CHANNEL_ICONS[c.id];
        return (
          <Section key={c.id} id={c.id} tone={i % 2 === 0 ? "surface" : "base"} className="scroll-mt-20">
            <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong bg-violet/10 text-glow">
                  <Icon aria-hidden className="h-6 w-6" />
                </span>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-glow">{c.worksWith}</p>
                <h2 className="mt-3 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.02] text-ink">{c.searchPhrase}</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.availableToBusinesses ? <Pill tone="green">On every plan</Pill> : <Pill tone="muted">Not for your own website today</Pill>}
                </div>
              </div>
              <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {[
                  ["What arrives", c.arrives],
                  ["What the AI does", c.aiDoes],
                  ["What you see", c.ownerSees],
                  ["Setting it up", c.setup],
                ].map(([k, v]) => (
                  <div key={k} className="bg-base p-6">
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">{k}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-ink/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </Container>
          </Section>
        );
      })}

      <Section>
        <Container>
          <div className="rp-card rounded-3xl p-7 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-glow">And where you post</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink">Publishing to your social accounts</h2>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-ink">
              On Growth and Command Center, approved posts publish to your own accounts: {SOCIAL_PLATFORMS.join(", ")}. New comments on your posts come back with a reply drafted for you.{" "}
              <Link href="/product/social" className="text-glow underline underline-offset-2 hover:text-white">
                Social posts
              </Link>
            </p>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
