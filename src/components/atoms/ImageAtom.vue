<template>
  <figure class="card-image">
    <img :src="img" alt="Vehicle image" />
  </figure>
</template>

<script setup lang="ts">
interface Props {
  img?: string;
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.card-image {
  display: none;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    display: block;
    height: 250px;
    width: 100%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: inherit;
    }
  }
}
</style>