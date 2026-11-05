import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ChatDemo, InsightsDemo } from "@/components/site/explainers";
import { Container, Eyebrow, H2, Lede, PageHero, Section, StartButtons } from "@/components/site/ui";
import { PRODUCT_EXPLAINERS } from "@/lib/content/explainers";

const DESCRIPTION = "Grow with RingPost: Google reviews and comments answered in your voice, quiet customers brought back, plain-English insights and an AI you can ask about your business.";

export const metadata: Metadata = {
  title: "Grow: reviews, win-back, insights and Talk to AI",
  description: DESCRIPTION,
  openGraph: { title: "Grow with RingPost", description: DESCRIPTION, url: "/grow" },
};

/** The four Grow tools (2026-11-04), each shown working, with what it does and a link to its own page. */
const TOOLS = [
  {
    slug: "reviews",
    eyebrow: "Reviews and comments",
    title: "Every review and comment answered, in your voice.",
    body: "Google reviews and comments on Instagram, Facebook, TikTok, YouTube and more arrive in one list, each with a reply already written. Approve it with one tap and it's posted where it came from.",
    points: ["A reply drafted for every review and comment", "Commenter's picture and the post they commented on", "Nothing is posted without your yes"],
  },
  {
    slug: "winback",
    eyebrow: "Win-back",
    title: "Bring back the customers who drifted.",
    body: "RingPost groups the people who haven't been in for a while. Pick a group, your AI writes the message from your services and offers, you check it and send. Replies are booked like any other chat.",
    points: ["Groups made for you: slipping away, lapsed, long gone", "Only customers who agreed to texts", "See who replied and who booked"],
  },
  {
    slug: "insights",
    eyebrow: "Insights",
    title: "Where customers come from, in plain words.",
    body: "How many people got in touch, how many booked, which channel brought them and how your posts did, with a short note on what each number means and what to do next.",
    points: ["Customers, bookings and follow-ups", "Calls, chats and posts compared", "Views, likes and comments for every post"],
  },
  {
    slug: "advisor",
    eyebrow: "Talk to AI",
    title: "Ask anything about your business.",
    body: "Like texting a sharp business partner who has read every call, booking, review and post. Ask how last month went or what to do this week, and get a straight answer with the numbers behind it.",
    points: ["Answers from your own numbers", "One clear next step every time", "Your chats are saved to come back to"],
  },
] as const;

export default function GrowPage() {
  return (
    <>
      <PageHero
        eyebrow="Grow"
        title="Win more customers, and keep them."
        lede="Answering is half the job. Grow looks after your reputation, brings quiet customers back and tells you, in plain words, what's working."
        crumbs={[{ name: "Grow", href: "/grow" }]}
      >
        <StartButtons />
      </PageHero>

      {TOOLS.map((t, i) => {
        const ex = PRODUCT_EXPLAINERS[t.slug];
        const visual = t.slug === "insights" ? <InsightsDemo /> : ex?.demo ? <ChatDemo channel={ex.demo.channel} lines={ex.demo.lines} /> : null;
        return (
          <Section key={t.slug} tone={i % 2 ? "surface" : undefined} id={t.slug} className="scroll-mt-28">
            <Container className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <Eyebrow>{t.eyebrow}</Eyebrow>
                <H2>{t.title}</H2>
                <Lede className="mt-4">{t.body}</Lede>
                <ul className="mt-6 flex flex-col gap-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[15.5px] text-ink">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={`/product/${t.slug}`} className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">
                  How {t.eyebrow.toLowerCase()} works <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              {visual}
            </Container>
          </Section>
        );
      })}
    </>
  );
}
