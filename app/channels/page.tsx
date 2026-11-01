import type { Metadata } from "next";
import Link from "next/link";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Container, PageHero, Section, StartButtons } from "@/components/site/ui";
import { CHANNELS, SOCIAL_PLATFORMS } from "@/lib/content/channels";
import { InViewGroup } from "@/components/site/motion";

const DESCRIPTION = "RingPost answers phone calls, texts, WhatsApp, Instagram DMs, Facebook Messenger and email for local businesses, all in one inbox.";

export const metadata: Metadata = {
  title: "Channels: AI that answers calls, texts, WhatsApp, Instagram, Messenger and email",
  description: DESCRIPTION,
  openGraph: { title: "RingPost channels", description: DESCRIPTION, url: "/channels" },
};

export default function ChannelsPage() {
  return (
    <>
      <PageHero eyebrow="Channels" title="Wherever customers reach you, it answers." lede="Six channels, one inbox, answered the same way from your own information.">
        <StartButtons />
      </PageHero>

      {/* One card per channel: what the AI does there, and the one thing it takes to set up. */}
      <Section className="!pt-0">
        <Container>
          <InViewGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((c) => (
              <article key={c.id} id={c.id} className="rp-card rp-card-hover flex scroll-mt-28 flex-col rounded-3xl p-7">
                <div className="flex items-center gap-3">
                  <ChannelLogo id={c.id} size={44} />
                  <div>
                    <h2 className="text-[19px] font-semibold tracking-tight text-ink">{c.name}</h2>
                    <p className="text-[13px] text-muted-ink">{c.worksWith}</p>
                  </div>
                </div>
                <p className="mb-6 mt-5 text-[15px] leading-relaxed text-ink">{c.aiDoes}</p>
                <p className="mt-auto border-t border-line pt-4 text-[13.5px] leading-relaxed text-muted-ink">
                  <span className="font-medium text-ink">Setup: </span>
                  {c.setup}
                </p>
              </article>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      <Section>
        <Container narrow className="text-center">
          <h2 className="font-display text-4xl text-ink">And where you post</h2>
          <InViewGroup as="ul" className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
            {SOCIAL_PLATFORMS.map((p) => (
              <li key={p} className="rounded-full border border-line-strong bg-white px-4 py-2 text-[14px] text-ink">
                {p}
              </li>
            ))}
          </InViewGroup>
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-muted-ink">
            Approved posts publish to every platform you connect.{" "}
            <Link href="/product/social" className="text-glow underline decoration-glow/40 underline-offset-4 hover:text-ink">
              Social posting
            </Link>
          </p>
        </Container>
      </Section>

    </>
  );
}
