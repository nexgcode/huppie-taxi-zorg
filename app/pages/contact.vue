<script setup lang="ts">
const submitted = ref(false)
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})

function clearErrors() {
  Object.assign(errors, {
    name: '',
    email: '',
    message: ''
  })
}

function sendMessage() {
  clearErrors()

  if (!form.name.trim()) errors.name = 'Vul uw naam in.'
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Vul een geldig e-mailadres in.'
  if (!form.message.trim()) errors.message = 'Vul uw bericht in.'

  if (!Object.values(errors).some(Boolean)) submitted.value = true
}

useSeoMeta({
  title: 'Contact | Huppie Taxi',
  description: 'Neem contact op met Huppie Taxi over uw aanvraag voor zorgvervoer.'
})
</script>

<template>
  <main id="inhoud">
    <section class="bg-navy-900 py-16 text-white sm:py-20">
      <div class="section-wrap max-w-4xl">
        <p class="eyebrow text-teal-100">
          Contact
        </p>
        <h1 class="display-heading mt-4 text-5xl leading-[1.02] sm:text-6xl">
          Neem contact op over uw zorgrit.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          Heeft u een vraag over uw rit of wilt u zorgvervoer aanvragen? Stuur ons een bericht en we nemen contact met u op over de beschikbaarheid.
        </p>
        <div class="mt-8 flex flex-col gap-3 text-lg sm:flex-row sm:gap-8">
          <a
            href="tel:+31681914785"
            class="font-semibold text-teal-100 transition hover:text-white focus:outline-none focus:underline"
          >+31 6 81914785</a>
          <a
            href="mailto:info@huppietaxi.nl"
            class="font-semibold text-teal-100 transition hover:text-white focus:outline-none focus:underline"
          >info@huppietaxi.nl</a>
        </div>
      </div>
    </section>

    <section class="section-wrap py-16 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div
          v-if="submitted"
          class="rounded-2xl border border-teal-100 bg-teal-50 p-7 sm:p-10"
        >
          <UIcon
            name="i-lucide-check-circle-2"
            class="size-10 text-teal-700"
          />
          <h2 class="display-heading mt-5 text-4xl text-navy-900">
            Bedankt voor uw bericht.
          </h2>
          <p class="mt-4 max-w-xl leading-7 text-navy-700">
            Deze demo verstuurt uw bericht nog niet. Koppel vóór publicatie een beveiligd contactproces om inzendingen te verwerken.
          </p>
        </div>

        <form
          v-else
          class="rounded-[1.5rem] border border-navy-900/10 bg-white p-6 shadow-sm sm:p-10"
          @submit.prevent="sendMessage"
        >
          <p class="eyebrow">
            Stuur een bericht
          </p>
          <h2 class="display-heading mt-3 text-4xl text-navy-900">
            Waar kunnen we u mee helpen?
          </h2>
          <p class="mt-4 leading-7 text-navy-700">
            Laat uw gegevens en vraag achter. Uw telefoonnummer is optioneel.
          </p>

          <div class="mt-8 grid gap-5 sm:grid-cols-2">
            <UFormField
              label="Naam"
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
            label="E-mailadres"
            :error="errors.email || undefined"
            required
            class="mt-5"
          >
            <UInput
              v-model="form.email"
              type="email"
              autocomplete="email"
              size="xl"
              class="w-full"
            />
          </UFormField>

          <UFormField
            label="Bericht"
            :error="errors.message || undefined"
            required
            class="mt-5"
          >
            <UTextarea
              v-model="form.message"
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
            class="mt-8 w-full justify-center sm:w-auto"
          />
        </form>
      </div>
    </section>
  </main>
</template>
