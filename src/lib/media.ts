// Samo za server (čita fajl sistem pri build-u).
import { existsSync } from "node:fs";
import { join } from "node:path";

/** Izvori jednog videa iz public/media; šta ne postoji ostaje undefined. */
export type VideoSources = {
  mp4?: string;
  webm?: string;
  poster?: string;
};

const MEDIA_DIR = join(process.cwd(), "public", "media");

function find(name: string, extensions: string[]): string | undefined {
  const ext = extensions.find((e) => existsSync(join(MEDIA_DIR, `${name}.${e}`)));
  return ext ? `/media/${name}.${ext}` : undefined;
}

/**
 * Traži public/media/<name>.{mp4,webm} i poster <name>.{webp,jpg}.
 * Proverava se pri build-u, pa novi fajl ne traži izmenu koda.
 */
export function videoSources(name: string): VideoSources {
  return {
    mp4: find(name, ["mp4"]),
    webm: find(name, ["webm"]),
    poster: find(name, ["webp", "jpg", "jpeg", "png"]),
  };
}

export function hasVideo(sources: VideoSources): boolean {
  return Boolean(sources.mp4 || sources.webm);
}
