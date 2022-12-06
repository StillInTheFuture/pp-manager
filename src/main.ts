import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import VueAxios from 'vue-axios'
import { Request } from '@/services/request';

import './assets/main.css'
import '@/assets/styles/main.scss'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, Request.init())

app.mount('#app')

//全局注册Element Icon
// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }
