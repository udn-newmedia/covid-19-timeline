<template>
  <div class="footer-editor article">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FooterEditor',
}
</script>

<style lang="scss" scoped>
@import '~/style/_mixins.scss';
.footer-editor {
  width: 325px;
  @include smob {
    width: 300px;
  }
  // @include pad {}
  @include pc {
    width: 720px;
    padding: 72px 0 16px 0;
  }

  div {
    position: relative;
    width: 100%;
    display: flex;

    p {
      flex-shrink: 0;
      margin-bottom: 0;
      color: #7b7a7a;
      font-size: 0.875rem;
      line-height: 1.5;
      @include pc {
        font-size: 1rem;
      }
      &:first-child {
        width: 45%;
        text-align: right;
        padding-right: 10px;
        @include pc {
          width: 50%;
        }
      }
      &:last-child {
        width: 55%;
        text-align: left;
        padding-left: 10px;
        @include pc {
          width: 50%;
        }
      }
    }

    br {
      @include pc {
        display: none;
      }
    }
  }
}
</style>