import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
import { Notification } from 'element-ui'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  to.meta && to.meta.title && (document.title = to.meta.title) // set page title
  NProgress.start()
  const hasToken = store.getters.token // determine whether the user has logged in
  if (hasToken) {
    if (['/login'].indexOf(to.path) !== -1) {
      next({ path: '/' })
      NProgress.done()
      return
    }
    const hasUserInfo = store.getters.account // determine whether the user has obtained his userInfo through getUserInfo
    if (hasUserInfo) {
      next()
    } else {
      try {
        const userInfo = await store.dispatch('app/getUserInfo') // get user info, include routes
        router.addRoutes(userInfo.asyncRoutes) // dynamically add accessible routes
        next({ ...to, replace: true }) // hack method to ensure that addRoutes is complete. set the replace: true, so the navigation will not leave a history record
      } catch (error) {
        console.error(error)
        Notification.error({
          title: 'error',
          text: error || 'unknown error'
        })
        await store.dispatch('app/removeUserInfo') // remove token and userInfo
        next(`/login?redirect=${to.path}`) // go to login page to re-login
        NProgress.done()
      }
    }
  } else {
    if (to.meta.noToken) {
      next() // route with noToken attribute can be accessed directly
    } else {
      next(`/login?redirect=${to.path}`) // other pages that do not have permission to access are redirected to the login page
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
