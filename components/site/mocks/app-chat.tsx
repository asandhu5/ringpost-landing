import { CalendarCheck, ChevronLeft, Phone, Video } from "lucide-react";
import { HomeIndicator, IPhone16ProMax, StatusBar } from "@/components/site/phone/iphone";
import { Tilt3D } from "@/components/site/ui/tilt-3d";
import { ChannelLogo } from "@/components/site/channel-logos";

/**
 * One conversation as the customer sees it, in the look of the app they used: WhatsApp,
 * Instagram, Messenger, a text message, an email or a phone call. The customer's words
 * are on the right, the business's on the left, as on their own phone.
 */
export type ChatApp = "whatsapp" | "instagram" | "messenger" | "sms" | "email" | "phone";
export interface ChatLine {
  from: "customer" | "ai";
  text: string;
}

const LOOK: Record<ChatApp, { bar: string; barText: string; sub: string; bg: string; mine: string; theirs: string; title: string }> = {
  whatsapp: { bar: "bg-[#075e54]", barText: "text-white", sub: "text-white/75", bg: "bg-[#efe7dd]", mine: "bg-[#d9fdd3] text-[#111b21]", theirs: "bg-white text-[#111b21]", title: "WhatsApp" },
  instagram: { bar: "bg-white border-b border-[#efefef]", barText: "text-[#111]", sub: "text-[#737373]", bg: "bg-white", mine: "bg-[linear-gradient(135deg,#7c3aed,#4f5bd5)] text-white", theirs: "bg-[#efefef] text-[#111]", title: "Instagram" },
  messenger: { bar: "bg-white border-b border-[#eee]", barText: "text-[#111]", sub: "text-[#65676b]", bg: "bg-white", mine: "bg-[#0084ff] text-white", theirs: "bg-[#f0f0f0] text-[#111]", title: "Messenger" },
  sms: { bar: "bg-[#f6f6f6] border-b border-[#e3e3e3]", barText: "text-[#111]", sub: "text-[#8e8e93]", bg: "bg-white", mine: "bg-[#34c759] text-white", theirs: "bg-[#e9e9eb] text-[#111]", title: "Text message" },
  email: { bar: "bg-white border-b border-[#e8eaed]", barText: "text-[#202124]", sub: "text-[#5f6368]", bg: "bg-white", mine: "", theirs: "", title: "Email" },
  phone: { bar: "bg-[#101418]", barText: "text-white", sub: "text-white/60", bg: "bg-[#101418]", mine: "bg-white/10 text-white", theirs: "bg-[#22d3ee]/15 text-white", title: "Phone call" },
};

export function AppChat({ app, business, lines, outcome, subject, shown, className }: { app: ChatApp; business: string; lines: ChatLine[]; outcome?: string; subject?: string; /** How many lines to show; all when left out. */ shown?: number; className?: string }) {
  const look = LOOK[app];
  const visible = shown === undefined ? lines : lines.slice(0, shown);
  const done = shown === undefined || shown >= lines.length;
  return (
    <div className={`flex flex-col overflow-hidden text-left ${look.bg} ${className ?? ""}`}>
      <div className={`flex items-center gap-2.5 px-3.5 py-2.5 ${look.bar}`}>
        {app !== "email" && app !== "phone" && <ChevronLeft className={`h-5 w-5 ${look.barText}`} aria-hidden />}
        <ChannelLogo id={app} size={30} />
        <span className="min-w-0 flex-1 leading-tight">
          <span className={`block truncate text-[14.5px] font-semibold ${look.barText}`}>{app === "email" ? subject ?? "Your inquiry" : business}</span>
          <span className={`block text-[11.5px] ${look.sub}`}>{app === "phone" ? "On the line · AI assistant" : app === "email" ? `${business} · same thread` : look.title}</span>
        </span>
        {(app === "whatsapp" || app === "messenger") && (
          <>
            <Video className={`h-[18px] w-[18px] ${look.barText}`} aria-hidden />
            <Phone className={`h-4 w-4 ${look.barText}`} aria-hidden />
          </>
        )}
        {app === "phone" && (
          <span className="flex items-end gap-[3px]" aria-hidden>
            {[8, 14, 10, 18, 9].map((h, i) => (
              <span key={i} className="rp-wave w-[3px] rounded-full bg-cta" style={{ height: h, animationDelay: `${i * 0.12}s` }} />
            ))}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-start gap-2 px-3.5 py-4">
        {visible.map((l, i) =>
          app === "email" ? (
            <div key={i} className="rp-msg-in rounded-[10px] border border-[#e8eaed] p-3">
              <p className="text-[11.5px] font-semibold text-[#5f6368]">{l.from === "customer" ? "You" : business}</p>
              <p className="mt-1 text-[13.5px] leading-snug text-[#202124]">{l.text}</p>
            </div>
          ) : (
            <p key={i} className={`rp-msg-in max-w-[84%] px-3.5 py-2 text-[14px] leading-snug ${app === "whatsapp" ? "rounded-[10px] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]" : "rounded-[18px]"} ${l.from === "customer" ? `self-end ${look.mine}` : `self-start ${look.theirs}`}`}>
              {app === "phone" && <span className="mb-0.5 block text-[10.5px] font-semibold uppercase tracking-[0.06em] opacity-60">{l.from === "customer" ? "Caller" : "AI assistant"}</span>}
              {l.text}
            </p>
          ),
        )}
        {outcome && done && (
          <p className={`rp-msg-in mt-1 inline-flex items-center gap-1.5 self-center rounded-full px-3 py-1.5 text-[12.5px] font-semibold ${app === "phone" ? "bg-cta text-cta-ink" : "bg-grow-soft text-grow"}`}>
            <CalendarCheck className="h-3.5 w-3.5" aria-hidden /> {outcome}
          </p>
        )}
      </div>
    </div>
  );
}

/** What sits behind the status bar for each app, so the top of the phone matches it. */
const TOP: Record<ChatApp, { bg: string; light: boolean }> = {
  phone: { bg: "#101418", light: true },
  whatsapp: { bg: "#075e54", light: true },
  instagram: { bg: "#ffffff", light: false },
  messenger: { bg: "#ffffff", light: false },
  sms: { bg: "#f6f6f6", light: false },
  email: { bg: "#ffffff", light: false },
};

/** The app's own text is drawn at phone size: the 440-point iPhone screen shows it ×1.45. */
const ZOOM = 1.45;

/**
 * A real iPhone 16 Pro Max in 3D, the same body as the posting phones: titanium edge,
 * Dynamic Island, status bar and home indicator. It turns toward the words beside it and
 * follows the mouse on a laptop. `side` is where those words are. `app` colours the
 * status bar to match the app on screen. Sized by its width; the height follows.
 */
export function PhoneFrame({ children, className, side = "right", app }: { children: React.ReactNode; className?: string; side?: "left" | "right"; app?: ChatApp }) {
  const top = app ? TOP[app] : { bg: "#ffffff", light: false };
  return (
    <Tilt3D className={className} rest={[5, side === "right" ? -16 : 16]}>
      <IPhone16ProMax width={320} dark={top.light}>
        <div className="flex flex-col bg-white" style={{ width: 440 / ZOOM, height: 956 / ZOOM, zoom: ZOOM }}>
          <div className="shrink-0" style={{ background: top.bg, zoom: 1 / ZOOM }}>
            <StatusBar dark={top.light} />
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
          <div className="h-[22px] shrink-0" style={{ background: app === "phone" ? "#101418" : "#ffffff" }} />
        </div>
        <HomeIndicator dark={top.light} />
      </IPhone16ProMax>
    </Tilt3D>
  );
}
