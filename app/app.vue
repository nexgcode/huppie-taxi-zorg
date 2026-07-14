<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  htmlAttrs: {
    lang: 'nl',
  },
});

const title = 'Betrouwbaar zorgvervoer';
const description = 'Betrouwbaar en comfortabel vervoer naar ziekenhuizen, klinieken en medische afspraken.';

useSeoMeta({
  title,
  titleTemplate: '%s | Huppie Taxi',
  description,
  ogTitle: title,
  ogDescription: description,
  ogSiteName: 'Huppie Taxi',
  ogLocale: 'nl_NL',
  ogType: 'website',
  twitterCard: 'summary_large_image',
});

useSchemaOrg([
  defineOrganization({
    '@type': 'Organization',
    'name': 'Huppie Taxi',
    'url': 'https://zorg.huppietaxi.nl/',
    'email': 'zorg@huppietaxi.nl',
    'telephone': '+31681914785',
  }),
  defineWebSite({
    name: 'Huppie Taxi',
    url: 'https://zorg.huppietaxi.nl/',
    inLanguage: 'nl-NL',
  }),
]);
</script>
