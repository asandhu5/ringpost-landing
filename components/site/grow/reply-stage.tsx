"use client";

import { useEffect, useState } from "react";
import { BookOpen, Check, MessageCircle, PenLine, Sparkles } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { DashboardReplies, GoogleReviews, InstagramComments, TikTokComments, XThread, type Thread } from "@/components/site/phone/comment-apps";

type Source = "instagram" | "tiktok" | "x" | "google";

const THREADS: Record<Source, Thread> = {
  instagram: {
    business: { name: "Studio & Co.", handle: "studioandco", color: "#db2777" },
    post: "/made/studio/beauty-post.webp",
    comment: { name: "Maya", handle: "maya.loves.hair", color: "#f59e0b", text: "Obsessed with this colour 😍 how much is balayage?", time: "2m" },
    reply: "Thank you! Balayage depends on your length, so send us a message with a photo and we'll give you a price and a time this week.",
    replied: false,
  },
  tiktok: {
    business: { name: "Forge Fitness", handle: "forgefitness", color: "#ea580c" },
    post: "/made/studio/fitness-post.webp",
    comment: { name: "Jordan", handle: "jordan.lifts", color: "#0ea5e9", text: "do you do beginner classes??", time: "5m" },
    reply: "We do! Beginner strength runs Tuesday and Thursday at 6 pm. First class is on us, send us a message to book in.",
    replied: false,
  },
  x: {
    business: { name: "Ember Grill", handle: "embergrill", color: "#d97706" },
    post: "/made/studio/burger-post.webp",
    comment: { name: "Sam", handle: "sam_eats_out", color: "#16a34a", text: "Is the kitchen open late on Fridays?", time: "8m" },
    reply: "It is! Kitchen's open until 10 pm on Fridays and Saturdays. Want us to save you a table?",
    replied: false,
  },
  google: {
    business: { name: "Brightside Dental", handle: "brightsidedental", color: "#0284c7" },
    post: "/made/studio/health-post.webp",
    comment: { name: "Priya", handle: "priya", color: "#7c3aed", text: "So calm and gentle. I used to dread the dentist, not any more.", time: "1 day ago", stars: 5 },
    reply: "Thank you so much! We're so glad your visit felt calm. See you at your next check-up.",
    replied: false,
  },
};

const SOURCES: { id: Source; name: string }[] = [
  { id: "instagram", name: "Instagram" },
  { id: "tiktok", name: "TikTok" },
  { id: "x", name: "X" },
  { id: "google", name: "Google reviews" },
];

const STEPS = [
  { Icon: MessageCircle, text: "A customer comments" },
  { Icon: BookOpen, text: "RingPost reads it with your knowledge" },
  { Icon: PenLine, text: "A reply is written in your tone" },
  { Icon: Check, text: "You approve, and it's posted" },
];

const KNOWS: Record<Source, string[]> = {
  instagram: ["Colour prices", "Free slots this week", "Tone: warm, friendly"],
  tiktok: ["Class timetable", "First class free", "Tone: upbeat"],
  x: ["Kitchen hours", "Table bookings", "Tone: relaxed"],
  google: ["Thank every review", "No private details", "Tone: caring"],
};

/** The reply flow, start to finish, on the real app and in the RingPost dashboard side
 * by side. It plays through each platform on its own until the visitor picks one. */
export function ReplyStage() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  const [source, setSource] = useState<Source>("instagram");
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(3);
      return;
    }
    if (step >= 3 && !auto) return;
    const id = setTimeout(() => {
      if (step < 3) setStep(step + 1);
      else {
        setSource(SOURCES[(SOURCES.findIndex((x) => x.id === source) + 1) % SOURCES.length].id);
        setStep(0);
      }
    }, step >= 3 ? 2600 : 1700);
    return () => clearTimeout(id);
  }, [inView, auto, step, source]);

  const t = { ...THREADS[source], replied: step >= 3 };
  const App = source === "instagram" ? InstagramComments : source === "tiktok" ? TikTokComments : source === "x" ? XThread : GoogleReviews;

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[36px] bg-[#0b1220] p-5 text-white sm:p-8">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#5b4ee6]/30 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#22d3ee]/20 blur-3xl" />

      <div className="relative flex flex-wrap justify-center gap-2" role="tablist" aria-label="Where the comment came from">
        {SOURCES.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={x.id === source} onClick={() => { setAuto(false); setSource(x.id); setStep(0); }} className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${x.id === source ? "bg-white text-[#0b1220]" : "bg-white/10 text-white/80 hover:bg-white/15"}`}>
            {x.id === "google" ? <span className="flex h-5 w-5 items-center justify-center rounded bg-white text-[11px] font-bold text-[#4285f4]">G</span> : <ChannelLogo id={x.id} size={20} />}
            {x.name}
          </button>
        ))}
      </div>

      <div className="relative mt-8 grid items-center gap-8 lg:grid-cols-[1fr_300px_1fr]">
        <div className="flex flex-col items-center">
          <p className="mb-3 text-[13px] font-semibold text-white/70">{source === "google" ? "Google Maps" : SOURCES.find((x) => x.id === source)!.name}</p>
          <div className="w-[250px]"><IPhone16ProMax width={250}><App t={t} /></IPhone16ProMax></div>
        </div>

        <div className="flex flex-col gap-3">
          {STEPS.map(({ Icon, text }, i) => (
            <div key={text} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${step >= i ? "border-white/25 bg-white/10" : "border-white/10 bg-white/[0.03]"}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${step > i ? "bg-[#22c55e] text-white" : step === i ? "bg-[#22d3ee] text-[#081c27]" : "bg-white/10 text-white/60"}`}>
                {step > i ? <Check className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
              </span>
              <span className={`text-[14px] font-semibold ${step >= i ? "text-white" : "text-white/70"}`}>{text}</span>
            </div>
          ))}
          <div className={`rounded-2xl border bg-[#5b4ee6]/20 p-4 transition-colors duration-500 ${step >= 1 ? "border-[#a594ff]/70" : "border-[#a594ff]/25"}`}>
            <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#c4bbff]"><Sparkles className="h-3.5 w-3.5" aria-hidden />What it used</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{KNOWS[source].map((k) => <span key={k} className="rounded-full bg-white/10 px-2.5 py-1 text-[12px] text-white/90">{k}</span>)}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="mb-3 text-[13px] font-semibold text-white/70">Your RingPost</p>
          <div className="w-[250px]"><IPhone16ProMax width={250}><DashboardReplies t={t} source={source} step={step} /></IPhone16ProMax></div>
        </div>
      </div>
    </div>
  );
}
