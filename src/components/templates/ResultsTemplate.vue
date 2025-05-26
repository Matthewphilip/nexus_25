<template>
  <div class="results-template">
    <ResultsHeader class="results-template__header" />
    <ResultsBody class="results-template__body" />
    <ResultsNavigation class="results-template__footer" />
  </div>
</template>
        
<script setup lang="ts">
import { onMounted } from "vue";

import ResultsHeader from "@organisms/ResultsHeader.vue";
import ResultsBody from "@organisms/ResultsBody.vue";
import ResultsNavigation from "@organisms/ResultsNavigation.vue";

import { useResultsStore } from "@stores/resultsStore";

const resultsStore = useResultsStore();

onMounted(() => {
  console.log("Component is mounted!");
  resultsStore.fetchResults();
});
</script>

<style lang="scss">
.results-template {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 100vh;

  &__header,
  &__footer {
    flex: 0;
  }

  &__body {
    flex: 1 1 auto;
    overflow-y: auto;

    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>