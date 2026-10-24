import { LIVE_REGION_ID } from "@/lib/announce";

/** Jedini aria-live region na sajtu; puni ga announce(). */
export function LiveRegion() {
  return <div id={LIVE_REGION_ID} className="sr-only" aria-live="polite" />;
}
