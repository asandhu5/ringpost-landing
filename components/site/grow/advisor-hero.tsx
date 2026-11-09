"use client";

import { useEffect, useState } from "react";
import { Copy, MessageSquare, Plus, Send, Sparkles } from "lucide-react";
import { useInView } from "@/components/site/motion";
import { DesktopFrame } from "./desktop-frame";

interface Answer { q: string; intro: string; points: { k: string; v: string }[]; next: string }

const ANSWERS: Answer[] = [
  {
    q: "How did the business do over the last 30 days?",
    intro: "A busy month. Here's the breakdown:",
    points: [
      { k: "Bookings", v: "64 new bookings, up from 49 the month before." },
      { k: "Calls", v: "397 calls answered, and 78 missed calls called back and recovered." },
      { k: "Messages", v: "611 conversations across WhatsApp, Instagram, Messenger, texts and email." },
      { k: "Reviews", v: "9 new Google reviews, averaging 4.8 stars." },
      { k: "Win-back", v: "24 texts sent, 6 customers booked again." },
    ],
    next: "Next step: calls bring the most bookings, so make sure your number is on every post and your Google listing.",
  },
  {
    q: "Which posts brought the most customers?",
    intro: "Three posts stood out this month:",
    points: [
      { k: "Fresh balayage", v: "12.4K views on Instagram and TikTok, and 9 people messaged to book." },
      { k: "Weekend openings", v: "8.1K views and the most bookings from a single post: 6." },
      { k: "Friday burger", v: "Strong on Instagram, quieter on Facebook." },
    ],
    next: "Next step: videos of finished work did best. Switch on the weekly video in Content Studio.",
  },
  {
    q: "Who should I win back this week?",
    intro: "Your Lapsed group is the best place to start:",
    points: [
      { k: "Lapsed", v: "35 customers who last visited 2 to 4 months ago, 31 of them can receive texts." },
      { k: "Slipping away", v: "20 customers, still recent enough that a reminder usually works." },
      { k: "Quiet days", v: "Thursday afternoons have the most free time this week." },
    ],
    next: "Next step: send your Lapsed group a Thursday message from Win Back. It takes a minute.",
  },
];

/** Talk to AI recreated: saved chats on the left, the conversation on the right, and
 * questions to click that change the answer. */
export function AdvisorHero() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const a = ANSWERS[i];
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(a.points.length + 1);
      return;
    }
    setShown(0);
  }, [inView, i, a.points.length]);
  useEffect(() => {
    if (!inView || shown > a.points.length) return;
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 900 : 380);
    return () => clearTimeout(id);
  }, [inView, shown, a.points.length]);

  return (
    <div ref={ref}>
      <DesktopFrame title="Talk to AI">
        <div className="grid md:grid-cols-[230px_1fr]">
          <aside className="hidden border-r border-line bg-surface-2/60 p-4 md:block">
            <span className="flex items-center justify-center gap-2 rounded-xl bg-[#5b4ee6] py-2.5 text-[13.5px] font-semibold text-white"><Plus className="h-4 w-4" aria-hidden />New chat</span>
            <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-wide text-muted-ink">Your chats</p>
            <ul className="mt-2 flex flex-col gap-1">
              {ANSWERS.map((x, k) => (
                <li key={x.q}><button type="button" onClick={() => setI(k)} className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] ${k === i ? "bg-white font-semibold text-ink shadow-sm" : "text-muted-ink hover:bg-white"}`}><MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden /><span className="line-clamp-2">{x.q}</span></button></li>
              ))}
            </ul>
            <p className="mt-6 text-[12px] leading-relaxed text-muted-ink">Knows your services, numbers, reviews, posts and latest customer chats.</p>
          </aside>
          <div className="flex min-h-[520px] flex-col p-5 sm:p-6">
            <p className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-surface-2 px-4 py-2.5 text-[14.5px] text-ink">{a.q}</p>
            <div className="mt-5 flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#5b4ee6,#22d3ee)] text-white"><Sparkles className="h-4 w-4" aria-hidden /></span>
              <div className="min-w-0 flex-1 text-[14.5px] leading-relaxed text-ink">
                {shown === 0 ? (
                  <span className="flex gap-1 pt-2" aria-hidden>{[0, 1, 2].map((d) => <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-[#5b4ee6]" style={{ animationDelay: `${d * 120}ms` }} />)}</span>
                ) : (
                  <>
                    <p className="rp-fade-in">{a.intro}</p>
                    <ul className="mt-2 flex flex-col gap-1.5">{a.points.slice(0, shown).map((p) => <li key={p.k} className="rp-fade-in flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" /><span><strong>{p.k}:</strong> {p.v}</span></li>)}</ul>
                    {shown > a.points.length && <p className="rp-fade-in mt-3 rounded-xl bg-[#f3f1ff] px-3.5 py-2.5 font-medium">{a.next}</p>}
                    <p className="mt-2 flex items-center gap-1 text-[12.5px] text-muted-ink"><Copy className="h-3.5 w-3.5" aria-hidden />Copy</p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-auto pt-5">
              <div className="flex flex-wrap gap-1.5">{ANSWERS.map((x, k) => <button key={x.q} type="button" onClick={() => setI(k)} className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors ${k === i ? "border-[#5b4ee6] bg-[#f6f4ff] text-[#4f46e5]" : "border-line text-muted-ink hover:text-ink"}`}>{x.q}</button>)}</div>
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-line px-4 py-3 text-[14px] text-muted-ink">Ask about your business…<Send className="ml-auto h-4 w-4 text-glow" aria-hidden /></div>
            </div>
          </div>
        </div>
      </DesktopFrame>
    </div>
  );
}
