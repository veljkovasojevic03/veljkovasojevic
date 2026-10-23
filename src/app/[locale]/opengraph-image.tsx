import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { hero } from "@/content/site";
import { OgEyebrow, OgMark, ogColors, ogFonts, ogFrameStyle, ogSize } from "@/lib/og";

export const alt = "Veljko Vasojević";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const { prefix, words, suffix } = hero.headline;

  return new ImageResponse(
    (
      <div style={ogFrameStyle}>
        <OgMark />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <OgEyebrow>{hero.eyebrow[locale]}</OgEyebrow>
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
              <span style={{ color: ogColors.energy }}>{words[locale][0]}</span>
              <span>{suffix[locale]}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
