import type { Locale } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { sectionIds, ui, work } from "@/content/site";
import { projects } from "@/content/projects";
import { Placeholder } from "@/components/ui/BrowserFrame";

/** Statična lista radova (pregled uz kursor, kartice i popup dolaze u fazi 5). */
export function WorkList({ locale }: { locale: Locale }) {
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

        <ol className="mt-10 border-t border-line">
          {projects.map((project) => {
            const href = getPathname({
              locale,
              href: { pathname: "/work/[slug]", params: { slug: project.slug } },
            });
            return (
              <li key={project.slug} className="border-b border-line">
                <a
                  href={href}
                  className="group grid grid-cols-[40px_1fr] gap-x-4 gap-y-3 px-1 py-7 lg:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.15fr)_auto_auto] lg:items-center lg:gap-x-8"
                >
                  <span className="mono pt-2 text-muted lg:pt-0">{project.number}</span>
                  <h3 className="display text-h3 leading-[1.1]">{project.name}</h3>

                  <div className="col-start-2 lg:col-start-auto">
                    <p className="text-small text-muted">{project.line[locale]}</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags[locale].map((tag, i) => (
                        <li key={tag} className={i === 0 ? "tag tag-hot" : "tag"}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className="relative col-start-2 aspect-16/10 w-full max-w-[220px] overflow-hidden rounded-md border border-line-2 lg:col-start-auto lg:w-[120px]"
                    aria-hidden="true"
                  >
                    <Placeholder label={ui.placeholders.video[locale]} className="text-[10px]" />
                  </div>

                  <span className="col-start-2 text-[15px] font-medium lg:col-start-auto">
                    {work.details[locale]}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
