"use client";

import { useEffect, useState } from "react";

/** The contents list for a legal page, built from its own headings. */
export function LegalToc() {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);
  useEffect(() => {
    const hs = Array.from(document.querySelectorAll<HTMLElement>(".legal-prose h2"));
    setItems(
      hs.map((h, i) => {
        if (!h.id) h.id = `section-${i + 1}`;
        h.style.scrollMarginTop = "88px";
        return { id: h.id, text: h.textContent ?? "" };
      }),
    );
  }, []);
  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="rounded-rp-md border border-line bg-white p-4 shadow-rp-1 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:max-h-[calc(100svh-var(--header-h)-48px)] lg:overflow-y-auto">
      <p className="text-small font-semibold text-ink">On this page</p>
      <ol className="mt-2 space-y-0.5">
        {items.map((it) => (
          <li key={it.id}><a href={`#${it.id}`} className="block rounded-rp-sm px-2 py-1.5 text-[13.5px] leading-snug text-muted-ink transition-colors duration-200 hover:bg-surface-2 hover:text-ink">{it.text}</a></li>
        ))}
      </ol>
    </nav>
  );
}
