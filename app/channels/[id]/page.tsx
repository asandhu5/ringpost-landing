import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { InViewGroup } from "@/components/site/motion";
import { Reveal } from "@/components/site/reveal";
import { Container, Eyebrow, FaqList, H2, PageHero, Section, StartButtons } from "@/components/site/ui";
import { CHANNEL_PAGES, channelPage } from "@/lib/content/channel-pages";
import { ExplainerSections } from "@/components/site/explainer-sections";
import { CHANNEL_EXPLAINERS } from "@/lib/content/explainers";
import { CHANNEL_MENU } from "@/lib/nav";

export function generateStaticParams() {
  return CHANNEL_PAGES.map((p) => ({ id: p.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const page = channelPage((await params).id);
  if (!page) return {};
  const title = `${page.channel.searchPhrase} | RingPost`;
  return { title: { absolute: title }, description: page.lede, openGraph: { title, description: page.lede, url: `/channels/${page.id}` } };
}

/** /channels/<id>: one channel, what it does for the owner, how it works and how it's set up. */
export default async function ChannelPage({ params }: { params: Promise<{ id: string }> }) {
  const page = channelPage((await params).id);
  if (!page) notFound();
  const others = CHANNEL_MENU.filter((c) => c.logo !== page.id);
  return (
    <>
      <PageHero
        eyebrow={page.channel.name}
        title={page.headline}
        lede={page.lede}
        crumbs={[
          { name: "Channels", href: "/channels" },
          { name: page.channel.name, href: `/channels/${page.id}` },
        ]}
        aside={
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[24px] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(11,27,43,0.55)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.screen.src} alt={page.screen.alt} className="block w-full" />
            </div>
            <span className="absolute -left-5 -top-5 rounded-2xl bg-white p-2 shadow-xl">
              <ChannelLogo id={page.id} size={52} />
            </span>
          </div>
        }
      >
        <StartButtons />
      </PageHero>

      <Section className="!pt-6">
        <Container>
          <Reveal className="mb-10 flex flex-col gap-6 rounded-3xl bg-[linear-gradient(135deg,#f5f3ff_0%,#ecfeff_100%)] p-8 sm:flex-row sm:items-center">
            <p className="text-[44px] font-bold leading-none tracking-[-0.03em] text-ink">{page.stat.value}</p>
            <p className="max-w-md text-[16px] text-muted-ink">{page.stat.label}</p>
          </Reveal>
          <Eyebrow>What it does for your business</Eyebrow>
          <H2>Why owners switch it on.</H2>
          <InViewGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.benefits.map((b) => (
              <article key={b.title} className="rp-card rp-card-hover rounded-3xl p-6">
                <Check className="h-5 w-5 text-[#16a34a]" aria-hidden />
                <h3 className="mt-3 text-[17px] font-semibold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{b.body}</p>
              </article>
            ))}
          </InViewGroup>
        </Container>
      </Section>

      {CHANNEL_EXPLAINERS[page.id] && <ExplainerSections ex={CHANNEL_EXPLAINERS[page.id]} />}

      <Section tone="surface">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <H2>Up and running in minutes.</H2>
            <ol className="mt-8 flex flex-col gap-5">
              {page.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5b4ee6] text-[14px] font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block text-[17px] font-semibold text-ink">{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-muted-ink">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rp-card rounded-3xl p-7">
            <dl className="flex flex-col divide-y divide-line">
              {[
                { t: "What arrives", d: page.channel.arrives },
                { t: "What the AI does", d: page.channel.aiDoes },
                { t: "What you see", d: page.channel.ownerSees },
                { t: "Setting it up", d: page.channel.setup },
              ].map((r) => (
                <div key={r.t} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[#5b4ee6]">{r.t}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-ink">{r.d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <Eyebrow>Questions</Eyebrow>
          <H2>{page.channel.name}, answered.</H2>
          <div className="mt-8">
            <FaqList items={page.faq} structuredData />
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <H2>Every other channel, in the same inbox.</H2>
            <Link href="/product/inbox" className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
              See the inbox <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <InViewGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((c) => (
              <Link key={c.href} href={c.href} className="rp-card rp-card-hover flex items-center gap-3 rounded-2xl p-4">
                <ChannelLogo id={c.logo!} size={36} />
                <span className="text-[15px] font-semibold text-ink">{c.name}</span>
              </Link>
            ))}
          </InViewGroup>
        </Container>
      </Section>
    </>
  );
}
