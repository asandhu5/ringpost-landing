"use client";

/**
 * The home page's story (2026-11-01): the problem an owner lives with, how RingPost
 * solves each part, why no other tool does all of it, and the content studio. Every
 * claim is something the product does today; no invented customers, numbers or ratings.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, CalendarDays, Check, Clapperboard, Flame, Image as ImageIcon, Megaphone, MessageSquareX, Minus, PhoneMissed, Send, Shuffle, Sparkles, TimerOff, Wand2 } from "lucide-react";
import { useInView } from "@/components/site/motion";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/* ───────────────────────── Problem → solution ───────────────────────── */

const PAIRS = [
  {
    icon: PhoneMissed,
    tone: "#e11d48",
    problem: "Calls ring while your hands are busy.",
    fix: "Every call answered in a natural voice, booked straight into your calendar.",
  },
  {
    icon: Shuffle,
    tone: "#d97706",
    problem: "Messages are spread over five apps.",
    fix: "WhatsApp, Instagram, Messenger, texts and email in one inbox, all answered.",
  },
  {
    icon: TimerOff,
    tone: "#0284c7",
    problem: "Posting every day takes hours you don't have.",
    fix: "Fresh images and videos made each morning from your own services, posted for you.",
  },
  {
    icon: MessageSquareX,
    tone: "#7c3aed",
    problem: "Reviews and comments sit unanswered.",
    fix: "Thoughtful replies drafted in your voice, ready for one tap.",
  },
  {
    icon: BarChart3,
    tone: "#059669",
    problem: "You can't tell what's actually working.",
    fix: "Plain-word insights from your real calls, messages and posts. Ask the AI anything.",
  },
] as const;

