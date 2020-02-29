<template>
  <div class="timeline-decision-card">
    <div class="timeline-decision-card__pin">
      <div class="timeline-decision-card__pin__conection" />
      <div class="timeline-decision-card__pin__date">
        {{date}}
      </div>
    </div>

    <div class="timeline-decision-card__section">
      <div
        v-for="(item, index) in dataLeft" :key="index"
        :class="{
          'timeline-decision-card__item': true,
          'timeline-decision-card__item-left': true,
          'timeline-decision-card__item-left--highlight': true,
        }"
      >
        <p>{{item.text}}</p>
      </div>
    </div>
    <div class="timeline-decision-card__section">
      <div
        v-for="(item, index) in dataRight" :key="index"
        :class="{
          'timeline-decision-card__item': true,
          'timeline-decision-card__item-right': true,
          'timeline-decision-card__item--restriction': $store.state.dataType === 'restriction',
          'timeline-decision-card__item--mask': $store.state.dataType === 'mask',
          'timeline-decision-card__item--restriction-highlight': true,
          'timeline-decision-card__item--mask-highlight': true,
        }"
      >
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineDecisionCard',
  props: {
    date: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    activeFlag: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dataLeft() {
      if (this.$store.state.dataType === 'restriction') {
        if (this.data.world) return Object.values(this.data.world);
        else return null;
      } else {
        if (this.data.situation) return Object.values(this.data.situation);
        else return null;
      }
      
    },
    dataRight() {
      if (this.$store.state.dataType === 'restriction') {
        if (this.data.tw) return Object.values(this.data.tw);
        else return null;
      } else {
        if (this.data.measure) return Object.values(this.data.measure);
        else return null;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.timeline-decision-card {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100px;
  padding-top: 105px;
  @include pc {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 0;
  }
}
.timeline-decision-card__pin {
  position: absolute;
  top: 0;
  left: 50%;
  width: 115px;
  height: 100%;
  min-height: 100px;
  text-align: center;
  background-color: #ffffff;
  transform: translateX(-50%);
  .timeline-decision-card__pin__conection {
    position: relative;
    width: 1px;
    height: calc(100% + 10px);
    margin: 0 auto;
    background-color: #000000;
    opacity: 0.75;
  }
  .timeline-decision-card__pin__date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #8b8b8b;
    background-color: #d5d5d5;
  }
}
.timeline-decision-card__section {
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  @include pc {
    width: 435px;
  }
}
.timeline-decision-card__item {
  position: relative;
  width: 82.5%;
  border: solid 1px #000000;
  padding: 15px 25px;
  margin-bottom: 5px;
  background-color: #ffffff;
  @include pc {
    width: 100%;
  }
  &.timeline-decision-card__item-left {
    margin-right: auto;
    &.timeline-decision-card__item-left--active {
      
    }
    &.timeline-decision-card__item-left--highlight {

    }
  }
  &.timeline-decision-card__item-right {
    margin-left: auto;
    &.timeline-decision-card__item-right--active {

    }
    &.timeline-decision-card__item--restriction {
      
    }
    &.timeline-decision-card__item--mask {
      
    }
    &.timeline-decision-card__item--restriction-highlight {
      
    }
    &.timeline-decision-card__item--mask-highlight {
      
    }
  }
}
</style>