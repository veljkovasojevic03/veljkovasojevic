# Projekti: nacrt teksta (SR), verzija 3

> Nacrt piše Claude, Veljko proverava. Izvori: README, SPEC i CASE_STUDY iz `E:\Projekti\servis-tole`,
> `Fanout Ai` i `relay-ai`; GitHub repo `veljkovasojevic03/cinespire` (kod); tekst odbrane diplomskog
> (`Govor.pdf`); `PORTFOLIO_KONTEKST.md`.
>
> v3: Veljko je prošao ⚠️ stavke (obrisao oznaku gde ostaju). Relay ⚠️ stavke uprošćene. CineSpire i
> SeniorGuard dopunjeni. Kratka objašnjenja tehničkih stavki za intervju: `sadrzaj/objasnjenja-za-intervju.md`.
>
> **Oznake u tekstu:**
> - ⚠️ = tehnička stavka. Zadrži je samo ako je možeš objasniti na intervjuu svojim rečima. Ako ne možeš, briši ili reci da je uprostim.
> - [?] = fali mi podatak, popuni ili ispravi.
>
> Šablon (isti za svih 5): zaglavlje → video → Zašto → Moja uloga → Kako je napravljeno → Stack.
> („Naučio sam“ izbačeno u v2, Veljkova odluka.) Engleska verzija se piše kad srpska bude potvrđena.

---

## 01 · Autoservis Tole

**Red u listi**
- Ime: Autoservis Tole
- Jedna rečenica: Aplikacija za auto-servis koju vlasnik koristi svaki dan.
- Oznake: Klijentski · U upotrebi · 2026

**Zaglavlje popupa:** Privatna aplikacija, prikazana videom

**Zašto**
Prijatelj sa ocem vodi malu automehaničarsku radnju. Popravke, dugovanja i delove pisali su u svesku. Trebalo im je nešto što radi na telefonu, u radionici, često prljavim rukama, i ne traži mnogo kucanja.

**Moja uloga**
Ceo projekat: razgovor sa vlasnikom, specifikacija po fazama, mockup u Claude Designu, izrada uz Claude Code i postavljanje na Vercel. Od prve faze do aplikacije u upotrebi prošla su dva dana.

**Kako je napravljeno**
- Napravljeno za radionicu: velika dugmad, česte popravke jednim dodirom sa unapred upisanom cenom i predlozi iz ranijih unosa, da se kuca što manje.
- Instalira se na telefon kao prava aplikacija (PWA), bez prodavnice aplikacija.
- Namerno bez automatike koja bi zbunila: dodavanje dela u popravku ne skida ga samo iz magacina, a paket brze pošte ne menja stanje. Vlasnik zadržava kontrolu.
- Osetljive radnje (brisanje popravki, česte popravke, kategorije) štiti Admin PIN koji se proverava u samoj bazi, ne samo u aplikaciji. PIN je heširan, a posle 5 pogrešnih pokušaja zaključava se na 5 minuta.
- Izvoz: PDF finansijski izveštaj za izabrani period i Excel cele istorije popravki.

**Stack:** Next.js · TypeScript · Supabase · Tailwind CSS · PWA · Vercel

---

## 02 · Fanout AI

**Red u listi**
- Jedna rečenica: Jedna ideja, pet gotovih tekstova odjednom.
- Oznake: Lični projekat · Objavljen · 2026

**Zaglavlje popupa:** [Otvori sajt ↗ fanout-ai.vercel.app] · [GitHub ↗ github.com/veljkovasojevic03/fanout-ai] · [Studija slučaja ↗]

**Zašto**
Ko piše za publiku, istu ideju piše pet puta: za blog, LinkedIn, Instagram, newsletter i X, i svaki format ima svoja pravila. Fanout od jedne ideje piše svih pet istovremeno, na srpskom ili engleskom, a zatim pomaže da se tekstovi doteraju, sačuvaju i zakažu.

**Moja uloga**
Sam, uz Claude Code: specifikacija u deset faza, dizajn, arhitektura i sve odluke, zapisane u dnevnik odluka. Posle svake faze sam proveravao testove i build pre nego što krene sledeća.

