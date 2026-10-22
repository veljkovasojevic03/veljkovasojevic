# Portfolio sajt — kontekst i stanje dogovora

> Prvo stanje: 22. oktobar 2026. Poslednja dopuna: 22. oktobar 2026 (krug 4, prvi deo).
> Ovo je **predajni dokument** (handoff), ne konačni prompt za izradu. Dopunjava se posle svakog kruga.
> **Ne počinji da pravi sajt na osnovu ovog fajla.** Konačna definicija i fazni prompt se pišu tek kad se zatvore krugovi 4 do 7 (odeljak 10).

## 0. Kako da koristiš ovaj fajl (uputstvo za Claude)

- Veljko komunicira na srpskom (latinica). Odgovaraj na srpskom, osim tehničkih pojmova.
- Radni stil: temu prvo detaljno definišemo razgovorom (po krugovima, kratka pitanja sa ponuđenim odgovorima gde ima smisla), zatim se piše `.md` prompt u fazama za Claude Code. Claude Code posle svake faze javlja šta je uradio i čeka potvrdu.
- Ne pogađaj ono što piše kao „otvoreno“. Pitaj, jedno po jedno.
- Budi iskren i konkretan. Veljko ceni kad mu kažeš šta ne valja i zašto, ne samo šta valja.
- Prvi commit u svakom novom repou je `.gitignore`. Nikada ne commituj tajne.
- Ako nešto ovde zvuči kao činjenica, a nisi siguran da je tačno, proveri sa Veljkom pre nego što uđe u sajt.

---

## 1. Ko je Veljko (samo ono što je bitno za portfolio)

- **Veljko Vasojević**, 23 godine, iz Priboja (Srbija). Upravo diplomirao Računarsko i softversko inženjerstvo na Fakultetu tehničkih nauka u Čačku (prosek 8,79). Upisao je master na istom smeru.
- Nema formalno plaćeno radno iskustvo, nema sertifikate ni takmičenja. To ne skrivamo i ne glumimo suprotno.
- Traži posao ili praksu (prva konkretna prilika je firma Artifision u Čačku, AI automatizacija i softver po meri) i istovremeno želi da radi za klijente (sajtovi i web aplikacije).
- Voli da uči pravljenjem stvarnih stvari, ne apstraktnim učenjem.
- Društven je i voli šalu, ali ume da bude ozbiljan kad treba. Ne voli aktivnu prodaju i hladne pozive, pa sajt treba da „prodaje umesto njega“ (jasni projekti, jednostavan kontakt, bez pritiska).
- Jezici: srpski (maternji), engleski (samoprocena B1–B2). Sajt ide na **srpskom i engleskom**.
- Radi uz **Claude Code** (VS Code ekstenzija), koristi i Claude Design za mockup-e.

### Tehničke veštine, poštena slika
- **Jako:** Webflow (smatra ga ozbiljnom veštinom), HTML/CSS/JavaScript (Vite + GSAP), Git/GitHub, osnove SQL/MySQL, Laravel/PHP (fakultet), Kotlin i Android Studio (diplomski), ESP32/Arduino firmver, Java i malo C-a (odavno nije koristio).
- **Uglavnom kroz rad sa Claude Code-om (vibe coding), ne duboko ručno znanje:** React, Next.js, Node.js/Express, Supabase, Stripe.
- **n8n:** koristio u dva projekta; u novom projektu (Relay AI) workflow-ove pravi ručno, sa radnom sveskom.
- Ima iskustva i sa React Three Fiber + GSAP (probao 3D prikaz patika) i sa interaktivnim eksperimentima preko kamere (MediaPipe).
- Na sajtu veštine treba podeliti pošteno: „osnovno znanje“ i „uz AI (Claude Code)“. Ne koristiti oznaku „full-stack“ jer nije radio profesionalno.

---

## 2. Cilj portfolija

- **Publika: poslodavci i klijenti podjednako.**
- **Utisak posle 30 sekundi:** (1) ume da napravi kompletan proizvod od ideje do deploy-a, (2) ima oko za dizajn i detalje, (3) „ovog čoveka bih odmah zaposlio da mi napravi web aplikaciju ili sajt“.
- Treba da izgleda „brutalno“ (vrhunski). Nema žurbe, kvalitet je važniji od brzine.
- Ima i drugu svrhu: Veljko želi da vidi kako rade Claude dizajn skillovi koje je video da ljudi preporučuju i kako sajt izgleda uz njih (vidi odeljak 8).

---

## 3. Šta je već odlučeno

**Krug 1 (cilj i pozicioniranje), zatvoren**
- Publika, utisak i pristup AI-ju kao u odeljku 2 i 5.

**Krug 2 (sadržaj), zatvoren — delimično izmenjen u krugu 4**
- ~~Struktura varijanta C: svaki projekat kao velika „scena“ celom širinom.~~ **Zamenjeno u krugu 4:** projekti su **ispisana numerisana lista** (vidi krug 4 niže). I dalje bez podele „vibe coding / fakultet / Webflow“.
- Glavni projekti: **aplikacija za mehaničara, Fanout AI, Relay AI, CineSpire**, i **SeniorGuard** kao mogući peti (mesto se odlučuje, vidi odeljak 10).
- Svaki video je kratak (oko 20–30 s), **bez zvuka, vrti se u petlji**. Za Fanout AI već postoji video od ~20 s generisan uz Claude.
- Demo sajtovi za lokalne firme se prikazuju kao poseban odeljak za klijente kojima treba sajt, sa jasnom oznakom da su samoinicijativni demo radovi.
- Webflow: ili poslednja stavka u odeljku sa demo sajtovima, ili u „Stariji radovi / Još radova“. Nije velika scena. Treba linkovati postojeći Webflow portfolio.

