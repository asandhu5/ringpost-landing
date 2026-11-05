"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, BatteryFull, Bookmark, CalendarDays, Check, ChevronDown, Heart, Home, MessageCircle, MoreHorizontal, Music2, Pause, Play, Plus, Search, Send, Share2, Signal, UserRound, Wifi } from "lucide-react";
import { ChannelLogo } from "./channel-logos";
import { START_URL } from "@/lib/site";

const POSTS = [
  { platform: "instagram", name: "Instagram", business: "Studio & Co.", handle: "studioandco", video: "barber-fade", title: "A fresh cut. A fresh start.", caption: "The details make the difference. Find your next look and message us to book. #FreshCut #YourLocalBarber", kind: "Reel" },
  { platform: "tiktok", name: "TikTok", business: "Made for the road", handle: "madefortheroad", video: "auto-detailing", title: "Watch the finish come to life.", caption: "From the first wash to the final shine. A closer look at the care behind every detail. #CarDetailing", kind: "Video" },
  { platform: "youtube", name: "YouTube", business: "The Daily Table", handle: "thedailytable", video: "restaurant-dish", title: "Fresh from our kitchen.", caption: "A little craft in every plate. Discover what is cooking and plan your next visit. #Food #Shorts", kind: "Short" },
] as const;

/** Device framing keeps the full post, caption and native-style navigation in view. */
function PhonePost({ post }: { post: typeof POSTS[number] }) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const target = frame.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.play().catch(() => {});
      else video.current?.pause();
    }, { threshold: .45 });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  const instagram = post.platform === "instagram";
  const youtube = post.platform === "youtube";
  return <figure className="mx-auto w-full max-w-[268px]">
    <div ref={frame} className="relative rounded-[44px] border-[3px] border-[#8b8b91] bg-[#171719] p-[7px] shadow-[0_24px_55px_-24px_#17112470]">
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[34px] bg-black text-white">
        <div className="relative z-20 flex h-10 items-center justify-between bg-black px-5 text-[10px] font-semibold"><span>9:41</span><span className="absolute left-1/2 top-2 h-5 w-[76px] -translate-x-1/2 rounded-full bg-[#171719]"/><span className="flex gap-1"><Signal size={10}/><Wifi size={10}/><BatteryFull size={13}/></span></div>
        <div className="relative z-10 flex h-9 items-center justify-between px-4 text-[12px] font-semibold"><span className="flex items-center gap-1">{instagram ? "Reels" : youtube ? "Shorts" : "Following  ·  For You"}{instagram && <ChevronDown size={12}/>}</span>{youtube ? <Search size={15}/> : <Plus size={16}/>}</div>
        <div className="absolute inset-x-0 bottom-12 top-[76px]">
          <video ref={video} src={`/made/videos/${post.video}.mp4`} poster={`/made/videos/${post.video}.webp`} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label={`${post.name}: ${post.title}`} className="h-full w-full object-cover"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/5"/>
          <button type="button" aria-label={`${playing ? "Pause" : "Play"} ${post.name} video`} onClick={() => playing ? video.current?.pause() : void video.current?.play().catch(() => {})} className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 focus-visible:outline focus-visible:outline-2">{playing ? <Pause size={14}/> : <Play size={14}/>}</button>
          <div aria-hidden className="absolute bottom-28 right-3 flex flex-col items-center gap-5"><Heart size={21}/><MessageCircle size={21}/>{youtube ? <Share2 size={20}/> : <Send size={20}/>}<MoreHorizontal size={20}/></div>
          <div className="absolute bottom-3 left-3 right-10"><div className="mb-2 flex items-center gap-2"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">{post.business.slice(0,1)}</span><strong className="truncate text-[10px]">@{post.handle}</strong><span className="rounded border border-white/60 px-1.5 py-0.5 text-[9px]">{youtube ? "Subscribe" : "Follow"}</span></div><p className="text-[11px] font-semibold leading-snug">{post.title}</p><p className="mt-1.5 line-clamp-3 text-[10px] leading-relaxed text-white/90">{post.caption}</p><p className="mt-2 flex items-center gap-1 text-[9px] text-white/80"><Music2 size={10}/>Original audio · {post.business}</p></div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-12 items-start justify-around bg-black px-3 pt-2"><Home size={16}/><Search size={16}/><Plus size={16}/><Bookmark size={16}/><UserRound size={16}/><span className="absolute bottom-1.5 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white"/></div>
      </div>
    </div>
    <figcaption className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-ink"><ChannelLogo id={post.platform} size={23}/>{post.name} {post.kind}</figcaption>
  </figure>;
}

