# Prompt za Claude Design: portfolio Veljka Vasojevića

> **Kako se koristi:** nalepi sve ispod linije u Claude Design. Uz prompt **otpremi fajl
> `design/stil-poredjenje.html`** (otvoren u browseru, snimci ekrana ili sam fajl) kao referencu za
> boje, fontove, VV znak i munje. Radi u dva koraka: prvo VV monogram (deo A), pa ekrani (deo B).
> Rezultate izvezi kao PNG u folder `design/` sa imenima iz dela C.

---

## Ko sam i šta pravimo

Ja sam Veljko Vasojević, inženjer računarstva iz Priboja (Srbija). Pravim lični portfolio, jednu dugu stranicu na srpskom (engleska verzija ima isti raspored). Publika su **poslodavci i klijenti podjednako**. Posle 30 sekundi posetilac treba da misli: „ume da napravi kompletan proizvod, ima oko za detalje, odmah bih ga angažovao“.

Pravac: **tamno, premium, elegantno, u duhu Vercela i Lineara**. Tipografija i razmak nose utisak. Miran temelj, plus nekoliko „potpisnih trenutaka“ vezanih za jedan motiv: **struju** (munja kao u seriji The Flash: brzo se iscrta, razgrana, zatreperi).

Ovo služi kao **vizuelna referenca za izradu u kodu** (Next.js + Tailwind), pa crtaj stvari koje se mogu napraviti u CSS-u/SVG-u/canvasu, bez fotomontaža i 3D rendera.

## Pravila koja se ne krše

- **Samo tamna tema.**
- **Boje:**
  - pozadina `#07070A`, površine `#0D0D12`, ivice `rgba(255,255,255,.08)` i `.14`;
  - tekst `#EDEDF0`, sporedni `#8D8D97`, prigušeni `#55555E`;
  - **akcent (UI)** `#D6E2FF`: dugmad, oznake, linkovi, fokus;
  - **struja** `#CCFF33` (jezgro `#F4FFD1`): **samo** munje, impulsi, drugo V u znaku, reč koja se menja u naslovu i svetlo ispod kursora. Nigde drugde.
- **Zabranjeno:** indigo, ljubičasto-plavi gradijenti, cijan, smaragd, gradijent-tekst, emoji, stock ilustracije, lažni dashboard-i, izmišljeni brojevi i logoi klijenata, testimonijali.
- **Fontovi:** naslovi **Funnel Display** (700, gusto, tracking oko −0,045em); tekst **Funnel Sans**; sitne oznake **Geist Mono**. Tekst je na srpskoj latinici (č, ć, ž, š, đ moraju izgledati ispravno).
- **Telefon mora izgledati jednako dobro** kao desktop. Svaki ekran crtaš u obe širine.
- Sav tekst koristi **tačno kako je dat ispod**; ne izmišljaj tekst.

---

## A. VV monogram (prvi korak)

Doradi znak iz reference:
- Dva geometrijska, debela V (oblik kao `M0 0H26L55 92L84 0H110L68 140H42Z`).
- **Prvo V belo** (`#EDEDF0`), **drugo V u boji struje** (`#CCFF33`).
- **Jako ukrštena:** drugo V prelazi preko desnog kraka prvog, sa tankim rezom u boji pozadine oko drugog V, da izgleda isprepleteno.
- Mora se čitati kao **VV, nikako kao W**.

Prikaži na jednom listu:
1. znak velik, na tamnoj pozadini;
2. 2–3 varijacije proporcija (debljina krakova, jačina ukrštanja, širina reza), sa preporukom koja je najbolja;
3. veličine 16, 32 i 48 px (favicon) i logo u meniju (~40 px širine);
4. jednobojnu verziju (sve belo) za mesta gde boja ne može;
5. **OG sliku** 1200×630: znak + „Veljko Vasojević“ + „Pretvaram ideje u gotove, doterane web aplikacije.“, sa tihim tragom munje.

> Na celom sajtu posetiocu se obraćamo sa **„ti“** (npr. „Treba ti sajt?“, „Imaš ideju…“), nikad „vi“.

---

## B. Ekrani (desktop 1440 px i telefon 390 px)

### B1. Uvod (VV)
Tri kadra: (1) tanke konture oba V se iscrtavaju, a svetla iskra vodi liniju; (2) drugo V se „napuni“ strujom, sa bljeskom i sjajem; (3) ekran se razdvaja na dve polovine kao zavesa, a znak leti ka mestu logoa u meniju.

### B2. Meni
Levo VV logo; u sredini Radovi · O meni · Kontakt; desno SR/EN i dugme „Javi se“ (puna boja akcenta, tamni tekst). Varijanta kad je meni preko sadržaja: zamućena pozadina. Telefon: logo + dugme menija, i otvoren meni preko celog ekrana.

