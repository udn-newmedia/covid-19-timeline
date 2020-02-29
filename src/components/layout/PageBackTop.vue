<template>
  <div class="page-back-top" @click="handleClick">
    <button
      :class="{
        'page-back-top__btn': true,
        'page-back-top__btn--active': activeFlag,
      }"
      aria-label="go-top"
      name="go-top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
        <g id="Group_1106" data-name="Group 1106" transform="translate(-2030 -985)">
          <path id="Path_1100" data-name="Path 1100" d="M1.8,0H43.2A1.8,1.8,0,0,1,45,1.8V43.2A1.8,1.8,0,0,1,43.2,45H1.8A1.8,1.8,0,0,1,0,43.2V1.8A1.8,1.8,0,0,1,1.8,0Z" transform="translate(2030 985)" fill="#f1f1f1" opacity="0.9"/>
          <path id="Path_1406" data-name="Path 1406" d="M-852.737,1857.5-863,1868.537l10.263,11.037" transform="translate(3921.074 1865.5) rotate(90)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
        </g>
      </svg>
    </button>
  </div>
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import _debounce from 'lodash.debounce';
import vueScrollTo from 'vue-scrollto';

export default {
  name: 'PageBackTop',
  mixins: [sendGaMethods],
  data() {
    return {
      activeFlag: false,
    }
  },
  methods: {
    handleClick() {
      vueScrollTo.scrollTo('#app');
      this.sendGA(this.formatGA('PageBackTop'));
    },
    handleScroll: _debounce(function() {
      const currentH = window.pageYOffset;
      const totalH = document.body.scrollHeight - window.innerHeight;
      this.currentProgress = (currentH / totalH) * 100;
      this.activeFlag = this.currentProgress > 50 ? true : false;
    }, 100),
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll, true);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll, true);
  }
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.page-back-top {
  position: fixed;
  overflow: hidden;
  right: 10px;
  bottom: 10px;
  width: 45px;
  height: 45px;
}
.page-back-top__btn {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform: translateY(-100%);
  transition: .333s ease-in-out;
  @include clean-btn;
  &.page-back-top__btn--active {
    transform: translateY(0);
  }
}
</style>