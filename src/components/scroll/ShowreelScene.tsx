"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useMediaQuery";
import type { VideoSources } from "@/lib/media";
import { Placeholder } from "@/components/ui/BrowserFrame";

/** Najveća širina malog okvira na računaru (kao u fazi 1). */
const START_MAX_WIDTH = 960;
/** Radijus malog okvira u px (--radius-lg). */
const START_RADIUS = 16;

const subscribe = () => () => {};
/** true tek posle hidratacije, da prvi render odgovara HTML-u. */
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

type Props = {
  id: string;
  label: string;
  placeholder: string;
  video: VideoSources;
};

/**
 * Showreel: mali okvir prozora se pri skrolu širi preko celog ekrana
 * (pin + scrub), pa stranica nastavlja u radove. Na telefonu je scena kraća
 * i okvir se širi do ivica ekrana. Uz smanjen pokret: statičan okvir.
 */
export function ShowreelScene({ id, label, placeholder, video }: Props) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const scene = mounted && !reduce;
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const bar = barRef.current;
    if (!scene || !stage || !frame || !bar) return;

    const gutter = () =>
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--gutter")) || 16;
    const desktop = () => window.matchMedia("(min-width: 768px)").matches;
    const startScale = () => {
      const width = window.innerWidth;
      const target = desktop() ? Math.min(START_MAX_WIDTH, width - gutter() * 2) : width - gutter() * 2;
      return target / width;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: () => (desktop() ? "top top" : "center center"),
          end: () => (desktop() ? "+=100%" : "+=45%"),
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        frame,
        // Radijus se deli skalom, da mali okvir vizuelno ima START_RADIUS.
        { scale: startScale, borderRadius: () => START_RADIUS / startScale() },
        { scale: 1, borderRadius: 0, duration: 1 },
      ).to(bar, { yPercent: -100, opacity: 0, duration: 0.3 }, 0.7);
    }, stage);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [scene]);

  // Video svira samo dok je na ekranu.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduce) void el.play().catch(() => undefined);
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduce]);

  const hasVideo = Boolean(video.mp4 || video.webm);

  return (
    <section id={id} aria-label={label} className="showreel" data-scene={scene ? "" : undefined}>
      <div ref={stageRef} className="showreel-stage">
        <div ref={frameRef} className="showreel-frame">
          <div className="relative size-full">
            {hasVideo ? (
              <video
                ref={videoRef}
                className="absolute inset-0 size-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                poster={video.poster}
                aria-hidden="true"
              >
                {video.webm && <source src={video.webm} type="video/webm" />}
                {video.mp4 && <source src={video.mp4} type="video/mp4" />}
              </video>
            ) : (
              <Placeholder label={placeholder} />
            )}
          </div>
          <div
            ref={barRef}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 flex h-8 items-center gap-1.5 border-b border-line bg-bg-2 px-3.5"
          >
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
            <span className="size-2 rounded-full bg-line-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
