import type { AddRouteRecordRaw } from '.'
import Layout from '@/layout/index.vue'

const staticRoutes: Array<AddRouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/',
    // name: 'pp',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: 'Home',
          icon: 'House'
        }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    // redirect: '/about/index',
    children: [
      {
        path: '/about/index',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
        meta: {
          title: 'About',
          icon: 'Star'
        }
      }
    ]
  },
]

export default staticRoutes