**Krug 3 (koncept), zatvoren**
- **Tamna, elegantna osnova u duhu Vercela i Lineara.** Razlog: Veljko je ostao oduševljen izgledom Fanout AI.
- **Mora savršeno da radi na telefonu.**
- **3D radni sto**: samo ako izgleda zaista dobro. **Opciona poslednja faza**, najverovatnije u „Kako radim“. Na telefonu ili uz „smanji pokrete“ ide unapred renderovan video/slika.
- Dubina se inače dobija jeftino: videi u okvirima uređaja sa blagim nagibom na kursor, suptilni sjaj, glatki scroll.
- **Komandna paleta (Cmd+K) se NE radi.**
- **Relay AI chatbot na portfoliju**: možda, odluka kasnije (vidi 6).

**Krug 4 (reference, komponente, pokret), u toku — odlučeno do sada**
- **Biblioteke pokreta (Veljko potvrdio):** **GSAP + ScrollTrigger + Lenis** za sve vezano za skrol (zakačene scene, širenje slike, trak teksta); **Motion (motion/react)** za stanje komponenti (popup preko `layoutId`, hover, tap). GSAP je od 2025. potpuno besplatan sa svim dodacima (SplitText, Flip...).
- **Jedan jezik pokreta:** zajednički tokeni (jedna kriva ubrzanja, tri trajanja, isti stagger) u jednom fajlu, čitaju ih obe biblioteke. Svaka animacija je jedno od tri ponašanja: pojavljivanje pri skrolu, reakcija na hover/tap/fokus, pokret vezan za skrol.
- **Miran Linear temelj + 3–4 potpisna trenutka:** (1) hero, (2) ulazak u radove (slika/video koji se širi preko ekrana), (3) lista radova sa pregledom, (4) podnožje sa „strujom“. Sve ostalo samo tiha pojavljivanja. Najviše jedan WebGL canvas vidljiv istovremeno.
- **Projekti (Veljkova ideja, prihvaćena):** ispisana numerisana lista (01–05: ime, jedna rečenica, oznake). 
  - Računar: hover (i fokus tastaturom) prikazuje video pregled; klik otvara popup sa detaljima.
  - Telefon: kartice, video se sam pusti kad je kartica na sredini ekrana (jedan po jedan), vidljivo dugme „Detalji →“.
  - Video ne sme da zavisi samo od hovera: mala uvek vidljiva sličica u redu i/ili veliki trenutak sa showreel-om.
  - Popup = prava adresa: Next.js intercepting routes (klik iz liste → popup; direktan link `/radovi/<slug>` → puna stranica). Na telefonu popup je ceo ekran (sheet).
  - Osnova popupa: Radix/shadcn Dialog (Escape, fokus, `role="dialog"`, zaključan skrol) + Motion animacija. Lenis se zaustavlja dok je popup otvoren. Video se pri otvaranju ne razvlači (animira se okvir/poster, ne sam video).
- **Komponente se uvek preoblikuju po našim tokenima**, nikad ne ulaze onakve kakve jesu (da sajt ne izgleda sklopljen od šablona).
- **Showreel (potvrđeno):** slika koja se pri skrolu širi preko ekrana sadrži showreel ~15 s sa isečcima svih projekata (prelaz iz hero-a u radove).
- **SeniorGuard (potvrđeno):** ide kao **05** u listi radova, sa oznakom „Diplomski · IoT + Android“. Ne ide u „interesovanja“.
- **VV identitet (pravac potvrđen):** pravi monogram od dva V + uvodna animacija u kojoj struja iscrta znak koji zatim preleti na mesto logoa u meniju + isti motiv struje u podnožju. Detalji u odeljku 11.
- **Struja = munja u stilu serije The Flash** (Veljkova referenca): munja se brzo „iscrta“, razgrana i zatreperi. Isti jezik za uvodnu VV animaciju i podnožje.
- **Akcentna boja:** može se promeniti od stare zlatne, ali **ne sme biti česta „AI“ boja** (indigo, ljubičasto-plavi gradijent, cijan, smaragd). **Odlučeno: sistem „neutralna osnova + boja struje“.** AKCENT (dugmad, oznake, linkovi) = **Bela usijanost `#D6E2FF`** (praktično belo, kao Vercel). STRUJA (munje, drugo V, reč u hero-u, svetlo i impulsi u hero-u, broj reda na hover) = **Volt `#CCFF33`**. Pravilo: boja struje se pojavljuje samo tamo gde „teče struja“. Veljkova briga: Volt je popularan (tačno, trend boja poslednjih godina, ali nije tipična „AI“ boja). Pošto je jedna promenljiva (`--energy`), konačna nijansa se može fino podesiti u fazi Claude Designa bez ikakvog troška; rezerva je Speed Force `#FFB81C`.
- **Font (odlučeno):** **Funnel Display + Funnel Sans**, Geist Mono za sitne oznake. (Geist odbačen jer je podrazumevani font u `create-next-app`.)
- **VV logo i uvod (odlučeno):** kao stari sajt — **prvo V neutralno (belo), drugo V u boji struje**, i to **ukršteno**: drugo V prelazi preko desnog kraka prvog, sa tankim rezom u boji pozadine oko drugog V (da izgleda isprepleteno). **Izabrano: „Jako ukršteno“** (pomak drugog V = 54 jedinice u viewBox-u 0–110 po slovu; geometrija jednog V: `M0 0H26L55 92L84 0H110L68 140H42Z`, rez oko drugog V = stroke boje pozadine širine 9). Ovo je skica; Claude Design je dorađuje. Uvod: struja iscrta oba V → drugo V se „napuni“ strujom (bljesak) → zavesa se razdvoji na dve polovine (omaž starom sajtu) dok znak sleti u meni.
  - ⚠️ Pre konačnog logoa: provera da ne postoji sličan registrovan znak (EUIPO eSearch / WIPO Global Brand Database, figurativni znakovi „VV“). Brza pretraga 22. 10. 2026 nije našla poznat brend sa belim + limeta ukrštenim VV, ali to nije pravna provera.
