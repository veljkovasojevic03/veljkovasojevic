# Veljko Vasojević: portfolio, definicija projekta

> Verzija 1 · 22. 10. 2026. Jedan izvor istine za izgled, sadržaj i tehniku sajta.
> Sadrži samo **konačne odluke**. Istorija odlučivanja i razlozi su u `PORTFOLIO_KONTEKST.md`.
> Tekstovi su u `sadrzaj/` (SR: `projekti-nacrt.md`, `tekstovi-nacrt.md`; EN: `en.md`).
> Referentna izvedba izgleda i efekata: `design/stil-poredjenje.html`.

---

## 1. Šta pravimo i zašto

Jednostrani lični portfolio, srpski i engleski, za **poslodavce i klijente podjednako**.

Posle 30 sekundi posetilac treba da misli:
1. ume da napravi kompletan proizvod od ideje do objave;
2. ima oko za dizajn i detalje;
3. „ovog čoveka bih odmah zaposlio / angažovao“.

Sajt „prodaje umesto njega“: jasni radovi, jednostavan kontakt, bez pritiska.
Kvalitet je važniji od brzine; nema roka.

## 2. Principi (obavezni u svakoj fazi)

- **Iskrenost.** Bez izmišljenih metrika, citata, testimonijala i logoa. Demo je demo, timski rad ima tačno opisanu ulogu, privatno ostaje privatno. Ne koristiti „full-stack“.
- **AI je proces, ne kategorija.** Veštine su javno podeljene na „Samostalno“ i „Uz AI asistenta“. Sve pod „Kako je napravljeno“ Veljko mora umeti da objasni.
- **Miran temelj + nekoliko potpisnih trenutaka.** „Brutalno“ dolazi od izvedbe, ne od količine efekata.
- **Telefon mora savršeno.** Svaki efekat ima mobilnu i „smanji pokrete“ verziju.
- **Sadržaj ne čeka animaciju.** Tekst je u HTML-u od prvog trenutka.
- **Bez lokacije rada** nigde na sajtu.

## 3. Struktura stranice (redom)

| # | Sekcija | Šta je u njoj |
|---|---|---|
| 0 | **Uvod (VV)** | ~1,2 s, samo prva poseta u sesiji. Struja iscrta oba V → drugo V se „napuni“ (bljesak u Volt boji) → ekran se razdvoji na dve polovine kao zavesa dok znak sleti na mesto logoa u meniju (GSAP Flip). Uz „smanji pokrete“ se ne prikazuje. |
| — | **Meni** | Logo VV · Radovi · O meni · Kontakt · SR/EN · dugme „Javi se“. Sakrije se pri skrolu na dole, vrati na gore, zamućena pozadina. Na telefonu: meni na dodir. |
| 1 | **Hero** | Oznaka, naslov sa reči koja se menja (flip po slovima, automatski na ~2,6 s), podnaslov, dva dugmeta. Pozadina: mreža tačaka + svetlo u boji struje ispod kursora + povremeni impulsi struje kroz mrežu (klik/tap pokreće impuls). |
| 2 | **Rečenica sa strujom** | Velika rečenica; pri skrolu se reči pale iz sive u belo, kroz njih proleti Volt struja. **Tekst otvoren** (Veljko piše). Ako ga nema, sekcija se izbacuje. |
| 3 | **Showreel** | Mali okvir sa showreel videom (~15 s, isečci svih projekata) pri skrolu se širi preko celog ekrana („ulazimo u sliku“), pa prelazi u radove. Zakačena scena (ScrollTrigger pin), na telefonu kraća. |
| 4 | **Radovi 01–05** | Numerisana lista (vidi 6.1). Redosled: Autoservis Tole · Fanout AI · Relay AI · CineSpire · SeniorGuard. |
| 5 | **Trak** | Jedan trak pri skrolu: WEB SAJTOVI ✦ WEB APLIKACIJE ✦ AI ALATI ✦ (brzina prati skrol; tekst privremen, može se menjati). |
| 6 | **Sajtovi za firme** | Dve velike kartice (Đak Food Store, Pribojska Banja) sa snimkom ekrana i „Otvori sajt ↗“, oznaka „samoinicijativni demo“; manja kartica „Webflow radovi“. Bez popupa. |
| 7 | **O meni + Kako radim** | Kartica sa fotografijom koja se okreće + kratka priča; tri koraka „Kako radim“; veštine u dve kolone. (Mesto za opcioni 3D sto.) |
| 8 | **Kontakt / podnožje** | Poziv, kopiranje mejla, kolone linkova, ogromno ime VASOJEVIĆ sa munjama, donji red. |

