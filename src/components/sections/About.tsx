import type { Locale } from "@/i18n/routing";
import { about, sectionIds, ui } from "@/content/site";
import { Placeholder } from "@/components/ui/BrowserFrame";
import { Rich } from "@/components/ui/Rich";

/** O meni (kartica koja se okreće i prsten dolaze u fazi 7). */
export function About({ locale }: { locale: Locale }) {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className="border-b border-line py-(--section-y)"
    >
      <div className="wrap">
        <h2 id="about-title" className="eyebrow">
          {about.title[locale]}
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:items-center">
          <div className="relative mx-auto aspect-4/5 w-full max-w-[440px] overflow-hidden rounded-xl border border-line-2">
            <Placeholder label={ui.placeholders.photo[locale]} />
          </div>

          <div className="grid max-w-[60ch] gap-6 text-lede leading-[1.7] text-muted">
            {about.paragraphs[locale].map((paragraph, i) => (
              <p key={i}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </div>

        {/* Mesto za opcioni 3D sto (faza 11), bez koda. */}
      </div>
    </section>
  );
}
