<template>
  <div v-scrollbar class="page-container">
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PageContainer',
  computed: {
    ...mapState({
      layout: state => state.settings.layout
    })
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  height: 100%;
  padding: 80px 25px 0;
}
</style>
