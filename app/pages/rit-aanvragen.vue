<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { z } from 'zod'

const step = ref(1)
const submitted = ref(false)
const forms = useForms()
const insuranceSubmitAttempted = ref(false)
const birthDate = shallowRef<CalendarDate | null>(null)
const todayDate = today(getLocalTimeZone())
const minBirthDate = todayDate.subtract({ years: 120 })
const maxBirthDate = todayDate
const form = reactive({
  firstName: '',
  lastName: '',
  birthDate: null as unknown,
  email: '',
  phone: '',
  insurer: '',
  hasTransportAuthorisation: '',
  authorisationNumber: '',
  contactConsent: false
})

const insurers = [
  'CZ', 'DSW', 'Menzis', 'VGZ', 'Zilveren Kruis', 'a.s.r.', 'Anderzorg', 'Bewuzt',
  'CZdirect', 'De Friesland', 'FBTO', 'HollandZorg', 'IZA', 'IZZ', 'Just',
  'Nationale-Nederlanden', 'OHRA', 'ONVZ', 'Salland', 'Univé', 'UnitedConsumers',
  'VvAA', 'Zorg en Zekerheid', 'Anders'
]

const transportAuthorisationOptions = [
  { label: 'Ja, ik heb al toestemming', value: 'yes' },
  { label: 'Nee, of ik weet het niet', value: 'no' }
]

const personalSchema = z.object({
  firstName: z.string().trim().min(1, 'Vul uw voornaam in.'),
  lastName: z.string().trim().min(1, 'Vul uw achternaam in.'),
  birthDate: z.unknown()
    .refine(value => value instanceof CalendarDate, 'Vul uw geboortedatum in.')
    .refine((value) => {
      if (!(value instanceof CalendarDate)) return false
      return value.compare(minBirthDate) >= 0 && value.compare(maxBirthDate) <= 0
    }, 'Vul een geldige geboortedatum in.'),
  email: z.string().trim().email('Vul een geldig e-mailadres in.'),
  phone: z.string().trim().min(1, 'Vul uw telefoonnummer in.')
})

const insuranceSchema = z.object({
  insurer: z.string().min(1, 'Kies uw zorgverzekeraar.'),
  hasTransportAuthorisation: z.string().optional(),
  authorisationNumber: z.string().trim(),
  contactConsent: z.boolean()
}).superRefine((value, ctx) => {
  if (value.hasTransportAuthorisation === 'yes' && !value.contactConsent && !value.authorisationNumber) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['authorisationNumber'],
      message: 'Vul uw machtigingsnummer in.'
    })
  }
})

usePageSeo({
  title: 'Zorgvervoer aanvragen',
  description: 'Vraag zorgvervoer aan bij Huppie Taxi. Uw aanvraag wordt zorgvuldig behandeld.',
  path: '/rit-aanvragen',
  noindex: true
})

defineOgImage('Huppie', {
  title: 'Zorgvervoer aanvragen',
  description: 'Vraag zorgvervoer aan bij Huppie Taxi. Uw aanvraag wordt zorgvuldig behandeld.'
})

const schema = computed(() => step.value === 1 ? personalSchema : insuranceSchema)
const isStepOneComplete = computed(() => personalSchema.safeParse(form).success)
const hasAuthorisationSelectionError = computed(() => insuranceSubmitAttempted.value && !form.hasTransportAuthorisation)

watch(() => form.contactConsent, (wantsHelp) => {
  if (wantsHelp) form.authorisationNumber = ''
})

watch(() => form.hasTransportAuthorisation, (hasAuthorisation) => {
  if (hasAuthorisation === 'yes') form.contactConsent = false
}, { flush: 'sync' })

function continueToInsurance() {
  step.value = 2
}

