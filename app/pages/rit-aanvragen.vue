<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date'
import { z } from 'zod'

const step = ref(1)
const submitted = ref(false)
const birthDate = shallowRef<CalendarDate | null>(null)
const form = reactive({
  firstName: '',
  lastName: '',
  birthDate: null as unknown,
  email: '',
  phone: '',
  insurer: '',
  policyNumber: '',
  authorisationNumber: '',
  consent: false
})

const insurers = [
  'CZ',
  'DSW',
  'Menzis',
  'VGZ',
  'Zilveren Kruis',
  'Anders'
]

const personalSchema = z.object({
  firstName: z.string().trim().min(1, 'Vul uw voornaam in.'),
  lastName: z.string().trim().min(1, 'Vul uw achternaam in.'),
  birthDate: z.unknown().refine(value => value !== null && value !== undefined, 'Vul uw geboortedatum in.'),
  email: z.string().trim().email('Vul een geldig e-mailadres in.'),
  phone: z.string().trim().min(1, 'Vul uw telefoonnummer in.')
})

const insuranceSchema = z.object({
  insurer: z.string().min(1, 'Kies uw zorgverzekeraar.'),
  policyNumber: z.string().trim().min(1, 'Vul uw polisnummer in.'),
  authorisationNumber: z.string().trim().min(1, 'Vul uw machtigingsnummer in.'),
  consent: z.boolean().refine(value => value, 'Uw toestemming is nodig om door te gaan.')
})

const schema = computed(() => step.value === 1 ? personalSchema : insuranceSchema)

function continueToInsurance() {
  step.value = 2
}

function submitRequest() {
  submitted.value = true
}
</script>

<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-4xl">
        <p class="eyebrow text-teal-100">
          Ritaanvraag
        </p>
        <h1 class="display-heading mt-4 text-5xl leading-[1.02] sm:text-6xl">
          Vraag uw zorgvervoer aan.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Doorloop twee korte stappen. We gebruiken uw gegevens alleen voor het beoordelen en regelen van uw aanvraag.
        </p>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div
          class="mb-10 grid grid-cols-2 gap-3"
          aria-label="Voortgang aanvraag"
        >
          <div
            :class="step === 1 ? 'border-teal-600 bg-teal-50' : 'border-navy-900/15 bg-white'"
            class="rounded-xl border p-4"
          >
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
              Stap 1
            </p>
            <p class="mt-1 font-bold text-navy-900">
              Persoonlijke gegevens
            </p>
          </div>
          <div
            :class="step === 2 ? 'border-teal-600 bg-teal-50' : 'border-navy-900/15 bg-white'"
            class="rounded-xl border p-4"
          >
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
              Stap 2
            </p>
            <p class="mt-1 font-bold text-navy-900">
              Verzekering & toestemming
            </p>
          </div>
        </div>

        <div
          v-if="submitted"
          class="rounded-2xl border border-teal-100 bg-teal-50 p-7 sm:p-10"
        >
          <UIcon
            name="i-lucide-check-circle-2"
            class="size-10 text-teal-700"
          />
          <h2 class="display-heading mt-5 text-4xl text-navy-900">
            Bedankt voor uw aanvraag.
          </h2>
          <p class="mt-4 max-w-xl leading-7 text-navy-700">
            Deze demo slaat of verstuurt uw persoonsgegevens en verzekeringsgegevens nog niet op. Koppel vóór publicatie een beveiligd aanvraagproces om inzendingen te verwerken.
          </p>
          <UButton
            to="/"
            label="Terug naar startpagina"
            color="primary"
            class="mt-7"
          />
        </div>

        <UForm
          v-else
          :schema="schema"
          :state="form"
          :validate-on="['blur']"
          class="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-sm sm:p-10"
          @submit="step === 1 ? continueToInsurance() : submitRequest()"
        >
          <template v-if="step === 1">
            <p class="eyebrow">
              Stap 1 van 2
            </p>
            <h2 class="display-heading mt-3 text-4xl text-navy-900">
              Uw gegevens
            </h2>
            <p class="mt-4 leading-7 text-navy-700">
              Vul de gegevens in waarop wij u kunnen bereiken over uw aanvraag.
            </p>

            <div class="mt-8 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="firstName"
                label="Voornaam"
                required
              >
                <UInput
                  v-model="form.firstName"
                  autocomplete="given-name"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="lastName"
                label="Achternaam"
                required
              >
                <UInput
                  v-model="form.lastName"
                  autocomplete="family-name"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="birthDate"
                label="Geboortedatum"
                required
              >
                <UInputDate
                  v-model="birthDate"
                  locale="nl-NL"
                  size="xl"
                  class="w-full"
                  @update:model-value="form.birthDate = $event"
                />
              </UFormField>
              <UFormField
                name="phone"
                label="Telefoonnummer"
                required
              >
                <UInput
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
            <UFormField
              name="email"
              label="E-mailadres"
              required
              class="mt-5"
            >
              <UInput
                v-model="form.email"
                type="email"
                autocomplete="email"
                size="xl"
                class="w-full"
              />
            </UFormField>
            <UButton
              type="submit"
              label="Verder naar verzekering"
              trailing-icon="i-lucide-arrow-right"
              color="primary"
              size="xl"
              class="mt-8 w-full justify-center sm:w-auto"
            />
          </template>

          <template v-else>
            <p class="eyebrow">
              Stap 2 van 2
            </p>
            <h2 class="display-heading mt-3 text-4xl text-navy-900">
              Verzekering & toestemming
            </h2>
            <p class="mt-4 leading-7 text-navy-700">
              Met deze gegevens kunnen wij uw aanvraag voor zorgvervoer voorbereiden.
            </p>

            <div class="mt-8 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="insurer"
                label="Zorgverzekeraar"
                required
              >
                <USelect
                  v-model="form.insurer"
                  :items="insurers"
                  placeholder="Kies uw zorgverzekeraar"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="policyNumber"
                label="Polisnummer"
                required
              >
                <UInput
                  v-model="form.policyNumber"
                  autocomplete="off"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
            <UFormField
              name="authorisationNumber"
              label="Machtigingsnummer"
              required
              class="mt-5"
            >
              <UInput
                v-model="form.authorisationNumber"
                autocomplete="off"
                size="xl"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="consent"
              class="mt-6 rounded-xl bg-navy-50 p-5"
            >
              <UCheckbox
                v-model="form.consent"
                required
                label="Ik geef Huppie Taxi toestemming om namens mij contact op te nemen met mijn zorgverzekeraar over deze aanvraag voor zorgvervoer."
                size="lg"
              />
              <p class="mt-3 pl-8 text-sm leading-6 text-navy-700">
                Deze toestemming geldt alleen voor het bespreken en regelen van de zorgvervoeraanvraag die u hier indient.
              </p>
            </UFormField>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <UButton
                label="Vorige stap"
                variant="outline"
                color="neutral"
                size="xl"
                class="justify-center"
                @click="step = 1"
              />
              <UButton
                type="submit"
                label="Aanvraag afronden"
                trailing-icon="i-lucide-arrow-right"
                color="primary"
                size="xl"
                class="justify-center"
              />
            </div>
          </template>
        </UForm>
      </div>
    </section>
  </main>
</template>
