<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="skills">
    <SectionHead index="02 / Skills" title="技能栈" :sub="site.skills.sub" />
    <div class="skills-grid">
      <div v-for="s in site.skills.groups" :key="s.num" class="skill-cell reveal" v-reveal>
        <span class="skill-num">{{ s.num }}</span>
        <h3>{{ s.title }}</h3>
        <div class="skill-tags">
          <span v-for="t in s.tags" :key="t">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}
.skill-cell {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: 36px 30px 40px;
}
.skill-num {
  font-family: var(--font-en);
  font-size: 13px;
  color: var(--gray);
  letter-spacing: 0.1em;
  display: block;
  margin-bottom: 18px;
}
.skill-cell h3 {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.skill-tags span {
  font-size: 13px;
  padding: 5px 12px;
  border: 1px solid var(--line);
  color: var(--ink-soft);
  background: var(--white);
  transition: all 0.2s;
}
.skill-tags span:hover {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--white);
}

@media (max-width: 1024px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
