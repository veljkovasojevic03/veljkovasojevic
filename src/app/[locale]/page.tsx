import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hero } from "@/content/site";

// Privremena početna (faza 0). Prave sekcije dolaze u fazi 1.
export default async function HomePage() {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  const { prefix, words, suffix } = hero.headline;

  return (
    <main className="wrap py-24">
      <p className="eyebrow">{hero.eyebrow[locale]}</p>
      <h1 className="display mt-7 max-w-[15ch] text-hero">
        {prefix[locale]} <span className="text-energy">{words[locale][0]}</span>
        {suffix[locale]}
      </h1>
      <p className="mt-7 max-w-[52ch] text-lede text-muted">{hero.sub[locale]}</p>
    </main>
  );
}
