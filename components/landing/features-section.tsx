"use client";

import { useEffect, useRef } from "react";
import {
  Parallax,
  Reveal,
  Scramble,
  SplitText,
  TiltCard,
} from "@/components/landing/motion/primitives";
import { useInView, useIsMobileDevice } from "@/hooks/use-motion";
import {
  MaskReveal,
  ScrollLine,
  ScrollScrub,
  VelocitySkew,
} from "@/components/landing/motion/scroll-primitives";

const heroFeature = {
  number: "01",
  title: "An AI receptionist on every channel",
  description:
    "RingPost answers phone calls, texts, WhatsApp, Instagram and Facebook messages, email, and website chat — instantly, 24/7. It's trained on your own services, prices, hours, and policies, and it never invents an answer: every price and time it gives is looked up from your real business data in the moment.",
  stat: { value: "24/7", label: "on every channel your customers use" },
};

const features = [
  {
    number: "02",
    title: "Missed-call recovery",
    description:
      "If a call goes unanswered, RingPost texts the customer back within about 90 seconds — turning a lost call into a real conversation instead of a customer who books somewhere else.",
  },
  {
    number: "03",
    title: "Real booking, on your calendar",
    description:
      "Customers book an appointment through any channel and it lands on your own Google Calendar automatically. No double-booking, no manual entry.",
  },
  {
    number: "04",
    title: "A customer list that builds itself",
    description:
      "Every conversation and booking adds to a searchable customer record — who they are, how to reach them, the channel they prefer, and when they last visited. You never build it by hand.",
  },
  {
    number: "05",
    title: "Marketing content, generated for you",
    description:
      "On-brand promo images and short videos are created automatically — a seasonal offer, a promo photo — with your own logo and pricing composited right in.",
  },
  {
    number: "06",
    title: "Publish everywhere that matters",
    description:
      "Post across Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Bluesky, and Pinterest from one place — instead of managing nine apps yourself.",
  },
  {
    number: "07",
    title: "Review & reputation management",
    description:
      "RingPost reads incoming reviews, drafts thoughtful replies for you to approve, and flags patterns worth knowing — like several recent reviews raising the same complaint — so you can fix real problems.",
  },
  {
    number: "08",
    title: "One simple dashboard",
    description:
      "Every conversation, booking, customer, and post lives in one owner dashboard. No separate logins for five different tools.",
  },
];

/* ------------------------------------------------------------------ *
 *  ParticleVisualization — a drifting field of message-dots behind
 *  the flagship card. Reacts to the pointer so the card feels live.
 * ------------------------------------------------------------------ */
