# veljkovasojevic.vercel.app

Lični portfolio Veljka Vasojevića, na srpskom i engleskom.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP · Lenis · Motion · next-intl · Radix Dialog · Vercel.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000 (SR), /en (EN)
npm run typecheck
npm run lint
npm run build && npm run start
```

Interna stranica sa tokenima: `/design` (nije linkovana, `noindex`).

## Struktura

```
src/
  app/[locale]/        stranice (SR na "/", EN na "/en")
  content/             SAV tekst sajta, kao { sr, en } parovi
    site.ts            meni, hero, o meni, kako radim, podnožje, trak
    projects.ts        5 projekata (lista + popup)
    sites.ts           sajtovi za firme
    links.ts           spoljni linkovi i mejl
  i18n/                next-intl: jezici i lokalizovane putanje
  lib/motion.ts        tokeni pokreta (GSAP + Motion)
  lib/fonts.ts         Funnel Display, Funnel Sans, Geist Mono
  styles/tokens.css    boje, tipografija, radijusi, senke, pokret
  proxy.ts             preusmeravanje jezika
public/media/          videi, posteri, fotografija, snimci sajtova
design/                vizuelne reference (nije deo sajta)
sadrzaj/               izvorni tekstovi (nacrti)
```

## Gde je tekst

Izvor teksta su nacrti u `sadrzaj/`. Na sajt ide samo ono što je preneto u `src/content/`.
Izmena teksta = izmena u `src/content/*.ts`, bez diranja komponenti.

## Mediji (stižu kasnije)

| Šta | Gde |
|---|---|
| Video projekta | `public/media/<slug>.mp4` + `.webm` + poster |
| Showreel | `public/media/showreel.*` |
| Fotografija 4:5 | `public/media/veljko.*` |
