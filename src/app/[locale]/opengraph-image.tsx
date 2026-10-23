import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { hero } from "@/content/site";
import { V1, V2, VV_GAP, VV_VIEWBOX_ATTR } from "@/components/brand/vvGeometry";

export const alt = "Veljko Vasojević";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Boje kao u src/styles/tokens.css (satori ne čita CSS promenljive).
const C = {
  bg: "#07070a",
  text: "#ededf0",
  muted: "#8d8d97",
  energy: "#ccff33",
  line: "rgba(255,255,255,0.08)",
} as const;

const fonts = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/FunnelDisplay-Bold.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/GeistMono-Regular.ttf")),
]);

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const [display, mono] = await fonts;
  const { prefix, words, suffix } = hero.headline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: C.bg,
          backgroundImage: `radial-gradient(circle at center, ${C.line} 1.5px, transparent 1.5px)`,
          backgroundSize: "22px 22px",
          color: C.text,
        }}
      >
        <svg width="132" height="114" viewBox={VV_VIEWBOX_ATTR}>
          <path d={V1} fill={C.text} />
          <path d={V2} fill="none" stroke={C.bg} strokeWidth={VV_GAP} strokeLinejoin="miter" />
          <path d={V2} fill={C.energy} />
        </svg>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 24,
              letterSpacing: "0.04em",
              color: C.muted,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: 28, height: 2, background: C.energy, marginRight: 16 }} />
            {hero.eyebrow[locale]}
          </div>
          {/* Kao u hero-u: reč u svom redu. */}
          <div
            style={{
              fontFamily: "Funnel Display",
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: "-0.045em",
              marginTop: 28,
              maxWidth: 960,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>{prefix[locale]}</div>
            <div style={{ display: "flex" }}>
              <span style={{ color: C.energy }}>{words[locale][0]}</span>
              <span>{suffix[locale]}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Funnel Display", data: display, weight: 700, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
