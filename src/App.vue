<template>
  <ResultsPage />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import ResultsPage from "@pages/ResultsPage.vue";

import { useResultsStore } from "@stores/resultsStore";

const resultsStore = useResultsStore();

onMounted(() => {
  resultsStore.initScreenWidthListener();
});

onBeforeUnmount(() => {
  resultsStore.removeScreenWidthListener();
});
</script>
