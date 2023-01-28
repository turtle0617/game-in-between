<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
/* Fix vuetify variable lose issue */
.v-theme--light {
  --v-theme-overlay-multiplier: 1;
}
</style>
