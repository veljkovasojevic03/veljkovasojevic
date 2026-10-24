import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { siteUrl } from "@/content/links";
import { projects } from "@/content/projects";

type Href = Parameters<typeof getPathname>[0]["href"];

/** Jedan unos po stranici; drugi jezik ide kao hreflang alternativa. */
function entry(href: Href, priority: number): MetadataRoute.Sitemap[number] {
  const url = (locale: Locale) => `${siteUrl}${getPathname({ locale, href })}`;
  return {
    url: url(routing.defaultLocale),
    priority,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((locale) => [locale, url(locale)])),
    },
  };
}

/** /design je interna stranica i nije u mapi sajta. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("/", 1),
    ...projects.map((project) =>
      entry({ pathname: "/work/[slug]", params: { slug: project.slug } }, 0.7),
    ),
  ];
}
