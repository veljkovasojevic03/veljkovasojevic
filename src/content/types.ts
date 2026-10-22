import type { Locale } from "@/i18n/routing";

/** Isti podatak na oba jezika. */
export type Localized<T> = Record<Locale, T>;

export type LText = Localized<string>;

/** Tekst sa istaknutim delovima (npr. tri vrste posla u "O meni"). */
export type RichSegment = string | { strong: string };
export type RichText = RichSegment[];

/** Uzima vrednost za trenutni jezik. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}
