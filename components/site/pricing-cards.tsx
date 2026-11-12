"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/site/ui/button";
import { PageHeader } from "@/components/site/ui/page-header";
import { cx } from "@/components/site/ui/cx";
import { FEATURE_LABELS, PLANS, YEARLY_BILLING, YEARLY_DISCOUNT, num, type Plan, type PlanId } from "@/lib/plans";
import { ROUTES } from "@/lib/routes";
import { START_URL } from "@/lib/site";

/** Growth is shown as the recommended plan: it's where content and posting start.
 * (A layout choice, not a claim about what most businesses buy.) */
const HIGHLIGHT: PlanId = "grow";

/** Who each plan is for, and its headline extra. Copy only: every number comes from plans.json. */
const FOR_WHO: Record<PlanId, string> = {
  starter: "Stop missing calls and messages.",
  essential: "For a busy phone and a busy inbox.",
  grow: "Be seen online, with posts made for you.",
  pro: "Everything, with reviews and insights.",
};
const HEADLINE_EXTRA: Record<PlanId, string> = {
  starter: "Every channel answered",
  essential: "Every channel answered",
  grow: "Content, posting, Talk to AI",
  pro: "Reviews, campaigns, insights",
};

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/** The five lines that tell the plans apart. */
function keyLines(plan: Plan): string[] {
  return [
    `${num(plan.minutesPerMonth)} call minutes`,
    `${num(plan.messagesPerMonth)} replies`,
    `Up to ${plan.bookableStaff} bookable staff`,
    plan.mediaCreditsPerMonth ? `${num(plan.mediaCreditsPerMonth)} media credits` : "Bookings and reminders",
    HEADLINE_EXTRA[plan.id],
  ];
}

/** Everything else a plan includes, from the product's plans.ts. */
export function planLines(plan: Plan): string[] {
  return [
    "Call forwarding from your own number",
    ...(plan.mediaCreditsPerMonth ? [`About ${num(Math.round(plan.mediaCreditsPerMonth / 8 / 10) * 10)} pictures, or ${Math.round(plan.mediaCreditsPerMonth / 60)} short videos`] : []),
    ...plan.features.filter((f) => f !== "prompt_generation").map((f) => FEATURE_LABELS[f]),
  ];
}

export function BillingSwitch({ yearly, onChange }: { yearly: boolean; onChange: (y: boolean) => void }) {
  if (!YEARLY_BILLING) return null;
  const off = Math.round(YEARLY_DISCOUNT * 100);
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white p-1 shadow-rp-1" role="group" aria-label="Billing period">
      {[false, true].map((y) => (
        <button key={String(y)} type="button" aria-pressed={yearly === y} onClick={() => onChange(y)} className={cx("flex h-10 items-center gap-2 rounded-full px-4 text-small font-semibold transition-colors duration-200", yearly === y ? "bg-ink text-white" : "text-ink hover:bg-surface-2")}>
          {y ? "Yearly" : "Monthly"}
          {y && <span className={cx("rounded-full px-2 py-0.5 text-[12px]", yearly ? "bg-cta text-cta-ink" : "bg-grow-soft text-grow")}>Save {off}%</span>}
        </button>
      ))}
    </div>
  );
}

const Line = ({ children, dark }: { children: React.ReactNode; dark?: boolean }) => (
  <li className={cx("flex gap-2 text-[13.5px] leading-snug", dark ? "text-white/90" : "text-ink")}>
    <Check aria-hidden className={cx("mt-0.5 h-4 w-4 shrink-0", dark ? "text-cta" : "text-grow")} strokeWidth={2.25} />
    {children}
  </li>
);

/**
 * The four plans and Business in one row. Every card lists everything its plan includes
 * (owner's choice, 2026-11-12: nothing hidden behind a "see everything" link).
 */
export function PricingCards({ title, lede }: { title: string; lede: string }) {
  const [yearly, setYearly] = useState(false);
  const card = "relative flex scroll-mt-28 flex-col rounded-rp-md border p-4";
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Pricing", href: ROUTES.pricing }]}
        title={title}
        lede={lede}
        aside={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <BillingSwitch yearly={yearly} onChange={setYearly} />
          </div>
        }
      />
      <h2 className="sr-only">Plans</h2>
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((plan) => {
          const highlight = plan.id === HIGHLIGHT;
          const perMonth = yearly ? Math.round(plan.monthlyUsd * (1 - YEARLY_DISCOUNT) * 100) / 100 : plan.monthlyUsd;
          return (
            <div key={plan.id} id={`plan-${plan.id}`} className={cx(card, "bg-white", highlight ? "border-violet shadow-rp-3 ring-2 ring-primary-soft" : "border-line shadow-rp-1")}>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-h3 font-semibold text-ink">{plan.name}</h3>
                {highlight && <span className="whitespace-nowrap rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-semibold text-white">Recommended</span>}
              </div>
              <p className="mt-1 min-h-[2.6em] text-[13.5px] leading-snug text-muted-ink">{FOR_WHO[plan.id]}</p>
              <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
                <span className="whitespace-nowrap font-display text-[clamp(1.75rem,2.6vw,2.4rem)] tabular-nums leading-none text-ink">{money(perMonth)}</span>
                <span className="whitespace-nowrap text-[13.5px] text-muted-ink">a month</span>
              </p>
              <p className="mt-1 min-h-[1.3em] text-[12.5px] text-muted-ink">
                {yearly ? <>{money(Math.round(plan.monthlyUsd * 12 * (1 - YEARLY_DISCOUNT)))} billed yearly <s>{money(plan.monthlyUsd * 12)}</s></> : "Billed monthly"}
              </p>
              <Button href={`${START_URL}?plan=${plan.id}${yearly ? "&billing=yearly" : ""}`} variant={highlight ? "primary" : "secondary"} size="sm" className="mt-2.5 !h-11 w-full">
                Choose {plan.name}
              </Button>
              <ul className="mt-3 flex flex-col gap-1 border-t border-line pt-2.5">
                {keyLines(plan).map((l) => <Line key={l}>{l}</Line>)}
                {planLines(plan).map((l) => <Line key={l}>{l}</Line>)}
              </ul>
            </div>
          );
        })}
        <div className={cx(card, "border-ink bg-ink text-white")}>
          <h3 className="text-h3 font-semibold">Business</h3>
          <p className="mt-1 min-h-[2.6em] text-[13.5px] leading-snug text-white/75">Several locations or a large team.</p>
          <p className="mt-2 font-display text-[clamp(1.75rem,2.6vw,2.4rem)] leading-none">Custom</p>
          <p className="mt-1 min-h-[1.3em] text-[12.5px] text-white/75">Limits and a price set for you</p>
          <Button href={ROUTES.contact} size="sm" className="mt-2.5 !h-11 w-full">
            Talk to us
          </Button>
          <ul className="mt-3 flex flex-col gap-1 border-t border-white/15 pt-2.5">
            {[`Everything in ${PLANS[PLANS.length - 1]!.name}`, "Several locations", "Limits set to fit you", "An account manager", "Onboarding for your team"].map((l) => <Line key={l} dark>{l}</Line>)}
          </ul>
        </div>
        </div>
        <p className="mt-4 text-center text-small text-muted-ink">Each month, per plan. US dollars. Taxes may apply. On an older plan? You keep it at your price.</p>
      </div>
    </>
  );
}
