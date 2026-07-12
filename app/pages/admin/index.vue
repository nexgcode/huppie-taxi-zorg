<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const { loadAll } = useAdminSubmissions()
const { data: sections } = await useAsyncData('admin-submission-sections', loadAll)
</script>

<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
    <header class="max-w-2xl">
      <p class="eyebrow">
        Overzicht
      </p>
      <h1 class="display-heading mt-3 text-4xl text-navy-900 sm:text-5xl">
        Admin inbox
      </h1>
      <p class="mt-3 leading-7 text-navy-700">
        Bekijk nieuwe aanvragen en werk ze af zodra ze zijn behandeld.
      </p>
    </header>

    <div class="mt-8 grid gap-5 lg:grid-cols-2">
      <section
        v-for="section in sections || []"
        :key="section.table"
        class="rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm sm:p-6"
      >
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-xl font-bold text-navy-900">
            {{ section.title }}
          </h2>
          <UBadge variant="subtle">
            {{ section.items.length }}
          </UBadge>
        </div>
        <p
          v-if="!section.items.length"
          class="mt-5 rounded-xl bg-navy-50 px-4 py-5 text-navy-700"
        >
          Geen inzendingen.
        </p>
        <ul
          v-else
          class="mt-5 space-y-3"
        >
          <li
            v-for="item in section.items"
            :key="item.id"
          >
            <NuxtLink
              :to="`/admin/${section.table}/${item.id}`"
              class="block rounded-xl border border-navy-900/10 px-4 py-4 transition hover:border-teal-600 hover:bg-teal-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <span class="font-bold text-navy-900">Bekijk inzending</span>
                <UBadge>{{ item.status === 'new' ? 'Nieuw' : 'Afgehandeld' }}</UBadge>
              </div>
              <p class="mt-2 text-sm leading-6 text-navy-700">
                {{ new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at)) }}
              </p>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
