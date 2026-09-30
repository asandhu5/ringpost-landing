import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Case studies",
  description: "RingPost case studies will be published here once real customers agree to be named.",
  openGraph: { title: "RingPost case studies", url: "/resources/case-studies" },
};

/**
 * Structure only (brief §9.3). There are no customers who have agreed to be named yet,
 * so this page says so plainly. NEVER add a case study here — not as a sample, not as a
 * placeholder with invented numbers, not "illustrative" — until a real customer has
 * agreed, in writing, to be named. To add one later, list it in CASE_STUDIES below.
 */
const CASE_STUDIES: { slug: string; business: string; summary: string }[] = [];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="No case studies yet, and we won't invent one."
        lede="RingPost is new. We'll publish case studies here once real businesses using it agree to be named, with their own words and their own numbers."
        crumbs={[
          { name: "Resources", href: "/resources" },
          { name: "Case studies", href: "/resources/case-studies" },
        ]}
      />
      <Section className="!pt-0">
        <Container narrow>
          {CASE_STUDIES.length === 0 ? (
            <div className="rp-card rounded-3xl border-dashed p-8 text-[15.5px] leading-relaxed text-muted-ink sm:p-10">
              <p>
                In the meantime, the best way to judge RingPost is to try it: talk to our own assistant on the <Link href="/demo" className="text-glow underline underline-offset-2">demo page</Link>, read exactly <Link href="/product#guardrails" className="text-glow underline underline-offset-2">what it will and won&apos;t say</Link>, or start the free trial and chat with your own AI before any customer does.
              </p>
            </div>
          ) : null}
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
