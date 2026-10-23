import { Suspense } from "react";
import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ui } from "@/content/site";
import { videoSources } from "@/lib/media";
import { loadProject, projectStaticParams } from "@/lib/projectPage";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { ProjectModal } from "@/components/work/ProjectModal";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = projectStaticParams;

// Bez generateMetadata: čitanje sluga u metapodacima blokira prefetch popupa.
// Metapodaci i OG slika projekta su na punoj stranici (work/[slug]).

/**
 * Popup: presreće /radovi/<slug> kad se do njega stigne klikom iz liste.
 * Okvir popupa ne zavisi od sluga, pa se otvara odmah; sadržaj stiže unutra
 * (link ga ionako unapred učita).
 */
export default async function ProjectModalPage({ params }: Props) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <ProjectModal closeLabel={ui.project.close[locale]}>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <ModalBody params={params} />
      </Suspense>
    </ProjectModal>
  );
}

async function ModalBody({ params }: Props) {
  const { locale, project } = await loadProject(params);
  return (
    <ProjectDetail
      project={project}
      locale={locale}
      sources={videoSources(project.slug)}
      variant="modal"
    />
  );
}
