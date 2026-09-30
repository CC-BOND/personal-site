<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionHead from '@/components/SectionHead.vue'
import { useToast } from '@/composables/useToast'
import { site } from '@/data/site'

const toast = useToast()

function onMore(e: MouseEvent) {
  // 未配置真实 GitHub 地址时回退到 Toast 占位
  if (!site.projects.more.href) {
    e.preventDefault()
    toast.show()
  }
}
</script>

<template>
  <section class="section wrap" id="projects">
    <SectionHead index="03 / Projects" title="精选项目" :sub="site.projects.sub" />
    <div class="projects-grid">
      <article
        v-for="p in site.projects.items"
        :key="p.slug"
        class="project-card reveal"
        v-reveal
      >
        <div class="project-thumb">
          <img :src="p.image" :alt="p.title" />
        </div>
        <div class="project-body">
          <h3>{{ p.title }}</h3>
          <p>{{ p.description }}</p>
          <div class="tech">
            <span v-for="t in p.tech" :key="t">{{ t }}</span>
          </div>
          <RouterLink :to="`/projects/${p.slug}`" class="btn btn-ghost">
            查看详情 <span class="arr">→</span>
          </RouterLink>
        </div>
      </article>

      <article class="project-card project-more reveal" v-reveal>
        <a :href="site.projects.more.href || '#'" @click="onMore">
          <span class="pm-label">{{ site.projects.more.label }}</span>
          <span class="pm-title" v-html="site.projects.more.titleHtml"></span>
          <span class="pm-arr">→</span>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.project-card {
  background: var(--paper);
  display: flex;
  flex-direction: column;
  transition: background 0.25s;
}
.project-card:hover {
  background: var(--white);
}
.project-thumb {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 2;
}
.project-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: transform 0.5s ease;
}
.project-card:hover .project-thumb img {
  transform: scale(1.04);
}
.project-body {
  padding: 26px 26px 30px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-body h3 {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
}
.project-body p {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 18px;
  flex: 1;
  line-height: 1.7;
}
.project-body .tech {
  margin-bottom: 18px;
}
.project-more {
  border-left: 1px solid var(--line);
}
.project-more a {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 280px;
  padding: 26px;
  background: var(--ink);
  color: var(--white);
  transition: background 0.25s;
}
.project-more a:hover {
  background: var(--ink-soft);
}
.project-more .pm-label {
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.55);
}
.project-more .pm-title {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 900;
  line-height: 1.4;
}
.project-more .pm-arr {
  font-family: var(--font-en);
  font-size: 28px;
  font-weight: 300;
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
