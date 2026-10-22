"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "@/lib/useMediaQuery";
import { createPulseField, type PulseOptions } from "./pulseField";

const DESKTOP: PulseOptions = { interval: [1800, 4000], maxRuns: 5 };
const TOUCH: PulseOptions = { interval: [3200, 6000], maxRuns: 2 };

/**
 * Pozadina hero-a: tiha mreža tačaka, svetlo u boji struje ispod kursora
 * i impulsi kroz mrežu (klik/tap pokreće impuls na tom mestu).
 * Smanjen pokret: samo statične tačke.
 */
export function HeroBackground() {
  const reduce = useReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)");
  const rootRef = useRef<HTMLDivElement>(null);
  const litRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const host = root?.parentElement;
    const lit = litRef.current;
    const canvas = canvasRef.current;
    if (reduce || !root || !host || !lit || !canvas) return;

    const field = createPulseField(canvas, coarse ? TOUCH : DESKTOP);
    let onScreen = false;
    let frame = 0;
    let pointer = { x: 0, y: 0 };

    const local = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const moveLight = () => {
      frame = 0;
      lit.style.setProperty("--mx", `${pointer.x}px`);
      lit.style.setProperty("--my", `${pointer.y}px`);
    };

    const onMove = (e: PointerEvent) => {
      pointer = local(e);
      if (!frame) frame = requestAnimationFrame(moveLight);
    };
    const show = () => lit.setAttribute("data-on", "");
    const hide = () => lit.removeAttribute("data-on");

    const onDown = (e: PointerEvent) => {
      // Klik na dugme ili link ne pali impuls.
      if ((e.target as Element).closest("a, button")) return;
      const p = local(e);
      pointer = p;
      moveLight();
      show();
      field.spawnAt(p.x, p.y);
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") hide();
    };

    const sync = () => field.setActive(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(host);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerenter", show);
    host.addEventListener("pointerleave", hide);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("pointerup", onUp);
    host.addEventListener("pointercancel", hide);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", field.resize);

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerenter", show);
      host.removeEventListener("pointerleave", hide);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", hide);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", field.resize);
      cancelAnimationFrame(frame);
      field.destroy();
    };
  }, [reduce, coarse]);

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-dots absolute inset-0" />
      {!reduce && (
        <>
          <div ref={litRef} className="hero-dots hero-dots-lit absolute inset-0" />
          <canvas ref={canvasRef} className="absolute inset-0 size-full" />
        </>
      )}
      <div className="hero-fade absolute inset-0" />
    </div>
  );
}
