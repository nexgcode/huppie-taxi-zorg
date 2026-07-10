<script setup lang="ts">
import { z } from 'zod'

const isFile = (value: unknown) => typeof File !== 'undefined' && value instanceof File

const schema = z.object({
  name: z.string().trim().min(1, 'Vul uw volledige naam in.'),
  company: z.string().trim().min(1, 'Vul uw bedrijfsnaam in.'),
  phone: z.string().trim().min(1, 'Vul uw telefoonnummer in.'),
  email: z.string().trim().email('Vul een geldig e-mailadres in.'),
  kvkNumber: z.string().trim().min(1, 'Vul uw KVK-nummer in.'),
  txCertificate: z.string().refine(value => value === 'Ja' || value === 'Nee', 'Kies of u een TX-keurmerk heeft.'),
  licensePlate: z.string().trim().min(1, 'Vul uw kenteken in.'),
  vehicle: z.string().trim().min(1, 'Vul merk en model in.'),
  driverLicense: z.unknown().refine(isFile, 'Upload uw rijbewijs.'),
  driverCard: z.unknown().refine(isFile, 'Upload uw chauffeurskaart.'),
  vog: z.unknown().refine(isFile, 'Upload uw VOG.'),
  certificates: z.array(z.unknown()).min(1, 'Upload uw aanvullende certificaten.'),
  termsAccepted: z.boolean().refine(value => value, 'U moet de voorwaarden accepteren.')
})

const submitted = ref(false)
const form = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  kvkNumber: '',
  txCertificate: '',
  licensePlate: '',
  vehicle: '',
  driverLicense: null as File | null,
  driverCard: null as File | null,
  vog: null as File | null,
  certificates: [] as File[],
  termsAccepted: false
})

useSeoMeta({
  title: 'Word chauffeur bij Huppie Taxi',
  description: 'Meld u aan als chauffeur bij Huppie Taxi.'
})
</script>

<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-4xl">
        <p class="eyebrow text-teal-100">
          Chauffeurs gezocht
        </p>
        <h1 class="display-heading mt-4 text-5xl leading-[1.02] sm:text-6xl">
          Word chauffeur bij Huppie Taxi.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Meld u aan om zorgvervoer te rijden met aandacht voor cliënten, duidelijke afspraken en een overzichtelijke planning.
        </p>
      </div>
    </section>

    <section class="section-wrap py-14 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div
          v-if="submitted"
          class="rounded-2xl border border-teal-100 bg-teal-50 p-7 sm:p-10"
        >
          <UIcon
            name="i-lucide-check-circle-2"
            class="size-10 text-teal-700"
          />
          <h2 class="display-heading mt-5 text-4xl text-navy-900">
            Bedankt voor uw aanmelding.
          </h2>
          <p class="mt-4 max-w-xl leading-7 text-navy-700">
            Deze demo verstuurt uw gegevens en documenten nog niet. Koppel vóór publicatie een beveiligd aanvraagproces om inzendingen te verwerken.
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
          <div>
            <p class="eyebrow">
              Persoonlijke gegevens
            </p>
            <h2 class="display-heading mt-3 text-4xl text-navy-900">
              Vertel ons over uzelf.
            </h2>
            <div class="mt-8 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="name"
                label="Volledige naam"
                required
              >
                <UInput
                  v-model="form.name"
                  autocomplete="name"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="company"
                label="Bedrijf"
                required
              >
                <UInput
                  v-model="form.company"
                  autocomplete="organization"
                  size="xl"
                  class="w-full"
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
              <UFormField
                name="email"
                label="E-mailadres"
                required
              >
                <UInput
                  v-model="form.email"
                  type="email"
                  autocomplete="email"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>

          <div class="mt-12 border-t border-navy-900/10 pt-10">
            <p class="eyebrow">
              Professionele gegevens
            </p>
            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="kvkNumber"
                label="KVK-nummer"
                required
              >
                <UInput
                  v-model="form.kvkNumber"
                  inputmode="numeric"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="txCertificate"
                label="TX-keurmerk"
                required
              >
                <USelect
                  v-model="form.txCertificate"
                  :items="['Ja', 'Nee']"
                  placeholder="Maak een keuze"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>

          <div class="mt-12 border-t border-navy-900/10 pt-10">
            <p class="eyebrow">
              Voertuiggegevens
            </p>
            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="licensePlate"
                label="Kenteken"
                required
              >
                <UInput
                  v-model="form.licensePlate"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="vehicle"
                label="Merk en model"
                required
              >
                <UInput
                  v-model="form.vehicle"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>

          <div class="mt-12 border-t border-navy-900/10 pt-10">
            <p class="eyebrow">
              Documenten uploaden
            </p>
            <p class="mt-3 leading-7 text-navy-700">
              Upload uw documenten als PDF of afbeelding.
            </p>
            <div class="mt-6 grid gap-5 sm:grid-cols-2">
              <UFormField
                name="driverLicense"
                label="Upload je rijbewijs"
                required
              >
                <UFileUpload
                  v-model="form.driverLicense"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw rijbewijs"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="driverCard"
                label="Upload je chauffeurskaart"
                required
              >
                <UFileUpload
                  v-model="form.driverCard"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw chauffeurskaart"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="vog"
                label="Verklaring Omtrent Gedrag (VOG)"
                required
              >
                <UFileUpload
                  v-model="form.vog"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw VOG"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                name="certificates"
                label="Upload aanvullende certificaten"
                required
              >
                <UFileUpload
                  v-model="form.certificates"
                  multiple
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw certificaten"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>

          <UFormField
            name="termsAccepted"
            class="mt-10"
          >
            <UCheckbox
              v-model="form.termsAccepted"
              label="Ik accepteer de voorwaarden voor aanmelding als chauffeur."
              required
              size="lg"
            />
          </UFormField>

          <UButton
            type="submit"
            label="Aanmelding versturen"
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
