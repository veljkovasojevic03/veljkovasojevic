"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { VideoSources } from "@/lib/media";
import { BrowserFrame, Placeholder } from "@/components/ui/BrowserFrame";

export type FrameKind = "desktop" | "phone";

type Props = {
  sources: VideoSources;
  frame: FrameKind;
  /** Tekst privremenog kadra dok video ne stigne. */
  placeholder: string;
  /** Video svira samo dok je true; inače stoji na posteru. */
  playing: boolean;
  className?: string;
  /** Širina za poster sliku (next/image `sizes`). */
  sizes?: string;
};

/**
 * Minimalni okvir sa videom: prozor browsera ili uspravan telefon.
 * `preload="none"`: video se ne preuzima dok ne treba da svira.
 */
export function VideoFrame({ sources, frame, placeholder, playing, className, sizes }: Props) {
  const media = <FrameMedia sources={sources} placeholder={placeholder} playing={playing} sizes={sizes} />;

  if (frame === "phone") {
    return (
      <div
        className={`mx-auto aspect-9/19 w-full max-w-[280px] rounded-[28px] border border-line-2 bg-bg-2 p-1.5 shadow-glow-frame ${className ?? ""}`}
      >
        <div className="relative size-full overflow-hidden rounded-[22px]">{media}</div>
      </div>
    );
  }

  return (
    <BrowserFrame className={className} aspect="16 / 9">
      {media}
    </BrowserFrame>
  );
}

function FrameMedia({
  sources,
  placeholder,
  playing,
  sizes,
}: Pick<Props, "sources" | "placeholder" | "playing" | "sizes">) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(sources.mp4 || sources.webm);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) void el.play().catch(() => undefined);
    else el.pause();
  }, [playing]);

  if (!sources.poster && !hasVideo) return <Placeholder label={placeholder} />;

  // Poster je slika ispod videa, ne `poster` atribut: atribut se preuzima odmah,
  // a slika tek kad se približi ekranu (i u širini koja treba).
  return (
    <>
      {sources.poster && <Poster src={sources.poster} sizes={sizes} />}
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
          {sources.webm && <source src={sources.webm} type="video/webm" />}
          {sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
        </video>
      )}
    </>
  );
}

/** Mirna slika projekta (sličica u listi, poster bez videa). */
export function Poster({ src, sizes = "240px" }: { src: string; sizes?: string }) {
  return <Image src={src} alt="" fill sizes={sizes} className="object-cover" />;
}
