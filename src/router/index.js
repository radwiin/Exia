import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/layout";

Vue.use(VueRouter);

const routes = [
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
    meta: { title: "About", icon: "info" },
    children: [
      {
        path: "index",
        component: () => import("@/views/about/index"),
        name: "about",
        meta: { title: "About", icon: "info" }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export { routes };

export default router;
