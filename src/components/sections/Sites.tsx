import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import { sectionIds, sitesSection, ui } from "@/content/site";
import { demoSites, webflowCard } from "@/content/sites";
import { imageSource } from "@/lib/media";
import { BrowserFrame, Placeholder } from "@/components/ui/BrowserFrame";

/** Sajtovi za firme: snimci iz public/media/sites (npm run screenshots). */
export function Sites({ locale }: { locale: Locale }) {
  const shot = ui.siteShot;

  return (
    <section
      id={sectionIds.sites}
      aria-labelledby="sites-title"
      className="border-b border-line py-(--section-y)"
    >
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 id="sites-title" className="display text-h2">
            {sitesSection.title[locale]}
          </h2>
          <p className="max-w-[52ch] text-lede text-muted">{sitesSection.text[locale]}</p>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {demoSites.map((site) => {
            const title = site.detail
              ? `${site.name[locale]}, ${site.detail[locale]}`
              : site.name[locale];
            const desktop = imageSource(`sites/${site.slug}-desktop`);
            const mobile = imageSource(`sites/${site.slug}-mobile`);
            return (
              <li
                key={site.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-line-2 bg-bg-2"
              >
                {/* Snimak računara u prozoru; telefon izranja iz donjeg desnog ugla. */}
                <div className="relative overflow-hidden p-4 pb-0 sm:p-6 sm:pb-0">
                  <BrowserFrame aspect="16 / 10" className="rounded-b-none border-b-0">
                    {desktop ? (
                      <Image
                        src={desktop}
                        alt={`${shot.prefix[locale]} ${title}, ${shot.desktop[locale]}`}
                        fill
                        sizes="(min-width: 1200px) 540px, (min-width: 1024px) 45vw, 100vw"
                        className="object-cover object-top"
                      />
                    ) : (
                      <Placeholder label={`${ui.placeholders.screenshot[locale]} · ${title}`} />
                    )}
                  </BrowserFrame>

                  {mobile && (
                    <div className="absolute right-[7%] -bottom-[18%] w-[22%] max-w-[136px] min-w-[76px] rounded-[20px] border border-line-2 bg-bg p-1 shadow-frame transition-transform duration-(--dur-fast) ease-out group-hover:-translate-y-2 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                      <div className="relative aspect-390/844 overflow-hidden rounded-[16px]">
                        <Image
                          src={mobile}
                          alt={`${shot.prefix[locale]} ${title}, ${shot.mobile[locale]}`}
                          fill
                          sizes="136px"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative grid flex-1 items-end gap-4 border-t border-line bg-bg-2 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:p-6">
                  <div className="min-w-0">
                    <h3 className="display text-[clamp(22px,2.4vw,30px)] leading-[1.1]">{title}</h3>
                    <span className="tag mt-3">{site.badge[locale]}</span>
                  </div>
                  <a href={site.href} target="_blank" rel="noopener" className="btn btn-ghost justify-self-start">
                    {site.cta[locale]}
                    <span className="sr-only"> {ui.externalLink[locale]}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line-2 bg-bg-2 p-5 sm:p-6">
          <div>
            <h3 className="display text-[clamp(22px,2.4vw,30px)] leading-[1.1]">
              {webflowCard.name[locale]}
            </h3>
            <p className="mt-1 text-small text-muted">{webflowCard.text[locale]}</p>
          </div>
          <a href={webflowCard.href} target="_blank" rel="noopener" className="btn btn-ghost">
            {webflowCard.cta[locale]}
            <span className="sr-only"> {ui.externalLink[locale]}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
