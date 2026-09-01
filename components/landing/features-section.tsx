"use client";

import { useEffect, useRef, useState } from "react";
import {
  Parallax,
  Reveal,
  Scramble,
  SplitText,
} from "@/components/landing/motion/primitives";
import {
  useInView,
  useIsMobileDevice,
  useReducedMotion,
} from "@/hooks/use-motion";
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

/* ------------------------------------------------------------------ *
 *  Merged in from the old separate "What's included" section.
 *
 *  Those two sections were saying the same thing twice: seven prose
 *  cards describing capabilities, then an itemised checklist of the
 *  same capabilities. The checklist survived because it does the job
 *  the prose couldn't — a sceptical owner deciding whether this is
 *  worth the money wants the count and the specifics, not adjectives.
 *  Anything the dropped prose covered is still made in full elsewhere:
 *  missed-call recovery has the live demo, marketing and reviews have
 *  their own sections and vertical scenarios.
 * ------------------------------------------------------------------ */
const groups = [
  {
    key: "answering",
    label: "Answering",
    headline: "Every conversation, picked up",
    items: [
      { name: "Phone calls", detail: "answered live, 24/7" },
      { name: "Text messages", detail: "replied to instantly" },
      { name: "WhatsApp", detail: "chats handled end to end" },
      { name: "Instagram DMs", detail: "answered in the inbox" },
      { name: "Facebook Messenger", detail: "answered in the inbox" },
      { name: "Email", detail: "read, answered, and routed" },
      { name: "Website chat", detail: "widget on your own site" },
      { name: "Missed-call text-back", detail: "within about 90 seconds" },
    ],
  },
  {
    key: "booking",
    label: "Booking & customers",
    headline: "Real appointments, real records",
    items: [
      { name: "Booking on any channel", detail: "call, text, DM, or email" },
      { name: "Google Calendar sync", detail: "written automatically" },
      { name: "No double-booking", detail: "slots checked before offering" },
      { name: "No manual entry", detail: "nothing to retype" },
      { name: "Customer records", detail: "built from every conversation" },
      { name: "Contact details", detail: "who they are, how to reach them" },
      { name: "Preferred channel", detail: "stored per customer" },
      { name: "Last visit", detail: "tracked automatically" },
      { name: "Searchable list", detail: "you never build it by hand" },
    ],
  },
  {
    key: "marketing",
    label: "Marketing",
    headline: "Content made, posted, and watched",
    items: [
      { name: "Promo images", detail: "generated on-brand" },
      { name: "Short videos", detail: "generated on-brand" },
      { name: "Seasonal offers", detail: "made for you" },
      { name: "Your logo composited", detail: "onto every asset" },
      { name: "Your pricing composited", detail: "onto every asset" },
      { name: "Instagram · Facebook · TikTok", detail: "published from one place" },
      { name: "YouTube · X · LinkedIn", detail: "published from one place" },
      { name: "Threads · Bluesky · Pinterest", detail: "published from one place" },
    ],
  },
  {
    key: "reviews",
    label: "Reviews & dashboard",
    headline: "Reputation handled, all in one view",
    items: [
      { name: "Reviews read", detail: "as they come in" },
      { name: "Replies drafted", detail: "for you to approve" },
      { name: "Pattern spotting", detail: "repeated complaints flagged" },
      { name: "One owner dashboard", detail: "every conversation" },
      { name: "Bookings in one place", detail: "nothing to cross-check" },
      { name: "Customers in one place", detail: "the whole list" },
      { name: "Content in one place", detail: "made and scheduled" },
      { name: "One login", detail: "not five different tools" },
    ],
  },
] as const;

/* A card that lights up radially from wherever the pointer sits. */
function GlowItem({
  name,
  detail,
  index,
}: {
  name: string;
  detail: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setPos(null)}
      className="group relative overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors duration-500 hover:border-[var(--brand-pink)]/40"
      style={{ transitionDelay: `${index * 12}ms` }}
    >
      {pos && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(190px circle at ${pos.x}px ${pos.y}px, rgba(236,168,214,0.16), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex items-start gap-3">
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-pink)]/50 transition-all duration-500 group-hover:scale-150 group-hover:bg-[var(--brand-pink)]" />
        <div>
          <span className="block text-sm font-medium leading-snug">{name}</span>
          <span className="mt-1 block text-xs leading-snug text-muted-foreground">
            {detail}
          </span>
        </div>
      </div>
    </div>
  );
}

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
  const [active, setActive] = useState(0);
  const group = groups[active];
  const total = groups.reduce((n, g) => n + g.items.length, 0);

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
                  Not a phone bot with add-ons. Every capability below runs on
                  the same system, the same customer records, and the same
                  dashboard — so a missed call never turns into a missed
                  customer.
                </p>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-4xl text-[var(--brand-pink)]">
                    {total}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">
                    things it does for you
                  </span>
                </div>
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

        {/* Everything itemised — group switcher */}
        <div className="mb-10 mt-4 grid gap-2 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={active === i}
              className={`group relative overflow-hidden border-t-2 px-1 pb-2 pt-4 text-left transition-all duration-500 ${
                active === i
                  ? "border-[var(--brand-pink)]"
                  : "border-foreground/15 hover:border-foreground/40"
              }`}
            >
              <span
                className={`block font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ${
                  active === i ? "text-[var(--brand-pink)]" : "text-muted-foreground"
                }`}
              >
                {g.label}
              </span>
              <span
                className={`mt-1.5 block text-lg transition-colors duration-500 ${
                  active === i ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {g.items.length} included
              </span>
            </button>
          ))}
        </div>

        {/* active group */}
        <div key={group.key} className="animate-bubble-in">
          <h3 className="mb-6 font-display text-2xl lg:text-3xl">
            {group.headline}
          </h3>

          <VelocitySkew strength={2}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((item, i) => (
                <GlowItem
                  key={item.name}
                  name={item.name}
                  detail={item.detail}
                  index={i}
                />
              ))}
            </div>
          </VelocitySkew>
        </div>

        <Reveal delay={200}>
          <p className="mt-10 border-t border-foreground/10 pt-6 font-mono text-sm text-muted-foreground">
            Set up on your business&apos;s own services, prices, hours, and
            policies — whatever kind of business you run.
          </p>
        </Reveal>

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
