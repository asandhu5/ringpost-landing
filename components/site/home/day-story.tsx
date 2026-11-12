"use client";

import { useEffect, useRef, useState } from "react";
import { FitBox } from "@/components/site/ui/fit-box";
import { DAY } from "@/lib/content/home";
import { CallScene, DmScene, InsightScene, NightScene, PostScene, ReviewScene } from "./day-scenes";

/**
 * "One day at your business": six moments from the first call to a midnight message.
 *
 * On a laptop the stage pins while the visitor scrolls: the heading is inside the stage,
 * the ring fills like a clock from 7 am to midnight, and each moment plays at its own
 * pace once it arrives (so the words are still while they are read). The whole stage is
 * sized from the screen's height, so it is fully visible at 1366 × 650.
 *
 * On a phone, with reduced motion, or without JavaScript, the same six moments are a
 * plain list, each complete.
 */

const SCENES = { call: CallScene, dm: DmScene, post: PostScene, review: ReviewScene, insight: InsightScene, night: NightScene };
const STEPS = DAY.moments;
const N = STEPS.length;
const PLAY_MS = 4200;
/** Scroll distance per moment, in screen heights. Six moments make a 100 + 6 × 36 = 316 vh track. */
const VH_PER_STEP = 36;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Runs 0 → 1 once over PLAY_MS when `on` turns true; back to `rest` when it turns false. */
function usePlay(on: boolean, rest: number) {
  const [p, setP] = useState(rest);
  useEffect(() => {
    if (!on) {
      setP(rest);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp((now - start) / PLAY_MS);
      setP(t);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, rest]);
  return p;
}

function Clock({ hour }: { hour: number }) {
  const r = 40;
  const len = 2 * Math.PI * r * 0.86;
  const progress = clamp((hour - 7) / 17);
  const h = Math.floor(hour) % 12 || 12;
  const m = Math.floor((hour % 1) * 60);
  return (
    <div className="relative h-[clamp(76px,14svh,104px)] w-[clamp(76px,14svh,104px)] shrink-0" aria-hidden>
      <svg viewBox="0 0 100 100" className="h-full w-full rotate-[115deg]">
        <defs>
          <linearGradient id="day-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b4ee6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--rp-border)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${len} 999`} />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#day-ring)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${len * progress} 999`} style={{ transition: "stroke-dasharray 0.8s var(--ease-out)" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display text-[clamp(17px,3.2svh,23px)] tabular-nums text-ink">
          {h}:{String(m).padStart(2, "0")}
        </span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-ink">{hour >= 12 ? "pm" : "am"}</span>
      </div>
    </div>
  );
}

function PinnedScene({ id, active }: { id: keyof typeof SCENES; active: boolean }) {
  const p = usePlay(active, 0);
  const Scene = SCENES[id];
  return (
    <div className="absolute inset-0 transition-[opacity,transform] duration-500" style={{ opacity: active ? 1 : 0, transform: `scale(${active ? 1 : 0.97})`, pointerEvents: active ? "auto" : "none" }} aria-hidden={!active}>
      <FitBox className="h-full w-full">
        <div className="px-10 py-8">
          <Scene p={p} />
        </div>
      </FitBox>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setProgress(clamp(-r.top / Math.max(1, r.height - window.innerHeight)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const pos = progress * N;
  const active = Math.min(N - 1, Math.floor(pos));
  const local = clamp(pos - active);
  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.05) / N) * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <div ref={ref} style={{ height: `calc(100svh + ${N * VH_PER_STEP}vh)` }} className="relative">
      <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] items-center">
        <div className="mx-auto grid h-[calc(100%-24px)] max-h-[720px] w-full max-w-[1240px] grid-cols-[0.9fr_1.1fr] items-center gap-10 px-10">
          <div>
            <h2 className="font-display text-h2 text-ink">{DAY.title}</h2>
            <div className="mt-[clamp(1rem,3.5svh,2rem)] flex items-center gap-5">
              <Clock hour={STEPS[active].hour} />
              <p className="text-small font-semibold text-muted-ink">
                Moment {active + 1} of {N}
              </p>
            </div>
            <div className="relative mt-[clamp(0.9rem,3svh,1.75rem)] h-[clamp(150px,27svh,190px)]">
              {STEPS.map((s, i) => (
                <div key={s.id} className="absolute inset-0 transition-[opacity,transform] duration-500" style={{ opacity: i === active ? 1 : 0, transform: `translateY(${i === active ? 0 : i < active ? -16 : 16}px)` }} aria-hidden={i !== active}>
                  <p className="text-small font-semibold text-violet">{s.time}</p>
                  <h3 className="mt-1.5 font-display text-[clamp(1.5rem,min(2.6vw,4.6svh),2.25rem)] leading-[1.05] tracking-[-0.035em] text-ink">{s.title}</h3>
                  <p className="mt-2.5 max-w-[26rem] text-body text-muted-ink">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-[clamp(1.25rem,4svh,2.25rem)] flex max-w-[26rem] gap-2" role="tablist" aria-label="Moments of the day">
              {STEPS.map((s, i) => (
                <button key={s.id} type="button" role="tab" aria-selected={i === active} aria-label={`${s.time}: ${s.title}`} onClick={() => jump(i)} className="group flex h-6 flex-1 items-center">
                  <span className="block h-1.5 w-full overflow-hidden rounded-full bg-line transition-colors group-hover:bg-line-strong">
                    <span className="block h-full rounded-full bg-violet" style={{ width: `${i < active ? 100 : i === active ? Math.max(8, local * 100) : 0}%` }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-full">
            <div aria-hidden className="absolute inset-0 overflow-hidden rounded-rp-lg bg-[linear-gradient(150deg,#f1eeff_0%,#f7f8fa_45%,#e7fbff_100%)]">
              <div className="absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full border-[52px] border-white/70" />
            </div>
            {STEPS.map((s, i) => (
              <PinnedScene key={s.id} id={s.id} active={i === active} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StackedStep({ step, motion }: { step: (typeof STEPS)[number]; motion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!motion || !el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motion]);
  // Complete until scripts say motion is welcome; then it plays once as it comes into view.
  const p = usePlay(motion && seen, motion ? 0 : 1);
  const Scene = SCENES[step.id];
  return (
    <li className="py-8">
      <p className="text-small font-semibold text-violet">{step.time}</p>
      <h3 className="mt-1.5 font-display text-[1.6rem] leading-[1.06] tracking-[-0.035em] text-ink">{step.title}</h3>
      <p className="mt-2.5 text-body text-muted-ink">{step.body}</p>
      <div ref={ref} className="mt-6">
        <Scene p={p} />
      </div>
    </li>
  );
}

export function DayStory() {
  const [mode, setMode] = useState<"plain" | "stacked" | "pinned">("plain");
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px) and (min-height: 560px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMode(reduce.matches ? "plain" : wide.matches ? "pinned" : "stacked");
    set();
    wide.addEventListener("change", set);
    reduce.addEventListener("change", set);
    return () => {
      wide.removeEventListener("change", set);
      reduce.removeEventListener("change", set);
    };
  }, []);

  return (
    <section id="see-it-work" className="relative scroll-mt-[var(--header-h)]">
      {mode === "pinned" ? (
        <Pinned />
      ) : (
        <div className="mx-auto max-w-[640px] px-4 py-[var(--section-y)] sm:px-6">
          <h2 className="font-display text-h2 text-ink">{DAY.title}</h2>
          <ol className="mt-2 divide-y divide-line">
            {STEPS.map((s) => (
              <StackedStep key={s.id} step={s} motion={mode === "stacked"} />
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
