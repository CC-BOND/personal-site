<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="about">
    <SectionHead index="01 / About" title="关于我" :sub="site.about.sub" />

    <div class="about-grid">
      <div class="about-photo reveal" v-reveal>
        <span class="frame"></span>
        <img :src="site.about.photo" :alt="site.about.photoAlt" width="1000" height="1000" />
      </div>

      <div class="about-text">
        <!-- lead 为站主自维护内容，含 <em> 强调标记 -->
        <p class="about-lead reveal" data-d="1" v-reveal v-html="site.about.lead"></p>
        <p
          v-for="(paragraph, i) in site.about.paragraphs"
          :key="i"
          class="reveal"
          :data-d="Math.min(i + 2, 3)"
          v-reveal
        >
          {{ paragraph }}
        </p>

        <div class="about-facts">
          <div
            v-for="(fact, i) in site.about.facts"
            :key="fact.label"
            class="fact reveal"
            :data-d="i + 1"
            v-reveal
          >
            <b>{{ fact.value }}</b>
            <span>{{ fact.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: clamp(32px, 5vw, 80px);
  margin-top: clamp(40px, 5vw, 72px);
}
.about-photo {
  position: relative;
  align-self: start;
  aspect-ratio: 4 / 5;
}
.about-photo .frame {
  position: absolute;
  inset: 0;
  border: 1.5px solid var(--accent);
  transform: translate(6px, 6px);
}
.about-photo img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: filter 0.9s var(--ease);
}
.about-photo:hover img,
.about-photo.in img {
  filter: grayscale(0);
}
.about-lead {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(21px, 2.1vw, 34px);
  line-height: 1.62;
}
.about-lead :deep(em) {
  font-style: normal;
  text-decoration: underline;
  text-decoration-color: var(--accent);
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}
.about-text p {
  margin-top: 20px;
  color: var(--ink-soft);
  max-width: 760px;
  font-size: clamp(15px, 1.05vw, 17px);
}
.about-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 44px;
  border-top: 1px solid var(--line-strong);
}
.fact {
  padding: 22px 24px 20px 0;
  border-bottom: 1px solid var(--line);
}
.fact + .fact {
  border-left: 1px solid var(--line);
  padding-left: 24px;
}
.fact b {
  display: block;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 17px;
}
.fact span {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: var(--gray);
}

@media (max-width: 1100px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .about-photo {
    max-width: 110px;
  }
}
@media (max-width: 620px) {
  .about-facts {
    grid-template-columns: 1fr;
  }
  .fact + .fact {
    border-left: none;
    padding-left: 0;
  }
}
</style>
