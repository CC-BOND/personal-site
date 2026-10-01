<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { site } from '@/data/site'

const route = useRoute()
const project = computed(() =>
  site.projects.items.find((p) => p.slug === route.params.slug),
)
</script>

<template>
  <main class="page wrap">
    <template v-if="project">
      <RouterLink :to="{ path: '/', hash: '#projects' }" class="page-back">
        ← 返回项目
      </RouterLink>

      <span class="meta">Project / Case Study</span>
      <h1 class="page-title">{{ project.title }}</h1>
      <p class="page-desc">{{ project.description }}</p>
      <div class="tech">
        <span v-for="item in project.tech" :key="item" class="tag">{{ item }}</span>
      </div>

      <figure class="page-thumb">
        <img :src="project.image" :alt="project.title" />
      </figure>

      <section class="page-body">
        <h2>项目亮点</h2>
        <ul>
          <li v-for="(item, i) in project.highlights" :key="i">{{ item }}</li>
        </ul>
      </section>
    </template>

    <div v-else class="missing">
      <span class="meta">Project / Not Found</span>
      <h1 class="page-title">未找到该项目</h1>
      <p class="page-desc">你访问的项目不存在或已被移除。</p>
      <RouterLink :to="{ path: '/', hash: '#projects' }" class="btn btn-ghost">
        返回项目列表
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 26px;
}
.missing .btn {
  margin-top: 32px;
}
</style>
