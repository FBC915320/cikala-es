import type { Metadata } from "next";
import { getPagePath, locales, type Locale, type PageKey } from "@/lib/i18n";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cikala.es";
export const siteName = "CIKALA.es";

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

export function getLanguageAlternates(page: PageKey): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(getPagePath(locale, page))])
  );
}

export function buildMetadata({
  locale,
  page,
  title,
  description
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  description: string;
}): Metadata {
  const path = getPagePath(locale, page);

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...getLanguageAlternates(page),
        "x-default": absoluteUrl(getPagePath("es", page))
      }
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName,
      locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

export function organizationJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: "fabiano@cikala.com.br",
    areaServed: ["ES", "PT", "EU"],
    inLanguage: locale,
    sameAs: []
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: locale,
    potentialAction: {
      "@type": "ContactAction",
      target: absoluteUrl(getPagePath(locale, "contact"))
    }
  };
}

export function serviceJsonLd(locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl
    },
    areaServed: ["ES", "PT", "EU"],
    availableLanguage: locales,
    inLanguage: locale
  };
}

export function productJsonLd(locale: Locale, name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    url: absoluteUrl(url),
    brand: {
      "@type": "Brand",
      name: siteName
    },
    category: "B2B textile and technical products",
    inLanguage: locale
  };
}
