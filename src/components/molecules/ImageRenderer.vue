<template>
  <CardImage
    :media_urls="media_urls"
    :advert="advert"
    :key_features="key_features"
  />
  <ImageCarousel :media_urls="media_urls" />
</template>
<script setup lang="ts">
import CardImage from "@molecules/CardImage.vue";
import ImageCarousel from "@atoms/ImageCarousel.vue";

interface MediaUrl {
  large: string;
  medium: string;
  thumb: string;
}

export interface ImageProps {
  media_urls: MediaUrl[];
  advert: string;
  key_features: string[];
}

const props = defineProps<ImageProps>();
</script>
<style scoped lang="scss">
</style>