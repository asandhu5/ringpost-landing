import fs from "node:fs";
import path from "node:path";

/**
 * Blog posts are .mdx files in content/blog (brief §9.13: no CMS, no extra service).
 * They use the Markdown subset of MDX, rendered by components/site/markdown.tsx, so no
 * MDX compiler dependency is needed. Front matter: title, description, date (YYYY-MM-DD).
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  body: string;
  readingMinutes: number;
}

const DIR = path.join(process.cwd(), "content", "blog");

function parse(slug: string, raw: string): Post {
  const m = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(raw);
  if (!m) throw new Error(`content/blog/${slug}.mdx has no front matter`);
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line.trim());
    if (kv) meta[kv[1]] = kv[2].replace(/^"(.*)"$/, "$1");
  }
  for (const key of ["title", "description", "date"]) {
    if (!meta[key]) throw new Error(`content/blog/${slug}.mdx is missing "${key}"`);
  }
  const words = m[2].split(/\s+/).filter(Boolean).length;
  return { slug, title: meta.title, description: meta.description, date: meta.date, body: m[2].trim(), readingMinutes: Math.max(1, Math.round(words / 220)) };
}

export function allPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parse(f.replace(/\.mdx$/, ""), fs.readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
}

export function postBySlug(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
