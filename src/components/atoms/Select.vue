<template>
  <div class="dropdown-wrapper" ref="wrapper">
    <button
      class="dropdown-wrapper__selected"
      @click="toggleDropdown"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      type="button"
    >
      {{ selectedLabel }}
      <span class="dropdown-wrapper__selected__dropdown-arrow">
        <Icon icon="chevron-down" />
      </span>
    </button>

    <ul v-if="isOpen" class="dropdown-wrapper__dropdown-menu" role="listbox">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown-wrapper__dropdown-menu__dropdown-option"
        :class="{ last: index === options.length - 1 }"
        role="option"
        :aria-selected="option.value === selected"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Icon from "@atoms/Icon.vue";
import {
  ref,
  onMounted,
  onBeforeUnmount,
  defineProps,
  defineEmits,
  computed,
} from "vue";

const props = defineProps({
  options: {
    type: Array as () => { label: string; value: string | number }[],
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  placeholder: {
    type: String,
    default: "Filter Results",
  },
});

const emit = defineEmits(["selected"]);

const isOpen = ref(false);
const wrapper = ref<HTMLElement | null>(null);
const selected = ref(props.modelValue);

// emit selection
const selectOption = (option: { label: string; value: string | number }) => {
  selected.value = option.value;
  emit("selected", option.value);
  isOpen.value = false;
};

// open / close toggle
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// outside click closes dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

// listen for outside clicks
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// update label
const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === selected.value);
  return found ? found.label : props.placeholder;
});
</script>

<style scoped lang= scss>
.dropdown-wrapper {
  position: relative;
  width: 113px;
  height: 24px;
  font-family: SF Pro Text;

  @media (min-width: 760px) {
    width: 160px;
    height: 50px;
  }

  &__selected {
    width: 113px;
    height: 100%;
    background-color: transparent;
    border: none;
    padding: 0 5px;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    @media (min-width: 760px) {
      width: 160px;
      height: 50px;
      padding: 0 12px;
      color: #55595d;
      font-size: 16px;
      line-height: 24px;
      border-radius: 16px;
      background-color: #f6f7fb;
    }

    &__dropdown-arrow {
      transition: transform 0.2s ease;

      svg {
        width: 5px;
        height: 5px;

        @media (max-width: 760px) {
          width: 20px !important;
          height: 20px !important;
        }
      }
    }

    &__dropdown-arrow.open {
      transform: rotate(180deg);
      transition: transform 0.2s ease;
    }
  }

  &__dropdown-menu {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
    overflow: hidden;

    @media (min-width: 760px) {
      top: 58px;
    }

    &__dropdown-option {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: start;
      padding: 12px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      transition: background-color 0.2s;
    }

    &__dropdown-option:hover {
      background-color: #7572ff;
    }

    &__dropdown-option:not(:last-child) {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>