import Link from "next/link";
import { PageHeader } from "@/components/site/ui/page-header";
import { LEGAL_LINKS } from "@/lib/site";
import { LegalToc } from "./legal-toc";

/**
 * One calm reading layout for the seven legal pages, with a contents list. The documents
 * themselves live in app/<legal>/page.tsx and are unchanged; they point to /contact
 * rather than naming a mailbox. Deliberately quiet: no motion, a readable measure.
 */
export function LegalPage({ title, updated, intro, summary, children }: { title: string; updated: string; intro?: string; summary?: string[]; children: React.ReactNode }) {
  const here = LEGAL_LINKS.find((l) => l.name === title) ?? { name: title, href: "#" };
  return (
    <>
      <PageHeader crumbs={[{ name: "Legal", href: LEGAL_LINKS[0].href }, { name: title, href: here.href }]} eyebrow="Legal" title={title} lede={`Last updated: ${updated}`} />
      <div className="mx-auto grid w-full max-w-[1240px] gap-8 px-4 pb-20 pt-4 sm:px-6 lg:grid-cols-[240px_minmax(0,680px)] lg:gap-14 lg:px-10">
        <LegalToc />
        <article>
          {intro ? <p className="mb-8 border-l-2 border-primary-line pl-5 text-body text-muted-ink">{intro}</p> : null}
          {summary?.length ? (
            <section aria-label="The short version" className="mb-10 rounded-rp-md border border-line bg-white p-5 shadow-rp-1">
              <p className="text-body font-semibold text-ink">The short version</p>
              <ul className="mt-3 flex flex-col gap-2">
                {summary.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[15px] leading-relaxed text-muted-ink"><span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />{x}</li>
                ))}
              </ul>
              <p className="mt-4 text-small text-muted-ink">This summary is for convenience. The full text below is what applies.</p>
            </section>
          ) : null}
          <div className="legal-prose">{children}</div>
          <nav aria-label="Legal documents" className="mt-14 border-t border-line pt-6">
            <p className="mb-3 text-small font-semibold text-ink">All legal documents</p>
            <ul className="flex flex-wrap gap-2">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-3.5 text-small text-ink transition-colors duration-200 hover:border-primary-line hover:bg-primary-soft">{l.name}</Link></li>
              ))}
            </ul>
          </nav>
        </article>
      </div>
    </>
  );
}
