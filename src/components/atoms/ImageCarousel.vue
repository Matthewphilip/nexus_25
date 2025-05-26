<template>
  <section
    class="card-carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="Image carousel"
  >
    <ul class="card-carousel__track">
      <li
        v-for="(media, index) in media_urls"
        :key="index"
        class="card-carousel__item-wrapper"
      >
        <img
          :src="media.thumb"
          alt="carousel image"
          class="card-carousel__item"
          :index="index"
        />
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
interface MediaUrl {
  large: string;
  medium: string;
  thumb: string;
}

export interface ImageProps {
  media_urls: MediaUrl[];
}

const props = defineProps<ImageProps>();
</script>
<style lang="scss">
.card-carousel {
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  width: 400px;
  height: 84px;
  gap: 5px;

  @media (min-width: 760px) {
    display: none;
  }

  &__track {
    display: flex;
    gap: 8px;
    width: max-content;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    width: 113px;
    height: 84px;
    flex-shrink: 0;
    object-fit: cover;
    border-radius: 16px;
    scroll-snap-align: start;
  }

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>