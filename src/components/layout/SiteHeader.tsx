"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { nav, sectionIds, ui } from "@/content/site";
import { VVMark } from "@/components/brand/VVMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";

/** Pomeraj (px) posle kog se meni sakriva pri skrolu na dole. */
const HIDE_AFTER = 80;
const MIN_DELTA = 4;

export type NavItem = { href: string; label: string };

export function SiteHeader() {
  const locale = useLocale() as Locale;
  const headerRef = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const home = getPathname({ locale, href: "/" });
  const items: NavItem[] = [
    { href: `${home}#${sectionIds.work}`, label: nav.work[locale] },
    { href: `${home}#${sectionIds.about}`, label: nav.about[locale] },
    { href: `${home}#${sectionIds.contact}`, label: nav.contact[locale] },
  ];
  const ctaHref = `${home}#${sectionIds.contact}`;

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < MIN_DELTA) return;
      // Ne sakrivaj meni dok je fokus tastature u njemu.
      const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
      setHidden(delta > 0 && y > HIDE_AFTER && !focusInside);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const isHidden = hidden && !menuOpen;

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/70 backdrop-blur-md transition-transform ease-out motion-reduce:transition-none"
      style={{
        transform: isHidden ? "translateY(-100%)" : "translateY(0)",
        // Vraćanje je odgovor na skrol nagore pa je brzo; sakrivanje može sporije.
        transitionDuration: isHidden ? "var(--dur-medium)" : "var(--dur-fast)",
      }}
    >
      <div className="wrap flex h-(--nav-h) items-center justify-between gap-4">
        <a href={home} aria-label={ui.homeLabel[locale]} className="-m-2 p-2">
          <VVMark data-vv-target className="block h-auto w-10" />
        </a>

        <nav aria-label={ui.mainNav[locale]} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[15px]">
            {items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch className="hidden md:flex" />
          <a href={ctaHref} className="btn btn-primary btn-sm">
            {nav.cta[locale]}
          </a>
          <MobileMenu
            items={items}
            open={menuOpen}
            onOpenChange={setMenuOpen}
            locale={locale}
          />
        </div>
      </div>
    </header>
  );
}
