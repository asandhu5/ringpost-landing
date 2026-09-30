import { OG_SIZE, ogImage } from "@/lib/og";
import { postBySlug } from "@/lib/blog";
import { allPosts } from "@/lib/blog";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export const alt = "RingPost";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  return ogImage(post?.title ?? "RingPost blog", "Blog");
}
