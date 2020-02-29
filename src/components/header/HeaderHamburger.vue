<template>
  <div class="header-hamburger">
    <span
      :class="{
        'header-hamburger__line': true,
        'header-hamburger__line--white': theme === 'dark',
        'header-hamburger__line-1': true,
        'header-hamburger__line-1--active': menuActiveFlag,
      }"
    />
    <span
      :class="{
        'header-hamburger__line': true,
        'header-hamburger__line--white': theme === 'dark',
        'header-hamburger__line-2': true,
        'header-hamburger__line-2--active': menuActiveFlag,
      }"
    />
    <span
      :class="{
        'header-hamburger__line': true,
        'header-hamburger__line--white': theme === 'dark',
        'header-hamburger__line-3': true,
        'header-hamburger__line-3--active': menuActiveFlag,
      }"
    />
  </div>
</template>

<script>

export default {
  name: 'HeaderHamburger',
  props: {
    theme: {
      type: String,
    },
    menuActiveFlag: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.header-hamburger {
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px 14px;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: #ffffff00;
  cursor: pointer;

  .header-hamburger__line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #121212;
    transition: .333s ease-in-out;
    &.header-hamburger__line--white {
      background-color: #ffffff;
    }
  }

  .header-hamburger__line-1 {
    transform-origin: 0% 100%;
    &.header-hamburger__line-1--active {
      transform: rotate(45deg);
    }
  }

  .header-hamburger__line-2 {
    width: 65%;
    &.header-hamburger__line-2--active {
      opacity: 0;
    }
  }

  .header-hamburger__line-3 {
    transform-origin: 0% 30%;
    &.header-hamburger__line-3--active {
      transform: rotate(-45deg);
    }
  }
}
</style>