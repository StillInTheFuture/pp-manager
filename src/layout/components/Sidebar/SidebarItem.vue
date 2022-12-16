<template>
    <div v-if="!item.hidden">
        <!--判断是否只有一个子路由需要被展示-->
        <template v-if="hasOneShowingChild(item.children, item) &&
                    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                    !item.alwaysShow">
            <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
                    <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
                </el-menu-item>
            </app-link>
        </template>

        <!--多级菜单-->
        <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"/>
        </el-sub-menu>
    </div>
</template>
  

<script setup lang="ts">
import path from 'path-browserify'
import type { AddRouteRecordRaw } from '@/router';
import Item from './Item.vue'
import AppLink from './Link.vue'
import { isExternal } from '@/utils/validate'

type Props = {
    item: AddRouteRecordRaw,
    isNest?: boolean,
    basePath: string
}
const props = withDefaults(defineProps<Props>(), {
    isNest: false,
    basePath: ''
})

let onlyOneChild: any = null
const hasOneShowingChild = (children: Array<AddRouteRecordRaw> = [], parent: AddRouteRecordRaw) => {
    const showingChildren = children.filter( item => {
        if (item.hidden) {
            return false
        } else {
            // Temp set(will be used if only has one showing child)
            onlyOneChild = item
            return true
        }
    })
    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
        return true
    }
    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
    }
    return false
}

const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
        return routePath
    }
    if (isExternal(props.basePath)) {
        return props.basePath
    }
    return path.resolve(props.basePath, routePath)
}

</script>
  