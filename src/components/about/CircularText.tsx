"use client";

/*
 * Ideja: Circular Text iz React Bits (MIT + Commons Clause, © David Haz).
 * Napisano iznova kao SVG textPath, po našim tokenima, sa brzinom koja prati skrol.
 */
import { useId, useRef } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";
import { useScrollBoost } from "@/lib/useScrollBoost";

/** Osnovna brzina okretanja u stepenima po sekundi. */
const BASE_DEG_PER_SEC = 18;
/** Poluprečnik putanje teksta u viewBox jedinicama (0–100). */
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Prsten teksta koji se okreće; skrol ga ubrzava i menja mu smer.
 * Ukras (isti status piše na poleđini kartice), pa je skriven od čitača ekrana.
 * Uz smanjen pokret stoji.
 */
export function CircularText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const angle = useRef(0);
  const pathId = useId();

  useScrollBoost(rootRef, !reduce, (deltaMs, direction, speed) => {
    angle.current = (angle.current + (direction * BASE_DEG_PER_SEC * speed * deltaMs) / 1000) % 360;
    // CSS transform na <svg> spaja kompozitor; atribut na <g> bi crtao SVG svaki frejm.
    if (ringRef.current) ringRef.current.style.transform = `rotate(${angle.current}deg)`;
  });

  // Kratki tekst se ponavlja da prsten bude pun (SR 2×, EN 3×).
  const repeats = Math.max(2, Math.round(44 / text.length));
  const ring = Array.from({ length: repeats }, () => `${text} `).join("");

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`rounded-full border border-line-2 bg-bg/70 backdrop-blur-sm ${className ?? ""}`}
    >
      <svg ref={ringRef} viewBox="0 0 100 100" className="block size-full">
        <defs>
          <path
            id={pathId}
            d={`M 50 ${50 - RADIUS} a ${RADIUS} ${RADIUS} 0 1 1 0 ${RADIUS * 2} a ${RADIUS} ${RADIUS} 0 1 1 0 ${-RADIUS * 2}`}
          />
        </defs>
        <text
          className="fill-text font-mono uppercase"
          fontSize="7.6"
          letterSpacing="0.5"
          textLength={CIRCUMFERENCE}
          lengthAdjust="spacing"
        >
          <textPath href={`#${pathId}`}>{ring}</textPath>
        </text>
        <circle cx="50" cy="50" r="3.2" className="fill-accent" />
      </svg>
    </div>
  );
}
