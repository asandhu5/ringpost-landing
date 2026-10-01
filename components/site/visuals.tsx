import { Check, CheckCircle2, Clock, Globe, ImageIcon, Instagram, Mail, MessageCircle, MessageSquare, Phone, RotateCcw, Send, ShieldCheck, Sparkles, Star, Upload } from "lucide-react";

/**
 * Product visuals: the dashboard drawn in HTML. Used where a page has no real dashboard
 * screenshot yet (public/screens). None of it is a real business, customer or result, and
 * numbers are avoided where a number could read as a claim.
 */

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

export function AppFrame({ children, title, className, caption = null }: { children: React.ReactNode; title: string; className?: string; caption?: string | null }) {
  return (
    <figure className={cx("relative", className)}>
      <div aria-hidden className="pointer-events-none absolute -inset-8 rounded-[40px] bg-violet/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-[#101018] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]">
        <div className="flex items-center gap-3 border-b border-line bg-base/80 px-4 py-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </span>
          <span className="truncate text-[12px] font-medium text-muted-ink">{title}</span>
          <span className="ml-auto hidden rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-faint sm:block">app.ringpost.tech</span>
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
      {caption && <figcaption className="mt-3 text-center text-[11px] font-medium text-faint">{caption}</figcaption>}
    </figure>
  );
}

function Chip({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "violet" | "green" | "coral" }) {
  const t = {
    muted: "border-line-strong bg-white/[0.04] text-muted-ink",
    violet: "border-violet/30 bg-violet/15 text-glow",
    green: "border-success/30 bg-success/10 text-success",
    coral: "border-cta/30 bg-cta/10 text-cta",
  }[tone];
  return <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10.5px] font-medium", t)}>{children}</span>;
}

