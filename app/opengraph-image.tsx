import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Your front desk, always answering";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Your front desk, always answering", "The AI front desk");
}
