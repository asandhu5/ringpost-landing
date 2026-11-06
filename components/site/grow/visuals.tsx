"use client";

import { useEffect, useState } from "react";
import { BellRing, Bot, Check, Send, Sparkles, Star, TrendingUp, UsersRound } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";

function Frame({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-line bg-white shadow-[0_40px_90px_-50px_rgba(11,27,43,0.55)]">
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-5 py-3 text-[14px] font-semibold text-ink">{icon}{title}</div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return <span className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? "fill-amber-400 text-amber-400" : "text-line-strong"}`} aria-hidden />)}</span>;
}

/* ── Reviews and comments ─────────────────────────────────────── */
const ITEMS = [
  { source: "google", who: "A regular customer", stars: 5, text: "Always on time and so friendly. Best haircut I've had in years.", reply: "Thank you so much! It's always a pleasure to see you. See you next month.", state: "approve" as const },
  { source: "instagram", who: "@a.local.customer", post: "/made/studio/beauty-post.webp", text: "Obsessed with this colour 😍 do you have anything Friday?", reply: "Thank you! Friday has a few spaces left, send us a message and we'll book you in.", state: "approve" as const },
  { source: "google", who: "A first-time visitor", stars: 2, text: "Waited 20 minutes past my time.", reply: "We're sorry you waited. That's not the visit we want for you. We've passed this to the owner, who'll be in touch.", state: "needs" as const },
  { source: "facebook", who: "A neighbour", post: "/made/studio/burger-post.webp", text: "Are you open on bank holiday Monday?", reply: "We are, from 12 to 9 pm. Hope to see you!", state: "approve" as const },
];

export function ReviewsVisual() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 }, false);
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setDone(1);
    setDone(0);
    const id = setInterval(() => setDone((d) => (d >= 2 ? d : d + 1)), 1600);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref}>
      <Frame title="Reviews & Comments" icon={<Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />}>
        <ul className="flex flex-col gap-3">
          {ITEMS.map((it, i) => (
            <li key={i} className={`rounded-2xl border p-3.5 ${it.state === "needs" ? "border-amber-200 bg-amber-50/60" : "border-line"}`}>
              <div className="flex items-center gap-2.5">
                {it.source === "google" ? <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[13px] font-bold text-[#4285f4] ring-1 ring-line">G</span> : <ChannelLogo id={it.source} size={28} />}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold text-ink">{it.who}</span>
                  {"stars" in it && it.stars ? <Stars n={it.stars} /> : <span className="block text-[12px] text-muted-ink">Commented on your post</span>}
                </span>
                {"post" in it && it.post && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={it.post} alt="" className="h-9 w-9 rounded-lg object-cover" />
                )}
              </div>
              <p className="mt-2 text-[13.5px] text-ink">&ldquo;{it.text}&rdquo;</p>
              <div className="mt-2.5 rounded-xl bg-surface-2 p-2.5">
                <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-glow"><Sparkles className="h-3 w-3" aria-hidden />Reply written in your voice</p>
                <p className="mt-1 text-[13px] leading-snug text-ink">{it.reply}</p>
              </div>
              <div className="mt-2.5 flex items-center justify-end gap-2">
                {it.state === "needs" ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[12px] font-semibold text-amber-900"><BellRing className="h-3.5 w-3.5" aria-hidden />Sent to your phone first</span>
                ) : i < done ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-800"><Check className="h-3.5 w-3.5" aria-hidden />Posted</span>
                ) : (
                  <span className="rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-white">Approve</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Frame>
    </div>
  );
}

/* ── Win-back ─────────────────────────────────────────────────── */
const GROUPS = [
  { title: "Slipping away", when: "1 to 2 months", n: 38 },
  { title: "Lapsed", when: "2 to 4 months", n: 54 },
  { title: "Long gone", when: "4 months or more", n: 71 },
  { title: "Asked but never booked", when: "No visit on record", n: 23 },
];

export function WinbackVisual() {
  const [active, setActive] = useState(0);
  const g = GROUPS[active];
  return (
    <Frame title="Win Back" icon={<UsersRound className="h-4 w-4 text-glow" aria-hidden />}>
      <div className="grid grid-cols-2 gap-2" role="tablist" aria-label="Customer groups">
        {GROUPS.map((x, i) => (
          <button key={x.title} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`rounded-2xl border p-3 text-left transition-all ${i === active ? "border-glow bg-[#f6f4ff] shadow-sm" : "border-line hover:border-line-strong"}`}>
            <span className="block text-[13.5px] font-semibold text-ink">{x.title}</span>
            <span className="block text-[12px] text-muted-ink">{x.when}</span>
            <span className="mt-1.5 block text-[22px] font-bold tabular-nums text-ink">{x.n}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-line p-3.5">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-glow"><Sparkles className="h-3.5 w-3.5" aria-hidden />Message for {g.title.toLowerCase()}</p>
        <p key={g.title} className="rp-fade-in mt-2 rounded-2xl rounded-bl-md bg-surface-2 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink">
          {active === 3
            ? "Hi! You asked about a first visit a while ago. We still have spaces this week if you'd like to come in. Reply and we'll find a time."
            : active === 0
              ? "Hi! It's been a few weeks since your last visit. We have a couple of spaces on Thursday and Saturday if you'd like to book in."
              : "Hi! We haven't seen you in a while, and we've added something new we think you'd like. Reply if you'd like us to save you a time."}
        </p>
        <p className="mt-2.5 text-[12px] text-muted-ink">Sent only to customers who agreed to messages. Reply STOP to opt out.</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[{ k: "Sent", v: g.n }, { k: "Replied", v: Math.round(g.n * 0.3) }, { k: "Booked", v: Math.round(g.n * 0.14) }].map((x) => (
          <div key={x.k} className="rounded-xl bg-surface-2 py-2.5"><p className="text-[19px] font-bold tabular-nums text-ink">{x.v}</p><p className="text-[12px] text-muted-ink">{x.k}</p></div>
        ))}
      </div>
    </Frame>
  );
}

/* ── Insights ─────────────────────────────────────────────────── */
const CHANNELS = [
  { id: "phone", name: "Phone calls", v: 46 },
  { id: "whatsapp", name: "WhatsApp", v: 31 },
  { id: "instagram", name: "Instagram", v: 24 },
  { id: "messenger", name: "Messenger", v: 11 },
  { id: "sms", name: "Texts", v: 8 },
  { id: "email", name: "Email", v: 5 },
];

export function InsightsVisual() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const max = Math.max(...CHANNELS.map((c) => c.v));
  return (
    <div ref={ref}>
      <Frame title="Insights · last 30 days" icon={<TrendingUp className="h-4 w-4 text-glow" aria-hidden />}>
        <div className="grid grid-cols-3 gap-2">
          {[{ k: "People got in touch", v: "125" }, { k: "Booked", v: "61" }, { k: "Follow-ups", v: "9" }].map((x) => (
            <div key={x.k} className="rounded-xl border border-line p-3"><p className="text-[22px] font-bold tabular-nums text-ink">{x.v}</p><p className="text-[12px] leading-tight text-muted-ink">{x.k}</p></div>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] font-semibold text-muted-ink">Where they came from</p>
        <ul className="mt-2 flex flex-col gap-2">
          {CHANNELS.map((c, i) => (
            <li key={c.id} className="flex items-center gap-2.5">
              <ChannelLogo id={c.id} size={22} />
              <span className="w-[86px] shrink-0 text-[12.5px] text-ink">{c.name}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full bg-[#5b4ee6] transition-[width] duration-1000" style={{ width: inView ? `${(c.v / max) * 100}%` : "0%", transitionDelay: `${i * 90}ms` }} /></span>
              <span className="w-7 text-right text-[12.5px] font-semibold tabular-nums text-ink">{c.v}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl bg-[#f6f4ff] p-3">
          <p className="text-[12.5px] font-semibold text-[#3f3597]">What people keep asking</p>
          <p className="mt-1 text-[13px] text-ink">&ldquo;Do you have parking?&rdquo; came up 14 times. Add it to your knowledge and your AI will answer it every time.</p>
        </div>
      </Frame>
    </div>
  );
}

/* ── Talk to AI ───────────────────────────────────────────────── */
const CHAT = [
  { from: "you", text: "How did last month go?" },
  { from: "ai", text: "Busier than the month before: 125 people got in touch and 61 booked, up from 49. Phone calls brought the most bookings, and Instagram messages grew fastest." },
  { from: "you", text: "What should I do this week?" },
  { from: "ai", text: "Thursday afternoons are your quietest slot. Send your Slipping away group a Thursday offer from Win Back; 38 customers are in it." },
];

export function AdvisorVisual() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [shown, setShown] = useState(1);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(CHAT.length);
    const id = setInterval(() => setShown((n) => (n >= CHAT.length ? n : n + 1)), 1300);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <div ref={ref}>
      <Frame title="Talk to AI" icon={<Bot className="h-4 w-4 text-glow" aria-hidden />}>
        <div className="flex min-h-[330px] flex-col gap-2.5" aria-live="polite">
          {CHAT.slice(0, shown).map((m, i) => (
            <p key={i} className={`rp-fade-in max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${m.from === "you" ? "self-end rounded-br-md bg-ink text-white" : "self-start rounded-bl-md bg-surface-2 text-ink"}`}>{m.text}</p>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Which posts did best?", "Who should I win back?", "What are people asking?"].map((q) => <span key={q} className="rounded-full border border-line px-3 py-1 text-[12px] text-muted-ink">{q}</span>)}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] text-faint">Ask about your business<Send className="ml-auto h-4 w-4" aria-hidden /></div>
      </Frame>
    </div>
  );
}
