"use client";

import { BadgeCheck, ChartNoAxesColumn, ChevronLeft, Heart, MapPin, MessageCircle, Repeat2, Search, Sparkles, Star, Upload } from "lucide-react";
import { BRAND_PATHS } from "@/components/site/brand-icons";
import { HomeIndicator, StatusBar } from "./iphone";

export interface Thread {
  business: { name: string; handle: string; color: string };
  post: string;
  comment: { name: string; handle: string; color: string; text: string; time: string; stars?: number };
  reply: string;
  /** The reply is shown once the owner has approved it (or autopilot sent it). */
  replied: boolean;
}

function Dot({ name, color, size = 32 }: { name: string; color: string; size?: number }) {
  return <span className="flex shrink-0 items-center justify-center rounded-full font-bold text-white" style={{ width: size, height: size, background: color, fontSize: size * 0.42 }}>{name.slice(0, 1).toUpperCase()}</span>;
}

function ReplyIn({ show, children }: { show: boolean; children: React.ReactNode }) {
  return <div className={`grid transition-[grid-template-rows,opacity] duration-700 ${show ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}><div className="overflow-hidden">{children}</div></div>;
}

/* ── Instagram: the comments sheet over a post ───────────────── */
export function InstagramComments({ t }: { t: Thread }) {
  return (
    <div className="relative h-full bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.post} alt="" className="absolute inset-x-0 top-0 h-[420px] w-full object-cover opacity-80" />
      <div className="relative"><StatusBar dark /></div>
      <div className="absolute inset-x-0 bottom-0 top-[300px] rounded-t-[22px] bg-white text-black">
        <span className="mx-auto mt-2 block h-1 w-10 rounded-full bg-black/20" />
        <p className="py-3 text-center text-[15px] font-semibold">Comments</p>
        <div className="flex gap-3 px-4 py-2">
          <Dot name={t.comment.name} color={t.comment.color} />
          <div className="flex-1 text-[14px] leading-snug"><p><span className="font-semibold">{t.comment.handle}</span> <span className="text-black/65">{t.comment.time}</span></p><p className="mt-0.5">{t.comment.text}</p><p className="mt-1 text-[12.5px] font-semibold text-black/65">Reply</p></div>
          <Heart size={14} className="mt-1 text-black/65" />
        </div>
        <ReplyIn show={t.replied}>
          <div className="flex gap-3 py-2 pl-14 pr-4">
            <Dot name={t.business.name} color={t.business.color} size={26} />
            <div className="flex-1 text-[14px] leading-snug"><p><span className="font-semibold">{t.business.handle}</span> <BadgeCheck size={12} className="inline text-[#0095f6]" /> <span className="text-black/65">now</span></p><p className="mt-0.5"><span className="text-[#00376b]">@{t.comment.handle}</span> {t.reply}</p></div>
            <Heart size={14} className="mt-1 text-black/65" />
          </div>
        </ReplyIn>
        <div className="absolute inset-x-0 bottom-[30px] flex items-center gap-3 border-t border-black/10 px-4 py-3"><Dot name={t.business.name} color={t.business.color} size={30} /><span className="flex-1 rounded-full border border-black/15 px-4 py-2 text-[14px] text-black/65">Add a comment…</span></div>
        <HomeIndicator />
      </div>
    </div>
  );
}

/* ── TikTok: the comments sheet over a video ─────────────────── */
export function TikTokComments({ t }: { t: Thread }) {
  return (
    <div className="relative h-full bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.post} alt="" className="absolute inset-x-0 top-0 h-[460px] w-full object-cover opacity-80" />
      <div className="relative"><StatusBar dark /></div>
      <div className="absolute inset-x-0 bottom-0 top-[330px] rounded-t-[14px] bg-white text-black">
        <p className="py-3 text-center text-[13.5px] font-semibold">248 comments</p>
        <div className="flex gap-3 px-4 py-2">
          <Dot name={t.comment.name} color={t.comment.color} size={34} />
          <div className="flex-1 text-[14px] leading-snug"><p className="text-[13px] text-black/65">{t.comment.handle}</p><p className="mt-0.5">{t.comment.text}</p><p className="mt-1 text-[12.5px] text-black/65">{t.comment.time} · Reply</p></div>
          <span className="flex flex-col items-center text-[11px] text-black/65"><Heart size={16} />31</span>
        </div>
        <ReplyIn show={t.replied}>
          <div className="flex gap-3 py-2 pl-14 pr-4">
            <Dot name={t.business.name} color={t.business.color} size={26} />
            <div className="flex-1 text-[14px] leading-snug"><p className="text-[13px] text-black/65">{t.business.name} · <span className="rounded bg-[#fe2c55]/10 px-1 text-[11px] font-semibold text-[#fe2c55]">Creator</span></p><p className="mt-0.5">{t.reply}</p><p className="mt-1 text-[12.5px] text-black/65">now · Reply</p></div>
          </div>
        </ReplyIn>
        <div className="absolute inset-x-0 bottom-[30px] flex items-center gap-3 border-t border-black/10 px-4 py-3"><span className="flex-1 rounded-full bg-black/5 px-4 py-2 text-[14px] text-black/65">Add comment…</span></div>
        <HomeIndicator />
      </div>
    </div>
  );
}

/* ── X: a post and its replies ───────────────────────────────── */
export function XThread({ t }: { t: Thread }) {
  return (
    <div className="flex h-full flex-col bg-white text-[#0f1419]">
      <StatusBar />
      <div className="flex h-[46px] items-center gap-6 border-b border-black/10 px-4"><ChevronLeft size={22} /><span className="text-[18px] font-bold">Post</span></div>
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2.5"><Dot name={t.business.name} color={t.business.color} size={40} /><span className="leading-tight"><span className="flex items-center gap-1 text-[15px] font-bold">{t.business.name}<BadgeCheck size={15} color="#1d9bf0" /></span><span className="text-[14px] text-[#536471]">@{t.business.handle}</span></span></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.post} alt="" className="mt-3 h-[170px] w-full rounded-2xl object-cover" />
        <div className="mt-2 flex justify-between border-b border-black/10 pb-2 text-[13px] text-[#536471]"><MessageCircle size={17} /><Repeat2 size={17} /><Heart size={17} /><ChartNoAxesColumn size={17} /><Upload size={17} /></div>
      </div>
      <div className="flex gap-3 border-b border-black/10 px-4 py-3">
        <Dot name={t.comment.name} color={t.comment.color} size={38} />
        <div className="flex-1 text-[15px] leading-snug"><p><span className="font-bold">{t.comment.name}</span> <span className="text-[#536471]">@{t.comment.handle} · {t.comment.time}</span></p><p className="mt-0.5">{t.comment.text}</p></div>
      </div>
      <ReplyIn show={t.replied}>
        <div className="flex gap-3 border-b border-black/10 px-4 py-3">
          <Dot name={t.business.name} color={t.business.color} size={38} />
          <div className="flex-1 text-[15px] leading-snug"><p><span className="font-bold">{t.business.name}</span> <span className="text-[#536471]">@{t.business.handle} · now</span></p><p className="text-[13.5px] text-[#536471]">Replying to <span className="text-[#1d9bf0]">@{t.comment.handle}</span></p><p className="mt-0.5">{t.reply}</p></div>
        </div>
      </ReplyIn>
      <div className="mt-auto mb-[30px] flex items-center gap-3 border-t border-black/10 px-4 py-3"><span className="flex-1 text-[15px] text-[#536471]">Post your reply</span><span className="rounded-full bg-[#0f1419]/40 px-4 py-1.5 text-[14px] font-bold text-white">Reply</span></div>
      <HomeIndicator />
    </div>
  );
}

/* ── Google: the business's reviews, with the owner's reply ──── */
export function GoogleReviews({ t }: { t: Thread }) {
  const stars = t.comment.stars ?? 5;
  return (
    <div className="flex h-full flex-col bg-white text-[#202124]">
      <StatusBar />
      <div className="mx-3 flex items-center gap-2 rounded-full bg-[#f1f3f4] px-4 py-2.5 text-[14px] text-[#5f6368] shadow-sm"><Search size={17} />{t.business.name}</div>
      <div className="relative mt-2 h-[120px] overflow-hidden bg-[linear-gradient(135deg,#e8f0e3,#dfe9f3)]">
        <svg viewBox="0 0 440 120" className="absolute inset-0 h-full w-full" aria-hidden><path d="M0 70 C120 40 220 110 440 50" stroke="#fff" strokeWidth="10" fill="none" /><path d="M150 0 L190 120" stroke="#fff" strokeWidth="7" /></svg>
        <MapPin size={34} className="absolute left-1/2 top-8 -translate-x-1/2 fill-[#ea4335] text-[#b31412]" />
      </div>
      <div className="px-4 pt-3">
        <p className="text-[20px] font-medium">{t.business.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[14px] text-[#5f6368]">4.9 <span className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} className="fill-[#fbbc04] text-[#fbbc04]" />)}</span> (212)</p>
        <div className="mt-3 flex gap-5 border-b border-black/10 text-[14px] font-medium text-[#5f6368]"><span className="pb-2">Overview</span><span className="border-b-[3px] border-[#1a73e8] pb-2 text-[#1a73e8]">Reviews</span><span className="pb-2">About</span></div>
      </div>
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2.5"><Dot name={t.comment.name} color={t.comment.color} size={34} /><span className="text-[14.5px] font-medium">{t.comment.name}</span></div>
        <p className="mt-1.5 flex items-center gap-2 text-[13px] text-[#5f6368]"><span className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} className={i <= stars ? "fill-[#fbbc04] text-[#fbbc04]" : "text-[#dadce0]"} />)}</span>{t.comment.time}</p>
        <p className="mt-1.5 text-[14.5px] leading-snug">{t.comment.text}</p>
        <ReplyIn show={t.replied}>
          <div className="mt-3 rounded-lg bg-[#f1f3f4] p-3">
            <p className="text-[13px] font-medium">Response from the owner <span className="font-normal text-[#5f6368]">· now</span></p>
            <p className="mt-1 text-[14px] leading-snug">{t.reply}</p>
          </div>
        </ReplyIn>
      </div>
      <HomeIndicator />
    </div>
  );
}

/* ── The RingPost dashboard: Reviews & Comments ──────────────── */
export function DashboardReplies({ t, source, step }: { t: Thread; source: string; step: number }) {
  const sourceName: Record<string, string> = { instagram: "Instagram", tiktok: "TikTok", x: "X", google: "Google review" };
  return (
    <div className="flex h-full flex-col bg-[#f7f8fa] text-[#0b1b2b]">
      <StatusBar />
      <div className="flex items-center gap-2 px-4 pb-2 pt-1"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-sm">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/logo.png" alt="" className="h-5 w-5" /></span><span className="text-[17px] font-bold">Reviews &amp; Comments</span></div>
      <div className="flex gap-1.5 px-4 pb-3 text-[12.5px] font-semibold">{["All", "Google", "Instagram", "TikTok", "X"].map((x) => <span key={x} className={`rounded-full px-2.5 py-1 ${x === "All" ? "bg-[#0b1b2b] text-white" : "bg-white text-[#4a5666]"}`}>{x}</span>)}</div>
      <div className="mx-3 rounded-2xl border border-[#e3e7ed] bg-white p-3.5 shadow-sm">
        <div className="flex items-center gap-2">
          {source === "google" ? <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-[12px] font-bold text-[#4285f4] ring-1 ring-[#e3e7ed]">G</span> : <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: source === "instagram" ? "linear-gradient(45deg,#fd5949,#d6249f,#285aeb)" : "#000" }}><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden><path fill="#fff" d={BRAND_PATHS[source]} /></svg></span>}
          <span className="text-[12.5px] font-semibold">{sourceName[source]}</span>
          <span className="ml-auto rounded-full bg-[#fff7e6] px-2 py-0.5 text-[11px] font-semibold text-[#92400e]">{step < 3 ? "New" : "Replied"}</span>
        </div>
        <p className="mt-2 text-[13.5px] font-semibold">{t.comment.name}{t.comment.stars ? <span className="ml-1.5 inline-flex align-middle">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={11} className={i <= t.comment.stars! ? "fill-[#fbbc04] text-[#fbbc04]" : "text-[#dadce0]"} />)}</span> : null}</p>
        <p className="mt-1 text-[13.5px] leading-snug text-[#4a5666]">&ldquo;{t.comment.text}&rdquo;</p>
        <div className={`mt-3 rounded-xl p-2.5 transition-colors duration-500 ${step >= 2 ? "bg-[#f3f1ff]" : "bg-[#f1f3f6]"}`}>
          <p className="flex items-center gap-1 text-[11.5px] font-semibold text-[#5b4ee6]"><Sparkles size={12} />{step >= 2 ? "Reply written in your voice" : "Writing a reply…"}</p>
          <p className={`mt-1 text-[13.5px] leading-snug transition-opacity duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}>{t.reply}</p>
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <span className="rounded-full border border-[#e3e7ed] px-3 py-1.5 text-[12.5px] font-semibold text-[#4a5666]">Edit</span>
          <span className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-500 ${step >= 3 ? "bg-[#15803d] text-white" : "bg-[#22d3ee] text-[#081c27]"}`}>{step >= 3 ? "Posted ✓" : "Approve"}</span>
        </div>
      </div>
      <div className="mx-3 mt-3 rounded-2xl border border-[#e3e7ed] bg-white p-3.5 opacity-60">
        <div className="h-3 w-24 rounded bg-[#e3e7ed]" /><div className="mt-2 h-3 w-full rounded bg-[#f1f3f6]" /><div className="mt-1.5 h-3 w-2/3 rounded bg-[#f1f3f6]" />
      </div>
      <HomeIndicator />
    </div>
  );
}


/* ── Facebook, YouTube, LinkedIn, Threads, Bluesky: the post with its comments ── */
const LOOK: Record<string, { name: string; bg: string; text: string; sub: string; mark: string; accent: string; dark?: boolean }> = {
  facebook: { name: "Facebook", bg: "#ffffff", text: "#050505", sub: "#65676b", mark: "#0866ff", accent: "#0866ff" },
  youtube: { name: "Comments", bg: "#0f0f0f", text: "#f1f1f1", sub: "#aaaaaa", mark: "#ff0000", accent: "#3ea6ff", dark: true },
  linkedin: { name: "LinkedIn", bg: "#ffffff", text: "#191919", sub: "#666666", mark: "#0a66c2", accent: "#0a66c2" },
  threads: { name: "Thread", bg: "#ffffff", text: "#000000", sub: "#999999", mark: "#000000", accent: "#000000" },
  bluesky: { name: "Post", bg: "#ffffff", text: "#0b0f14", sub: "#6f869f", mark: "#1185fe", accent: "#1185fe" },
};

export function PlatformComments({ platform, t }: { platform: keyof typeof LOOK; t: Thread }) {
  const l = LOOK[platform];
  return (
    <div className="flex h-full flex-col" style={{ background: l.bg, color: l.text }}>
      <StatusBar dark={l.dark} />
      <div className="flex h-[46px] items-center gap-3 border-b px-4" style={{ borderColor: l.dark ? "#272727" : "rgba(0,0,0,0.08)" }}>
        <ChevronLeft size={22} />
        {BRAND_PATHS[platform] ? <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden><path fill={l.mark} d={BRAND_PATHS[platform]} /></svg> : <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] text-[13px] font-bold text-white" style={{ background: l.mark }}>in</span>}
        <span className="text-[17px] font-bold">{l.name}</span>
      </div>
      <div className="px-4 pt-3">
        <div className="flex items-center gap-2.5"><Dot name={t.business.name} color={t.business.color} size={36} /><span className="leading-tight"><span className="block text-[14.5px] font-semibold">{t.business.name}</span><span className="text-[12.5px]" style={{ color: l.sub }}>{platform === "linkedin" ? "1,240 followers" : `@${t.business.handle}`}</span></span></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={t.post} alt="" className="mt-3 h-[190px] w-full rounded-xl object-cover" />
      </div>
      <p className="px-4 pt-3 text-[13px] font-semibold" style={{ color: l.sub }}>Comments</p>
      <div className="flex gap-3 px-4 py-2">
        <Dot name={t.comment.name} color={t.comment.color} size={32} />
        <div className="flex-1 text-[14px] leading-snug"><p className="text-[13px] font-semibold">{platform === "youtube" ? `@${t.comment.handle}` : t.comment.name} <span className="font-normal" style={{ color: l.sub }}>{t.comment.time}</span></p><p className="mt-0.5">{t.comment.text}</p></div>
      </div>
      <ReplyIn show={t.replied}>
        <div className="flex gap-3 py-2 pl-14 pr-4">
          <Dot name={t.business.name} color={t.business.color} size={26} />
          <div className="flex-1 text-[14px] leading-snug"><p className="text-[13px] font-semibold">{t.business.name} <span className="rounded px-1 text-[10.5px] font-semibold" style={{ background: `${l.accent}22`, color: l.accent }}>Author</span> <span className="font-normal" style={{ color: l.sub }}>now</span></p><p className="mt-0.5">{t.reply}</p></div>
        </div>
      </ReplyIn>
      <HomeIndicator dark={l.dark} />
    </div>
  );
}
