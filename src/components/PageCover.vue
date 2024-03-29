<template>
  <div class="page-cover">
    <div class="page-cover__arrow" @click="handleScroll">
      <NmdArrow />
    </div>
    <div id="timeline-controller"
      :class="{
        'article': true,
        'page-cover__timeline-controller': true,
        'page-cover__timeline-controller--fixed': controllerFixed,
        'page-cover__timeline-controller--shrink': controllerShrink,
      }"
    >
      <div
        :class="{
          'page-cover__timeline-controller__button': true,
          'page-cover__timeline-controller__button--restriction': $store.state.dataType === 'restriction',
        }"
        @click="handleControllerClick('restriction')"
      >
        邊境管制
      </div>
      <div
        :class="{
          'page-cover__timeline-controller__button': true,
          'page-cover__timeline-controller__button--mask': $store.state.dataType === 'mask',
        }"
        @click="handleControllerClick('mask')"
      >
        口罩措施
      </div>
    </div>
    <div class="page-cover__enter-anchor" id="enter-anchor" />
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import NmdArrow from '@/components/pinhead/NmdArrow.vue';
import vueScrollTo from 'vue-scrollto';

export default {
  name: 'PageCover',
  mixins: [sendGaMethods],
  components: {
    NmdArrow,
  },
  data() {
    return {
      ticking: false,
      controllerFixed: false,
      controllerShrink: false,
    }
  },
  methods: {
    handleScroll() {
      vueScrollTo.scrollTo('#enter-anchor');
      this.sendGA(this.formatGA('CoverArrow'));
    },
    handleControllerFixed: _debounce(function() {
      if (!this.ticking) {
        const top = window.pageYOffset;
        const bottom = document.getElementById('timeline').getBoundingClientRect().bottom;
        const anchorTop = document.getElementById('timeline-anchor').getBoundingClientRect().top;

        window.requestAnimationFrame(() => {
          // fixed
          if (top >= window.innerHeight - 150 && bottom > 0) this.controllerFixed = true;
          else this.controllerFixed = false;

          // shrink
          if (anchorTop <= 100 && bottom > 0) this.controllerShrink = true;
          else this.controllerShrink = false;

          this.ticking = false;
        });
      }
      this.ticking = true;
    }, 30, {'leading': true, 'trailing': false, 'maxWait': 30}),
    handleControllerClick(payload) {
      if (this.$store.state.dataType !== payload) {
        vueScrollTo.scrollTo('#enter-anchor');
        this.sendGA({
          category: 'tab',
          action: 'click',
          label: payload
        });
      }
      this.$store.dispatch('changeDataType', payload);
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleControllerFixed, true);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleControllerFixed, true);
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.page-cover {
  position: relative;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-image: url('../assets/img/cover/mob.jpg');
  @include pad {
    background-image: url('../assets/img/cover/pad.jpg');
  }
  @include pc {
    background-image: url('../assets/img/cover/pc.jpg');
  }
}
.page-cover__timeline-controller {
  position: absolute;
  z-index: 5001;
  left: 0;
  bottom: 100px;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  background-color: transparent !important;
  padding: 0 !important;
  transition: .666s ease-in-out;
  @include pad {
    left: 50%;
    transform: translateX(-50%);
  }
  @include pc {
    left: 50%;
    transform: translateX(-50%);
  }
  &.page-cover__timeline-controller--fixed {
    position: fixed;
    top: 0px;
  }
  &.page-cover__timeline-controller--shrink {
    width: 65%;
    @include pad {
      left: 0;
      transform: translateX(0);
    }
    @include pc {
      width: 480px;
      transform: translateX(-360px);
    }
  }
  .page-cover__timeline-controller__button {
    display: inline-block;
    width: 50%;
    height: 100%;
    padding: 10px 0;
    text-align: center;
    color: #9f9f9f;
    background-color: #efefef;
    transition: .333s ease-in-out;
    cursor: pointer;
    @include clean-tap;
    &.page-cover__timeline-controller__button--restriction {
      font-weight: bold;
      color: #ffffff;
      background-color: #0349f0;
    }
    &.page-cover__timeline-controller__button--mask {
      font-weight: bold;
      color: #ffffff;
      background-color: #a10f40;
    }
  }
}
.page-cover__arrow {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
.page-cover__enter-anchor {
    position: absolute;
    bottom: 0;
  }
</style>