import { defineStore } from 'pinia'

import { login, getUserInfo, getUserMenu } from '@/api/user'
import type { loginData } from '@/api/dataTypes'

import type { RouteRecordRaw } from 'vue-router'
import router from '@/router'
import staticRoutes from '@/router/staticRoutes'
import fitRouter from '@/router/fitRouter'

import Error404 from '@/views/error/404.vue'

const useUserStore = defineStore('user', {
  state: () => {
    const _accessRoutes: Array<RouteRecordRaw> = []
    return {
      token: '',
      userInfo: {},
      allRoutes: staticRoutes,
      accessRoutes: _accessRoutes
    }
  },
  getters: {
   
  },
  actions: {

    async login(params: loginData){
      const res: any = await login(params)
      console.log(111, res)
      if (res.retCode != 200) return;
      this.token = res.result

      await this.getUserInfo()
      await this.generateRoutes()
     
      return true
    },

    async getUserInfo(){
      const res: any = await getUserInfo()
      console.log(222, res)
      if (res.retCode == 200) {
        this.getUserInfo = res.result
      }
      return res
    },

    // 获取权限路由
    async generateRoutes(){
      const res: any = await getUserMenu()
      console.log(333, res)
      if (res.retCode != 200) {
        return []
      }
      const accessRoutes = fitRouter(res.result || [])
      this.accessRoutes = accessRoutes
      this.allRoutes = staticRoutes.concat(accessRoutes)
      // 添加路由
      accessRoutes.forEach(async (route: any) => {
        if (!router.hasRoute(route.name)) {
          router.addRoute(route)
        }
      })
      if(!router.hasRoute('404')) {
        router.addRoute({
          path: '/:catchAll(.*)',
          name: '404',
          component: Error404
        })
      }
      return accessRoutes
    }
  },

  // 使用该插件，开启数据缓存
  persist: {
    // 开启持久化
    enabled: true,
    strategies: [
      {
        //更改默认存储，默认session
        storage: localStorage,
        // 可以选择哪些字段进入local存储，默认是全部进去存储
        paths: ['token']
      }
    ]
  }

})

export default useUserStore
