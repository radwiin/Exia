import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/layout";

Vue.use(VueRouter);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    name: "login",
    meta: { hidden: true }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard"),
        name: "dashboard",
        meta: { title: "首页", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/components-demo",
    component: Layout,
    redirect: "/components-demo/coordinate-select",
    meta: { title: "组件库", icon: "bpmn-io", alwaysShow: true },
    children: [
      {
        path: "coordinate-select",
        component: () => import("@/views/components-demo/coordinate-select"),
        name: "coordinate-select",
        meta: { title: "坐标选择", icon: "locate" }
      },
      {
        path: "modeler",
        component: () => import("@/views/components-demo/modeler"),
        name: "modeler",
        meta: { title: "BPMN建模", icon: "build" }
      },
      {
        path: "viewer",
        component: () => import("@/views/components-demo/viewer"),
        name: "viewer",
        meta: { title: "BPMN查看", icon: "show" }
      }
    ]
  },
  {
    path: "/utils-demo",
    component: Layout,
    redirect: "/utils-demo/operate",
    meta: { title: "工具库", icon: "bpmn-io", alwaysShow: true },
    children: [
      {
        path: "operate",
        component: () => import("@/views/utils-demo/operate"),
        name: "operate",
        meta: { title: "算术优化", icon: "calculator" }
      }
    ]
  },
  {
    path: "/auth",
    component: Layout,
    redirect: "/auth/role",
    meta: { title: "权限管理", icon: "setting", alwaysShow: true },
    children: [
      {
        path: "role",
        component: () => import("@/views/auth/role"),
        name: "role",
        meta: { title: "角色管理", icon: "key" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/tenant",
    meta: { title: "系统管理", icon: "setting", alwaysShow: true },
    children: [
      {
        path: "tenant",
        component: () => import("@/views/system/tenant"),
        name: "tenant",
        meta: { title: "租户管理", icon: "key" }
      },
      // {
      //   path: "dept",
      //   component: () => import("@/views/system/dept"),
      //   name: "dept",
      //   meta: { title: "机构管理", icon: "key" }
      // },
      {
        path: "user",
        component: () => import("@/views/system/user"),
        name: "user",
        meta: { title: "用户管理", icon: "key" }
      },
      {
        path: "menu",
        component: () => import("@/views/system/menu"),
        name: "menu",
        meta: { title: "菜单管理", icon: "key" }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/about/index"),
        name: "about",
        meta: { title: "关于EXIA", icon: "info-circle" }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export { routes };

export default router;
