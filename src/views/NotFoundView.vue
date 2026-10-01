<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page wrap">
    <span class="meta">404 / Not Found</span>
    <h1 class="page-title">页面不存在</h1>
    <p class="page-desc">你访问的地址不存在或已被移除。</p>
    <RouterLink to="/" class="btn btn-solid notfound-cta">
      返回首页 <span class="arr">→</span>
    </RouterLink>
  </main>
</template>

<style scoped>
.notfound-cta {
  margin-top: 32px;
}
</style>
