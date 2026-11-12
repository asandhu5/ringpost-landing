"use client";

import { CalendarCheck, Check, CheckCheck, Mic, Phone, PhoneIncoming, Send, Sparkles, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";

/**
 * The six moments of the day story. Each scene is drawn from one number, p (0 to 1),
 * how far the reader has scrolled through that moment, so scrolling back up plays it in
 * reverse. Nothing here is a screenshot: each one is a small, purpose-made picture.
 */

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** 0 before `from`, 1 after `to`, a straight line between. */
const span = (p: number, from: number, to: number) => clamp((p - from) / (to - from));
const typed = (text: string, t: number) => text.slice(0, Math.round(text.length * clamp(t)));
const show = (t: number) => ({ opacity: clamp(t * 1.4), transform: `translateY(${(1 - clamp(t)) * 14}px)` });

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[26px] border border-line bg-white shadow-[0_40px_90px_-45px_rgba(11,27,43,0.55)] ${className}`}>{children}</div>;
}

/* 1. The missed call, called back and booked. */
export function CallScene({ p }: { p: number }) {
  const ringing = p < 0.18;
  const missed = span(p, 0.12, 0.2);
  const calling = span(p, 0.22, 0.3);
  const lines = [
    { who: "ai", text: "Hi, it's Mirror Finish Detailing calling back. Sorry we missed you. How can I help?" },
    { who: "c", text: "Do you have time for a full detail this week? It's a black SUV." },
    { who: "ai", text: "Yes. Thursday at 3:00 pm is free. A full detail is about three hours. Shall I book it?" },
    { who: "c", text: "Perfect, book it." },
  ];
  const booked = span(p, 0.8, 0.9);
  return (
    <div className="relative mx-auto w-full max-w-[440px]">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <span className={`flex h-11 w-11 items-center justify-center rounded-full ${ringing ? "rp-ring-pulse bg-[#16a34a] text-white" : missed < 1 ? "bg-[#fee2e2] text-[#b42318]" : "bg-[#ede9fe] text-[#5b4ee6]"}`}>
            {calling > 0.5 ? <Mic className="h-5 w-5" /> : <PhoneIncoming className="h-5 w-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-ink">{calling > 0.5 ? "RingPost is calling back" : ringing ? "Incoming call" : "Missed call"}</p>
            <p className="text-[13px] text-muted-ink">{calling > 0.5 ? "On the line now · 1:12" : "(555) 014-2271 · while you were with a client"}</p>
          </div>
          {calling > 0.5 && (
            <span className="flex items-end gap-[3px]" aria-hidden>
              {[8, 14, 10, 18, 9, 15].map((h, i) => (
                <span key={i} className="rp-wave w-[3px] rounded-full bg-[#5b4ee6]" style={{ height: h, animationDelay: `${i * 0.12}s` }} />
              ))}
            </span>
          )}
        </div>
        <div className="flex min-h-[250px] flex-col gap-2.5 bg-[#fbfbfd] px-5 py-5">
          {lines.map((l, i) => {
            const t = span(p, 0.3 + i * 0.12, 0.38 + i * 0.12);
            return (
              <p key={i} style={show(t)} className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${l.who === "ai" ? "self-start rounded-tl-md bg-white text-ink ring-1 ring-line" : "self-end rounded-tr-md bg-[#5b4ee6] text-white"}`}>
                {l.text}
              </p>
            );
          })}
        </div>
      </Card>
      <div style={show(booked)} className="absolute -bottom-6 -right-3 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl sm:-right-8">
        <CalendarCheck className="h-5 w-5 text-cta" />
        <div>
          <p className="text-[13.5px] font-semibold">Booked: Thu 3:00 pm</p>
          <p className="text-[12px] text-white/70">Full detail · in your calendar</p>
        </div>
      </div>
    </div>
  );
}

