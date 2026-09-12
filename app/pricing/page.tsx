import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { BOOKING_URL, PRICING, SITE, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `What ${SITE.name} costs, what the setup covers, and how payments are handled.`,
  robots: { index: true, follow: true },
};

const money = (n: number) => `${PRICING.currency}${n.toLocaleString()}`;

const SETUP_INCLUDES = [
  "A phone number set up and routed, or your existing one connected",
  "Every channel wired in: calls, texts, WhatsApp, Instagram and Facebook",
  "Your services, prices, hours and staff loaded and checked line by line",
  "A knowledge base built from how your business actually works, not a template",
  "Your calendar connected both ways, so bookings land where you already look",
  "Your brand voice tuned: how it greets people, what it never says, when it fetches you",
  "Supported business channels connected for the features you choose to use",
  "Your logo and colours loaded so generated content comes out on-brand",
  "Tested against real conversations for your trade before it answers a single customer",
];

const MONTHLY_INCLUDES = [
  ["Answering", "Customer conversations managed 24/7 across connected channels, subject to third-party provider policies and fair-use limitations"],
  ["Missed calls", "Missed-call follow-up can be configured for connected phone services, subject to carrier and regional requirements"],
  ["Bookings", "Real appointments written to your calendar, with no double-booking"],
  ["Customers", "A customer record built automatically from every conversation"],
  ["Reminders", "Confirmations and reminders sent for you by text"],
  ["Content", "AI-assisted business content created from your information and brand assets, for your team to review"],
  ["Publishing", "Content can be reviewed and scheduled for supported platforms from one workspace"],
  ["Reviews", "Reviews read as they arrive, replies drafted for your approval, patterns flagged"],
  ["Business communications", "AI-assisted replies and follow-ups organized for your team to review"],
  ["Follow-ups", "Customer follow-ups organized and prepared for your team to review"],
  ["Insights", "A clearer view of calls, bookings, reviews and business activity from one workspace"],
];

const MONEY_FAQS = [
{
  q: "How do I pay, and is it secure?",
  a: `Payments are processed securely by our payment provider. Your card details are handled directly by the payment provider and are not stored by ${SITE.name}.`,
},
  {
    q: "Is there a contract?",
    a: "No. The monthly fee is month to month. You can cancel at any time, and cancellation takes effect at the end of the billing period already paid for.",
  },
  {
    q: "Is the setup fee refundable?",
    a: "Before your AI goes live, yes, in full, even if we have already started. Once it has begun answering real customers the work has been delivered, so it is not refundable from that point. The monthly fee stays cancellable either way.",
  },
  {
    q: "What if it is not right for my business?",
    a: "Tell us during setup and the setup fee comes back in full. We would rather not take money from a business the product is wrong for.",
  },
  {
    q: "Are there usage limits?",
    a: "RingPost is designed to support ongoing customer conversations across connected channels. Actual availability, messaging limits, carrier requirements, platform policies, regional rules and fair-use limits may vary by third-party provider. Reasonable usage limits may also apply to certain AI features.",
  },
  {
    q: "Do I keep my data if I leave?",
    a: "Yes. Your customer list, conversations and bookings are yours. We will export everything and delete our copy on request.",
  },
];

export default function PricingPage() {
  const bookingsToBreakEven = Math.ceil(PRICING.monthly.amount / PRICING.comparison.averageBookingValue);

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
          One product. One price. Built around your business.
        </h1>
        <p className="mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {SITE.name} is software configured around how your business actually works. We set up your services, prices,
          hours, policies, connected channels and workflows, then test the configuration before it goes live.
        </p>

        <div className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-foreground/12 bg-foreground/[0.02] p-7 lg:p-9">
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">
              {PRICING.setup.label}
            </div>
            <div className="mb-2 font-display text-5xl tracking-tight text-foreground">
              {money(PRICING.setup.amount)}
            </div>
            <p className="mb-7 text-sm text-muted-foreground">{PRICING.setup.caption}</p>
            <p className="mb-5 text-[15px] leading-relaxed text-foreground/90">
              This implementation configures RingPost around your actual business,
              including your services, prices, hours, policies, communication preferences,
              and appointment workflows.
            </p>
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
            <div className="mb-1 font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">
              {PRICING.monthly.label}
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-display text-5xl tracking-tight text-foreground">
                {money(PRICING.monthly.amount)}
              </span>
              <span className="text-lg text-muted-foreground">/month</span>
            </div>
            <p className="mb-7 text-sm text-muted-foreground">{PRICING.monthly.caption}</p>
            <ul className="space-y-4">
              {MONTHLY_INCLUDES.map(([label, detail]) => (
                <li key={label}>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/70">{label}</div>
                  <div className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{detail}</div>
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
            {money(PRICING.comparison.averageBookingValue)}, the monthly fee is roughly equivalent to{" "}
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
