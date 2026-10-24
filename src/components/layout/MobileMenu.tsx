"use client";

import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Locale } from "@/i18n/routing";
import { footer, nav, ui } from "@/content/site";
import { VVMark } from "@/components/brand/VVMark";
import { LanguageSwitch } from "./LanguageSwitch";
import type { NavItem } from "./SiteHeader";

type Props = {
  items: NavItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
};

/**
 * Meni na telefonu: ceo ekran. Radix Dialog daje zarobljen fokus,
 * Escape, zaključan skrol i povratak fokusa na dugme.
 */
export function MobileMenu({ items, open, onOpenChange, locale }: Props) {
  // Sidro na koje treba skočiti tek kad se meni zatvori (skrol je dotad zaključan).
  const pendingHash = useRef<string | null>(null);

  // Meni postoji samo ispod md; ako se prozor proširi, zatvori ga (i otključaj skrol).
  useEffect(() => {
    if (!open) return;
    const query = window.matchMedia("(min-width: 768px)");
    const close = () => query.matches && onOpenChange(false);
    close();
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, [open, onOpenChange]);

  const onLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const url = new URL(event.currentTarget.href);
    if (url.pathname !== window.location.pathname || !url.hash) return;
    event.preventDefault();
    pendingHash.current = url.hash;
    onOpenChange(false);
  };

  const onCloseAutoFocus = (event: Event) => {
    const hash = pendingHash.current;
    if (!hash) return;
    pendingHash.current = null;
    event.preventDefault();
    window.location.hash = hash;
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        className="btn btn-ghost btn-sm md:hidden"
        aria-label={ui.openMenu[locale]}
      >
        <MenuIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Overlay nosi zaključavanje skrola u Radix Dialogu. */}
        <Dialog.Overlay className="fixed inset-0 z-60 bg-bg md:hidden" />
        <Dialog.Content
          onCloseAutoFocus={onCloseAutoFocus}
          aria-describedby={undefined}
          className="fixed inset-0 z-61 flex flex-col overscroll-contain bg-bg md:hidden"
        >
          <Dialog.Title className="sr-only">{ui.openMenu[locale]}</Dialog.Title>
          <div className="wrap flex h-(--nav-h) items-center justify-between">
            <VVMark className="block h-auto w-10" />
            <Dialog.Close className="btn btn-ghost btn-sm" aria-label={ui.closeMenu[locale]}>
              <CloseIcon />
            </Dialog.Close>
          </div>

          <nav aria-label={ui.mainNav[locale]} className="wrap flex flex-1 flex-col pt-6">
            <ul className="grid gap-2">
              {items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onLinkClick}
                    className="display block py-2 text-[44px] leading-[1.05]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-line py-6">
              <LanguageSwitch />
              <a
                href={items[items.length - 1]?.href}
                onClick={onLinkClick}
                className="btn btn-primary"
              >
                {nav.cta[locale]}
              </a>
            </div>
            <p className="mono pb-6 text-muted">{footer.bottom.copyright[locale]}</p>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
