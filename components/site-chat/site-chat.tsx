"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, CalendarDays, ChevronDown, MessageCircle, Sparkles, UserRound, X } from "lucide-react";
import { PRICING } from "@/lib/site";

const API_URL = process.env.NEXT_PUBLIC_RINGPOST_API_URL ?? "https://api.ringpost.tech";
const STORE_KEY = "rp-site-chat-v1";
const NUDGE_KEY = "rp-site-chat-nudged";
const NUDGE_DELAY_MS = 30_000;
const HIDDEN_ON = ["/privacy", "/terms", "/acceptable-use", "/data-processing", "/ai-disclosure", "/data-deletion", "/refund-policy"];

type Mode = "ringpost" | "demo";
type CardKind = "pricing" | "demo" | "contact";

interface ChatMessage {
  id: string;
  role: "visitor" | "assistant";
  text: string;
  card?: CardKind;
  animate?: boolean;
}

interface Stored {
  sessionId: string;
  mode: Mode;
  open: boolean;
  threads: Record<Mode, ChatMessage[]>;
}

interface Slot {
  startsAt: string;
  staffId: string;
}

const WELCOME: Record<Mode, (demoName: string) => ChatMessage> = {
  ringpost: () => ({
    id: "welcome-ringpost",
    role: "assistant",
    text: "Hi! I'm RingPost's AI assistant. Ask me anything about how it works, what it costs, or whether it suits your business. I can also book you a free demo call.",
  }),
  demo: (demoName) => ({
    id: "welcome-demo",
    role: "assistant",
    text: `You're now chatting with ${demoName}'s AI receptionist. It's a sample business, so ask what a real customer would: prices, a free slot on Saturday, or book something in.`,
  }),
};

