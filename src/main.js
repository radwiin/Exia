import Vue from 'vue'

import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'

import '@/icons'
import '@/permission'
import '@/components' // global components

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
