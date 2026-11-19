import { ArrowLeftRight, Check } from "lucide-react";
import { LogoMark } from "@/components/site/logo";
import { Container, Section, SectionHeader } from "@/components/site/ui";

/** A calendar page with the day on it, in each provider's own colour. */
function CalendarTile({ color, label }: { color: string; label: string }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 flex-col overflow-hidden rounded-xl bg-white shadow-[0_6px_16px_-10px_rgba(11,27,43,0.45)] ring-1 ring-line" aria-hidden="true">
      <span className="h-3.5 w-full" style={{ background: color }} />
      <span className="flex flex-1 items-center justify-center text-[15px] font-bold" style={{ color }}>
        {label}
      </span>
    </span>
  );
}

const SIDES = [
  {
    name: "Google Calendar",
    color: "#1A73E8",
    tile: "31",
    lines: ["RingPost bookings appear in your Google Calendar", "Anything you add in Google blocks that time", "Moves and cancellations update both"],
  },
  {
    name: "Calendly",
    color: "#006BFF",
    tile: "C",
    lines: ["Your AI books into your Calendly event types", "Bookings made on your Calendly page arrive in RingPost", "Cancel on either side and the time frees up"],
  },
];

/** Bookings page: RingPost works with the calendar the business already uses. */
export function CalendarSync() {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Your calendar"
          title="Works with the calendar you already use."
          lede="Connect Google Calendar or Calendly and every booking stays in step, both ways. Choose one; switch any time."
        />
        <div className="relative mx-auto grid max-w-[980px] items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <SideCard {...SIDES[0]!} />
          <div className="flex items-center justify-center md:flex-col md:gap-3" aria-hidden="true">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-[0_10px_30px_-14px_rgba(91,78,230,0.6)] ring-1 ring-line">
              <LogoMark className="h-8 w-8" />
            </span>
            <span className="ml-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-ink ring-1 ring-line md:ml-0">
              <ArrowLeftRight className="h-3.5 w-3.5 text-violet" />
              Both ways
            </span>
          </div>
          <SideCard {...SIDES[1]!} />
        </div>
        <p className="mx-auto mt-6 max-w-[640px] text-center text-small text-muted-ink">
          With Calendly, your AI asks customers for their email before booking, or sends them a one-time link to pick the time themselves.
        </p>
      </Container>
    </Section>
  );
}

function SideCard({ name, color, tile, lines }: (typeof SIDES)[number]) {
  return (
    <div className="flex flex-col gap-4 rounded-rp-md border border-line bg-white p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <CalendarTile color={color} label={tile} />
        <p className="text-[17px] font-semibold text-ink">{name}</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {lines.map((l) => (
          <li key={l} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}14`, color }}>
              <Check className="h-3.5 w-3.5" />
            </span>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
