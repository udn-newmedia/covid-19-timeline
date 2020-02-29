<template>
  <header
    :class="{
      'header-bar': true,
      'header-bar--hide': !activeFlag,
    }"
  >
    <HeaderMenu :menuActiveFlag="menuActiveFlag" :simplified="true" ><slot /></HeaderMenu>
    <div class="header-bar__nav__container">
      <nav class="header-bar__nav">
        <div
          class="header-bar__logo"
          @click="sendGA(formatGA('HeaderUdnLogo'))"
        >
          <a
            :href="href"
            target="_self"
            rel="noopener"
            aria-label="聯logo"
            name="聯logo"
          >
            <UdnLogo />
          </a>
        </div>
      </nav>
      <nav class="header-bar__nav">
        <div class="header-bar-share__container">
          <div class="header-bar-share__share-icon">
            <ShareFb />
          </div>
          <div class="header-bar-share__share-icon">
            <ShareLine />
          </div>
          <div class="header-bar-share__share-icon">
            <ShareTwitter />
          </div>
        </div>
        <div class="header-bar__hamburder-container" @click="handleHamburgerClick">
          <HeaderHamburger :menuActiveFlag="menuActiveFlag" />
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import _debounce from 'lodash.debounce';
import { sendGaMethods } from '@/mixins/masterBuilder.js';
import HeaderHamburger from '@/components/header/HeaderHamburger.vue';
import HeaderMenu from '@/components/header/HeaderMenu.vue';
import UdnLogo from '@/components/pinhead/UdnLogo.vue';
import ShareFb from '@/components/pinhead/ShareFb.vue';
import ShareLine from '@/components/pinhead/ShareLine.vue';
import ShareTwitter from '@/components/pinhead/ShareTwitter.vue';

export default {
  name: 'HeaderTypeA',
  mixins: [sendGaMethods],
  props: {
    useMenu: {
      type: String,
      default: 'true'
    },
    href: {
      type: String,
      default: window.location.href,
    },
  },
  components: {
    HeaderHamburger,
    HeaderMenu,
    UdnLogo,
    ShareFb,
    ShareLine,
    ShareTwitter
  },
  data() {
    return {
      activeFlag: true,
      menuActiveFlag: false,
      lastPosition: window.pageYOffset,
      ticking: false,
    }
  },
  methods: {
    handleHamburgerClick() {
      this.menuActiveFlag = !this.menuActiveFlag;

      if (this.menuActiveFlag) this.sendGA(this.formatGA('HeaderMenuOpen'));
      else this.sendGA(this.formatGA('HeaderMenuClose'));
    },
    handleScroll: _debounce(function() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          // activeFlag
          if (!this.menuActiveFlag) {
            if (this.lastPosition >= window.pageYOffset) this.activeFlag = true;
            else this.activeFlag = false;
            this.lastPosition = window.pageYOffset;            
          }
          this.ticking = false;
        });
      }
      this.ticking = true;
    }, 30,  {'leading': true, 'trailing': false, 'maxWait': 30}),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, true);
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.header-bar {
  position: fixed;
  z-index: 4999;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;

  transition: .333s linear;

  &.header-bar--hide {
    transition: .333s linear;
    transform: translateY(-100%);
  }

  .header-bar__nav__container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-bar__nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-bar__logo {
    position: relative;
    width: 50px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .333s ease-in;
    &:hover {
      transform: rotate(20deg);
    }
    a {
      text-decoration: none;
      cursor: pointer;
      @include clean-tap;
    }
  }

  .header-bar-share__container {
    position: relative;
    width: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: .333s ease-in-out;

    .header-bar-share__share-icon {
      flex-shrink: 0;
      position: relative;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      @include clean-btn
    }
  }

  .header-bar__hamburder-container {
    position: relative;
  }
}
</style>