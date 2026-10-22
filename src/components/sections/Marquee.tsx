import type { Locale } from "@/i18n/routing";
import { marquee, marqueeSeparator } from "@/content/site";

/** Trak, statičan (kretanje uz skrol dolazi u fazi 6). */
export function Marquee({ locale }: { locale: Locale }) {
  const items = marquee[locale];
  // Dovoljno ponavljanja da red ispuni i širok ekran.
  const repeated = Array.from({ length: 4 }, () => items).flat();

  return (
    <div className="overflow-hidden border-b border-line py-8">
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden="true" className="display flex w-max gap-8 text-h2 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            {item}
            <span className="text-muted">{marqueeSeparator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
