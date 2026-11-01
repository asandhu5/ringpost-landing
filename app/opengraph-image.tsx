import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Never miss a customer again";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Never miss a customer again", "Your AI business partner");
}
