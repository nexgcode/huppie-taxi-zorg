<script setup lang="ts">
import type { Database } from '~/types/database.types'
import { adminForms, type AdminFormTable, useFormsStore } from '~/stores/forms'

definePageMeta({ layout: 'admin', middleware: 'admin' })

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

onMounted(loadSubmission)

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
      label="Terug naar inbox"
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

    <p
      v-else
      class="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-800"
      role="alert"
    >
      {{ error || 'Deze inzending is niet gevonden.' }}
    </p>
  </main>
</template>
