import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/landing/footer-section";
import { SITE } from "@/lib/site";

/**
 * Shared chrome for the three legal pages (Terms / Privacy / Refunds).
 *
 * Deliberately quieter than the marketing sections: no aurora, no custom
 * cursor, no scroll-triggered motion. These are documents someone reads
 * when they're deciding whether to trust you with their customers' data —
 * legibility beats atmosphere. The nav is a plain "back" link rather than
 * the full floating header, so there's one obvious way out and no
 * scroll-spy fighting a page with no sections to spy on.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-background">
      {/* Simple header */}
      <header className="border-b border-foreground/10">
        <div className="mx-auto flex max-w-[880px] items-center justify-between px-6 py-6 lg:px-0">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-2xl tracking-tight text-foreground">
              {SITE.name}
            </span>
            <span className="mt-1 font-mono text-xs text-muted-foreground">
              &trade;
            </span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to site
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-[880px] px-6 py-16 lg:px-0 lg:py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--brand-pink)]">
          Legal
        </p>

        <h1 className="mb-4 font-display text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>

        <p className="mb-12 font-mono text-sm text-muted-foreground">
          Last updated: {updated}
        </p>

        {intro ? (
          <p className="mb-12 border-l-2 border-[var(--brand-pink)]/40 pl-6 text-lg leading-relaxed text-muted-foreground">
            {intro}
          </p>
        ) : null}

        {/* `legal-prose` styles the long-form content — see globals.css */}
        <div className="legal-prose">{children}</div>
      </article>

      <FooterSection />
    </main>
  );
}
