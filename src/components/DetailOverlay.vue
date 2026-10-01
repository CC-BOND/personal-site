<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useDetailOverlay, type OverlayPayload } from '@/composables/useDetailOverlay'

const { payload, close } = useDetailOverlay()

// 保留最后一次内容，让关闭时还能播放退场动画
const shown = ref<OverlayPayload | null>(null)
watch(payload, (next) => {
  if (next) shown.value = next
})

const project = computed(() => (shown.value?.kind === 'project' ? shown.value.project : null))
const post = computed(() => (shown.value?.kind === 'post' ? shown.value.post : null))

const closeButton = ref<HTMLButtonElement | null>(null)
let lastFocus: HTMLElement | null = null

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(payload, (next) => {
  if (next) {
    lastFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    requestAnimationFrame(() => closeButton.value?.focus())
  } else {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
    lastFocus?.focus()
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="overlay"
    :class="{ show: !!payload }"
    role="dialog"
    aria-modal="true"
    aria-label="详情"
  >
    <div class="overlay-bar">
      <button ref="closeButton" class="overlay-close" @click="close">← 返回</button>
      <span class="meta overlay-tag">
        <template v-if="project">Project / Case Study</template>
        <template v-else-if="post">
          {{ post.category }} · {{ post.date }}
        </template>
      </span>
    </div>

    <div v-if="project" class="overlay-body">
      <h1>{{ project.title }}</h1>
      <p class="lead">{{ project.description }}</p>
      <div class="tech">
        <span v-for="item in project.tech" :key="item" class="tag">{{ item }}</span>
      </div>
      <figure class="overlay-figure">
        <img :src="project.image" :alt="project.title" />
      </figure>
      <h2>项目亮点</h2>
      <ul>
        <li v-for="(item, i) in project.highlights" :key="i">{{ item }}</li>
      </ul>
      <RouterLink :to="`/projects/${project.slug}`" class="overlay-page-link">
        在新页面打开 <span class="arr">→</span>
      </RouterLink>
    </div>

    <div v-else-if="post" class="overlay-body">
      <h1>{{ post.title }}</h1>
      <p class="lead">{{ post.excerpt }}</p>
      <div class="prose">
        <p v-for="(paragraph, i) in post.body" :key="i">{{ paragraph }}</p>
      </div>
      <RouterLink :to="`/blog/${post.slug}`" class="overlay-page-link">
        在新页面打开 <span class="arr">→</span>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  transform: translateY(3%);
  transition: opacity 0.4s var(--ease), transform 0.5s var(--ease), visibility 0.4s;
  overflow-y: auto;
  overscroll-behavior: contain;
}
.overlay.show {
  opacity: 1;
  visibility: visible;
  transform: none;
}
.overlay-bar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 var(--pad);
  height: var(--nav-h);
  flex: none;
  background: rgba(242, 240, 234, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.overlay-tag {
  margin-left: auto;
}
.overlay-close {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-en);
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--gray);
  transition: color 0.25s;
}
.overlay-close:hover {
  color: var(--ink);
}
.overlay-body {
  padding: clamp(36px, 5vw, 72px) var(--pad) clamp(60px, 7vw, 110px);
  max-width: 1560px;
  margin: 0 auto;
  width: 100%;
}
.overlay-body h1 {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(30px, 4.4vw, 68px);
  line-height: 1.14;
  max-width: 20ch;
}
.lead {
  margin-top: 22px;
  font-size: clamp(15px, 1.15vw, 19px);
  color: var(--ink-soft);
  max-width: 760px;
}
.tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 26px;
}
.overlay-figure {
  margin: clamp(30px, 4vw, 58px) 0;
  overflow: hidden;
}
.overlay-figure img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  filter: grayscale(1) contrast(1.04);
}
.overlay-body h2 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(20px, 1.9vw, 30px);
  margin-bottom: 16px;
}
.overlay-body ul {
  padding-left: 20px;
}
.overlay-body li {
  color: var(--ink-soft);
  margin-bottom: 10px;
  font-size: 15.5px;
}
.prose p {
  color: var(--ink-soft);
  margin-bottom: 18px;
  margin-top: 18px;
  font-size: clamp(15px, 1.08vw, 18px);
  line-height: 1.95;
  max-width: 820px;
}
.overlay-page-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 36px;
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 0.06em;
  color: var(--gray);
  border-bottom: 1px solid var(--line-strong);
  padding-bottom: 4px;
  transition: color 0.25s, border-color 0.25s;
}
.overlay-page-link:hover {
  color: var(--accent);
  border-color: var(--accent);
}
.overlay-page-link .arr {
  transition: transform 0.28s var(--ease);
}
.overlay-page-link:hover .arr {
  transform: translateX(5px);
}
</style>
