<script setup lang="ts">
const benefits = [
  { icon: 'i-lucide-calendar-clock', title: 'Slim gepland vervoer', text: 'Ons systeem verdeelt zorgritten automatisch over beschikbare chauffeurs, zodat de planning overzichtelijk blijft.' },
  { icon: 'i-lucide-route', title: 'Duidelijk overzicht', text: 'We stemmen ritten af op afspraakmomenten en houden de praktische details voor uw organisatie helder.' },
  { icon: 'i-lucide-message-square-heart', title: 'Feedback van cliënten', text: 'Met ons feedbacksysteem verzamelen we ervaringen van cliënten en gebruiken we die om de dienstverlening te verbeteren.' },
  { icon: 'i-lucide-handshake', title: 'Een betrokken partner', text: 'U heeft één duidelijke contactroute voor vragen over geplande zorgvervoerbehoeften.' }
]

useSeoMeta({
  title: 'Partner worden | Huppie Taxi',
  description: 'Werk samen met Huppie Taxi voor gepland en overzichtelijk zorgvervoer.'
})
</script>

<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-5xl">
        <p class="eyebrow text-teal-100">
          Voor zorgpartners
        </p>
        <h1 class="display-heading mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">
          Samen zorgvervoer beter organiseren.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Huppie Taxi werkt graag samen met zorgorganisaties, klinieken en praktijken die hun cliënten betrouwbaar vervoer willen bieden.
        </p>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="max-w-2xl">
        <p class="eyebrow">
          Waarom Huppie Taxi
        </p>
        <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
          Betrouwbare ritten, overzichtelijke samenwerking.
        </h2>
        <p class="mt-5 leading-7 text-navy-700">
          We combineren persoonlijke aandacht met systemen die helpen om zorgvervoer zorgvuldig te plannen en te verbeteren.
        </p>
      </div>
      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <article
          v-for="benefit in benefits"
          :key="benefit.title"
          class="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8"
        >
          <UIcon
            :name="benefit.icon"
            class="size-7 text-teal-700"
          />
          <h3 class="mt-5 text-xl font-bold text-navy-900">
            {{ benefit.title }}
          </h3>
          <p class="mt-3 leading-7 text-navy-700">
            {{ benefit.text }}
          </p>
        </article>
      </div>
    </section>

    <section class="bg-teal-50 py-16 sm:py-20">
      <div class="section-wrap grid gap-12 lg:grid-cols-2">
        <div>
          <p class="eyebrow">
            Automatische ritplanning
          </p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            De juiste rit bij de juiste chauffeur.
          </h2>
          <p class="mt-6 leading-7 text-navy-700">
            Ons systeem plant zorgritten automatisch in over onze chauffeurs. Zo kunnen we beschikbare capaciteit benutten en houden we zicht op de planning rond zorgafspraken.
          </p>
        </div>
        <div>
          <p class="eyebrow">
            Feedback die helpt
          </p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Luisteren naar de ervaring van cliënten.
          </h2>
          <p class="mt-6 leading-7 text-navy-700">
            Na een rit kunnen cliënten feedback geven. Die inzichten helpen ons om te blijven leren en om de ervaring voor cliënten en zorgpartners te verbeteren.
          </p>
        </div>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <ContactForm
          eyebrow="Partner worden"
          title="Bespreek een samenwerking"
          description="Vertel ons kort over uw organisatie en uw vervoersbehoefte."
          success-title="Bedankt voor uw interesse."
        />
      </div>
    </section>
  </main>
</template>
