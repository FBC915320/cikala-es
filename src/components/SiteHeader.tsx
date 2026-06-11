import Link from "next/link";
import { getDictionary, getPagePath, locales, type Locale, type PageKey } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  page: PageKey;
};

export function SiteHeader({ locale, page }: SiteHeaderProps) {
  const dictionary = getDictionary(locale);

  return (
    <header className="border-b border-ink/10 bg-linen/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href={getPagePath(locale, "home")} className="text-lg font-semibold tracking-[0.02em] text-ink">
          CIKALA.es
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {dictionary.nav.map((item) => (
            <Link
              key={item.key}
              href={getPagePath(locale, item.key)}
              className="text-sm font-medium text-ink/70 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-ink/15 bg-white px-1 py-1 sm:flex">
            {locales.map((targetLocale) => (
              <Link
                key={targetLocale}
                href={getPagePath(targetLocale, page)}
                hrefLang={targetLocale}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  targetLocale === locale ? "bg-forest text-white" : "text-ink/70 hover:text-ink"
                }`}
              >
                {targetLocale}
              </Link>
            ))}
          </div>
          <Link
            href={getPagePath(locale, "contact")}
            className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink"
          >
            {dictionary.cta.primary}
          </Link>
        </div>
      </div>
    </header>
  );
}
