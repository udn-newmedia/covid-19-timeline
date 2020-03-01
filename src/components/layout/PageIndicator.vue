<template>
  <div class="page-indicator">
    <div
      class="page-indicator__progress"
      :style="{
        width: progressWidth,
        backgroundColor: color
      }"
    />
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import { sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'PageIndicator',
  mixins: [sendGaMethods],
  props: {
    color: {
      type: String,
      default: '#cf0606'
    },
  },
  data() {
    return {
      readProgress: 0,
      lastStage: 0,
      ticking: false,
    };
  },
  computed: {
    progressWidth() {
      return this.readProgress + '%';
    }
  },
  methods: {
    handleScroll: _debounce(function() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          let currentHeight = window.pageYOffset;
          let totalHeight = document.body.scrollHeight - window.innerHeight;
          this.readProgress = ((currentHeight / totalHeight) * 100).toFixed(2);
          this.ticking = false;

          const progress = Math.floor(this.readProgress / 10);
          if (progress > this.lastStage) {
            this.lastStage = progress;
            this.sendGA({
              category: 'read',
              action: 'scroll',
              label: 'page read: ' + (this.lastStage * 10) + '%'
            });
          }
        });
      }
      this.ticking = true;
    }, 100),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, { passive: true });
  },
}
</script>

<style lang="scss" scoped>
.page-indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  z-index: 5010;

  .page-indicator__progress {
    position: relative;
    width: 0;
    height: 100%;
    transition: width .666s ease-out;
  }
}
</style>