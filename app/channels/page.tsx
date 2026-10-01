import type { Metadata } from "next";
import Link from "next/link";
import { CHANNEL_ICONS } from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";
import { Container, PageHero, Section, TrialButtons } from "@/components/site/ui";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";

const DESCRIPTION = "RingPost answers phone calls, texts, WhatsApp, Instagram DMs, Facebook Messenger and email for local businesses, all in one inbox.";

export const metadata: Metadata = {
  title: "Channels: AI that answers calls, texts, WhatsApp, Instagram, Messenger and email",
  description: DESCRIPTION,
  openGraph: { title: "RingPost channels", description: DESCRIPTION, url: "/channels" },
};

export default function ChannelsPage() {
  return (
    <>
      <PageHero eyebrow="Channels" title="Wherever customers reach you, it answers." lede="Every channel lands in one inbox, and every one is answered the same way: from your own information, with the same checks.">
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
          <Section key={c.id} id={c.id} tone={i % 2 === 0 ? "surface" : "base"} className="scroll-mt-24 !py-16">
            <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <Reveal>
                <Icon aria-hidden className="h-7 w-7 text-glow" />
                <h2 className="mt-5 font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.05] text-ink">{c.name}</h2>
                <p className="mt-2 text-[15px] text-muted-ink">{c.worksWith}</p>
              </Reveal>
              <Reveal delay={100}>
                <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  {[
                    ["What arrives", c.arrives],
                    ["What the AI does", c.aiDoes],
                    ["What you see", c.ownerSees],
                    ["Setting it up", c.setup],
                  ].map(([k, v]) => (
                    <div key={k} className="border-t border-line pt-4">
                      <dt className="text-[14px] font-medium text-ink">{k}</dt>
                      <dd className="mt-1 text-[15px] leading-relaxed text-muted-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </Container>
          </Section>
        );
      })}

      <Section>
        <Container narrow className="text-center">
          <h2 className="font-display text-4xl text-ink">And where you post</h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-ink">
            Approved posts publish to {SOCIAL_PLATFORMS.join(", ")}.{" "}
            <Link href="/product/social" className="text-glow underline decoration-glow/40 underline-offset-4 hover:text-white">
              Social posting
            </Link>
          </p>
        </Container>
      </Section>

    </>
  );
}
