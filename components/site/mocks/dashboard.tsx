import { BarChart3, Calendar, Check, CheckSquare, Edit3, Globe, Grid2x2, Image as ImageIcon, Inbox, RefreshCw, Send, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { LogoMark } from "@/components/site/logo";

/**
 * The RingPost dashboard, drawn in code so it is sharp at any size and can move. It
 * mirrors the real one (ringpost/apps/dashboard, light theme): the same sidebar groups
 * and names, the same colors, the same kinds of screen. Demo data only, and no
 * people's names: customers are "New customer" or a role.
 *
 * Drawn at a fixed 1000 × 560 and scaled by its frame (see ScaledScreen).
 */

export const DASH_W = 1000;
export const DASH_H = 560;

export type DashId = "home" | "inbox" | "calendar" | "customers" | "knowledge" | "media" | "approvals" | "reviews" | "campaigns" | "winback" | "insights" | "talk" | "connections" | "automation" | "setup" | "billing";
type IconType = React.ComponentType<{ className?: string; strokeWidth?: number }>;

/** The real sidebar, group by group (dashboard/app/_design/Shell.tsx). */
const SIDEBAR: { label: string; items: { id?: DashId; name: string; icon: IconType }[] }[] = [
  { label: "Every day", items: [{ id: "home", name: "Home", icon: Grid2x2 }, { id: "inbox", name: "Inbox", icon: Inbox }, { id: "calendar", name: "Calendar", icon: Calendar }, { id: "customers", name: "Customers", icon: Users }, { id: "knowledge", name: "Knowledge", icon: Edit3 }] },
  { label: "Content", items: [{ id: "media", name: "Media Library", icon: ImageIcon }, { id: "approvals", name: "Approvals", icon: CheckSquare }, { id: "reviews", name: "Reviews & Comments", icon: Star }, { id: "campaigns", name: "Campaigns", icon: Send }, { id: "winback", name: "Win Back", icon: RefreshCw }] },
  { label: "Grow", items: [{ id: "insights", name: "Insights", icon: TrendingUp }, { id: "talk", name: "Talk to AI", icon: Sparkles }] },
  { label: "Your setup", items: [{ id: "connections", name: "Connections", icon: Globe }, { id: "automation", name: "Automation", icon: Zap }] },
];

/** The ten screens shown on the home page, in the sidebar's order, each with a caption in plain words. */
export const DASH_TABS: { id: DashId; name: string; caption: string }[] = [
  { id: "home", name: "Home", caption: "what happened today and what needs you." },
  { id: "inbox", name: "Inbox", caption: "every call and message, from every channel, in one list." },
  { id: "calendar", name: "Calendar", caption: "each person's bookings, synced with Google Calendar." },
  { id: "knowledge", name: "Knowledge", caption: "everything RingPost knows about your business." },
  { id: "media", name: "Media Library", caption: "your photos, your videos and fresh posts each morning." },
  { id: "approvals", name: "Approvals", caption: "anything waiting for your OK, in one place." },
  { id: "reviews", name: "Reviews & Comments", caption: "replies drafted in your voice, ready to approve." },
  { id: "winback", name: "Win-back", caption: "customers who've gone quiet, ready to invite back." },
  { id: "insights", name: "Insights", caption: "where customers come from and what they keep asking." },
  { id: "talk", name: "Talk to AI", caption: "ask anything about your business, in plain words." },
];

const card = "rounded-[14px] border border-line bg-white";
const h1 = "text-[22px] font-semibold tracking-[-0.02em] text-ink";
const sub = "text-[12.5px] text-muted-ink";
const Pill = ({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "violet" | "amber" | "grey" }) => (
  <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-[3px] text-[11px] font-semibold ${{ green: "bg-grow-soft text-grow", violet: "bg-primary-soft text-violet", amber: "bg-amber-soft text-amber", grey: "bg-surface-2 text-muted-ink" }[tone]}`}>{children}</span>
);
const Btn = ({ children, primary }: { children: React.ReactNode; primary?: boolean }) => (
  <span className={`inline-flex h-7 items-center rounded-full px-3 text-[11.5px] font-semibold ${primary ? "bg-cta text-cta-ink" : "border border-line-strong bg-white text-ink"}`}>{children}</span>
);

function Head({ title, note, right }: { title: string; note?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h3 className={h1}>{title}</h3>
      {note && <Pill>{note}</Pill>}
      <span className="ml-auto flex items-center gap-2">{right}</span>
    </div>
  );
}

function Home() {
  return (
    <>
      <Head title="Good afternoon" note="AI is handling everything" />
      <div className="grid grid-cols-4 gap-3">
        {[["Calls answered", "14"], ["Messages answered", "32"], ["Bookings made", "9"], ["Needs you", "2"]].map(([l, n], i) => (
          <div key={l} className={`${card} p-3.5`}>
            <p className={sub}>{l}</p>
            <p className={`mt-1 text-[26px] font-semibold tabular-nums tracking-[-0.02em] ${i === 3 ? "text-amber" : "text-ink"}`}>{n}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[13px] font-semibold text-ink">Today</p>
          {[["phone", "Missed call, called back", "Booked Thu 3:00 pm", "7:05 am"], ["instagram", "Instagram DM answered", "Booked Sat 2:00 pm", "9:16 am"], ["whatsapp", "WhatsApp question about prices", "Answered", "11:02 am"], ["email", "Email quote request", "Booked Fri 10:00 am", "1:14 pm"]].map(([id, t, o, time]) => (
            <div key={t} className="mt-2.5 flex items-center gap-2.5 border-t border-line pt-2.5">
              <ChannelLogo id={id} size={24} />
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-ink">{t}</span>
              <Pill>{o}</Pill>
              <span className="w-14 text-right text-[11px] text-muted-ink">{time}</span>
            </div>
          ))}
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[13px] font-semibold text-ink">Needs you</p>
          {[["A customer asked to speak to you", "Open"], ["A 2-star review is waiting for your OK", "Review"]].map(([t, b]) => (
            <div key={t} className="mt-2.5 flex items-center gap-2 rounded-[10px] bg-amber-soft/60 p-2.5">
              <span className="min-w-0 flex-1 text-[12px] leading-snug text-ink">{t}</span>
              <Btn>{b}</Btn>
            </div>
          ))}
          <p className="mt-3 text-[12.5px] font-semibold text-ink">Today&apos;s post</p>
          <div className="mt-2 flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/showcase/beauty-post.webp" alt="" className="h-12 w-12 rounded-[8px] object-cover" loading="lazy" />
            <span className="text-[12px] leading-snug text-muted-ink">Ready in your Media Library. Pick it to post.</span>
          </div>
        </div>
      </div>
    </>
  );
}

function InboxScreen() {
  const rows = [["instagram", "New customer", "Done. You're booked for Saturday at 2:00 pm.", "AI handling", true], ["phone", "Missed call", "Called back and booked Thu 3:00 pm.", "Resolved", false], ["whatsapp", "New customer", "Yes, we have a table for 4 tomorrow at 8…", "AI handling", false], ["sms", "Returning customer", "Of course. Tuesday 9:00 am or Thursday…", "AI handling", false], ["email", "New customer", "A full detail is $180 and takes about…", "Resolved", false]] as const;
  return (
    <>
      <Head title="Inbox" note="AI is handling everything" />
      <div className={`${card} grid h-[440px] grid-cols-[150px_1fr_1.15fr] overflow-hidden`}>
        <div className="border-r border-line p-2.5 text-[12.5px]">
          {[["All", "58"], ["Needs you", "2"]].map(([n, c]) => (
            <p key={n} className="flex justify-between rounded-[8px] px-2 py-1.5 font-medium text-ink"><span>{n}</span><span className="text-muted-ink">{c}</span></p>
          ))}
          <p className="mt-2 px-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-ink">Channels</p>
          {[["Calls", 14], ["WhatsApp", 11], ["Instagram", 12], ["Messenger", 6], ["Texts", 9], ["Email", 6]].map(([n, c]) => (
            <p key={n} className={`mt-0.5 flex justify-between rounded-[8px] px-2 py-1.5 ${n === "Instagram" ? "bg-primary-soft font-semibold text-ink" : "text-ink"}`}><span>{n}</span><span className="text-muted-ink">{c}</span></p>
          ))}
        </div>
        <div className="border-r border-line">
          {rows.map(([id, who, text, state, on]) => (
            <div key={text} className={`flex gap-2.5 border-b border-line p-3 ${on ? "border-l-[3px] border-l-violet bg-primary-soft/60" : ""}`}>
              <ChannelLogo id={id} size={26} />
              <span className="min-w-0 flex-1">
                <span className="block text-[12.5px] font-semibold text-ink">{who}</span>
                <span className="block truncate text-[12px] text-muted-ink">{text}</span>
                <span className="mt-1 block"><Pill tone={state === "Resolved" ? "grey" : "green"}>{state}</Pill></span>
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col bg-base/60">
          <div className="flex items-center gap-2 border-b border-line bg-white px-3.5 py-2.5">
            <ChannelLogo id="instagram" size={24} />
            <span className="text-[12.5px] font-semibold text-ink">Instagram DM</span>
            <Pill>AI is answering</Pill>
            <span className="ml-auto"><Btn>Take over</Btn></span>
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2 p-3.5 text-[12.5px] leading-snug">
            <p className="max-w-[85%] self-start rounded-[14px] rounded-bl-[4px] border border-line bg-white px-3 py-2 text-ink">Hi! How much is a full color? Anything free Saturday?</p>
            <p className="max-w-[85%] self-end rounded-[14px] rounded-br-[4px] bg-violet px-3 py-2 text-white">A full color starts at $120 and takes about two hours. Saturday I have 10:30 am or 2:00 pm.</p>
            <p className="max-w-[85%] self-start rounded-[14px] rounded-bl-[4px] border border-line bg-white px-3 py-2 text-ink">2:00 please!</p>
            <p className="max-w-[85%] self-end rounded-[14px] rounded-br-[4px] bg-violet px-3 py-2 text-white">Done. You&apos;re booked for Saturday at 2:00 pm.</p>
          </div>
          <div className="m-3 mt-0 rounded-[10px] border border-line bg-white px-3 py-2.5 text-[12px] text-muted-ink">Reply to take over. The AI pauses on this thread until you hand it back.</div>
        </div>
      </div>
    </>
  );
}

function CalendarScreen() {
  const cols = ["Stylist", "Colorist", "Barber"];
  const blocks: [number, number, number, string, string][] = [[0, 0, 2, "Cut and style", "bg-primary-soft text-violet"], [0, 3, 2, "Blow-dry", "bg-grow-soft text-grow"], [1, 1, 4, "Full color", "bg-create-soft text-create"], [2, 0, 1, "Fade", "bg-amber-soft text-amber"], [2, 2, 1, "Beard trim", "bg-primary-soft text-violet"], [2, 4, 2, "Cut and style", "bg-grow-soft text-grow"], [1, 6, 1, "Consultation", "bg-primary-soft text-violet"]];
  return (
    <>
      <Head title="Calendar" right={<><Pill tone="grey">Synced with Google Calendar</Pill><Btn primary>New booking</Btn></>} />
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-[56px_repeat(3,1fr)] border-b border-line text-[12px] font-semibold text-ink">
          <span className="p-2.5 text-muted-ink">Thu</span>
          {cols.map((c) => <span key={c} className="border-l border-line p-2.5">{c}</span>)}
        </div>
        <div className="relative grid h-[392px] grid-cols-[56px_repeat(3,1fr)]">
          <div className="grid grid-rows-7 text-[11px] text-muted-ink">{["9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm"].map((t) => <span key={t} className="border-b border-line px-2.5 pt-1">{t}</span>)}</div>
          {cols.map((c, ci) => (
            <div key={c} className="relative grid grid-rows-7 border-l border-line">
              {Array.from({ length: 7 }, (_, i) => <span key={i} className="border-b border-line" />)}
              {blocks.filter((b) => b[0] === ci).map(([, row, len, name, tone]) => (
                <div key={name + row} className={`absolute inset-x-1.5 rounded-[8px] px-2.5 py-1.5 text-[11.5px] font-semibold ${tone}`} style={{ top: `calc(${(row / 7) * 100}% + 3px)`, height: `calc(${(len / 7) * 100}% - 6px)` }}>
                  {name}
                  {row === 6 && <span className="ml-1.5 font-medium opacity-80">· booked by AI just now</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Knowledge() {
  const secs = [["About your business", true], ["Services and prices", true], ["Opening hours", true], ["Your team and their hours", true], ["How people book and pay", true], ["Policies", false], ["Questions customers ask", true], ["When to hand over to you", true], ["Logo, colors and tone", true]] as const;
  return (
    <>
      <Head title="Knowledge" right={<Btn primary>Import from your website</Btn>} />
      <div className={`${card} flex items-center gap-4 p-4`}>
        <span className="text-[26px] font-semibold tabular-nums text-ink">89%</span>
        <span className="flex-1">
          <span className="block text-[12.5px] font-semibold text-ink">Your Business Brain is nearly complete</span>
          <span className="mt-1.5 block h-2 overflow-hidden rounded-full bg-surface-2"><span className="block h-full w-[89%] rounded-full bg-[linear-gradient(90deg,#7c6bff,#22d3ee)]" /></span>
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-[12px] border border-amber/30 bg-amber-soft/70 px-4 py-2.5">
        <span className="flex-1 text-[12.5px] text-ink"><b className="font-semibold">One gap to fill:</b> customers asked about your cancellation policy 3 times this week.</span>
        <Btn>Add it</Btn>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {secs.map(([n, ok]) => (
          <div key={n} className={`${card} flex items-center gap-2.5 px-3.5 py-3`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full ${ok ? "bg-grow text-white" : "border border-dashed border-amber text-amber"}`}>{ok ? <Check className="h-3 w-3" strokeWidth={3} /> : "!"}</span>
            <span className="text-[12.5px] font-medium text-ink">{n}</span>
          </div>
        ))}
      </div>
    </>
  );
}

