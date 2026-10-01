<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { site } from '@/data/site'

const route = useRoute()
const post = computed(() => site.blog.posts.find((p) => p.slug === route.params.slug))
</script>

<template>
  <main class="page wrap">
    <template v-if="post">
      <RouterLink :to="{ path: '/', hash: '#blog' }" class="page-back">← 返回博客</RouterLink>

      <span class="meta">{{ post.category }} · {{ post.date }}</span>
      <h1 class="page-title">{{ post.title }}</h1>
      <p class="page-desc">{{ post.excerpt }}</p>

      <section class="page-body prose">
        <p v-for="(paragraph, i) in post.body" :key="i">{{ paragraph }}</p>
      </section>
    </template>

    <div v-else class="missing">
      <span class="meta">Blog / Not Found</span>
      <h1 class="page-title">未找到该文章</h1>
      <p class="page-desc">你访问的文章不存在或已被移除。</p>
      <RouterLink :to="{ path: '/', hash: '#blog' }" class="btn btn-ghost">
        返回文章列表
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.prose {
  margin-top: 40px;
}
.missing .btn {
  margin-top: 32px;
}
</style>
