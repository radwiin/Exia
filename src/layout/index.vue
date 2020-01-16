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
        background-color="#3d4ea8"
        text-color="#909399"
        active-text-color="#ffffff"
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
        <div class="right-menu-wrapper">
          <el-tooltip content="Setting" placement="bottom">
            <div class="menu-item" @click="handleSettingClick">
              <svg-icon icon-class="setting" />
            </div>
          </el-tooltip>
        </div>
      </el-header>
      <el-main class="main-wrapper">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </el-main>
    </el-container>
    <setting-drawer :visible.sync="settingDrawer" />
  </el-container>
</template>

<script>
import { routes } from "@/router";
import NavMenu from "@/components/NavMenu";
import settingDrawer from "./components/SettingDrawer";
export default {
  name: "Layout",
  components: {
    NavMenu,
    settingDrawer
  },
  data: () => ({
    collapse: true,
    menu: routes,
    settingDrawer: false
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
    handleClose() {},
    handleSettingClick() {
      this.settingDrawer = true;
    }
  }
};
</script>

<style lang="scss" scoped>
$MenuWidth: 241px;
$HeaderHeight: 50px;

.app-wrapper {
  height: 100%;

  .aside-wrapper {
    width: unset !important;
    flex-shrink: 1;
    flex-grow: 0;

    .logo-wrapper {
      height: $HeaderHeight;
      background: #3d4ea8;
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
        width: $MenuWidth;
      }
    }
  }

  .header-wrapper {
    height: $HeaderHeight !important;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .hamburger-wrapper {
      width: $HeaderHeight;
      height: 100%;
      flex-shrink: 0;
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

    .right-menu-wrapper {
      height: 100%;
      flex-shrink: 0;

      .menu-item {
        height: 100%;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        ::v-deep .svg-icon {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  .main-wrapper {
    padding: unset;
  }
}
</style>
