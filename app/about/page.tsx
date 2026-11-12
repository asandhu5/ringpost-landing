import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, MessageSquareText, ShieldCheck, UserRound } from "lucide-react";
import { RingStill } from "@/components/site/three/ring-still";
import { Button } from "@/components/site/ui/button";
import { PageHeader } from "@/components/site/ui/page-header";
import { Card, Container, IconTile, Section, SectionHeading } from "@/components/site/ui/primitives";
import { GROUP_INFO } from "@/lib/content/groups";
import { TYPES } from "@/lib/content/industries";
import { ROUTES } from "@/lib/routes";
import { COMPANY, SITE, START_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About RingPost",
  description: `${SITE.name} is an AI business partner for local businesses: tell it about your business once, and it answers, books, posts and helps you grow. A product of ${COMPANY.legalName}.`,
  openGraph: { title: "About RingPost", url: "/about" },
};

const link = "font-semibold text-violet underline-offset-4 hover:underline";
const HOW = [
  { icon: HandHeart, t: "True to your business", d: "It answers only from what you've told it. It never invents a price, a time or a promise, and it hands over when it isn't sure." },
  { icon: MessageSquareText, t: "You stay in charge", d: "Posts, review replies and win-back messages wait for your OK unless you choose autopilot. Step into any conversation, any time." },
  { icon: UserRound, t: "Honest about being an AI", d: "It introduces itself as your virtual assistant and says when a call may be recorded." },
  { icon: ShieldCheck, t: "Your data is yours", d: "Your customers' details are used only to run RingPost for you. Never sold, never used for advertising." },
];

/** Who RingPost is for, the "tell it once" idea, how we build it, and the company. */
export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "About", href: ROUTES.about }]} eyebrow="About" title="Built for owners who would rather be doing the work." lede="RingPost is an AI business partner for local businesses. You tell it about your business once. It answers every call and message, books your customers, makes and posts your content, and helps you grow." />

      <Section fit tone="white">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Why we built it" title="Tell it once. Everything runs from it." />
            <div className="mt-4 max-w-[40rem] space-y-4 text-body text-muted-ink">
              <p>A local business explains itself again and again: to the answering service, the booking tool, the designer, the person who does the social media. Each one needs your prices, your hours and your way of talking, and each one gets a slightly different version.</p>
              <p>We built RingPost so an owner gives that knowledge once. One Business Brain, and every call, message, post and answer comes from it. <Link href={ROUTES.brain} className={link}>How the Business Brain works</Link></p>
            </div>
          </div>
          <RingStill id="about-ring" className="mx-auto h-40 w-40 lg:h-56 lg:w-56" />
        </Container>
      </Section>

      <Section fit>
        <Container>
          <SectionHeading eyebrow="How we build it" title="Four promises we keep." />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map((x) => (
              <Card as="li" key={x.t} className="p-5">
                <IconTile icon={x.icon} />
                <h3 className="mt-4 text-h3 font-semibold text-ink">{x.t}</h3>
                <p className="mt-2 text-small text-muted-ink">{x.d}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      <Section fit tone="white">
        <Container className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who it's for" title="Owner-run businesses that live on calls and bookings." />
            <p className="mt-4 text-body text-muted-ink">It works for one person answering between appointments, and for a busy team with several people taking bookings. {TYPES.length} kinds of business in {GROUP_INFO.length} groups each have their own way of answering and booking.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {GROUP_INFO.map((g) => (
                <li key={g.slug}><Link href={`/industries/${g.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-base px-3.5 text-small font-medium text-ink transition-colors duration-200 hover:border-primary-line hover:bg-primary-soft">{g.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="The company" title={COMPANY.legalName} />
            <p className="mt-4 text-body text-muted-ink">RingPost is a product of {COMPANY.legalName}.{COMPANY.registrationNumber ? ` Company registration number ${COMPANY.registrationNumber}.` : ""} We build from what owners ask for, and every change is tested against example conversations for each kind of business before it reaches yours.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={START_URL}>Get started</Button>
              <Button href={ROUTES.contact} variant="secondary">Contact us</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
