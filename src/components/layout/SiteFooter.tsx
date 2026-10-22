import type { Locale } from "@/i18n/routing";
import { footer, sectionIds, ui } from "@/content/site";
import { links } from "@/content/links";
import { EmailLink } from "@/components/ui/EmailLink";
import { LanguageSwitch } from "./LanguageSwitch";

type FooterLink = { label: string; href: string };

/** Podnožje bez efekata (kopiranje mejla i munje dolaze u fazi 8). */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { columns, linkLabels } = footer;
  const external = (label: string, href: string): FooterLink => ({ label, href });

  return (
    <footer
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="overflow-hidden pt-(--section-y) pb-6"
    >
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 id="contact-title" className="display max-w-[16ch] text-h2">
              {footer.cta[locale]}
            </h2>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-line-2 pb-3">
              <EmailLink className="display text-[clamp(18px,2.2vw,26px)] font-semibold tracking-[-0.02em]" />
              {/* Kopiranje se uključuje u fazi 8. */}
              <button type="button" className="mono uppercase text-muted">
                {footer.copy[locale]}
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              <FooterColumn title={columns.contact[locale]}>
                <li>
                  <EmailLink className="link">{linkLabels.email[locale]}</EmailLink>
                </li>
                <ExternalItem link={external(linkLabels.linkedin[locale], links.linkedin)} locale={locale} />
              </FooterColumn>
              <FooterColumn title={columns.work[locale]}>
                <ExternalItem link={external(linkLabels.github[locale], links.github)} locale={locale} />
                <ExternalItem link={external(linkLabels.webflow[locale], links.webflow)} locale={locale} />
              </FooterColumn>
              <FooterColumn title={columns.language[locale]}>
                <li>
                  <LanguageSwitch variant="link" linkLabel={linkLabels.otherLanguage[locale]} className="link" />
                </li>
              </FooterColumn>
            </div>
            <a
              href={links.siteSource}
              target="_blank"
              rel="noopener"
              className="mt-10 inline-block text-[15px] text-accent"
            >
              {footer.siteSource[locale]}
              <span className="sr-only"> {ui.externalLink[locale]}</span>
            </a>
          </div>
        </div>

        {/* Ime preko cele širine; tačno uklapanje i munje dolaze u fazi 8. */}
        <div className="mt-[clamp(48px,8vh,96px)] [container-type:inline-size]" aria-hidden="true">
          <p className="display text-[16.4cqi] leading-[0.84] font-extrabold whitespace-nowrap text-bg-2 uppercase [-webkit-text-stroke:1px_rgba(var(--energy-rgb),0.22)]">
            {footer.giantName}
          </p>
        </div>

        <div className="mono mt-6 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-muted">
          <p>
            {footer.bottom.copyright[locale]} · {footer.bottom.place[locale]}
          </p>
          <a href={`#${sectionIds.top}`} className="link">
            {footer.bottom.backToTop[locale]}
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mono uppercase text-muted">{title}</h3>
      <ul className="mt-4 grid gap-2 text-[15px]">{children}</ul>
    </div>
  );
}

function ExternalItem({ link, locale }: { link: FooterLink; locale: Locale }) {
  return (
    <li>
      <a href={link.href} target="_blank" rel="noopener" className="link">
        {link.label}
        <span className="sr-only"> {ui.externalLink[locale]}</span>
      </a>
    </li>
  );
}
