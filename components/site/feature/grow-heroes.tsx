import { ArrowRight, CalendarCheck, Check, Sparkles, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";

/** The signature pictures for the five Grow pages. Complete as drawn; motion only moves things into place. */
const I = (i: number) => ({ "--i": i }) as React.CSSProperties;
const txt = "text-[clamp(10.5px,2.5cqw,13.5px)]";

function Stage({ children, label, ratio = "aspect-[1.15]" }: { children: React.ReactNode; label: string; ratio?: string }) {
  return (
    <div role="img" aria-label={label} className={`rp-stage relative w-full ${ratio === "aspect-square" ? "max-w-[min(440px,calc(100svh-530px))]" : "max-w-[min(440px,calc((100svh-530px)*1.1))]"} sm:max-w-[520px] ${ratio} lg:aspect-auto lg:h-full lg:max-h-[min(100%,500px)] lg:max-w-[560px]`}>
      {children}
    </div>
  );
}
const Stars = ({ n }: { n: number }) => <span className="flex gap-[0.15em]">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`h-[1.1em] w-[1.1em] ${i < n ? "fill-[#f59e0b] text-[#f59e0b]" : "text-line-strong"}`} />)}</span>;

/** Reviews & comments: a review, a comment, and the reply being drafted between them. */
export function ReviewsHero() {
  return (
    <Stage label="A five-star Google review and an Instagram comment each get a reply drafted in the business's voice, waiting for approval.">
      <div aria-hidden className={`rp-slide-in absolute left-0 top-[2%] w-[62%] rounded-rp-md border border-line bg-white p-[3.2cqw] shadow-rp-2 ${txt}`} style={{ ...I(0), "--from": "-40px" } as React.CSSProperties}>
        <p className="flex items-center gap-2 font-semibold text-ink"><ChannelLogo id="google_business_profile" size={22} /> Google review <Stars n={5} /></p>
        <p className="mt-[0.6em] leading-snug text-ink">Booked by text at 10 pm and got a reply straight away. Great cut too.</p>
      </div>
      <div aria-hidden className={`rp-slide-in absolute right-0 top-[30%] w-[58%] rounded-rp-md border border-line bg-white p-[3.2cqw] shadow-rp-2 ${txt}`} style={{ ...I(1), "--from": "40px" } as React.CSSProperties}>
        <p className="flex items-center gap-2 font-semibold text-ink"><ChannelLogo id="instagram" size={22} /> Comment on your post</p>
        <p className="mt-[0.6em] leading-snug text-ink">Love this color! How much is balayage?</p>
      </div>
      <div aria-hidden className={`rp-drop absolute bottom-0 left-[8%] w-[80%] rounded-rp-md border border-primary-line bg-primary-soft p-[3.4cqw] shadow-rp-3 ${txt}`} style={I(3)}>
        <p className="flex items-center gap-1.5 font-semibold text-violet"><Sparkles className="h-[1.1em] w-[1.1em]" /> Reply in your voice</p>
        <p className="mt-[0.5em] leading-snug text-ink">Thank you! It depends on your length. Send us a photo and we&apos;ll give you a price and a time this week.</p>
        <p className="mt-[0.9em] flex justify-end gap-2"><span className="rounded-full border border-line-strong bg-white px-[1em] py-[0.4em] font-semibold text-ink">Edit</span><span className="rounded-full bg-cta px-[1em] py-[0.4em] font-semibold text-cta-ink">Approve</span></p>
      </div>
    </Stage>
  );
}

/** Win-back: four groups of quiet customers, and the bookings that come back. */
export function WinbackHero() {
  const groups = [["Slipping away", 38], ["Lapsed", 54], ["Long gone", 71], ["Asked but never booked", 23]] as const;
  return (
    <Stage label="Quiet customers sorted into four groups. A friendly message goes to one group and bookings come back.">
      <div aria-hidden className="absolute inset-x-0 top-0 grid grid-cols-2 gap-[2.4cqw]">
        {groups.map(([t, n], i) => (
          <div key={t} className={`rp-drop rounded-rp-md border p-[3cqw] shadow-rp-1 ${i === 0 ? "border-grow bg-grow-soft" : "border-line bg-white"}`} style={I(i)}>
            <p className={`${txt} font-medium text-muted-ink`}>{t}</p>
            <p className="font-display text-[clamp(20px,6cqw,34px)] leading-tight text-ink">{n}</p>
          </div>
        ))}
      </div>
      <div aria-hidden className={`rp-drop absolute bottom-0 left-0 w-[62%] rounded-rp-md border border-line bg-white p-[3.2cqw] shadow-rp-3 ${txt}`} style={I(5)}>
        <p className="flex items-center gap-1.5 font-semibold text-grow"><Sparkles className="h-[1.1em] w-[1.1em]" /> For &ldquo;Slipping away&rdquo;</p>
        <p className="mt-[0.5em] leading-snug text-ink">Hi! It&apos;s been a little while. We have a few openings this week and would love to see you.</p>
      </div>
      <div aria-hidden className={`rp-drop absolute bottom-[6%] right-0 flex w-[34%] flex-col gap-[1.6cqw] ${txt}`} style={I(7)}>
        {["Thu 3:00 pm", "Fri 10:00 am", "Sat 1:30 pm"].map((t) => <span key={t} className="flex items-center gap-1.5 rounded-full bg-ink px-[1em] py-[0.55em] font-semibold text-white shadow-rp-2"><CalendarCheck className="h-[1.1em] w-[1.1em] text-cta" /> {t}</span>)}
      </div>
    </Stage>
  );
}

