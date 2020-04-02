<template>
  <el-container class="app-wrapper">
    <el-header class="header-wrapper">
      <logo class="logo" />
      <nav-menu
        class="nav-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#253ca4"
        text-color="#8492cf"
        active-text-color="#ffffff"
        :default-active="activeMenu"
        :data="allRoutes"
        mode="horizontal"
      />
      <div class="right-menu">
        <div class="setting-wrapper" @click="handleSettingClick">
          <svg-icon icon-class="setting" class-name="setting" />
        </div>
      </div>
    </el-header>
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
import Logo from "@/layout/components/Logo";
import NavMenu from "@/layout/components/NavMenu";
import settingDrawer from "@/layout/components/SettingDrawer";

export default {
  name: "SideMenuLayout",
  components: {
    Logo,
    NavMenu,
    settingDrawer
  },
  data: () => ({
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
$HeaderHeight: 60px;

.app-wrapper {
  height: 100%;

  .header-wrapper {
    height: $HeaderHeight;
    padding: unset;
    background-color: rgb(37, 60, 164);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .logo {
      flex: none;
      width: $HeaderHeight;
      height: $HeaderHeight;
    }

    .nav-menu {
      flex: none;
      height: $HeaderHeight;
    }

    .right-menu {
      height: $HeaderHeight;

      .setting-wrapper {
        width: $HeaderHeight;
        height: $HeaderHeight;
        flex: 0 1 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .setting {
          width: 20px;
          height: 20px;
          color: #fff;
        }
      }
    }
  }

  .main-wrapper {
    padding: unset;
  }
}
</style>
