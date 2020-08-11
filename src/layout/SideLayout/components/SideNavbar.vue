<template>
  <div :class="['side-navbar', { collapse }]" @mouseenter="collapse = false" @mouseleave="collapse = true">
    <header :class="`side-navbar__header ${collapse ? 'is-collapse' : ''}`">
      <svg-icon class="logo" icon-class="vue" />
      <span class="title">Exia Admin</span>
    </header>
    <auto-el-menu
      v-scrollbar
      class="side-navbar__menu"
      :collapse="collapse"
      :default-active="activeMenu"
      :collapse-transition="false"
      router
      :menus="menus"
    ></auto-el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isExternal } from '@/utils/validate'
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
    ...mapGetters(['routes']),
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    },
    menus() {
      return this.toMenus(this.routes)
    }
  },
  methods: {
    toMenus(routes) {
      const theRoutes = []
      const groupRoutes = {}
      routes.forEach(route => {
        if (route && route.meta && route.meta.group) {
          if (groupRoutes.hasOwnProperty(route.meta.group)) {
            groupRoutes[route.meta.group].children.push(route)
          } else {
            groupRoutes[route.meta.group] = {
              component: 'group',
              title: route.meta.group,
              children: [route]
            }
            theRoutes.push(groupRoutes[route.meta.group])
          }
          delete route.meta.group
        } else {
          theRoutes.push(route)
        }
      })
      return theRoutes.map(route => this.toMenu(route))
    },
    toMenu(route) {
      const checkHidden = it => it.meta && it.meta.hidden
      const checkAlwaysShow = it => it.meta && it.meta.alwaysShow
      const checkLeaf = it => !it.children
      const checkLink = it => it.meta && it.meta.link
      const isHidden = checkHidden(route)
      const isAlwaysShow = checkAlwaysShow(route)
      const isLeaf = checkLeaf(route)
      const isLink = checkLink(route)
      const visibleChildren = isLeaf ? [] : route.children.filter(child => !checkHidden(child))
      const hasVisibleChildren = visibleChildren.length > 0
      const hasOnlyOneVisibleChildren = visibleChildren.length === 1
      // 对于设置隐藏的路由，不显示其菜单
      if (isHidden) {
        return null
      }

      if (route && route.component === 'group') {
        return {
          ...route,
          children: this.toMenus(route.children)
        }
      }

      // 以下是对要显示的路由进行的逻辑处理，暂不支持外链
      if (hasVisibleChildren && (!hasOnlyOneVisibleChildren || isAlwaysShow)) {
        // 存在可见子节点，且要么有一个以上的子节点，要么只有一个子节点但设置alwaysShow属性。此时渲染为submenu
        return {
          component: 'submenu',
          index: route.path,
          icon: route.meta.icon,
          title: route.meta.title,
          children: this.toMenus(route.children)
        }
      } else if (hasVisibleChildren && hasOnlyOneVisibleChildren) {
        // 存在可见子节点，但只有一个节点且没有设置alwaysShow属性。此时默认将path传入子节点，且只渲染子节点
        return this.toMenu(visibleChildren[0])
      } else {
        // 不存在可见子节点。此时渲染为menu-item
        // let path = route.path
        // if (!isExternal(path) && isLink) {
        //   path = this.getFullPath(path)
        // }
        return {
          component: 'item',
          id: route.name,
          index: route.path,
          icon: route.meta.icon,
          title: route.meta.title
        }
      }
    },
    getFullPath(path) {
      // Detail see: https://stackoverflow.com/questions/41036009/vue-1-x-2-x-get-vue-router-path-url-from-a-route-object
      if (this.$router.mode === 'hash') {
        if (this.$router.history.hashbang) {
          path = '!' + path
        }
        path = '#' + path
      }
      // finally we add the absolute prefix before that
      if (path[0] === '#') {
        // hash mode join
        path = location.origin + location.pathname + (location.query || '') + path
      } else if (path[0] === '/') {
        // absolute path
        path = location.origin + path
      } else {
        // relative path
        path = location.origin + location.pathname.replace(/\/[^\/]+$/, '/') + path // eslint-disable-line
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
$MenuWidth: 241px;
$HeaderHeight: 80px;
$MenuWidthCollapse: 50px;

.side-navbar {
  position: absolute;
  left: 0;
  height: 100%;
  width: $MenuWidth;
  z-index: 2000;
  transition: width 0.28s;
  border-radius: 0px 30px 30px 0px;
  box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);

  &.collapse {
    width: $MenuWidthCollapse;
  }

  &__header {
    width: 100% !important;
    overflow: hidden;
    height: $HeaderHeight;
    padding: 25px 0;
    background: #fff;
    border-radius: 0px 30px 0px 0px;
    display: flex;
    align-items: center;

    &.is-collapse {
      width: $MenuWidthCollapse;
    }

    .logo {
      width: $MenuWidthCollapse;
      height: 100%;
      padding: 5px 0;
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
    position: relative;
    width: 100% !important;
    height: calc(100% - #{$HeaderHeight});
    border: 0px !important;
    min-height: 0px;

    ::v-deep .ps__rail-y {
      width: 0px;
    }

    ::v-deep .ps__thumb-y {
      width: 0px;
    }

    &:not(.el-menu--collapse) {
      width: $MenuWidth;
    }
  }
}
</style>
