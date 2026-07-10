<template>
  <section class="bg-navy-900 py-20 text-white sm:py-28">
    <div class="section-wrap grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p class="eyebrow text-teal-100">
          Een rit aanvragen
        </p><h2 class="display-heading mt-4 text-4xl leading-tight sm:text-5xl">
          Uw zorgreis begint met een duidelijke aanvraag.
        </h2><p class="mt-6 max-w-2xl leading-7 text-slate-200">
          Vul uw gegevens in via ons duidelijke aanvraagproces. U ziet precies welke informatie we nodig hebben om uw zorgvervoer te kunnen beoordelen.
        </p>
      </div>
      <UButton
        to="/rit-aanvragen"
        label="Start uw aanvraag"
        trailing-icon="i-lucide-arrow-right"
        color="primary"
        size="xl"
        class="justify-center"
      />
    </div>
  </section>
</template>
