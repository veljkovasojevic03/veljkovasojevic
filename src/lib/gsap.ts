"use client";

/**
 * Jedno mesto za GSAP. Učitava se naknadno (poseban paket, posle hidratacije),
 * da ne usporava prvo crtanje stranice; pluginovi i naše krive se registruju jednom.
 * Komponente ga dobijaju preko useGsap(), ne uvoze paket direktno.
 */
import { useEffect, useState } from "react";
import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerPlugin } from "gsap/ScrollTrigger";
import type { Flip as FlipPlugin } from "gsap/Flip";
import { registerGsapEase } from "./motion";

export type GsapKit = {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerPlugin;
  Flip: typeof FlipPlugin;
};

let kit: Promise<GsapKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  kit ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/Flip")]).then(
    ([core, scroll, flip]) => {
      core.gsap.registerPlugin(flip.Flip, scroll.ScrollTrigger);
      registerGsapEase(core.gsap);
      return { gsap: core.gsap, ScrollTrigger: scroll.ScrollTrigger, Flip: flip.Flip };
    },
  );
  return kit;
}

/** GSAP kad stigne (null do tada); efekti koji ga koriste čekaju na njega. */
export function useGsap(): GsapKit | null {
  const [value, setValue] = useState<GsapKit | null>(null);
  useEffect(() => {
    let alive = true;
    void loadGsap().then((loaded) => {
      if (alive) setValue(loaded);
    });
    return () => {
      alive = false;
    };
  }, []);
  return value;
}
