<script setup lang="ts">
useSeoMeta({
  title: 'Contact | Huppie Taxi',
  description: 'Neem contact op met Huppie Taxi over uw aanvraag voor zorgvervoer.'
})
</script>

<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-4xl">
        <p class="eyebrow text-teal-100">
          Contact
        </p>
        <h1 class="display-heading mt-4 text-5xl leading-[1.02] sm:text-6xl">
          Neem contact op over uw zorgrit.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Wilt u zorgvervoer aanvragen of heeft u een vraag over uw rit? Start uw aanvraag en we nemen contact met u op over de beschikbaarheid.
        </p>
        <UButton
          to="/rit-aanvragen"
          label="Rit aanvragen"
          trailing-icon="i-lucide-arrow-right"
          color="primary"
          size="xl"
          class="mt-9"
        />
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="max-w-3xl">
        <p class="eyebrow">
          Goed voorbereid contact opnemen
        </p>
        <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
          Zo kunnen we uw aanvraag goed beoordelen.
        </h2>
        <p class="mt-6 leading-7 text-navy-700">
          Houd uw ophaaladres, bestemming en afspraaktijd bij de hand. Voor terugkerende ritten kunt u ook aangeven op welke dagen en tijden u vervoer nodig heeft.
        </p>
      </div>
    </section>
  </main>
</template>
