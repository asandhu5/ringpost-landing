"use client";

/**
 * The home page's comparison: why no other tool does all of it. Every claim is
 * something the product does today; no invented customers, numbers or ratings.
 */

import { Check, Minus } from "lucide-react";

const cx = (...p: (string | false | null | undefined)[]) => p.filter(Boolean).join(" ");

/* ───────────────────────── Problem → solution ───────────────────────── */

const ROWS = [
  { label: "Answers phone calls", desk: true, social: false },
  { label: "Replies on WhatsApp, Instagram, Messenger, texts and email", desk: "Some", social: false },
  { label: "Books into your calendar", desk: true, social: false },
  { label: "Makes images and videos for you", desk: false, social: "Some" },
  { label: "Posts on every platform", desk: false, social: true },
  { label: "Answers comments and reviews", desk: false, social: "Some" },
  { label: "Wins back quiet customers", desk: false, social: false },
  { label: "One AI that knows your whole business", desk: false, social: false },
] as const;

function Cell({ v, strong }: { v: boolean | string; strong?: boolean }) {
  if (v === true) return <Check className={cx("mx-auto h-5 w-5", strong ? "text-[#22d3ee]" : "text-[#94a3b8]")} aria-label="Yes" />;
  if (v === false) return <Minus className="mx-auto h-5 w-5 text-[#475569]" aria-label="No" />;
  return <span className="block text-center text-[12.5px] text-[#94a3b8]">{v}</span>;
}

export function UspCompare() {
  return (
    <div className="relative overflow-hidden rounded-[36px] bg-[#0b1b2b] px-5 py-12 text-white sm:px-10 lg:px-14">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,108,255,0.45),transparent_65%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.3),transparent_65%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#67e8f9]">Why RingPost</p>
          <h2 className="mt-4 text-[clamp(1.9rem,3.2vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.03em]">
            Other tools do one job.
            <br />
            <span className="bg-gradient-to-r from-[#a594ff] via-[#7dd3fc] to-[#22d3ee] bg-clip-text text-transparent">RingPost does all of them.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16.5px] leading-relaxed text-[#b8c2ce]">
            Receptionist apps answer the phone. Social tools post for you. RingPost does both, with one AI that knows your services, prices and customers, so the call, the booking and the post all say the same thing.
          </p>
          <ul className="mt-7 flex flex-col gap-3 text-[15px]">
            {["One login, one bill", "Set up in minutes, keep your number", "Nothing goes out without your say, unless you switch on autopilot"].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#22d3ee]/15 text-[#22d3ee]">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left text-[14.5px]">
            <thead>
              <tr>
                <th scope="col" className="pb-4 font-normal">
                  <span className="sr-only">What it does</span>
                </th>
                <th scope="col" className="w-[118px] px-2 pb-4 text-center text-[12px] font-semibold leading-tight text-[#94a3b8]">
                  Receptionist apps
                </th>
                <th scope="col" className="w-[118px] px-2 pb-4 text-center text-[12px] font-semibold leading-tight text-[#94a3b8]">
                  Social media tools
                </th>
                <th scope="col" className="w-[120px] rounded-t-2xl bg-white/[0.07] pb-4 pt-4 text-center text-[14px] font-bold text-white">
                  RingPost
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r.label}>
                  <th scope="row" className="border-t border-white/10 py-3.5 pr-4 font-normal text-[#dbe3ec]">
                    {r.label}
                  </th>
                  <td className="border-t border-white/10 py-3.5">
                    <Cell v={r.desk} />
                  </td>
                  <td className="border-t border-white/10 py-3.5">
                    <Cell v={r.social} />
                  </td>
                  <td className={cx("border-t border-white/10 bg-white/[0.07] py-3.5", i === ROWS.length - 1 && "rounded-b-2xl")}>
                    <Cell v strong />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
