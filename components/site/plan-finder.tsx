"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PLANS, num, usd, type Plan, type PlanId } from "@/lib/plans";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/** Who each plan is for (the same copy as the plan cards). */
const FOR_WHO: Record<PlanId, string> = {
  starter: "A solo owner who just wants to stop missing calls and messages.",
  essential: "A busy shop, clinic or trade that lives on the phone and WhatsApp.",
  grow: "A business that wants to be seen online, with fresh posts every day.",
  pro: "An established business that wants the whole front of house handled.",
};

/* ───────────────────────── Which plan is right for me? ───────────────────────── */

type Social = "no" | "some" | "yes";

/** Three questions, one answer. The minutes figures come from the plans themselves. */
export function PlanFinder() {
  const [calls, setCalls] = useState(20);
  const [social, setSocial] = useState<Social>("no");
  const [reviews, setReviews] = useState(false);

  // About a minute and a half per call; busy months can add a top-up instead of a bigger plan.
  const monthlyMinutes = calls * 4.33 * 1.5;
  const byMinutes = (p: Plan) => p.minutesPerMonth >= monthlyMinutes;
  const callsOnly = PLANS.filter((p) => p.mediaCreditsPerMonth === 0);
  let pick: Plan;
  if (reviews) pick = PLANS.find((p) => p.features.includes("reviews")) ?? PLANS[PLANS.length - 1];
  else if (social !== "no") pick = PLANS.find((p) => p.features.includes("auto_posting") && byMinutes(p)) ?? PLANS[PLANS.length - 1];
  // No social media: the calls-and-messages plans, never one that charges for posting.
  else pick = callsOnly.find((p) => byMinutes(p)) ?? callsOnly[callsOnly.length - 1] ?? PLANS[0];

  const option = (on: boolean) =>
    cx("rounded-full border px-4 py-2 text-[14px] font-medium transition-colors", on ? "border-[#0b1b2b] bg-[#0b1b2b] text-white" : "border-line-strong bg-white text-ink hover:bg-surface-2");

  return (
    <div className="grid gap-8 rounded-[32px] border border-line bg-white p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-7">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink">Which plan is right for me?</h2>
          <p className="mt-2 text-[16px] text-muted-ink">Three quick questions.</p>
        </div>
        <div>
          <label htmlFor="calls-week" className="flex items-baseline justify-between text-[15px] font-semibold text-ink">
            Calls you get a week <span className="text-2xl font-bold tabular-nums">{calls}</span>
          </label>
          <input id="calls-week" type="range" min={0} max={150} step={5} value={calls} onChange={(e) => setCalls(Number(e.target.value))} className="mt-3 w-full accent-[#5b4ee6]" />
        </div>
        <fieldset>
          <legend className="text-[15px] font-semibold text-ink">Do you post on social media?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={option(social === "no")} onClick={() => setSocial("no")} aria-pressed={social === "no"}>
              No
            </button>
            <button type="button" className={option(social === "some")} onClick={() => setSocial("some")} aria-pressed={social === "some"}>
              Sometimes
            </button>
            <button type="button" className={option(social === "yes")} onClick={() => setSocial("yes")} aria-pressed={social === "yes"}>
              I want to, every day
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-[15px] font-semibold text-ink">Want help with reviews, comments and campaigns?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className={option(!reviews)} onClick={() => setReviews(false)} aria-pressed={!reviews}>
              Not yet
            </button>
            <button type="button" className={option(reviews)} onClick={() => setReviews(true)} aria-pressed={reviews}>
              Yes, all of it
            </button>
          </div>
        </fieldset>
      </div>
      <div key={pick.id} className="animate-bubble-in flex flex-col justify-center rounded-3xl bg-[#0b1b2b] p-8 text-white">
        <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-[#67e8f9]">Your best fit</p>
        <p className="mt-2 text-5xl font-bold tracking-tight">{pick.name}</p>
        <p className="mt-2 text-xl text-[#b8c2ce]">{usd(pick.monthlyUsd)} a month</p>
        <p className="mt-4 text-[15px] leading-relaxed text-[#b8c2ce]">{FOR_WHO[pick.id]}</p>
        <p className="mt-2 text-[14px] text-[#b8c2ce]">
          {num(pick.minutesPerMonth)} calling minutes and {num(pick.messagesPerMonth)} replies a month.
        </p>
        <Link href={`#plan-${pick.id}`} className="mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-cta px-6 text-[15px] font-semibold text-[var(--rp-cta-ink)] transition-colors hover:bg-[var(--rp-cta-hover)]">
          See {pick.name} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
