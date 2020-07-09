import { getToken, setToken, removeToken } from '@/utils/auth'
import { signIn, getUserInfo } from '@/api/app'
import { constantRoutes, resetRouter } from '@/router'
import { mapTree } from '@/utils'
import Layout from '@/layout'

const state = {
  token: getToken(),
  account: null,
  roles: [],
  asyncRoutes: [],
  allRoutes: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ACCOUNT: (state, account) => {
    state.account = account
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ASYNC_ROUTES: (state, asyncRoutes) => {
    state.asyncRoutes = asyncRoutes
    state.allRoutes = constantRoutes.concat(asyncRoutes)
  }
}

const actions = {
  signIn({ commit }, loginForm) {
    return signIn(loginForm).then(rsp => {
      commit('SET_TOKEN', rsp.data.token)
      setToken(rsp.data.token)
      return rsp
    })
  },
  getUserInfo({ commit }) {
    return getUserInfo().then(rsp => {
      commit('SET_ACCOUNT', rsp.data.account)
      commit('SET_ROLES', rsp.data.roles)
      return rsp
    })
  },
  generateRoutes({ commit }, menuTree) {
    return new Promise(resolve => {
      const asyncRoutes = generateAsyncRoutes(menuTree)
      asyncRoutes.push({ path: '*', redirect: '/404', meta: { hidden: true } })
      commit('SET_ASYNC_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  },
  removeUserInfo({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', null)
      commit('SET_ACCOUNT', null)
      commit('SET_ROLES', [])
      commit('SET_ASYNC_ROUTES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  }
}

function loadView(view) {
  return resolve => require([`@/views${view}`], resolve)
}

function generateAsyncRoutes(menuTree) {
  return mapTree(menuTree, menu => {
    if (!menu.component || menu.component.length === 0) {
      delete menu.component
    } else if (menu.component === 'Layout') {
      menu.component = Layout
    } else {
      menu.component = loadView(menu.component)
    }
    return menu
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
