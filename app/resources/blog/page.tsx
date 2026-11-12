import type { Metadata } from "next";
import { BlogCard } from "@/components/site/blog-card";
import { PageHeader } from "@/components/site/ui/page-header";
import { Container, Section } from "@/components/site/ui/primitives";
import { allPosts } from "@/lib/blog";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Blog",
  description: "The RingPost blog: missed calls, messaging, cancellations, posting, and the rules an AI assistant should follow.",
  openGraph: { title: "RingPost blog", url: "/resources/blog" },
};

export default function BlogIndex() {
  const [first, ...rest] = allPosts();
  return (
    <>
      <PageHeader crumbs={[{ name: "Blog", href: ROUTES.blog }]} eyebrow="Blog" title="Ideas for busy local businesses." lede="Short, practical reads on calls, messages, bookings and posting." />
      <Section className="!pt-4">
        <Container>
          {first && <BlogCard post={first} featured />}
          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <li key={p.slug}><BlogCard post={p} /></li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
