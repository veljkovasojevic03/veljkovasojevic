import type { Locale } from "@/i18n/routing";
import { sectionIds, ui } from "@/content/site";
import { BrowserFrame, Placeholder } from "@/components/ui/BrowserFrame";

/** Mesto za showreel (širenje pri skrolu dolazi u fazi 4). */
export function Showreel({ locale }: { locale: Locale }) {
  return (
    <section
      id={sectionIds.showreel}
      aria-label={ui.showreelLabel[locale]}
      className="py-(--section-y)"
    >
      <div className="wrap">
        <BrowserFrame aspect="16 / 9" className="mx-auto max-w-[960px]">
          <Placeholder label={ui.placeholders.showreel[locale]} />
        </BrowserFrame>
      </div>
    </section>
  );
}
