import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "The RingPost blog";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("The RingPost blog", "Blog");
}
