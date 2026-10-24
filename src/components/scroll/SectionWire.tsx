"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";

/** Prolaz impulsa; kriva kao iscrtavanje u uvodu (spor početak, mekan kraj). */
const RUN_MS = 1100;
const RUN_EASE = "cubic-bezier(0.5, 0, 0.2, 1)";
/** Pauza između ponovnih prolaza dok je linija na ekranu [min, max] u ms. */
const IDLE_MS: [number, number] = [6000, 11000];

type Props = {
  /** Smer impulsa; smenjuje se od sekcije do sekcije, pa struja vijuga niz stranicu. */
  from: "left" | "right";
};

/**
 * Struja kroz liniju između dve sekcije: stoji odmah ispod sekcije sa
 * `border-b` i pušta impuls kroz tu liniju kad uđe na ekran, pa povremeno
 * ponovo. Smanjen pokret: ništa, linija ostaje mirna.
 */
export function SectionWire({ from }: Props) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const head = headRef.current;
    if (reduce || !track || !head) return;

    let timer = 0;
    let onScreen = false;
    let running: Animation | null = null;

    const run = () => {
      if (running) return;
      const width = track.clientWidth;
      const size = head.offsetWidth;
      const [start, end] = from === "left" ? [-size, width] : [width, -size];
      running = head.animate(
        [
          { transform: `translateX(${start}px)`, opacity: 1 },
          { transform: `translateX(${end}px)`, opacity: 1 },
        ],
        { duration: RUN_MS, easing: RUN_EASE },
      );
      running.finished
        .catch(() => undefined)
        .finally(() => {
          running = null;
        });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      const [min, max] = IDLE_MS;
      timer = window.setTimeout(() => {
        if (onScreen && !document.hidden) run();
        schedule();
      }, min + Math.random() * (max - min));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.isIntersecting && !onScreen;
        onScreen = entry.isIntersecting;
        if (entering) {
          run();
          schedule();
        } else if (!onScreen) {
          window.clearTimeout(timer);
        }
      },
      // Linija mora da pređe donjih 20 % ekrana, da se impuls stvarno vidi.
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(track);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      running?.cancel();
    };
  }, [reduce, from]);

  return (
    <div aria-hidden="true" className="pointer-events-none relative z-[1] h-0">
      {/* Traka 12 px centrirana na liniju od 1 px (donja ivica sekcije iznad). */}
      <div ref={trackRef} className="absolute inset-x-0 -top-[6.5px] h-3 overflow-hidden">
        <div ref={headRef} className="absolute inset-y-0 left-0 w-[clamp(120px,22vw,320px)] opacity-0">
          {/* Glava impulsa je na desnom kraju; za smer zdesna se okreće. */}
          <div className={`section-wire-beam ${from === "right" ? "-scale-x-100" : ""}`} />
        </div>
      </div>
    </div>
  );
}
