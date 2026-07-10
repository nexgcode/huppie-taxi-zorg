<script setup lang="ts">
const route = useRoute()

type Page = { eyebrow: string, title: string, description: string, details: string[], cta: string }

const pages: Record<string, Page> = {
  'hospital-transport': { eyebrow: 'Ziekenhuisvervoer', title: 'Gepland vervoer voor uw ziekenhuisbezoek.', description: 'Een afspraak in het ziekenhuis brengt al genoeg met zich mee. Huppie Taxi helpt de heen- en terugreis overzichtelijk te regelen.', details: ['Ophalen en afzetten van deur tot deur', 'Planning rond uw afspraaktijd', 'Retourrit vooraf bespreekbaar'], cta: 'Ziekenhuisvervoer regelen' },
  'medical-appointments': { eyebrow: 'Medische afspraken', title: 'Comfortabel onderweg naar uw afspraak.', description: 'Voor een bezoek aan een specialist, kliniek, behandelcentrum of praktijk helpen wij u vervoer te plannen dat bij uw agenda past.', details: ['Vervoer naar klinieken en specialisten', 'Duidelijke bevestiging van uw rit', 'Een korte en eenvoudige aanvraag'], cta: 'Vervoer aanvragen' },
  'elderly-transport': { eyebrow: 'Vervoer voor ouderen', title: 'Respectvol vervoer voor oudere passagiers.', description: 'Huppie Taxi biedt betrouwbaar deur-tot-deurvervoer voor ouderen, hun familie en iedereen die een rit voor een naaste regelt.', details: ['Ritten van deur tot deur', 'Familie kan de boeking regelen', 'Gepland vervoer voor zorgafspraken'], cta: 'Een rit regelen' },
  'recurring-care-rides': { eyebrow: 'Vaste zorgritten', title: 'Zorgvervoer dat met uw routine meeloopt.', description: 'Zijn behandeling, therapie of revalidatie een vast onderdeel van uw week? Vraag ons naar vervoer op vaste momenten.', details: ['Regelmatige ritten rond uw afspraken', 'Ophaal- en retourgegevens samen bespreken', 'Geschikt voor behandel- en therapieschema’s'], cta: 'Vast vervoer bespreken' },
  'healthcare-partners': { eyebrow: 'Voor zorgpartners', title: 'Een duidelijke contactroute voor zorgorganisaties.', description: 'Klinieken, praktijken, revalidatiecentra en zorgorganisaties kunnen Huppie Taxi benaderen om toekomstige vervoersvragen te bespreken.', details: ['Een aanvraagroute voor zorgorganisaties', 'Gesprek over geplande vervoersbehoeften', 'Duidelijke en respectvolle communicatie'], cta: 'Partneraanvraag starten' },
  'about': { eyebrow: 'Over Huppie Taxi', title: 'Vervoer met aandacht voor zorgreizen.', description: 'Huppie Taxi richt zich op betrouwbaar en comfortabel vervoer voor ziekenhuisbezoek, medische afspraken en andere zorggerelateerde ritten.', details: ['Rustige, professionele service', 'Duidelijke afspraken vóór vertrek', 'Aandacht voor stipte en respectvolle ritten'], cta: 'Neem contact op' },
  'contact': { eyebrow: 'Contact en boeken', title: 'Plan uw volgende zorgrit.', description: 'Stuur een korte aanvraag met uw ophaallocatie, bestemming en afspraakgegevens. Wij nemen contact op over de beschikbaarheid.', details: ['Losse ritten', 'Retourritten', 'Aanvragen voor vast vervoer'], cta: 'Ritaanvraag versturen' },
  'faq': { eyebrow: 'Veelgestelde vragen', title: 'Duidelijke antwoorden voor u boekt.', description: 'Lees meer over vooraf boeken, retourritten, het regelen van vervoer voor een naaste en vaste zorgritten.', details: ['Beschikbaarheid hangt af van rit en planning', 'Retourritten zijn bij de boeking bespreekbaar', 'Vergoeding hangt af van verzekeraar en zorgsituatie'], cta: 'Stel uw vraag' }
}

