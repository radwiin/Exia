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
      <el-main>
        <div>
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from "@/components/NavMenu";
export default {
  name: "Layout",
  components: {
    NavMenu
  },
  data: () => ({
    collapse: true,
    menu: [
      {
        icon: "edit",
        title: "导航一",
        path: "/",
        children: [
          {
            icon: "edit",
            title: "导航二",
            path: "a"
          },
          {
            icon: "edit",
            title: "导航三",
            path: "b"
          }
        ]
      },
      {
        icon: "edit",
        title: "导航二",
        path: "/c"
      },
      {
        icon: "edit",
        title: "导航三",
        path: "/d",
        disabled: true
      },
      {
        icon: "edit",
        title: "导航四",
        path: "/e"
      }
    ]
  }),
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

      .logo {
        height: 100%;
        padding: 16px;
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
}
</style>
