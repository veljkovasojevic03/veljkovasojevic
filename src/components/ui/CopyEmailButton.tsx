"use client";

import { useEffect, useRef, useState } from "react";
import { email } from "@/content/links";
import { copyText } from "@/lib/clipboard";

/** Koliko dugo potvrda ostaje vidljiva. */
const CONFIRM_MS = 1800;

type Status = "idle" | "copied" | "failed";

type Props = {
  label: string;
  copiedLabel: string;
  className?: string;
};

/**
 * Kopira mejl jednim klikom. Potvrda se vidi na samom dugmetu i čuje preko
 * čitača ekrana. Ako kopiranje ne uspe, dugme prikaže adresu da se prepiše.
 */
export function CopyEmailButton({ label, copiedLabel, className }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number>(0);
  const address = `${email.user}@${email.domain}`;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = async () => {
    const ok = await copyText(address);
    setStatus(ok ? "copied" : "failed");
    window.clearTimeout(timer.current);
    if (ok) timer.current = window.setTimeout(() => setStatus("idle"), CONFIRM_MS);
  };

  // Obe oznake stoje u istoj ćeliji, pa širina dugmeta ne skače.
  const states: [Status, string][] = [
    ["idle", label],
    ["copied", copiedLabel],
  ];

  return (
    <button type="button" onClick={onClick} className={className}>
      {status === "failed" ? (
        <span className="select-all">{address}</span>
      ) : (
        <span className="grid">
          {states.map(([key, text]) => (
            <span
              key={key}
              aria-hidden={status !== key}
              className="col-start-1 row-start-1 text-center transition-opacity duration-(--dur-fast) ease-out"
              style={{ opacity: status === key ? 1 : 0 }}
            >
              {text}
            </span>
          ))}
        </span>
      )}
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? copiedLabel : ""}
      </span>
    </button>
  );
}
