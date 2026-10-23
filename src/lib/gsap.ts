"use client";

/**
 * Jedno mesto za GSAP: pluginovi i naše krive se registruju jednom.
 * Komponente uvoze gsap odavde, ne direktno iz paketa.
 */
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapEase } from "./motion";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(Flip, ScrollTrigger);
  registerGsapEase(gsap);
  registered = true;
}

export { gsap, Flip, ScrollTrigger };
