"use client";

/**
 * The home page's moving parts use a light theme to match the dashboard.
 * Everything shown is something the product really does; the business in the demos is a
 * salon, no invented customers, ratings or results.
 */

import { useEffect, useState } from "react";
import { CalendarCheck, Check, MessageCircle } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";

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
    <div className="relative" aria-label="An evening at a local business using RingPost" role="img">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-[#f0eeff] via-white to-[#e6fbfe] blur-2xl" aria-hidden />
      <div className="rounded-[28px] border border-line bg-white p-4 shadow-[0_30px_80px_-30px_rgba(11,27,43,0.35)] sm:p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="rp-live-dot h-2.5 w-2.5 rounded-full bg-[#16a34a]" />
            <span className="text-[13px] font-semibold text-ink">Live · your front desk</span>
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
            <p className={cx("rp-step max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2 text-ink", on(1))}>Do you have anything Saturday morning?</p>
            <p className={cx("rp-step max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#0b1b2b] px-3 py-2 text-white", on(2))}>Yes, 10:30 is free. Shall I book you in?</p>
            <p className={cx("rp-step max-w-[85%] self-start rounded-2xl rounded-bl-md bg-surface-2 px-3 py-2 text-ink", on(3))}>Yes please!</p>
          </div>
        </div>

        {/* The booking */}
        <div className={cx("rp-step mt-3 flex items-center gap-3 rounded-2xl border border-[#ddd8ff] bg-[#f7f6ff] px-4 py-3", on(4))}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#5b4ee6] shadow-sm">
            <CalendarCheck className="h-[18px] w-[18px]" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-ink">Booked: Saturday 10:30</p>
            <p className="text-[12.5px] text-muted-ink">In your calendar. Confirmation texted.</p>
          </div>
        </div>

        {/* Other channels, at the same time */}
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <div className={cx("rp-step flex items-center gap-2.5 rounded-xl border border-line px-3 py-2.5", on(5))}>
            <ChannelLogo id="whatsapp" size={24} />
            <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">How much is a first visit?</span>
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
            <p className="truncate text-[13px] font-semibold text-ink">“Weekend offer” post made for you</p>
            <p className="text-[12px] text-muted-ink">Posting to Instagram, Facebook and TikTok at 12:00</p>
          </div>
        </div>
        <div className={cx("rp-step mt-2.5 flex items-center gap-2.5 rounded-xl bg-surface-2 px-3 py-2.5", on(8))}>
          <MessageCircle className="h-4 w-4 shrink-0 text-[#5b4ee6]" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[12.5px] text-ink">
            <strong className="font-semibold">@mia:</strong> this looks great! · <span className="text-muted-ink">reply drafted for you</span>
          </span>
        </div>
      </div>
    </div>
  );
}
