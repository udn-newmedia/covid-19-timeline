<template>
  <div class="share-twitter share-button">
    <a
      :href="shareUrl"
      target="_blank"
      rel="noopener"
      aria-label="share-twitter"
      name="share-twitter"
      @click="sendGA(formatGA('HeaderShareTwitter'))"
    >
      <button
        aria-label="share"
        name="share-twitter"
      >
        <i
          :class="{
            'icon-twitter-brands': true,
            'icon-theme-light': theme === 'light',
            'icon-theme-dark': theme === 'dark',
          }"
        />
      </button>
    </a>
  </div>
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'ShareTwitter',
  mixins: [sendGaMethods],
  props: {
    href: {
      type: String,
      default: document.querySelector('meta[property="og:url"]').content,
    },
    theme: {
      type: String,
      default: 'light'
    },
  },
  computed: {
    shareUrl() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(document.querySelector('meta[property="og:description"]').content)}%0D%0A%0D%0A${encodeURIComponent(this.href)}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.share-twitter {
  padding-top: 2px;
  i {
    font-size: 22px;
    font-family: Arial, 微軟正黑體, sans-serif;
  }
}
</style>