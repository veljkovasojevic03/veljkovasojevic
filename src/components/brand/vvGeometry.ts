/**
 * Geometrija VV znaka (DEFINICIJA_PROJEKTA.md, odeljak 4).
 * Jedno V = V1; drugo je pomereno za OFFSET ("jako ukršteno").
 * Rez = obrub drugog V u boji pozadine, širine GAP.
 * Koriste je meni, uvod, favicon i OG slike.
 */
export const VV_OFFSET = 54;
export const VV_GAP = 9;

export const V1 = "M0 0H26L55 92L84 0H110L68 140H42Z";
export const V2 = `M${VV_OFFSET} 0H${VV_OFFSET + 26}L${VV_OFFSET + 55} 92L${VV_OFFSET + 84} 0H${VV_OFFSET + 110}L${VV_OFFSET + 68} 140H${VV_OFFSET + 42}Z`;

/** Okvir sa 4 jedinice vazduha, da rez ne bude odsečen. */
export const VV_VIEWBOX = { x: -4, y: -4, width: VV_OFFSET + 118, height: 148 } as const;
export const VV_VIEWBOX_ATTR = `${VV_VIEWBOX.x} ${VV_VIEWBOX.y} ${VV_VIEWBOX.width} ${VV_VIEWBOX.height}`;

/** Ceo znak kao SVG string (za favicon i OG, van React-a). */
export function vvSvgMarkup(colors: { v1: string; v2: string; cut: string }): string {
  return (
    `<path d="${V1}" fill="${colors.v1}"/>` +
    `<path d="${V2}" fill="none" stroke="${colors.cut}" stroke-width="${VV_GAP}" stroke-linejoin="miter"/>` +
    `<path d="${V2}" fill="${colors.v2}"/>`
  );
}
