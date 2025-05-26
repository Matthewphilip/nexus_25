<template>
  <figure
    class="card-image-wrapper"
    role="region"
    aria-roledescription="image container"
    aria-label="Card image with feature badges"
  >
    <ImageAtom
      :img="media_urls?.[0].medium"
      alt="Image of vehicle"
      class="card-image"
    />

    <div class="pill pill__top-left" aria-hidden="true">
      <Pill :string="advert" size="large" />
    </div>

    <div class="pill pill__bottom-left" aria-hidden="true">
      <Pill
        v-for="(feature, index) in key_features?.slice(0, 4)"
        :key="index"
        :string="feature"
        size="small"
      />
    </div>
  </figure>
</template>

<script setup lang="ts">
import Pill from "@atoms/Pill.vue";
import ImageAtom from "@atoms/ImageAtom.vue";

interface MediaUrl {
  large: string;
  medium: string;
  thumb: string;
}

export interface ImageProps {
  media_urls?: MediaUrl[];
  advert: string;
  key_features?: string[];
}

const props = defineProps<ImageProps>();
</script>

<style scoped lang="scss">
.card-image-wrapper {
  margin: 0;
  padding: 0;
  display: none;

  @media (min-width: 760px) {
    display: block;
    height: 250px;
    width: 100%;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;
    position: relative;
  }
}

.card-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.pill__top-left,
.pill__bottom-left {
  display: flex;
  position: absolute;
  z-index: 1;
}

.pill__top-left {
  top: 10px;
  left: 10px;
}

.pill__bottom-left {
  bottom: 10px;
  left: 10px;
  gap: 6px;
}
</style>