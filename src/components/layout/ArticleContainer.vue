<template>
  <div class="article-container"
    :style="{
      backgroundColor: bgColor,
    }"
  >
    <div class="article">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleContainer',
  props: {
    bgColor: {
      type: String,
      default: '#ffffff',
    },
  },
}
</script>

<style lang="scss" scoped>
.article-container {
  position: relative;
  width: 100%;
}
</style>