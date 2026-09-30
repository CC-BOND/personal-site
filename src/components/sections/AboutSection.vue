<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="about">
    <SectionHead index="01 / About" title="关于我" :sub="site.about.sub" />
    <div class="about-grid">
      <div class="about-photo reveal" v-reveal>
        <img :src="site.about.photo" :alt="site.about.photoAlt" />
      </div>
      <div class="about-text reveal" v-reveal>
        <!-- lead 为站主自维护内容，含 <em> 强调标记 -->
        <p class="lead" v-html="site.about.lead"></p>
        <p v-for="(p, i) in site.about.paragraphs" :key="i">{{ p }}</p>
        <div class="about-facts">
          <div v-for="f in site.about.facts" :key="f.value" class="fact">
            <b>{{ f.value }}</b>
            <span>{{ f.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 64px;
  align-items: start;
}
.about-photo {
  position: relative;
}
.about-photo img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
}
.about-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid var(--ink);
  transform: translate(14px, 14px);
  pointer-events: none;
}
.about-text .lead {
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 700;
  line-height: 1.7;
  margin-bottom: 28px;
}
.about-text .lead em {
  font-style: normal;
  text-decoration: underline;
  text-underline-offset: 6px;
}
.about-text p {
  color: var(--ink-soft);
  margin-bottom: 18px;
  max-width: 560px;
}
.about-facts {
  margin-top: 36px;
  border-top: 1px solid var(--line);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.fact {
  padding: 20px 0;
  border-bottom: 1px solid var(--line);
}
.fact + .fact {
  border-left: 1px solid var(--line);
  padding-left: 24px;
}
.fact b {
  display: block;
  font-family: var(--font-en);
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}
.fact span {
  font-size: 13px;
  color: var(--gray);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}
@media (max-width: 768px) {
  .about-facts {
    grid-template-columns: 1fr;
  }
  .fact + .fact {
    border-left: none;
    padding-left: 0;
  }
}
</style>