- **Podnožje (odlučeno):** realan raspored (poziv „Imaš ideju?“ + kopiranje mejla + kolone linkova + ogromno ime + © red). Ime: **samo VASOJEVIĆ, jedan red**, širina cele kolone. Munja: povremeni udari + lukovi od kursora ka slovima + udar na tap (telefon).
- **Hero pozadina (odlučeno):** **Tačke + struja** — mreža tačaka, svetlo ispod kursora u boji struje, povremeni impulsi struje kroz mrežu (klik/tap pokreće impuls). ⚠️ Proveriti da ne liči na „circuit trace“ motiv sa bratovog sajta.
- **Bez testimonijala.** Nema citata, ni od prijatelja mehaničara.
- **Bez izmišljenih statistika** u traku teksta i bilo gde drugde. Jedan trak teksta na sajtu, fraza a ne logoi tehnologija.
- **Sadržaj ne čeka animaciju:** uvodna animacija najviše ~1–1,2 s, samo pri prvoj poseti, preskače se uz „smanji pokrete“.

---

## 4. Projekti (inventar)

### 4.1 Aplikacija za mehaničara servis-tole (**klijentski projekat, u svakodnevnoj upotrebi**)
- Aplikacija za prijatelja koji ima auto-servis: klijenti, njihova auta, istorija popravki (delovi i rad, cena, status plaćanja), finansije po danima, magacin delova, „brza pošta“ (evidencija paketa sa delovima), izvoz izveštaja (PDF finansije, Excel istorija), Admin PIN za osetljive akcije.
- Stack: **Next.js + Supabase**, PWA, hosting Vercel (besplatni planovi). Fazni Claude Code build, mockup rađen u Claude Designu.
- Napravljena za **2 dana**; prijatelj je oduševljen; koristi je svaki dan i nije našao primedbe (stanje oktobar 2026).
- **Privatna aplikacija:** prikazuje se samo videom i slikama. Veljko ima **video od 5–6 minuta** sa svim funkcijama, koji treba skratiti na 20–30 s trailer, a ceo ostaviti kao „pogledaj ceo video“.
- ⚠️ Pre objave: u kadru ne smeju da se vide stvarni podaci klijenata (zamutiti ili koristiti test podatke) i **treba pitati prijatelja za dozvolu** da se aplikacija javno prikazuje.
- Bez citata/testimonijala (odluka krug 4).
- Ovo je verovatno najjači dokaz „ume da isporuči“, pa je prvi kandidat za prvo mesto.
- Video je sniman **na laptopu** → vodoravan format, okvir laptopa.

### 4.2 Fanout AI (**gotov, objavljen**)
- SaaS za generisanje sadržaja uz AI (blog, društvene mreže, newsletter, Twitter thread...), paralelno strimovanje kartica, kalendar zakazanih objava, objavljivanje preko n8n workflow-ova, Free/Pro planovi, Stripe test mod.
- Stack: Next.js + TypeScript + Supabase + zod, Vercel. Tamni premium dizajn.
- Živa adresa: https://fanout-ai.vercel.app/
- Dizajn je ispao odlično iz samog prompta (Phase 0 style guide). Raniji sajtovi bez sopstvenih referenci i boja izgledali su kao generički „AI slop“, pa su **reference ključne**.
- Već postoji video od ~20 s.
- Zamenjuje stariji „AI Content Studio“, koji se više ne prikazuje kao poseban projekat.

### 4.3 Relay AI (**gotov, objavljen**)
- Nova verzija ranijeg SupportAI: ugradivi chatbot widget za podršku (jedna `<script>` linija, Shadow DOM), FAQ baza sa vektorskom pretragom, odgovori sa oznakom izvora, prebacivanje na čoveka (uživo u istom četu preko Supabase Realtime, ili mejlom), inbox, analitika, n8n akcije (status porudžbine, kreiranje tiketa uz potvrdu), Free (1 bot) / Pro (3 bota), Stripe test mod.
- Demo prodavnica „Kroj — moda i obuća“. Stack Next.js + TypeScript + Supabase, svetao i topao dizajn (namerno drugačiji od Fanouta).
- Veljko **ručno pravi n8n workflow-ove** po radnoj svesci (dobar dokaz razumevanja, ide pod „Kako je napravljeno“).
- Postoje dokumenti `RELAY_AI_PROMPT.md` i `RELAY_AI_N8N_WORKBOOK.md`.
- Živa adresa: https://relay-ai-teal.vercel.app

### 4.4 CineSpire
- Timski Laravel projekat na kursu Internet programiranje: društvena platforma za filmove i serije u stilu Letterboxda, integracija TMDB. MVC, njegova uloga u timu bila je **Controller sloj** (to se mora tačno napisati, ne „napravio sam celu aplikaciju“).
- Radi samo lokalno, kod je na GitHub-u. ⚠️ Laravel traži PHP hosting (Vercel nema podrazumevanu PHP podršku). Ako nema hostinga, prikazuje se video + GitHub.

### 4.5 SeniorGuard (diplomski)
- Sopstvena ideja za diplomski: IoT sistem za praćenje zdravlja i bezbednosti starijih članova porodice.
- ESP32 narukvica sa senzorima (puls/SpO2, temperatura, MPU6050 za pad, GPS, vibracioni motor, SOS dugme), Firebase Realtime Database, **Android aplikacija u Kotlinu** sa praćenjem u realnom vremenu, 8 ekrana, interaktivni prototip i logo.
- Veljko želi da se vidi da mu ide i IoT, ali da fokus sajta ostane na web aplikacijama.
- **Odlučeno (krug 4):** ide kao **05 u listi radova** („Diplomski · IoT + Android“). Video koji pokazuje ceo tok sistema (senzor → baza → aplikacija → alarm), uspravan format (telefon).

