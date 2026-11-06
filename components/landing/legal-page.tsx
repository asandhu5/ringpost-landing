import Link from "next/link";
import { Container } from "@/components/site/ui";
import { LEGAL_LINKS } from "@/lib/site";

/**
 * The layout for the seven legal pages. The documents themselves live in
 * app/<legal>/page.tsx; they point to /contact rather than naming a mailbox, and name no
 * providers beyond one line each for Meta and Google.
 *
 * Deliberately quieter than the marketing pages: no motion, a readable measure.
 */
export function LegalPage({ title, updated, intro, summary, children }: { title: string; updated: string; intro?: string; summary?: string[]; children: React.ReactNode }) {
  return (
    <div className="relative pb-24 pt-28 lg:pt-36">
      <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <Container narrow className="relative">
        <article>
          <p className="mb-4 text-[15px] font-medium text-glow">Legal</p>
          <h1 className="mb-4 font-display text-[clamp(2.2rem,4vw,3.2rem)] leading-[1.05] tracking-tight text-ink">{title}</h1>
          <p className="mb-12 text-sm text-muted-ink">Last updated: {updated}</p>
          {intro ? <p className="mb-10 border-l-2 border-violet/50 pl-6 text-lg leading-relaxed text-muted-ink">{intro}</p> : null}
          {summary?.length ? (
            <section aria-label="The short version" className="mb-12 rounded-2xl border border-line-strong bg-white p-6 shadow-[0_18px_40px_-30px_rgba(11,27,43,0.45)]">
              <p className="text-[15px] font-semibold text-ink">The short version</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {summary.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[15px] leading-relaxed text-muted-ink"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-glow" />{x}</li>
                ))}
              </ul>
              <p className="mt-4 text-[13px] text-muted-ink">This summary is for convenience. The full text below is what applies.</p>
            </section>
          ) : null}
          <div className="legal-prose">{children}</div>
        </article>
        <nav aria-label="Legal documents" className="mt-16 border-t border-line pt-8">
          <p className="mb-3 text-[14px] font-medium text-muted-ink">All legal documents</p>
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
