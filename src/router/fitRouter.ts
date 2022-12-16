import type { AddRouteRecordRaw } from '.'
import Layout from '@/layout/index.vue'

// 这是vite才能使用的引入方式
const _modules = import.meta.glob('../views/**/*.vue')

function fitRouter (routeList: Array<any>) {
    let router: Array<AddRouteRecordRaw> = []
    try {
        router = routeList.map(item => {
            const route: AddRouteRecordRaw = {
                name: item.name,
                path: item.path,
                hidden: item.hidden,
                redirect: item.redirect,
                meta: item.meta,
                component: item.component === 'Layout' ? Layout : _modules['../views/' + item.component + '.vue'],
                children: item.children ? fitRouter(item.children) : undefined
            }
            return route
        })
    } catch (err) {
        console.error(err)
        return []
    }
  
    return router
}

export default fitRouter