const SHOTS = ["beauty", "food", "auto", "fitness", "shops", "stays", "home", "health"];

function Media() {
  return (
    <>
      <Head title="Media Library" right={<><Btn>Upload</Btn><Btn primary>Create</Btn></>} />
      <p className="mb-2 flex items-center gap-2 text-[12.5px] font-semibold text-ink"><Sparkles className="h-3.5 w-3.5 text-create" /> Fresh this morning <span className="font-normal text-muted-ink">· nothing posts until you pick it</span></p>
      <div className="grid grid-cols-4 gap-3">
        {SHOTS.map((s, i) => (
          <div key={s} className={`${card} overflow-hidden`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/showcase/${s}-post.webp`} alt="" className="h-[150px] w-full object-cover" loading="lazy" />
            <div className="flex items-center justify-between px-2.5 py-2">
              <span className="text-[11.5px] font-medium text-ink">{i % 3 === 1 ? "Video · 0:08" : "Image"}</span>
              {i < 3 ? <Pill tone="violet">New</Pill> : <Pill tone="grey">Posted</Pill>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Approvals() {
  const items = [["instagram", "Reply to an Instagram comment", "Thank you! Send us a photo of your hair and we'll give you a price and a time this week."], ["google_business_profile", "Reply to a 2-star Google review", "Thank you for telling us, and sorry for the wait on Saturday. That's not the visit we want you to have."], ["facebook", "Tomorrow's post", "Out of the oven at 7. Butter croissants until they're gone."]];
  return (
    <>
      <Head title="Approvals" note="3 waiting for you" right={<Pill tone="grey">Autopilot is off</Pill>} />
      <div className="flex flex-col gap-3">
        {items.map(([id, t, body]) => (
          <div key={t} className={`${card} flex items-center gap-3.5 p-4`}>
            <ChannelLogo id={id} size={30} />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold text-ink">{t}</span>
              <span className="mt-1 block text-[12.5px] leading-snug text-muted-ink">{body}</span>
            </span>
            <Btn>Edit</Btn>
            <Btn primary>Approve</Btn>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-muted-ink">Phone calls are always answered live. Everything else waits here when autopilot is off.</p>
    </>
  );
}

const Stars = ({ n }: { n: number }) => (
  <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className={`h-3.5 w-3.5 ${i < n ? "fill-[#f59e0b] text-[#f59e0b]" : "text-line-strong"}`} />)}</span>
);

function Reviews() {
  return (
    <>
      <Head title="Reviews & Comments" right={<Pill tone="grey">Low ratings come to you first</Pill>} />
      <div className="grid grid-cols-2 gap-3">
        <div className={`${card} p-4`}>
          <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink"><ChannelLogo id="google_business_profile" size={22} /> Google review <Stars n={5} /></p>
          <p className="mt-2 text-[12.5px] leading-snug text-ink">Booked by text at 10 pm and got a reply straight away. Great cut too.</p>
          <p className="mt-3 rounded-[10px] bg-primary-soft p-3 text-[12.5px] leading-snug text-ink"><span className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-violet"><Sparkles className="h-3 w-3" /> Reply in your voice</span>Thank you so much! We&apos;re glad booking was easy. See you next time.</p>
          <div className="mt-3 flex justify-end gap-2"><Btn>Edit</Btn><Btn primary>Approve</Btn></div>
        </div>
        <div className={`${card} p-4`}>
          <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink"><ChannelLogo id="instagram" size={22} /> Comment on your post</p>
          <p className="mt-2 text-[12.5px] leading-snug text-ink">Love this color! How much is balayage?</p>
          <p className="mt-3 rounded-[10px] bg-primary-soft p-3 text-[12.5px] leading-snug text-ink"><span className="mb-1 flex items-center gap-1 text-[11px] font-semibold text-violet"><Sparkles className="h-3 w-3" /> Reply in your voice</span>Thank you! It depends on your length. Send us a photo and we&apos;ll give you a price and a time this week.</p>
          <div className="mt-3 flex justify-end gap-2"><Btn>Edit</Btn><Btn primary>Approve</Btn></div>
        </div>
      </div>
      <div className={`${card} mt-3 flex items-center gap-3 px-4 py-3`}>
        <Stars n={5} />
        <span className="flex-1 text-[12.5px] text-ink">A review request goes out after every completed visit.</span>
        <Pill>On</Pill>
      </div>
    </>
  );
}

function Winback() {
  const groups = [["Slipping away", 38, true], ["Lapsed", 54, false], ["Long gone", 71, false], ["Asked but never booked", 23, false]] as const;
  return (
    <>
      <Head title="Win Back" />
      <div className="grid grid-cols-4 gap-3">
        {groups.map(([n, c, on]) => (
          <div key={n} className={`${card} p-3.5 ${on ? "!border-violet ring-2 ring-primary-soft" : ""}`}>
            <p className={sub}>{n}</p>
            <p className="mt-1 text-[26px] font-semibold tabular-nums tracking-[-0.02em] text-ink">{c}</p>
            <p className="text-[11px] text-muted-ink">customers</p>
          </div>
        ))}
      </div>
      <div className={`${card} mt-3 p-4`}>
        <p className="flex items-center gap-1.5 text-[11.5px] font-semibold text-violet"><Sparkles className="h-3.5 w-3.5" /> Message drafted for &ldquo;Slipping away&rdquo;</p>
        <p className="mt-2 text-[13px] leading-relaxed text-ink">Hi! It&apos;s been a little while since your last visit to Golden Hour Hair. We have a few openings this week and would love to see you. Reply here and we&apos;ll find you a time.</p>
        <div className="mt-3 flex items-center gap-2">
          <ChannelLogo id="whatsapp" size={22} /><ChannelLogo id="email" size={22} />
          <span className="text-[12px] text-muted-ink">Sent by WhatsApp or email</span>
          <span className="ml-auto flex gap-2"><Btn>Edit</Btn><Btn primary>Send to 38</Btn></span>
        </div>
      </div>
      <div className={`${card} mt-3 flex items-center gap-3 px-4 py-3`}>
        <Calendar className="h-4 w-4 text-grow" />
        <span className="flex-1 text-[12.5px] text-ink">Bookings from win-back messages land in your calendar like any other.</span>
      </div>
    </>
  );
}

function Insights() {
  const src = [["Calls", 34, "bg-grow"], ["Instagram", 26, "bg-create"], ["WhatsApp", 18, "bg-[#25d366]"], ["Texts", 12, "bg-violet"], ["Email", 10, "bg-[#1a6ff0]"]] as const;
  return (
    <>
      <Head title="Insights" right={<Pill tone="grey">Last 30 days</Pill>} />
      <div className="grid grid-cols-2 gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[13px] font-semibold text-ink">Where customers come from</p>
          {src.map(([n, v, c]) => (
            <div key={n} className="mt-2.5 flex items-center gap-2.5 text-[12px]">
              <span className="w-20 text-ink">{n}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"><span className={`block h-full rounded-full ${c}`} style={{ width: `${v * 2.6}%` }} /></span>
              <span className="w-8 text-right tabular-nums text-muted-ink">{v}%</span>
            </div>
          ))}
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[13px] font-semibold text-ink">Busiest hours</p>
          <div className="mt-3 flex h-[112px] items-end gap-1.5">
            {[20, 34, 52, 44, 30, 62, 88, 70, 48, 36, 58, 40].map((h, i) => <span key={i} className={`flex-1 rounded-t-[4px] ${h > 60 ? "bg-violet" : "bg-primary-line"}`} style={{ height: `${h}%` }} />)}
          </div>
          <p className="mt-1.5 flex justify-between text-[10.5px] text-muted-ink"><span>8 am</span><span>2 pm</span><span>8 pm</span></p>
        </div>
      </div>
      <div className={`${card} mt-3 p-4`}>
        <p className="text-[13px] font-semibold text-ink">What customers keep asking</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {[["Do you open Sundays?", 21], ["How much is a full color?", 17], ["Can I cancel the same day?", 9], ["Do you take walk-ins?", 8]].map(([q, n]) => <span key={q} className="rounded-full border border-line px-3 py-1.5 text-[12px] text-ink">{q} <b className="ml-1 font-semibold text-violet">{n}</b></span>)}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-ink"><BarChart3 className="h-3.5 w-3.5 text-grow" /> In plain words: evenings are your busiest time, and Sunday opening is the most-asked question.</p>
      </div>
    </>
  );
}

function Talk() {
  return (
    <>
      <Head title="Talk to AI" />
      <div className={`${card} flex h-[440px] flex-col p-5`}>
        <p className="max-w-[70%] self-end rounded-[14px] rounded-br-[4px] bg-violet px-3.5 py-2.5 text-[13px] text-white">How did last month go?</p>
        <div className="mt-3 max-w-[82%] self-start rounded-[14px] rounded-bl-[4px] border border-line bg-base px-4 py-3">
          <p className="text-[13px] leading-relaxed text-ink">A good month. You had <b className="font-semibold">142 bookings</b>, up from 118. Most of the growth came from Instagram DMs answered after 6 pm.</p>
          <div className="mt-3 flex h-[84px] items-end gap-3">
            {[["Aug", 52], ["Sep", 64], ["Oct", 72], ["Nov", 92]].map(([m, h]) => (
              <span key={m} className="flex flex-1 flex-col items-center gap-1">
                <span className={`w-full rounded-t-[5px] ${m === "Nov" ? "bg-violet" : "bg-primary-line"}`} style={{ height: `${h}%` }} />
                <span className="text-[10.5px] text-muted-ink">{m}</span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-ink">Tuesdays are still quiet. An offer on Tuesday afternoons could fill about six open slots a week.</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {["Which day should I run an offer?", "What are people asking most?", "Which posts worked?"].map((q) => <span key={q} className="rounded-full border border-primary-line bg-primary-soft px-3 py-1.5 text-[12px] font-medium text-violet">{q}</span>)}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-[12px] border border-line-strong px-3.5 py-2.5 text-[12.5px] text-muted-ink">Ask about your business… <span className="ml-auto"><Btn primary>Ask</Btn></span></div>
      </div>
    </>
  );
}


function Customers() {
  const rows = [["Returning customer", "instagram", "Cut and style", "Fri 2:00 pm", "6 visits"], ["New customer", "phone", "Full color", "Sat 2:00 pm", "First visit"], ["Returning customer", "whatsapp", "Blow-dry", "No booking", "3 visits"], ["Returning customer", "sms", "Fade", "Tue 9:00 am", "11 visits"], ["New customer", "email", "Consultation", "Thu 3:00 pm", "First visit"], ["Returning customer", "messenger", "Beard trim", "No booking", "2 visits"]];
  return (
    <>
      <Head title="Customers" right={<Pill tone="grey">Search by name or contact</Pill>} />
      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-[1.3fr_1fr_1fr_0.8fr] bg-surface-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-ink"><span>Customer</span><span>Last service</span><span>Next booking</span><span>History</span></div>
        {rows.map(([who, ch, svc, next, hist], i) => (
          <div key={i} className="grid grid-cols-[1.3fr_1fr_1fr_0.8fr] items-center border-t border-line px-4 py-3 text-[12.5px] text-ink">
            <span className="flex items-center gap-2.5 font-medium"><ChannelLogo id={ch} size={22} />{who}</span>
            <span>{svc}</span>
            <span>{next === "No booking" ? <Pill tone="grey">{next}</Pill> : <Pill>{next}</Pill>}</span>
            <span className="text-muted-ink">{hist}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-muted-ink">Open a customer to see every call, message and visit. You can delete a customer and their history at any time.</p>
    </>
  );
}

function Campaigns() {
  return (
    <>
      <Head title="Campaigns" right={<Btn primary>Create campaign</Btn>} />
      <div className="grid grid-cols-[1fr_1.25fr] gap-3">
        <div className={`${card} p-4`}>
          <p className="text-[12.5px] font-semibold text-ink">Quiet Tuesday</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-ink">What&apos;s this campaign about?</p>
          <p className="mt-1 rounded-[10px] border border-line-strong p-2.5 text-[12.5px] leading-snug text-ink">20% off color every Tuesday this month, to fill our quietest day.</p>
          <div className="mt-3 flex gap-2"><span className="rounded-full bg-violet px-3 py-1.5 text-[11.5px] font-semibold text-white">Make it new with AI</span><span className="rounded-full border border-line-strong px-3 py-1.5 text-[11.5px] font-semibold text-ink">Pick from my library</span></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/showcase/beauty-post.webp" alt="" className="mt-3 h-[150px] w-full rounded-[10px] object-cover" loading="lazy" />
        </div>
        <div className={`${card} p-4`}>
          <p className="flex items-center gap-2 text-[12.5px] font-semibold text-ink">Ready for you to check <Pill tone="amber">3 captions</Pill></p>
          {[["instagram", "Quiet Tuesday: 20% off color, this Tuesday only. Message us to book."], ["facebook", "Tuesdays just got brighter. 20% off all color this month. Call or message to book your chair."], ["google_business_profile", "20% off color on Tuesdays this month. Book online or call us."]].map(([id, t]) => (
            <div key={id} className="mt-2.5 flex items-start gap-2.5 rounded-[10px] border border-line p-2.5"><ChannelLogo id={id} size={24} /><span className="text-[12px] leading-snug text-ink">{t}</span></div>
          ))}
          <div className="mt-3 flex justify-end gap-2"><Btn>Make another version</Btn><Btn primary>Looks good, send to Approvals</Btn></div>
          <p className="mt-2 text-right text-[11px] text-muted-ink">Nothing goes out until you send it to Approvals and post it.</p>
        </div>
      </div>
    </>
  );
}

function Connections() {
  const rows = [["phone", "Phone number", "Forwarding works", true], ["whatsapp", "WhatsApp Business", "Connected", true], ["instagram", "Instagram", "Connected", true], ["facebook", "Facebook", "Connected", true], ["email", "Email", "Set up", true], ["tiktok", "TikTok", "Not connected", false], ["youtube", "YouTube", "Not connected", false], ["google_business_profile", "Google reviews", "Connected", true]] as const;
  return (
    <>
      <Head title="Connections" />
      <p className="-mt-2 mb-3 text-[12.5px] text-muted-ink">Choose where RingPost answers customers, publishes content and checks your availability.</p>
      <div className="grid grid-cols-2 gap-2.5">
        {rows.map(([id, n, st, ok]) => (
          <div key={n} className={`${card} flex items-center gap-3 px-3.5 py-3`}>
            <ChannelLogo id={id} size={28} />
            <span className="flex-1 text-[13px] font-semibold text-ink">{n}</span>
            {ok ? <Pill>{st}</Pill> : <Btn>Connect</Btn>}
          </div>
        ))}
      </div>
      <div className={`${card} mt-2.5 flex items-center gap-3 px-3.5 py-3`}>
        <Calendar className="h-5 w-5 text-[#4285f4]" />
        <span className="flex-1 text-[13px] font-semibold text-ink">Google Calendar <span className="ml-1 font-normal text-muted-ink">Bookings land in your Google Calendar, and busy times are respected.</span></span>
        <Pill>Connected</Pill>
      </div>
    </>
  );
}

const Switch = ({ on }: { on: boolean }) => <span className={`flex h-5 w-9 items-center rounded-full px-0.5 ${on ? "justify-end bg-grow" : "bg-line-strong"}`}><span className="h-4 w-4 rounded-full bg-white" /></span>;

function Automation() {
  return (
    <>
      <Head title="Automation" />
      <p className="-mt-2 mb-3 text-[12.5px] text-muted-ink">What your AI does on its own, where it reaches you, and the content it makes for you.</p>
      <div className={`${card} p-4`}>
        <p className="text-[13px] font-semibold text-ink">How much your AI does on its own</p>
        <p className="text-[12px] text-muted-ink">One switch for conversations, posts and review replies.</p>
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <div className="rounded-[10px] border border-line p-3"><p className="text-[12.5px] font-semibold text-ink">Autopilot on: your AI acts</p><p className="mt-1 text-[11.5px] leading-snug text-muted-ink">Replies send, posts publish and review replies go out without waiting for you.</p></div>
          <div className="rounded-[10px] border-2 border-violet bg-primary-soft/60 p-3"><p className="text-[12.5px] font-semibold text-ink">Autopilot off: your AI asks first</p><p className="mt-1 text-[11.5px] leading-snug text-muted-ink">Everything waits in Approvals. Phone calls are still answered live.</p></div>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        <div className={`${card} p-4`}><p className="text-[13px] font-semibold text-ink">When something needs you</p><p className="mt-1.5 flex items-center gap-2 text-[12px] text-ink"><ChannelLogo id="whatsapp" size={20} /> WhatsApp (SMS if WhatsApp can&apos;t reach me)</p></div>
        <div className={`${card} flex items-center gap-3 p-4`}><span className="flex-1"><span className="block text-[13px] font-semibold text-ink">Make fresh content for me</span><span className="text-[12px] text-muted-ink">2 pictures and 1 video a week</span></span><Switch on /></div>
        <div className={`${card} p-4`}><p className="text-[13px] font-semibold text-ink">Phone calls</p><p className="mt-1.5 rounded-[8px] bg-surface-2 p-2 text-[11.5px] leading-snug text-ink">&ldquo;Thanks for calling Golden Hour Hair. I&apos;m the virtual assistant. How can I help?&rdquo;</p></div>
        <div className={`${card} p-4`}><p className="text-[13px] font-semibold text-ink">How your AI says hello</p><p className="mt-1.5 rounded-[8px] bg-surface-2 p-2 text-[11.5px] leading-snug text-ink">&ldquo;Hi! Thanks for messaging Golden Hour Hair. How can I help?&rdquo;</p></div>
      </div>
    </>
  );
}

function Setup() {
  const steps = [["Confirm your email address", true], ["Confirm your business name and country", true], ["Choose your type of business", true], ["How customers reach you", false], ["Import your business details", false]] as const;
  return (
    <>
      <Head title="Set up RingPost" note="3 of 5 done" />
      <div className="grid grid-cols-[1fr_1.1fr] gap-3">
        <div className={`${card} p-4`}>
          {steps.map(([t, ok], i) => (
            <div key={t} className={`flex items-center gap-3 py-2.5 ${i ? "border-t border-line" : ""}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${ok ? "bg-grow text-white" : "border border-line-strong text-muted-ink"}`}>{ok ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}</span>
              <span className={`text-[13px] ${ok ? "text-muted-ink" : "font-semibold text-ink"}`}>{t}</span>
            </div>
          ))}
        </div>
        <div className={`${card} p-4`}>
          <p className="text-[13px] font-semibold text-ink">How customers reach you</p>
          <div className="mt-2.5 grid grid-cols-2 gap-2.5">
            <div className="rounded-[10px] border-2 border-violet bg-primary-soft/60 p-3 text-[12.5px] font-semibold text-ink">Keep my existing number<span className="mt-1 block text-[11.5px] font-normal text-muted-ink">Forward it to RingPost.</span></div>
            <div className="rounded-[10px] border border-line p-3 text-[12.5px] font-semibold text-ink">Get a new number<span className="mt-1 block text-[11.5px] font-normal text-muted-ink">A local number in the US or Canada.</span></div>
          </div>
          <p className="mt-3 text-[12.5px] font-semibold text-ink">Import your business details</p>
          <div className="mt-1.5 flex items-center gap-2 rounded-[10px] border border-line-strong px-3 py-2 text-[12px] text-muted-ink">yourbusiness.com <span className="ml-auto"><Btn primary>Import</Btn></span></div>
        </div>
      </div>
    </>
  );
}

function Billing() {
  const meters = [["Call minutes", 62], ["Replies", 48], ["Media credits", 35]] as const;
  return (
    <>
      <Head title="Usage" right={<Btn>Plan &amp; billing</Btn>} />
      <div className="grid grid-cols-3 gap-3">
        {meters.map(([n, v]) => (
          <div key={n} className={`${card} p-4`}>
            <p className={sub}>{n}</p>
            <p className="mt-1 text-[22px] font-semibold tabular-nums text-ink">{v}% <span className="text-[12px] font-normal text-muted-ink">used this month</span></p>
            <span className="mt-2 block h-2 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full bg-[linear-gradient(90deg,#7c6bff,#22d3ee)]" style={{ width: `${v}%` }} /></span>
          </div>
        ))}
      </div>
      <div className={`${card} mt-3 p-4`}>
        <p className="text-[13px] font-semibold text-ink">Plan &amp; billing</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-ink">See your plan, change it, switch between monthly and yearly, and download receipts. No contract and no setup fee. Cancel any time.</p>
        <div className="mt-3 flex gap-2"><Btn>Change plan</Btn><Btn>Receipts</Btn></div>
      </div>
      <p className="mt-3 text-[12px] text-muted-ink">You get a warning before you reach an allowance, so nothing stops without notice.</p>
    </>
  );
}

const SCREENS: Record<DashId, () => React.ReactElement> = { home: Home, inbox: InboxScreen, calendar: CalendarScreen, customers: Customers, knowledge: Knowledge, media: Media, approvals: Approvals, reviews: Reviews, campaigns: Campaigns, winback: Winback, insights: Insights, talk: Talk, connections: Connections, automation: Automation, setup: Setup, billing: Billing };

/** The whole dashboard at 1000 × 560: sidebar and one screen. */
export function DashboardMock({ screen }: { screen: DashId }) {
  const Screen = SCREENS[screen];
  return (
    <div className="flex bg-base text-left" style={{ width: DASH_W, height: DASH_H }}>
      <aside className="flex w-[190px] shrink-0 flex-col border-r border-line bg-white px-2.5 py-3.5">
        <p className="flex items-center gap-2 px-2 text-[14px] font-semibold text-ink"><LogoMark className="!h-5 !w-5" /> RingPost</p>
        {SIDEBAR.map((g) => (
          <div key={g.label} className="mt-3">
            <p className="px-2 text-[9.5px] font-semibold uppercase tracking-[0.09em] text-muted-ink">{g.label}</p>
            {g.items.map((it) => {
              const on = it.id === screen;
              return (
                <p key={it.name} className={`mt-px flex items-center gap-2 rounded-[8px] px-2 py-[5px] text-[12px] ${on ? "bg-primary-soft font-semibold text-violet" : "text-ink"}`}>
                  <it.icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {it.name}
                </p>
              );
            })}
          </div>
        ))}
      </aside>
      <div className="min-w-0 flex-1 px-6 py-5">
        <Screen />
      </div>
    </div>
  );
}

/** The dashboard on a phone: the same Home, with the real bottom bar. Drawn at 260 × 540. */
export function DashboardPhoneMock() {
  return (
    <div className="flex flex-col bg-base text-left" style={{ width: 260, height: 540 }}>
      <div className="flex-1 px-3.5 pt-9">
        <p className="text-[17px] font-semibold tracking-[-0.02em] text-ink">Good afternoon</p>
        <span className="mt-1.5 inline-block"><Pill>AI is handling everything</Pill></span>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[["Calls answered", "14"], ["Bookings made", "9"]].map(([l, n]) => (
            <div key={l} className={`${card} p-2.5`}><p className="text-[10.5px] text-muted-ink">{l}</p><p className="text-[20px] font-semibold tabular-nums text-ink">{n}</p></div>
          ))}
        </div>
        <div className={`${card} mt-2 p-3`}>
          <p className="text-[11.5px] font-semibold text-ink">Needs you</p>
          <p className="mt-1.5 rounded-[8px] bg-amber-soft/70 p-2 text-[11px] leading-snug text-ink">A customer asked to speak to you</p>
          <p className="mt-1.5 rounded-[8px] bg-amber-soft/70 p-2 text-[11px] leading-snug text-ink">A 2-star review is waiting for your OK</p>
        </div>
        <div className={`${card} mt-2 p-3`}>
          <p className="text-[11.5px] font-semibold text-ink">Today</p>
          {[["phone", "Missed call, booked"], ["instagram", "Instagram DM, booked"], ["whatsapp", "WhatsApp answered"]].map(([id, t]) => (
            <p key={t} className="mt-2 flex items-center gap-2 text-[11.5px] text-ink"><ChannelLogo id={id} size={18} />{t}</p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 border-t border-line bg-white pb-3 pt-2 text-center text-[9.5px] font-medium text-muted-ink">
        {([[Grid2x2, "Home"], [Inbox, "Inbox"], [Calendar, "Calendar"], [CheckSquare, "Approvals"]] as [IconType, string][]).map(([I, n], i) => (
          <span key={n} className={`flex flex-col items-center gap-0.5 ${i === 0 ? "text-violet" : ""}`}><I className="h-4 w-4" strokeWidth={1.75} />{n}</span>
        ))}
      </div>
    </div>
  );
}
