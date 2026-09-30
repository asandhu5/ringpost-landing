import { Check } from "lucide-react";
import { ButtonLink, cx } from "@/components/site/ui";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, TRIAL, num, usd, type Plan } from "@/lib/plans";
import { SIGNUP_URL } from "@/lib/site";

/** Growth is shown as the middle, recommended plan: it is where comment replies,
 * auto-posting and Talk to AI start. (A layout choice, not a claim about customers.) */
const HIGHLIGHT = "growth";

function planLines(plan: Plan, prev: Plan | null): string[] {
  const lines = [
    `${num(plan.minutesPerMonth)} calling minutes a month`,
    `${num(plan.messagesPerMonth)} messages a month`,
    `${plan.imagesPerDay} fresh AI images a day${plan.promptExtrasPerWeek.images ? `, plus ${plan.promptExtrasPerWeek.images} more a week on request` : ""}`,
  ];
  if (SHOW_AI_VIDEO) {
    lines.push(`${plan.videos.count} AI video a ${plan.videos.per}${plan.promptExtrasPerWeek.videos ? `, plus ${plan.promptExtrasPerWeek.videos} more a week on request` : ""}`);
  }
  const newFeatures = plan.features.filter((f) => !prev?.features.includes(f) && (SHOW_AI_VIDEO || f !== "prompt_generation"));
  return [...lines, ...newFeatures.map((f) => FEATURE_LABELS[f])];
}

export function PricingCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {PLANS.map((plan, i) => {
        const prev = i > 0 ? PLANS[i - 1] : null;
        const highlight = plan.id === HIGHLIGHT;
        return (
          <div
            key={plan.id}
            className={cx(
              "relative flex flex-col rounded-3xl border p-7 sm:p-8",
              highlight ? "border-violet/50 bg-[linear-gradient(180deg,rgba(124,107,255,0.14),rgba(124,107,255,0.03))] rp-glow-violet" : "rp-card",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-ink">{plan.name}</h3>
              {highlight && <span className="rounded-full bg-violet/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-glow">Recommended</span>}
            </div>
            <p className="mt-2 min-h-12 text-[14px] leading-relaxed text-muted-ink">{plan.tagline}</p>
            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-6xl leading-none text-ink">{usd(plan.monthlyUsd)}</span>
              <span className="text-[14px] text-muted-ink">/ month</span>
            </p>
            <p className="mt-2 text-[13px] text-muted-ink">{TRIAL.days}-day free trial · no setup fee</p>
            <ButtonLink href={SIGNUP_URL} variant={highlight ? "cta" : "ghost"} className="mt-6 w-full">
              Start free trial
            </ButtonLink>
            <div className="mt-7 border-t border-line pt-6">
              {prev && <p className="mb-3 text-[13px] font-medium text-ink">Everything in {prev.name}, plus:</p>}
              {!prev && <p className="mb-3 text-[13px] font-medium text-ink">Every call and message answered, and:</p>}
              <ul className="flex flex-col gap-2.5">
                {(compact ? planLines(plan, prev).slice(0, 5) : planLines(plan, prev)).map((line) => (
                  <li key={line} className="flex gap-2.5 text-[14px] leading-snug text-muted-ink">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
