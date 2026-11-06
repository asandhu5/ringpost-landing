"use client";

import { useEffect, useState } from "react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { useInView } from "@/components/site/motion";
import { IPhone16ProMax } from "@/components/site/phone/iphone";
import { InstagramComments, PlatformComments, TikTokComments, XThread, type Thread } from "@/components/site/phone/comment-apps";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";

const at = (slug: string) => INDUSTRY_SHOWCASE.find((x) => x.slug === slug)!;

const DECK: { id: string; name: string; t: Thread }[] = [
  { id: "instagram", name: "Instagram", t: { business: at("shops").business, post: at("shops").after, comment: { name: "Lena", handle: "lena.k", color: "#e11d48", text: "Can I order these for Saturday?", time: "4m" }, reply: "You can! Same-day bouquets until 4 pm, and Saturday orders are open. Send us a message with the time you need them.", replied: true } },
  { id: "facebook", name: "Facebook", t: { business: at("home-services").business, post: at("home-services").after, comment: { name: "Mark Ellis", handle: "mark", color: "#2563eb", text: "Do you cover the north side of town?", time: "12m" }, reply: "We do, including weekends for urgent jobs. Message us a photo of the problem and we'll give you a time.", replied: true } },
  { id: "tiktok", name: "TikTok", t: { business: at("auto").business, post: at("auto").after, comment: { name: "Dev", handle: "dev.drives", color: "#2563eb", text: "how long does a full interior take", time: "12m" }, reply: "About three hours for a full interior. Two Saturday slots left, message us to grab one!", replied: true } },
  { id: "youtube", name: "YouTube", t: { business: at("fitness").business, post: at("fitness").after, comment: { name: "Jordan", handle: "jordan.lifts", color: "#0ea5e9", text: "Is this gym good for total beginners?", time: "1h" }, reply: "Absolutely. Our beginner strength class runs Tuesday and Thursday at 6 pm, and your first class is on us.", replied: true } },
  { id: "x", name: "X", t: { business: at("stays-and-venues").business, post: at("stays-and-venues").after, comment: { name: "Alex", handle: "alexontour", color: "#0891b2", text: "Any rooms free next weekend?", time: "20m" }, reply: "We have a couple left for next weekend. Send us a DM with your dates and we'll check for you.", replied: true } },
  { id: "linkedin", name: "LinkedIn", t: { business: at("professional-services").business, post: at("professional-services").after, comment: { name: "Hannah Price", handle: "hannah", color: "#7c3aed", text: "Do you help small companies with year-end accounts?", time: "2h" }, reply: "We do. Most of our clients are small businesses. Message us and we'll book a free first call this week.", replied: true } },
  { id: "threads", name: "Threads", t: { business: at("education-and-care").business, post: at("education-and-care").after, comment: { name: "Rosie", handle: "rosie.and.biscuit", color: "#f97316", text: "Do you groom anxious dogs?", time: "35m" }, reply: "We do, gently and at their pace. Quiet first appointments are available on weekday mornings.", replied: true } },
  { id: "bluesky", name: "Bluesky", t: { business: at("food-and-drink").business, post: at("food-and-drink").after, comment: { name: "Sam", handle: "sam_eats_out", color: "#16a34a", text: "Is the kitchen open late on Fridays?", time: "8m" }, reply: "It is! Kitchen's open until 10 pm on Fridays and Saturdays. Want us to save you a table?", replied: true } },
];

function Screen({ id, t }: { id: string; t: Thread }) {
  if (id === "instagram") return <InstagramComments t={t} />;
  if (id === "tiktok") return <TikTokComments t={t} />;
  if (id === "x") return <XThread t={t} />;
  return <PlatformComments platform={id as "facebook"} t={t} />;
}

/** Every comment platform as a deck of phones: each one slides to the front in turn with
 * the business's reply posted under the customer's comment. */
export function CommentDeck() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  const [front, setFront] = useState(0);
  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setFront((f) => (f + 1) % DECK.length), 2800);
    return () => clearTimeout(id);
  }, [inView, front]);
  const n = DECK.length;
  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative h-[620px] w-full max-w-[640px]">
        {DECK.map((card, i) => {
          const pos = (i - front + n) % n;
          const visible = pos < 4;
          const x = pos === 0 ? 0 : pos * 70;
          const style = {
            transform: `translateX(calc(-50% + ${x}px)) translateY(${pos * 16}px) rotate(${pos * 4}deg) scale(${1 - pos * 0.06})`,
            zIndex: n - pos,
            opacity: visible ? (pos === 0 ? 1 : 0.85 - pos * 0.15) : 0,
          };
          return (
            <div key={card.id} className="absolute left-1/2 top-0 w-[270px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" style={style} aria-hidden={pos !== 0}>
              <IPhone16ProMax width={270} label={pos === 0 ? `${card.name}: a customer's comment and the business's reply` : undefined}><Screen id={card.id} t={card.t} /></IPhone16ProMax>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Platforms">
        {DECK.map((card, i) => (
          <button key={card.id} type="button" role="tab" aria-selected={i === front} onClick={() => setFront(i)} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${i === front ? "bg-ink text-white" : "bg-white text-muted-ink ring-1 ring-line hover:text-ink"}`}>
            <ChannelLogo id={card.id} size={18} />{card.name}
          </button>
        ))}
      </div>
    </div>
  );
}
