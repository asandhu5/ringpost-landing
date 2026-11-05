import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import { PricingCards } from "@/components/site/pricing-cards";
import { Container, FaqList, JsonLd, PageHero, Section, SectionHeader } from "@/components/site/ui";
import { PRICING_FAQ } from "@/lib/content/faq";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TOP_UPS, USAGE_WARNING_PERCENT, YEARLY_DISCOUNT, num, usd, type Feature } from "@/lib/plans";
import { InViewGroup } from "@/components/site/motion";
import { SITE } from "@/lib/site";

const DESCRIPTION = `RingPost pricing: ${PLANS.map((p) => `${p.name} ${usd(p.monthlyUsd)}/month`).join(", ")}. No setup fee, no contract, cancel any time.`;

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

export default function PricingPage() {
  // "Extra images and videos on request" isn't listed on the website (owner decision 2026-10-01).
  const features = (Object.keys(FEATURE_LABELS) as Feature[]).filter((f) => f !== "prompt_generation");
  const topUps = TOP_UPS;

  return (
    <>
      <JsonLd data={SOFTWARE} />
      <PageHero
        eyebrow="Pricing"
        title={`Start at ${usd(PLANS[0].monthlyUsd)} a month.`}
        lede={`Monthly or yearly${YEARLY_DISCOUNT > 0 ? ` (save ${Math.round(YEARLY_DISCOUNT * 100)}%)` : ""}. No setup fee, no contract, cancel any time.`}
      />

      <Section className="!pt-0">
        <Container>
          <PricingCards />
          <p className="mt-5 text-center text-[13px] text-faint">US dollars. Taxes may apply. On an older plan? You keep it at your price.</p>
        </Container>
      </Section>

      <Section className="!pt-0">
        <Container>
          <SectionHeader eyebrow="Compare" title="What's in each plan." />
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[920px] border-collapse bg-white text-left text-[14px]">
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
          <SectionHeader eyebrow="Good to know" title="Simple billing, no surprises." />
          <InViewGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SmallCard title="Billing">Billed the day you choose a plan, then monthly or yearly. Upgrades are prorated. Cancel from your dashboard.</SmallCard>
            <SmallCard title="If you go over">Service never stops. You get a heads-up at {USAGE_WARNING_PERCENT}% and top up only if you want to.</SmallCard>
            <SmallCard title="Media credits">
              Growth and Pro include credits for AI {SHOW_AI_VIDEO ? "images and videos" : "images"}. You see the price before you make anything, and failed ones are refunded.
            </SmallCard>
            <SmallCard title="Top-ups">
              {topUps.map((t) => (
                <span key={t.metric} className="flex justify-between gap-3 py-0.5">
                  <span>{t.label}</span>
                  <span className="font-semibold text-ink">{usd(t.priceUsd)}</span>
                </span>
              ))}
            </SmallCard>
          </InViewGroup>
        </Container>
      </Section>

      <Section>
        <Container narrow>
          <SectionHeader eyebrow="Questions" title="Pricing and billing" />
          <FaqList items={PRICING_FAQ} structuredData />
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

function SmallCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rp-card rounded-2xl p-6 text-[14px] leading-relaxed text-muted-ink">
      <h3 className="mb-2 text-[16px] font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}
