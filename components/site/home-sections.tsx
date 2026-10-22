"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, CalendarCheck, Check, ImagePlus, MessageSquareText, PhoneCall, ShieldCheck } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { LogoMark } from "@/components/site/logo";
import { CountUp, SpotlightCard, Stagger, useInView } from "@/components/site/motion";
import { useReducedMotion } from "@/hooks/use-motion";

/* ────────────────────────────────────────────────────────────────────────────
 * "One evening at a salon": a phone beside four steps. The steps play through one
 * after another while the section is on screen (paused on hover, still for reduced
 * motion), and a click jumps to any step. It is an illustration, labelled as one.
 * ──────────────────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    time: "9:47 PM",
    title: "A call comes in after closing",
    body: "It picks up straight away in a natural voice, on your RingPost number or your own number forwarded to it.",
  },
  {
    time: "9:47 PM",
    title: "It answers with your real prices",
    body: "Services, prices and opening hours come from what you've told it. It never invents a price or a time.",
  },
  {
    time: "9:48 PM",
    title: "It books and texts a confirmation",
    body: "Only times that are free in your calendar. The booking lands there and the customer gets a text.",
  },
  {
    time: "8:00 AM",
    title: "By morning, your posts are ready",
    body: "Images and videos made from your services or your own photos, waiting for you to approve.",
  },
];

/** How long each step stays on the phone before the next one plays. */
const STEP_MS = 2600;

