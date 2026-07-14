import type { TablesInsert } from '~/types/database.types'

type FormType = 'contact' | 'ride' | 'partner' | 'driver'
type DriverDocumentType = 'driver_license' | 'driver_card'

type FormPayloads = {
  contact: TablesInsert<'contact_submissions'>
  ride: TablesInsert<'ride_requests'>
  partner: TablesInsert<'partner_requests'>
  driver: TablesInsert<'driver_applications'>
}

type DriverDocument = { type: DriverDocumentType, file: File }

export function useForms() {
  const submitting = ref(false)
  const error = ref<string | null>(null)

  async function submit<T>(action: () => Promise<T>) {
    submitting.value = true
    error.value = null
    try {
      return await action()
    } catch (caught) {
      error.value = 'Er is iets misgegaan. Probeer het later opnieuw.'
      throw caught
    } finally {
      submitting.value = false
    }
  }

  function submitForm<T extends Exclude<FormType, 'driver'>>(type: T, payload: FormPayloads[T]) {
    return submit(() => $fetch('/api/forms', { method: 'POST', body: { type, payload } }))
  }

  function submitContact(payload: FormPayloads['contact']) {
    return submitForm('contact', payload)
  }

  function submitRide(payload: FormPayloads['ride']) {
    return submitForm('ride', payload)
  }

  function submitPartner(payload: FormPayloads['partner']) {
    return submitForm('partner', payload)
  }

  function submitDriver(payload: FormPayloads['driver'], documents: DriverDocument[]) {
    return submit(async () => {
      const body = new FormData()
      body.set('type', 'driver')
      body.set('payload', JSON.stringify(payload))
      for (const document of documents) body.append(document.type, document.file)
      return await $fetch('/api/forms', { method: 'POST', body })
    })
  }

  return reactive({ submitting, error, submitContact, submitRide, submitPartner, submitDriver })
}
