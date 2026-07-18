<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-5xl">
        <p class="eyebrow text-teal-100">
          Gemeentelijk zorgvervoer
        </p>
        <h1 class="display-heading mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">
          Wmo-vervoer dat meebeweegt met uw dag.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Persoonlijk en comfortabel vervoer voor mensen die door een beperking niet zelfstandig met de auto of het openbaar vervoer kunnen reizen.
        </p>
        <UButton
          to="/partners"
          label="Samenwerken als partner"
          trailing-icon="i-lucide-arrow-right"
          color="primary"
          size="xl"
          class="mt-8"
        />
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p class="eyebrow">Wat is Wmo-vervoer?</p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Vervoer om mee te blijven doen.
          </h2>
        </div>
        <div class="space-y-5 leading-7 text-navy-700">
          <p>
            De Wet maatschappelijke ondersteuning (Wmo) helpt mensen om zo lang mogelijk zelfstandig te wonen en mee te doen in de samenleving. Een gemeente kan daarom lokaal of regionaal aangepast vervoer organiseren, bijvoorbeeld via een regiotaxi.
          </p>
          <p>
            De mogelijkheden, voorwaarden, pas en eigen bijdrage verschillen per gemeente. Uw gemeente bepaalt welke voorziening bij uw situatie past.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-teal-50 py-16 sm:py-20">
      <div class="section-wrap">
        <div class="max-w-2xl">
          <p class="eyebrow">Waar we bij helpen</p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Van deur tot bestemming, met aandacht geregeld.
          </h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-3">
          <article
            v-for="item in services"
            :key="item.title"
            class="rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8"
          >
            <UIcon :name="item.icon" class="size-7 text-teal-700" />
            <h3 class="mt-5 text-xl font-bold text-navy-900">{{ item.title }}</h3>
            <p class="mt-3 leading-7 text-navy-700">{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="mx-auto max-w-3xl rounded-[1.5rem] border border-navy-900/10 bg-white p-7 shadow-sm sm:p-10">
        <p class="eyebrow">Een aanvraag doen?</p>
        <h2 class="display-heading mt-4 text-4xl text-navy-900">Begin bij uw gemeente.</h2>
        <p class="mt-5 leading-7 text-navy-700">
          Heeft u nog geen Wmo-pas of indicatie? Vraag bij uw gemeente na hoe u een vervoersvoorziening kunt aanvragen. Heeft u al een opdracht of werkt u als gemeente, zorgorganisatie of vervoerspartner met aangepast vervoer? Maak dan kennis met Huppie Taxi.
        </p>
        <UButton
          to="/partners"
          label="Naar de partnerpagina"
          trailing-icon="i-lucide-arrow-right"
          color="primary"
          size="lg"
          class="mt-7"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const services = [
  {
    icon: 'i-lucide-house',
    title: 'Deur-tot-deur',
    text: 'We helpen reizigers comfortabel van het afgesproken vertrekpunt naar hun bestemming.',
  },
  {
    icon: 'i-lucide-accessibility',
    title: 'Aangepast vervoer',
    text: 'Bespreek vooraf welke ondersteuning en voertuigvoorzieningen nodig zijn voor de rit.',
  },
  {
    icon: 'i-lucide-calendar-check',
    title: 'Vooraf gepland',
    text: 'Een duidelijke planning geeft rust bij afspraken, activiteiten en terugkerende ritten.',
  },
];

usePageSeo({
  title: 'Wmo-vervoer met aandacht',
  description: 'Persoonlijk en comfortabel Wmo-vervoer voor mensen die door een beperking niet zelfstandig kunnen reizen.',
  path: '/wmo-vervoer',
});

defineOgImage('Huppie', {
  title: 'Wmo-vervoer met aandacht',
  description: 'Persoonlijk en comfortabel gemeentelijk zorgvervoer.',
});
</script>
