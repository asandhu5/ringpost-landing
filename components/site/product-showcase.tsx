"use client";

/**
 * The home page shows what RingPost does using the real dashboard.
 * Everything here moves only when it is on screen, and every
 * screenshot is the product itself (public/screens, captured from a demo business).
 */
import { useEffect, useState } from "react";
import { PlatformPreviewPanel } from "@/components/site/phone/platform-preview";
import Link from "next/link";
import { ArrowRight, BarChart3, CalendarCheck, Check, Clapperboard, MessageCircle, Send, Star } from "lucide-react";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/** A browser window around a real dashboard screenshot. */
export function Screen({ src, alt, className, priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <div className={cx("overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_40px_90px_-40px_rgba(11,27,43,0.55)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-2 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} className="block max-h-[43svh] w-full object-contain object-top" />
    </div>
  );
}

/** Real logos: where it answers, and where it posts. */
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
    points: ["Nine platforms, one approval", "A preview in each app", "Scheduled at good times"],
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
 return <div><div className="mb-5 flex gap-2 overflow-x-auto pb-2" aria-label="Explore RingPost features">{STORY.map((s,i)=><button type="button" key={s.key} aria-pressed={active===i} onClick={()=>{setActive(i);setShot(0);}} className={`shrink-0 rounded-full border px-3 py-2 text-xs ${active===i?"border-[#5b4ee6] bg-[#5b4ee6] text-white":"border-line bg-white text-ink"}`}>{s.title}</button>)}</div><div className="grid items-center gap-7 lg:grid-cols-[.65fr_1.35fr]"><div><h3 className="text-3xl font-semibold tracking-tight text-ink">{step.title}</h3><p className="mt-4 text-base leading-relaxed text-muted-ink">{step.body}</p><ul className="mt-4 space-y-2">{step.points.map(p=><li key={p} className="flex items-center gap-2 text-sm text-ink"><Check size={16}/>{p}</li>)}</ul></div>{step.key==="post"?<PlatformPreviewPanel/>:<Screen src={step.shots[shot]?.src || step.shots[0]!.src} alt={step.shots[shot]?.alt || step.shots[0]!.alt}/>}</div></div>;
}


/** One customer, start to finish: each step lights up in turn while on screen. */
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
