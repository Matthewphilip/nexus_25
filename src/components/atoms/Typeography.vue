<template>
  <component :is="component" :class="classes">
    {{ string }}
  </component>
</template>
<script setup lang="ts">
import { toRefs, computed } from "vue";

interface Props {
  component?: string;
  string?: string;
  text?: string;
  weight?: string;
  colour?: string;
  colour_hex?: string;
  html?: string;
}

const props = withDefaults(defineProps<Props>(), {
  component: "p",
  // colour: "default",
});

const { component, string, text, weight, colour, colour_hex, html } =
  toRefs(props);

const classes = computed(() => ({
  typeography: true,
  [`typeography--text--${text.value}`]: text.value && text.value.length > 0,
  [`typeography--weight`]: !!weight.value,
  [`typeography--colour`]: !!colour.value,
  [`typeeography--hex`]: !!colour_hex.value,
}));
</script>
<style scoped lang="scss">
.typeography {
  margin: 0;

  &--text {
    letter-spacing: 0;

    &--header {
      font-size: 14px;
      line-height: 21px;

      @media (min-width: 760px) {
        font-size: 16px;
        line-height: 24px;
      }
    }

    &--sub-details {
      font-size: 12px;
      line-height: 18px;
    }

    &--monthly-payment-price {
      font-size: 18px;
      line-height: 24px;

      @media (min-width: 760px) {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &--payment-per-month {
      font-size: 14px;
      line-height: 21px;

      @media (min-width: 760px) {
        font-size: 12px;
        line-height: 18px;
      }
    }

    &--price {
      font-size: 12px;
      line-height: 18px;
    }

    &--results-total {
      font-size: 18px;
      line-height: 24px;
    }

    &--mobile-sub-nav {
      font-size: 14px;
      line-height: 21px;
    }

    &--value-car-header {
      font-family: "Overpass", sans-serif;
      font-size: 18px;
      line-height: 24px;

      @media (min-width: 760px) {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &--value-car-advert {
      font-family: "Overpass", sans-serif;
      font-size: 12px;
      line-height: 18px;

      @media (min-width: 760px) {
        font-size: 16px;
        line-height: 24px;
      }
    }
  }

  &--weight {
    font-weight: v-bind("weight");
  }

  &--default {
    color: black;
  }

  &--colour {
    color: v-bind("colour");
  }

  --hex {
    color: v-bind("colour_hex");
  }
}
</style>