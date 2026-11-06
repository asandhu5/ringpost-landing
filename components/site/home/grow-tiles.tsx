"use client";

import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, ChartNoAxesCombined, MessageSquareHeart, Sparkles, Star, UsersRound } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";

/** The four Grow tools on the home page, each with a small live preview. */
export function GrowTiles() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const shown = (delay: number) => ({ className: `transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`, style: { transitionDelay: `${delay}ms` } });
  return (
    <div ref={ref} className="grid gap-5 md:grid-cols-2">
      <Link href="/product/reviews" className="rp-feature-card group flex flex-col rounded-[28px] border-2 border-[#fde2b8] bg-[linear-gradient(160deg,#fff8ec,#ffffff_55%)] p-6">
        <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d97706] text-white"><MessageSquareHeart className="h-5 w-5" aria-hidden /></span><span className="text-[20px] font-bold tracking-tight text-ink">Reviews and comments</span></span>
        <div className="mt-5 flex flex-col gap-2">
          <div className={`${shown(0).className} flex items-start gap-2.5 rounded-2xl bg-white p-3 ring-1 ring-line`} style={shown(0).style}><ChannelLogo id="instagram" size={26} /><span className="text-[13.5px] text-ink"><span className="font-semibold">maya.loves.hair</span> Obsessed with this colour 😍 how much is balayage?</span></div>
          <div className={`${shown(350).className} ml-8 rounded-2xl bg-[#f3f1ff] p-3 text-[13.5px] text-ink`} style={shown(350).style}><span className="mb-1 flex items-center gap-1 text-[11.5px] font-semibold text-[#4f46e5]"><Sparkles className="h-3 w-3" aria-hidden />Reply in your voice</span>Thank you! It depends on your length, so send us a photo and we&apos;ll give you a price and a time this week.</div>
          <div className={`${shown(650).className} flex items-center gap-2.5 rounded-2xl bg-white p-3 ring-1 ring-line`} style={shown(650).style}><span className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-white text-[12px] font-bold text-[#4285f4] ring-1 ring-line">G</span><span className="flex gap-0.5">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />)}</span><span className="text-[13px] text-muted-ink">Reply drafted</span></div>
        </div>
        <span className="mt-auto pt-5 text-[14.5px] font-semibold text-[#b45309]">See how replies are written <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </Link>

      <Link href="/product/winback" className="rp-feature-card group flex flex-col rounded-[28px] border-2 border-[#bbf0cf] bg-[linear-gradient(160deg,#effcf4,#ffffff_55%)] p-6">
        <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#16a34a] text-white"><UsersRound className="h-5 w-5" aria-hidden /></span><span className="text-[20px] font-bold tracking-tight text-ink">Win-back</span></span>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[{ t: "Slipping away", n: 38 }, { t: "Lapsed", n: 54 }, { t: "Long gone", n: 71 }, { t: "Never booked", n: 23 }].map((g, i) => (
            <div key={g.t} className={`${shown(i * 120).className} rounded-2xl bg-white p-3 ring-1 ring-line`} style={shown(i * 120).style}><p className="text-[12.5px] font-semibold text-ink">{g.t}</p><p className="text-[22px] font-bold tabular-nums text-ink">{g.n}</p></div>
          ))}
        </div>
        <div className={`${shown(600).className} mt-2 flex items-center gap-2 rounded-2xl bg-white p-3 text-[13.5px] font-semibold text-[#15803d] ring-1 ring-line`} style={shown(600).style}><CalendarCheck className="h-4 w-4" aria-hidden />5 booked from one message</div>
        <span className="mt-auto pt-5 text-[14.5px] font-semibold text-[#15803d]">See win-back <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </Link>

      <Link href="/product/insights" className="rp-feature-card group flex flex-col rounded-[28px] border-2 border-[#ddd8ff] bg-[linear-gradient(160deg,#f6f4ff,#ffffff_55%)] p-6">
        <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5b4ee6] text-white"><ChartNoAxesCombined className="h-5 w-5" aria-hidden /></span><span className="text-[20px] font-bold tracking-tight text-ink">Insights</span></span>
        <div className="mt-5 flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-line">
          {[{ id: "phone", n: "Calls", v: 46 }, { id: "whatsapp", n: "WhatsApp", v: 31 }, { id: "instagram", n: "Instagram", v: 24 }, { id: "messenger", n: "Messenger", v: 11 }].map((c, i) => (
            <div key={c.id} className="flex items-center gap-2.5"><ChannelLogo id={c.id} size={20} /><span className="w-[72px] text-[12.5px] text-ink">{c.n}</span><span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full bg-[#5b4ee6] transition-[width] duration-1000" style={{ width: inView ? `${(c.v / 46) * 100}%` : "0%", transitionDelay: `${i * 120}ms` }} /></span><span className="w-6 text-right text-[12.5px] font-semibold tabular-nums">{c.v}</span></div>
          ))}
        </div>
        <span className="mt-auto pt-5 text-[14.5px] font-semibold text-[#4f46e5]">See insights <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </Link>

      <Link href="/product/advisor" className="rp-feature-card group flex flex-col rounded-[28px] border-2 border-[#bdeffa] bg-[linear-gradient(160deg,#effcff,#ffffff_55%)] p-6">
        <span className="flex items-center gap-2.5"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0891b2] text-white"><Bot className="h-5 w-5" aria-hidden /></span><span className="text-[20px] font-bold tracking-tight text-ink">Talk to AI</span></span>
        <div className="mt-5 flex flex-col gap-2">
          <p className={`${shown(0).className} max-w-[80%] self-end rounded-2xl rounded-br-md bg-ink px-3.5 py-2.5 text-[13.5px] text-white`} style={shown(0).style}>How did last month go?</p>
          <p className={`${shown(450).className} max-w-[90%] self-start rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-[13.5px] text-ink ring-1 ring-line`} style={shown(450).style}>Busier than the month before: 61 bookings, up from 49. Calls brought the most. Send your Slipping away group a Thursday offer this week.</p>
        </div>
        <span className="mt-auto pt-5 text-[14.5px] font-semibold text-[#0e7490]">See Talk to AI <ArrowRight className="inline h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </Link>
    </div>
  );
}
