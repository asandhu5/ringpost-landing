import { Building2, Check } from "lucide-react";
import { ButtonLink, cx } from "@/components/site/ui";
import { FEATURE_LABELS, PLANS, SHOW_AI_VIDEO, num, usd, type Plan, type PlanId } from "@/lib/plans";
import { START_URL } from "@/lib/site";
import { InViewGroup } from "@/components/site/motion";

/** Growth is shown as the recommended plan: it's where content and posting start.
 * (A layout choice, not a claim about what most businesses buy.) */
const HIGHLIGHT: PlanId = "grow";

/** Who each plan is for, in an owner's words. Copy only: every number comes from plans.json. */
const FOR_WHO: Record<PlanId, string> = {
  starter: "A solo owner who just wants to stop missing calls and messages.",
  essential: "A busy shop, clinic or trade that lives on the phone and WhatsApp.",
  grow: "A business that wants to be seen online, with fresh posts every day.",
  pro: "An established business that wants the whole front of house handled.",
};

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
  return (
    <>
      <InViewGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan, i) => {
          const prev = i > 0 ? PLANS[i - 1] : null;
          const highlight = plan.id === HIGHLIGHT;
          const adds = newFeatures(plan, prev);
          const callsOnly = plan.mediaCreditsPerMonth === 0;
          return (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={cx(
                "relative flex scroll-mt-28 flex-col rounded-3xl border bg-white p-6 sm:p-7",
                "rp-card-hover",
                highlight ? "rp-brand-ring shadow-[0_30px_70px_-30px_rgba(91,78,230,0.55)]" : "border-line shadow-[0_1px_2px_rgba(11,27,43,0.04)]",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold tracking-tight text-ink">{plan.name}</h3>
                {callsOnly && <span className="whitespace-nowrap rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted-ink">No social media</span>}
                {/* In the row, not floating over the edge: the gradient border clips anything outside the card. */}
                {highlight && <span className="whitespace-nowrap rounded-full bg-[#0b1b2b] px-2.5 py-1 text-[12px] font-semibold text-white">Recommended</span>}
              </div>
              <p className="mt-2 min-h-[3rem] text-[14px] leading-relaxed text-muted-ink">{FOR_WHO[plan.id]}</p>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-5xl font-bold tracking-[-0.04em] text-ink">{usd(plan.monthlyUsd)}</span>
                <span className="text-[14px] text-muted-ink">a month</span>
              </p>
              <p className="mt-1.5 text-[13px] text-muted-ink">No setup fee, cancel any time</p>
              <ButtonLink href={`${START_URL}?plan=${plan.id}`} variant={highlight ? "cta" : "ghost"} className="mt-6 w-full">
                Choose {plan.name}
              </ButtonLink>
              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-5">
                {planLines(plan).map((line) => (
                  <li key={line} className="flex gap-2.5 text-[14px] leading-snug text-muted-ink">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#15803d]" />
                    {line}
                  </li>
                ))}
              </ul>
              {adds.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2.5 text-[13px] font-semibold text-ink">{prev ? `Everything in ${prev.name}, plus:` : "Also included:"}</p>
                  <ul className="flex flex-col gap-2.5">
                    {adds.map((line) => (
                      <li key={line} className="flex gap-2.5 text-[14px] leading-snug text-ink">
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
      </InViewGroup>

      <div className="mt-4 flex flex-col items-start justify-between gap-5 rounded-3xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0b1b2b] text-white">
            <Building2 className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-xl font-bold tracking-tight text-ink">Business</h3>
            <p className="mt-1 max-w-2xl text-[14.5px] leading-relaxed text-muted-ink">
              Several locations, a large team or heavy call volume? Everything in {PLANS[PLANS.length - 1].name}, with limits and a price set for you.
            </p>
          </div>
        </div>
        <ButtonLink href="/contact" variant="ghost" className="shrink-0">
          Talk to us
        </ButtonLink>
      </div>
    </>
  );
}

