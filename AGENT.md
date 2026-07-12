# Huppie Taxi Zorg — Agent Guide

## Product and tone

- Huppie Taxi Zorg is a Dutch website for non-emergency care transport.
- Build for clients, their family members, care partners, and professional drivers.
- Keep visitor-facing copy in Dutch (`nl-NL`), with a calm, clear, respectful, reassuring tone.
- Do not imply emergency transport. Keep emergency-service guidance where it is relevant.
- Do not make unverified claims about availability, reimbursement, punctuality, qualifications, or medical suitability.

## Stack and implementation

- Use Nuxt 4, Vue Composition API, and TypeScript.
- Use Nuxt and Nuxt UI MCPs when they are available and relevant to the task.
- Prefer Nuxt UI components before creating custom equivalents.
- Use Tailwind CSS utilities and existing shared components for consistent UI.
- Use Zod schemas for all client-side form validation, including conditional fields.
- Reuse `usePageSeo()` and `defineOgImage()` on public pages. Keep canonical URLs, structured data, sitemap settings, and `noindex` behaviour aligned with page intent.
- Preserve accessibility: semantic HTML, labels, keyboard operation, visible focus states, appropriate autocomplete values, and ARIA only when it adds needed semantics.

## Forms and sensitive data

- Forms are currently front-end demos: they must not claim a message, application, document, or ride request was sent, saved, or processed.
- Do not add form persistence, email delivery, file storage, third-party tracking, or external data sharing for personal, insurance, health-related, or identity-document data without explicit user approval.
- Collect only fields needed for the declared flow. Validate dates, consent, and insurer/authorisation conditions carefully.
- Keep the non-emergency boundary and insurer-controlled reimbursement/authorisation clear in relevant copy.

## Verification

- Run the smallest relevant check for the change made.
- For copy, styling, or isolated component changes, inspect the affected page; run lint only when it is relevant.
- For TypeScript, schema, routing, Nuxt configuration, module, or dependency changes, run `pnpm typecheck`.
- Run `pnpm build` only before handoff when changes could affect production output, deployment, routing, SSR/prerendering, dependencies, or build configuration.
- Do not repeatedly run the full build after small follow-up edits unless the prior result is no longer meaningful.
- Preserve Cloudflare Workers compatibility when changing Nuxt or deployment configuration.
