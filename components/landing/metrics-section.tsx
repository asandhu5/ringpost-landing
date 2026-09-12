"use client";

import { useEffect, useRef, useState } from "react";
import {
  CountUp,
  Marquee,
  Parallax,
  Reveal,
  SplitText,
} from "@/components/landing/motion/primitives";
import { useInView, useIsMobileDevice } from "@/hooks/use-motion";
import {
  ScrollScrub,
  VelocitySkew,
} from "@/components/landing/motion/scroll-primitives";

const metrics = [
  {
    value: 24,
    display: "24/7",
    label: "Always on the front desk",
    sublabel: "nights, weekends, and holidays",
  },
  {
    value: 90,
    suffix: "s",
    prefix: "~",
    label: "Missed-call text-back",
    sublabel: "so no lead goes cold",
  },
  {
    value: 7,
    suffix: "+",
    label: "Channels in one inbox",
    sublabel: "call, text, social, and email",
  },
];

const TICKER = [
  "Answers customer enquiries",
  "Books into your calendar",
  "Organizes conversations",
  "Helps with customer follow-ups",
  "Keeps reviews organized",
  "All from one dashboard",
];

/* ------------------------------------------------------------------ *
 *  GridBackground — a slow breathing dot lattice with a scan line.
 * ------------------------------------------------------------------ */
function GridBackground() {
  const isMobile = useIsMobileDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);

      const gridSize = 60;
      const time = timeRef.current;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 1 + wave * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.03 + wave * 0.03})`;
          ctx.fill();
        }
      }

      const pulseY = ((time * 30) % (height + 200)) - 100;
      const gradient = ctx.createLinearGradient(0, pulseY - 60, 0, pulseY + 60);
      gradient.addColorStop(0, "rgba(236,168,214,0)");
      gradient.addColorStop(0.5, "rgba(236,168,214,0.10)");
      gradient.addColorStop(1, "rgba(236,168,214,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, pulseY - 60, width, 120);

      if (!reduced) timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [isMobile]);

  if (isMobile) {
    // Same dot lattice, painted once by CSS instead of redrawn per frame.
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ------------------------------------------------------------------ *
 *  DotGraph — a small animated sparkline made of dots.
 * ------------------------------------------------------------------ */
function DotGraph({
  color = "white",
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  color?: "white" | "pink";
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const isMobile = useIsMobileDevice();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.offsetWidth || 300;
      canvas.width = W * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      return W;
    };

    let W = setup();
    const onResize = () => {
      W = setup();
    };
    window.addEventListener("resize", onResize);

    const render = () => {
      ctx.clearRect(0, 0, W, height);
      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw =
          baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = height - 4 - v * (height - 8);
        const x = i * 8 + 4;
        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);
        ctx.fillStyle =
          color === "pink"
            ? `rgba(236, 168, 214, ${alpha})`
            : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      if (!reduced) timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [color, height, freq1, freq2, freqT, speed, baseline, amplitude, isMobile]);

  if (isMobile) {
    return (
      <div
        aria-hidden="true"
        style={{
          height: `${height}px`,
          background: `repeating-linear-gradient(90deg, ${
            color === "pink" ? "rgba(236,168,214,0.45)" : "rgba(255,255,255,0.28)"
          } 0 3px, transparent 3px 8px)`,
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 78%, transparent)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: `${height}px`, display: "block" }}
    />
  );
}

export function MetricsSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-20 sm:py-24 lg:py-40">
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 grid gap-8 lg:mb-32 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-1">
            <Reveal>
              <div className="mb-6 flex items-center gap-4">
                <span className="flex items-center gap-2 bg-[var(--brand-pink)]/10 px-3 py-1 font-mono text-xs text-[var(--brand-pink)]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-pink)]" />
                  </span>
                  LIVE
                </span>
                <span className="font-mono text-sm text-muted-foreground tabular-nums">
                  {time ? `Front desk online · ${time.toLocaleTimeString("en-GB")}` : ""}
                </span>
              </div>
            </Reveal>

            <h2 className="font-display text-6xl leading-[0.95] tracking-tight md:text-7xl lg:text-[140px]">
              <SplitText text="Always" stagger={80} />
              <SplitText
                text="answering."
                delay={160}
                stagger={80}
                className="text-muted-foreground"
              />
            </h2>
          </div>
        </div>

        {/* Organic graph band */}
        <div
          className={`mb-0 w-full overflow-hidden transition-opacity duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          <ScrollScrub from={0.92} to={1.02} fade={false}>
          <Parallax speed={0.07}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png"
              alt=""
              aria-hidden="true"
              className="h-auto w-full object-cover"
            />
          </Parallax>
          </ScrollScrub>
        </div>

        {/* Metric cards */}
        <VelocitySkew strength={2.2}>
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal distance={40}>
            <div className="h-full border border-foreground/10 bg-foreground/[0.02] p-10 lg:p-14">
              <div className="mb-4 overflow-hidden whitespace-nowrap font-display text-4xl tracking-tight md:text-5xl lg:text-6xl">
                <CountUp end={24} duration={1800} />
                <span className="text-muted-foreground">/7</span>
              </div>
              <div className="mb-6">
                <DotGraph
                  color="white"
                  height={36}
                  freq1={0.28}
                  freq2={0.09}
                  freqT={0.5}
                  speed={0.018}
                  baseline={0.35}
                  amplitude={0.55}
                />
              </div>
              <div className="mb-2 text-lg text-foreground">{metrics[0].label}</div>
              <div className="font-mono text-sm text-muted-foreground">
                {metrics[0].sublabel}
              </div>
            </div>
          </Reveal>

          {metrics.slice(1).map((metric, index) => (
            <Reveal key={metric.label} delay={(index + 1) * 120} distance={40}>
              <div className="flex h-full flex-col items-start justify-between gap-6 border border-foreground/10 bg-foreground/[0.02] p-8">
                <div className="w-full">
                  <div className="mb-2 font-mono text-sm text-muted-foreground">
                    {metric.sublabel}
                  </div>
                  <div className="mb-3 text-base text-foreground">{metric.label}</div>
                  <DotGraph
                    color={index === 0 ? "pink" : "white"}
                    height={24}
                    freq1={index === 0 ? 0.45 : 0.22}
                    freq2={index === 0 ? 0.18 : 0.07}
                    freqT={index === 0 ? 1.1 : 0.4}
                    speed={index === 0 ? 0.032 : 0.015}
                    baseline={index === 0 ? 0.4 : 0.25}
                    amplitude={index === 0 ? 0.45 : 0.6}
                  />
                </div>
                <div className="w-full font-display text-3xl tracking-tight md:text-4xl lg:text-5xl">
                  <CountUp
                    end={metric.value}
                    prefix={metric.prefix ?? ""}
                    suffix={metric.suffix ?? ""}
                    duration={1800}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </VelocitySkew>

        {/* Ticker */}
        <div className="mt-16 border-t border-foreground/10 pt-8">
          <Marquee speed={44}>
            {TICKER.map((item) => (
              <span
                key={item}
                className="flex items-center gap-8 whitespace-nowrap px-8 font-mono text-sm text-muted-foreground"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-[var(--brand-pink)]/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
