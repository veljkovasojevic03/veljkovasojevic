@AGENTS.md

# Portfolio Veljka Vasojevića: pravila za Claude Code

Plan izrade: `CLAUDE_CODE_PROMPT.md` (faze 0–10). Izvor istine: `DEFINICIJA_PROJEKTA.md`; ako se razilaze, važi definicija. Nejasno → pitaj.

## Način rada
- Strogo faza po faza. Posle faze: izveštaj po šablonu iz prompta + **STOP** dok Veljko ne potvrdi.
- Posle svake potvrđene faze jedan commit. Nikad tajne u repou.
- Posle svake faze Playwright snimci na **390 px i 1440 px** (`playwright-cli`).
- `prefers-reduced-motion` se rešava u istoj fazi u kojoj nastaje efekat.
- Bez novih zavisnosti van definicije bez pitanja. Skillovi su u `.claude/skills/` (tabela u promptu); Impeccable **bez hookova**, Taste Skill se ne koristi. `review-animations` se ne može pozvati automatski: čitaj njegov `SKILL.md`/`STANDARDS.md`.

## Sadržaj
- Tekst se **ne izmišlja**. Izvor: `sadrzaj/` (SR: `projekti-nacrt.md`, `tekstovi-nacrt.md`; EN: `en.md`). `objasnjenja-za-intervju.md` ne ide na sajt.
- U kodu sav tekst živi u `src/content/*.ts` kao `{ sr, en }` parovi; **nikad tekst u JSX-u**. `null`/`[?]` = placeholder, ne popunjavati.
- Obraćanje posetiocu: „ti“. Bez lokacije rada, bez „full-stack“, bez izmišljenih metrika.

## Kod
- TypeScript strict, bez `any`. Male komponente, komentari samo gde nije očigledno.
- Next.js 16.4 (App Router, `cacheComponents`, `proxy.ts`). Pre korišćenja API-ja pročitaj `node_modules/next/dist/docs/`.
- i18n: next-intl sa `next/root-params`; SR na `/`, EN na `/en`; projekti SR `/radovi/<slug>`, EN `/en/work/<slug>` (interna putanja `/work/[slug]`).
- Tokeni: `src/styles/tokens.css` (+ `@theme static`), pokret: `src/lib/motion.ts` (isti brojevi). Volt (`--energy`) samo za „struju“; UI akcent je `--accent`. Samo tamna tema.
- `--dim` (kontrast 2,7:1) je samo za ivice i ukrase, **nikad za tekst**; sporedni tekst je `--muted`.
- Komponente sa strane (React Bits…) se preoblikuju po našim tokenima; zadrži napomenu o licenci u fajlu.

## Provera
`npm run typecheck` · `npm run lint` · `npm run build`
