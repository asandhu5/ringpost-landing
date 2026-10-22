import type { Metadata } from "next";
import { Container, FaqList, PageHero, Section } from "@/components/site/ui";
import { SITE_FAQ, type FaqItem } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ: setup, channels, how it works and your data",
  description: "Answers to the questions owners ask about RingPost: keeping your number, setup, what happens when it doesn't know, and who owns your data.",
  openGraph: { title: "RingPost FAQ", url: "/faq" },
};

const GROUPS: FaqItem["group"][] = ["Getting started", "How it works", "Your data"];

/** Pricing questions live only on /pricing. One source (lib/content/faq.ts) for the copy and the FAQPage markup. */
export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered." lede="Not here? Ask Zara in the corner, or use the contact page.">
        <nav aria-label="Topics" className="flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <a key={g} href={`#${g.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className="inline-flex min-h-10 items-center rounded-full border border-line-strong bg-white/[0.02] px-4 text-[13.5px] text-muted-ink transition-colors hover:border-glow/50 hover:text-ink">
              {g}
            </a>
          ))}
        </nav>
      </PageHero>
      <Section className="!pt-0">
        <Container narrow className="flex flex-col gap-14">
          {GROUPS.map((g) => (
            <div key={g} id={g.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-28">
              <h2 className="mb-5 font-display text-3xl text-ink">{g}</h2>
              <FaqList items={SITE_FAQ.filter((f) => f.group === g)} />
            </div>
          ))}
        </Container>
      </Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: SITE_FAQ.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
