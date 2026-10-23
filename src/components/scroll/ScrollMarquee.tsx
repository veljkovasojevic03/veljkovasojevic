"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useMediaQuery";

/** Osnovna brzina u px/s; skrol je privremeno umnožava. */
const BASE_SPEED = 48;
/** Najveće ubrzanje od skrola i koliko brzo se gasi (po frejmu od 60 Hz). */
const MAX_BOOST = 6;
const BOOST_DECAY = 0.92;
/** Brzina skrola (px/s) koja daje jedno dodatno ubrzanje. */
const VELOCITY_PER_BOOST = 300;
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

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (reduce || !root || !track) return;

    // Traka ima dve iste polovine; pomeraj se omotava na [-50%, 0), pa nema šava.
    const setX = gsap.quickSetter(track, "xPercent");
    const wrap = gsap.utils.wrap(-50, 0);
    let x = 0;
    let direction = 1;
    let boost = 0;
    let width = track.scrollWidth;

    const tick = (_time: number, deltaMs: number) => {
      const frames = deltaMs / (1000 / 60);
      boost *= Math.pow(BOOST_DECAY, frames);
      const pxPerSec = BASE_SPEED * (1 + boost);
      x = wrap(x - (direction * pxPerSec * deltaMs) / 1000 / width * 100);
      setX(x);
    };

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        direction = self.direction;
        boost = Math.min(Math.abs(self.getVelocity()) / VELOCITY_PER_BOOST, MAX_BOOST);
      },
      onToggle: (self) => {
        if (self.isActive) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      },
      onRefresh: () => {
        width = track.scrollWidth;
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
      gsap.set(track, { clearProps: "transform" });
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
