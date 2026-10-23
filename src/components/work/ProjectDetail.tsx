import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/projects";
import { ui, work } from "@/content/site";
import type { VideoSources } from "@/lib/media";
import { DetailVideo } from "./DetailVideo";
import { ModalTitle } from "./ProjectModal";

type Props = {
  project: Project;
  locale: Locale;
  sources: VideoSources;
  /** U popupu je naslov h2 (Dialog.Title), na punoj stranici h1. */
  variant: "modal" | "page";
};

/**
 * Isti šablon za svih pet projekata: zaglavlje → video → Zašto → Uloga → Kako → Stack.
 * Na računaru je video u desnoj koloni, zakačen pored teksta.
 */
export function ProjectDetail({ project, locale, sources, variant }: Props) {
  const modal = variant === "modal";
  const Section = modal ? "h3" : "h2";
  const titleClass = "display text-h2 mt-3";
  const [kind, status, year] = project.tags[locale];

  return (
    <article>
      <header>
        <p className="mono text-muted">{project.number}</p>
        {modal ? (
          <ModalTitle className={titleClass}>{project.name}</ModalTitle>
        ) : (
          <h1 className={titleClass}>{project.name}</h1>
        )}
        <p className="mt-4 max-w-[60ch] text-lede text-muted">{project.line[locale]}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          <li className="tag tag-hot">{kind}</li>
          <li className="tag">{status}</li>
          <li className="tag">{year}</li>
        </ul>

        {project.note && <p className="mono mt-4 text-muted">{project.note[locale]}</p>}

        {project.links.some((link) => link.href) && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.links.map(
              (link) =>
                link.href && (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener" className="btn btn-ghost btn-sm">
                      {link.label[locale]}
                      <span className="sr-only"> {ui.externalLink[locale]}</span>
                    </a>
                  </li>
                ),
            )}
          </ul>
        )}
      </header>

      {/* Telefon i tablet: video pa tekst. Računar: tekst levo, video desno
          i zakačen, da se vidi dok se čita „Kako je napravljeno“. */}
      <div className="mt-8 grid items-start gap-10 md:mt-10 lg:mt-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <div className={`lg:sticky lg:col-start-2 lg:row-start-1 ${modal ? "lg:top-20" : "lg:top-[calc(var(--nav-h)+24px)]"}`}>
          <DetailVideo
            sources={sources}
            frame={project.frame}
            placeholder={ui.placeholders.video[locale]}
            labels={{ pause: ui.project.pauseVideo[locale], play: ui.project.playVideo[locale] }}
          />
        </div>

        <div className="grid gap-10 lg:col-start-1 lg:row-start-1">
          <DetailSection heading={work.headings.why[locale]} as={Section}>
            <p>{project.why[locale]}</p>
          </DetailSection>
          <DetailSection heading={work.headings.role[locale]} as={Section}>
            <p>{project.role[locale]}</p>
          </DetailSection>
          <DetailSection heading={work.headings.built[locale]} as={Section}>
            <ul className="grid gap-3">
              {project.built[locale].map((item) => (
                <li key={item} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-line-2">
                  <InlineCode text={item} />
                </li>
              ))}
            </ul>
          </DetailSection>
          <DetailSection heading={work.headings.stack[locale]} as={Section}>
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.map((item) => {
                const label = typeof item === "string" ? item : item[locale];
                return (
                  <li key={label} className="tag">
                    {label}
                  </li>
                );
              })}
            </ul>
          </DetailSection>
        </div>
      </div>
    </article>
  );
}

function DetailSection({
  heading,
  as: Heading,
  children,
}: {
  heading: string;
  as: "h2" | "h3";
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-3 border-t border-line pt-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8 lg:grid-cols-1 lg:gap-3">
      <Heading className="eyebrow self-start">{heading}</Heading>
      <div className="max-w-[68ch] text-text/90">{children}</div>
    </section>
  );
}

/** Delovi teksta između `` su kod (npr. `<script>`). */
function InlineCode({ text }: { text: string }) {
  return text.split(/`([^`]+)`/).map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="rounded-sm bg-line px-1 font-mono text-[0.9em]">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
