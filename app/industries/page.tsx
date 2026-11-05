import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GROUP_ICONS } from "@/components/site/group-page";
import { InViewGroup } from "@/components/site/motion";
import { Container, PageHero, Section } from "@/components/site/ui";
import { GROUP_INFO, tradesIn } from "@/lib/content/groups";
import { SOMETHING_ELSE, TYPES, shortLabel, slugFor } from "@/lib/content/industries";

const DESCRIPTION = `An AI front desk set up for your kind of business: ${TYPES.length} trades in ${GROUP_INFO.length} groups, from salons and clinics to plumbers, restaurants and law firms, each with its own rules and hand-offs.`;

export const metadata: Metadata = {
  title: "Industries: an AI front desk for your kind of business",
  description: DESCRIPTION,
  openGraph: { title: "RingPost industries", description: DESCRIPTION, url: "/industries" },
};

/** The industries hub (2026-11-04): ten groups first, each opening its own page with every
 * trade inside it; the trades are listed under each group so nothing is more than one click away. */
export default function IndustriesHub() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for the way your business works."
        lede={`Pick your industry. RingPost uses its rules: what never to say, what to hand to you, how bookings work and what to post. ${TYPES.length} kinds of business, plus "something else".`}
      />
      <Section className="!pt-0">
        <Container>
          <InViewGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GROUP_INFO.map((g) => {
              const Icon = GROUP_ICONS[g.icon];
              const trades = tradesIn(g);
              return (
                <article key={g.slug} className="rp-card rp-card-hover group relative flex flex-col overflow-hidden rounded-3xl">
                  <Link href={`/industries/${g.slug}`} className="flex flex-1 flex-col p-7">
                    <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-[0.12] transition-transform duration-500 group-hover:scale-125" style={{ background: g.tone }} />
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${g.tone}18`, color: g.tone }}>
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h2 className="mt-5 text-[22px] font-semibold tracking-tight text-ink">{g.name}</h2>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{g.tagline}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-glow group-hover:text-ink">
                      {trades.length} kinds of business <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                  <ul className="flex flex-wrap gap-1.5 border-t border-line px-7 py-4">
                    {trades.map((t) => (
                      <li key={t.id}>
                        <Link href={`/industries/${slugFor(t)}`} className="inline-flex rounded-full bg-surface-2 px-2.5 py-1 text-[12.5px] text-muted-ink transition-colors hover:text-ink">
                          {shortLabel(t)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </InViewGroup>
          <Link href={`/industries/${SOMETHING_ELSE.slug}`} className="rp-card rp-card-hover mt-6 flex flex-col gap-3 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
            <span>
              <span className="block font-display text-3xl text-ink">Something else?</span>
              <span className="mt-2 block text-[15px] text-muted-ink">Answer three questions and RingPost works out the rest.</span>
            </span>
            <ArrowRight className="h-6 w-6 text-glow" aria-hidden />
          </Link>
        </Container>
      </Section>
    </>
  );
}
