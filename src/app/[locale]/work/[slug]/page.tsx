import { Suspense } from "react";
import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { sectionIds, ui } from "@/content/site";
import { videoSources } from "@/lib/media";
import { loadProject, projectMetadata, projectStaticParams } from "@/lib/projectPage";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { SiteFooter } from "@/components/layout/SiteFooter";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = projectStaticParams;

export function generateMetadata({ params }: Props) {
  return projectMetadata(params);
}

/**
 * Puna stranica projekta: direktan link ili osvežavanje (klik iz liste otvara popup).
 * Okvir stranice ne zavisi od sluga; sadržaj projekta je u Suspense-u, pa je
 * i prelazak na drugi jezik trenutan.
 */
export default async function ProjectPage({ params }: Props) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <>
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <div className="wrap pt-[calc(var(--nav-h)+48px)] pb-(--section-y)">
          <Link href={{ pathname: "/", hash: sectionIds.work }} className="link mono">
            {ui.project.backToWork[locale]}
          </Link>
          <div className="mt-10">
            <Suspense fallback={<div className="min-h-screen" />}>
              <PageBody params={params} />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

async function PageBody({ params }: Props) {
  const { locale, project } = await loadProject(params);
  return (
    <ProjectDetail
      project={project}
      locale={locale}
      sources={videoSources(project.slug)}
      variant="page"
    />
  );
}