**Kako je napravljeno**
- Demo radi bez prijave i bez troška: „Sample mod“ strimuje unapred napisan sadržaj kroz isti put kao pravi AI, uz jasnu oznaku. Napisano je 30 takvih primera (3 teme × 2 jezika × 5 formata).
- Kvote (koliko generisanja ima koji plan) proveravaju se u bazi, u jednoj transakciji, pa dva istovremena zahteva ne mogu da pređu limit.
- Pet tekstova se strimuje paralelno; izmene se skupljaju i crtaju jednom po frejmu, da interfejs ne uspori.
- Zakazane objave idu na mejl i Discord preko n8n-a, sa potpisanim zahtevima u oba smera.
- Radi za 0 €: Vercel Hobby, Supabase Free, Stripe u test modu, a GitHub Actions svakih 5 minuta drži bazu budnom.
- Pristupačnost se proverava automatski (axe) na svakom ekranu, na oba jezika.

**Stack:** Next.js · TypeScript · Supabase · Claude API · Stripe (test) · n8n · Tailwind CSS · Playwright

---

## 03 · Relay AI

**Red u listi**
- Jedna rečenica: Chatbot za podršku koji odgovara iz FAQ-a, a kad zapne, zove čoveka.
- Oznake: Lični projekat · Objavljen · 2026

**Zaglavlje popupa:** [Otvori sajt ↗ relay-ai-teal.vercel.app] · [Demo prodavnica ↗ /demo] · [GitHub ↗ github.com/veljkovasojevic03/relay-ai]

**Zašto**
Male web prodavnice stalno dobijaju ista pitanja (dostava, povrat, gde mi je porudžbina), a nemaju ko da odgovara stalno. Vlasnik u Relay upiše FAQ i nalepi jednu liniju koda na sajt. Posetilac odmah dobija odgovor sa izvorom, a kad bot ne zna, razgovor uživo prelazi kod vlasnika.

**Moja uloga**
Sam, uz Claude Code: specifikacija, dizajn (namerno svetao i topao, drugačiji od Fanouta), arhitektura i odluke. n8n workflow-e sam pravio ručno, korak po korak, po radnoj svesci koju sam napisao.

**Kako je napravljeno**
- Widget od 13 KB, u Shadow DOM-u: jedna `<script>` linija, a ne kvari izgled sajta na kom stoji.
- Bot ne izmišlja: vraća tačan tekst pronađenog FAQ odgovora i pokazuje izvor. Pretraga razume značenje pitanja, ne samo iste reči.
- Prebacivanje na čoveka uživo, preko Supabase Realtime-a, sa rezervom ako mreža blokira sockete.
- n8n akcije (status porudžbine, otvaranje tiketa, mejlovi) pokreću se tek kad ih posetilac potvrdi, a svaki zahtev je potpisan, pa n8n prihvata samo poruke koje zaista šalje aplikacija.
- Pošteno o granicama: pretraga na srpskom je slabija jer je model engleski, pa je strožija i nudi predloge umesto nagađanja.
- Pravi AI razgovor (Live mod) svesno nije napravljen: projekat mora da košta 0, a sve ostalo radi i bez njega.

**Stack:** Next.js · TypeScript · Supabase (pgvector, Realtime) · n8n · Stripe (test) · Tailwind CSS

---

## 04 · CineSpire

> Popunjeno iz koda na GitHub-u i Veljkovog opisa. Uloga je napisana tako da se poklapa sa onim što je
> rečeno na odbrani (Controller sloj), a u Laravelu je to zaista sva logika aplikacije.

**Red u listi**
- Jedna rečenica: Društvena mreža za filmove i serije, u stilu Letterboxda.
- Oznake: Timski · Fakultet · 2026

**Zaglavlje popupa:** [GitHub ↗ github.com/veljkovasojevic03/cinespire] · (radi samo lokalno, pa ide video)

**Zašto**
Timski projekat na predmetu Internet programiranje: mesto gde ljubitelji filmova i serija ocenjuju i pišu recenzije, prave svoje liste, vode listu za gledanje i prate šta gledaju drugi.

**Moja uloga**
Tim od troje, podela po MVC slojevima. Ja sam radio **Controller sloj**, celu logiku aplikacije: od recenzija i lista do admin panela i uvoza podataka sa TMDB-a.

