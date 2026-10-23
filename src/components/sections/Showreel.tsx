import type { Locale } from "@/i18n/routing";
import { sectionIds, ui } from "@/content/site";
import { videoSources } from "@/lib/media";
import { ShowreelScene } from "@/components/scroll/ShowreelScene";

/** Showreel; video iz public/media/showreel.*, dok ga nema prikazuje se privremeni kadar. */
export function Showreel({ locale }: { locale: Locale }) {
  return (
    <ShowreelScene
      id={sectionIds.showreel}
      label={ui.showreelLabel[locale]}
      placeholder={ui.placeholders.showreel[locale]}
      video={videoSources("showreel")}
    />
  );
}
