<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <el-button>1111</el-button>
    <el-icon><location /></el-icon>
    <el-icon><check /></el-icon>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ElMessage } from 'element-plus'
import { Check, Location } from '@element-plus/icons-vue'

// onMounted(() => {
//   ElMessage({message: 'aaaa'})
// })

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
