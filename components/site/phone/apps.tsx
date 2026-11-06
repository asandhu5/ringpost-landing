"use client";

import { useEffect, useRef } from "react";
import {
  BadgeCheck, Bell, Bookmark, BriefcaseBusiness, ChartNoAxesColumn, ChevronLeft, Clapperboard, Compass, Ellipsis, Globe, Heart, House, Mail,
  MessageCircle, MessageSquare, Music2, Plus, Repeat2, Search, Send, Share, SquarePlus, ThumbsUp, Upload, UserRound, Users,
} from "lucide-react";
import { BRAND_PATHS } from "@/components/site/brand-icons";
import { HomeIndicator, StatusBar } from "./iphone";

export type PreviewPlatform = "instagram" | "facebook" | "tiktok" | "youtube" | "x" | "linkedin" | "threads" | "pinterest" | "bluesky";

export interface PreviewMedia {
  kind: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
}

export interface PreviewPost {
  media: PreviewMedia;
  caption: string;
  business: { name: string; handle: string; color: string };
  /** Shown in place of "now" on a scheduled post. */
  when?: string;
}

/** Plays when on screen and the visitor allows motion; a still otherwise. */
function Media({ media, className, fit = "cover" }: { media: PreviewMedia; className?: string; fit?: "cover" | "contain" }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !reduce ? v.play().catch(() => {}) : v.pause()), { threshold: 0.3 });
    io.observe(v);
    return () => io.disconnect();
  }, [media.src]);
  const style = { objectFit: fit } as const;
  if (media.kind === "video") {
    return <video ref={ref} key={media.src} src={media.src} poster={media.poster} muted loop playsInline preload="metadata" aria-label={media.alt} className={className} style={style} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt={media.alt} loading="lazy" decoding="async" className={className} style={style} />;
}

function Avatar({ post, size = 32, ring = false }: { post: PreviewPost; size?: number; ring?: boolean }) {
  const inner = (
    <span className="flex shrink-0 items-center justify-center rounded-full font-bold text-white" style={{ width: size, height: size, background: post.business.color, fontSize: size * 0.42 }}>
      {post.business.name.slice(0, 1)}
    </span>
  );
  if (!ring) return inner;
  return <span className="rounded-full p-[2px]" style={{ background: "linear-gradient(45deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)" }}><span className="block rounded-full bg-white p-[2px]">{inner}</span></span>;
}

function hashtags(text: string) {
  return text.split(/(\s+)/).map((w, i) => (w.startsWith("#") ? <span key={i} className="text-[#00376b]">{w}</span> : w));
}

/* ── Instagram ─────────────────────────────────────────────────── */
function Instagram({ post }: { post: PreviewPost }) {
  if (post.media.kind === "video") return <InstagramReel post={post} />;
  return (
    <div className="flex h-full flex-col bg-white text-black">
      <StatusBar />
      <div className="flex h-[44px] items-center justify-between px-[16px]">
        <span className="text-[26px] font-semibold tracking-tight" style={{ fontFamily: "'Snell Roundhand','Brush Script MT',cursive" }}>Instagram</span>
        <span className="flex gap-[22px]"><Heart size={26} /><Send size={25} /></span>
      </div>
      <div className="flex h-[56px] items-center gap-[10px] px-[12px]">
        <Avatar post={post} size={32} ring />
        <span className="flex-1 text-[14px] font-semibold leading-tight">{post.business.handle}<span className="block text-[12px] font-normal">{post.when ? `Scheduled · ${post.when}` : "Original audio"}</span></span>
        <Ellipsis size={20} />
      </div>
      <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
      <div className="flex items-center gap-[16px] px-[14px] pt-[10px]"><Heart size={26} /><MessageCircle size={25} /><Send size={24} /><span className="flex-1" /><Bookmark size={25} /></div>
      <p className="px-[14px] pt-[8px] text-[14px] font-semibold">Liked by your customers</p>
      <p className="mx-[14px] mt-[4px] line-clamp-3 text-[14px] leading-[1.35]"><span className="font-semibold">{post.business.handle}</span> {hashtags(post.caption)}</p>
      <div className="mt-auto flex h-[83px] items-start justify-around border-t border-black/10 pt-[12px]"><House size={26} /><Search size={26} /><SquarePlus size={26} /><Clapperboard size={26} /><Avatar post={post} size={26} /></div>
      <HomeIndicator />
    </div>
  );
}

