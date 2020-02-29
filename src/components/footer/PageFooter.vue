<template>
  <div class="page-footer">
    <slot />
    <div class="page-footer__copyright">
      <p class="small">聯合報系 著作權所有 <span v-if="deviceType === 'mob'"><br></span>© udngroup.com All Rights Reserved.</p>
    </div>
  </div>
</template>

<script>
import { autoResize_3 } from '@/mixins/masterBuilder.js';
export default {
  name: 'PageFooter',
  mixins: [autoResize_3],
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.page-footer {
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  background: #ffffff;
  .page-footer__copyright {
    position: relative;
    width: 100%;
    text-align: center;
    p {
      color: #9a9a9a;
    }
  }
}
</style>