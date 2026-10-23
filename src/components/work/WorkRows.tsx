"use client";

import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import type { ProjectSlug } from "@/content/projects";
import type { VideoSources } from "@/lib/media";
import { useMediaQuery, useReducedMotion } from "@/lib/useMediaQuery";
import { rememberTrigger, TRIGGER_ATTR } from "@/lib/returnFocus";
import { Placeholder } from "@/components/ui/BrowserFrame";
import { Poster, VideoFrame, type FrameKind } from "./VideoFrame";
import { FloatingPreview, useFloatingPreview } from "./FloatingPreview";
import { useCenteredItem } from "./useCenteredItem";

export type WorkItem = {
  slug: ProjectSlug;
  number: string;
  name: string;
  line: string;
  tags: string[];
  frame: FrameKind;
  sources: VideoSources;
};

type Labels = { details: string; preview: string; placeholder: string };

/**
 * Računar (lg + pointer: fine): hover i fokus prikazuju video pregled uz kursor.
 * Telefon i tablet: kartice; svira samo video kartice na sredini ekrana.
 * Klik vodi na /radovi/<slug>, a Next.js ga presreće i otvara popup.
 */
export function WorkRows({ items, labels }: { items: WorkItem[]; labels: Labels }) {
  const wide = useMediaQuery("(min-width: 1024px)");
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useReducedMotion();
  const floating = wide && fine;

  const listRef = useRef<HTMLOListElement>(null);
  const preview = useFloatingPreview({ enabled: floating, reduce });
  const centered = useCenteredItem(listRef, !wide);

  return (
    <>
      <ol
        ref={listRef}
        className="mt-10 grid gap-4 lg:gap-0 lg:border-t lg:border-line"
        onPointerMove={preview.onPointerMove}
        onPointerLeave={preview.hide}
        onBlur={(e) => {
          if (!listRef.current?.contains(e.relatedTarget as Node | null)) preview.hide();
        }}
      >
        {items.map((item) => {
          const lit = !wide && centered === item.slug;
          return (
            <li
              key={item.slug}
              data-slug={item.slug}
              className="rounded-lg border border-line bg-bg-2/60 lg:rounded-none lg:border-0 lg:border-b lg:bg-transparent"
            >
              <Link
                href={{ pathname: "/work/[slug]", params: { slug: item.slug } }}
                scroll={false}
                prefetch
                data-lit={lit ? "" : undefined}
                {...{ [TRIGGER_ATTR]: item.slug }}
                onClick={() => rememberTrigger(item.slug)}
                onPointerEnter={(e) => preview.show(item.slug, e)}
                onFocus={(e) => preview.showAt(item.slug, e.currentTarget)}
                className="group grid grid-cols-[32px_1fr] gap-x-3 gap-y-3 rounded-lg p-4 sm:p-5 lg:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.15fr)_auto_auto] lg:items-center lg:gap-x-8 lg:rounded-none lg:px-1 lg:py-7"
              >
                <div className="order-first col-span-2 mb-2 lg:hidden">
                  <VideoFrame
                    sources={item.sources}
                    frame={item.frame}
                    placeholder={labels.placeholder}
                    playing={lit && !reduce}
                    sizes="(min-width: 640px) 600px, 100vw"
                  />
                </div>

                <span className="mono pt-2 text-muted transition-colors duration-(--dur-fast) ease-out group-hover:text-energy group-focus-visible:text-energy group-data-lit:text-energy lg:pt-0">
                  {item.number}
                </span>
                <h3 className="display text-h3 leading-[1.1]">{item.name}</h3>

                <div className="col-start-2 lg:col-start-auto">
                  <p className="text-small text-muted">{item.line}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, i) => (
                      <li key={tag} className={i === 0 ? "tag tag-hot" : "tag"}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="relative hidden aspect-video w-[120px] overflow-hidden rounded-md border border-line-2 lg:block"
                  aria-hidden="true"
                >
                  {item.sources.poster ? (
                    <Poster src={item.sources.poster} sizes="120px" />
                  ) : (
                    <Placeholder label={labels.placeholder} className="text-[10px]" />
                  )}
                </div>

                <span className="btn btn-ghost btn-sm col-start-2 justify-self-start lg:col-start-auto lg:h-auto lg:border-0 lg:px-0 lg:text-[15px]">
                  {labels.details}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {floating && <FloatingPreview items={items} label={labels.preview} placeholder={labels.placeholder} state={preview} />}
    </>
  );
}
