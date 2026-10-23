"use client";

/**
 * Red liste koji je otvorio popup. Popup se zatvara tek posle router.back(), pa
 * Radix ne stigne sam da vrati fokus; vraća ga ProjectModal. Pamti se slug, ne
 * element: posle „Nazad“ Next.js može da prikaže drugu kopiju liste.
 */
let triggerSlug: string | null = null;

/** Atribut na linku reda u listi radova. */
export const TRIGGER_ATTR = "data-project-link";

export function rememberTrigger(slug: string): void {
  triggerSlug = slug;
}

export function restoreFocus(): void {
  // Dok je neki dijalog vidljiv, fokus pripada njemu.
  const dialogOpen = [...document.querySelectorAll("[role=dialog]")].some((d) => d.checkVisibility());
  if (!triggerSlug || dialogOpen) return;
  const match = [...document.querySelectorAll<HTMLElement>(`[${TRIGGER_ATTR}="${triggerSlug}"]`)].find((el) =>
    el.checkVisibility(),
  );
  match?.focus({ preventScroll: true });
}
