# Altoby Website — Developer README

> **A Product Lab. Built in Africa. Built for the World.**
> Next.js · Sanity CMS · Tailwind CSS · Vercel

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Site Architecture & URL Structure](#3-site-architecture--url-structure)
4. [Performance Strategy](#4-performance-strategy)
5. [SEO Architecture](#5-seo-architecture)
6. [Sanity CMS Schema Design](#6-sanity-cms-schema-design)
7. [Project Structure](#7-project-structure)
8. [Environment Variables](#8-environment-variables)
9. [Getting Started](#9-getting-started)
10. [Deployment](#10-deployment)
11. [Content Management Guide](#11-content-management-guide)
12. [Global SEO Targets](#12-global-seo-targets)
13. [Analytics & Monitoring](#13-analytics--monitoring)
14. [Brand Tokens](#14-brand-tokens)
15. [Development Conventions](#15-development-conventions)

---

## 1. Project Overview

The Altoby website is the company's primary commercial asset. Its **sole purpose** is to convert a skeptical, senior decision-maker — a CIO, CEO, or Ops Director anywhere in the world — into a booked discovery call.

This is not a portfolio gallery. It is a credibility machine.

### Design Principles

- **Speed above all** — every page must hit Core Web Vitals green (LCP < 2.5s, CLS = 0, INP < 200ms). Google uses these as ranking signals.
- **Programmatic SEO** — hundreds of keyword-targeted pages generated from a small number of templates + Sanity data. Same approach BairesDev uses.
- **Global targeting** — we do not optimize for Kenya alone. We target decision-makers across Africa, Europe, the Middle East, and North America who are looking for credible African-built technical partners.
- **Static-first** — every page is pre-rendered at build time (SSG). Dynamic data is fetched client-side only when necessary. No server waiting on page load.
- **One CTA per page** — every page funnels to a single next step: book a discovery call.

---

## 2. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSG + ISR, image optimization, built-in SEO primitives |
| **Language** | TypeScript | Type-safe Sanity schema consumption, fewer runtime bugs |
| **Styling** | Tailwind CSS v3 | Tiny CSS bundle, design tokens, no unused styles shipped |
| **CMS** | Sanity v3 | Structured content, real-time preview, GROQ queries, free tier |
| **Hosting** | Vercel | Native Next.js hosting, global edge CDN, zero-config deploys |
| **Image CDN** | Sanity Image Pipeline + `next/image` | Auto WebP/AVIF, responsive sizes, lazy loading |
| **Forms / Booking** | Cal.com embed | Open-source Calendly, no vendor lock-in |
| **Analytics** | Vercel Analytics + Plausible | Privacy-friendly, no cookie banners needed |
| **Error Monitoring** | Sentry | Know when things break before clients do |
| **DNS / CDN** | Cloudflare | DDoS protection, HTTP/3, global edge caching on top of Vercel |
| **Search** | Algolia (optional, Phase 2) | For blog search once content volume grows |

### Why This Stack Matches BairesDev's Architecture

BairesDev runs Next.js + Google Cloud CDN + Cloudflare + Cloudinary. We replicate this pattern with:

- **Next.js SSG** = their static page speed
- **Sanity's image CDN** = their Cloudinary image pipeline
- **Vercel edge** = their Google Cloud CDN
- **Cloudflare on top** = same dual-CDN setup they use

The result: identical performance architecture at a fraction of the infrastructure cost.

---

## 3. Site Architecture & URL Structure

Every URL is designed as a keyword target. Routes marked `[dynamic]` are generated programmatically from Sanity content — one template, many pages.

```
/                                     → Homepage
/about                                → Company story, team, operating model
/services                             → Services hub (overview of all 4)
/services/legacy-modernization        → Service deep-dive
/services/software-development        → Service deep-dive
/services/data-ai                     → Service deep-dive
/services/system-integration          → Service deep-dive

/industries                           → Industries hub
/industries/[slug]                    → [DYNAMIC] e.g. /industries/financial-services
                                         /industries/healthcare
                                         /industries/manufacturing
                                         /industries/retail
                                         /industries/education
                                         /industries/government

/technologies                         → Technologies hub
/technologies/[slug]                  → [DYNAMIC] e.g. /technologies/nextjs
                                         /technologies/postgresql
                                         /technologies/python
                                         /technologies/aws

/work                                 → Case studies hub
/work/[slug]                          → [DYNAMIC] individual case study

/blog                                 → Blog hub (paginated)
/blog/[slug]                          → [DYNAMIC] individual article
/blog/category/[category]             → [DYNAMIC] filtered by topic

/retainers                            → Retainer tiers (Maintain / Evolve / Partner)
/contact                              → Contact + Cal.com booking embed

/sitemap.xml                          → Auto-generated (next-sitemap)
/robots.txt                           → Auto-generated
```

### Page Count Projection

| Section | Pages |
|---|---|
| Core static pages | ~10 |
| Industry pages | 6–15 |
| Technology pages | 15–30 |
| Service sub-pages | 4 |
| Case studies | 3–20 (grows over time) |
| Blog articles | Grows monthly |
| **Total at launch** | **~50–80 indexed pages** |

This is how you compete with larger agencies on search — not by writing 80 pages manually, but by generating them from structured data.

---

## 4. Performance Strategy

### Static Generation (SSG) — Default for Everything

Every page uses `generateStaticParams` to pre-render at build time. No visitor ever waits for a server.

```ts
// app/industries/[slug]/page.tsx
export async function generateStaticParams() {
  const industries = await sanityClient.fetch(`*[_type == "industry"]{ slug }`)
  return industries.map((i: { slug: { current: string } }) => ({
    slug: i.slug.current,
  }))
}
```

### Incremental Static Regeneration (ISR)

Blog posts and case studies use ISR with a 60-second revalidation window. New Sanity content goes live within 1 minute without a full rebuild.

```ts
export const revalidate = 60
```

For marketing pages (services, industries), use `revalidate = 3600` (1 hour) — these change rarely.

### Image Optimization

All images go through `next/image`. Sanity's image pipeline handles resizing and format conversion.

```tsx
import { urlFor } from '@/lib/sanity'
import Image from 'next/image'

<Image
  src={urlFor(image).width(1200).format('webp').url()}
  alt={image.alt}
  width={1200}
  height={630}
  priority={isHero}   // priority=true only for above-fold images
  placeholder="blur"
  blurDataURL={image.lqip}  // Sanity provides LQIP (Low Quality Image Placeholder)
/>
```

### Font Loading

Use `next/font` to self-host fonts — no external font requests, no FOUT (Flash of Unstyled Text).

```ts
// app/layout.tsx
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
```

### Critical CSS

Tailwind's JIT compiler only ships CSS classes that are actually used. Final CSS bundle is typically under 15KB.

### Resource Hints

Add to `<head>` in `layout.tsx`:

```html
<link rel="preconnect" href="https://cdn.sanity.io" />
<link rel="dns-prefetch" href="https://cdn.sanity.io" />
```

### Core Web Vitals Targets

| Metric | Target | What Achieves It |
|---|---|---|
| LCP | < 1.5s | SSG + priority image + CDN |
| CLS | 0 | Explicit image dimensions always set |
| INP | < 100ms | Minimal client-side JS, no heavy animations |
| TTFB | < 200ms | Vercel edge + Cloudflare |
| FCP | < 1.2s | Self-hosted fonts + SSG |

---

## 5. SEO Architecture

### Metadata — Dynamic Per Page

Every page generates unique, keyword-rich metadata using Next.js `generateMetadata`.

```ts
// app/industries/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = await getIndustry(params.slug)
  return {
    title: `${industry.name} Software Development | Altoby`,
    description: industry.metaDescription,
    alternates: {
      canonical: `https://altoby.com/industries/${params.slug}`,
    },
    openGraph: {
      title: `${industry.name} Software Development | Altoby`,
      description: industry.metaDescription,
      url: `https://altoby.com/industries/${params.slug}`,
      siteName: 'Altoby',
      images: [{ url: industry.ogImage, width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${industry.name} Software Development | Altoby`,
      description: industry.metaDescription,
      images: [industry.ogImage],
    },
  }
}
```

### Structured Data (JSON-LD)

Add schema markup to boost rich results in Google. Use a `JsonLd` component:

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

**Schema types to implement:**

| Page | Schema Type |
|---|---|
| Homepage | `Organization`, `WebSite`, `SiteNavigationElement` |
| Service pages | `Service`, `FAQPage` |
| Industry pages | `Service` with industry context |
| Case studies | `Article` or `CaseStudy` |
| Blog posts | `BlogPosting`, `BreadcrumbList` |
| Contact | `ContactPage`, `LocalBusiness` |

### Sitemap & Robots

Use `next-sitemap` for auto-generation:

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://altoby.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/studio/*'],  // exclude Sanity studio from sitemap
}
```

### Internal Linking Rules

This is how you pass SEO authority throughout the site — the same way BairesDev does:

- Every service page links to: related industries, relevant blog posts, case studies
- Every industry page links to: relevant services, case studies in that industry
- Every blog post links to: 2–3 related service or industry pages
- Every case study links to: the service and industry it demonstrates
- Use descriptive anchor text, never "click here" or "learn more" alone

---

## 6. Sanity CMS Schema Design

### Schema Types

#### `service.ts`
```ts
{
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'tagline', type: 'string' },          // one-line for cards
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'string' },
    { name: 'heroHeadline', type: 'string' },
    { name: 'heroSubtext', type: 'text' },
    { name: 'problemStatement', type: 'text' },
    { name: 'deliverables', type: 'array', of: [{ type: 'string' }] },
    { name: 'processSteps', type: 'array', of: [{ type: 'processStep' }] },
    { name: 'relatedIndustries', type: 'array', of: [{ type: 'reference', to: [{ type: 'industry' }] }] },
    { name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] },
    { name: 'faqs', type: 'array', of: [{ type: 'faq' }] },
    { name: 'ogImage', type: 'image' },
  ]
}
```

#### `industry.ts`
```ts
{
  name: 'industry',
  title: 'Industry',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'tagline', type: 'string' },
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'string' },
    { name: 'heroHeadline', type: 'string' },
    { name: 'painPoints', type: 'array', of: [{ type: 'string' }] },
    { name: 'ourApproach', type: 'blockContent' },
    { name: 'keyServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
    { name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] },
    { name: 'stats', type: 'array', of: [{ type: 'stat' }] },
    { name: 'ogImage', type: 'image' },
  ]
}
```

#### `caseStudy.ts`
```ts
{
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'clientName', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'clientLogo', type: 'image' },
    { name: 'industry', type: 'reference', to: [{ type: 'industry' }] },
    { name: 'service', type: 'reference', to: [{ type: 'service' }] },
    { name: 'challenge', type: 'text' },
    { name: 'solution', type: 'blockContent' },
    { name: 'results', type: 'array', of: [{ type: 'result' }] },  // { metric, value, description }
    { name: 'testimonial', type: 'object', fields: [
      { name: 'quote', type: 'text' },
      { name: 'author', type: 'string' },
      { name: 'role', type: 'string' },
    ]},
    { name: 'heroImage', type: 'image' },
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'string' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'featured', type: 'boolean' },
  ]
}
```

#### `post.ts` (Blog)
```ts
{
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'string' },
    { name: 'excerpt', type: 'text' },
    { name: 'mainImage', type: 'image', options: { hotspot: true } },
    { name: 'body', type: 'blockContent' },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] },
    { name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'featured', type: 'boolean' },
    { name: 'readingTime', type: 'number' },  // computed or manually set in minutes
  ]
}
```

#### `technology.ts`
```ts
{
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'logo', type: 'image' },
    { name: 'category', type: 'string' },  // Frontend, Backend, Database, Cloud, Data, AI
    { name: 'tagline', type: 'string' },
    { name: 'metaTitle', type: 'string' },
    { name: 'metaDescription', type: 'string' },
    { name: 'description', type: 'blockContent' },
    { name: 'relatedServices', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] },
    { name: 'relatedCaseStudies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] },
  ]
}
```

---

## 7. Project Structure

```
altoby-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — fonts, metadata, analytics
│   ├── page.tsx                  # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx              # Services hub
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic service page
│   ├── industries/
│   │   ├── page.tsx              # Industries hub
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic industry page
│   ├── technologies/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── work/
│   │   ├── page.tsx              # Case studies hub
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── blog/
│   │   ├── page.tsx              # Blog hub
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── category/
│   │       └── [category]/
│   │           └── page.tsx
│   ├── retainers/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── studio/
│       └── [[...index]]/
│           └── page.tsx          # Sanity Studio (embedded)
│
├── components/
│   ├── ui/                       # Primitives: Button, Card, Badge, etc.
│   ├── layout/                   # Header, Footer, Nav
│   ├── sections/                 # Page sections: Hero, Services, CTA, etc.
│   ├── blog/                     # BlogCard, BlogGrid, AuthorCard
│   ├── case-studies/             # CaseStudyCard, ResultMetric
│   ├── seo/                      # JsonLd, BreadcrumbNav
│   └── shared/                   # TestimonialCard, StatBlock, FaqAccordion
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client config
│   │   ├── image.ts              # urlFor helper
│   │   └── queries/              # GROQ query functions
│   │       ├── services.ts
│   │       ├── industries.ts
│   │       ├── caseStudies.ts
│   │       ├── posts.ts
│   │       └── technologies.ts
│   └── utils.ts
│
├── sanity/
│   ├── schemaTypes/              # All Sanity schema definitions
│   │   ├── service.ts
│   │   ├── industry.ts
│   │   ├── caseStudy.ts
│   │   ├── post.ts
│   │   ├── technology.ts
│   │   ├── author.ts
│   │   └── index.ts
│   ├── structure.ts              # Sanity desk structure
│   └── sanity.config.ts
│
├── public/
│   └── fonts/                    # Self-hosted fallback fonts
│
├── styles/
│   └── globals.css               # Tailwind base + custom CSS variables
│
├── next.config.ts
├── tailwind.config.ts
├── next-sitemap.config.js
├── sentry.client.config.ts
├── sentry.server.config.ts
└── .env.local
```

---

## 8. Environment Variables

```bash
# .env.local

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your_read_token         # for draft previews
SANITY_REVALIDATE_SECRET=your_webhook_secret  # for on-demand ISR

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=altoby.com

