"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Eye, Heart, Lightbulb, MessageCircle } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";
import { DesktopFrame } from "./desktop-frame";

const TABS = ["Customers & conversions", "What we noticed", "Your business", "Social performance"] as const;
type Tab = (typeof TABS)[number];

const KPIS = [
  { k: "Customers", v: "205", s: "611 conversations" },
  { k: "Booked", v: "64", s: "customers" },
  { k: "Conversion", v: "31%", s: "64 of 205 customers" },
  { k: "Follow up", v: "19", s: "waiting for you" },
  { k: "Linked to posts", v: "23", s: "from Instagram and Facebook" },
];

const SAYS = [
  "Phone calls brought the most enquiries: 249 of 611. Make sure your number is on your website, Google listing and posts.",
  "19 customers asked about a time and haven't booked yet. Open them to follow up with the ones worth a reply.",
  "23 enquiries came from people who saw a post. Your “weekend openings” post brought the most.",
];

const NOTICED = [
  { t: "“Do you have parking?” came up 14 times", b: "Add it to your Knowledge page and it will be answered every time." },
  { t: "Instagram messages are up 40%", b: "More people find you there. Keep posting finished work." },
  { t: "Thursday afternoons are quiet", b: "A win-back message for Thursday could fill them." },
];

const CHANNELS = [
  { id: "phone", n: "Calls", v: 249 }, { id: "whatsapp", n: "WhatsApp", v: 141 }, { id: "instagram", n: "Instagram", v: 112 }, { id: "messenger", n: "Messenger", v: 54 }, { id: "sms", n: "Texts", v: 37 }, { id: "email", n: "Email", v: 18 },
];

const POSTS = INDUSTRY_SHOWCASE.slice(0, 5).map((x, i) => ({ ...x, views: ["12.4K", "8.1K", "6.3K", "5.6K", "3.9K"][i], likes: ["842", "516", "402", "301", "260"][i], comments: ["37", "22", "19", "14", "9"][i], p: [["instagram", "tiktok"], ["instagram", "facebook"], ["tiktok", "youtube"], ["instagram", "x"], ["facebook", "linkedin"]][i] }));

/** The Insights screen recreated with its four tabs; it moves through them on its own until
 * the visitor picks one. */
