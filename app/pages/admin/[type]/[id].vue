<script setup lang="ts">
import type { Database } from '~/types/database.types'
import { adminForms, type AdminFormTable, useFormsStore } from '~/stores/forms'

definePageMeta({ layout: 'admin', middleware: 'admin' })

type DriverDocument = Database['public']['Tables']['driver_application_documents']['Row']

const route = useRoute()
const supabase = useSupabaseClient<Database>()
const forms = useFormsStore()

const table = computed<AdminFormTable | null>(() => {
  const type = typeof route.params.type === 'string' ? route.params.type : ''
  return type in adminForms ? type as AdminFormTable : null
})
const updating = ref(false)
const error = ref('')
const loading = ref(true)
const submission = ref<Record<string, unknown> | null>(null)
const documents = ref<DriverDocument[]>([])
const documentUrls = ref<Record<string, string>>({})
const documentsLoading = ref(false)
const documentsError = ref('')
const downloadingDocumentId = ref<string | null>(null)

const title = computed(() => table.value ? adminForms[table.value] : 'Inzending')
const fields = computed(() => Object.entries(submission.value || {}).filter(([key]) => !['id', 'status', 'created_at', 'telegram_notified_at', 'telegram_notification_error'].includes(key)))
const regularFieldCount = computed(() => fields.value.filter(([key]) => key !== 'message').length)

function formatField(key: string) {
  const labels: Record<string, string> = {
    name: 'Volledige naam',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
    message: 'Bericht',
    first_name: 'Voornaam',
    last_name: 'Achternaam',
    birth_date: 'Geboortedatum',
    insurer: 'Zorgverzekeraar',
    has_transport_authorisation: 'Vervoersmachtiging aanwezig',
    authorisation_number: 'Machtigingsnummer',
    contact_consent: 'Toestemming voor contact',
    appointment_date: 'Gewenste datum',
    appointment_time: 'Gewenste tijd',
    company: 'Bedrijf',
    kvk_number: 'KvK-nummer',
    tx_certificate: 'TX-keurmerk',
    license_plate: 'Kenteken',
    vehicle: 'Merk en model',
    terms_accepted_at: 'Voorwaarden geaccepteerd op'
  }
  if (labels[key]) return labels[key]
  return key.replaceAll('_', ' ').replace(/\b\w/g, character => character.toUpperCase())
}

function formatValue(key: string, value: unknown) {
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nee'
  if (value === null || value === '') return '—'
  if (key === 'appointment_time') return String(value).slice(0, 5)
  if (key.includes('date') || key === 'created_at' || key === 'terms_accepted_at') return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long', timeStyle: key === 'terms_accepted_at' ? 'medium' : key === 'created_at' ? 'short' : undefined }).format(new Date(String(value)))
  return String(value)
}

function documentLabel(type: string) {
  return type === 'driver_license' ? 'Rijbewijs' : type === 'driver_card' ? 'Chauffeurskaart' : type
}

function isImageDocument(driverDocument: DriverDocument) {
  return driverDocument.content_type.startsWith('image/')
}

function isPdfDocument(driverDocument: DriverDocument) {
  return driverDocument.content_type === 'application/pdf'
}

async function loadDocuments() {
  if (table.value !== 'driver_applications' || typeof route.params.id !== 'string') return
  documentsLoading.value = true
  documentsError.value = ''
  const { data, error: requestError } = await supabase
    .from('driver_application_documents')
    .select('*')
    .eq('application_id', route.params.id)
    .order('created_at')
  if (requestError || !data) {
    documentsError.value = 'De documenten konden niet worden geladen. Probeer het opnieuw.'
    documentsLoading.value = false
    return
  }
  documents.value = data
  if (!data.length) {
    documentsLoading.value = false
    return
  }
  const { data: signedUrls, error: signedUrlsError } = await supabase.storage
    .from('driver-application-documents')
    .createSignedUrls(data.map(driverDocument => driverDocument.object_path), 60 * 60)
  if (signedUrlsError) documentsError.value = 'De documenten konden niet worden geopend. Probeer het opnieuw.'
  else documentUrls.value = Object.fromEntries(signedUrls.filter(item => item.signedUrl).map(item => [item.path, item.signedUrl]))
  documentsLoading.value = false
}

