import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // OG slike se ne preusmeravaju: /sr/opengraph-image mora odgovoriti direktno
  // (pregledi linkova u porukama ne prate uvek preusmerenja).
  matcher: "/((?!api|trpc|_next|_vercel|.*opengraph-image|.*\\..*).*)",
};
