"use client";

import { useSyncExternalStore } from "react";
import { email } from "@/content/links";

const subscribe = () => () => {};

/**
 * Mejl se sastavlja tek u browseru, da adresa ne stoji u HTML-u za botove.
 * Pre toga se drži prazno mesto iste širine, bez pomeranja rasporeda.
 */
export function EmailLink({
  className,
  children,
}: {
  className?: string;
  /** Tekst linka; bez njega se prikazuje sama adresa. */
  children?: React.ReactNode;
}) {
  const address = useSyncExternalStore(
    subscribe,
    () => `${email.user}@${email.domain}`,
    () => null,
  );

  if (!address) {
    return (
      <span className={className} aria-hidden="true">
        <span className="invisible">{children ?? "x".repeat(email.user.length + email.domain.length + 1)}</span>
      </span>
    );
  }

  return (
    <a href={`mailto:${address}`} className={className}>
      {children ?? address}
    </a>
  );
}