### 4.6 Demo sajtovi za lokalne firme (**samoinicijativni demo, ne plaćeni klijenti**)
- **Đak Food Store** (Čačak): Vite + GSAP, tamna/žuta paleta, ffmpeg obrada videa, Vercel. Adresa: djak.vercel.app. Firma se nikada nije javila.
- **Privatni smeštaj, Pribojska Banja** (porodični smeštaj): Vite + vanilla JS + GSAP, topla zemljana estetika, višejezičan. Adresa: pribojska-banja.com.
- ~~Orfej enterijeri~~ — **ne ide na portfolio** (odluka krug 4).
- Na sajtu uvek jasno: „samoinicijativni demo“, bez impliciranja stvarnog klijentskog rada.

### 4.7 Webflow
- Postojeći Webflow portfolio: https://veljkovasojevic.webflow.io/ (5 Webflow projekata, napravljen pre oko 2 godine).
- Veljko ne želi da bude predstavljen samo kao „Webflow developer“, ali Webflow ostaje jaka veština.
- **Stari VV preloader (pregledano u krugu 4):** dve polovine ekrana (`left-load-slide`, `right-load-slide`), u svakoj po jedno masivno geometrijsko „V“ (jedno belo, jedno zlatno `#BF9838`); polovine se razmaknu kao zavesa i otkriju stranicu. Logo u meniju je tekst „veljko vasojevic“ sa zlatnim prezimenom.
- Postoji i novija verzija ličnog sajta van Webflowa (Vite + GSAP, tamna ugljena/topla zlatna paleta, font Outfit, „VV“ animacija učitavanja). Proveriti da li je još relevantna.

### 4.8 „Još radova“ (kandidati, nije odlučeno)
- **Expense Tracker** (Node/Express/SQLite, grafici, CSV izvoz, n8n mesečni mejl izveštaj; Railway) i **Freelance CRM** (klijenti, projekti, fakture, PDF fakture; Render). Starije aplikacije, uglavnom uz Claude Code. Mali prostor, kratak opis i link.
- **Porodična lista za kupovinu** (PWA, Supabase, sinhronizacija uživo, offline). Proveriti da li je objavljena.
- **MojMajstor** (pominje se u CV-ju; detalji nepoznati, pitati).
- **Routine Guard / „Plan 30“**: Android aplikacija za dnevne rutine (Kotlin, Jetpack Compose, Room), po zahtevu brata. U izradi.
- **Portfolio sajt za brata** (tamna topla paleta, Space Grotesk/Inter, motiv „circuit trace“).
- **3D prikaz patika** (React Three Fiber + GSAP) i eksperimenti sa kamerom (Fruit Ninja klon preko MediaPipe-a).
- Ne ulaze: lični/poklon sajtovi, PlayHot, Revive.

---

## 5. Pozicioniranje i iskrenost

- Pristup AI-ju: **ne kategorija, nego proces.** Na svakom projektu kratka stavka „Kako je napravljeno“ sa konkretnim stvarima koje je Veljko sam odlučio ili ručno uradio. Plus kratak odeljak „Kako radim“: AI je alat, Veljko vodi arhitekturu i odluke.
- **Pravilo:** sve što piše pod „Kako je napravljeno“ Veljko mora moći da objasni na intervjuu.
- Ne prikazivati stare projekte kao dublje nego što jesu. Ne koristiti „full-stack“.
- Demo radovi su demo, timski radovi imaju tačno opisanu ulogu, privatni projekat je privatan.
- Bez izmišljenih metrika, preporuka i logotipa klijenata.

---

## 6. Skica strukture sajta (**predlog, nije zaključeno**)

0. Uvodna VV animacija (~1 s, samo prva poseta) koja se pretvara u logo u meniju.
1. Hero: ko si, šta radiš, jedna jaka rečenica sa rečju koja se menja (Flipping Word Swap, automatski). Pozadina: mreža tačaka + svetlo ispod kursora + impulsi struje (odlučeno; Particle Drift otpada).
2. Ulazak u radove: mali okvir sa videom se širi preko celog ekrana pri skrolu („ulazimo u sliku“). Sadržaj: showreel ~15 s sa isečcima svih projekata (**potvrđeno**).
3. Radovi: numerisana lista 01–05 sa hover video pregledom i popupom (vidi krug 4).
4. Trak teksta pri skrolu (jedan, fraza).
5. „Sajtovi za firme“: demo sajtovi (Đak, Pribojska Banja), a na kraju kartica „Webflow radovi“.
6. ~~„Još radova“~~ — ukinuto (krug 6); ostali radovi su jedna rečenica u „O meni“.
7. „O meni“ / „Kako radim“: kratak, pošten tekst o radu uz AI. Ovde bi bio **opcioni 3D sto**.
8. Kontakt + podnožje: ogromno ime VASOJEVIĆ sa efektom „struje“, kopiranje mejla jednim klikom.

**Relay AI widget na portfoliju: NE za sada** (krug 7). Sample mod vraća samo FAQ tekst, srpska pretraga je slabija, a svetao widget se bije sa tamnim dizajnom. Relay se isprobava preko linka na demo prodavnicu.

---

## 7. Vizuelni pravac

