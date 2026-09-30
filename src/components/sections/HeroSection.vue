<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { site } from '@/data/site'
</script>

<template>
  <section class="hero wrap" id="top">
    <div class="hero-eyebrow">{{ site.hero.eyebrow }}</div>
    <h1 class="hero-name">
      {{ site.name }}
      <span class="en">{{ site.hero.nameEn }}</span>
    </h1>
    <div class="hero-bottom">
      <div class="hero-desc">
        <p>{{ site.hero.description }}</p>
        <div class="hero-cta">
          <RouterLink :to="{ path: '/', hash: '#projects' }" class="btn btn-solid">
            查看项目 <span class="arr">→</span>
          </RouterLink>
          <RouterLink :to="{ path: '/', hash: '#about' }" class="btn btn-ghost">
            关于我
          </RouterLink>
        </div>
      </div>
      <div class="hero-meta">
        <div v-for="m in site.hero.meta" :key="m.label" class="m-item">
          <b>{{ m.value }}</b>
          <span>{{ m.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: 120px 60px;
}
.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-en);
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--gray);
  margin-bottom: 34px;
  text-transform: uppercase;
}
.hero-eyebrow::before {
  content: "";
  width: 44px;
  height: 1px;
  background: var(--ink);
}
.hero-name {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(64px, 11vw, 150px);
  line-height: 1.02;
  letter-spacing: 0.01em;
}
.hero-name .en {
  display: block;
  font-family: var(--font-en);
  font-weight: 400;
  font-size: clamp(16px, 2vw, 24px);
  letter-spacing: 0.42em;
  color: var(--gray);
  margin-top: 20px;
}
.hero-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}
.hero-desc {
  max-width: 520px;
}
.hero-desc p {
  font-size: 17px;
  color: var(--ink-soft);
}
.hero-meta {
  display: flex;
  gap: 40px;
  flex-shrink: 0;
}
.hero-meta .m-item b {
  display: block;
  font-family: var(--font-en);
  font-size: 22px;
  font-weight: 600;
}
.hero-meta .m-item span {
  font-size: 13px;
  color: var(--gray);
}
.hero-cta {
  display: flex;
  gap: 16px;
  margin-top: 44px;
}

@media (max-width: 1024px) {
  .hero-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }
}
@media (max-width: 768px) {
  .hero-name {
    font-size: clamp(52px, 15vw, 84px);
  }
  .hero-meta {
    flex-wrap: wrap;
    gap: 24px;
  }
}
</style>
