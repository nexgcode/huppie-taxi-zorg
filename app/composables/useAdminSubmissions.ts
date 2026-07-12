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

export function useAdminSubmissions() {
  const cache = useState<Record<AdminFormTable, AdminSubmission[]>>('admin-submissions', () => ({
    contact_submissions: [],
    ride_requests: [],
    partner_requests: [],
    driver_applications: []
  }))
  const loaded = useState('admin-submissions-loaded', () => false)

  function sections() {
    return tables.map(table => ({ title: adminForms[table], table, items: cache.value[table] }))
  }

  async function loadAll() {
    if (loaded.value) return sections()
    const supabase = useSupabaseClient<Database>()
    const results = await Promise.all(tables.map(async (table) => {
      const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false })
      if (error) throw error
      return [table, data as unknown as AdminSubmission[]] as const
    }))
    for (const [table, submissions] of results) cache.value[table] = submissions
    loaded.value = true
    return sections()
  }

  return { cache, loaded, sections, loadAll }
}
