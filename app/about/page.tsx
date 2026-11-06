import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Section } from "@/components/site/ui";
import { TYPES } from "@/lib/content/industries";
import { COMPANY, SITE } from "@/lib/site";
import { InViewGroup } from "@/components/site/motion";

export const metadata: Metadata = {
  title: "About RingPost",
  description: `${SITE.name} is an AI front desk for local businesses: it answers every customer, then helps bring in more. A product of ${COMPANY.legalName}.`,
  openGraph: { title: "About RingPost", url: "/about" },
};

const link = "text-glow underline underline-offset-2 hover:text-ink";

/**
 * The entity name is read from lib/site.ts so it is byte-identical to /contact, the footer
 * and the structured data. No address and no email here: contact details live on /contact.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="The front desk small businesses never had time to staff." />

      <Section className="!pt-0">
        <Container narrow>
          <InViewGroup className="flex flex-col gap-14 text-[1.075rem] leading-relaxed text-muted-ink">
          <Block title="What RingPost is">
            <p>An AI front desk and marketing assistant for local businesses. It answers calls, texts, WhatsApp, Instagram, Messenger and email in your business&apos;s name, books appointments into your real calendar, and hands you the conversations that need a person.</p>
            <p>Then it helps bring customers in: images and short videos made from your own photos, posts on every platform you use, replies to comments and Google reviews, win-back messages to customers who drifted, and plain-English insights with an AI you can ask about any of it.</p>
          </Block>

          <Block title="Why we built it">
            <p>Local businesses lose customers in the gaps: the call during a job, the message after closing, the comment nobody had time to answer, the regular who quietly stopped coming. Those losses never show up anywhere, because they never become a booking.</p>
            <p>Hiring someone to cover every channel, every evening and every weekend is out of reach for most small businesses. Marketing agencies are expensive and don&apos;t know the business. We wanted something an owner could switch on in an evening that genuinely knows their prices, hours and way of talking.</p>
          </Block>

          <Block title="How we build it">
            <p><strong className="text-ink">True to your business.</strong> RingPost answers only from what you&apos;ve told it. It never invents a price, a time or a promise, and it hands over when it isn&apos;t sure.{" "}
              <Link href="/product#guardrails" className={link}>The guardrails</Link>
            </p>
            <p><strong className="text-ink">You stay in charge.</strong> Posts, review replies and win-back messages wait for your approval unless you choose autopilot. You can step into any conversation at any time.</p>
            <p><strong className="text-ink">Honest about being an AI.</strong> It introduces itself as your virtual assistant and says when a call is recorded.{" "}
              <Link href="/ai-disclosure" className={link}>Recording and AI</Link>
            </p>
            <p><strong className="text-ink">Your data is yours.</strong> Your customers&apos; details are used only to run RingPost for you: never sold, never used for advertising, never shared with another business.{" "}
              <Link href="/privacy" className={link}>Privacy</Link>
            </p>
          </Block>

          <Block title="Who it's for">
            <p>
              Owner-run businesses that live on calls and bookings: salons and spas, clinics and dental practices, gyms and studios, restaurants and cafés, trades, garages, offices, groomers and childcare, shops, hotels and venues. {TYPES.length} business types each have their own rules for what to say, what to hand to you and how to book.{" "}
              <Link href="/industries" className={link}>
                Industries
              </Link>
            </p>
            <p>It works for a one-person business answering between appointments, and for a busy team with several people taking bookings.</p>
          </Block>

          <Block title="Where we're going">
            <p>Every month RingPost learns more of the jobs a front desk does. We build from what owners ask for, and every change is tested against example conversations for each kind of business before it reaches yours.</p>
          </Block>

          <Block title="The company">
            <p>
              RingPost is a product of <strong className="text-ink">{COMPANY.legalName}</strong>.{COMPANY.registrationNumber ? <> Company registration number {COMPANY.registrationNumber}.</> : null}{" "}
              <Link href="/contact" className={link}>
                Contact us
              </Link>
            </p>
          </Block>
          </InViewGroup>
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
