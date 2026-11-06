import Link from "next/link";
import { ArrowRight, BellRing, BookOpen, Check, MessageCircle, PenLine, ShieldCheck, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { GoogleReviews } from "@/components/site/phone/comment-apps";
import { ReplyStage } from "@/components/site/grow/reply-stage";
import { CommentDeck } from "@/components/site/grow/comment-deck";
import { Container, FaqList, H2, Lede, Section, StartButtons } from "@/components/site/ui";
import type { Product } from "@/lib/content/products";

export const COMMENT_PLATFORMS = ["instagram", "facebook", "tiktok", "youtube", "x", "linkedin", "threads", "bluesky"];

const HOW = [
  { Icon: MessageCircle, t: "It reads the comment", b: "What they asked, how they feel and whether it needs you. A question, a compliment and a complaint each get a different reply." },
  { Icon: BookOpen, t: "It checks your knowledge", b: "Prices, hours, offers and policies from your Knowledge page. It never invents a price, a promise or an opening time." },
  { Icon: PenLine, t: "It writes in your voice", b: "Your tone, your words, and none of the words you told it to avoid. Short on X, warm on Instagram, careful on Google." },
  { Icon: ShieldCheck, t: "You stay in charge", b: "Approve, edit or skip each reply. Switch on autopilot for the platforms you trust, and low ratings always come to you first." },
];

export function ReviewsPage({ product }: { product: Product }) {
  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">Every comment and review, answered in your voice.</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink sm:text-xl">Customers comment on your posts and review you on Google. RingPost sees each one, reads it with what it knows about your business, and writes the reply you would, ready for you to approve.</p>
            <StartButtons secondary={{ href: "#how", label: "How it writes a reply" }} className="mt-8 justify-center" />
            <div className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Where RingPost answers">
              <span title="Google reviews" className="flex h-[34px] w-[34px] items-center justify-center rounded-[10px] bg-white text-[15px] font-bold text-[#4285f4] shadow-[0_6px_18px_-6px_rgba(0,0,0,0.4)] ring-1 ring-line">G</span>
              {COMMENT_PLATFORMS.map((p) => <span key={p} title={p}><ChannelLogo id={p} size={34} /></span>)}
            </div>
          </div>
          <div className="mt-12"><ReplyStage /></div>
        </Container>
      </section>

      <Section id="how" tone="surface" className="scroll-mt-24">
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>How RingPost writes a reply.</H2>
            <Lede className="mt-4">The same knowledge that answers your phone answers your comments, so every reply is right about your business and sounds like you.</Lede>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW.map(({ Icon, t, b }, i) => (
              <li key={t} className="rp-card rp-card-hover rounded-[24px] p-6">
                <span className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5b4ee6] text-white"><Icon className="h-5 w-5" aria-hidden /></span><span className="text-[14px] font-semibold tabular-nums text-faint">{i + 1}</span></span>
                <p className="mt-5 text-[17px] font-bold tracking-tight text-ink">{t}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">{b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="flex items-center gap-2 text-[15px] font-semibold text-[#b45309]"><Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />Google reviews</p>
            <H2 className="mt-3">More reviews, and a thoughtful answer to each.</H2>
            <Lede className="mt-4">Your Google reviews arrive next to your comments, each with a reply drafted from your own details. Approve it and it appears under the review as the owner&apos;s response.</Lede>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "A review request after every completed visit, to every customer, never only the happy ones",
                "A thank-you for every good review, in your words",
                "Low ratings sent to your phone first, before anything is posted",
                "Every reply checked against your facts",
              ].map((x) => <li key={x} className="flex gap-2.5 text-[15.5px] text-ink"><Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />{x}</li>)}
            </ul>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[14.5px] text-amber-950"><BellRing className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />A two-star review lands on your phone with a calm reply ready, so you decide what to say.</div>
          </div>
          <div className="mx-auto w-[280px]">
            <IPhone16ProMax width={280}><GoogleReviews t={{ business: { name: "Brightside Dental", handle: "brightsidedental", color: "#0284c7" }, post: "", comment: { name: "Priya", handle: "priya", color: "#7c3aed", text: "So calm and gentle. I used to dread the dentist, not any more.", time: "1 day ago", stars: 5 }, reply: "Thank you so much! We're so glad your visit felt calm. See you at your next check-up.", replied: true }} /></IPhone16ProMax>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>Every platform, one list, your voice.</H2>
            <Lede className="mt-4">Comments from Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads and Bluesky come into one place. The reply goes back where the comment came from.</Lede>
          </div>
          <CommentDeck />
        </Container>
      </Section>

      {product.faq && (
        <Section>
          <Container narrow>
            <H2>Reviews and comments, answered.</H2>
            <div className="mt-7"><FaqList items={product.faq} structuredData /></div>
          </Container>
        </Section>
      )}

      <Section tone="surface">
        <Container narrow className="text-center">
          <H2>Look after your reputation without living in the apps.</H2>
          <StartButtons className="mt-8 justify-center" />
          <Link href="/grow" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">Everything in Grow <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Container>
      </Section>
    </>
  );
}
