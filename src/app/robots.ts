import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/links";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/design", "/en/design"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
