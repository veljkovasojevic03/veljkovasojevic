import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  // SR živi na "/", EN na "/en".
  localePrefix: "as-needed",
  // "/" je uvek srpski; jezik bira posetilac, ne zaglavlje browsera.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/design": "/design",
    "/work/[slug]": {
      sr: "/radovi/[slug]",
      en: "/work/[slug]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

/** Vrednost za `<html lang>`: srpski je latinica. */
export const htmlLang: Record<Locale, string> = {
  sr: "sr-Latn",
  en: "en",
};
