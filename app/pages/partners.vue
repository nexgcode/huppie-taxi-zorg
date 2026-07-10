<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { z } from 'zod'

const benefits = [
  { icon: 'i-lucide-calendar-clock', title: 'Slim gepland vervoer', text: 'Ons systeem verdeelt zorgritten automatisch over beschikbare chauffeurs, zodat de planning overzichtelijk blijft.' },
  { icon: 'i-lucide-route', title: 'Duidelijk overzicht', text: 'We stemmen ritten af op afspraakmomenten en houden de praktische details voor uw organisatie helder.' },
  { icon: 'i-lucide-message-square-heart', title: 'Feedback van cliënten', text: 'Met ons feedbacksysteem verzamelen we ervaringen van cliënten en gebruiken we die om de dienstverlening te verbeteren.' },
  { icon: 'i-lucide-handshake', title: 'Een betrokken partner', text: 'U heeft één duidelijke contactroute voor vragen over geplande zorgvervoerbehoeften.' }
]

const timeOptions = Array.from({ length: 37 }, (_, index) => {
  const minutes = 9 * 60 + index * 15
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
})

const minAppointmentDate = today(getLocalTimeZone())
const maxAppointmentDate = minAppointmentDate.add({ years: 1 })

const schema = z.object({
  email: z.string().trim().email('Vul een geldig e-mailadres in.'),
  appointmentDate: z.unknown()
    .refine(value => value instanceof CalendarDate, 'Kies een afspraakdatum.')
    .refine((value) => {
      if (!(value instanceof CalendarDate)) return false
      return value.compare(minAppointmentDate) >= 0 && value.compare(maxAppointmentDate) <= 0
    }, 'Kies een datum binnen het komende jaar.'),
  time: z.string().refine(time => timeOptions.includes(time), 'Kies een tijd tussen 09:00 en 18:00.')
})

const submitted = ref(false)
const appointmentDate = shallowRef<CalendarDate | null>(null)
const form = reactive({
  email: '',
  appointmentDate: null as unknown,
  time: ''
})

usePageSeo({
  title: 'Partner worden voor zorgvervoer',
  description: 'Werk samen met Huppie Taxi voor betrouwbaar, gepland en overzichtelijk zorgvervoer voor uw cliënten.',
  path: '/partners'
})

defineOgImage('Huppie', {
  title: 'Partner worden voor zorgvervoer',
  description: 'Werk samen met Huppie Taxi voor betrouwbaar, gepland en overzichtelijk zorgvervoer voor uw cliënten.'
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
        <div
          v-if="submitted"
          class="rounded-2xl border border-teal-100 bg-teal-50 p-7 sm:p-10"
        >
          <UIcon
            name="i-lucide-check-circle-2"
            class="size-10 text-teal-700"
          />
          <h2 class="display-heading mt-5 text-4xl text-navy-900">
            Bedankt voor uw interesse.
          </h2>
          <p class="mt-4 max-w-xl leading-7 text-navy-700">
            Deze demo verstuurt uw aanvraag nog niet. Koppel vóór publicatie een beveiligd contactproces om inzendingen te verwerken.
          </p>
        </div>

        <UForm
          v-else
          :schema="schema"
          :state="form"
          :validate-on="['blur']"
          class="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-sm sm:p-10"
          @submit="submitted = true"
        >
          <p class="eyebrow">
            Partner worden
          </p>
          <h2 class="display-heading mt-3 text-4xl text-navy-900">
            Plan een kennismaking.
          </h2>
          <p class="mt-4 leading-7 text-navy-700">
            Kies een datum binnen het komende jaar en een tijd tussen 09:00 en 18:00 uur. We nemen contact met u op om de afspraak te bevestigen.
          </p>

          <UFormField
            name="email"
            label="E-mailadres"
            required
            class="mt-8"
          >
            <UInput
              v-model="form.email"
              type="email"
              autocomplete="email"
              aria-required="true"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <UFormField
              name="appointmentDate"
              label="Voorkeursdatum"
              required
            >
              <UInputDate
                v-model="appointmentDate"
                :min-value="minAppointmentDate"
                :max-value="maxAppointmentDate"
                aria-required="true"
                locale="nl-NL"
                size="xl"
                class="w-full"
                @update:model-value="form.appointmentDate = $event"
              />
            </UFormField>
            <UFormField
              name="time"
              label="Voorkeurstijd"
              help="Beschikbaar van 09:00 tot 18:00 uur."
              required
            >
              <USelect
                v-model="form.time"
                :items="timeOptions"
                placeholder="Kies een tijd"
                aria-required="true"
                size="xl"
                class="w-full"
              />
            </UFormField>
          </div>

          <UButton
            type="submit"
            label="Kennismaking aanvragen"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            size="xl"
            class="mt-8 w-full justify-center sm:w-auto"
          />
        </UForm>
      </div>
    </section>
  </main>
</template>
