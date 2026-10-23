"use client";

import type Lenis from "lenis";

/**
 * Pristup Lenis instanci van React stabla (npr. popup u fazi 5 zaustavlja skrol).
 * Na dodir i uz smanjen pokret Lenis ne postoji, pa su funkcije tada bez efekta;
 * izvorni skrol tada zaključava Radix Dialog.
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null): void {
  instance = lenis;
}

export function stopScroll(): void {
  instance?.stop();
}

export function startScroll(): void {
  instance?.start();
}
