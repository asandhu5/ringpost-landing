"use client";

import { useState } from "react";
import { CalendarCheck, Check, MessageSquareText } from "lucide-react";
import { cx } from "@/components/site/ui/cx";

const SERVICES = [
  { id: "cut", name: "Cut and style", mins: 45, price: 45 },
  { id: "color", name: "Full color", mins: 120, price: 120 },
  { id: "blow", name: "Blow-dry", mins: 30, price: 30 },
];
const TEAM = [
  { id: "a", name: "Stylist", busy: [1, 4] },
  { id: "b", name: "Colorist", busy: [0, 2, 5] },
  { id: "c", name: "Barber", busy: [3] },
];
const SLOTS = ["9:00 am", "10:30 am", "12:00 pm", "1:30 pm", "3:00 pm", "4:30 pm"];

const group = "rounded-rp-md border border-line bg-white p-4 shadow-rp-1";
const option = (on: boolean) => cx("flex min-h-11 items-center justify-between gap-3 rounded-rp-sm border px-3.5 py-2 text-left text-small font-semibold transition-colors duration-200", on ? "border-violet bg-primary-soft text-ink" : "border-line bg-white text-ink hover:border-primary-line");

/**
 * The Bookings page's centrepiece: choose a service and a team member, see the free
 * times a customer would be offered, pick one, and watch what follows — the booking, the
 * Google Calendar event and the reminder text.
 */
export function BookingDemo() {
  const [svc, setSvc] = useState(0);
  const [who, setWho] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const s = SERVICES[svc];
  const t = TEAM[who];
  const choose = (fn: () => void) => {
    fn();
    setSlot(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr_1.15fr]">
      <fieldset className={group}>
        <legend className="sr-only">Service</legend>
        <p className="text-small font-semibold text-muted-ink">1. Pick a service</p>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {SERVICES.map((x, i) => (
            <button key={x.id} type="button" aria-pressed={i === svc} onClick={() => choose(() => setSvc(i))} className={option(i === svc)}>
              {x.name}
              <span className="font-normal text-muted-ink">{x.mins} min · ${x.price}</span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-small font-semibold text-muted-ink">2. Pick a team member</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {TEAM.map((x, i) => (
            <button key={x.id} type="button" aria-pressed={i === who} onClick={() => choose(() => setWho(i))} className={cx(option(i === who), "!justify-center")}>
              {x.name}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={group}>
        <p className="text-small font-semibold text-muted-ink">3. Free times on Friday with the {t.name.toLowerCase()}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {SLOTS.map((time, i) => {
            const busy = t.busy.includes(i);
            return (
              <button key={time} type="button" disabled={busy} aria-pressed={slot === i} onClick={() => setSlot(i)} className={cx("min-h-11 rounded-rp-sm border px-3 text-small font-semibold transition-colors duration-200", busy ? "cursor-not-allowed border-line bg-surface-2 text-muted-ink line-through" : slot === i ? "border-grow bg-grow text-white" : "border-line bg-white text-ink hover:border-grow")}>
                {time}
                {busy && <span className="sr-only"> (already booked)</span>}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] text-muted-ink">Crossed-out times are already taken, or blocked in Google Calendar.</p>
      </div>

      <div className={cx(group, "flex flex-col gap-3")} aria-live="polite">
        {slot === null ? (
          <p className="flex flex-1 items-center justify-center rounded-rp-sm border border-dashed border-line-strong p-6 text-center text-body text-muted-ink">Pick a time to see what happens next.</p>
        ) : (
          <>
            <div className="rp-msg-in flex items-center gap-3 rounded-rp-sm bg-grow-soft p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-grow text-white"><Check className="h-5 w-5" strokeWidth={2.5} aria-hidden /></span>
              <p className="text-small text-ink"><b className="block font-semibold">Booked</b>{s.name} with the {t.name.toLowerCase()}, Friday at {SLOTS[slot]}.</p>
            </div>
            <div className="rp-msg-in flex items-center gap-3 rounded-rp-sm border border-line p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-rp-sm bg-[#e8f0fe] text-[#4285f4]"><CalendarCheck className="h-5 w-5" aria-hidden /></span>
              <p className="text-small text-ink"><b className="block font-semibold">Added to Google Calendar</b>{s.name} · Fri {SLOTS[slot]} · {s.mins} minutes</p>
            </div>
            <div className="rp-msg-in flex items-start gap-3 rounded-rp-sm border border-line p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-rp-sm bg-primary-soft text-violet"><MessageSquareText className="h-5 w-5" aria-hidden /></span>
              <p className="text-small text-ink"><b className="block font-semibold">Reminder text, the day before</b>&ldquo;Reminder: your {s.name.toLowerCase()} is tomorrow at {SLOTS[slot]}. Reply here if you need to move it.&rdquo;</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
