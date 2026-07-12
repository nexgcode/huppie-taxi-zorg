<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const supabase = useSupabaseClient()
const { cache } = useAdminSubmissions()

const table = computed<AdminFormTable | null>(() => {
  const type = typeof route.params.type === 'string' ? route.params.type : ''
  return type in adminForms ? type as AdminFormTable : null
})
const updating = ref(false)
const error = ref('')

const title = computed(() => table.value ? adminForms[table.value] : 'Inzending')
const fields = computed(() => Object.entries(submission.value || {}).filter(([key]) => !['id', 'status', 'created_at', 'telegram_notified_at', 'telegram_notification_error'].includes(key)))
const regularFieldCount = computed(() => fields.value.filter(([key]) => key !== 'message').length)

function formatField(key: string) {
  return key.replaceAll('_', ' ').replace(/\b\w/g, character => character.toUpperCase())
}

function formatValue(key: string, value: unknown) {
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nee'
  if (value === null || value === '') return '—'
  if (key.includes('date') || key === 'created_at') return new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long', timeStyle: key === 'created_at' ? 'short' : undefined }).format(new Date(String(value)))
  return String(value)
}

const { data: submission, error: loadError } = await useAsyncData(`admin-submission-${route.params.type}-${route.params.id}`, async () => {
  if (!table.value || typeof route.params.id !== 'string') {
    throw createError({ statusCode: 404, statusMessage: 'Inzending niet gevonden.' })
  }
  const cachedSubmission = cache.value[table.value].find(item => item.id === route.params.id)
  if (cachedSubmission) return cachedSubmission
  const { data, error: loadError } = await supabase.from(table.value).select('*').eq('id', route.params.id).single()
  if (loadError || !data) throw createError({ statusCode: 404, statusMessage: 'Inzending niet gevonden.' })
  return data as Record<string, unknown>
})

if (loadError.value) throw loadError.value

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
    const cachedSubmission = cache.value[table.value].find(item => item.id === route.params.id)
    if (cachedSubmission) cachedSubmission.status = 'handled'
  }
}
</script>

<template>
  <main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
    <UButton
      to="/admin"
      label="Terug naar inbox"
      variant="link"
      leading-icon="i-lucide-arrow-left"
      class="-ml-3"
    />

    <section
      v-if="submission"
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
        <UBadge size="lg">
          {{ submission.status === 'new' ? 'Nieuw' : 'Afgehandeld' }}
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
          <p class="mt-2 break-words leading-7 text-navy-700">
            {{ formatValue(key, value) }}
          </p>
        </li>
      </ul>

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
  </main>
</template>
