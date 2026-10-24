"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";
import { useScrollBoost } from "@/lib/useScrollBoost";

/** Osnovna brzina u px/s; skrol je privremeno umnožava. */
const BASE_SPEED = 48;
/** Koliko puta se niz ponavlja u jednoj polovini (da pokrije širok ekran). */
const COPIES = 3;

type Props = {
  items: string[];
  separator: string;
  className?: string;
};

/**
 * Trak u jednom redu, beskonačan. Ide levo dok se skroluje na dole, desno na
 * gore, i ubrzava sa brzinom skrola. Stoji dok nije na ekranu.
 * Čitač ekrana dobija tekst jednom; uz smanjen pokret trak miruje.
 */
export function ScrollMarquee({ items, separator, className }: Props) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  // Širina trake se kešira; čitanje u svakom frejmu bi teralo browser na raspored.
  const width = useRef(0);

  // Traka ima dve iste polovine; pomeraj se omotava na [-50%, 0), pa nema šava.
  useScrollBoost(rootRef, !reduce, (deltaMs, direction, speed) => {
    const track = trackRef.current;
    if (!track || !width.current) return;
    const percentPerSec = ((BASE_SPEED * speed) / width.current) * 100;
    // Omotavanje na (-50, 0]: kad pređe pola, vraća se za tačno jednu polovinu.
    const next = x.current - (direction * percentPerSec * deltaMs) / 1000;
    x.current = ((next % 50) - 50) % 50;
    track.style.transform = `translate3d(${x.current}%, 0, 0)`;
  });

  useEffect(() => {
    const track = trackRef.current;
    if (reduce || !track) return;
    const observer = new ResizeObserver(() => {
      width.current = track.scrollWidth;
    });
    observer.observe(track);
    return () => {
      observer.disconnect();
      track.style.transform = "";
    };
  }, [reduce]);

  const half = Array.from({ length: COPIES }, () => items).flat();

  return (
    <div ref={rootRef} className={`overflow-hidden ${className ?? ""}`}>
      <p className="sr-only">{items.join(", ")}</p>
      <div ref={trackRef} aria-hidden="true" className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {half.map((item, i) => (
              <span key={i} className="flex items-center gap-[0.5em] pr-[0.5em]">
                {item}
                <span className="text-muted">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
