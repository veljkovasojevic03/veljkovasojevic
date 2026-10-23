/**
 * Tokeni pokreta: jedan izvor za GSAP i Motion.
 * Isti brojevi stoje kao CSS promenljive u src/styles/tokens.css.
 *
 * Kontrole (hover, tap, fokus) koriste FAST; MEDIUM je za popup i veće
 * prelaze; SLOW samo za skrol scene i uvod (namerni izuzeci).
 */

/** Kriva izlaza: cubic-bezier(0.22, 1, 0.36, 1). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_OUT_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Trajanja u milisekundama. */
export const DURATION_MS = {
  fast: 160,
  medium: 320,
  slow: 700,
} as const;

export const STAGGER_MS = 40;

/** Motion radi u sekundama. */
export const motionTransition = {
  fast: { duration: DURATION_MS.fast / 1000, ease: EASE_OUT },
  medium: { duration: DURATION_MS.medium / 1000, ease: EASE_OUT },
  slow: { duration: DURATION_MS.slow / 1000, ease: EASE_OUT },
} as const;

export const motionStagger = STAGGER_MS / 1000;

/** Opruga za pregled koji pluta uz kursor (blag zaostatak, bez poskakivanja). */
export const springFloat = { duration: 0.5, bounce: 0.1 } as const;

/** Ime krive za GSAP; registruje se jednom preko registerGsapEase(). */
export const GSAP_EASE_OUT = "vvOut";

/** GSAP isto radi u sekundama. */
export const gsapDuration = {
  fast: DURATION_MS.fast / 1000,
  medium: DURATION_MS.medium / 1000,
  slow: DURATION_MS.slow / 1000,
} as const;

export const gsapStagger = STAGGER_MS / 1000;

/** Bezier kriva za GSAP (bez CustomEase plugina). */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): (t: number) => number {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    // Newton-Raphson, pa bisekcija ako ne konvergira.
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-6) return sampleY(t);
      const d = sampleDX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    let lo = 0;
    let hi = 1;
    t = x;
    while (hi - lo > 1e-6) {
      if (sampleX(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

export const easeOut = cubicBezier(...EASE_OUT);

/** Poziva se jednom na klijentu pre prve GSAP animacije. */
export function registerGsapEase(gsap: {
  registerEase: (name: string, ease: (t: number) => number) => void;
}): void {
  gsap.registerEase(GSAP_EASE_OUT, easeOut);
}
