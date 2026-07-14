<template>
  <section
    id="vragen"
    aria-labelledby="faq-title"
    class="section-wrap py-20 sm:py-28"
  >
    <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
      <div>
        <p class="eyebrow">
          Veelgestelde vragen
        </p>
        <h2
          id="faq-title"
          class="display-heading mt-4 text-4xl leading-tight sm:text-5xl"
        >
          Goed om te weten voor u boekt.
        </h2>
      </div><UAccordion
        :items="faqs"
        type="multiple"
        :unmount-on-hide="false"
        class="w-full"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const faqs = [
  {
    label: 'Hoe ver van tevoren moet ik boeken?',
    content:
      'Vooraf boeken helpt ons uw ophaalmoment goed rond uw afspraak te plannen. Neem contact op voor de actuele beschikbaarheid van uw rit.',
  },
  {
    label: 'Kan ik ook een retourrit regelen?',
    content:
      'Ja. Vertel ons bij uw aanvraag wanneer u ongeveer terug wilt reizen. Samen bespreken we wat passend is voor uw afspraakdag.',
  },
  {
    label: 'Kan ik vervoer voor een familielid regelen?',
    content:
      'Ja. Familieleden kunnen contact met ons opnemen en de gegevens doorgeven die nodig zijn om de rit te plannen.',
  },
  {
    label: 'Regelen jullie ook terugkerend vervoer?',
    content:
      'Ja. Heeft u regelmatige afspraken voor behandeling, therapie of revalidatie? Vraag ons naar de mogelijkheden voor een vaste planning.',
  },
  {
    label: 'Hoe zit het met verzekering of vergoeding?',
    content:
      'Dekking of vergoeding van vervoer kan afhangen van uw verzekeraar, zorgsituatie en toestemming. Neem contact op om de mogelijkheden te bespreken.',
  },
];
</script>