/* 2. A phone photo becomes a finished post. */
export function PostScene({ p }: { p: number }) {
  const wipe = span(p, 0.12, 0.55);
  const caption = "Honey balayage, lived-in and glossy. Two chairs free this Saturday. Book from the link in bio.";
  const t = span(p, 0.5, 0.8);
  const platforms = ["instagram", "facebook", "x", "google_business_profile"];
  const sent = span(p, 0.82, 0.92);
  return (
    <div className="mx-auto grid w-full max-w-[520px] grid-cols-[1fr] gap-4 sm:grid-cols-[1.05fr_0.95fr] sm:items-end">
      <Card className="relative mx-auto w-full max-w-[300px] overflow-hidden p-0 sm:max-w-none">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[26px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/showcase/beauty-photo.webp" alt="The stylist's quick phone photo of a client's new balayage" className="absolute inset-0 h-full w-full object-cover" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/showcase/beauty-post.webp" alt="The finished post made from it" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - wipe * 100}% 0 0)` }} />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-medium text-white backdrop-blur">{wipe < 0.5 ? "Your phone photo" : "Your post"}</span>
          <span className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]" style={{ left: `${wipe * 100}%`, opacity: wipe > 0 && wipe < 1 ? 1 : 0 }} />
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        <Card className="p-4">
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5b4ee6]"><Sparkles className="h-3.5 w-3.5" /> Caption, in your voice</p>
          <p className="mt-2 min-h-[84px] text-[14px] leading-snug text-ink">
            {typed(caption, t)}
            {t > 0 && t < 1 && <span className="rp-caret" />}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-[12.5px] font-semibold text-muted-ink">Going to</p>
          <div className="mt-2.5 flex gap-2">
            {platforms.map((id, i) => (
              <span key={id} style={{ opacity: 0.25 + span(p, 0.62 + i * 0.05, 0.7 + i * 0.05) * 0.75 }}>
                <ChannelLogo id={id} size={32} />
              </span>
            ))}
          </div>
          <p style={show(sent)} className="mt-3 flex items-center gap-1.5 text-[13px] font-semibold text-grow"><Check className="h-4 w-4" /> Approved · goes out at 6:00 pm</p>
        </Card>
      </div>
    </div>
  );
}

/* 3. A tough review, answered calmly, after the owner's OK. */
export function ReviewScene({ p }: { p: number }) {
  const reply = "Thank you for telling us, and sorry for the wait on Saturday. That's not the visit we want you to have. We've added a second check-in at busy times. Next time, your first coffee is on us.";
  const t = span(p, 0.3, 0.72);
  const pressed = p > 0.8;
  const posted = span(p, 0.84, 0.94);
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col gap-4">
      <Card className="p-5" >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fde68a] text-[15px] font-bold text-[#92400e]"><Star className="h-4 w-4" /></span>
          <div>
            <p className="text-[14.5px] font-semibold text-ink">New Google review</p>
            <p className="flex items-center gap-0.5" aria-label="2 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < 2 ? "fill-[#f59e0b] text-[#f59e0b]" : "text-[#d4d8de]"}`} />
              ))}
              <span className="ml-1.5 text-[12px] text-muted-ink">Google · 2 hours ago</span>
            </p>
          </div>
        </div>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink">Good food but we waited 20 minutes past our booking on Saturday and nobody told us why.</p>
      </Card>
      <Card className="p-5" >
        <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#5b4ee6]"><Sparkles className="h-3.5 w-3.5" /> Reply drafted in your voice</p>
        <p className="mt-2 min-h-[110px] text-[14px] leading-relaxed text-ink">
          {typed(reply, t)}
          {t > 0 && t < 1 && <span className="rp-caret" />}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span style={show(posted)} className="flex items-center gap-1.5 text-[13px] font-semibold text-grow"><CheckCheck className="h-4 w-4" /> Posted to Google</span>
          <span className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all ${pressed ? "scale-95 bg-grow text-white" : "bg-ink text-white"}`}>{pressed ? "Approved" : "Approve"}</span>
        </div>
      </Card>
    </div>
  );
}

/* 4. The week, read for you. */
export function InsightScene({ p }: { p: number }) {
  const days = [
    { d: "Mon", v: 0.62 },
    { d: "Tue", v: 0.28 },
    { d: "Wed", v: 0.55 },
    { d: "Thu", v: 0.71 },
    { d: "Fri", v: 0.88 },
    { d: "Sat", v: 1 },
    { d: "Sun", v: 0.46 },
  ];
  const grow = span(p, 0.08, 0.5);
  const note = span(p, 0.55, 0.7);
  const cta = span(p, 0.75, 0.85);
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <Card className="p-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[15px] font-semibold text-ink">Bookings this week</p>
          <p className="text-[13px] text-muted-ink">Monday summary</p>
        </div>
        <div className="mt-6 flex h-40 items-end gap-3">
          {days.map((x) => (
            <div key={x.d} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className={`w-full rounded-t-lg ${x.d === "Tue" ? "bg-[#f59e0b]" : "bg-[#c7c1ff]"}`} style={{ height: `${x.v * (0.3 + grow * 0.7) * 100}%` }} />
              <span className={`text-[12px] ${x.d === "Tue" ? "font-semibold text-ink" : "text-muted-ink"}`}>{x.d}</span>
            </div>
          ))}
        </div>
        <div style={show(note)} className="mt-6 rounded-2xl bg-[#fff7ed] p-4">
          <p className="text-[14.5px] leading-relaxed text-ink">
            <strong>Tuesdays are your quietest day.</strong> Nine people asked about Saturday times that were already full. A Tuesday offer could move some of them.
          </p>
        </div>
        <div style={show(cta)} className="mt-4 flex gap-2">
          <span className="rounded-full bg-ink px-4 py-2 text-[13.5px] font-semibold text-white">Make a Tuesday post</span>
          <span className="rounded-full border border-line px-4 py-2 text-[13.5px] font-medium text-ink">Ask about it</span>
        </div>
      </Card>
    </div>
  );
}

/* 5. Midnight on WhatsApp: answered and booked while the owner sleeps. */
export function NightScene({ p }: { p: number }) {
  const msgs = [
    { me: false, text: "Hi, how much is balayage? Anything free Saturday?", time: "11:48 pm" },
    { me: true, text: "Hi! Balayage is $185 and takes about 3 hours. Saturday I have 10:00 am or 1:30 pm. Would either work?", time: "11:48 pm" },
    { me: false, text: "1:30 please", time: "11:49 pm" },
    { me: true, text: "Done. You're booked for Saturday at 1:30 pm. I'll send a reminder the day before.", time: "11:49 pm" },
  ];
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <div className="overflow-hidden rounded-[30px] border border-[#1f2c33] bg-[#0b141a] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3 bg-[#1f2c33] px-4 py-3">
          <ChannelLogo id="whatsapp" size={30} />
          <div>
            <p className="text-[14.5px] font-semibold text-white">Golden Hour Hair</p>
            <p className="text-[12px] text-[#aebac1]">Business account</p>
          </div>
        </div>
        <div className="flex min-h-[330px] flex-col gap-2 px-3 py-4" style={{ background: "radial-gradient(circle at 30% 20%, #10202a, #0b141a)" }}>
          {msgs.map((m, i) => {
            const t = span(p, 0.1 + i * 0.17, 0.2 + i * 0.17);
            return (
              <div key={i} style={show(t)} className={`max-w-[82%] rounded-xl px-3 py-2 text-[14px] leading-snug ${m.me ? "self-end rounded-tr-sm bg-[#005c4b] text-[#e9edef]" : "self-start rounded-tl-sm bg-[#202c33] text-[#e9edef]"}`}>
                {m.text}
                <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[10.5px] text-[#aebac1]">
                  {m.time} {m.me && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                </span>
              </div>
            );
          })}
          <div style={show(span(p, 0.85, 0.95))} className="mx-auto mt-2 flex items-center gap-1.5 rounded-full bg-[#182229] px-3 py-1.5 text-[12px] text-[#aebac1]">
            <CalendarCheck className="h-3.5 w-3.5 text-cta" /> Booked: Sat 1:30 pm · you were asleep
          </div>
        </div>
        <div className="flex items-center gap-2 bg-[#1f2c33] px-3 py-2.5">
          <span className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-[13px] text-[#aebac1]">Message</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884] text-white"><Send className="h-4 w-4" /></span>
        </div>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] text-muted-ink"><Phone className="h-3.5 w-3.5" /> Calls, Instagram, Messenger and email work the same way.</p>
    </div>
  );
}

/* 6. An Instagram DM asks a price, and books. */
export function DmScene({ p }: { p: number }) {
  const msgs = [
    { me: false, text: "Hi! How much is a full color? Anything free Saturday?" },
    { me: true, text: "Hi! A full color starts at $120 and takes about two hours. Saturday I have 10:30 am or 2:00 pm. Which suits you?" },
    { me: false, text: "2:00 please!" },
    { me: true, text: "Done. You're booked for Saturday at 2:00 pm. I'll send a reminder the day before." },
  ];
  return (
    <div className="mx-auto w-full max-w-[400px]">
      <Card className="overflow-hidden">
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <ChannelLogo id="instagram" size={32} />
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-semibold text-ink">goldenhourhair</p>
            <p className="text-[12px] text-muted-ink">Instagram DM · 9:15 am</p>
          </div>
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-grow"><span className="h-1.5 w-1.5 rounded-full bg-grow" /> AI is answering</span>
        </div>
        <div className="flex min-h-[300px] flex-col gap-2 px-4 py-4">
          {msgs.map((m, i) => {
            const t = span(p, 0.08 + i * 0.18, 0.18 + i * 0.18);
            return (
              <p key={i} style={m.me ? { ...show(t), background: "linear-gradient(135deg,#7c3aed,#4f5bd5)" } : show(t)} className={`max-w-[82%] rounded-[20px] px-3.5 py-2.5 text-[14px] leading-snug ${m.me ? "self-end rounded-br-md text-white" : "self-start rounded-bl-md bg-[#efefef] text-ink"}`}>
                {m.text}
              </p>
            );
          })}
          <div style={show(span(p, 0.84, 0.94))} className="mt-1 flex items-center gap-1.5 self-end rounded-full bg-grow-soft px-3 py-1.5 text-[12.5px] font-semibold text-grow">
            <CalendarCheck className="h-3.5 w-3.5" /> Booked · Sat 2:00 pm
          </div>
        </div>
      </Card>
    </div>
  );
}
