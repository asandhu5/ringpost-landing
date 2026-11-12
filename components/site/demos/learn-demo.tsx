"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Globe, MessagesSquare, Phone, Sparkles } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { cx } from "@/components/site/ui/cx";

const SECTIONS = [
  { name: "About your business", found: "Hair salon, open since 2014" },
  { name: "Services and prices", found: "12 services with prices" },
  { name: "Opening hours", found: "Tue to Sat, 9 am to 6 pm" },
  { name: "Your team and their hours", found: "3 people" },
  { name: "How people book and pay", found: "Card or cash, 24 h notice" },
  { name: "Questions customers ask", found: "9 answers" },
  { name: "Logo, colors and tone", found: "Logo found, warm and friendly" },
];
const GAPS = [
  { q: "Are you open on Sundays?", a: "Yes, Sundays 10 am to 4 pm." },
  { q: "What is your cancellation policy?", a: "Free up to 24 hours before." },
  { q: "Do you take walk-ins?", a: "Yes, when a chair is free." },
];
const BASE = 82;

type Stage = "ready" | "reading" | "gaps";

/**
 * The Business Brain page's centrepiece. Press Import: the Knowledge sections fill one
 * by one and the progress bar climbs; RingPost points out three questions it can't yet
 * answer; answer one and progress rises again; then see that one answer reach every
 * call, message and post.
 */
export function LearnDemo() {
  const [stage, setStage] = useState<Stage>("ready");
  const [filled, setFilled] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);

  useEffect(() => {
    if (stage !== "reading") return;
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quick) {
      setFilled(SECTIONS.length);
      setStage("gaps");
      return;
    }
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setFilled(n);
      if (n >= SECTIONS.length) {
        clearInterval(t);
        setTimeout(() => setStage("gaps"), 500);
      }
    }, 520);
    return () => clearInterval(t);
  }, [stage]);

  const start = () => {
    setFilled(0);
    setAnswered([]);
    setStage("reading");
  };
  const progress = stage === "ready" ? 0 : Math.round((filled / SECTIONS.length) * BASE) + answered.length * 6;
  const last = answered.length ? GAPS[answered[answered.length - 1]] : null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
      <div className="rounded-rp-md border border-line bg-white p-4 shadow-rp-2 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 rounded-rp-sm border border-line-strong p-1.5 pl-3.5">
          <Globe className="h-5 w-5 shrink-0 text-muted-ink" strokeWidth={1.75} aria-hidden />
          <span className="min-w-0 flex-1 truncate text-body text-ink">goldenhourhair.com</span>
          <button type="button" onClick={start} disabled={stage === "reading"} className="rp-btn inline-flex h-10 shrink-0 items-center rounded-full bg-cta px-5 text-small font-semibold text-cta-ink disabled:opacity-60">
            {stage === "ready" ? "Import" : stage === "reading" ? "Reading…" : "Import again"}
          </button>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="w-14 font-display text-[1.75rem] tabular-nums text-ink" aria-live="polite">{progress}%</span>
          <span className="flex-1">
            <span className="block text-small font-semibold text-ink">Your knowledge progress</span>
            <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-surface-2">
              <span className="block h-full rounded-full bg-[linear-gradient(90deg,#7c6bff,#22d3ee)] transition-[width] duration-500 ease-rp" style={{ width: `${progress}%` }} />
            </span>
          </span>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SECTIONS.map((s, i) => {
            const done = i < filled;
            return (
              <li key={s.name} className={cx("flex items-center gap-3 rounded-rp-sm border px-3 py-2.5 transition-colors duration-300", done ? "border-grow/30 bg-grow-soft/50" : "border-line bg-white")}>
                <span className={cx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300", done ? "bg-grow text-white" : "border border-dashed border-line-strong text-transparent")}><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /></span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-small font-semibold text-ink">{s.name}</span>
                  <span className="block truncate text-[13px] text-muted-ink">{done ? s.found : stage === "ready" ? "Waiting for your website" : "Reading…"}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className={cx("rounded-rp-md border p-4 sm:p-5", stage === "gaps" ? "border-amber/40 bg-amber-soft/60" : "border-line bg-white")}>
          <p className="text-small font-semibold text-ink">{stage === "gaps" ? "Three questions it can't answer yet. Tap one to answer it." : "Gaps to fill"}</p>
          {stage !== "gaps" ? (
            <p className="mt-2 text-small text-muted-ink">After the import, RingPost points out the questions customers are likely to ask that it can&apos;t answer yet.</p>
          ) : (
            <ul className="mt-3 grid grid-cols-1 gap-2">
              {GAPS.map((g, i) => {
                const done = answered.includes(i);
                return (
                  <li key={g.q}>
                    <button type="button" disabled={done} onClick={() => setAnswered((a) => [...a, i])} className={cx("flex min-h-11 w-full items-center gap-3 rounded-rp-sm border px-3 py-2 text-left text-small transition-colors duration-200", done ? "border-grow/30 bg-white" : "border-line bg-white font-semibold text-ink hover:border-violet")}>
                      <span className={cx("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", done ? "bg-grow text-white" : "bg-amber-soft text-amber")}>{done ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : "?"}</span>
                      <span className="min-w-0">
                        <span className="block text-ink">{g.q}</span>
                        {done && <span className="block text-muted-ink">{g.a}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="flex-1 rounded-rp-md border border-line bg-white p-4 shadow-rp-1 sm:p-5">
          <p className="flex items-center gap-2 text-small font-semibold text-ink">One answer, used everywhere <ArrowRight className="h-4 w-4 text-violet" aria-hidden /></p>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-small">
            {[
              { icon: <Phone className="h-4 w-4" aria-hidden />, where: "On a call" },
              { icon: <MessagesSquare className="h-4 w-4" aria-hidden />, where: "In a message" },
              { icon: <ChannelLogo id="instagram" size={18} />, where: "In a post" },
              { icon: <Sparkles className="h-4 w-4" aria-hidden />, where: "In Talk to AI" },
            ].map((x) => (
              <li key={x.where} className="flex items-center gap-3 rounded-rp-sm bg-base px-3 py-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-violet">{x.icon}</span>
                <span className="w-[6.5rem] shrink-0 font-semibold text-ink">{x.where}</span>
                <span key={last?.q ?? "none"} className={cx("min-w-0 truncate", last ? "rp-msg-in text-ink" : "text-muted-ink")}>{last ? last.a : "Answer a question to see it here"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
