import router from './index'
import  useUserStore  from '@/stores/user'
import app from '@/main'
import { abort } from '@/services/intercept'


const whiteList:Array<string> = [] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  console.log('--------beforeEach-----------', to.path)
  const store = useUserStore()
  app && abort()
  // 已登录
  console.log('token', store.token)
  if (store.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoutes = store.accessRoutes && store.accessRoutes.length > 0
      console.log(111, store.accessRoutes)
      if (!hasRoutes) {
        console.log(222)
        try {
          await store.getUserInfo()
          await store.generateRoutes()
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          console.log(888, router.getRoutes())
          next({ ...to, replace: true })
        } catch (error) {
          console.log('error catch', error)
          // remove token and go to login page to re-login
        //   await store.dispatch('user/clearToken')
          next(`/login?redirect=${to.path}`)
        }
      } else {
        console.log(333)
        next()
      }
    }
    // 未登录
  } else {
    // 免登陆白名单 直接进入
    if (whiteList.includes(to.path)) {
      next()
    } else {
      if (to.path !== '/login') {
        // 重定向到登录页面
        // 可能引发的问题：因为假如之前的角色是管理员，后又登陆了非管理员，重定向的页面就可能不存在从而导致404
        next(`/login?redirect=${to.path}`)
      } else {
        next()
      }
    }
  }
})
