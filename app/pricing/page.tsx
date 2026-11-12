import type { Metadata } from "next";
import { Check, ImagePlus, MessageSquareText, Minus, PhoneCall } from "lucide-react";
import { PricingCards } from "@/components/site/pricing-cards";
import { Container, JsonLd, Section, SectionHeader } from "@/components/site/ui";
import { Button } from "@/components/site/ui/button";
import { Faq } from "@/components/site/ui/faq";
import { PRICING_FAQ } from "@/lib/content/faq";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, USAGE_WARNING_PERCENT, YEARLY_BILLING, YEARLY_DISCOUNT, num, usd, type Feature } from "@/lib/plans";
import { SITE, START_URL } from "@/lib/site";
import { TrustSection } from "@/components/site/home/closing";

const DESCRIPTION = `RingPost pricing: ${PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}/month`).join(", ")}.`;

export const metadata: Metadata = {
  title: `Pricing: plans from ${usd(PLANS[0].monthlyUsd)} a month`,
  description: DESCRIPTION,
  openGraph: { title: "RingPost pricing", description: DESCRIPTION, url: "/pricing" },
};

/**
 * Generated from data/plans.json, which is exported from the product's plans.ts: every
 * number and every tick below is the product's own. This is the only page on the site that
 * shows prices or which plan includes what.
 */
/**
 * RingPost as a product, with each plan as a monthly offer. On /pricing only, the one page
 * that shows prices. No ratings: there are no published reviews to cite yet.
 */
const SOFTWARE = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  url: `${SITE.url}/pricing`,
  description: SITE.description,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: PLANS.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.tagline,
    price: p.monthlyUsd,
    priceCurrency: "USD",
    url: `${SITE.url}/pricing`,
    priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthlyUsd, priceCurrency: "USD", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } },
  })),
};

const TOP_UP_LOOK = {
  minutes: { icon: PhoneCall, tone: "bg-answer-soft text-answer", unit: "calling minutes", line: "About 30 to 50 more calls answered." },
  messages: { icon: MessageSquareText, tone: "bg-answer-soft text-answer", unit: "replies", line: "On every channel: WhatsApp, Instagram, Messenger, texts and email." },
  credits: { icon: ImagePlus, tone: "bg-create-soft text-create", unit: "media credits", line: "For more images and short videos." },
};

export default function PricingPage() {
  // Product rule: "Extra images and videos on request" isn't listed on the website.
  const features = (Object.keys(FEATURE_LABELS) as Feature[]).filter((f) => f !== "prompt_generation");
  const topUps = TOP_UPS;

  return (
    <>
      <JsonLd data={SOFTWARE} />
      <PricingCards title={`Start at ${usd(PLANS[0].monthlyUsd)} a month.`} lede={`${YEARLY_BILLING ? `Pay monthly, or yearly and save ${Math.round(YEARLY_DISCOUNT * 100)}%` : "Billed monthly"}.`} />

      <Section className="!pt-0">
        <Container>
          <SectionHeader eyebrow="Compare" title="Every plan, line by line." lede="Each row says what it does, so you can see exactly what you get." />
          <div className="overflow-x-auto rounded-rp-md border border-line lg:overflow-visible">
            <table className="w-full min-w-[920px] border-collapse bg-white text-left text-[14px]">
              <caption className="sr-only">Plan comparison</caption>
              <thead>
                <tr className="rp-sticky-head border-b border-line [&>th]:bg-white">
                  <th scope="col" className="px-5 py-4 font-medium text-muted-ink">
                    &nbsp;
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className="px-5 py-4 text-[15px] font-semibold text-ink">
                      {p.name}
                      <span className="block text-[13px] font-normal text-muted-ink">{usd(p.monthlyUsd)} a month</span>
                    </th>
                  ))}
                  <th scope="col" className="px-5 py-4 text-[15px] font-semibold text-ink">
                    Business
                    <span className="block text-[13px] font-normal text-muted-ink">Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody className="rp-table-rows divide-y divide-line">
                <Group label="Answering and booking" />
                <Row label="Calling minutes a month" values={[...PLANS.map((p) => num(p.minutesPerMonth)), "To fit"]} />
                <Row label="Messages a month" values={[...PLANS.map((p) => num(p.messagesPerMonth)), "To fit"]} />
                <Row label="Bookable staff" values={[...PLANS.map((p) => `Up to ${p.bookableStaff}`), "To fit"]} />
                <Row label="Locations" values={[...PLANS.map(() => "1"), "Several"]} />
                <Row label="Calls, WhatsApp, Instagram, Messenger, texts and email" values={[...PLANS.map(() => true), true]} />
                <Row label="Keep your number (call forwarding)" values={[...PLANS.map(() => true), true]} />
                <Row label="Bookings, reminders and review requests" values={[...PLANS.map(() => true), true]} />
                <Group label="Content and growth" />
                <Row
                  label={SHOW_AI_VIDEO ? "Media credits a month (AI images and videos)" : "Media credits a month (AI images)"}
                  values={[...PLANS.map((p) => (p.mediaCreditsPerMonth ? num(p.mediaCreditsPerMonth) : false)), "To fit"]}
                />
                {features.map((f) => (
                  <Row key={f} label={FEATURE_LABELS[f]} values={[...PLANS.map((p) => p.features.includes(f)), true]} />
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <SectionHeader eyebrow="Top-ups" title="Need a little more? Add it in one tap." lede={`Your service never stops. You get a heads-up at ${USAGE_WARNING_PERCENT}% of any allowance, and a top-up is only added when you choose one.`} />
          <ul className="grid gap-4 md:grid-cols-3">
            {topUps.map((t) => {
              const look = TOP_UP_LOOK[t.metric as keyof typeof TOP_UP_LOOK];
              return (
                <li key={t.metric} className="flex flex-col rounded-rp-md border border-line bg-white p-6 shadow-rp-1">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-rp-sm ${look.tone}`}><look.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden /></span>
                  <p className="mt-5 font-display text-[2.4rem] leading-none tracking-[-0.04em] text-ink">{num(t.amount)}</p>
                  <p className="mt-1.5 text-body font-semibold text-ink">{look.unit}</p>
                  <p className="mt-1 text-small text-muted-ink">{look.line}</p>
                  <p className="mt-auto flex items-baseline justify-between gap-3 border-t border-line pt-4">
                    <span className="font-display text-[1.75rem] leading-none tracking-[-0.03em] text-ink">{usd(t.priceUsd)}</span>
                    <span className="text-small text-muted-ink">{t.validity === "cycle" ? "Until your plan renews" : "Use within 90 days"}</span>
                  </p>
                </li>
              );
            })}
          </ul>
          <ul className="mt-6 grid gap-x-8 gap-y-2 text-small text-muted-ink sm:grid-cols-3">
            <li><b className="font-semibold text-ink">Billing.</b> {YEARLY_BILLING ? "Monthly or yearly." : "Monthly."} Changing plan is prorated.</li>
            <li><b className="font-semibold text-ink">Media credits.</b> You see the cost before anything is made. A failed one gives the credits back.</li>
            <li><b className="font-semibold text-ink">Cancel any time</b> from your dashboard.</li>
          </ul>
        </Container>
      </Section>

      <TrustSection />

      <Section>
        <Container narrow>
          <SectionHeader eyebrow="Questions" title="Pricing and billing" />
          <Faq items={PRICING_FAQ} structuredData />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={START_URL}>Get started</Button>
            <Button href="/contact" variant="secondary">Ask us a question</Button>
          </div>
        </Container>
      </Section>

    </>
  );
}


