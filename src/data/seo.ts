// ─────────────────────────────────────────────────────────
// ALTOBY — SEO SINGLE SOURCE OF TRUTH
// Centralized metadata, keywords, and structured data config.
// Equivalent to Yoast's per-page SEO configuration.
// ─────────────────────────────────────────────────────────

export const SITE = {
  name: "Altoby",
  tagline: "Digital Growth for Professional Services",
  url: "https://altoby.com",
  locale: "en_KE",
  logo: "https://altoby.com/favicon.svg",
  ogImage: "https://altoby.com/og-image.png",
  twitter: "@altoby_digital",
} as const;

export const BUSINESS = {
  legalName: "Altoby Digital Studio",
  foundingYear: 2024,
  phone: "+254717342473",
  email: "hello@altoby.com",
  address: {
    streetAddress: "ABC Place, Waiyaki Way, Nairobi",
    city: "Nairobi",
    region: "Nairobi County",
    postalCode: "00100",
    country: "KE",
  },
  geo: {
    latitude: -1.2921,
    longitude: 36.8219,
  },
  openingHours: "Mo-Fr 08:00-18:00",
  priceRange: "$$",
  // Add your GBP CID here when available
  googleMapsUrl: "https://maps.google.com/?q=Altoby+Digital+Studio+Nairobi",
  sameAs: [
    "https://wa.me/254717342473",
    // Add LinkedIn, Twitter/X, Instagram URLs here
  ],
  areaServed: [
    "Nairobi",
    "Kenya",
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Ethiopia",
    "South Sudan",
    "South Africa",
    "Zambia",
    "Zimbabwe",
    "Canada",
    "UK",
    "USA",
    "UAE",
    "Germany",
    "Australia",
    "New Zealand",
    "East Africa",
    "Global",
  ],
  knowsAbout: [
    "Web Design",
    "Web Development",
    "Search Engine Optimization",
    "Google Business Profile Management",
    "Content Marketing",
    "Business Automation",
    "AI Integration",
    "Brand Strategy",
    "Digital Transformation",
    "Professional Services Marketing",
  ],
} as const;

// ─── PER-PAGE SEO METADATA ─────────────────────────────
// Each page gets a unique, keyword-rich title + description.
// Title format: Primary Keyword | Brand — matches Yoast best practice.

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
}

export const PAGE_SEO: Record<string, PageSEO> = {
  home: {
    title: "Altoby — Web Design & Digital Growth for Professional Services | Nairobi",
    description:
      "Altoby helps law firms, consultancies, and professional services businesses in Kenya build a credible digital presence that wins clients — through premium web design, SEO content, and smart automation.",
    keywords:
      "web design nairobi, digital agency kenya, professional services website, law firm web design, consultancy website design, google business profile nairobi, seo kenya, business automation nairobi",
  },
  about: {
    title: "About Altoby — Nairobi Digital Studio for Professional Services",
    description:
      "The story behind Altoby: a focused digital studio in Nairobi building high-fidelity web experiences and growth systems for law firms, consultancies, and professional services businesses across Kenya and globally.",
    keywords:
      "digital studio nairobi, web design agency kenya, about altoby, nairobi web agency, professional services digital partner",
  },
  contact: {
    title: "Book a Free Digital Audit | Altoby — Nairobi, Kenya",
    description:
      "Request a free 20-minute audit of your firm's digital presence. Get a custom roadmap for web design, SEO, Google Business Profile, and automation — from Altoby in Nairobi.",
    keywords:
      "book consultation nairobi, digital audit kenya, free website audit, web design quote nairobi, google business profile setup",
  },
  manifesto: {
    title: "Our Technical Manifesto | Altoby — Beyond WordPress",
    description:
      "Why Altoby builds with modern frameworks instead of WordPress. Our technical philosophy on performance, security, and long-term digital asset value for professional services firms.",
    keywords:
      "modern web development, astro framework agency, beyond wordpress, web performance, jamstack nairobi",
  },
  privacy: {
    title: "Privacy Policy | Altoby",
    description:
      "How Altoby Digital Studio handles, stores, and protects your personal data. Read our full privacy policy.",
    noIndex: true,
  },
  terms: {
    title: "Terms of Service | Altoby",
    description:
      "Terms and conditions governing the use of Altoby Digital Studio's services and website.",
    noIndex: true,
  },
  industries: {
    title: "Industries We Serve | Altoby — Specialist Digital Growth",
    description:
      "Altoby provides custom web design, SEO, and automation solutions tailored for high-stakes professional sectors including Legal, Finance, Healthcare, and Real Estate in Nairobi and beyond.",
    keywords:
      "law firm web design, fintech web development, healthcare digital marketing, real estate proptech kenya, professional services industries",
  },
} as const;

