import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { FeatureGrid } from "@/components/FeatureGrid";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeader } from "@/components/SectionHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getDictionary,
  getPageKeyFromSlug,
  getPagePath,
  isLocale,
  isProductPage,
  locales,
  localizedPaths,
  pageKeys,
  type Locale,
  type PageContent,
  type PageKey
} from "@/lib/i18n";
import {
  buildMetadata,
  organizationJsonLd,
  productJsonLd,
  serviceJsonLd,
  websiteJsonLd
} from "@/lib/seo";

type PageProps = {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pageKeys.map((page) => {
      const slug = localizedPaths[page][locale];

      return {
        locale,
        slug: slug ? slug.split("/") : []
      };
    })
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const page = getPageKeyFromSlug(rawLocale, slug);

  if (!page) {
    return {};
  }

  const dictionary = getDictionary(rawLocale);
  const seo = dictionary.pages[page];

  return buildMetadata({
    locale: rawLocale,
    page,
    title: seo.title,
    description: seo.description
  });
}

export default async function LocalizedPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const page = getPageKeyFromSlug(rawLocale, slug);

  if (!page) {
    notFound();
  }

  const locale = rawLocale;
  const dictionary = getDictionary(locale);
  const content = dictionary.content[page];
  const seo = dictionary.pages[page];

  return (
    <>
      <SiteHeader locale={locale} page={page} />
      <main>{renderPage(locale, page, content)}</main>
      <SiteFooter locale={locale} />
      <JsonLd data={organizationJsonLd(locale)} />
      <JsonLd data={websiteJsonLd(locale)} />
      {content.type === "service" || page === "services" ? (
        <JsonLd data={serviceJsonLd(locale, content.title, seo.description)} />
      ) : null}
      {isProductPage(page) ? (
        <JsonLd data={productJsonLd(locale, content.title, seo.description, getPagePath(locale, page))} />
      ) : null}
    </>
  );
}

function renderPage(locale: Locale, page: PageKey, content: PageContent) {
  const dictionary = getDictionary(locale);

  if (locale === "es" && page === "home") {
    return <SpanishHome />;
  }

  if (content.type === "contact") {
    return (
      <section className="bg-linen px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
          <ContactForm dictionary={dictionary} />
        </div>
        <RelatedLinks locale={locale} currentPage={page} content={content} />
      </section>
    );
  }

  return (
    <>
      <section className="bg-linen px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeader eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
                href={getPagePath(locale, "contact")}
              >
                {dictionary.cta.primary}
              </Link>
              <Link
                className="rounded-md border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
                href={getPagePath(locale, page === "products" ? "services" : "products")}
              >
                {dictionary.cta.secondary}
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-ink/10 bg-white p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay">
              {dictionary.cta.contactPanelTitle}
            </p>
            <p className="mt-4 text-sm leading-6 text-ink/70">{dictionary.cta.contactPanelText}</p>
            <Link
              className="mt-6 inline-block rounded-md bg-clay px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink"
              href={getPagePath(locale, "contact")}
            >
              {dictionary.cta.primary}
            </Link>
          </div>
        </div>
      </section>
      {content.items.length ? (
        <section className="bg-mist px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <FeatureGrid items={content.items} />
          </div>
        </section>
      ) : null}
      <RelatedLinks locale={locale} currentPage={page} content={content} />
    </>
  );
}

