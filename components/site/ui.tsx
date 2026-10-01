import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { SIGNUP_URL, SITE } from "@/lib/site";
import type { Turn } from "@/lib/content/industries";

/* ──────────────────────────────────────────────────────────────────
 *  The component kit. Pages are assembled from these, so spacing,
 *  type and colour stay consistent across ~90 routes.
 * ────────────────────────────────────────────────────────────────── */

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function Container({ children, className, narrow }: { children: React.ReactNode; className?: string; narrow?: boolean }) {
  return <div className={cx("mx-auto w-full px-4 sm:px-6 lg:px-10", narrow ? "max-w-[880px]" : "max-w-[1240px]", className)}>{children}</div>;
}

export function Section({
  children,
  id,
  className,
  tone = "base",
  bleed,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  tone?: "base" | "surface" | "grid";
  bleed?: boolean;
}) {
  return (
    <section
      id={id}
      className={cx(
        "relative",
        bleed ? "" : "py-20 sm:py-24 lg:py-28",
        tone === "surface" && "bg-surface/60 border-y border-line",
        className,
      )}
    >
      {tone === "grid" && <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0 opacity-70" />}
      <div className="relative">{children}</div>
    </section>
  );
}

/** A short context line above a heading, in plain sentence case. Used sparingly. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cx("mb-4 inline-flex items-center gap-2 text-[15px] font-medium text-glow", className)}>{children}</p>;
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cx("font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-ink", className)}>{children}</h2>;
}

export function Lede({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cx("max-w-2xl text-[1.075rem] leading-relaxed text-muted-ink sm:text-lg", className)}>{children}</p>;
}

export function SectionHeader({ eyebrow, title, lede, align = "left", className }: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cx("mb-12 lg:mb-16", align === "center" && "mx-auto flex max-w-3xl flex-col items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H2>{title}</H2>
      {lede && <Lede className={cx("mt-5", align === "center" && "mx-auto")}>{lede}</Lede>}
    </div>
  );
}

type ButtonVariant = "cta" | "primary" | "ghost" | "link";

export function ButtonLink({
  href,
  children,
  variant = "cta",
  className,
  arrow,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
}) {
  arrow = arrow ?? false;
  const external = /^https?:|^mailto:/.test(href);
  const styles: Record<ButtonVariant, string> = {
    cta: "bg-cta text-[#1a0d08] hover:bg-[var(--rp-cta-hover)] shadow-[0_10px_40px_-12px_rgba(255,122,89,0.7)]",
    primary: "bg-violet text-white hover:bg-glow hover:text-[#120f2a]",
    ghost: "border border-line-strong bg-white/[0.02] text-ink hover:border-glow/50 hover:bg-white/[0.05]",
    link: "px-0 text-glow hover:text-white",
  };
  const cls = cx(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-[15px] font-medium transition-all duration-200",
    variant !== "link" && "px-5 py-2.5",
    styles[variant],
    className,
  );
  const icon = arrow ? (
    href.startsWith("mailto:") ? (
      <ArrowUpRight aria-hidden className="h-4 w-4" />
    ) : (
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    )
  ) : null;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {icon}
    </Link>
  );
}

export function TrialButtons({ secondary = { href: "/call", label: "Talk to Zara" }, className }: { secondary?: { href: string; label: string } | null; className?: string }) {
  return (
    <div className={cx("flex flex-wrap items-center gap-3", className)}>
      <ButtonLink href={SIGNUP_URL}>Start free trial</ButtonLink>
      {secondary && (
        <ButtonLink href={secondary.href} variant="ghost">
          {secondary.label}
        </ButtonLink>
      )}
    </div>
  );
}

/* ── Structured data ────────────────────────────────────────────── */

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export interface Crumb {
  name: string;
  href: string;
}

/** The visible breadcrumb and its BreadcrumbList, from the same array. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cx("mb-8", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-faint">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-muted-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })),
        }}
      />
    </>
  );
}

/* ── Page hero ──────────────────────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  aside,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  crumbs?: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36 lg:pb-24 lg:pt-44">
      <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
      <Container className="relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className={cx(aside ? "grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]" : "")}>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.2rem)] leading-[0.98] tracking-[-0.02em] text-ink">{title}</h1>
            {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-ink">{lede}</p>}
            {children && <div className="mt-9">{children}</div>}
          </div>
          {aside}
        </div>
      </Container>
    </section>
  );
}

/* ── Cards and grids ────────────────────────────────────────────── */

export function Card({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const cls = cx("rp-card relative rounded-2xl p-6 sm:p-7", href && "rp-card-hover block", className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}

export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: { title: string; body: string; href?: string; icon?: React.ReactNode; tag?: string }[];
  columns?: 2 | 3 | 4;
}) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <div className={cx("grid gap-4", cols)}>
      {items.map((item) => (
        <Card key={item.title} href={item.href} className="flex flex-col">
          {item.icon && <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong bg-violet/10 text-glow">{item.icon}</div>}
          {item.tag && <span className="mb-3 text-[12px] font-medium text-faint">{item.tag}</span>}
          <h3 className="text-[1.08rem] font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{item.body}</p>
          {item.href && (
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-glow">
              Learn more <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </span>
          )}
        </Card>
      ))}
    </div>
  );
}

