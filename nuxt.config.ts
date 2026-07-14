/* eslint-disable nuxt/nuxt-config-keys-order */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', 'nuxt-umami', '@nuxtjs/seo', '@nuxtjs/supabase', '@pinia/nuxt'],

  devtools: {
    enabled: true
  },

  runtimeConfig: {
    supabase: {
      // Set with NUXT_SUPABASE_SECRET_KEY. Never expose this in public config.
      secretKey: ''
    },
    telegramBotToken: '',
    telegramChatId: ''
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://zorg.huppietaxi.nl/',
    name: 'Huppie Taxi',
    description: 'Betrouwbaar en comfortabel zorgvervoer naar ziekenhuizen, klinieken en medische afspraken.',
    defaultLocale: 'nl-NL'
  },

  routeRules: {
    '/admin/**': { robots: false }
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
  supabase: {
    redirect: false
  },

  fonts: {
    families: [
      { name: 'Arial', src: '/fonts/arial-regular.woff2', global: true },
      { name: 'Helvetica Neue', src: '/fonts/helvetica-neue-regular.woff2', global: true }
    ]
  },

  umami: {
    id: '31b9df03-750a-45af-82cf-5544aaa77554',
    host: 'https://cloud.umami.is',
    autoTrack: true,
    proxy: 'cloak',
    ignoreLocalhost: true
  }
})
