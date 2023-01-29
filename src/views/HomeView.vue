<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { getShuffledDeck } from "../utils";

const useInBetween = (deck = ref(1)) => {
  const pokeDeck = ref(getShuffledDeck(deck.value));
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

  watchEffect(() => {
    pokeDeck.value = getShuffledDeck(deck.value);
  });

  const changePool = () => {
    if (pokeDeck.value.length - 3 < 2) {
      pokeDeck.value = getShuffledDeck(deck.value);
      return;
    }
    pokeDeck.value = pokeDeck.value.slice(3);
  };

  const reset = () => {
    pokeDeck.value = getShuffledDeck(deck.value);
  };

  return { pokeDeck, currentPool, changePool, reset };
};

const showGoalCard = ref(false);
const deck = ref(1);

const {
  pokeDeck,
  currentPool,
  changePool,
  reset: resetDeck,
} = useInBetween(deck);

const onNext = () => {
  showGoalCard.value = false;
  changePool();
};

const onReset = () => {
  showGoalCard.value = false;
  resetDeck();
};
</script>

<template>
  <main>
    <v-container class="bg-surface-variant">
      <v-row no-gutters>
        <v-col>
          <span>剩下 {{ pokeDeck.length - 3 }} 張</span>
        </v-col>
        <v-col>
          <v-btn color="secondary" @click="onNext"> Next </v-btn>
        </v-col>
        <v-col>
          <v-btn variant="flat" @click="onReset"> Reset </v-btn>
        </v-col>
        <v-col>
          <v-select label="用幾副牌組" v-model="deck" :items="[1, 2, 3, 4]" />
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
          <v-card>
            <v-card-actions v-if="!showGoalCard">
              <v-btn block variant="flat" @click="showGoalCard = true">
                open
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <PokeCard
                v-if="showGoalCard"
                :key="currentPool.goal.key"
                :card="currentPool.goal"
              />
            </v-expand-transition>
          </v-card>
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
