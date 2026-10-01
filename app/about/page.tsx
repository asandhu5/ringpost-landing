import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Section } from "@/components/site/ui";
import { TYPES } from "@/lib/content/industries";
import { COMPANY, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About RingPost",
  description: `${SITE.name} is an AI front desk for local businesses: it answers every customer, then helps bring in more. A product of ${COMPANY.legalName}.`,
  openGraph: { title: "About RingPost", url: "/about" },
};

const link = "text-glow underline underline-offset-2 hover:text-white";

/**
 * The entity name is read from lib/site.ts so it is byte-identical to /contact, the footer
 * and the structured data. No address and no email here: contact details live on /contact.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="The front desk small businesses never had time to staff." />

      <Section className="!pt-0">
        <Container narrow className="flex flex-col gap-14 text-[1.075rem] leading-relaxed text-muted-ink">
          <Block title="What RingPost is">
            <p>An AI front desk for local businesses. It answers calls, texts, WhatsApp, Instagram, Messenger and email, books appointments, and hands you the conversations that need a person.</p>
            <p>Then it helps bring customers in: social posts, comment replies, review requests, campaigns and win-back messages.</p>
          </Block>

          <Block title="Why">
            <p>Local businesses lose customers in the gaps: the call during a job, the DM after closing. Those losses never show up, because they never become a booking.</p>
            <p>
              An AI front desk is only worth having if you can trust it. So RingPost only states what&apos;s true about your business, and hands over when it isn&apos;t sure.{" "}
              <Link href="/product#guardrails" className={link}>
                The guardrails
              </Link>
            </p>
          </Block>

          <Block title="Who it's for">
            <p>
              Owner-run businesses that live on calls and bookings: salons, clinics, trades, restaurants, gyms and more. {TYPES.length} business types have their own rules.{" "}
              <Link href="/industries" className={link}>
                Industries
              </Link>
            </p>
          </Block>

          <Block title="The company">
            <p>
              RingPost is a product of <strong className="text-ink">{COMPANY.legalName}</strong>.{COMPANY.registrationNumber ? <> Company registration number {COMPANY.registrationNumber}.</> : null}{" "}
              <Link href="/contact" className={link}>
                Contact us
              </Link>
            </p>
          </Block>
        </Container>
      </Section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
      <h2 className="text-[15px] font-medium text-ink md:mt-1">{title}</h2>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
