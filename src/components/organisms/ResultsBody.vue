<template>
  <section
    class="results-body"
    aria-label="Search results"
    role="region"
    aria-live="polite"
    aria-atomic="false"
  >
    <template v-if="loading">
      <h4 role="status">Loading......</h4>
    </template>
    <template
      v-else
      v-for="(result, index) in filtered_results_data"
      :key="result.id || index"
    >
      <ValueCar v-if="index === valueCarIndex" />
      <Card v-else>
        <template v-slot:content>
          <ImageRenderer
            :media_urls="result.media_urls"
            :advert="result.advert_classification"
            :key_features="result.key_features"
          />
          <CardDetails
            :advert="result.advert_classification"
            :plate="result.plate"
            :make="result.make"
            :model="result.model"
            :key_features="result.key_features"
            :price="result.price"
            :original_price="result.original_price"
            :monthly_finance_type="result.monthly_finance_type"
            :monthly_payment="result.monthly_payment"
            :derivative="result.derivative"
          />
        </template>
      </Card>
    </template>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import Card from "@atoms/Card.vue";
import CardDetails from "@molecules/CardDetails.vue";
import ValueCar from "./ValueCar.vue";
import ImageRenderer from "@molecules/ImageRenderer.vue";

import { useResultsStore } from "@stores/resultsStore";

const resultsStore = useResultsStore();

const { filtered_results_data, loading } = storeToRefs(resultsStore);

const screenWidth = ref(window.innerWidth);

function updateWidth() {
  screenWidth.value = window.innerWidth;
  resultsStore.screenWidth = screenWidth.value;
}

onMounted(() => {
  window.addEventListener("resize", updateWidth);
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});

// compute ValueCar card index based on screen size
const valueCarIndex = computed(() => {
  let index;

  if (screenWidth.value < 760) {
    return 2; // mobile, insert at 5th card (index 4)
  } else if (screenWidth.value < 1039) {
    return 3; // tablet, 4th card (index 3)
  } else {
    return 2; // desktop, 5th card (index 4)
  }

  // if the filtered data length is less than or equal to index, fallback to 1
  return filtered_results_data.value.length > index ? index : 1;
});
</script>
<style scoped lang="scss">
.results-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  height: 100%;

  @media (min-width: 760px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    align-items: flex-start;
    margin-top: 20px;
  }
}
</style>