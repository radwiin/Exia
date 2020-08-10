import { getToken, setToken, removeToken } from '@/utils/auth'
import { generateRoutes, resetRouter } from '@/router'
import { login, getUserInfo } from '@/api/app'

const state = {
  token: getToken(),
  account: null,
  roles: [],
  routes: []
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
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  login({ commit }, loginForm) {
    return login(loginForm).then(rsp => {
      const { data } = rsp
      commit('SET_TOKEN', data.token)
      setToken(data.token)
      return data
    })
  },
  getUserInfo({ commit }) {
    return getUserInfo().then(rsp => {
      const { data } = rsp
      Object.assign(data, generateRoutes(data.menus))
      commit('SET_ACCOUNT', data.account)
      commit('SET_ROLES', data.roles)
      commit('SET_ROUTES', data.routes)
      return data
    })
  },
  removeUserInfo({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', null)
      commit('SET_ACCOUNT', null)
      commit('SET_ROLES', [])
      commit('SET_ROUTES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
