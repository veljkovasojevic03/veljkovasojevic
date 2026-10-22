import type { Locale } from "@/i18n/routing";
import { chargedSentence } from "@/content/site";

/** Rečenica sa strujom. Dok tekst ne postoji, sekcija se ne renderuje. */
export function ChargedSentence({ locale }: { locale: Locale }) {
  const text = chargedSentence[locale];
  if (!text) return null;

  return (
    <section className="border-b border-line py-(--section-y)">
      <div className="wrap">
        <p className="display max-w-[18ch] text-h2">{text}</p>
      </div>
    </section>
  );
}