function SpanishHome() {
  const locale: Locale = "es";
  const dictionary = getDictionary(locale);
  const content = dictionary.content.home;

  const featuredProducts: Array<{ page: PageKey; title: string; text: string }> = [
    { page: "technicalTarpaulins", title: "Lonas técnicas", text: "Protección, cobertura y fabricación técnica para usos industriales, logísticos y agrícolas." },
    { page: "meshShading", title: "Telas y sombreado", text: "Mallas, telas técnicas y soluciones de sombreado para obra, agricultura y equipamiento." },
    { page: "coversCoverings", title: "Capas y coberturas", text: "Protecciones textiles para equipos, mercancías, instalaciones y operaciones profesionales." },
    { page: "geomembranes", title: "Geomembranas", text: "Soluciones de impermeabilización para proyectos industriales, agrícolas y ambientales." },
    { page: "industrialCurtains", title: "Cortinas industriales", text: "División de espacios, protección operativa y sistemas textiles para entornos industriales." },
    { page: "industrialFabrics", title: "Tejidos industriales", text: "Tejidos técnicos para transformación, revestimiento, protección y aplicaciones especiales." },
    { page: "cottonFabrics", title: "Tejidos de algodón", text: "Materiales para marcas, confección profesional, uniformidad y desarrollo de colecciones." },
    { page: "kimonoFabrics", title: "Tejidos para kimonos", text: "Desarrollos textiles para artes marciales, deporte y confección técnica resistente." },
    { page: "marketplaceProducts", title: "Productos para marketplaces", text: "Adaptación de productos, documentación y operación para canales digitales profesionales." }
  ];

  const services: Array<{ page: PageKey; title: string; text: string }> = [
    { page: "partners", title: "Representación comercial", text: "Presencia B2B, socios y conversaciones comerciales." },
    { page: "sellBrazil", title: "Entrada en el mercado brasileño", text: "Validación de producto, canal y oportunidad en Brasil." },
    { page: "sellEurope", title: "Entrada en el mercado europeo", text: "Adaptación comercial para España y Europa." },
    { page: "services", title: "Sourcing internacional", text: "Proveedores, capacidades y requisitos de fabricación." },
    { page: "partners", title: "Desarrollo de proveedores", text: "Evaluación y coordinación de socios industriales." },
    { page: "marketplaceProducts", title: "Marketplaces y canales digitales", text: "Preparación B2B para canales digitales profesionales." }
  ];

  const caption =
    "Estructura de CIKALA en Brasil. CIKALA.es es la plataforma europea de CIKALA para desarrollo de negocios B2B entre Brasil, España y Europa.";

  return (
    <>
      <section className="bg-linen px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <SectionHeader eyebrow={content.eyebrow} title={content.title} intro={content.intro} />
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink"
                href={getPagePath(locale, "contact")}
              >
                Desarrollar una oportunidad B2B
              </Link>
              <Link
                className="rounded-md border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
                href={getPagePath(locale, "products")}
              >
                Ver productos
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <VisualPlaceholder title="Foto de Fabiano Cicala" text="Dirección comercial y conexión operativa entre CIKALA Brasil y CIKALA.es." />
            <div className="grid grid-cols-3 gap-3 text-center">
              {["Brasil", "España", "Europa"].map((market) => (
                <div key={market} className="rounded-lg border border-ink/10 bg-white px-4 py-5 shadow-soft">
                  <p className="text-sm font-semibold text-forest">{market}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeBand title="Productos destacados" intro="Categorías técnicas preparadas para explicar aplicaciones, requisitos y oportunidades B2B sin convertir la web en catálogo transaccional.">
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <Link
              key={product.page}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft transition hover:border-forest"
              href={getPagePath(locale, product.page)}
            >
              <h2 className="text-lg font-semibold text-ink">{product.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{product.text}</p>
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <CompactLink
            href={getPagePath(locale, "industrialSolutions")}
            title="Soluciones Industriales"
            text="Aplicaciones técnicas, protección, separación, impermeabilización y fabricación industrial."
          />
          <CompactLink
            href={getPagePath(locale, "marketplaceProducts")}
            title="Marketplaces y canales digitales"
            text="Productos preparados para canales digitales profesionales y distribución B2B."
          />
        </div>
      </HomeBand>

      <HomeBand title="Servicios B2B" intro="Servicios comerciales y técnicos para transformar una oportunidad en una conversación profesional, una propuesta y una operación viable.">
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={`${service.page}-${service.title}`}
              className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft transition hover:border-forest"
              href={getPagePath(locale, service.page)}
            >
              <h2 className="text-lg font-semibold text-ink">{service.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{service.text}</p>
            </Link>
          ))}
        </div>
      </HomeBand>

      <HomeBand title="Brasil ↔ España" intro="Localizamos productos y oportunidades en Brasil para empresas españolas y europeas. También apoyamos empresas brasileñas y latinoamericanas que desean validar, representar o vender en España y Europa.">
        <div className="grid gap-3 md:grid-cols-3">
          <CompactLink
            href={getPagePath(locale, "brazilSpain")}
            title="Brasil ↔ España"
            text="Conexión comercial y técnica entre ambos mercados."
          />
          <CompactLink
            href={getPagePath(locale, "sellBrazil")}
            title="Vender en Brasil"
            text="Validación de producto, canal y entrada comercial."
          />
          <CompactLink
            href={getPagePath(locale, "latamEurope")}
            title="América Latina ↔ Europa"
            text="Oportunidades regionales conectadas con España y Europa."
          />
        </div>
      </HomeBand>

      <HomeBand title="Nuestro origen en Brasil" intro="CIKALA.es nace de la experiencia práctica de CIKALA en Brasil, con operación en productos técnicos, textiles, lonas, soluciones industriales, marketplaces y desarrollo de negocios B2B.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <VisualPlaceholder title="Imagen del edificio de CIKALA Brasil" text="Estructura operativa, producto técnico y desarrollo comercial desde Brasil." />
            <p className="mt-3 text-sm leading-6 text-ink/65">{caption}</p>
          </div>
          <div>
            <div className="aspect-video overflow-hidden rounded-lg border border-ink/10 bg-ink shadow-soft">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/Od57UMDSHXM"
                title="Video institucional CIKALA Brasil"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-ink/65">{caption}</p>
          </div>
        </div>
      </HomeBand>

      <section className="bg-linen px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <SectionHeader
            eyebrow="Formulario comercial B2B"
            title="Desarrollar una oportunidad B2B"
            intro="Comparte contexto de empresa, mercado, volumen estimado y requisitos técnicos para evaluar próximos pasos."
          />
          <ContactForm dictionary={dictionary} />
        </div>
      </section>

      <HomeBand title="Insights resumido" intro="Lecturas breves sobre producto técnico, mercados y procesos B2B.">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Productos técnicos", text: "Guías y criterios para especificar materiales, aplicaciones y producción." },
            { title: "Mercados", text: "Lecturas comerciales sobre Brasil, España, Europa y oportunidades entre regiones." },
            { title: "Procesos B2B", text: "Sourcing, representación, proveedores, muestras, validación y canales digitales." }
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-white p-5 shadow-soft">
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink/70">{item.text}</p>
            </article>
          ))}
        </div>
        <Link
          className="mt-8 inline-block rounded-md border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink"
          href={getPagePath(locale, "insights")}
        >
          Ver insights
        </Link>
      </HomeBand>
    </>
  );
}

