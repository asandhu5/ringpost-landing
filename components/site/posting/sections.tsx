"use client";

import { useEffect, useState } from "react";
import { Check, CloudUpload, FileVideo, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";

const STEPS = [
  { Icon: CloudUpload, title: "Uploading from your phone", body: "If the signal drops, it carries on from where it stopped." },
  { Icon: Wand2, title: "Made ready for every app", body: "iPhone photos converted and turned upright; videos put in the format each app accepts." },
  { Icon: ShieldCheck, title: "Checked", body: "Every upload passes the same safety check as AI-made content." },
  { Icon: Sparkles, title: "Caption written from your note", body: "“New colour today, few spaces Friday” becomes a caption for each platform." },
  { Icon: Check, title: "Waiting in Approvals", body: "Nothing goes out until you approve it, unless you switch on autopilot." },
];

/** An upload going through, one step at a time, once it scrolls into view. */
export function UploadJourney() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setStep(STEPS.length);
    const id = setInterval(() => setStep((s) => (s >= STEPS.length ? s : s + 1)), 900);
    return () => clearInterval(id);
  }, [inView]);
  const progress = Math.min(100, step === 0 ? 8 : step === 1 ? 64 : 100);
  return (
    <div ref={ref} className="rounded-[28px] border border-line bg-white p-5 shadow-[0_30px_70px_-45px_rgba(11,27,43,0.45)] sm:p-7">
      <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-line-strong bg-surface-2 p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/made/studio/florist-phone.webp" alt="A phone photo of a bouquet on a workbench (made with AI)" className="h-20 w-20 shrink-0 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-[14.5px] font-semibold text-ink"><FileVideo className="h-4 w-4 text-glow" aria-hidden />IMG_4821.HEIC <span className="font-normal text-faint">· 6.4 MB</span></p>
          <p className="mt-1 text-[13px] text-muted-ink">&ldquo;Peonies are in. Same-day bouquets.&rdquo;</p>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress">
            <div className="h-full rounded-full bg-cta transition-[width] duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
      <ol className="mt-5 flex flex-col">
        {STEPS.map(({ Icon, title, body }, i) => {
          const done = step > i;
          const active = step === i;
          return (
            <li key={title} className="relative flex gap-3.5 pb-4 last:pb-0">
              {i < STEPS.length - 1 && <span aria-hidden className={`absolute left-[15px] top-8 h-[calc(100%-24px)] w-0.5 ${done ? "bg-success" : "bg-line"}`} />}
              <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${done ? "bg-success text-white" : active ? "bg-[#f3f1ff] text-glow ring-2 ring-glow" : "bg-surface-2 text-faint"}`}>
                {done ? <Check className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
              </span>
              <span className="pt-1">
                <span className="block text-[14.5px] font-semibold text-ink">{title}</span>
                <span className="block text-[13.5px] leading-relaxed text-muted-ink">{body}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

type Slot = { slug: string; time: string; state: "approve" | "scheduled" | "posted"; platforms: string[] };
const WEEK: { day: string; date: number; slots: Slot[] }[] = [
  { day: "Mon", date: 9, slots: [{ slug: "beauty-and-wellness", time: "09:00", state: "posted", platforms: ["instagram", "tiktok"] }, { slug: "health", time: "13:00", state: "posted", platforms: ["facebook", "instagram"] }] },
  { day: "Tue", date: 10, slots: [{ slug: "fitness", time: "06:30", state: "posted", platforms: ["instagram", "youtube"] }] },
  { day: "Wed", date: 11, slots: [{ slug: "food-and-drink", time: "17:30", state: "scheduled", platforms: ["instagram", "facebook", "x"] }, { slug: "home-services", time: "08:00", state: "scheduled", platforms: ["facebook", "pinterest"] }] },
  { day: "Thu", date: 12, slots: [{ slug: "auto", time: "18:00", state: "scheduled", platforms: ["tiktok", "instagram"] }] },
  { day: "Fri", date: 13, slots: [{ slug: "professional-services", time: "10:00", state: "approve", platforms: ["linkedin", "x"] }, { slug: "education-and-care", time: "16:00", state: "approve", platforms: ["instagram", "threads"] }] },
  { day: "Sat", date: 14, slots: [{ slug: "shops", time: "09:30", state: "approve", platforms: ["instagram", "pinterest"] }] },
  { day: "Sun", date: 15, slots: [{ slug: "stays-and-venues", time: "11:00", state: "scheduled", platforms: ["instagram", "facebook", "bluesky"] }] },
];
const STATE = {
  approve: { label: "Needs you", cls: "bg-amber-50 text-amber-800" },
  scheduled: { label: "Scheduled", cls: "bg-[#f3f1ff] text-[#4b3fd6]" },
  posted: { label: "Posted", cls: "bg-emerald-50 text-emerald-800" },
};

/** A week of posts in Approvals across every kind of business: what's out, what's booked
 * in, and what needs a yes. */
export function ScheduleWeek() {
  const [ref, inView] = useInView<HTMLDivElement>();
  let n = 0;
  return (
    <div ref={ref} className="overflow-x-auto rounded-[28px] border border-line bg-white p-4 shadow-[0_30px_70px_-45px_rgba(11,27,43,0.45)] sm:p-6">
      <div className="grid min-w-[980px] grid-cols-7 gap-3">
        {WEEK.map((d) => (
          <div key={d.day} className="flex flex-col gap-3">
            <p className="flex items-baseline gap-1.5 px-1 text-[13px] text-muted-ink"><span className="font-semibold text-ink">{d.day}</span><span className="tabular-nums">{d.date}</span></p>
            {d.slots.map((slot) => {
              const x = INDUSTRY_SHOWCASE.find((i) => i.slug === slot.slug)!;
              const delay = n++ * 90;
              return (
                <div key={slot.slug} className={`overflow-hidden rounded-2xl border border-line bg-white transition-[opacity,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgba(11,27,43,0.5)] ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`} style={{ transitionDelay: `${delay}ms` }}>
                  <div className="relative aspect-[4/5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={x.after} alt={`${x.group}: ${x.title}`} loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[10.5px] font-semibold text-ink">{x.group}</span>
                  </div>
                  <div className="p-2.5">
                    <p className="truncate text-[12.5px] font-semibold text-ink">{x.title}</p>
                    <p className="mt-0.5 truncate text-[11.5px] text-muted-ink">{x.business.name} · <span className="tabular-nums">{slot.time}</span></p>
                    <div className="mt-2 flex items-center justify-between gap-1">
                      <span className="flex -space-x-1">{slot.platforms.map((p) => <ChannelLogo key={p} id={p} size={17} className="ring-2 ring-white" />)}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${STATE[slot.state].cls}`}>{STATE[slot.state].label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
