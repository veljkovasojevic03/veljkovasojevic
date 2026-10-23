import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { V1, V2, VV_GAP, VV_VIEWBOX_ATTR } from "@/components/brand/vvGeometry";

/** Zajedničko za OG slike (sajt i projekti). */
export const ogSize = { width: 1200, height: 630 };

// Boje kao u src/styles/tokens.css (satori ne čita CSS promenljive).
export const ogColors = {
  bg: "#07070a",
  text: "#ededf0",
  muted: "#8d8d97",
  energy: "#ccff33",
  line: "rgba(255,255,255,0.08)",
} as const;

const fontFiles = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/FunnelDisplay-Bold.ttf")),
  readFile(join(process.cwd(), "src/assets/fonts/GeistMono-Regular.ttf")),
]);

export async function ogFonts() {
  const [display, mono] = await fontFiles;
  return [
    { name: "Funnel Display", data: display, weight: 700 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

/** Pozadina sa mrežom tačaka, kao u hero-u. */
export const ogFrameStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "72px 80px",
  background: ogColors.bg,
  backgroundImage: `radial-gradient(circle at center, ${ogColors.line} 1.5px, transparent 1.5px)`,
  backgroundSize: "22px 22px",
  color: ogColors.text,
} as const;

export function OgMark() {
  return (
    <svg width="132" height="114" viewBox={VV_VIEWBOX_ATTR}>
      <path d={V1} fill={ogColors.text} />
      <path d={V2} fill="none" stroke={ogColors.bg} strokeWidth={VV_GAP} strokeLinejoin="miter" />
      <path d={V2} fill={ogColors.energy} />
    </svg>
  );
}

/** Mono oznaka sa crticom u boji struje. */
export function OgEyebrow({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "Geist Mono",
        fontSize: 24,
        letterSpacing: "0.04em",
        color: ogColors.muted,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ width: 28, height: 2, background: ogColors.energy, marginRight: 16 }} />
      {children}
    </div>
  );
}
