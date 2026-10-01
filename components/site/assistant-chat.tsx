"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { API_URL } from "@/lib/site";
import { SUGGESTIONS } from "@/lib/content/assistant";

/**
 * Zara's chat: RingPost's own assistant, answering questions about RingPost and nothing
 * else. The model runs in apps/api (/public/website-assistant/*) on its own key, grounded
 * on this site's generated knowledge; this component streams the reply and renders links
 * the server has already checked against the site's pages.
 *
 * The conversation is kept in sessionStorage, so it survives moving between pages and
 * reloads, and is gone when the visitor closes the tab.
 */

interface Msg {
  role: "user" | "assistant";
  text: string;
  pending?: boolean;
  error?: boolean;
}

const SESSION_KEY = "rp-zara-session";
const MESSAGES_KEY = "rp-zara-messages";
const GREETING = "Hi, I'm Zara, RingPost's AI assistant. Ask me anything about RingPost: what it does, the plans, or how it works with your business.";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: the chat still works, it just won't survive a reload */
  }
}

async function getSession(): Promise<string | null> {
  const saved = load<string | null>(SESSION_KEY, null);
  if (saved) return saved;
  const res = await fetch(`${API_URL}/public/website-assistant/session`);
  if (!res.ok) return null;
  const { sessionId } = (await res.json()) as { sessionId: string };
  save(SESSION_KEY, sessionId);
  return sessionId;
}

/** Renders [label](/path) links; the server only lets through paths that exist on this site. */
function RichText({ text, onNavigate }: { text: string; onNavigate?: () => void }) {
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\((\/[a-z0-9\-/#]*)\)/gi;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <Link key={m.index} href={m[2]} onClick={onNavigate} className="font-medium text-glow underline decoration-glow/40 underline-offset-2 hover:text-white">
        {m[1]}
      </Link>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function ZaraChat({
  ask,
  onLinkClick,
  className,
}: {
  /** A question to send as soon as it changes (a page button asked it). */
  ask?: { text: string; nonce: number } | null;
  /** Called when a link in a reply is followed. */
  onLinkClick?: () => void;
  className?: string;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState<string | null>(null);
  const session = useRef<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(load<Msg[]>(MESSAGES_KEY, []).filter((m) => !m.pending));
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
    if (!busy) save(MESSAGES_KEY, messages.slice(-40));
  }, [messages, busy]);

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
        update(() => ({ role: "assistant", text: "I couldn't answer just now. Try again in a moment, or reach the team on the [contact page](/contact).", error: true }));
      } finally {
        setBusy(false);
      }
    },
    [busy, closed],
  );

  useEffect(() => {
    if (ask?.text) void send(ask.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ask?.nonce]);

  return (
    <div className={`flex min-h-0 flex-col ${className ?? ""}`}>
      <div ref={scroller} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-5 py-5" aria-live="polite" aria-busy={busy}>
        <Bubble role="assistant">{GREETING}</Bubble>
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2 pl-1">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} className="min-h-10 rounded-full border border-line-strong bg-white/[0.03] px-3.5 text-left text-[13px] text-ink transition-colors hover:border-glow/50 hover:bg-violet/10">
                {s}
              </button>
            ))}
          </div>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.pending ? (
              <span className="flex gap-1 py-1.5" aria-label="Zara is typing">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="animate-typing-dot block h-1.5 w-1.5 rounded-full bg-glow" style={{ animationDelay: `${d * 140}ms` }} />
                ))}
              </span>
            ) : (
              <RichText text={m.text} onNavigate={onLinkClick} />
            )}
          </Bubble>
        ))}
        {closed && (
          <p className="rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-[13.5px] text-muted-ink">
            {closed}{" "}
            <Link href="/contact" onClick={onLinkClick} className="text-glow underline underline-offset-2">
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
        <label htmlFor="zara-input" className="sr-only">
          Message Zara
        </label>
        <input
          id="zara-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={600}
          disabled={Boolean(closed)}
          placeholder={closed ? "This chat has ended" : "Message Zara…"}
          className="min-h-12 flex-1 rounded-2xl border border-line-strong bg-base px-4 text-[15px] text-ink outline-none placeholder:text-faint focus:border-glow/60"
        />
        <button type="submit" disabled={busy || !text.trim() || Boolean(closed)} aria-label="Send" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet text-white transition-opacity disabled:opacity-40">
          <ArrowUp aria-hidden className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed ${
          role === "user" ? "rounded-br-md bg-violet text-white" : "rounded-bl-md border border-line-strong bg-white/[0.04] text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
