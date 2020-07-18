<template>
  <component :is="layout"></component>
</template>

<script>
import SideLayout from './SideLayout'
import TopLayout from './TopLayout'
import { mapState } from 'vuex'

export default {
  name: 'layout',
  components: {
    SideLayout,
    TopLayout
  },
  computed: {
    ...mapState({
      layout: state => state.settings.layout
    })
  }
}
</script>

<style></style>
