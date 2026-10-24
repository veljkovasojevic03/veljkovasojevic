/**
 * Tekst sajta (SR: sadrzaj/tekstovi-nacrt.md, EN: sadrzaj/en.md).
 * Ne izmišljati: šta fali ostaje null ili je označeno sa [?].
 */
import type { LText, Localized, RichText } from "./types";

export const nav = {
  work: { sr: "Radovi", en: "Work" },
  about: { sr: "O meni", en: "About" },
  contact: { sr: "Kontakt", en: "Contact" },
  cta: { sr: "Javi se", en: "Get in touch" },
} satisfies Record<string, LText>;

export const hero = {
  eyebrow: {
    sr: "VELJKO VASOJEVIĆ",
    en: "VELJKO VASOJEVIĆ",
  },
  /** Naslov = prefix + reč koja se menja + suffix. */
  headline: {
    prefix: {
      sr: "Pretvaram ideje u gotove, doterane",
      en: "I turn ideas into finished, polished",
    },
    words: {
      sr: ["web aplikacije", "sajtove", "AI alate"],
      en: ["web apps", "websites", "AI tools"],
    },
    suffix: { sr: ".", en: "." },
  },
  sub: {
    sr: "Od skice i dizajna, preko koda i baze, do objave na internetu. Gotovo znači da radi i na telefonu, a doterano da se vidi svaki detalj.",
    en: "From sketch and design, through code and database, to launch. Finished means it works on your phone too; polished means every detail shows.",
  },
  primaryCta: { sr: "Pogledaj radove →", en: "See the work →" },
  copyEmail: { sr: "Kopiraj mejl", en: "Copy email" },
  /** [?] Potvrda posle kopiranja (iz reference: "KOPIRANO ✓"); potvrditi. */
  copied: { sr: "Kopirano ✓", en: "Copied ✓" },
} as const;

/** Rečenica sa strujom (Veljko, 23. 10. 2026). null = sekcija se ne renderuje. */
export const chargedSentence: Localized<string | null> = {
  sr: "Svaki detalj je odluka, ne slučajnost.",
  en: "Every detail is a decision, not an accident.",
};

/** Trak (privremen tekst, može se menjati). */
export const marquee: Localized<string[]> = {
  sr: ["WEB SAJTOVI", "WEB APLIKACIJE", "AI ALATI"],
  en: ["WEBSITES", "WEB APPS", "AI TOOLS"],
};
export const marqueeSeparator = "✦";

export const work = {
  title: { sr: "Izabrani radovi", en: "Selected work" },
  details: { sr: "Detalji →", en: "Details →" },
  /** Mala oznaka na plutajućem pregledu. */
  previewLabel: { sr: "Detalji", en: "Details" },
  headings: {
    why: { sr: "Zašto", en: "Why" },
    role: { sr: "Moja uloga", en: "My role" },
    built: { sr: "Kako je napravljeno", en: "How it was built" },
    stack: { sr: "Stack", en: "Stack" },
  },
} as const;

/** Uvod: bez „za lokalne firme“ (bratov portfolio nije firma), Veljko 23. 10. 2026. */
export const sitesSection = {
  title: { sr: "Treba ti sajt?", en: "Need a website?" },
  text: {
    sr: "Napravio sam nekoliko sajtova na svoju inicijativu, kao demo, da pokažem kako bi mogli da izgledaju. Nisu naručeni, ali su urađeni kao da jesu.",
    en: "I built a few websites on my own initiative, as demos, to show what they could look like. Nobody ordered them, but they were made as if someone had.",
  },
} as const;