function InstagramReel({ post }: { post: PreviewPost }) {
  return (
    <div className="relative h-full bg-black text-white">
      <Media media={post.media} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      <div className="relative"><StatusBar dark /></div>
      <div className="relative flex h-[44px] items-center justify-between px-[16px] text-[22px] font-bold"><span>Reels</span><span className="flex gap-4"><Plus size={26} /></span></div>
      <div className="absolute bottom-[200px] right-[12px] flex flex-col items-center gap-[22px] text-[13px]"><span className="flex flex-col items-center"><Heart size={30} />1.2K</span><span className="flex flex-col items-center"><MessageCircle size={30} />48</span><Send size={28} /><Ellipsis size={26} /></div>
      <div className="absolute bottom-[104px] left-[14px] right-[70px]">
        <div className="flex items-center gap-[10px]"><Avatar post={post} size={34} /><span className="text-[15px] font-semibold">{post.business.handle}</span><span className="rounded-[8px] border border-white/70 px-[10px] py-[3px] text-[13px] font-semibold">Follow</span></div>
        <p className="mt-[10px] line-clamp-2 text-[14px] leading-[1.35]">{post.caption}</p>
        <p className="mt-[8px] flex items-center gap-[6px] text-[13px]"><Music2 size={14} /> Original audio</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[83px] items-start justify-around bg-black pt-[12px]"><House size={26} /><Search size={26} /><SquarePlus size={26} /><Clapperboard size={26} /><Avatar post={post} size={26} /></div>
      <HomeIndicator dark />
    </div>
  );
}

/* ── TikTok ───────────────────────────────────────────────────── */
function TikTok({ post }: { post: PreviewPost }) {
  return (
    <div className="relative h-full bg-black text-white">
      <Media media={post.media} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75" />
      <div className="relative"><StatusBar dark /></div>
      <div className="relative flex h-[44px] items-center justify-center gap-[22px] text-[17px] font-semibold"><span className="text-white/60">Following</span><span className="border-b-[3px] border-white pb-[4px]">For You</span><Search size={24} className="absolute right-[16px]" /></div>
      <div className="absolute bottom-[190px] right-[10px] flex flex-col items-center gap-[20px] text-[13px] font-semibold">
        <span className="relative mb-[8px]"><Avatar post={post} size={48} /><span className="absolute -bottom-[9px] left-1/2 flex h-[20px] w-[20px] -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55]"><Plus size={14} /></span></span>
        <span className="flex flex-col items-center"><Heart size={34} fill="#fff" />3,184</span><span className="flex flex-col items-center"><MessageSquare size={32} fill="#fff" />96</span><span className="flex flex-col items-center"><Bookmark size={32} fill="#fff" />210</span><span className="flex flex-col items-center"><Share size={30} />Share</span>
      </div>
      <div className="absolute bottom-[100px] left-[14px] right-[80px]">
        <p className="text-[16px] font-semibold">{post.business.name}</p>
        <p className="mt-[6px] line-clamp-3 text-[14.5px] leading-[1.35]">{post.caption}</p>
        <p className="mt-[8px] flex items-center gap-[6px] text-[13.5px]"><Music2 size={14} /> original sound · {post.business.name}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[83px] items-start justify-around bg-black pt-[10px] text-[11px]"><span className="flex flex-col items-center"><House size={25} fill="#fff" />Home</span><span className="flex flex-col items-center text-white/70"><Users size={25} />Friends</span><span className="mt-[2px] flex h-[32px] w-[48px] items-center justify-center rounded-[9px] bg-white text-black shadow-[-3px_0_0_#25f4ee,3px_0_0_#fe2c55]"><Plus size={20} /></span><span className="flex flex-col items-center text-white/70"><MessageSquare size={25} />Inbox</span><span className="flex flex-col items-center text-white/70"><UserRound size={25} />Profile</span></div>
      <HomeIndicator dark />
    </div>
  );
}

