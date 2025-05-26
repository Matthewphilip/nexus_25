<template>
  <article class="card" @click="onClick">
    <slot name="content" />
  </article>
</template>
<script lang="ts">
</script>
<style setup lang="scss">
.card {
  width: 375px;
  height: 211px;
  background-color: white;
  //   border: 1px solid #ccc;

  @media (min-width: 760px) {
    border: 1px solid #ccc;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 327px;
    height: 364px;
    border-radius: 16px;
  }
}
</style>