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
        background-color="#253ca4"
        text-color="#8492cf"
        active-text-color="#ffffff"
        :default-active="activeMenu"
        :data="allRoutes"
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
        <breadcrumb class="breadcrumb-container" />
        <div class="right-menu-wrapper">
          <el-tooltip content="Setting" placement="bottom">
            <div class="menu-item" @click="handleSettingClick">
              <svg-icon icon-class="setting" />
            </div>
          </el-tooltip>
          <el-popover
            placement="bottom"
            width="250"
            trigger="hover"
            popper-class="popper-wrapper"
          >
            <div slot="reference" class="menu-item" @click="handleUserClick">
              <span>{{ account }}</span>
            </div>
            <div class="user-menu">
              <div class="user-info-item">
                <el-avatar
                  shape="square"
                  :size="50"
                  :src="require('@/assets/avator.jpg')"
                />
                <span class="user-name">{{ account }}</span>
              </div>
              <div class="user-menu-item">
                <svg-icon icon-class="user" class-name="user-menu-item-icon" />
                <span class="user-menu-item-label">{{ roles.join(",") }}</span>
              </div>
              <div class="user-menu-item" @click="handleExitClick">
                <svg-icon
                  icon-class="logout"
                  class-name="user-menu-item-icon"
                />
                <span class="user-menu-item-label">登出</span>
              </div>
            </div>
          </el-popover>
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
import { mapGetters } from "vuex";
import NavMenu from "@/layout/components/NavMenu";
import settingDrawer from "@/layout/components/SettingDrawer";
import Breadcrumb from "./components/Breadcrumb";

export default {
  name: "SideMenuLayout",
  components: {
    NavMenu,
    settingDrawer,
    Breadcrumb
  },
  data: () => ({
    collapse: true,
    settingDrawer: false
  }),
  computed: {
    ...mapGetters(["account", "roles", "allRoutes"]),
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
    },
    handleUserClick() {},
    handleExitClick() {
      this.$store.dispatch("app/removeUserInfo").then(() => {
        this.$router.push({ path: "/login" });
      });
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
    flex-shrink: 0;
    flex-grow: 0;

    .logo-wrapper {
      height: $HeaderHeight;
      background: #253ca4;
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
        background: rgba(0, 0, 0, 0.05);
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

    .breadcrumb-container {
      flex-grow: 1;
    }

    .right-menu-wrapper {
      height: 100%;
      flex-shrink: 0;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;

      .menu-item {
        height: 100%;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .setting {
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

.user-menu {
  padding: 4px 0;

  .user-info-item {
    height: 70px;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    .user-name {
      font-size: 20px;
      margin-right: 16px;
      color: #000000;
    }
  }

  .user-menu-item {
    height: 42px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    &-icon {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }

    &-label {
      margin-left: 16px;
      vertical-align: middle;
    }
  }
}
</style>

<style lang="scss">
.popper-wrapper {
  padding: 0px;
}
</style>