/* ── YouTube Shorts ───────────────────────────────────────────── */
function YouTube({ post }: { post: PreviewPost }) {
  return (
    <div className="relative h-full bg-black text-white">
      <Media media={post.media} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75" />
      <div className="relative"><StatusBar dark /></div>
      <div className="relative flex h-[44px] items-center justify-end gap-[22px] px-[16px]"><Search size={24} /><Ellipsis size={24} /></div>
      <div className="absolute bottom-[190px] right-[10px] flex flex-col items-center gap-[22px] text-[13px]"><span className="flex flex-col items-center"><ThumbsUp size={30} />842</span><span className="flex flex-col items-center"><ThumbsUp size={30} className="rotate-180" />Dislike</span><span className="flex flex-col items-center"><MessageSquare size={30} />37</span><span className="flex flex-col items-center"><Share size={28} />Share</span><span className="flex flex-col items-center"><Repeat2 size={28} />Remix</span></div>
      <div className="absolute bottom-[100px] left-[14px] right-[78px]">
        <div className="flex items-center gap-[10px]"><Avatar post={post} size={34} /><span className="text-[15px] font-semibold">@{post.business.handle}</span><span className="rounded-full bg-white px-[14px] py-[6px] text-[13.5px] font-semibold text-black">Subscribe</span></div>
        <p className="mt-[10px] line-clamp-2 text-[15px] leading-[1.35]">{post.caption}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex h-[83px] items-start justify-around bg-black pt-[10px] text-[10.5px]"><span className="flex flex-col items-center"><House size={24} />Home</span><span className="flex flex-col items-center"><Clapperboard size={24} fill="#fff" />Shorts</span><span className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/50"><Plus size={24} /></span><span className="flex flex-col items-center"><Compass size={24} />Subscriptions</span><span className="flex flex-col items-center"><UserRound size={24} />You</span></div>
      <HomeIndicator dark />
    </div>
  );
}

