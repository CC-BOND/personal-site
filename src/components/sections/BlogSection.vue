<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="blog">
    <SectionHead index="05 / Writing" title="最新文章" :sub="site.blog.sub" />
    <div class="blog-list">
      <RouterLink
        v-for="post in site.blog.posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="blog-item reveal"
        v-reveal
      >
        <span class="blog-date">{{ post.date }}</span>
        <h3>{{ post.title }}</h3>
        <span class="blog-cat">{{ post.category }}</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.blog-list {
  border-top: 1px solid var(--line);
}
.blog-item {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 28px;
  align-items: baseline;
  padding: 28px 8px;
  border-bottom: 1px solid var(--line);
  transition: background 0.2s;
  cursor: pointer;
}
.blog-item:hover {
  background: var(--white);
}
.blog-date {
  font-family: var(--font-en);
  font-size: 13px;
  color: var(--gray);
  letter-spacing: 0.05em;
}
.blog-item h3 {
  font-family: var(--font-serif);
  font-size: 19px;
  font-weight: 700;
  transition: transform 0.2s;
}
.blog-item:hover h3 {
  transform: translateX(6px);
}
.blog-cat {
  font-size: 12px;
  letter-spacing: 0.08em;
  border: 1px solid var(--line);
  padding: 4px 12px;
  color: var(--gray);
}

@media (max-width: 768px) {
  .blog-item {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 22px 4px;
  }
  .blog-date {
    order: -1;
  }
}
</style>
