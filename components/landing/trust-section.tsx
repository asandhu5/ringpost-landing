"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Database, MessageSquareQuote, UserCheck } from "lucide-react";
import {
  Reveal,
  Scramble,
  SplitText,
  TiltCard,
} from "@/components/landing/motion/primitives";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import {
  ScrollCharStagger,
  ScrollLine,
} from "@/components/landing/motion/scroll-primitives";

/* Every claim below is a restatement of something the product does,
   not a performance statistic. No certifications, no incident counts,
   no numbers we cannot stand behind. */
const trustPoints = [
  {
    icon: Database,
    title: "Answers from your real data",
    description:
      "Prices, hours, services, and policies are read from your own business information at the moment the question is asked. Nothing is guessed.",
  },
  {
    icon: CalendarCheck,
    title: "Bookings land on your real calendar",
    description:
      "Appointments write straight to your Google Calendar, so a slot a customer is offered is a slot that's actually free. No double-booking, no manual entry.",
  },
  {
    icon: MessageSquareQuote,
    title: "You approve every review reply",
    description:
      "RingPost drafts responses to incoming reviews. Nothing is posted in your name until you've read it and said yes.",
  },
  {
    icon: UserCheck,
    title: "Trained on your business",
    description:
      "It's set up on your own services, prices, hours, and policies — so it answers the way your front desk would, not the way a generic chatbot would.",
  },
];

const properties = [
  "Live lookups",
  "Your calendar",
  "Your prices",
  "Owner approval",
];

/* ------------------------------------------------------------------ *
 *  LookupDiagram — question in, real data consulted, answer out.
 *  The stroke draws on a loop so the "checks before it speaks"
 *  behaviour is something you watch rather than read.
 * ------------------------------------------------------------------ */
function LookupDiagram({ step }: { step: number }) {
  const stages = [
    { label: "Customer asks", sub: "“What do you charge, and when are you free?”" },
    { label: "RingPost looks it up", sub: "your live price list and calendar" },
    { label: "RingPost answers", sub: "your real rate, your real opening" },
  ];

  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 120"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            .lookup-path {
              fill: none;
              stroke: var(--brand-pink);
              stroke-width: 1.5;
              stroke-dasharray: 160;
              stroke-dashoffset: 160;
              animation: ringpost-draw 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
            }
            @media (prefers-reduced-motion: reduce) {
              .lookup-path { animation: none; stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>

        {/* rails */}
        <line x1="60" y1="60" x2="200" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.12" />
        <line x1="200" y1="60" x2="340" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.12" />

        {step >= 1 && (
          <line key={`a-${step}`} className="lookup-path" x1="60" y1="60" x2="200" y2="60" />
        )}
        {step >= 2 && (
          <line
            key={`b-${step}`}
            className="lookup-path"
            x1="200"
            y1="60"
            x2="340"
            y2="60"
            style={{ animationDelay: "0.1s" }}
          />
        )}

        {[60, 200, 340].map((cx, i) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy="60"
              r={step === i ? 8 : 5}
              fill={step >= i ? "var(--brand-pink)" : "currentColor"}
              opacity={step >= i ? 0.95 : 0.2}
              style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            />
            {step === i && (
              <circle
                cx={cx}
                cy="60"
                r="16"
                fill="none"
                stroke="var(--brand-pink)"
                strokeWidth="1"
                opacity="0.35"
              />
            )}
          </g>
        ))}
      </svg>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {stages.map((s, i) => (
          <div
            key={s.label}
            className={`transition-all duration-500 ${
              step === i ? "opacity-100" : "opacity-40"
            }`}
          >
            <span
              className={`block font-mono text-[10px] uppercase tracking-[0.16em] ${
                step === i ? "text-[var(--brand-pink)]" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            <span className="mt-1.5 block text-sm leading-snug text-muted-foreground">
              {s.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrustSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.15 });
  const reduced = useReducedMotion();
  const [activeFeature, setActiveFeature] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const interval = setInterval(
      () => setActiveFeature((prev) => (prev + 1) % trustPoints.length),
      3400
    );
    return () => clearInterval(interval);
  }, [inView, reduced]);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(2);
      return;
    }
    const interval = setInterval(() => setStep((s) => (s + 1) % 3), 1900);
    return () => clearInterval(interval);
  }, [inView, reduced]);

  return (
    <section id="trust" ref={ref} className="relative z-10 overflow-hidden py-20 sm:py-24 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-muted-foreground">
              <span className="h-px w-12 bg-foreground/20" />
              <Scramble text="Trust" />
            </span>
          </Reveal>

          <h2 className="mb-12 font-display text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-[128px]">
            <SplitText text="It never" stagger={80} />
            <SplitText
              text="makes it up."
              delay={160}
              stagger={80}
              className="text-muted-foreground"
            />
          </h2>

          <ScrollCharStagger
            className="max-w-2xl text-xl leading-relaxed"
            text="The fastest way to lose a customer is to quote someone a price you don't charge or a time you can't honour. RingPost only says what's true about your business — every answer is read from your own data at the moment it replies."
          />
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: the lookup proof */}
          <Reveal distance={40} className="lg:col-span-7">
            <div className="relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-12">
              <div>
                <span className="font-mono text-sm text-muted-foreground">
                  Every answer, checked first
                </span>
                <div className="mt-8">
                  <span className="font-display text-7xl leading-none lg:text-8xl">0</span>
                  <span className="mt-2 block text-muted-foreground">
                    prices or times invented on the spot
                  </span>
                </div>
              </div>

              <div className="mt-10 max-w-xl">
                <LookupDiagram step={step} />
              </div>

              {/* property chips — real product properties, not certifications */}
              <div className="mt-10 flex flex-wrap gap-2">
                {properties.map((prop, index) => (
                  <span
                    key={prop}
                    className={`border border-foreground/10 px-3 py-1 font-mono text-xs text-muted-foreground transition-all duration-500 ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  >
                    {prop}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: trust points */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {trustPoints.map((point, index) => {
              const isActive = activeFeature === index;
              return (
                <Reveal key={point.title} delay={index * 90} direction="left" distance={30}>
                  <TiltCard max={3} glow={false}>
                    <div
                      onMouseEnter={() => setActiveFeature(index)}
                      className={`cursor-default border p-6 transition-all duration-500 ${
                        isActive
                          ? "border-foreground/30 bg-foreground/[0.05]"
                          : "border-foreground/10"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-500 ${
                            isActive
                              ? "border-[var(--brand-pink)] bg-[var(--brand-pink)] text-black"
                              : "border-foreground/20 text-muted-foreground"
                          }`}
                        >
                          <point.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-1.5 font-medium">{point.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
