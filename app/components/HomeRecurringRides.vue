<template>
  <section class="section-wrap py-12 sm:py-16">
    <div class="grid overflow-hidden rounded-4xl bg-navy-900 text-white lg:grid-cols-2">
      <div class="p-8 sm:p-12 lg:p-16">
        <p class="eyebrow text-teal-100">
          Terugkerende afspraken
        </p>
        <h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
          Dezelfde zorgvuldige planning, iedere keer.
        </h2>
        <p class="mt-6 max-w-md leading-7 text-slate-200">
          Heeft u regelmatig vervoer nodig voor behandeling, therapie of revalidatie? We helpen u een vaste planning af te stemmen op uw afspraken.
        </p>
        <UButton
          to="/contact"
          label="Vast vervoer regelen"
          trailing-icon="i-lucide-arrow-right"
          color="primary"
          size="lg"
          class="mt-8"
        />
      </div>
      <div class="relative min-h-72 overflow-hidden bg-teal-700 p-8 sm:p-12">
        <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_1px_1px,var(--color-teal-100)_1px,transparent_0)] bg-size-[20px_20px]" />
        <div class="relative ml-auto max-w-xs rounded-2xl bg-white p-6 text-navy-900 shadow-xl">
          <p class="text-sm font-bold text-teal-700">
            Een vaste planning kan bestaan uit
          </p>
          <ul class="mt-5 space-y-4 text-sm font-medium">
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 text-teal-700"
              />Vaste ophaaldagen
            </li>
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 text-teal-700"
              />Tijden rond uw afspraak
            </li>
            <li class="flex gap-3">
              <UIcon
                name="i-lucide-check"
                class="mt-0.5 size-4 text-teal-700"
              />Geplande retourritten
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
