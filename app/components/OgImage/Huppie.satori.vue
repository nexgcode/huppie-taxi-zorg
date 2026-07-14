<template>
  <div class="og-card">
    <div class="og-content">
      <div class="og-brand">
        <img
          class="og-logo"
          src="/favicon.svg"
          width="54"
          height="54"
          alt=""
        >
        <div class="og-brand-name">
          Huppie Taxi
        </div>
      </div>

      <div class="og-message">
        <div class="og-eyebrow">
          Zorgvervoer met aandacht
        </div>
        <div class="og-title">
          {{ title }}
        </div>
        <div class="og-description">
          {{ description }}
        </div>
      </div>

      <div class="og-footer">
        <span>huppietaxi.nl</span>
        <span>+31 6 81914785</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string;
  description?: string;
}>(), {
  title: 'Betrouwbaar zorgvervoer',
  description: 'Comfortabel en persoonlijk vervoer naar uw medische afspraak.',
});
</script>

<style>
.og-card {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 72px;
  color: #ffffff;
  background: linear-gradient(135deg, #0f2747 0%, #163a61 60%, #0f766e 100%);
  font-family: Inter;
}

.og-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.og-brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.og-logo {
  display: flex;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: #ffffff;
  object-fit: contain;
}

.og-brand-name {
  display: flex;
  font-size: 31px;
  font-weight: 700;
  letter-spacing: -1px;
}

.og-message {
  display: flex;
  flex-direction: column;
  max-width: 940px;
}

.og-eyebrow {
  display: flex;
  color: #99f6e4;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.og-title {
  display: flex;
  margin-top: 22px;
  font-size: 66px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -2px;
}

.og-description {
  display: flex;
  margin-top: 24px;
  color: #dbeafe;
  font-size: 29px;
  line-height: 1.35;
}

.og-footer {
  display: flex;
  justify-content: space-between;
  color: #ccfbf1;
  font-size: 22px;
}
</style>
