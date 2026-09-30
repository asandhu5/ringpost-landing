import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PricingCards } from "@/components/site/pricing-cards";
import { Container, CtaBand, FaqList, PageHero, Section, SectionHeader, cx } from "@/components/site/ui";
import { FAQ } from "@/lib/content/faq";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, TRIAL, USAGE_WARNING_PERCENT, num, usd, type Feature } from "@/lib/plans";

const DESCRIPTION = `RingPost pricing: three plans (${PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}/month`).join(", ")}), no setup fee, a ${TRIAL.days}-day free trial on every plan, and no contract.`;

export const metadata: Metadata = {
  title: "Pricing: three plans, no setup fee",
  description: DESCRIPTION,
  openGraph: { title: "RingPost pricing", description: DESCRIPTION, url: "/pricing" },
};

/**
 * Generated from data/plans.json, which is exported from the product's plans.ts: every
 * number and every tick below is the product's own. Comment replies sit in Growth since
 * 2026-09-29. AI video is in the catalog but hidden here while production has no video
 * provider (lib/plans.ts SHOW_AI_VIDEO).
 */
export default function PricingPage() {
  const features = (Object.keys(FEATURE_LABELS) as Feature[]).filter((f) => SHOW_AI_VIDEO || f !== "prompt_generation");
  const everyPlan = [
    "Calls answered by an AI receptionist",
    "Texts, WhatsApp, Instagram, Messenger and email answered",
    "Booking, rescheduling and cancelling, with reminders",
    "Two-way Google Calendar sync",
    "Missed-call text-back",
    "Review requests after every visit",
    "Reading your website and PDFs into your Knowledge page",
    "The guardrails: no invented prices, times, bookings or contact details",
  ];
  const topUps = TOP_UPS.filter((t) => SHOW_AI_VIDEO || t.metric !== "videos");

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Three plans. No setup fee."
        lede={`Pick a plan and start a ${TRIAL.days}-day free trial. Nothing is charged today, there's no contract, and you can cancel any time.`}
      />

      <Section className="!pt-0">
        <Container>
          <PricingCards />
          <p className="mt-6 text-center text-[13px] text-faint">Prices in US dollars, billed monthly. Taxes may apply depending on where you are.</p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeader eyebrow="On every plan" title="Answering and booking are never locked." lede="Every plan answers every channel and books appointments. Plans differ in how much they include and what they do to bring in more." />
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
                      <span className="block text-[13px] font-normal text-muted-ink">{usd(p.monthlyUsd)} / month</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <Row label="Calling minutes a month" values={PLANS.map((p) => num(p.minutesPerMonth))} />
                <Row label="Messages a month" values={PLANS.map((p) => num(p.messagesPerMonth))} />
                <Row label="Fresh AI images a day" values={PLANS.map((p) => String(p.imagesPerDay))} />
                <Row label="Extra images on request, per week" values={PLANS.map((p) => (p.promptExtrasPerWeek.images ? String(p.promptExtrasPerWeek.images) : null))} />
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
          <InfoCard title={`The ${TRIAL.days}-day free trial`}>
            <p>Choose a plan and add a card. Nothing is charged today, and your AI starts answering straight away.</p>
            <ul>
              <li>
                {TRIAL.minutesPerDay} calling minutes a day; unused minutes carry over, up to {TRIAL.maxMinutes} for the week
              </li>
              <li>{num(TRIAL.messages)} messages for the whole week</li>
              <li>A reminder in your dashboard {TRIAL.endingNoticeDays} days before it ends</li>
            </ul>
          </InfoCard>
          <InfoCard title="When the trial ends">
            <p>
              If you don&apos;t cancel, your plan starts on day {TRIAL.days + 1} and bills monthly on the card you added. Cancel before then and you&apos;re never charged. There&apos;s no contract and no cancellation fee.
            </p>
            <p>A business that has already had a trial and comes back starts on its plan straight away.</p>
          </InfoCard>
          <InfoCard title="If you go over">
            <p>
              <strong>Your service never stops.</strong> Going past your monthly minutes or messages doesn&apos;t cut off a customer. You get a heads-up at {USAGE_WARNING_PERCENT}% of an allowance, and you can upgrade or buy a top-up.
            </p>
            <p>Top-ups are only ever added when you click to buy one. Nothing is bought for you automatically.</p>
          </InfoCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Top-ups" title="Need more in a busy month?" lede="Bought from your dashboard with one click, only when you choose." />
          <div className="grid gap-3 sm:grid-cols-3">
            {topUps.map((t) => (
              <div key={t.metric} className="rp-card rounded-2xl p-6">
                <p className="font-display text-4xl text-ink">{usd(t.priceUsd)}</p>
                <p className="mt-2 text-[15px] font-medium text-ink">{t.label}</p>
                <p className="mt-1 text-[13.5px] text-muted-ink">{t.validity === "cycle" ? "Adds to this billing month's allowance." : "Used one at a time, and good for 90 days."}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container narrow>
          <SectionHeader eyebrow="Questions" title="Pricing and billing" />
          <FaqList items={FAQ.filter((f) => f.group === "Pricing and billing")} structuredData />
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
