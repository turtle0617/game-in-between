<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";

import type { PokeCardProps } from "../type";

export default defineComponent({
  props: {
    card: { type: Object as PropType<PokeCardProps>, required: true },
  },
});
</script>

<template>
  <v-card variant="outlined">
    <template v-slot:title>
      <v-icon :icon="`mdi-cards-${card.group}`" size="x-large"
    /></template>
    <v-card-text>
      {{ card.number }}
    </v-card-text>
  </v-card>
</template>
<style scoped>
::v-deep .v-card-title,
.v-card-text {
  text-align: center;
}
</style>
