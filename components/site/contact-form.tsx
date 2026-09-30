"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { API_URL, PRIMARY_EMAIL } from "@/lib/site";

/**
 * "Talk to a person": this lands in RingPost's own inbox as a conversation marked as
 * needing a person, and alerts the team (apps/api /public/website-assistant/contact,
 * the same lead path the site chat has always used).
 */
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState("sending");
    setError(null);
    try {
      const s = await fetch(`${API_URL}/public/website-assistant/session`);
      if (!s.ok) throw new Error("session");
      const { sessionId } = (await s.json()) as { sessionId: string };
      const res = await fetch(`${API_URL}/public/website-assistant/contact`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, name: data.name, contact: data.contact, business: data.business || undefined, message: data.message || undefined, website: data.website || undefined }),
      });
      if (res.status === 429) {
        setError(`We've had a lot of messages from your connection today. Please email ${PRIMARY_EMAIL} instead.`);
        setState("error");
        return;
      }
      if (!res.ok) throw new Error(`http_${res.status}`);
      setState("sent");
    } catch {
      setError(`Your message didn't send. Please try again, or email ${PRIMARY_EMAIL}.`);
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="rp-card flex flex-col items-start gap-3 rounded-3xl p-8">
        <CheckCircle2 aria-hidden className="h-7 w-7 text-success" />
        <p className="font-display text-3xl text-ink">Thanks, it&apos;s with the team.</p>
        <p className="text-[15px] leading-relaxed text-muted-ink">A person will get back to you at the contact details you gave.</p>
      </div>
    );
  }

  const field = "min-h-12 w-full rounded-2xl border border-line-strong bg-base px-4 text-[15px] text-ink outline-none placeholder:text-faint focus:border-glow/60";
  return (
    <form
      className="rp-card flex flex-col gap-4 rounded-3xl p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        void submit(e.currentTarget);
      }}
    >
      <div>
        <p className="font-display text-3xl text-ink">Talk to a person</p>
        <p className="mt-1 text-[14.5px] text-muted-ink">This goes to the RingPost team, not the AI.</p>
      </div>
      <label className="flex flex-col gap-1.5 text-[13.5px] text-muted-ink">
        Your name
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-[13.5px] text-muted-ink">
        Email or phone number
        <input name="contact" required minLength={5} maxLength={160} autoComplete="email" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-[13.5px] text-muted-ink">
        Business name <span className="text-faint">(optional)</span>
        <input name="business" maxLength={160} autoComplete="organization" className={field} />
      </label>
      <label className="flex flex-col gap-1.5 text-[13.5px] text-muted-ink">
        How can we help?
        <textarea name="message" maxLength={1000} rows={4} className={`${field} py-3`} />
      </label>
      {/* Left empty by people; bots fill it in. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      {error && (
        <p role="alert" className="rounded-xl border border-cta/30 bg-cta/10 px-4 py-3 text-[14px] text-ink">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="min-h-12 rounded-full bg-cta text-[15px] font-medium text-[#1a0d08] transition-opacity hover:bg-[var(--rp-cta-hover)] disabled:opacity-60">
        {state === "sending" ? "Sending…" : "Send to the team"}
      </button>
      <p className="text-[12px] leading-relaxed text-faint">
        We use what you send only to reply to you. See the <a href="/privacy" className="underline underline-offset-2">privacy policy</a>.
      </p>
    </form>
  );
}
