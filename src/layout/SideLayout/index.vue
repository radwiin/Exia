<template>
  <div class="app-wrapper">
    <side-navbar></side-navbar>
    <div class="main-wrapper">
      <top-navbar></top-navbar>
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
import AutoElMenu from '@/components/AutoElMenu'
import { mapGetters } from 'vuex'
import settingDrawer from '@/components/SettingDrawer'
import SideNavbar from './components/SideNavbar'
import TopNavbar from './components/TopNavbar'

export default {
  name: 'SideLayout',
  components: {
    TopNavbar,
    SideNavbar,
    AutoElMenu,
    settingDrawer
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
        color: #000;
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
      // overflow-y: auto;

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
    margin-left: 50px;
    height: 100%;
    position: relative;

    .content-wrapper {
      padding: 100px 0 0;
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
