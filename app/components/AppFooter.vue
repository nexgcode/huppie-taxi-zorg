<template>
  <footer class="bg-navy-900 pb-24 text-slate-300 sm:pb-8">
    <div class="section-wrap border-t border-white/15 pt-8">
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p class="font-bold text-white">
            Huppie Taxi
          </p>
          <p class="mt-1 text-sm">
            Betrouwbaar zorgvervoer, gepland rond u.
          </p>
          <div class="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:gap-5">
            <a
              href="tel:+31681914785"
              class="transition hover:text-white focus:outline-none focus:underline"
            >+31 6 81914785</a>
            <a
              href="mailto:zorg@huppietaxi.nl"
              class="transition hover:text-white focus:outline-none focus:underline"
            >zorg@huppietaxi.nl</a>
          </div>
        </div>
        <p class="text-sm">
          © {{ new Date().getFullYear() }} Huppie Taxi. Alle rechten voorbehouden.
        </p>
      </div>
    </div>
  </footer>
</template>
