import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, ChartNoAxesCombined, Check, MessageSquareHeart, UsersRound } from "lucide-react";
import { AdvisorVisual, InsightsVisual, ReviewsVisual, WinbackVisual } from "@/components/site/grow/visuals";
import { Container, H2, Lede, Section, StartButtons } from "@/components/site/ui";

const DESCRIPTION = "Grow with RingPost: Google reviews and comments answered in your voice, quiet customers brought back, plain-English insights and an AI you can ask about your business.";

export const metadata: Metadata = {
  title: "Grow: reviews and comments, win-back, insights and Talk to AI",
  description: DESCRIPTION,
  openGraph: { title: "Grow with RingPost", description: DESCRIPTION, url: "/grow" },
};

/** The four Grow tools: what's in each, and what it does for the business. */
const TOOLS = [
  {
    slug: "reviews",
    Icon: MessageSquareHeart,
    tone: "#d97706",
    text: "#b45309",
    name: "Reviews and comments",
    title: "Every review and comment answered, in your voice.",
    body: "Google reviews and the comments on your Instagram, Facebook and other posts arrive in one list, each with a reply already written from your own details.",
    inside: [
      "Google reviews and post comments in one list",
      "A reply drafted for each, in your voice",
      "The commenter's picture and the post they commented on",
      "A review request after every completed visit",
      "Low ratings sent to your phone before anything is posted",
    ],
    forYou: "Customers see a business that answers. Good reviews get a thank-you, unhappy ones get you, and every visit asks for a review, so your rating keeps climbing without you chasing it.",
    Visual: ReviewsVisual,
  },
  {
    slug: "winback",
    Icon: UsersRound,
    tone: "#16a34a",
    text: "#15803d",
    name: "Win-back",
    title: "Bring back the customers who drifted.",
    body: "RingPost sorts your customers by how long it's been since their last visit. Pick a group, check the message it wrote, and send. Replies come into your inbox and book like any other chat.",
    inside: [
      "Groups made for you: slipping away, lapsed, long gone, and asked but never booked",
      "A message written from your services and offers",
      "Only customers who agreed to messages, with an easy way to stop",
      "Who replied and who booked, for every message",
    ],
    forYou: "The cheapest customer is one you already had. Win-back fills quiet days with people who already know you, without you writing a single message.",
    Visual: WinbackVisual,
  },
  {
    slug: "insights",
    Icon: ChartNoAxesCombined,
    tone: "#5b4ee6",
    text: "#4f46e5",
    name: "Insights",
    title: "Where customers come from, in plain words.",
    body: "How many people got in touch, how many booked, which channel brought them, how your posts did and what customers keep asking, each with a short note on what it means.",
    inside: [
      "People who got in touch, bookings and follow-ups",
      "Calls and every message channel compared",
      "Views, likes and comments for every post",
      "The questions customers ask most",
    ],
    forYou: "Spend your time and money where the bookings really come from, and add the answers customers keep asking for so nobody has to wait.",
    Visual: InsightsVisual,
  },
  {
    slug: "advisor",
    Icon: Bot,
    tone: "#0891b2",
    text: "#0e7490",
    name: "Talk to AI",
    title: "Ask anything about your business.",
    body: "Like texting a business partner who has read every call, booking, review and post. Ask how last month went or what to do this week, and get a straight answer with the numbers behind it.",
    inside: [
      "Answers from your own calls, bookings, reviews and posts",
      "One clear next step with every answer",
      "Knows your plan and what you can switch on",
      "Your chats saved to come back to, and a new chat any time",
    ],
    forYou: "No reports to read and no spreadsheets. Ask in your own words and know what to do next.",
    Visual: AdvisorVisual,
  },
] as const;

export default function GrowPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-28 sm:pt-32">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative">
          <div className="max-w-3xl">
            <h1 className="text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">Win more customers, and keep them.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink sm:text-xl">Answering is half the job. Grow looks after your reputation, brings quiet customers back and tells you, in plain words, what&apos;s working.</p>
            <StartButtons className="mt-8" />
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map(({ slug, Icon, tone, text, name, forYou }) => (
              <a key={slug} href={`#${slug}`} className="rp-feature-card group flex flex-col rounded-[24px] border-2 bg-white p-5" style={{ borderColor: `${tone}33` }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl text-white" style={{ background: tone }}><Icon className="h-5 w-5" aria-hidden /></span>
                <span className="mt-4 text-[18px] font-bold tracking-tight text-ink">{name}</span>
                <span className="mt-1.5 line-clamp-3 text-[14px] leading-relaxed text-muted-ink">{forYou}</span>
                <span className="mt-auto pt-4 text-[14px] font-semibold" style={{ color: text }}>See how <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {TOOLS.map(({ slug, Icon, tone, text, name, title, body, inside, forYou, Visual }, i) => (
        <Section key={slug} id={slug} tone={i % 2 === 0 ? "surface" : undefined} className="scroll-mt-24">
          <Container className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="flex items-center gap-2 text-[15px] font-semibold" style={{ color: text }}><Icon className="h-4.5 w-4.5" aria-hidden />{name}</p>
              <H2 className="mt-3">{title}</H2>
              <Lede className="mt-4">{body}</Lede>
              <p className="mt-7 text-[14px] font-semibold text-ink">What&apos;s in it</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {inside.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15.5px] text-ink"><Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />{p}</li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl border-l-4 bg-white p-5 shadow-[0_20px_50px_-40px_rgba(11,27,43,0.6)]" style={{ borderColor: tone }}>
                <p className="text-[14px] font-semibold text-ink">What it does for you</p>
                <p className="mt-1.5 text-[15.5px] leading-relaxed text-muted-ink">{forYou}</p>
              </div>
              <Link href={`/product/${slug}`} className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
                More about {name.toLowerCase()} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <Visual />
          </Container>
        </Section>
      ))}

      <Section>
        <Container narrow className="text-center">
          <H2>Start with Talk to AI. Add the rest with Pro.</H2>
          <Lede className="mx-auto mt-4">Talk to AI comes with Growth; reviews and comments, win-back and insights come with Pro. Every plan can look around first.</Lede>
          <StartButtons className="mt-8 justify-center" />
        </Container>
      </Section>
    </>
  );
}
