import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "The front desk small businesses never had time to staff";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("The front desk small businesses never had time to staff", "About");
}
