import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/lib/site";

/** The top of an inner page: breadcrumb, small label, headline and one sentence. */
export function PageHeader({ crumbs, eyebrow, title, lede, children, aside }: { crumbs: { name: string; href: string }[]; eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; children?: React.ReactNode; aside?: React.ReactNode }) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+clamp(0.75rem,3svh,2rem))]">
      <div aria-hidden className="rp-hero-wash pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1240px] px-4 pb-[clamp(1.25rem,4svh,2.5rem)] sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-small text-muted-ink">
            {all.map((c, i) => (
              <li key={c.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {i === all.length - 1 ? <span aria-current="page" className="font-medium text-ink">{c.name}</span> : <Link href={c.href} className="hover:text-ink">{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE.url}${c.href === "/" ? "" : c.href}` })) }) }} />
        <div className="mt-[clamp(0.75rem,2.5svh,1.75rem)] flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div>
            {eyebrow && <p className="text-small font-semibold text-violet">{eyebrow}</p>}
            <h1 className={`${eyebrow ? "mt-2" : ""} max-w-[22ch] font-display text-h1 text-ink`}>{title}</h1>
            {lede && <p className="mt-3 max-w-[38rem] text-body text-muted-ink">{lede}</p>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