async function downloadDocument(driverDocument: DriverDocument) {
  downloadingDocumentId.value = driverDocument.id
  documentsError.value = ''
  const { data, error: downloadError } = await supabase.storage.from('driver-application-documents').download(driverDocument.object_path)
  downloadingDocumentId.value = null
  if (downloadError || !data) {
    documentsError.value = 'Het document kon niet worden gedownload. Probeer het opnieuw.'
    return
  }
  const url = URL.createObjectURL(data)
  const link = globalThis.document.createElement('a')
  link.href = url
  link.download = driverDocument.original_filename
  link.click()
  URL.revokeObjectURL(url)
}

async function loadSubmission() {
  if (!table.value || typeof route.params.id !== 'string') {
    error.value = 'Deze inzending is niet gevonden.'
    loading.value = false
    return
  }

  const cachedSubmission = forms.cache[table.value].find(item => item.id === route.params.id)
  if (cachedSubmission) {
    submission.value = cachedSubmission
    loading.value = false
    return
  }

  try {
    const { data, error: requestError } = await supabase.from(table.value).select('*').eq('id', route.params.id).single()
    if (requestError || !data) error.value = 'Deze inzending kon niet worden geladen. Probeer het opnieuw.'
    else submission.value = data as Record<string, unknown>
  } catch {
    error.value = 'Deze inzending kon niet worden geladen. Probeer het opnieuw.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadSubmission(), loadDocuments()])
})

