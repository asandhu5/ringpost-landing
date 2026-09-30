"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/use-motion";

/* ==================================================================
 *  THE 90-SECOND SAVE — ported from the old live-demo section.
 *  A call nobody picked up turning into a booking. Every beat maps
 *  to something the product does: the missed-call text-back, the
 *  live lookup, the booking made by a tool, the calendar mirror, the
 *  reminder 24 hours before (REMINDER_LEAD_MINUTES default).
 * ================================================================== */

type Beat = { at: number; kind: "event" | "them" | "us" | "system"; text: string; meta?: string };

const BEATS: Beat[] = [
  { at: 0, kind: "event", text: "Missed call · 7:42 pm", meta: "You're with a customer. It rings out." },
  { at: 1500, kind: "system", text: "Text sent from your number" },
  { at: 2600, kind: "us", text: "Hi, sorry we missed your call just now. This is the front desk. Can I help you book something?" },
  { at: 5600, kind: "them", text: "hi! anything free this saturday?" },
  { at: 7800, kind: "system", text: "Checking your calendar and services" },
  { at: 9800, kind: "us", text: "We do. Saturday 11:30 am or 3:00 pm is open. Which suits you?" },
  { at: 12600, kind: "them", text: "11:30 works" },
  { at: 14400, kind: "system", text: "Booking made" },
  { at: 15600, kind: "us", text: "You're booked for Saturday at 11:30 am. You'll get a reminder the day before." },
  { at: 17800, kind: "event", text: "On your Google Calendar", meta: "Sat · 11:30 am · new booking" },
];
const TOTAL = 21500;

export function PhoneMock({ className }: { className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25, once: false });
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [cycle, setCycle] = useState(0);
  const raf = useRef(0);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) {
      setElapsed(TOTAL);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      if (t >= TOTAL) {
        setElapsed(0);
        setCycle((c) => c + 1);
        return;
      }
      setElapsed(t);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, reduced, cycle]);

  const shown = BEATS.filter((b) => elapsed >= b.at);
  const next = BEATS.find((b) => elapsed < b.at);
  const typing = !reduced && next?.kind === "us" && elapsed > next.at - 1200;
  const booked = elapsed >= BEATS[BEATS.length - 1].at;

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [shown.length, reduced]);

  return (
    <div ref={ref} className={className}>
      <div className="relative mx-auto w-full max-w-[340px]">
        <div aria-hidden className="pointer-events-none absolute -inset-10 rounded-[60px] bg-violet/25 blur-3xl" />
        <div className="relative rounded-[46px] border border-white/15 bg-[#0d0d14] p-2.5 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
          <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-base">
            {/* status bar + notch */}
            <div className="relative flex h-10 items-center justify-between px-7 pt-1 font-mono text-[11px] text-white/70">
              <span>7:43</span>
              <span aria-hidden className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
              <span className="flex items-center gap-1">
                <span className="h-2 w-3 rounded-[2px] border border-white/60" />
              </span>
            </div>
            {/* thread header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 pb-3 pt-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet/25 text-[12px] font-semibold text-glow">FD</span>
                <div>
                  <p className="text-[13px] font-medium text-ink">Front desk</p>
                  <p className="text-[10.5px] text-muted-ink">Text message</p>
                </div>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-[0.14em] ${booked ? "text-success" : "text-faint"}`}>{booked ? "Booked" : "Live"}</span>
            </div>
            {/* transcript */}
            <div ref={scroller} className="rp-no-scrollbar flex h-[430px] flex-col gap-2.5 overflow-y-auto px-4 py-4" aria-live="off">
              {shown.map((b) => (
                <Bubble key={`${cycle}-${b.at}`} beat={b} />
              ))}
              {typing && (
                <div className="flex justify-end">
                  <div className="flex gap-1 rounded-2xl rounded-br-md bg-violet/25 px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="animate-typing-dot block h-1.5 w-1.5 rounded-full bg-glow" style={{ animationDelay: `${i * 140}ms` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 px-5 py-3 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">Illustration · not a recorded customer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ beat }: { beat: Beat }) {
  if (beat.kind === "system") {
    return (
      <p className="animate-bubble-in flex items-center justify-center gap-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-glow/85">
        <span className="h-1 w-1 rounded-full bg-glow" />
        {beat.text}
      </p>
    );
  }
  if (beat.kind === "event") {
    return (
      <div className="animate-bubble-in rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-ink">{beat.text}</p>
        {beat.meta && <p className="mt-0.5 text-[12.5px] text-ink/85">{beat.meta}</p>}
      </div>
    );
  }
  const us = beat.kind === "us";
  return (
    <div className={`animate-bubble-in flex ${us ? "justify-end" : "justify-start"}`}>
      <p className={`max-w-[84%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug ${us ? "rounded-br-md bg-violet text-white" : "rounded-bl-md bg-white/[0.08] text-ink"}`}>{beat.text}</p>
    </div>
  );
}
