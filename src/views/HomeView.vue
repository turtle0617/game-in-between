<script setup lang="ts">
import { computed, ref } from "vue";
import { getShuffledDeck } from "../utils";

const useInBetween = () => {
  const pokeDeck = ref(getShuffledDeck());
  const currentPool = computed(() => {
    if (pokeDeck.value.length < 2) {
      return {
        front_gate: null,
        back_gate: null,
        goal: null,
      };
    }

    return {
      front_gate: pokeDeck.value[0],
      back_gate: pokeDeck.value[1],
      goal: pokeDeck.value[2],
    };
  });

  const changePool = () => {
    if (pokeDeck.value.length < 2) {
      pokeDeck.value = getShuffledDeck();
    }
    pokeDeck.value = pokeDeck.value.slice(3);
  };

  return { pokeDeck, currentPool, changePool };
};

const { pokeDeck, currentPool, changePool } = useInBetween();
</script>

<template>
  <main>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col>
          <span>剩下 {{ pokeDeck.length }} 張</span>
        </v-col>
        <v-col>
          <v-btn color="secondary" @click="changePool"> Next </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="currentPool.front_gate">
          <PokeCard
            :key="currentPool.front_gate.key"
            :card="currentPool.front_gate"
          />
        </v-col>

        <v-col v-if="currentPool.goal">
          <PokeCard :key="currentPool.goal.key" :card="currentPool.goal" />
        </v-col>

        <v-col v-if="currentPool.back_gate" :key="currentPool.back_gate?.key">
          <PokeCard
            :key="currentPool.back_gate.key"
            :card="currentPool.back_gate"
          />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PokeCard from "@/components/PokeCard.vue";

export default defineComponent({
  components: {
    PokeCard,
  },
});
</script>