- Tamno, premium, elegantno, tipografija i razmak su glavni nosioci utiska (Vercel/Linear), gradijenti i suptilni sjaj.
- Dubina bez WebGL-a: video u okvirima uređaja sa blagim 3D nagibom (CSS), suptilni sjaj, glatki scroll (Lenis).
- Pokret: svrsishodan, poštuje `prefers-reduced-motion`.
- **Font mora da podrži srpsku latinicu (č, ć, ž, š, đ — Latin Extended).** Filter pri izboru fontova.
- Okviri uređaja: veb projekti su vodoravni (laptop), SeniorGuard uspravan (telefon); lista i pregled moraju podržati oba formata.
- **„Struja“ kao vizuelni motiv (odlučeno):** munja u stilu serije The Flash (brzo se iscrta, razgrana, zatreperi). Povezuje uvodnu VV animaciju, hero (impulsi kroz tačke) i podnožje. Referentna izvedba: `design/stil-poredjenje.html` (canvas 2D za munje i impulse, SVG za VV).
- **VV monogram (odlučeno):** prvo V belo, drugo V u boji struje, „jako ukršteno“ (detalji u krugu 4 u odeljku 3).
- **Boje (odlučeno):** pozadina `#07070A`, akcent (UI) Bela usijanost `#D6E2FF`, struja Volt `#CCFF33`. Zabranjeno: indigo, ljubičasto-plavi gradijent, cijan, smaragd.
- **Fontovi (odlučeno):** Funnel Display (naslovi) + Funnel Sans (tekst) + Geist Mono (sitne oznake). Ne koristiti Space Grotesk (bratov sajt) ni Outfit (stari sajt).
- Lekcija iz iskustva: bez sopstvenih referenci dizajn ispada generički. Reference se unose u `design/` folder kao slike.

---

## 8. Skills — krug 5 (zatvoren 22. 10. 2026)

**Instalirano 22. 10. 2026 u `.claude/skills/` (nivo projekta):** Emil Kowalski (`emil-design-eng`, `animate`, `improve-animations`, `review-animations`, `animation-performance`, `animation-vocabulary`, `find-animation-opportunities`; commit 2d22863), Impeccable (commit 69c34b7; hook NIJE uključen; program preuzima sa GitHub releases uz SHA-256 proveru), `web-design-guidelines` (Vercel, 063bee9), `playwright-cli` (Microsoft, b1a5903) + globalno `@playwright/cli` 0.1.22 (testirano). Raspored upotrebe po fazama: tabela u `CLAUDE_CODE_PROMPT.md`.

**Odluka:** Veljko prihvatio tabelu ispod. Claude (i Claude Code u faznom promptu) sam određuje kada se koji skill koristi.

Veljko je video preporuku: Emil Kowalski, Impeccable, Taste Skill, Awesome Design, Web Design Guidelines, Image-to-Code, Playwright CLI. Claude je pročitao repozitorijume i SKILL.md fajlove.

| Skill | Repo / licenca | Šta radi | Bezbednost | Preporuka |
|---|---|---|---|---|
| **Emil Kowalski** | `emilkowalski/skills`, MIT, ~48k ★ | Pravila za pokret i „osećaj“ UI-ja: krive, trajanja, kad animirati, springs, clip-path, performanse, reduced motion. 15 skillova (bitni: `emil-design-eng`, `animate`, `review-animations`, `animation-performance`, `improve-animations`). | Samo markdown, **nema skripti**. Najmanji rizik. | **DA.** Faze sa pokretom + pregled animacija. Napomena: njegovo „UI animacije ispod 300 ms“ važi za kontrole; skrol scene i uvod su namerni izuzeci. |
| **Impeccable** | `pbakaus/impeccable`, Apache-2.0, ~85k ★ (Paul Bakaus) | Dizajn direktor u skillu: 23 komande (`shape`, `typeset`, `layout`, `critique`, `audit`, `polish`...), PRODUCT.md/DESIGN.md. | Pokreće **binarni program koji se preuzme pri prvom pokretanju**; opcioni **hook** posle svake izmene. Ugledan autor, ali više poverenja nego markdown. | **DA, selektivno**, na nivou projekta, **bez hookova**. Njegov detektor kažnjava sjaj i gradijent tekst, što se bije sa „strujom“ — reći mu da je to namerno (njegovo pravilo: „brief wins“). |
| **Taste Skill** (+ Image-to-Code) | `Leonxlnx/taste-skill`, MIT, ~101k ★ | „Anti-slop“ art direkcija: skripta nasumično deli 3 od 20 pravaca, kućni stil, provera u browseru. | Node 22 + Chrome skripte, mrežni pristup za slike. | **NE za ovaj projekat.** Kućni stil zabranjuje sjaj, gradijente, mono oznake i senke — upravo Vercel/Linear pravac koji smo izabrali. Image-to-Code traži generator slika; tu ulogu ima Claude Design. |
| **Awesome Design MD** | `VoltAgent/awesome-design-md`, MIT | Nije skill: zbirka DESIGN.md fajlova poznatih brendova (Vercel, Linear...). | Samo markdown. | **Samo kao referenca** za strukturu našeg DESIGN.md. Ne ubacivati njihove fajlove (sajt bi bio kopija Vercela). |
| **Web Design Guidelines** | `vercel-labs/agent-skills` (zvanični Vercel) | Revizija koda po 100+ pravila (pristupačnost, UX, performanse); pravila skida sa Vercelovog GitHub-a pri svakom pokretanju. | Markdown, zvaničan izvor. | **DA**, završna revizija. |
| **Playwright CLI** | `microsoft/playwright-cli`, Apache-2.0 (zvanični Microsoft) | Browser iz komandne linije: snimci ekrana, inspekcija, snimanje. | Zvaničan, instalira Playwright browsere. | **DA**: posle svake faze snimci na telefonu i desktopu. Bonus: skriptovano snimanje čistih demo videa Fanout/Relay za showreel. |

