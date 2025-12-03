Entrestate OS - Comprehensive README

Overview

Entrestate OS is an AI-powered, all-in-one ecosystem for real estate professionals. It allows users to rapidly build fully branded, SEO-ready websites, landing pages, and single property/project pages, integrated with lead capture, Google Ads automation, chat assistants, and multi-source listing synchronization.

The platform uses Gemini AI micro-agents to dynamically suggest, generate, and optimize content, block layouts, and lead forms while maintaining brand consistency.

Core Features

1. Website & Landing Page Builder

Prebuilt 300 modular content blocks (hero, gallery, listings, lead forms, testimonials, maps, CTA, FAQ).

3750 preloaded projects for instant listing population.

Multiple site types: Roadshow, Developer Focus, Developer + Partner Launch, Full Company, Freelancer, Full Map, Ads Quick Launch.

Drag-and-drop block selection with AI-assisted next block suggestions.

Dynamic branding: colors, fonts, logos applied across all blocks.

Expandable pages: add new pages anytime, sitemap auto-updates.

AI fills placeholders (%PROJECT_NAME%, %CITY%, %PRICE%, %DEVELOPER%, %FEATURES%).

2. Lead Forms

Highly customizable lead forms:

Single project inquiry

Single property inquiry

Developer portfolio

Launch / Event registration

Newsletter / Contact forms

AI-enabled prefill and follow-up automation via WhatsApp, email, or chat.

Lead scoring to prioritize hot leads.

3. Listing Integration

Supports Bayut, PropertyFinder, Dubizzle, and manual uploads.

Single listing, multi-listing grids, developer portfolio pages.

AI enrichment: auto-fill missing data, deduplicate, rank by conversion potential.

Maps with interactive pins and filters.

4. Galleries & Media Blocks

Image grids, carousels, masonry layouts.

Video embeds and 360 virtual tours.

AI-generated captions optimized for SEO.

Styling automatically matches brand kit.

5. AI-Powered Automation

Template Orchestrator: Suggests optimal block sequences.

Content Designer: Generates copy, meta tags, SEO descriptions.

Listing Normalizer: Enriches listing data.

Page Renderer: Generates fully branded HTML/Tailwind pages.

Ad Specialist: Generates Google Ads campaigns from page content.

Chat Assistant Builder: AI-powered chat with vector embeddings.

SEO Engineer: Auto-generates meta, OG, JSON-LD.

Analytics Tracker: Tracks page visits, lead submissions, and ad performance.

6. Google Ads Integration

One-click campaign generation from any page.

Headlines, descriptions, keywords, creatives automatically generated.

AI optimizes ad copy for conversion.

7. Cloud & Firebase Setup

Firestore: Core data storage for users, sites, pages, blocks, projects, jobs, ads, chats.

Cloud Functions / Cloud Run: AI worker execution for block rendering, listing sync, ads, chat indexing, and SEO.

Storage: Images, videos, project brochures.

Hosting: Serve static and dynamic pages with automatic SEO sitemap generation.

Job queue system ensures step-by-step AI workflow execution and error tracking.

Firebase Collections Structure

/users/{uid}: Profile, brand kit, subscription, roles.

/projects/{projectId}: Preloaded projects with enriched property data.

/blocks/{blockId}: 300 modular blocks with styles, tokens, adsReady, seoReady.

/templates/{templateId}: Predefined site structures per site type.

/sites/{siteId}: User-created sites, status, templates, pages.

/sites/{siteId}/pages/{pageId}: Pages with ordered blocks, lead forms, SEO.

/jobs/{uid}/{jobId}: AI job queue for block rendering, ads, SEO, chat indexing.

/ads/{siteId}/{adId}: Google Ads campaigns linked to pages.

/chats/{siteId}/{sessionId}: AI chat sessions with context and embeddings.

Site Types and Sitemaps

Roadshow Landing Page

/hero, /project-overview, /gallery, /map, /lead-form, /testimonials, /faq, /contact

Developer Focus Landing Page

/hero, /projects (with /project-1, /project-2), /team, /blog, /lead-form

Developer + Partner Launch Landing Page

/hero, /partners (with /partner-1, /partner-2), /projects (with /project-1, /project-2), /map, /lead-form, /press, /testimonials

Full Real Estate Company Website

/home, /about, /team, /projects (with multiple project pages), /map, /blog (with /post-1, /post-2), /contact, /careers

Freelancer Real Estate Website

/hero, /featured-listings, /testimonials, /lead-form, /blog

Full Map Website

/hero, /search, /map (with listing popups), /listing-detail, /lead-form, /analytics

Landing Page + Ads Quick Launch

/hero, /project-overview, /lead-form, /faq, /thank-you

AI Worker Flows

site-build-worker: Renders blocks → uploads page → updates Firestore.

listing-sync-worker: Fetches, normalizes, and enriches listings.

ads-worker: Generates Google Ads campaigns.

chat-index-worker: Generates vector embeddings for page/project chat.

seo-worker: Generates SEO meta, OG, JSON-LD.

Each worker updates /jobs/{uid}/{jobId} with status, result, and error for step tracking.

AI Prompt Guidelines

Template Orchestrator: Suggest next 5 blocks based on site type and brand.

Content Designer: Generate headlines, descriptions, meta tags, ads-ready content.

Ad Specialist: Generate Google Ads headlines, descriptions, keywords, creatives.

Listing Normalizer: Enrich and validate listing data.

SEO Engineer: Produce meta, OG, JSON-LD using project data.

Chat Assistant Builder: Embed brochure and page info for AI chat.

All AI outputs must be strictly JSON for automated Firestore ingestion.

Getting Started

Create Firebase Project

Enable Firestore, Storage, Hosting, Cloud Functions / Cloud Run.

Set up .env.local with service account.

Seed collections: /projects, /blocks, /templates.

Deploy frontend and backend workers.

Start building sites:

User selects brand + colors.

User selects site type → AI suggests blocks.

User picks blocks → AI fills content + SEO + ads.

Deploy page + campaigns.

Notes

All blocks auto-inherit brand styles.

Lead forms are dynamic and AI-assisted.

Listings can sync from multiple sources.

AI optimizes pages for conversion, SEO, and Google Ads readiness.

Users can expand pages and sites anytime; sitemap auto-updates.

Entrestate OS is designed to let real estate professionals build fully branded, high-conversion sites in minutes while leveraging AI to automate content, lead capture, listings, SEO, and ads.

