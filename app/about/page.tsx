import type { Metadata } from "next";
import Link from "next/link";
import { Container, CtaBand, Eyebrow, PageHero, Section } from "@/components/site/ui";
import { TYPES } from "@/lib/content/industries";
import { COMPANY, PUBLISHED_MAILBOXES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About RingPost",
  description: `What ${SITE.name} is building and why: an AI front desk for local businesses that answers every customer and then brings in more. ${SITE.name} is a product of ${COMPANY.legalName}.`,
  openGraph: { title: "About RingPost", url: "/about" },
};

/**
 * Concrete, not mission-statement filler (brief §9.14). The entity name is read from
 * lib/site.ts so it is byte-identical to /contact, the footer and the structured data.
 * No address is published, deliberately.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="We're building the front desk small businesses never had time to staff." />

      <Section className="!pt-0">
        <Container narrow className="flex flex-col gap-16 text-[1.075rem] leading-relaxed text-muted-ink">
          <Block title="What RingPost is">
            <p>
              RingPost is an AI front desk for local businesses. It answers the calls, texts, WhatsApp, Instagram and Messenger messages and emails a business gets, books the appointments, and hands the conversations that need a person to the owner.
            </p>
            <p>
              Then it does the work that brings customers in and usually doesn&apos;t get done: fresh posts for the business&apos;s socials, replies to comments, a review request after every visit, campaigns for the occasions that matter, and a way back to customers who haven&apos;t returned.
            </p>
          </Block>

          <Block title="Why we're building it">
            <p>
              Most local businesses lose customers in the gaps: the call that rings out during a job, the DM that waits until tomorrow, the enquiry that arrives after closing. Nobody sees those losses, because they never become a booking.
            </p>
            <p>
              We think an AI front desk is only worth having if the owner can trust what it says. So RingPost is built around one rule: it only states what&apos;s true about the business. Prices, times, bookings, phone numbers and links are checked against the business&apos;s own data before a reply is sent, and when it can&apos;t be sure, it says so and hands over. <Link href="/product#guardrails" className="text-glow underline underline-offset-2 hover:text-white">How the guardrails work</Link>.
            </p>
          </Block>

          <Block title="Who it's for">
            <p>
              Owner-run and small-team businesses that live on calls, messages and bookings: salons and clinics, plumbers and electricians, restaurants and cafés, gyms, law firms, and more. RingPost has {TYPES.length} business types with their own rules, and works for other businesses too. <Link href="/industries" className="text-glow underline underline-offset-2 hover:text-white">See the industries</Link>.
            </p>
          </Block>

          <Block title="What it doesn't do today">
            <p>We&apos;d rather tell you than have you find out. Today RingPost doesn&apos;t:</p>
            <ul className="flex flex-col gap-2 pl-5 [&>li]:list-disc">
              <li>give you a website chat to add to your own website;</li>
              <li>connect WhatsApp or email without a little help from us;</li>
              <li>provide phone numbers outside the US and Canada.</li>
            </ul>
            <p>
              If one of these matters to your business, <Link href="/contact" className="text-glow underline underline-offset-2 hover:text-white">tell us</Link>. It shapes what we build next.
            </p>
          </Block>

          <Block title="The company">
            <p>
              RingPost is a product of <strong className="text-ink">{COMPANY.legalName}</strong>.
              {COMPANY.registrationNumber ? <> Company registration number {COMPANY.registrationNumber}.</> : null}
            </p>
            <p>
              You can reach us at{" "}
              {PUBLISHED_MAILBOXES.map((m, i) => (
                <span key={m.address}>
                  {i > 0 ? ", " : ""}
                  <a href={`mailto:${m.address}`} className="text-glow underline underline-offset-2 hover:text-white">
                    {m.address}
                  </a>
                </span>
              ))}
              , or through the <Link href="/contact" className="text-glow underline underline-offset-2 hover:text-white">contact page</Link>. Our legal documents are linked at the foot of every page.
            </p>
          </Block>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-10">
      <Eyebrow className="md:mt-2">{title}</Eyebrow>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
