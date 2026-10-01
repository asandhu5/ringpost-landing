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
      <PageHero eyebrow="FAQ" title="Questions, answered." lede="Not here? Ask Zara in the corner, or use the contact page." />
      <Section className="!pt-0">
        <Container narrow className="flex flex-col gap-14">
          {GROUPS.map((g) => (
            <div key={g}>
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
