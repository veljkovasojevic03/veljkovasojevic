import type { Metadata } from "next";
import { locale as rootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { about, hero, nav, work } from "@/content/site";
import { projects } from "@/content/projects";
import { DURATION_MS, EASE_OUT_CSS, STAGGER_MS } from "@/lib/motion";

// Interna stranica sa tokenima. Ne linkuje se sa sajta.
export const metadata: Metadata = {
  title: "Design tokens",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "--bg", hex: "#07070A" },
  { name: "--bg-2", hex: "#0D0D12" },
  { name: "--text", hex: "#EDEDF0" },
  { name: "--muted", hex: "#8D8D97" },
  { name: "--dim", hex: "#55555E" },
  { name: "--accent", hex: "#D6E2FF" },
  { name: "--energy", hex: "#CCFF33" },
  { name: "--energy-hot", hex: "#F4FFD1" },
] as const;

const lines = ["--line", "--line-2"] as const;
const radii = ["--radius-sm", "--radius-md", "--radius-lg", "--radius-xl", "--radius-pill"] as const;
const shadows = ["--shadow-frame", "--glow-accent", "--glow-frame"] as const;

const typeScale = [
  { name: "--text-hero", className: "display text-hero" },
  { name: "--text-h2", className: "display text-h2" },
  { name: "--text-h3", className: "display text-h3 leading-[1.1]" },
  { name: "--text-lede", className: "text-lede text-muted" },
  { name: "--text-body", className: "text-body" },
  { name: "--text-small", className: "text-small text-muted" },
  { name: "--text-mono", className: "mono text-muted" },
] as const;

const DIACRITICS = "Č Ć Ž Š Đ · č ć ž š đ";

function luminance(hex: string): number {
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12">
      <h2 className="mono mb-8 uppercase text-muted">{title}</h2>
      {children}
    </section>
  );
}

export default async function DesignPage() {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  const sample = projects[0];

  return (
    <main id="main" tabIndex={-1} className="wrap pt-[calc(var(--nav-h)+64px)] pb-16 outline-none">
      <p className="eyebrow">/design · {locale.toUpperCase()}</p>
      <h1 className="display mt-6 text-[clamp(36px,6vw,72px)]">Tokeni</h1>

      <Section title="Boje (kontrast prema --bg i --bg-2)">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {colors.map((c) => (
            <li key={c.name} className="rounded-lg border border-line bg-bg-2 p-3">
              <div
                className="h-16 rounded-md border border-line"
                style={{ background: `var(${c.name})` }}
              />
              <p className="mono mt-3 text-text">{c.name}</p>
              <p className="mono text-muted">{c.hex}</p>
              <p className="mono text-muted">
                {contrast(c.hex, "#07070A").toFixed(2)} · {contrast(c.hex, "#0D0D12").toFixed(2)}
              </p>
            </li>
          ))}
          {lines.map((name) => (
            <li key={name} className="rounded-lg border border-line bg-bg-2 p-3">
              <div className="h-16 rounded-md" style={{ border: `1px solid var(${name})` }} />
              <p className="mono mt-3 text-text">{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tipografija">
        <div className="grid gap-8">
          {typeScale.map((s) => (
            <div key={s.name} className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-baseline">
              <p className="mono text-muted">{s.name}</p>
              <p className={s.className}>
                {s.name === "--text-hero" ? hero.headline.prefix[locale] : about.card.degree[locale]}
              </p>
            </div>
          ))}
          <div className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-baseline">
            <p className="mono text-muted">Latin Extended</p>
            <div className="grid gap-2">
              <p className="display text-4xl">{DIACRITICS}</p>
              <p className="text-2xl">{DIACRITICS}</p>
              <p className="mono text-base text-text">{DIACRITICS}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Dugmad, oznake, linkovi">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary">
            {hero.primaryCta[locale]}
          </button>
          <button type="button" className="btn btn-ghost">
            {hero.copyEmail[locale]}
          </button>
          <button type="button" className="btn btn-primary btn-sm">
            {nav.cta[locale]}
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {sample.tags[locale].map((tag, i) => (
            <span key={tag} className={i === 0 ? "tag tag-hot" : "tag"}>
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a href="#" className="link">
            {nav.work[locale]}
          </a>
          <a href="#" className="link">
            {nav.about[locale]}
          </a>
          <span className="text-text">{work.details[locale]}</span>
          <span className="eyebrow">{hero.eyebrow[locale]}</span>
        </div>
      </Section>

      <Section title="Radijusi">
        <div className="flex flex-wrap gap-4">
          {radii.map((name) => (
            <div key={name} className="grid gap-2">
              <div
                className="h-20 w-28 border border-line-2 bg-bg-2"
                style={{ borderRadius: `var(${name})` }}
              />
              <p className="mono text-muted">{name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Senke i sjaj">
        <div className="flex flex-wrap gap-8">
          {shadows.map((name) => (
            <div key={name} className="grid gap-3">
              <div
                className="h-24 w-40 rounded-lg bg-bg-2"
                style={{ boxShadow: `var(${name})` }}
              />
              <p className="mono text-muted">{name}</p>
            </div>
          ))}
          <div className="grid gap-3">
            <p className="display text-5xl text-bg-2 [text-shadow:var(--glow-energy)] [-webkit-text-stroke:1px_var(--energy)]">
              VV
            </p>
            <p className="mono text-muted">--glow-energy</p>
          </div>
        </div>
      </Section>

      <Section title="Pokret">
        <dl className="mono grid gap-2 text-muted">
          <div className="flex gap-4">
            <dt className="w-32 text-muted">--ease-out</dt>
            <dd>{EASE_OUT_CSS}</dd>
          </div>
          {Object.entries(DURATION_MS).map(([name, ms]) => (
            <div key={name} className="flex gap-4">
              <dt className="w-32 text-muted">--dur-{name}</dt>
              <dd>{ms} ms</dd>
            </div>
          ))}
          <div className="flex gap-4">
            <dt className="w-32 text-muted">--stagger</dt>
            <dd>{STAGGER_MS} ms</dd>
          </div>
        </dl>
      </Section>
    </main>
  );
}
