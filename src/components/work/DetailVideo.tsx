"use client";

import { useState } from "react";
import type { VideoSources } from "@/lib/media";
import { useReducedMotion } from "@/lib/useMediaQuery";
import { VideoFrame, type FrameKind } from "./VideoFrame";
import { useModalReady } from "./modalReady";

type Props = {
  sources: VideoSources;
  frame: FrameKind;
  placeholder: string;
  labels: { pause: string; play: string };
};

/**
 * Video projekta u popupu i na punoj stranici. Svira sam (bez zvuka, u krug),
 * osim uz smanjen pokret; dugme ga zaustavlja (WCAG 2.2.2).
 */
export function DetailVideo({ sources, frame, placeholder, labels }: Props) {
  const ready = useModalReady();
  const reduce = useReducedMotion();
  // null = posetilac još nije birao; tada odlučuje smanjen pokret.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = ready && (choice ?? !reduce);
  const hasVideo = Boolean(sources.mp4 || sources.webm);

  return (
    <div className="relative">
      <VideoFrame
        sources={sources}
        frame={frame}
        placeholder={placeholder}
        playing={playing}
        sizes="(min-width: 1024px) 640px, 100vw"
      />
      {hasVideo && (
        <button
          type="button"
          onClick={() => setChoice(!playing)}
          className="btn btn-ghost btn-sm absolute right-3 bottom-3 bg-bg/80 backdrop-blur-sm"
        >
          {playing ? labels.pause : labels.play}
        </button>
      )}
    </div>
  );
}
