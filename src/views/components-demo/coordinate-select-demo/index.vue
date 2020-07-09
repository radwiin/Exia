<template>
  <div class="page-container">
    <coordinate-select v-model="location" class="coordinate-select" />
  </div>
</template>

<script>
import CoordinateSelect from '@/components/CoordinateSelect'

export default {
  name: 'coordinate-select-demo',
  components: { CoordinateSelect },
  data: () => ({
    location: null
  })
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;

  .coordinate-select {
    height: 100%;
  }
}
</style>
