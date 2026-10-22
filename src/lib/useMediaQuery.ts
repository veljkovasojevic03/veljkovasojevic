"use client";

import { useSyncExternalStore } from "react";

/**
 * Prati media query. Na serveru vraća `serverValue`, pa prvi render
 * uvek odgovara HTML-u.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Na serveru pretpostavlja smanjen pokret, da se efekti ne pale pre hidratacije. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
