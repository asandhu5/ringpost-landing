import { AlertCircle, CalendarCheck, Check } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { AppChat } from "@/components/site/mocks/app-chat";
import { Tilt3D } from "@/components/site/ui/tilt-3d";
import { RingStage } from "@/components/site/three/ring-stage";
import { Chip } from "@/components/site/ui/primitives";

/**
 * The signature picture at the top of each Answer page. Each is its own scene, so no two
 * pages look alike at a glance. All are drawn complete: the motion only moves things
 * into place, it never hides them.
 */
const I = (i: number, extra?: Record<string, string>) => ({ "--i": i, ...extra }) as React.CSSProperties;

/** The box every hero picture sits in: sized by the screen's height on a laptop, by its width on a phone. */
function Stage({ children, label, ratio = "aspect-[1.15]" }: { children: React.ReactNode; label: string; ratio?: string }) {
  return (
    <div role="img" aria-label={label} className={`rp-stage relative w-full ${ratio === "aspect-square" ? "max-w-[min(440px,calc(100svh-530px))]" : "max-w-[min(440px,calc((100svh-530px)*1.1))]"} sm:max-w-[520px] ${ratio} lg:aspect-auto lg:h-full lg:max-h-[min(100%,500px)] lg:max-w-[560px]`}>
      {children}
    </div>
  );
}

/** Calls: a ringing phone, the words of the call, and the booking that drops out of it. */
export function CallsHero() {
  return (
    <Stage label="A phone call answered by the assistant: the caller asks for a price, gets a time, and the booking lands in the calendar.">
      <div aria-hidden className="absolute inset-[6%_12%_22%_4%] overflow-hidden rounded-rp-lg shadow-rp-3">
        <AppChat
          app="phone"
          business="Mirror Finish Detailing"
          className="h-full"
          lines={[
            { from: "ai", text: "Thanks for calling. I'm the virtual assistant. How can I help?" },
            { from: "customer", text: "How much is a full detail?" },
            { from: "ai", text: "$180, about three hours. Thursday at 3:00 pm is free." },
          ]}
        />
      </div>
      <div aria-hidden className="rp-drop absolute bottom-0 right-0 w-[50%] rounded-rp-md border border-line bg-white p-[3.4cqw] shadow-rp-3" style={I(4)}>
        <p className="flex items-center gap-2 text-[clamp(11px,2.6cqw,13.5px)] font-semibold text-ink"><CalendarCheck className="h-[1.3em] w-[1.3em] text-grow" /> Thursday</p>
        <div className="mt-2 grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1 text-[clamp(10px,2.3cqw,12.5px)] text-muted-ink">
          <span>2 pm</span><span className="h-[1.6em] rounded-md bg-surface-2" />
          <span className="font-semibold text-ink">3 pm</span><span className="flex h-[2em] items-center rounded-md bg-grow-soft px-2 font-semibold text-grow">Full detail · booked</span>
          <span>4 pm</span><span className="h-[1.6em] rounded-md bg-surface-2" />
        </div>
      </div>
      <span aria-hidden className="rp-ring-pulse absolute left-0 top-[2%] flex h-[13cqw] w-[13cqw] items-center justify-center rounded-full bg-[#16a34a]"><ChannelLogo id="phone" size={30} className="!shadow-none" /></span>
    </Stage>
  );
}

/** Messages: five apps circling the ring; a question goes in, an answer comes out. */
export function MessagesHero() {
  const apps = ["whatsapp", "instagram", "messenger", "sms", "email"];
  return (
    <Stage label="WhatsApp, Instagram, Messenger, text and email circle the RingPost ring. A message goes in and a reply with a booking comes out." ratio="aspect-square">
      <RingStage className="absolute inset-[18%]" scale={0.72} stillInset="14%" />
      <div aria-hidden className="absolute inset-[3%]">
        {apps.map((a, i) => (
          <span key={a} className="absolute left-1/2 top-1/2 -ml-[6.5cqw] -mt-[6.5cqw] block h-[13cqw] w-[13cqw]" style={{ transform: `rotate(${i * 72}deg) translateY(-41cqw) rotate(${-i * 72}deg)` }}>
            <span className="rp-bob block h-full w-full" style={I(i)}><span className="block h-full w-full [&>*]:!h-full [&>*]:!w-full [&_svg]:!h-[62%] [&_svg]:!w-[62%]"><ChannelLogo id={a} size={56} /></span></span>
          </span>
        ))}
      </div>
      <p aria-hidden className="rp-bob absolute left-0 top-[12%] max-w-[38%] rounded-[1.2em] rounded-bl-[0.3em] border border-line bg-white px-[1em] py-[0.7em] text-[clamp(10.5px,2.5cqw,13.5px)] leading-snug text-ink shadow-rp-2">Anything free Saturday?</p>
      <p aria-hidden className="rp-bob absolute bottom-[3%] left-1/2 w-max max-w-[34%] -translate-x-1/2 rounded-[1.2em] rounded-br-[0.3em] bg-violet px-[1em] py-[0.7em] text-[clamp(10.5px,2.5cqw,13.5px)] leading-snug text-white shadow-rp-2" style={I(2)}>Yes, 1:30 pm. Booked!</p>
    </Stage>
  );
}

