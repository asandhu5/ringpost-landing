import { Plus } from "lucide-react";

/** Questions and answers. Plain <details>, so they open without scripts and with the
 * keyboard; `structuredData` also tells search engines about them. */
export function Faq({ items, structuredData }: { items: { q: string; a: string }[]; structuredData?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-rp-md border border-line bg-white">
        {items.map((it) => (
          <details key={it.q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-3 text-body font-semibold text-ink transition-colors duration-200 hover:bg-base [&::-webkit-details-marker]:hidden">
              {it.q}
              <Plus className="h-5 w-5 shrink-0 text-violet transition-transform duration-200 group-open:rotate-45" strokeWidth={1.75} aria-hidden />
            </summary>
            <p className="px-5 pb-5 text-body text-muted-ink">{it.a}</p>
          </details>
        ))}
      </div>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })) }).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
