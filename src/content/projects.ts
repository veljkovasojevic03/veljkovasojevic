/**
 * Projekti (SR: sadrzaj/projekti-nacrt.md v3, EN: sadrzaj/en.md).
 * Redosled je redosled u listi. Mediji: public/media/<slug>.*
 */
import type { LText, Localized } from "./types";

export type ProjectSlug =
  | "autoservis-tole"
  | "fanout-ai"
  | "relay-ai"
  | "cinespire"
  | "seniorguard";

export type ProjectLink = {
  label: LText;
  href: string | null;
};

export type Project = {
  slug: ProjectSlug;
  number: string;
  name: string;
  line: LText;
  /** Prva oznaka je istaknuta (vrsta), druga je status, treća godina. */
  tags: Localized<[kind: string, status: string, year: string]>;
  /** Kratka napomena u zaglavlju popupa (npr. privatna aplikacija). */
  note: LText | null;
  links: ProjectLink[];
  why: LText;
  role: LText;
  built: Localized<string[]>;
  /** Nazivi tehnologija; prevodi se samo ono što nije vlastito ime. */
  stack: (string | LText)[];
  /** Okvir videa: prozor browsera ili uspravan telefon (za uspravan snimak). */
  frame: "desktop" | "phone";
};

export const projects: Project[] = [
  {
    slug: "autoservis-tole",
    number: "01",
    name: "Autoservis Tole",
    line: {
      sr: "Aplikacija za auto-servis koju vlasnik koristi svaki dan.",
      en: "A repair-shop app the owner uses every day.",
    },
    tags: {
      sr: ["Klijentski", "U upotrebi", "2026"],
      en: ["Client", "In daily use", "2026"],
    },
    note: {
      sr: "Privatna aplikacija, prikazana videom",
      en: "Private app, shown on video",
    },
    links: [],
    why: {
      sr: "Prijatelj sa ocem vodi malu automehaničarsku radnju. Popravke, dugovanja i delove pisali su u svesku. Trebalo im je nešto što radi na telefonu, u radionici, često prljavim rukama, i ne traži mnogo kucanja.",
      en: "A friend runs a small car repair shop with his father. Repairs, unpaid bills and parts went into a notebook. They needed something that works on a phone, in the workshop, often with greasy hands, and with as little typing as possible.",
    },
    role: {
      sr: "Ceo projekat: razgovor sa vlasnikom, specifikacija po fazama, mockup u Claude Designu, izrada uz Claude Code i postavljanje na Vercel. Od prve faze do aplikacije u upotrebi prošla su dva dana.",
      en: "The whole project: talking to the owner, a phased spec, a mockup in Claude Design, the build with Claude Code and the deploy on Vercel. Two days from the first phase to an app in daily use.",
    },
    built: {
      sr: [
        "Napravljeno za radionicu: velika dugmad, česte popravke jednim dodirom sa unapred upisanom cenom i predlozi iz ranijih unosa, da se kuca što manje.",
        "Instalira se na telefon kao prava aplikacija (PWA), bez prodavnice aplikacija.",
        "Namerno bez automatike koja bi zbunila: dodavanje dela u popravku ne skida ga samo iz magacina, a paket brze pošte ne menja stanje. Vlasnik zadržava kontrolu.",
        "Osetljive radnje (brisanje popravki, česte popravke, kategorije) štiti Admin PIN koji se proverava u samoj bazi, ne samo u aplikaciji. PIN je heširan, a posle 5 pogrešnih pokušaja zaključava se na 5 minuta.",
        "Izvoz: PDF finansijski izveštaj za izabrani period i Excel cele istorije popravki.",
      ],
      en: [
        "Made for the workshop: big buttons, frequent repairs in one tap with a preset price, and suggestions from earlier entries, so there is little to type.",
        "Installs on the phone like a real app (PWA), no app store needed.",
        "Deliberately no automation that would confuse: adding a part to a repair doesn't remove it from stock, and a courier parcel doesn't change inventory. The owner stays in control.",
        "Sensitive actions (deleting repairs, frequent repairs, categories) are protected by an admin PIN checked in the database itself, not just in the app. The PIN is hashed and locks for 5 minutes after 5 wrong tries.",
        "Exports: a PDF financial report for any period and an Excel file of the full repair history.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PWA", "Vercel"],
    frame: "desktop",
  },
  {
    slug: "fanout-ai",
    number: "02",
    name: "Fanout AI",
    line: {
      sr: "Jedna ideja, pet gotovih tekstova odjednom.",
      en: "One idea, five finished pieces at once.",
    },
    tags: {
      sr: ["Lični projekat", "Objavljen", "2026"],
      en: ["Personal project", "Live", "2026"],
    },
    note: null,
    links: [
      {
        label: { sr: "Otvori sajt ↗", en: "Open site ↗" },
        href: "https://fanout-ai.vercel.app",
      },
      {
        label: { sr: "GitHub ↗", en: "GitHub ↗" },
        href: "https://github.com/veljkovasojevic03/fanout-ai",
      },
      {
        // Dokument je samo na engleskom.
        label: { sr: "Studija slučaja ↗", en: "Case study ↗" },
        href: "https://github.com/veljkovasojevic03/fanout-ai/blob/main/docs/CASE_STUDY.md",
      },
    ],
    why: {
      sr: "Ko piše za publiku, istu ideju piše pet puta: za blog, LinkedIn, Instagram, newsletter i X, i svaki format ima svoja pravila. Fanout od jedne ideje piše svih pet istovremeno, na srpskom ili engleskom, a zatim pomaže da se tekstovi doteraju, sačuvaju i zakažu.",
      en: "Anyone who writes for an audience writes the same idea five times: for a blog, LinkedIn, Instagram, a newsletter and X, and every format has its own rules. Fanout writes all five from one idea at once, in English or Serbian, then helps you edit, save and schedule them.",
    },
    role: {
      sr: "Sam, uz Claude Code: specifikacija u deset faza, dizajn, arhitektura i sve odluke, zapisane u dnevnik odluka. Posle svake faze sam proveravao testove i build pre nego što krene sledeća.",
      en: "Solo, with Claude Code: a ten-phase spec, the design, the architecture and every decision, recorded in a decision log. After each phase I checked the tests and the build before the next one started.",
    },
    built: {
      sr: [
        "Demo radi bez prijave i bez troška: „Sample mod“ strimuje unapred napisan sadržaj kroz isti put kao pravi AI, uz jasnu oznaku. Napisano je 30 takvih primera (3 teme × 2 jezika × 5 formata).",
        "Kvote (koliko generisanja ima koji plan) proveravaju se u bazi, u jednoj transakciji, pa dva istovremena zahteva ne mogu da pređu limit.",
        "Pet tekstova se strimuje paralelno; izmene se skupljaju i crtaju jednom po frejmu, da interfejs ne uspori.",
        "Zakazane objave idu na mejl i Discord preko n8n-a, sa potpisanim zahtevima u oba smera.",
        "Radi za 0 €: Vercel Hobby, Supabase Free, Stripe u test modu, a GitHub Actions svakih 5 minuta drži bazu budnom.",
        "Pristupačnost se proverava automatski (axe) na svakom ekranu, na oba jezika.",
      ],
      en: [
        "The demo works with no sign-up and no cost: \"Sample mode\" streams pre-written content through the same path as the real AI, clearly labelled. There are 30 such samples (3 topics × 2 languages × 5 formats).",
        "Quotas (how many generations each plan gets) are checked in the database in a single transaction, so two requests at the same moment can't exceed the limit.",
        "Five pieces stream in parallel; updates are batched and drawn once per frame so the interface stays smooth.",
        "Scheduled posts go to email and Discord through n8n, with signed requests in both directions.",
        "Runs for $0: Vercel Hobby, Supabase Free, Stripe in test mode, and GitHub Actions keeps the database awake every 5 minutes.",
        "Accessibility is checked automatically (axe) on every screen, in both languages.",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Claude API",
      "Stripe (test)",
      "n8n",
      "Tailwind CSS",
      "Playwright",
    ],
    frame: "desktop",
  },
  {
    slug: "relay-ai",
    number: "03",
    name: "Relay AI",
    line: {
      sr: "Chatbot za podršku koji odgovara iz FAQ-a, a kad zapne, zove čoveka.",
      en: "A support chatbot that answers from your FAQ and calls a human when it gets stuck.",
    },
    tags: {
      sr: ["Lični projekat", "Objavljen", "2026"],
      en: ["Personal project", "Live", "2026"],
    },
    note: null,
    links: [
      {
        label: { sr: "Otvori sajt ↗", en: "Open site ↗" },
        href: "https://relay-ai-teal.vercel.app",
      },
      {
        label: { sr: "Demo prodavnica ↗", en: "Demo store ↗" },
        href: "https://relay-ai-teal.vercel.app/demo",
      },
      {
        label: { sr: "GitHub ↗", en: "GitHub ↗" },
        href: "https://github.com/veljkovasojevic03/relay-ai",
      },
    ],
    why: {
      sr: "Male web prodavnice stalno dobijaju ista pitanja (dostava, povrat, gde mi je porudžbina), a nemaju ko da odgovara stalno. Vlasnik u Relay upiše FAQ i nalepi jednu liniju koda na sajt. Posetilac odmah dobija odgovor sa izvorom, a kad bot ne zna, razgovor uživo prelazi kod vlasnika.",
      en: "Small online shops get the same questions over and over (delivery, returns, where's my order) and nobody to answer them around the clock. With Relay, the owner writes an FAQ and pastes one line of code on the site. Visitors get an instant answer with its source, and when the bot doesn't know, the chat moves to the owner, live.",
    },
    role: {
      sr: "Sam, uz Claude Code: specifikacija, dizajn (namerno svetao i topao, drugačiji od Fanouta), arhitektura i odluke. n8n workflow-e sam pravio ručno, korak po korak, po radnoj svesci koju sam napisao.",
      en: "Solo, with Claude Code: spec, design (deliberately light and warm, unlike Fanout), architecture and decisions. I built the n8n workflows by hand, step by step, following a workbook I wrote.",
    },
    built: {
      sr: [
        "Widget od 13 KB, u Shadow DOM-u: jedna `<script>` linija, a ne kvari izgled sajta na kom stoji.",
        "Bot ne izmišlja: vraća tačan tekst pronađenog FAQ odgovora i pokazuje izvor. Pretraga razume značenje pitanja, ne samo iste reči.",
        "Prebacivanje na čoveka uživo, preko Supabase Realtime-a, sa rezervom ako mreža blokira sockete.",
        "n8n akcije (status porudžbine, otvaranje tiketa, mejlovi) pokreću se tek kad ih posetilac potvrdi, a svaki zahtev je potpisan, pa n8n prihvata samo poruke koje zaista šalje aplikacija.",
        "Pošteno o granicama: pretraga na srpskom je slabija jer je model engleski, pa je strožija i nudi predloge umesto nagađanja.",
        "Pravi AI razgovor (Live mod) svesno nije napravljen: projekat mora da košta 0, a sve ostalo radi i bez njega.",
      ],
      en: [
        "A 13 KB widget in a Shadow DOM: one `<script>` line that doesn't break the look of the site it sits on.",
        "The bot doesn't make things up: it returns the exact text of the matching FAQ answer and shows its source. Search understands what a question means, not just matching words.",
        "Live handoff to a human over Supabase Realtime, with a fallback when the network blocks sockets.",
        "n8n actions (order status, opening a ticket, emails) only run after the visitor confirms, and every request is signed, so n8n only accepts messages that really come from the app.",
        "Honest about limits: Serbian search is weaker because the model is English, so it is stricter and offers suggestions instead of guessing.",
        "A real AI conversation (Live mode) was left out on purpose: the project has to cost nothing, and everything else works without it.",
      ],
    },
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase (pgvector, Realtime)",
      "n8n",
      "Stripe (test)",
      "Tailwind CSS",
    ],
    frame: "desktop",
  },
  {
    slug: "cinespire",
    number: "04",
    name: "CineSpire",
    line: {
      sr: "Društvena mreža za filmove i serije, u stilu Letterboxda.",
      en: "A social network for films and series, in the spirit of Letterboxd.",
    },
    tags: {
      sr: ["Timski", "Fakultet", "2026"],
      en: ["Team project", "University", "2026"],
    },
    note: {
      sr: "Radi samo lokalno, prikazano videom",
      en: "Runs locally, shown on video",
    },
    links: [
      {
        label: { sr: "GitHub ↗", en: "GitHub ↗" },
        href: "https://github.com/veljkovasojevic03/cinespire",
      },
    ],
    why: {
      sr: "Timski projekat na predmetu Internet programiranje: mesto gde ljubitelji filmova i serija ocenjuju i pišu recenzije, prave svoje liste, vode listu za gledanje i prate šta gledaju drugi.",
      en: "A team project for the Web Programming course: a place where film and series fans rate and review, build their own lists, keep a watchlist and follow what others are watching.",
    },
    role: {
      sr: "Tim od troje, podela po MVC slojevima. Ja sam radio Controller sloj, celu logiku aplikacije: od recenzija i lista do admin panela i uvoza podataka sa TMDB-a.",
      en: "A team of three, split by MVC layer. I built the Controller layer, the whole application logic: from reviews and lists to the admin panel and importing data from TMDB.",
    },
    built: {
      sr: [
        "Admin ukuca naziv filma ili serije, a podaci (opis, godina, poster...) se sami popune sa TMDB-a; admin ih po potrebi koriguje pre čuvanja.",
        "Recenzije sa ocenama i lajkovima; prosečna ocena filma ili serije računa se ponovo posle svake nove, izmenjene ili obrisane recenzije.",
        "Praćenje drugih korisnika, lista za gledanje, nedavno gledano i lične liste filmova i serija.",
        "Pretraga i filtriranje po žanru, sa paginacijom.",
        "Admin panel, zaštićen posebnim middleware-om: filmovi, serije, žanrovi, korisnici i moderacija recenzija.",
      ],
      en: [
        "The admin types a film or series title and the details (overview, year, poster…) fill in from TMDB; the admin can adjust them before saving.",
        "Reviews with ratings and likes; the average rating is recalculated after every new, edited or deleted review.",
        "Following other users, a watchlist, recently viewed and personal lists of films and series.",
        "Search and genre filters, with pagination.",
        "An admin panel behind its own middleware: films, series, genres, users and review moderation.",
      ],
    },
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS", "Alpine.js"],
    frame: "desktop",
  },
  {
    slug: "seniorguard",
    number: "05",
    name: "SeniorGuard",
    line: {
      sr: "Nosivi uređaj i aplikacija koji javljaju porodici kad starijem članu zatreba pomoć.",
      en: "A wearable and an app that alert the family when an older relative needs help.",
    },
    tags: {
      sr: ["Diplomski", "IoT + Android", "2026"],
      en: ["Bachelor's thesis", "IoT + Android", "2026"],
    },
    note: null,
    links: [
      {
        label: { sr: "GitHub ↗", en: "GitHub ↗" },
        href: "https://github.com/veljkovasojevic03/SeniorGuard",
      },
    ],
    why: {
      sr: "Više od petine stanovnika Srbije ima preko 65 godina (Popis 2022), a mnogi žive sami. Problem nije samo pad, nego to što posle pada nema ko odmah da sazna. Komercijalna rešenja su zatvorena, skupa ili se ne mogu prilagoditi. SeniorGuard je moja ideja za diplomski: prototip koji pokazuje ceo put informacije, od senzora do telefona člana porodice.",
      en: "More than a fifth of Serbia's population is over 65 (2022 census), and many live alone. The problem isn't only the fall, it's that nobody finds out right away. Commercial solutions are closed, expensive or can't be adapted. SeniorGuard was my own idea for my thesis: a prototype that shows the whole path of information, from the sensor to a family member's phone.",
    },
    role: {
      sr: "Ceo sistem, sam: ideja, izbor platforme i komponenti, električna šema, 3D štampano kućište, firmver, baza, Android aplikacija i dizajn (interaktivni prototip i logo).",
      en: "The whole system, on my own: the idea, choosing the platform and components, the wiring diagram, a 3D-printed case, firmware, database, Android app and design (interactive prototype and logo).",
    },
    built: {
      sr: [
        "Uređaj se nosi na nadlaktici: ESP32 sa senzorima za puls i kiseonik (MAX30102), temperaturu (DS18B20), pokret i pad (MPU-6050) i GPS, plus SOS dugme koje se nađe bez gledanja i vibracioni motor za potvrdu.",
        "Izbor platforme: Arduino Nano nema mrežu i nema dovoljno memorije za šifrovanu vezu sa Firebase-om, a BLE senzor (CC2650) traži telefon kao posrednika. ESP32 ima ugrađen Wi-Fi, pa uređaj sam šalje podatke.",
        "Pad se prepoznaje na samom uređaju (ukupno ubrzanje preko 2,5 g), jer je to odluka kojoj je vreme bitno; oblak služi samo za prenos do aplikacije.",
        "Firmver se sam oporavlja: ponovo uspostavlja Wi-Fi vezu kad pukne i redovno se restartuje.",
        "Android aplikacija u Kotlinu, pet tabova (stanje, mapa, vitalni parametri, alarmi, porodica i podešavanja). Podaci se osvežavaju uživo, a servis u pozadini javlja svaki novi alarm preko celog ekrana, sa dugmićima „Videla/o sam, idem da proverim“ i „Pozovi hitnu pomoć (194)“.",
        "Četiri vrste alarma: SOS, pad, izostala jutarnja potvrda i duža neaktivnost. Mapa koristi OpenStreetMap, a stanje se može izvesti u PDF izveštaj.",
      ],
      en: [
        "Worn on the upper arm: an ESP32 with sensors for pulse and blood oxygen (MAX30102), temperature (DS18B20), movement and falls (MPU-6050) and GPS, plus an SOS button you can find without looking and a vibration motor for feedback.",
        "Choosing the platform: an Arduino Nano has no network and not enough memory for an encrypted connection to Firebase, and a BLE sensor (CC2650) needs a phone in the middle. The ESP32 has built-in Wi-Fi, so the device sends data on its own.",
        "Falls are detected on the device itself (total acceleration above 2.5 g), because that decision is time-critical; the cloud only carries data to the app.",
        "The firmware recovers by itself: it reconnects when Wi-Fi drops and restarts on a schedule.",
        "An Android app in Kotlin with five tabs (status, map, vitals, alarms, family and settings). Data updates live, and a background service shows every new alarm full screen, with \"I've seen it, going to check\" and \"Call emergency services (194)\".",
        "Four alarm types: SOS, fall, missed morning check-in and long inactivity. The map uses OpenStreetMap, and the status can be exported as a PDF report.",
      ],
    },
    stack: [
      "ESP32",
      "Arduino (C++)",
      "Firebase Realtime Database",
      "Kotlin",
      "Android",
      "OpenStreetMap",
      { sr: "3D štampa", en: "3D printing" },
    ],
    // Definicija predviđa okvir telefona, ali je video položen (16:9, šema
    // uređaj → baza → aplikacija), pa bi ga uspravan okvir isekao. Vratiti na
    // "phone" ako stigne uspravan snimak aplikacije.
    frame: "desktop",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
