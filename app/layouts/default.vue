<template>
  <div>
    <a
      href="#inhoud"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-navy-900 focus:shadow-lg"
    >Ga naar inhoud</a>

    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
