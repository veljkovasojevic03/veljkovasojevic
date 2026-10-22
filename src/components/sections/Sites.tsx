import type { Locale } from "@/i18n/routing";
import { sectionIds, sitesSection, ui } from "@/content/site";
import { demoSites, webflowCard } from "@/content/sites";
import { BrowserFrame, Placeholder } from "@/components/ui/BrowserFrame";

/** Sajtovi za firme (snimci ekrana dolaze u fazi 6). */
export function Sites({ locale }: { locale: Locale }) {
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
            const title = site.place
              ? `${site.name[locale]}, ${site.place[locale]}`
              : site.name[locale];
            return (
              <li
                key={site.slug}
                className="flex flex-col overflow-hidden rounded-xl border border-line-2 bg-bg-2"
              >
                <div className="p-4 pb-0 sm:p-6 sm:pb-0">
                  <BrowserFrame aspect="16 / 10" className="rounded-b-none border-b-0">
                    <Placeholder label={`${ui.placeholders.screenshot[locale]} · ${title}`} />
                  </BrowserFrame>
                </div>
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line p-5 sm:p-6">
                  <div className="min-w-0">
                    <h3 className="display text-[clamp(22px,2.4vw,30px)] leading-[1.1]">{title}</h3>
                    <span className="tag mt-3">{site.badge[locale]}</span>
                  </div>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-ghost"
                  >
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
