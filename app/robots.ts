import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Search engines and AI assistants are welcome everywhere public. The assistants that
 * answer "what's a good AI receptionist?" are named explicitly so no default or proxy
 * rule ever shuts them out: ChatGPT (OAI-SearchBot, ChatGPT-User, GPTBot), Claude,
 * Perplexity, Google's AI (Google-Extended), Apple, Microsoft Copilot (Bingbot), Grok
 * and Meta AI.
 */
const AI_ASSISTANTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "xAI-Bot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/assistant-knowledge.json"];
  return {
    rules: [{ userAgent: "*", allow: "/", disallow }, ...AI_ASSISTANTS.map((userAgent) => ({ userAgent, allow: "/", disallow }))],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