/** One inbox: scattered conversations settle into a single tidy list, "Needs you" on top. */
export function InboxHero() {
  const rows = [
    { id: "instagram", t: "Asked to speak to you", s: "Wedding party booking", needs: true },
    { id: "phone", t: "Missed call, called back", s: "Booked Thu 3:00 pm" },
    { id: "whatsapp", t: "Price question", s: "Booked Sat 1:30 pm" },
    { id: "messenger", t: "Opening hours", s: "Answered" },
    { id: "sms", t: "Move my appointment", s: "Moved to Tue 9:00 am" },
    { id: "email", t: "Quote for a full detail", s: "Booked Fri 10:00 am" },
  ];
  return (
    <Stage label="Six conversations from six channels settle into one list. The one that needs you is at the top." ratio="aspect-[1.05]">
      <div aria-hidden className="absolute inset-[3%_6%] flex flex-col rounded-rp-lg border border-line bg-white p-[3cqw] shadow-rp-3">
        <p className="flex items-center gap-2 px-1 pb-[2cqw] text-[clamp(12px,3cqw,16px)] font-semibold text-ink">Inbox <Chip tone="success"><span className="h-1.5 w-1.5 rounded-full bg-grow" /> AI is handling everything</Chip></p>
        <div className="flex flex-1 flex-col justify-between">
          {rows.map((r, i) => (
            <div key={r.id} className={`rp-slide-in flex items-center gap-[2.4cqw] rounded-rp-sm px-[2.4cqw] py-[1.6cqw] ${r.needs ? "border border-amber/40 bg-amber-soft/70" : "border border-line bg-white"}`} style={I(i, { "--from": `${i % 2 ? 46 : -46}px`, "--tilt": `${i % 2 ? 3 : -3}deg` })}>
              <span className="block h-[7cqw] w-[7cqw] shrink-0 [&>*]:!h-full [&>*]:!w-full [&_svg]:!h-[62%] [&_svg]:!w-[62%]"><ChannelLogo id={r.id} size={30} /></span>
              <span className="min-w-0 flex-1 text-[clamp(10.5px,2.5cqw,13.5px)] leading-tight">
                <span className="block truncate font-semibold text-ink">{r.t}</span>
                <span className="block truncate text-muted-ink">{r.s}</span>
              </span>
              {r.needs ? <Chip tone="amber"><AlertCircle className="h-3 w-3" /> Needs you</Chip> : <Check className="h-[1.1em] w-[1.1em] text-grow" strokeWidth={2.5} />}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/** Bookings: a week in three dimensions; bookings drop into each person's column. */
export function BookingHero() {
  const cols = ["Stylist", "Colorist", "Barber"];
  const blocks = [
    { c: 0, top: 6, h: 22, t: "Cut and style", tone: "bg-primary-soft text-violet" },
    { c: 0, top: 54, h: 20, t: "Blow-dry", tone: "bg-grow-soft text-grow" },
    { c: 1, top: 18, h: 44, t: "Full color", tone: "bg-create-soft text-create" },
    { c: 2, top: 4, h: 14, t: "Fade", tone: "bg-amber-soft text-amber" },
    { c: 2, top: 30, h: 14, t: "Beard trim", tone: "bg-primary-soft text-violet" },
    { c: 2, top: 62, h: 26, t: "Cut and style", tone: "bg-grow-soft text-grow" },
  ];
  return (
    <Stage label="A calendar with a column for each team member. New bookings drop into the right person's column.">
      <div aria-hidden className="rp-tilt-3d absolute inset-[7%_5%_9%_7%] flex flex-col overflow-hidden rounded-rp-lg border border-line bg-white shadow-rp-3">
        <div className="grid grid-cols-3 border-b border-line text-[clamp(11px,2.7cqw,14px)] font-semibold text-ink">
          {cols.map((c) => <span key={c} className="border-l border-line px-[2.4cqw] py-[2cqw] first:border-l-0">{c}</span>)}
        </div>
        <div className="grid flex-1 grid-cols-3">
          {cols.map((c, ci) => (
            <div key={c} className="relative border-l border-line first:border-l-0" style={{ backgroundImage: "linear-gradient(var(--rp-border) 1px, transparent 1px)", backgroundSize: "100% 16.66%" }}>
              {blocks.filter((b) => b.c === ci).map((b, i) => (
                <span key={b.t + b.top} className={`rp-drop absolute inset-x-[6%] flex items-start rounded-[2cqw] px-[2cqw] py-[1.4cqw] text-[clamp(9.5px,2.3cqw,12.5px)] font-semibold leading-tight shadow-rp-1 ${b.tone}`} style={{ top: `${b.top}%`, height: `${b.h}%`, ...I(ci * 2 + i) }}>{b.t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <p aria-hidden className="rp-drop absolute bottom-0 left-0 flex items-center gap-2 rounded-full bg-ink px-[3cqw] py-[1.8cqw] text-[clamp(10.5px,2.5cqw,13.5px)] font-semibold text-white shadow-rp-3" style={I(7)}><CalendarCheck className="h-[1.2em] w-[1.2em] text-cta" /> Booked by your AI, just now</p>
    </Stage>
  );
}

/** Business Brain: everything you tell it, arranged around the ring that holds it. */
export function BrainHero() {
  const chips = ["Services", "Prices", "Hours", "Team", "Policies", "Questions", "Logo", "Tone"];
  return (
    <Stage label="Services, prices, hours, team, policies, questions, logo and tone sit around the RingPost ring: the Business Brain." ratio="aspect-square">
      <RingStage className="absolute inset-[16%]" scale={0.74} stillInset="15%" />
      {chips.map((c, i) => {
        const a = (i / chips.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <span key={c} aria-hidden className="rp-pulse-chip absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white px-[1em] py-[0.5em] text-[clamp(11px,2.7cqw,14.5px)] font-semibold text-ink shadow-rp-1" style={{ left: `${(50 + Math.cos(a) * 41).toFixed(2)}%`, top: `${(50 + Math.sin(a) * 43).toFixed(2)}%`, ...I(i) }}>
            {c}
          </span>
        );
      })}
    </Stage>
  );
}

/** Posting: one post leaves the ring and lands in a fan of phones, each a different app. */
export function PostingHero({ phones }: { phones: React.ReactNode[] }) {
  return (
    <Stage label="One post leaves the RingPost ring and appears in three phones: LinkedIn, Instagram and TikTok, each in its own shape." ratio="aspect-[1.05]">
      <div aria-hidden className="absolute left-1/2 top-0 h-[26%] w-[26%] -translate-x-1/2 rounded-full bg-white p-[3.4%] shadow-rp-2">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <linearGradient id="posting-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b4ee6" /><stop offset="0.55" stopColor="#7c6bff" /><stop offset="1" stopColor="#22d3ee" /></linearGradient>
          </defs>
          <path d="M270 76A140 140 0 1 0 337 245" fill="none" stroke="url(#posting-ring)" strokeWidth="58" strokeLinecap="round" />
          <circle cx="318" cy="296" r="30" fill="#22d3ee" />
        </svg>
      </div>
      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-0 top-[20%] h-[18%] w-full">
        {[18, 50, 82].map((x) => <path key={x} d={`M50 0 C 50 60, ${x} 40, ${x} 100`} fill="none" stroke="var(--rp-primary-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="rp-once-line" />)}
      </svg>
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-[34%]" style={{ perspective: "1400px", transformStyle: "preserve-3d" }}>
        <div className="rp-drop absolute left-[1%] top-[8%] w-[31%]" style={I(1)}><div style={{ transform: "rotateY(28deg) rotateZ(-3deg) translateZ(-60px)" }}>{phones[0]}</div></div>
        <div className="rp-drop absolute right-[1%] top-[8%] w-[31%]" style={I(3)}><div style={{ transform: "rotateY(-28deg) rotateZ(3deg) translateZ(-60px)" }}>{phones[2]}</div></div>
        <div className="rp-drop absolute left-1/2 top-0 z-10 w-[34%] -translate-x-1/2" style={I(2)}><Tilt3D rest={[6, 0]} depth={0.7}>{phones[1]}</Tilt3D></div>
      </div>
    </Stage>
  );
}
