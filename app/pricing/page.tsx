import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PricingCards } from "@/components/site/pricing-cards";
import { Container, CtaBand, FaqList, PageHero, Section, SectionHeader, cx } from "@/components/site/ui";
import { PRICING_FAQ } from "@/lib/content/faq";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, TRIAL, USAGE_WARNING_PERCENT, num, usd, type Feature } from "@/lib/plans";

const DESCRIPTION = `RingPost pricing: ${PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}/month`).join(", ")}. No setup fee, a ${TRIAL.days}-day free trial, no contract.`;

export const metadata: Metadata = {
  title: "Pricing: three plans, no setup fee",
  description: DESCRIPTION,
  openGraph: { title: "RingPost pricing", description: DESCRIPTION, url: "/pricing" },
};

/**
 * Generated from data/plans.json, which is exported from the product's plans.ts: every
 * number and every tick below is the product's own. This is the only page on the site that
 * shows prices or which plan includes what.
 */
export default function PricingPage() {
  // "Extra images and videos on request" isn't listed on the website (owner decision 2026-10-01).
  const features = (Object.keys(FEATURE_LABELS) as Feature[]).filter((f) => f !== "prompt_generation");
  const everyPlan = [
    "Calls answered by AI",
    "Texts, WhatsApp, Instagram, Messenger and email answered",
    "Booking, rescheduling and reminders",
    "Google Calendar sync",
    "Call forwarding from your own number",
    "Missed-call text-back",
    "Review requests after visits",
    "No invented prices, times or bookings",
  ];
  const topUps = TOP_UPS.filter((t) => SHOW_AI_VIDEO || t.metric !== "videos");

  return (
    <>
      <PageHero eyebrow="Pricing" title="Three plans. No setup fee." lede={`Start with a ${TRIAL.days}-day free trial. No charge today, no contract, cancel any time.`} />

      <Section className="!pt-0">
        <Container>
          <PricingCards />
          <p className="mt-6 text-center text-[13px] text-faint">US dollars, billed monthly. Taxes may apply.</p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="On every plan" title="Answering and booking are never locked." />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {everyPlan.map((line) => (
              <li key={line} className="rp-card flex gap-3 rounded-2xl p-5 text-[14.5px] leading-snug text-ink">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {line}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Compare" title="What's in each plan." />
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
              <caption className="sr-only">Plan comparison</caption>
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-5 py-4 font-medium text-muted-ink">
                    &nbsp;
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className="px-5 py-4 text-[15px] font-semibold text-ink">
                      {p.name}
                      <span className="block text-[13px] font-normal text-muted-ink">{usd(p.monthlyUsd)} a month</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <Row label="Calling minutes a month" values={PLANS.map((p) => num(p.minutesPerMonth))} />
                <Row label="Messages a month" values={PLANS.map((p) => num(p.messagesPerMonth))} />
                <Row label="Bookable staff" values={PLANS.map((p) => `Up to ${p.bookableStaff}`)} />
                <Row label="Call forwarding" values={PLANS.map(() => true)} />
                <Row label="AI images a day" values={PLANS.map((p) => String(p.imagesPerDay))} />
                {SHOW_AI_VIDEO && <Row label="AI videos" values={PLANS.map((p) => `${p.videos.count} a ${p.videos.per}`)} />}
                {features.map((f) => (
                  <Row key={f} label={FEATURE_LABELS[f]} values={PLANS.map((p) => p.features.includes(f))} />
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container className="grid gap-6 lg:grid-cols-3">
          <InfoCard title={`${TRIAL.days}-day free trial`}>
            <p>Pick a plan and add a card. Nothing is charged today.</p>
            <ul>
              <li>{TRIAL.minutesPerDay} calling minutes a day, up to {TRIAL.maxMinutes} for the week</li>
              <li>{num(TRIAL.messages)} messages for the week</li>
              <li>A reminder {TRIAL.endingNoticeDays} days before it ends</li>
            </ul>
          </InfoCard>
          <InfoCard title="After the trial">
            <p>Your plan starts on day {TRIAL.days + 1} and bills monthly. Cancel before then and you&apos;re never charged.</p>
            <p>No contract, no cancellation fee.</p>
          </InfoCard>
          <InfoCard title="If you go over">
            <p>
              <strong>Service never stops.</strong> You get a heads-up at {USAGE_WARNING_PERCENT}% of an allowance. Upgrade or buy a top-up, only when you choose.
            </p>
          </InfoCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Top-ups" title="Need more in a busy month?" lede="One click from your dashboard. Never bought for you." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topUps.map((t) => (
              <div key={t.metric} className="rp-card rounded-2xl p-6">
                <p className="font-display text-4xl text-ink">{usd(t.priceUsd)}</p>
                <p className="mt-2 text-[15px] font-medium text-ink">{t.label}</p>
                <p className="mt-1 text-[13.5px] text-muted-ink">{t.validity === "cycle" ? "For this billing month." : "Good for 90 days."}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container narrow>
          <SectionHeader eyebrow="Questions" title="Pricing and billing" />
          <FaqList items={PRICING_FAQ} structuredData />
        </Container>
      </Section>

      <CtaBand title="Start with seven days free." />
    </>
  );
}

function Row({ label, values }: { label: string; values: (string | boolean | null)[] }) {
  return (
    <tr>
      <th scope="row" className="px-5 py-3.5 font-normal text-muted-ink">
        {label}
      </th>
      {values.map((v, i) => (
        <td key={i} className="px-5 py-3.5 text-ink">
          {v === true ? <Check aria-label="Included" className="h-4 w-4 text-success" /> : v === false || v === null ? <Minus aria-label="Not included" className="h-4 w-4 text-faint" /> : v}
        </td>
      ))}
    </tr>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={cx("rp-card rounded-3xl p-7 text-[15px] leading-relaxed text-muted-ink", "[&_li]:relative [&_li]:pl-4 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.65em] [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-glow [&_p+p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2")}>
      <h3 className="mb-3 font-display text-2xl text-ink">{title}</h3>
      {children}
    </div>
  );
}
