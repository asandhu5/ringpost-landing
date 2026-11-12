import { cx } from "./cx";

/** Product areas, each with its own accent (tokens in globals.css). */
export type Area = "answer" | "create" | "grow" | "brand";

export const AREA_TONE: Record<Area, { text: string; soft: string }> = {
  brand: { text: "text-violet", soft: "bg-primary-soft" },
  answer: { text: "text-answer", soft: "bg-answer-soft" },
  create: { text: "text-create", soft: "bg-create-soft" },
  grow: { text: "text-grow", soft: "bg-grow-soft" },
};

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** A page section on the shared vertical rhythm. `fit` sections are sized to sit inside
 * one screen on a laptop: less padding, and the content inside is height-aware. */
export function Section({ children, id, className, tone = "base", fit }: { children: React.ReactNode; id?: string; className?: string; tone?: "base" | "white"; fit?: boolean }) {
  return (
    <section id={id} className={cx("relative scroll-mt-[var(--header-h)]", fit ? "py-[clamp(1.5rem,4.2svh,4.5rem)]" : "py-[var(--section-y)]", tone === "white" && "border-y border-line bg-white", className)}>
      {children}
    </section>
  );
}

/** The small label above a headline. */
export function Eyebrow({ children, area = "brand", className }: { children: React.ReactNode; area?: Area; className?: string }) {
  return <p className={cx("text-small font-semibold", AREA_TONE[area].text, className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  area = "brand",
  align = "left",
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  area?: Area;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cx(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      {eyebrow && <Eyebrow area={area}>{eyebrow}</Eyebrow>}
      <Tag className={cx("font-display text-ink", Tag === "h1" ? "text-h1" : "text-h2", eyebrow && "mt-2.5")}>{title}</Tag>
      {lede && <p className={cx("mt-4 text-body text-muted-ink", align === "center" && "mx-auto max-w-xl")}>{lede}</p>}
    </div>
  );
}

/** A lucide icon in its 40-px tinted rounded square. */
export function IconTile({ icon: Icon, area = "brand", size = 40, className }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; area?: Area; size?: 32 | 40; className?: string }) {
  return (
    <span className={cx("flex shrink-0 items-center justify-center rounded-rp-sm", size === 40 ? "h-10 w-10" : "h-8 w-8", AREA_TONE[area].soft, AREA_TONE[area].text, className)}>
      <Icon className={size === 40 ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.75} aria-hidden />
    </span>
  );
}

/** A small status label: "Booked", "Needs you", "AI is answering". */
export function Chip({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: "neutral" | "success" | "brand" | "amber"; className?: string }) {
  const tones = {
    neutral: "bg-surface-2 text-muted-ink",
    success: "bg-grow-soft text-grow",
    brand: "bg-primary-soft text-violet",
    amber: "bg-amber-soft text-amber",
  };
  return <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[12.5px] font-semibold leading-none", tones[tone], className)}>{children}</span>;
}

/** The standard white card. */
export function Card({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  return <Tag className={cx("rounded-rp-md border border-line bg-white shadow-rp-1", className)}>{children}</Tag>;
}
