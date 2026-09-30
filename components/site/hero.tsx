"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/use-motion";
import { PhoneMock } from "@/components/site/phone-mock";

/* The verb cycles so the headline reads as a desk that is always doing
   something (kept from the previous site, per the brief). */
const WORDS = ["answering", "booking", "organizing", "replying", "following up"];

/**
 * BlurWord — letters resolve out of a colour blur, one after another, then settle to
 * white. Ported from the old hero; the gradient moved from pink to the violet/cyan/coral
 * of the new palette.
 */
function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = Array.from(word);
  const STAGGER = 45;
  const DURATION = 500;
  const reduced = useReducedMotion();
  const [states, setStates] = useState(letters.map(() => ({ opacity: 0, blur: 16 })));
  const [tinted, setTinted] = useState(true);
  const frames = useRef<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    frames.current.forEach(cancelAnimationFrame);
    timers.current.forEach(clearTimeout);
    frames.current = [];
    timers.current = [];
    if (reduced) {
      setStates(letters.map(() => ({ opacity: 1, blur: 0 })));
      setTinted(false);
      return;
    }
    setStates(letters.map(() => ({ opacity: 0, blur: 16 })));
    setTinted(true);
    letters.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            const e = 1 - Math.pow(1 - p, 3);
            setStates((prev) => {
              const next = [...prev];
              next[i] = { opacity: e, blur: 16 * (1 - e) };
              return next;
            });
            if (p < 1) frames.current.push(requestAnimationFrame(tick));
          };
          frames.current.push(requestAnimationFrame(tick));
        }, i * STAGGER),
      );
    });
    timers.current.push(setTimeout(() => setTinted(false), STAGGER * letters.length + DURATION + 250));
    return () => {
      frames.current.forEach(cancelAnimationFrame);
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, reduced]);

  const stops = [
    [165, 148, 255],
    [124, 107, 255],
    [34, 211, 238],
    [255, 122, 89],
  ];
  return (
    <>
      {letters.map((ch, i) => {
        const pos = (i / Math.max(letters.length - 1, 1)) * (stops.length - 1);
        const lo = Math.floor(pos);
        const hi = Math.min(lo + 1, stops.length - 1);
        const t = pos - lo;
        const [r, g, b] = stops[lo].map((c, k) => Math.round(c + (stops[hi][k] - c) * t));
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: states[i]?.opacity ?? 0,
              filter: `blur(${states[i]?.blur ?? 16}px)`,
              color: tinted ? `rgb(${r},${g},${b})` : "#ffffff",
              transition: "color 0.45s ease",
            }}
          >
            {ch}
          </span>
        );
      })}
    </>
  );
}

export function RotatingVerb() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduced]);
  return (
    <span className="relative inline-block">
      <span className="sr-only">{WORDS.join(", ")}</span>
      <span aria-hidden>
        <BlurWord word={WORDS[i]} trigger={i} />
      </span>
    </span>
  );
}

export function HomeHero({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[620px] rounded-full bg-violet/25 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[420px] rounded-full bg-cta/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div className="animate-rise">
          <p className="mb-7 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-glow">
            <span aria-hidden className="h-px w-8 bg-glow/50" />
            The AI front desk for local businesses
          </p>
          <h1 className="font-display text-[clamp(2.9rem,7.4vw,6.4rem)] leading-[0.94] tracking-[-0.025em] text-ink">
            Your front desk,
            <br />
            always <RotatingVerb />
          </h1>
          {children}
        </div>
        <PhoneMock className="animate-rise [animation-delay:200ms]" />
      </div>
    </section>
  );
}
