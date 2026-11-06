"use client";

import { Check, Palette, ShieldCheck, Sparkles, Type } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { CountUp } from "@/components/site/motion";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";

const STATS = [
  { to: 10, label: "kinds of business" },
  { to: 9, label: "platforms, one approval" },
  { to: 6, label: "steps every piece takes" },
  { to: 3, label: "reference photos per piece" },
];

const pick = (slug: string) => INDUSTRY_SHOWCASE.find((x) => x.slug === slug)!;

/** Content Studio's opening: the promise and the numbers on the left, and the finished
 * work on the right with what was applied to it. */
export function StudioIntro({ actions }: { actions: React.ReactNode }) {
  const a = pick("beauty-and-wellness");
  const b = pick("food-and-drink");
  const c = pick("stays-and-venues");
  return (
    <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-[#ddd8ff] bg-white px-3 py-1.5 text-[13.5px] font-semibold text-[#4f46e5] shadow-sm"><Sparkles className="h-4 w-4" aria-hidden />Content Studio</p>
        <h1 className="mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] font-bold leading-[1] tracking-[-0.045em] text-ink">Studio-quality posts, made from your own photos.</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-ink sm:text-xl">A complete content studio built around your business. It learns your services, prices, voice and look, turns a phone photo into a finished image or video, adds your logo and offer exactly, and checks every piece before you see it.</p>
        <div className="mt-8">{actions}</div>
        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white px-4 py-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[30px] font-bold leading-none tracking-tight tabular-nums text-ink"><CountUp to={s.to} /></dd>
              <dd className="mt-1.5 text-[12.5px] leading-snug text-muted-ink">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative mx-auto h-[520px] w-full max-w-[540px]" aria-hidden>
        <div className="absolute inset-8 rounded-[40px] blur-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(91,78,230,0.18),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.18),transparent_55%)]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.after} alt="" className="rp-float-slow absolute left-0 top-24 w-[42%] rotate-[-8deg] rounded-[22px] object-cover shadow-[0_30px_60px_-30px_rgba(11,27,43,0.6)] ring-4 ring-white" style={{ aspectRatio: "4 / 5" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={b.after} alt="" className="rp-float-slow absolute right-0 top-28 w-[42%] rotate-[7deg] rounded-[22px] object-cover shadow-[0_30px_60px_-30px_rgba(11,27,43,0.6)] ring-4 ring-white" style={{ aspectRatio: "4 / 5", animationDelay: "-3s" }} />
        <div className="absolute left-1/2 top-4 w-[50%] -translate-x-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={a.after} alt="" className="w-full rounded-[26px] object-cover shadow-[0_40px_80px_-30px_rgba(11,27,43,0.65)] ring-4 ring-white" style={{ aspectRatio: "4 / 5" }} />
          <span className="absolute left-3 top-3 rounded-lg px-2.5 py-1 text-[12px] font-bold text-white shadow" style={{ background: a.business.color }}>{a.business.name}</span>
          <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1.5 text-[13.5px] font-bold text-ink shadow">A few spaces this week</span>
        </div>
        <span className="rp-float absolute left-0 top-[64%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(11,27,43,0.5)] ring-1 ring-line"><Type className="h-4 w-4 text-glow" />Logo and offer added</span>
        <span className="rp-float absolute right-[0%] top-[4%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(11,27,43,0.5)] ring-1 ring-line" style={{ animationDelay: "-2s" }}><Check className="h-4 w-4 text-success" />Words read back</span>
        <span className="rp-float absolute bottom-[2%] left-[8%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(11,27,43,0.5)] ring-1 ring-line" style={{ animationDelay: "-4s" }}><Palette className="h-4 w-4 text-[#db2777]" />Your brand colours</span>
        <span className="rp-float absolute bottom-[6%] right-[2%] flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[13px] font-semibold text-ink shadow-[0_20px_40px_-20px_rgba(11,27,43,0.5)] ring-1 ring-line" style={{ animationDelay: "-1s" }}><ShieldCheck className="h-4 w-4 text-success" />Checked<span className="ml-1 flex gap-0.5">{["instagram", "tiktok", "facebook"].map((p) => <ChannelLogo key={p} id={p} size={18} />)}</span></span>
      </div>
    </div>
  );
}
