<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionHead from '@/components/SectionHead.vue'
import { useDetailOverlay } from '@/composables/useDetailOverlay'
import { useToast } from '@/composables/useToast'
import { site } from '@/data/site'

const overlay = useDetailOverlay()
const toast = useToast()

function onMore(event: MouseEvent) {
  // 未配置真实链接时回退到 Toast 占位
  if (!site.projects.more.href) {
    event.preventDefault()
    toast.show()
  }
}
</script>

<template>
  <section class="section wrap" id="projects">
    <SectionHead index="03 / Projects" title="精选项目" :sub="site.projects.sub" />

    <div class="projects-grid">
      <RouterLink
        v-for="(project, i) in site.projects.items"
        :key="project.slug"
        :to="`/projects/${project.slug}`"
        class="card reveal"
        :data-d="i"
        v-reveal
        @click.prevent="overlay.open({ kind: 'project', project })"
      >
        <span class="card-thumb">
          <img :src="project.image" :alt="project.title" loading="lazy" />
        </span>
        <span class="card-title">
          <i>{{ String(i + 1).padStart(2, '0') }}</i>
          <h3>{{ project.title }}</h3>
        </span>
        <span class="card-tags">
          <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="tag">{{ tech }}</span>
        </span>
        <span class="card-note">{{ project.highlights[0] }}</span>
      </RouterLink>

      <a
        class="card-more reveal"
        data-d="3"
        v-reveal
        :href="site.projects.more.href || '#'"
        target="_blank"
        rel="noopener"
        @click="onMore"
      >
        <span class="meta">{{ site.projects.more.label }}</span>
        <b v-html="site.projects.more.titleHtml"></b>
        <span class="arr">→</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr) 0.85fr;
  gap: clamp(14px, 1.6vw, 26px);
  margin-top: clamp(36px, 4.4vw, 64px);
}
.card {
  display: flex;
  flex-direction: column;
}
.card-thumb {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--paper-deep);
}
.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: transform 0.7s var(--ease), filter 0.5s;
}
.card:hover .card-thumb img {
  transform: scale(1.05);
  filter: grayscale(0);
}
.card-title {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 18px;
}
.card-title i {
  font-family: var(--font-mono);
  font-style: normal;
  font-size: 13px;
  color: var(--accent);
}
.card-title h3 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(17px, 1.5vw, 24px);
  transition: transform 0.3s var(--ease);
}
.card:hover .card-title h3 {
  transform: translateX(5px);
}
.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 14px;
}
.card-note {
  display: block;
  margin-top: 14px;
  font-size: 13px;
  color: var(--gray);
  line-height: 1.65;
}
.card-more {
  background: var(--ink);
  color: var(--paper);
  padding: clamp(20px, 2vw, 30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 260px;
  transition: background 0.3s;
}
.card-more:hover {
  background: var(--ink-soft);
}
.card-more .meta {
  color: rgba(242, 240, 234, 0.5);
}
.card-more b {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(20px, 1.9vw, 30px);
  line-height: 1.5;
}
.card-more .arr {
  font-family: var(--font-en);
  font-size: 30px;
  color: var(--accent);
  transition: transform 0.3s var(--ease);
}
.card-more:hover .arr {
  transform: translateX(8px);
}

@media (max-width: 1100px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
