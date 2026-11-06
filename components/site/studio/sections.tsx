"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/components/site/motion";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { AppScreen } from "@/components/site/phone/apps";
import type { IndustryShowcase } from "@/lib/content/industry-showcase";
import { BookOpen, Check, Clock, Globe, ImageIcon, MessageCircleQuestion, Palette, ShieldCheck, Sparkles, Tag, Type, Wand2 } from "lucide-react";

/**
 * Every kind of business, the owner's phone photo and the post made from it. A handle
 * compares the two; the finished post is also shown as it lands on Instagram. It moves
 * through the industries on its own until the visitor picks one.
 */
export function IndustryBeforeAfter({ items }: { items: IndustryShowcase[] }) {
  const [index, setIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.25 }, false);
  const item = items[index];
  useEffect(() => {
    if (!auto || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { setIndex((n) => (n + 1) % items.length); setPos(50); }, 4200);
    return () => clearInterval(id);
  }, [auto, inView, items.length]);
  const pick = (i: number) => { setAuto(false); setIndex(i); setPos(50); };
  return (
    <div ref={ref} className="rounded-[32px] border border-line bg-white p-4 shadow-[0_50px_100px_-55px_rgba(11,27,43,0.55)] sm:p-6">
      <div className="flex flex-wrap gap-2 pb-3" role="tablist" aria-label="Kinds of business">
        {items.map((x, i) => (
          <button key={x.slug} type="button" role="tab" aria-selected={i === index} onClick={() => pick(i)} className={`shrink-0 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${i === index ? "bg-ink text-white" : "bg-surface-2 text-muted-ink hover:text-ink"}`}>{x.group}</button>
        ))}
      </div>
      <div className="mt-3 grid items-center gap-6 lg:grid-cols-[1fr_auto]">
        <div className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[24px] sm:aspect-[5/4]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={item.after} src={item.after} alt={`${item.group}: the finished post`} className="rp-fade-in absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={item.before} src={item.before} alt={`${item.group}: the owner's phone photo`} className="rp-fade-in h-full w-full object-cover" />
          </div>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[15px] font-bold text-ink shadow-lg">⟷</span>
          </span>
          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[12.5px] font-semibold text-white">Your photo</span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-semibold text-ink">The post</span>
          <span className="absolute bottom-3 left-3 rounded-2xl bg-white/95 px-4 py-2.5 shadow">
            <span className="block text-[12px] font-semibold" style={{ color: item.business.color }}>{item.business.name}</span>
            <span className="block text-[15px] font-bold text-ink">{item.title}</span>
          </span>
          <input type="range" min={0} max={100} value={pos} onChange={(e) => { setAuto(false); setPos(Number(e.target.value)); }} aria-label="Compare the phone photo with the post" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        </div>
        <div className="mx-auto hidden w-[230px] lg:block">
          <IPhone16ProMax width={230} label={`${item.group}: the post on Instagram`}>
            <AppScreen platform="instagram" post={{ media: { kind: "image", src: item.after, alt: `${item.group}: ${item.title}` }, business: item.business, caption: item.caption }} />
          </IPhone16ProMax>
        </div>
      </div>
    </div>
  );
}

const INPUTS = [
  { Icon: Tag, t: "Services and prices", b: "What you sell, as you priced it" },
  { Icon: Clock, t: "Hours and offers", b: "When you're open, what's on now" },
  { Icon: Type, t: "Your voice", b: "Tone, and the words you never use" },
  { Icon: Palette, t: "Logo and colours", b: "Laid on by RingPost, not drawn by AI" },
  { Icon: ImageIcon, t: "Your photos", b: "Up to three references per piece" },
  { Icon: Globe, t: "Your website", b: "Read once, kept in your knowledge" },
  { Icon: MessageCircleQuestion, t: "What customers ask", b: "From your calls and messages" },
];

/** What every piece starts from: the business's own knowledge, gathered into one brief. */
export function BrainMap() {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
      <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
        {INPUTS.map(({ Icon, t, b }) => (
          <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f1ff] text-glow"><Icon className="h-4.5 w-4.5" aria-hidden /></span>
            <span><span className="block text-[14.5px] font-semibold text-ink">{t}</span><span className="block text-[13px] text-muted-ink">{b}</span></span>
          </li>
        ))}
      </ul>
      <svg aria-hidden viewBox="0 0 120 420" className="hidden h-[420px] w-[120px] lg:block">
        {[30, 90, 150, 210, 270, 330, 390].map((y) => <path key={y} d={`M0 ${y} C 60 ${y}, 60 210, 120 210`} fill="none" stroke="#5b4ee6" strokeOpacity="0.45" strokeWidth="1.5" className="rp-flow-line" />)}
      </svg>
      <div className="rounded-[24px] border border-line bg-white p-6 shadow-[0_30px_70px_-45px_rgba(11,27,43,0.45)]">
        <p className="flex items-center gap-2 text-[14px] font-semibold text-ink"><BookOpen className="h-4 w-4 text-glow" aria-hidden />Your business, as one brief</p>
        <p className="mt-3 rounded-xl bg-surface-2 p-4 font-[450] text-[14.5px] leading-relaxed text-ink">
          &ldquo;A strawberry cream cake on a marble stand by a window, soft morning light. Warm and homely, no exclamation marks. Logo top left. Words: <em>Order by Thursday</em>.&rdquo;
        </p>
        <p className="mt-4 text-[14px] leading-relaxed text-muted-ink">You write one line, or nothing at all. RingPost turns it into a full brief from what it already knows, so the post, the caption and the answer a customer gets on the phone all say the same thing.</p>
      </div>
    </div>
  );
}

const PIPELINE = [
  { Icon: Sparkles, t: "Your idea", b: "A line, an idea card, or the daily routine" },
  { Icon: ShieldCheck, t: "Safety check first", b: "Before anything is made, with your trade in mind" },
  { Icon: Wand2, t: "Made for your business", b: "An image or short video, in the shape each app needs" },
  { Icon: Type, t: "Your logo and words added", b: "By RingPost, never drawn by the AI, so they're exact" },
  { Icon: Check, t: "Checked again", b: "The words are read back, and the picture looked over" },
  { Icon: ImageIcon, t: "In your Media Library", b: "Pick it and it goes to Approvals" },
];

/** The path every piece takes, from idea to the Media Library. */
export function Pipeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
      {PIPELINE.map(({ Icon, t, b }, i) => (
        <li key={t} className="relative bg-white p-5">
          <span className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f1ff] text-glow"><Icon className="h-4.5 w-4.5" aria-hidden /></span>
            <span className="text-[13px] font-semibold tabular-nums text-faint">{i + 1}</span>
          </span>
          <p className="mt-4 text-[15px] font-semibold text-ink">{t}</p>
          <p className="mt-1 text-[13.5px] leading-relaxed text-muted-ink">{b}</p>
        </li>
      ))}
    </ol>
  );
}
