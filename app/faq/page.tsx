import type { Metadata } from "next";
import { Container, CtaBand, FaqList, PageHero, Section } from "@/components/site/ui";
import { FAQ, type FaqItem } from "@/lib/content/faq";

export const metadata: Metadata = {
  title: "FAQ: pricing, the trial, channels and your data",
  description: "Answers to the questions owners ask about RingPost: what it costs, how the free trial works, keeping your number, what happens when it doesn't know, and who owns your data.",
  openGraph: { title: "RingPost FAQ", url: "/faq" },
};

const GROUPS: FaqItem["group"][] = ["Pricing and billing", "Getting started", "How it works", "Your data"];

/** One source (lib/content/faq.ts) for this page, the home FAQ and the FAQPage markup. */
export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Questions, answered straight." lede="If yours isn't here, ask our assistant on the demo page or reach a person on the contact page." />
      <Section className="!pt-0">
        <Container narrow className="flex flex-col gap-14">
          {GROUPS.map((g) => (
            <div key={g}>
              <h2 className="mb-5 font-display text-3xl text-ink">{g}</h2>
              <FaqList items={FAQ.filter((f) => f.group === g)} />
            </div>
          ))}
        </Container>
      </Section>
      {/* A single FAQPage for the whole page, generated from the same array as the copy above. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <CtaBand />
    </>
  );
}
