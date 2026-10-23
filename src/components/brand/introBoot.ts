/** Ključ u sessionStorage: uvod se prikazuje samo prvi put u sesiji. */
export const INTRO_KEY = "vv-intro-seen";
/** Atribut na <html> koji postavlja skripta u <head> pre prvog crtanja. */
export const INTRO_ATTR = "data-intro";

/**
 * Skripta u <head>: odlučuje o uvodu pre nego što se stranica nacrta,
 * da ne bude bljeska sadržaja ni bljeska uvoda kod povratnika.
 * Uz smanjen pokret uvoda nema.
 */
export const introBootScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("${INTRO_KEY}"))document.documentElement.setAttribute("${INTRO_ATTR}","")}catch(e){}`;
