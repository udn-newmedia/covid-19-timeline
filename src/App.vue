<template>
  <div id="app">
    <PageIndicator />
    <HeaderTypeA />
    <PageCover />
    <Timeline />
    <PageFooter>
      <FooterEditor>
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