const slug = computed(() => {
  const param = route.params.slug
  return Array.isArray(param) ? (param[0] ?? '') : (param ?? '')
})
const fallbackPage = pages.about!
const page = computed(() => pages[slug.value] ?? fallbackPage)

useSeoMeta({
  title: () => `${page.value.eyebrow} | Huppie Taxi`,
  description: () => page.value.description
})
</script>

<template>
  <div>
    <header class="border-b border-navy-900/10 bg-[#f7f8f6]">
      <div class="section-wrap flex min-h-20 items-center justify-between gap-4">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-4"
        ><span class="flex size-10 items-center justify-center rounded-full bg-navy-900 text-lg font-bold text-white">H</span><span class="text-lg font-bold tracking-tight text-navy-900">Huppie <span class="font-normal">Taxi</span></span></NuxtLink>
        <UButton
          to="/#contact"
          label="Rit aanvragen"
          color="primary"
          size="lg"
        />
      </div>
    </header>

    <main>
      <section class="bg-navy-900 py-18 text-white sm:py-24">
        <div class="section-wrap max-w-5xl">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-sm font-bold text-teal-200 hover:text-white"
          ><UIcon
            name="i-lucide-arrow-left"
            class="size-4"
          />Terug naar startpagina</NuxtLink><p class="eyebrow mt-12 text-teal-200">
            {{ page.eyebrow }}
          </p><h1 class="display-heading mt-4 max-w-4xl text-5xl leading-[1.02] sm:text-6xl">
            {{ page.title }}
          </h1><p class="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
            {{ page.description }}
          </p><UButton
            to="/#contact"
            :label="page.cta"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            size="xl"
            class="mt-9"
          />
        </div>
      </section>
      <section class="section-wrap py-18 sm:py-24">
        <div class="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p class="eyebrow">
              Wat u kunt verwachten
            </p><h2 class="display-heading mt-4 text-4xl sm:text-5xl">
              Een rit met aandacht geregeld.
            </h2><p class="mt-6 max-w-xl leading-7 text-navy-700">
              We richten ons op de praktische details die een reis naar zorg makkelijker maken. Neem vóór uw afspraak contact op om uw rit en de actuele beschikbaarheid te bespreken.
            </p>
          </div><ul class="space-y-4 rounded-2xl bg-teal-50 p-7 sm:p-8">
            <li
              v-for="detail in page.details"
              :key="detail"
              class="flex gap-3 font-semibold text-navy-900"
            >
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-5 shrink-0 text-teal-700"
              />{{ detail }}
            </li>
          </ul>
        </div>
      </section>
      <section class="bg-[#f0f4f3] py-16 text-center sm:py-20">
        <div class="section-wrap max-w-3xl">
          <p class="eyebrow">
            Klaar wanneer u dat bent
          </p><h2 class="display-heading mt-4 text-4xl sm:text-5xl">
            Laten we uw reis eenvoudiger maken.
          </h2><p class="mt-5 leading-7 text-navy-700">
            Dekking of vergoeding van vervoer kan afhangen van uw verzekeraar, zorgsituatie en toestemming. Neem contact op om de mogelijkheden te bespreken.
          </p><UButton
            to="/#contact"
            :label="page.cta"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            size="lg"
            class="mt-8"
          />
        </div>
      </section>
    </main>

    <footer class="bg-navy-900 py-8 text-slate-300">
      <div class="section-wrap flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p class="font-bold text-white">
          Huppie Taxi
        </p><NuxtLink
          to="/"
          class="text-sm hover:text-white"
        >Betrouwbaar zorgvervoer, gepland rond u.</NuxtLink>
      </div>
    </footer>
  </div>
</template>
