// ─────────────────────────────────────────────
// ALTOBY — SINGLE SOURCE OF TRUTH
// Update once here → reflects across Marquee,
// Contact Form, Footer, Actions, and all pages.
// ─────────────────────────────────────────────

export interface Industry {
  /** Internal value used in forms and CRM */
  value: string;
  /** Display label for the UI */
  label: string;
  /** Whether to highlight in the marquee */
  highlight?: boolean;
}

export interface Service {
  tier: number;
  name: string;
  emoji: string;
  description: string;
  tags: string[];
  /** SVG path data for the service icon */
  icon?: string;
}

export interface BudgetRange {
  value: number;
  label: string;
}

// ─── INDUSTRIES ────────────────────────────────
// These feed: Marquee, Contact Form dropdown, Actions scoring, Footer
export const INDUSTRIES: Industry[] = [
  { value: "Legal Services",                label: "Legal Services" },
  { value: "Financial Services & FinTech",  label: "Financial Services & FinTech",  highlight: true },
  { value: "Management Consulting",         label: "Management Consulting" },
  { value: "AI & Automation Solutions",     label: "AI & Automation Solutions",     highlight: true },
  { value: "Engineering & Construction",    label: "Engineering & Construction" },
  { value: "Healthcare & BioTech",          label: "Healthcare & BioTech",          highlight: true },
  { value: "Sustainability & ESG",          label: "Sustainability & ESG" },
  { value: "Real Estate & PropTech",        label: "Real Estate & PropTech",        highlight: true },
  { value: "Cybersecurity & Data Privacy",  label: "Cybersecurity & Data Privacy" },
  { value: "Education & EdTech",            label: "Education & EdTech",            highlight: true },
  { value: "Wellness & Lifestyle",          label: "Wellness & Lifestyle" },
  { value: "IT & Software",                 label: "IT & Software",                 highlight: true },
  { value: "Architecture & Design",         label: "Architecture & Design" },
  { value: "Agriculture & Agritech",        label: "Agriculture & Agritech",        highlight: true },
  { value: "Creative & Digital Agencies",   label: "Creative & Digital Agencies" },
  { value: "Other Professional Services",   label: "Other Professional Services" },
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
// Core service pillars shown on the homepage
export const SERVICES: Service[] = [
  {
    tier: 1,
    name: "Web Design & Development",
    emoji: "🌐",
    description:
      "Custom-built, fast, and mobile-first websites that represent your firm the way it deserves — no generic templates, no bloated WordPress plugins. From redesigns to new builds.",
    tags: ["Custom Brand Design", "High-Speed Performance", "Mobile-First Experience", "Scalable Architecture"],
  },
  {
    tier: 2,
    name: "Google Business Profile",
    emoji: "🗺️",
    description:
      "Full GBP setup, optimisation, and ongoing management. Get your firm showing in local searches, Google Maps, and the sidebar when potential clients search your services.",
    tags: ["Search & Maps Optimization", "Local SEO Strategy", "Reputation & Review Management", "Monthly Performance Updates"],
  },
  {
    tier: 3,
    name: "Content & SEO Writing",
    emoji: "✍️",
    description:
      "Blog posts, LinkedIn articles, and service page copy written to rank and convert. Consistent content builds authority — especially for firms targeting diaspora or niche clients.",
    tags: ["Expert Article Writing", "LinkedIn Authority Building", "Search Engine Optimization", "Content Lifecycle Management"],
  },
  {
    tier: 4,
    name: "Automation & AI Tooling",
    emoji: "⚙️",
    description:
      "Custom automation workflows and AI-powered tools that eliminate repetitive tasks — lead follow-up, form routing, report generation, and more. Built to your exact process.",
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
  location: "Nairobi, Kenya / Global",
  whatsappUrl: "https://wa.me/254717342473",
  crmUrl: "https://crm.altoby.com",
  notificationEmail: 'imma.allan@gmail.com',
} as const;

