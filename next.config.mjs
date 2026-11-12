const isDev = process.env.NODE_ENV !== "production";
const apiOrigin = (process.env.NEXT_PUBLIC_RINGPOST_API_URL || process.env.NEXT_PUBLIC_API_URL || "https://api.ringpost.tech").replace(/\/$/, "");

/**
 * Scripts load only from this site (Next.js and Vercel Analytics both serve from it);
 * anything injected from another host is refused. Inline scripts stay allowed because
 * Next.js hydrates with them on a statically rendered site. Zara's chat and call talk to
 * the RingPost API; the call's audio itself is WebRTC, which CSP doesn't govern.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob: https:",
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} https://*.ringpost.tech https://vitals.vercel-insights.com${isDev ? " http://localhost:* ws://localhost:*" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Keep working links for /demo and /call by redirecting them to /contact.
  // Chat stays in the corner, and case studies require customers to feature.
  async redirects() {
    return [
      { source: "/demo", destination: "/contact", permanent: true },
      { source: "/call", destination: "/contact", permanent: true },
      { source: "/resources/case-studies", destination: "/resources/blog", permanent: true },
      // 2026-11-12 redesign: one page per offering, at a short address of its own.
      { source: "/channels", destination: "/messages", permanent: true },
      { source: "/channels/phone", destination: "/calls", permanent: true },
      { source: "/channels/whatsapp", destination: "/messages#whatsapp", permanent: true },
      { source: "/channels/instagram", destination: "/messages#instagram", permanent: true },
      { source: "/channels/messenger", destination: "/messages#messenger", permanent: true },
      { source: "/channels/sms", destination: "/messages#sms", permanent: true },
      { source: "/channels/email", destination: "/messages#email", permanent: true },
      { source: "/product/ai-receptionist", destination: "/calls", permanent: true },
      { source: "/product/inbox", destination: "/inbox", permanent: true },
      { source: "/product/booking", destination: "/booking", permanent: true },
      { source: "/product/knowledge", destination: "/brain", permanent: true },
      { source: "/product/reviews", destination: "/reviews", permanent: true },
      { source: "/product/winback", destination: "/win-back", permanent: true },
      { source: "/product/insights", destination: "/insights", permanent: true },
      { source: "/product/advisor", destination: "/talk-to-ai", permanent: true },
      { source: "/product/ai-media", destination: "/content-studio", permanent: true },
      { source: "/product/uploads", destination: "/posting#upload", permanent: true },
      { source: "/product/social", destination: "/posting", permanent: true },
      { source: "/grow", destination: "/reviews", permanent: true },
      { source: "/product", destination: "/", permanent: true },
      { source: "/resources", destination: "/resources/blog", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
