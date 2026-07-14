<template>
  <section class="border-b border-navy-900/10 bg-white py-8">
    <div class="section-wrap grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4 lg:text-left">
      <div
        v-for="highlight in highlights"
        :key="highlight.label"
        class="flex items-center justify-center gap-3 lg:justify-start"
      >
        <UIcon
          :name="highlight.icon"
          class="size-5 text-teal-700"
        />
        <span class="font-semibold">{{ highlight.label }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const highlights = [
  { icon: 'i-lucide-clock-3', label: 'Geplande, betrouwbare ritten' },
  { icon: 'i-lucide-hand-heart', label: 'Respectvolle service' },
  { icon: 'i-lucide-armchair', label: 'Comfortabel onderweg' },
  { icon: 'i-lucide-house', label: 'Van deur tot deur' },
];
</script>
