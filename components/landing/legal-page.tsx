import Link from "next/link";
import { Container } from "@/components/site/ui";
import { LEGAL_LINKS } from "@/lib/site";

/**
 * The layout for the seven legal pages. Their wording is published exactly as reviewed
 * (brief §9.0: "port them unchanged"), so the page files in app/<legal>/page.tsx are not
 * edited; only this shared chrome changed to the new site shell. The site header and
 * footer now come from the root layout, and every legal page is one click from the
 * footer on every page.
 *
 * Deliberately quieter than the marketing pages: no motion, a readable measure. These
 * are documents someone reads when deciding whether to trust you with their customers.
 */
export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro?: string; children: React.ReactNode }) {
  return (
    <div className="relative pb-24 pt-32 lg:pt-40">
      <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <Container narrow className="relative">
        <article>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-glow">Legal</p>
          <h1 className="mb-4 font-display text-[clamp(2.4rem,5vw,3.6rem)] leading-[1.05] tracking-tight text-ink">{title}</h1>
          <p className="mb-12 font-mono text-sm text-muted-ink">Last updated: {updated}</p>
          {intro ? <p className="mb-12 border-l-2 border-violet/50 pl-6 text-lg leading-relaxed text-muted-ink">{intro}</p> : null}
          <div className="legal-prose">{children}</div>
        </article>
        <nav aria-label="Legal documents" className="mt-16 border-t border-line pt-8">
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">All legal documents</p>
          <ul className="flex flex-wrap gap-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-4 text-[13.5px] text-muted-ink hover:border-glow/50 hover:text-ink">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
}
