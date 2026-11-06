"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  BellRing,
  BookOpen,
  CalendarCheck,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Inbox,
  MessageCircle,
  PenLine,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  Upload,
  UserRound,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";

/**
 * The explainers used on the channel, Content Studio and Grow pages: a chat
 * that plays out as it scrolls into view, a step-by-step flow, a tour of real dashboard
 * screens, and the posting flow (upload, approve, now or scheduled, out to every network).
 * Each one replays when scrolled back to, and settles at once for reduced motion.
 */

export const FLOW_ICONS: Record<string, LucideIcon> = {
  BarChart3,
  BellRing,
  BookOpen,
  CalendarCheck,
  Camera,
  CheckCircle2,
  Clock,
  Inbox,
  MessageCircle,
  PenLine,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  Star,
  ThumbsUp,
  Upload,
  UserRound,
  Wand2,
};

export type ChatLine = { from: "customer" | "ai" | "event" | "owner"; text: string };

const CHAT_STYLE: Record<string, { head: string; name: string; sub: string; ai: string; aiInk: string; customer: string; bg: string }> = {
  whatsapp: { head: "#075E54", name: "Your business", sub: "WhatsApp · replies in seconds", ai: "#D9FDD3", aiInk: "#0B1B2B", customer: "#FFFFFF", bg: "#EFE7DD" },
  instagram: { head: "linear-gradient(90deg,#833AB4,#E1306C,#F77737)", name: "yourbusiness", sub: "Instagram DM", ai: "linear-gradient(135deg,#7B3FF2,#E1306C)", aiInk: "#FFFFFF", customer: "#EFEFEF", bg: "#FFFFFF" },
  messenger: { head: "linear-gradient(90deg,#0695FF,#A334FA)", name: "Your business", sub: "Messenger", ai: "linear-gradient(135deg,#0695FF,#A334FA)", aiInk: "#FFFFFF", customer: "#F0F0F0", bg: "#FFFFFF" },
  sms: { head: "#1F2937", name: "Your business", sub: "Text message", ai: "#2F80ED", aiInk: "#FFFFFF", customer: "#E9E9EB", bg: "#FFFFFF" },
  email: { head: "#1A6FF0", name: "hello@yourbusiness.com", sub: "Email thread", ai: "#EEF4FF", aiInk: "#0B1B2B", customer: "#F7F7F8", bg: "#FFFFFF" },
  phone: { head: "linear-gradient(90deg,#16A34A,#22C55E)", name: "Incoming call", sub: "Live transcript", ai: "#ECFDF3", aiInk: "#0B1B2B", customer: "#F4F5F8", bg: "#FFFFFF" },
  advisor: { head: "linear-gradient(90deg,#5B4EE6,#22D3EE)", name: "Talk to AI", sub: "Answers from your own numbers", ai: "#F4F2FF", aiInk: "#0B1B2B", customer: "#5B4EE6", bg: "#FFFFFF" },
  review: { head: "#4285F4", name: "Google review", sub: "Reply drafted for you", ai: "#E8F0FE", aiInk: "#0B1B2B", customer: "#FFFFFF", bg: "#F8FAFC" },
};

