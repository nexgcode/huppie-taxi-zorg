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
          Heeft u een vraag over uw rit of wilt u zorgvervoer aanvragen? Stuur ons een bericht en we nemen contact met u op over de beschikbaarheid.
        </p>
        <div class="mt-8 flex flex-col gap-3 text-lg sm:flex-row sm:gap-8">
          <a
            href="tel:+31681914785"
            class="font-semibold text-teal-100 transition hover:text-white focus:outline-none focus:underline"
          >+31 6 81914785</a>
          <a
            href="mailto:info@huppietaxi.nl"
            class="font-semibold text-teal-100 transition hover:text-white focus:outline-none focus:underline"
          >info@huppietaxi.nl</a>
        </div>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <ContactForm />
      </div>
    </section>
  </main>
</template>