/* ── Facebook ─────────────────────────────────────────────────── */
function Facebook({ post }: { post: PreviewPost }) {
  return (
    <div className="flex h-full flex-col bg-[#f0f2f5] text-[#050505]">
      <div className="bg-white"><StatusBar /></div>
      <div className="flex h-[48px] items-center justify-between bg-white px-[16px]"><span className="text-[30px] font-bold tracking-[-0.04em] text-[#0866ff]">facebook</span><span className="flex gap-[10px]">{[Plus, Search, MessageCircle].map((I, i) => <span key={i} className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#e4e6eb]"><I size={20} /></span>)}</span></div>
      <div className="mt-[8px] bg-white">
        <div className="flex items-center gap-[10px] px-[14px] py-[12px]"><Avatar post={post} size={40} /><span className="flex-1 leading-tight"><span className="block text-[15px] font-semibold">{post.business.name}</span><span className="flex items-center gap-[4px] text-[13px] text-[#65676b]">{post.when ? `Scheduled · ${post.when}` : "Just now"} · <Globe size={12} /></span></span><Ellipsis size={20} className="text-[#65676b]" /></div>
        <div className="px-[14px] pb-[10px]"><p className="line-clamp-3 text-[15px] leading-[1.35]">{post.caption}</p></div>
        <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
        <div className="flex items-center justify-between px-[14px] py-[10px] text-[14px] text-[#65676b]"><span className="flex items-center gap-[6px]"><span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#0866ff]"><ThumbsUp size={11} color="#fff" fill="#fff" /></span>214</span><span>18 comments · 6 shares</span></div>
        <div className="flex justify-around border-t border-black/10 py-[10px] text-[14.5px] font-semibold text-[#65676b]"><span className="flex items-center gap-[6px]"><ThumbsUp size={19} />Like</span><span className="flex items-center gap-[6px]"><MessageCircle size={19} />Comment</span><span className="flex items-center gap-[6px]"><Share size={19} />Share</span></div>
      </div>
      <div className="mt-auto flex h-[83px] items-start justify-around border-t border-black/10 bg-white pt-[10px] text-[#65676b]"><House size={26} color="#0866ff" /><Clapperboard size={26} /><Users size={26} /><Bell size={26} /><UserRound size={26} /></div>
      <HomeIndicator />
    </div>
  );
}

/* ── X ────────────────────────────────────────────────────────── */
function X({ post }: { post: PreviewPost }) {
  const text = post.caption.length > 280 ? `${post.caption.slice(0, 277)}…` : post.caption;
  return (
    <div className="flex h-full flex-col bg-white text-[#0f1419]">
      <StatusBar />
      <div className="relative flex h-[46px] items-center justify-center border-b border-black/10"><span className="absolute left-[16px]"><Avatar post={post} size={30} /></span><svg viewBox="0 0 24 24" width="24" height="24" className="absolute left-1/2 -translate-x-1/2" aria-hidden><path fill="#000" d={BRAND_PATHS.x} /></svg></div>
      <div className="flex gap-[12px] px-[16px] pt-[14px]">
        <Avatar post={post} size={42} />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-[4px] text-[15.5px]"><span className="font-bold">{post.business.name}</span><BadgeCheck size={17} color="#1d9bf0" /><span className="text-[#536471]">@{post.business.handle} · {post.when ?? "now"}</span></p>
          <p className="mt-[4px] line-clamp-4 text-[15.5px] leading-[1.35]">{text}</p>
          <div className="relative mt-[12px] w-full overflow-hidden rounded-[16px] border border-black/10" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
          <div className="mt-[12px] flex justify-between pr-[10px] text-[13.5px] text-[#536471]"><span className="flex items-center gap-[4px]"><MessageCircle size={18} />12</span><span className="flex items-center gap-[4px]"><Repeat2 size={18} />9</span><span className="flex items-center gap-[4px]"><Heart size={18} />148</span><span className="flex items-center gap-[4px]"><ChartNoAxesColumn size={18} />4.1K</span><span className="flex gap-[12px]"><Bookmark size={18} /><Upload size={18} /></span></div>
        </div>
      </div>
      <div className="mt-auto flex h-[83px] items-start justify-around border-t border-black/10 pt-[12px]"><House size={26} /><Search size={26} /><Users size={26} /><Bell size={26} /><Mail size={26} /></div>
      <HomeIndicator />
    </div>
  );
}

/* ── LinkedIn ─────────────────────────────────────────────────── */
function LinkedIn({ post }: { post: PreviewPost }) {
  return (
    <div className="flex h-full flex-col bg-[#f4f2ee] text-[#191919]">
      <div className="bg-white"><StatusBar /></div>
      <div className="flex h-[48px] items-center gap-[10px] bg-white px-[14px]"><Avatar post={post} size={30} /><span className="flex h-[34px] flex-1 items-center gap-[8px] rounded-[6px] bg-[#edf3f8] px-[10px] text-[15px] text-[#5e5e5e]"><Search size={18} />Search</span><MessageSquare size={24} className="text-[#5e5e5e]" /></div>
      <div className="mt-[8px] bg-white">
        <div className="flex items-start gap-[10px] px-[14px] pt-[12px]"><span className="flex h-[48px] w-[48px] items-center justify-center rounded-[6px] text-[20px] font-bold text-white" style={{ background: post.business.color }}>{post.business.name.slice(0, 1)}</span><span className="flex-1 leading-tight"><span className="block text-[15px] font-semibold">{post.business.name}</span><span className="block text-[13px] text-[#666]">1,240 followers</span><span className="flex items-center gap-[4px] text-[13px] text-[#666]">{post.when ? `Scheduled · ${post.when}` : "Now"} · <Globe size={12} /></span></span><Ellipsis size={20} /></div>
        <div className="px-[14px] py-[10px]"><p className="line-clamp-3 text-[15px] leading-[1.4]">{post.caption}</p></div>
        <div className="relative w-full" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
        <div className="flex justify-around border-t border-black/10 py-[10px] text-[13px] font-semibold text-[#666]"><span className="flex flex-col items-center"><ThumbsUp size={20} />Like</span><span className="flex flex-col items-center"><MessageSquare size={20} />Comment</span><span className="flex flex-col items-center"><Repeat2 size={20} />Repost</span><span className="flex flex-col items-center"><Send size={20} />Send</span></div>
      </div>
      <div className="mt-auto flex h-[83px] items-start justify-around border-t border-black/10 bg-white pt-[8px] text-[10.5px] text-[#666]"><span className="flex flex-col items-center text-[#191919]"><House size={24} />Home</span><span className="flex flex-col items-center"><Users size={24} />Network</span><span className="flex flex-col items-center"><SquarePlus size={24} />Post</span><span className="flex flex-col items-center"><Bell size={24} />Alerts</span><span className="flex flex-col items-center"><BriefcaseBusiness size={24} />Jobs</span></div>
      <HomeIndicator />
    </div>
  );
}

/* ── Threads ──────────────────────────────────────────────────── */
function Threads({ post }: { post: PreviewPost }) {
  return (
    <div className="flex h-full flex-col bg-white text-black">
      <StatusBar />
      <div className="flex h-[48px] items-center justify-center"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden><path fill="#000" d={BRAND_PATHS.threads} /></svg></div>
      <div className="flex gap-[12px] border-b border-black/10 px-[16px] py-[14px]">
        <Avatar post={post} size={38} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px]"><span className="font-semibold">{post.business.handle}</span> <span className="text-[#999]">{post.when ?? "now"}</span></p>
          <p className="mt-[4px] line-clamp-4 text-[15px] leading-[1.4]">{post.caption}</p>
          <div className="relative mt-[10px] w-[78%] overflow-hidden rounded-[12px]" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
          <div className="mt-[12px] flex gap-[20px] text-[14px] text-[#555]"><span className="flex items-center gap-[4px]"><Heart size={20} />86</span><span className="flex items-center gap-[4px]"><MessageCircle size={20} />7</span><Repeat2 size={20} /><Send size={20} /></div>
        </div>
      </div>
      <div className="mt-auto flex h-[83px] items-start justify-around pt-[12px] text-[#999]"><House size={27} color="#000" /><Search size={27} /><SquarePlus size={27} /><Heart size={27} /><UserRound size={27} /></div>
      <HomeIndicator />
    </div>
  );
}

/* ── Pinterest ────────────────────────────────────────────────── */
function Pinterest({ post }: { post: PreviewPost }) {
  return (
    <div className="flex h-full flex-col bg-white text-[#111]">
      <StatusBar />
      <div className="relative mx-[8px] overflow-hidden rounded-[28px]" style={{ height: 600 }}>
        <Media media={post.media} className="absolute inset-0 h-full w-full" />
        <span className="absolute left-[14px] top-[14px] flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white"><ChevronLeft size={24} /></span>
      </div>
      <div className="flex items-center gap-[18px] px-[18px] pt-[14px]"><Heart size={26} /><MessageCircle size={26} /><Share size={24} /><Ellipsis size={24} /><span className="flex-1" /><span className="rounded-full bg-[#e60023] px-[18px] py-[12px] text-[16px] font-semibold text-white">Save</span></div>
      <div className="flex items-center gap-[10px] px-[18px] pt-[12px]"><Avatar post={post} size={36} /><span className="text-[15px] font-semibold">{post.business.name}</span></div>
      <p className="mx-[18px] mt-[10px] line-clamp-2 text-[15px] leading-[1.4]">{post.caption}</p>
      <div className="mt-auto flex h-[83px] items-start justify-around pt-[12px]"><House size={26} /><Search size={26} /><Plus size={26} /><MessageCircle size={26} /><Avatar post={post} size={26} /></div>
      <HomeIndicator />
    </div>
  );
}

/* ── Bluesky ──────────────────────────────────────────────────── */
function Bluesky({ post }: { post: PreviewPost }) {
  return (
    <div className="flex h-full flex-col bg-white text-[#0b0f14]">
      <StatusBar />
      <div className="flex h-[46px] items-center justify-center border-b border-black/10"><svg viewBox="0 0 24 24" width="30" height="30" aria-hidden><path fill="#1185fe" d={BRAND_PATHS.bluesky} /></svg></div>
      <div className="flex gap-[12px] px-[16px] pt-[14px]">
        <Avatar post={post} size={42} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px]"><span className="font-bold">{post.business.name}</span> <span className="text-[#6f869f]">@{post.business.handle}.bsky.social · {post.when ?? "now"}</span></p>
          <p className="mt-[4px] line-clamp-4 text-[15px] leading-[1.4]">{post.caption.slice(0, 300)}</p>
          <div className="relative mt-[10px] w-full overflow-hidden rounded-[12px]" style={{ aspectRatio: "4 / 5" }}><Media media={post.media} className="absolute inset-0 h-full w-full" /></div>
          <div className="mt-[12px] flex justify-between pr-[20px] text-[14px] text-[#6f869f]"><span className="flex items-center gap-[4px]"><MessageCircle size={19} />4</span><span className="flex items-center gap-[4px]"><Repeat2 size={19} />11</span><span className="flex items-center gap-[4px]"><Heart size={19} />63</span><Ellipsis size={19} /></div>
        </div>
      </div>
      <div className="mt-auto flex h-[83px] items-start justify-around border-t border-black/10 pt-[12px] text-[#42576c]"><House size={26} /><Search size={26} /><MessageSquare size={26} /><Bell size={26} /><UserRound size={26} /></div>
      <HomeIndicator />
    </div>
  );
}

const APPS: Record<PreviewPlatform, (p: { post: PreviewPost }) => React.ReactElement> = {
  instagram: Instagram, facebook: Facebook, tiktok: TikTok, youtube: YouTube, x: X, linkedin: LinkedIn, threads: Threads, pinterest: Pinterest, bluesky: Bluesky,
};

/** The full app screen a post appears on, for one platform. */
export function AppScreen({ platform, post }: { platform: PreviewPlatform; post: PreviewPost }) {
  const App = APPS[platform];
  return <App post={post} />;
}

/** Platforms whose apps are full-screen dark video feeds. */
export const DARK_APPS = new Set<PreviewPlatform>(["tiktok", "youtube"]);