function Group({ label }: { label: string }) {
  return (
    <tr className="bg-surface">
      <th colSpan={6} scope="colgroup" className="px-5 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">
        {label}
      </th>
    </tr>
  );
}

/** A plain explanation under each row, so nobody has to guess what a line means. */
const HINTS: Record<string, string> = {
  "Calling minutes a month": "Time your AI spends on the phone with callers, including callbacks. A typical booking call takes 2 to 3 minutes, so 30 minutes is roughly 10 to 15 calls.",
  "Messages a month": "Replies your AI sends on WhatsApp, Instagram, Messenger and email, plus booking texts.",
  "Bookable staff": "People customers can book with, each with their own hours and services.",
  Locations: "Business addresses on one account.",
  "Calls, WhatsApp, Instagram, Messenger, texts and email": "Your AI answers every one of these in your business's name, day and night.",
  "Keep your number (call forwarding)": "Forward your existing number, all calls or only missed ones, or pick a new local number.",
  "Bookings, reminders and review requests": "Appointments go straight into your calendar, customers get reminders, and happy ones are asked for a Google review.",
  "Media credits a month (AI images and videos)": "Spent on pictures and short videos made for you. For example, 2,000 credits make about 250 pictures, or about 30 ten-second videos. You see the price before anything is made.",
  "Media credits a month (AI images)": "Spent on images made for you. You see the price of each one before it's made.",
  "Uploading your own photos and videos": "Post your own photos and videos, sized for every app, with a caption written for you.",
  "Auto-posting to social media": "Approved posts go out to Instagram, Facebook, TikTok, YouTube, X, LinkedIn and more, now or at a time you pick.",
  "Talk to AI": "Ask about your own business in plain words, like \"how was this week?\", and get answers from your real numbers.",
  "Replying to comments": "Comments on your posts get a reply drafted in your voice, sent when you approve.",
  "Marketing campaigns": "A set of posts planned and written for a holiday, an offer or a quiet week, ready to approve.",
  "Business insights": "What customers keep asking and saying, your busy and quiet days, and what to do about it.",
  "Social media post insights": "Views, likes, comments and shares for each post.",
  "Google reviews": "New Google reviews get a reply in your voice, published to Google when you approve.",
  "Win-back messages": "Invite customers who haven't been back for a while, by email (or WhatsApp outside the US and Canada).",
};

function Row({ label, values }: { label: string; values: (string | boolean | null)[] }) {
  return (
    <tr>
      <th scope="row" className="sticky left-0 z-[1] w-[44vw] max-w-[340px] bg-white px-4 py-4 font-normal sm:w-auto sm:px-5">
        <span className="block font-semibold text-ink">{label}</span>
        {HINTS[label] && <span className="mt-1 hidden text-[13px] leading-snug text-muted-ink sm:block">{HINTS[label]}</span>}
      </th>
      {values.map((v, i) => (
        <td key={i} className="px-5 py-4 align-middle text-[14.5px] font-medium text-ink">
          {v === true ? <Check aria-label="Included" className="h-4 w-4 text-success" /> : v === false || v === null ? <Minus aria-label="Not included" className="h-4 w-4 text-faint" /> : v}
        </td>
      ))}
    </tr>
  );
}
