"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

export interface FaqGroup {
  name: string;
  items: { q: string; a: string }[];
}

/** Every question, grouped, with a search box that narrows them as you type. Without
 * scripts the full list shows and each answer still opens. */
export function FaqSearch({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => (q ? groups.map((g) => ({ ...g, items: g.items.filter((i) => `${i.q} ${i.a}`.toLowerCase().includes(q)) })).filter((g) => g.items.length) : groups), [q, groups]);
  const count = shown.reduce((n, g) => n + g.items.length, 0);
  return (
    <div>
      <label className="relative block max-w-[34rem]">
        <span className="sr-only">Search the questions</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-ink" strokeWidth={1.75} aria-hidden />
        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search: number, WhatsApp, cancel…" className="h-12 w-full rounded-full border border-line-strong bg-white pl-12 pr-5 text-body text-ink shadow-rp-1 placeholder:text-muted-ink" />
      </label>
      <nav aria-label="Topics" className="mt-4 flex flex-wrap gap-2">
        {groups.map((g) => (
          <a key={g.name} href={`#${slug(g.name)}`} className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-3.5 text-small font-medium text-ink transition-colors duration-200 hover:border-primary-line hover:bg-primary-soft">{g.name}</a>
        ))}
      </nav>
      <p className="mt-4 text-small text-muted-ink" aria-live="polite">{q ? (count ? `${count} ${count === 1 ? "answer" : "answers"} for “${query.trim()}”` : `Nothing for “${query.trim()}”. Try another word, or ask in the chat in the corner.`) : `${count} questions`}</p>
      <div className="mt-6 space-y-10">
        {shown.map((g) => (
          <section key={g.name} id={slug(g.name)} className="scroll-mt-24">
            <h2 className="font-display text-h2 text-ink">{g.name}</h2>
            <div className="mt-4 divide-y divide-line overflow-hidden rounded-rp-md border border-line bg-white">
              {g.items.map((it) => (
                <details key={it.q} className="group" open={q ? true : undefined}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-3 text-body font-semibold text-ink transition-colors duration-200 hover:bg-base [&::-webkit-details-marker]:hidden">
                    {it.q}
                    <Plus className="h-5 w-5 shrink-0 text-violet transition-transform duration-200 group-open:rotate-45" strokeWidth={1.75} aria-hidden />
                  </summary>
                  <p className="px-5 pb-5 text-body text-muted-ink">{it.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
