"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ZaraChat } from "@/components/site/assistant-chat";
import { ZaraOrb } from "@/components/site/zara";

/**
 * Zara on every page: a launcher in the bottom-right corner that opens her panel, with
 * Chat and Call. It lives in the root layout, so a conversation survives moving between
 * pages (and, through sessionStorage, reloads) until the tab is closed.
 *
 * When someone first arrives, Zara never opens by herself. Once per visit she plays a
 * soft chime and her launcher pulses, so she is noticed without covering the page.
 * Browsers only allow sound after the visitor has interacted, so if the chime is refused
 * it plays on their first tap or key press instead. A click anywhere outside collapses
 * her. Any page can open her with <OpenChatButton> or openAssistant().
 */

const OPEN_EVENT = "rp:open-assistant";
const GREETED_KEY = "rp-zara-greeted";

/** Opens Zara's chat, optionally with a question already asked. */
export function openAssistant(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question } }));
}

/** Two soft notes. Returns false when the browser refuses sound (no interaction yet). */
function chime(): boolean {
  try {
    const ac = new AudioContext();
    if (ac.state === "suspended") {
      void ac.close();
      return false;
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
    return true;
  } catch {
    return false;
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [ask, setAsk] = useState<{ text: string; nonce: number } | null>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const show = useCallback(() => {
    setMounted(true);
    setOpen(true);
    setNudge(false);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Open when a page asks (a "Chat with Zara" button).
  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ question?: string }>).detail;
      show();
      if (d?.question) setAsk({ text: d.question, nonce: Date.now() });
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show]);

  // Say hello once per visit: a chime and a pulsing launcher, never an opened panel.
  useEffect(() => {
    let greeted = false;
    try {
      greeted = sessionStorage.getItem(GREETED_KEY) === "1";
      sessionStorage.setItem(GREETED_KEY, "1");
    } catch {
      /* ignore */
    }
    if (greeted) return;
    let waiting = false;
    const onFirstInteraction = () => {
      chime();
      stopWaiting();
    };
    const stopWaiting = () => {
      if (!waiting) return;
      waiting = false;
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("keydown", onFirstInteraction);
    };
    const t = setTimeout(() => {
      setNudge(true);
      if (chime()) return;
      waiting = true;
      window.addEventListener("pointerdown", onFirstInteraction, { once: true });
      window.addEventListener("keydown", onFirstInteraction, { once: true });
    }, 2200);
    const stopNudge = setTimeout(() => setNudge(false), 2200 + 12_000);
    return () => {
      clearTimeout(t);
      clearTimeout(stopNudge);
      stopWaiting();
    };
  }, []);

  // Escape, or a click anywhere outside Zara, collapses her.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panel.current?.contains(target) || launcher.current?.contains(target)) return;
      if ((target as HTMLElement).closest?.("[data-zara-open]")) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

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
          className={`fixed z-[70] flex flex-col overflow-hidden border-line-strong bg-surface shadow-[0_30px_100px_-20px_rgba(11,27,43,0.45)] transition-all duration-300 ease-out max-sm:inset-0 max-sm:pb-[env(safe-area-inset-bottom)] sm:bottom-24 sm:right-6 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-3xl sm:border ${
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
            <ZaraOrb size={38} />
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-ink">Zara</p>
              <p className="text-[12.5px] text-muted-ink">RingPost&apos;s AI assistant</p>
            </div>
            <button type="button" onClick={close} aria-label="Close Zara" className="flex h-9 w-9 items-center justify-center rounded-full text-muted-ink hover:text-ink">
              <X aria-hidden className="h-4.5 w-4.5" />
            </button>
          </div>

          <ZaraChat ask={ask} onLinkClick={onLinkClick} className="flex-1" />

          <div className="border-t border-line px-4 py-2.5 text-center text-[12.5px] text-muted-ink">
            Rather talk to a person?{" "}
            <Link href="/contact" onClick={onLinkClick} className="text-glow hover:text-ink">
              Contact the team
            </Link>
          </div>
        </div>
      )}

      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close the chat" : "Ask a question"}
        onClick={() => (open ? close() : show())}
        className={`fixed bottom-5 right-5 z-[71] flex h-14 items-center justify-center gap-2.5 rounded-full border border-line bg-[#0b1b2b] shadow-[0_18px_50px_-12px_rgba(11,27,43,0.55)] transition-all duration-200 hover:border-glow/50 max-sm:w-14 sm:bottom-6 sm:right-6 sm:pl-2 sm:pr-5 ${
          open ? "max-sm:hidden" : ""
        }`}
      >
        {nudge && !open && (
          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-glow/70 motion-safe:animate-ping" />
        )}
        {open ? <X aria-hidden className="h-5 w-5 text-white sm:ml-3" /> : <ZaraOrb size={40} />}
        <span className="text-[14.5px] font-medium text-white max-sm:sr-only">{open ? "Close" : "Ask a question"}</span>
      </button>
    </>
  );
}

/** Opens Zara from any page, optionally asking a question or starting on Call. */
export function OpenChatButton({ children, question, className }: { children: React.ReactNode; question?: string; className?: string }) {
  return (
    <button type="button" data-zara-open onClick={() => openAssistant(question)} className={className}>
      {children}
    </button>
  );
}