export function StepFlow({ steps }: { steps: { step: string; title: string; body: string }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.step} className="relative bg-base p-7">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-glow/40 bg-violet/10 text-[13px] font-semibold text-glow">{s.step}</span>
          <h3 className="mt-6 text-lg font-semibold text-ink">{s.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-ink">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Facts, never results: every value must be countable in the code. */
export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-base px-5 py-6">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span className="block font-display text-4xl text-ink">{s.value}</span>
            <span className="mt-1 block text-[13px] leading-snug text-muted-ink">{s.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Pill({ children, tone = "violet" }: { children: React.ReactNode; tone?: "violet" | "green" | "muted" | "coral" }) {
  const tones = {
    violet: "border-violet/30 bg-violet/10 text-glow",
    green: "border-success/30 bg-success/10 text-success",
    muted: "border-line-strong bg-white/[0.03] text-muted-ink",
    coral: "border-cta/30 bg-cta/10 text-cta",
  };
  return <span className={cx("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium", tones[tone])}>{children}</span>;
}

/* ── FAQ ────────────────────────────────────────────────────────── */

export function FaqList({ items, structuredData = false }: { items: { q: string; a: string; link?: { href: string; label: string } }[]; structuredData?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {items.map((item) => (
          <details key={item.q} className="group bg-base open:bg-surface/50">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-left text-[1.02rem] font-medium text-ink sm:px-7 [&::-webkit-details-marker]:hidden">
              {item.q}
              <span aria-hidden className="relative h-4 w-4 shrink-0 text-glow">
                <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <div className="px-5 pb-6 text-[15.5px] leading-relaxed text-muted-ink sm:px-7">
              <p>{item.a}</p>
              {item.link && (
                <Link href={item.link.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-glow hover:text-white">
                  {item.link.label} <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </details>
        ))}
      </div>
      {structuredData && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
          }}
        />
      )}
    </>
  );
}

/* ── CTA band ───────────────────────────────────────────────────── */

export function CtaBand({ title = "Let it answer the next call.", lede, secondary }: { title?: string; lede?: string; secondary?: { href: string; label: string } | null }) {
  return (
    <Section className="pb-24 pt-8 sm:pb-28">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-surface px-6 py-14 sm:px-12 sm:py-16">
          <div aria-hidden className="rp-grid pointer-events-none absolute inset-0 opacity-50" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-violet/30 blur-[90px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-cta/20 blur-[100px]" />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[1] tracking-[-0.015em] text-ink">{title}</h2>
              {lede && <p className="mt-4 text-lg text-muted-ink">{lede}</p>}
            </div>
            <TrialButtons secondary={secondary === undefined ? { href: "/call", label: "Talk to Zara" } : secondary} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── On this page (sticky in-page navigation) ───────────────────── */

export function OnThisPage({ name, links }: { name: string; links: { href: string; label: string }[] }) {
  return (
    <div className="sticky top-16 z-30 border-y border-line bg-base/85 backdrop-blur-xl lg:top-[72px]">
      <Container className="flex h-14 items-center gap-6">
        <span className="hidden shrink-0 text-[14px] font-semibold text-ink sm:block">{name}</span>
        <nav aria-label="On this page" className="rp-no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="whitespace-nowrap rounded-full px-3 py-1.5 text-[13.5px] text-muted-ink transition-colors hover:bg-white/[0.05] hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={SIGNUP_URL} className="hidden shrink-0 rounded-full bg-cta px-4 py-1.5 text-[13.5px] font-medium text-[#1a0d08] hover:bg-[var(--rp-cta-hover)] md:block">
          Start free trial
        </a>
      </Container>
    </div>
  );
}

/* ── Next steps (the lighter ending for inner pages) ───────────── */



/* ── Screenshot frame ───────────────────────────────────────────── */

/**
 * A real dashboard screenshot in a quiet browser frame. Renders nothing when the file
 * isn't in /public, so a page never shows a broken image or a stand-in.
 */
export function screenshotExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

export function ScreenshotFrame({ src, alt, caption, className }: { src: string; alt: string; caption?: string; className?: string }) {
  if (!screenshotExists(src)) return null;
  return (
    <figure className={cx("relative", className)}>
      <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-[32px] bg-violet/15 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-1.5 border-b border-line bg-base/70 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-faint">app.ringpost.tech</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-3 text-center text-[12.5px] text-faint">{caption}</figcaption>}
    </figure>
  );
}

/* ── Conversation ───────────────────────────────────────────────── */

export function Conversation({ turns, label }: { turns: Turn[]; label?: string }) {
  return (
    <figure className="rp-card overflow-hidden rounded-2xl">
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ringpost-ping absolute inline-flex h-full w-full rounded-full bg-success" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
        </span>
        <span className="text-[12px] font-medium text-muted-ink">Front desk</span>
      </div>
      <div className="flex flex-col gap-3 p-5">
        {turns.map((t, i) =>
          t.from === "note" ? (
            <p key={i} className="flex items-center gap-2 py-0.5 text-[12px] font-medium text-glow/80">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-glow" />
              {t.text}
            </p>
          ) : (
            <div key={i} className={cx("flex", t.from === "ai" ? "justify-end" : "justify-start")}>
              <p
                className={cx(
                  "max-w-[86%] rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed",
                  t.from === "ai" ? "rounded-br-md bg-violet text-white" : "rounded-bl-md border border-line-strong bg-white/[0.05] text-ink",
                )}
              >
                <span className={cx("mb-0.5 block text-[11px] font-medium", t.from === "ai" ? "text-white/60" : "text-faint")}>
                  {t.from === "ai" ? "RingPost" : "Customer"}
                </span>
                {t.text}
              </p>
            </div>
          ),
        )}
      </div>
      {label && <figcaption className="border-t border-line px-5 py-3 text-[12px] text-faint">{label}</figcaption>}
    </figure>
  );
}
