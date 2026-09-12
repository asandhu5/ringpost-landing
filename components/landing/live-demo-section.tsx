"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, Scramble, SplitText } from "@/components/landing/motion/primitives";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import {
  MaskReveal,
  ScrollCharStagger,
} from "@/components/landing/motion/scroll-primitives";

/* ==================================================================
 *  THE 90-SECOND SAVE
 *  The one thing worth demonstrating rather than describing: a call
 *  nobody picked up turning into a booking on the calendar. Every
 *  beat below maps to a capability in the product — the missed-call
 *  text-back, the live price lookup, the real calendar write.
 * ================================================================== */

type Beat = {
  /** ms after the sequence starts */
  at: number;
  kind: "event" | "them" | "us" | "system";
  text: string;
  meta?: string;
};

const BEATS: Beat[] = [
  { at: 0, kind: "event", text: "Incoming call, 7:42 pm", meta: "You're with a customer. It rings out." },
  { at: 1500, kind: "system", text: "Missed call detected", meta: "RingPost takes over" },
  { at: 3200, kind: "us", text: "Hi, sorry we missed you just now. This is the front desk. Can I help you book something in?" },
  { at: 6200, kind: "them", text: "hi! do you have anything free this saturday?" },
  { at: 9000, kind: "system", text: "Reading your calendar and price list", meta: "live lookup" },
  { at: 11200, kind: "us", text: "We do. Saturday 11:30 am or 3:00 pm is open, and it usually takes about two hours." },
  { at: 14500, kind: "them", text: "11:30 works" },
  { at: 16800, kind: "us", text: "Booked you in for Saturday 11:30 am. You'll get a reminder the day before." },
  { at: 19000, kind: "event", text: "Added to Google Calendar", meta: "Sat · 11:30 am · new booking" },
];

const TOTAL = 22000;

function Bubble({ beat, index }: { beat: Beat; index: number }) {
  const isUs = beat.kind === "us";
  const isThem = beat.kind === "them";
  const isSystem = beat.kind === "system";
  const isEvent = beat.kind === "event";

  if (isSystem) {
    return (
      <div
        className="animate-bubble-in flex items-center gap-3 py-1"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--brand-pink)]/80">
          {beat.text}
        </span>
        {beat.meta && (
          <span className="font-mono text-[11px] text-white/25">· {beat.meta}</span>
        )}
      </div>
    );
  }

  if (isEvent) {
    return (
      <div
        className="animate-bubble-in rounded-lg border border-white/12 bg-white/[0.03] px-4 py-3"
        style={{ animationDelay: `${index * 40}ms` }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
          {beat.text}
        </div>
        {beat.meta && (
          <div className="mt-1 text-sm text-white/70">{beat.meta}</div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`animate-bubble-in flex ${isUs ? "justify-end" : "justify-start"}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUs
            ? "rounded-br-sm bg-[var(--brand-pink)] text-black"
            : "rounded-bl-sm bg-white/[0.07] text-white/85 border border-white/10"
        }`}
      >
        {isThem && (
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            Customer
          </span>
        )}
        {isUs && (
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-black/45">
            RingPost
          </span>
        )}
        {beat.text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-1 rounded-2xl rounded-br-sm bg-[var(--brand-pink)]/20 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-typing-dot block h-1.5 w-1.5 rounded-full bg-[var(--brand-pink)]"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function LiveDemoSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });
  const reduced = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [cycle, setCycle] = useState(0);
  const rafRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  /* Drive the transcript off a single clock so every beat stays in
     sync, and loop it so a visitor who lingers sees it again. */
  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setElapsed(TOTAL);
      return;
    }

    const start = performance.now();
    const tick = (now: number) => {
      const t = now - start;
      if (t >= TOTAL) {
        setElapsed(0);
        setCycle((c) => c + 1);
        return;
      }
      setElapsed(t);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, reduced, cycle]);

  const shown = BEATS.filter((b) => elapsed >= b.at);
  const next = BEATS.find((b) => elapsed < b.at);
  const isTyping =
    !reduced && next?.kind === "us" && elapsed > next.at - 1400 && elapsed < next.at;

  /* Keep the newest message in view inside the scroll area. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || reduced) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown.length, reduced]);

  /* Seconds-since-missed-call readout, capped at 90. */
  const secondsSinceMiss = Math.min(
    90,
    Math.max(0, Math.round(((elapsed - 1500) / (TOTAL - 1500)) * 90))
  );
  const booked = elapsed >= BEATS[BEATS.length - 1].at;

  return (
    <section
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--surface-2)] py-24 lg:py-32"
    >
      {/* faint dotted field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <span className="mb-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
                <span className="h-px w-12 bg-foreground/25" />
                <Scramble text="The 90-second save" />
              </span>
            </Reveal>

            <h2 className="mb-8 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl">
              <SplitText text={["A missed call", "is not a lost", "customer."]} stagger={70} />
            </h2>

            <ScrollCharStagger
              className="mb-10 max-w-md text-lg leading-relaxed"
              text="This is the part owners feel first. The phone rings while you're working, nobody can reach it, and the caller moves on to the next name on the list. RingPost gets back to them before that happens, and finishes the booking."
            />

            <div className="space-y-5">
              {[
                { k: "Answers", v: "on the channel they already used" },
                { k: "Quotes", v: "from your real prices and open slots" },
                { k: "Books", v: "straight onto your Google Calendar" },
              ].map((row, i) => (
                <Reveal key={row.k} delay={340 + i * 110}>
                  <div className="flex items-baseline gap-5 border-t border-foreground/10 pt-4">
                    <span className="w-20 shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-[var(--brand-pink)]">
                      {row.k}
                    </span>
                    <span className="text-muted-foreground">{row.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Transcript */}
          <MaskReveal direction="up" duration={1300} className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-[var(--surface-1)]/85 backdrop-blur-sm">
              {/* device chrome */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-pink)]" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                    Front desk · live
                  </span>
                </div>

                <span
                  className={`font-mono text-[11px] tabular-nums transition-colors duration-500 ${
                    booked ? "text-[var(--brand-pink)]" : "text-white/40"
                  }`}
                >
                  {booked ? "BOOKED" : `+${secondsSinceMiss}s`}
                </span>
              </div>

              {/* countdown rail */}
              <div className="h-px w-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[var(--brand-violet)] to-[var(--brand-pink)]"
                  style={{
                    width: `${Math.min((elapsed / TOTAL) * 100, 100)}%`,
                    transition: reduced ? "none" : "width 120ms linear",
                  }}
                />
              </div>

              {/* transcript body */}
              <div
                ref={scrollRef}
                className="flex h-[440px] flex-col gap-3.5 overflow-y-auto p-5 lg:h-[500px] lg:p-7"
              >
                {shown.map((beat, i) => (
                  <Bubble key={`${cycle}-${beat.at}`} beat={beat} index={i} />
                ))}
                {isTyping && <TypingDots />}
              </div>

              {/* footer note */}
              <div className="border-t border-white/10 px-5 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                  Illustration of the missed-call flow · not a recorded customer
                </span>
              </div>
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}
