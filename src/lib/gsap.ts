"use client";

/**
 * Jedno mesto za GSAP: pluginovi i naše krive se registruju jednom.
 * Komponente uvoze gsap odavde, ne direktno iz paketa.
 */
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { registerGsapEase } from "./motion";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  gsap.registerPlugin(Flip);
  registerGsapEase(gsap);
  registered = true;
}

export { gsap, Flip };
