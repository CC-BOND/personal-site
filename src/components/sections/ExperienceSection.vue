<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="experience">
    <SectionHead index="04 / Experience" title="工作经历" :sub="site.experience.sub" />

    <div class="timeline">
      <div
        v-for="(item, i) in site.experience.items"
        :key="item.period"
        class="tl-row reveal"
        :data-d="i"
        v-reveal
      >
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
  margin-top: clamp(36px, 4.4vw, 64px);
}
.tl-row {
  display: grid;
  grid-template-columns: minmax(160px, 300px) 70px 1fr;
  align-items: center;
  border-bottom: 1px solid var(--line);
}
.tl-row:first-child {
  border-top: 1px solid var(--line);
}
.tl-time {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--gray);
  padding: 34px 0;
}
.tl-axis {
  position: relative;
  align-self: stretch;
  display: grid;
  place-items: center;
}
.tl-axis::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--line-strong);
}
.tl-dot {
  position: relative;
  width: 13px;
  height: 13px;
  background: var(--ink);
}
.tl-row:first-child .tl-dot {
  background: var(--accent);
}
.tl-body {
  padding: 32px 0 32px 6px;
}
.tl-body h3 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(19px, 1.7vw, 28px);
}
.tl-body .co {
  margin-top: 8px;
  font-size: 15px;
  color: var(--accent);
}
.tl-body .desc {
  margin-top: 12px;
  font-size: 15px;
  color: var(--ink-soft);
  max-width: 900px;
}

@media (max-width: 860px) {
  .tl-row {
    grid-template-columns: 96px 42px 1fr;
  }
  .tl-time {
    padding: 24px 0;
    font-size: 12px;
  }
  .tl-body {
    padding: 24px 0;
  }
}
</style>
