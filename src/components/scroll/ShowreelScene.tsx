"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useMediaQuery";
import type { VideoSources } from "@/lib/media";
import { Placeholder } from "@/components/ui/BrowserFrame";
import { Poster } from "@/components/work/VideoFrame";

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
  /** Dugme za pauzu (video svira sam duže od 5 s, WCAG 2.2.2). */
  labels: { pause: string; play: string };
};

/**
 * Showreel: mali okvir prozora se pri skrolu širi preko celog ekrana
 * (pin + scrub), pa stranica nastavlja u radove. Na telefonu je scena kraća
 * i okvir se širi do ivica ekrana. Uz smanjen pokret: statičan okvir.
 */
export function ShowreelScene({ id, label, placeholder, video, labels }: Props) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const kit = useGsap();
  // Scena tek kad GSAP stigne; do tada statičan okvir (kao uz smanjen pokret).
  const scene = mounted && !reduce && kit !== null;
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const bar = barRef.current;
    if (!kit || !scene || !stage || !frame || !bar) return;
    const { gsap, ScrollTrigger } = kit;

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
  }, [kit, scene]);

  // null = posetilac još nije birao; tada odlučuje smanjen pokret.
  const [choice, setChoice] = useState<boolean | null>(null);
  const wantPlay = choice ?? !reduce;

  // Video svira samo dok je na ekranu.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && wantPlay) void el.play().catch(() => undefined);
      else el.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [wantPlay]);

  const hasVideo = Boolean(video.mp4 || video.webm);

  return (
    <section id={id} aria-label={label} className="showreel" data-scene={scene ? "" : undefined}>
      <div ref={stageRef} className="showreel-stage">
        <div ref={frameRef} className="showreel-frame">
          <div className="relative size-full">
            {/* Poster kao lenja slika ispod videa (vidi VideoFrame). */}
            {video.poster && <Poster src={video.poster} sizes="100vw" />}
            {hasVideo && (
              <video
                ref={videoRef}
                className="absolute inset-0 size-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              >
                {video.webm && <source src={video.webm} type="video/webm" />}
                {video.mp4 && <source src={video.mp4} type="video/mp4" />}
              </video>
            )}
            {!hasVideo && !video.poster && <Placeholder label={placeholder} />}
            {hasVideo && (
              <button
                type="button"
                onClick={() => setChoice(!wantPlay)}
                className="btn btn-ghost btn-sm absolute right-3 bottom-3 z-10 bg-bg/80 backdrop-blur-sm"
              >
                {wantPlay ? labels.pause : labels.play}
              </button>
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
