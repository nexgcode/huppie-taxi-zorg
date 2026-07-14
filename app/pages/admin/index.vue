<template>
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
    <header class="max-w-2xl">
      <p class="eyebrow">
        Overzicht
      </p>
      <h1 class="display-heading mt-3 text-4xl text-navy-900 sm:text-5xl">
        Beheerdersinbox
      </h1>
      <p class="mt-3 leading-7 text-navy-700">
        Bekijk nieuwe aanvragen en werk ze af zodra ze zijn behandeld.
      </p>
      <div
        v-if="!loading && !error"
        class="mt-5 flex flex-wrap gap-2"
      >
        <UBadge size="lg">
          Nieuw {{ totalNew }}
        </UBadge>
        <UBadge
          size="lg"
          color="secondary"
          variant="subtle"
        >
          Afgehandeld {{ totalHandled }}
        </UBadge>
      </div>
    </header>

    <div
      v-if="loading"
      class="mt-8 grid gap-5 lg:grid-cols-2"
      aria-busy="true"
      aria-label="Inzendingen laden"
    >
      <section
        v-for="index in 4"
        :key="index"
        class="rounded-2xl border border-navy-900/10 bg-white p-5 shadow-sm sm:p-6"
      >
        <div class="flex items-center justify-between gap-4">
          <USkeleton class="h-6 w-40" />
          <USkeleton class="h-6 w-8 rounded-full" />
        </div>
        <div class="mt-5 space-y-3">
          <USkeleton class="h-20 w-full rounded-xl" />
          <USkeleton class="h-20 w-full rounded-xl" />
        </div>
      </section>
    </div>

    <p
      v-else-if="error"
      class="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-red-800"
      role="alert"
    >
      {{ error }}
    </p>

    <div
      v-else
      class="mt-8 grid gap-5 lg:grid-cols-2"
    >
      <section
        v-for="section in sections"
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
                <UBadge v-if="item.status === 'new'">
                  Nieuw
                </UBadge>
                <UBadge
                  v-else
                  color="secondary"
                  variant="subtle"
                >
                  Afgehandeld
                </UBadge>
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

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' });

const forms = useFormsStore();
const { error, loading, sections } = storeToRefs(forms);
const totalNew = computed(() =>
  sections.value.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.status === 'new').length,
    0,
  ),
);
const totalHandled = computed(() =>
  sections.value.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.status !== 'new').length,
    0,
  ),
);

onMounted(forms.loadAll);
</script>
