"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { GROUP_INFO } from "@/lib/content/groups";
import { START_URL } from "@/lib/site";
import { Screen } from "./product-showcase";

const GOALS = [
  { id: "answer", name: "Catch more enquiries", screen: "/screens/inbox-whatsapp.webp", alt: "RingPost inbox showing a customer conversation", steps: ["Customer gets in touch", "Your AI checks your knowledge", "A reply, booking or handoff"], caption: "One conversation. The context stays with it.", detail: "Questions arrive through your connected channels. Your AI uses your saved business details, checks availability when needed and brings in your team for requests outside its authority." },
  { id: "create", name: "Show up on social", screen: "/screens/campaigns.webp", alt: "Campaign drafts and scheduled posts in RingPost", steps: ["Start with your business", "Create and review the content", "Schedule to connected channels"], caption: "Your next campaign starts with what makes you, you.", detail: "Turn your services, brand voice and own photos into content ideas. Review drafts, choose the destination and schedule approved posts. Channel support and automation depend on your plan and connections." },
  { id: "improve", name: "Know what to do next", screen: "/screens/advisor.webp", alt: "RingPost business advisor in the owner dashboard", steps: ["Your activity comes together", "Review the numbers and gaps", "Choose your next move"], caption: "More context. A clearer next step.", detail: "Bring questions to the advisor with your business profile and available performance data already in context. See what is missing, explore an idea and decide what to do next." },
  { id: "trust", name: "Get the answers right", screen: "/screens/ai-readiness.jpg", alt: "RingPost AI readiness checks with business-specific questions and expected behavior", steps: ["Add your real business facts", "Try customer scenarios", "Refine before automating"], caption: "A more useful AI starts with a better brief.", detail: "See the information your AI knows, fill the gaps and copy realistic test questions for your own business. Check prices, hours, booking boundaries and handoffs before relying on automation." },
] as const;

/** Uses the same industry catalog as the rest of the site. No invented ROI or results. */
export function BusinessExplorer() {
  const id = useId();
  const [groupIndex, setGroupIndex] = useState(0);
  const [goalIndex, setGoalIndex] = useState(0);
  const group = GROUP_INFO[groupIndex]!;
  const goal = GOALS[goalIndex]!;
  return (
    <section id="your-business" className="rp-business-lab relative isolate overflow-hidden rounded-[32px] bg-[#10182b] text-white sm:rounded-[40px]">
      <div aria-hidden className="rp-lab-glow absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#7863ef]/20 blur-[100px]" />
      <div className="relative grid gap-8 p-6 sm:p-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-7 lg:p-7">
        <div className="flex flex-col items-start">
          <span className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#bdb5ff]"><Sparkles size={15} aria-hidden /> Built around your day</span>
          <h2 className="max-w-lg text-[clamp(1.7rem,2.5vw,2.3rem)] font-semibold leading-[1.07] tracking-[-0.04em]">Your business.<br /><span className="text-[#8de4ed]">Your way of working.</span></h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">A busy salon and a repair shop have different days. Tell us a little about yours.</p>
          <label htmlFor={`${id}-business`} className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">I run a business in</label>
          <select id={`${id}-business`} value={groupIndex} onChange={(e) => setGroupIndex(Number(e.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-white/25 bg-[#1c2841] px-4 text-base text-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#8de4ed]">
            {GROUP_INFO.map((g, i) => <option key={g.slug} value={i}>{g.name}</option>)}
          </select>
          <p className="mt-3 text-xs leading-relaxed text-slate-300">{group.tagline}</p>
          <fieldset className="mt-3 w-full">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">My priority is</legend>
            <div className="grid grid-cols-2 gap-2">
              {GOALS.map((item, i) => <label key={item.id} className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-xs transition-colors ${i === goalIndex ? "border-[#8de4ed]/60 bg-[#8de4ed]/10 text-white" : "border-white/10 text-slate-300 hover:bg-white/5"}`}>
                <input type="radio" name={`${id}-goal`} checked={i === goalIndex} onChange={() => setGoalIndex(i)} className="accent-[#8de4ed]" />{item.name}<ChevronRight size={16} className="ml-auto" aria-hidden />
              </label>)}
            </div>
          </fieldset>
          <Link href={`/industries/${group.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8de4ed] underline-offset-4 hover:underline">Explore {group.name.toLowerCase()} <ArrowUpRight size={16} aria-hidden /></Link>
        </div>
        <div className="min-w-0 self-center" aria-live="polite" aria-atomic="true">
          <div key={goal.id} className="rp-lab-scene">
            <div className="mb-4 flex items-center justify-between gap-3 text-xs text-slate-300"><span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#8de4ed]" /> Your workflow preview</span><span>RingPost dashboard</span></div>
            <Screen src={goal.screen} alt={goal.alt} className="!rounded-xl !border-white/15 !shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]" />
            <h3 className="mt-4 text-xl font-semibold tracking-tight">{goal.caption}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{goal.detail}</p>
          </div>
        </div>
      </div>
      <div className="relative flex flex-wrap items-center justify-between gap-5 border-t border-white/10 bg-white/[0.03] px-6 py-4 sm:px-7">
        <p className="flex items-center gap-3 text-sm text-slate-300"><ShieldCheck size={20} className="shrink-0 text-[#8de4ed]" aria-hidden /> Your knowledge. Your approval settings. A person when it matters.</p>
        <a href={START_URL} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#8de4ed] px-5 text-sm font-semibold text-[#10182b] transition-colors hover:bg-white">Explore the dashboard <ArrowUpRight size={17} aria-hidden /></a>
      </div>
    </section>
  );
}