# Cal.com
NEXT_PUBLIC_CAL_USERNAME=altoby              # your Cal.com username

# Site
NEXT_PUBLIC_SITE_URL=https://altoby.com
```

---

## 9. Getting Started

### Prerequisites

- Node.js 20+
- pnpm (preferred) or npm

### Installation

```bash
# Clone the repo
git clone https://github.com/altoby/altoby-web.git
cd altoby-web

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in your Sanity project ID and other keys

# Run development server
pnpm dev
```

The app runs at `http://localhost:3000`.
The Sanity Studio runs at `http://localhost:3000/studio`.

### Sanity Setup

```bash
# Initialize Sanity (first time only)
pnpm sanity init

# Or open studio directly
pnpm sanity dev
```

Log in to Sanity at `https://sanity.io` and create a new project. Copy the project ID into `.env.local`.

### First Content

Before the site renders correctly, seed the minimum required content in Sanity:

1. Create at least one `Service` document
2. Create at least one `Industry` document
3. Create at least one `Author` document
4. Create at least one `Post` (blog article)

---

## 10. Deployment

### Vercel (Production)

1. Push to GitHub
2. Import the repo in Vercel dashboard
3. Set all environment variables from Section 8
4. Deploy. Vercel auto-detects Next.js — no config needed.