export function ProblemSolution() {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: "-15% 0px", threshold: 0 });
  return (
    <div ref={ref} className="overflow-hidden rounded-[32px] border border-line bg-white shadow-[0_30px_80px_-40px_rgba(11,27,43,0.35)]">
      <div className="grid border-b border-line md:grid-cols-[1fr_auto_1fr]">
        <p className="px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#be123c] sm:px-8">Without RingPost</p>
        <span className="hidden md:block" />
        <p className="border-t border-line px-6 py-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#047857] sm:px-8 md:border-t-0">With RingPost</p>
      </div>
      {PAIRS.map((p, i) => (
        <div
          key={p.problem}
          className={cx("grid items-center border-b border-line last:border-b-0 md:grid-cols-[1fr_auto_1fr]", "transition-all duration-700", inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}
          style={{ transitionDelay: `${i * 110}ms` }}
        >
          <div className="flex items-center gap-4 px-6 py-5 sm:px-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${p.tone}14`, color: p.tone }}>
              <p.icon className="h-5 w-5" aria-hidden />
            </span>
            <p className="text-[16px] font-medium text-ink sm:text-[17px]">{p.problem}</p>
          </div>
          <span className="hidden h-full items-center px-2 md:flex" aria-hidden>
            <ArrowRight className="h-5 w-5 text-faint" />
          </span>
          <div className="flex items-start gap-3 bg-[#f6fbf8] px-6 py-5 sm:px-8 md:h-full md:items-center md:bg-[linear-gradient(90deg,#f3fbf6,#ffffff)]">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#059669] md:mt-0" aria-hidden />
            <p className="text-[15.5px] leading-relaxed text-ink">{p.fix}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── The USP: one brain, both jobs ───────────────────────── */

const ROWS = [
  { label: "Answers phone calls", desk: true, social: false },
  { label: "Replies on WhatsApp, Instagram, Messenger, texts and email", desk: "Some", social: false },
  { label: "Books into your calendar", desk: true, social: false },
  { label: "Makes images and videos for you", desk: false, social: "Some" },
  { label: "Posts on every platform", desk: false, social: true },
  { label: "Answers comments and reviews", desk: false, social: "Some" },
  { label: "Wins back quiet customers", desk: false, social: false },
  { label: "One AI that knows your whole business", desk: false, social: false },
] as const;

function Cell({ v, strong }: { v: boolean | string; strong?: boolean }) {
  if (v === true) return <Check className={cx("mx-auto h-5 w-5", strong ? "text-[#22d3ee]" : "text-[#94a3b8]")} aria-label="Yes" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-[#475569]" aria-label="No" />;
  return <span className="block text-center text-[12.5px] text-[#94a3b8]">{v}</span>;
}

export function UspCompare() {
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-[#0b1b2b] px-5 py-12 text-white sm:px-10 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,108,255,0.45),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.3),transparent_65%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#67e8f9]">Why RingPost</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            Other tools do one job.
            <br />
            <span className="bg-gradient-to-r from-[#a594ff] via-[#7dd3fc] to-[#22d3ee] bg-clip-text text-transparent">RingPost does all of them.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-[#b8c2ce]">
            Receptionist apps answer the phone. Social tools post for you. RingPost does both, with one AI that knows your services, prices and customers, so the call, the booking and the post all say the same thing.
          </p>
          <ul className="mt-7 flex flex-col gap-3 text-[15px]">
            {["One login, one bill", "Set up in minutes, keep your number", "Nothing goes out without your say, unless you switch on autopilot"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22d3ee]/15 text-[#22d3ee]">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left text-[14.5px]">
            <thead>
              <tr>
                <th scope="col" className="pb-4 font-normal">
                  <span className="sr-only">What it does</span>
                </th>
                <th scope="col" className="w-[118px] px-2 pb-4 text-center text-[12px] font-semibold leading-tight text-[#94a3b8]">
                  Receptionist apps
                </th>
                <th scope="col" className="w-[118px] px-2 pb-4 text-center text-[12px] font-semibold leading-tight text-[#94a3b8]">
                  Social media tools
                </th>
                <th scope="col" className="w-[120px] rounded-t-2xl bg-white/[0.07] pb-4 pt-4 text-center text-[14px] font-bold text-white">
                  RingPost
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label}>
                  <th scope="row" className="border-t border-white/10 py-3.5 pr-4 font-normal text-[#dbe3ec]">
                    {r.label}
                  </th>
                  <td className="border-t border-white/10 py-3.5">
                    <Cell v={r.desk} />
                  </td>
                  <td className="border-t border-white/10 py-3.5">
                    <Cell v={r.social} />
                  </td>
                  <td className={cx("border-t border-white/10 bg-white/[0.07] py-3.5", i === ROWS.length - 1 && "rounded-b-2xl")}>
                    <Cell v strong />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Content studio ───────────────────────── */

const IMAGE_MODELS = [
  { name: "Nano Banana Pro", by: "Google", note: "Sharpest detail, readable text" },
  { name: "Nano Banana 2", by: "Google", note: "Fast, true to your product" },
  { name: "Seedream 5.0", by: "ByteDance", note: "Rich colour for food and interiors" },
  { name: "Seedream 5.0 Lite", by: "ByteDance", note: "Quick drafts" },
  { name: "Higgsfield Soul", by: "Higgsfield", note: "Natural, everyday photos" },
];

const VIDEO_MODELS = [
  { name: "Veo 3.1", by: "Google", note: "Film-like, with sound" },
  { name: "Veo 3.1 Fast", by: "Google", note: "Veo quality, lower cost" },
  { name: "Kling 3.0", by: "Kuaishou", note: "Realistic people and camera moves" },
  { name: "Seedance 2.0", by: "ByteDance", note: "Multi-shot clips that follow the brief" },
  { name: "Seedance 2.0 Fast", by: "ByteDance", note: "Everyday Reels" },
  { name: "Wan 2.7", by: "Alibaba", note: "Smooth motion" },
  { name: "Hailuo 2.3", by: "MiniMax", note: "Expressive short clips" },
];

const MAKER_TONE: Record<string, string> = {
  Google: "#1a73e8",
  ByteDance: "#0f766e",
  Kuaishou: "#ea580c",
  Alibaba: "#d97706",
  MiniMax: "#db2777",
  Higgsfield: "#111827",
};

const CONTENT_FEATURES = [
  { icon: CalendarDays, tone: "#5b4ee6", title: "Daily posts, made for you", body: "Every morning: images and short videos from your own services and prices, with your logo." },
  { icon: Flame, tone: "#e11d48", title: "Trending ideas, one tap", body: "POVs, day-in-the-life, transformations: the formats doing well right now, made about your business." },
  { icon: Megaphone, tone: "#d97706", title: "Campaigns from one line", body: "“Weekend special starts Friday.” A teaser, an announcement, a reminder and a last call, written and made." },
  { icon: Send, tone: "#0284c7", title: "Posted everywhere", body: "Instagram, Facebook, TikTok, X, YouTube, LinkedIn, Pinterest, Threads and Bluesky, shaped for each." },
  { icon: Wand2, tone: "#059669", title: "Your photos, polished", body: "Upload from your phone; it checks them, writes the captions and picks the time." },
  { icon: Clapperboard, tone: "#7c3aed", title: "You choose the model", body: "Pick the look and the price before anything is made. Failed ones are refunded." },
];

const GALLERY = [
  { src: "/made/ideas/pov-first-visit.webp", tag: "POV · Reels" },
  { src: "/made/ideas/transformation.webp", tag: "Before and after" },
  { src: "/made/ideas/day-in-the-life.webp", tag: "Day in the life" },
  { src: "/made/ideas/products-flatlay.webp", tag: "Product flat lay" },
  { src: "/made/ideas/asmr-details.webp", tag: "Close-up details" },
  { src: "/made/ideas/space-tour.webp", tag: "Space tour" },
];

export function ContentStudio() {
  const [kind, setKind] = useState<"image" | "video">("video");
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setShown((n) => (n + 1) % GALLERY.length), 2600);
    return () => clearInterval(t);
  }, []);
  const models = kind === "image" ? IMAGE_MODELS : VIDEO_MODELS;
  return (
    <div className="relative overflow-hidden rounded-[36px] border border-line bg-[linear-gradient(135deg,#fff7ed_0%,#fdf2f8_35%,#f5f3ff_70%,#ecfeff_100%)] px-5 py-12 sm:px-10 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[13px] font-semibold text-[#c2410c] shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Content studio
          </p>
          <h2 className="mt-5 text-[clamp(2rem,3.8vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">A full content team, without hiring one.</h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-ink">
            The world&apos;s best image and video models, in one place, already knowing your business. You never start from a blank page.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {CONTENT_FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/80 bg-white/75 p-4 shadow-[0_1px_2px_rgba(11,27,43,0.04)] backdrop-blur transition-transform hover:-translate-y-0.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${f.tone}16`, color: f.tone }}>
                  <f.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <p className="mt-3 text-[15px] font-semibold text-ink">{f.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-muted-ink">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#0b1b2b] shadow-[0_30px_70px_-30px_rgba(11,27,43,0.55)]">
            {GALLERY.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={g.src}
                src={g.src}
                alt=""
                loading="lazy"
                className={cx("absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms]", i === shown ? "scale-100 opacity-100" : "scale-105 opacity-0")}
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-5">
              <span className="rounded-full bg-white/90 px-3 py-1 text-[12.5px] font-semibold text-ink">{GALLERY[shown].tag}</span>
              <span className="flex gap-1.5">
                {GALLERY.map((g, i) => (
                  <span key={g.src} className={cx("h-1.5 rounded-full bg-white transition-all", i === shown ? "w-5 opacity-100" : "w-1.5 opacity-50")} />
                ))}
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-white/80 bg-white/85 p-5 backdrop-blur">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-[14px] font-semibold text-ink">Models you can choose</p>
              <div className="flex rounded-full bg-surface-2 p-1" role="tablist" aria-label="Model type">
                {(["video", "image"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    role="tab"
                    aria-selected={kind === k}
                    onClick={() => setKind(k)}
                    className={cx("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold transition-colors", kind === k ? "bg-white text-ink shadow-sm" : "text-muted-ink")}
                  >
                    {k === "video" ? <Clapperboard className="h-3.5 w-3.5" aria-hidden /> : <ImageIcon className="h-3.5 w-3.5" aria-hidden />}
                    {k === "video" ? "Video" : "Image"}
                  </button>
                ))}
              </div>
            </div>
            <ul key={kind} className="grid gap-2 sm:grid-cols-2">
              {models.map((m, i) => (
                <li key={m.name} className="rp-rise flex items-center gap-3 rounded-xl px-2 py-1.5" style={{ animationDelay: `${i * 50}ms` }}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-extrabold text-white" style={{ background: MAKER_TONE[m.by] }}>
                    {m.by.slice(0, 1)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-semibold text-ink">{m.name}</span>
                    <span className="block truncate text-[12.5px] text-muted-ink">
                      {m.by} · {m.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[13px] text-muted-ink">
              Paid in media credits, included with{" "}
              <Link href="/pricing" className="font-semibold text-[#5b4ee6] hover:underline">
                Growth and Pro
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