export function InsightsHero() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  const [tab, setTab] = useState<Tab>(TABS[0]);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!inView || !auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setTab((t) => TABS[(TABS.indexOf(t) + 1) % TABS.length]), 4200);
    return () => clearTimeout(id);
  }, [inView, auto, tab]);

  return (
    <div ref={ref}>
      <DesktopFrame title="Insights">
        <div className="p-5 sm:p-6">
          <div className="inline-flex flex-wrap gap-1 rounded-2xl bg-surface-2 p-1" role="tablist" aria-label="Insights tabs">
            {TABS.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={t === tab} onClick={() => { setAuto(false); setTab(t); }} className={`rounded-xl px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${t === tab ? "bg-white text-ink shadow-sm" : "text-muted-ink hover:text-ink"}`}>{t}</button>
            ))}
          </div>

          <div key={tab} className="rp-fade-in mt-5 min-h-[420px]">
            {tab === "Customers & conversions" && (
              <>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                  {KPIS.map((x) => (
                    <div key={x.k} className="rounded-2xl border border-line p-4"><p className="text-[11.5px] font-semibold uppercase tracking-wide text-muted-ink">{x.k}</p><p className="mt-1 text-[28px] font-bold tabular-nums text-ink">{x.v}</p><p className="text-[12px] text-muted-ink">{x.s}</p></div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-line p-5">
                  <p className="text-[14.5px] font-semibold text-ink">What the numbers say</p>
                  <ul className="mt-3 flex flex-col gap-3">{SAYS.map((x) => <li key={x} className="flex items-start justify-between gap-4 text-[14px] leading-relaxed text-ink">{x}<span className="shrink-0 text-[13px] font-semibold text-glow">See them</span></li>)}</ul>
                </div>
              </>
            )}
            {tab === "What we noticed" && (
              <div className="grid gap-3 md:grid-cols-3">
                {NOTICED.map((x) => (
                  <div key={x.t} className="rounded-2xl border border-line bg-[linear-gradient(160deg,#f6f4ff,#ffffff_60%)] p-5"><Lightbulb className="h-5 w-5 text-glow" aria-hidden /><p className="mt-3 text-[15.5px] font-semibold text-ink">{x.t}</p><p className="mt-1.5 text-[14px] leading-relaxed text-muted-ink">{x.b}</p></div>
                ))}
              </div>
            )}
            {tab === "Your business" && (
              <div className="grid gap-4 md:grid-cols-[1.1fr_1fr]">
                <div className="rounded-2xl border border-line p-5">
                  <p className="text-[14.5px] font-semibold text-ink">Bookings, last 8 weeks</p>
                  <svg viewBox="0 0 400 160" className="mt-3 h-[180px] w-full" aria-hidden>
                    <defs><linearGradient id="ib" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#5b4ee6" stopOpacity="0.28" /><stop offset="1" stopColor="#5b4ee6" stopOpacity="0" /></linearGradient></defs>
                    {[40, 80, 120].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#e3e7ed" />)}
                    <path d="M0 130 L57 118 L114 124 L171 96 L228 84 L285 70 L342 58 L400 34 L400 160 L0 160 Z" fill="url(#ib)" />
                    <path d="M0 130 L57 118 L114 124 L171 96 L228 84 L285 70 L342 58 L400 34" fill="none" stroke="#5b4ee6" strokeWidth="3.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="rounded-2xl border border-line p-5">
                  <p className="text-[14.5px] font-semibold text-ink">Where enquiries came from</p>
                  <ul className="mt-3 flex flex-col gap-2.5">{CHANNELS.map((c) => <li key={c.id} className="flex items-center gap-2.5"><ChannelLogo id={c.id} size={22} /><span className="w-20 text-[13px] text-ink">{c.n}</span><span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full bg-[#5b4ee6]" style={{ width: `${(c.v / 249) * 100}%` }} /></span><span className="w-8 text-right text-[13px] font-semibold tabular-nums">{c.v}</span></li>)}</ul>
                </div>
              </div>
            )}
            {tab === "Social performance" && (
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className="grid grid-cols-[1fr_80px_80px_80px] bg-surface-2 px-4 py-2.5 text-[12px] font-semibold text-muted-ink"><span>Post</span><span>Views</span><span>Likes</span><span>Comments</span></div>
                {POSTS.map((x) => (
                  <div key={x.slug} className="grid grid-cols-[1fr_80px_80px_80px] items-center border-t border-line px-4 py-2.5 text-[13.5px] text-ink">
                    <span className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={x.after} alt="" className="h-11 w-9 rounded-md object-cover" />
                      <span><span className="block font-semibold">{x.title}</span><span className="mt-0.5 flex gap-1">{x.p.map((p) => <ChannelLogo key={p} id={p} size={15} />)}</span></span>
                    </span>
                    <span className="flex items-center gap-1 tabular-nums"><Eye className="h-3.5 w-3.5 text-faint" aria-hidden />{x.views}</span>
                    <span className="flex items-center gap-1 tabular-nums"><Heart className="h-3.5 w-3.5 text-faint" aria-hidden />{x.likes}</span>
                    <span className="flex items-center gap-1 tabular-nums"><MessageCircle className="h-3.5 w-3.5 text-faint" aria-hidden />{x.comments}</span>
                  </div>
                ))}
                <p className="flex items-center gap-1.5 border-t border-line bg-[#f6f4ff] px-4 py-3 text-[13.5px] text-ink"><ArrowUpRight className="h-4 w-4 text-glow" aria-hidden />Videos of finished work got the most views this month. Make more of them.</p>
              </div>
            )}
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}
