<template>
  <div class="layout">
    <side-navbar></side-navbar>
    <div class="page">
      <top-navbar></top-navbar>
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'

export default {
  name: 'SideLayout',
  components: {
    TopNavbar,
    SideNavbar
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
