/**
 * Each channel's own mark, in its own colours: WhatsApp green, the Instagram gradient,
 * the Messenger gradient. Phone, text and email have no single brand, so they get the
 * colours a phone's own apps use. Drawn inline so nothing loads from another site.
 */

type ChannelId = "phone" | "sms" | "whatsapp" | "instagram" | "messenger" | "email" | "facebook";

const BACKGROUND: Record<ChannelId, string> = {
  phone: "linear-gradient(180deg, #5ef08a, #1fbf4f)",
  sms: "linear-gradient(180deg, #6ee36b, #23b33a)",
  whatsapp: "#25d366",
  instagram: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
  messenger: "radial-gradient(circle at 20% 100%, #ff6968 0%, #a334fa 45%, #0695ff 85%)",
  email: "linear-gradient(180deg, #4fa3ff, #1a6ff0)",
  facebook: "#1877f2",
};

function Glyph({ id }: { id: ChannelId }) {
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
