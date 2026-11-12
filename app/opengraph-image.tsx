import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "One AI partner. Your whole business.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("One AI partner. Your whole business.", "Your AI business partner");
}
