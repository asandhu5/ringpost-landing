import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Terms of Service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Terms of Service", "Legal");
}