export const about = {
  title: { sr: "O meni", en: "About" },
  paragraphs: {
    sr: [
      [
        "Ja sam Veljko. Diplomirao sam računarsko i softversko inženjerstvo na Fakultetu tehničkih nauka u Čačku i upisao master na istom smeru.",
      ],
      [
        "Pravim tri vrste stvari. ",
        { strong: "Web aplikacije po meri:" },
        " od internih alata za jednu firmu do kompletnih SaaS proizvoda sa nalozima, plaćanjem i bazom. ",
        { strong: "Sajtove" },
        " za firme koje žele da ostave utisak, a ne samo da postoje na internetu. I ",
        { strong: "AI alate" },
        " koji preuzmu ponavljajući posao, od pisanja sadržaja do odgovaranja kupcima.",
      ],
      ["Sve radim od početka do kraja: dizajn, kod, baza i objava."],
    ],
    en: [
      [
        "I'm Veljko. I graduated in Computer and Software Engineering at the Faculty of Technical Sciences in Čačak and I'm now doing a master's in the same field.",
      ],
      [
        "I build three kinds of things. ",
        { strong: "Custom web apps:" },
        " from internal tools for a single business to complete SaaS products with accounts, payments and a database. ",
        { strong: "Websites" },
        " for businesses that want to make an impression, not just exist online. And ",
        { strong: "AI tools" },
        " that take over repetitive work, from writing content to answering customers.",
      ],
      ["I do it all end to end: design, code, database and launch."],
    ],
  } satisfies Localized<RichText[]>,
  /** Poleđina kartice ("lična karta"). */
  card: {
    name: { sr: "Veljko Vasojević", en: "Veljko Vasojević" },
    degree: {
      sr: "Diplomirani inženjer elektrotehnike i računarstva",
      en: "Graduate Engineer in Electrical and Computer Engineering",
    },
    school: {
      sr: "FTN Čačak · master u toku",
      en: "FTN Čačak · master's in progress",
    },
    place: { sr: "Priboj, Srbija", en: "Priboj, Serbia" },
    status: { sr: "Dostupan za saradnju", en: "Open to collaboration" },
    ring: { sr: "DOSTUPAN ZA SARADNJU •", en: "OPEN TO WORK •" },
  },
} as const;

export const howIWork = {
  title: {
    sr: "AI je moj alat, ne moja zamena.",
    en: "AI is my tool, not my replacement.",
  },
  steps: {
    sr: [
      {
        title: "Prvo definišem.",
        text: "Svaki projekat počinje razgovorom i pisanom specifikacijom po fazama: šta se pravi, za koga i šta nije deo posla.",
      },
      {
        title: "Pa gradim, fazu po fazu.",
        text: "Kod pišem uz AI asistenta (Claude Code). Arhitekturu, odluke i ono što je bitno korisniku vodim ja; posle svake faze proveravam i testiram, pa tek onda idem dalje.",
      },
      {
        title: "I isporučujem.",
        text: "Objava, provera na telefonu, ispravke. Projekat je gotov kad ga neko koristi, ne kad prođe build.",
      },
    ],
    en: [
      {
        title: "First, I define.",
        text: "Every project starts with a conversation and a written, phased spec: what we're building, for whom, and what's out of scope.",
      },
      {
        title: "Then I build, phase by phase.",
        text: "I write code with an AI assistant (Claude Code). I own the architecture, the decisions and what matters to the user; after each phase I check and test before moving on.",
      },
      {
        title: "And I ship.",
        text: "Deploy, testing on a real phone, fixes. A project is done when someone uses it, not when the build passes.",
      },
    ],
  } satisfies Localized<{ title: string; text: string }[]>,
  skillsTitle: {
    sr: "Veštine, pošteno podeljene",
    en: "Skills, honestly split",
  },
  skills: {
    solo: {
      label: { sr: "Samostalno", en: "On my own" },
      items: {
        sr: [
          "HTML, CSS, JavaScript",
          "GSAP",
          "Webflow",
          "Git i GitHub",
          "SQL / MySQL",
          "Laravel / PHP",
          "Java",
          "Kotlin i Android",
          "ESP32 / Arduino",
        ],
        en: [
          "HTML, CSS, JavaScript",
          "GSAP",
          "Webflow",
          "Git and GitHub",
          "SQL / MySQL",
          "Laravel / PHP",
          "Java",
          "Kotlin and Android",
          "ESP32 / Arduino",
        ],
      } satisfies Localized<string[]>,
    },
    withAi: {
      label: { sr: "Uz AI asistenta", en: "With an AI assistant" },
      items: {
        sr: ["React", "Next.js", "TypeScript", "Node.js", "Supabase", "Stripe", "n8n"],
        en: ["React", "Next.js", "TypeScript", "Node.js", "Supabase", "Stripe", "n8n"],
      } satisfies Localized<string[]>,
    },
  },
} as const;

