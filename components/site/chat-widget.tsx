"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { ZaraChat } from "@/components/site/assistant-chat";
import { ZaraCall, ZaraOrb } from "@/components/site/zara";

/**
 * Zara on every page: a launcher in the bottom-right corner that opens her panel, with
 * Chat and Call. It lives in the root layout, so a conversation survives moving between
 * pages (and, through sessionStorage, reloads) until the tab is closed.
 *
 * When someone first arrives, Zara opens by herself once per visit (on a phone, a small
 * greeting bubble instead of a full-screen panel), with a soft chime where the browser
 * allows sound before the visitor has interacted. A click anywhere outside collapses her.
 * Any page can open her with <OpenChatButton> or openAssistant().
 */

const OPEN_EVENT = "rp:open-assistant";
const GREETED_KEY = "rp-zara-greeted";

export function openAssistant(question?: string, mode: "chat" | "call" = "chat") {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question, mode } }));
}

/** Two soft notes. Browsers only allow sound after an interaction; if they refuse, silence. */
function chime() {
  try {
    const ac = new AudioContext();
    if (ac.state === "suspended") {
      void ac.close();
      return;
    }
    const now = ac.currentTime;
    for (const [i, f] of [659.25, 987.77].entries()) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, now + i * 0.12);
      g.gain.linearRampToValueAtTime(0.06, now + i * 0.12 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.6);
      o.connect(g).connect(ac.destination);
      o.start(now + i * 0.12);
      o.stop(now + i * 0.12 + 0.65);
    }
    setTimeout(() => void ac.close(), 1200);
  } catch {
    /* no sound */
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"chat" | "call">("chat");
  const [bubble, setBubble] = useState(false);
  const [ask, setAsk] = useState<{ text: string; nonce: number } | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const show = useCallback((m: "chat" | "call" = "chat") => {
    setMounted(true);
    setMode(m);
    setOpen(true);
    setBubble(false);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Open when a page asks (a "Chat with Zara" or "Call Zara" button).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ question?: string; mode?: "chat" | "call" }>).detail;
      show(d?.mode ?? "chat");
      if (d?.question) setAsk({ text: d.question, nonce: Date.now() });
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show]);

  // Say hello once per visit.
  useEffect(() => {
    let greeted = false;
    try {
      greeted = sessionStorage.getItem(GREETED_KEY) === "1";
      sessionStorage.setItem(GREETED_KEY, "1");
    } catch {
      /* ignore */
    }
    if (greeted) return;
    const t = setTimeout(() => {
      if (window.matchMedia("(max-width: 639px)").matches) setBubble(true);
      else show("chat");
      chime();
    }, 2200);
    return () => clearTimeout(t);
  }, [show]);

  // Escape, or a click anywhere outside Zara, collapses her.
  useEffect(() => {
    if (!open && !bubble) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setBubble(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panel.current?.contains(target) || launcher.current?.contains(target)) return;
      if ((target as HTMLElement).closest?.("[data-zara-open]")) return;
      setOpen(false);
      setBubble(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, bubble]);

  // On a phone the panel covers the screen, so following a link closes it.
  const onLinkClick = useCallback(() => {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  }, []);

  return (
    <>
      {mounted && (
        <div
          ref={panel}
          role="dialog"
          aria-label="Zara, RingPost's AI assistant"
          aria-hidden={!open}
          inert={!open}
          className={`fixed z-[70] flex flex-col overflow-hidden border-line-strong bg-surface shadow-[0_30px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 ease-out max-sm:inset-0 max-sm:pb-[env(safe-area-inset-bottom)] sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-3xl sm:border ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <ZaraOrb size={38} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-ink">Zara</p>
              <p className="text-[12.5px] text-muted-ink">RingPost&apos;s AI assistant</p>
            </div>
            <div className="flex rounded-full border border-line-strong p-0.5" role="tablist" aria-label="Chat or call">
              {(["chat", "call"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium transition-colors ${mode === m ? "bg-violet text-white" : "text-muted-ink hover:text-ink"}`}
                >
                  {m === "chat" ? <MessageCircle aria-hidden className="h-3.5 w-3.5" /> : <Phone aria-hidden className="h-3.5 w-3.5" />}
                  {m === "chat" ? "Chat" : "Call"}
                </button>
              ))}
            </div>
            <button type="button" onClick={close} aria-label="Close Zara" className="flex h-9 w-9 items-center justify-center rounded-full text-muted-ink hover:text-ink">
              <X aria-hidden className="h-4.5 w-4.5" />
            </button>
          </div>

          {mode === "chat" ? (
            <ZaraChat ask={ask} onLinkClick={onLinkClick} className="flex-1" />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8">
              <ZaraCall size="md" />
              <p className="max-w-xs text-center text-[13px] leading-relaxed text-faint">Ask her about RingPost, the plans or how it would work for your business.</p>
            </div>
          )}

          <div className="border-t border-line px-4 py-2.5 text-center text-[12.5px] text-muted-ink">
            Rather talk to a person?{" "}
            <Link href="/contact" onClick={onLinkClick} className="text-glow hover:text-white">
              Contact the team
            </Link>
          </div>
        </div>
      )}

      {bubble && !open && (
        <div className="animate-rise fixed bottom-24 right-5 z-[71] w-[min(300px,calc(100vw-2.5rem))] rounded-2xl border border-line-strong bg-surface p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)]">
          <p className="text-[14px] leading-relaxed text-ink">Hi, I&apos;m Zara. Ask me anything about RingPost, or give me a call.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => show("chat")} className="flex-1 rounded-full bg-violet px-3 py-2 text-[13px] font-medium text-white">
              Chat
            </button>
            <button type="button" onClick={() => show("call")} className="flex-1 rounded-full border border-line-strong px-3 py-2 text-[13px] font-medium text-ink">
              Call
            </button>
          </div>
        </div>
      )}

      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close Zara" : "Talk to Zara"}
        onClick={() => (open ? close() : show(mode))}
        className={`fixed bottom-5 right-5 z-[71] flex h-14 items-center justify-center gap-2.5 rounded-full border border-white/10 bg-[#1b1830] shadow-[0_18px_50px_-12px_rgba(124,107,255,0.9)] transition-all duration-200 hover:border-glow/50 max-sm:w-14 sm:bottom-6 sm:right-6 sm:pl-2 sm:pr-5 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {open ? <X aria-hidden className="h-5 w-5 text-white sm:ml-3" /> : <ZaraOrb size={40} />}
        <span className="text-[14.5px] font-medium text-white max-sm:sr-only">{open ? "Close" : "Talk to Zara"}</span>
      </button>
    </>
  );
}

/** Opens Zara from any page, optionally asking a question or starting on Call. */
export function OpenChatButton({ children, question, mode = "chat", className }: { children: React.ReactNode; question?: string; mode?: "chat" | "call"; className?: string }) {
  return (
    <button type="button" data-zara-open onClick={() => openAssistant(question, mode)} className={className}>
      {children}
    </button>
  );
}