/** A conversation that plays out line by line once it is on screen, and again when scrolled back to. */
export function ChatDemo({ channel, lines, caption }: { channel: string; lines: ChatLine[]; caption?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "0px 0px -15% 0px", threshold: 0.2 }, false);
  const [shown, setShown] = useState(0);
  const st = CHAT_STYLE[channel] ?? CHAT_STYLE.sms;
  useEffect(() => {
    if (!inView) return setShown(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(lines.length);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= lines.length) clearInterval(t);
    }, 1100);
    setShown(1);
    i = 1;
    return () => clearInterval(t);
  }, [inView, lines.length]);
  const typing = inView && shown < lines.length;
  const nextFromAi = lines[shown]?.from === "ai";
  return (
    <div ref={ref} className="mx-auto w-full max-w-[420px]">
      <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_40px_80px_-40px_rgba(11,27,43,0.45)]">
        <div className="flex items-center gap-3 px-5 py-3.5 text-white" style={{ background: st.head }}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            {channel === "advisor" ? <Sparkles className="h-4 w-4" aria-hidden /> : channel === "review" ? <Star className="h-4 w-4" aria-hidden /> : <ChannelLogo id={channel} size={22} />}
          </span>
          <span className="leading-tight">
            <span className="block text-[14.5px] font-semibold">{st.name}</span>
            <span className="block text-[12px] opacity-80">{st.sub}</span>
          </span>
          {channel === "phone" && <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11.5px] font-semibold"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />Live</span>}
        </div>
        <div className="flex min-h-[380px] flex-col gap-2.5 px-4 py-5" style={{ background: st.bg }}>
          {lines.slice(0, shown).map((l, i) =>
            l.from === "event" ? (
              <div key={i} className="rp-pop mx-auto flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-[#15803D] shadow-sm ring-1 ring-black/5">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> {l.text}
              </div>
            ) : (
              <div key={i} className={`rp-pop flex ${l.from === "customer" ? "justify-start" : "justify-end"}`}>
                <div
                  className="max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.06)]"
                  style={
                    l.from === "customer"
                      ? { background: channel === "advisor" ? st.customer : st.customer, color: channel === "advisor" ? "#FFFFFF" : "#0B1B2B", borderBottomLeftRadius: 6 }
                      : { background: st.ai, color: st.aiInk, borderBottomRightRadius: 6 }
                  }
                >
                  {l.from === "owner" && <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide opacity-70">You</span>}
                  {l.from === "ai" && channel !== "advisor" && <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-wide opacity-70">Your AI</span>}
                  {l.text}
                </div>
              </div>
            ),
          )}
          {typing && (
            <div className={`flex ${nextFromAi ? "justify-end" : "justify-start"}`}>
              <span className="flex gap-1 rounded-2xl bg-white px-3.5 py-3 shadow-sm ring-1 ring-black/5">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#9AA3B2]" style={{ animationDelay: `${d * 140}ms` }} />
                ))}
              </span>
            </div>
          )}
        </div>
      </div>
      {caption && <p className="mt-4 text-center text-[13.5px] text-muted-ink">{caption}</p>}
    </div>
  );
}

