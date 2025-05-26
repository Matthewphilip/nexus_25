<template>
  <div class="value-card">
    <div class="value-card__container">
      <div class="value-card__container__value-your-car">
        <div class="value-card__container__value-your-car__title">
          <Typeography
            string="Value your car"
            component="h2"
            text="value-car-header"
            :weight="headingWeight"
            colour="#000000"
          />
          <Typeography
            :string="advertText"
            component="h2"
            text="value-car-advert"
            weight="400"
            colour="#000000"
          />
        </div>

        <div
          v-if="screenWidth > 760"
          class="value-card__container__value-your-car__value-inputs"
        >
          <div
            class="value-card__container__value-your-car__value-inputs__input"
          >
            <Input v-model="vrmInput" placeholder="Enter VRM" />
          </div>
          <div
            class="value-card__container__value-your-car__value-inputs__input"
          >
            <Input v-model="milageInput" placeholder="Enter milage" />
          </div>
          <div
            class="value-card__container__value-your-car__value-inputs__input"
          >
            <Button
              type="value-button"
              string="Value my car"
              font_colour="#000000"
              @click="handleSubmit"
            />
          </div>
        </div>
      </div>

      <Button
        v-if="screenWidth <= 760"
        type="get-value"
        string="Get valuation"
        font_colour="#000000"
        @click="handleOpen"
      />
    </div>

    <div
      v-if="screenWidth <= 760 && inputVisible"
      class="value-card__container__inputs"
    >
      <Input v-model="vrmInput" placeholder="Enter VRM" />
      <Input v-model="milageInput" placeholder="Enter milage" />
      <Button
        type="value-button"
        string="Value my car"
        font_colour="#000000"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import Typeography from "@atoms/Typeography.vue";
import Button from "@atoms/Button.vue";
import Input from "@atoms/Input.vue";

import { useResultsStore } from "@stores/resultsStore";

const vrmInput = ref("");
const milageInput = ref("");
const inputVisible = ref(false);

const resultsStore = useResultsStore();
const { screenWidth } = storeToRefs(resultsStore);

const handleOpen = () => {
  if (screenWidth.value <= 760) {
    inputVisible.value = !inputVisible.value;
  }
};

const handleSubmit = () => {
  resultsStore.submitValueCar(vrmInput.value, inputVisible.value);
};

const advertText = computed(() => {
  return screenWidth.value > 760
    ? "Find out the value of your car in just a few minutes"
    : "Find out in just a few minutes";
});

const headingWeight = computed(() => {
  return screenWidth.value > 760 ? "600" : "700";
});
</script>
<style scoped lang="scss">
.value-card {
  width: 375px;
  background-color: #f6f7fb;
  border: 1px solid #d1d6e0;
  border-radius: 16px;
  margin: 20px 0;

  @media (min-width: 760px) {
    width: 327px;
    height: 364px;
    margin: 0;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 13px 13px 20px;

    @media (min-width: 760px) {
      margin: 0;
      flex-direction: column;
      padding: 20px;
    }

    &__value-your-car {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      &__title {
        @media (min-width: 760px) {
          display: flex;
          text-align: center;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 10px 0;
        }
      }

      &__value-inputs {
        // margin: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__input {
          margin: 10px 0;
        }
      }
    }

    &__inputs {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>