function ParticleVisualization() {
  const isMobile = useIsMobileDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    // 70 particles on an uncapped rAF loop is a battery drain and a
    // scroll-jank source on phones. Static gradient stands in instead.
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const COUNT = 70;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seed = i * 1.618;
      return {
        bx: (seed * 127.1) % 1,
        by: (seed * 311.7) % 1,
        phase: seed * Math.PI * 2,
        speed: 0.4 + (seed % 0.4),
        radius: 1.2 + (seed % 2.2),
      };
    });

    let time = 0;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        const flowX = Math.sin(time * p.speed * 0.4 + p.phase) * 38;
        const flowY = Math.cos(time * p.speed * 0.3 + p.phase * 0.7) * 24;

        const bx = p.bx * w;
        const by = p.by * h;
        const dx = p.bx - mx;
        const dy = p.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist * 2.8);

        const x = bx + flowX + influence * Math.cos(time + p.phase) * 36;
        const y = by + flowY + influence * Math.sin(time + p.phase) * 36;

        const pulse = Math.sin(time * p.speed + p.phase) * 0.5 + 0.5;
        const alpha = 0.08 + pulse * 0.18 + influence * 0.3;

        ctx.beginPath();
        ctx.arc(x, y, p.radius + pulse * 0.8, 0, Math.PI * 2);
        ctx.fillStyle =
          influence > 0.25
            ? `rgba(236, 168, 214, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      if (!prefersReduced) time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 25% 30%, rgba(236,168,214,0.10), transparent 65%), radial-gradient(70% 60% at 80% 75%, rgba(167,139,250,0.09), transparent 65%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export function FeaturesSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      id="features"
      ref={ref}
      className="relative z-10 py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="relative mb-16 sm:mb-14 sm:mb-16 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
                  <span className="w-12 h-px bg-foreground/30" />
                  <Scramble text="What RingPost does" />
                </span>
              </Reveal>

              <h2 className="text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9]">
                <SplitText text="Your whole" stagger={80} />
                <SplitText
                  text="front desk."
                  delay={140}
                  stagger={80}
                  className="text-muted-foreground"
                />
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-4">
              <Reveal delay={260}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  RingPost answers your customers, books your appointments,
                  remembers everyone, and handles your marketing — so a missed
                  call never turns into a missed customer.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Flagship feature */}
        <ScrollScrub from={0.9} to={1} fade={false} className="mb-4 lg:mb-6">
          <div className="relative bg-[var(--surface-3)] border border-foreground/10 min-h-[500px] overflow-hidden group flex">
            <div className="relative flex-1 p-8 lg:p-12 bg-[var(--surface-3)]">
              <ParticleVisualization />
              <div className="relative z-10 pointer-events-none">
                <span className="font-mono text-sm text-white/50">
                  {heroFeature.number}
                </span>
                <h3 className="text-3xl lg:text-4xl font-display mt-4 mb-6 text-white transition-transform duration-500 group-hover:translate-x-2">
                  {heroFeature.title}
                </h3>
                <p className="text-lg text-white/60 leading-relaxed max-w-md mb-8">
                  {heroFeature.description}
                </p>
                <div>
                  <span className="text-5xl lg:text-6xl font-display text-white">
                    {heroFeature.stat.value}
                  </span>
                  <span className="block text-sm text-white/50 font-mono mt-2">
                    {heroFeature.stat.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden">
              <MaskReveal direction="left" duration={1400} className="absolute inset-0">
                <Parallax speed={0.12} className="absolute inset-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2812%29-ng3RrNnsPMJ5CrtOjcPTmhHg01W11q.png"
                  alt=""
                  aria-hidden="true"
                  className="h-[125%] w-full object-cover object-center scale-110"
                  style={{ transform: "scaleX(-1)" }}
                />
                </Parallax>
              </MaskReveal>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-3)] via-transparent to-transparent" />
            </div>
          </div>
        </ScrollScrub>

        {/* Capability grid */}
        <VelocitySkew strength={2}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {features.map((feature, index) => (
            <Reveal key={feature.number} delay={index * 70} distance={32}>
              <TiltCard max={4} className="h-full">
                <div className="group relative h-full overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-10 transition-colors duration-500 hover:border-foreground/30 hover:bg-foreground/[0.05]">
                  <span className="relative z-10 font-mono text-sm text-muted-foreground">
                    {feature.number}
                  </span>
                  <h3 className="relative z-10 mt-3 mb-4 font-display text-2xl transition-transform duration-500 group-hover:translate-x-1">
                    {feature.title}
                  </h3>
                  <p className="relative z-10 leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>

                  {/* sweep underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden bg-foreground/10">
                    <div className="h-full w-0 bg-gradient-to-r from-[var(--brand-pink)] to-foreground transition-all duration-700 group-hover:w-full" />
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}

          {/* trailing note keeps the 3-col grid balanced at 8 items */}
          <Reveal delay={features.length * 70} distance={32}>
            <div className="flex h-full flex-col justify-end border border-dashed border-foreground/15 p-8 lg:p-10">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                All eight, one system
              </span>
              <p className="mt-3 text-muted-foreground">
                None of this is a separate subscription. It&apos;s one front desk
                that answers, books, remembers, and markets.
              </p>
            </div>
          </Reveal>
          </div>
        </VelocitySkew>

        <ScrollLine className="mt-20" />
      </div>

      {/* ambient section glow */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-[var(--brand-pink)]/[0.05] blur-[130px] transition-opacity duration-[1600ms] ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
