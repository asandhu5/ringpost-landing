/** The ring as a flat picture: shown first, before the 3D loads, and instead of it
 * without WebGL or when the visitor has asked their device for less motion. */
export function RingStill({ className, id = "ring-still" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b4ee6" />
          <stop offset="0.55" stopColor="#7c6bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <radialGradient id={`${id}-d`} cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#a5f3fc" />
          <stop offset="1" stopColor="#0891b2" />
        </radialGradient>
      </defs>
      <path d="M270 76A140 140 0 1 0 337 245" fill="none" stroke={`url(#${id}-g)`} strokeWidth="58" strokeLinecap="round" />
      <circle cx="318" cy="296" r="30" fill={`url(#${id}-d)`} />
    </svg>
  );
}
