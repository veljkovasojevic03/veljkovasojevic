"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useMediaQuery";
import { drawStrikes, makeBolt, type Strike } from "./lightning";

/** Pauza između povremenih udara (ms): 2,8–5,4 s, kao u referenci. */
const IDLE_MIN = 2800;
const IDLE_SPREAD = 2600;
/** Najmanji razmak između lukova od kursora (ms). */
const ARC_EVERY = 70;
/** Veličina pri merenju i najveća dozvoljena veličina imena (px). */
const MEASURE_PX = 100;
const MAX_PX = 300;

/**
 * VASOJEVIĆ preko cele širine: veličina se računa da tačno stane (i pri promeni
 * širine i kad stigne font). Munje (canvas 2D, logika iz design/stil-poredjenje.html):
 * povremeni udari dok je podnožje na ekranu i tab aktivan, lukovi od kursora ka
 * slovima, udar na tap; slova zasvetle pri udaru. Uz smanjen pokret: samo tih sjaj.
 */
export function FooterName({ name }: { name: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Tačno uklapanje u širinu.
  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap || !text) return;

    const fit = () => {
      text.style.fontSize = `${MEASURE_PX}px`;
      const size = Math.min(MAX_PX, ((MEASURE_PX * wrap.clientWidth) / text.scrollWidth) * 0.99);
      text.style.fontSize = `${size}px`;
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(wrap);
    document.fonts.ready.then(fit).catch(() => undefined);
    document.fonts.addEventListener("loadingdone", fit);
    return () => {
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", fit);
    };
  }, []);

  // Munje.
  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (reduce || !wrap || !text || !canvas || !ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const colors = {
      energy: styles.getPropertyValue("--energy").trim(),
      hot: styles.getPropertyValue("--energy-hot").trim(),
    };

    let strikes: Strike[] = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let idleTimer = 0;
    let litTimer = 0;
    let lastArc = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Okvir teksta u koordinatama canvas-a. */
    const textBox = () => {
      const t = text.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      return { l: t.left - c.left, t: t.top - c.top, w: t.width, h: t.height };
    };

    const light = (ms: number) => {
      text.dataset.lit = "";
      window.clearTimeout(litTimer);
      litTimer = window.setTimeout(() => delete text.dataset.lit, ms);
    };

    const frame = (now: number) => {
      strikes = drawStrikes(ctx, strikes, now, width, height, colors);
      raf = strikes.length ? requestAnimationFrame(frame) : 0;
    };
    const push = (strike: Strike) => {
      strikes = [...strikes, strike];
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const bigStrike = (atX?: number) => {
      if (!width) return;
      const b = textBox();
      const len = b.w * (0.35 + Math.random() * 0.45);
      const x1 = atX !== undefined ? atX - len * 0.4 : b.l + Math.random() * (b.w - len);
      const y = () => b.t + b.h * (0.1 + Math.random() * 0.8);
      push(makeBolt(x1, y(), x1 + len, y(), b.h * 0.35, 3 + Math.floor(Math.random() * 3), 650));
      light(420);
    };

    const arc = (x: number, y: number) => {
      if (!width) return;
      const b = textBox();
      const tx = Math.max(b.l, Math.min(b.l + b.w, x + (Math.random() - 0.5) * 260));
      const ty = b.t + b.h * (0.15 + Math.random() * 0.7);
      const dist = Math.hypot(tx - x, ty - y);
      push(makeBolt(x, y, tx, ty, Math.max(18, dist * 0.32), 1 + Math.floor(Math.random() * 2), 240));
      light(160);
    };

    // Povremeni udari samo dok je podnožje vidljivo i tab aktivan.
    const scheduleIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        if (visible && !document.hidden) {
          bigStrike();
          if (Math.random() < 0.35) window.setTimeout(() => bigStrike(), 90);
        }
        scheduleIdle();
      }, IDLE_MIN + Math.random() * IDLE_SPREAD);
    };

    const local = (e: PointerEvent): [number, number] => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const now = performance.now();
      if (now - lastArc < ARC_EVERY) return;
      lastArc = now;
      arc(...local(e));
    };
    const onDown = (e: PointerEvent) => bigStrike(local(e)[0]);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) scheduleIdle();
      else window.clearTimeout(idleTimer);
    });
    const ro = new ResizeObserver(resize);

    resize();
    io.observe(wrap);
    ro.observe(canvas);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerdown", onDown);

    return () => {
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerdown", onDown);
      window.clearTimeout(idleTimer);
      window.clearTimeout(litTimer);
      cancelAnimationFrame(raf);
      delete text.dataset.lit;
      ctx.clearRect(0, 0, width, height);
    };
  }, [reduce]);

  return (
    // Ukras: ime je već u © redu i u naslovu stranice.
    <div ref={wrapRef} aria-hidden="true" className="giant-wrap">
      <canvas ref={canvasRef} className="giant-bolts" />
      <p ref={textRef} translate="no" className="giant">
        {name}
      </p>
    </div>
  );
}
