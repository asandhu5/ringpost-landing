"use client";

import Link from "next/link";
import { useRef } from "react";

export interface IndustryTile {
  name: string;
  href: string;
  image: string;
  video?: string;
}

/** Ten equal photo tiles, one per group. Hovering (or focusing) one plays a short loop. */
export function IndustryTiles({ tiles }: { tiles: IndustryTile[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((t) => (
        <li key={t.href}>
          <Tile tile={t} />
        </li>
      ))}
    </ul>
  );
}

function Tile({ tile }: { tile: IndustryTile }) {
  const box = useRef<HTMLAnchorElement>(null);
  const play = () => {
    const el = box.current;
    const v = el?.querySelector("video");
    if (!el || !v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!v.src && tile.video) v.src = tile.video;
    v.currentTime = 0;
    v.play().then(() => el.classList.add("is-playing")).catch(() => {});
  };
  const stop = () => {
    const el = box.current;
    el?.classList.remove("is-playing");
    el?.querySelector("video")?.pause();
  };
  return (
    <Link ref={box} href={tile.href} onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop} className="rp-tile-media group relative block aspect-[4/3] overflow-hidden rounded-rp-md bg-surface-2 shadow-rp-1 lg:aspect-auto lg:h-[clamp(120px,22svh,190px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tile.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-rp group-hover:scale-[1.04]" />
      {tile.video && <video muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" aria-hidden />}
      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,27,43,0.82))]" />
      <span className="absolute inset-x-3 bottom-2.5 text-[15px] font-semibold leading-tight text-white">{tile.name}</span>
    </Link>
  );
}