const CHIPS: Record<Mode, { label: string; send?: string; card?: CardKind; mode?: Mode }[]> = {
  ringpost: [
    { label: "How does it answer calls?", send: "How does RingPost answer calls?" },
    { label: "What does it cost?", send: "What does RingPost cost?" },
    { label: "Does it work in my country?", send: "Does RingPost work in my country?" },
    { label: "Try it live", mode: "demo" },
  ],
  demo: [
    { label: "Anything free on Saturday?", send: "Do you have anything free on Saturday?" },
    { label: "How much is a haircut?", send: "How much is a haircut?" },
    { label: "Back to RingPost", mode: "ringpost" },
  ],
};

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `s${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

function wantsPricing(text: string): boolean {
  return /\b(price|pricing|cost|costs|how much|fee|fees|plan|subscription|\$)\b/i.test(text);
}

function wantsDemo(text: string): boolean {
  return /\b(demo|call with|talk to (the )?founder|see it|walkthrough|book (a )?(call|meeting))\b/i.test(text);
}

function formatSlot(iso: string): { day: string; time: string } {
  const d = new Date(iso);
  return {
    day: d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }),
    time: d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }),
  };
}

function loadStored(): Stored | null {
  try {
    const raw = window.sessionStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function saveStored(value: Stored): void {
  try {
    window.sessionStorage.setItem(STORE_KEY, JSON.stringify(value));
  } catch {
    return;
  }
}

function RevealText({ text, animate }: { text: string; animate?: boolean }) {
  const words = useMemo(() => text.split(/(\s+)/), [text]);
  const [count, setCount] = useState(animate ? 0 : words.length);

  useEffect(() => {
    if (!animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(words.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 2;
      setCount(Math.min(words.length, i));
      if (i >= words.length) window.clearInterval(id);
    }, 38);
    return () => window.clearInterval(id);
  }, [animate, words.length]);

  return <>{words.slice(0, count).join("")}</>;
}

export function SiteChat() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.some((p) => pathname?.startsWith(p));

  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("ringpost");
  const [sessionId, setSessionId] = useState("");
  const [threads, setThreads] = useState<Record<Mode, ChatMessage[]>>({ ringpost: [], demo: [] });
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [demoName, setDemoName] = useState("a sample salon");
  const [available, setAvailable] = useState(true);
  const [nudge, setNudge] = useState(false);
  const [lite, setLite] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const stored = loadStored();
    if (stored) {
      setSessionId(stored.sessionId);
      setMode(stored.mode);
      setThreads(stored.threads);
      setOpen(stored.open);
    } else {
      setSessionId(newId());
    }
    const nav = navigator as Navigator & { deviceMemory?: number };
    setLite((nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4);
    setReady(true);

    fetch(`${API_URL}/public/site-chat/config`)
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg: { available: boolean; demoBusiness: string | null } | null) => {
        if (!cfg) return;
        setAvailable(cfg.available);
        if (cfg.demoBusiness) setDemoName(cfg.demoBusiness);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveStored({ sessionId, mode, open, threads: { ringpost: threads.ringpost.map((m) => ({ ...m, animate: false })), demo: threads.demo.map((m) => ({ ...m, animate: false })) } });
  }, [ready, sessionId, mode, open, threads]);

  useEffect(() => {
    if (!ready || pathname !== "/pricing") return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen || open) return;
    const id = window.setTimeout(() => {
      setNudge(true);
      try {
        window.localStorage.setItem(NUDGE_KEY, "1");
      } catch {
        return;
      }
    }, NUDGE_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [ready, pathname, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const messages = useMemo(() => [WELCOME[mode](demoName), ...threads[mode]], [mode, demoName, threads]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length, sending, open]);

  const push = useCallback((target: Mode, message: ChatMessage) => {
    setThreads((prev) => ({ ...prev, [target]: [...prev[target], message] }));
  }, []);

  const showCard = useCallback(
    (card: CardKind) => {
      const text =
        card === "demo"
          ? "Pick a time that suits you. It's a free 30-minute video call with the founder."
          : card === "contact"
            ? "Leave your details and a person from the team will get back to you, usually within one business day."
            : "Here's the pricing in full.";
      push("ringpost", { id: newId(), role: "assistant", text, card });
      setMode("ringpost");
    },
    [push],
  );

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const target = mode;
    setInput("");
    push(target, { id: newId(), role: "visitor", text: trimmed });
    setSending(true);
    try {
      const res = await fetch(`${API_URL}/public/site-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, text: trimmed, mode: target }),
      });
      const data = (await res.json().catch(() => null)) as { replyText?: string; degraded?: boolean; escalated?: boolean; limitReached?: boolean } | null;
      if (!res.ok || !data?.replyText) {
        const text = res.status === 429 ? "You're sending messages quickly. Give it a moment and try again." : "Something went wrong on our side. Try again, or leave your details and we'll get back to you.";
        push(target, { id: newId(), role: "assistant", text, card: res.status === 429 ? undefined : "contact" });
        return;
      }
      let card: CardKind | undefined;
      if (data.degraded || data.escalated || data.limitReached) card = "contact";
      else if (target === "ringpost" && wantsDemo(trimmed)) card = "demo";
      else if (target === "ringpost" && (wantsPricing(trimmed) || /\$1,699|\$899/.test(data.replyText))) card = "pricing";
      push(target, { id: newId(), role: "assistant", text: data.replyText, card, animate: true });
    } catch {
      push(target, { id: newId(), role: "assistant", text: "I couldn't reach the server. Check your connection and try again.", card: "contact" });
    } finally {
      setSending(false);
    }
  }

  function chip(c: (typeof CHIPS)[Mode][number]) {
    if (c.mode) {
      setMode(c.mode);
      return;
    }
    if (c.card) showCard(c.card);
    if (c.send) void send(c.send);
  }

  if (hidden || !ready) return null;

  const shellClass = lite ? "rp-glass rp-lite" : "rp-glass";

  return (
    <>
      {nudge && !open && (
        <button
          type="button"
          onClick={() => {
            setNudge(false);
            setOpen(true);
          }}
          className="rp-glass rp-nudge fixed bottom-[88px] right-5 z-[60] max-w-[240px] rounded-2xl px-4 py-3 text-left text-[13px] leading-snug text-foreground sm:right-6"
        >
          <span className="relative z-[1] block">Questions about setup or pricing? Ask me, I answer straight away.</span>
          <span
            role="button"
            aria-label="Dismiss"
            onClick={(e) => {
              e.stopPropagation();
              setNudge(false);
            }}
            className="absolute right-2 top-2 z-[2] rounded-full p-1 text-foreground/60 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </span>
        </button>
      )}

      <button
        type="button"
        aria-label={open ? "Close chat" : "Ask RingPost"}
        aria-expanded={open}
        onClick={() => {
          setNudge(false);
          setOpen((v) => !v);
        }}
        className={`${shellClass} rp-launcher fixed bottom-5 right-5 z-[60] flex h-14 items-center gap-2.5 rounded-full pl-2 pr-5 text-[14px] font-medium text-foreground sm:bottom-6 sm:right-6 ${open ? "rp-launcher-open" : ""}`}
      >
        <span className="relative z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-pink)] via-[var(--brand-violet)] to-[var(--brand-cyan)] text-[#1b1024] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
          {open ? <ChevronDown className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </span>
        <span className="relative z-[1]">{open ? "Close" : "Ask RingPost"}</span>
      </button>

      <section
        role="dialog"
        aria-label="RingPost assistant"
        aria-hidden={!open}
        inert={!open}
        className={`${shellClass} rp-panel fixed z-[70] flex flex-col sm:z-[60] overflow-hidden text-foreground ${open ? "rp-panel-open" : ""} inset-0 sm:inset-auto sm:bottom-[92px] sm:right-6 sm:h-[min(620px,calc(100vh-176px))] sm:w-[400px] sm:rounded-[28px]`}
      >
        <div aria-hidden="true" className="rp-glow pointer-events-none absolute inset-0 overflow-hidden">
          <span className="rp-blob rp-blob-a" />
          <span className="rp-blob rp-blob-b" />
          <span className="rp-blob rp-blob-c" />
        </div>

        <header className="relative z-[1] flex items-center gap-3 border-b border-white/10 px-4 pb-3 pt-[max(12px,env(safe-area-inset-top))] sm:pt-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-pink)] via-[var(--brand-violet)] to-[var(--brand-cyan)] text-[#1b1024]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold tracking-tight">{mode === "demo" ? demoName : "RingPost"}</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-foreground/80">
                {mode === "demo" ? "Live demo" : "AI assistant"}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-foreground/65">
              <span className={`h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-400" : "bg-amber-400"}`} />
              {available ? "Replies in seconds" : "Leave a message"}
            </div>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-white/10 hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="relative z-[1] flex gap-1 px-4 pt-3">
          {(["ringpost", "demo"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${mode === m ? "bg-white/[0.16] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]" : "text-foreground/65 hover:text-foreground"}`}
            >
              {m === "ringpost" ? "Ask about RingPost" : "Try it live"}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="relative z-[1] flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-live="polite">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex flex-col gap-2 ${m.role === "visitor" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[86%] whitespace-pre-wrap rounded-[20px] px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    m.role === "visitor"
                      ? "rounded-br-md bg-gradient-to-br from-[var(--brand-pink)] to-[var(--brand-violet)] text-[#1b1024]"
                      : "rp-bubble rounded-bl-md text-foreground"
                  }`}
                >
                  {m.role === "assistant" ? <RevealText text={m.text} animate={m.animate} /> : m.text}
                </div>
                {m.card === "pricing" && <PricingCard onDemo={() => showCard("demo")} />}
                {m.card === "demo" && <DemoCard sessionId={sessionId} onBooked={(text) => push("ringpost", { id: newId(), role: "assistant", text })} />}
                {m.card === "contact" && <ContactCard sessionId={sessionId} onSent={(text) => push("ringpost", { id: newId(), role: "assistant", text })} />}
              </div>
            ))}
            {sending && (
              <div className="rp-bubble flex w-fit items-center gap-1 rounded-[20px] rounded-bl-md px-4 py-3" aria-label="Typing">
                <span className="rp-dot" />
                <span className="rp-dot" style={{ animationDelay: "120ms" }} />
                <span className="rp-dot" style={{ animationDelay: "240ms" }} />
              </div>
            )}
          </div>

          {threads[mode].length === 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {CHIPS[mode].map((c) => (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => chip(c)}
                  className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[12.5px] text-foreground/90 transition-colors hover:bg-white/[0.16]"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative z-[1] border-t border-white/10 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-2.5">
          <div className="mb-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => showCard("demo")}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] text-foreground/75 transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Book a demo
            </button>
            <button
              type="button"
              onClick={() => showCard("contact")}
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] text-foreground/75 transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <UserRound className="h-3.5 w-3.5" />
              Talk to a person
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="rp-input flex items-end gap-2 rounded-[22px] p-1.5 pl-3.5"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={800}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder={mode === "demo" ? `Message ${demoName}…` : "Ask anything about RingPost…"}
              aria-label="Your message"
              className="max-h-28 min-h-[36px] flex-1 resize-none bg-transparent py-2 text-[14px] text-foreground outline-none placeholder:text-foreground/45"
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-pink)] to-[var(--brand-violet)] text-[#1b1024] transition-opacity disabled:opacity-35"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-2 text-center text-[10.5px] text-foreground/50">
            You&apos;re chatting with an AI. Chats are kept for 12 months.{" "}
            <Link href="/privacy#website-chat" className="underline underline-offset-2 hover:text-foreground/80">
              Privacy
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

function PricingCard({ onDemo }: { onDemo: () => void }) {
  return (
    <div className="rp-card w-[86%] rounded-2xl p-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/60">{PRICING.setup.label}</div>
          <div className="mt-1 font-display text-3xl tracking-tight">
            {PRICING.currency}
            {PRICING.setup.amount.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/60">{PRICING.monthly.label}</div>
          <div className="mt-1 font-display text-3xl tracking-tight">
            {PRICING.currency}
            {PRICING.monthly.amount}
            <span className="font-sans text-[13px] text-foreground/60">/mo</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-foreground/70">No contract, cancel any time. Unlimited calls and messages.</p>
      <div className="mt-3 flex gap-2">
        <Link href="/pricing" className="rounded-full border border-white/20 px-3 py-1.5 text-[12px] hover:bg-white/10">
          See what&apos;s included
        </Link>
        <button type="button" onClick={onDemo} className="rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-[#1b1024] hover:bg-white">
          Book a free demo
        </button>
      </div>
    </div>
  );
}

function DemoCard({ sessionId, onBooked }: { sessionId: string; onBooked: (text: string) => void }) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [chosen, setChosen] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [business, setBusiness] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/public/site-chat/demo-slots`)
      .then((r) => (r.ok ? r.json() : { slots: [] }))
      .then((d: { slots: Slot[] }) => setSlots(d.slots))
      .catch(() => setSlots([]));
  }, []);

  async function book() {
    if (!chosen || !name.trim() || contact.trim().length < 5) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/public/site-chat/book-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, startsAt: chosen.startsAt, staffId: chosen.staffId, name, contact, business: business || undefined }),
      });
      if (!res.ok) {
        setError(res.status === 409 ? "That time was just taken. Pick another one." : "Couldn't book that. Please try again.");
        if (res.status === 409) setChosen(null);
        return;
      }
      setDone(true);
      const when = formatSlot(chosen.startsAt);
      onBooked(`You're booked for ${when.day} at ${when.time}. We'll send the video link to ${contact}. Looking forward to it!`);
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) return null;

  const byDay = new Map<string, Slot[]>();
  for (const s of slots ?? []) {
    const { day } = formatSlot(s.startsAt);
    byDay.set(day, [...(byDay.get(day) ?? []), s]);
  }

  return (
    <div className="rp-card w-[92%] rounded-2xl p-4">
      {slots === null ? (
        <p className="text-[12.5px] text-foreground/70">Finding free times…</p>
      ) : slots.length === 0 ? (
        <p className="text-[12.5px] text-foreground/70">No times are open this week. Use Talk to a person and we&apos;ll find one with you.</p>
      ) : !chosen ? (
        <div className="flex flex-col gap-3">
          {[...byDay.entries()].map(([day, daySlots]) => (
            <div key={day}>
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/60">{day}</div>
              <div className="flex flex-wrap gap-1.5">
                {daySlots.map((s) => (
                  <button
                    key={s.startsAt}
                    type="button"
                    onClick={() => setChosen(s)}
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-[12.5px] hover:bg-white/[0.16]"
                  >
                    {formatSlot(s.startsAt).time}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <p className="text-[10.5px] text-foreground/50">Times shown in your time zone.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[12.5px]">
            <span>
              {formatSlot(chosen.startsAt).day}, {formatSlot(chosen.startsAt).time}
            </span>
            <button type="button" onClick={() => setChosen(null)} className="text-[11.5px] text-foreground/60 underline">
              Change
            </button>
          </div>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rp-field" aria-label="Your name" />
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Email or phone" className="rp-field" aria-label="Email or phone" />
          <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your business (optional)" className="rp-field" aria-label="Your business" />
          {error && <p className="text-[12px] text-rose-300">{error}</p>}
          <button
            type="button"
            disabled={busy || !name.trim() || contact.trim().length < 5}
            onClick={book}
            className="mt-1 rounded-full bg-white/90 px-3 py-2 text-[12.5px] font-medium text-[#1b1024] disabled:opacity-40"
          >
            {busy ? "Booking…" : "Confirm demo call"}
          </button>
        </div>
      )}
    </div>
  );
}

function ContactCard({ sessionId, onSent }: { sessionId: string; onSent: (text: string) => void }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [business, setBusiness] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    if (!name.trim() || contact.trim().length < 5) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/public/site-chat/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, name, contact, business: business || undefined, message: message || undefined }),
      });
      if (!res.ok) {
        setError("Couldn't send that. Please try again.");
        return;
      }
      setDone(true);
      onSent(`Thanks ${name.split(" ")[0]}, the team has your message and will get back to you at ${contact}, usually within one business day.`);
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) return null;

  return (
    <div className="rp-card flex w-[92%] flex-col gap-2 rounded-2xl p-4">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rp-field" aria-label="Your name" />
      <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Email or phone" className="rp-field" aria-label="Email or phone" />
      <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Your business (optional)" className="rp-field" aria-label="Your business" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to ask?" rows={2} className="rp-field resize-none" aria-label="Your message" />
      {error && <p className="text-[12px] text-rose-300">{error}</p>}
      <button
        type="button"
        disabled={busy || !name.trim() || contact.trim().length < 5}
        onClick={submit}
        className="mt-1 rounded-full bg-white/90 px-3 py-2 text-[12.5px] font-medium text-[#1b1024] disabled:opacity-40"
      >
        {busy ? "Sending…" : "Send to the team"}
      </button>
    </div>
  );
}
