import Link from "next/link";
import { getDictionary, getPagePath, type Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-[1.5fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-semibold">CIKALA.es</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">{dictionary.footer.tagline}</p>
        </div>
        <div className="md:text-right">
          <p className="text-sm font-semibold text-white">{dictionary.footer.contactLabel}</p>
          <Link className="mt-2 block text-sm text-white/75 hover:text-white" href="mailto:fabiano@cikala.com.br">
            fabiano@cikala.com.br
          </Link>
          <Link className="mt-4 inline-block text-sm font-semibold text-white" href={getPagePath(locale, "contact")}>
            {dictionary.cta.primary}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/60">
        {dictionary.footer.legal}
      </div>
    </footer>
  );
}
