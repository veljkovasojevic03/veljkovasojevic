/**
 * Sajtovi za firme (SR: sadrzaj/tekstovi-nacrt.md, EN: sadrzaj/en.md).
 * Snimci ekrana: public/media/sites/<slug>-{desktop,mobile}.*
 */
import { links } from "./links";
import type { LText } from "./types";

export type DemoSite = {
  slug: "djak" | "pribojska-banja";
  name: LText;
  place: LText | null;
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
    place: { sr: "Čačak", en: "Čačak" },
    badge: demoBadge,
    href: "https://djak.vercel.app",
    cta: openSite,
  },
  {
    slug: "pribojska-banja",
    name: { sr: "Privatni smeštaj", en: "Private accommodation" },
    place: { sr: "Pribojska Banja", en: "Pribojska Banja" },
    badge: demoBadge,
    href: "https://pribojska-banja.com",
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
