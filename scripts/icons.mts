/**
 * Pravi favicon iz VV znaka: src/app/icon.svg, favicon.ico (16/32/48)
 * i apple-icon.png (180). Pokreće se ručno kad se znak promeni:
 *   node scripts/icons.mts
 * sharp dolazi uz Next.js (nije posebna zavisnost projekta).
 */
import { writeFile } from "node:fs/promises";
import sharp from "sharp";
import { VV_VIEWBOX, vvSvgMarkup } from "../src/components/brand/vvGeometry.ts";

const BG = "#07070a";
const COLORS = { v1: "#ededf0", v2: "#ccff33", cut: BG };

/** Kvadratna ikona: tamna pozadina, znak centriran sa unutrašnjim razmakom. */
function iconSvg(size: number, { radius, padding }: { radius: number; padding: number }): string {
  const inner = size - padding * 2;
  const scale = inner / VV_VIEWBOX.width;
  const height = VV_VIEWBOX.height * scale;
  const y = (size - height) / 2;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    `<rect width="${size}" height="${size}" rx="${radius}" fill="${BG}"/>` +
    `<g transform="translate(${padding - VV_VIEWBOX.x * scale} ${y - VV_VIEWBOX.y * scale}) scale(${scale})">` +
    vvSvgMarkup(COLORS) +
    `</g></svg>`
  );
}

/** ICO sa PNG slikama unutra (podržano od Windows Vista). */
function ico(pngs: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6 + pngs.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, entry);
    header.writeUInt8(size >= 256 ? 0 : size, entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const png = (svg: string) => sharp(Buffer.from(svg)).png().toBuffer();

// Mala ikona: manje vazduha, da znak bude čitljiv na 16 px.
const small = (size: number) => iconSvg(size, { radius: size * 0.22, padding: size * 0.14 });

await writeFile("src/app/icon.svg", small(64));
await writeFile(
  "src/app/favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(small(size)) })))),
);
// Apple sam zaobljuje uglove, pa pozadina ide do ivice.
await writeFile("src/app/apple-icon.png", await png(iconSvg(180, { radius: 0, padding: 36 })));

console.log("Ikone su napravljene u src/app/.");
