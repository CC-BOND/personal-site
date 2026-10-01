<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { site } from '@/data/site'
</script>

<template>
  <section class="section wrap" id="skills">
    <SectionHead index="02 / Skills" title="技能栈" :sub="site.skills.sub" />

    <div class="skills-grid">
      <div
        v-for="(group, i) in site.skills.groups"
        :key="group.num"
        class="skill reveal"
        :data-d="i"
        v-reveal
      >
        <span class="skill-num">{{ group.num }}</span>
        <div class="skill-body">
          <h3>{{ group.title }}</h3>
          <span class="skill-line"></span>
          <div class="skill-tags">
            <span v-for="tag in group.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: clamp(36px, 4.4vw, 64px);
  border-top: 1px solid var(--line-strong);
  border-left: 1px solid var(--line);
}
.skill {
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  padding: clamp(22px, 2.2vw, 34px);
  min-height: clamp(300px, 28vw, 460px);
  display: flex;
  flex-direction: column;
  transition: background 0.35s;
}
.skill:hover {
  background: var(--white);
}
.skill-num {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
}
.skill-body {
  margin-top: auto;
}
.skill h3 {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: clamp(20px, 1.9vw, 30px);
  margin-bottom: 20px;
}
.skill-line {
  display: block;
  height: 1px;
  background: var(--line-strong);
}
.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

@media (max-width: 1100px) {
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