// ─── SERVICE KEYWORDS (for schema + future landing pages) ───

export const SERVICE_KEYWORDS = {
  webDesign: {
    primary: "Custom Website Design Nairobi",
    secondary: [
      "professional website development kenya",
      "law firm website design",
      "responsive web design nairobi",
      "mobile-first website kenya",
      "website redesign nairobi",
    ],
  },
  gbp: {
    primary: "Google Business Profile Management Nairobi",
    secondary: [
      "google maps optimization kenya",
      "local seo nairobi",
      "gbp setup kenya",
      "google business listing management",
      "local search optimization nairobi",
    ],
  },
  contentSeo: {
    primary: "SEO Content Writing Kenya",
    secondary: [
      "blog writing nairobi",
      "linkedin content strategy",
      "seo writing professional services",
      "content marketing kenya",
      "search engine optimization nairobi",
    ],
  },
  automation: {
    primary: "Business Automation Kenya",
    secondary: [
      "ai automation nairobi",
      "workflow automation kenya",
      "crm integration nairobi",
      "lead automation professional services",
      "ai-powered business tools kenya",
    ],
  },
} as const;

// ─── INDUSTRY KEYWORDS (for future landing pages) ──────

export const INDUSTRY_KEYWORDS = {
  legal: {
    primary: "Web Design for Law Firms Nairobi",
    secondary: ["lawyer website kenya", "legal services digital marketing", "law firm seo nairobi"],
  },
  finance: {
    primary: "Website for Financial Services Kenya",
    secondary: ["fintech web design nairobi", "investment firm website", "financial advisor website kenya"],
  },
  consulting: {
    primary: "Digital Marketing for Consultancies Kenya",
    secondary: ["consulting firm website nairobi", "management consultant web design", "strategy firm digital presence"],
  },
  healthcare: {
    primary: "Healthcare Website Design Nairobi",
    secondary: ["medical practice website kenya", "health tech web design", "clinic website nairobi"],
  },
  realestate: {
    primary: "Real Estate Website Design Kenya",
    secondary: ["proptech web design nairobi", "property listing website", "real estate digital marketing kenya"],
  },
} as const;

// ─── DYNAMIC PAGE SEO GENERATORS ───────────────────────

/**
 * Generates SEO metadata for dynamic service pages.
 */
export function getServicePageSEO(service: { name: string; tagline: string; description: string; slug: string }): PageSEO {
  const keywords = Object.values(SERVICE_KEYWORDS).find(k => service.name.toLowerCase().includes(k.primary.split(' ')[0].toLowerCase()));
  
  return {
    title: `${service.name} | Altoby — Digital Growth`,
    description: service.tagline + " " + service.description,
    keywords: keywords ? [keywords.primary, ...keywords.secondary].join(", ") : undefined,
  };
}

/**
 * Generates SEO metadata for dynamic industry pages.
 */
export function getIndustryPageSEO(industry: { label: string; tagline: string; fullDescription: string }): PageSEO {
  const keywords = Object.values(INDUSTRY_KEYWORDS).find(k => industry.label.toLowerCase().includes(k.primary.split(' ')[2].toLowerCase()));

  return {
    title: `${industry.label} Digital Partner | Altoby`,
    description: industry.tagline + " " + industry.fullDescription.substring(0, 120) + "...",
    keywords: keywords ? [keywords.primary, ...keywords.secondary].join(", ") : undefined,
  };
}
