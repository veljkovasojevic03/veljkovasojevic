import type { Locale } from "@/i18n/routing";
import { hero, sectionIds } from "@/content/site";

/** Hero bez efekata (reč koja se menja i pozadina dolaze u fazi 2). */
export function Hero({ locale }: { locale: Locale }) {
  const { prefix, words, suffix } = hero.headline;

  return (
    <section
      id={sectionIds.top}
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line"
    >
      <div className="wrap pt-[calc(var(--nav-h)+clamp(56px,12vh,130px))] pb-[clamp(72px,12vh,130px)]">
        <p className="eyebrow">{hero.eyebrow[locale]}</p>
        <h1 id="hero-title" className="display mt-7 max-w-[15ch] text-hero">
          {prefix[locale]} <span className="text-energy">{words[locale][0]}</span>
          {suffix[locale]}
        </h1>
        <p className="mt-7 max-w-[52ch] text-lede text-muted">{hero.sub[locale]}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a href={`#${sectionIds.work}`} className="btn btn-primary">
            {hero.primaryCta[locale]}
          </a>
          {/* Kopiranje mejla se uključuje u fazi 2. */}
          <button type="button" className="btn btn-ghost">
            {hero.copyEmail[locale]}
          </button>
        </div>
      </div>
    </section>
  );
}
