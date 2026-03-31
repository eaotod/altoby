// ─────────────────────────────────────────────
// ALTOBY — SINGLE SOURCE OF TRUTH
// Update once here → reflects across Marquee,
// Contact Form, Footer, Actions, and all pages.
// ─────────────────────────────────────────────

export interface Benefit {
  title: string;
  description: string;
}

export interface Industry {
  /** Internal value used in forms and CRM */
  value: string;
  /** Display label for the UI */
  label: string;
  /** kebab-case slug for the URL */
  slug: string;
  /** SEO-focused tagline */
  tagline: string;
  /** Detailed service-market fit description */
  fullDescription: string;
  /** Why Altoby is the partner for this industry */
  keyBenefits: Benefit[];
  /** Whether to highlight in the marquee */
  highlight?: boolean;
}

export interface Service {
  tier: number;
  name: string;
  slug: string;
  emoji: string;
  description: string;
  tagline: string;
  fullDescription: string;
  keyBenefits: Benefit[];
  tags: string[];
  /** SVG path data for the service icon */
  icon?: string;
}

export interface BudgetRange {
  value: number;
  label: string;
}

// ─── INDUSTRIES ────────────────────────────────
// These feed: Marquee, Contact Form dropdown, Actions scoring, Footer, and Dynamic Pages
export const INDUSTRIES: Industry[] = [
  {
    value: "Legal Services",
    label: "Legal Services",
    slug: "legal-services",
    tagline: "Digital Authority for Modern Law Firms.",
    fullDescription: "In an era where trust is built online before the first consultation, your firm's digital presence is your most important associate. We build high-fidelity platforms that reflect the prestige and professionalism of your practice.",
    keyBenefits: [
      { title: "Client Trust", description: "Convert high-intent searches into billable consultations with a credible presence." },
      { title: "Compliance Ready", description: "Secure, performant, and built to professional standards." },
      { title: "Local Dominance", description: "Rank at the top of local searches when clients need representation." }
    ],
    highlight: true
  },
  {
    value: "Financial Services & FinTech",
    label: "Financial Services & FinTech",
    slug: "fintech-financial-services",
    tagline: "Precision Engineering for the Financial Sector.",
    fullDescription: "Financial services require more than just a website; they require a secure, high-speed interface that communicates stability and technical depth. We build the digital infrastructure that powers modern finance.",
    keyBenefits: [
      { title: "Security First", description: "Zero-dependency architectures that prioritize data integrity." },
      { title: "Performance", description: "Sub-second load times for critical financial information." },
      { title: "Brand Authority", description: "Stand out in a crowded market with custom-built digital assets." }
    ],
    highlight: true
  },
  {
    value: "Management Consulting",
    label: "Management Consulting",
    slug: "management-consulting",
    tagline: "Expertise, Visualized.",
    fullDescription: "Your value as a consultant lies in your expertise. We create the distribution engines that turn your whitepapers and insights into a competitive advantage.",
    keyBenefits: [
      { title: "Authority Building", description: "Professional content hubs that showcase your thought leadership." },
      { title: "Lead Inbound", description: "Automated systems that qualify prospects while you focus on delivery." },
      { title: "Sleek Design", description: "Minimalist, high-contrast interfaces that command respect." }
    ]
  },
  {
    value: "Healthcare & BioTech",
    label: "Healthcare & BioTech",
    slug: "healthcare-biotech",
    tagline: "Bridging the Gap Between Care and Technology.",
    fullDescription: "Healthcare providers and biotech firms need a digital presence that is as precise as their science. We build the platforms that connect patients and partners to your innovation.",
    keyBenefits: [
       { title: "Patient Confidence", description: "Build trust with a professional, accessible digital presence." },
       { title: "Technical Depth", description: "Showcase complex medical or scientific data with clarity." },
       { title: "Scalability", description: "Ready for growth, from local clinics to international research labs." }
    ],
    highlight: true
  },
  {
    value: "Real Estate & PropTech",
    label: "Real Estate & PropTech",
    slug: "real-estate-proptech",
    tagline: "High-Tier Digital Presence for the Property Market.",
    fullDescription: "Real estate is a visual and data-driven business. We create the high-performance platforms that showcase your properties and optimize your lead funnel.",
    keyBenefits: [
       { title: "Visual Excellence", description: "Stunning, fast-loading property displays and interactive elements." },
       { title: "Local SEO", description: "Be the first firm found when clients search for property in your region." },
       { title: "CRM Integration", description: "Automatically route leads from your site into your sales pipeline." }
    ],
    highlight: true
  },
  { value: "AI & Automation Solutions",     label: "AI & Automation Solutions",     slug: "ai-automation", tagline: "The Future of Efficiency.", fullDescription: "Custom AI tools.", keyBenefits: [], highlight: true },
  { value: "Engineering & Construction",    label: "Engineering & Construction",    slug: "engineering-construction", tagline: "Built for Success.", fullDescription: "Digital foundation.", keyBenefits: [] },
  { value: "Sustainability & ESG",          label: "Sustainability & ESG",          slug: "sustainability-esg", tagline: "Green Growth.", fullDescription: "Impact-driven design.", keyBenefits: [] },
  { value: "Cybersecurity & Data Privacy",  label: "Cybersecurity & Data Privacy",  slug: "cybersecurity-privacy", tagline: "Security First.", fullDescription: "Privacy by design.", keyBenefits: [] },
  { value: "IT & Software",                 label: "IT & Software",                 slug: "it-software", tagline: "Code-Level Excellence.", fullDescription: "High-tier engineering.", keyBenefits: [], highlight: true },
  { value: "Other Professional Services",   label: "Other Professional Services",   slug: "professional-services", tagline: "Experts at Work.", fullDescription: "Custom growth systems.", keyBenefits: [] },
];

