"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, PhoneOff } from "lucide-react";
import { API_URL } from "@/lib/site";

/**
 * A one-minute browser call with RingPost's own assistant, on OpenAI's realtime model.
 *
 * The browser never holds an OpenAI credential of any kind: it sends its WebRTC offer to
 * our API, which opens the call with the website assistant's own key and returns the
 * answer. The API owns the 60-second limit and hangs the call up itself; the countdown
 * here only displays the deadline the server set.
 */

type Phase = "idle" | "connecting" | "live" | "ended";

const OPENING_LINES = ["What does RingPost do for a hair salon?", "How does the free trial work?", "What happens if it doesn't know an answer?"];

export function VoiceDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);
  const pc = useRef<RTCPeerConnection | null>(null);
  const mic = useRef<MediaStream | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const call = useRef<{ callId: string; sessionId: string; endsAt: number } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && typeof window.RTCPeerConnection === "function" && Boolean(navigator.mediaDevices?.getUserMedia));
  }, []);

  const cleanup = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    pc.current?.getSenders().forEach((s) => s.track?.stop());
    pc.current?.close();
    pc.current = null;
    mic.current?.getTracks().forEach((t) => t.stop());
    mic.current = null;
  }, []);

  const finish = useCallback(
    (why: string, tellServer: boolean) => {
      const c = call.current;
      call.current = null;
      if (tellServer && c) {
        void fetch(`${API_URL}/public/website-assistant/voice/end`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: c.sessionId, callId: c.callId }),
          keepalive: true,
        }).catch(() => undefined);
      }
      cleanup();
      setRemaining(null);
      setPhase("ended");
      setMessage(why);
    },
    [cleanup],
  );

  useEffect(() => () => finish("", true), [finish]);

  async function start() {
    setMessage(null);
    if (!supported) return;
    setPhase("connecting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (e) {
      const denied = e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError");
      setPhase("idle");
      setMessage(
        denied
          ? "Your browser didn't give us the microphone. Allow microphone access for this site (usually the icon in the address bar) and try again, or type your question in the chat instead."
          : "We couldn't find a microphone. Plug one in and try again, or use the chat instead.",
      );
      return;
    }
    mic.current = stream;
    try {
      const s = await fetch(`${API_URL}/public/website-assistant/session`);
      if (!s.ok) throw new Error("session");
      const { sessionId } = (await s.json()) as { sessionId: string };

      const peer = new RTCPeerConnection();
      pc.current = peer;
      peer.ontrack = (e) => {
        if (audio.current) audio.current.srcObject = e.streams[0];
      };
      stream.getTracks().forEach((t) => peer.addTrack(t, stream));
      const events = peer.createDataChannel("oai-events");
      events.onopen = () => events.send(JSON.stringify({ type: "response.create" }));
      peer.onconnectionstatechange = () => {
        if (!call.current) return;
        if (peer.connectionState === "failed" || peer.connectionState === "disconnected" || peer.connectionState === "closed") {
          const over = call.current.endsAt - Date.now() <= 1500;
          finish(over ? "That's the minute. Thanks for trying RingPost." : "The call dropped, most likely a network hiccup. You can start another one.", false);
        }
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      const res = await fetch(`${API_URL}/public/website-assistant/voice/start`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, sdp: offer.sdp }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        cleanup();
        setPhase("idle");
        setMessage(
          res.status === 429
            ? "You've used the voice demo a few times today. The chat is still here, and it knows everything the voice demo does."
            : body.error === "budget_reached"
              ? "The voice demo has had a busy day and is resting until tomorrow. The chat is still here and answers the same questions."
              : "The voice demo isn't available right now. The chat is still here and answers the same questions.",
        );
        return;
      }
      const { sdp, callId, endsAt } = (await res.json()) as { sdp: string; callId: string; endsAt: string };
      call.current = { callId, sessionId, endsAt: new Date(endsAt).getTime() };
      await peer.setRemoteDescription({ type: "answer", sdp });
      setPhase("live");
      const tick = () => {
        if (!call.current) return;
        const left = Math.max(0, Math.ceil((call.current.endsAt - Date.now()) / 1000));
        setRemaining(left);
        // The server hangs up at the deadline; this only tidies up the browser side a
        // moment later in case the hang-up hasn't reached us.
        if (left <= 0 && call.current.endsAt - Date.now() < -2500) finish("That's the minute. Thanks for trying RingPost.", false);
      };
      tick();
      timer.current = setInterval(tick, 250);
    } catch {
      cleanup();
      setPhase("idle");
      setMessage("We couldn't connect the call. Check your connection and try again, or use the chat.");
    }
  }

  return (
    <div className="rp-card flex flex-col rounded-3xl p-6 sm:p-8">
      <audio ref={audio} autoPlay />
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-3xl text-ink">Talk to it</p>
          <p className="mt-1 text-[14px] text-muted-ink">A one-minute call in your browser. No phone number needed.</p>
        </div>
        <span className="rounded-full border border-line-strong px-3 py-1 font-mono text-[12px] tabular-nums text-ink" aria-live="polite">
          {phase === "live" && remaining !== null ? `0:${String(remaining).padStart(2, "0")}` : "1:00"}
        </span>
      </div>

      <div className="relative my-8 flex items-center justify-center">
        <div aria-hidden className={`absolute h-40 w-40 rounded-full bg-violet/25 blur-2xl transition-opacity ${phase === "live" ? "opacity-100" : "opacity-30"}`} />
        {phase === "live" ? (
          <button type="button" onClick={() => finish("Call ended. Thanks for trying RingPost.", true)} className="relative flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full bg-cta text-[#1a0d08] shadow-[0_20px_60px_-15px_rgba(255,122,89,0.8)]">
            <PhoneOff aria-hidden className="h-7 w-7" />
            <span className="text-[12.5px] font-medium">End call</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={start}
            disabled={!supported || phase === "connecting"}
            className="relative flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full bg-violet text-white shadow-[0_20px_60px_-15px_rgba(124,107,255,0.9)] transition-transform hover:scale-[1.03] disabled:opacity-50"
          >
            {supported ? <Mic aria-hidden className="h-7 w-7" /> : <MicOff aria-hidden className="h-7 w-7" />}
            <span className="text-[12.5px] font-medium">{phase === "connecting" ? "Connecting…" : "Start call"}</span>
          </button>
        )}
      </div>

      {!supported && <p className="text-center text-[14px] text-muted-ink">This browser can&apos;t make calls from the page. Try a recent Chrome, Safari, Edge or Firefox, or use the chat.</p>}
      {message && (
        <p role="status" className="rounded-2xl border border-line bg-white/[0.03] px-4 py-3 text-center text-[14px] leading-relaxed text-muted-ink">
          {message}
        </p>
      )}

      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-faint">Try saying</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {OPENING_LINES.map((l) => (
            <li key={l} className="text-[14.5px] text-ink">
              &ldquo;{l}&rdquo;
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[12px] leading-relaxed text-faint">
          You&apos;re talking to RingPost&apos;s own AI assistant about RingPost. It won&apos;t pretend to be a business or take a booking. Audio is processed by OpenAI to run the call; see our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
        </p>
      </div>
    </div>
  );
}
