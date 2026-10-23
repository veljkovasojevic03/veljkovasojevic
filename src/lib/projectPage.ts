import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getProject, projects, type Project } from "@/content/projects";

/** Svih pet slugova (jezik dolazi iz [locale] layout-a). */
export function projectStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Jezik i projekat za stranicu ili popup; nepostojeći slug je 404. */
export async function loadProject(
  params: Promise<{ slug: string }>,
): Promise<{ locale: Locale; project: Project }> {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = getProject((await params).slug);
  if (!project) notFound();
  return { locale, project };
}

/** Naslov, opis i hreflang adrese projekta (/radovi/<slug> i /en/work/<slug>). */
export async function projectMetadata(params: Promise<{ slug: string }>): Promise<Metadata> {
  const { locale, project } = await loadProject(params);
  const pathFor = (l: Locale) =>
    getPathname({ locale: l, href: { pathname: "/work/[slug]", params: { slug: project.slug } } });

  return {
    title: project.name,
    description: project.line[locale],
    alternates: {
      canonical: pathFor(locale),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, pathFor(l)])),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
    openGraph: { type: "article", title: project.name, description: project.line[locale] },
  };
}