### Cloudflare (DNS + CDN Layer)

1. Add `altoby.com` to Cloudflare
2. Point nameservers to Cloudflare
3. In Cloudflare, proxy the `A` record pointing to Vercel
4. Enable **HTTP/3**, **Brotli compression**, and **Auto Minify**
5. Set Cache Rules: cache static assets for 1 year, HTML for 1 hour

This gives you the double-CDN setup BairesDev uses (their Google Cloud CDN + Cloudflare).

### Sanity Webhook → ISR Revalidation

Connect Sanity to trigger page revalidation on content publish:

```
Webhook URL: https://altoby.com/api/revalidate
Secret: your SANITY_REVALIDATE_SECRET
Trigger: on document publish
```

This means when you publish a blog post in Sanity, the live site updates within seconds — no rebuild needed.

### Custom Domain Checklist

- [ ] `altoby.com` → primary (www redirects to apex)
- [ ] SSL via Cloudflare (Universal SSL, auto-renews)
- [ ] HSTS header enabled
- [ ] HTTP/3 enabled in Cloudflare
- [ ] Verify with Google Search Console
- [ ] Submit sitemap to Google Search Console: `https://altoby.com/sitemap.xml`

---

## 11. Content Management Guide

### Who Manages Content

All content is managed through the Sanity Studio at `https://altoby.com/studio`. No code changes needed to add or edit pages.

