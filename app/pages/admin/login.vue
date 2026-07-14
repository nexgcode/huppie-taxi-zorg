<template>
  <main class="mx-auto max-w-md px-4 py-16 sm:px-6">
    <section class="rounded-2xl border border-navy-900/10 bg-white p-7 shadow-sm sm:p-10">
      <p class="eyebrow">
        Alleen voor medewerkers
      </p>
      <h1 class="display-heading mt-3 text-4xl text-navy-900">
        Beheerdersinbox
      </h1>
      <form
        class="mt-7"
        @submit.prevent="login"
      >
        <UFormField
          label="E-mailadres"
          required
        >
          <UInput
            v-model="email"
            type="email"
            autocomplete="email"
            class="w-full"
            size="xl"
            required
          />
        </UFormField>
        <UFormField
          label="Wachtwoord"
          required
          class="mt-5"
        >
          <UInput
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full"
            size="xl"
            required
          />
        </UFormField>
        <UButton
          type="submit"
          label="Inloggen"
          :loading="loading"
          class="mt-6"
          size="xl"
        />
        <p
          v-if="error"
          class="mt-4 text-sm font-medium text-red-700"
          role="alert"
        >
          {{ error }}
        </p>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

watchEffect(() => {
  if (user.value) navigateTo('/admin');
});

async function login() {
  loading.value = true;
  error.value = '';
  const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
  loading.value = false;
  if (loginError) error.value = loginError.message;
}
</script>