export const footer = {
  cta: {
    sr: "Imaš ideju ili posao za mene? Hajde da popričamo.",
    en: "Got an idea or a job for me? Let's talk.",
  },
  copy: { sr: "Kopiraj", en: "Copy" },
  columns: {
    contact: { sr: "Kontakt", en: "Contact" },
    work: { sr: "Radovi", en: "Work" },
  },
  linkLabels: {
    email: { sr: "Mejl", en: "Email" },
    linkedin: { sr: "LinkedIn ↗", en: "LinkedIn ↗" },
    github: { sr: "GitHub ↗", en: "GitHub ↗" },
    webflow: { sr: "Webflow radovi ↗", en: "Webflow work ↗" },
  },
  giantName: "VASOJEVIĆ",
  bottom: {
    copyright: { sr: "© 2026 Veljko Vasojević", en: "© 2026 Veljko Vasojević" },
    backToTop: { sr: "Nazad na vrh ↑", en: "Back to top ↑" },
  },
} as const;

/** Sidra sekcija: ista na oba jezika, da prebacivanje jezika zadrži mesto. */
export const sectionIds = {
  top: "top",
  main: "main",
  showreel: "showreel",
  work: "work",
  sites: "sites",
  about: "about",
  contact: "contact",
} as const;

export const seo = {
  /** [?] Predlog: ime kao naslov, hero podnaslov kao opis. Potvrditi. */
  title: { sr: "Veljko Vasojević", en: "Veljko Vasojević" },
  description: hero.sub,
} as const;

/**
 * UI mikrotekst koji nije u sadrzaj/ (pristupačnost i privremena mesta).
 * [?] Predlog, potvrditi.
 */
export const ui = {
  skipLink: { sr: "Preskoči na sadržaj", en: "Skip to content" },
  homeLabel: { sr: "Veljko Vasojević, početna", en: "Veljko Vasojević, home" },
  mainNav: { sr: "Glavni meni", en: "Main navigation" },
  openMenu: { sr: "Meni", en: "Menu" },
  closeMenu: { sr: "Zatvori meni", en: "Close menu" },
  languageLabel: { sr: "Jezik", en: "Language" },
  /** Pun naziv jezika za čitač ekrana. */
  languageNames: {
    sr: { sr: "Srpski", en: "Serbian" },
    en: { sr: "Engleski", en: "English" },
  },
  showreelLabel: { sr: "Showreel", en: "Showreel" },
  placeholders: {
    showreel: { sr: "SHOWREEL · privremeni kadar", en: "SHOWREEL · placeholder" },
    video: { sr: "video", en: "video" },
    screenshot: { sr: "snimak ekrana", en: "screenshot" },
    photo: { sr: "fotografija · 4:5", en: "photo · 4:5" },
  },
  externalLink: { sr: "(otvara se u novom prozoru)", en: "(opens in a new tab)" },
  /** Dugme preko kartice u „O meni“ (aria-label; aria-pressed kaže stanje). */
  flipCard: { sr: "Okreni karticu", en: "Flip the card" },
  /** Alt tekst fotografije u „O meni“. */
  photoAlt: { sr: "Veljko Vasojević", en: "Veljko Vasojević" },
  /** Alt tekst snimaka demo sajtova: "<prefix> <ime sajta>, <uređaj>". */
  siteShot: {
    prefix: { sr: "Početna strana:", en: "Homepage:" },
    desktop: { sr: "računar", en: "desktop" },
    mobile: { sr: "telefon", en: "phone" },
  },
  /** Popup i stranica projekta (Veljko potvrdio 23. 10. 2026). */
  project: {
    close: { sr: "Zatvori", en: "Close" },
    backToWork: { sr: "← Svi radovi", en: "← All work" },
    pauseVideo: { sr: "Pauziraj video", en: "Pause video" },
    playVideo: { sr: "Pusti video", en: "Play video" },
  },
} as const;
