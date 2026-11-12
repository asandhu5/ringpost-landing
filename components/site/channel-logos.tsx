import { BRAND_PATHS } from "@/components/site/brand-icons";

/**
 * Each channel's own mark, in its own colors: WhatsApp green, the Instagram gradient,
 * the Messenger gradient. Phone, text and email have no single brand, so they get the
 * colors a phone's own apps use. Drawn inline so nothing loads from another site. The
 * networks use their official marks (brand-icons.ts, from Simple Icons); phone, text,
 * email and LinkedIn are drawn here.
 */

type ChannelId = "phone" | "sms" | "whatsapp" | "instagram" | "messenger" | "email" | "facebook" | "tiktok" | "youtube" | "x" | "linkedin" | "threads" | "pinterest" | "bluesky" | "google_business_profile";

const BACKGROUND: Record<ChannelId, string> = {
  phone: "linear-gradient(180deg, #5ef08a, #1fbf4f)",
  sms: "linear-gradient(180deg, #6ee36b, #23b33a)",
  whatsapp: "#25d366",
  instagram: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
  messenger: "radial-gradient(circle at 20% 100%, #ff6968 0%, #a334fa 45%, #0695ff 85%)",
  email: "linear-gradient(180deg, #4fa3ff, #1a6ff0)",
  facebook: "#1877f2",
  // The networks RingPost publishes to.
  tiktok: "#000000",
  youtube: "#ff0000",
  x: "#000000",
  linkedin: "#0a66c2",
  threads: "#000000",
  pinterest: "#e60023",
  bluesky: "#1185fe",
  google_business_profile: "#ffffff",
};

