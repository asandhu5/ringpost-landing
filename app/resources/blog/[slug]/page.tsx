import type { Metadata } from "next";
import { seoDescription } from "@/lib/seo";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/site/blog-card";
import { Markdown } from "@/components/site/markdown";
import { JsonLd } from "@/components/site/ui";
import { PageHeader } from "@/components/site/ui/page-header";
import { Container, Section } from "@/components/site/ui/primitives";
import { ROUTES } from "@/lib/routes";
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
    // Long titles drop the " · RingPost" suffix so search results show them whole.
    title: post.title.length > 58 ? { absolute: post.title } : post.title,
    description: seoDescription(post.description),
    openGraph: { type: "article", title: post.title, description: seoDescription(post.description), url: `/resources/blog/${post.slug}`, publishedTime: post.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const more = allPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <PageHeader crumbs={[{ name: "Blog", href: ROUTES.blog }, { name: post.title, href: `/resources/blog/${post.slug}` }]} title={post.title} lede={post.description}>
        <p className="mt-3 text-small text-muted-ink">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read · Written by the RingPost team
        </p>
      </PageHeader>
      <article className="mx-auto w-full max-w-[1240px] px-4 pb-14 pt-4 sm:px-6 lg:px-10">
        <div className="post-prose">
          <Markdown source={post.body} />
        </div>
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
        <Section tone="white">
          <Container>
            <h2 className="mb-6 font-display text-h2 text-ink">Keep reading</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}><BlogCard post={p} /></li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
