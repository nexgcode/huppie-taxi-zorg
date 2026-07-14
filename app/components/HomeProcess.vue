<template>
  <section
    id="werkwijze"
    class="bg-teal-50 py-20 sm:py-28"
  >
    <div class="section-wrap">
      <div class="max-w-2xl">
        <p class="eyebrow">
          Een heldere werkwijze
        </p><h2 class="display-heading mt-4 text-4xl sm:text-5xl">
          Eenvoudig vanaf het eerste contact.
        </h2><p class="mt-5 leading-7 text-navy-700">
          We houden het aanvragen van zorgvervoer duidelijk, want uw reis naar zorg mag een zorg minder zijn.
        </p>
      </div>
      <ol class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="step in steps"
          :key="step.number"
          class="rounded-2xl bg-white p-6"
        >
          <span class="font-serif text-2xl text-teal-700">{{ step.number }}</span><h3 class="mt-9 text-lg font-bold">
            {{ step.title }}
          </h3><p class="mt-3 text-sm leading-6 text-navy-700">
            {{ step.text }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Vertel ons over uw rit',
    text: 'Bel ons of stuur een kort verzoek met uw ophaaladres, bestemming en afspraaktijd.',
  },
  {
    number: '02',
    title: 'Ontvang duidelijke bevestiging',
    text: 'Wij bevestigen de ritgegevens en stemmen de planning met u af.',
  },
  {
    number: '03',
    title: 'Ophalen bij uw deur',
    text: 'Uw geplande rit begint bij u thuis, met ruimte om rustig te reizen.',
  },
  {
    number: '04',
    title: 'Kom met vertrouwen aan',
    text: 'We brengen u naar uw zorgbestemming en kunnen ook de terugrit afspreken.',
  },
];
</script>
