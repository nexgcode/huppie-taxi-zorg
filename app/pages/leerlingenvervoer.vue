<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-5xl">
        <p class="eyebrow text-teal-100">
          Voor scholen, gemeenten en zorgpartners
        </p>
        <h1 class="display-heading mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">
          Leerlingenvervoer met aandacht voor iedere schooldag.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Rustig, zorgvuldig en overzichtelijk vervoer voor leerlingen die niet zelfstandig naar school kunnen reizen.
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
      <div class="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p class="eyebrow">
            Wat is leerlingenvervoer?
          </p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Een betrouwbare verbinding tussen thuis en school.
          </h2>
        </div>
        <div class="space-y-5 leading-7 text-navy-700">
          <p>
            Leerlingenvervoer is bedoeld voor kinderen en jongeren die door bijvoorbeeld een beperking, ziekte of andere omstandigheden niet zelfstandig naar school kunnen reizen. In sommige situaties speelt ook de afstand tot de school een rol.
          </p>
          <p>
            De gemeente beoordeelt per leerling of leerlingenvervoer nodig is en behandelt de aanvraag. De precieze voorwaarden, eigen bijdrage en vorm van vervoer kunnen per gemeente verschillen.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-teal-50 py-16 sm:py-20">
      <div class="section-wrap">
        <div class="max-w-2xl">
          <p class="eyebrow">
            Onze aanpak
          </p>
          <h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Duidelijkheid voor de leerling, school en ouder.
          </h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-3">
          <article
            v-for="item in approach"
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
        <p class="eyebrow">Goed om te weten</p>
        <h2 class="display-heading mt-4 text-4xl text-navy-900">De gemeente regelt de indicatie.</h2>
        <p class="mt-5 leading-7 text-navy-700">
          Wilt u leerlingenvervoer aanvragen of weten welke regels gelden? Neem dan contact op met uw gemeente. Heeft u als school, gemeente of zorgorganisatie vragen over de uitvoering? Dan denken we graag mee.
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
const approach = [
  {
    icon: 'i-lucide-shield-check',
    title: 'Veilig en rustig',
    text: 'We houden rekening met de behoefte van de leerling en met duidelijke afspraken rond de rit.',
  },
  {
    icon: 'i-lucide-calendar-clock',
    title: 'Overzichtelijk gepland',
    text: 'Heldere ophaal- en aflevertijden helpen om de schooldag voorspelbaar te laten verlopen.',
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'Korte lijnen',
    text: 'Een goede samenwerking met ouders, scholen en opdrachtgevers maakt afstemming eenvoudiger.',
  },
];

usePageSeo({
  title: 'Leerlingenvervoer met aandacht',
  description: 'Zorgvuldig en overzichtelijk leerlingenvervoer voor kinderen en jongeren die niet zelfstandig naar school kunnen reizen.',
  path: '/leerlingenvervoer',
});

defineOgImage('Huppie', {
  title: 'Leerlingenvervoer met aandacht',
  description: 'Zorgvuldig en overzichtelijk vervoer tussen thuis en school.',
});
</script>
