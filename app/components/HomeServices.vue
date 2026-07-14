<template>
  <section
    id="diensten"
    class="section-wrap py-20 sm:py-28"
  >
    <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <p class="eyebrow">
          Zorgritten
        </p><h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
          Vervoer voor afspraken die belangrijk zijn.
        </h2><p class="mt-6 max-w-md leading-7 text-navy-700">
          Of het om één belangrijke afspraak gaat of om een vaste behandeling: wij helpen u een rit te regelen die bij uw dag past.
        </p>
      </div>
      <div class="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <article
          v-for="service in services"
          :key="service.title"
          class="border-t border-navy-900/15 pt-5"
        >
          <UIcon
            :name="service.icon"
            class="size-6 text-teal-700"
          /><h3 class="mt-4 text-lg font-bold">
            {{ service.title }}
          </h3><p class="mt-2 leading-6 text-navy-700">
            {{ service.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    icon: 'i-lucide-building-2',
    title: 'Ziekenhuisvervoer',
    text: 'Een rustige, geplande rit van en naar uw ziekenhuisafspraak.',
  },
  {
    icon: 'i-lucide-stethoscope',
    title: 'Afspraken en klinieken',
    text: 'Betrouwbaar vervoer naar specialisten, klinieken en medische afspraken.',
  },
  {
    icon: 'i-lucide-heart-pulse',
    title: 'Therapie en revalidatie',
    text: 'Comfortabele ritten voor therapie, revalidatie en behandelafspraken.',
  },
  {
    icon: 'i-lucide-calendar-check',
    title: 'Vaste zorgritten',
    text: 'Regelmatige ophaalmomenten afgestemd op uw terugkerende afspraken.',
  },
  {
    icon: 'i-lucide-user-round',
    title: 'Vervoer voor ouderen',
    text: 'Respectvol deur-tot-deurvervoer voor ouderen en hun familie.',
  },
  {
    icon: 'i-lucide-rotate-ccw',
    title: 'Retourritten',
    text: 'Plan uw heen- en terugreis samen, vooraf en overzichtelijk.',
  },
];
</script>
