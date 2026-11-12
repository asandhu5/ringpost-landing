import { CalendarCheck, Check, ImageIcon, PhoneCall, Sparkles, Star, Upload } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";

/**
 * Tiny pictures of one dashboard moment each, used beside a step ("Import your website",
 * "Switch it on"). They move a little; each is complete as drawn.
 */
export type MiniId = "url" | "checks" | "switches" | "bubble" | "booked" | "approve" | "upload" | "number" | "chart" | "prompt" | "stars" | "groups" | "ask" | "call";

const box = "flex h-[76px] w-[124px] shrink-0 flex-col justify-center gap-1.5 rounded-rp-sm border border-line bg-white px-3 shadow-rp-1";
const I = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Mini({ id, logos = ["phone", "whatsapp", "instagram"] }: { id: MiniId; logos?: string[] }) {
  switch (id) {
    case "url":
      return (
        <span className={box} aria-hidden>
          <span className="flex h-6 min-w-0 items-center rounded-md border border-line-strong px-1.5 text-[10px] text-muted-ink"><span className="truncate">yoursite.com</span></span>
          <span className="h-1.5 overflow-hidden rounded-full bg-surface-2"><span className="rp-mini-fill block h-full rounded-full bg-violet" /></span>
        </span>
      );
    case "checks":
      return (
        <span className={box} aria-hidden>
          {["Services", "Prices", "Hours"].map((t, i) => (
            <span key={t} className="flex items-center gap-1.5 text-[10.5px] font-medium leading-none text-ink">
              <span className="rp-mini-tick flex h-3 w-3 items-center justify-center rounded-full bg-grow text-white" style={I(i)}><Check className="h-2 w-2" strokeWidth={3.5} /></span>
              {t}
            </span>
          ))}
        </span>
      );
    case "switches":
      return (
        <span className={box} aria-hidden>
          {logos.slice(0, 3).map((l, i) => (
            <span key={l} className="flex items-center justify-between">
              <ChannelLogo id={l} size={14} />
              <span className="rp-mini-track flex h-3 w-6 items-center rounded-full bg-line-strong px-[2px]" style={I(i)}><span className="rp-mini-knob h-2 w-2 rounded-full bg-white" style={I(i)} /></span>
            </span>
          ))}
        </span>
      );
    case "bubble":
      return (
        <span className={box} aria-hidden>
          <span className="w-fit rounded-[8px] rounded-bl-[2px] bg-surface-2 px-2 py-1 text-[10px] text-ink">How much is a cut?</span>
          <span className="w-fit self-end rounded-[8px] rounded-br-[2px] bg-violet px-2 py-1 text-[10px] text-white">$45. Friday 2 pm?</span>
        </span>
      );
    case "booked":
      return (
        <span className={box} aria-hidden>
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-ink"><CalendarCheck className="h-3.5 w-3.5 text-grow" /> Thu 3:00 pm</span>
          <span className="rounded-md bg-grow-soft px-2 py-1 text-[10px] font-semibold text-grow">Booked by your AI</span>
        </span>
      );
    case "approve":
      return (
        <span className={box} aria-hidden>
          <span className="h-1.5 w-full rounded-full bg-surface-2" /><span className="h-1.5 w-3/4 rounded-full bg-surface-2" />
          <span className="mt-0.5 flex gap-1.5"><span className="rounded-full border border-line-strong px-2 py-0.5 text-[9.5px] font-semibold text-ink">Edit</span><span className="rounded-full bg-cta px-2 py-0.5 text-[9.5px] font-semibold text-cta-ink">Approve</span></span>
        </span>
      );
    case "upload":
      return (
        <span className={`${box} items-center !gap-1 border-dashed !border-line-strong`} aria-hidden>
          <Upload className="h-4 w-4 text-violet" /><span className="text-[10px] font-medium text-ink">Drop a photo</span>
          <span className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"><span className="rp-mini-fill block h-full rounded-full bg-create" /></span>
        </span>
      );
    case "number":
      return (
        <span className={box} aria-hidden>
          <span className="text-[9.5px] text-muted-ink">Your business number</span>
          <span className="text-[13px] font-semibold tabular-nums tracking-tight text-ink">(555) 014-2271</span>
          <span className="w-fit rounded-full bg-grow-soft px-1.5 py-0.5 text-[9.5px] font-semibold text-grow">Works right away</span>
        </span>
      );
    case "chart":
      return (
        <span className={`${box} !flex-row items-end !gap-1 pb-2`} aria-hidden>
          {[35, 55, 42, 78, 60, 90].map((h, i) => <span key={i} className={`rp-bar-up flex-1 rounded-t-[3px] ${h > 70 ? "bg-grow" : "bg-grow/30"}`} style={{ height: `${h * 0.55}px`, ...I(i) }} />)}
        </span>
      );
    case "prompt":
      return (
        <span className={box} aria-hidden>
          <span className="flex items-center gap-1 rounded-md border border-line-strong px-1.5 py-1 text-[9.5px] text-ink"><Sparkles className="h-3 w-3 text-create" /> Weekend special</span>
          <span className="flex items-center gap-1 text-[10px] text-muted-ink"><ImageIcon className="h-3 w-3" /> Image and video</span>
        </span>
      );
    case "stars":
      return (
        <span className={box} aria-hidden>
          <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="rp-mini-tick h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" style={I(i)} />)}</span>
          <span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] text-ink">Thank you! See you soon.</span>
        </span>
      );
    case "groups":
      return (
        <span className={`${box} !grid grid-cols-2 !gap-1`} aria-hidden>
          {[["Slipping", 38], ["Lapsed", 54], ["Long gone", 71], ["Never", 23]].map(([t, n], i) => (
            <span key={t} className={`rounded-md px-1.5 py-1 leading-none ${i === 0 ? "bg-grow-soft" : "bg-surface-2"}`}><span className="block text-[8.5px] text-muted-ink">{t}</span><span className="text-[11px] font-semibold text-ink">{n}</span></span>
          ))}
        </span>
      );
    case "ask":
      return (
        <span className={box} aria-hidden>
          <span className="w-fit self-end rounded-[8px] rounded-br-[2px] bg-violet px-2 py-1 text-[10px] text-white">How was last month?</span>
          <span className="flex gap-1 pl-1">{[0, 1, 2].map((i) => <span key={i} className="rp-dot h-1.5 w-1.5 rounded-full bg-muted-ink" style={I(i)} />)}</span>
        </span>
      );
    case "call":
      return (
        <span className={box} aria-hidden>
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold text-ink"><PhoneCall className="h-3.5 w-3.5 text-violet" /> Answering now</span>
          <span className="flex items-end gap-[3px]">{[6, 12, 8, 14, 7, 11, 9].map((h, i) => <span key={i} className="rp-wave w-[3px] rounded-full bg-violet" style={{ height: h, animationDelay: `${i * 0.1}s` }} />)}</span>
        </span>
      );
  }
}
