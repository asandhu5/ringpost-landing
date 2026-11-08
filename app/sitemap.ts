import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog";
import { SOMETHING_ELSE, TYPES, isSparse, slugFor } from "@/lib/content/industries";
import { PRODUCTS } from "@/lib/content/products";
import { CHANNEL_PAGES } from "@/lib/content/channel-pages";
import { GROUP_INFO } from "@/lib/content/groups";
import { LEGAL_LINKS, SITE } from "@/lib/site";

/**
 * Every indexable page, on the host the site actually serves (www). Industry pages
 * marked noindex (a trade whose spec has nothing of its own yet) are left out, so the
 * sitemap never lists a page that asks not to be indexed.
 */
/** When the pages below last changed meaningfully. */
const UPDATED = "2026-11-08";

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly", lastModified?: string) => ({
    url: `${SITE.url}${path}`,
    priority,
    changeFrequency,
    ...(lastModified ? { lastModified } : {}),
  });
  return [
    entry("", 1, "weekly", UPDATED),
    entry("/product", 0.9, "monthly"),
    ...PRODUCTS.filter((p) => !p.page).map((p) => entry(`/product/${p.slug}`, 0.8, "monthly", ["reviews", "winback", "insights", "advisor"].includes(p.slug) ? UPDATED : undefined)),
    entry("/content-studio", 0.9, "monthly", UPDATED),
    entry("/grow", 0.9, "monthly", UPDATED),
    entry("/posting", 0.9, "monthly", UPDATED),
    ...CHANNEL_PAGES.map((p) => entry(`/channels/${p.id}`, 0.8)),
    entry("/channels", 0.8),
    entry("/pricing", 0.9, "weekly"),
    entry("/faq", 0.7, "monthly", UPDATED),
    entry("/industries", 0.8),
    ...GROUP_INFO.map((g) => entry(`/industries/${g.slug}`, 0.7)),
    ...TYPES.filter((t) => !isSparse(t)).map((t) => entry(`/industries/${slugFor(t)}`, 0.6)),
    entry(`/industries/${SOMETHING_ELSE.slug}`, 0.5),
    entry("/resources", 0.5),
    entry("/resources/blog", 0.6, "weekly"),
    ...allPosts().map((p) => entry(`/resources/blog/${p.slug}`, 0.6, "yearly", p.date)),
    entry("/about", 0.5, "monthly", UPDATED),
    entry("/contact", 0.6, "monthly", UPDATED),
    ...LEGAL_LINKS.map((l) => entry(l.href, 0.3, "yearly", UPDATED)),
  ];
}
