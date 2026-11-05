"use client";

/**
 * The home page's story (2026-11-04): what RingPost does, shown with the real dashboard
 * instead of described twice. Everything here moves only when it is on screen, and every
 * screenshot is the product itself (public/screens, captured from a demo business).
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CalendarCheck, Check, Clapperboard, MessageCircle, Send, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Marquee, useInView } from "@/components/site/motion";
import { ANSWER_CHANNELS, POST_PLATFORMS } from "@/lib/content/platforms";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/** A browser window around a real dashboard screenshot. */
export function Screen({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cx("overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(11,27,43,0.55)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11.5px] text-faint">app.ringpost.tech</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="block max-h-[43svh] w-full object-contain object-top" />
    </div>
  );
}

/** Real logos: where it answers, and where it posts. */
export function LogoCloud() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="min-w-0 rounded-3xl border border-line bg-white p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">Answers every message on</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {ANSWER_CHANNELS.map((c) => (
            <span key={c.id} className="flex flex-col items-center gap-1.5">
              <ChannelLogo id={c.id} size={46} />
              <span className="text-[12px] text-muted-ink">{c.name}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="min-w-0 overflow-hidden rounded-3xl border border-line bg-white p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[#5b4ee6]">Posts to</p>
        <div className="mt-4 overflow-hidden">
          <Marquee speed={40}>
            {POST_PLATFORMS.map((p) => (
              <span key={p.id} className="mx-2 flex flex-col items-center gap-1.5">
                <ChannelLogo id={p.id} size={46} />
                <span className="whitespace-nowrap text-[12px] text-muted-ink">{p.name}</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
}

const STORY = [
  {
    key: "answer",
    icon: MessageCircle,
    tone: "#5b4ee6",
    title: "Answers every call and message",
    body: "Calls, WhatsApp, Instagram, Messenger, texts and email in one inbox. It answers from your real prices and hours, and anything it shouldn't decide waits for you under Needs you.",
    points: ["A natural voice on your own number", "Every chat in one place", "Take over any conversation"],
    shots: [
      ...["whatsapp", "instagram", "messenger", "sms", "email"].map(channel => ({ src: `/screens/channels/${channel}.webp`, alt: `RingPost answering ${channel} messages automatically` })),
    ],
  },
  {
    key: "book",
    icon: CalendarCheck,
    tone: "#16a34a",
    title: "Books them in",
    body: "Live availability for each member of staff, booked while the customer is still on the line, synced with Google Calendar, with reminders before and a review request after.",
    points: ["Bookings on the call", "Reminders cut no-shows", "Two-way Google Calendar"],
    shots: [{ src: "/screens/calendar.webp", alt: "A week of bookings made by RingPost in the calendar" }],
  },
  {
    key: "create",
    icon: Clapperboard,
    tone: "#db2777",
    title: "Makes your posts",
    body: "Images and short videos about your business, every day: trending ideas, campaigns from one line, and your own photos polished. Your prices and logo are added by code, never guessed.",
    points: ["Today's best image and video models", "Ideas picked for your trade", "Your logo and real prices"],
    shots: [
      { src: "/screens/media.webp", alt: "The RingPost Media Library with ideas for a hair salon" },
      { src: "/screens/campaigns.webp", alt: "Creating a campaign from one line in RingPost" },
    ],
  },
  {
    key: "post",
    icon: Send,
    tone: "#0284c7",
    title: "Posts everywhere",
    body: "Instagram, Facebook, TikTok, YouTube, X, LinkedIn, Threads, Pinterest, and Bluesky, each caption shaped for its platform. You approve, or switch on autopilot.",
    points: ["Ten platforms, one click", "A preview for each one", "Scheduled at good times"],
    shots: [
      { src: "/screens/preview.webp", alt: "Approving a post with a phone preview for each platform" },
    ],
  },
  {
    key: "manage",
    icon: Star,
    tone: "#d97706",
    title: "Manages your reviews and comments",
    body: "Google reviews and the comments on your posts, with a reply already drafted in your voice. Approve it and it's published, on Google and on every platform.",
    points: ["Google review replies", "Comments on every platform", "Win back quiet customers"],
    shots: [
      { src: "/screens/reviews.webp", alt: "Google reviews and comments with drafted replies" },
      { src: "/screens/win-back.webp", alt: "Win-back messages for customers who haven't been back" },
    ],
  },
  {
    key: "understand",
    icon: BarChart3,
    tone: "#7c3aed",
    title: "Tells you what's working",
    body: "Where customers come from, what they keep asking and which posts bring them in. Or just ask: “How was this week?”",
    points: ["Insights from real conversations", "Reach for every post", "Talk to AI about your numbers"],
    shots: [
      { src: "/screens/insights.webp", alt: "Business insights in RingPost" },
      { src: "/screens/advisor.webp", alt: "Asking Talk to AI how the business is doing" },
    ],
  },
];

/** Six jobs, each shown in the real dashboard. On a wide screen the screen stays pinned
 * while the steps scroll past: each step lights up as it reaches the middle of the
 * window, and scrolling back brings the earlier one back. On a phone each step carries
 * its own screen. */
export function Showcase() {
 const [active,setActive]=useState(0); const [shot,setShot]=useState(0); const step=STORY[active]!;
 useEffect(()=>{ if(step.shots.length<2)return; const timer=setInterval(()=>setShot(n=>(n+1)%step.shots.length),3000);return()=>clearInterval(timer);},[active,step.shots.length]);
 return <div><div className="mb-5 flex gap-2 overflow-x-auto pb-2" aria-label="Explore RingPost features">{STORY.map((s,i)=><button type="button" key={s.key} aria-pressed={active===i} onClick={()=>{setActive(i);setShot(0);}} className={`shrink-0 rounded-full border px-3 py-2 text-xs ${active===i?"border-[#5b4ee6] bg-[#5b4ee6] text-white":"border-line bg-white text-ink"}`}>{s.title}</button>)}</div><div className="grid items-center gap-7 lg:grid-cols-[.65fr_1.35fr]"><div><h3 className="text-3xl font-semibold tracking-tight text-ink">{step.title}</h3><p className="mt-4 text-base leading-relaxed text-muted-ink">{step.body}</p><ul className="mt-4 space-y-2">{step.points.map(p=><li key={p} className="flex items-center gap-2 text-sm text-ink"><Check size={16}/>{p}</li>)}</ul></div><Screen src={step.shots[shot]?.src || step.shots[0]!.src} alt={step.shots[shot]?.alt || step.shots[0]!.alt}/></div></div>;
}

const FLOW = [
  { channel: "instagram", who: "Customer", text: "Hi! Do you have anything Saturday morning?" },
  { channel: null, who: "RingPost", text: "Yes, 10:30 is free. Shall I book you in?" },
  { channel: null, who: "Booked", text: "Sat 10:30 · in your calendar, confirmation sent", icon: CalendarCheck },
  { channel: null, who: "Content Studio", text: "“Weekend offer” Reel made with your price and logo", icon: Clapperboard },
  { channel: "multi", who: "Posted", text: "Instagram, TikTok and Facebook at 12:00" },
  { channel: null, who: "Review reply", text: "“Thank you, Sarah! See you next time.” Published on Google" },
];

/** One customer, start to finish: each step lights up in turn while on screen. */
export function CustomerFlow() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 }, false);
  const [lit, setLit] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setLit((n) => (n + 1) % (FLOW.length + 2)), 1100);
    return () => clearInterval(t);
  }, [inView]);
  return (
    <div ref={ref} className="relative">
      <div aria-hidden className="absolute left-[22px] top-4 bottom-4 w-px bg-line md:left-0 md:right-0 md:top-[22px] md:bottom-auto md:h-px md:w-auto" />
      <ol className="relative grid gap-4 md:grid-cols-6">
        {FLOW.map((f, i) => {
          const on = i < lit;
          const Icon = "icon" in f ? f.icon : null;
          return (
            <li key={f.who} className="flex gap-4 md:flex-col md:gap-3">
              <span className={cx("relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-all duration-500", on ? "scale-100 border-transparent bg-white shadow-[0_10px_24px_-12px_rgba(91,78,230,0.7)]" : "scale-90 border-line bg-surface-2")}>
                {f.channel === "multi" ? (
                  <span className="flex -space-x-2">
                    <ChannelLogo id="instagram" size={20} />
                    <ChannelLogo id="tiktok" size={20} />
                  </span>
                ) : f.channel ? (
                  <ChannelLogo id={f.channel} size={28} />
                ) : Icon ? (
                  <Icon className={cx("h-5 w-5 transition-colors", on ? "text-[#5b4ee6]" : "text-faint")} aria-hidden />
                ) : (
                  <span className={cx("text-[13px] font-bold transition-colors", on ? "text-[#5b4ee6]" : "text-faint")}>AI</span>
                )}
              </span>
              <div className={cx("rounded-2xl border bg-white p-3.5 transition-all duration-500", on ? "border-line opacity-100 [transform:none]" : "border-transparent opacity-40 [transform:translateY(6px)]")}>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-[#5b4ee6]">{f.who}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-ink">{f.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Real short videos made from a single image (Runway, public/made/videos), playing only while visible. */
export function VideoWall({ videos }: { videos: { src: string; poster: string; label: string; tall?: boolean }[] }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {videos.map((v) => (
        <AutoVideo key={v.src} {...v} />
      ))}
    </div>
  );
}

function AutoVideo({ src, poster, label, tall }: { src: string; poster: string; label: string; tall?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [wrap, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView) v.play().catch(() => {});
    else v.pause();
  }, [inView]);
  return (
    <figure ref={wrap} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-3xl bg-ink">
      <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" className={cx("w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]", tall ? "aspect-[9/16]" : "aspect-video")} aria-label={label} />
      <figcaption className="absolute inset-x-3 bottom-3 flex items-center gap-2">
        <span className="rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-semibold text-ink backdrop-blur">{label}</span>
      </figcaption>
    </figure>
  );
}

export function SeeAll({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#5b4ee6] hover:underline">
      {children} <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export interface IndustryMedia {
  slug: string;
  name: string;
  tone: string;
  content: string[];
  videos: { src: string; poster: string; label: string }[];
  images: string[];
}

/** Content Studio's gallery: pick an industry and see what RingPost makes for it. */
export function IndustryGallery({ industries }: { industries: IndustryMedia[] }) {
  const [active, setActive] = useState(0);
  const g = industries[active]!;
  return (
    <div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 sm:flex-wrap" role="tablist" aria-label="Industries">
        {industries.map((x, i) => (
          <button
            key={x.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cx("shrink-0 rounded-full border px-4 py-2 text-[14px] font-medium transition-all", i === active ? "border-transparent text-white shadow-md" : "border-line-strong bg-white text-muted-ink hover:text-ink")}
            style={i === active ? { background: x.tone } : undefined}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div key={g.slug} className="rp-rise mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4">
          {g.videos.map((v) => (
            <video key={v.src} src={v.src} poster={v.poster} autoPlay muted loop playsInline controls preload="metadata" className="aspect-video max-h-[52svh] w-full rounded-3xl bg-ink object-cover shadow-[0_30px_70px_-35px_rgba(11,27,43,0.6)]" aria-label={v.label} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {g.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" loading="lazy" className="aspect-[16/7] w-full rounded-3xl object-cover" />
          ))}
          <div className="rounded-3xl border border-line bg-white p-6">
            <p className="text-[13px] font-semibold uppercase tracking-[0.06em]" style={{ color: g.tone }}>
              Made for {g.name.toLowerCase()}
            </p>
            <ul className="mt-3 grid gap-2">
              {g.content.map((c) => (
                <li key={c} className="flex items-center gap-2 text-[15px] text-ink">
                  <Check className="h-4 w-4" style={{ color: g.tone }} aria-hidden /> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
