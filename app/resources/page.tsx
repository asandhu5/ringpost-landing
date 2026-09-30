import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/site/blog-card";
import { Container, CtaBand, PageHero, Section } from "@/components/site/ui";
import { allPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources",
  description: "Writing from RingPost on missed calls, why customers message, late-night cancellations and what an AI front desk should never say.",
  openGraph: { title: "RingPost resources", url: "/resources" },
};

export default function ResourcesPage() {
  const posts = allPosts();
  return (
    <>
      <PageHero eyebrow="Resources" title="Notes from the front desk." lede="What we've learned building an AI front desk for local businesses, written plainly." />
      <Section className="!pt-0">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-3xl text-ink">From the blog</h2>
            <Link href="/resources/blog" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-glow hover:text-white">
              All posts <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link href="/resources/case-studies" className="rp-card rp-card-hover rounded-3xl p-7">
              <p className="font-display text-2xl text-ink">Case studies</p>
              <p className="mt-2 text-[15px] text-muted-ink">Published once real customers agree to be named.</p>
            </Link>
            <Link href="/faq" className="rp-card rp-card-hover rounded-3xl p-7">
              <p className="font-display text-2xl text-ink">FAQ</p>
              <p className="mt-2 text-[15px] text-muted-ink">Pricing, the trial, channels and your data.</p>
            </Link>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
