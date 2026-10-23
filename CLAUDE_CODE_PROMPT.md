# Portfolio Veljka Vasojevića: fazni prompt za Claude Code

> Ovo je radni plan izrade. Radi **strogo fazu po fazu**. Posle svake faze **STANI**, napiši kratak
> izveštaj i čekaj Veljkovu potvrdu („nastavi“, „ok“…) pre sledeće faze.

---

## Pravila rada (važe u svakoj fazi)

1. **Izvor istine je `DEFINICIJA_PROJEKTA.md`.** Pročitaj je celu pre faze 0 i ponovo onaj njen deo koji se tiče faze na kojoj radiš. Ako se nešto ovde i u definiciji razilazi, važi definicija; ako je nešto nejasno, **pitaj, ne pretpostavljaj**.
2. **Tekst se ne izmišlja.** Sav tekst dolazi iz `sadrzaj/projekti-nacrt.md`, `sadrzaj/tekstovi-nacrt.md` (SR) i `sadrzaj/en.md` (EN). Mesta označena sa [?] ili „OTVORENO“ ostaju placeholder; ne popunjavaj ih sam. `sadrzaj/objasnjenja-za-intervju.md` **ne ide na sajt**.
3. **Reference izgleda:**
   - `design/stil-poredjenje.html` je **radna referenca efekata** (VV uvod, reč koja se menja, tačke + impulsi, munje u podnožju, kopiranje mejla). Logiku prenesi u React/TypeScript komponente; ne kopiraj slepo, ali zadrži ponašanje i osećaj.
   - Snimci iz Claude Designa u `design/` su **vizuelna referenca** rasporeda (desktop): `hero.png` (meni + hero), `second section.png` (rečenica sa strujom), `showreel.png`, `work.png` (lista radova + hover pregled), `work-sites.png` (sajtovi za firme), `about-me.png` (kartica + O meni), `how-work.png` (Kako radim + veštine), `footer.png` (podnožje sa munjom). Ako se razlikuju od definicije, važi definicija, a razliku navedi u izveštaju.
   - **Nema snimaka za:** telefon (390 px), uvod (VV), popup projekta, poleđinu kartice, VV list i OG sliku. Te delove izvodi iz definicije i postojećih snimaka, u istom jeziku (tokeni, okviri, tipografija), i u izveštaju pokaži Playwright snimak da Veljko potvrdi.
   - `PORTFOLIO_KONTEKST.md` je istorija odluka; čitaj ga samo kad ti treba „zašto“.
4. **Telefon je prvi građanin.** Posle svake faze proveri 390 px i 1440 px (Playwright snimci) i u izveštaju navedi da si proverio.
5. **`prefers-reduced-motion`** se poštuje u istoj fazi u kojoj se efekat pravi, ne „kasnije“.
6. **Bez novih zavisnosti** van onih iz definicije bez pitanja. Pre instalacije bilo kog skilla ili alata reci šta je i odakle.
7. **Git:** prvi commit je samo `.gitignore`. Posle svake potvrđene faze jedan commit sa jasnom porukom. Nikada tajne u repou (sajt ih nema; `.env*` je u `.gitignore`).
8. **Kod:** TypeScript strict, bez `any`; komponente male i jasne; komentari samo gde nešto nije očigledno. Tekst nikad u JSX-u, uvek iz podataka.
9. **Komponente sa strane** (React Bits, Originkit ideje, 21st.dev…) se uvek preoblikuju po našim tokenima. Licence: React Bits je MIT + Commons Clause (smemo u sajtu, zadržati napomenu o autorskim pravima u fajlu).
10. **Skillovi** (instalirani na nivou projekta u `.claude/skills/`): Emil Kowalski (pokret), Impeccable (selektivno, **bez hookova**; „struja“, sjaj i Volt boja su namerni, „the brief wins“), Web Design Guidelines (revizija), Playwright CLI (snimci). Taste Skill se **ne** koristi. Kada se koji koristi, piše u tabeli ispod; to je obavezno, ne preporuka.

### Skillovi po fazama

| Faza | Skill | Za šta tačno |
|---|---|---|
| 0 | Impeccable `typeset`, `layout` (samo savet, bez automatskih izmena) | provera skale tipografije i razmaka u tokenima i na `/design` stranici |
| 0 | Emil `emil-design-eng` | provera tokena pokreta (krive, trajanja) pre nego što se koriste |
| 1–8 | Playwright CLI | na kraju **svake** faze snimci 390 px i 1440 px sekcija na kojima se radilo |
| 2, 3, 4, 5, 7, 8 | Emil `animate` / `improve-animations` | pri pravljenju svakog efekta (flip reči, impulsi, uvod, skrol scene, popup, okretanje kartice, munje) |
| 3, 4, 5, 7, 8 | Emil `review-animations` | pregled napravljenih animacija pre izveštaja; nalaze ispravi ili obrazloži |
| 5 | Impeccable `critique` | lista radova i popup (hijerarhija, čitljivost, telefon) |
| 9 | Emil `animation-performance` | performanse svih animacija (GPU, layout thrashing, canvas) |
| 9 | Impeccable `audit`, pa `polish` | tehnička provera (a11y, responsive, performanse), pa završno doterivanje |
| 9 | Web Design Guidelines | revizija celog `src/` po Vercelovim pravilima, izveštaj `fajl:linija` |
| 10 | Playwright CLI | snimci i provera na pravoj adresi, oba jezika |