/** How the work moves, one step at a time: the line fills and each step lights up in turn. */
export function FlowSteps({ steps }: { steps: { icon: string; title: string; body: string }[] }) {
  const [ref, inView] = useInView<HTMLOListElement>({ rootMargin: "0px 0px -20% 0px", threshold: 0.2 }, false);
  return (
    <ol ref={ref} className={`relative grid gap-6 ${steps.length >= 5 ? "lg:grid-cols-5" : steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"} sm:grid-cols-2`}>
      <span aria-hidden className="absolute left-[8%] right-[8%] top-7 hidden h-[3px] overflow-hidden rounded-full bg-line lg:block">
        <span className="block h-full origin-left rounded-full bg-[linear-gradient(90deg,#5b4ee6,#22d3ee)] transition-transform ease-out" style={{ transform: `scaleX(${inView ? 1 : 0})`, transitionDuration: `${steps.length * 450}ms` }} />
      </span>
      {steps.map((s, i) => {
        const Icon = FLOW_ICONS[s.icon] ?? Sparkles;
        return (
          <li
            key={s.title}
            className="relative flex flex-col items-start transition-all duration-500 ease-out lg:items-center lg:text-center"
            style={{ opacity: inView ? 1 : 0.25, transform: inView ? "none" : "translateY(14px)", transitionDelay: `${i * 450}ms` }}
          >
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#5b4ee6] shadow-[0_14px_30px_-14px_rgba(91,78,230,0.6)] ring-1 ring-line">
              <Icon className="h-6 w-6" aria-hidden />
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#5b4ee6] text-[11.5px] font-bold text-white">{i + 1}</span>
            </span>
            <h3 className="mt-4 text-[16.5px] font-semibold text-ink">{s.title}</h3>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

/** Real dashboard screens, one at a time: pick a tab or let it move on by itself. */
export function ScreenTour({ items }: { items: { src: string; title: string; body: string }[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 }, false);
  useEffect(() => {
    if (!inView || paused || items.length < 2) return;
    const t = setTimeout(() => setI((x) => (x + 1) % items.length), 5200);
    return () => clearTimeout(t);
  }, [i, inView, paused, items.length]);
  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
      <ul className="flex flex-col gap-2">
        {items.map((it, k) => (
          <li key={it.src + it.title}>
            <button
              type="button"
              onClick={() => (setI(k), setPaused(true))}
              className={`relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-all ${k === i ? "bg-white shadow-[0_18px_40px_-24px_rgba(11,27,43,0.45)] ring-1 ring-line" : "hover:bg-white/60"}`}
            >
              <span className={`block text-[16px] font-semibold ${k === i ? "text-ink" : "text-muted-ink"}`}>{it.title}</span>
              <span className={`mt-1 block text-[14px] leading-relaxed text-muted-ink transition-all ${k === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>{it.body}</span>
              {k === i && !paused && inView && <span key={i} className="rp-tour-bar absolute bottom-0 left-0 h-[3px] bg-[linear-gradient(90deg,#5b4ee6,#22d3ee)]" />}
            </button>
          </li>
        ))}
      </ul>
      <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(11,27,43,0.5)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-[#f7f8fb] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          
        </div>
        <div className="relative aspect-[1150/700] max-h-[60svh]">
          {items.map((it, k) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={it.src + k} src={it.src} alt={it.title} loading="lazy" className="absolute inset-0 h-full w-full object-contain object-top transition-all duration-300" style={{ opacity: k === i ? 1 : 0, transform: k === i ? "scale(1)" : "scale(1.02)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

const NETWORKS = ["instagram", "facebook", "tiktok", "youtube", "x", "linkedin", "threads", "pinterest", "bluesky"];

export function InsightsDemo() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 }, false);
  const bars = [
    { label: "Phone calls", v: 41, color: "#22c55e" },
    { label: "WhatsApp", v: 26, color: "#25d366" },
    { label: "Instagram", v: 18, color: "#e1306c" },
    { label: "Messenger", v: 9, color: "#5b4ee6" },
    { label: "Email", v: 6, color: "#1a6ff0" },
  ];
  const kpis = [
    { label: "New customers", v: "205" },
    { label: "Booked", v: "31%" },
    { label: "Missed calls saved", v: "78" },
    { label: "Post views", v: "12.4k" },
  ];
  return (
    <div ref={ref} className="rounded-[28px] border border-line bg-white p-6 shadow-[0_40px_80px_-40px_rgba(11,27,43,0.4)] sm:p-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((k, i) => (
          <div key={k.label} className="rounded-2xl bg-[#f7f8fb] p-4 transition-all duration-700" style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(10px)", transitionDelay: `${i * 120}ms` }}>
            <p className="text-[12px] font-medium uppercase tracking-wide text-muted-ink">{k.label}</p>
            <p className="mt-1 text-[26px] font-bold tracking-tight text-ink">{k.v}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-[14px] font-semibold text-ink">Where customers came from</p>
      <ul className="mt-3 flex flex-col gap-3">
        {bars.map((b, i) => (
          <li key={b.label} className="grid grid-cols-[110px_1fr_40px] items-center gap-3 text-[13.5px]">
            <span className="text-muted-ink">{b.label}</span>
            <span className="h-3 overflow-hidden rounded-full bg-[#eef0f4]">
              <span className="block h-full rounded-full transition-[width] duration-1000 ease-out" style={{ width: inView ? `${b.v * 2}%` : "0%", background: b.color, transitionDelay: `${300 + i * 150}ms` }} />
            </span>
            <span className="text-right font-semibold text-ink">{b.v}%</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-2xl bg-[#f4f2ff] p-4 text-[13.5px] leading-relaxed text-ink transition-opacity duration-700" style={{ opacity: inView ? 1 : 0, transitionDelay: "1400ms" }}>
        <span className="font-semibold text-[#5b4ee6]">What the numbers say: </span>
        Most new customers call. Phone calls brought 41% of enquiries this month, so make sure your number is on your Google listing and every post.
      </div>
    </div>
  );
}
