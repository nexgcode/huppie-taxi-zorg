<script setup lang="ts">
import { z } from 'zod'

const props = withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  description?: string
  successTitle?: string
}>(), {
  eyebrow: 'Stuur een bericht',
  title: 'Waar kunnen we u mee helpen?',
  description: 'Laat uw gegevens en vraag achter.',
  successTitle: 'Bedankt voor uw bericht.'
})

const schema = z.object({
  name: z.string().trim().min(1, 'Vul uw naam in.'),
  email: z.string().trim().email('Vul een geldig e-mailadres in.'),
  phone: z.string(),
  message: z.string().trim().min(1, 'Vul uw bericht in.')
})

const submitted = ref(false)
const form = reactive({ name: '', email: '', phone: '', message: '' })
const forms = useFormsStore()

async function submit() {
  await forms.submitContact({ ...form })
  submitted.value = true
}
</script>

<template>
  <div
    v-if="submitted"
    class="rounded-2xl border border-teal-100 bg-teal-50 p-7 sm:p-10"
  >
    <UIcon
      name="i-lucide-check-circle-2"
      class="size-10 text-teal-700"
    />
    <h2 class="display-heading mt-5 text-4xl text-navy-900">
      {{ props.successTitle }}
    </h2>
    <p class="mt-4 max-w-xl leading-7 text-navy-700">
      We hebben uw bericht ontvangen en nemen zo snel mogelijk contact met u op.
    </p>
  </div>

  <UForm
    v-else
    :schema="schema"
    :state="form"
    :validate-on="['blur']"
    class="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-sm sm:p-10"
    @submit="submit"
  >
    <p class="eyebrow">
      {{ props.eyebrow }}
    </p>
    <h2 class="display-heading mt-3 text-4xl text-navy-900">
      {{ props.title }}
    </h2>
    <p class="mt-4 leading-7 text-navy-700">
      {{ props.description }}
    </p>

    <div class="mt-8 grid gap-5 sm:grid-cols-2">
      <UFormField
        name="name"
        label="Naam"
        required
      >
        <UInput
          v-model="form.name"
          autocomplete="name"
          aria-required="true"
          size="xl"
          class="w-full"
        />
      </UFormField>
      <UFormField
        name="phone"
        label="Telefoonnummer"
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
        aria-required="true"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UFormField
      name="message"
      label="Bericht"
      required
      class="mt-5"
    >
      <UTextarea
        v-model="form.message"
        aria-required="true"
        :rows="5"
        size="xl"
        class="w-full"
      />
    </UFormField>

    <UButton
      type="submit"
      label="Bericht versturen"
      trailing-icon="i-lucide-send"
      color="primary"
      size="xl"
      :loading="forms.submitting"
      class="mt-8 w-full justify-center sm:w-auto"
    />
    <p
      v-if="forms.error"
      class="mt-4 text-sm font-medium text-red-700"
      role="alert"
    >
      {{ forms.error }}
    </p>
  </UForm>
</template>
