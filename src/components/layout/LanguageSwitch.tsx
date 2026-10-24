"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { ui } from "@/content/site";

type Props = {
  className?: string;
};

/** Sekcija koja je trenutno pri vrhu ekrana (da je novi jezik otvori na istom mestu). */
function currentSectionHash(): string {
  const line = window.innerHeight * 0.35;
  let current = "";
  document.querySelectorAll<HTMLElement>("main section[id], footer[id]").forEach((el) => {
    if (el.getBoundingClientRect().top <= line) current = el.id;
  });
  return current && window.scrollY > 0 ? `#${current}` : "";
}

/** SR/EN prekidač u meniju. */
export function LanguageSwitch({ className }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();

  const hrefFor = (target: Locale) =>
    getPathname({
      locale: target,
      // pathname je interna šema (npr. /work/[slug]); params popunjava segmente.
      href: { pathname, params } as Parameters<typeof getPathname>[0]["href"],
    });

  // Hash se dodaje u trenutku klika, jer zavisi od skrola.
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = currentSectionHash();
    if (hash) event.currentTarget.href = event.currentTarget.href.split("#")[0] + hash;
  };

  return (
    <div
      role="group"
      aria-label={ui.languageLabel[locale]}
      className={`flex items-center rounded-pill border border-line p-[3px] ${className ?? ""}`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <a
            key={l}
            href={hrefFor(l)}
            hrefLang={l}
            lang={l}
            onClick={onClick}
            aria-current={active ? "true" : undefined}
            aria-label={ui.languageNames[l][locale]}
            className={`mono grid h-8 min-w-10 place-items-center rounded-pill px-2.5 uppercase transition-colors duration-(--dur-fast) ${
              active ? "bg-line-2 text-text" : "text-muted hover:text-text"
            }`}
          >
            {l}
          </a>
        );
      })}
    </div>
  );
}
