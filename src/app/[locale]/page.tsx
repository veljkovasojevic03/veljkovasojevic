import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { sectionIds } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { ChargedSentence } from "@/components/sections/ChargedSentence";
import { Showreel } from "@/components/sections/Showreel";
import { WorkList } from "@/components/sections/WorkList";
import { Marquee } from "@/components/sections/Marquee";
import { Sites } from "@/components/sections/Sites";
import { About } from "@/components/sections/About";
import { HowIWork } from "@/components/sections/HowIWork";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) return {};

  const pathFor = (l: (typeof routing.locales)[number]) => getPathname({ locale: l, href: "/" });

  return {
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
  };
}

export default async function HomePage() {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <PersonJsonLd locale={locale} />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <Hero locale={locale} />
        <ChargedSentence locale={locale} />
        <Showreel locale={locale} />
        <WorkList locale={locale} />
        <Marquee locale={locale} />
        <Sites locale={locale} />
        <About locale={locale} />
        <HowIWork locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
