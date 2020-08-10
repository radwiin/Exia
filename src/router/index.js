import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import { mapTree } from '@/utils'
import _ from 'lodash'

Vue.use(VueRouter)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 * the data format below is different from the above link, but the link still can be read for reference
 *
 * name: 'router-name'           VueRouter parameter, required, the name is used by <keep-alive> (must set!!!)
 * path: 'router-path'           VueRouter parameter, required
 * component: Vue Component      VueRouter parameter, required
 * redirect: 'redirect-path'     VueRouter parameter
 * children: []                  VueRouter parameter
 * meta : {
    hidden: false                if set true, item will not show in the sidebar(default is false)
    alwaysShow: false            if set true, will always show the root menu(default is false)
                                 if not set alwaysShow, when item has more than one children route,
                                 it will becomes nested mode, otherwise not show the root menu
    icon: 'bx-name'              the icon show in the sidebar (recommend set)
    title: 'title'               the name show in the sidebar (recommend set)
    noCache: false               if set true, the page will no be cached(default is false)
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    noToken: false               if set true, the page can be accessed directly without token(default is false)
    link: false                  if set true, when item clicked in menu, will open a new page.
                                 by the way, if path is an external link(like start with http...),
                                 will also open a new page even link is false
  }
 */

const routes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login'),
    meta: { title: 'Login', hidden: true, noToken: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home'),
        meta: { title: 'Home', icon: 'bx bx-home' }
      }
    ]
  }
]

const route_404 = { path: '*', redirect: '/404', meta: { hidden: true } }

export function generateRoutes(menus) {
  const asyncRoutes = generateAsyncRoutes(menus)
  asyncRoutes.push(route_404)
  return {
    asyncRoutes, // 传入的menus参数所转化出来的异步路由
    routes: [...routes, ...asyncRoutes] // 异步路由与基本路由以及404路由拼接的最终实际项目使用的路由
  }
}

function generateAsyncRoutes(menus) {
  return mapTree(_.cloneDeep(menus), item => {
    if (!item.component || item.component.length === 0) {
      delete item.component
    } else if (item.component === 'Layout') {
      item.component = Layout
    } else {
      item.component = loadView(item.component)
    }
    return item
  })
}

function loadView(view) {
  return resolve => require([`@/views${view}`], resolve)
}

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
