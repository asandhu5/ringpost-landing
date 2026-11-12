"use client";

import { useEffect, useRef, useState } from "react";
import { BarChart3, CalendarCheck, Check, Headset, MessagesSquare, Palette, PenTool, Send, Share2, TrendingUp } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { LogoMark } from "@/components/site/logo";
import { Container, Section, SectionHeading } from "@/components/site/ui/primitives";
import { TELL_ONCE } from "@/lib/content/home";

const TOOL_ICONS = [Headset, CalendarCheck, PenTool, Share2, BarChart3];
const AREA_STYLE: Record<string, { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; cls: string }> = {
  answer: { icon: MessagesSquare, cls: "bg-answer-soft text-answer" },
  book: { icon: CalendarCheck, cls: "bg-answer-soft text-answer" },
  create: { icon: Palette, cls: "bg-create-soft text-create" },
  post: { icon: Send, cls: "bg-create-soft text-create" },
  grow: { icon: TrendingUp, cls: "bg-grow-soft text-grow" },
};

/** Five thin lines running between a column of five rows and the ring. */
function Lines({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hidden h-full w-full lg:block" style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      {[10, 30, 50, 70, 90].map((y) => (
        <path key={y} d={`M0 ${y} C 55 ${y}, 45 50, 100 50`} fill="none" stroke="var(--rp-primary-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="rp-once-line" />
      ))}
    </svg>
  );
}

/**
 * "Tell it once": five separate tools, each asking for the same details, fold into the
 * ring; the ring then lights up the five things RingPost does. Plays once when the
 * section is on screen. Without JavaScript the finished picture is what shows.
 */
export function TellOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already scrolled past (a reload half-way down the page): leave the finished picture.
    if (el.getBoundingClientRect().bottom < 0) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setGo(true);
        io.disconnect();
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section fit tone="white">
      <Container>
        <SectionHeading align="center" eyebrow={TELL_ONCE.eyebrow} title={TELL_ONCE.title} className="!max-w-[46rem]" />

        <div ref={ref} className={`rp-once ${armed ? "is-armed" : ""} ${go ? "is-go" : ""} mx-auto mt-[clamp(1rem,3svh,2.5rem)] grid max-w-[1040px] items-center gap-4 lg:grid-cols-[1fr_72px_auto_72px_1fr] lg:items-end lg:gap-0`}>
          <div>
          <p className="mb-2 text-[13px] font-semibold text-muted-ink">{TELL_ONCE.before}</p>
          <ul className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-1 lg:gap-[clamp(0.25rem,0.8svh,0.5rem)]" aria-label="Five tools, each needing the same details">
            {TELL_ONCE.tools.map((t, i) => {
              const Icon = TOOL_ICONS[i];
              return (
                <li key={t} className="rp-once-tool flex h-[clamp(38px,5.5svh,52px)] items-center gap-3 rounded-rp-sm border border-line bg-base px-3" style={{ "--i": i } as React.CSSProperties}>
                  <Icon className="h-4 w-4 shrink-0 text-muted-ink" strokeWidth={1.75} aria-hidden />
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-small font-semibold text-ink">{t}</span>
                    <span className="block truncate text-[12.5px] text-muted-ink">{TELL_ONCE.asks}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          </div>
          <div className="hidden h-[calc(100%-28px)] lg:block">
            <Lines />
          </div>
          <div className="rp-once-core mx-auto flex lg:mb-[clamp(0.5rem,3svh,2.5rem)] h-[clamp(116px,22svh,168px)] w-[clamp(116px,22svh,168px)] flex-col items-center justify-center rounded-full border border-primary-line bg-white text-center">
            <LogoMark className="!h-[42%] !w-[42%]" />
            <span className="mt-1 max-w-[8em] text-[12.5px] font-semibold leading-tight text-ink">{TELL_ONCE.core}</span>
          </div>
          <div className="hidden h-[calc(100%-28px)] lg:block">
            <Lines flip />
          </div>
          <div>
          <p className="mb-2 text-[13px] font-semibold text-violet">{TELL_ONCE.after}</p>
          <ul className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-1 lg:gap-[clamp(0.25rem,0.8svh,0.5rem)]" aria-label="What RingPost does from those details">
            {TELL_ONCE.areas.map((a, i) => {
              const s = AREA_STYLE[a.id];
              return (
                <li key={a.id} className="rp-once-area flex h-[clamp(38px,5.5svh,52px)] items-center gap-3 rounded-rp-sm border border-line bg-white px-3 shadow-rp-1" style={{ "--i": i } as React.CSSProperties}>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${s.cls}`}>
                    <s.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-small font-semibold text-ink">{a.name}</span>
                    <span className="block truncate text-[12.5px] text-muted-ink">{a.line}</span>
                  </span>
                </li>
              );
            })}
          </ul>
          </div>
        </div>

        <ol className="mx-auto mt-[clamp(1rem,3svh,2.5rem)] grid max-w-[1040px] gap-3 lg:grid-cols-3">
          {TELL_ONCE.steps.map((s, i) => (
            <li key={s.title} className="flex items-center gap-4 rounded-rp-md border border-line bg-base p-3">
              <StepMini step={i} />
              <span className="min-w-0">
                <span className="block text-[15px] font-semibold leading-tight text-ink">
                  <span className="text-violet">{i + 1}.</span> {s.title}
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-center text-small font-semibold text-ink">{TELL_ONCE.note}</p>
      </Container>
    </Section>
  );
}

/** A tiny moving picture of each step, as it looks in the dashboard. */
function StepMini({ step }: { step: number }) {
  const box = "flex h-[60px] w-[104px] shrink-0 flex-col justify-center gap-1.5 rounded-rp-sm border border-line bg-white px-2.5";
  if (step === 0)
    return (
      <span className={box} aria-hidden>
        <span className="flex h-6 min-w-0 items-center rounded-md border border-line-strong px-1.5 text-[10px] text-muted-ink"><span className="truncate">yoursite.com</span></span>
        <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <span className="rp-mini-fill block h-full rounded-full bg-violet" />
        </span>
      </span>
    );
  if (step === 1)
    return (
      <span className={box} aria-hidden>
        {["Services", "Prices", "Hours"].map((t, i) => (
          <span key={t} className="flex items-center gap-1.5 text-[10.5px] font-medium leading-none text-ink">
            <span className="rp-mini-tick flex h-3 w-3 items-center justify-center rounded-full bg-grow text-white" style={{ "--i": i } as React.CSSProperties}>
              <Check className="h-2 w-2" strokeWidth={3.5} />
            </span>
            {t}
          </span>
        ))}
      </span>
    );
  return (
    <span className={box} aria-hidden>
      {["phone", "whatsapp", "instagram"].map((id, i) => (
        <span key={id} className="flex items-center justify-between">
          <ChannelLogo id={id} size={14} />
          <span className="rp-mini-track flex h-3 w-6 items-center rounded-full bg-line-strong px-[2px]" style={{ "--i": i } as React.CSSProperties}>
            <span className="rp-mini-knob h-2 w-2 rounded-full bg-white" style={{ "--i": i } as React.CSSProperties} />
          </span>
        </span>
      ))}
    </span>
  );
}
