import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '@/store/'
import router from '@/router'

NProgress.configure({
  showSpinner: false
})

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = `base url` + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start() // start progress bar

    config.headers['Token'] = getToken()

    if (!config.data) {
      config.data = {}
    }

    let form = new FormData()
    if (Object.keys(config.data).indexOf('para') === -1) {
      // 不存在 `para` 入参，一般此时为单纯表单，无文件上传，自动为其封装入 `para`
      form.append(
        'para',
        JSON.stringify(config.data)
        // window.JSEncrypt.ztEncrptyUtil.encode(JSON.stringify(config.data))
      )
    } else {
      // 存在 `para` 入参，一般此时为文件与表单共同上传
      for (let key in config.data) {
        if (key === 'para') {
          form.append(key, window.ztRsaUtil.encode(JSON.stringify(config.data[key])))
        } else {
          if (Array.isArray(config.data[key])) {
            config.data[key].forEach(element => {
              form.append(key, element)
            })
          } else {
            form.append(key, config.data[key])
          }
        }
      }
    }

    config.data = form
    return config
  },
  error => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    console.info(`-response-${response.config.url}-`, response)

    NProgress.done()

    const { data } = response

    const status = data.code || 200
    const message = data.msg || '未知错误'

    // 如果是401则跳转到登录页面
    if (status === 401) {
      store.dispatch('app/removeUserInfo').then(() => router.push({ path: '/login' }))
    }

    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }

    return data
  },
  error => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export default service
