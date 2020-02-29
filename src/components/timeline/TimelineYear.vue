<template>
  <div class="timeline-year">
    <div class="timeline-year__year-title">
      {{year}}
    </div>
    <TimelineDecisionCard
      v-for="(item, index) in dataIndexList" :key="index"
      :date="item"
      :data="yearData[item]"
    />
    <div class="timeline-year__bottom-mask" />
  </div>
</template>

<script>
import TimelineDecisionCard from '@/components/timeline/TimelineDecisionCard.vue';

export default {
  name: 'TimelineYear',
  components: {
    TimelineDecisionCard,
  },
  props: {
    year: {
      type: String,
      required: true,
    },
    yearData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dataIndexList() {
      return Object.keys(this.yearData);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';

.timeline-year {
  position: relative;
  width: 100%;
}
.timeline-year__year-title {
  font-size: 64px;
  text-align: center;
  color: #cdcdcd;
  @include pc {
    font-size: 88px;
  }
}
.timeline-year__bottom-mask {
  position: absolute;
  left: 0;
  bottom: -20px;
  width: 100%;
  height: 20px;
  background-color: #ffffff;
}
</style>