import type { Locale } from "@/i18n/routing";
import { sectionIds, ui, work } from "@/content/site";
import { projects } from "@/content/projects";
import { videoSources } from "@/lib/media";
import { WorkRows, type WorkItem } from "@/components/work/WorkRows";

/** Lista radova: redovi sa plutajućim pregledom na računaru, kartice na telefonu. */
export function WorkList({ locale }: { locale: Locale }) {
  const items: WorkItem[] = projects.map((project) => ({
    slug: project.slug,
    number: project.number,
    name: project.name,
    line: project.line[locale],
    tags: project.tags[locale],
    frame: project.frame,
    sources: videoSources(project.slug),
  }));

  return (
    <section
      id={sectionIds.work}
      aria-labelledby="work-title"
      className="border-b border-line py-(--section-y)"
    >
      <div className="wrap">
        <h2 id="work-title" className="display text-h2">
          {work.title[locale]}
        </h2>
        <WorkRows
          items={items}
          labels={{
            details: work.details[locale],
            preview: work.previewLabel[locale],
            placeholder: ui.placeholders.video[locale],
          }}
        />
      </div>
    </section>
  );
}
