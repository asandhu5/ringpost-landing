import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "An AI receptionist that knows your trade";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("An AI receptionist that knows your trade", "Industries");
}
