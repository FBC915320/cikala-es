export const locales = ["es", "pt", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export type PageKey =
  | "home"
  | "products"
  | "services"
  | "industrialSolutions"
  | "brazilSpain"
  | "sellBrazil"
  | "sellEurope"
  | "latamEurope"
  | "partners"
  | "insights"
  | "sectors"
  | "projects"
  | "contact"
  | "technicalTarpaulins"
  | "meshShading"
  | "coversCoverings"
  | "geomembranes"
  | "industrialCurtains"
  | "industrialFabrics"
  | "cottonFabrics"
  | "kimonoFabrics"
  | "marketplaceProducts";

export type PageType = "home" | "product" | "service" | "market" | "content" | "contact";

export const localizedPaths: Record<PageKey, Record<Locale, string>> = {
  home: { es: "", pt: "", en: "" },
  products: { es: "productos", pt: "produtos", en: "products" },
  services: { es: "servicios", pt: "servicos", en: "services" },
  industrialSolutions: {
    es: "soluciones-industriales",
    pt: "solucoes-industriais",
    en: "industrial-solutions"
  },
  brazilSpain: { es: "brasil-espana", pt: "brasil-espanha", en: "brazil-spain" },
  sellBrazil: { es: "vender-en-brasil", pt: "vender-no-brasil", en: "sell-in-brazil" },
  sellEurope: { es: "vender-en-europa", pt: "vender-na-europa", en: "sell-in-europe" },
  latamEurope: {
    es: "america-latina-europa",
    pt: "america-latina-europa",
    en: "latin-america-europe"
  },
  partners: { es: "socios", pt: "parceiros", en: "partners" },
  insights: { es: "insights", pt: "insights", en: "insights" },
  sectors: { es: "sectores", pt: "setores", en: "sectors" },
  projects: { es: "proyectos", pt: "projetos", en: "projects" },
  contact: { es: "contacto", pt: "contato", en: "contact" },
  technicalTarpaulins: {
    es: "productos/lonas-tecnicas",
    pt: "produtos/lonas-tecnicas",
    en: "products/technical-tarpaulins"
  },
  meshShading: {
    es: "productos/mallas-y-sombreado",
    pt: "produtos/telas-e-sombreamento",
    en: "products/mesh-and-shading"
  },
  coversCoverings: {
    es: "productos/capas-y-coberturas",
    pt: "produtos/capas-e-coberturas",
    en: "products/covers-and-coverings"
  },
  geomembranes: {
    es: "productos/geomembranas",
    pt: "produtos/geomembranas",
    en: "products/geomembranes"
  },
  industrialCurtains: {
    es: "productos/cortinas-industriales",
    pt: "produtos/cortinas-industriais",
    en: "products/industrial-curtains"
  },
  industrialFabrics: {
    es: "productos/tejidos-industriales",
    pt: "produtos/tecidos-industriais",
    en: "products/industrial-fabrics"
  },
  cottonFabrics: {
    es: "productos/tejidos-de-algodon",
    pt: "produtos/tecidos-de-algodao",
    en: "products/cotton-fabrics"
  },
  kimonoFabrics: {
    es: "productos/tejidos-para-kimonos",
    pt: "produtos/tecidos-para-kimonos",
    en: "products/kimono-fabrics"
  },
  marketplaceProducts: {
    es: "productos/productos-para-marketplaces",
    pt: "produtos/produtos-para-marketplaces",
    en: "products/marketplace-products"
  }
};

export const pageKeys = Object.keys(localizedPaths) as PageKey[];

export const mainPageKeys = [
  "products",
  "services",
  "industrialSolutions",
  "brazilSpain",
  "sellBrazil",
  "sellEurope",
  "latamEurope",
  "partners",
  "insights",
  "contact"
 ] as const satisfies readonly PageKey[];

export const productPageKeys = [
  "technicalTarpaulins",
  "meshShading",
  "coversCoverings",
  "geomembranes",
  "industrialCurtains",
  "industrialFabrics",
  "cottonFabrics",
  "kimonoFabrics",
  "marketplaceProducts"
] as const satisfies readonly PageKey[];

export type ProductPageKey = (typeof productPageKeys)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPagePath(locale: Locale, page: PageKey): string {
  const slug = localizedPaths[page][locale];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function getPageKeyFromSlug(locale: Locale, slugSegments?: string[]): PageKey | null {
  const slug = slugSegments?.join("/") ?? "";
  return pageKeys.find((page) => localizedPaths[page][locale] === slug) ?? null;
}

export function isProductPage(page: PageKey): page is ProductPageKey {
  return productPageKeys.includes(page as ProductPageKey);
}

type NavigationItem = {
  key: PageKey;
  label: string;
};

type PageSeo = {
  title: string;
  description: string;
};

export type ContentBlock = {
  title: string;
  text: string;
};

export type PageContent = {
  type: PageType;
  eyebrow: string;
  title: string;
  intro: string;
  items: ContentBlock[];
  related?: readonly PageKey[];
};

export type Dictionary = {
  localeName: string;
  nav: NavigationItem[];
  cta: {
    primary: string;
    secondary: string;
    contactPanelTitle: string;
    contactPanelText: string;
  };
  footer: {
    tagline: string;
    contactLabel: string;
    legal: string;
  };
  pages: Record<PageKey, PageSeo>;
  content: Record<PageKey, PageContent>;
  contact: {
    form: {
      company: string;
      name: string;
      email: string;
      phone: string;
      market: string;
      need: string;
      volume: string;
      message: string;
      submit: string;
    };
  };
};

const productItems = {
  es: [
    { key: "technicalTarpaulins", label: "Lonas Técnicas" },
    { key: "meshShading", label: "Mallas y Sombreado" },
    { key: "coversCoverings", label: "Capas y Coberturas" },
    { key: "geomembranes", label: "Geomembranas" },
    { key: "industrialCurtains", label: "Cortinas Industriales" },
    { key: "industrialFabrics", label: "Tejidos Industriales" },
    { key: "cottonFabrics", label: "Tejidos de Algodón" },
    { key: "kimonoFabrics", label: "Tejidos para Kimonos" },
    { key: "marketplaceProducts", label: "Productos para Marketplaces" }
  ],
  pt: [
    { key: "technicalTarpaulins", label: "Lonas Técnicas" },
    { key: "meshShading", label: "Telas e Sombreamento" },
    { key: "coversCoverings", label: "Capas e Coberturas" },
    { key: "geomembranes", label: "Geomembranas" },
    { key: "industrialCurtains", label: "Cortinas Industriais" },
    { key: "industrialFabrics", label: "Tecidos Industriais" },
    { key: "cottonFabrics", label: "Tecidos de Algodão" },
    { key: "kimonoFabrics", label: "Tecidos para Kimonos" },
    { key: "marketplaceProducts", label: "Produtos para Marketplaces" }
  ],
  en: [
    { key: "technicalTarpaulins", label: "Technical Tarpaulins" },
    { key: "meshShading", label: "Mesh and Shading" },
    { key: "coversCoverings", label: "Covers and Coverings" },
    { key: "geomembranes", label: "Geomembranes" },
    { key: "industrialCurtains", label: "Industrial Curtains" },
    { key: "industrialFabrics", label: "Industrial Fabrics" },
    { key: "cottonFabrics", label: "Cotton Fabrics" },
    { key: "kimonoFabrics", label: "Kimono Fabrics" },
    { key: "marketplaceProducts", label: "Marketplace Products" }
  ]
} satisfies Record<Locale, Array<{ key: PageKey; label: string }>>;

const productContent = {
  technicalTarpaulins: {
    es: {
      title: "Lonas Técnicas",
      intro: "Desarrollo y suministro profesional de lonas técnicas para usos industriales, logísticos, agrícolas y de protección.",
      items: [
        { title: "Aplicación final", text: "Definición de resistencia, gramaje, recubrimiento, acabado, confección y exposición prevista." },
        { title: "Producción coordinada", text: "Soporte para muestras, especificaciones, cantidades profesionales y seguimiento de fabricación." },
        { title: "Operación B2B", text: "Atención por proyecto, sin catálogo transaccional ni venta online." }
      ]
    },
    pt: {
      title: "Lonas Técnicas",
      intro: "Desenvolvimento e fornecimento profissional de lonas técnicas para usos industriais, logísticos, agrícolas e de proteção.",
      items: [
        { title: "Aplicação final", text: "Definição de resistência, gramatura, revestimento, acabamento, confecção e exposição prevista." },
        { title: "Produção coordenada", text: "Suporte para amostras, especificações, quantidades profissionais e acompanhamento de fabricação." },
        { title: "Operação B2B", text: "Atendimento por projeto, sem catálogo transacional nem venda online." }
      ]
    },
    en: {
      title: "Technical Tarpaulins",
      intro: "Professional development and sourcing of technical tarpaulins for industrial, logistics, agricultural and protection uses.",
      items: [
        { title: "Final application", text: "Definition of resistance, weight, coating, finish, fabrication and expected exposure." },
        { title: "Coordinated production", text: "Support for samples, specifications, professional quantities and manufacturing follow-up." },
        { title: "B2B operation", text: "Project-based service with no transactional catalogue or online sales flow." }
      ]
    }
  },
  meshShading: {
    es: {
      title: "Mallas y Sombreado",
      intro: "Soluciones de mallas, telas técnicas y sombreado para protección solar, agricultura, obra, deporte y equipamiento.",
      items: [
        { title: "Requisitos técnicos", text: "Evaluación de densidad, ventilación, radiación, color, fijación y durabilidad." },
        { title: "Formatos profesionales", text: "Definición de rollos, cortes, confección, refuerzos o medidas bajo necesidad." },
        { title: "Mercados", text: "Preparación de documentación para clientes industriales y distribuidores B2B." }
      ]
    },
    pt: {
      title: "Telas e Sombreamento",
      intro: "Soluções de telas, malhas técnicas e sombreamento para proteção solar, agricultura, obra, esporte e equipamentos.",
      items: [
        { title: "Requisitos técnicos", text: "Avaliação de densidade, ventilação, radiação, cor, fixação e durabilidade." },
        { title: "Formatos profissionais", text: "Definição de rolos, cortes, confecção, reforços ou medidas sob necessidade." },
        { title: "Mercados", text: "Preparação de documentação para clientes industriais e distribuidores B2B." }
      ]
    },
    en: {
      title: "Mesh and Shading",
      intro: "Mesh, technical fabric and shading solutions for sun protection, agriculture, construction, sport and equipment.",
      items: [
        { title: "Technical requirements", text: "Assessment of density, ventilation, radiation, color, fixing and durability." },
        { title: "Professional formats", text: "Definition of rolls, cuts, fabrication, reinforcements or made-to-requirement dimensions." },
        { title: "Markets", text: "Documentation prepared for industrial clients and B2B distributors." }
      ]
    }
  },
  coversCoverings: {
    es: {
      title: "Capas y Coberturas",
      intro: "Capas, coberturas y protecciones textiles para equipos, mercancías, instalaciones y operaciones profesionales.",
      items: [
        { title: "Diseño funcional", text: "Análisis de medidas, puntos de tensión, cierres, costuras, refuerzos y condiciones de uso." },
        { title: "Protección", text: "Opciones para intemperie, polvo, transporte, almacenamiento o seguridad operativa." },
        { title: "Escalabilidad", text: "Estructura preparada para proyectos unitarios, series y reposiciones coordinadas." }
      ]
    },
    pt: {
      title: "Capas e Coberturas",
      intro: "Capas, coberturas e proteções têxteis para equipamentos, mercadorias, instalações e operações profissionais.",
      items: [
        { title: "Desenho funcional", text: "Análise de medidas, pontos de tensão, fechamentos, costuras, reforços e condições de uso." },
        { title: "Proteção", text: "Opções para intempérie, pó, transporte, armazenamento ou segurança operacional." },
        { title: "Escalabilidade", text: "Estrutura preparada para projetos unitários, séries e reposições coordenadas." }
      ]
    },
    en: {
      title: "Covers and Coverings",
      intro: "Covers and textile protection for equipment, goods, facilities and professional operations.",
      items: [
        { title: "Functional design", text: "Analysis of dimensions, tension points, closures, seams, reinforcements and use conditions." },
        { title: "Protection", text: "Options for weather, dust, transport, storage or operational safety." },
        { title: "Scalability", text: "Prepared for single projects, series and coordinated replenishment." }
      ]
    }
  },
  geomembranes: {
    es: {
      title: "Geomembranas",
      intro: "Intermediación técnica para geomembranas y soluciones de impermeabilización en proyectos industriales, agrícolas y ambientales.",
      items: [
        { title: "Contexto de obra", text: "Recogida de aplicación, superficie, espesor, compatibilidad, instalación y normativa requerida." },
        { title: "Proveedores", text: "Coordinación comercial con capacidades de fabricación y documentación técnica." },
        { title: "Viabilidad", text: "Evaluación inicial para orientar especificación, plazos y logística." }
      ]
    },
    pt: {
      title: "Geomembranas",
      intro: "Intermediação técnica para geomembranas e soluções de impermeabilização em projetos industriais, agrícolas e ambientais.",
      items: [
        { title: "Contexto de obra", text: "Coleta de aplicação, superfície, espessura, compatibilidade, instalação e norma requerida." },
        { title: "Fornecedores", text: "Coordenação comercial com capacidades de fabricação e documentação técnica." },
        { title: "Viabilidade", text: "Avaliação inicial para orientar especificação, prazos e logística." }
      ]
    },
    en: {
      title: "Geomembranes",
      intro: "Technical intermediation for geomembranes and waterproofing solutions in industrial, agricultural and environmental projects.",
      items: [
        { title: "Site context", text: "Collection of application, surface, thickness, compatibility, installation and required standards." },
        { title: "Suppliers", text: "Commercial coordination with manufacturing capabilities and technical documentation." },
        { title: "Feasibility", text: "Initial assessment to guide specification, timing and logistics." }
      ]
    }
  },
  industrialCurtains: {
    es: {
      title: "Cortinas Industriales",
      intro: "Cortinas textiles y divisorias técnicas para separación de espacios, protección operativa y entornos industriales.",
      items: [
        { title: "Entorno", text: "Análisis de instalación, medidas, tránsito, temperatura, polvo, humedad y mantenimiento." },
        { title: "Sistema", text: "Definición de tejido, transparencia, fijación, guías, refuerzos y confección." },
        { title: "Proyecto", text: "Atención comercial para fabricación bajo requerimiento y coordinación de entrega." }
      ]
    },
    pt: {
      title: "Cortinas Industriais",
      intro: "Cortinas têxteis e divisórias técnicas para separação de espaços, proteção operacional e ambientes industriais.",
      items: [
        { title: "Ambiente", text: "Análise de instalação, medidas, trânsito, temperatura, poeira, umidade e manutenção." },
        { title: "Sistema", text: "Definição de tecido, transparência, fixação, guias, reforços e confecção." },
        { title: "Projeto", text: "Atendimento comercial para fabricação sob requisito e coordenação de entrega." }
      ]
    },
    en: {
      title: "Industrial Curtains",
      intro: "Textile curtains and technical partitions for space separation, operational protection and industrial environments.",
      items: [
        { title: "Environment", text: "Analysis of installation, dimensions, traffic, temperature, dust, humidity and maintenance." },
        { title: "System", text: "Definition of fabric, transparency, fixing, tracks, reinforcements and fabrication." },
        { title: "Project", text: "Commercial service for requirement-led manufacturing and delivery coordination." }
      ]
    }
  },
  industrialFabrics: {
    es: {
      title: "Tejidos Industriales",
      intro: "Tejidos técnicos e industriales para fabricación, transformación, protección, revestimiento y aplicaciones especiales.",
      items: [
        { title: "Especificación", text: "Selección por composición, resistencia, acabado, estabilidad, tratamiento y uso final." },
        { title: "Transformación", text: "Coordinación de corte, confección, recubrimiento, impresión o acabados según proyecto." },
        { title: "Continuidad", text: "Estructura para series, reposiciones y desarrollo de nuevas aplicaciones." }
      ]
    },
    pt: {
      title: "Tecidos Industriais",
      intro: "Tecidos técnicos e industriais para fabricação, transformação, proteção, revestimento e aplicações especiais.",
      items: [
        { title: "Especificação", text: "Seleção por composição, resistência, acabamento, estabilidade, tratamento e uso final." },
        { title: "Transformação", text: "Coordenação de corte, confecção, revestimento, impressão ou acabamentos conforme projeto." },
        { title: "Continuidade", text: "Estrutura para séries, reposições e desenvolvimento de novas aplicações." }
      ]
    },
    en: {
      title: "Industrial Fabrics",
      intro: "Technical and industrial fabrics for manufacturing, transformation, protection, coating and special applications.",
      items: [
        { title: "Specification", text: "Selection by composition, resistance, finish, stability, treatment and final use." },
        { title: "Transformation", text: "Coordination of cutting, fabrication, coating, printing or finishing according to project." },
        { title: "Continuity", text: "Structure for series, replenishment and development of new applications." }
      ]
    }
  },
  cottonFabrics: {
    es: {
      title: "Tejidos de Algodón",
      intro: "Tejidos de algodón para marcas, confección profesional, colecciones, uniformidad y proyectos con requisitos de calidad.",
      items: [
        { title: "Selección", text: "Orientación por gramaje, composición, tacto, construcción, color y aplicación final." },
        { title: "Producción", text: "Soporte para muestras, pruebas, lotes profesionales y coordinación con fabricantes." },
        { title: "Mercado", text: "Preparación de fichas comerciales y técnicas para clientes B2B." }
      ]
    },
    pt: {
      title: "Tecidos de Algodão",
      intro: "Tecidos de algodão para marcas, confecção profissional, coleções, uniformes e projetos com requisitos de qualidade.",
      items: [
        { title: "Seleção", text: "Orientação por gramatura, composição, toque, construção, cor e aplicação final." },
        { title: "Produção", text: "Suporte para amostras, testes, lotes profissionais e coordenação com fabricantes." },
        { title: "Mercado", text: "Preparação de fichas comerciais e técnicas para clientes B2B." }
      ]
    },
    en: {
      title: "Cotton Fabrics",
      intro: "Cotton fabrics for brands, professional garment production, collections, uniforms and quality-led projects.",
      items: [
        { title: "Selection", text: "Guidance by weight, composition, hand feel, construction, color and final application." },
        { title: "Production", text: "Support for samples, trials, professional lots and coordination with manufacturers." },
        { title: "Market", text: "Commercial and technical sheets prepared for B2B clients." }
      ]
    }
  },
  kimonoFabrics: {
    es: {
      title: "Tejidos para Kimonos",
      intro: "Tejidos y desarrollos para kimonos, artes marciales, deporte y confección técnica con requisitos de resistencia.",
      items: [
        { title: "Uso deportivo", text: "Evaluación de peso, resistencia, encogimiento, tacto, transpirabilidad y mantenimiento." },
        { title: "Desarrollo", text: "Soporte para muestras, color, acabado, etiquetado y documentación de fabricación." },
        { title: "Canales", text: "Preparación para marcas, clubes, distribuidores y proyectos internacionales." }
      ]
    },
    pt: {
      title: "Tecidos para Kimonos",
      intro: "Tecidos e desenvolvimentos para kimonos, artes marciais, esporte e confecção técnica com requisitos de resistência.",
      items: [
        { title: "Uso esportivo", text: "Avaliação de peso, resistência, encolhimento, toque, respirabilidade e manutenção." },
        { title: "Desenvolvimento", text: "Suporte para amostras, cor, acabamento, etiquetagem e documentação de fabricação." },
        { title: "Canais", text: "Preparação para marcas, academias, distribuidores e projetos internacionais." }
      ]
    },
    en: {
      title: "Kimono Fabrics",
      intro: "Fabrics and developments for kimonos, martial arts, sport and technical garment production with resistance requirements.",
      items: [
        { title: "Sport use", text: "Assessment of weight, resistance, shrinkage, hand feel, breathability and care." },
        { title: "Development", text: "Support for samples, color, finishing, labeling and manufacturing documentation." },
        { title: "Channels", text: "Prepared for brands, academies, distributors and international projects." }
      ]
    }
  },
  marketplaceProducts: {
    es: {
      title: "Productos para Marketplaces",
      intro: "Desarrollo y adaptación de productos textiles para operadores, marcas y distribuidores que venden en marketplaces.",
      items: [
        { title: "Preparación comercial", text: "Estructura de ficha, variantes, empaques, documentación y requisitos por canal." },
        { title: "Operación", text: "Coordinación de fabricación, reposición, control de calidad y adaptación por mercado." },
        { title: "Sin e-commerce propio", text: "La web capta oportunidades B2B; las transacciones se tratan por canal comercial." }
      ]
    },
    pt: {
      title: "Produtos para Marketplaces",
      intro: "Desenvolvimento e adaptação de produtos têxteis para operadores, marcas e distribuidores que vendem em marketplaces.",
      items: [
        { title: "Preparação comercial", text: "Estrutura de ficha, variantes, embalagens, documentação e requisitos por canal." },
        { title: "Operação", text: "Coordenação de fabricação, reposição, controle de qualidade e adaptação por mercado." },
        { title: "Sem e-commerce próprio", text: "O site capta oportunidades B2B; as transações são tratadas por canal comercial." }
      ]
    },
    en: {
      title: "Marketplace Products",
      intro: "Development and adaptation of textile products for operators, brands and distributors selling through marketplaces.",
      items: [
        { title: "Commercial preparation", text: "Structure for sheets, variants, packaging, documentation and channel requirements." },
        { title: "Operation", text: "Coordination of manufacturing, replenishment, quality control and market adaptation." },
        { title: "No owned e-commerce", text: "The site captures B2B opportunities; transactions are handled through commercial channels." }
      ]
    }
  }
} satisfies Record<ProductPageKey, Record<Locale, { title: string; intro: string; items: ContentBlock[] }>>;

function seo(title: string, description: string): PageSeo {
  return { title: `${title} | CIKALA.es`, description };
}

function productPage(locale: Locale, key: ProductPageKey): PageContent {
  const entry = productContent[key][locale];

  if (!entry) {
    throw new Error(`Missing product content for ${key}/${locale}`);
  }

  return {
    type: "product",
    eyebrow: locale === "en" ? "Product category" : locale === "pt" ? "Categoria de produto" : "Categoría de producto",
    title: entry.title,
    intro: entry.intro,
    items: entry.items,
    related: ["products", "industrialSolutions", "contact"]
  };
}

function productSeo(locale: Locale, key: ProductPageKey): PageSeo {
  const entry = productContent[key][locale];

  if (!entry) {
    throw new Error(`Missing product SEO for ${key}/${locale}`);
  }

  return seo(entry.title, entry.intro);
}

function productOverview(locale: Locale): ContentBlock[] {
  return productItems[locale].map((item) => ({
    title: item.label,
    text:
      locale === "en"
        ? "Individual B2B page with technical context, applications, production criteria and commercial enquiry path."
        : locale === "pt"
          ? "Página individual B2B com contexto técnico, aplicações, critérios de produção e caminho de consulta comercial."
          : "Página individual B2B con contexto técnico, aplicaciones, criterios de producción y ruta de consulta comercial."
  }));
}

export const dictionaries: Record<Locale, Dictionary> = {
  es: {
    localeName: "Español",
    nav: [
      { key: "products", label: "Productos" },
      { key: "services", label: "Servicios" },
      { key: "industrialSolutions", label: "Soluciones" },
      { key: "brazilSpain", label: "Brasil - España" },
      { key: "partners", label: "Socios" },
      { key: "insights", label: "Insights" },
      { key: "contact", label: "Contacto" }
    ],
    cta: {
      primary: "Desarrollar una oportunidad B2B",
      secondary: "Ver productos",
      contactPanelTitle: "Hablar con el equipo comercial",
      contactPanelText: "Comparte contexto de empresa, mercado, volumen estimado y requisitos técnicos para evaluar la oportunidad."
    },
    footer: {
      tagline: "CIKALA.es es la plataforma europea de CIKALA para desarrollo de negocios B2B entre Brasil, España y Europa, con apoyo en productos técnicos, textiles, soluciones industriales, representación comercial y canales digitales.",
      contactLabel: "Contacto comercial",
      legal: "Sin venta online. Atención exclusiva a consultas profesionales."
    },
    pages: {
      home: seo("Plataforma B2B entre Brasil, España y Europa", "Plataforma europea de CIKALA para desarrollo de negocios B2B, productos industriales, representación comercial, soluciones textiles, marketplaces y oportunidades entre mercados."),
      products: seo("Productos textiles y técnicos B2B", "Categorías de productos textiles y técnicos para consultas profesionales, fabricación bajo requisito y expansión comercial."),
      services: seo("Servicios B2B", "Desarrollo, coordinación, sourcing, adaptación comercial y seguimiento de proyectos textiles para empresas."),
      industrialSolutions: seo("Soluciones Industriales", "Soluciones textiles industriales para protección, separación, impermeabilización, sombreado y aplicaciones técnicas."),
      brazilSpain: seo("Brasil - España", "Conexión comercial y técnica para empresas que necesitan operar entre Brasil y España."),
      sellBrazil: seo("Vender en Brasil", "Soporte B2B para preparar productos, documentación y entrada comercial en el mercado brasileño."),
      sellEurope: seo("Vender en Europa", "Soporte B2B para adaptar productos, requisitos y presencia comercial en Europa."),
      latamEurope: seo("América Latina - Europa", "Puente comercial entre América Latina y Europa para productos textiles, técnicos e industriales."),
      partners: seo("Socios y partners", "Estructura para fabricantes, distribuidores y aliados comerciales interesados en colaborar con CIKALA.es."),
      insights: seo("Insights y blog B2B", "Área editorial para análisis de mercados, productos técnicos, expansión internacional y procesos B2B."),
      sectors: seo("Sectores profesionales", "Soluciones textiles y técnicas para marcas, industria, equipamiento, hospitality, deporte y proyectos especiales."),
      projects: seo("Proyectos técnicos", "Presentación de capacidades, procesos y proyectos textiles sin convertir el sitio en comercio electrónico."),
      contact: seo("Contacto comercial", "Formulario B2B para consultas de fabricación, volúmenes, plazos, mercados e información técnica."),
      technicalTarpaulins: productSeo("es", "technicalTarpaulins"),
      meshShading: productSeo("es", "meshShading"),
      coversCoverings: productSeo("es", "coversCoverings"),
      geomembranes: productSeo("es", "geomembranes"),
      industrialCurtains: productSeo("es", "industrialCurtains"),
      industrialFabrics: productSeo("es", "industrialFabrics"),
      cottonFabrics: productSeo("es", "cottonFabrics"),
      kimonoFabrics: productSeo("es", "kimonoFabrics"),
      marketplaceProducts: productSeo("es", "marketplaceProducts")
    },
    content: {
      home: {
        type: "home",
        eyebrow: "Arquitectura B2B para fabricación, producto y mercado",
        title: "CIKALA.es — Plataforma B2B entre Brasil, España y Europa",
        intro: "La plataforma europea de CIKALA para desarrollo de negocios B2B, productos industriales, representación comercial, soluciones textiles, marketplaces y oportunidades entre mercados.",
        items: [
          { title: "Producto técnico", text: "Categorías individuales para lonas, mallas, coberturas, geomembranas, cortinas y tejidos." },
          { title: "Expansión internacional", text: "Páginas específicas para Brasil-España, vender en Brasil, vender en Europa y América Latina-Europa." },
          { title: "Demanda B2B", text: "CTAs comerciales, formularios profesionales, SEO técnico y datos estructurados." }
        ],
        related: ["products", "industrialSolutions", "brazilSpain", "contact"]
      },
      products: {
        type: "product",
        eyebrow: "Portfolio B2B",
        title: "Productos textiles y técnicos",
        intro: "Categorías preparadas para explicar aplicaciones, requisitos y producción profesional sin catálogo transaccional.",
        items: productOverview("es"),
        related: productPageKeys
      },
      services: {
        type: "service",
        eyebrow: "Servicios comerciales y técnicos",
        title: "Servicios para proyectos B2B",
        intro: "Acompañamiento para desarrollar, adaptar, fabricar y posicionar productos textiles en mercados profesionales.",
        items: [
          { title: "Sourcing y especificación", text: "Búsqueda de capacidades, definición técnica, muestras, materiales y requisitos de fabricación." },
          { title: "Adaptación de mercado", text: "Preparación comercial para Brasil, España, Europa y canales profesionales." },
          { title: "Coordinación de proveedores", text: "Seguimiento de plazos, documentación, calidad y comunicación B2B." }
        ],
        related: ["products", "sellBrazil", "sellEurope", "contact"]
      },
      industrialSolutions: {
        type: "service",
        eyebrow: "Soluciones Industriales",
        title: "Soluciones textiles para aplicaciones industriales",
        intro: "Estructura para proyectos de protección, sombreado, impermeabilización, separación de espacios y fabricación técnica.",
        items: [
          { title: "Aplicaciones técnicas", text: "Entornos industriales, agrícolas, logísticos, obra, instalaciones y equipamiento." },
          { title: "Requisitos por proyecto", text: "Análisis de resistencia, exposición, dimensiones, acabado, instalación y mantenimiento." },
          { title: "Fabricación coordinada", text: "Proceso comercial para evaluar viabilidad y preparar propuesta profesional." }
        ],
        related: ["technicalTarpaulins", "geomembranes", "industrialCurtains", "contact"]
      },
      brazilSpain: {
        type: "market",
        eyebrow: "Brasil - España",
        title: "Puente comercial entre Brasil y España",
        intro: "Soporte para empresas que necesitan adaptar productos, proveedores, documentación y oportunidades entre ambos mercados.",
        items: [
          { title: "Lectura de mercado", text: "Identificación de requisitos, canales, barreras y encaje comercial." },
          { title: "Producto y proveedor", text: "Coordinación para adaptar materiales, formatos, documentación y comunicación." },
          { title: "Relación B2B", text: "Captación de oportunidades y seguimiento por canal comercial directo." }
        ],
        related: ["sellBrazil", "sellEurope", "latamEurope", "contact"]
      },
      sellBrazil: {
        type: "market",
        eyebrow: "Entrada comercial",
        title: "Vender en Brasil",
        intro: "Preparación B2B para empresas que quieren evaluar, adaptar y presentar productos técnicos o textiles en Brasil.",
        items: [
          { title: "Diagnóstico", text: "Producto, canal, documentación, requisitos técnicos y propuesta de valor para mercado brasileño." },
          { title: "Adaptación", text: "Ajuste de comunicación, formatos, fichas, muestras y condiciones comerciales." },
          { title: "Prospección", text: "Estructura para abrir conversaciones con distribuidores, clientes profesionales o socios." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      sellEurope: {
        type: "market",
        eyebrow: "Entrada comercial",
        title: "Vender en Europa",
        intro: "Preparación para empresas que buscan adaptar producto, documentación y operación comercial para mercados europeos.",
        items: [
          { title: "Ajuste europeo", text: "Revisión de requisitos, idiomas, documentación, ficha técnica y expectativas del cliente profesional." },
          { title: "Canales B2B", text: "Estructura para distribuidores, marcas, industria, marketplaces o acuerdos comerciales." },
          { title: "Continuidad", text: "Seguimiento de oportunidades, muestras, negociación y reposición profesional." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      latamEurope: {
        type: "market",
        eyebrow: "América Latina - Europa",
        title: "Conexión comercial entre América Latina y Europa",
        intro: "Arquitectura para proyectos que cruzan proveedores, productos, marcas y oportunidades entre regiones.",
        items: [
          { title: "Mapeo regional", text: "Mercados, capacidades, categorías y prioridades por país o canal." },
          { title: "Desarrollo de oportunidades", text: "Preparación de propuestas, documentación y conversación comercial." },
          { title: "Operación coordinada", text: "Acompañamiento en comunicación, muestras, requisitos y próximos pasos." }
        ],
        related: ["sellBrazil", "sellEurope", "partners", "contact"]
      },
      partners: {
        type: "content",
        eyebrow: "Red profesional",
        title: "Socios, fabricantes y aliados comerciales",
        intro: "Página para captar fabricantes, distribuidores, representantes y colaboradores B2B alineados con el posicionamiento de CIKALA.es.",
        items: [
          { title: "Fabricantes", text: "Capacidades de producción, especialidad técnica, documentación y continuidad." },
          { title: "Distribuidores", text: "Canales profesionales para mercados, categorías o verticales específicas." },
          { title: "Colaboraciones", text: "Acuerdos comerciales, representación, desarrollo de producto o expansión internacional." }
        ],
        related: ["products", "brazilSpain", "latamEurope", "contact"]
      },
      insights: {
        type: "content",
        eyebrow: "Insights / Blog",
        title: "Insights B2B sobre producto, industria y mercado",
        intro: "Base editorial para publicar análisis, guías y contenidos SEO sobre productos técnicos, fabricación y expansión comercial.",
        items: [
          { title: "Guías de producto", text: "Contenido explicativo sobre categorías, usos, criterios técnicos y preparación comercial." },
          { title: "Mercados", text: "Análisis sobre Brasil, España, Europa, América Latina y canales B2B." },
          { title: "Procesos", text: "Artículos sobre sourcing, especificación, muestras, proveedores y gestión de oportunidades." }
        ],
        related: ["products", "services", "brazilSpain", "contact"]
      },
      sectors: {
        type: "content",
        eyebrow: "Sectores",
        title: "Sectores y aplicaciones",
        intro: "Verticales profesionales para marcas, industria, equipamiento, hospitality, deporte y proyectos especiales.",
        items: [
          { title: "Industria y obra", text: "Protección, separación, impermeabilización, sombreado y soluciones técnicas." },
          { title: "Marcas y canales", text: "Tejidos, productos preparados para marketplaces y adaptación comercial." },
          { title: "Deporte y equipamiento", text: "Tejidos para kimonos, uniformidad y aplicaciones de rendimiento." }
        ],
        related: ["products", "industrialSolutions", "contact"]
      },
      projects: {
        type: "content",
        eyebrow: "Proyectos",
        title: "Proyectos técnicos y especiales",
        intro: "Área para presentar capacidades, fichas, aplicaciones finales y resultados sin venta directa.",
        items: [
          { title: "Ficha de proyecto", text: "Objetivo, aplicación, materiales, proceso, requisitos y resultado." },
          { title: "SEO escalable", text: "Cada caso puede crecer como página indexable con enlaces internos y datos estructurados." },
          { title: "Consulta cualificada", text: "La conversión se dirige a formulario comercial y evaluación profesional." }
        ],
        related: ["services", "products", "contact"]
      },
      contact: {
        type: "contact",
        eyebrow: "Contacto comercial",
        title: "Contacto comercial",
        intro: "Cuéntanos el contexto del proyecto para que el equipo pueda evaluar requisitos, volumen, mercado y próximos pasos.",
        items: [],
        related: ["products", "services", "partners"]
      },
      technicalTarpaulins: productPage("es", "technicalTarpaulins"),
      meshShading: productPage("es", "meshShading"),
      coversCoverings: productPage("es", "coversCoverings"),
      geomembranes: productPage("es", "geomembranes"),
      industrialCurtains: productPage("es", "industrialCurtains"),
      industrialFabrics: productPage("es", "industrialFabrics"),
      cottonFabrics: productPage("es", "cottonFabrics"),
      kimonoFabrics: productPage("es", "kimonoFabrics"),
      marketplaceProducts: productPage("es", "marketplaceProducts")
    },
    contact: {
      form: {
        company: "Empresa",
        name: "Nombre",
        email: "Email profesional",
        phone: "Teléfono",
        market: "Mercado objetivo",
        need: "Tipo de necesidad",
        volume: "Volumen estimado",
        message: "Descripción del proyecto",
        submit: "Enviar consulta"
      }
    }
  },
  pt: {
    localeName: "Português",
    nav: [
      { key: "products", label: "Produtos" },
      { key: "services", label: "Serviços" },
      { key: "industrialSolutions", label: "Soluções" },
      { key: "brazilSpain", label: "Brasil - Espanha" },
      { key: "partners", label: "Parceiros" },
      { key: "insights", label: "Insights" },
      { key: "contact", label: "Contato" }
    ],
    cta: {
      primary: "Solicitar proposta",
      secondary: "Ver produtos",
      contactPanelTitle: "Falar com a equipe comercial",
      contactPanelText: "Compartilhe contexto da empresa, mercado, volume estimado e requisitos técnicos para avaliar a oportunidade."
    },
    footer: {
      tagline: "A CIKALA.es apoia projetos têxteis e técnicos para empresas que precisam fabricar, adaptar ou vender entre Brasil, Espanha, Europa e América Latina.",
      contactLabel: "Contato comercial",
      legal: "Sem venda online. Atendimento exclusivo a consultas profissionais."
    },
    pages: {
      home: seo("Desenvolvimento têxtil, produtos técnicos e expansão B2B", "Arquitetura comercial para projetos têxteis B2B, categorias técnicas, expansão Brasil-Espanha e formulários profissionais."),
      products: seo("Produtos têxteis e técnicos B2B", "Categorias de produtos têxteis e técnicos para consultas profissionais, fabricação sob requisito e expansão comercial."),
      services: seo("Serviços B2B", "Desenvolvimento, coordenação, sourcing, adaptação comercial e acompanhamento de projetos têxteis para empresas."),
      industrialSolutions: seo("Soluções Industriais", "Soluções têxteis industriais para proteção, separação, impermeabilização, sombreamento e aplicações técnicas."),
      brazilSpain: seo("Brasil - Espanha", "Conexão comercial e técnica para empresas que precisam operar entre Brasil e Espanha."),
      sellBrazil: seo("Vender no Brasil", "Suporte B2B para preparar produtos, documentação e entrada comercial no mercado brasileiro."),
      sellEurope: seo("Vender na Europa", "Suporte B2B para adaptar produtos, requisitos e presença comercial na Europa."),
      latamEurope: seo("América Latina - Europa", "Ponte comercial entre América Latina e Europa para produtos têxteis, técnicos e industriais."),
      partners: seo("Parceiros", "Estrutura para fabricantes, distribuidores e aliados comerciais interessados em colaborar com a CIKALA.es."),
      insights: seo("Insights e blog B2B", "Área editorial para análises de mercados, produtos técnicos, expansão internacional e processos B2B."),
      sectors: seo("Setores profissionais", "Soluções têxteis e técnicas para marcas, indústria, equipamentos, hospitality, esporte e projetos especiais."),
      projects: seo("Projetos técnicos", "Apresentação de capacidades, processos e projetos têxteis sem transformar o site em comércio eletrônico."),
      contact: seo("Contato comercial", "Formulário B2B para consultas de fabricação, volumes, prazos, mercados e informações técnicas."),
      technicalTarpaulins: productSeo("pt", "technicalTarpaulins"),
      meshShading: productSeo("pt", "meshShading"),
      coversCoverings: productSeo("pt", "coversCoverings"),
      geomembranes: productSeo("pt", "geomembranes"),
      industrialCurtains: productSeo("pt", "industrialCurtains"),
      industrialFabrics: productSeo("pt", "industrialFabrics"),
      cottonFabrics: productSeo("pt", "cottonFabrics"),
      kimonoFabrics: productSeo("pt", "kimonoFabrics"),
      marketplaceProducts: productSeo("pt", "marketplaceProducts")
    },
    content: {
      home: {
        type: "home",
        eyebrow: "Arquitetura B2B para fabricação, produto e mercado",
        title: "Produtos têxteis, soluções industriais e expansão comercial entre Brasil, Espanha, Europa e América Latina.",
        intro: "Uma base digital preparada para explicar capacidades, captar consultas qualificadas e crescer por mercados sem virar e-commerce.",
        items: [
          { title: "Produto técnico", text: "Categorias individuais para lonas, telas, coberturas, geomembranas, cortinas e tecidos." },
          { title: "Expansão internacional", text: "Páginas específicas para Brasil-Espanha, vender no Brasil, vender na Europa e América Latina-Europa." },
          { title: "Demanda B2B", text: "CTAs comerciais, formulários profissionais, SEO técnico e dados estruturados." }
        ],
        related: ["products", "industrialSolutions", "brazilSpain", "contact"]
      },
      products: {
        type: "product",
        eyebrow: "Portfólio B2B",
        title: "Produtos têxteis e técnicos",
        intro: "Categorias preparadas para explicar aplicações, requisitos e produção profissional sem catálogo transacional.",
        items: productOverview("pt"),
        related: productPageKeys
      },
      services: {
        type: "service",
        eyebrow: "Serviços comerciais e técnicos",
        title: "Serviços para projetos B2B",
        intro: "Acompanhamento para desenvolver, adaptar, fabricar e posicionar produtos têxteis em mercados profissionais.",
        items: [
          { title: "Sourcing e especificação", text: "Busca de capacidades, definição técnica, amostras, materiais e requisitos de fabricação." },
          { title: "Adaptação de mercado", text: "Preparação comercial para Brasil, Espanha, Europa e canais profissionais." },
          { title: "Coordenação de fornecedores", text: "Acompanhamento de prazos, documentação, qualidade e comunicação B2B." }
        ],
        related: ["products", "sellBrazil", "sellEurope", "contact"]
      },
      industrialSolutions: {
        type: "service",
        eyebrow: "Soluções Industriais",
        title: "Soluções têxteis para aplicações industriais",
        intro: "Estrutura para projetos de proteção, sombreamento, impermeabilização, separação de espaços e fabricação técnica.",
        items: [
          { title: "Aplicações técnicas", text: "Ambientes industriais, agrícolas, logísticos, obra, instalações e equipamentos." },
          { title: "Requisitos por projeto", text: "Análise de resistência, exposição, dimensões, acabamento, instalação e manutenção." },
          { title: "Fabricação coordenada", text: "Processo comercial para avaliar viabilidade e preparar proposta profissional." }
        ],
        related: ["technicalTarpaulins", "geomembranes", "industrialCurtains", "contact"]
      },
      brazilSpain: {
        type: "market",
        eyebrow: "Brasil - Espanha",
        title: "Ponte comercial entre Brasil e Espanha",
        intro: "Suporte para empresas que precisam adaptar produtos, fornecedores, documentação e oportunidades entre os dois mercados.",
        items: [
          { title: "Leitura de mercado", text: "Identificação de requisitos, canais, barreiras e encaixe comercial." },
          { title: "Produto e fornecedor", text: "Coordenação para adaptar materiais, formatos, documentação e comunicação." },
          { title: "Relação B2B", text: "Captação de oportunidades e acompanhamento por canal comercial direto." }
        ],
        related: ["sellBrazil", "sellEurope", "latamEurope", "contact"]
      },
      sellBrazil: {
        type: "market",
        eyebrow: "Entrada comercial",
        title: "Vender no Brasil",
        intro: "Preparação B2B para empresas que querem avaliar, adaptar e apresentar produtos técnicos ou têxteis no Brasil.",
        items: [
          { title: "Diagnóstico", text: "Produto, canal, documentação, requisitos técnicos e proposta de valor para o mercado brasileiro." },
          { title: "Adaptação", text: "Ajuste de comunicação, formatos, fichas, amostras e condições comerciais." },
          { title: "Prospecção", text: "Estrutura para abrir conversas com distribuidores, clientes profissionais ou parceiros." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      sellEurope: {
        type: "market",
        eyebrow: "Entrada comercial",
        title: "Vender na Europa",
        intro: "Preparação para empresas que buscam adaptar produto, documentação e operação comercial para mercados europeus.",
        items: [
          { title: "Ajuste europeu", text: "Revisão de requisitos, idiomas, documentação, ficha técnica e expectativas do cliente profissional." },
          { title: "Canais B2B", text: "Estrutura para distribuidores, marcas, indústria, marketplaces ou acordos comerciais." },
          { title: "Continuidade", text: "Acompanhamento de oportunidades, amostras, negociação e reposição profissional." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      latamEurope: {
        type: "market",
        eyebrow: "América Latina - Europa",
        title: "Conexão comercial entre América Latina e Europa",
        intro: "Arquitetura para projetos que conectam fornecedores, produtos, marcas e oportunidades entre regiões.",
        items: [
          { title: "Mapeamento regional", text: "Mercados, capacidades, categorias e prioridades por país ou canal." },
          { title: "Desenvolvimento de oportunidades", text: "Preparação de propostas, documentação e conversa comercial." },
          { title: "Operação coordenada", text: "Acompanhamento em comunicação, amostras, requisitos e próximos passos." }
        ],
        related: ["sellBrazil", "sellEurope", "partners", "contact"]
      },
      partners: {
        type: "content",
        eyebrow: "Rede profissional",
        title: "Parceiros, fabricantes e aliados comerciais",
        intro: "Página para captar fabricantes, distribuidores, representantes e colaboradores B2B alinhados com o posicionamento da CIKALA.es.",
        items: [
          { title: "Fabricantes", text: "Capacidades de produção, especialidade técnica, documentação e continuidade." },
          { title: "Distribuidores", text: "Canais profissionais para mercados, categorias ou verticais específicas." },
          { title: "Colaborações", text: "Acordos comerciais, representação, desenvolvimento de produto ou expansão internacional." }
        ],
        related: ["products", "brazilSpain", "latamEurope", "contact"]
      },
      insights: {
        type: "content",
        eyebrow: "Insights / Blog",
        title: "Insights B2B sobre produto, indústria e mercado",
        intro: "Base editorial para publicar análises, guias e conteúdos SEO sobre produtos técnicos, fabricação e expansão comercial.",
        items: [
          { title: "Guias de produto", text: "Conteúdo explicativo sobre categorias, usos, critérios técnicos e preparação comercial." },
          { title: "Mercados", text: "Análises sobre Brasil, Espanha, Europa, América Latina e canais B2B." },
          { title: "Processos", text: "Artigos sobre sourcing, especificação, amostras, fornecedores e gestão de oportunidades." }
        ],
        related: ["products", "services", "brazilSpain", "contact"]
      },
      sectors: {
        type: "content",
        eyebrow: "Setores",
        title: "Setores e aplicações",
        intro: "Verticais profissionais para marcas, indústria, equipamentos, hospitality, esporte e projetos especiais.",
        items: [
          { title: "Indústria e obra", text: "Proteção, separação, impermeabilização, sombreamento e soluções técnicas." },
          { title: "Marcas e canais", text: "Tecidos, produtos preparados para marketplaces e adaptação comercial." },
          { title: "Esporte e equipamentos", text: "Tecidos para kimonos, uniformes e aplicações de performance." }
        ],
        related: ["products", "industrialSolutions", "contact"]
      },
      projects: {
        type: "content",
        eyebrow: "Projetos",
        title: "Projetos técnicos e especiais",
        intro: "Área para apresentar capacidades, fichas, aplicações finais e resultados sem venda direta.",
        items: [
          { title: "Ficha de projeto", text: "Objetivo, aplicação, materiais, processo, requisitos e resultado." },
          { title: "SEO escalável", text: "Cada caso pode crescer como página indexável com links internos e dados estruturados." },
          { title: "Consulta qualificada", text: "A conversão aponta para formulário comercial e avaliação profissional." }
        ],
        related: ["services", "products", "contact"]
      },
      contact: {
        type: "contact",
        eyebrow: "Contato comercial",
        title: "Contato comercial",
        intro: "Conte o contexto do projeto para que a equipe possa avaliar requisitos, volume, mercado e próximos passos.",
        items: [],
        related: ["products", "services", "partners"]
      },
      technicalTarpaulins: productPage("pt", "technicalTarpaulins"),
      meshShading: productPage("pt", "meshShading"),
      coversCoverings: productPage("pt", "coversCoverings"),
      geomembranes: productPage("pt", "geomembranes"),
      industrialCurtains: productPage("pt", "industrialCurtains"),
      industrialFabrics: productPage("pt", "industrialFabrics"),
      cottonFabrics: productPage("pt", "cottonFabrics"),
      kimonoFabrics: productPage("pt", "kimonoFabrics"),
      marketplaceProducts: productPage("pt", "marketplaceProducts")
    },
    contact: {
      form: {
        company: "Empresa",
        name: "Nome",
        email: "Email profissional",
        phone: "Telefone",
        market: "Mercado-alvo",
        need: "Tipo de necessidade",
        volume: "Volume estimado",
        message: "Descrição do projeto",
        submit: "Enviar consulta"
      }
    }
  },
  en: {
    localeName: "English",
    nav: [
      { key: "products", label: "Products" },
      { key: "services", label: "Services" },
      { key: "industrialSolutions", label: "Solutions" },
      { key: "brazilSpain", label: "Brazil - Spain" },
      { key: "partners", label: "Partners" },
      { key: "insights", label: "Insights" },
      { key: "contact", label: "Contact" }
    ],
    cta: {
      primary: "Request proposal",
      secondary: "View products",
      contactPanelTitle: "Talk to the commercial team",
      contactPanelText: "Share company context, target market, estimated volume and technical requirements so the opportunity can be assessed."
    },
    footer: {
      tagline: "CIKALA.es supports textile and technical projects for companies that need to manufacture, adapt or sell between Brazil, Spain, Europe and Latin America.",
      contactLabel: "Commercial contact",
      legal: "No online sales. Professional enquiries only."
    },
    pages: {
      home: seo("Textile development, technical products and B2B expansion", "Commercial architecture for B2B textile projects, technical categories, Brazil-Spain expansion and professional forms."),
      products: seo("B2B textile and technical products", "Textile and technical product categories for professional enquiries, requirement-led manufacturing and commercial expansion."),
      services: seo("B2B services", "Development, coordination, sourcing, commercial adaptation and follow-up for textile projects."),
      industrialSolutions: seo("Industrial Solutions", "Industrial textile solutions for protection, separation, waterproofing, shading and technical applications."),
      brazilSpain: seo("Brazil - Spain", "Commercial and technical connection for companies that need to operate between Brazil and Spain."),
      sellBrazil: seo("Sell in Brazil", "B2B support to prepare products, documentation and commercial entry into the Brazilian market."),
      sellEurope: seo("Sell in Europe", "B2B support to adapt products, requirements and commercial presence in Europe."),
      latamEurope: seo("Latin America - Europe", "Commercial bridge between Latin America and Europe for textile, technical and industrial products."),
      partners: seo("Partners", "Structure for manufacturers, distributors and commercial allies interested in collaborating with CIKALA.es."),
      insights: seo("B2B insights and blog", "Editorial area for market analysis, technical products, international expansion and B2B processes."),
      sectors: seo("Professional sectors", "Textile and technical solutions for brands, industry, equipment, hospitality, sport and special projects."),
      projects: seo("Technical projects", "Presentation of capabilities, processes and textile projects without turning the site into e-commerce."),
      contact: seo("Commercial contact", "B2B form for manufacturing enquiries, volumes, timelines, markets and technical information."),
      technicalTarpaulins: productSeo("en", "technicalTarpaulins"),
      meshShading: productSeo("en", "meshShading"),
      coversCoverings: productSeo("en", "coversCoverings"),
      geomembranes: productSeo("en", "geomembranes"),
      industrialCurtains: productSeo("en", "industrialCurtains"),
      industrialFabrics: productSeo("en", "industrialFabrics"),
      cottonFabrics: productSeo("en", "cottonFabrics"),
      kimonoFabrics: productSeo("en", "kimonoFabrics"),
      marketplaceProducts: productSeo("en", "marketplaceProducts")
    },
    content: {
      home: {
        type: "home",
        eyebrow: "B2B architecture for manufacturing, product and market",
        title: "Textile products, industrial solutions and commercial expansion between Brazil, Spain, Europe and Latin America.",
        intro: "A digital foundation built to explain capabilities, capture qualified enquiries and grow by market without becoming e-commerce.",
        items: [
          { title: "Technical product", text: "Individual categories for tarpaulins, mesh, covers, geomembranes, curtains and fabrics." },
          { title: "International expansion", text: "Specific pages for Brazil-Spain, selling in Brazil, selling in Europe and Latin America-Europe." },
          { title: "B2B demand", text: "Commercial CTAs, professional forms, technical SEO and structured data." }
        ],
        related: ["products", "industrialSolutions", "brazilSpain", "contact"]
      },
      products: {
        type: "product",
        eyebrow: "B2B portfolio",
        title: "Textile and technical products",
        intro: "Categories prepared to explain applications, requirements and professional production without a transactional catalogue.",
        items: productOverview("en"),
        related: productPageKeys
      },
      services: {
        type: "service",
        eyebrow: "Commercial and technical services",
        title: "Services for B2B projects",
        intro: "Support to develop, adapt, manufacture and position textile products in professional markets.",
        items: [
          { title: "Sourcing and specification", text: "Capability search, technical definition, samples, materials and manufacturing requirements." },
          { title: "Market adaptation", text: "Commercial preparation for Brazil, Spain, Europe and professional channels." },
          { title: "Supplier coordination", text: "Timeline, documentation, quality and B2B communication follow-up." }
        ],
        related: ["products", "sellBrazil", "sellEurope", "contact"]
      },
      industrialSolutions: {
        type: "service",
        eyebrow: "Industrial Solutions",
        title: "Textile solutions for industrial applications",
        intro: "Structure for protection, shading, waterproofing, space separation and technical manufacturing projects.",
        items: [
          { title: "Technical applications", text: "Industrial, agricultural, logistics, construction, facility and equipment environments." },
          { title: "Project requirements", text: "Analysis of resistance, exposure, dimensions, finish, installation and maintenance." },
          { title: "Coordinated manufacturing", text: "Commercial process to assess feasibility and prepare a professional proposal." }
        ],
        related: ["technicalTarpaulins", "geomembranes", "industrialCurtains", "contact"]
      },
      brazilSpain: {
        type: "market",
        eyebrow: "Brazil - Spain",
        title: "Commercial bridge between Brazil and Spain",
        intro: "Support for companies that need to adapt products, suppliers, documentation and opportunities between both markets.",
        items: [
          { title: "Market reading", text: "Identification of requirements, channels, barriers and commercial fit." },
          { title: "Product and supplier", text: "Coordination to adapt materials, formats, documentation and communication." },
          { title: "B2B relationship", text: "Opportunity capture and follow-up through a direct commercial channel." }
        ],
        related: ["sellBrazil", "sellEurope", "latamEurope", "contact"]
      },
      sellBrazil: {
        type: "market",
        eyebrow: "Commercial entry",
        title: "Sell in Brazil",
        intro: "B2B preparation for companies that want to assess, adapt and present technical or textile products in Brazil.",
        items: [
          { title: "Diagnosis", text: "Product, channel, documentation, technical requirements and value proposition for the Brazilian market." },
          { title: "Adaptation", text: "Adjustment of communication, formats, sheets, samples and commercial conditions." },
          { title: "Prospecting", text: "Structure to open conversations with distributors, professional clients or partners." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      sellEurope: {
        type: "market",
        eyebrow: "Commercial entry",
        title: "Sell in Europe",
        intro: "Preparation for companies seeking to adapt product, documentation and commercial operation for European markets.",
        items: [
          { title: "European fit", text: "Review of requirements, languages, documentation, technical sheets and professional client expectations." },
          { title: "B2B channels", text: "Structure for distributors, brands, industry, marketplaces or commercial agreements." },
          { title: "Continuity", text: "Follow-up for opportunities, samples, negotiation and professional replenishment." }
        ],
        related: ["brazilSpain", "latamEurope", "partners", "contact"]
      },
      latamEurope: {
        type: "market",
        eyebrow: "Latin America - Europe",
        title: "Commercial connection between Latin America and Europe",
        intro: "Architecture for projects connecting suppliers, products, brands and opportunities between regions.",
        items: [
          { title: "Regional mapping", text: "Markets, capabilities, categories and priorities by country or channel." },
          { title: "Opportunity development", text: "Preparation of proposals, documentation and commercial conversation." },
          { title: "Coordinated operation", text: "Support for communication, samples, requirements and next steps." }
        ],
        related: ["sellBrazil", "sellEurope", "partners", "contact"]
      },
      partners: {
        type: "content",
        eyebrow: "Professional network",
        title: "Partners, manufacturers and commercial allies",
        intro: "Page to capture manufacturers, distributors, representatives and B2B collaborators aligned with CIKALA.es positioning.",
        items: [
          { title: "Manufacturers", text: "Production capabilities, technical specialty, documentation and continuity." },
          { title: "Distributors", text: "Professional channels for specific markets, categories or verticals." },
          { title: "Collaborations", text: "Commercial agreements, representation, product development or international expansion." }
        ],
        related: ["products", "brazilSpain", "latamEurope", "contact"]
      },
      insights: {
        type: "content",
        eyebrow: "Insights / Blog",
        title: "B2B insights on product, industry and market",
        intro: "Editorial foundation for analysis, guides and SEO content about technical products, manufacturing and commercial expansion.",
        items: [
          { title: "Product guides", text: "Explanatory content about categories, uses, technical criteria and commercial preparation." },
          { title: "Markets", text: "Analysis about Brazil, Spain, Europe, Latin America and B2B channels." },
          { title: "Processes", text: "Articles about sourcing, specification, samples, suppliers and opportunity management." }
        ],
        related: ["products", "services", "brazilSpain", "contact"]
      },
      sectors: {
        type: "content",
        eyebrow: "Sectors",
        title: "Sectors and applications",
        intro: "Professional verticals for brands, industry, equipment, hospitality, sport and special projects.",
        items: [
          { title: "Industry and construction", text: "Protection, separation, waterproofing, shading and technical solutions." },
          { title: "Brands and channels", text: "Fabrics, marketplace-ready products and commercial adaptation." },
          { title: "Sport and equipment", text: "Kimono fabrics, uniforms and performance applications." }
        ],
        related: ["products", "industrialSolutions", "contact"]
      },
      projects: {
        type: "content",
        eyebrow: "Projects",
        title: "Technical and special projects",
        intro: "Area to present capabilities, sheets, final applications and outcomes without direct sales.",
        items: [
          { title: "Project sheet", text: "Objective, application, materials, process, requirements and outcome." },
          { title: "Scalable SEO", text: "Each case can grow as an indexable page with internal links and structured data." },
          { title: "Qualified enquiry", text: "Conversion points to the commercial form and professional assessment." }
        ],
        related: ["services", "products", "contact"]
      },
      contact: {
        type: "contact",
        eyebrow: "Commercial contact",
        title: "Commercial contact",
        intro: "Share project context so the team can assess requirements, volume, market and next steps.",
        items: [],
        related: ["products", "services", "partners"]
      },
      technicalTarpaulins: productPage("en", "technicalTarpaulins"),
      meshShading: productPage("en", "meshShading"),
      coversCoverings: productPage("en", "coversCoverings"),
      geomembranes: productPage("en", "geomembranes"),
      industrialCurtains: productPage("en", "industrialCurtains"),
      industrialFabrics: productPage("en", "industrialFabrics"),
      cottonFabrics: productPage("en", "cottonFabrics"),
      kimonoFabrics: productPage("en", "kimonoFabrics"),
      marketplaceProducts: productPage("en", "marketplaceProducts")
    },
    contact: {
      form: {
        company: "Company",
        name: "Name",
        email: "Professional email",
        phone: "Phone",
        market: "Target market",
        need: "Need type",
        volume: "Estimated volume",
        message: "Project description",
        submit: "Send enquiry"
      }
    }
  }
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
