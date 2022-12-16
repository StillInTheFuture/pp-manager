<template>
    <header-top></header-top>
    <div class="layout-wrapper">
        <sidebar></sidebar>
        <div class="main-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import HeaderTop from './components/HeaderTop/index.vue'
import Sidebar from './components/Sidebar/index.vue';
</script>