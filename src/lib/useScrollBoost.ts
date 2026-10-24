"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useGsap } from "@/lib/gsap";

/** Najveće ubrzanje od skrola i koliko brzo se gasi (po frejmu od 60 Hz). */
const MAX_BOOST = 6;
const BOOST_DECAY = 0.92;
/** Brzina skrola (px/s) koja daje jedno dodatno ubrzanje. */
const VELOCITY_PER_BOOST = 300;

/**
 * Pokret koji prati skrol (trak, prsten oko kartice): svaki frejm javlja
 * proteklo vreme, smer skrola (1 dole, -1 gore) i množilac brzine (1 + ubrzanje
 * od skrola, koje se postepeno gasi). Radi samo dok je element na ekranu.
 */
export function useScrollBoost(
  targetRef: RefObject<HTMLElement | null>,
  enabled: boolean,
  onFrame: (deltaMs: number, direction: 1 | -1, speed: number) => void,
) {
  // Najnovija funkcija bez ponovnog pravljenja ScrollTrigger-a.
  const frame = useRef(onFrame);
  useEffect(() => {
    frame.current = onFrame;
  });

  const kit = useGsap();

  useEffect(() => {
    const target = targetRef.current;
    if (!kit || !enabled || !target) return;
    const { gsap, ScrollTrigger } = kit;

    let direction: 1 | -1 = 1;
    let boost = 0;

    const tick = (_time: number, deltaMs: number) => {
      boost *= Math.pow(BOOST_DECAY, deltaMs / (1000 / 60));
      frame.current(deltaMs, direction, 1 + boost);
    };

    const trigger = ScrollTrigger.create({
      trigger: target,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        direction = self.direction === -1 ? -1 : 1;
        boost = Math.min(Math.abs(self.getVelocity()) / VELOCITY_PER_BOOST, MAX_BOOST);
      },
      onToggle: (self) => {
        if (self.isActive) gsap.ticker.add(tick);
        else gsap.ticker.remove(tick);
      },
    });

    return () => {
      gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, [kit, targetRef, enabled]);
}
