<template>
  <div id="app">
    <PageIndicator />
    <HeaderTypeA>
      <a
        href="https://udn.com/newmedia/2020/covid-19/"
        target="_blank"
        rel="noopener"
        aria-label="outlink"
        name="outlink"
        @click="sendGA(formatGA('MenuLink_1'))"
      >
        全球疫情地圖
      </a>
      <a class="active">台灣防疫決策</a>
      <a
        href="https://udn.com/newmedia/2020/covid-19-taiwan/"
        target="_blank"
        rel="noopener"
        aria-label="outlink"
        name="outlink"
        @click="sendGA(formatGA('MenuLink_3'))"
      >
        圖解病例關係
      </a>
    </HeaderTypeA>
    <PageCover />
    <Timeline />
    <PageFooter>
      <FooterEditor>
        <div>
          <p>最後更新</p>
          <p>2020.03.02</p>
        </div>
        <div>
          <p>資料來源</p>
          <p>中央流行疫情指揮中心、<br>行政院、疾管署、<br>經濟部、教育部</p>
        </div>
        <div style="margin-bottom: 24px">
          <p>照片</p>
          <p>報系資料照、<br>美聯社、中新社</p>
        </div>
        <div>
          <p>製作人</p>
          <p>林秀姿、蔡佩蓉</p>
        </div>
        <div>
          <p>視覺設計</p>
          <p>蘇士堯</p>
        </div>
        <div>
          <p>網頁製作</p>
          <p>楊若榆</p>
        </div>
        <div>
          <p>製作單位</p>
          <p>聯合報新媒體中心、<br>視覺設計中心</p>
        </div>
        <div>
          <p>監製</p>
          <p>聯合報新聞部</p>
        </div>
      </FooterEditor>
      <FooterShare />
      <FooterFbComment />
      <FooterLogo />
    </PageFooter>
    <PageBackTop />
  </div>
</template>

<script>
import { sendGaMethods } from '@/mixins/masterBuilder.js';

import HeaderTypeA from '@/components/header/HeaderTypeA.vue';
import FooterEditor from '@/components/footer/FooterEditor.vue';
import FooterFbComment from '@/components/footer/FooterFbComment.vue';
import FooterLogo from '@/components/footer/FooterLogo.vue';
import FooterShare from '@/components/footer/FooterShare.vue';
import PageBackTop from '@/components/layout/PageBackTop.vue';
import PageFooter from '@/components/footer/PageFooter.vue';
import PageCover from '@/components/PageCover.vue';
import PageIndicator from '@/components/layout/PageIndicator.vue';
import Timeline from '@/components/timeline/Timeline.vue';

export default {
  name: 'App',
  mixins: [sendGaMethods],
  components: {
    HeaderTypeA,
    FooterEditor,
    FooterFbComment,
    FooterLogo,
    FooterShare,
    PageBackTop,
    PageFooter,
    PageCover,
    PageIndicator,
    Timeline,
  },
  mounted() {
    this.$store.dispatch('getRestrictionData');
    this.$store.dispatch('getMaskData');
  }
}
</script>