function PhoneScreen({ step }: { step: number }) {
  return (
    <div className="relative mx-auto aspect-[9/17] w-[236px] rounded-[40px] border border-white/10 bg-[#0c0c14] p-3 shadow-[0_40px_120px_-30px_rgba(124,107,255,0.65)] sm:w-[256px]">
      <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full overflow-hidden rounded-[34px] bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,107,255,0.28),transparent_60%),#0f0f18] px-4 pb-5 pt-12">
        <div className="mb-4 text-center font-mono text-[11px] text-faint">{STEPS[step].time}</div>

        {step === 0 && (
          <div key="s0" className="animate-bubble-in flex h-[80%] flex-col items-center justify-center text-center">
            <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-violet/20">
              <span className="animate-ringpost-ping absolute inset-0 rounded-full bg-violet/30" />
              <PhoneCall aria-hidden className="h-8 w-8 text-glow" />
            </div>
            <p className="text-[18px] font-semibold text-ink">+1 (415) 555-0132</p>
            <p className="mt-1 text-[13px] text-muted-ink">Calling Bloom Salon…</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/15 px-3 py-1.5 text-[12px] font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> RingPost AI answering
            </span>
          </div>
        )}

        {step === 1 && (
          <div key="s1" className="flex flex-col gap-2.5">
            <Bubble from="them" delay={0}>Hi, how much is a cut and blow-dry?</Bubble>
            <Bubble from="ai" delay={350}>A cut and blow-dry is $65 and takes about an hour. Would you like to book one?</Bubble>
            <Bubble from="them" delay={900}>Yes, anything tomorrow morning?</Bubble>
            <Bubble from="ai" delay={1400}>Tomorrow I have 9:30 or 11:00. Which suits you?</Bubble>
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="flex flex-col gap-3">
            <div className="animate-bubble-in rounded-2xl border border-success/30 bg-success/10 p-4">
              <div className="flex items-center gap-2 text-[12px] font-medium text-success">
                <CalendarCheck aria-hidden className="h-4 w-4" /> Booked
              </div>
              <p className="mt-2 text-[15px] font-semibold text-ink">Cut &amp; blow-dry</p>
              <p className="text-[13px] text-muted-ink">Tomorrow · 9:30 AM · with Maya</p>
              <p className="mt-2 text-[13px] text-ink">$65</p>
            </div>
            <div className="animate-bubble-in rounded-2xl bg-white/[0.06] p-3 text-[12.5px] leading-relaxed text-muted-ink" style={{ animationDelay: "400ms" }}>
              <span className="text-faint">Text to customer · </span>You&apos;re booked for a cut &amp; blow-dry tomorrow at 9:30 AM. See you then!
            </div>
            <div className="animate-bubble-in rounded-2xl bg-violet/15 p-3 text-[12.5px] text-glow" style={{ animationDelay: "800ms" }}>
              New booking · Bloom Salon
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="s3" className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-1.5">
              {POST_TILES.map((t, i) => (
                <PostTile key={t.business} tile={t} delay={i * 90} />
              ))}
            </div>
            <div className="animate-bubble-in rounded-2xl bg-white/[0.06] p-3" style={{ animationDelay: "650ms" }}>
              <p className="text-[12px] text-faint">Ready for today</p>
              <p className="mt-1 text-[13.5px] text-ink">4 images · 1 video, made from your services</p>
            </div>
            <div className="animate-bubble-in flex items-center justify-between rounded-2xl bg-success/10 p-3 text-[12.5px] text-success" style={{ animationDelay: "900ms" }}>
              Approved · posting everywhere <Check aria-hidden className="h-4 w-4" />
            </div>
            <div className="animate-bubble-in flex items-center justify-between rounded-2xl bg-white/[0.06] p-3" style={{ animationDelay: "1150ms" }}>
              <span className="text-[12px] text-muted-ink">Scheduled 6:00 PM</span>
              <span className="flex -space-x-1">
                <ChannelLogo id="instagram" size={18} />
                <ChannelLogo id="facebook" size={18} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Bubble({ from, delay, children }: { from: "them" | "ai"; delay: number; children: React.ReactNode }) {
  return (
    <div
      className={`animate-bubble-in max-w-[88%] rounded-2xl px-3 py-2 text-[12.5px] leading-snug ${from === "ai" ? "self-end rounded-br-md bg-violet text-white" : "self-start rounded-bl-md bg-white/[0.08] text-ink"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function HomeStory() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const playing = inView && !paused && !reduced;

  // Plays through the evening once the section is on screen; a click on a step jumps to it.
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setActive((n) => (n + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(id);
  }, [active, playing]);

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="flex flex-col items-center">
        <PhoneScreen step={active} />
        <p className="mt-4 text-[12px] text-faint">Illustration of a real flow</p>
      </div>
      <ol className="flex flex-col gap-2">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "step" : undefined}
                className={`relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 sm:p-6 ${on ? "border-line-strong bg-white/[0.04]" : "border-transparent hover:bg-white/[0.02]"}`}
              >
                <span className={`font-mono text-[12px] transition-colors ${on ? "text-glow" : "text-faint"}`}>
                  {String(i + 1).padStart(2, "0")} · {s.time}
                </span>
                <h3 className={`mt-1.5 text-[clamp(1.15rem,1.6vw,1.35rem)] font-semibold leading-snug transition-colors ${on ? "text-ink" : "text-muted-ink"}`}>{s.title}</h3>
                <p className={`grid transition-all duration-500 ${on ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="overflow-hidden text-[15px] leading-relaxed text-muted-ink">{s.body}</span>
                </p>
                {on && playing && <span key={active} aria-hidden className="rp-step-timer absolute inset-x-0 bottom-0 h-0.5 origin-left bg-glow/70" style={{ animationDuration: `${STEP_MS}ms` }} />}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * The product as a bento grid: six tiles, each with a small live picture.
 * ──────────────────────────────────────────────────────────────────────────── */

function ChannelOrbit() {
  const icons = ["phone", "sms", "whatsapp", "instagram", "messenger", "email"] as const;
  return (
    <div className="relative mx-auto h-60 w-60">
      <div className="absolute inset-0 rounded-full border border-dashed border-white/10" />
      <div className="absolute inset-10 rounded-full border border-white/5" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet/20 shadow-[0_0_60px_-10px_rgba(124,107,255,0.9)]">
          <LogoMark className="h-8 w-8" />
        </div>
      </div>
      <div className="rp-orbit absolute inset-0">
        {icons.map((id, i) => {
          const angle = (i / icons.length) * Math.PI * 2;
          return (
            <span
              key={id}
              className="rp-orbit-item absolute"
              style={{ left: `calc(50% + ${Math.cos(angle) * 46}% - 22px)`, top: `calc(50% + ${Math.sin(angle) * 46}% - 22px)` }}
            >
              <ChannelLogo id={id} size={44} />
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** A small week of real-looking bookings, one of them just taken by the AI. */
const WEEK: { day: string; slots: { time: string; who: string; isNew?: boolean }[] }[] = [
  { day: "Mon", slots: [{ time: "9:00", who: "Sarah" }, { time: "11:30", who: "James" }] },
  { day: "Tue", slots: [{ time: "10:00", who: "Priya" }, { time: "2:15", who: "Mark" }, { time: "4:00", who: "Lena" }] },
  { day: "Wed", slots: [{ time: "9:30", who: "Omar" }, { time: "2:30", who: "Ana", isNew: true }] },
  { day: "Thu", slots: [{ time: "12:00", who: "Chris" }, { time: "3:45", who: "Mia" }] },
  { day: "Fri", slots: [{ time: "9:15", who: "Dan" }, { time: "1:00", who: "Zoe" }, { time: "5:30", who: "Leo" }] },
];

function MiniCalendar() {
  return (
    <div className="grid grid-cols-5 gap-1.5" aria-hidden>
      {WEEK.map((d) => (
        <div key={d.day} className="flex flex-col gap-1.5">
          <span className="text-center font-mono text-[10.5px] uppercase tracking-wider text-faint">{d.day}</span>
          {d.slots.map((s) => (
            <div key={s.time} className={`rounded-md px-1.5 py-1 text-[10.5px] leading-tight ${s.isNew ? "rp-slot-pulse bg-violet text-white" : "bg-white/[0.06] text-muted-ink"}`}>
              <span className={`block font-medium ${s.isNew ? "text-white" : "text-ink"}`}>{s.time}</span>
              {s.who}
              {s.isNew && <span className="block text-[9.5px] text-white/80">Booked by AI</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Post previews for different kinds of business: what the daily content looks like. */
const POST_TILES = [
  { business: "Hair salon", line: "Weekend slots still open", hue: 285 },
  { business: "Plumbing", line: "Same-day call-outs", hue: 205 },
  { business: "Dental", line: "New patients welcome", hue: 170 },
  { business: "Restaurant", line: "Friday tasting menu", hue: 22 },
  { business: "Gym", line: "First class on us", hue: 340 },
  { business: "Auto repair", line: "Service while you wait", hue: 45 },
];

function PostTile({ tile, delay = 0 }: { tile: (typeof POST_TILES)[number]; delay?: number }) {
  return (
    <div
      className="animate-bubble-in relative flex aspect-square flex-col justify-between overflow-hidden rounded-lg p-1.5"
      style={{
        background: `radial-gradient(120% 90% at 0% 0%, hsla(${tile.hue},85%,62%,0.55), transparent 60%), linear-gradient(140deg, hsl(${tile.hue},45%,24%), hsl(${tile.hue + 40},40%,12%))`,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-white/70">{tile.business}</span>
      <span className="text-[9.5px] font-semibold leading-tight text-white">{tile.line}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
    </div>
  );
}

function MiniBars() {
  return (
    <div className="flex h-24 items-end gap-2" aria-hidden>
      {[38, 52, 46, 70, 64, 88, 96].map((h, i) => (
        <div key={i} className="rp-bar flex-1 rounded-t-md bg-gradient-to-t from-violet/40 to-glow" style={{ ["--h" as string]: `${h}%`, animationDelay: `${i * 90}ms` }} />
      ))}
    </div>
  );
}

function Tile({ href, icon: Icon, title, body, className, children }: { href: string; icon: typeof PhoneCall; title: string; body: string; className?: string; children?: React.ReactNode }) {
  return (
    <SpotlightCard className={`group rounded-[28px] ${className ?? ""}`}>
      <Link href={href} className="relative z-[1] flex h-full flex-col gap-5 p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/15">
            <Icon aria-hidden className="h-5 w-5 text-glow" />
          </span>
          <ArrowRight aria-hidden className="h-4 w-4 text-faint transition-all group-hover:translate-x-1 group-hover:text-ink" />
        </div>
        {children && <div className="flex flex-1 items-center">{<div className="w-full">{children}</div>}</div>}
        <div>
          <h3 className="text-[19px] font-semibold text-ink">{title}</h3>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted-ink">{body}</p>
        </div>
      </Link>
    </SpotlightCard>
  );
}

export function HomeBento() {
  return (
    <div className="grid gap-4 md:grid-cols-6">
      <Tile href="/channels" icon={MessageSquareText} title="Every call and message, one front desk" body="Phone, texts, WhatsApp, Instagram, Messenger and email, answered day and night in your voice." className="md:col-span-3 md:row-span-2">
        <ChannelOrbit />
        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2" aria-hidden>
          {[
            { id: "whatsapp", from: "WhatsApp", text: "Are you free Saturday morning?", reply: "Answered in 4s" },
            { id: "instagram", from: "Instagram", text: "How much is a colour?", reply: "Answered in 3s" },
          ].map((m) => (
            <div key={m.id} className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-3 py-2.5">
              <ChannelLogo id={m.id} size={26} />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-faint">{m.from}</p>
                <p className="text-[13px] leading-snug text-ink">{m.text}</p>
              </div>
              <span className="shrink-0 rounded-full bg-success/15 px-2 py-0.5 text-[10.5px] text-success">{m.reply}</span>
            </div>
          ))}
        </div>
      </Tile>
      <Tile href="/product/booking" icon={CalendarCheck} title="Books into your calendar" body="Real availability, your services, your staff. Never a double booking." className="md:col-span-3">
        <MiniCalendar />
      </Tile>
      <Tile href="/product/ai-media" icon={ImagePlus} title="Fresh posts every morning" body="Made from your services, or your own photos. You approve; it posts." className="md:col-span-3">
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6" aria-hidden>
          {POST_TILES.map((t, i) => (
            <PostTile key={t.business} tile={t} delay={i * 120} />
          ))}
        </div>
      </Tile>
      <Tile href="/product#guardrails" icon={ShieldCheck} title="It never makes things up" body="Prices, times and bookings are checked against your own data before a reply goes out." className="md:col-span-2">
        <ul className="flex flex-col gap-2 text-[13px] text-muted-ink">
          {["Real prices only", "Real opening hours", "'Booked' only when it is"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check aria-hidden className="h-4 w-4 text-success" /> {t}
            </li>
          ))}
        </ul>
      </Tile>
      <Tile href="/product/reviews" icon={MessageSquareText} title="Replies to comments and reviews" body="Drafted in your brand's voice, for you to approve or put on autopilot." className="md:col-span-2">
        <div className="flex flex-col gap-2 text-[12.5px] leading-snug" aria-hidden>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <span className="text-[11px] tracking-[0.15em] text-amber-300">★★★★★</span>
            <p className="mt-1 text-muted-ink">Lovely cut, Maya was great!</p>
          </div>
          <div className="ml-5 flex items-center gap-1.5 rounded-xl bg-violet/15 px-3 py-2.5 text-glow">
            Drafting a reply
            {[0, 1, 2].map((d) => (
              <span key={d} className="animate-typing-dot h-1.5 w-1.5 rounded-full bg-glow" style={{ animationDelay: `${d * 160}ms` }} />
            ))}
          </div>
        </div>
      </Tile>
      <Tile href="/product/insights" icon={BarChart3} title="Shows you what's working" body="Calls, bookings, posts and reviews in one view, and an AI to ask." className="md:col-span-2">
        <MiniBars />
      </Tile>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────── */

export function HomeStats({ businessTypes }: { businessTypes: number }) {
  const stats: { node: React.ReactNode; label: string }[] = [
    { node: <span>24/7</span>, label: "Calls and messages answered" },
    { node: <CountUp to={6} />, label: "Channels in one inbox" },
    { node: <CountUp to={8} />, label: "Social platforms it posts to" },
    { node: <CountUp to={businessTypes} />, label: "Kinds of local business, set up for each" },
  ];
  return (
    <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-line bg-line lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="h-full bg-base p-6 sm:p-8">
          <p className="font-display text-[clamp(2.3rem,3.8vw,3.3rem)] leading-none text-ink">{s.node}</p>
          <p className="mt-3 text-[14px] text-muted-ink">{s.label}</p>
        </div>
      ))}
    </Stagger>
  );
}
