<template>
  <div class="layout">
    <side-navbar></side-navbar>
    <div class="page">
      <top-navbar></top-navbar>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedRoutes">
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'
import { mapTree } from '@/utils'

export default {
  name: 'SideLayout',
  components: {
    TopNavbar,
    SideNavbar
  },
  computed: {
    cachedRoutes() {
      const cachedRoutes = []
      mapTree(this.$store.getters.routes, route => {
        if (!route.meta || !route.meta.noCache) {
          route.name && cachedRoutes.push(route.name)
        }
        return route
      })
      return cachedRoutes
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  position: relative;

  .page {
    height: 100%;
    margin-left: 50px;
    position: relative;
    overflow: hidden;
  }
}
</style>
