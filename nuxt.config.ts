// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-umami', '@nuxtjs/seo'],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://zorg.huppietaxi.nl/',
    name: 'Huppie Taxi',
    description: 'Betrouwbaar en comfortabel zorgvervoer naar ziekenhuizen, klinieken en medische afspraken.',
    defaultLocale: 'nl-NL'
  },

  routeRules: {
    '/': { prerender: true },
    '/contact': { prerender: true },
    '/partners': { prerender: true },
    '/chauffeur-worden': { prerender: true },
    '/rit-aanvragen': { robots: false },
    '/robots.txt': { prerender: true },
    '/sitemap.xml': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    preset: 'cloudflare_module'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  sitemap: {
    autoI18n: false,
    exclude: ['/rit-aanvragen']
  },

  umami: {
    id: '31b9df03-750a-45af-82cf-5544aaa77554',
    host: 'https://cloud.umami.is',
    autoTrack: true,
    proxy: 'cloak',
    ignoreLocalhost: true
  }
})
