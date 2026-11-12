import { CalendarCheck, PhoneCall, PhoneMissed } from "lucide-react";

const STEPS = [
  { icon: PhoneMissed, tone: "bg-amber-soft text-amber", t: "Rang out", s: "7:02 am, while you were with a customer" },
  { icon: PhoneCall, tone: "bg-primary-soft text-violet", t: "Called back by your assistant", s: "7:03 am, one minute later" },
  { icon: CalendarCheck, tone: "bg-grow-soft text-grow", t: "Booked", s: "7:05 am, for Thursday at 3:00 pm" },
];

/** The Calls page's centrepiece: the three moments of a call you missed. */
export function MissedCall() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STEPS.map((x, i) => (
          <li key={x.t} className="rp-drop relative rounded-rp-md border border-line bg-white p-5 shadow-rp-1" style={{ "--i": i * 2 } as React.CSSProperties}>
            <span className={`flex h-11 w-11 items-center justify-center rounded-full ${x.tone}`}><x.icon className="h-5 w-5" aria-hidden /></span>
            <p className="mt-4 text-small font-semibold text-muted-ink">Step {i + 1}</p>
            <p className="text-h3 font-semibold text-ink">{x.t}</p>
            <p className="mt-1.5 text-small text-muted-ink">{x.s}</p>
          </li>
        ))}
      </ol>
      <p className="flex items-center rounded-rp-md border border-primary-line bg-primary-soft p-5 text-body text-ink"><span><b className="font-semibold">Hear your own.</b> Once you choose your number, call it yourself and hear your assistant answer with your prices, before any customer does.</span></p>
    </div>
  );
}
