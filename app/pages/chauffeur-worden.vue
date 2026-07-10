<script setup lang="ts">
const submitted = ref(false)
const errors = reactive<Record<string, string>>({})
const driverLicense = shallowRef<File | null>(null)
const driverCard = shallowRef<File | null>(null)
const vog = shallowRef<File | null>(null)
const certificates = shallowRef<File[]>([])

const form = reactive({
  name: '',
  company: '',
  phone: '',
  email: '',
  kvkNumber: '',
  txCertificate: '',
  licensePlate: '',
  vehicle: '',
  termsAccepted: false
})

function submitApplication() {
  Object.assign(errors, {
    name: '',
    company: '',
    phone: '',
    email: '',
    kvkNumber: '',
    txCertificate: '',
    licensePlate: '',
    vehicle: '',
    driverLicense: '',
    driverCard: '',
    vog: '',
    certificates: '',
    termsAccepted: ''
  })

  if (!form.name.trim()) errors.name = 'Vul uw volledige naam in.'
  if (!form.company.trim()) errors.company = 'Vul uw bedrijfsnaam in.'
  if (!form.phone.trim()) errors.phone = 'Vul uw telefoonnummer in.'
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Vul een geldig e-mailadres in.'
  if (!form.kvkNumber.trim()) errors.kvkNumber = 'Vul uw KVK-nummer in.'
  if (!form.txCertificate) errors.txCertificate = 'Kies of u een TX-keurmerk heeft.'
  if (!form.licensePlate.trim()) errors.licensePlate = 'Vul uw kenteken in.'
  if (!form.vehicle.trim()) errors.vehicle = 'Vul merk en model in.'
  if (!driverLicense.value) errors.driverLicense = 'Upload uw rijbewijs.'
  if (!driverCard.value) errors.driverCard = 'Upload uw chauffeurskaart.'
  if (!vog.value) errors.vog = 'Upload uw VOG.'
  if (!certificates.value.length) errors.certificates = 'Upload uw aanvullende certificaten.'
  if (!form.termsAccepted) errors.termsAccepted = 'U moet de voorwaarden accepteren.'

  if (!Object.values(errors).some(Boolean)) submitted.value = true
}

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

        <form
          v-else
          class="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-sm sm:p-10"
          @submit.prevent="submitApplication"
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
                label="Volledige naam"
                :error="errors.name || undefined"
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
                label="Bedrijf"
                :error="errors.company || undefined"
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
                label="Telefoonnummer"
                :error="errors.phone || undefined"
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
                label="E-mailadres"
                :error="errors.email || undefined"
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
                label="KVK-nummer"
                :error="errors.kvkNumber || undefined"
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
                label="TX-keurmerk"
                :error="errors.txCertificate || undefined"
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
                label="Kenteken"
                :error="errors.licensePlate || undefined"
                required
              >
                <UInput
                  v-model="form.licensePlate"
                  size="xl"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Merk en model"
                :error="errors.vehicle || undefined"
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
                label="Upload je rijbewijs"
                :error="errors.driverLicense || undefined"
                required
              >
                <UFileUpload
                  v-model="driverLicense"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw rijbewijs"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Upload je chauffeurskaart"
                :error="errors.driverCard || undefined"
                required
              >
                <UFileUpload
                  v-model="driverCard"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw chauffeurskaart"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Verklaring Omtrent Gedrag (VOG)"
                :error="errors.vog || undefined"
                required
              >
                <UFileUpload
                  v-model="vog"
                  accept="application/pdf,image/*"
                  variant="area"
                  size="xl"
                  label="Kies uw VOG"
                  description="PDF, JPG of PNG"
                  class="w-full"
                />
              </UFormField>
              <UFormField
                label="Upload aanvullende certificaten"
                :error="errors.certificates || undefined"
                required
              >
                <UFileUpload
                  v-model="certificates"
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
            :error="errors.termsAccepted || undefined"
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
        </form>
      </div>
    </section>
  </main>
</template>
