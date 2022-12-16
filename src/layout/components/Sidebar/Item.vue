<template>
    <el-icon class="sub-el-icon"  v-if="icon">
        <component :is="elComp"></component>
    </el-icon>
    <span v-if="title">{{title}}</span>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'

type Props = {
    icon: any,
    title: any
}
const props = withDefaults(defineProps<Props>(), {
    icon: '',
    title: ''
})

// 动态加载icon
let elComp = shallowRef();
if(props.icon){
    import('@element-plus/icons-vue').then((module: any) => {
        elComp.value = module[props.icon];
    })
}
</script>