"use client";

import { useState } from "react";
import { Building2, Check } from "lucide-react";
import Link from "next/link";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, YEARLY_BILLING, YEARLY_DISCOUNT, num, type Plan, type PlanId } from "@/lib/plans";
import { START_URL } from "@/lib/site";

/** Growth is shown as the recommended plan: it's where content and posting start.
 * (A layout choice, not a claim about what most businesses buy.) */
const HIGHLIGHT: PlanId = "grow";

/** Who each plan is for, in an owner's words. Copy only: every number comes from plans.json. */
const FOR_WHO: Record<PlanId, string> = {
  starter: "Stop missing calls and messages, and nothing more.",
  essential: "For a busy business that lives on the phone and WhatsApp.",
  grow: "Be seen online, with fresh posts made every day.",
  pro: "The whole front of house handled, reviews and insights included.",
};

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/** The plan buttons. (ui.tsx's ButtonLink can't be used here: that file reads the disk.) */
function PlanButton({ href, cta, children }: { href: string; cta: boolean; children: React.ReactNode }) {
  const cls = cx(
    "mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-semibold transition-all duration-200",
    cta ? "bg-cta text-[var(--rp-cta-ink)] shadow-[0_10px_40px_-12px_rgba(34,211,238,0.7)] hover:bg-[var(--rp-cta-hover)]" : "border border-line-strong bg-white text-ink hover:bg-surface-2",
  );
  return /^https?:/.test(href) ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;

/** Everything a plan includes, from the product's plans.ts. */
export function planLines(plan: Plan): string[] {
  return [
    `${num(plan.minutesPerMonth)} calling minutes a month`,
    `${num(plan.messagesPerMonth)} replies a month, every channel`,
    `Up to ${plan.bookableStaff} bookable ${plan.bookableStaff === 1 ? "person" : "staff"}`,
    "Bookings, reminders and review requests",
    "Call forwarding from your own number",
    ...(plan.mediaCreditsPerMonth ? [`${num(plan.mediaCreditsPerMonth)} media credits a month for AI images${SHOW_AI_VIDEO ? " and videos" : ""}`] : []),
  ];
}

function newFeatures(plan: Plan, prev: Plan | null): string[] {
  return plan.features.filter((f) => f !== "prompt_generation" && !prev?.features.includes(f)).map((f) => FEATURE_LABELS[f]);
}

export function PricingCards() {
  const [yearly, setYearly] = useState(false);
  const off = Math.round(YEARLY_DISCOUNT * 100);
  return (
    <>
      {YEARLY_BILLING && (
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-line bg-white p-1 shadow-sm" role="group" aria-label="Billing period">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                aria-pressed={yearly === y}
                onClick={() => setYearly(y)}
                className={cx("flex items-center gap-2 rounded-full px-5 py-2 text-[14.5px] font-semibold transition-colors", yearly === y ? "bg-ink text-white" : "text-muted-ink hover:text-ink")}
              >
                {y ? "Yearly" : "Monthly"}
                {y && <span className={cx("rounded-full px-2 py-0.5 text-[12px]", yearly ? "bg-cta text-[var(--rp-cta-ink)]" : "bg-[#dcfce7] text-[#15803d]")}>Save {off}%</span>}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PLANS.map((plan, i) => {
          const prev = i > 0 ? PLANS[i - 1] : null;
          const highlight = plan.id === HIGHLIGHT;
          const adds = newFeatures(plan, prev);
          const perMonth = yearly ? Math.round(plan.monthlyUsd * (1 - YEARLY_DISCOUNT) * 100) / 100 : plan.monthlyUsd;
          return (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={cx(
                "rp-card-hover relative flex scroll-mt-28 flex-col rounded-3xl border bg-white p-6",
                highlight ? "rp-brand-ring shadow-[0_30px_70px_-30px_rgba(91,78,230,0.55)]" : "border-line shadow-[0_1px_2px_rgba(11,27,43,0.04)]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight text-ink">{plan.name}</h3>
                {highlight && <span className="whitespace-nowrap rounded-full bg-[#0b1b2b] px-2.5 py-1 text-[11.5px] font-semibold text-white">Recommended</span>}
              </div>
              <p className="mt-2 min-h-[3rem] text-[13.5px] leading-relaxed text-muted-ink">{FOR_WHO[plan.id]}</p>
              <p className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[40px] font-bold tracking-[-0.04em] text-ink">{money(perMonth)}</span>
                <span className="text-[14px] text-muted-ink">a month</span>
              </p>
              <p className="mt-1 min-h-[1.25rem] text-[12.5px] text-muted-ink">
                {yearly ? (
                  <>
                    {money(Math.round(plan.monthlyUsd * 12 * (1 - YEARLY_DISCOUNT)))} billed yearly <s className="text-faint">{money(plan.monthlyUsd * 12)}</s>
                  </>
                ) : (
                  "Billed monthly, cancel any time"
                )}
              </p>
              <PlanButton href={`${START_URL}?plan=${plan.id}${yearly ? "&billing=yearly" : ""}`} cta={highlight}>
                Choose {plan.name}
              </PlanButton>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                {planLines(plan).map((line) => (
                  <li key={line} className="flex gap-2.5 text-[13.5px] leading-snug text-muted-ink">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#15803d]" />
                    {line}
                  </li>
                ))}
              </ul>
              {adds.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2.5 text-[12.5px] font-semibold text-ink">{prev ? `Everything in ${prev.name}, plus:` : "Also included:"}</p>
                  <ul className="flex flex-col gap-2.5">
                    {adds.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[13.5px] leading-snug text-ink">
                        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#5b4ee6]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
        <div className="rp-card-hover relative flex flex-col rounded-3xl bg-[#0b1b2b] p-6 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
            <Building2 className="h-5 w-5" aria-hidden />
          </span>
          <h3 className="mt-4 text-xl font-bold tracking-tight">Business</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">Several locations, a large team or heavy call volume.</p>
          <p className="mt-4 text-[40px] font-bold tracking-[-0.04em]">Custom</p>
          <p className="mt-1 text-[12.5px] text-white/70">Limits and a price set for you</p>
          <PlanButton href="/contact" cta>
            Talk to us
          </PlanButton>
          <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/15 pt-5">
            {[`Everything in ${PLANS[PLANS.length - 1]!.name}`, "Several locations in one account", "Minutes, messages and credits to fit", "A dedicated account manager", "Onboarding done with your team"].map((l) => (
              <li key={l} className="flex gap-2.5 text-[13.5px] leading-snug text-white/85">
                <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-cta" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
