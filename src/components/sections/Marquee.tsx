import type { Locale } from "@/i18n/routing";
import { marquee, marqueeSeparator } from "@/content/site";
import { ScrollMarquee } from "@/components/scroll/ScrollMarquee";

/** Trak između radova i sajtova; brzina i smer prate skrol. */
export function Marquee({ locale }: { locale: Locale }) {
  return (
    <ScrollMarquee
      items={marquee[locale]}
      separator={marqueeSeparator}
      className="display border-b border-line py-8 text-h2 whitespace-nowrap"
    />
  );
}