function HomeBand({
  title,
  intro,
  children
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-mist px-5 py-16 odd:bg-linen lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 max-w-3xl">
          <h2 className="text-3xl font-semibold leading-tight text-ink">{title}</h2>
          <p className="mt-4 text-base leading-7 text-ink/70">{intro}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function CompactLink({ href, title, text }: { href: string; title: string; text: string }) {
  return (
    <Link
      className="rounded-lg border border-ink/10 bg-white px-5 py-4 shadow-soft transition hover:border-forest"
      href={href}
    >
      <span className="block text-sm font-semibold text-ink">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-ink/65">{text}</span>
    </Link>
  );
}

function VisualPlaceholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex min-h-64 flex-col justify-end rounded-lg border border-ink/10 bg-gradient-to-br from-white to-mist p-6 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-clay">{title}</p>
      <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
    </div>
  );
}

function RelatedLinks({
  locale,
  currentPage,
  content
}: {
  locale: Locale;
  currentPage: PageKey;
  content: PageContent;
}) {
  const related = content.related?.filter((page) => page !== currentPage) ?? [];

  if (!related.length) {
    return null;
  }

  const dictionary = getDictionary(locale);

  return (
    <section className="bg-linen px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((page) => (
            <Link
              key={page}
              className="rounded-lg border border-ink/10 bg-white px-5 py-4 text-sm font-semibold text-ink shadow-soft transition hover:border-forest hover:text-forest"
              href={getPagePath(locale, page)}
            >
              {dictionary.content[page].title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
