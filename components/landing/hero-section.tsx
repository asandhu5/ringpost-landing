"use client";

import { useEffect, useState, useRef } from "react";
import { useIsMobileDevice, useParallax, useReducedMotion } from "@/hooks/use-motion";
import { VelocitySkew } from "@/components/landing/motion/scroll-primitives";

/* The verb cycles so the headline reads as a desk that is always
   doing something, rather than a static claim. */
const words = ["answering", "booking", "organizing", "replying", "following up"];

/* The third stat is the only place in the hero that signals this is more
   than an answering service. "Front desk" alone reads as an AI receptionist,
   which anchors a visitor against the $25–125/mo tools in that category —
   naming the three pillars here costs nothing and resets that early. */
const HERO_STATS = [
  { value: "24/7", label: "AI-powered customer support" },
  { value: "~90 sec", label: "Typical missed-call response" },
  { value: "1", label: "workspace for customers, conversations and bookings" },
];

/* ------------------------------------------------------------------ *
 *  BlurWord — letters resolve out of a colour blur, one after another,
 *  then settle to white. This is the hero's signature micro-moment.
 * ------------------------------------------------------------------ */
function BlurWord({ word, trigger }: { word: string; trigger: number }) {
  const letters = Array.from(word);
  const STAGGER = 45;
  const DURATION = 500;
  const GRADIENT_HOLD = STAGGER * letters.length + DURATION + 200;

  const reduced = useReducedMotion();
  const [letterStates, setLetterStates] = useState<{ opacity: number; blur: number }[]>(
    letters.map(() => ({ opacity: 0, blur: 20 }))
  );
  const [showGradient, setShowGradient] = useState(true);
  const framesRef = useRef<number[]>([]);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    framesRef.current.forEach(cancelAnimationFrame);
    timersRef.current.forEach(clearTimeout);
    framesRef.current = [];
    timersRef.current = [];

    if (reduced) {
      setLetterStates(letters.map(() => ({ opacity: 1, blur: 0 })));
      setShowGradient(false);
      return;
    }

    setLetterStates(letters.map(() => ({ opacity: 0, blur: 20 })));
    setShowGradient(true);

    letters.forEach((_, i) => {
      const t = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setLetterStates((prev) => {
            const next = [...prev];
            next[i] = { opacity: eased, blur: 20 * (1 - eased) };
            return next;
          });
          if (progress < 1) framesRef.current.push(requestAnimationFrame(tick));
        };
        framesRef.current.push(requestAnimationFrame(tick));
      }, i * STAGGER);
      timersRef.current.push(t);
    });

    const gt = setTimeout(() => setShowGradient(false), GRADIENT_HOLD);
    timersRef.current.push(gt);

    return () => {
      framesRef.current.forEach(cancelAnimationFrame);
      timersRef.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, reduced]);

  const gradientColors = ["var(--brand-pink)", "#a78bfa", "#67e8f9", "#fbbf24", "var(--brand-pink)"];

  const hex2rgb = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];

  return (
    <>
      {letters.map((char, i) => {
        const colorIndex =
          (i / Math.max(letters.length - 1, 1)) * (gradientColors.length - 1);
        const lower = Math.floor(colorIndex);
        const upper = Math.min(lower + 1, gradientColors.length - 1);
        const t = colorIndex - lower;

        const [r1, g1, b1] = hex2rgb(gradientColors[lower]);
        const [r2, g2, b2] = hex2rgb(gradientColors[upper]);
        const r = Math.round(r1 + (r2 - r1) * t);
        const g = Math.round(g1 + (g2 - g1) * t);
        const b = Math.round(b1 + (b2 - b1) * t);

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: letterStates[i]?.opacity ?? 0,
              filter: `blur(${letterStates[i]?.blur ?? 20}px)`,
              color: showGradient ? `rgb(${r},${g},${b})` : "white",
              transition: "color 0.4s ease",
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ *
 *  HeadlineLine — per-character rise-and-focus for the fixed part of
 *  the headline, so the whole line performs on first paint.
 * ------------------------------------------------------------------ */
function HeadlineLine({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (reduced) return <>{text}</>;

  return (
    <>
      {Array.from(text).map((char, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translate3d(0,0,0)" : "translate3d(0, 0.7em, 0)",
            filter: mounted ? "blur(0px)" : "blur(12px)",
            transition: `opacity 800ms cubic-bezier(0.16,1,0.3,1) ${
              baseDelay + i * 28
            }ms, transform 800ms cubic-bezier(0.16,1,0.3,1) ${
              baseDelay + i * 28
            }ms, filter 800ms cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 28}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const reduced = useReducedMotion();
  const [videoRef, videoOffset] = useParallax<HTMLDivElement>(0.22);
  const isMobile = useIsMobileDevice();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reduced]);

  return (
    <section
      id="top"
      className="relative z-10 min-h-[100svh] flex flex-col justify-center items-start overflow-hidden bg-[var(--surface-1)]"
    >
      {/* Background video — drifts slowly against the scroll */}
      <div ref={videoRef} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 scale-110"
          style={{ transform: `translate3d(0, ${videoOffset}px, 0) scale(1.1)` }}
        >
          {isMobile ? (
            <div
              aria-hidden="true"
              className="h-full w-full opacity-90"
              style={{
                background:
                  "radial-gradient(120% 90% at 78% 28%, rgba(236,168,214,0.30), transparent 62%), radial-gradient(100% 80% at 20% 78%, rgba(167,139,250,0.22), transparent 65%), var(--surface-1)",
              }}
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="w-full h-full object-cover object-center opacity-80"
            >
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bg-hero-0BnFGdr81Ifnj3WbBZoNt1KE4D5DMT.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.03_306)]/85 via-[oklch(0.12_0.03_306)]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0.03_306)]/35 via-transparent to-[var(--surface-1)]" />
      </div>

      {/* Structural grid — draws itself in on load */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white/[0.07] origin-left"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 1600ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white/[0.07] origin-top"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
              transform: isVisible ? "scaleY(1)" : "scaleY(0)",
              transition: `transform 1600ms cubic-bezier(0.16,1,0.3,1) ${i * 45}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        <div className="lg:max-w-[62%]">
          {/* Eyebrow */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-white/60">
              <span
                className="h-px bg-white/30 origin-left"
                style={{
                  width: 32,
                  transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 900ms cubic-bezier(0.16,1,0.3,1) 200ms",
                }}
              />
              AI front-desk software for local service businesses
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-left text-[clamp(2.4rem,6vw,7rem)] font-display leading-[0.92] tracking-tight text-white mb-12">
            <span className="block whitespace-nowrap">
              <HeadlineLine text="Your whole front office," baseDelay={250} />
            </span>
            <span className="block whitespace-nowrap">
              <HeadlineLine text="always " baseDelay={700} />
              <span className="relative inline-block">
                <BlurWord word={words[wordIndex]} trigger={wordIndex} />
              </span>
            </span>
          </h1>

          {/* Supporting line */}
          <p
            className={`max-w-xl text-lg lg:text-xl text-white/60 leading-relaxed transition-all duration-1000 delay-[1100ms] ${
              isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
            }`}
          >
            RingPost is an AI-powered front desk for local service businesses. It helps manage customer
            enquiries, conversations and appointments across the channels your business already uses,
            while keeping everything organized in one place.
          </p>
        </div>
      </div>

      {/* Stats rail */}
      <div
        className="absolute bottom-12 left-0 right-0"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-start gap-6 sm:gap-10 lg:gap-20">
          {HERO_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-6 blur-sm"
              }`}
              style={{ transitionDelay: `${1400 + i * 140}ms` }}
            >
              <span
                className="h-px bg-white/25 origin-left mb-1"
                style={{
                  width: 40,
                  transform: isVisible ? "scaleX(1)" : "scaleX(0)",
                  transition: `transform 900ms cubic-bezier(0.16,1,0.3,1) ${
                    1500 + i * 140
                  }ms`,
                }}
              />
              <span className="text-3xl lg:text-4xl font-display text-white">
                {stat.value}
              </span>
              <span className="text-xs text-white/50 leading-tight max-w-[16ch]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className={`absolute bottom-12 right-6 lg:right-12 hidden lg:flex flex-col items-center gap-3 transition-opacity duration-1000 delay-[2000ms] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-mono text-[10px] tracking-[0.25em] text-white/40 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="relative block h-14 w-px bg-white/15 overflow-hidden">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 block h-5 bg-[var(--brand-pink)]" />
        </span>
      </div>
    </section>
  );
}