### B3. Hero
- Oznaka (Geist Mono, mala, sa kratkom linijom u boji struje): `VELJKO VASOJEVIĆ · PRIBOJ`
- Naslov: **Pretvaram ideje u gotove, doterane web aplikacije.** („web aplikacije“ je u boji struje; ta reč se smenjuje sa „sajtove“ i „AI alate“. Nacrtaj i jedan kadar dok se slova okreću.)
- Podnaslov: Od skice i dizajna, preko koda i baze, do objave na internetu. Gotovo znači da radi i na telefonu, a doterano da se vidi svaki detalj.
- Dugmad: **Pogledaj radove →** (puno, akcent) · **Kopiraj mejl** (obris)
- Pozadina: tiha mreža sitnih tačaka (razmak ~22 px); oko kursora tačke svetle bojom struje; jedan impuls struje putuje kroz mrežu pod pravim uglovima, kao trag na štampanoj ploči, sa svetlom glavom i repom koji bledi.

### B4. Rečenica sa strujom
Velika rečenica u sredini ekrana (koristi privremeni tekst „Ovde ide kratka rečenica od nekoliko reči.“). Kadar u toku skrola: prve reči su bele, ostale sive, a preko granice prolazi tanka svetla linija struje.

### B5. Showreel koji se širi
Dva kadra: (1) mali okvir videa u sredini, minimalni prozor browsera (zaobljeni uglovi, tanka ivica, tri tačkice, blag sjaj); (2) isti video preko celog ekrana. Unutra ide privremeni kadar.

### B6. Radovi (lista)
- Naslov sekcije: **Izabrani radovi**, oznaka `RADOVI`.
- Pet redova, svaki: broj (Geist Mono), ime, jedna rečenica, oznake, „Detalji →“, plus mala sličica.
  1. `01` **Autoservis Tole**: Aplikacija za auto-servis koju vlasnik koristi svaki dan. · Klijentski · U upotrebi · 2026
  2. `02` **Fanout AI**: Jedna ideja, pet gotovih tekstova odjednom. · Lični projekat · Objavljen · 2026
  3. `03` **Relay AI**: Chatbot za podršku koji odgovara iz FAQ-a, a kad zapne, zove čoveka. · Lični projekat · Objavljen · 2026
  4. `04` **CineSpire**: Društvena mreža za filmove i serije, u stilu Letterboxda. · Timski · Fakultet · 2026
  5. `05` **SeniorGuard**: Nosivi uređaj i aplikacija koji javljaju porodici kad starijem članu zatreba pomoć. · Diplomski · IoT + Android · 2026
- **Hover stanje (desktop):** red se blago osvetli, broj dobije boju struje, a pored kursora pluta video pregled u minimalnom okviru sa malom oznakom „Detalji“.
- **Telefon:** kartice jedna ispod druge, video u okviru, dugme „Detalji →“.

### B7. Popup projekta
Desktop: veliki prozor preko zamućene stranice. Telefon: ceo ekran. Primer za Fanout AI:
- Zaglavlje: **Fanout AI**, „Jedna ideja, pet gotovih tekstova odjednom.“, oznake, linkovi „Otvori sajt ↗“ · „GitHub ↗“ · „Studija slučaja ↗“, dugme za zatvaranje.
- Video u minimalnom okviru.
- **Zašto:** Ko piše za publiku, istu ideju piše pet puta: za blog, LinkedIn, Instagram, newsletter i X, i svaki format ima svoja pravila. Fanout od jedne ideje piše svih pet istovremeno, na srpskom ili engleskom, a zatim pomaže da se tekstovi doteraju, sačuvaju i zakažu.
- **Moja uloga:** Sam, uz Claude Code: specifikacija u deset faza, dizajn, arhitektura i sve odluke, zapisane u dnevnik odluka.
- **Kako je napravljeno** (lista): Demo radi bez prijave i bez troška („Sample mod“). · Kvote se proveravaju u bazi, u jednoj transakciji. · Pet tekstova se strimuje paralelno. · Zakazane objave idu na mejl i Discord preko n8n-a. · Radi za 0 €.
- **Stack** (oznake): Next.js · TypeScript · Supabase · Claude API · Stripe (test) · n8n · Tailwind CSS · Playwright

Dodatno: SeniorGuard ima **uspravan okvir telefona** umesto prozora browsera; prikaži taj okvir bar u jednom kadru.

### B8. Trak
Jedan red velikog teksta koji se pomera: `WEB SAJTOVI ✦ WEB APLIKACIJE ✦ AI ALATI ✦`

