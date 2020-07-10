<template>
  <div class="app-wrapper">
    <div class="header-wrapper">
      <svg-icon icon-class="vue" style="width:26px; height:26px; margin:10px" />
      <span style="font-size:1.1rem;">Exia Admin</span>
      <!-- <div class="hamburger-wrapper" @click="collapse = !collapse">
        <svg-icon icon-class="hamburger" :class-name="`hamburger ${collapse ? '' : 'is-active'}`" />
      </div> -->
      <breadcrumb class="breadcrumb-container" />
      <div class="right-menu-wrapper">
        <el-tooltip content="Setting" placement="bottom">
          <div class="menu-item" @click="handleSettingClick">
            <svg-icon icon-class="setting" />
          </div>
        </el-tooltip>
        <el-popover placement="bottom" width="250" trigger="hover" popper-class="popper-wrapper">
          <div slot="reference" class="menu-item" @click="handleUserClick">
            <span>{{ account }}</span>
          </div>
          <div class="user-menu">
            <div class="user-info-item">
              <el-avatar shape="square" :size="50" :src="require('@/assets/avator.jpg')" />
              <span class="user-name">{{ account }}</span>
            </div>
            <div class="user-menu-item">
              <svg-icon icon-class="user" class-name="user-menu-item-icon" />
              <span class="user-menu-item-label">{{ roles.join(',') }}</span>
            </div>
            <div class="user-menu-item" @click="handleExitClick">
              <svg-icon icon-class="logout" class-name="user-menu-item-icon" />
              <span class="user-menu-item-label">登出</span>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="aside-wrapper" @mouseover="collapse = false" @mouseleave="collapse = true">
        <!-- <div class="logo-wrapper">
          <img class="logo" src="@/assets/logo.png" alt="logo" />
        </div> -->
        <nav-menu
          class="nav-menu"
          :collapse="collapse"
          @open="handleOpen"
          @close="handleClose"
          background-color="#fff"
          text-color="#989ea7"
          active-text-color="#2c3e50"
          :default-active="activeMenu"
          :data="allRoutes"
        />
      </div>
      <div class="main-wrapper">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view />
          </keep-alive>
        </transition>
      </div>
    </div>
    <setting-drawer :visible.sync="settingDrawer" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavMenu from '@/layout/components/NavMenu'
import settingDrawer from '@/layout/components/SettingDrawer'
import Breadcrumb from './components/Breadcrumb'

export default {
  name: 'SideMenuLayout',
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
    handleSettingClick() {
      this.settingDrawer = true
    },
    handleUserClick() {},
    handleExitClick() {
      this.$store.dispatch('app/removeUserInfo').then(() => {
        this.$router.push({ path: '/login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$MenuWidth: 241px;
$HeaderHeight: 50px;

.app-wrapper {
  position: relative;
  height: 100%;
  background: var(--vs-theme-bg);

  .header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9000;
    height: $HeaderHeight !important;
    display: flex;
    align-items: center;
    background: #fff;

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

  .content-wrapper {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;

    .aside-wrapper {
      width: unset !important;
      padding-top: $HeaderHeight;
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
        height: 100%;
        overflow: auto;

        &::-webkit-scrollbar {
          width: 0px;
        }

        &:not(.el-menu--collapse) {
          width: $MenuWidth;
        }
      }
    }

    .main-wrapper {
      padding: unset;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding-top: $HeaderHeight;

      &::-webkit-scrollbar {
        margin-top: 50px;
      }
    }
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
