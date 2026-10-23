/**
 * Sajtovi za firme (SR: sadrzaj/tekstovi-nacrt.md, EN: sadrzaj/en.md).
 * Snimci ekrana: public/media/sites/<slug>-{desktop,mobile}.*
 */
import { links } from "./links";
import type { LText } from "./types";

export type DemoSite = {
  slug: "djak" | "borivoje";
  name: LText;
  /** Drugi deo naslova posle zareza (mesto ili vlasnik). */
  detail: LText | null;
  badge: LText;
  href: string;
  cta: LText;
};

const demoBadge: LText = {
  sr: "samoinicijativni demo",
  en: "self-initiated demo",
};

const openSite: LText = { sr: "Otvori sajt ↗", en: "Open site ↗" };

export const demoSites: DemoSite[] = [
  {
    slug: "djak",
    name: { sr: "Đak Food Store", en: "Đak Food Store" },
    detail: { sr: "Čačak", en: "Čačak" },
    badge: demoBadge,
    href: "https://djak.vercel.app",
    cta: openSite,
  },
  {
    // Bratov portfolio (umesto Pribojske Banje, koja je lokalni sajt; 23. 10. 2026).
    slug: "borivoje",
    name: { sr: "Portfolio", en: "Portfolio" },
    detail: { sr: "Borivoje Vasojević", en: "Borivoje Vasojević" },
    badge: { sr: "lični portfolio", en: "personal portfolio" },
    href: "https://borivojevasojevic.vercel.app",
    cta: openSite,
  },
];

export const webflowCard = {
  name: { sr: "Webflow radovi", en: "Webflow work" },
  text: {
    sr: "5 starijih sajtova u Webflow-u",
    en: "5 earlier sites built in Webflow",
  },
  href: links.webflow,
  cta: { sr: "Otvori ↗", en: "Open ↗" },
} satisfies {
  name: LText;
  text: LText;
  href: string;
  cta: LText;
};
