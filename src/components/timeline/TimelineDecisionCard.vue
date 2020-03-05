<template>
  <div :id="cardId" class="timeline-decision-card">
    <div class="timeline-decision-card__pin">
      <div :class="{
          'timeline-decision-card__pin__conection': true,
          'timeline-decision-card__pin__conection--active': data.active,
        }"
      />
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
          'timeline-decision-card__item-left--highlight': +item.level === 3,
          'timeline-decision-card__item--active': data.active,
        }"
      >
        <p>{{item.text}}</p>
        <img v-if="item.image === true"
          :src="selectSrc_2(item.img_mobile, item.img_pc)"
          :alt="item.text"
        >
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
          'timeline-decision-card__item--restriction-highlight-1': +item.level === 2 && $store.state.dataType === 'restriction',
          'timeline-decision-card__item--restriction-highlight-2': +item.level === 3 && $store.state.dataType === 'restriction',
          'timeline-decision-card__item--mask-highlight-1': +item.level === 2 && $store.state.dataType === 'mask',
          'timeline-decision-card__item--mask-highlight-2': +item.level === 3 && $store.state.dataType === 'mask',
          'timeline-decision-card__item--active': data.active,
        }"
      >
        <p>{{item.text}}</p>
        <img v-if="item.image"
          :src="selectSrc_2(item.img_mobile, item.img_pc)"
          :alt="item.text"
        >
      </div>
    </div>
  </div>
</template>

<script>
import { selectSrcMethod_2 } from '@/mixins/masterBuilder.js';

export default {
  name: 'TimelineDecisionCard',
  mixins: [selectSrcMethod_2],
  props: {
    date: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    dataType: {
      type: String,
      required: true,
    },
    dataYear: {
      type: String,
      required: true,
    },
  },
  computed: {
    cardId() {
      return 'timeline-decision-card-' + this.dataType + '-' + this.dataYear + '-' + this.date;
    },
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
    leftImageSrc() {      
      return this.selectSrc_2(
        require(`~/img/timeline/${this.dataType}/mob/l_${this.dataYear}_${this.date.replace('/', '_')}.jpg`),
        require(`~/img/timeline/${this.dataType}/pc/l_${this.dataYear}_${this.date.replace('/', '_')}.jpg`)
      );
    },
    rightImageSrc() {
      return this.selectSrc_2(
        require(`~/img/timeline/${this.dataType}/mob/r_${this.dataYear}_${this.date.replace('/', '_')}.jpg`),
        require(`~/img/timeline/${this.dataType}/pc/r_${this.dataYear}_${this.date.replace('/', '_')}.jpg`)
      );
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
  padding-top: 90px;
  padding-bottom: 50px;
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
    height: 0;
    margin: 0 auto;
    background-color: #000000;
    opacity: 0.75;
    transition: 1s ease-in-out;
    &.timeline-decision-card__pin__conection--active {
      height: calc(100% + 10px);
    }
  }
  .timeline-decision-card__pin__date {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 67px;
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
  padding: 15px 25px;
  margin-bottom: 5px;
  border-radius: 2px;
  background-color: #ffffff;
  opacity: 0;
  @include pc {
    width: 100%;
  }
  &.timeline-decision-card__item--active {
    opacity: 1;
    transform: rotate3d(1, 1, 1, 0) !important;
    @include pc {
      transform: rotateY(0);
    }
  }
  &.timeline-decision-card__item-left {
    margin-right: auto;
    margin-left: -10px;
    transform-origin: 0 0;
    transform: rotate3d(0.1, 1, 0, 20deg);
    transition: .75s ease-in-out;
    border: solid 1px #707070;
    @include pc {
      margin-left: 0px;
      transform-origin: 100% 0;
      transform: rotateY(30deg);
    }
    &.timeline-decision-card__item-left--highlight {
      border: solid 3px #707070;
      font-weight: bold;
      color: #707070;
    }
  }
  &.timeline-decision-card__item-right {
    margin-left: auto;
    margin-right: -10px;
    transform-origin: 100% 0;
    transform: rotate3d(0.1, -1, 0, 20deg);
    transition: .75s .333s ease-in-out;
    @include pc {
      margin-right: 0px;
      transform-origin: 0 0;
      transform: rotateY(-30deg);
      transition: .5s ease-in-out;
    }
    &.timeline-decision-card__item--restriction {
      border: solid 1px #0349f0;
    }
    &.timeline-decision-card__item--mask {
      border: solid 1px #a10f40;
    }
    &.timeline-decision-card__item--restriction-highlight-1 {
      font-weight: bold;
    }
    &.timeline-decision-card__item--restriction-highlight-2 {
      color: #0349f0;
      font-weight: bold;
      border: solid 3px #0349f0;
    }
    &.timeline-decision-card__item--mask-highlight-1 {
      font-weight: bold;
    }
    &.timeline-decision-card__item--mask-highlight-2 {
      color: #a10f40;
      font-weight: bold;
      border: solid 3px #a10f40;
    }
  }
  img {
   width: 100%;
   margin-top: 10px;
  }
}
</style>