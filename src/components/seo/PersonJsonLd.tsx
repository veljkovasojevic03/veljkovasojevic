import type { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { links, siteUrl } from "@/content/links";
import { about, seo } from "@/content/site";

/**
 * Strukturisani podaci (schema.org Person). Samo ono što već piše na sajtu;
 * mejl namerno nije tu (sastavlja se u browseru, skriven od botova).
 */
export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: about.card.name[locale],
    url: `${siteUrl}${getPathname({ locale, href: "/" })}`,
    image: `${siteUrl}/${locale}/opengraph-image`,
    description: seo.description[locale],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: seo.alumniOf,
    },
    sameAs: [links.github, links.linkedin, links.webflow],
  };

  return (
    <script
      type="application/ld+json"
      // < se escape-uje da tekst ne može da zatvori <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