export function SocialPhones() {
  const [active, setActive] = useState<string>("instagram");
  return <div><div className="mb-5 flex justify-center gap-2 sm:hidden">{POSTS.map(post => <button type="button" key={post.platform} aria-pressed={active === post.platform} onClick={() => setActive(post.platform)} className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs ${active === post.platform ? "border-violet-400 bg-white text-violet-700" : "border-line text-muted-ink"}`}><ChannelLogo id={post.platform} size={18}/>{post.name}</button>)}</div><div className="grid gap-9 sm:grid-cols-3 sm:gap-5">{POSTS.map(post => <div key={post.platform} className={active === post.platform ? "block" : "hidden sm:block"}><PhonePost post={post}/></div>)}</div></div>;
}

/** One publishing control panel; the page's only media previews live in SocialPhones. */
export function PostingStudio() {
  const [selected, setSelected] = useState<string[]>(["instagram", "tiktok", "youtube"]);
  const [caption, setCaption] = useState("A little craft in every detail. Discover what we do, meet the people behind it and message our team to plan your visit.");
  const [mode, setMode] = useState("schedule");
  const [when, setWhen] = useState("");
  return <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_65px_-35px_#43328460]">
    <div className="flex items-center justify-between border-b border-line px-6 py-4"><h3 className="text-base font-semibold text-ink">Your next post</h3><span className="rounded-full bg-violet-50 px-3 py-1 text-xs text-violet-700">Publishing planner</span></div>
    <div className="grid md:grid-cols-[1fr_.8fr]">
      <div className="p-6 sm:p-8"><p className="text-xs font-semibold text-muted-ink">1. Choose your connected destinations</p><div className="mt-3 flex flex-wrap gap-2">{POSTS.map(p => <button type="button" key={p.platform} aria-pressed={selected.includes(p.platform)} onClick={() => setSelected(s => s.includes(p.platform) ? s.filter(id => id !== p.platform) : [...s,p.platform])} className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs ${selected.includes(p.platform) ? "border-violet-400 bg-violet-50 text-violet-700" : "border-line text-muted-ink"}`}><ChannelLogo id={p.platform} size={20}/>{p.name}{selected.includes(p.platform) && <Check size={13}/>}</button>)}</div>
        <label className="mt-6 block text-xs font-semibold text-muted-ink" htmlFor="post-caption">2. Review your caption</label><textarea id="post-caption" value={caption} onChange={e => setCaption(e.target.value)} rows={4} className="mt-3 w-full resize-y rounded-xl border border-line bg-slate-50 p-4 text-sm leading-relaxed text-ink focus:outline-violet-500"/><p className="mt-2 text-xs text-muted-ink">Start from an AI-written caption, then tailor the wording for each network in your dashboard.</p>
      </div>
      <div className="border-t border-line bg-[#f5f3ff] p-6 sm:p-8 md:border-l md:border-t-0"><fieldset><legend className="text-xs font-semibold text-muted-ink">3. Choose when it goes live</legend><div className="mt-3 grid grid-cols-2 gap-2">{[{id:"now",label:"Post now",Icon:Send},{id:"schedule",label:"Schedule",Icon:CalendarDays}].map(({id,label,Icon}) => <label key={id} className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 text-sm ${mode===id ? "border-violet-500 bg-white text-violet-700" : "border-line"}`}><input type="radio" name="post-timing" checked={mode===id} onChange={() => setMode(id)} className="sr-only"/><Icon size={15}/>{label}</label>)}</div></fieldset>
        {mode === "schedule" ? <label className="mt-5 block text-xs font-medium text-muted-ink">Publishing date and time<input type="datetime-local" value={when} onChange={e => setWhen(e.target.value)} className="mt-2 min-h-11 w-full min-w-0 rounded-xl border border-line bg-white px-3 text-sm text-ink"/></label> : <div className="mt-5 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink">Ready for something timely? Publish approved content to your selected accounts as soon as you confirm.</div>}
        <a href={START_URL} className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#5b4ee6] px-4 text-sm font-semibold text-white">{mode === "now" ? "Open dashboard to publish" : "Open dashboard to schedule"}<ArrowUpRight size={16}/></a><p className="mt-3 text-xs leading-relaxed text-muted-ink">Connect your accounts and approve your final post in the dashboard. This planner does not send a public post.</p>
      </div>
    </div>
  </div>;
}
