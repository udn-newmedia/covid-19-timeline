<template>
  <div class="footer-logo">
    <a
      href="https://udn.com/news/index" 
      target="_blank"
      rel="noopener"
      aria-label="聯合新聞網"
      name="聯合新聞網"
      @click="sendGA(formatGA('FooterLogoDotCom'))"
    >
      <img :src="img.dotCom" alt="聯合新聞網">
    </a>
    <a
      href="https://www.facebook.com/udnNewMediaLab/" 
      target="_blank"
      rel="noopener"
      aria-label="聯合報新媒體中心"
      name="聯合報新媒體中心"
      @click="sendGA(formatGA('FooterLogoNMD'))"
    >
      <img :src="img.nmd" alt="聯合報新媒體中心">
    </a>
    <a
      v-if="useVision === 'yes'"
      href="https://vision.udn.com/" 
      target="_blank"
      rel="noopener"
      aria-label="聯合報系願景工程"
      name="聯合報系願景工程"
      @click="sendGA(formatGA('FooterLogoVision'))"
    >
      <img :src="img.vision" alt="聯合報系願景工程">
    </a>
  </div>
</template>

<script>
import { sendGaMethods } from "@/mixins/masterBuilder.js";

import dotCom from '~/img/logo/dot_com.jpg';
import nmd from '~/img/logo/nmd.jpg';
import vision from '~/img/logo/vision.jpg';
export default {
  name: 'FooterLogo',
  mixins: [sendGaMethods],
  props: {
    useVision: {
      type: String,
    },
  },
  data() {
    return {
      img: {
        dotCom: dotCom,
        nmd: nmd,
        vision: vision
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.footer-logo {
  position: relative;
  width: 250px;
  margin: 0 auto;
  text-align: center;
  @include pad {
    width: 420px;
  }
  @include pc {
    width: 420px;
  }
  a {
    @include clean-tap;
  }
  img {
    width: 100px;
    margin: 0 8px;
  }
}
</style>