import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/layout";

Vue.use(VueRouter);

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
    meta: { title: "Dashboard", icon: "dashboard" },
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard"),
        name: "dashboard",
        meta: { title: "Dashboard", icon: "dashboard" }
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    meta: { title: "About", icon: "info-circle", alwaysShow: true },
    children: [
      {
        path: "index",
        component: () => import("@/views/about/index"),
        name: "about",
        meta: { title: "About", icon: "info-circle" }
      }
    ]
  },
  {
    path: "/bpmn",
    component: Layout,
    meta: { title: "Bpmn", icon: "bpmn-io", alwaysShow: true },
    children: [
      {
        path: "modeler",
        component: () => import("@/views/bpmn/modeler"),
        name: "modeler",
        meta: { title: "Modeler", icon: "build" }
      },
      {
        path: "viewer",
        component: () => import("@/views/bpmn/viewer"),
        name: "viewer",
        meta: { title: "Viewer", icon: "show" }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    meta: { title: "System", icon: "setting", alwaysShow: true },
    children: [
      {
        path: "tenant",
        component: () => import("@/views/system/tenant"),
        name: "tenant",
        meta: { title: "Tenant", icon: "key" }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export { routes };

export default router;
