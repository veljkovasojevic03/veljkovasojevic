import type { Locale } from "@/i18n/routing";
import { hero, sectionIds } from "@/content/site";
import { FlipWord } from "@/components/hero/FlipWord";
import { HeroBackground } from "@/components/hero/HeroBackground";

export function Hero({ locale }: { locale: Locale }) {
  const { prefix, words, suffix } = hero.headline;

  return (
    <section
      id={sectionIds.top}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden border-b border-line"
    >
      <HeroBackground />
      <div className="wrap pt-[calc(var(--nav-h)+clamp(56px,12vh,130px))] pb-[clamp(72px,12vh,130px)]">
        <p className="eyebrow">{hero.eyebrow[locale]}</p>
        <h1 id="hero-title" className="display mt-7 max-w-[15ch] text-hero [text-wrap:wrap]">
          {/* Čitač ekrana dobija celu rečenicu sa svim rečima. */}
          <span className="sr-only">
            {prefix[locale]} {words[locale].join(", ")}
            {suffix[locale]}
          </span>
          <span aria-hidden="true">
            {/* Reč stoji u svom redu (kao na design/hero.png), pa smena ne prelama rečenicu. */}
            {prefix[locale]}
            <br />
            <FlipWord words={words[locale]} />
            {suffix[locale]}
          </span>
        </h1>
        <p className="mt-7 max-w-[52ch] text-lede text-muted">{hero.sub[locale]}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`#${sectionIds.work}`} className="btn btn-primary">
            {hero.primaryCta[locale]}
          </a>
          <a href={`#${sectionIds.contact}`} className="btn btn-ghost">
            {hero.contactCta[locale]}
          </a>
        </div>
      </div>
    </section>
  );
}
