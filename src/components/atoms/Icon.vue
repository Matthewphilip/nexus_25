<template>
  <button
    :class="classes"
    @click="toggleActive"
    :aria-pressed="isActive"
    :aria-label="iconLabel"
    type="button"
  >
    <font-awesome-icon :icon="icon" />
  </button>
</template>

<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(fasStar, faChevronDown);

interface IconProps {
  icon: string;
}

const props = defineProps<IconProps>();

const { icon } = toRefs(props);

const iconLabel = computed(() => {
  if (icon.value === "star") {
    return isActive.value ? "Unmark as favorite" : "Mark as favorite";
  } else if (icon.value === "chevron-down") {
    return "Expand section";
  }
  return "Icon button";
});

const isActive = ref(false);

const toggleActive = () => {
  if (icon.value === "star") {
    isActive.value = !isActive.value;
    console.log(isActive.value);
  }
};

const classes = computed(() => ({
  "nexus-icon": true,
  [`nexus-icon--${icon.value}`]: true,
  active: isActive.value,
}));
</script>

<style scoped lang="scss">
.nexus-icon {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease, fill 0.2s ease;
  font-size: 22px;

  &--star {
    stroke: #000000;
    stroke-width: 20px;
    fill: transparent;
    color: transparent;
  }

  &--star.active {
    fill: #7572ff;
    color: #7572ff;
    stroke-width: 0;
  }

  &--chevron-down {
    fill: #3b3b3b;
    color: #3b3b3b;
    pointer-events: none;
  }
}
</style>