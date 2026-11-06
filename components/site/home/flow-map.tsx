"use client";

import { useEffect, useState } from "react";
import { BookOpen, CalendarCheck, ChartNoAxesCombined, MessageSquareHeart, Send } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";

const IN = [
  { id: "phone", name: "Phone calls" },
  { id: "whatsapp", name: "WhatsApp" },
  { id: "instagram", name: "Instagram" },
  { id: "messenger", name: "Messenger" },
  { id: "sms", name: "Texts" },
  { id: "email", name: "Email" },
];

const OUT = [
  { Icon: CalendarCheck, t: "Booked in your calendar", b: "Confirmed by text, with a reminder before the visit" },
  { Icon: Send, t: "Posted where you choose", b: "Nine platforms, after your approval", logos: ["instagram", "facebook", "tiktok", "youtube", "linkedin"] },
  { Icon: MessageSquareHeart, t: "Reviews and comments answered", b: "In your voice, from your facts" },
  { Icon: ChartNoAxesCombined, t: "Told what's working", b: "Where customers come from, and what they ask" },
];

const EVENTS = [
  { ch: "phone", text: "“Anything Saturday morning?”", out: "Booked Sat 10:30" },
  { ch: "whatsapp", text: "“How much is a first visit?”", out: "Answered from your price list" },
  { ch: "instagram", text: "“Open on Sunday?”", out: "Answered, with your hours" },
  { ch: "email", text: "“Can I move my appointment?”", out: "Waiting for you under Needs you" },
  { ch: "messenger", text: "“Do you do gift vouchers?”", out: "Answered from your knowledge" },
];

function Lines({ side }: { side: "in" | "out" }) {
  const ys = side === "in" ? [34, 102, 170, 238, 306, 374] : [60, 160, 260, 350];
  return (
    <svg aria-hidden viewBox="0 0 100 410" preserveAspectRatio="none" className="hidden h-[410px] w-full lg:block">
      {ys.map((y) => (
        <path key={y} d={side === "in" ? `M0 ${y} C 55 ${y}, 45 205, 100 205` : `M0 205 C 55 205, 45 ${y}, 100 ${y}`} fill="none" stroke="#5b4ee6" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="rp-flow-line" />
      ))}
    </svg>
  );
}

/**
 * The whole product in one picture: every way a customer reaches the business on the left,
 * one AI that knows the business in the middle, and what gets done on the right. The
 * middle shows a stream of example enquiries being handled.
 */
export function FlowMap() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % EVENTS.length), 2600);
    return () => clearInterval(id);
  }, [inView]);
  const recent = [0, 1, 2].map((k) => EVENTS[(i - k + EVENTS.length * 2) % EVENTS.length]);

  return (
    <div ref={ref} className="grid items-center gap-6 lg:grid-cols-[1fr_90px_1.15fr_90px_1fr] lg:gap-0">
      <div>
        <p className="mb-3 text-[13.5px] font-semibold text-muted-ink">Customers reach you</p>
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-2.5">
          {IN.map((c) => (
            <li key={c.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white py-2.5 pl-2.5 pr-4 shadow-[0_8px_24px_-18px_rgba(11,27,43,0.5)]">
              <ChannelLogo id={c.id} size={32} />
              <span className="text-[14.5px] font-semibold text-ink">{c.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Lines side="in" />
      <div className="rounded-[26px] bg-ink p-5 text-white shadow-[0_40px_80px_-40px_rgba(11,27,43,0.8)] sm:p-6">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" className="h-9 w-9 rounded-xl bg-white p-1.5" />
          <div>
            <p className="text-[16px] font-semibold">Your RingPost</p>
            <p className="text-[13px] text-white/65">One AI that knows your business</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Services and prices", "Opening hours", "Your policies", "Your voice", "Staff and calendar"].map((t) => (
            <span key={t} className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[12px] text-white/85"><BookOpen className="h-3 w-3" aria-hidden />{t}</span>
          ))}
        </div>
        <p className="mt-5 text-[12.5px] font-semibold text-white/60">Right now</p>
        <ul className="mt-2 flex flex-col gap-2" aria-live="polite">
          {recent.map((e, k) => (
            <li key={`${e.ch}-${k}-${i}`} className={`rounded-xl p-3 transition-colors duration-500 ${k === 0 ? "bg-white/[0.12]" : "bg-white/[0.05]"}`}>
              <p className="flex items-center gap-2 text-[13.5px] text-white/90"><ChannelLogo id={e.ch} size={20} />{e.text}</p>
              <p className="mt-1.5 pl-7 text-[13px] font-semibold text-[#67e8f9]">{e.out}</p>
            </li>
          ))}
        </ul>
      </div>
      <Lines side="out" />
      <div>
        <p className="mb-3 text-[13.5px] font-semibold text-muted-ink">What gets done</p>
        <ul className="flex flex-col gap-2.5">
          {OUT.map(({ Icon, t, b, logos }) => (
            <li key={t} className="rounded-2xl border border-line bg-white p-4 shadow-[0_8px_24px_-18px_rgba(11,27,43,0.5)]">
              <p className="flex items-center gap-2.5 text-[14.5px] font-semibold text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f1ff] text-glow"><Icon className="h-4 w-4" aria-hidden /></span>{t}</p>
              <p className="mt-1.5 text-[13.5px] text-muted-ink">{b}</p>
              {logos && <span className="mt-2 flex gap-1">{logos.map((l) => <ChannelLogo key={l} id={l} size={20} />)}<span className="ml-1 self-center text-[12px] text-faint">+4</span></span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
