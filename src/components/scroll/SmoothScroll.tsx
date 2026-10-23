"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
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

    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
    const lenis = new Lenis({
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

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [fine, reduce]);

  return null;
}
