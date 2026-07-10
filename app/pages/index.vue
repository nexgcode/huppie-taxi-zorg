<script setup lang="ts">
const services = [
  { icon: 'i-lucide-building-2', title: 'Ziekenhuisvervoer', text: 'Een rustige, geplande rit van en naar uw ziekenhuisafspraak.' },
  { icon: 'i-lucide-stethoscope', title: 'Afspraken en klinieken', text: 'Betrouwbaar vervoer naar specialisten, klinieken en medische afspraken.' },
  { icon: 'i-lucide-heart-pulse', title: 'Therapie en revalidatie', text: 'Comfortabele ritten voor therapie, revalidatie en behandelafspraken.' },
  { icon: 'i-lucide-calendar-check', title: 'Vaste zorgritten', text: 'Regelmatige ophaalmomenten afgestemd op uw terugkerende afspraken.' },
  { icon: 'i-lucide-user-round', title: 'Vervoer voor ouderen', text: 'Respectvol deur-tot-deurvervoer voor ouderen en hun familie.' },
  { icon: 'i-lucide-rotate-ccw', title: 'Retourritten', text: 'Plan uw heen- en terugreis samen, vooraf en overzichtelijk.' }
]

const steps = [
  { number: '01', title: 'Vertel ons over uw rit', text: 'Bel ons of stuur een kort verzoek met uw ophaaladres, bestemming en afspraaktijd.' },
  { number: '02', title: 'Ontvang duidelijke bevestiging', text: 'Wij bevestigen de ritgegevens en stemmen de planning met u af.' },
  { number: '03', title: 'Ophalen bij uw deur', text: 'Uw geplande rit begint bij u thuis, met ruimte om rustig te reizen.' },
  { number: '04', title: 'Kom met vertrouwen aan', text: 'We brengen u naar uw zorgbestemming en kunnen ook de terugrit afspreken.' }
]

const faqs = [
  { label: 'Hoe ver van tevoren moet ik boeken?', content: 'Vooraf boeken helpt ons uw ophaalmoment goed rond uw afspraak te plannen. Neem contact op voor de actuele beschikbaarheid van uw rit.' },
  { label: 'Kan ik ook een retourrit regelen?', content: 'Ja. Vertel ons bij uw aanvraag wanneer u ongeveer terug wilt reizen. Samen bespreken we wat passend is voor uw afspraakdag.' },
  { label: 'Kan ik vervoer voor een familielid regelen?', content: 'Ja. Familieleden kunnen contact met ons opnemen en de gegevens doorgeven die nodig zijn om de rit te plannen.' },
  { label: 'Regelen jullie ook terugkerend vervoer?', content: 'Ja. Heeft u regelmatige afspraken voor behandeling, therapie of revalidatie? Vraag ons naar de mogelijkheden voor een vaste planning.' },
  { label: 'Hoe zit het met verzekering of vergoeding?', content: 'Dekking of vergoeding van vervoer kan afhangen van uw verzekeraar, zorgsituatie en toestemming. Neem contact op om de mogelijkheden te bespreken.' }
]
</script>

