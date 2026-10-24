import type { Locale } from "@/i18n/routing";
import { footer, sectionIds, ui } from "@/content/site";
import { links } from "@/content/links";
import { EmailLink } from "@/components/ui/EmailLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { FooterName } from "@/components/footer/FooterName";
import { HeroBackground } from "@/components/hero/HeroBackground";

type FooterLink = { label: string; href: string };

/** Podnožje: poziv, mejl (kopiranje + mailto), linkovi, VASOJEVIĆ sa munjama. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const { columns, linkLabels } = footer;
  const external = (label: string, href: string): FooterLink => ({ label, href });

  return (
    <footer
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden pt-(--section-y) pb-6"
    >
      {/* Ista mreža i struja kao u hero-u: stranica počinje i završava se istim prizorom. */}
      <HeroBackground />
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 id="contact-title" className="display max-w-[16ch] text-h2">
              {footer.cta[locale]}
            </h2>
            <div className="mt-8 border-b border-line-2 pb-3">
              <EmailLink className="display text-[clamp(18px,2.2vw,26px)] tracking-[-0.02em]" />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CopyEmailButton
                label={footer.copyEmail[locale]}
                copiedLabel={footer.copied[locale]}
                className="btn btn-primary"
              />
              <EmailLink className="btn btn-ghost">{footer.sendEmail[locale]}</EmailLink>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <FooterColumn title={columns.contact[locale]}>
                <ExternalItem link={external(linkLabels.linkedin[locale], links.linkedin)} locale={locale} />
              </FooterColumn>
              <FooterColumn title={columns.work[locale]}>
                <ExternalItem link={external(linkLabels.github[locale], links.github)} locale={locale} />
                <ExternalItem link={external(linkLabels.webflow[locale], links.webflow)} locale={locale} />
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="mt-[clamp(48px,8vh,96px)]">
          <FooterName name={footer.giantName} />
        </div>

        <div className="mono mt-6 flex flex-wrap justify-between gap-3 border-t border-line pt-5 text-muted">
          <p>{footer.bottom.copyright[locale]}</p>
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
