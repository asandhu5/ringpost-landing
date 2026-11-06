import type { Metadata } from "next";
import Link from "next/link";
import { BrainMap, IndustryBeforeAfter, Pipeline } from "@/components/site/studio/sections";
import { IndustryGallery } from "@/components/site/product-showcase";
import { StudioIntro } from "@/components/site/studio/intro";
import { Container, FaqList, H2, Lede, Section, StartButtons } from "@/components/site/ui";
import { GROUP_INFO } from "@/lib/content/groups";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";
import { siteVideos } from "@/lib/content/videos";

export const metadata: Metadata = {
  title: "Content Studio: images and videos made from your own business",
  description:
    "Turn a phone photo or a single line into a finished post for your kind of business. Content Studio uses your prices, hours, voice, logo and photos, adds your words exactly, and checks every piece before it reaches your Media Library.",
  openGraph: { url: "/content-studio" },
};

const FAQ = [
  { q: "Does it know my business already?", a: "Yes. It works from what you've saved in RingPost: your services and prices, opening hours, offers, brand voice, words to avoid, logo, colours and photos. The more you add on the Knowledge page, the more it sounds like you." },
  { q: "Can it get my prices or opening times wrong on a picture?", a: "Words on a picture, like an offer, a price or your phone number, are added by RingPost from your own details after the picture is made, then read back to check. They are never left to guesswork." },
  { q: "Can I use my own photos?", a: "Yes. Add up to three photos of your product, place or team, and the new picture keeps what they show. You can also post your own photos and videos as they are, on the Posting page." },
  { q: "Does anything get posted automatically?", a: "No. Everything lands in your Media Library first. You pick what to post, and it waits in Approvals for a yes, unless you switch on autopilot." },
  { q: "Which plans include it?", a: "Every plan can look around Content Studio. Making images and videos comes with Growth and Pro, which include a monthly allowance." },
];

export default function ContentStudioPage() {
  const videos = siteVideos();
  const portfolio = [...GROUP_INFO].map((g) => ({ slug: g.slug, name: g.name, tone: g.tone, content: g.content, videos: videos.filter((v) => v.group === g.slug).slice(0, 1), images: [g.image].filter((x): x is string => Boolean(x)) }));

  return (
    <>
      {/* Hero: every kind of business, before and after */}
      <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative">
          <StudioIntro actions={<StartButtons secondary={{ href: "#how", label: "How it works" }} />} />
          <div className="mt-16"><IndustryBeforeAfter items={INDUSTRY_SHOWCASE} /></div>
        </Container>
      </section>

      {/* Built on the business */}
      <Section id="how" tone="surface" className="scroll-mt-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>Built on what you already told RingPost.</H2>
            <Lede className="mt-4">The same knowledge that answers your phone writes your posts. Nothing starts from a blank page.</Lede>
          </div>
          <BrainMap />
        </Container>
      </Section>

      {/* Pipeline */}
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>Every piece takes the same careful path.</H2>
            <Lede className="mt-4">Checked before it is made and after, then waiting in your Media Library for you to pick.</Lede>
          </div>
          <Pipeline />
          <p className="mt-6 text-[15px] text-muted-ink">Picked something? <Link href="/posting" className="font-semibold text-glow hover:text-ink">See how it goes out to every app</Link>.</p>
        </Container>
      </Section>

      {/* Videos for every kind of business */}
      <Section tone="surface">
        <Container>
          <div className="mb-8 max-w-2xl">
            <H2>Short videos, made from a single picture.</H2>
            <Lede className="mt-4">Reels, TikToks and Shorts for your kind of business. Choose one to see what it can make.</Lede>
          </div>
          <IndustryGallery industries={portfolio} />
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <H2>Before you make something.</H2>
          <div className="mt-7"><FaqList items={FAQ} structuredData /></div>
          <StartButtons className="mt-8" />
        </Container>
      </Section>
    </>
  );
}