Ako neki skill nije dostupan u sesiji, reci to u izveštaju i nastavi bez njega; ne instaliraj ništa sam.

### Šablon izveštaja posle faze
- Šta je urađeno (spisak).
- Šta je provereno i kako (lint, typecheck, build, snimci 390/1440, reduced motion).
- Odstupanja od definicije ili reference, i zašto.
- Šta mi treba od Veljka (ako išta).
- Predlog commit poruke.

---

## FAZA 0: Osnova

1. `git init`; **prvi commit: samo `.gitignore`** (Node, Next.js, `.env*`, `.vercel`, OS fajlovi, `test-results/`, `playwright-report/`, `.playwright-cli/`, `.impeccable/config.local.json`). Folder `.claude/skills/` **ide u repo** (skillovi su deo projekta).
2. Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + ESLint. Pre instalacije proveri trenutnu dokumentaciju za Next.js 16 i next-intl (npr. `proxy.ts` umesto `middleware.ts`).
3. Zavisnosti iz definicije: `gsap` (ScrollTrigger, Flip), `lenis`, `motion`, `next-intl`, `@radix-ui/react-dialog`, `@vercel/analytics`. Ništa više bez pitanja.
4. Fontovi preko `next/font/google`: Funnel Display, Funnel Sans, Geist Mono, sa `latin-ext`.
5. **Tokeni** (`src/styles/tokens.css` + Tailwind `@theme`): boje iz definicije (odeljak 4), radijusi, razmaci, senke i sjaj. Ako Claude Design u `design/` daje spisak tokena, uskladi i navedi razlike.
6. **Tokeni pokreta** (`src/lib/motion.ts`): kriva `cubic-bezier(0.22, 1, 0.36, 1)`, trajanja 160/320/700 ms, stagger 40 ms; isti brojevi kao CSS promenljive. I GSAP i Motion čitaju odavde.
7. **i18n:** next-intl, SR na `/` (podrazumevano), EN na `/en`; lokalizovane putanje projekata: SR `/radovi/<slug>`, EN `/en/work/<slug>`.
8. **Sadržaj kao podaci:** `src/content/` sa `{ sr, en }` parovima: `site.ts` (hero, meni, o meni, kako radim, kontakt, trak), `projects.ts` (5 projekata, slugovi iz definicije), `sites.ts` (demo sajtovi + Webflow), `links.ts`. Prenesi tekst **tačno** iz `sadrzaj/`.
9. `src/app/[locale]/design/page.tsx`: interna stranica sa svim tokenima, fontovima (uz č ć ž š đ) i osnovnim elementima (dugmad, oznake, linkovi). Ne linkuje se sa sajta i ima `noindex`.
10. `CLAUDE.md` u korenu sa pravilima iz ovog dokumenta (kratko) i `README.md` (pokretanje, struktura, gde je tekst).
11. Proveri da su skillovi iz tabele dostupni u `.claude/skills/` i navedi ih u izveštaju. Impeccable hook **ne uključuj**.

**Izveštaj + STOP.**

## FAZA 1: Kostur stranice

1. `[locale]/layout.tsx`: fontovi, tokeni, `<html lang>`, skip link, Vercel Analytics.
2. **Meni:** VV logo (privremeni SVG iz reference, komponenta `VVMark`), Radovi · O meni · Kontakt · SR/EN · dugme „Javi se“. Sakrije se pri skrolu na dole, vrati na gore, zamućena pozadina. Telefon: meni na dodir preko celog ekrana (fokus zarobljen, Escape zatvara).
3. Sve sekcije redom iz definicije (odeljak 3), sa **pravim tekstom** i jednostavnim rasporedom, bez efekata: hero, rečenica (placeholder; ako je tekst prazan, sekcija se ne renderuje), mesto za showreel, lista radova (statično), trak (statičan), sajtovi za firme, o meni + kako radim, podnožje.
4. Prebacivanje jezika čuva sekciju na kojoj je korisnik.
5. Osnovni SEO po jeziku: `title`, `description`, `hreflang`, canonical.

**Izveštaj + STOP.**

## FAZA 2: Hero

