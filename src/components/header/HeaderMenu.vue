<template>
  <div
    v-if="!simplified"
    :class="{
      'header-menu': true,
      'header-menu--active': menuActiveFlag,
    }"
  >
    <div
      :class="{
        'header-menu__content': true,
        'header-menu__content-dark': theme === 'dark',
        'header-menu__content-light': theme === 'light',
        'header-menu__content--active': menuActiveFlag,
      }"
    >
      <slot />
    </div>
  </div>
  <div v-else
    :class="{
      'header-manu-simplified': true,
      'header-manu-simplified--active': menuActiveFlag,
    }"
  >
    <div
      :class="{
        'header-menu__content': true,
        'header-menu__content--active': menuActiveFlag,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { autoResize_3, sendGaMethods } from '@/mixins/masterBuilder.js';

export default {
  name: 'HeaderMenu',
  mixins: [autoResize_3, sendGaMethods],
  props: {
    menuActiveFlag: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
    },
    simplified: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    menuActiveFlag: function(value) {
      if (value) document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      else document.getElementsByTagName('body')[0].style.overflow = 'auto';
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.header-menu {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0;
  transition: .333s ease-in-out;
  @include pad {
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      backdrop-filter: blur(8px);
      background-color: rgba(#000000, 0.6);
    }
  }
  @include pc {
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      backdrop-filter: blur(8px);
      background-color: rgba(#000000, 0.6);
    }
  }
  &.header-menu--active {
    visibility: visible;
    pointer-events: auto;
    opacity: 1;
  }

  .header-menu__content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 125px 56px;
    transition: .666s ease-in-out;
    transform: translateY(-100%);

    @include pad {
      height: 40%;
      min-height: 375px;
      padding: 150px 56px;
    }
    @include pc {
      width: 475px;
      padding: 176px 56px;
    }

    &.header-menu__content--active {
      transform: translateY(0);
    }
    &.header-menu__content-dark {
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        backdrop-filter: blur(23px);
        background-color: rgba(#000000, 0.8);
      }
      a {
        color: #f6f6f6;
        opacity: 0.7;
        &.active {
          color: #ffffff;
          opacity: 1;
          border-bottom: solid 1px #e9e9e9;
        }
      }
    }
    &.header-menu__content-light {
      background-color: #ffffff;
      @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        backdrop-filter: blur(8px);
        box-shadow: 0 0 10px 0 rgba(165, 165, 165, 0.23);
        background-color: rgba(#ffffff, 0.8);
      }
      a {
        color: #000000;
        &.active {
          color: #787878;
          border-bottom: solid 1px #000000;
        }
      }
    }
  }

  a {
    display: block;
    width: 100%;
    padding: 8px 0;
    margin-bottom: 8px 0;
    outline: none;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    @include clean-tap;

    @include pad {
      width: 35%;
    }
    @include pc {
    width: 75%;
  }
  }
}
.header-manu-simplified {
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  transition: .333s ease-in-out;
  @include pad {
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      backdrop-filter: blur(8px);
      background-color: rgba(#000000, 0.6);
    }
  }
  @include pc {
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      backdrop-filter: blur(8px);
      background-color: rgba(#000000, 0.6);
    }
  }

  &.header-manu-simplified--active {
    visibility: visible;
    pointer-events: auto;
    opacity: 1;
  }

  .header-menu__content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 85px;
    background-color: #f6f6f6;
    transform: translateX(100%);
    transition: .666s ease-out;

    @include pad {
      width: 60%;
      min-width: 450px;
      justify-content: start;
      padding: 250px 45px;
    }
    @include pc {
      width: 35%;
      min-width: 450px;
      justify-content: start;
      padding: 185px 100px;
    }

    &.header-menu__content--active {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
      @include pad {
        transform: translateX(0);
      }
      @include pc {
        transform: translateX(0);
      }
    }

    a {
      display: block;
      margin: 12px 0;
      outline: none;
      text-decoration: none;
      line-height: 1;
      font-size: 18px;
      opacity: 0.7;
      color: #333333;
      cursor: pointer;
      @include clean-tap;

      @include pad {
        font-size: 24px;
        margin: 8px 0;
      }
      @include pc {
        font-size: 24px;
        margin: 8px 0;
      }

      &.active {
        color: #333333;
        opacity: 1;
        border-bottom: solid 1px #000000;
      }
    }
  }
}
</style>