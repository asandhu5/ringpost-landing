import { OG_SIZE, ogImage } from "@/lib/og";
import { productBySlug } from "@/lib/content/products";
import { PRODUCTS } from "@/lib/content/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export const alt = "RingPost";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = productBySlug(slug);
  return ogImage(p?.hero.headline ?? "RingPost", p ? `Product · ${p.name}` : "Product");
}
