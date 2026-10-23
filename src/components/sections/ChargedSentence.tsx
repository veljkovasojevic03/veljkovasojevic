import type { Locale } from "@/i18n/routing";
import { chargedSentence } from "@/content/site";
import { ChargedText } from "@/components/scroll/ChargedText";

/** Rečenica sa strujom. Dok tekst ne postoji, sekcija se ne renderuje. */
export function ChargedSentence({ locale }: { locale: Locale }) {
  const text = chargedSentence[locale];
  if (!text) return null;

  return (
    <section className="border-b border-line py-[clamp(96px,18vh,200px)]">
      <div className="wrap">
        <ChargedText text={text} className="charged display max-w-[18ch] text-h2" />
      </div>
    </section>
  );
}
