<template>
    <div class="sidebar-container">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :unique-opened="false"
                :collapse-transition="false"
                mode="vertical"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText">
                <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
            </el-menu>
        </el-scrollbar>
      
    </div>
</template>

<script setup lang="ts">
import { computed  } from 'vue';
import { useRouter } from 'vue-router'
import  useUserStore  from '@/stores/user'
import variableStyle from '@/assets/styles/js.module.scss'
import SidebarItem from './SidebarItem.vue'

const variables = variableStyle

const router = useRouter()
const activeMenu = computed(() => {
    const { meta, path } = router.currentRoute.value
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
        return meta.activeMenu
    }
    return path
})

const store = useUserStore()
const routes = computed(() => {
    return store.allRoutes
})
</script>