import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Ask us anything about RingPost";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Ask us anything about RingPost", "Contact");
}
