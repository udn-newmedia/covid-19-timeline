<template>
  <div class="share-line share-button">
    <a
      :href="shareUrl"
      :target="target"
      rel="noopener"
      aria-label="share-line"
      title="share-line"
      @click="sendGA(formatGA('HeaderShareLine'))"
    >
      <button
        aria-label="share"
        name="share-line"
      >
        <i
          :class="{
            'icon-line-brands': true,
            'icon-theme-light': theme === 'light',
            'icon-theme-dark': theme === 'dark',
          }"
        />
      </button>
    </a>
  </div>
</template>

<script>
import Utils from '@/utils/udn-newmedia-utils'
import { sendGaMethods } from '@/mixins/masterBuilder.js';

const isMobile = Utils.detectMob();
const isInApp = Utils.isFacebookApp(148) || Utils.isLineApp();

export default {
  name: 'ShareLine',
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
      const sharedText = document.querySelector('title').innerHTML
      const shareContent = document.querySelector('meta[property="og:description"]').content

      // desktop
      if (!isMobile) {
        return `https://social-plugins.line.me/lineit/share?text=${encodeURIComponent(sharedText)}%0D%0A%0D%0A${encodeURIComponent(shareContent)}&url=${encodeURIComponent(this.href)}`
      }
      // mobile
      if (!isInApp) {
        return `https://line.naver.jp/R/msg/text/?${encodeURIComponent(sharedText)}%0D%0A%0D%0A${encodeURIComponent(shareContent)}%0D%0A%0D%0A${encodeURIComponent(this.href)}`
      }
      // mobile in-app webview
      return `https://line.naver.jp/R/msg/text/?${encodeURIComponent(sharedText)}%0D%0A%0D%0A${encodeURIComponent(shareContent)}%0D%0A%0D%0A${encodeURIComponent(this.href)}`
    },
    target() {
      if (!isMobile) return '_blank';
      return '_self';
    },
  },
}
</script>

<style lang="scss" scoped>
.share-line {
  i {
    font-size: 25px;
    font-family: Arial, 微軟正黑體, sans-serif;
  }
}
</style>