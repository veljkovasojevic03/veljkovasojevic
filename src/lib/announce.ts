"use client";

/** id jedinog aria-live regiona (LiveRegion u layout-u, van <main>). */
export const LIVE_REGION_ID = "live-region";

/**
 * Najava za čitač ekrana. Region je jedan i stoji na nivou <body>: da je u
 * komponenti, Radix bi ga (i put do njega) ostavio dostupnim iza otvorenog popupa.
 */
export function announce(text: string): void {
  const region = document.getElementById(LIVE_REGION_ID);
  if (!region) return;
  // Prazno pa tekst: ista poruka dva puta zaredom se ponovo pročita.
  region.textContent = "";
  requestAnimationFrame(() => {
    region.textContent = text;
  });
}
