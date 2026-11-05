import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, Inbox } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Screen } from "@/components/site/product-showcase";
import { InViewGroup } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, H2, Lede, PageHero, Section, StartButtons } from "@/components/site/ui";
import { CHANNEL_PAGES, channelPage } from "@/lib/content/channel-pages";

const DESCRIPTION = "RingPost answers phone calls, WhatsApp, Instagram DMs, Facebook Messenger, texts and email for local businesses, books appointments and keeps every conversation in one inbox.";

export const metadata: Metadata = {
  title: "Channels: calls, WhatsApp, Instagram, Messenger, texts and email answered",
  description: DESCRIPTION,
  openGraph: { title: "RingPost channels", description: DESCRIPTION, url: "/channels" },
};

const BEHIND = [
  { icon: Inbox, title: "One inbox", body: "Every channel in one place, with what needs you on top. Reply yourself and the AI steps back.", href: "/product/inbox", shot: "/screens/inbox-whatsapp.webp", alt: "The RingPost inbox with WhatsApp, calls, Instagram and more" },
  { icon: CalendarCheck, title: "Bookings and calendar", body: "Booked on the call or in the chat, synced both ways with Google Calendar, with reminders before every visit.", href: "/product/booking", shot: "/screens/calendar.webp", alt: "A week of bookings in the RingPost calendar" },
  { icon: BookOpen, title: "Your business knowledge", body: "Every channel answers from the same prices, hours and policies, so customers hear the same thing everywhere.", href: "/product/knowledge", shot: "/screens/knowledge.webp", alt: "The RingPost knowledge page" },
];

/** The channels hub (2026-11-04): each channel and what it does for the owner, then what sits behind all of them. */
export default function ChannelsPage() {
  const pages = CHANNEL_PAGES.map((p) => channelPage(p.id)!);
  return (
    <>
      <PageHero
        eyebrow="Channels"
        title="Wherever customers reach you, they get an answer."
        lede="Calls, WhatsApp, Instagram, Messenger, texts and email: answered straight away from your own information, booked into your calendar, and all in one inbox you can step into any time."
      >
        <div className="mb-8 flex flex-wrap gap-3">
          {pages.map((p) => (
            <Link key={p.id} href={`/channels/${p.id}`} aria-label={p.channel.name} className="transition-transform hover:-translate-y-1">
              <ChannelLogo id={p.id} size={52} />
            </Link>
          ))}
        </div>
        <StartButtons />
      </PageHero>

      <Section className="!pt-0">
        <Container>
          <InViewGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((p) => (
              <Link key={p.id} href={`/channels/${p.id}`} className="rp-card rp-card-hover group flex flex-col overflow-hidden rounded-3xl">
                <span className="relative block h-56 overflow-hidden border-b border-line bg-surface-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.screen.src} alt={p.screen.alt} loading="lazy" className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="flex items-center gap-3">
                    <ChannelLogo id={p.id} size={40} />
                    <span className="text-[19px] font-semibold text-ink">{p.channel.name}</span>
                  </span>
                  <span className="mt-3 text-[16px] font-medium leading-snug text-ink">{p.headline}</span>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {p.benefits.slice(0, 3).map((b) => (
                      <li key={b.title} className="flex gap-2 text-[14px] text-muted-ink">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5b4ee6]" />
                        {b.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[14px] font-semibold text-glow">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </Link>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal className="mb-12 max-w-3xl">
            <Eyebrow>Behind every channel</Eyebrow>
            <H2>One AI, one inbox, one calendar.</H2>
            <Lede className="mt-4">However a customer gets in touch, the answer comes from the same place and the booking lands in the same calendar.</Lede>
          </Reveal>
          <div className="flex flex-col gap-16">
            {BEHIND.map((b, i) => (
              <Reveal key={b.title} className={`grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5b4ee6]/10 text-[#5b4ee6]">
                    <b.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-[26px] font-bold tracking-tight text-ink">{b.title}</h3>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-muted-ink">{b.body}</p>
                  <Link href={b.href} className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
                    Learn more <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
                <Screen src={b.shot} alt={b.alt} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