### Adding a New Industry Page

1. Open Studio → Industries → New Document
2. Fill in: name, slug, tagline, meta title, meta description, pain points, approach, linked services
3. Publish
4. The page is live at `/industries/[slug]` within 60 seconds

### Adding a New Blog Post

1. Open Studio → Blog Posts → New Post
2. Write content using the rich text editor (supports headings, lists, images, code blocks)
3. Set: meta title, meta description, category, linked services
4. Set `publishedAt` date and publish
5. The post appears in the blog hub and its category filtered page automatically

### Adding a Case Study

1. Open Studio → Case Studies → New
2. Fill in: client name, industry (link), service (link), challenge, solution, results metrics, testimonial
3. Upload hero image and client logo
4. Publish → automatically appears on `/work` and on the linked industry and service pages

### Image Guidelines

| Context | Dimensions | Format |
|---|---|---|
| OG / Social share | 1200 × 630px | JPG or PNG |
| Hero images | 1920 × 900px | JPG (Sanity converts to WebP) |
| Blog featured | 1200 × 675px | JPG |
| Client logos | Transparent | SVG preferred |
| Team photos | Square, min 800×800px | JPG |

---

## 12. Global SEO Targets

We do not optimize for Kenya only. Target keywords span geographies and buyer types.

### Tier 1 — Service Keywords (Global + Regional)

