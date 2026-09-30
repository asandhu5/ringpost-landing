"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { API_URL } from "@/lib/site";

/**
 * The RingPost assistant: RingPost's own front desk, answering questions about RingPost
 * and nothing else. The model runs in apps/api (/public/website-assistant/*) on its own
 * OpenAI key, grounded on this site's generated knowledge; this component only streams
 * the reply and renders links the server has already checked against the site's pages.
 */

export const SUGGESTIONS = ["What does it cost?", "Does it work with Instagram?", "What happens if it doesn't know the answer?", "Can I keep my phone number?"];

interface Msg {
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
  error?: boolean;
}

const SESSION_KEY = "rp-assistant-session";

async function getSession(): Promise<string | null> {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) return saved;
  } catch {
    /* storage unavailable: fall through to a fresh session */
  }
  const res = await fetch(`${API_URL}/public/website-assistant/session`, { method: "GET" });
  if (!res.ok) return null;
  const { sessionId } = (await res.json()) as { sessionId: string };
  try {
    sessionStorage.setItem(SESSION_KEY, sessionId);
  } catch {
    /* ignore */
  }
  return sessionId;
}

/** Renders [label](/path) links; the server only lets through paths that exist on this site. */
function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[a-z0-9\-/#]*)\)/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} href={m[2]} className="font-medium text-glow underline decoration-glow/40 underline-offset-2 hover:text-white">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function AssistantChat({ variant = "compact", className }: { variant?: "compact" | "full"; className?: string }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState<string | null>(null);
  const session = useRef<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = useCallback(
    async (raw: string) => {
      const q = raw.trim();
      if (!q || busy || closed) return;
      setText("");
      setBusy(true);
      setMessages((m) => [...m, { role: "user", text: q }, { role: "assistant", text: "", pending: true }]);
      const update = (fn: (msg: Msg) => Msg) =>
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = fn(copy[copy.length - 1]);
          return copy;
        });
      try {
        session.current = session.current ?? (await getSession());
        if (!session.current) throw new Error("no_session");
        const res = await fetch(`${API_URL}/public/website-assistant/chat`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: session.current, text: q }),
        });
        if (res.status === 401) {
          // The session expired: start a new one next time.
          try {
            sessionStorage.removeItem(SESSION_KEY);
          } catch {
            /* ignore */
          }
          session.current = null;
        }
        if (!res.ok || !res.body) throw new Error(`http_${res.status}`);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          let nl: number;
          while ((nl = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            const evt = JSON.parse(line) as { type: "delta" | "replace" | "done"; text?: string; limitReached?: boolean };
            if (evt.type === "delta") update((msg) => ({ ...msg, text: msg.text + (evt.text ?? ""), pending: false }));
            if (evt.type === "replace") update((msg) => ({ ...msg, text: evt.text ?? "", pending: false }));
            if (evt.type === "done" && evt.limitReached) setClosed("That's the end of this chat. For anything else, the team is one click away.");
          }
        }
        update((msg) => ({ ...msg, pending: false }));
      } catch {
        update(() => ({
          role: "assistant",
          text: "I couldn't reach the assistant just now. You can try again in a moment, or reach a person on the [contact page](/contact).",
          error: true,
        }));
      } finally {
        setBusy(false);
      }
    },
    [busy, closed],
  );

  const full = variant === "full";
  return (
    <div className={`rp-card flex flex-col overflow-hidden rounded-3xl ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet/20 text-glow">
            <MessageCircle aria-hidden className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="text-[14.5px] font-medium text-ink">Ask RingPost</p>
            <p className="text-[12px] text-muted-ink">Our own front desk, running on RingPost</p>
          </div>
        </div>
        <Link href="/contact" className="shrink-0 text-[12.5px] text-muted-ink underline-offset-2 hover:text-ink hover:underline">
          Talk to a person
        </Link>
      </div>

      <div ref={scroller} className={`flex flex-col gap-3 overflow-y-auto px-5 py-5 ${full ? "h-[440px]" : "h-[320px]"}`} aria-live="polite" aria-busy={busy}>
        {messages.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[14px] leading-relaxed text-muted-ink">Ask anything about RingPost: what it does, the plans and the trial, the channels it works with, or how your data is handled.</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="min-h-10 rounded-full border border-line-strong bg-white/[0.03] px-3.5 text-left text-[13px] text-ink transition-colors hover:border-glow/50 hover:bg-violet/10">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
                m.role === "user" ? "rounded-br-md bg-violet text-white" : "rounded-bl-md border border-line-strong bg-white/[0.04] text-ink"
              }`}
            >
              {m.pending ? (
                <span className="flex gap-1 py-1.5" aria-label="Writing a reply">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="animate-typing-dot block h-1.5 w-1.5 rounded-full bg-glow" style={{ animationDelay: `${d * 140}ms` }} />
                  ))}
                </span>
              ) : (
                <RichText text={m.text} />
              )}
            </div>
          </div>
        ))}
        {closed && (
          <p className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[13.5px] text-muted-ink">
            {closed}{" "}
            <Link href="/contact" className="text-glow underline underline-offset-2">
              Contact us
            </Link>
          </p>
        )}
      </div>

      <form
        className="flex items-end gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          void send(text);
        }}
      >
        <label htmlFor={`assistant-input-${variant}`} className="sr-only">
          Ask a question about RingPost
        </label>
        <input
          id={`assistant-input-${variant}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={600}
          disabled={Boolean(closed)}
          placeholder={closed ? "This chat has ended" : "Ask about RingPost…"}
          className="min-h-12 flex-1 rounded-2xl border border-line-strong bg-base px-4 text-[15px] text-ink outline-none placeholder:text-faint focus:border-glow/60"
        />
        <button type="submit" disabled={busy || !text.trim() || Boolean(closed)} aria-label="Send" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cta text-[#1a0d08] transition-opacity disabled:opacity-40">
          <ArrowUp aria-hidden className="h-5 w-5" />
        </button>
      </form>
      <p className="px-5 pb-4 text-[11.5px] leading-relaxed text-faint">
        An AI assistant that answers questions about RingPost only. It can be wrong; the <Link href="/pricing" className="underline underline-offset-2">pricing</Link> and legal pages are the final word.
      </p>
    </div>
  );
}
