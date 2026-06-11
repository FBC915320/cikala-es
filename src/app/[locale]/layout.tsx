import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "CIKALA.es",
    template: "%s"
  },
  description: "Base multilingüe B2B para CIKALA.es."
};

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }, { locale: "en" }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
