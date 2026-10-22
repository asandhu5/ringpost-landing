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
  // Pages retired after launch keep working links: /demo became the /call page with
  // Zara, and case studies were removed until there are customers to feature.
  async redirects() {
    return [
      { source: "/demo", destination: "/call", permanent: true },
      { source: "/resources/case-studies", destination: "/resources", permanent: true },
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
          // microphone=(self): Zara's browser call asks for the mic on this origin only.
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
          ...(process.env.NODE_ENV === "production" ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
