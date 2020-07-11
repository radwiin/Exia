<template>
  <div class="app-wrapper">
    <div class="aside-wrapper" @mouseleave="collapse = true">
      <div :class="`menu-header ${collapse ? 'is-collapse' : ''}`">
        <svg-icon class="logo" icon-class="vue" class-name="vue" />
        <span class="title">Exia Admin</span>
      </div>
      <nav-menu
        class="nav-menu"
        :collapse="collapse"
        @open="handleOpen"
        @close="handleClose"
        background-color="#fff"
        text-color="#2c3e50"
        active-text-color="#fff"
        :default-active="activeMenu"
        :data="allRoutes"
      />
      <div :class="`menu-footer ${collapse ? 'is-collapse' : ''}`">
        <div class="avatar-wrapper">
          <el-avatar shape="circle" :size="30" :src="require('@/assets/avator.jpg')" />
        </div>
        <div class="setting-wrapper" @click="handleSettingClick">
          <svg-icon icon-class="setting" class-name="setting" />
        </div>
        <div class="hamburger-wrapper" @click="collapse = !collapse">
          <svg-icon icon-class="hamburger" :class-name="`hamburger ${collapse ? '' : 'is-active'}`" />
        </div>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="header-wrapper">
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
import Breadcrumb from '@/layout/components/Breadcrumb'

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
$HeaderHeight: 64px;
$MenuWidthCollapse: 64px;

.app-wrapper {
  height: 100%;
  position: relative;

  .aside-wrapper {
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 2000;
    display: flex;
    flex-flow: column nowrap;

    .menu-header {
      flex: none;
      width: $MenuWidth;
      height: $MenuWidthCollapse;
      background: #fff;
      border-right: solid 1px #e6e6e6;
      border-bottom: solid 1px #e6e6e6;
      display: flex;
      align-items: center;
      transition: width 0.3s ease-in-out;
      overflow: hidden;

      &.is-collapse {
        width: $MenuWidthCollapse;
      }

      .logo {
        width: 27px;
        height: 27px;
        margin: 18px;
        flex: 0 0 auto;
      }

      .title {
        font-size: 1.1rem;
        white-space: nowrap;
        flex: 0 1 auto;
      }
    }

    .nav-menu {
      flex: auto;
      min-height: 0px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 0px;
      }

      &:not(.el-menu--collapse) {
        width: $MenuWidth;
      }
    }

    .menu-footer {
      flex: none;
      width: $MenuWidth;
      height: $MenuWidthCollapse;
      background: #fff;
      border-right: solid 1px #e6e6e6;
      display: flex;
      justify-content: flex-end;
      transition: width 0.3s ease-in-out;

      &.is-collapse {
        width: $MenuWidthCollapse;
      }

      .hamburger-wrapper {
        width: $MenuWidthCollapse;
        height: $MenuWidthCollapse;
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .hamburger {
          width: 1rem;
          height: 1rem;
          color: #000;
          transition: transform 0.3s;

          &.is-active {
            transform: rotate(180deg);
          }
        }
      }

      .setting-wrapper {
        width: $MenuWidthCollapse;
        height: $MenuWidthCollapse;
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
          width: 1rem;
          height: 1rem;
          color: #000;
        }
      }

      .avatar-wrapper {
        height: $MenuWidthCollapse;
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        padding-left: 8px;
      }
    }
  }

  .main-wrapper {
    margin-left: 65px;
    height: 100%;
    position: relative;

    .header-wrapper {
      width: 100%;
      z-index: 1900;
      height: $HeaderHeight;
      display: flex;
      align-items: center;
      background: #fff;
      border-bottom: solid 1px #e6e6e6;

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
      height: calc(100% - #{$HeaderHeight});
      overflow-y: auto;
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
