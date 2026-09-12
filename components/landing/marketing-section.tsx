"use client";

import { useEffect, useRef, useState } from "react";
import {
  Marquee,
  Parallax,
  Reveal,
  Scramble,
  SplitText,
} from "@/components/landing/motion/primitives";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import {
  MaskReveal,
  ScrollLine,
} from "@/components/landing/motion/scroll-primitives";

/* The nine platforms named in the brief. Order is the brief's order. */
const PLATFORMS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "YouTube",
  "X",
  "LinkedIn",
  "Threads",
  "Bluesky",
  "Pinterest",
];

/* Three stages of the business-tools workflow. */
const STAGES = [
  {
    key: "followup",
    label: "Follow up",
    title: "Stay on top of customer follow-ups",
    body: "RingPost helps your team keep track of appointment reminders and customer follow-ups so important conversations don't get forgotten.",
  },
  {
    key: "content",
    label: "Content",
    title: "AI-assisted business content",
    body: "Create on-brand images, short videos and business content with AI, then review and schedule it from one workspace.",
  },
  {
    key: "reviews",
    label: "Reviews",
    title: "Reviews read and organized",
    body: "RingPost reads incoming reviews, drafts thoughtful replies for your approval, and flags repeated complaints so you can address the underlying issue.",
  },
] as const;

const STAGE_MS = 5200;

/* ------------------------------------------------------------------ *
 *  A business update being composed, then prepared for connected platforms
 *  platforms one by one. This is the section's proof, not decoration:
 *  it shows the nine-apps-into-one claim rather than asserting it.
 * ------------------------------------------------------------------ */
