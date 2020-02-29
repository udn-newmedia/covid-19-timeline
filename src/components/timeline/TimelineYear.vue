<template>
  <div class="timeline-year">
    <div class="timeline-year__year-title">
      {{year}}
    </div>
    <TimelineDecisionCard
      v-for="(item, index) in dataIndexList" :key="index"
      :date="item"
      :data="yearData[item]"
      :dataType="dataType"
      :dataYear="year"
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
    dataType: {
      type: String,
      required: true,
    }
  },
  computed: {
    dataIndexList() {
      return Object.keys(this.yearData);
    },
  },
  methods: {
    handleCardScroll() {
      this.dataIndexList.forEach(e => {
        const position = document.getElementById('timeline-decision-card-' + this.dataType + '-' + this.year +'-' + e).getBoundingClientRect();
        // console.log(position);
        if (position.top <= window.innerHeight * 0.75 && position.bottom > 0) {
          this.$store.dispatch('updateDataActive', {
            year: this.year,
            date: e,
            dataType: this.dataType,
            status: true
          });
        }
        // else {
        //   this.$store.dispatch('updateDataActive', {
        //     year: this.year,
        //     date: e,
        //     dataType: this.dataType,
        //     status: false
        //   });
        // }
      });
    },
  },
  mounted() {
    document.addEventListener('scroll', this.handleCardScroll, true);
  },
  destroyed() {
    document.removeEventListener('scroll', this.handleCardScroll, true);
  },
};
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.timeline-year {
  position: relative;
  overflow: hidden;
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
  height: 80px;
  background-color: #ffffff;
  @include pc {
    bottom: -15px;
  }
}
</style>