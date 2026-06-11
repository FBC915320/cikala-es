import type { MetadataRoute } from "next";
import { getPagePath, locales, pageKeys } from "@/lib/i18n";
import { absoluteUrl, getLanguageAlternates } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    pageKeys.map((page) => ({
      url: absoluteUrl(getPagePath(locale, page)),
      lastModified,
      changeFrequency: page === "home" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.8,
      alternates: {
        languages: {
          ...getLanguageAlternates(page),
          "x-default": absoluteUrl(getPagePath("es", page))
        }
      }
    }))
  );
}