**Kako je napravljeno**
- Admin ukuca naziv filma ili serije, a podaci (opis, godina, poster...) se sami popune sa TMDB-a; admin ih po potrebi koriguje pre čuvanja.
- Recenzije sa ocenama i lajkovima; prosečna ocena filma ili serije računa se ponovo posle svake nove, izmenjene ili obrisane recenzije.
- Praćenje drugih korisnika, lista za gledanje, nedavno gledano i lične liste filmova i serija.
- Pretraga i filtriranje po žanru, sa paginacijom.
- Admin panel, zaštićen posebnim middleware-om: filmovi, serije, žanrovi, korisnici i moderacija recenzija.

**Stack:** Laravel · PHP · MySQL · Blade · Tailwind CSS · Alpine.js

---

## 05 · SeniorGuard

**Red u listi**
- Jedna rečenica: Nosivi uređaj i aplikacija koji javljaju porodici kad starijem članu zatreba pomoć.
- Oznake: Diplomski · IoT + Android · 2026

**Zaglavlje popupa:** [Pogledaj video sistema] · [GitHub ↗ github.com/veljkovasojevic03/SeniorGuard] (bez PDF-a diplomskog rada)

**Zašto**
Više od petine stanovnika Srbije ima preko 65 godina (Popis 2022), a mnogi žive sami. Problem nije samo pad, nego to što posle pada nema ko odmah da sazna. Komercijalna rešenja su zatvorena, skupa ili se ne mogu prilagoditi. SeniorGuard je moja ideja za diplomski: prototip koji pokazuje ceo put informacije, od senzora do telefona člana porodice.

**Moja uloga**
Ceo sistem, sam: ideja, izbor platforme i komponenti, električna šema, 3D štampano kućište, firmver, baza, Android aplikacija i dizajn (interaktivni prototip i logo).

**Kako je napravljeno**
- Uređaj se nosi na nadlaktici: ESP32 sa senzorima za puls i kiseonik (MAX30102), temperaturu (DS18B20), pokret i pad (MPU-6050) i GPS, plus SOS dugme koje se nađe bez gledanja i vibracioni motor za potvrdu.
- Izbor platforme: Arduino Nano nema mrežu i nema dovoljno memorije za šifrovanu vezu sa Firebase-om, a BLE senzor (CC2650) traži telefon kao posrednika. ESP32 ima ugrađen Wi-Fi, pa uređaj sam šalje podatke.
- Pad se prepoznaje na samom uređaju (ukupno ubrzanje preko 2,5 g), jer je to odluka kojoj je vreme bitno; oblak služi samo za prenos do aplikacije.
- Firmver se sam oporavlja: ponovo uspostavlja Wi-Fi vezu kad pukne i redovno se restartuje.
- Android aplikacija u Kotlinu, pet tabova (stanje, mapa, vitalni parametri, alarmi, porodica i podešavanja). Podaci se osvežavaju uživo, a servis u pozadini javlja svaki novi alarm preko celog ekrana, sa dugmićima „Videla/o sam, idem da proverim“ i „Pozovi hitnu pomoć (194)“.
- Četiri vrste alarma: SOS, pad, izostala jutarnja potvrda i duža neaktivnost. Mapa koristi OpenStreetMap, a stanje se može izvesti u PDF izveštaj.

**Stack:** ESP32 · Arduino (C++) · Firebase Realtime Database · Kotlin · Android · OpenStreetMap · 3D štampa

---

## Ostali radovi: bez posebnog odeljka (odluka v3)

Odeljak „Još radova“ se ne pravi. Ostali radovi se pominju **jednom rečenicom u „O meni“**, bez slika, videa i linkova (Cegerče je privatno), a za ostalo je tu GitHub profil. Radni predlog rečenice (konačno u nacrtu „O meni“):

> Pravim i stvari za svoje: porodični spisak za kupovinu koji svakodnevno koristimo, a usput su nastali i Java desktop aplikacija za rezervaciju smeštaja, 3D prikaz patika i igra koja se igra rukama ispred kamere.

Ne pominju se: `autic-app`, Expense Tracker, Freelance CRM, MojMajstor, Routine Guard (dok nije gotov).
