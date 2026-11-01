"use client";

/**
 * The home page's moving parts (redesign 2026-10-30, light theme to match the dashboard).
 * Everything shown is something the product really does; the business in the demos is a
 * salon, no invented customers, ratings or results.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BarChart3, CalendarCheck, Check, Image as ImageIcon, MessageCircle, Phone, Send, Sparkles, ThumbsUp } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/* ───────────────────────── Hero headline ───────────────────────── */

/** Words rise in one by one; `highlight` words get the shimmer. */
export function HeroWords({ text, highlight = [], className }: { text: string; highlight?: string[]; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((w, i) => (
        <span key={i} className="rp-word" style={{ animationDelay: `${120 + i * 70}ms` }}>
          {highlight.includes(w.replace(/[.,]/g, "")) ? <span className="rp-shimmer-text">{w}</span> : w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h1>
  );
}

/* ───────────────────────── Hero: the live desk ───────────────────────── */

const DESK_STEPS = 9;
/** Fast enough that the whole evening is on screen in about three seconds, then held so
 * it can be read, then played again. */
const STEP_MS = 340;
const HOLD_STEPS = 22;

/** A loop of one evening at a salon: a call is answered and booked, messages on
 * other channels are answered, a post goes out and a comment gets a reply. */
export function LiveDesk() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(DESK_STEPS);
      return;
    }
    const t = setInterval(() => setStep((s) => (s >= DESK_STEPS + HOLD_STEPS ? 0 : s + 1)), STEP_MS);
    return () => clearInterval(t);
  }, []);
  const on = (n: number) => (step >= n ? "is-on" : "");

  return (
    <div className="relative" aria-label="An evening at a salon using RingPost" role="img">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-[#f0eeff] via-white to-[#e6fbfe] blur-2xl" aria-hidden />
      <div className="rounded-[28px] border border-line bg-white p-4 shadow-[0_30px_80px_-30px_rgba(11,27,43,0.35)] sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="rp-live-dot h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
            <span className="text-[13px] font-semibold text-ink">Live · Hair salon</span>
          </div>
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-medium text-muted-ink">7:42 pm · after closing</span>
        </div>

        {/* The call */}
        <div className="rounded-2xl border border-line bg-[#fbfcfd] p-4">
          <div className="flex items-center gap-3">
            <ChannelLogo id="phone" size={32} />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-ink">Sarah is calling</p>
              <p className="text-[12.5px] text-muted-ink">Answered by RingPost in your voice</p>
            </div>
            <span className="rp-wave flex h-6 items-center gap-[3px] text-[#5b4ee6]" aria-hidden>
              {[0.2, 0.5, 0.1, 0.7, 0.35, 0.6, 0.15].map((d, i) => (
                <span key={i} style={{ height: 22, animationDelay: `${d}s` }} />
              ))}
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-2 text-[13.5px] leading-snug">
            <p className={cx("rp-step max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2 text-ink", on(1))}>Anything Saturday morning for a cut and colour?</p>
            <p className={cx("rp-step max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#0b1b2b] px-3 py-2 text-white", on(2))}>Maya is free at 10:30. Shall I book you in?</p>
            <p className={cx("rp-step max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2 text-ink", on(3))}>Yes please!</p>
          </div>
        </div>

        {/* The booking */}
        <div className={cx("rp-step mt-3 flex items-center gap-3 rounded-2xl border border-[#ddd8ff] bg-[#f7f6ff] px-4 py-3", on(4))}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5b4ee6] shadow-sm">
            <CalendarCheck className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-ink">Booked: Sat 10:30 with Maya</p>
            <p className="text-[12.5px] text-muted-ink">In your calendar. Confirmation texted.</p>
          </div>
        </div>

        {/* Other channels, at the same time */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className={cx("rp-step flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5", on(5))}>
            <ChannelLogo id="whatsapp" size={24} />
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">Price for balayage?</span>
            <Check className="h-4 w-4 text-[#15803d]" aria-label="Answered" />
          </div>
          <div className={cx("rp-step flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5", on(6))}>
            <ChannelLogo id="instagram" size={24} />
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">Open on Sunday?</span>
            <Check className="h-4 w-4 text-[#15803d]" aria-label="Answered" />
          </div>
        </div>

        {/* Content and comments */}
        <div className={cx("rp-step mt-3 flex items-center gap-3 rounded-2xl border border-line px-3 py-3", on(7))}>
          <div className="rp-generate h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#e8dccf] to-[#d6c3ae]" aria-hidden />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-ink">“Autumn colour” post made for you</p>
            <p className="text-[12px] text-muted-ink">Posting to Instagram, Facebook and TikTok at 12:00</p>
          </div>
        </div>
        <div className={cx("rp-step mt-2.5 flex items-center gap-2.5 rounded-xl bg-surface-2 px-3 py-2.5", on(8))}>
          <MessageCircle className="h-4 w-4 shrink-0 text-[#5b4ee6]" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">
            <strong className="font-semibold">@mia:</strong> love this colour! · <span className="text-muted-ink">reply drafted for you</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── What it does ───────────────────────── */

const DOES = [
  { icon: Phone, title: "Answers your phone", plain: "Every call, day and night, in a friendly voice.", detail: "A natural voice on your own number, or forwarded from the one you have. Several calls at once, each sentence checked against your real prices and hours before it's spoken. Urgent calls are passed straight to you.", plans: "Every plan" },
  { icon: MessageCircle, title: "Replies to every message", plain: "WhatsApp, Instagram, Facebook, texts and email.", detail: "One inbox for every channel, the same knowledge of your business everywhere. Anything it shouldn't decide alone waits for you under “Needs you”, with an alert to your phone.", plans: "Every plan" },
  { icon: CalendarCheck, title: "Books your customers in", plain: "Straight into your calendar, with reminders.", detail: "Live availability for each member of staff, two-way Google Calendar sync, reminders before the visit and a review request after it.", plans: "Every plan" },
  { icon: ImageIcon, title: "Makes your posts", plain: "Fresh photos and videos about your business.", detail: "Images and short videos made every morning from your own services and prices, with your logo. Or upload your own from your phone and it writes the captions.", plans: "Growth and Pro" },
  { icon: Send, title: "Posts them everywhere", plain: "Instagram, Facebook, TikTok and six more.", detail: "Shaped for each platform and scheduled at good times for your trade. Nothing goes out until you approve it, unless you switch on autopilot.", plans: "Growth and Pro" },
  { icon: ThumbsUp, title: "Answers comments and reviews", plain: "So every customer feels heard.", detail: "Replies to comments on your posts and to your Google reviews, written in your voice for you to approve.", plans: "Pro" },
  { icon: BarChart3, title: "Tells you what's working", plain: "What customers ask, and which posts bring them in.", detail: "Insights from your real calls, messages and reviews, reach for every post on every platform, and which campaigns brought customers through the door.", plans: "Pro" },
  { icon: Sparkles, title: "Answers your questions", plain: "Ask it anything about your business.", detail: "Talk to AI reads your real numbers: “How was this week?”, “Who should I win back?”, “What should I post on Saturday?”", plans: "Growth and Pro" },
];

/** One colour per job, so the eight read as distinct at a glance. */
const TONES = ["#5b4ee6", "#0284c7", "#059669", "#d97706", "#e11d48", "#7c3aed", "#0d9488", "#2563eb"];

/** Eight things, in words anyone can follow, with the specifics one switch away for the
 * owner who wants them. */
export function UspSection() {
  const [details, setDetails] = useState(false);
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[15px] text-muted-ink">
          Everything below is <strong className="text-ink">one platform, one login, one monthly price</strong>, and one AI that knows your business.
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={details}
          onClick={() => setDetails((d) => !d)}
          className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-white py-1.5 pl-4 pr-1.5 text-[14px] font-semibold text-ink transition-colors hover:border-[#a594ff]"
        >
          Show me the details
          <span className={cx("relative h-6 w-11 rounded-full transition-colors", details ? "bg-[#5b4ee6]" : "bg-line-strong")}>
            <span className={cx("absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all", details ? "left-6" : "left-1")} />
          </span>
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DOES.map((d, i) => (
          <div key={d.title} className="rp-card rp-card-hover group relative flex flex-col overflow-hidden rounded-3xl p-6">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity group-hover:opacity-100" style={{ background: TONES[i] }} />
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: `${TONES[i]}14`, color: TONES[i] }}>
                <d.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-[13px] font-semibold tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-5 text-[19px] font-bold tracking-tight text-ink">{d.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted-ink">{d.plain}</p>
            <div className={cx("grid transition-all duration-300", details ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden">
                <p className="border-t border-line pt-4 text-[14px] leading-relaxed text-ink">{d.detail}</p>
                <p className="mt-3 inline-flex rounded-full bg-surface-2 px-2.5 py-1 text-[12px] font-semibold text-muted-ink">{d.plans}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Night and morning, one counter ───────────────────────── */

/** Drag between closing time and the next morning: the same counter, the work done. */
export function NightMorning() {
  const [pos, setPos] = useState(55);
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-line bg-[#0b1b2b] shadow-[0_30px_80px_-30px_rgba(11,27,43,0.5)]">
      <div className="relative aspect-[16/9] w-full select-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/photos/counter-morning.webp" alt="The same front counter the next morning, in sunlight" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/photos/counter-night.webp" alt="A front counter after closing, a phone lighting up" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -left-px w-0.5 bg-white/90" />
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[13px] font-bold text-ink shadow-lg">⇆</div>
        </div>
        <div className="absolute left-4 top-4 max-w-[46%] rounded-2xl bg-black/55 px-4 py-3 text-white backdrop-blur sm:left-6 sm:top-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#a594ff]">7:40 pm · closed</p>
          <p className="mt-1 text-[15px] font-semibold leading-snug sm:text-[17px]">The phone rings. You&apos;re already home.</p>
        </div>
        <div className="absolute bottom-4 right-4 max-w-[46%] rounded-2xl bg-white/90 px-4 py-3 text-ink backdrop-blur sm:bottom-6 sm:right-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5b4ee6]">8:00 am · next morning</p>
          <p className="mt-1 text-[15px] font-semibold leading-snug sm:text-[17px]">Answered, booked, confirmed. All waiting for you.</p>
        </div>
        <label className="absolute inset-0 cursor-ew-resize">
          <span className="sr-only">Drag between closing time and the next morning</span>
          <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="h-full w-full cursor-ew-resize opacity-0" />
        </label>
      </div>
    </div>
  );
}

/* ───────────────────────── Owners getting their time back ───────────────────────── */

const MOMENTS = [
  { src: "/photos/owner-court.webp", alt: "A business owner relaxing courtside, checking his phone", note: "Booked: Thu 4:00 pm", sub: "while you were on court" },
  { src: "/photos/owner-cafe.webp", alt: "A business owner smiling at her phone over coffee", note: "6 Instagram DMs answered", sub: "while you had coffee" },
  { src: "/photos/reception-night.webp", alt: "A reception desk after hours, a phone lit up on the counter", note: "Missed call? Never.", sub: "picked up at 9:12 pm" },
];

