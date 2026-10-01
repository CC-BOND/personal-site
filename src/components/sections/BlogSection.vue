<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionHead from '@/components/SectionHead.vue'
import { useDetailOverlay } from '@/composables/useDetailOverlay'
import { site } from '@/data/site'

const overlay = useDetailOverlay()
</script>

<template>
  <section class="section wrap" id="blog">
    <SectionHead index="05 / Writing" title="最新文章" :sub="site.blog.sub" />

    <div class="posts">
      <RouterLink
        v-for="(post, i) in site.blog.posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="post reveal"
        :data-d="i"
        v-reveal
        @click.prevent="overlay.open({ kind: 'post', post })"
      >
        <span class="post-date">{{ post.date }}</span>
        <span class="post-title">{{ post.title }}</span>
        <span class="tag">{{ post.category }}</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.posts {
  margin-top: clamp(32px, 4vw, 56px);
  border-top: 1px solid var(--line);
}
.post {
  display: grid;
  grid-template-columns: minmax(120px, 200px) 1fr auto;
  gap: clamp(16px, 2vw, 40px);
  align-items: center;
  padding: clamp(20px, 2.2vw, 32px) 12px;
  border-bottom: 1px solid var(--line);
  transition: background 0.3s;
}
.post:hover {
  background: var(--white);
}
.post-date {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--gray);
}
.post-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(16px, 1.45vw, 24px);
  transition: transform 0.3s var(--ease);
}
.post:hover .post-title {
  transform: translateX(8px);
}

@media (max-width: 860px) {
  .post {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 20px 6px;
  }
  .post .tag {
    justify-self: start;
  }
}
</style>