function Row({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return <div className={cx("rounded-xl border px-3 py-2.5", active ? "border-violet/40 bg-violet/10" : "border-line bg-white/[0.02]")}>{children}</div>;
}

function Bubble({ from, children }: { from: "them" | "ai" | "owner"; children: React.ReactNode }) {
  return (
    <div className={cx("flex", from === "them" ? "justify-start" : "justify-end")}>
      <p className={cx("max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-snug", from === "them" ? "rounded-bl-md bg-white/[0.07] text-ink" : from === "ai" ? "rounded-br-md bg-violet text-white" : "rounded-br-md bg-cta text-[#1a0d08]")}>{children}</p>
    </div>
  );
}

function ReceptionistVisual() {
  return (
    <AppFrame title="Call · in progress">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-success/15 text-success">
            <Phone className="h-4 w-4" />
            <span className="animate-ringpost-ping absolute inset-0 rounded-full border border-success/40" />
          </span>
          <div>
            <p className="text-[13px] font-medium text-ink">Incoming call</p>
            <p className="text-[11px] text-muted-ink">Answered by your AI · 7:42 pm</p>
          </div>
        </div>
        <Chip tone="green">Live</Chip>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Bubble from="them">Hi, do you have anything on Saturday morning?</Bubble>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-glow/80">
          <span className="h-1 w-1 rounded-full bg-glow" /> Checking your calendar
        </p>
        <Bubble from="ai">We have 10:30 or 11:15 on Saturday. Which would you like?</Bubble>
        <Bubble from="them">10:30 please.</Bubble>
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-success/90">
          <Check className="h-3 w-3" /> Booking made
        </p>
        <Bubble from="ai">You&apos;re booked for Saturday at 10:30. You&apos;ll get a reminder the day before.</Bubble>
      </div>
    </AppFrame>
  );
}

const THREADS = [
  { icon: Phone, who: "Missed call", said: "Texted back · asking about Friday", state: "AI handling", tone: "violet" as const },
  { icon: Instagram, who: "Instagram DM", said: "How much is a full set?", state: "AI handling", tone: "violet" as const },
  { icon: MessageCircle, who: "WhatsApp", said: "I'd like to speak to the manager", state: "Needs you", tone: "coral" as const },
  { icon: Mail, who: "Email", said: "Can I move my booking to Tuesday?", state: "Rescheduled", tone: "green" as const },
  { icon: MessageSquare, who: "Text message", said: "Thanks, see you then!", state: "Done", tone: "muted" as const },
];

function InboxVisual() {
  return (
    <AppFrame title="Inbox">
      <div className="mb-3 flex gap-2">
        <Chip tone="violet">All</Chip>
        <Chip tone="coral">Needs you · 1</Chip>
        <Chip>AI handling</Chip>
      </div>
      <div className="flex flex-col gap-2">
        {THREADS.map((t, i) => (
          <Row key={t.who} active={i === 2}>
            <div className="flex items-center gap-2.5">
              <t.icon className="h-4 w-4 shrink-0 text-glow" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-ink">{t.who}</p>
                <p className="truncate text-[11.5px] text-muted-ink">{t.said}</p>
              </div>
              <Chip tone={t.tone}>{t.state}</Chip>
            </div>
          </Row>
        ))}
      </div>
    </AppFrame>
  );
}

function BookingVisual() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const blocks: [number, number, number, string, "violet" | "green" | "cancel" | "own"][] = [
    [0, 1, 2, "Cut & blow dry", "violet"],
    [1, 3, 2, "Colour", "violet"],
    [2, 0, 1, "Supplier visit", "own"],
    [2, 2, 2, "Trim", "cancel"],
    [3, 1, 3, "Full colour", "green"],
    [4, 4, 1, "Consultation", "violet"],
  ];
  return (
    <AppFrame title="Calendar · this week">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Chip tone="green">
          <CheckCircle2 className="h-3 w-3" /> Google Calendar synced
        </Chip>
        <Chip>Reminders on</Chip>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d, di) => (
          <div key={d} className="flex flex-col gap-1.5">
            <p className="text-center text-[11px] font-medium text-faint">{d}</p>
            <div className="relative h-44 rounded-lg border border-line bg-white/[0.02]">
              {blocks
                .filter((b) => b[0] === di)
                .map((b) => (
                  <div
                    key={b[3]}
                    className={cx(
                      "absolute inset-x-1 overflow-hidden rounded-md px-1.5 py-1 text-[9.5px] leading-tight",
                      b[4] === "violet" && "bg-violet/30 text-white",
                      b[4] === "green" && "bg-success/20 text-success",
                      b[4] === "own" && "border border-dashed border-line-strong text-faint",
                      b[4] === "cancel" && "bg-white/[0.04] text-faint line-through",
                    )}
                    style={{ top: `${b[1] * 16 + 4}%`, height: `${b[2] * 15}%` }}
                  >
                    {b[3]}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-faint">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm border border-dashed border-line-strong" /> Your own event, blocks the time
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-white/10" /> Cancelled, kept on record
        </span>
      </div>
    </AppFrame>
  );
}

function KnowledgeVisual() {
  const found = [
    ["Services and prices", true],
    ["Opening hours", true],
    ["Cancellation policy", true],
    ["Parking", false],
    ["Deposits", false],
  ] as const;
  return (
    <AppFrame title="Knowledge · import">
      <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-base px-3 py-2.5">
        <Globe className="h-4 w-4 text-glow" />
        <span className="text-[12.5px] text-ink">yourbusiness.com</span>
        <Chip tone="green">Read</Chip>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        {found.map(([label, ok]) => (
          <div key={label} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[12px]">
            <span className="text-ink">{label}</span>
            {ok ? <Chip tone="green">Found</Chip> : <Chip tone="coral">Missing</Chip>}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-cta/30 bg-cta/10 px-3 py-2.5 text-[11.5px] leading-snug text-ink">
        We couldn&apos;t find your parking or deposit details. Add them so your AI can answer, instead of checking with you.
      </div>
    </AppFrame>
  );
}

function MediaVisual() {
  return (
    <AppFrame title="Media library · new image">
      <div className="grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[radial-gradient(80%_60%_at_30%_30%,#ffb199,transparent_60%),radial-gradient(70%_70%_at_80%_80%,#7c6bff,transparent_60%),linear-gradient(160deg,#3b2a55,#1a1426)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.18),transparent_45%)]" />
          <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[9px] font-bold text-[#1a1426]">LOGO</span>
          <div className="absolute inset-x-2.5 bottom-2.5 rounded-lg bg-black/55 px-2.5 py-2 backdrop-blur">
            <p className="text-[12px] font-semibold text-white">20% off colour this weekend</p>
            <p className="text-[10.5px] text-white/75">Price from your list · your phone number</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {[
            ["Brief written for your business", Sparkles],
            ["Safety check passed", ShieldCheck],
            ["Logo and price added by code", ImageIcon],
            ["Price and phone read back", Check],
          ].map(([label, Icon]) => {
            const I = Icon as typeof Check;
            return (
              <div key={label as string} className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 py-2 text-[11.5px] text-ink">
                <I className="h-3.5 w-3.5 shrink-0 text-success" />
                {label as string}
              </div>
            );
          })}
          <div className="mt-auto flex gap-2">
            <span className="flex-1 rounded-lg bg-violet px-2 py-2 text-center text-[11.5px] font-medium text-white">Send to Approvals</span>
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

function UploadsVisual() {
  return (
    <AppFrame title="Media library · uploads">
      <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-line-strong bg-white/[0.02] px-4 py-5 text-center">
        <Upload className="h-5 w-5 text-glow" />
        <p className="text-[12px] text-ink">Drop photos and videos, or choose from your phone</p>
        <p className="text-[10.5px] text-faint">Photos up to 20 MB · videos up to 100 MB</p>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        <Row>
          <div className="flex items-center justify-between gap-2 text-[11.5px]">
            <span className="truncate text-ink">IMG_2041.HEIC</span>
            <Chip tone="green">Converted to JPEG · turned upright</Chip>
          </div>
        </Row>
        <Row active>
          <div className="flex items-center justify-between gap-2 text-[11.5px]">
            <span className="truncate text-ink">before-after.mov</span>
            <span className="text-muted-ink">Uploading · resumes if you close the tab</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-violet" />
          </div>
        </Row>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-white/[0.02] p-2.5">
          <p className="text-[11px] font-medium text-faint">Your note</p>
          <p className="mt-1 text-[11.5px] text-ink">balayage today, took 3 hours</p>
        </div>
        <div className="rounded-xl border border-violet/30 bg-violet/10 p-2.5">
          <p className="text-[11px] font-medium text-glow">Polished caption</p>
          <p className="mt-1 text-[11.5px] text-ink">Three hours of careful balayage for today&apos;s colour. Book yours this week.</p>
        </div>
      </div>
    </AppFrame>
  );
}

function SocialVisual() {
  return (
    <AppFrame title="Approvals">
      <div className="flex gap-3">
        <div className="h-24 w-20 shrink-0 rounded-lg bg-[radial-gradient(80%_60%_at_30%_30%,#ffb199,transparent_60%),linear-gradient(160deg,#3b2a55,#1a1426)]" />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] text-ink">Fresh colour for the weekend. Book in by Friday.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Instagram", "Facebook", "TikTok", "Threads"].map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-violet/40 bg-violet/10 p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
            <Clock className="h-3.5 w-3.5 text-glow" /> Schedule
          </p>
          <p className="mt-1 text-[11px] text-muted-ink">Suggested: Thursday, 5:00 pm your time</p>
        </div>
        <div className="rounded-xl border border-line bg-white/[0.02] p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
            <Send className="h-3.5 w-3.5 text-glow" /> Post now
          </p>
          <p className="mt-1 text-[11px] text-muted-ink">Goes out within a minute</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-line bg-white/[0.02] p-3">
        <p className="text-[11px] font-medium text-faint">New comment</p>
        <p className="mt-1 text-[11.5px] text-ink">&ldquo;Do you have space next week?&rdquo;</p>
        <p className="mt-1.5 text-[11.5px] text-glow">Reply drafted · waiting for your approval</p>
      </div>
    </AppFrame>
  );
}

function ReviewsVisual() {
  return (
    <AppFrame title="Reviews">
      <Row>
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-ink">New Google review</p>
          <span className="flex text-cta">
            {[0, 1, 2, 3].map((i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
            <Star className="h-3 w-3" />
          </span>
        </div>
        <p className="mt-1.5 text-[11.5px] text-muted-ink">&ldquo;Lovely result, but I waited a while past my time.&rdquo;</p>
      </Row>
      <div className="mt-2 rounded-xl border border-violet/30 bg-violet/10 p-3">
        <p className="text-[11px] font-medium text-glow">Drafted reply</p>
        <p className="mt-1 text-[11.5px] text-ink">Thank you, we&apos;re glad you love it. You&apos;re right about the wait, and we&apos;re sorry. We&apos;ll do better next time.</p>
        <div className="mt-2.5 flex gap-2">
          <span className="rounded-lg bg-violet px-2.5 py-1 text-[11px] font-medium text-white">Approve and post</span>
          <span className="rounded-lg border border-line-strong px-2.5 py-1 text-[11px] text-ink">Edit</span>
        </div>
      </div>
      <div className="mt-2 rounded-xl border border-line bg-white/[0.02] p-3">
        <p className="text-[11px] font-medium text-faint">After every visit</p>
        <p className="mt-1 text-[11.5px] text-ink">Thanks for visiting! If you have a minute, we&apos;d love a public review. Prefer to tell us privately instead? …</p>
      </div>
    </AppFrame>
  );
}

function WinbackVisual() {
  const rows = [
    ["Customer who last visited in spring", true, null],
    ["Customer who last visited in winter", true, null],
    ["Customer, no mobile number", false, "No phone number"],
    ["Customer, not opted in", false, "Hasn't agreed to marketing texts"],
  ] as const;
  return (
    <AppFrame title="Win-back · haven't been back in 90 days">
      <div className="flex flex-col gap-1.5">
        {rows.map(([who, ok, why]) => (
          <div key={who} className={cx("flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[11.5px]", !ok && "opacity-60")}>
            <span className={cx("flex h-4 w-4 items-center justify-center rounded border", ok ? "border-violet bg-violet text-white" : "border-line-strong")}>{ok && <Check className="h-3 w-3" />}</span>
            <span className="flex-1 text-ink">{who}</span>
            {why && <span className="text-faint">{why}</span>}
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-violet/30 bg-violet/10 p-3">
        <p className="text-[11px] font-medium text-glow">Drafted text</p>
        <p className="mt-1 text-[11.5px] text-ink">It&apos;s been a while! We&apos;d love to see you again. Reply to book a time that suits you.</p>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <span className="flex items-center gap-1.5 rounded-lg bg-cta px-3 py-1.5 text-[11.5px] font-medium text-[#1a0d08]">
          <RotateCcw className="h-3.5 w-3.5" /> Send to selected
        </span>
      </div>
    </AppFrame>
  );
}

function InsightsVisual() {
  const bars = [
    ["Phone", 88],
    ["Instagram", 64],
    ["WhatsApp", 52],
    ["Text", 40],
    ["Email", 18],
  ] as const;
  return (
    <AppFrame title="Insights">
      <p className="text-[11px] font-medium text-faint">Where conversations came from</p>
      <div className="mt-2 flex flex-col gap-2">
        {bars.map(([label, w]) => (
          <div key={label} className="flex items-center gap-2 text-[11px]">
            <span className="w-16 shrink-0 text-muted-ink">{label}</span>
            <span className="h-2 rounded-full bg-gradient-to-r from-violet to-glow" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-line bg-white/[0.02] p-3">
        <p className="text-[11px] font-medium text-glow">Pattern in your reviews</p>
        <p className="mt-1 text-[11.5px] text-ink">Waiting past appointment times has come up in several recent reviews.</p>
        <p className="mt-1.5 text-[11px] text-glow">See the reviews behind this</p>
      </div>
    </AppFrame>
  );
}

function AdvisorVisual() {
  return (
    <AppFrame title="Talk to AI">
      <div className="flex flex-col gap-2">
        <Bubble from="owner">Why were last month&apos;s reviews worse?</Bubble>
        <div className="flex justify-start">
          <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-line-strong bg-white/[0.04] px-3 py-2 text-[12px] leading-snug text-ink">
            Most of the lower ratings mention waiting past the booked time, mostly on Saturdays. Your Saturday bookings are also the most tightly packed. Adding a short buffer between Saturday appointments would be the first thing I&apos;d try.
          </div>
        </div>
        <Bubble from="owner">What do people ask that we don&apos;t answer?</Bubble>
        <div className="flex justify-start">
          <div className="max-w-[88%] rounded-2xl rounded-bl-md border border-line-strong bg-white/[0.04] px-3 py-2 text-[12px] leading-snug text-ink">
            Parking comes up most. It isn&apos;t on your Knowledge page yet.
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

const VISUALS: Record<string, () => React.ReactElement> = {
  "ai-receptionist": ReceptionistVisual,
  inbox: InboxVisual,
  booking: BookingVisual,
  knowledge: KnowledgeVisual,
  "ai-media": MediaVisual,
  uploads: UploadsVisual,
  social: SocialVisual,
  reviews: ReviewsVisual,
  winback: WinbackVisual,
  insights: InsightsVisual,
  advisor: AdvisorVisual,
};

export function ProductVisual({ slug, className }: { slug: string; className?: string }) {
  const V = VISUALS[slug];
  if (!V) return null;
  return (
    <div className={className}>
      <V />
    </div>
  );
}
