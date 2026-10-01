"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/site";

/**
 * A one-minute browser call with Zara, RingPost's own assistant (OpenAI realtime).
 *
 * The browser never holds an OpenAI credential: it sends its WebRTC offer to our API,
 * which opens the call on the website assistant's own key. The API owns the 60-second
 * limit and hangs up itself; the countdown here only shows the deadline it set.
 *
 * `levelRef` carries how loud Zara (or, when she's quiet, the caller) is right now, 0..1,
 * for the orb to react to without re-rendering React on every frame.
 */

export type CallPhase = "idle" | "connecting" | "live" | "ended";

export interface ZaraCall {
  phase: CallPhase;
  remaining: number | null;
  message: string | null;
  supported: boolean;
  levelRef: React.MutableRefObject<number>;
  start: () => Promise<void>;
  end: () => void;
}

export function useZaraCall(): ZaraCall {
  const [phase, setPhase] = useState<CallPhase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [supported, setSupported] = useState(true);
  const pc = useRef<RTCPeerConnection | null>(null);
  const mic = useRef<MediaStream | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const ctx = useRef<AudioContext | null>(null);
  const call = useRef<{ callId: string; sessionId: string; endsAt: number } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const raf = useRef(0);
  const levelRef = useRef(0);

  useEffect(() => {
    setSupported(typeof window.RTCPeerConnection === "function" && Boolean(navigator.mediaDevices?.getUserMedia));
  }, []);

  const cleanup = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    cancelAnimationFrame(raf.current);
    levelRef.current = 0;
    pc.current?.getSenders().forEach((s) => s.track?.stop());
    pc.current?.close();
    pc.current = null;
    mic.current?.getTracks().forEach((t) => t.stop());
    mic.current = null;
    void ctx.current?.close().catch(() => undefined);
    ctx.current = null;
    if (audioEl.current) audioEl.current.srcObject = null;
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
      setPhase(why ? "ended" : "idle");
      setMessage(why || null);
    },
    [cleanup],
  );

  useEffect(() => () => finish("", true), [finish]);

  /** Loudness of Zara's voice, falling back to the caller's, for the orb. */
  function meter(remote: MediaStream, local: MediaStream) {
    try {
      const ac = new AudioContext();
      ctx.current = ac;
      const analyse = (stream: MediaStream) => {
        const node = ac.createAnalyser();
        node.fftSize = 512;
        ac.createMediaStreamSource(stream).connect(node);
        return node;
      };
      const them = analyse(remote);
      const me = analyse(local);
      const buf = new Uint8Array(256);
      const rms = (node: AnalyserNode) => {
        node.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += ((v - 128) / 128) ** 2;
        return Math.sqrt(sum / buf.length);
      };
      const tick = () => {
        const l = Math.max(rms(them) * 3.2, rms(me) * 1.6);
        levelRef.current = levelRef.current * 0.7 + Math.min(1, l) * 0.3;
        raf.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      /* no meter: the orb just breathes */
    }
  }

  const start = useCallback(async () => {
    if (!supported || phase === "connecting" || phase === "live") return;
    setMessage(null);
    setPhase("connecting");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch (e) {
      const denied = e instanceof DOMException && (e.name === "NotAllowedError" || e.name === "SecurityError");
      setPhase("idle");
      setMessage(denied ? "Your browser blocked the microphone. Allow it for this site and try again, or chat with Zara instead." : "We couldn't find a microphone. Plug one in, or chat with Zara instead.");
      return;
    }
    mic.current = stream;
    try {
      const s = await fetch(`${API_URL}/public/website-assistant/session`);
      if (!s.ok) throw new Error("session");
      const { sessionId } = (await s.json()) as { sessionId: string };

      const peer = new RTCPeerConnection();
      pc.current = peer;
      if (!audioEl.current) {
        audioEl.current = new Audio();
        audioEl.current.autoplay = true;
      }
      peer.ontrack = (e) => {
        audioEl.current!.srcObject = e.streams[0];
        meter(e.streams[0], stream);
      };
      stream.getTracks().forEach((t) => peer.addTrack(t, stream));
      const events = peer.createDataChannel("oai-events");
      events.onopen = () => events.send(JSON.stringify({ type: "response.create" }));
      peer.onconnectionstatechange = () => {
        if (!call.current) return;
        if (["failed", "disconnected", "closed"].includes(peer.connectionState)) {
          const over = call.current.endsAt - Date.now() <= 1500;
          finish(over ? "That's the minute. Thanks for talking with Zara." : "The call dropped. Check your connection and try again.", false);
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
            ? body.error === "call_in_progress"
              ? "You're already on a call with Zara."
              : "You've called Zara a few times today. You can still chat with her."
            : "Zara can't take calls right now. You can still chat with her.",
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
        // The server hangs up at the deadline; this only tidies the browser side after.
        if (call.current.endsAt - Date.now() < -2500) finish("That's the minute. Thanks for talking with Zara.", false);
      };
      tick();
      timer.current = setInterval(tick, 250);
    } catch {
      cleanup();
      setPhase("idle");
      setMessage("We couldn't connect the call. Check your connection and try again.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported, phase, cleanup, finish]);

  const end = useCallback(() => finish("Call ended. Thanks for talking with Zara.", true), [finish]);

  return { phase, remaining, message, supported, levelRef, start, end };
}