Predlog upotrebe po fazama: faza 0 (style guide, tokeni) → Impeccable `shape`/`typeset` + Emil; faze izrade → Emil animacije + Playwright snimci posle svake faze; kraj → Impeccable `audit`/`polish` + Web Design Guidelines.

---

## 9. Tehnika i ograničenja (za krug 7)

- **Telefon mora savršeno:** sporiji uređaji, 3D samo uz lagan fallback.
- **Videi (odlučeno, krug 7):** Veljko ih pravi sam uz Claude, **svaki do ~20 s**, i šalje kad dođemo do te faze. **Sve se hostuje na Vercelu** sa sajtom; **nema YouTube-a** i **nema celog videa od 5–6 min** (dugme „Pogledaj ceo video“ otpada). Tehnika: kompresija (ffmpeg, MP4/H.264 + WebM), poster slika, lazy-load, `muted loop playsinline`, na telefonu samo jedan video svira istovremeno. Do tada: placeholder posteri. ⚠️ Video mehaničara bez stvarnih podataka klijenata.
- **3D sto:** model koji gradi Claude Code od jednostavnih oblika ili besplatan model sa proverenom licencom (CC0); učitava se tek kad se približi ekranu.
- **Jezici:** srpski i engleski (i18n).
- **Hosting (odlučeno):** Vercel, adresa **`veljkovasojevic.vercel.app`** (slobodna 22. 10. 2026).
- **Kontakt (odlučeno):** **kopiraj mejl + mailto**, bez forme (nema Resenda, servera ni spama). Mejl se na stranici blago zaštiti od botova.
- Pristupačnost, SEO, OG slika, performanse (Lighthouse), `.gitignore` kao prvi commit.
- **Stack (odlučeno, krug 7):** Next.js 16 (App Router, intercepting routes za popup projekata, metadata/SEO) + TypeScript + Tailwind CSS v4 + GSAP/ScrollTrigger/Lenis (skrol) + Motion (popup, hover) + next-intl (SR na `/`, EN na `/en`) + Radix Dialog za popup. React Three Fiber samo ako se kasnije radi sto.
- **Analitika (odlučeno):** Vercel Web Analytics (besplatno, bez kolačića, bez bannera).
- **3D sto (odlučeno):** ostaje opciono; sajt se objavljuje bez njega, odluka posle objave.

**Krug 7 je zatvoren** (22. 10. 2026).

### Dodatna pitanja pre definicije (22. 10. 2026, odlučeno)
- **Redosled sekcija:** Hero → **rečenica koja se „puni strujom“** (reči se pri skrolu pale iz sive u belo, kroz njih proleti Volt struja) → showreel koji se širi preko ekrana → Radovi 01–05 → trak (IDEJA ✦ DIZAJN ✦ KOD ✦ OBJAVA) → Sajtovi za firme → O meni + Kako radim → Kontakt/podnožje.
  - **Tekst rečenice: OTVOREN.** Veljko ga piše sam ili se odlučuje pri finalizaciji teksta; do tada placeholder. Odbijeni predlozi (ne nuditi ponovo): „Ne pravim šablone…“, „Svaki projekat počinje pitanjem…“, „Od sveske u radionici…“, „Ne volim da prodajem…“, „Kod piše i AI…“, „Dobra aplikacija se ne primeti…“, „Ideje su jeftine…“. Ako ostane prazno, sekcija se izbacuje i ide samo showreel.
- **Redosled projekata:** 01 Autoservis Tole · 02 Fanout AI · 03 Relay AI · 04 CineSpire · 05 SeniorGuard.
- **Sajtovi za firme:** dve velike kartice (Đak, Pribojska Banja) sa snimkom ekrana i „Otvori sajt ↗“, bez popupa; manja kartica „Webflow radovi“. Snimke ekrana pravi Claude Code (Playwright) sa živih sajtova.
- **Meni:** sakrije se pri skrolu na dole, vrati pri skrolu na gore, zamućena pozadina. Stavke: Radovi · O meni · Kontakt · SR/EN + dugme „Javi se“.
- **Uvodna VV animacija:** samo **prva poseta u sesiji** (sessionStorage); bez nje uz „smanji pokrete“.
- **Okviri videa:** **minimalni** — zaobljen okvir, tanka ivica, blag sjaj, tri tačkice kao prozor browsera; za SeniorGuard uspravan okvir telefona. Bez realističnih mockupa.
- **Tema:** **samo tamna**.
- **Lokacija rada: NE piše se nigde** na sajtu (Veljkova odluka).
- **Kod portfolija: javno na GitHub-u**; u podnožju link „Kod ovog sajta ↗“.
- **Rok:** nema, kvalitet ispred brzine.
- **LinkedIn:** https://www.linkedin.com/in/veljko-vasojevic/
- **Fotografija:** stiže kasnije; gradi se sa placeholderom 4:5.
- **Prsten oko kartice:** SR „DOSTUPAN ZA SARADNJU •“, EN „OPEN TO WORK •“.

---

## 10. Šta još treba da se završi

**Krug 4 — reference i komponente (zatvoren).** Vidi odeljak 11 za pregledane reference i komponente.
Zatvoreno u krugu 4: showreel, SeniorGuard kao 05, VV pravac i boje logoa, sistem boja (Bela usijanost + Volt), font Funnel, hero „Tačke + struja“ (Particle Drift otpada, pa ni licenca za Originkit više nije bitna), podnožje sa VASOJEVIĆ.
Takođe zatvoreno: VV „Jako ukršteno“, praćenje kursora samo u listi radova (potvrđeno).
**Krug 4 je zatvoren** (22. 10. 2026). Preostaje samo provera sličnih logoa pre konačnog znaka (u fazi Claude Designa).

**Krug 5 — skills.** Zatvoren (odeljak 8).

