<template>
  <div v-if="dataStatus" id="timeline" class="timeline">
    <ArticleContainer v-show="$store.state.dataType === 'restriction'">
      <p>新冠肺炎（COVID-19）讓全世界陷入恐慌，《聯合報》透過圖表還原台灣防疫關鍵措施。</p>

      <p><span style="color:#0349f0">關鍵一：</span>在病毒感染未明朗之際，台灣政府實施「料敵從嚴」策略，早於日韓等亞洲國家針對 中國大陸實施多次邊境管制，防堵感染者境外移入的可能性。<br><span style="color:#0349f0">關鍵二：</span>WHO尚未宣布新冠病毒人傳人之前，台灣謹慎將新冠病毒先列為法定傳染病，得以啟動一系列傳染病防範措施。<br><span style="color:#0349f0">關鍵三：</span>擺脫科層體制束縛，速度極快地動員跨部門串聯個資撈出接觸者進行檢驗，防制感染在境內擴散。</p>
    </ArticleContainer>
    <ArticleContainer v-show="$store.state.dataType === 'mask'">
      <p>新冠肺炎引發民眾爭搶口罩，台灣政府陸續祭出「禁止出口」、「強制徵用」、「販售實名制」等措施，聯合報整理關鍵時間點，對照疫情發展與政府口罩決策脈絡。</p>
    </ArticleContainer>
    <div id="timeline-anchor" />
    <div :class="{
        'timeline-meta': true,
        'timeline-meta--fixed': metaFixedFlag,
      }"
    >
      <div
        :class="{
          'timeline-meta__item': true,
          'timeline-meta__item--left': true,
        }"
      >
        {{timelineMeta.left}}
      </div>
      <div
        :class="{
          'timeline-meta__item': true,
          'timeline-meta__item--restriction-right': $store.state.dataType === 'restriction',
          'timeline-meta__item--mask-right': $store.state.dataType === 'mask',
        }"
      >
        {{timelineMeta.right}}
      </div>
    </div>

    <TimelineYear
      v-show="$store.state.dataType === 'restriction'"
      v-for="(item, index) in restrictionYearsList"
      :key="'restriction-' + index"
      :year="item"
      :yearData="$store.state.restrictionData[item]"
      dataType="restriction"
    />

    <TimelineYear
      v-show="$store.state.dataType === 'mask'"
      v-for="(item, index) in maskYearsList"
      :key="'mask-' + index"
      :year="item"
      :yearData="$store.state.maskData[item]"
      dataType="mask"
    />
  </div>
  <div v-else class="timeline-loading">
    <div class="timeline-loading__circle" />
  </div>
</template>

<script>
import _debounce from 'lodash.debounce';
import ArticleContainer from '@/components/layout/ArticleContainer.vue';
import TimelineYear from '@/components/timeline/TimelineYear.vue';

export default {
  name: 'Timeline',
  components: {
    ArticleContainer,
    TimelineYear,
  },
  data() {
    return {
      ticking: false,
      metaFixedFlag: false,
    }
  },
  computed: {
    dataStatus() {
      if (this.$store.state.maskData !== null && this.$store.state.maskData !== null) return true;
      return false;
    },
    restrictionYearsList() {
      if (this.$store.state.restrictionData !== null) return Object.keys(this.$store.state.restrictionData)
      return null;
    },
    maskYearsList() {
      if (this.$store.state.maskData !== null) return Object.keys(this.$store.state.maskData)
      return null;
    },
    timelineMeta() {
      if (this.$store.state.dataType === 'restriction') {
        return {
          left: '國際情勢',
          right: '台灣防疫'
        };
      }
      if (this.$store.state.dataType === 'mask') {
        return {
          left: '疫情發展',
          right: '口罩措施'
        };
      }
      return { left: null, right: null };
    }
  },
  methods: {
    handleMetaFixed: _debounce(function() {
      if (!this.ticking) {
        const top = document.getElementById('timeline-anchor').getBoundingClientRect().top;
        const bottom = document.getElementById('timeline').getBoundingClientRect().bottom;
        window.requestAnimationFrame(() => {
          if (top <= 0 && bottom > 0) this.metaFixedFlag = true;
          else this.metaFixedFlag = false;
        
          this.ticking = false;
        });
      }
      this.ticking = true;
    }, 30, {'leading': true, 'trailing': false, 'maxWait': 30}),
  },
  mounted() {
    document.addEventListener('scroll', this.handleMetaFixed, true);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleMetaFixed, true);
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.timeline {
  position: relative;
  width: 100%;
  margin-bottom: 100px;
  @include pc {
    width: 1024px;
    margin: 0 auto 100px auto;
  }
}
.timeline-meta {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  background-color: #ffffff;
  transition: width .333s ease-in-out;
  @include pad {
    max-width: 576px;
  }
  @include pc {
    max-width: 720px;
  }
  &.timeline-meta--fixed {
    position: fixed;
    z-index: 5000;
    top: 0;
    right: 0;
    width: 35%;
    @include pc {
      right: 50%;
      width: 240px;
      transform: translateX(360px);
    }
    .timeline-meta__item {
      width: 45px;
      font-size: 15px;
      border-left: solid 4px;
    }
  }
  .timeline-meta__item {
    display: inline-block;
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: solid 8px;
    text-align: center;
    font-size: 18px;
    line-height: 1;
    transition: .333s ease-in-out;
    @include pc {
      font-size: 25px;
      width: 150px;
    }
    &.timeline-meta__item--left {
      border-color: #707070;
    }
    &.timeline-meta__item--restriction-right {
      border-color: #0349f0;
    }
    &.timeline-meta__item--mask-right {
      border-color: #a10f40;
    }
  }
}
.timeline-loading {
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .timeline-loading__circle {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #707070;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    padding: 0;
    animation: spin 1s linear infinite;
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  }
}
</style>