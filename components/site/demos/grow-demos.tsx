"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Check, Send, Sparkles, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { cx } from "@/components/site/ui/cx";
import { useLive } from "./use-in-view";

const panel = "rounded-rp-md border border-line bg-white p-4 shadow-rp-1 sm:p-5";
const pick = (on: boolean) => cx("flex min-h-12 w-full items-center gap-3 rounded-rp-sm border px-3.5 py-2 text-left transition-colors duration-200", on ? "border-violet bg-primary-soft" : "border-line bg-white hover:border-primary-line");

/** Types `text` out when `go` flips on; whole text otherwise. */
function useTyped(text: string, go: boolean, key: unknown) {
  const [n, setN] = useState(text.length);
  useEffect(() => {
    if (!go) {
      setN(text.length);
      return;
    }
    setN(0);
    let i = 0;
    const t = setInterval(() => {
      i += 3;
      setN(i);
      if (i >= text.length) clearInterval(t);
    }, 24);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, go]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

/* ── Reviews & comments ─────────────────────────────────────────────────────── */
const ITEMS = [
  { id: "g5", logo: "google_business_profile", label: "Google review", stars: 5, text: "Booked by text at 10 pm and got a reply straight away. Great cut too.", reply: "Thank you so much! We're glad booking was easy, and that you love the cut. See you next time." },
  { id: "ig", logo: "instagram", label: "Instagram comment", stars: 0, text: "Love this color! How much is balayage?", reply: "Thank you! It depends on your length. Send us a photo and we'll give you a price and a time this week." },
  { id: "tt", logo: "tiktok", label: "TikTok comment", stars: 0, text: "Do you take walk-ins on Saturdays?", reply: "We do when a chair is free, but Saturdays fill up fast. Message us and we'll hold a time for you." },
  { id: "g2", logo: "google_business_profile", label: "Google review", stars: 2, text: "Good food but we waited 20 minutes past our booking and nobody told us why.", reply: "Thank you for telling us, and sorry for the wait. That's not the visit we want you to have. We've added a second check-in at busy times.", first: true },
];
export function ReviewsDemo() {
  const { ref, motion } = useLive<HTMLDivElement>();
  const [open, setOpen] = useState(0);
  const [touched, setTouched] = useState(false);
  const [posted, setPosted] = useState<string[]>([]);
  const it = ITEMS[open];
  const typed = useTyped(it.reply, motion && touched, open);
  const isPosted = posted.includes(it.id);
  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
      <ul className={cx(panel, "grid grid-cols-1 content-start gap-2")} aria-label="Reviews and comments">
        {ITEMS.map((x, i) => (
          <li key={x.id}>
            <button type="button" aria-pressed={i === open} onClick={() => { setOpen(i); setTouched(true); }} className={pick(i === open)}>
              <ChannelLogo id={x.logo} size={30} />
              <span className="min-w-0 flex-1 leading-tight">
                <span className="flex items-center gap-2 text-small font-semibold text-ink">{x.label}{x.stars > 0 && <span className="flex gap-0.5" aria-label={`${x.stars} out of 5 stars`}>{[0, 1, 2, 3, 4].map((s) => <Star key={s} className={cx("h-3 w-3", s < x.stars ? "fill-[#f59e0b] text-[#f59e0b]" : "text-line-strong")} aria-hidden />)}</span>}</span>
                <span className="block truncate text-[13px] text-muted-ink">{x.text}</span>
              </span>
              {posted.includes(x.id) ? <span className="rounded-full bg-grow-soft px-2.5 py-1 text-[12px] font-semibold text-grow">Posted</span> : x.first ? <span className="rounded-full bg-amber-soft px-2.5 py-1 text-[12px] font-semibold text-amber">Comes to you first</span> : null}
            </button>
          </li>
        ))}
      </ul>
      <div className={cx(panel, "flex flex-col")} aria-live="polite">
        <p className="flex items-center gap-2 text-small font-semibold text-ink"><ChannelLogo id={it.logo} size={24} /> {it.label}</p>
        <p className="mt-2 text-body text-ink">&ldquo;{it.text}&rdquo;</p>
        <div className="mt-4 flex-1 rounded-rp-sm bg-primary-soft p-4">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-violet"><Sparkles className="h-3.5 w-3.5" aria-hidden /> Reply drafted in your voice</p>
          <p className="relative mt-1.5 text-body text-ink"><span className="invisible">{it.reply}</span><span className="absolute inset-0">{typed.shown}{!typed.done && <span className="rp-caret" />}</span></p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-small text-muted-ink">{isPosted ? `Posted to ${it.logo === "google_business_profile" ? "Google" : it.label.split(" ")[0]}.` : "Nothing is posted until you approve."}</p>
          <button type="button" disabled={isPosted || !typed.done} onClick={() => setPosted((p) => [...p, it.id])} className={cx("rp-btn inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-small font-semibold", isPosted ? "bg-grow text-white" : "bg-cta text-cta-ink disabled:opacity-60")}>
            {isPosted ? <><Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> Approved</> : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Win-back ───────────────────────────────────────────────────────────────── */
const GROUPS = [
  { id: "slip", name: "Slipping away", n: 38, msg: "Hi! It's been a little while since your last visit to Golden Hour Hair. We have a few openings this week and would love to see you. Reply here and we'll find you a time." },
  { id: "lapsed", name: "Lapsed", n: 54, msg: "We miss you at Golden Hour Hair! We've added Sunday openings and a new gloss treatment since you were last in. Fancy coming back this month? Reply and we'll book you in." },
  { id: "gone", name: "Long gone", n: 71, msg: "Hello from Golden Hour Hair. It's been a long time, and we'd love to welcome you back. Booking takes one message: just reply with a day that suits you." },
  { id: "never", name: "Asked but never booked", n: 23, msg: "Hi! You got in touch with Golden Hour Hair a while ago but we never found you a time. If you'd still like a visit, reply here and we'll sort it in a minute." },
];
export function WinbackDemo() {
  const { ref, motion } = useLive<HTMLDivElement>();
  const [g, setG] = useState(0);
  const [touched, setTouched] = useState(false);
  const [channel, setChannel] = useState<"email" | "whatsapp">("email");
  const [sent, setSent] = useState<string[]>([]);
  const cur = GROUPS[g];
  const typed = useTyped(cur.msg, motion && touched, g);
  const isSent = sent.includes(cur.id);
  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr]">
      <div className={cx(panel, "grid grid-cols-2 content-start gap-2")} role="radiogroup" aria-label="Customer groups">
        {GROUPS.map((x, i) => (
          <button key={x.id} type="button" role="radio" aria-checked={i === g} onClick={() => { setG(i); setTouched(true); }} className={cx("rounded-rp-sm border p-3.5 text-left transition-colors duration-200", i === g ? "border-grow bg-grow-soft" : "border-line bg-white hover:border-grow/50")}>
            <span className="block text-small font-medium text-muted-ink">{x.name}</span>
            <span className="block font-display text-[1.9rem] leading-tight text-ink">{x.n}</span>
            <span className="text-[12.5px] text-muted-ink">customers</span>
          </button>
        ))}
      </div>
      <div className={cx(panel, "flex flex-col")} aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-small font-semibold text-grow"><Sparkles className="h-4 w-4" aria-hidden /> Message for &ldquo;{cur.name}&rdquo;</p>
          <div className="flex rounded-full border border-line p-0.5" role="radiogroup" aria-label="Send by">
            {(["email", "whatsapp"] as const).map((c) => (
              <button key={c} type="button" role="radio" aria-checked={channel === c} onClick={() => setChannel(c)} className={cx("flex h-9 items-center gap-2 rounded-full px-3 text-[13px] font-semibold transition-colors duration-200", channel === c ? "bg-ink text-white" : "text-ink")}>
                <ChannelLogo id={c} size={18} /> {c === "email" ? "Email" : "WhatsApp"}
              </button>
            ))}
          </div>
        </div>
        <p className="relative mt-3 flex-1 rounded-rp-sm bg-base p-4 text-body text-ink"><span className="invisible">{cur.msg}</span><span className="absolute inset-4">{typed.shown}{!typed.done && <span className="rp-caret" />}</span></p>
        <p className="mt-2 text-[13px] text-muted-ink">{channel === "email" ? "An unsubscribe link is added to every email." : "Goes from your own WhatsApp number, to customers outside the US and Canada. Each message says how to stop."}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {isSent && ["Thu 3:00 pm", "Fri 10:00 am", "Sat 1:30 pm"].map((t, i) => <span key={t} className="rp-drop inline-flex items-center gap-1.5 rounded-full bg-grow-soft px-3 py-1.5 text-[13px] font-semibold text-grow" style={{ "--i": i } as React.CSSProperties}><CalendarCheck className="h-3.5 w-3.5" aria-hidden /> Booked {t}</span>)}
            {!isSent && <span className="text-small text-muted-ink">You check it, then send.</span>}
          </div>
          <button type="button" disabled={isSent || !typed.done} onClick={() => setSent((s) => [...s, cur.id])} className={cx("rp-btn inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-small font-semibold", isSent ? "bg-grow text-white" : "bg-cta text-cta-ink disabled:opacity-60")}>
            {isSent ? <><Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> Sent</> : <><Send className="h-4 w-4" aria-hidden /> Send to {cur.n}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Campaigns ──────────────────────────────────────────────────────────────── */
const OFFERS = [
  { id: "tue", name: "Quiet Tuesday", brief: "20% off color every Tuesday this month, to fill our quietest day.", image: "/showcase/beauty-post.webp", caps: { instagram: "Quiet Tuesday: 20% off color, this Tuesday only. Message us to book.", facebook: "Tuesdays just got brighter. 20% off all color this month. Call or message to book your chair.", google_business_profile: "20% off color on Tuesdays this month. Book online or call us." } },
  { id: "brunch", name: "Weekend brunch", brief: "New weekend brunch menu, Saturdays and Sundays from 8 am.", image: "/showcase/food-post.webp", caps: { instagram: "Weekend brunch is here. Warm from the oven, Saturdays and Sundays from 8.", facebook: "Our new weekend brunch starts this Saturday. Doors open at 8 am. Bring the family.", google_business_profile: "New: weekend brunch, Saturdays and Sundays from 8 am." } },
  { id: "mum", name: "Mother's Day", brief: "Mother's Day bouquets, order by Friday for Sunday delivery.", image: "/showcase/shops-post.webp", caps: { instagram: "For the one who did it all. Mother's Day bouquets, order by Friday.", facebook: "Mother's Day is Sunday. Order your bouquet by Friday and we'll deliver it to her door.", google_business_profile: "Mother's Day bouquets. Order by Friday for Sunday delivery." } },
];
export function CampaignDemo() {
  const [o, setO] = useState(0);
  const [state, setState] = useState<Record<string, "ready" | "sent">>({});
  const cur = OFFERS[o];
  const st = state[cur.id] ?? "ready";
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.5fr]">
      <div className={cx(panel, "flex flex-col")}>
        <p className="text-small font-semibold text-muted-ink">Pick an offer to plan</p>
        <div className="mt-3 grid grid-cols-1 gap-2" role="radiogroup" aria-label="Offer">
          {OFFERS.map((x, i) => (
            <button key={x.id} type="button" role="radio" aria-checked={i === o} onClick={() => setO(i)} className={pick(i === o)}><span className="text-small font-semibold text-ink">{x.name}</span></button>
          ))}
        </div>
        <p className="mt-4 text-[12.5px] font-semibold uppercase tracking-[0.06em] text-muted-ink">What&apos;s this campaign about?</p>
        <p className="mt-1.5 rounded-rp-sm border border-line-strong p-3 text-body text-ink">{cur.brief}</p>
        <p className="mt-3 flex gap-2 text-[13px] font-semibold"><span className="rounded-full bg-violet px-3 py-1.5 text-white">Make it new with AI</span><span className="rounded-full border border-line-strong px-3 py-1.5 text-ink">Pick from my library</span></p>
      </div>
      <div className={cx(panel, "grid grid-cols-1 gap-4 sm:grid-cols-[200px_1fr]")} aria-live="polite">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={cur.id} src={cur.image} alt={`The picture made for ${cur.name}`} className="rp-drop mx-auto aspect-[4/5] w-full max-w-[200px] rounded-rp-sm object-cover shadow-rp-2" />
        <div className="flex flex-col">
          <p className="flex items-center gap-2 text-small font-semibold text-ink">{st === "sent" ? "Waiting in Approvals" : "Ready for you to check"} <span className={cx("rounded-full px-2.5 py-1 text-[12px]", st === "sent" ? "bg-grow-soft text-grow" : "bg-amber-soft text-amber")}>3 captions</span></p>
          <ul className="mt-3 grid grid-cols-1 gap-2">
            {(Object.entries(cur.caps) as [string, string][]).map(([id, t], i) => (
              <li key={`${cur.id}-${id}`} className="rp-drop flex items-start gap-3 rounded-rp-sm border border-line p-3" style={{ "--i": i } as React.CSSProperties}><ChannelLogo id={id} size={26} /><span className="text-small text-ink">{t}</span></li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
            <p className="text-[13px] text-muted-ink">Nothing goes out until you send it to Approvals and post it.</p>
            <button type="button" disabled={st === "sent"} onClick={() => setState((s) => ({ ...s, [cur.id]: "sent" }))} className={cx("rp-btn inline-flex h-11 items-center gap-2 rounded-full px-5 text-small font-semibold", st === "sent" ? "bg-grow text-white" : "bg-cta text-cta-ink")}>
              {st === "sent" ? <><Check className="h-4 w-4" strokeWidth={2.5} aria-hidden /> Sent to Approvals</> : "Looks good, send to Approvals"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Insights ───────────────────────────────────────────────────────────────── */
const SOURCES = [["Calls", 34, "bg-grow"], ["Instagram", 26, "bg-create"], ["WhatsApp", 18, "bg-[#25d366]"], ["Texts", 12, "bg-violet"], ["Email", 10, "bg-[#1a6ff0]"]] as const;
const POSTS = [
  { src: "/showcase/beauty-post-sm.webp", app: "instagram", t: "Balayage Reel", v: 94, views: "4,120", ok: true },
  { src: "/showcase/beauty-post-sm.webp", app: "tiktok", t: "Balayage video", v: 71, views: "2,980", ok: true },
  { src: "/showcase/food-post-sm.webp", app: "facebook", t: "Opening hours", v: 14, views: "160", ok: false },
  { src: "/showcase/shops-post-sm.webp", app: "google_business_profile", t: "Weekend offer", v: 38, views: "540", ok: true },
];
export function InsightsDemo() {
  const { ref, inView, motion } = useLive<HTMLDivElement>(0.25);
  const grow = !motion || inView; // bars are full unless we're about to animate them in
  const card = cx(panel, "flex flex-col");
  const reading = "mt-auto pt-4 text-small text-ink";
  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className={card}>
        <p className="text-small font-semibold text-ink">Where customers come from</p>
        <div className="mt-3 grid grid-cols-1 gap-2.5">
          {SOURCES.map(([n, v, c], i) => (
            <div key={n} className="flex items-center gap-3 text-small"><span className="w-20 text-ink">{n}</span><span className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2"><span className={cx("block h-full origin-left rounded-full transition-transform duration-[900ms] ease-rp", c)} style={{ width: `${v * 2.6}%`, transform: grow ? "none" : "scaleX(0.08)", transitionDelay: `${i * 90}ms` }} /></span><span className="w-9 text-right tabular-nums text-muted-ink">{v}%</span></div>
          ))}
        </div>
        <p className={reading}><b className="font-semibold text-grow">In plain words:</b> a third of your customers still call, and Instagram is catching up.</p>
      </div>
      <div className={card}>
        <p className="text-small font-semibold text-ink">Busiest hours</p>
        <div className="mt-3 flex h-[120px] items-end gap-1.5">
          {[20, 34, 52, 44, 30, 62, 88, 70, 48, 36, 58, 40].map((h, i) => <span key={i} className={cx("flex-1 origin-bottom rounded-t-[4px] transition-transform duration-[900ms] ease-rp", h > 60 ? "bg-grow" : "bg-grow/25")} style={{ height: `${h}%`, transform: grow ? "none" : "scaleY(0.1)", transitionDelay: `${i * 60}ms` }} />)}
        </div>
        <p className="mt-1.5 flex justify-between text-[12px] text-muted-ink"><span>8 am</span><span>2 pm</span><span>8 pm</span></p>
        <p className={reading}><b className="font-semibold text-grow">In plain words:</b> evenings are your busiest time, when you&apos;re least able to answer.</p>
      </div>
      <div className={card}>
        <p className="text-small font-semibold text-ink">What customers keep asking</p>
        <ul className="mt-3 grid grid-cols-1 gap-2">
          {[["Do you open Sundays?", 21], ["How much is a full color?", 17], ["Can I cancel the same day?", 9]].map(([q, n]) => <li key={q} className="flex items-center justify-between gap-3 rounded-rp-sm bg-base px-3 py-2.5 text-small text-ink">{q}<b className="font-semibold tabular-nums text-violet">{n} times</b></li>)}
        </ul>
        <p className={reading}><b className="font-semibold text-grow">In plain words:</b> Sunday opening is the question to answer on your Knowledge page.</p>
      </div>
      <div className={cx(card, "sm:col-span-2")}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="text-small font-semibold text-ink">How each post did, on each app</p>
          <p className="text-[13px] text-muted-ink">Views, likes, comments and shares, counted for you</p>
        </div>
        <ul className="mt-3 grid grid-cols-1 gap-2">
          {POSTS.map((p, i) => (
            <li key={p.t + p.app} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-rp-sm bg-base p-2.5 sm:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1.4fr)_auto]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" loading="lazy" className="h-11 w-11 rounded-rp-sm object-cover" />
              <span className="flex min-w-0 items-center gap-2 text-small font-semibold text-ink"><ChannelLogo id={p.app} size={22} /><span className="truncate">{p.t}</span></span>
              <span className="col-span-3 flex items-center gap-3 sm:col-span-1">
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white"><span className={cx("block h-full origin-left rounded-full transition-transform duration-[900ms] ease-rp", p.ok ? "bg-grow" : "bg-amber")} style={{ width: `${p.v}%`, transform: grow ? "none" : "scaleX(0.08)", transitionDelay: `${i * 90}ms` }} /></span>
                <span className="w-[5.5rem] shrink-0 text-[12.5px] tabular-nums text-muted-ink">{p.views} views</span>
              </span>
              <span className={cx("row-start-1 col-start-3 rounded-full px-2.5 py-1 text-[12px] font-semibold sm:col-start-4", p.ok ? "bg-grow-soft text-grow" : "bg-amber-soft text-amber")}>{p.ok ? "Working" : "Not working"}</span>
            </li>
          ))}
        </ul>
        <p className={reading}><b className="font-semibold text-grow">What happens next:</b> RingPost builds your next posts on the ones your audience responded to. Here, that means more finished-hair videos on Instagram and TikTok.</p>
      </div>
    </div>
  );
}

/* ── Talk to AI ─────────────────────────────────────────────────────────────── */
const QA = [
  { q: "How's this week going?", a: "A good week. You've had 34 bookings so far, up from 27 last week. Most of the extra came from Instagram DMs answered after 6 pm.", bars: [["Last week", 27], ["This week", 34]] },
  { q: "What are customers asking?", a: "Three things come up most: whether you open Sundays (21 times), the price of a full color (17) and same-day cancellations (9). The Sunday question has no answer on your Knowledge page yet.", bars: [["Sundays", 21], ["Color price", 17], ["Cancelling", 9]] },
  { q: "What do reviews say?", a: "You have 12 new reviews, 10 of them five stars. People mention fast replies and easy booking. One two-star review about a wait on Saturday is waiting for your reply. Start with that one.", bars: [["5 stars", 10], ["4 stars", 1], ["2 stars", 1]] },
  { q: "Who still needs an answer?", a: "Two conversations are waiting on you: a wedding party asking to speak to the owner on Instagram, and a refund question by email. Everything else has been answered.", bars: [["Waiting on you", 2], ["Answered", 56]] },
] as const;
export function TalkDemo() {
  const { ref, motion } = useLive<HTMLDivElement>();
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const cur = QA[i];
  const typed = useTyped(cur.a, motion && touched, i);
  const max = Math.max(...cur.bars.map((b) => b[1]));
  return (
    <div ref={ref} className="grid grid-cols-1 gap-4 lg:grid-cols-[0.8fr_1.5fr]">
      <div className={cx(panel, "grid grid-cols-1 content-start gap-2")} role="radiogroup" aria-label="Questions to ask">
        <p className="pb-1 text-small font-semibold text-muted-ink">Tap a question</p>
        {QA.map((x, n) => (
          <button key={x.q} type="button" role="radio" aria-checked={n === i} onClick={() => { setI(n); setTouched(true); }} className={pick(n === i)}><span className="text-small font-semibold text-ink">{x.q}</span></button>
        ))}
      </div>
      <div className={cx(panel, "flex min-h-[340px] flex-col gap-3")} aria-live="polite">
        <p className="max-w-[80%] self-end rounded-rp-md rounded-br-md bg-violet px-4 py-2.5 text-body text-white">{cur.q}</p>
        <div className="max-w-[92%] self-start rounded-rp-md rounded-bl-md border border-line bg-base px-4 py-3">
          <p className="relative text-body text-ink"><span className="invisible">{cur.a}</span><span className="absolute inset-0">{typed.shown}{!typed.done && <span className="rp-caret" />}</span></p>
          <div className={cx("mt-4 grid gap-2 transition-opacity duration-500", typed.done ? "opacity-100" : "opacity-30")}>
            {cur.bars.map(([n, v]) => (
              <div key={n} className="flex items-center gap-3 text-small"><span className="w-28 shrink-0 text-ink">{n}</span><span className="h-3 flex-1 overflow-hidden rounded-full bg-white"><span className="block h-full rounded-full bg-violet transition-[width] duration-700 ease-rp" style={{ width: `${(v / max) * 100}%` }} /></span><span className="w-8 text-right font-semibold tabular-nums text-ink">{v}</span></div>
            ))}
          </div>
        </div>
        <p className="mt-auto rounded-rp-sm border border-line-strong px-4 py-3 text-small text-muted-ink">Ask about your business…</p>
      </div>
    </div>
  );
}
