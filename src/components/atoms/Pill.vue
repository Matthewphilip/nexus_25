<template>
  <p :class="classes">
    {{ string }}
  </p>
</template>

<script setup lang="ts">
import { toRefs, computed } from "vue";

interface Props {
  string?: string;
  size: string;
}

const props = defineProps<Props>();

const { string, size } = toRefs(props);

const classes = computed(() => ({
  pill: true,
  [`pill--size--${size.value}`]: size.value && size.value.length > 0,
}));
</script>

<style scoped lang="scss">
.pill {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 5px;
  color: white;
  background-color: #3f3a50;
  border-radius: 8px;
  white-space: nowrap;
  margin: 0;
  backdrop-filter: blur(10px);
  border: 1px solid #ffffff33;
  font-family: "Overpass", sans-serif;

  &--size {
    &--small {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      height: 20px;
    }

    &--large {
      font-size: 16px;
      line-height: 27px;
      font-weight: 600;
      height: 29px;
    }
  }
}
</style>