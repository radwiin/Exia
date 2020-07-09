<template>
  <div
    class="page-container"
    v-watermark="{
      text: 'demo',
      color: 'rgba(180, 180, 180, 0.3)'
    }"
  >
    该水印功能使用自定义指令实现，其基本原理为构建一张图片设置在指令元素的backgroundImage属性上，故使用该组件需要避免直接使用指令元素的backgroundImage属性。
  </div>
</template>

<script>
import watermark from '@/directive/watermark'

export default {
  name: 'watermark-demo',
  directives: { watermark }
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
