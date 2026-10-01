import type { Metadata } from "next";
import { BlogCard } from "@/components/site/blog-card";
import { Container, PageHero, Section } from "@/components/site/ui";
import { allPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "The RingPost blog: missed calls, messaging, cancellations, and the rules an AI front desk should follow.",
  openGraph: { title: "RingPost blog", url: "/resources/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <PageHero eyebrow="Blog" title="The RingPost blog" crumbs={[{ name: "Resources", href: "/resources" }, { name: "Blog", href: "/resources/blog" }]} />
      <Section className="!pt-0">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {allPosts().map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
