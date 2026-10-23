import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locale as rootLocale } from "next/root-params";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/next";
import { htmlLang, routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import { sectionIds, seo, ui } from "@/content/site";
import { siteUrl } from "@/content/links";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Intro } from "@/components/brand/Intro";
import { introBootScript } from "@/components/brand/introBoot";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) return {};

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.title[locale], template: `%s · ${seo.title[locale]}` },
    description: seo.description[locale],
    openGraph: {
      type: "website",
      siteName: seo.title[locale],
      locale: htmlLang[locale],
    },
  };
}

export default async function LocaleLayout({ children, modal }: LayoutProps<"/[locale]">) {
  const locale = await rootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    // suppressHydrationWarning: skripta uvoda menja atribut na <html> pre hidratacije.
    <html lang={htmlLang[locale]} className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <a
            href={`#${sectionIds.main}`}
            className="skip-link btn btn-primary"
          >
            {ui.skipLink[locale]}
          </a>
          <SmoothScroll />
          <Intro />
          <SiteHeader />
          {children}
          {/* Popup projekta (presretnuta ruta /radovi/<slug>). */}
          {modal}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
