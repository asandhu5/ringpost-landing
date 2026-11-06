"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CalendarCheck, Check, Clock, MessageSquare, RotateCcw, Send, Sparkles, UsersRound } from "lucide-react";
import { useInView } from "@/components/site/motion";
import { IPhone16ProMax, StatusBar, HomeIndicator } from "@/components/site/phone/iphone";
import { DesktopFrame } from "./desktop-frame";

const GROUPS = [
  { Icon: Clock, tone: "#4f46e5", n: 20, t: "Slipping away", when: "Last visit: 1 to 2 months", b: "A friendly check-in and a gentle reminder to book the next visit." },
  { Icon: RotateCcw, tone: "#c2410c", n: 35, t: "Lapsed", when: "Last visit: 2 to 4 months", b: "Something new or seasonal, and an invitation back this month." },
  { Icon: AlertTriangle, tone: "#be123c", n: 29, t: "Long gone", when: "Last visit: 4 months or more", b: "A warm welcome back, and how easy it is to book." },
  { Icon: UsersRound, tone: "#15803d", n: 12, t: "Asked but never booked", when: "No visit on record", b: "A short, helpful nudge towards a first visit." },
];

const ROUGH = "few spaces thurs and sat, 10% off colour this month";
const WRITTEN = "Hi {first name}! It's been a little while since your last visit. We have a few spaces on Thursday and Saturday, and colour is 10% off this month. Reply to book and we'll save you a time.";
const CUSTOMERS = ["Curtis M.", "Aria F.", "Abigail T.", "Harper B.", "Owen D."];

/**
 * The Win Back screen recreated: pick a group, jot a rough idea, Write with AI turns it into
 * the message, send to everyone who can receive it. A customer's phone shows the text
 * arriving, their reply, and the booking.
 */
export function WinbackHero() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.2 }, false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(4);
      return;
    }
    const id = setTimeout(() => setStep((s) => (s >= 4 ? 0 : s + 1)), step >= 4 ? 3600 : 1600);
    return () => clearTimeout(id);
  }, [inView, step]);

  return (
    <div ref={ref} className="relative pb-24 lg:pb-0 lg:pr-[200px]">
      <DesktopFrame title="Win Back">
        <div className="p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GROUPS.map(({ Icon, tone, n, t, when, b }, i) => (
              <div key={t} className={`rounded-2xl border bg-white p-4 transition-all duration-500 ${i === 1 && step >= 1 ? "border-[#c2410c] shadow-[0_0_0_4px_rgba(194,65,12,0.12)]" : "border-line"}`}>
                <div className="flex items-start justify-between"><span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${tone}14`, color: tone }}><Icon className="h-4 w-4" aria-hidden /></span><span className="text-[24px] font-bold tabular-nums text-ink">{n}</span></div>
                <p className="mt-2 text-[14.5px] font-semibold text-ink">{t}</p>
                <p className="text-[12px] text-muted-ink">{when}</p>
                <p className="mt-2 text-[12.5px] leading-snug text-muted-ink">{b}</p>
                <p className="mt-2 text-[12.5px] font-semibold" style={{ color: tone }}>Win back {n} →</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <div className="rounded-2xl border border-line p-4">
              <div className="flex items-center justify-between"><p className="text-[14px] font-semibold text-ink">Your message</p><span className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${step === 2 ? "bg-[#0e7490] text-white" : "bg-cta text-[var(--rp-cta-ink)]"}`}><Sparkles className="h-3.5 w-3.5" aria-hidden />Write with AI</span></div>
              <p className="mt-3 min-h-[92px] rounded-xl border border-line bg-surface-2 p-3 text-[13.5px] leading-relaxed text-ink">
                {step < 2 ? <span className="text-muted-ink">{ROUGH}</span> : <span key="w" className="rp-fade-in">{WRITTEN.split("{first name}").map((part, k) => <span key={k}>{part}{k === 0 && <span className="rounded bg-[#ede9fe] px-1 text-[#4f46e5]">first name</span>}</span>)}</span>}
              </p>
              <p className="mt-2 text-[12px] text-muted-ink">Your AI uses your services, prices and the offer you are running, and never makes up a discount. &ldquo;Reply STOP to opt out.&rdquo; is added to the end.</p>
              <span className={`mt-3 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[13.5px] font-semibold transition-colors ${step >= 3 ? "bg-[#15803d] text-white" : "bg-cta text-[var(--rp-cta-ink)]"}`}>{step >= 3 ? <><Check className="h-4 w-4" aria-hidden />Sent to 31 customers</> : <><Send className="h-4 w-4" aria-hidden />Send to 31 customers</>}</span>
            </div>
            <div className="rounded-2xl border border-line p-4">
              <p className="text-[14px] font-semibold text-ink">Lapsed customers <span className="font-normal text-muted-ink">(35)</span></p>
              <p className="mt-2 flex items-center gap-2 text-[13px] text-ink"><span className="flex h-4 w-4 items-center justify-center rounded bg-[#4f46e5] text-white"><Check className="h-3 w-3" aria-hidden /></span>Everyone who can receive it (31)</p>
              <ul className="mt-2 flex flex-col divide-y divide-line">
                {CUSTOMERS.map((c, i) => (
                  <li key={c} className="flex items-center gap-2 py-1.5 text-[13px] text-ink"><span className="flex h-4 w-4 items-center justify-center rounded bg-[#4f46e5] text-white"><Check className="h-3 w-3" aria-hidden /></span>{c}<span className="ml-auto text-[12px] text-muted-ink">{2 + i % 2} months ago</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DesktopFrame>

      <div className="absolute -bottom-6 right-2 w-[210px] lg:-bottom-10 lg:right-0 lg:w-[230px]">
        <IPhone16ProMax width={230} label="A customer's phone: the text arrives, they reply, and they are booked">
          <div className="flex h-full flex-col bg-white text-black">
            <StatusBar />
            <div className="flex flex-col items-center border-b border-black/10 pb-2"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#db2777] text-[17px] font-bold text-white">S</span><span className="mt-1 text-[13px]">Studio &amp; Co.</span></div>
            <div className="flex flex-1 flex-col gap-2 p-3 text-[14.5px] leading-snug">
              <p className={`max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3 py-2 transition-opacity duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}>{WRITTEN.replace("{first name}", "Aria")} Reply STOP to opt out.</p>
              <p className={`max-w-[75%] self-end rounded-2xl rounded-br-md bg-[#0b84ff] px-3 py-2 text-white transition-opacity duration-500 ${step >= 4 ? "opacity-100" : "opacity-0"}`}>Yes please! Thursday after 4?</p>
              <p className={`max-w-[85%] self-start rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3 py-2 transition-opacity duration-500 ${step >= 4 ? "opacity-100 delay-500" : "opacity-0"}`}>You&apos;re booked for Thursday at 4:30. See you then!</p>
              <span className={`flex items-center gap-1.5 self-start rounded-xl bg-[#ecfdf3] px-3 py-1.5 text-[13px] font-semibold text-[#15803d] transition-opacity duration-500 ${step >= 4 ? "opacity-100 delay-700" : "opacity-0"}`}><CalendarCheck size={15} />Booked</span>
            </div>
            <div className="mb-[30px] flex items-center gap-2 px-3 py-2"><span className="flex-1 rounded-full border border-black/15 px-3 py-1.5 text-[13.5px] text-black/65">Text Message</span><MessageSquare size={18} className="text-[#0b84ff]" /></div>
            <HomeIndicator />
          </div>
        </IPhone16ProMax>
      </div>
    </div>
  );
}
