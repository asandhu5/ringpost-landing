import { OG_SIZE, ogImage } from "@/lib/og";
import { SOMETHING_ELSE, pluralFor, typeBySlug } from "@/lib/content/industries";
import { TYPES, slugFor } from "@/lib/content/industries";

export function generateStaticParams() {
  return [...TYPES.map((t) => ({ slug: slugFor(t) })), { slug: SOMETHING_ELSE.slug }];
}

export const alt = "RingPost";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = typeBySlug(slug);
  if (slug === SOMETHING_ELSE.slug) return ogImage("An AI receptionist for any local business", "Industries");
  return ogImage(t ? `AI receptionist for ${pluralFor(t)}` : "RingPost", t?.group ?? "Industries");
}
