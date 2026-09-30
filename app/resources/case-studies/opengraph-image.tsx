import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Case studies, once customers agree to be named";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage("Case studies, once customers agree to be named", "Case studies");
}
