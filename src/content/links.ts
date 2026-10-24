/**
 * Spoljni linkovi (DEFINICIJA_PROJEKTA.md, odeljak 7).
 * `null` = adresa još ne postoji; link se tada ne prikazuje.
 */

/** Mejl se sastavlja u klijentu, da ne bude čitljiv botovima u HTML-u. */
export const email = {
  user: "veljkovasojevic03",
  domain: "gmail.com",
} as const;

export const links = {
  github: "https://github.com/veljkovasojevic03",
  linkedin: "https://www.linkedin.com/in/veljko-vasojevic",
  webflow: "https://veljkovasojevic.webflow.io",
} as const satisfies Record<string, string | null>;

export const siteUrl = "https://veljkovasojevic.vercel.app";
