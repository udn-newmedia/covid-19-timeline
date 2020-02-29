<template>
  <div class="ScrollDownArrow">
    <div class="arrows">
      <span class="arrow-top">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="32" viewBox="0 0 42 32">
          <defs>
            <filter id="Path_1458" x="0" y="0" width="42" height="32" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feFlood flood-opacity="0.161"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_1458)">
            <path id="Path_1458-2" data-name="Path 1458" d="M4878.5,611h0l10,10,10-10" transform="translate(-4867.5 -603)" :stroke="iconColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
          </g>
        </svg>
      </span>
      <span class="arrow-down">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="32" viewBox="0 0 42 32">
          <defs>
            <filter id="Path_1459" x="0" y="0" width="42" height="32" filterUnits="userSpaceOnUse">
              <feOffset dy="3" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feFlood flood-opacity="0.161"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_1459)">
            <path id="Path_1459-2" data-name="Path 1458" d="M4878.5,611h0l10,10,10-10" transform="translate(-4867.5 -603)" :stroke="iconColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NmdArrow',
  props: {
    iconColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~/style/_mixins.scss';
$size: 20px;
$speed: 3s;
$peakopacity:0.7;
$color: #fff;
.ScrollDownArrow {
  margin: 0 auto;
  .arrows {
    position: relative;
    cursor: pointer;
    @include clean-tap;
    /**/
    width:$size;
    height:$size;
    display: flex;
    svg {
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .arrow-top {
      position: absolute;
      width:100%;
      height:100%;
      opacity: $peakopacity;
      transform:translate($size/3,$size*4/3);
      animation: arrows $speed linear infinite;
    }
    .arrow-down {
      position: absolute;
      width:100%;
      height:100%;
      opacity: $peakopacity;
      transform:translate($size*2/3,0px);
      animation: arrows $speed linear infinite $speed/-2;
    }
      @keyframes arrows {
        0% {
            opacity: 0;
            border-left:$size/3 solid rgba($color,0);
            border-bottom:$size/3 solid rgba($color,0);
            transform:translate($size/-6,$size*4/-6);
        }
        10%, 90% {
            opacity: 0;
            border-left:$size/3 solid rgba($color,0);
            border-bottom:$size/3 solid rgba($color,0);
        }
        50% {
            opacity: $peakopacity;
            transform:translate($size/-6,0px);
        }
        100% {
            opacity: 0;
            transform:translate($size/-6,$size*4/6);
        }
      }
  }
}
</style>