1. **Reč koja se menja** (Flipping Word Swap logika iz reference): flip po slovima, automatski na ~2,6 s; `<span>`, ne `<button>`; širina se animira ka sledećoj reči da rečenica ne skače; `aria-live="off"` i čitaču ekrana dostupna cela rečenica. Reduced motion: pretapanje.
2. **Pozadina:** mreža tačaka (CSS) + svetlo ispod kursora u boji `--energy` (maska) + **impulsi struje** kroz mrežu (canvas 2D, pravi uglovi, svetla glava, rep koji bledi; klik/tap pokreće impuls). Pauza van ekrana (IntersectionObserver), DPR najviše 2, manje impulsa na telefonu. Reduced motion: samo statične tačke.
3. Dugmad: „Pogledaj radove →“ (skrol do radova), „Kopiraj mejl“ (Clipboard API + vidljiva potvrda + fallback).

**Izveštaj + STOP.**

## FAZA 3: VV znak i uvod

1. `VVMark` kao čist SVG (dva V, drugo u `--energy`, „jako ukršteno“, rez u boji pozadine). Ako postoji `design/vv-monogram.png` iz Claude Designa, uskladi proporcije sa njim i navedi izmene.
2. **Uvod** (~1,2 s): struja iscrta oba V (stroke + iskra) → drugo V se napuni (bljesak) → dve polovine ekrana se razmaknu kao zavesa dok znak sleti na logo u meniju (GSAP Flip). Samo **prva poseta u sesiji** (`sessionStorage`, u `try/catch`); ne blokira sadržaj (tekst je u HTML-u od starta, uvod je sloj preko). Reduced motion: bez uvoda.
3. Favicon (16/32/48 + apple-touch) i OG slike po jeziku iz VV znaka (`opengraph-image`).

**Izveštaj + STOP.**

## FAZA 4: Skrol scene (rečenica + showreel)

1. **Lenis** samo za `pointer: fine`; na dodir izvorni skrol. Povezan sa ScrollTrigger-om. API za zaustavljanje (koristi ga popup u fazi 5).
2. **Rečenica sa strujom:** reči se pri skrolu pale iz sive u belo, a granicom proleti tanka Volt linija. Ako tekst ne postoji, sekcija se ne renderuje.
3. **Showreel:** mali minimalni okvir (prozor sa tri tačkice) se pri skrolu širi preko celog ekrana (ScrollTrigger pin + scrub), pa prelazi u radove. Video iz `public/media/showreel.*`; dok ga nema, poster placeholder. Na telefonu kraća scena; reduced motion: bez pina, statičan okvir.

**Izveštaj + STOP.**

## FAZA 5: Radovi i popup

1. Komponenta `VideoFrame`: minimalni okvir (desktop prozor / uspravni telefon za SeniorGuard), `muted loop playsinline`, `preload="none"`, poster, lazy-load; MP4 + WebM izvori iz `public/media/<slug>.*`, placeholder dok ih nema.
2. **Lista:** red = broj, ime, rečenica, oznake, „Detalji →“, mala uvek vidljiva sličica.
   - Desktop (`pointer: fine`): hover i fokus prikazuju video pregled koji pluta uz kursor (spring), sa oznakom „Detalji“; broj dobija boju struje.
   - Telefon: kartice; video svira kad je kartica na sredini ekrana, **samo jedan istovremeno**.
3. **Popup kao prava adresa:** intercepting + parallel routes. Klik iz liste otvara popup; direktan link ili osvežavanje otvara punu stranicu projekta. Radix Dialog (Escape, fokus, `role="dialog"`, zaključan skrol), Motion animacija (okvir/poster, video se ne razvlači), Lenis stop dok je otvoren. Telefon: ceo ekran. „Nazad“ u browseru zatvara popup.
4. Sadržaj popupa po šablonu: zaglavlje (ime, rečenica, status, godina, linkovi) → video → Zašto → Moja uloga → Kako je napravljeno → Stack. Metadata i OG po projektu.

**Izveštaj + STOP.**

## FAZA 6: Trak i sajtovi za firme

1. **Trak:** jedan red, beskonačan, brzina i smer prate skrol (GSAP); `aria-hidden` sa tekstom dostupnim jednom za čitač ekrana. Reduced motion: statičan.
2. **Snimci ekrana demo sajtova:** Playwright skripta (`scripts/screenshots.ts`) snima `djak.vercel.app` i `borivojevasojevic.vercel.app` (desktop + telefon) u `public/media/sites/`, optimizovano (WebP/AVIF). Pokreni je i navedi rezultat.
3. Dve velike kartice (Đak sa oznakom „samoinicijativni demo“, bratov portfolio sa oznakom „lični portfolio“) i „Otvori sajt ↗“ (`target="_blank" rel="noopener"`), manja kartica „Webflow radovi“. Bez popupa.

**Izveštaj + STOP.**