<template>
  <div>
    <a
      href="#inhoud"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-navy-900 focus:shadow-lg"
    >Ga naar inhoud</a>

    <AppHeader />

    <main id="inhoud">
      <section class="overflow-hidden bg-navy-900 pb-14 pt-14 text-white sm:pb-20 sm:pt-20">
        <div class="section-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div class="max-w-3xl">
            <p class="mb-7 flex items-center gap-2 text-sm font-semibold text-teal-100">
              <span class="size-2 rounded-full bg-teal-400" /> Zorgvervoer, gepland rond uw dag
            </p>
            <h1 class="display-heading text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
              Rustig onderweg<br>naar uw zorg.
            </h1>
            <p class="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
              Betrouwbaar en comfortabel vervoer naar ziekenhuizen, klinieken en medische afspraken. Van uw deur tot uw bestemming, met aandacht voor tijd en respect.
            </p>
            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <UButton
                to="/rit-aanvragen"
                label="Rit aanvragen"
                trailing-icon="i-lucide-arrow-right"
                color="primary"
                size="xl"
                class="justify-center"
              /><UButton
                to="#werkwijze"
                label="Zo werkt het"
                variant="ghost"
                color="neutral"
                size="xl"
                class="justify-center border border-white/40 bg-transparent !text-white hover:bg-white/10"
              />
            </div>
            <p class="mt-6 text-sm text-slate-300">
              Geen spoedvervoer. Bel bij een medische noodsituatie altijd de lokale hulpdiensten.
            </p>
          </div>
          <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div class="absolute -right-16 -top-14 size-48 rounded-full border border-teal-400/30 sm:size-64" /><div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#123740] p-6 shadow-2xl sm:p-8">
              <div class="flex items-center justify-between border-b border-white/10 pb-6">
                <p class="text-sm font-semibold text-teal-100">
                  Uw rit, overzichtelijk geregeld
                </p><UIcon
                  name="i-lucide-route"
                  class="size-6 text-teal-300"
                />
              </div><div class="space-y-6 py-8">
                <div class="flex gap-4">
                  <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold">1</span><div>
                    <p class="font-bold">
                      Uw voordeur
                    </p><p class="mt-1 text-sm text-slate-300">
                      Een ophaalmoment rond uw afspraak.
                    </p>
                  </div>
                </div><div class="ml-5 h-7 border-l border-dashed border-teal-300/50" /><div class="flex gap-4">
                  <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-navy-900">2</span><div>
                    <p class="font-bold">
                      Uw zorgbestemming
                    </p><p class="mt-1 text-sm text-slate-300">
                      Ziekenhuis, kliniek, therapie of behandelcentrum.
                    </p>
                  </div>
                </div>
              </div><div class="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">
                “Wij regelen de praktische details, zodat u zich op uw afspraak kunt richten.”
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-b border-navy-900/10 bg-white py-8">
        <div class="section-wrap grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
          <div class="flex items-center justify-center gap-3 lg:justify-start">
            <UIcon
              name="i-lucide-clock-3"
              class="size-5 text-teal-700"
            /><span class="font-semibold">Geplande, betrouwbare ritten</span>
          </div><div class="flex items-center justify-center gap-3 lg:justify-start">
            <UIcon
              name="i-lucide-hand-heart"
              class="size-5 text-teal-700"
            /><span class="font-semibold">Respectvolle service</span>
          </div><div class="flex items-center justify-center gap-3 lg:justify-start">
            <UIcon
              name="i-lucide-armchair"
              class="size-5 text-teal-700"
            /><span class="font-semibold">Comfortabel onderweg</span>
          </div><div class="flex items-center justify-center gap-3 lg:justify-start">
            <UIcon
              name="i-lucide-house"
              class="size-5 text-teal-700"
            /><span class="font-semibold">Van deur tot deur</span>
          </div>
        </div>
      </section>

      <section class="section-wrap py-12 sm:py-16">
        <div class="grid overflow-hidden rounded-[2rem] bg-navy-900 text-white lg:grid-cols-2">
          <div class="p-8 sm:p-12 lg:p-16">
            <p class="eyebrow text-teal-200">
              Terugkerende afspraken
            </p>
            <h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
              Dezelfde zorgvuldige planning, iedere keer.
            </h2>
            <p class="mt-6 max-w-md leading-7 text-slate-200">
              Heeft u regelmatig vervoer nodig voor behandeling, therapie of revalidatie? We helpen u een vaste planning af te stemmen op uw afspraken.
            </p>
            <UButton
              to="/rit-aanvragen"
              label="Vast vervoer regelen"
              trailing-icon="i-lucide-arrow-right"
              color="primary"
              size="lg"
              class="mt-8"
            />
          </div>
          <div class="relative min-h-72 overflow-hidden bg-[#164852] p-8 sm:p-12">
            <div class="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,_#d8eeea_1px,_transparent_0)] [background-size:20px_20px]" />
            <div class="relative ml-auto max-w-xs rounded-2xl bg-white p-6 text-navy-900 shadow-xl">
              <p class="text-sm font-bold text-teal-700">
                Een vaste planning kan bestaan uit
              </p>
              <ul class="mt-5 space-y-4 text-sm font-medium">
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check"
                    class="mt-0.5 size-4 text-teal-700"
                  />Vaste ophaaldagen
                </li>
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check"
                    class="mt-0.5 size-4 text-teal-700"
                  />Tijden rond uw afspraak
                </li>
                <li class="flex gap-3">
                  <UIcon
                    name="i-lucide-check"
                    class="mt-0.5 size-4 text-teal-700"
                  />Geplande retourritten
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

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
          </div><div class="grid gap-x-8 gap-y-9 sm:grid-cols-2">
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
          </div><ol class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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

      <section
        id="partners"
        class="border-y border-navy-900/10 bg-white py-20 sm:py-28"
      >
        <div class="section-wrap grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p class="eyebrow">
              Voor zorgpartners
            </p><h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
              Een duidelijk aanspreekpunt voor zorgorganisaties.
            </h2><p class="mt-6 max-w-xl leading-7 text-navy-700">
              Praktijken, klinieken, revalidatiecentra en zorgorganisaties kunnen contact opnemen om toekomstige vervoersbehoeften te bespreken.
            </p>
          </div><div class="rounded-2xl border border-navy-900/10 bg-[#f7f8f6] p-7">
            <UIcon
              name="i-lucide-messages-square"
              class="size-7 text-teal-700"
            /><h3 class="mt-5 text-xl font-bold">
              Neem contact op met Huppie Taxi
            </h3><p class="mt-3 leading-7 text-navy-700">
              Vertel ons over uw organisatie en de ritten die u wilt regelen.
            </p><UButton
              to="/rit-aanvragen"
              label="Partneraanvraag"
              variant="outline"
              color="neutral"
              size="lg"
              class="mt-6"
            />
          </div>
        </div>
      </section>

      <section
        id="vragen"
        class="section-wrap py-20 sm:py-28"
      >
        <div class="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p class="eyebrow">
              Veelgestelde vragen
            </p><h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
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

      <section class="bg-navy-900 py-20 text-white sm:py-28">
        <div class="section-wrap grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="eyebrow text-teal-200">
              Een rit aanvragen
            </p>
            <h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
              Uw zorgreis begint met een duidelijke aanvraag.
            </h2>
            <p class="mt-6 max-w-2xl leading-7 text-slate-200">
              Vul uw gegevens in via ons duidelijke aanvraagproces. U ziet precies welke informatie we nodig hebben om uw zorgvervoer te kunnen beoordelen.
            </p>
          </div>
          <UButton
            to="/rit-aanvragen"
            label="Start uw aanvraag"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            size="xl"
            class="justify-center"
          />
        </div>
      </section>
    </main>

    <footer class="bg-navy-900 pb-24 text-slate-300 sm:pb-8">
      <div class="section-wrap border-t border-white/15 pt-8">
        <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p class="font-bold text-white">
              Huppie Taxi
            </p><p class="mt-1 text-sm">
              Betrouwbaar zorgvervoer, gepland rond u.
            </p>
          </div><p class="text-sm">
            © {{ new Date().getFullYear() }} Huppie Taxi. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
