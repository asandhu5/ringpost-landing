"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, PhoneCall, PhoneMissed } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { cx } from "@/components/site/ui/cx";
import { Chip } from "@/components/site/ui/primitives";
import type { InboxThread } from "@/lib/content/home";

const HOLD_MS = 6500;

/**
 * The dashboard's inbox, drawn in code: one list for every channel, each named in
 * words, and the conversation beside it. It steps through the channels by itself —
 * message in, reply typed, booked — until the visitor picks one; then it is theirs.
 * Rendered complete on the server, so it reads the same before any script runs.
 */
export function InboxDemo({ threads }: { threads: InboxThread[] }) {
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  /** Characters of the reply shown so far; null shows it whole (first paint, reduced motion). */
  const [typed, setTyped] = useState<number | null>(null);
  const [motion, setMotion] = useState(false);
  const t = threads[active];

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Type the reply in, a little after the customer's message has been read.
  useEffect(() => {
    if (!motion || !inView) return;
    setTyped(0);
    let n = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    const wait = setTimeout(() => {
      timer = setInterval(() => {
        n += 2;
        setTyped(n);
        if (n >= t.reply.length) clearInterval(timer);
      }, 22);
    }, 900);
    return () => {
      clearTimeout(wait);
      if (timer) clearInterval(timer);
    };
  }, [active, motion, inView, t.reply]);

  // Step to the next channel once this one has been read, until the visitor takes over.
  useEffect(() => {
    if (!auto || !motion || !inView) return;
    const next = setTimeout(() => setActive((a) => (a + 1) % threads.length), HOLD_MS);
    return () => clearTimeout(next);
  }, [active, auto, motion, inView, threads.length]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + threads.length) % threads.length;
    pick(n);
    tabs.current[n]?.focus();
  };

  const done = typed === null || typed >= t.reply.length;
  const reply = typed === null ? t.reply : t.reply.slice(0, typed);

  return (
    <div ref={root} className="overflow-hidden rounded-rp-md border border-line bg-white shadow-rp-3">
      {/* Window bar, as in the dashboard. */}
      <div className="flex h-11 items-center gap-3 border-b border-line px-4">
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">Inbox</span>
        <Chip tone="success">
          <span className="h-1.5 w-1.5 rounded-full bg-grow" /> AI is handling everything
        </Chip>
      </div>
      <div className="grid md:grid-cols-[minmax(0,1.08fr)_minmax(0,1.15fr)]">
        <div role="tablist" aria-label="Channels" aria-orientation="vertical" className="grid grid-cols-3 gap-1 border-b border-line p-1.5 md:block md:space-y-0.5 md:border-b-0 md:border-r md:p-2">
          {threads.map((x, i) => {
            const on = i === active;
            return (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`inbox-tab-${x.id}`}
                aria-selected={on}
                aria-controls="inbox-thread"
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={cx(
                  "relative flex min-h-11 min-w-0 items-center gap-1.5 rounded-rp-sm px-1 text-left transition-colors duration-200 md:h-[clamp(44px,8.4svh,58px)] md:w-full md:gap-3 md:px-2.5",
                  on ? "bg-primary-soft" : "hover:bg-surface-2",
                )}
              >
                {on && <span aria-hidden className="absolute inset-y-2 left-0 hidden w-[3px] rounded-full bg-violet md:block" />}
                <ChannelLogo id={x.id} size={28} />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[12.5px] font-semibold text-ink md:text-small">
                    <span className="md:hidden">{x.short}</span>
                    <span className="hidden md:inline">{x.label}</span>
                  </span>
                  <span className="hidden truncate text-[12.5px] text-muted-ink md:block">{x.customer || x.timeline?.[0]}</span>
                </span>
                <span className="hidden shrink-0 md:block">
                  <Chip tone="success">{x.outcome.split(" · ")[0]}</Chip>
                </span>
              </button>
            );
          })}
        </div>

        <div id="inbox-thread" role="tabpanel" aria-labelledby={`inbox-tab-${t.id}`} className="flex min-h-[300px] flex-col bg-base/60 md:min-h-0">
          <div className="flex items-center gap-2.5 border-b border-line bg-white px-4 py-2.5">
            <ChannelLogo id={t.id} size={26} />
            <span className="min-w-0 leading-tight">
              <span className="block text-small font-semibold text-ink">{t.label}</span>
              <span className="block truncate text-[12.5px] text-muted-ink">{t.who}</span>
            </span>
            <span className="ml-auto flex shrink-0 items-center gap-1.5 text-[12.5px] font-medium text-grow">
              <span className="h-1.5 w-1.5 rounded-full bg-grow" /> AI is answering
            </span>
          </div>
          <div key={t.id} className="flex flex-1 flex-col justify-center gap-2.5 p-4">
            {t.timeline ? (
              <ol className="rp-msg-in flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[12.5px] font-medium text-ink">
                {t.timeline.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden className="text-muted-ink">→</span>}
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1.5">
                      {i === 0 ? <PhoneMissed className="h-3.5 w-3.5 text-amber" aria-hidden /> : i === 1 ? <PhoneCall className="h-3.5 w-3.5 text-violet" aria-hidden /> : <CalendarCheck className="h-3.5 w-3.5 text-grow" aria-hidden />}
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="rp-msg-in max-w-[85%] self-start rounded-rp-md rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-[14.5px] leading-snug text-ink">{t.customer}</p>
            )}
            <p className="max-w-[85%] self-end rounded-rp-md rounded-br-md bg-violet px-3.5 py-2.5 text-[14.5px] leading-snug text-white" style={{ minHeight: "2.6em" }}>
              {/* The whole reply holds the bubble's size; the typed part shows on top of it. */}
              <span className="relative block">
                <span className="invisible">{t.reply}</span>
                <span className="absolute inset-0">
                  {reply}
                  {!done && <span className="rp-caret !bg-white" />}
                </span>
              </span>
            </p>
            <div className={cx("flex flex-wrap items-center justify-end gap-2 transition-opacity duration-500", done ? "opacity-100" : "opacity-0")}>
              {t.note && (
                <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted-ink">
                  {t.note}
                </span>
              )}
              <Chip tone="success" className="!px-3 !py-1.5 !text-[13px]">
                <CalendarCheck className="h-3.5 w-3.5" aria-hidden /> {t.outcome}
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
