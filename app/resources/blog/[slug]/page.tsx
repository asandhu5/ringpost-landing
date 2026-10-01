import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/site/blog-card";
import { Markdown } from "@/components/site/markdown";
import { Breadcrumbs, Container, JsonLd, Section } from "@/components/site/ui";
import { allPosts, formatDate, postBySlug } from "@/lib/blog";
import { COMPANY, SITE } from "@/lib/site";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { type: "article", title: post.title, description: post.description, url: `/resources/blog/${post.slug}`, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const more = allPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <article className="relative pb-16 pt-32 lg:pt-40">
        <div aria-hidden className="rp-grid rp-fade-mask pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
        <Container narrow className="relative">
          <Breadcrumbs
            items={[
              { name: "Resources", href: "/resources" },
              { name: "Blog", href: "/resources/blog" },
              { name: post.title, href: `/resources/blog/${post.slug}` },
            ]}
          />
          <p className="text-[14px] text-glow">
            <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,5.6vw,4.2rem)] leading-[1.02] tracking-[-0.015em] text-ink">{post.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-ink">{post.description}</p>
          <div className="rp-hairline my-10" />
          <div className="post-prose">
            <Markdown source={post.body} />
          </div>
          <p className="mt-12 text-[14px] text-faint">Written by the RingPost team.</p>
        </Container>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: `${SITE.url}/resources/blog/${post.slug}`,
          author: { "@type": "Organization", name: SITE.name, url: SITE.url },
          publisher: { "@type": "Organization", name: SITE.name, legalName: COMPANY.legalName, logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` } },
        }}
      />
      {more.length > 0 && (
        <Section tone="surface">
          <Container>
            <h2 className="mb-6 font-display text-3xl text-ink">Keep reading</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {more.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