**Krug 6 — tekst (u toku). Odlučeno do sada:**
- Ton: **profesionalno + tračak ličnosti**.
- Jezik: **srpski podrazumevano**, engleski na dugme (sopstvena adresa `/en`).
- „O meni“: **kratka priča (3–4 rečenice)** + **fotografija**.
- Fotografija: Veljko je dorađuje u ChatGPT-u (Claude daje prompt; lice i identitet ostaju verni, samo svetlo/pozadina/boja). Prikaz kao **kartica koja se okreće** (ideja sa React Bits): napred fotografija, pozadi kratka „lična karta“ (titula, fakultet, master u toku, Priboj, „dostupan za posao“). Okretanje klikom/tapom/tastaturom; pri „smanji pokrete“ samo pretapanje. Na poleđini ne sme biti informacija koje nema i u vidljivom tekstu.

- **Hero naslov (odlučeno):** SR „**Pretvaram ideje u gotove, doterane [web aplikacije].**“ / EN „**I turn ideas into finished, polished [web apps].**“ Reči koje se smenjuju: SR *web aplikacije / sajtove / AI alate*; EN *web apps / websites / AI tools*. (Napomena: „koje rade“ je odbačeno jer u srpskom ne slaže rod sa „sajtove“ i „AI alate“; pridevi u akuzativu množine imaju isti oblik za oba roda.)

- **Šablon popupa (odlučeno, srednji, isti za svih 5):** zaglavlje (ime, jedna rečenica, oznaka statusa, godina, linkovi: sajt / GitHub / ceo video) → video u petlji → **Zašto** (2–3 rečenice, problem) → **Moja uloga** (1–2 rečenice; kod timskih tačno) → **Kako je napravljeno** (3–5 konkretnih odluka, sve objašnjivo na intervjuu) → **Stack** (oznake). „Naučio sam“ **izbačeno** (Veljkova odluka). Fanout: n8n workflow-e je pravio Claude Code, ne Veljko ručno (ručno samo kod Relaya). Servis Tole se javno zove **Autoservis Tole**; ranije su evidenciju vodili u svesci. CineSpire: popunjeno iz GitHub koda; tim od troje; uloga se piše kao **Controller sloj** (tako je rečeno na odbrani; u Laravelu je to sva logika, uključujući TMDB uvoz u admin panelu). SeniorGuard: dopunjeno iz teksta odbrane; uređaj se nosi **na nadlaktici** (nije narukvica), 3D štampano kućište, pet tabova, četiri vrste alarma; **PDF diplomskog se ne kači**. Nacrt je u v3, plus `sadrzaj/objasnjenja-za-intervju.md` (podsetnik, ne ide na sajt).
- **„Još radova“ (odlučeno): odeljak se NE pravi.** Ostali radovi idu u jednu rečenicu u „O meni“: Cegerče (porodični spisak za kupovinu, privatan repo, bez slika/videa/detalja), Accommodation Booking App (Java Swing, 2024), 3D prikaz patika, igra kamerom (MediaPipe). Ne pominju se: `autic-app`, Expense Tracker, Freelance CRM, MojMajstor, Routine Guard. Razlog: 5 glavnih radova + demo sajtovi su dovoljni; manje, a jače.
- **Pisanje:** Claude piše nacrt za svih 5 projekata, Veljko proverava svaku činjenicu i izbacuje šta ne može da objasni. **Nacrt v1: `sadrzaj/projekti-nacrt.md`** (⚠️ = proveri da možeš objasniti, [?] = fali podatak).
- Činjenice nađene u repoima (22. 10. 2026): Servis Tole je radnja u BiH (valuta KM), vode je otac i sin, bez uloga; Fanout i Relay rade za $0, Relay radi samo u Sample modu (Live mod svesno nije napravljen); GitHub nalog `veljkovasojevic03`. **Fanout koristi limeta akcent `#B6FF3B`** — skoro isti kao Volt; portfolio se razlikuje jer je kod njega UI beo, a limeta samo za „struju“.
- Za implementaciju: bratov portfolio (`E:\Projekti\portfolio`, Next.js 16) drži sav tekst kao podatke u `{ en, sr }` parovima u `data/*.ts` — dobar obrazac za naš i18n.

- **Ostali tekstovi: nacrt v1 u `sadrzaj/tekstovi-nacrt.md`** (hero podnaslov, O meni, poleđina kartice, Kako radim, Sajtovi za firme, kontakt, trak). Odlučeno: veštine javno u **dve kolone** („Samostalno“ / „Uz AI asistenta“); trak **IDEJA ✦ DIZAJN ✦ KOD ✦ OBJAVA**; **Pribojska Banja je samoinicijativni demo** (kao Đak); lična rečenica: tenis, fudbal, online kursevi, društvo („Društvo obično pobedi.“). Poziv u podnožju obraća se i poslodavcima i klijentima: „Imaš ideju ili posao za mene? Hajde da popričamo.“
- Titula: zvanično „**Diplomirani inženjer elektrotehnike i računarstva**“ — samo na poleđini kartice; hero podnaslov kaže „Inženjer računarstva iz Priboja“. Mejl na sajtu: **veljkovasojevic03@gmail.com**. **CV za sada ne ide** (može kasnije).

Prvobitni spisak za krug 6: Ton (profesionalno, sa tračkom ličnosti), hero naslov, „O meni“ (lična priča? fotografija?), šablon opisa projekta (problem, moja uloga, stack, kako je napravljeno, šta sam naučio, linkovi), „Kako radim“, kontakt poziv, CV dugme, linkovi (GitHub, LinkedIn, Webflow), fraza za trak teksta.

**Krug 7 — tehnika i materijal (zatvoren; detalji u odeljku 9).** Prvobitni opis: Stack, hosting videa, priprema videa (skraćivanje, zamućivanje privatnih podataka, showreel), fallback za 3D, i18n, SEO.