```
legacy system modernization [Africa / Nigeria / Ghana / UAE / UK]
custom software development company Africa
custom ERP development company
enterprise software integration services
data modernization services
AI integration for enterprise
SaaS development company Africa
software development outsourcing Africa
```

### Tier 2 — Industry × Service Keywords

```
hospital management software Africa
SACCO core banking software Kenya
logistics software development East Africa
fintech software development Nigeria
school management system Africa
manufacturing ERP Africa
microfinance software system
retail e-commerce platform Africa
```

### Tier 3 — Problem-Aware Keywords (Highest Conversion Intent)

```
replace legacy software with modern system
migrate from Excel to database
connect ERP and CRM systems
automate business processes Africa
digital transformation partner Africa
custom software vs off-the-shelf Africa
African software development company for US clients
nearshore software development Africa Europe
```

### Tier 4 — Blog Long-Tail (Traffic + Authority)

Match every blog article to one primary keyword from the brand strategy. See Section 07 of the brand document for the starter content calendar.

### Geographic Expansion Order

1. **East Africa** — Kenya, Uganda, Tanzania, Rwanda (launch)
2. **West Africa** — Nigeria, Ghana (Month 3+)
3. **Southern Africa** — South Africa (Month 6+)
4. **MENA** — UAE, Saudi Arabia (Month 9+, high-value market for African tech partners)
5. **Europe / North America** — UK, US (Year 2 — once domain authority is established)

