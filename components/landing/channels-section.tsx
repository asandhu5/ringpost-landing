"use client";

import { useEffect, useState } from "react";
import {
  CountUp,
  Reveal,
  Scramble,
  SplitText,
} from "@/components/landing/motion/primitives";
import { useInView, useReducedMotion } from "@/hooks/use-motion";
import {
  MaskReveal,
  ScrollLine,
} from "@/components/landing/motion/scroll-primitives";

const channels = [
  { name: "Phone & SMS", detail: "answered + texted back" },
  { name: "WhatsApp", detail: "chats handled live" },
  { name: "Instagram & Facebook", detail: "DMs + Messenger" },
  { name: "Email & Web chat", detail: "inbox + site widget" },
];

/* ------------------------------------------------------------------ *
 *  ChannelGraph — every conversation converging on one inbox. The
 *  lines draw from the outer nodes toward a single point, on a loop.
 * ------------------------------------------------------------------ */
function ChannelGraph() {
  const nodes = [
    { x: 8, y: 16 },
    { x: 8, y: 42 },
    { x: 8, y: 68 },
    { x: 8, y: 90 },
    { x: 30, y: 10 },
    { x: 30, y: 52 },
    { x: 30, y: 84 },
    { x: 52, y: 24 },
    { x: 52, y: 62 },
    { x: 74, y: 40 },
  ];
  const hub = { x: 92, y: 50 };

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <style>{`
          @keyframes ringpost-line-flow {
            0%   { stroke-dashoffset: 260; opacity: 0; }
            18%  { opacity: 0.9; }
            72%  { opacity: 0.55; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          .channel-line {
            stroke: var(--brand-pink);
            stroke-width: 1;
            fill: none;
            stroke-dasharray: 260;
            animation: ringpost-line-flow 3.4s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .channel-line { animation: none; stroke-dashoffset: 0; opacity: 0.25; }
          }
        `}</style>
      </defs>

      {nodes.map((n, i) => (
        <line
          key={`l-${i}`}
          x1={`${n.x}%`}
          y1={`${n.y}%`}
          x2={`${hub.x}%`}
          y2={`${hub.y}%`}
          className="channel-line"
          style={{ animationDelay: `${i * 0.24}s` }}
        />
      ))}

      {nodes.map((n, i) => (
        <circle
          key={`c-${i}`}
          cx={`${n.x}%`}
          cy={`${n.y}%`}
          r="2.5"
          fill="var(--brand-pink)"
          opacity="0.5"
        />
      ))}

      <circle cx={`${hub.x}%`} cy={`${hub.y}%`} r="5" fill="var(--brand-pink)" opacity="0.9" />
      <circle
        cx={`${hub.x}%`}
        cy={`${hub.y}%`}
        r="11"
        fill="none"
        stroke="var(--brand-pink)"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

export function ChannelsSection() {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.1 });
  const reduced = useReducedMotion();
  const [activeChannel, setActiveChannel] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    const interval = setInterval(
      () => setActiveChannel((prev) => (prev + 1) % channels.length),
      3000
    );
    return () => clearInterval(interval);
  }, [reduced, inView]);

  return (
    <section
      id="channels"
      ref={ref}
      className="relative z-10 overflow-hidden py-20 sm:py-24 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-4 font-mono text-sm text-muted-foreground">
              <span className="h-px w-12 bg-foreground/20" />
              <Scramble text="Every channel" />
            </span>
          </Reveal>

          <div className="grid items-stretch gap-8 lg:grid-cols-[auto_1fr] lg:gap-16">
            <Reveal direction="right" duration={1100} className="shrink-0">
              <MaskReveal direction="up" duration={1400}>
              <div className="w-48 lg:w-72 xl:w-80">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                  alt="RingPost connecting every channel your customers use"
                  className="animate-drift h-full w-full object-contain object-center"
                />
              </div>
              </MaskReveal>
            </Reveal>

            <div className="flex flex-col justify-center">
              <h2 className="font-display text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-[128px]">
                <SplitText text="One desk," stagger={80} />
                <SplitText
                  text="every channel."
                  delay={160}
                  stagger={80}
                  className="text-muted-foreground"
                />
              </h2>

              <Reveal delay={280}>
                <p className="mt-8 max-w-lg text-xl leading-relaxed text-muted-foreground">
                  Customers reach you however they like: phone, text, WhatsApp,
                  Instagram or Facebook. RingPost answers
                  all of them in one place.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Stat panels */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal distance={36} className="lg:col-span-2">
            <div className="relative h-full overflow-hidden border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-12">
              <ChannelGraph />

              <div className="relative z-10">
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="font-display text-8xl leading-none lg:text-[10rem]">
                    <CountUp end={7} suffix="+" duration={1600} />
                  </span>
                  <span className="text-2xl text-muted-foreground">channels</span>
                </div>
                <p className="max-w-md text-muted-foreground">
                  Calls, texts, WhatsApp, Instagram and Messenger. Every
                  conversation lands in one shared inbox your whole
                  team can see.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal delay={120} distance={36}>
              <div className="border border-foreground/10 bg-foreground/[0.02] p-8">
                <span className="font-display text-5xl lg:text-6xl">24/7</span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  Always answering, even after hours
                </span>
              </div>
            </Reveal>

            <Reveal delay={220} distance={36}>
              <div className="border border-foreground/10 bg-foreground/[0.02] p-8">
                <span className="font-display text-5xl lg:text-6xl">
                  <CountUp end={0} duration={900} />
                </span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  Missed calls that go unanswered
                </span>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Channel cards */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {channels.map((channel, index) => {
            const isActive = activeChannel === index;
            return (
              <Reveal key={channel.name} delay={index * 90} distance={26}>
                <div
                  onMouseEnter={() => setActiveChannel(index)}
                  className={`h-full cursor-default border p-6 transition-all duration-500 ${
                    isActive
                      ? "border-foreground/30 bg-foreground/[0.05]"
                      : "border-foreground/10"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      {isActive && (
                        <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-pink)]" />
                      )}
                      <span
                        className={`relative inline-flex h-2 w-2 rounded-full transition-colors duration-300 ${
                          isActive ? "bg-[var(--brand-pink)]" : "bg-foreground/20"
                        }`}
                      />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Connected
                    </span>
                  </div>
                  <span className="mb-1 block font-medium">{channel.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {channel.detail}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
