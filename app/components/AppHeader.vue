<template>
  <header class="border-b border-navy-900/10 bg-navy-50">
    <div class="section-wrap flex min-h-20 items-center justify-between gap-4">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-4"
        aria-label="Huppie Taxi, startpagina"
      >
        <img
          src="/favicon.svg"
          alt=""
          aria-hidden="true"
          class="size-16 object-contain"
        >
        <span class="text-xl font-bold tracking-tight text-primary">Huppie Taxi</span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-7 lg:flex"
        aria-label="Hoofdnavigatie"
      >
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="text-sm font-medium text-navy-700 transition hover:text-teal-700 focus:outline-none focus:underline"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <UButton
        to="/rit-aanvragen"
        label="Rit aanvragen"
        color="primary"
        size="lg"
        class="hidden sm:inline-flex"
      />
      <UButton
        class="sm:hidden"
        color="neutral"
        variant="ghost"
        :icon="isMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="isMenuOpen ? 'Menu sluiten' : 'Menu openen'"
        @click="isMenuOpen = !isMenuOpen"
      />
    </div>

    <nav
      v-if="isMenuOpen"
      class="border-t border-navy-900/10 px-5 py-4 sm:hidden"
      aria-label="Mobiele navigatie"
    >
      <div class="flex flex-col gap-1">
        <NuxtLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-3 font-medium text-navy-900 hover:bg-navy-50"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          to="/rit-aanvragen"
          class="mt-2 rounded-lg bg-navy-900 px-3 py-3 text-center font-bold text-white"
          @click="isMenuOpen = false"
        >
          Rit aanvragen
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);

const navigation = [
  { label: 'Veelgestelde vragen', to: '/#vragen' },
  { label: 'Voor zorgpartners', to: '/partners' },
  { label: 'Word chauffeur', to: '/chauffeur-worden' },
  { label: 'Contact', to: '/contact' },
];
</script>