**Nema:** odeljka „Još radova“, testimonijala, CV-a (za sada), forme, chatbota, komandne palete, svetle teme.

## 4. Vizuelni identitet

### Boje (tokeni)
| Token | Vrednost | Upotreba |
|---|---|---|
| `--bg` | `#07070A` | pozadina |
| `--bg-2` | `#0D0D12` | kartice, površine |
| `--line` / `--line-2` | `rgba(255,255,255,.08)` / `.14` | ivice |
| `--text` | `#EDEDF0` | tekst |
| `--muted` / `--dim` | `#8D8D97` / `#55555E` | sporedni tekst (proveriti AA kontrast) |
| `--accent` | `#D6E2FF` (Bela usijanost) | **UI:** dugmad, oznake, linkovi, fokus |
| `--energy` | `#CCFF33` (Volt) | **samo „struja“:** munje, impulsi, drugo V, reč u hero-u, svetlo ispod kursora, broj reda na hover |
| `--energy-hot` | `#F4FFD1` | jezgro munje, bljesak |

Pravilo: Volt se pojavljuje samo tamo gde „teče struja“. Zabranjeno: indigo, ljubičasto-plavi gradijent, cijan, smaragd. **Samo tamna tema.**

### Tipografija
- Naslovi: **Funnel Display** (700, tracking oko −0,045em); tekst: **Funnel Sans**; sitne oznake: **Geist Mono**.
- Svi fontovi sa Latin Extended (č, ć, ž, š, đ), preko `next/font`.

### VV monogram
- Dva geometrijska V; prvo **belo** (`--text`), drugo u boji **struje**, **jako ukrštena**: drugo V prelazi preko desnog kraka prvog, sa rezom u boji pozadine oko drugog V.
- Skica geometrije: jedno V = `M0 0H26L55 92L84 0H110L68 140H42Z`, drugo pomereno za 54 jedinice; rez = stroke `--bg`, širina 9.
- Konačan oblik dorađuje Claude Design; pre objave provera sličnih znakova (EUIPO eSearch, WIPO Global Brand Database).
- Upotreba: logo u meniju, uvod, favicon, OG slika, poleđina kartice.

### „Struja“ (glavni motiv)
- Munja u stilu serije The Flash: brzo se iscrta, razgrana, zatreperi, ugasi.
- Gde: uvod (VV), hero (impulsi kroz tačke), rečenica sa strujom, podnožje (munje po imenu).
- Izvedba: canvas 2D (munje, impulsi) i SVG (VV). Najviše jedan canvas aktivan istovremeno; pauza van ekrana.

### Okviri videa
- Minimalni: zaobljen okvir, tanka ivica, blag sjaj, tri tačkice kao prozor browsera. SeniorGuard: uspravan okvir telefona. Bez realističnih mockupa.

## 5. Pokret