### B9. Sajtovi za firme
- Naslov: **Treba ti sajt?**
- Tekst: Napravio sam nekoliko sajtova za lokalne firme na svoju inicijativu, kao demo, da pokažem kako bi mogli da izgledaju. Nisu naručeni, ali su urađeni kao da jesu.
- Dve velike kartice sa snimkom ekrana (privremena slika): **Đak Food Store, Čačak** i **Privatni smeštaj, Pribojska Banja**, svaka sa oznakom „samoinicijativni demo“ i dugmetom „Otvori sajt ↗“.
- Manja kartica: **Webflow radovi**, „5 starijih sajtova u Webflow-u“, „Otvori ↗“.

### B10. O meni + Kako radim
- **Kartica sa fotografijom** (4:5, privremena silueta), u dva kadra: napred fotografija i rotirajući kružni tekst u uglu `DOSTUPAN ZA SARADNJU •`; pozadi „lična karta“ sa VV znakom, „Veljko Vasojević“, „Diplomirani inženjer elektrotehnike i računarstva“, „FTN Čačak · master u toku“, „Priboj, Srbija“, „● Dostupan za saradnju“. Plus jedan kadar okretanja, sa strujom koja protrčava po ivici kartice.
- **Tekst pored kartice** (tri pasusa; „Web aplikacije po meri“, „Sajtove“ i „AI alate“ su istaknuti):
  - Ja sam Veljko. Diplomirao sam računarsko i softversko inženjerstvo na Fakultetu tehničkih nauka u Čačku i upisao master na istom smeru.
  - Pravim tri vrste stvari. **Web aplikacije po meri:** od internih alata za jednu firmu do kompletnih SaaS proizvoda sa nalozima, plaćanjem i bazom. **Sajtove** za firme koje žele da ostave utisak, a ne samo da postoje na internetu. I **AI alate** koji preuzmu ponavljajući posao, od pisanja sadržaja do odgovaranja kupcima.
  - Sve radim od početka do kraja: dizajn, kod, baza i objava. Van ekrana pratim tenis i fudbal, a slobodno vreme delim između online kurseva i društva. Društvo obično pobedi.
- **Kako radim**, naslov: **AI je moj alat, ne moja zamena.** Tri koraka:
  1. **Prvo definišem.** Svaki projekat počinje razgovorom i pisanom specifikacijom po fazama: šta se pravi, za koga i šta nije deo posla.
  2. **Pa gradim, fazu po fazu.** Kod pišem uz AI asistenta (Claude Code). Arhitekturu, odluke i ono što je bitno korisniku vodim ja; posle svake faze proveravam i testiram, pa tek onda idem dalje.
  3. **I isporučujem.** Objava, provera na telefonu, ispravke. Projekat je gotov kad ga neko koristi, ne kad prođe build.
- **Veštine u dve kolone:**
  - **Samostalno:** HTML, CSS, JavaScript · GSAP · Webflow · Git i GitHub · SQL / MySQL · Laravel / PHP · Java · Kotlin i Android · ESP32 / Arduino
  - **Uz AI asistenta:** React · Next.js · TypeScript · Node.js · Supabase · Stripe · n8n

### B11. Kontakt / podnožje
- Poziv: **Imaš ideju ili posao za mene? Hajde da popričamo.**
- Mejl `veljkovasojevic03@gmail.com` sa malom oznakom „KOPIRAJ“ (i stanje „KOPIRANO ✓“).
- Kolone: KONTAKT (Mejl, LinkedIn) · RADOVI (GitHub, Webflow radovi) · JEZIK (English); link „Kod ovog sajta ↗“.
- **VASOJEVIĆ** ogromnim slovima u jednom redu, preko cele širine: tamna slova sa tankim obrisom u boji struje, i **jedan kadar sa munjom** koja se razgranava preko slova, dok slova svetle.
- Donji red: © 2026 Veljko Vasojević · Priboj · Nazad na vrh ↑

---

## C. Izvoz (imena fajlova)

PNG, u folder `design/`:
- `vv-monogram.png`, `og-image.png`
- `desktop-01-uvod.png` … `desktop-11-podnozje.png` (redosled kao B1–B11)
- `mobile-01-uvod.png` … `mobile-11-podnozje.png`
- `desktop-06b-hover.png`, `desktop-07-popup.png`, `mobile-07-popup.png`, `desktop-10b-kartica-pozadi.png`

## D. Na kraju mi napiši

1. Koju varijantu VV znaka preporučuješ i zašto.
2. Gde si odstupio od pravila i zašto (ako jesi).
3. Spisak svih tokena koje si koristio (razmaci, radijusi, senke, veličine fonta), da ih prenesem u kod.
