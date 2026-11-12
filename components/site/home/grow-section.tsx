import Link from "next/link";
import { ArrowRight, Bot, ChartNoAxesCombined, RotateCcw, Sparkles, Star } from "lucide-react";
import { ChannelLogo } from "@/components/site/channel-logos";
import { Container, IconTile, Section, SectionHeading } from "@/components/site/ui/primitives";
import { GROW } from "@/lib/content/home";

const ICON = { reviews: Star, winback: RotateCcw, insights: ChartNoAxesCombined, talk: Bot };

/** A small moving picture of each Grow tool. Complete as drawn; the motion is a garnish. */
function Mini({ id }: { id: string }) {
  if (id === "reviews")
    return (
      <>
        <p className="flex items-center gap-2 text-[12.5px] leading-snug text-ink">
          <ChannelLogo id="instagram" size={20} /> Love this color! How much?
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-[12.5px] leading-snug text-ink">
          <ChannelLogo id="google_business_profile" size={20} />
          <span className="flex gap-0.5" aria-label="5 stars">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" aria-hidden />)}</span>
          Great cut!
        </p>
        <p className="mt-2 rounded-rp-sm bg-primary-soft p-2.5 text-[12.5px] leading-snug text-ink">
          <span className="mb-0.5 flex items-center gap-1 text-[11px] font-semibold text-violet"><Sparkles className="h-3 w-3" aria-hidden /> Replies in your voice</span>
          One for the comment, one for the review.
        </p>
      </>
    );
  if (id === "winback")
    return (
      <div className="grid grid-cols-2 gap-2">
        {[["Slipping away", 38], ["Lapsed", 54], ["Long gone", 71], ["Asked but never booked", 23]].map(([t, n], i) => (
          <div key={t} className={`rounded-rp-sm border p-2.5 ${i === 0 ? "border-grow bg-grow-soft" : "border-line bg-white"}`}>
            <p className="text-[11.5px] font-medium text-muted-ink">{t}</p>
            <p className="text-[20px] font-semibold tabular-nums leading-tight text-ink">{n}</p>
          </div>
        ))}
      </div>
    );
  if (id === "insights")
    return (
      <ul className="grid gap-2">
        {[["instagram", 92, "Working"], ["tiktok", 64, "Working"], ["facebook", 22, "Not working"]].map(([id2, v, verdict], i) => (
          <li key={id2 as string} className="flex items-center gap-2 text-[12px] text-ink">
            <ChannelLogo id={id2 as string} size={20} />
            <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white"><span className={`rp-mini-fill block h-full rounded-full ${verdict === "Working" ? "bg-grow" : "bg-amber"}`} style={{ width: `${v}%`, animationDelay: `${i * 0.2}s` }} /></span>
            <span className={`w-[5.2rem] text-right font-semibold ${verdict === "Working" ? "text-grow" : "text-amber"}`}>{verdict}</span>
          </li>
        ))}
        <li className="pt-1 text-[12.5px] leading-snug text-ink">Your next posts build on what worked.</li>
      </ul>
    );
  return (
    <>
      <p className="ml-auto w-fit max-w-[90%] rounded-rp-sm rounded-br-[4px] bg-violet px-3 py-2 text-[12.5px] text-white">Which day should I run an offer?</p>
      <p className="mt-2 w-fit max-w-[92%] rounded-rp-sm rounded-bl-[4px] border border-line bg-white px-3 py-2 text-[12.5px] leading-snug text-ink">Tuesday. It&apos;s your quietest day, with about six open slots.</p>
      <p className="mt-2 flex gap-1 pl-1" aria-hidden>{[0, 1, 2].map((i) => <span key={i} className="rp-dot h-1.5 w-1.5 rounded-full bg-muted-ink" style={{ "--i": i } as React.CSSProperties} />)}</p>
    </>
  );
}

export function GrowSection() {
  return (
    <Section fit>
      <Container>
        <SectionHeading eyebrow={GROW.eyebrow} area="grow" title={GROW.title} />
        <div className="mt-[clamp(1.25rem,4svh,2.25rem)] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GROW.tiles.map((t) => (
            <Link key={t.id} href={t.href} className="group flex flex-col rounded-rp-md border border-line bg-white p-4 shadow-rp-1 transition-[box-shadow,border-color,transform] duration-300 ease-rp hover:-translate-y-0.5 hover:border-grow/40 hover:shadow-rp-2">
              <span className="flex items-center gap-3">
                <IconTile icon={ICON[t.id]} area="grow" />
                <span className="text-h3 font-semibold text-ink">{t.name}</span>
              </span>
              <div className="mt-4 flex min-h-[150px] flex-col justify-center rounded-rp-sm bg-base p-3">
                <Mini id={t.id} />
              </div>
              <p className="mt-3 text-small text-muted-ink">{t.line}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-3 text-small font-semibold text-grow">
                See how it works <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