- **GSAP + ScrollTrigger + Lenis** za sve što je vezano za skrol (zakačene scene, širenje showreel-a, trak, rečenica). **Motion** za stanje komponenti (popup, hover, tap).
- **Tokeni pokreta** u jednom fajlu, čitaju ih obe biblioteke: kriva `cubic-bezier(0.22, 1, 0.36, 1)` (izlaz); trajanja brzo 160 ms, srednje 320 ms, sporo 700 ms; stagger 40 ms. Kontrole ispod 300 ms; skrol scene i uvod su namerni izuzeci.
- Tri vrste pokreta: pojavljivanje pri skrolu, reakcija na hover/tap/fokus, pokret vezan za skrol.
- Najviše jedan „veliki trenutak“ po sekciji.
- **`prefers-reduced-motion`:** bez uvoda, bez munja i impulsa (samo statičan tih sjaj), bez zakačenih scena, reč u hero-u se menja pretapanjem, kartica se okreće pretapanjem.
- **Lenis samo na uređajima sa mišem**; na dodir izvorni skrol. Lenis se zaustavlja dok je popup otvoren.

## 6. Komponente

### 6.1 Lista radova i popup
- Red: broj (Geist Mono), ime, jedna rečenica, oznake (status), „Detalji →“.
- **Računar:** hover i fokus tastaturom prikazuju video pregled koji pluta uz kursor (samo `pointer: fine`), sa malom oznakom „Detalji“. Svaki red ima i malu, uvek vidljivu sličicu.
- **Telefon:** kartice; video se sam pusti kad je kartica na sredini ekrana (jedan po jedan); vidljivo dugme „Detalji →“.
- **Popup = prava adresa** (Next.js intercepting routes): klik iz liste otvara popup, direktan link otvara punu stranicu. SR `/radovi/<slug>`, EN `/en/work/<slug>`.
- Osnova: Radix Dialog (Escape, zarobljen fokus, `role="dialog"`, zaključan skrol) + Motion. Video se pri otvaranju ne razvlači (animira se okvir/poster). Na telefonu popup je ceo ekran.
- Šablon sadržaja (isti za svih 5): zaglavlje (ime, rečenica, status, godina, linkovi) → video → Zašto → Moja uloga → Kako je napravljeno → Stack.
- Slugovi: `autoservis-tole`, `fanout-ai`, `relay-ai`, `cinespire`, `seniorguard`.

### 6.2 Kartica sa fotografijom (O meni)
- Napred: fotografija 4:5 (do dolaska prave: placeholder) i rotirajući prsten teksta (Circular Text, React Bits, MIT + Commons Clause): „DOSTUPAN ZA SARADNJU •“ / „OPEN TO WORK •“; brzina prati skrol.
- Pozadi „lična karta“: VV, ime, „Diplomirani inženjer elektrotehnike i računarstva“, FTN Čačak · master u toku, Priboj, Srbija, ● Dostupan za saradnju.
- Okretanje klikom, tapom ili tastaturom; tokom okretanja struja protrči po ivici. Na poleđini nema ničega čega nema i u vidljivom tekstu.

### 6.3 Dugmad i linkovi
- Glavno dugme: puna boja `--accent`, tamni tekst. Specular Button (React Bits) samo za glavni poziv, na 1–2 mesta.
- Linkovi u meniju: Flipping Word Swap (GSAP) kao `<span>` varijanta (ne `<button>` unutar `<a>`).
- Sve komponente sa strane se **preoblikuju po našim tokenima**.

### 6.4 Podnožje
- Poziv „Imaš ideju ili posao za mene? Hajde da popričamo.“ + mejl sa kopiranjem jednim klikom (+ `mailto`); mejl blago zaštićen od botova.
- Kolone: Kontakt (Mejl, LinkedIn) · Radovi (GitHub, Webflow radovi) · Jezik. Link „Kod ovog sajta ↗“.
- **VASOJEVIĆ** u jednom redu, preko cele širine (veličina se računa da stane); munje povremeno (~3–5 s), lukovi od kursora ka slovima, udar na tap.
- Donji red: © 2026 Veljko Vasojević · Nazad na vrh ↑. (Priboj izbačen iz hero-a i podnožja, 23. 10. 2026.)

## 7. Sadržaj i linkovi

