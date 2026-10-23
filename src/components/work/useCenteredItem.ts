"use client";

import { useEffect, useState, type RefObject } from "react";
import type { ProjectSlug } from "@/content/projects";

/**
 * Koja kartica (`[data-slug]` unutar liste) prelazi sredinu ekrana.
 * Uska traka oko sredine znači da je najviše jedna aktivna, pa svira samo jedan video.
 */
export function useCenteredItem(
  listRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): ProjectSlug | null {
  const [active, setActive] = useState<ProjectSlug | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!enabled || !list) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setActive((current) => {
          let next = current;
          // Prvo izlasci, pa ulasci: kad se kartice smene u istom okviru, pobeđuje nova.
          for (const entry of entries) {
            const slug = (entry.target as HTMLElement).dataset.slug as ProjectSlug;
            if (!entry.isIntersecting && slug === next) next = null;
          }
          for (const entry of entries) {
            if (entry.isIntersecting) next = (entry.target as HTMLElement).dataset.slug as ProjectSlug;
          }
          return next;
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );

    list.querySelectorAll<HTMLElement>("[data-slug]").forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [listRef, enabled]);

  return enabled ? active : null;
}
