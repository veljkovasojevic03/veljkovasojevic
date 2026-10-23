/**
 * Snimci ekrana demo sajtova za sekciju „Treba ti sajt?“.
 * Pokretanje: npm run screenshots (samo jedan sajt: npm run screenshots -- djak)
 *
 * Za svaki sajt snima prvi ekran na računaru (1440×900) i telefonu (390×844, 2×)
 * i čuva ih kao WebP u public/media/sites/<slug>-{desktop,mobile}.webp.
 * WebP pravi sam Chromium (canvas), pa ne treba poseban alat za slike.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type Browser } from "playwright";

type Shot = {
  slug: string;
  url: string;
  /** Koliko čekati posle učitavanja (uvodni ekrani, pojavljivanja). */
  settleMs: number;
};

const sites: Shot[] = [
  // Đak ima uvodni ekran sa procentima pre početne strane.
  { slug: "djak", url: "https://djak.vercel.app", settleMs: 9000 },
  { slug: "borivoje", url: "https://borivojevasojevic.vercel.app", settleMs: 3000 },
];

const variants = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, scale: 1, mobile: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, scale: 2, mobile: true },
] as const;

const WEBP_QUALITY = 0.82;
const OUT_DIR = join(process.cwd(), "public", "media", "sites");

async function capture(browser: Browser, site: Shot, variant: (typeof variants)[number]) {
  const context = await browser.newContext({
    viewport: variant.viewport,
    deviceScaleFactor: variant.scale,
    isMobile: variant.mobile,
    hasTouch: variant.mobile,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(site.url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(site.settleMs);
  const png = await page.screenshot({ type: "png" });
  await context.close();
  return png;
}

/** PNG → WebP preko canvas-a u Chromium-u. */
async function toWebp(browser: Browser, png: Buffer): Promise<Buffer> {
  const page = await browser.newPage();
  const dataUrl = await page.evaluate(
    async ({ src, quality }) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      return canvas.toDataURL("image/webp", quality);
    },
    { src: `data:image/png;base64,${png.toString("base64")}`, quality: WEBP_QUALITY },
  );
  await page.close();
  if (!dataUrl.startsWith("data:image/webp")) throw new Error("Chromium nije napravio WebP");
  return Buffer.from(dataUrl.split(",")[1], "base64");
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  try {
    const only = process.argv[2];
    for (const site of sites.filter((s) => !only || s.slug === only)) {
      for (const variant of variants) {
        const png = await capture(browser, site, variant);
        const webp = await toWebp(browser, png);
        const file = join(OUT_DIR, `${site.slug}-${variant.name}.webp`);
        await writeFile(file, webp);
        const kb = (n: number) => `${Math.round(n / 1024)} KB`;
        console.log(`${site.slug}-${variant.name}.webp  ${kb(webp.length)} (PNG ${kb(png.length)})`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