async function markHandled() {
  if (!table.value || typeof route.params.id !== 'string') return
  updating.value = true
  error.value = ''
  const { data, error: updateError } = await supabase.from(table.value).update({ status: 'handled' }).eq('id', route.params.id).select('status').single()
  updating.value = false
  if (updateError || !data) {
    error.value = 'De inzending kon niet worden bijgewerkt. Probeer het opnieuw.'
    return
  }
  if (submission.value) submission.value.status = 'handled'
  if (table.value) {
    const cachedSubmission = forms.cache[table.value].find(item => item.id === route.params.id)
    if (cachedSubmission) cachedSubmission.status = 'handled'
  }
}
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
    <UButton
      to="/admin"
      label="Terug naar overzicht"
      variant="link"
      leading-icon="i-lucide-arrow-left"
      class="-ml-3"
    />

    <section
      v-if="loading"
      class="mt-5"
      aria-busy="true"
      aria-label="Inzending laden"
    >
      <div class="border-b border-navy-900/10 pb-6">
        <USkeleton class="h-4 w-24" />
        <USkeleton class="mt-4 h-10 w-64" />
        <USkeleton class="mt-4 h-6 w-72" />
      </div>
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <USkeleton
          v-for="index in 6"
          :key="index"
          class="h-28 w-full rounded-xl"
        />
      </div>
    </section>

    <section
      v-else-if="submission"
      class="mt-5"
    >
      <div class="flex flex-wrap items-start justify-between gap-5 border-b border-navy-900/10 pb-6">
        <div>
          <p class="eyebrow">
            Inzending
          </p>
          <h1 class="display-heading mt-3 text-3xl text-navy-900 sm:text-4xl">
            {{ title }}
          </h1>
          <p class="mt-3 text-navy-700">
            Ontvangen op {{ formatValue('created_at', submission.created_at) }}
          </p>
        </div>
        <UBadge
          v-if="submission.status === 'new'"
          size="lg"
        >
          Nieuw
        </UBadge>
        <UBadge
          v-else
          size="lg"
          color="secondary"
          variant="subtle"
        >
          Afgehandeld
        </UBadge>
      </div>

      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li
          v-for="([key, value], index) in fields"
          :key="key"
          :class="key === 'message' || (key !== 'message' && index === regularFieldCount - 1 && regularFieldCount % 2 === 1) ? 'sm:col-span-2' : ''"
          class="rounded-xl border border-navy-900/10 bg-white p-4 shadow-sm"
        >
          <p class="text-sm font-bold text-navy-900">
            {{ formatField(key) }}
          </p>
          <p class="mt-2 wrap-break-word leading-7 text-navy-700">
            {{ formatValue(key, value) }}
          </p>
        </li>
      </ul>

      <section
        v-if="table === 'driver_applications'"
        class="mt-8"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="eyebrow">
              Documenten
            </p>
            <h2 class="mt-2 text-2xl font-bold text-navy-900">
              Geüploade documenten
            </h2>
          </div>
          <UBadge variant="subtle">
            {{ documents.length }} document{{ documents.length === 1 ? '' : 'en' }}
          </UBadge>
        </div>

        <div
          v-if="documentsLoading"
          class="mt-5 grid gap-4 sm:grid-cols-2"
          aria-busy="true"
          aria-label="Documenten laden"
        >
          <USkeleton
            v-for="index in 2"
            :key="index"
            class="h-80 w-full rounded-xl"
          />
        </div>
        <UAlert
          v-else-if="documentsError"
          class="mt-5"
          color="error"
          variant="subtle"
          :description="documentsError"
        />
        <UAlert
          v-else-if="!documents.length"
          class="mt-5"
          color="neutral"
          variant="subtle"
          title="Geen documenten gevonden"
          description="Voor deze chauffeursaanmelding zijn geen documenten opgeslagen."
        />
        <div
          v-else
          class="mt-5 grid gap-4 sm:grid-cols-2"
        >
          <UCard
            v-for="driverDocument in documents"
            :key="driverDocument.id"
            :title="documentLabel(driverDocument.document_type)"
            :description="driverDocument.original_filename"
          >
            <img
              v-if="isImageDocument(driverDocument) && documentUrls[driverDocument.object_path]"
              :src="documentUrls[driverDocument.object_path]"
              :alt="`${documentLabel(driverDocument.document_type)} van ${submission.name || 'de chauffeur'}`"
              class="h-56 w-full rounded-lg bg-slate-50 object-contain"
            >
            <iframe
              v-else-if="isPdfDocument(driverDocument) && documentUrls[driverDocument.object_path]"
              :src="documentUrls[driverDocument.object_path]"
              :title="driverDocument.original_filename"
              class="h-56 w-full rounded-lg border border-navy-900/10"
            />
            <div
              v-else
              class="flex h-56 items-center justify-center rounded-lg bg-slate-50 text-navy-700"
            >
              <UIcon
                name="i-lucide-file"
                class="size-10"
              />
            </div>

            <template #footer>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-if="documentUrls[driverDocument.object_path]"
                  :to="documentUrls[driverDocument.object_path]"
                  target="_blank"
                  label="Bekijken"
                  icon="i-lucide-external-link"
                  color="neutral"
                  variant="outline"
                />
                <UButton
                  label="Downloaden"
                  icon="i-lucide-download"
                  :loading="downloadingDocumentId === driverDocument.id"
                  @click="downloadDocument(driverDocument)"
                />
              </div>
            </template>
          </UCard>
        </div>
      </section>

      <UButton
        v-if="submission.status === 'new'"
        label="Markeren als afgehandeld"
        icon="i-lucide-check"
        color="primary"
        size="xl"
        :loading="updating"
        class="mt-8"
        @click="markHandled"
      />
      <p
        v-if="error"
        class="mt-4 text-sm font-medium text-red-700"
        role="alert"
      >
        {{ error }}
      </p>
    </section>

    <p
      v-else
      class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-800"
      role="alert"
    >
      {{ error || 'Deze inzending is niet gevonden.' }}
    </p>
  </main>
</template>