- Tekst: `sadrzaj/projekti-nacrt.md`, `sadrzaj/tekstovi-nacrt.md` (SR) i `sadrzaj/en.md` (EN). U kodu sav tekst živi kao podaci (`{ sr, en }` parovi), ne u JSX-u.
- Ton: profesionalno + tračak ličnosti. **Obraćanje posetiocu: „ti“ svuda** (npr. „Treba ti sajt?“, „Imaš ideju…“).
- Hero podnaslov i „O meni“ govore **šta Veljko radi**, ne odakle je (v2 teksta).
- Hero: SR „Pretvaram ideje u gotove, doterane [web aplikacije / sajtove / AI alate].“ · EN „I turn ideas into finished, polished [web apps / websites / AI tools].“
- Linkovi: mejl `veljkovasojevic03@gmail.com` · GitHub `github.com/veljkovasojevic03` · LinkedIn `linkedin.com/in/veljko-vasojevic` · Webflow `veljkovasojevic.webflow.io` · Fanout `fanout-ai.vercel.app` · Relay `relay-ai-teal.vercel.app` (+ `/demo`) · Đak `djak.vercel.app` · Pribojska Banja `pribojska-banja.com`.

## 8. Tehnika

- **Stack:** Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 · GSAP (ScrollTrigger, Flip) · Lenis · Motion · next-intl · Radix Dialog. React Three Fiber samo ako se kasnije radi sto.
- **Jezici:** SR na `/`, EN na `/en`; `hreflang`, metadata i OG po jeziku.
- **Hosting:** Vercel Hobby, `veljkovasojevic.vercel.app`. **Vercel Web Analytics** (bez kolačića).
- **Repo:** javno na GitHub-u. Prvi commit je `.gitignore`. Nikada tajne u repou (sajt ih ionako nema).
- **Videi:** Veljko ih pravi sam (do ~20 s po projektu + showreel). Hostuju se na Vercelu sa sajtom. MP4 (H.264) + WebM, poster slika, `muted loop playsinline`, lazy-load, jedan aktivan video na telefonu. Do tada placeholder posteri. Video mehaničara bez stvarnih podataka klijenata.
- **Snimci ekrana demo sajtova:** pravi ih Claude Code (Playwright) sa živih sajtova.
- **SEO:** naslov i opis po jeziku, OG slika (VV + ime), favicon iz VV, `sitemap.xml`, `robots.txt`, strukturisani podaci `Person`.
- **Pristupačnost:** WCAG 2.2 AA, vidljiv fokus, skip link, tastatura svuda, `aria` na popupu i kartici, AA kontrast.
- **Performanse (cilj, telefon):** Lighthouse performanse ≥ 90, pristupačnost/SEO/best practices 100; LCP < 2,5 s; fontovi preko `next/font`; teški efekti se učitavaju tek kad se približe ekranu.

## 9. Skillovi u izradi

Emil Kowalski (pokret), Impeccable (selektivno, bez hookova; „struja“ je namerna), Web Design Guidelines (završna revizija), Playwright CLI (snimci telefon/desktop posle svake faze). Taste Skill se ne koristi. Kada se koji koristi odlučuje Claude.

## 10. Materijal koji stiže kasnije (gradi se sa placeholderom)

- Videi projekata i showreel (Veljko, uz Claude).
- Fotografija (Veljko, doradom u ChatGPT-u; prompt je u istoriji razgovora i ponavlja se u fazi „O meni“).
- Tekst rečenice sa strujom (Veljko).
- Konačan VV znak (Claude Design).

## 11. Pre objave (obavezno)

- Dozvola prijatelja mehaničara za javni prikaz aplikacije; u videu bez stvarnih podataka.
- Provera sličnih logoa za VV.
- Provera na pravom telefonu (Android i iPhone ako je moguće).

## 12. Van okvira

Odeljak „Još radova“, testimonijali, CV (za sada), kontakt forma, Relay chatbot na sajtu, komandna paleta, svetla tema, YouTube i dugi video, pominjanje lokacije rada, Orfej sajt. **3D sto:** opciona faza posle objave.
