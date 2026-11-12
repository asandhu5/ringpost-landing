import type { Metadata } from "next";
import { FaqSearch } from "@/components/site/faq-search";
import { PageHeader } from "@/components/site/ui/page-header";
import { Container, Section } from "@/components/site/ui/primitives";
import { PRICING_FAQ, SITE_FAQ } from "@/lib/content/faq";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "FAQ: setup, messages, billing and your data",
  description: "Answers to the questions owners ask about RingPost: keeping your number, setup, what happens when it doesn't know, billing, and who owns your data.",
  openGraph: { title: "RingPost FAQ", url: "/faq" },
};

const pick = (...names: string[]) => SITE_FAQ.filter((f) => names.includes(f.group)).map(({ q, a }) => ({ q, a }));
const GROUPS = [
  { name: "Setup", items: pick("Getting started", "How it works") },
  { name: "Calls & messages", items: pick("Calls and messages") },
  { name: "Content, posting & growth", items: pick("Content and posting", "Growing your business") },
  { name: "Billing", items: PRICING_FAQ.map(({ q, a }) => ({ q, a })) },
  { name: "Your data", items: pick("Your data") },
];

/** One source (lib/content/faq.ts) for the questions, the search and the FAQPage markup. */
export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.items);
  return (
    <>
      <PageHeader crumbs={[{ name: "FAQ", href: ROUTES.faq }]} eyebrow="FAQ" title="Questions, answered." lede="Search, or pick a topic. Not here? Ask in the chat in the corner." />
      <Section className="!pt-4">
        <Container className="max-w-[880px]">
          <FaqSearch groups={GROUPS} />
        </Container>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: all.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })) }).replace(/</g, "\\u003c") }} />
    </>
  );
}
