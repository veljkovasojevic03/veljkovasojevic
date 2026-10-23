import { ImageResponse } from "next/og";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { hero } from "@/content/site";
import { getProject } from "@/content/projects";
import { projectStaticParams } from "@/lib/projectPage";
import { OgEyebrow, OgMark, ogColors, ogFonts, ogFrameStyle, ogSize } from "@/lib/og";

export const alt = "Veljko Vasojević";
export const size = ogSize;
export const contentType = "image/png";

export const generateStaticParams = projectStaticParams;

/** OG slika projekta: VV, ime autora, ime projekta i njegova rečenica. */
export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const project = getProject(slug);
  if (!project) return new Response(null, { status: 404 });

  return new ImageResponse(
    (
      <div style={ogFrameStyle}>
        <OgMark />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <OgEyebrow>{`${hero.eyebrow[locale]} · ${project.number}`}</OgEyebrow>
          <div
            style={{
              fontFamily: "Funnel Display",
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              marginTop: 28,
              display: "flex",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              fontFamily: "Funnel Display",
              fontSize: 36,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: ogColors.muted,
              marginTop: 20,
              maxWidth: 940,
              display: "flex",
            }}
          >
            {project.line[locale]}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
