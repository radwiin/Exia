import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/forgot-password'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = to.meta.title // set page title

  const hasToken = store.getters.token // determine whether the user has logged in

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his userInfo through getUserInfo
      const hasUserInfo = store.getters.account

      if (hasUserInfo) {
        next()
      } else {
        try {
          // get user info
          const rsp = await store.dispatch('app/getUserInfo')

          // generate accessible routes
          const asyncRoutes = await store.dispatch('app/generateRoutes', rsp.data.menus)
          // dynamically add accessible routes
          router.addRoutes(asyncRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.error(error)
          // remove token and go to login page to re-login
          await store.dispatch('app/removeUserInfo')
          Message.error(error || '位置错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
