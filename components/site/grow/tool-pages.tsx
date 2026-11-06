import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck, Check, Gift, Hand, Lightbulb, MessageCircle, Phone, ShieldCheck, Sparkles, Star, TrendingUp, UserRoundCheck, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WinbackHero } from "@/components/site/grow/winback-hero";
import { InsightsHero } from "@/components/site/grow/insights-hero";
import { AdvisorHero } from "@/components/site/grow/advisor-hero";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Container, FaqList, H2, Lede, Section, StartButtons } from "@/components/site/ui";
import type { Product } from "@/lib/content/products";

function GrowHero({ title, lede, children }: { title: string; lede: string; children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pt-32">
      <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink sm:text-xl">{lede}</p>
          <StartButtons secondary={{ href: "/grow", label: "Everything in Grow" }} className="mt-8 justify-center" />
        </div>
        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}

function Cards({ items, cols = 4 }: { items: { Icon: LucideIcon; t: string; b: string; tag?: string }[]; cols?: 3 | 4 }) {
  return (
    <ul className={`grid gap-4 sm:grid-cols-2 ${cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map(({ Icon, t, b, tag }) => (
        <li key={t} className="rp-card rp-card-hover rounded-[24px] p-6">
          <span className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5b4ee6] text-white"><Icon className="h-5 w-5" aria-hidden /></span>{tag && <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-muted-ink">{tag}</span>}</span>
          <p className="mt-5 text-[17px] font-bold tracking-tight text-ink">{t}</p>
          <p className="mt-2 text-[14.5px] leading-relaxed text-muted-ink">{b}</p>
        </li>
      ))}
    </ul>
  );
}

function Ending({ product, title }: { product: Product; title: string }) {
  return (
    <>
      {product.faq && (
        <Section>
          <Container narrow>
            <H2>{product.name}, answered.</H2>
            <div className="mt-7"><FaqList items={product.faq} structuredData /></div>
          </Container>
        </Section>
      )}
      <Section tone="surface">
        <Container narrow className="text-center">
          <H2>{title}</H2>
          <StartButtons className="mt-8 justify-center" />
          <Link href="/grow" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-glow hover:text-ink">Everything in Grow <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </Container>
      </Section>
    </>
  );
}

/* ── Win-back ─────────────────────────────────────────────────── */
export function WinbackPage({ product }: { product: Product }) {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-28 sm:pt-32">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative">
          <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="text-[clamp(2.5rem,5.4vw,4.3rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">Bring back the customers who drifted.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink sm:text-xl">RingPost sorts your customers by their last visit. Pick a group, jot a rough idea, and your AI writes the text from your own services and offers. Replies are answered and booked like any other chat.</p>
              <StartButtons secondary={{ href: "/grow", label: "Everything in Grow" }} className="mt-8" />
            </div>
            <dl className="grid grid-cols-2 gap-3">
              {[{ k: "4", v: "groups, made for you" }, { k: "1", v: "rough line is all you write" }, { k: "100%", v: "opted-in customers only" }, { k: "STOP", v: "added to every message" }].map((x) => (
                <div key={x.v} className="rp-card rounded-2xl p-4"><dt className="text-[26px] font-bold tracking-tight text-ink">{x.k}</dt><dd className="text-[13px] text-muted-ink">{x.v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mt-12"><WinbackHero /></div>
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>Four groups, made for you.</H2>
            <Lede className="mt-4">Your customers sorted by how long it has been, each group with the message that suits it.</Lede>
          </div>
          <Cards items={[
            { Icon: Hand, t: "Slipping away", tag: "1 to 2 months", b: "A friendly check-in and a gentle reminder to book the next visit." },
            { Icon: Sparkles, t: "Lapsed", tag: "2 to 4 months", b: "Something new or seasonal you offer, and an invitation back this month." },
            { Icon: Gift, t: "Long gone", tag: "4 months or more", b: "A warm welcome back, a thank-you if an offer is running, and how easy it is to book." },
            { Icon: UserRoundCheck, t: "Asked but never booked", tag: "No visit yet", b: "They got in touch but never came in: a short, helpful nudge to a first visit." },
          ]} />
        </Container>
      </Section>

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <H2>Written from your business, sent with care.</H2>
            <Lede className="mt-4">Every message starts from your services, your current offers and the time of year, in your tone. You read it before anything is sent.</Lede>
            <ul className="mt-6 flex flex-col gap-3">
              {["Sent by text message from your business number, with WhatsApp on the way", "Only to customers who agreed to messages", "Never sent during quiet hours", "“Reply STOP to opt out.” added to every message", "Offers only when you have one running, never a made-up discount"].map((x) => (
                <li key={x} className="flex gap-2.5 text-[15.5px] text-ink"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />{x}</li>
              ))}
            </ul>
          </div>
          <div className="rp-card rounded-[28px] p-6">
            <p className="text-[14px] font-semibold text-ink">What happens after you press send</p>
            <ol className="mt-5 flex flex-col gap-4">
              {[
                { Icon: MessageCircle, t: "Replies come into your inbox", b: "Every reply is answered by RingPost like any other chat, from your knowledge." },
                { Icon: CalendarCheck, t: "Yes becomes a booking", b: "It checks your real availability and books them in, with a confirmation." },
                { Icon: TrendingUp, t: "You see what it brought back", b: "Who replied and who booked, for every message you sent." },
              ].map(({ Icon, t, b }) => (
                <li key={t} className="flex gap-3.5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3f1ff] text-glow"><Icon className="h-5 w-5" aria-hidden /></span><span><span className="block text-[15.5px] font-semibold text-ink">{t}</span><span className="block text-[14.5px] text-muted-ink">{b}</span></span></li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Ending product={product} title="Your next busy day might already be in your customer list." />
    </>
  );
}

/* ── Insights ─────────────────────────────────────────────────── */
export function InsightsPage({ product }: { product: Product }) {
  return (
    <>
      <GrowHero title="Know where your customers come from." lede="How many people got in touch, how many booked, which channel brought them and how your posts did, with a short note on what each number means and what to do next.">
        <InsightsHero />
      </GrowHero>

      <Section tone="surface">
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>The numbers that matter, in plain words.</H2>
            <Lede className="mt-4">No dashboards to learn. Each number comes with a sentence that says what it means.</Lede>
          </div>
          <Cards items={[
            { Icon: UsersRound, t: "Customers and bookings", b: "People who got in touch, how many booked, and the follow-ups still waiting for you." },
            { Icon: Phone, t: "Where they came from", b: "Calls, WhatsApp, Instagram, Messenger, texts and email compared, by the bookings each one brought." },
            { Icon: Star, t: "How your posts did", b: "Views, likes and comments for every post on every platform, and a dash where a platform doesn't report a number." },
            { Icon: Lightbulb, t: "What customers keep asking", b: "The questions that come up again and again, so you can add the answer once and never be asked twice." },
          ]} />
        </Container>
      </Section>

      <Section>
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <H2>From a number to a next step.</H2>
            <Lede className="mt-4">Insights tells you what changed and what to do about it, the same way Talk to AI does when you ask.</Lede>
          </div>
          <ul className="flex flex-col gap-3">
            {[
              { k: "Instagram messages up 40% this month", v: "Pin your price list to your Instagram highlights." },
              { k: "“Do you have parking?” asked 14 times", v: "Add parking to your Knowledge page so it's answered every time." },
              { k: "Videos got the most views", v: "Switch on the weekly video in Content Studio." },
            ].map((x) => (
              <li key={x.k} className="rp-card rounded-2xl p-5">
                <p className="text-[15.5px] font-semibold text-ink">{x.k}</p>
                <p className="mt-1 flex items-center gap-2 text-[14.5px] text-muted-ink"><ArrowRight className="h-4 w-4 text-glow" aria-hidden />{x.v}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Ending product={product} title="Spend your time where the bookings really come from." />
    </>
  );
}

/* ── Talk to AI ───────────────────────────────────────────────── */
const QUESTIONS = [
  "How did last month go?",
  "Which posts brought the most bookings?",
  "Who should I win back this week?",
  "What are customers asking that we don't answer?",
  "Which day is quietest, and what can I do about it?",
  "How are my Google reviews doing?",
];

export function AdvisorPage({ product }: { product: Product }) {
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-50" />
        <Container className="relative grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <h1 className="text-[clamp(2.4rem,4.8vw,4rem)] font-bold leading-[1.02] tracking-[-0.04em] text-ink">Ask anything about your business.</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-ink">Like texting a business partner who has read every call, booking, review and post. Ask how things are going or what to do next, and get a straight answer with your own numbers and one clear next step.</p>
            <StartButtons secondary={{ href: "/grow", label: "Everything in Grow" }} className="mt-8" />
            <p className="mt-6 text-[14px] text-muted-ink">Try the questions in the window: each one shows a real kind of answer.</p>
          </div>
          <AdvisorHero />
        </Container>
      </section>

      <Section tone="surface">
        <Container>
          <div className="mb-8 max-w-2xl">
            <H2>Questions owners ask it every week.</H2>
            <Lede className="mt-4">Ask in your own words. No reports, no spreadsheets.</Lede>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {QUESTIONS.map((q) => (
              <li key={q} className="rp-card rp-card-hover flex items-center gap-3 rounded-2xl px-5 py-4 text-[15.5px] font-medium text-ink"><MessageCircle className="h-5 w-5 shrink-0 text-glow" aria-hidden />{q}</li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mb-10 max-w-2xl">
            <H2>What it knows, and how it answers.</H2>
          </div>
          <Cards cols={3} items={[
            { Icon: BookOpen, t: "Your whole business", b: "Calls, chats, bookings, reviews, comments and how every post did, plus everything on your Knowledge page." },
            { Icon: TrendingUp, t: "Answers with numbers", b: "The same figures you see in Insights, so what it says always matches your dashboard." },
            { Icon: Lightbulb, t: "One clear next step", b: "Every answer ends with something you can do this week, and knows what your plan includes." },
          ]} />
          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-white p-5 text-[15px] text-muted-ink">
            <Check className="h-5 w-5 text-success" aria-hidden />Your chats are saved to come back to, and you can start a new chat any time.
            <span className="ml-auto flex gap-1.5">{["phone", "whatsapp", "instagram", "messenger", "sms", "email"].map((c) => <ChannelLogo key={c} id={c} size={24} />)}</span>
          </div>
        </Container>
      </Section>

      <Ending product={product} title="Know what to do next, in one question." />
    </>
  );
}
