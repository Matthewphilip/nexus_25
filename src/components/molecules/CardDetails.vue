<template>
  <article class="card-details-wrapper">
    <header
      class="card-details-wrapper__head"
      aria-label="Principal vehicle details"
    >
      <div class="card-details-wrapper__head__details">
        <Typeography
          :string="`${plate} ${make}`"
          component="h2"
          text="header"
          weight="400"
          colour="#000000"
        />
        <Typeography
          :string="derivative"
          component="p"
          text="sub-details"
          weight="400"
          colour="#55595D"
        />
      </div>
      <div class="card-details-wrapper__head__advert">
        <div class="card-details-wrapper__head__advert__advert-container">
          <div
            class="card-details-wrapper__head__advert__advert-container__pill"
          >
            <Pill
              :string="advert"
              size="small"
              role="note"
              aria-label="Advert classification"
            />
          </div>
          <Icon icon="star" role="icon" aria-label="Save to favorites" />
        </div>
      </div>
    </header>
    <section
      class="card-details-wrapper__sub-details"
      aria-label="Additional vehicle details"
    >
      <ul
        class="card-details-wrapper__sub-details__key-details"
        aria-label="Key vehicle features"
      >
        <li v-if="key_features[0] || key_features[1]">
          <Typeography
            :string="`${key_features[0] || ''} ${
              key_features[0] && key_features[1] ? ' | ' : ''
            }${key_features[1] || ''}`"
            component="p"
            text="sub-details"
            weight="400"
            colour="#55595D"
          />
        </li>
        <li v-if="key_features[2] || key_features[3]">
          <Typeography
            :string="`${key_features[2] || ''} ${
              key_features[2] && key_features[3] ? ' | ' : ''
            }${key_features[3] || ''}`"
            component="p"
            text="sub-details"
            weight="400"
            colour="#55595D"
          />
        </li>
      </ul>
      <div
        class="card-details-wrapper__sub-details__finance-details"
        aria-label="Finance details"
      >
        <div
          class="card-details-wrapper__sub-details__finance-details__payment-details"
        >
          <div
            class="card-details-wrapper__sub-details__finance-details__payment-details__repayments"
            aria-label="Repayment details"
          >
            <Typeography
              :string="`£${monthly_payment}`"
              component="p"
              text="monthly-payment-price"
              :weight="dynamicWeight"
              colour="#000000"
            />
          </div>
          <Typeography
            :string="`/mo (${monthly_finance_type})`"
            component="p"
            text="payment-per-month"
            weight="400"
            colour="#000000"
          />
        </div>
        <div
          class="card-details-wrapper__sub-details__finance-details__price"
          aria-label="Price details"
        >
          <Typeography
            :string="`£${price}`"
            component="p"
            text="price"
            weight="medium"
            colour="#000000"
          />
        </div>
      </div>
    </section>
  </article>
</template>
<script setup lang="ts">
import { onMounted, toRefs, onUnmounted, ref } from "vue";
import Typeography from "@atoms/Typeography.vue";
import Pill from "@atoms/Pill.vue";
import Icon from "@atoms/Icon.vue";

export interface ImageProps {
  advert: string;
  plate: string;
  make: string;
  model: string;
  key_features: string[];
  price: string;
  original_price: string;
  monthly_finance_type: string;
  monthly_payment: string;
  derivative: string;
}

const props = defineProps<ImageProps>();

const {
  advert,
  plate,
  make,
  model,
  key_features,
  price,
  original_price,
  monthly_finance_type,
  monthly_payment,
  derivative,
} = toRefs(props);

const dynamicWeight = ref("400");

const updateWeight = () => {
  dynamicWeight.value = window.innerWidth > 760 ? "700" : "400";
};

onMounted(() => {
  updateWeight();
  window.addEventListener("resize", updateWeight);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWeight);
});
</script>
<style scoped lang="scss">
.card-details-wrapper {
  width: 100%;
  padding: 20px 0;
  gap: 6px;
  @media (min-width: 760px) {
    width: 100%;
    height: 114px;
    padding: 10px 0;
    gap: 10px;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 39px;
    gap: 6px;
    margin-bottom: 8px;

    @media (min-width: 760px) {
      padding: 0 10px;
    }

    &__details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
    }

    &__advert {
      display: none;
      display: flex;
      align-items: start;
      height: 100%;

      &__advert-container {
        display: flex;
        align-items: center;
        gap: 15px;

        &__pill {
          @media (min-width: 760px) {
            display: none;
          }
        }
      }
    }
  }

  &__sub-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    width: 100%;
    gap: 6px;

    @media (min-width: 760px) {
      padding: 0 10px;
    }

    &__key-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      width: 50%;
      list-style: none;
      margin: 0;
      padding: 0;
      @media (min-width: 760px) {
        display: none;
      }
    }

    &__finance-details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
      width: 50%;

      &__payment-details {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        &__repayments {
          margin-right: 5px;
        }
      }

      &__price {
        display: flex;
        gap: 5px;
      }
    }
  }
}
</style>