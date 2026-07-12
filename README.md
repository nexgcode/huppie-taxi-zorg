# Huppie Taxi Zorg

Website for Huppie Taxi's Dutch non-emergency care transport service. It helps clients arrange transport to medical appointments, care organisations explore a partnership, and professional drivers apply to join the network.

Production site: <https://zorg.huppietaxi.nl/>

## Product scope

Huppie Taxi Zorg is designed around calm, clear, respectful transport to hospitals, clinics, therapy, rehabilitation, and other medical appointments. The site supports:

- one-off and recurring care-transport requests;
- insurer and transport-authorisation guidance;
- contact requests from clients and family members;
- introductory requests from care partners; and
- driver applications, including supporting-document uploads.

This is not emergency transport. Visitor-facing content should never suggest otherwise.

## Current form status

The contact, ride-request, partner, and driver forms currently validate in the browser and show demo success states. They do **not** submit, store, or send any data or uploaded documents.

Before enabling real submissions, provide a secure backend flow and explicitly decide on consent, data minimisation, retention, access control, abuse protection, and the handling of personal, insurance, and uploaded-document data.

## Tech stack

- [Nuxt 4](https://nuxt.com/) and Vue with TypeScript
- [Nuxt UI](https://ui.nuxt.com/) and Tailwind CSS
- [Zod](https://zod.dev/) for form validation
- `@nuxtjs/seo` for metadata, structured data, sitemap, and OG images
- Umami for analytics
- Cloudflare Workers/Nitro for deployment
- pnpm for package management

## Project structure

```text
app/
  pages/          Route pages: home, contact, partners, drivers, ride request
  components/     Shared layout, forms, and home-page sections
  composables/    Shared helpers, including page SEO
  assets/css/     Global styles
nuxt.config.ts    Nuxt modules, SEO, route rules, analytics, and Nitro settings
wrangler.jsonc    Cloudflare Worker configuration
```

## Local development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Useful commands:

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

`pnpm build` creates the production output for Cloudflare. Use it before a deployment or after changes that could affect production output; it is not expected after every small edit.

## Deployment

Nuxt is configured for Cloudflare's module worker preset. The built Worker entry point and public assets are defined in `wrangler.jsonc`.

Route rules prerender the public marketing pages, while `/rit-aanvragen` is excluded from indexing and from the sitemap because it contains a request flow.

## Content and service guidance

Visitor-facing copy is Dutch (`nl-NL`) and should remain clear, calming, and respectful. Avoid unverified claims about availability, reimbursement, punctuality, qualifications, or medical suitability. Insurance coverage and transport authorisation are decided by the relevant insurer.
