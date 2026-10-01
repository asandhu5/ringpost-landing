import { Check } from "lucide-react";
import { ButtonLink, cx } from "@/components/site/ui";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TRIAL, num, usd, type Plan } from "@/lib/plans";
import { SIGNUP_URL } from "@/lib/site";

/** Growth is shown as the middle, recommended plan: it's where your own uploads,
 * auto-posting, comment replies and Talk to AI start. (A layout choice, not a claim.) */
const HIGHLIGHT = "growth";

/** Everything a plan includes, from the product's plans.ts. */
export function planLines(plan: Plan): string[] {
  return [
    `${num(plan.minutesPerMonth)} calling minutes a month`,
    `${num(plan.messagesPerMonth)} messages a month`,
    `Up to ${plan.bookableStaff} bookable staff`,
    "Call forwarding from your own number",
    `${plan.imagesPerDay} AI images a day`,
    ...(SHOW_AI_VIDEO ? [`${plan.videos.count} AI video a ${plan.videos.per}`] : []),
  ];
}

function newFeatures(plan: Plan, prev: Plan | null): string[] {
  return plan.features.filter((f) => f !== "prompt_generation" && !prev?.features.includes(f)).map((f) => FEATURE_LABELS[f]);
}

export function PricingCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PLANS.map((plan, i) => {
        const prev = i > 0 ? PLANS[i - 1] : null;
        const highlight = plan.id === HIGHLIGHT;
        const adds = newFeatures(plan, prev);
        return (
          <div
            key={plan.id}
            className={cx(
              "relative flex flex-col rounded-3xl border p-7 sm:p-8",
              highlight ? "rp-glow-violet border-violet/50 bg-[linear-gradient(180deg,rgba(124,107,255,0.14),rgba(124,107,255,0.03))]" : "rp-card",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
              {highlight && <span className="rounded-full bg-violet/20 px-2.5 py-1 text-[12px] font-medium text-glow">Recommended</span>}
            </div>
            <p className="mt-2 min-h-12 text-[14px] leading-relaxed text-muted-ink">{plan.tagline}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-6xl leading-none text-ink">{usd(plan.monthlyUsd)}</span>
              <span className="text-[14px] text-muted-ink">a month</span>
            </p>
            <p className="mt-2 text-[13px] text-muted-ink">{TRIAL.days}-day free trial, no setup fee</p>
            <ButtonLink href={SIGNUP_URL} variant={highlight ? "cta" : "ghost"} className="mt-6 w-full">
              Start free trial
            </ButtonLink>
            <ul className="mt-7 flex flex-col gap-2.5 border-t border-line pt-6">
              {planLines(plan).map((line) => (
                <li key={line} className="flex gap-2.5 text-[14px] leading-snug text-muted-ink">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {line}
                </li>
              ))}
            </ul>
            {adds.length > 0 && (
              <div className="mt-5">
                <p className="mb-2.5 text-[13px] font-medium text-ink">{prev ? `Everything in ${prev.name}, plus:` : "Also included:"}</p>
                <ul className="flex flex-col gap-2.5">
                  {adds.map((line) => (
                    <li key={line} className="flex gap-2.5 text-[14px] leading-snug text-ink">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-glow" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
