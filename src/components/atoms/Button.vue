<template>
  <button
    type="button"
    :class="classes"
    :disabled="disabled"
    @click="onClick"
    :aria-label="string"
    :aria-disabled="disabled ? 'true' : undefined"
  >
    {{ string }}
  </button>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";

export interface ButtonProps {
  string?: string;
  type?: "solid" | "muted" | "outline" | "link" | "danger" | "ghost" | "header";
  size?: "xs" | "small" | "medium" | "large" | "extra-large";
  disabled?: boolean;
  icon?: boolean;
  full_width?: boolean;
  tab_index?: number;
  colour?: string;
  font_colour?: string;

  selected?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "header",
  size: "medium",
  disabled: false,
  tab_index: 0,
  colour: "#7572FF",
  selected: false,
  full_width: false,
});

const {
  string,
  disabled,
  size,
  type,
  tab_index,
  icon,
  colour,
  selected,
  full_width,
} = toRefs(props);

const emit = defineEmits<{
  mouseOver: [id: number];
  mouseLeave: [id: number];
  click: [id: number];
}>();

const classes = computed(() => ({
  "nexus-button": true,
  [`nexus-button--${type.value || "header"}`]: true,
  [`nexus-button--selected`]: selected.value === true,
  [`nexus-button--${size.value || "medium"}`]: size.value !== null,
  [`nexus-button--icon--${size.value || "medium"}`]:
    icon.value !== false && icon.value !== null,
  "nexus-button--icon": icon.value !== false,
  "nexus-button--disabled": disabled.value === true,
  "nexus-button--full-width": full_width.value === true,
}));

const onClick = () => {
  emit("click", 1);
  return true;
};

// const shades = generateShades(colour.value);
// const darken_background = shades[700];
// const muted_background = shades[100];
</script>

<style lang="scss">
.nexus-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 500ms;
  border: none;
  font-family: "Overpass", sans-serif;

  //type
  &--header {
    width: 93.75px;
    height: 40px;
    background-color: transparent;
    font-weight: 400;
    line-height: 21px;
    font-size: 14px;
  }

  &--get-value {
    width: 137px;
    height: 50px;
    border-radius: 16px;
    background-color: #7572ff;
    font-weight: 600;
    color: white;
    line-height: 27px;
    font-size: 16px;
  }

  &--value-button {
    width: 250px;
    height: 50px;
    border-radius: 16px;
    background-color: #7572ff;
    font-weight: 600;
    color: white;
    line-height: 27px;
    font-size: 16px;
    margin: 20px;

    @media (min-width: 760px) {
      width: 267px;
    }
  }

  //selected
  &--selected {
    border-bottom: 4px solid #7572ff;
  }
}

@media (min-width: 760px) {
  .nexus-button--header {
    width: 69px;
    height: 30px;
    border-radius: 12px;
    padding: 8px 25px;
    gap: 10px;
    line-height: 24px;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid #d1d6e0;
    color: #55595d;
  }

  .nexus-button--selected {
    border: none;
    color: white;
    background-color: #7572ff;
  }
}
</style>