// Sectors that receive a lead-score boost in the scoring engine
export const HIGH_VALUE_SECTORS = [
  "Legal Services",
  "Financial Services & FinTech",
  "Management Consulting",
  "Healthcare & BioTech",
  "Engineering & Construction",
];

// ─── SERVICES ──────────────────────────────────
// Core service pillars shown on the homepage and dynamic pages
export const SERVICES: Service[] = [
  {
    tier: 1,
    name: "Web Design & Development",
    slug: "web-design-development",
    emoji: "🌐",
    tagline: "Websites Built for Conversion, Not Just Decoration.",
    description: "Custom-built, fast, and mobile-first websites that represent your firm the way it deserves.",
    fullDescription: "We don't use generic templates or bloated WordPress plugins. Every line of code we write is optimized for performance, security, and conversion. Your website should be your hardest-working employee.",
    keyBenefits: [
      { title: "Performance Debt Zero", description: "Lightweight, sub-second load times that users and Google love." },
      { title: "Custom Built", description: "Tailored to your specific brand, no two Altoby sites look the same." },
      { title: "Search Ready", description: "Semantic HTML that helps crawlers find your expertise." }
    ],
    tags: ["Custom Brand Design", "High-Speed Performance", "Mobile-First Experience", "Scalable Architecture"],
  },
  {
    tier: 2,
    name: "Google Business Profile",
    slug: "google-business-profile",
    emoji: "🗺️",
    tagline: "Own Your Local Search Map.",
    description: "Full GBP setup, optimisation, and ongoing management. Get your firm showing in local searches.",
    fullDescription: "Nearly 50% of professional services searches end on a Google Business Profile. If yours is unverified or unoptimized, you are invisible to half your market. We ensure you own the 'local pack'.",
    keyBenefits: [
       { title: "Local Presence", description: "Show up in Google Maps and local search results consistently." },
       { title: "Review Strategy", description: "Build digital trust with a managed strategy for client reviews." },
       { title: "Direct Leads", description: "Optimize for 'Call' and 'Direction' clicks from search results." }
    ],
    tags: ["Search & Maps Optimization", "Local SEO Strategy", "Reputation & Review Management", "Monthly Performance Updates"],
  },
  {
    tier: 3,
    name: "Content & SEO Writing",
    slug: "content-seo-writing",
    emoji: "✍️",
    tagline: "Distribution for Your Expertise.",
    description: "Blog posts, LinkedIn articles, and service page copy written to rank and convert.",
    fullDescription: "Authority is built through consistency. We take your firm's professional insights and translate them into SEO-ready content that builds trust with prospects while you're offline.",
    keyBenefits: [
       { title: "Keyword Authority", description: "Target the exact terms your high-value clients are searching for." },
       { title: "LinkedIn Mastery", description: "Expand your professional reach where your clients live." },
       { title: "SEO Value", description: "Evergreen content that brings leads years after it's published." }
    ],
    tags: ["Expert Article Writing", "LinkedIn Authority Building", "Search Engine Optimization", "Content Lifecycle Management"],
  },
  {
    tier: 4,
    name: "Automation & AI Tooling",
    slug: "automation-ai-tooling",
    emoji: "⚙️",
    tagline: "Workflow Excellence by Default.",
    description: "Custom automation workflows and AI-powered tools that eliminate repetitive tasks.",
    fullDescription: "Your firm is losing billable hours to administrative noise. We build the custom middleware and AI integrations that handle the repetitive tasks, allowing you to focus on high-tier delivery.",
    keyBenefits: [
       { title: "Lead Routing", description: "Instant notification and CRM entry the moment a lead clicks." },
       { title: "AI Inbound", description: "Automatically classify and route inquiries based on intent." },
       { title: "Cost Efficiency", description: "Reduce overhead by automating repetitive follow-up tasks." }
    ],
    tags: ["Lead Capture Automation", "Workflow Optimization", "AI-Driven Client Inbound", "CRM & Tool Integration"],
  },
];


// ─── CRITICAL GAPS (Form Checkboxes) ───────────
// Aligned with homepage ServicesSection and ProblemSection
export const CRITICAL_GAPS = [
  "Web Design & Development",
  "Google Business Profile",
  "Content & SEO Writing",
  "Automation & AI Tooling",
  "Brand Identity & Redesign",
  "E-Commerce Setup",
];

// ─── BUDGET RANGES (KES — Kenyan Market) ───────
// Based on 2025-2026 Nairobi digital agency market research
export const BUDGET_RANGES: BudgetRange[] = [
  { value: 15000,   label: "KES 10,000 — 50,000 (Consultation / Quick Fix)" },
  { value: 75000,   label: "KES 50,000 — 150,000 (Standard Growth Package)" },
  { value: 250000,  label: "KES 150,000 — 500,000 (Full Digital Transformation)" },
  { value: 500000,  label: "KES 500,000+ (Enterprise / Custom Platform)" },
];

// ─── CLIENT LOCATION ───────────────────────────
// Helps classify leads as local (Kenya) or international
export const CLIENT_LOCATIONS = [
  { value: "kenya",  label: "Based in Kenya" },
  { value: "abroad", label: "Based Abroad (Diaspora / International)" },
] as const;

// ─── CONTACT INFO ──────────────────────────────
export const CONTACT = {
  phone: "+254 717 342 473",
  email: "hello@altoby.com",
  location: "ABC Place, Waiyaki Way, Nairobi",
  whatsappUrl: "https://wa.me/254717342473",
  crmUrl: "https://crm.altoby.com",
  notificationEmail: 'imma.allan@gmail.com',
} as const;

