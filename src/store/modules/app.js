import { signIn, getUserInfo } from "@/api/app";
import { getToken, setToken, removeToken } from "@/utils/auth";

import { constantRoutes } from "@/router";
import Layout from "@/layout";

function generateAsyncRoutes(menus) {
  return menus.map(menu => {
    if (menu.component === null || menu.component.length === 0) {
      delete menu.component;
    } else if (menu.component === "Layout") {
      menu.component = Layout;
    } else {
      menu.component = (component => () => import(`@/views${component}`))(
        menu.component
      );
    }
    if (menu.children && menu.children.length > 0) {
      menu.children = generateAsyncRoutes(menu.children);
    }
    return menu;
  });
}

const state = {
  token: getToken(),
  account: "",
  roles: [],
  routes: [],
  asyncRoutes: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_ASYNC_ROUTES: (state, asyncRoutes) => {
    state.asyncRoutes = asyncRoutes;
    state.routes = constantRoutes.concat(asyncRoutes);
  }
};

const actions = {
  signIn({ commit }, userInfo) {
    return signIn(userInfo).then(rsp => {
      commit("SET_TOKEN", rsp.token);
      setToken(rsp.token);
      return rsp;
    });
  },
  getUserInfo({ commit }) {
    return getUserInfo().then(rsp => {
      commit("SET_ACCOUNT", rsp.data.account);
      commit("SET_ROLES", rsp.data.roles);
      return rsp;
    });
  },
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const asyncRoutes = generateAsyncRoutes(menus);
      asyncRoutes.push({ path: "*", redirect: "/404", meta: { hidden: true } });
      commit("SET_ASYNC_ROUTES", asyncRoutes);
      resolve(asyncRoutes);
    });
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
