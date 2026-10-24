"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { cubicBezier } from "@/lib/motion";
import { INTRO_ATTR, INTRO_KEY } from "./introBoot";
import { V1, V2, VV_GAP, VV_VIEWBOX_ATTR } from "./vvGeometry";

/**
 * Tajming i krive su preneti 1:1 iz design/stil-poredjenje.html (Veljko ga je
 * odobrio). Uvod je namerni izuzetak od tokena pokreta (DEFINICIJA, odeljak 5).
 */
const T = {
  draw: 0.6,
  drawLag: 0.12,
  fillAt: 0.74,
  gap: 0.2,
  fillV1: 0.26,
  fillV2: 0.46,
  flyAt: 1.12,
  fly: 0.62,
  curtain: 0.7,
  curtainLag: 0.06,
} as const;

/** Iscrtavanje: linija se vidljivo vuče (spor početak, mekan kraj). */
const DRAW_EASE = cubicBezier(0.5, 0, 0.2, 1);
/** Let znaka i zavesa. */
const MOVE_EASE = cubicBezier(0.7, 0, 0.2, 1);
/** Punjenje i sjaj. */
const FILL_EASE = cubicBezier(0, 0, 0.58, 1);

/**
 * Uvod: struja iscrta oba V (iskra vodi liniju) → drugo V se napuni uz
 * bljesak → ekran se razdvoji kao zavesa dok znak sleće na logo u meniju.
 * Sloj je preko sadržaja; tekst je u HTML-u od početka.
 */
export function Intro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const kit = useGsap();

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (!kit || !root || !html.hasAttribute(INTRO_ATTR)) return;
    const { gsap, Flip } = kit;

    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Bez sessionStorage-a uvod se samo ponovi sledeći put.
    }

    const finish = () => html.removeAttribute(INTRO_ATTR);
    const target = document.querySelector<SVGElement>("[data-vv-target]");
    const q = gsap.utils.selector(root);
    const styles = getComputedStyle(html);
    const energy = styles.getPropertyValue("--energy").trim();
    const energyHot = styles.getPropertyValue("--energy-hot").trim();
    const text = styles.getPropertyValue("--text").trim();
    const glow = (blur: number, alpha: number) =>
      `drop-shadow(0 0 ${blur}px rgba(${styles.getPropertyValue("--energy-rgb").trim()}, ${alpha}))`;

    // Sve u gsap.context: čišćenje vraća inline stilove, pa ponovno pokretanje
    // efekta (React StrictMode u razvoju) kreće od čistog stanja.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish });

      // 1) Iscrtavanje kontura; iskra ima istu krivu kao linija, pa vodi njen vrh.
      q<SVGPathElement>("[data-draw]").forEach((path, i) => {
        tl.fromTo(
          path,
          { strokeDashoffset: 1 },
          // autoRound: false — putanja ima dužinu 1, pa GSAP-ovo zaokruživanje na px brisalo bi animaciju.
          { strokeDashoffset: 0, duration: T.draw, ease: DRAW_EASE, autoRound: false },
          i * T.drawLag,
        );
      });
      q<SVGPathElement>("[data-spark]").forEach((path, i) => {
        tl.fromTo(
          path,
          { strokeDashoffset: 0.035, opacity: 1 },
          { strokeDashoffset: -0.965, duration: T.draw, ease: DRAW_EASE, autoRound: false },
          i * T.drawLag,
        ).set(path, { opacity: 0 }, i * T.drawLag + T.draw);
      });

      // 2) Punjenje: prvo V tiho, drugo V bljesne strujom i zadrži blag sjaj.
      tl.to(q("[data-gap]"), { opacity: 1, duration: T.gap, ease: FILL_EASE }, T.fillAt)
        .fromTo(
          q("[data-v1]"),
          { fill: "rgba(237,237,240,0)" },
          { fill: text, duration: T.fillV1, ease: FILL_EASE },
          T.fillAt,
        )
        .fromTo(
          q("[data-v2]"),
          { fill: "rgba(0,0,0,0)", filter: glow(0, 0) },
          {
            keyframes: [
              { fill: energyHot, filter: glow(16, 1), duration: T.fillV2 * 0.3 },
              { fill: energy, filter: glow(4, 1), duration: T.fillV2 * 0.7 },
            ],
            ease: FILL_EASE,
          },
          T.fillAt,
        );

      // 3) Znak sleće na logo u meniju, zavesa se razdvaja.
      if (target) {
        tl.add(
          Flip.fit(q("[data-mark]")[0], target, {
            scale: true,
            duration: T.fly,
            ease: MOVE_EASE,
          }) as gsap.core.Tween,
          T.flyAt,
        );
      }
      tl.to(q("[data-half='l']"), { xPercent: -101, duration: T.curtain, ease: MOVE_EASE }, T.flyAt + T.curtainLag)
        .to(q("[data-half='r']"), { xPercent: 101, duration: T.curtain, ease: MOVE_EASE }, T.flyAt + T.curtainLag);
    }, root);

    // Bez finish() ovde: skidanje atributa bi drugom pokretanju efekta javilo da
    // uvoda nema. Uvod završava kraj animacije, a CSS osigurač posle 4 s.
    return () => ctx.revert();
  }, [kit]);

  return (
    <div ref={rootRef} className="intro" aria-hidden="true">
      <div data-half="l" className="intro-half left-0" />
      <div data-half="r" className="intro-half right-0" />
      <div className="absolute inset-0 grid place-items-center">
        <div data-mark className="w-[clamp(130px,22vw,200px)]">
        <svg viewBox={VV_VIEWBOX_ATTR} className="block h-auto w-full overflow-visible">
          <path data-draw data-v1 d={V1} pathLength={1} className="intro-draw" stroke="var(--text)" />
          <path data-gap d={V2} fill="none" stroke="var(--bg)" strokeWidth={VV_GAP} opacity={0} />
          <path data-draw data-v2 d={V2} pathLength={1} className="intro-draw" stroke="var(--energy)" />
          <path data-spark d={V1} pathLength={1} className="intro-spark" />
          <path data-spark d={V2} pathLength={1} className="intro-spark" />
        </svg>
        </div>
      </div>
    </div>
  );
}