/** Campaigns: one offer, written once, fanned out as a post for each app. */
export function CampaignsHero() {
  const posts = [["instagram", "-rotate-[5deg]", "left-0"], ["facebook", "", "left-[34%]"], ["google_business_profile", "rotate-[5deg]", "right-0"]] as const;
  return (
    <Stage label="One offer, Quiet Tuesday, becomes a post for Instagram, Facebook and Google Business.">
      <div aria-hidden className={`absolute left-1/2 top-0 w-[70%] -translate-x-1/2 rounded-rp-md border border-primary-line bg-white p-[3.2cqw] shadow-rp-2 ${txt}`}>
        <p className="font-semibold text-muted-ink">What&apos;s this campaign about?</p>
        <p className="mt-[0.4em] text-[1.15em] font-semibold text-ink">Quiet Tuesday: 20% off color</p>
      </div>
      <ArrowRight aria-hidden className="absolute left-1/2 top-[25%] h-[6cqw] w-[6cqw] -translate-x-1/2 rotate-90 text-violet" />
      {posts.map(([id, rot, pos], i) => (
        <div key={id} aria-hidden className={`rp-drop absolute bottom-0 ${pos} w-[32%] ${rot} overflow-hidden rounded-rp-md border border-line bg-white shadow-rp-3`} style={I(i * 1.5 + 1)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/showcase/beauty-post.webp" alt="" className="aspect-[4/5] w-full object-cover" />
          <p className={`flex items-center gap-1.5 p-[2.2cqw] font-semibold text-ink ${txt}`}><ChannelLogo id={id} size={20} /> <Check className="h-[1.1em] w-[1.1em] text-grow" strokeWidth={2.5} /> Caption ready</p>
        </div>
      ))}
    </Stage>
  );
}

/** Insights: a month of numbers, with the one line that says what they mean. */
export function InsightsHero() {
  const bars = [30, 44, 38, 56, 72, 92, 80, 60, 46, 36];
  return (
    <Stage label="A bar chart of the busiest hours, with one line in plain words: evenings are your busiest time.">
      <div aria-hidden className="absolute inset-[2%_4%_20%_0] flex flex-col rounded-rp-lg border border-line bg-white p-[4cqw] shadow-rp-3">
        <p className={`${txt} font-semibold text-ink`}>Busiest hours</p>
        <div className="mt-[3cqw] flex flex-1 items-end gap-[1.6cqw]">
          {bars.map((h, i) => <span key={i} className={`rp-bar-up flex-1 rounded-t-[1.2cqw] ${h > 70 ? "bg-grow" : "bg-grow/25"}`} style={{ height: `${h}%`, ...I(i) }} />)}
        </div>
        <p className={`mt-[1.5cqw] flex justify-between text-muted-ink ${txt}`}><span>8 am</span><span>2 pm</span><span>8 pm</span></p>
      </div>
      <p aria-hidden className={`rp-drop absolute bottom-0 right-0 w-[78%] rounded-rp-md bg-ink p-[3.4cqw] font-semibold leading-snug text-white shadow-rp-3 ${txt}`} style={I(6)}><span className="text-cta">In plain words:</span> evenings are your busiest time. Most bookings come in after 6 pm.</p>
    </Stage>
  );
}

/** Talk to AI: a question in plain words, and an answer with the numbers behind it. */
export function TalkHero() {
  return (
    <Stage label="The owner asks how this week is going. The answer comes back in plain words with a small chart.">
      <p aria-hidden className={`rp-slide-in absolute right-0 top-[4%] rounded-[1.3em] rounded-br-[0.3em] bg-violet px-[1.2em] py-[0.8em] text-[clamp(12px,3cqw,16px)] font-medium text-white shadow-rp-2`} style={{ ...I(0), "--from": "40px" } as React.CSSProperties}>How&apos;s this week going?</p>
      <div aria-hidden className={`rp-drop absolute bottom-[2%] left-0 w-[86%] rounded-rp-lg rounded-bl-[0.5em] border border-line bg-white p-[4cqw] shadow-rp-3 ${txt}`} style={I(2)}>
        <p className="text-[1.1em] leading-snug text-ink">A good week. <b className="font-semibold">34 bookings</b>, up from 27. Most of the extra came from Instagram DMs answered in the evening.</p>
        <div className="mt-[3cqw] flex h-[22cqw] items-end gap-[2.4cqw]">
          {[["Wk 1", 52], ["Wk 2", 60], ["Wk 3", 72], ["This week", 94]].map(([m, h], i) => (
            <span key={m} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.4em]">
              <span className={`rp-bar-up w-full rounded-t-[1.2cqw] ${i === 3 ? "bg-violet" : "bg-primary-line"}`} style={{ height: `${h}%`, ...I(i) }} />
              <span className="text-muted-ink">{m}</span>
            </span>
          ))}
        </div>
      </div>
    </Stage>
  );
}
