import { allPosts } from "@/lib/blog";
import { SITE } from "@/lib/site";

/** The blog as an RSS 2.0 feed, newest first, for feed readers and newsletter tools. */
export const dynamic = "force-static";

function xml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function GET() {
  const posts = allPosts();
  const items = posts
    .map((p) => {
      const url = `${SITE.url}/resources/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${xml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${xml(p.description)}</description>`,
        `      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(`${SITE.name} blog`)}</title>
    <link>${SITE.url}/resources/blog</link>
    <description>${xml("Practical guides for local businesses on answering every customer, bookings, reviews and social media.")}</description>
    <language>en</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
${posts.length ? `    <lastBuildDate>${new Date(`${posts[0].date}T12:00:00Z`).toUTCString()}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