## FAZA 7: O meni i Kako radim

1. **Kartica koja se okreće:** napred fotografija 4:5 (`public/media/veljko.*`; do tada placeholder istog formata) + rotirajući prsten (Circular Text, prilagođen; „DOSTUPAN ZA SARADNJU •“ / „OPEN TO WORK •“, brzina prati skrol); pozadi „lična karta“ iz `sadrzaj/`. Okretanje klikom, tapom i tastaturom (`button` sa `aria-pressed`, sadržaj obe strane dostupan čitaču ekrana); tokom okretanja struja protrči po ivici. Reduced motion: pretapanje.
2. Tekst „O meni“ (tri pasusa, istaknute tri vrste posla).
3. „Kako radim“: naslov + tri koraka; veštine u dve kolone („Samostalno“ / „Uz AI asistenta“).
4. Ostavi prazno, označeno mesto za opcioni 3D sto (bez koda).

**Izveštaj + STOP.**

## FAZA 8: Podnožje i munje

1. Poziv, mejl sa kopiranjem jednim klikom + `mailto` (mejl sastavljen u klijentu, ne čitljiv botovima u HTML-u), kolone linkova, „Kod ovog sajta ↗“, donji red sa „Nazad na vrh ↑“.
2. **VASOJEVIĆ** u jednom redu, veličina se računa da tačno stane u širinu (i pri promeni veličine prozora i fonta).
3. **Munje** (canvas 2D, logika iz reference): povremeni udari (~3–5 s, samo kad je vidljivo i tab aktivan), lukovi od kursora ka slovima pri pomeranju miša, udar na tap; slova svetle pri udaru. Pauza van ekrana. Reduced motion: samo statičan tih sjaj.

**Izveštaj + STOP.**

## FAZA 9: Dorada, pristupačnost, performanse, SEO

1. Prolaz kroz sve sekcije: razmaci, ritam, tipografija, stanja hover/fokus/aktivno, prelomi teksta (SR i EN), prazna i greška stanja (video ne učita).
2. **Pristupačnost:** WCAG 2.2 AA (kontrast `--muted`/`--dim` na `--bg`!), tastatura svuda, vidljiv fokus, skip link, `aria` na popupu i kartici, axe provera na obe jezičke verzije.
3. **Performanse (telefon):** Lighthouse performanse ≥ 90, ostalo 100; LCP < 2,5 s; teške komponente (canvas, GSAP scene) dinamički i tek kad se približe ekranu; bez CLS-a od fontova i videa.
4. **SEO:** `sitemap.xml`, `robots.txt`, JSON-LD `Person` (ime, linkovi), OG po jeziku i projektu.
5. Skillovi: Emil (`review-animations`, `animation-performance`), Impeccable `audit` i `polish` (bez hookova), Web Design Guidelines na celom kodu. Ispravi realne nalaze; namerne stvari (struja, sjaj, Volt) ostaju i navedi ih.

**Izveštaj + STOP.**

## FAZA 10: Objava

1. Uputstvo za Vercel: import repoa, ime projekta `veljkovasojevic` (adresa `veljkovasojevic.vercel.app`), uključivanje Web Analytics. Ne radi deploy bez Veljkove potvrde.
2. Posle objave: Lighthouse i Playwright snimci na pravoj adresi, provera OG pregleda (link u porukama), oba jezika.
3. Kontrolna lista pre objave iz definicije (odeljak 11): dozvola prijatelja mehaničara, provera sličnih logoa, provera na pravom telefonu. Navedi šta je još otvoreno.

**Izveštaj + STOP.**

## FAZA 11 (opciono, samo na Veljkov zahtev): 3D sto

Ne počinji bez izričitog zahteva. Ako dođe: React Three Fiber, model od jednostavnih oblika ili CC0 sa proverenom licencom, učitavanje tek kad se približi ekranu, na telefonu i uz reduced motion unapred renderovan video/slika umesto WebGL-a, najviše jedan WebGL canvas na ekranu.

---

## Materijal koji stiže kasnije (ubacuje se bez menjanja koda)

| Šta | Gde ide |
|---|---|
| Videi projekata (do ~20 s) | `public/media/<slug>.mp4` + `.webm` + poster `.jpg/.webp` |
| Showreel (~15 s) | `public/media/showreel.*` |
| Fotografija 4:5 | `public/media/veljko.*` |
| Tekst rečenice sa strujom | `src/content/site.ts` (SR i EN) |
| Konačan VV znak | `VVMark` komponenta + favicon/OG |

Kad Veljko pošalje video: kompresuj ffmpeg-om (H.264 MP4 + VP9/AV1 WebM, bez zvuka, ~1080p, cilj 2–4 MB po videu), napravi poster iz prvog kadra i proveri da u kadru nema stvarnih podataka klijenata.