**Preostale pojedinačne odluke:**
- konačan redosled projekata
- Webflow: gde tačno
- sadržaj reda „Još radova“
- Relay AI chatbot na sajtu (da/ne)
- izvor 3D modela stola
- dozvola: prijatelj mehaničar (javno prikazivanje aplikacije; bez citata)
- licenca za Originkit komponente

**Stanje 22. 10. 2026:** engleski tekst gotov (`sadrzaj/en.md`, v1); **definicija projekta napisana: `DEFINICIJA_PROJEKTA.md` (v1)** — od sada je ona izvor istine, a ovaj fajl je istorija i razlozi. Sledeće: Veljkov pregled → prompt za Claude Design → fazni prompt za Claude Code. **Napisano:** `design/CLAUDE_DESIGN_PROMPT.md` i `CLAUDE_CODE_PROMPT.md` (faze 0–10 + opciona 11 za 3D sto). Tekst v2: hero podnaslov i „O meni“ govore šta Veljko radi; „ti“ svuda; trak „WEB SAJTOVI ✦ WEB APLIKACIJE ✦ AI ALATI“ (privremen).

**Završni koraci posle krugova:**
1. Jedna objedinjena **definicija projekta**.
2. **Prompt za Claude Design** radi generisanja izgleda (slike idu u `design/`).
3. **Fazni `.md` prompt za Claude Code** (faza 0: osnova, `.gitignore`, style guide i tokeni pokreta; zatim stranice, scene, i18n, performanse; **3D sto kao opciona poslednja faza**). Claude Code posle svake faze javlja i čeka potvrdu.

---

## 11. Krug 4 — pregledane reference i komponente

### Sajtovi
- **nbnzia.com** (Webflow): GSAP 3.13–3.15 (ScrollTrigger, Flip, SplitText, Inertia) + Lenis. Efekti iz plaćene biblioteke Made With GSAP (`mwg032/035/043/044/046`) i Osmo (marquee). Ideje smemo da ponovimo, kod ne. Veljku se sviđa: slika koja se pri skrolu širi preko ekrana, sekcija „Work“ (numerisane stavke 01–05), trak teksta pri skrolu. Njihov trak prikazuje statistiku — mi to ne radimo.
- **marcuslorenzet.com** (Framer): ogroman slogan u podnožju („PIXELS ARE SMALL / DETAILS ARE NOT“), kopiranje mejla jednim klikom (preuzimamo), tri citata klijenata (mi imamo najviše jedan, pravi).

### Komponente
| Komponenta | Izvor / licenca | Gde | Napomene |
|---|---|---|---|
| Particle Drift 3 | originkit.dev — besplatna biblioteka, **licenca nigde navedena** | hero pozadina (kandidat) | Ukloniti `minWidth/minHeight`, slušati miša na celoj sekciji, pauza van ekrana, manja gustina na telefonu, `prefers-reduced-motion`. Ako licenca ostane nejasna: sopstvena verzija istog efekta. |
| Flipping Word Swap | (izvor zabeležiti) — GSAP | hero (automatski), linkovi u meniju (hover) | Za hero treba varijanta sa N reči, automatsko menjanje, bez `<button>` (nije kontrola). Za linkove: `<span>` varijanta (button ne sme u `<a>`). Širina = najšira reč (inline-grid), pa ne skače. |
| Expandable card / popup | Motion `layoutId` | popup projekata | Dodati Radix Dialog osnovu (Escape, fokus, aria, skrol). |
| Specular Button | React Bits — MIT + Commons Clause | glavni CTA (1–2 mesta) | Smemo koristiti u sajtu; ne smemo preprodavati komponentu. Zadržati copyright napomenu u kodu. |
| Circular Text | React Bits — MIT + Commons Clause | rotirajući prsten oko VV znaka (npr. „Dostupan za posao • Open to work •“) | Brzina može pratiti brzinu skrola. |
| Originkit „thunderstrike“, „elemental-lightning“ | originkit.dev | inspiracija za „struju“ u podnožju | Samo kao referenca; licenca nepoznata. |

### VV identitet (pravac potvrđen, oblik znaka još nije nacrtan)
- Od dva odvojena slova napraviti pravi **monogram** (jedan znak, npr. dva V koja se preklapaju ili jedno u drugom).
- **Uvodna animacija:** struja „iscrta“ konture VV znaka, znak se osvetli, pa preleti (GSAP Flip) na mesto logoa u meniju — uvodna animacija postaje logo, ne nestaje. ~1–1,2 s, samo prva poseta, bez nje uz „smanji pokrete“.
- Isti motiv struje se vraća u podnožju → sajt počinje i završava istim efektom.
- Isti znak: favicon, OG slika, Circular Text prsten.

### Stranica za poređenje: `design/stil-poredjenje.html`
Lokalna stranica (nije početak sajta). Verzija 2: panel bira AKCENT i STRUJU odvojeno (Speed Force / Bela usijanost / Volt), font (Funnel / Geist), hero (tačke + svetlo / tačke + struja) i podnožje (dva reda / VELJKO / VASOJEVIĆ). Sadrži uvod sa zavesom, reč koja se menja, primer liste radova i realno podnožje sa linkovima i munjom koja prati kursor. Izbor se pamti u browseru. Verzija 1 (5 boja, 4 fonta, čestice) je zamenjena. VV znak je i dalje skica za Claude Design, ali sada se čita kao „VV“ (dve boje, dodir na vrhu).

### Praćenje kursora (potvrđeno)
- Bez zamene sistemskog kursora. Samo u listi radova: video pregled prati kursor uz malu oznaku „Detalji“. Samo na uređajima sa mišem (`pointer: fine`).