function PublishBoard({ stage }: { stage: number }) {
  const reduced = useReducedMotion();
  const [published, setPublished] = useState<number>(0);

  useEffect(() => {
    if (stage !== 1) {
      setPublished(reduced ? PLATFORMS.length : 0);
      return;
    }
    if (reduced) {
      setPublished(PLATFORMS.length);
      return;
    }

    setPublished(0);
    const timers = PLATFORMS.map((_, i) =>
      setTimeout(() => setPublished(i + 1), 260 + i * 240)
    );
    return () => timers.forEach(clearTimeout);
  }, [stage, reduced]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-foreground/12 bg-[var(--surface-1)]/80 backdrop-blur-sm">
      {/* header */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-3.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Business workspace
        </span>
        <span className="font-mono text-[11px] text-[var(--brand-pink)]">
          {stage === 0 ? "FOLLOWING UP" : stage === 1 ? "CREATING" : "MONITORING"}
        </span>
      </div>

      <div className="p-5 lg:p-7">
        {/* composed post preview */}
        <div
          className={`relative mb-6 overflow-hidden rounded-lg border border-foreground/12 transition-all duration-700 ${
            stage === 0 ? "opacity-100" : "opacity-70"
          }`}
        >
          <div className="relative h-40 bg-gradient-to-br from-[var(--brand-pink)]/25 via-[#a78bfa]/10 to-transparent lg:h-52">
            {/* the "generating" shimmer */}
            {stage === 0 && !reduced && (
              <span
                aria-hidden="true"
                className="animate-sheen absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent"
              />
            )}

            {/* composited brand marks — the brief's "logo and pricing" */}
            <div className="absolute left-5 top-5">
              <span className="font-display text-lg text-white/90">RingPost</span>
              <span className="ml-1 font-mono text-[9px] text-white/45">&trade;</span>
            </div>

            <div className="absolute bottom-5 left-5">
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                Your business
              </span>
              <span className="mt-1 block font-display text-2xl text-white lg:text-3xl">
                Business update
              </span>
            </div>

            <div className="absolute bottom-5 right-5 rounded-full border border-white/25 px-3 py-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                Your brand · your information
              </span>
            </div>
          </div>
        </div>

        {/* platform chips */}
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Supported channels
          </span>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {published}/{PLATFORMS.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {PLATFORMS.map((name, i) => {
            const done = i < published;
            return (
              <div
                key={name}
                className={`relative overflow-hidden rounded-md border px-3 py-2.5 transition-all duration-500 ${
                  done
                    ? "border-[var(--brand-pink)]/45 bg-[var(--brand-pink)]/[0.08]"
                    : "border-foreground/10 bg-foreground/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`truncate text-xs transition-colors duration-500 ${
                      done ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {name}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 ${
                      done ? "bg-[var(--brand-pink)]" : "bg-foreground/20"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* review monitoring strip */}
        <div
          className={`mt-6 rounded-lg border p-4 transition-all duration-700 ${
            stage === 2
              ? "border-[var(--brand-pink)]/35 bg-[var(--brand-pink)]/[0.05]"
              : "border-foreground/10 bg-transparent"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              {stage === 2 && (
                <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  stage === 2 ? "bg-[var(--brand-pink)]" : "bg-foreground/25"
                }`}
              />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Review watch
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Replies drafted for your approval, and repeated complaints flagged
            so you can fix the real problem.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MarketingSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!inView || reduced) return;
    timerRef.current = setInterval(
      () => setStage((s) => (s + 1) % STAGES.length),
      STAGE_MS
    );
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inView, reduced]);

  const active = STAGES[stage];

  return (
    <section id="marketing" ref={ref} className="relative z-10 overflow-hidden">
      {/* Header */}
      <div className="relative z-10 px-6 pt-20 text-center sm:pt-24 lg:px-12 lg:pt-40">
        <Reveal>
          <span className="mb-8 inline-flex items-center justify-center gap-4 font-mono text-sm text-muted-foreground">
            <span className="h-px w-12 bg-foreground/20" />
            <Scramble text="Business tools" />
            <span className="h-px w-12 bg-foreground/20" />
          </span>
        </Reveal>

        <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-[128px]">
          <SplitText text="Stay connected" stagger={70} />
          <SplitText
          text="without the busywork."
            delay={180}
            stagger={70}
            className="text-muted-foreground"
          />
        </h2>

        <Reveal delay={280}>
          <p className="mx-auto mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">
            RingPost helps your business stay connected with customers through
            customer follow-ups, appointment reminders, business content, and
            review management—all from one workspace.
          </p>
        </Reveal>
      </div>

      {/* Full-bleed image band */}
      <div
        className={`relative left-1/2 -mt-16 w-screen -translate-x-1/2 transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <MaskReveal direction="up" duration={1500}>
        <Parallax speed={0.08}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png"
            alt=""
            aria-hidden="true"
            className="h-auto w-full object-cover"
          />
        </Parallax>
        </MaskReveal>
      </div>

      {/* Stage copy + live board */}
      <div className="relative z-10 mx-auto mt-0 max-w-[1400px] px-6 lg:-mt-28 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          {/* stage rail */}
          <div className="lg:col-span-5">
            <div className="mb-8 flex gap-2">
              {STAGES.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStage(i)}
                  aria-pressed={stage === i}
                  className={`flex-1 border-t-2 pt-3 text-left transition-colors duration-500 ${
                    stage === i
                      ? "border-[var(--brand-pink)] text-foreground"
                      : "border-foreground/15 text-muted-foreground hover:border-foreground/40"
                  }`}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            <div key={active.key} className="animate-bubble-in">
              <h3 className="mb-4 font-display text-3xl leading-tight lg:text-4xl">
                {active.title}
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {active.body}
              </p>
            </div>

            <Reveal delay={200}>
              <div className="mt-10 border-t border-foreground/10 pt-6">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Connected business platforms
                </span>
                <p className="mt-2 text-muted-foreground">
                  Connect the business platforms and channels your team already uses. Review and approve AI-assisted content before it is published.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} distance={40} className="lg:col-span-7">
            <PublishBoard stage={stage} />
          </Reveal>
        </div>

        {/* platform marquee */}
        <div className="mt-20 border-y border-foreground/10 py-6">
          <Marquee speed={38}>
            {PLATFORMS.map((name) => (
              <span
                key={name}
                className="flex items-center gap-4 whitespace-nowrap px-8 font-display text-2xl text-muted-foreground lg:text-3xl"
              >
                {name}
                <span className="h-1 w-1 rounded-full bg-[var(--brand-pink)]/60" />
              </span>
            ))}
          </Marquee>
        </div>

        <ScrollLine className="mt-16" />
        <div className="pb-20 lg:pb-24" />
      </div>
    </section>
  );
}
