"use client";

import { useEffect, useRef, useState } from "react";
import { DURATION_MS, EASE_OUT_CSS, FLIP_EASING } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useMediaQuery";

type Props = {
  front: React.ReactNode;
  back: React.ReactNode;
  /** aria-label dugmeta; stanje (okrenuta ili ne) kaže aria-pressed. */
  label: string;
  className?: string;
};

/**
 * Kartica koja se okreće klikom, tapom ili tastaturom. Obe strane su stalno u
 * DOM-u, pa ih čitač ekrana čita bez obzira na to koja je okrenuta.
 * Tokom okretanja struja protrči po ivici. Uz smanjen pokret: pretapanje.
 */
export function FlipCard({ front, back, label, className }: Props) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const sparks = useRef<(SVGRectElement | null)[]>([]);
  // Struja samo kad se stanje zaista promeni (ne pri prvom prikazu).
  const shown = useRef(flipped);

  useEffect(() => {
    if (shown.current === flipped) return;
    shown.current = flipped;
    if (reduce) return;
    sparks.current.forEach((spark) =>
      spark?.animate(
        [
          { strokeDashoffset: 0, opacity: 0 },
          { opacity: 1, offset: 0.15 },
          { opacity: 1, offset: 0.75 },
          { strokeDashoffset: -1, opacity: 0 },
        ],
        { duration: DURATION_MS.slow, easing: EASE_OUT_CSS },
      ),
    );
  }, [flipped, reduce]);

  const face = "absolute inset-0 overflow-hidden rounded-xl border border-line-2 backface-hidden";

  return (
    <div className={`relative perspective-[1400px] ${className ?? ""}`}>
      {/* CSS prelaz sa krivom opruge: prekidiv, bez JS biblioteke za animaciju. */}
      <div
        className="relative size-full transform-3d"
        style={{
          transform: !reduce && flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: reduce ? "none" : `transform ${DURATION_MS.slow}ms ${FLIP_EASING}`,
        }}
      >
        <div
          className={`${face} bg-bg-2 transition-opacity duration-(--dur-medium) ease-out ${reduce && flipped ? "opacity-0" : ""}`}
        >
          {front}
          <Spark ref={(el) => void (sparks.current[0] = el)} />
        </div>
        <div
          className={`${face} bg-bg-2 transition-opacity duration-(--dur-medium) ease-out ${
            reduce ? (flipped ? "" : "opacity-0") : "transform-[rotateY(180deg)]"
          }`}
        >
          {back}
          <Spark ref={(el) => void (sparks.current[1] = el)} />
        </div>
      </div>

      <button
        type="button"
        aria-label={label}
        aria-pressed={flipped}
        onClick={() => setFlipped((v) => !v)}
        className="absolute inset-0 cursor-pointer rounded-xl"
      />
    </div>
  );
}

/** Kratka Volt crta koja obiđe ivicu kartice (pathLength = 1). */
function Spark({ ref }: { ref: React.Ref<SVGRectElement> }) {
  return (
    // 1 px unutra, da ivica lica (overflow-hidden) ne odseče crtu; rx = --radius-xl − 1.
    <svg aria-hidden="true" className="pointer-events-none absolute top-px left-px h-[calc(100%-2px)] w-[calc(100%-2px)] overflow-visible">
      <rect
        ref={ref}
        x="0"
        y="0"
        width="100%"
        height="100%"
        rx="23"
        pathLength={1}
        fill="none"
        stroke="var(--energy)"
        strokeWidth="2"
        strokeDasharray="0.14 0.86"
        opacity="0"
        style={{ filter: "drop-shadow(0 0 4px var(--energy)) drop-shadow(0 0 10px var(--energy))" }}
      />
    </svg>
  );
}
