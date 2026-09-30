<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="experience">
    <SectionHead index="04 / Experience" title="工作经历" :sub="site.experience.sub" />
    <div class="timeline">
      <div v-for="item in site.experience.items" :key="item.period" class="tl-row reveal" v-reveal>
        <div class="tl-time">{{ item.period }}</div>
        <div class="tl-axis"><span class="tl-dot"></span></div>
        <div class="tl-body">
          <h3>{{ item.role }}</h3>
          <p class="co">{{ item.company }}</p>
          <p class="desc">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  display: flex;
  flex-direction: column;
}
.tl-row {
  display: grid;
  grid-template-columns: 200px 40px 1fr;
  gap: 0;
  padding: 34px 0;
  border-bottom: 1px solid var(--line);
}
.tl-time {
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 0.06em;
  color: var(--gray);
  padding-top: 6px;
}
.tl-axis {
  position: relative;
  display: flex;
  justify-content: center;
}
.tl-dot {
  width: 12px;
  height: 12px;
  background: var(--ink);
  align-self: center;
  position: relative;
  z-index: 1;
}
.tl-row:first-child .tl-dot {
  box-shadow: 0 0 0 4px var(--paper), 0 0 0 5px var(--ink);
}
.tl-axis::before {
  content: "";
  position: absolute;
  top: -40px;
  bottom: -40px;
  width: 1px;
  background: var(--line);
}
.tl-row:first-child .tl-axis::before {
  top: 50%;
}
.tl-row:last-child .tl-axis::before {
  bottom: 50%;
}
.tl-body h3 {
  font-family: var(--font-serif);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 6px;
}
.tl-body .co {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 10px;
}
.tl-body .desc {
  font-size: 15px;
  color: var(--ink-soft);
  max-width: 640px;
}

@media (max-width: 768px) {
  .tl-row {
    grid-template-columns: 90px 28px 1fr;
    padding: 26px 0;
  }
}
</style>
