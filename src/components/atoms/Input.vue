<template>
  <div class="input">
    <label class="input__label" :class="{ 'input__label--active': isActive }">
      {{ labelText }}
    </label>
    <input
      class="input__field"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const isFocused = ref(false);

const isActive = computed(() => {
  return isFocused.value || props.modelValue.length > 0;
});

const labelText = computed(() => {
  const words = props.placeholder.trim().split(" ");

  let label =
    isActive.value && words.length > 1
      ? words.slice(1).join(" ")
      : props.placeholder;

  if (label.toLowerCase() === "milage") {
    label = label.charAt(0).toUpperCase() + label.slice(1);
  }

  return label;
});
</script>

<style scoped lang="scss">
.input {
  position: relative;
  width: 280px;

  @media (min-width: 760px) {
    width: 267px;
    height: 50px;
  }

  &__field {
    width: 250px;
    height: 30px;
    padding: 16px 12px 8px 12px;
    border: none;
    margin: 10px 0;
    border-radius: 16px;
    font-size: 16px;
    outline: none;
    gap: 15px;

    @media (min-width: 760px) {
      width: 267px;
      height: 50px;
      padding: 4px;
      margin: none;
    }

    &:focus {
      border-color: #7572ff;
    }
  }

  &__label {
    position: absolute;
    left: 12px;
    top: 45%;
    transform: translateY(-50%);
    color: #aaa;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    pointer-events: none;
    transition: 0.2s ease all;

    @media (min-width: 760px) {
      top: 75%;
    }

    &--active {
      top: 10px;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
      background: #f6f7fb;
      padding: 0 4px;

      @media (min-width: 760px) {
        top: 10px;
      }
    }
  }
}
</style>