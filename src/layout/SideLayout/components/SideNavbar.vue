<template>
  <div :class="['side-navbar', { collapse }]" @mouseenter="collapse = false" @mouseleave="collapse = true">
    <header :class="`side-navbar__header ${collapse ? 'is-collapse' : ''}`">
      <svg-icon class="logo" icon-class="vue" class-name="vue" />
      <span class="title">Exia Admin</span>
    </header>
    <auto-el-menu
      class="side-navbar__menu"
      :collapse="collapse"
      @open="handleOpen"
      @close="handleClose"
      :default-active="activeMenu"
      :collapse-transition="false"
    ></auto-el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AutoElMenu from '@/components/AutoElMenu'

export default {
  name: 'SideNavbar',
  components: {
    AutoElMenu
  },
  data: () => ({
    collapse: true
  }),
  computed: {
    ...mapGetters(['account', 'roles', 'allRoutes']),
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleUserClick() {}
  }
}
</script>

<style lang="scss" scoped>
$MenuWidth: 241px;
$HeaderHeight: 64px;
$MenuWidthCollapse: 64px;

.side-navbar {
  position: absolute;
  left: 0;
  height: 100%;
  width: $MenuWidth;
  z-index: 2000;
  display: flex;
  flex-flow: column nowrap;
  transition: width 0.28s;
  overflow: hidden;
  border-radius: 0px 30px 30px 0px;

  &.collapse {
    width: $MenuWidthCollapse;
  }

  &__header {
    flex: none;
    width: 100% !important;
    height: $MenuWidthCollapse;
    background: #fff;
    border-radius: 0px 30px 0px 0px;
    display: flex;
    align-items: center;
    // transition: width 0.3s ease-in-out;
    overflow: hidden;

    &.is-collapse {
      width: $MenuWidthCollapse;
    }

    .logo {
      width: 27px;
      height: 27px;
      margin: 18px;
      flex: 0 0 auto;
      color: #000;
    }

    .title {
      font-size: 1.1rem;
      white-space: nowrap;
      flex: 0 1 auto;
    }
  }

  &__menu {
    flex: auto;
    width: 100% !important;
    border: 0px !important;
    min-height: 0px;

    &::-webkit-scrollbar {
      width: 0px;
    }

    &:not(.el-menu--collapse) {
      width: $MenuWidth;
    }
  }
}
</style>