For geographic targeting, do not create geo-specific pages initially. Use `hreflang` tags only if you create language variants. For now, one set of English pages targeting global terms + African regional qualifiers is sufficient.

---

## 13. Analytics & Monitoring

### Vercel Analytics

Enabled by default in the Vercel dashboard. Tracks Core Web Vitals per page automatically. Check this weekly.

### Plausible Analytics

Add the script in `app/layout.tsx`:

```tsx
<Script
  defer
  data-domain="altoby.com"
  src="https://plausible.io/js/script.js"
/>
```

No cookie banner required. GDPR compliant. Set up goals for:
- `/contact` page visits
- Cal.com booking clicks
- Form submissions

### Google Search Console

- Verify via Vercel's DNS or HTML tag method
- Submit `https://altoby.com/sitemap.xml`
- Monitor: average position per page, impressions, CTR
- Check weekly for crawl errors, manual actions

### Sentry

Initialized in `sentry.client.config.ts` and `sentry.server.config.ts`. Monitors:
- JavaScript errors in production
- Server-side errors from Sanity GROQ queries
- API route failures

Set up Sentry alerts to notify on Slack or email for any new error.

---

## 14. Brand Tokens

Tailwind config (`tailwind.config.ts`):

```ts
theme: {
  extend: {
    colors: {
      navy: {
        DEFAULT: '#1A1A2E',
        light: '#22223d',
      },
      gold: {
        DEFAULT: '#C9A84C',
        light: '#d4b86a',
        dark: '#a8873a',
      },
      steel: '#2D3142',
      offwhite: '#F4F5F7',
    },
    fontFamily: {
      display: ['var(--font-display)', 'sans-serif'],  // Space Grotesk
      body: ['var(--font-body)', 'sans-serif'],         // Inter
    },
    fontSize: {
      // Design system scale — do not deviate
      'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
    },
  }
}
```

### Tone Reminders (for copywriters and content editors)

- **Outcomes, not features** — "your systems will finally talk to each other", not "we build APIs"
- **Confident, never hedgy** — "we deliver" not "we try to deliver"
- **No corporate speak** — no "leverage", "synergize", "holistic"
- **Specificity wins** — name sectors, name tools, name results with numbers
- **African context, global standard** — we are proud of where we're built. We don't hide it.

---

## 15. Development Conventions

### Branching

```
main          → production (auto-deploys to altoby.com)
staging       → preview deployments (auto-deploys to staging.altoby.com)
feature/*     → feature branches, PR into staging
```

### Commit Messages

```
feat: add industry page template
fix: correct OG image dimensions on case studies
content: add fintech industry page
seo: add FAQ schema to service pages
perf: lazy load below-fold images on homepage
```

### Performance Checklist (Before Every Merge)

- [ ] No images without explicit `width` and `height` (causes CLS)
- [ ] Hero image has `priority={true}` — all others do not
- [ ] No `console.log` in production code
- [ ] New pages have unique `metaTitle` and `metaDescription` in Sanity
- [ ] New dynamic routes added to `next-sitemap.config.js` if not auto-discovered
- [ ] Sentry not throwing errors on the route

### Adding a New Dynamic Section (e.g., "Locations")

1. Add the Sanity schema type in `sanity/schemaTypes/`
2. Export from `sanity/schemaTypes/index.ts`
3. Write the GROQ query in `lib/sanity/queries/`
4. Create `app/locations/page.tsx` (hub) and `app/locations/[slug]/page.tsx` (detail)
5. Add `generateStaticParams` to the detail page
6. Add `generateMetadata` to both pages
7. Add JSON-LD schema markup
8. Add links from relevant service and industry pages (internal linking)
9. Rebuild and verify in Search Console

---

*Altoby — Build it right. Build it to last. Build the brand.*

*README version 1.0 — March 2025*
*Maintained by the Altoby engineering team*
