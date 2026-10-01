<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CountUp from '@/components/CountUp.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="hero wrap" id="top">
    <div class="hero-top">
      <span class="meta reveal" v-reveal>{{ site.hero.eyebrow }}</span>
      <span class="meta reveal" v-reveal>2026</span>
    </div>

    <div class="hero-mark reveal" v-reveal></div>

    <h1><span class="reveal" data-d="1" v-reveal>{{ site.name }}</span></h1>

    <div class="hero-rule">
      <span class="reveal" data-d="2" v-reveal></span>
      <b class="reveal" data-d="3" v-reveal>{{ site.hero.nameEn }}</b>
    </div>

    <div class="hero-bottom">
      <div class="hero-desc reveal" data-d="2" v-reveal>
        <p>{{ site.hero.description }}</p>
        <div class="hero-cta">
          <RouterLink :to="{ path: '/', hash: '#projects' }" class="btn btn-solid">
            查看项目 <span class="arr">→</span>
          </RouterLink>
          <RouterLink :to="{ path: '/', hash: '#about' }" class="btn btn-ghost">关于我</RouterLink>
        </div>
      </div>

      <div class="hero-stats reveal" data-d="3" v-reveal>
        <div v-for="stat in site.hero.stats" :key="stat.label" class="stat">
          <CountUp :to="stat.value" :suffix="stat.suffix" />
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-block: calc(var(--nav-h) + 64px) 72px;
}
.hero-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(24px, 4vw, 56px);
}
.hero-mark {
  width: clamp(40px, 4.4vw, 64px);
  aspect-ratio: 1;
  background: var(--accent);
  margin-bottom: clamp(18px, 2.6vw, 36px);
}
.hero h1 {
  font-family: var(--font-serif);
  font-weight: 900;
  font-size: clamp(64px, 13vw, 208px);
  line-height: 1;
  letter-spacing: 0.02em;
}
.hero-rule {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2vw, 32px);
  margin-top: clamp(20px, 2.6vw, 40px);
}
.hero-rule span {
  height: clamp(3px, 0.32vw, 5px);
  width: clamp(90px, 14vw, 340px);
  background: var(--accent);
  flex: none;
}
.hero-rule b {
  font-family: var(--font-en);
  font-weight: 400;
  font-size: clamp(13px, 1.35vw, 26px);
  letter-spacing: 0.4em;
  white-space: nowrap;
}
.hero-bottom {
  display: flex;
  gap: clamp(28px, 4vw, 72px);
  align-items: flex-start;
  justify-content: space-between;
  margin-top: clamp(34px, 4.4vw, 64px);
  padding-top: clamp(24px, 2.8vw, 40px);
  border-top: 1px solid var(--line);
}
.hero-desc {
  max-width: 660px;
}
.hero-desc p {
  font-size: clamp(15px, 1.15vw, 19px);
  color: var(--ink-soft);
  line-height: 1.9;
}
.hero-cta {
  display: flex;
  gap: 14px;
  margin-top: 30px;
  flex-wrap: wrap;
}
.hero-stats {
  display: flex;
  flex-direction: column;
  min-width: clamp(230px, 22vw, 330px);
  flex: none;
}
.stat {
  display: flex;
  align-items: baseline;
  gap: 18px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.stat:last-child {
  border-bottom: 1px solid var(--line);
}
.stat span {
  font-size: 14px;
  color: var(--gray);
}

@media (max-width: 1100px) {
  .hero-bottom {
    flex-direction: column;
  }
  .hero-stats {
    width: 100%;
    min-width: 0;
  }
}
@media (max-width: 620px) {
  .hero-rule b {
    letter-spacing: 0.24em;
  }
}
</style>
