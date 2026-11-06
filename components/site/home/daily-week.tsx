"use client";

import { Clapperboard, Sparkles } from "lucide-react";
import { useInView } from "@/components/site/motion";
import { INDUSTRY_SHOWCASE } from "@/lib/content/industry-showcase";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** A week of daily content filling the Media Library, three pictures a morning and the
 * week's video on Friday. The pictures arrive day by day as the week scrolls into view. */
export function DailyWeek() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const pool = INDUSTRY_SHOWCASE.map((x) => x.after);
  return (
    <div ref={ref} className="rounded-[28px] border border-line bg-white p-4 shadow-[0_30px_70px_-45px_rgba(11,27,43,0.45)] sm:p-6">
      <p className="mb-4 flex items-center gap-2 text-[14px] font-semibold text-ink"><Sparkles className="h-4 w-4 text-glow" aria-hidden />Your Media Library this week</p>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {DAYS.map((d, i) => (
          <div key={d} className="flex flex-col gap-1.5 sm:gap-2.5">
            <p className="text-center text-[12px] font-semibold text-muted-ink">{d}</p>
            {[0, 1, 2].map((j) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={j}
                src={pool[(i * 3 + j) % pool.length]}
                alt=""
                loading="lazy"
                className={`aspect-square w-full rounded-lg object-cover transition-[opacity,transform] duration-500 ${inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{ transitionDelay: `${i * 120 + j * 60}ms` }}
              />
            ))}
            {i === 4 && (
              <span className={`flex items-center justify-center gap-1 rounded-md bg-ink py-1 text-[10.5px] font-semibold text-white transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "900ms" }}>
                <Clapperboard className="h-3 w-3" aria-hidden />30 s
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
