import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { BOOKING_URL, PRICING, SIGNUP_URL, SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${SITE.name} pricing: a one-time $499 setup, then Front Desk ($499/mo), Growth ($999/mo) or Command Center ($1,399/mo), with a 7-day free trial.`,
  robots: { index: true, follow: true },
};

const money = (n: number) => `${PRICING.currency}${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0 })}`;

const SETUP_INCLUDES = [
  "A phone number set up and routed, or your existing one connected",
  "Every channel wired in: calls, texts, WhatsApp, Instagram and Facebook",
  "Your services, prices, hours and staff loaded and checked line by line",
  "A knowledge base built from how your business actually works, not a template",
  "Your calendar connected both ways, so bookings land where you already look",
  "Your brand voice tuned: how it greets people, what it never says, when it fetches you",
  "Supported business channels connected for the features you choose to use",
  "Your logo and colours loaded so generated content comes out on-brand",
  "Tested against real conversations for your trade",
];

/** Every plan includes all of this; the plans differ in allowances and the extras below. */
const EVERY_PLAN = [
  ["Answering", "Calls, texts, WhatsApp, Instagram, Messenger, email and website chat answered 24/7, subject to each provider's own policies"],
  ["Missed calls", "A missed caller gets a friendly text from your number within seconds, and the AI carries on from there"],
  ["Bookings", "Real appointments written to your calendar, with no double-booking, plus confirmations and reminders"],
  ["Customers", "A customer record built automatically from every conversation"],
  ["Knowledge", "Reads your website and PDFs, is set up for your trade, and tells you which questions it couldn't answer"],
  ["Calls", "A voice you choose, call recording with transcripts, and a handover to you whenever a customer needs a person"],
  ["Content", "On-brand AI images and short videos of your services, with your logo"],
  ["Team", "Invite your staff and choose exactly what each person can see and do"],
  ["On your phone", "Add the dashboard to your home screen and get a push notification when a customer needs you"],
];

/** The plan comparison table: what each plan adds. */
const FEATURE_ROWS: [string, boolean, boolean, boolean][] = [
  ["Answering, bookings, reminders, customers", true, true, true],
  ["AI images and videos", true, true, true],
  ["Upload your own photos and videos", false, true, true],
  ["Auto-posting to social media, with captions", false, true, true],
  ["Talk to AI (your business advisor)", false, true, true],
  ["Replies to comments on your posts", false, false, true],
  ["Marketing campaigns for holidays and occasions", false, false, true],
  ["Business insights", false, false, true],
  ["Social media post insights", false, false, true],
  ["Google reviews: read and auto-reply", false, false, true],
  ["Win-back messages to customers who haven't returned", false, false, true],
];

const MONEY_FAQS = [
  {
    q: "How do I pay, and is it secure?",
    a: `Payments are processed by Paddle, our payment provider and merchant of record, which also handles invoices and sales tax or VAT. Your card details go directly to Paddle and are never stored by ${SITE.name}.`,
  },
  {
    q: "Is there a free trial?",
    a: `Yes. Every plan starts with a ${PRICING.trial.days}-day free trial the moment the ${money(PRICING.setup.amount)} setup fee is paid. During the trial you get ${PRICING.trial.minutesPerDay} calling minutes a day (unused minutes carry over, up to ${PRICING.trial.maxMinutes}) and ${PRICING.trial.messages} messages for the week. Your chosen plan starts billing automatically on day 8, and we remind you a day or two before.`,
  },
  {
    q: "Is there a contract?",
    a: "No. Plans are month to month. You can change plan or cancel at any time; a cancellation takes effect at the end of the month you have already paid for.",
  },
  {
    q: "Is the setup fee refundable?",
    a: `Yes, in full, if you cancel during the ${PRICING.trial.days}-day free trial. After the trial the setup work has been delivered, so it is not refundable — but once you have been with us for ${PRICING.setupCredit.afterDays} paid days, half of it (${money(PRICING.setupCredit.amount)}) comes off your next invoice.`,
  },
  {
    q: "What happens if I use more than my plan includes?",
    a: "Nothing stops. Calls and messages keep being answered, so a busy month never costs you a customer. At 80% of any allowance you get a heads-up, and you can add a top-up pack or move up a plan in one click. We never charge you automatically for going over.",
  },
  {
    q: "Can I change plans later?",
    a: "Any time, from your dashboard. An upgrade takes effect straight away and is prorated; during the trial, whichever plan you are on when it ends is the one that starts.",
  },
  {
    q: "Do I keep my data if I leave?",
    a: "Yes. Your customer list, conversations and bookings are yours. We will export everything and delete our copy on request.",
  },
];

export default function PricingPage() {
  const entryPrice = PRICING.plans[0].monthly;
  const bookingsToBreakEven = Math.ceil(entryPrice / PRICING.comparison.averageBookingValue);

  return (
    <main className="relative min-h-screen bg-background">
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-6">
          <Link href="/" className="font-display text-2xl tracking-tight text-foreground">
            {SITE.name}
          </Link>
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1000px] px-6 py-16 lg:py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-pink)]">Pricing</p>
        <h1 className="mb-5 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
          Three plans. One setup. A week free to try it.
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {SITE.name} is set up around how your business actually works: your services, prices, hours, policies and
          channels. Pay the one-time setup, pick a plan, and your free trial starts straight away.
        </p>

        {/* The three plans */}
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {PRICING.plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-7 ${plan.highlight ? "border-[var(--brand-pink)]/50 bg-[var(--brand-pink)]/[0.05]" : "border-foreground/12 bg-foreground/[0.02]"}`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">{plan.name}</span>
                {plan.highlight && <span className="rounded-full bg-[var(--brand-pink)] px-2.5 py-0.5 text-[11px] font-medium text-black">Most popular</span>}
              </div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-display text-5xl tracking-tight text-foreground">{money(plan.monthly)}</span>
                <span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="mb-6 text-sm text-muted-foreground">{plan.tagline}</p>
              <ul className="flex-1 space-y-2.5 text-[15px] text-foreground/90">
                <li>{plan.minutes.toLocaleString()} calling minutes a month</li>
                <li>{plan.messages.toLocaleString()} messages a month</li>
                <li>{plan.images}</li>
                <li>{plan.videos}</li>
              </ul>
              <a
                href={SIGNUP_URL}
                className={`mt-7 inline-block rounded-full px-6 py-3 text-center text-sm font-medium transition-transform active:scale-95 ${plan.highlight ? "bg-[var(--brand-pink)] text-black" : "border border-foreground/20 text-foreground"}`}
              >
                Start with {plan.name}
              </a>
            </div>
          ))}
        </div>
        <p className="mb-16 text-sm text-muted-foreground">
          All prices in US dollars, plus the one-time {money(PRICING.setup.amount)} setup. No per-minute or per-message
          surprise bills: going over an allowance never stops your service, and top-ups are only ever added when you click.
        </p>

        {/* Setup, shown once */}
        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-7 lg:p-9">
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">{PRICING.setup.label}</div>
            <div className="mb-2 font-display text-5xl tracking-tight text-foreground">{money(PRICING.setup.amount)}</div>
            <p className="mb-7 text-sm text-muted-foreground">{PRICING.setup.caption}</p>
            <ul className="space-y-3">
              {SETUP_INCLUDES.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--brand-pink)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-7 lg:p-9">
            <div className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">How it goes</div>
            <ol className="space-y-5">
              {[
                ["Today", `Pay the ${money(PRICING.setup.amount)} setup and pick your phone number. Your AI starts answering.`],
                [`Days 1–${PRICING.trial.days}`, `Free trial: ${PRICING.trial.minutesPerDay} calling minutes a day (unused minutes carry over) and ${PRICING.trial.messages} messages for the week. Cancel in this week and the setup fee is refunded in full.`],
                ["Day 8", "Your chosen plan starts, on the card you used for setup. We remind you a day or two before."],
                [`Day ${PRICING.trial.days + 1 + PRICING.setupCredit.afterDays}`, `Still with us? Half your setup fee — ${money(PRICING.setupCredit.amount)} — comes off your next invoice.`],
              ].map(([when, what]) => (
                <li key={when}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70">{when}</div>
                  <div className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{what}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Feature comparison */}
        <h2 className="mb-6 font-display text-3xl tracking-tight text-foreground">What each plan includes</h2>
        <div className="mb-8 overflow-x-auto rounded-2xl border border-foreground/12">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="px-5 py-4 font-normal text-muted-foreground" />
                {PRICING.plans.map((plan) => (
                  <th key={plan.id} className="px-5 py-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/80">
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FEATURE_ROWS.map(([label, ...cells]) => (
                <tr key={label} className="border-b border-foreground/5 last:border-0">
                  <td className="px-5 py-3.5 text-muted-foreground">{label}</td>
                  {cells.map((included, i) => (
                    <td key={i} className="px-5 py-3.5">
                      {included ? <span className="text-[var(--brand-pink)]">✓</span> : <span className="text-foreground/25">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-foreground/12 p-7">
            <h3 className="mb-4 font-display text-xl tracking-tight text-foreground">On every plan</h3>
            <ul className="space-y-4">
              {EVERY_PLAN.map(([label, detail]) => (
                <li key={label}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70">{label}</div>
                  <div className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{detail}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-foreground/12 p-7">
            <h3 className="mb-4 font-display text-xl tracking-tight text-foreground">Top-up packs</h3>
            <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground">
              For a busy month, on any plan, added with one click from your dashboard. Never automatic.
            </p>
            <ul className="space-y-2.5">
              {PRICING.topUps.map((pack) => (
                <li key={pack.label} className="flex items-baseline justify-between gap-4 border-b border-foreground/5 pb-2.5 text-[15px] last:border-0">
                  <span className="text-muted-foreground">{pack.label}</span>
                  <span className="font-medium text-foreground">{money(pack.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-16 rounded-2xl border border-[var(--brand-pink)]/25 bg-[var(--brand-pink)]/[0.05] p-7 lg:p-9">
          <h2 className="mb-4 font-display text-2xl tracking-tight text-foreground">
            What you are actually comparing it to
          </h2>
          <p className="mb-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            A part-time receptionist costs somewhere around{" "}
            {money(PRICING.comparison.receptionistMonthly)} a month and works a defined shift. RingPost is
            software that can remain available across connected channels and keeps customer conversations,
            appointments, follow-ups, reviews and business content organized in one workspace.
          </p>
          <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            The simpler version: if your average booking is around{" "}
            {money(PRICING.comparison.averageBookingValue)}, the {PRICING.plans[0].name} plan is roughly equivalent to{" "}
            <strong className="text-foreground">{bookingsToBreakEven} additional bookings</strong>. Your actual
            results will depend on your business, demand and how you use the Service.
          </p>
        </div>

        <div className="mb-16 rounded-2xl border border-foreground/12 p-7 lg:p-9">
          <h2 className="mb-3 font-display text-2xl tracking-tight text-foreground">How payment is handled</h2>
            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
              Payments are processed securely by our payment provider. Your card details are handled directly by
              the payment provider and are never stored by us. Payment processing, invoices, taxes, and refunds
              are handled according to the applicable payment provider&apos;s terms.
            </p>
        </div>

        <h2 className="mb-8 font-display text-3xl tracking-tight text-foreground">The money questions</h2>
        <div className="mb-14 divide-y divide-foreground/10 border-y border-foreground/10">
          {MONEY_FAQS.map((faq) => (
            <div key={faq.q} className="py-6">
              <h3 className="mb-2 text-[17px] font-medium text-foreground">{faq.q}</h3>
              <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-foreground/12 p-7 text-center lg:p-10">
          <h2 className="mb-3 font-display text-3xl tracking-tight text-foreground">
            Talk to us before you decide
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Twenty minutes, no pitch. We will tell you honestly whether this fits your business, and if it
            does not, we will say so. Questions about billing go to{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-foreground underline">
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <a
            href={BOOKING_URL}
            className="inline-block rounded-full bg-[var(--brand-pink)] px-7 py-3.5 text-sm font-medium text-black transition-transform active:scale-95"
          >
            Book a call
          </a>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}
