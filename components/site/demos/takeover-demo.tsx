"use client";

import { useState } from "react";
import { Bot, CornerUpLeft, Hand, Send, UserRound } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { cx } from "@/components/site/ui/cx";
import { Chip } from "@/components/site/ui/primitives";

type Who = "customer" | "ai" | "you" | "note";
interface Msg {
  who: Who;
  text: string;
}

const THREADS = [
  { id: "instagram", label: "Instagram DM", who: "New customer", preview: "Can I speak to the owner about a wedding booking?", needs: true, start: [{ who: "customer", text: "Can I speak to the owner about a wedding booking? There are eight of us." }, { who: "ai", text: "Congratulations! I'm passing this to the owner now. They'll reply here shortly." }] as Msg[], yours: "Hi, it's the owner. Congratulations! For eight I'd open early on the day. Shall I hold Saturday the 14th from 8 am?", after: "I've noted the wedding party for Saturday the 14th at 8:00 am. I'll send everyone a reminder the day before." },
  { id: "whatsapp", label: "WhatsApp", who: "Returning customer", preview: "Is my color appointment still on for Friday?", needs: false, start: [{ who: "customer", text: "Is my color appointment still on for Friday?" }, { who: "ai", text: "Yes, you're booked for Friday at 2:00 pm. See you then!" }] as Msg[], yours: "Hi, it's the owner. Yes, all set for Friday. Bring a photo of the shade you'd like.", after: "I'll remind you on Thursday. See you Friday at 2:00 pm." },
  { id: "email", label: "Email", who: "New customer", preview: "Do you offer gift vouchers?", needs: false, start: [{ who: "customer", text: "Do you offer gift vouchers?" }, { who: "ai", text: "Yes, from $25. I can email one to you or to the person it's for." }] as Msg[], yours: "Hi, it's the owner. We can also do a printed voucher if you'd like to pick it up.", after: "Just reply with the amount and I'll get it ready." },
];

/**
 * The inbox page's centrepiece: open a conversation, press Take over, and the AI steps
 * back; send your reply; press Hand back and the AI carries on. Every state is spelled
 * out in words, not only in color.
 */
export function TakeOverDemo() {
  const [open, setOpen] = useState(0);
  const [state, setState] = useState<Record<number, { mode: "ai" | "you"; extra: Msg[]; sent: boolean }>>({});
  const t = THREADS[open];
  const s = state[open] ?? { mode: "ai", extra: [], sent: false };
  const set = (next: Partial<typeof s>) => setState((all) => ({ ...all, [open]: { ...s, ...next } }));

  const takeOver = () => set({ mode: "you", extra: [...s.extra, { who: "note", text: "You took over. The AI has stepped back from this conversation." }] });
  const send = () => set({ sent: true, extra: [...s.extra, { who: "you", text: t.yours }] });
  const handBack = () => set({ mode: "ai", extra: [...s.extra, { who: "note", text: "You handed it back. The AI is answering again." }, { who: "ai", text: t.after }] });
  const reset = () => setState((all) => ({ ...all, [open]: { mode: "ai", extra: [], sent: false } }));

  const msgs = [...t.start, ...s.extra];
  return (
    <div className="overflow-hidden rounded-rp-md border border-line bg-white shadow-rp-3">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)]">
        <ul className="border-b border-line p-2 md:border-b-0 md:border-r" aria-label="Conversations">
          {THREADS.map((x, i) => (
            <li key={x.id}>
              <button type="button" aria-pressed={i === open} onClick={() => setOpen(i)} className={cx("flex w-full items-center gap-3 rounded-rp-sm p-3 text-left transition-colors duration-200", i === open ? "bg-primary-soft" : "hover:bg-surface-2")}>
                <ChannelLogo id={x.id} size={32} />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-small font-semibold text-ink">{x.label} · {x.who}</span>
                  <span className="block truncate text-[13px] text-muted-ink">{x.preview}</span>
                </span>
                {x.needs && !(state[i]?.sent) && <Chip tone="amber">Needs you</Chip>}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex min-h-[420px] flex-col bg-base/60">
          <div className="flex flex-wrap items-center gap-2.5 border-b border-line bg-white px-4 py-3">
            <ChannelLogo id={t.id} size={28} />
            <span className="text-small font-semibold text-ink">{t.label}</span>
            <span aria-live="polite" className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold", s.mode === "ai" ? "bg-grow-soft text-grow" : "bg-amber-soft text-amber")}>
              {s.mode === "ai" ? <Bot className="h-3.5 w-3.5" aria-hidden /> : <UserRound className="h-3.5 w-3.5" aria-hidden />}
              {s.mode === "ai" ? "AI is answering" : "You are answering · AI paused"}
            </span>
            <span className="ml-auto flex gap-2">
              {s.mode === "ai" ? (
                <button type="button" onClick={takeOver} className="rp-btn inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-small font-semibold text-white">
                  <Hand className="h-4 w-4" aria-hidden /> Take over
                </button>
              ) : (
                <button type="button" onClick={handBack} className="rp-btn inline-flex h-10 items-center gap-2 rounded-full border border-line-strong bg-white px-4 text-small font-semibold text-ink">
                  <CornerUpLeft className="h-4 w-4" aria-hidden /> Hand back
                </button>
              )}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
            {msgs.map((m, i) =>
              m.who === "note" ? (
                <p key={i} className="rp-msg-in self-center rounded-full bg-surface-2 px-3 py-1.5 text-center text-[12.5px] font-medium text-muted-ink">{m.text}</p>
              ) : (
                <div key={i} className={cx("rp-msg-in max-w-[82%]", m.who === "customer" ? "self-start" : "self-end")}>
                  <p className={cx("rounded-rp-md px-3.5 py-2.5 text-[14.5px] leading-snug", m.who === "customer" ? "rounded-bl-md border border-line bg-white text-ink" : m.who === "ai" ? "rounded-br-md bg-violet text-white" : "rounded-br-md bg-ink text-white")}>{m.text}</p>
                  <p className={cx("mt-1 text-[11.5px] text-muted-ink", m.who !== "customer" && "text-right")}>{m.who === "customer" ? "Customer" : m.who === "ai" ? "AI" : "You"}</p>
                </div>
              ),
            )}
          </div>
          <div className="m-3 mt-0 flex items-center gap-2 rounded-rp-sm border border-line bg-white p-2 pl-3.5">
            <p className="min-w-0 flex-1 text-small text-muted-ink">
              {s.mode === "ai" ? (s.extra.length ? "The AI is back on this conversation." : "Press Take over to reply yourself. The AI pauses on this conversation until you hand it back.") : s.sent ? "Sent. Press Hand back when you're done." : <span className="text-ink">{t.yours}</span>}
            </p>
            {s.mode === "you" && !s.sent && (
              <button type="button" onClick={send} className="rp-btn inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-cta px-4 text-small font-semibold text-cta-ink">
                <Send className="h-4 w-4" aria-hidden /> Send
              </button>
            )}
            {s.mode === "ai" && s.extra.length > 0 && (
              <button type="button" onClick={reset} className="inline-flex h-10 shrink-0 items-center rounded-full px-3 text-small font-semibold text-violet hover:text-ink">Start again</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
