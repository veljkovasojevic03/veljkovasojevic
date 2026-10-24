"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useMediaQuery";

/** Koliko reči istovremeno "nosi struju" na granici (širina talasa). */
const WAVE_WORDS = 1.5;

/**
 * Rečenica sa strujom: pri skrolu se reči pale iz sive u belo, a reč na
 * granici kratko zasvetli u Volt boji (struja prolazi kroz rečenicu).
 * Tekst je ceo u HTML-u; uz smanjen pokret odmah je beo.
 */
export function ChargedText({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const kit = useGsap();
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!kit || !el || reduce) return;
    const { gsap } = kit;

    const styles = getComputedStyle(document.documentElement);
    const muted = styles.getPropertyValue("--muted").trim();
    const energy = styles.getPropertyValue("--energy").trim();
    const white = styles.getPropertyValue("--text").trim();
    const glow = `0 0 18px rgba(${styles.getPropertyValue("--energy-rgb").trim()}, 0.55)`;
    const spans = el.querySelectorAll<HTMLSpanElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.set(spans, { color: muted });
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 30%", scrub: true },
      });
      spans.forEach((span, i) => {
        tl.to(
          span,
          {
            keyframes: [
              { color: energy, textShadow: glow, duration: WAVE_WORDS / 2 },
              { color: white, textShadow: "0 0 0px rgba(0,0,0,0)", duration: WAVE_WORDS / 2 },
            ],
          },
          i,
        );
      });
    }, el);

    return () => ctx.revert();
  }, [kit, reduce, text]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
