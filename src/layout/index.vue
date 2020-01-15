<template>
  <el-container class="app-wrapper">
    <el-aside class="aside-wrapper">
      <div class="logo-wrapper">
        <img class="logo" src="@/assets/logo.png" alt="logo" />
      </div>
      <nav-menu
        class="nav-menu"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeMenu"
        :menu="menu"
      />
    </el-aside>
    <el-container>
      <el-header class="header-wrapper">
        <div class="hamburger-wrapper" @click="collapse = !collapse">
          <svg-icon
            icon-class="hamburger"
            :class-name="`hamburger ${collapse ? '' : 'is-active'}`"
          />
        </div>
      </el-header>
      <el-main class="main-wrapper">
        <keep-alive>
          <router-view />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { routes } from "@/router";
import NavMenu from "@/components/NavMenu";
export default {
  name: "Layout",
  components: {
    NavMenu
  },
  data: () => ({
    collapse: true,
    menu: routes
  }),
  computed: {
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
};
</script>

<style lang="scss" scoped>
$MenuWidth: 200px;
$HeaderHeight: 50px;

.app-wrapper {
  height: 100%;

  .aside-wrapper {
    width: unset !important;
    flex-shrink: 1;
    flex-grow: 0;

    .logo-wrapper {
      height: $HeaderHeight;
      background: #545c64;
      border-right: solid 1px #e6e6e6;
      display: flex;
      align-items: center;
      justify-content: center;

      .logo {
        width: 24px;
        height: 24px;
      }
    }

    .nav-menu {
      height: calc(100% - #{$HeaderHeight});

      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }

  .header-wrapper {
    height: $HeaderHeight !important;
    padding: 0px;
    display: flex;
    align-items: center;

    .hamburger-wrapper {
      width: $HeaderHeight;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }

      .hamburger {
        width: 20px;
        height: 20px;
        transition: transform 0.3s;

        &.is-active {
          transform: rotate(180deg);
        }
      }
    }
  }

  .main-wrapper {
    padding: unset;
  }
}
</style>
