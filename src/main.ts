import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueAxios from 'vue-axios'
import instance from '@/services/intercept';

// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import store from '@/stores'

import '@/assets/styles/main.scss'

import '@/router/promission'



const app = createApp(App)
app.use(router)
app.use(VueAxios, instance)
app.use(store)

app.mount('#app')

//全局注册Element Icon
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

export default app