async function submitRequest() {
  insuranceSubmitAttempted.value = true
  if (!form.hasTransportAuthorisation) return
  await forms.submitRide({
    first_name: form.firstName,
    last_name: form.lastName,
    birth_date: birthDate.value?.toString() || '',
    email: form.email,
    phone: form.phone,
    insurer: form.insurer,
    has_transport_authorisation: form.hasTransportAuthorisation === 'yes',
    authorisation_number: form.hasTransportAuthorisation === 'yes' ? form.authorisationNumber : null,
    contact_consent: form.contactConsent
  })
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
          <button
            type="button"
            :aria-current="step === 1 ? 'step' : undefined"
            :class="step === 1 ? 'border-teal-600 bg-teal-50' : 'border-navy-900/15 bg-white'"
            class="min-h-24 w-full cursor-pointer rounded-xl border p-4 text-left transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            @click="step = 1"
          >
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
              Stap 1
            </p>
            <p class="mt-1 font-bold text-navy-900">
              Persoonlijke gegevens
            </p>
          </button>
          <button
            type="button"
            :aria-current="step === 2 ? 'step' : undefined"
            :class="step === 2 ? 'border-teal-600 bg-teal-50' : 'border-navy-900/15 bg-white'"
            class="min-h-24 w-full cursor-pointer rounded-xl border p-4 text-left transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!isStepOneComplete"
            @click="step = 2"
          >
            <p class="text-xs font-bold uppercase tracking-[0.15em] text-teal-700">
              Stap 2
            </p>
            <p class="mt-1 font-bold text-navy-900">
              Verzekering & toestemming
            </p>
          </button>
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
            We hebben uw aanvraag ontvangen en nemen contact met u op over de vervolgstappen.
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
                  aria-required="true"
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
                  aria-required="true"
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
                  :min-value="minBirthDate"
                  :max-value="maxBirthDate"
                  aria-required="true"
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
                  aria-required="true"
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
                aria-required="true"
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
              :loading="forms.submitting"
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
              Regel eerst toestemming voor ziekenvervoer bij uw zorgverzekeraar. Daarna kunnen wij u helpen met het plannen van uw rit.
            </p>

            <div class="mt-8">
              <UFormField
                name="insurer"
                label="Zorgverzekeraar"
                required
              >
                <USelectMenu
                  v-model="form.insurer"
                  :items="insurers"
                  placeholder="Kies uw zorgverzekeraar"
                  :search-input="{ placeholder: 'Zoek uw zorgverzekeraar' }"
                  aria-required="true"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
            <div class="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-5">
              <p class="font-bold text-navy-900">
                Vraag een vervoersmachtiging aan bij uw zorgverzekeraar.
              </p>
              <p class="mt-2 text-sm leading-6 text-navy-700">
                Vraag naar het aanvraagformulier voor zittend ziekenvervoer of een vervoersmachtiging. Uw zorgverzekeraar beslist of uw vervoer wordt vergoed.
              </p>
              <p class="mt-3 text-sm font-medium leading-6 text-navy-900">
                Kunt u het formulier niet vinden? Neem contact op met uw zorgverzekeraar of met ons; wij helpen u graag op weg.
              </p>
            </div>
            <UFormField
              name="hasTransportAuthorisation"
              label="Heeft u al toestemming voor ziekenvervoer?"
              required
              :error="hasAuthorisationSelectionError ? 'Kies of u al toestemming voor ziekenvervoer heeft.' : false"
              class="mt-5"
            >
              <URadioGroup
                v-model="form.hasTransportAuthorisation"
                :items="transportAuthorisationOptions"
                aria-required="true"
                :aria-invalid="hasAuthorisationSelectionError"
                :color="hasAuthorisationSelectionError ? 'error' : 'primary'"
                orientation="vertical"
                size="lg"
              />
            </UFormField>

            <div
              v-if="form.hasTransportAuthorisation === 'yes'"
              class="mt-5 rounded-xl border border-teal-100 bg-teal-50 p-5"
            >
              <UFormField
                name="authorisationNumber"
                label="Machtigingsnummer"
                required
              >
                <UInput
                  v-model="form.authorisationNumber"
                  autocomplete="off"
                  aria-required="true"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <p class="mt-3 text-sm leading-6 text-navy-700">
                U vindt dit nummer in de brief of e-mail van uw zorgverzekeraar.
              </p>
            </div>

            <UFormField
              v-if="form.hasTransportAuthorisation === 'no'"
              class="mt-6 rounded-xl bg-navy-50 p-5"
            >
              <UCheckbox
                v-model="form.contactConsent"
                label="Ik wil dat Huppie Taxi mij helpt met het regelen van deze aanvraag."
                size="lg"
              />
              <p class="mt-3 pl-8 text-sm leading-6 text-navy-700">
                Dit geeft Huppie Taxi geen algemene machtiging. Uw zorgverzekeraar kan een eigen formulier of toestemming vragen voordat zij gegevens met ons bespreken.
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
                :loading="forms.submitting"
                class="justify-center"
              />
              <p
                v-if="forms.error"
                class="col-span-2 mt-2 text-sm font-medium text-red-700"
                role="alert"
              >
                {{ forms.error }}
              </p>
            </div>
          </template>
        </UForm>
      </div>
    </section>
  </main>
</template>
