import type { Database } from '~/types/database.types'

export const adminForms = {
  contact_submissions: 'Contactformulier',
  ride_requests: 'Ritaanvraag',
  partner_requests: 'Partneraanvraag',
  driver_applications: 'Chauffeursaanmelding'
} as const

export type AdminFormTable = keyof typeof adminForms
export type AdminSubmission = Record<string, unknown> & { id: string, created_at: string, status: string }

const tables = Object.keys(adminForms) as AdminFormTable[]

export const useFormsStore = defineStore('forms', () => {
  const cache = ref<Record<AdminFormTable, AdminSubmission[]>>({
    contact_submissions: [],
    ride_requests: [],
    partner_requests: [],
    driver_applications: []
  })
  const loaded = ref(false)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const sections = computed(() => {
    return tables.map(table => ({
      title: adminForms[table],
      table,
      items: [...cache.value[table]].sort((a, b) => {
        const statusOrder = Number(a.status !== 'new') - Number(b.status !== 'new')
        return statusOrder || new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    }))
  })

  async function loadAll() {
    if (loaded.value) {
      loading.value = false
      return
    }

    loading.value = true
    error.value = null
    const supabase = useSupabaseClient<Database>()
    try {
      const results = await Promise.all(tables.map(async (table) => {
        const { data, error: requestError } = await supabase.from(table).select('*').order('created_at', { ascending: false })
        if (requestError) throw requestError
        return [table, data as unknown as AdminSubmission[]] as const
      }))
      for (const [table, submissions] of results) cache.value[table] = submissions
      loaded.value = true
    } catch {
      error.value = 'De inzendingen konden niet worden geladen. Probeer de pagina opnieuw te laden.'
    } finally {
      loading.value = false
    }
  }

  return { cache, loaded, loading, error, sections, loadAll }
})
