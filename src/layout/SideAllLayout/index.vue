<template>
  <el-container class="app-wrapper">
    <el-aside class="aside-wrapper" width="unset">
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
      <div class="bottom-menu"></div>
    </el-aside>
    <el-main class="main-wrapper">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </el-main>
    <setting-drawer :visible.sync="settingDrawer" />
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import NavMenu from "@/layout/components/NavMenu";
import settingDrawer from "@/layout/components/SettingDrawer";

export default {
  name: "SideAllLayout",
  components: {
    NavMenu,
    settingDrawer
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
    flex: none;
    display: flex;
    flex-flow: column nowrap;

    .logo-wrapper {
      flex: none;
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
      flex: auto;
      min-height: 0px;

      &:not(.el-menu--collapse) {
        width: $MenuWidth;
      }
    }

    .bottom-menu {
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
