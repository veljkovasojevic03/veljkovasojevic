"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { loadGsap } from "@/lib/gsap";
import { setLenis } from "@/lib/smoothScroll";
import { useMediaQuery, useReducedMotion } from "@/lib/useMediaQuery";

/**
 * Lenis samo za uređaje sa mišem (pointer: fine) i bez smanjenog pokreta;
 * na dodir ostaje izvorni skrol. Lenis pokreće GSAP-ov ticker, pa su
 * ScrollTrigger scene usklađene sa glatkim skrolom.
 */
export function SmoothScroll() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!fine || reduce) return;
    let cancelled = false;
    let teardown = () => {};

    // Lenis i GSAP stižu naknadno; do tada radi izvorni skrol.
    void Promise.all([import("lenis"), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const navHeight =
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
      const lenis: Lenis = new LenisCtor({
        autoRaf: false,
        // Sidra (#work, #contact…) staju ispod menija, kao scroll-padding-top.
        anchors: { offset: -navHeight },
        respectReducedMotion: false,
      });
      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    return () => {
      cancelled = true;
      teardown();
    };
  }, [fine, reduce]);

  return null;
}
