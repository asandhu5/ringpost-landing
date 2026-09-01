"use client";

import { useEffect, useRef, useState } from "react";
import {
  Parallax,
  Reveal,
  Scramble,
  SplitText,
} from "@/components/landing/motion/primitives";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import { MaskReveal, VelocitySkew } from "@/components/landing/motion/scroll-primitives";

const steps = [
  {
    number: "01",
    title: "They reach out",
    subtitle: "any channel",
    description:
      "A customer calls, texts, DMs, messages, or emails you — on whichever channel they already prefer.",
  },
  {
    number: "02",
    title: "RingPost answers",
    subtitle: "instantly",
    description:
      "The AI responds right away using your real business information, then books, answers, or routes the request appropriately.",
  },
  {
    number: "03",
    title: "You see it all",
    subtitle: "one dashboard",
    description:
      "The conversation, the booking, and the customer all show up in one dashboard — with nothing to set up or manage day to day.",
  },
  {
    number: "04",
    title: "It grows your business",
    subtitle: "in the background",
    description:
      "Meanwhile RingPost is generating content, posting it, and watching your reviews — without you having to do any of it.",
  },
];

const STEP_MS = 6000;

export function HowItWorksSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  /* One rAF clock drives both the active step and its progress bar,
     so the bar can never drift out of sync with the highlight. */
  useEffect(() => {
    if (!inView || reduced) return;

    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = now - startRef.current;
      if (t >= STEP_MS) {
        startRef.current = now;
        setActiveStep((s) => (s + 1) % steps.length);
        setProgress(0);
      } else {
        setProgress(t / STEP_MS);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, reduced]);

  const selectStep = (index: number) => {
    setActiveStep(index);
    setProgress(0);
    startRef.current = performance.now();
  };

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative z-10 overflow-hidden bg-[var(--surface-3)] py-16 text-white sm:py-20 lg:py-32"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <div className="relative grid items-end gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="pb-0 lg:pb-32">
            <Reveal direction="right">
              <span className="mb-8 inline-flex items-center gap-3 font-mono text-sm text-white/40">
                <span className="h-px w-12 bg-white/20" />
                <Scramble text="How it works" />
              </span>
            </Reveal>

            <h2 className="font-display text-6xl leading-[0.85] tracking-tight md:text-7xl lg:text-[128px]">
              <SplitText text="They reach out." stagger={70} />
              <SplitText
                text="We answer."
                delay={220}
                stagger={70}
                className="text-white/30"
              />
              <SplitText
                text="You grow."
                delay={440}
                stagger={70}
                className="text-white/10"
              />
            </h2>
          </div>

          <div
            className={`relative h-[320px] overflow-hidden transition-opacity duration-1000 lg:h-[640px] ${
              inView ? "opacity-100" : "opacity-0"
            }`}
          >
            <MaskReveal direction="up" duration={1500} className="absolute inset-0">
            <Parallax speed={0.1} className="absolute inset-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tree-uAia6REvB137CQyHFCf0za3O6h2zKO.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom"
              />
            </Parallax>
            </MaskReveal>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--surface-3)] via-transparent to-transparent" />
          </div>
        </div>

        {/* Steps */}
        <VelocitySkew strength={2}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <Reveal key={step.number} delay={index * 90} distance={30}>
                <button
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-pressed={isActive}
                  className={`relative h-full w-full overflow-hidden border bg-[var(--surface-1)] p-8 text-left transition-all duration-500 lg:p-12 ${
                    isActive
                      ? "border-white/60"
                      : "border-white/25 hover:border-white/50"
                  }`}
                >
                  <div className="mb-8 flex items-center gap-4">
                    <span
                      className={`font-display text-4xl transition-colors duration-300 ${
                        isActive ? "text-[var(--brand-pink)]" : "text-white/20"
                      }`}
                    >
                      {step.number}
                    </span>
                    <div className="h-px flex-1 overflow-hidden bg-white/10">
                      <div
                        className="h-full bg-[var(--brand-pink)]/60"
                        style={{
                          width: isActive ? `${progress * 100}%` : "0%",
                          transition: reduced ? "none" : "width 90ms linear",
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="mb-2 font-display text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <span className="mb-6 block font-display text-xl text-white/40">
                    {step.subtitle}
                  </span>

                  <p
                    className={`leading-relaxed transition-opacity duration-500 ${
                      isActive ? "text-white/70 opacity-100" : "text-white/50 opacity-70"
                    }`}
                  >
                    {step.description}
                  </p>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 origin-left bg-[var(--brand-pink)] transition-transform duration-500 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </Reveal>
            );
          })}
        </div>
        </VelocitySkew>
      </div>
    </section>
  );
}
