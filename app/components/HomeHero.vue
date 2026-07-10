<template>
  <section class="overflow-hidden bg-navy-900 pb-14 pt-14 text-white sm:pb-20 sm:pt-20">
    <div class="section-wrap grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
      <div class="max-w-3xl">
        <p class="mb-7 flex items-center gap-2 text-sm font-semibold text-teal-100">
          <span class="size-2 rounded-full bg-teal-500" /> Zorgvervoer, gepland rond uw dag
        </p>
        <h1 class="display-heading text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
          Rustig onderweg<br>naar uw zorg.
        </h1>
        <p class="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
          Betrouwbaar en comfortabel vervoer naar ziekenhuizen, klinieken en medische afspraken. Van uw deur tot uw bestemming, met aandacht voor tijd en respect.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <UButton
            to="/rit-aanvragen"
            label="Rit aanvragen"
            trailing-icon="i-lucide-arrow-right"
            color="primary"
            size="xl"
            class="justify-center"
          />
          <UButton
            to="#werkwijze"
            label="Zo werkt het"
            variant="ghost"
            color="neutral"
            size="xl"
            class="justify-center border border-white/40 bg-transparent text-white! hover:bg-white/10"
          />
        </div>
        <p class="mt-6 text-sm text-slate-300">
          Geen spoedvervoer. Bel bij een medische noodsituatie altijd de lokale hulpdiensten.
        </p>
      </div>
      <div class="relative mx-auto w-full max-w-xl lg:max-w-none">
        <div class="absolute -right-16 -top-14 size-48 rounded-full border border-teal-500/30 sm:size-64" />
        <div class="relative overflow-hidden rounded-4xl border border-white/10 bg-navy-800 p-6 shadow-2xl sm:p-8">
          <div class="flex items-center justify-between border-b border-white/10 pb-6">
            <p class="text-sm font-semibold text-teal-100">
              Uw rit, overzichtelijk geregeld
            </p>
            <UIcon
              name="i-lucide-route"
              class="size-6 text-teal-100"
            />
          </div>
          <div class="space-y-6 py-8">
            <div class="flex gap-4">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold">1</span>
              <div>
                <p class="font-bold">
                  Uw voordeur
                </p><p class="mt-1 text-sm text-slate-300">
                  Een ophaalmoment rond uw afspraak.
                </p>
              </div>
            </div>
            <div class="ml-5 h-7 border-l border-dashed border-teal-100/50" />
            <div class="flex gap-4">
              <span class="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-navy-900">2</span>
              <div>
                <p class="font-bold">
                  Uw zorgbestemming
                </p><p class="mt-1 text-sm text-slate-300">
                  Ziekenhuis, kliniek, therapie of behandelcentrum.
                </p>
              </div>
            </div>
          </div>
          <div class="rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-200">
            “Wij regelen de praktische details, zodat u zich op uw afspraak kunt richten.”
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