function Glyph({ id }: { id: ChannelId }) {
  const brand = BRAND_PATHS[id];
  if (brand) return <path fill="#fff" d={brand} />;
  switch (id) {
    case "phone":
      return <path fill="#fff" d="M7.1 3.6c.5-.4 1.3-.3 1.7.3l1.9 2.6c.4.5.3 1.3-.1 1.7l-1.2 1.2c.9 1.9 2.4 3.4 4.3 4.3l1.2-1.2c.4-.4 1.2-.5 1.7-.1l2.6 1.9c.6.4.7 1.2.3 1.7l-1.1 1.6c-.6.9-1.7 1.3-2.8 1-5.1-1.4-9.1-5.4-10.5-10.5-.3-1.1.1-2.2 1-2.8l1-.7Z" />;
    case "sms":
      return <path fill="#fff" d="M12 4.5c-4.7 0-8.5 3-8.5 6.8 0 2.2 1.3 4.2 3.3 5.4-.2 1-.7 2-1.5 2.8 1.6 0 3.1-.6 4.2-1.5.8.2 1.6.2 2.5.2 4.7 0 8.5-3 8.5-6.9S16.7 4.5 12 4.5Z" />;
    case "whatsapp":
      return (
        <>
          <path fill="#fff" d="M12 3.6a8.3 8.3 0 0 0-7.2 12.5L3.7 20.4l4.4-1.1A8.3 8.3 0 1 0 12 3.6Zm0 15.1c-1.3 0-2.6-.4-3.7-1l-.3-.2-2.6.7.7-2.5-.2-.3A6.9 6.9 0 1 1 12 18.7Z" />
          <path fill="#fff" d="M15.8 13.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.2-1.2-1.4-.1-.2 0-.3.1-.4l.3-.4.2-.3v-.3l-.6-1.5c-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.4 3.9 3.4 1.9.8 2.3.6 2.7.6.4 0 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2Z" />
        </>
      );
    case "instagram":
      return (
        <>
          <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="16.2" cy="7.8" r="1" fill="#fff" />
        </>
      );
    case "messenger":
      return (
        <>
          <path fill="#fff" d="M12 3.8c-4.6 0-8.2 3.4-8.2 7.9 0 2.4 1 4.4 2.6 5.8v2.7l2.5-1.4c.9.3 2 .4 3.1.4 4.6 0 8.2-3.4 8.2-7.9S16.6 3.8 12 3.8Z" />
          <path fill="#7b3df5" d="m7.3 13.9 2.6-4.1c.4-.7 1.3-.8 1.9-.4l2 1.5c.2.1.4.1.6 0l2.8-2.1c.4-.3.9.2.6.6l-2.6 4.1c-.4.7-1.3.8-1.9.4l-2-1.5a.5.5 0 0 0-.6 0l-2.8 2.1c-.4.3-.9-.2-.6-.6Z" />
        </>
      );
    case "facebook":
      return <path fill="#fff" d="M13.4 20.5v-6.9h2.3l.4-2.7h-2.7V9.2c0-.8.2-1.3 1.3-1.3h1.4V5.5c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v1.9H8.2v2.7h2.3v6.9h2.9Z" />;
    case "tiktok":
      return <path fill="#fff" d="M14.5 4h2.3c.2 1.6 1.3 2.8 2.9 3v2.3c-1.1 0-2.1-.3-2.9-.9v5.3a4.6 4.6 0 1 1-4.6-4.6h.3v2.4h-.3a2.2 2.2 0 1 0 2.3 2.2V4Z" />;
    case "youtube":
      return <path fill="#fff" d="M9.6 8.2v7.6l6.4-3.8-6.4-3.8Z" />;
    case "x":
      return (
        <>
          <path fill="#fff" d="M5.5 5h3.6l9.4 14h-3.6L5.5 5Z" />
          <path d="M18 5.2 6.2 18.8" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
        </>
      );
    case "linkedin":
      return (
        <>
          <rect x="5.6" y="9.8" width="2.7" height="8.4" fill="#fff" />
          <circle cx="6.95" cy="6.9" r="1.55" fill="#fff" />
          <path fill="#fff" d="M10.4 9.8h2.6V11c.4-.7 1.3-1.4 2.7-1.4 2.6 0 3.1 1.7 3.1 3.9v4.7h-2.7v-4.1c0-1-.1-2.2-1.4-2.2-1.4 0-1.6 1-1.6 2.1v4.2h-2.7V9.8Z" />
        </>
      );
    case "threads":
      return (
        <>
          <circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.3" fill="none" stroke="#fff" strokeWidth="1.6" />
          <path d="M14.3 12v1.3c0 1.2 1.6 1.6 2.2.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case "bluesky":
      return (
        <path d="M12 10.6c-.9-1.8-3.4-5.1-5.7-6.7C4.1 2.4 3.3 2.6 2.8 2.9 2.2 3.2 2.1 4.1 2.1 4.6s.3 4.1.5 4.7c.6 2.1 2.8 2.8 4.8 2.6-2.9.4-5.5 1.5-2.1 5.3 3.7 3.8 5.1-.8 5.8-3.2.7 2.4 1.5 6.9 5.7 3.2 3.2-3.2.9-4.9-2-5.3 2 .2 4.2-.5 4.8-2.6.2-.6.5-4.2.5-4.7s-.1-1.4-.7-1.7c-.5-.3-1.3-.5-3.5 1-2.3 1.6-4.8 4.9-5.7 6.7Z" fill="#fff" />
      );
    case "pinterest":
      return <path fill="#fff" d="M12.3 4.5c-4.4 0-6.6 3.1-6.6 5.7 0 1.6.6 3 1.9 3.5.2.1.4 0 .5-.2l.2-.8c.1-.2 0-.3-.1-.5-.4-.5-.7-1.1-.7-1.9 0-2.5 1.9-4.7 4.9-4.7 2.7 0 4.1 1.6 4.1 3.8 0 2.9-1.3 5.3-3.2 5.3-1 0-1.8-.9-1.6-1.9.3-1.3.9-2.6.9-3.5 0-.8-.4-1.5-1.3-1.5-1.1 0-1.9 1.1-1.9 2.6 0 .9.3 1.6.3 1.6l-1.2 5.2c-.4 1.5-.1 3.4 0 3.6 0 .1.2.1.2 0 .1-.1 1.3-1.6 1.7-3.1l.6-2.6c.3.6 1.3 1.1 2.3 1.1 3 0 5-2.7 5-6.4 0-2.8-2.3-5.4-5.9-5.4Z" />;
    case "google_business_profile":
      return (
        <>
          <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
          <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
          <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" />
          <path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1Z" />
        </>
      );
    case "email":
      return (
        <>
          <rect x="4" y="6.5" width="16" height="11" rx="2" fill="#fff" />
          <path d="m4.6 7.4 7.4 5.4 7.4-5.4" fill="none" stroke="#1a6ff0" strokeWidth="1.6" strokeLinejoin="round" />
        </>
      );
  }
}

/** A channel's logo as a rounded app-style tile. `size` is in pixels. */
export function ChannelLogo({ id, size = 40, className }: { id: string; size?: number; className?: string }) {
  const key = (id in BACKGROUND ? id : "sms") as ChannelId;
  return (
    <span aria-hidden className={`inline-flex shrink-0 items-center justify-center shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)] ${className ?? ""}`} style={{ width: size, height: size, borderRadius: size * 0.28, background: BACKGROUND[key] }}>
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62}>
        <Glyph id={key} />
      </svg>
    </span>
  );
}
