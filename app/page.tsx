import type { Metadata } from "next";
import { HomeHero } from "@/components/site/home/hero";
import { TellOnce } from "@/components/site/home/tell-once";
import { InboxSection } from "@/components/site/home/inbox-section";
import { DayStory } from "@/components/site/home/day-story";
import { PostBand } from "@/components/site/home/post-band";
import { ContentTeaser } from "@/components/site/home/content-teaser";
import { GrowSection } from "@/components/site/home/grow-section";
import { IndustryTiles } from "@/components/site/home/industry-tiles";
import { QuestionsSection, TrustSection } from "@/components/site/home/closing";
import { Button } from "@/components/site/ui/button";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { JsonLd } from "@/components/site/ui";
import { GROUP_INFO } from "@/lib/content/groups";
import { TYPES } from "@/lib/content/industries";
import { SHOWCASE } from "@/lib/content/showcase";
import { PLANS } from "@/lib/plans";
import { ROUTES } from "@/lib/routes";
import { COMPANY, SITE } from "@/lib/site";

const HOME_DESCRIPTION = "RingPost is the AI business partner for local businesses. It answers every call and message, books your customers, makes and posts your content, and helps you grow.";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name}: your AI business partner. Answers, books, grows.` },
  description: HOME_DESCRIPTION,
  openGraph: { title: `${SITE.name}: your AI business partner`, description: HOME_DESCRIPTION, url: "/" },
};

/** Organization on the site root: no address, and contact details live on /contact. */
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: COMPANY.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  description: SITE.description,
  contactPoint: { "@type": "ContactPoint", contactType: "customer support", url: `${SITE.url}/contact` },
  ...(COMPANY.registrationNumber ? { identifier: COMPANY.registrationNumber } : {}),
};

/** The product itself, with its current price range, so search engines and AI
 * assistants can say what it is and what it costs. Prices come from the plan catalog. */
const PRODUCT = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android (in the browser)",
  audience: { "@type": "BusinessAudience", audienceType: "Local and small businesses" },
  featureList: [
    "AI receptionist that answers phone calls 24/7",
    "Missed-call callbacks",
    "Books, moves and cancels appointments in the business's calendar",
    "Answers WhatsApp, Instagram, Facebook Messenger and email",
    "Daily social media images, videos and posting",
    "Replies to reviews and social comments",
    "Customer win-back and business insights",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: Math.min(...PLANS.map((p) => p.monthlyUsd)),
    highPrice: Math.max(...PLANS.map((p) => p.monthlyUsd)),
    offerCount: PLANS.length,
    url: `${SITE.url}/pricing`,
  },
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

/**
 * The home page: the promise and a live demo up top, then the one thing nobody else does —
 * calls, messages on every channel, bookings, content, posting, comments, insights and Talk
 * to AI in one platform — in plain words, with the specifics one switch away. Real
 * (RingPost-made) photos tell the after-hours story. The full plan table lives on /pricing.
 */
/** The site itself: tells search engines the site's name, so results read "RingPost". */
const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
};

/** One photo tile per group, from the showcase set (final loops are made in phase 4). */
const INDUSTRY_TILES = GROUP_INFO.map((g) => {
  const shot = SHOWCASE.find((x) => x.group === g.name);
  return { name: g.name, href: `/industries/${g.slug}`, image: shot?.image ?? g.image ?? "/showcase/beauty-post.webp", video: shot?.video };
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={WEBSITE} />
      <JsonLd data={PRODUCT} />

      <HomeHero />
      <TellOnce />
      <InboxSection />

      <DayStory />
      <ContentTeaser />
      <PostBand />
      <GrowSection />

      <Section fit tone="white">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <SectionHeading eyebrow="Industries" title="Built for your kind of business." />
            <Button href={ROUTES.industries} variant="text">
              See all {TYPES.length} kinds of business
            </Button>
          </div>
          <div className="mt-[clamp(1.25rem,4svh,2.25rem)]">
            <IndustryTiles tiles={INDUSTRY_TILES} />
          </div>
        </Container>
      </Section>

      <TrustSection />
      <QuestionsSection />
    </>
  );
}
